<template>
  <div>
    <v-breadcrumbs :items="navItems" large class="px-0 py-5"></v-breadcrumbs>

    <h1>
      {{ pageTitle }}
    </h1>
    <change-log :items="changeLog"></change-log>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import ChangeLog from "@/components/ChangeLog"
import { COLLABORATORS } from "@/collaborators"
import { CRED_UPDATES } from "@/example_cred_updates"
import constants from "@/constants"

function generatePrevCred(cred) {
  let prevCred = JSON.parse(JSON.stringify(cred))
  prevCred.changeLog = null
  for (const changeType in cred.diff.changesFull) {
    if (cred.diff.changesFull.hasOwnProperty(changeType)) {
      prevCred[changeType] = cred.diff.changesFull[changeType][0]
    }
  }
  return prevCred
}

function generateLogEntry(cred, successorUnixTime, entryId, initialEntry) {
  let newUnixTime =
    successorUnixTime - 1000000 + Math.floor(Math.random() * 500000)
  let entry = {
    id: entryId,
    author:
      COLLABORATORS[Math.floor(Math.random() * COLLABORATORS.length)].name,
    timestamp: newUnixTime,
  }
  if (initialEntry) {
    entry["changesSummary"] = "Initial creation of Credential"
    entry["changesFull"] = {
      "Initial creation": ["", ""],
    }
  } else {
    entry["changesFull"] = {}
    // First pick the types of updates from CRED_UPDATES
    let nUpdates =
      1 + Math.floor(Math.random() * Math.min(3, CRED_UPDATES.length - 1))
    let updateIdxs = []
    while (updateIdxs.length < nUpdates) {
      let idx = Math.floor(Math.random() * CRED_UPDATES.length)
      if (updateIdxs.indexOf(idx) === -1) {
        updateIdxs.push(idx)
      }
    }
    let updateTypes = []
    updateIdxs.forEach(idx => {
      updateTypes.push(CRED_UPDATES[idx])
    })
    // after is always the current field for the updateType,
    // assign a different "before".
    updateTypes.forEach(updateType => {
      let before = "<empty>"
      let after = "<empty>"
      if (updateType === "visibility") {
        after = cred.visibility
        do {
          before =
            constants.VISIBILITIES[
              Math.floor(Math.random() * constants.VISIBILITIES.length)
            ].text
        } while (before === after)
      } else if (updateType === "maturity") {
        after = cred.maturity
        do {
          before =
            constants.MATURITY_LEVELS[
              Math.floor(Math.random() * constants.MATURITY_LEVELS.length)
            ].text
        } while (before === after)
      } else if (updateType === "credentialType") {
        after = cred.credentialType
        let befores = [
          "Name",
          "Name Credential",
          "NameCredential",
          "Address",
          "AddressCredential",
          "CertificateOfInheritance",
          "Email",
          "Email Credential",
          "ContactDetails",
          "ContactDetailsCredential",
          "Telephone",
          "Guardianship",
        ]
        do {
          before = befores[Math.floor(Math.random() * befores.length)]
        } while (before === after)
      }
      entry["changesFull"][updateType] = [before, after]
    })
    let summaryStr = ""
    for (let idx = 0; idx < updateTypes.length; idx++) {
      const updateType = updateTypes[idx]
      summaryStr += updateType
      if (idx < updateTypes.length - 1) {
        summaryStr += ", "
      }
    }
    entry["changesSummary"] = summaryStr
  }
  return entry
}

