<template>
  <div>
    <v-row align="center">
      <v-col cols="auto">
        <h3>Rating</h3>
      </v-col>

      <v-col cols="auto">
        <star-rating
          :key="reviews.length"
          :score="averageRating"
          :size="1"
          :disabled="true"
        ></star-rating>
      </v-col>

      <v-col style="padding-left:0">
        <h3 style="font-weight:normal">
          based on <strong>{{ reviews.length }}</strong> reviews
        </h3>
        <h2>&nbsp;</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="auto">
        <p
          v-if="markInvalidReviewField('rating')"
          class="font-weight-bold red--text"
        >
          Rate 1-5 stars:
        </p>
        <star-rating
          :score.sync="newReview['rating']"
          :size="0.8"
          label="hello world"
        ></star-rating>
        <br />
        <v-btn color="primary" outlined @click="trySaveReview">
          Submit
        </v-btn>
      </v-col>

      <v-col>
        <v-textarea
          v-model="newReview['motivation']"
          filled
          label="Motivation"
          :error="markInvalidReviewField('motivation')"
        ></v-textarea>
      </v-col>
    </v-row>

    <hr />

    <v-row v-for="(review, index) in reviews" :key="index">
      <v-col cols="auto">
        <star-rating :score="review.rating" :disabled="true"></star-rating>
        <small>
          {{ review.time }}
          <br />
          {{ review.reviewer.split("&lt;")[0] }}
        </small>
      </v-col>

      <v-col>
        <p>{{ review.motivation }}</p>
      </v-col>
    </v-row>

    <v-row v-if="reviews.length == 0">
      <v-col cols="12" style="text-align:center">
        No reviews have been submitted for this Credential
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import StarRating from "@/components/StarRating"

const requiredFields = ["rating", "motivation"]

export default {
  name: "Reviews",
  components: {
    StarRating,
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
    reviews: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      newReview: {
        time: null,
        reviewer: null,
        rating: null,
        motivation: "",
      },
      firstSaveReview: true,
    }
  },
  computed: {
    averageRating() {
      let total = 0
      if (this.reviews.length) {
        this.reviews.forEach(review => {
          total += review.rating
        })
        return Math.round(total / this.reviews.length)
      } else {
        return null
      }
    },
    initialAttributes() {
      let attributes = {}

      let storedCredential = this.getCredentialById(this.id)
      attributes = JSON.parse(JSON.stringify(storedCredential))

      return attributes
    },
    ...mapGetters(["getCredentialById"]),
  },
  mounted() {
    this.attributes = this.initialAttributes
  },
  methods: {
    async trySaveReview() {
      this.firstSaveReview = false
      let invalidReviewFields = this.invalidReviewFields()
      if (invalidReviewFields.length > 0) {
        return
      }
      let date = new Date().toISOString()
      this.newReview.time = date.substring(0, 10) + " " + date.substring(11, 16)
      this.newReview.reviewer = "Casper"
      this.attributes.reviews.push(JSON.parse(JSON.stringify(this.newReview)))
      let cred = JSON.parse(JSON.stringify(this.attributes))

      this.$store.commit("saveCredential", cred)

      this.$forceUpdate()
    },
    invalidReviewFields() {
      let invalids = []
      for (let reviewField of requiredFields) {
        let fieldValue = this.newReview[reviewField]
        if (
          reviewField in this.newReview &&
          (fieldValue === null ||
            (typeof fieldValue === "string" &&
              fieldValue.match(/^ *$/) !== null))
        ) {
          invalids.push(reviewField)
        } else {
          continue
        }
      }
      return invalids
    },
    isInvalidReviewField(key) {
      var invalids = this.invalidReviewFields()
      if (invalids.includes(key)) {
        return true
      } else {
        return false
      }
    },
    markInvalidReviewField(key) {
      if (this.isInvalidReviewField(key) && !this.firstSaveReview) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
