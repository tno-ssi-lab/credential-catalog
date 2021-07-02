<template>
  <v-data-table
    :headers="headers"
    :items="itemsWithDates"
    sort-by="timestamp"
    sort-desc
    show-expand
  >
    <template #expanded-item="{ item }">
      <td colspan="4" style="padding: 0px">
        <v-data-table
          :headers="changeHeaders"
          :items="changeDetails(item)"
          :hide-default-footer="true"
          style="border-radius: 0px"
        >
        </v-data-table>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "ChangeLog",
  props: {
    items: {
      type: Array,
      default: () => [
        {
          timestamp: "someday",
          description: "something happened",
          author: "Ivanka",
        },
      ],
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Timestamp",
          value: "timestamp",
        },
        {
          text: "Change",
          value: "changesSummary",
        },
        {
          text: "Author",
          value: "author",
        },
      ],
      changeHeaders: [
        {
          text: "Change",
          value: "type",
        },
        {
          text: "From",
          value: "old",
        },
        {
          text: "To",
          value: "new",
        },
      ],
    }
  },
  computed: {
    itemsWithDates() {
      return this.items.map(item => {
        const date = new Date(1000 * item.timestamp)
        return {
          ...item,
          timestamp: `${date.toLocaleDateString(
            "fr-CA"
          )} ${date.toLocaleTimeString("en-GB")}`,
        }
      })
    },
  },
  methods: {
    changeDetails(item) {
      let changeObjects = []
      const changesFull = item.changesFull
      for (const key in changesFull) {
        if (changesFull.hasOwnProperty(key)) {
          const element = changesFull[key]
          changeObjects.push({
            type: key,
            old: element[0],
            new: element[1],
          })
        }
      }
      return changeObjects
    },
  },
}
</script>