export default {
  name: "CredentialChangeLog",
  components: { ChangeLog },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  computed: {
    ...mapGetters(["getCredentialById", "lastCredential"]),
    credential() {
      if (this.id) {
        return this.getCredentialById(this.id)
      } else {
        return null
      }
    },
    navItems() {
      return [
        {
          text: "Search",
          to: { name: "search" },
        },
        {
          text: this.credential.name,
          to: { name: "details", params: { id: this.id } },
        },
        {
          text: "Change log",
          disabled: true,
        },
      ]
    },
    changeLog() {
      if (this.credential) {
        if (this.credential.changeLog) {
          console.log("Using existing changelog")
          return this.credential.changeLog
        } else {
          console.log("Creating new log for Credential")
          // We will work backwards from the current Credential, creating a change log
          // entry that defines a previous "placeholder Credential", which we
          // iteratively use to create new changelogs and predecessors
          // until we reach the initial creation of the Credential.
          let earliestCred = JSON.parse(JSON.stringify(this.credential))
          let fullLog = []
          let nLogEntries = 4 + Math.floor(Math.random() * 17)
          let successorUnixTime =
            1545000000 + Math.floor(Math.random() * 30000000)
          // max 10000 entries per Credential should suffice
          // this is used to keep track of which items are expanded
          let baseEntryIdx = 10000 * this.id
          for (
            let entryIdOffset = 0;
            entryIdOffset < nLogEntries;
            entryIdOffset++
          ) {
            let isFirstLogEntry =
              entryIdOffset == nLogEntries - 1 ? true : false
            let entry = generateLogEntry(
              earliestCred,
              successorUnixTime,
              baseEntryIdx - entryIdOffset,
              isFirstLogEntry
            )
            fullLog.push(entry)
            // use "diff" placeholder in these dummy cred's to reflect the change
            // from the previous cred.
            earliestCred.diff = entry
            successorUnixTime = entry.timestamp
            earliestCred = generatePrevCred(earliestCred)
          }
          let credCopy = JSON.parse(JSON.stringify(this.credential))
          credCopy.changeLog = fullLog.reverse()
          // Add hardcoded documentation change to Android Worm
          if (this.credential.id === 1) {
            credCopy.changeLog[credCopy.changeLog.length - 1][
              "changesSummary"
            ] += ", description"
            credCopy.changeLog[credCopy.changeLog.length - 1]["changesFull"][
              "description"
            ] = [
              "Using Bluetooth, this worm can be used for lateral movement by supplying a payload which will be automatically compressed and encrypted/decrypted. The use of previously-freed memory can have any number of adverse consequences, ranging from the corruption of valid data to the execution of arbitrary code, depending on the instantiation and timing of the flaw. The simplest way data corruption may occur involves the system's reuse of the freed memory. Use-after-free errors have two common and sometimes overlapping causes: Error conditions and other exceptional circumstances, and confusion over which part of the program is responsible for freeing the memory. In this scenario, the memory in question is allocated to another pointer validly at some point after it has been freed. The original pointer to the freed memory is used again and points to somewhere within the new allocation. As the data is changed, it corrupts the validly used memory; this induces undefined behavior in the process. If the newly allocated data chances to hold a class, in C++ for example, various function pointers may be scattered within the heap data. If one of these function pointers is overwritten with an address to valid shellcode, execution of arbitrary code can be achieved.",
              "This worm abuses a use-after-free in the Android <= 4.4 bluetooth stack to propagate between devices. Use it to add worm-functionality to existing viruses, optionally whitelisting/blacklisting particular MAC-addresses to limit infection or customize virus behavior. Use-after-free errors have two common and sometimes overlapping causes: Error conditions and other exceptional circumstances, and confusion over which part of the program is responsible for freeing the memory. In this scenario, the memory in question is allocated to another pointer validly at some point after it has been freed. The original pointer to the freed memory is used again and points to somewhere within the new allocation. As the data is changed, it corrupts the validly used memory; this induces undefined behavior in the process. If the newly allocated data chances to hold a class, in C++ for example, various function pointers may be scattered within the heap data. If one of these function pointers is overwritten with an address to valid shellcode, execution of arbitrary code can be achieved.",
            ]
          }
          this.$store.commit("saveCredential", credCopy)
          return credCopy.changeLog
        }
      }
      return null
    },
    pageTitle() {
      if (this.credential) {
        return `${this.credential.name}: change log`
      } else {
        return `Change logs`
      }
    },
  },
}
</script>
