<template>
  <v-hover v-slot="{ hover }">
    <div class="star-rating" :style="`font-size:${size}em`">
      <label
        v-for="(rating, index) in ratings"
        :key="index"
        class="star-rating__star"
        :class="{
          'is-selected': value >= rating && value != null,
          'is-disabled': disabled,
          'hover-highlight': !disabled && hover,
        }"
        @click="set(rating)"
        @mouseover="star_over(rating)"
        @mouseout="star_out"
      >
        <input
          v-model="value"
          class="star-rating star-rating__checkbox"
          type="radio"
          :value="rating"
          :name="name"
          :disabled="disabled"
        />★</label
      >
    </div>
  </v-hover>
</template>

<script>
export default {
  name: "StarRating",
  props: {
    name: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 1,
    },
    score: {
      type: Number,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data: function() {
    return {
      value: this.score,
      temp_value: null,
      ratings: [1, 2, 3, 4, 5],
    }
  },
  methods: {
    // Behavior of the stars on mouseover
    star_over: function(index) {
      if (!this.disabled) {
        this.temp_value = this.value
        return (this.value = index)
      }
    },

    // Behavior of the stars on mouseout.
    star_out: function() {
      if (!this.disabled) {
        return (this.value = this.temp_value)
      }
    },

    // Set the rating
    set: function(value) {
      if (!this.disabled) {
        this.temp_value = value
        this.emitUpdate()
        return (this.value = value)
      }
    },
    emitUpdate() {
      this.$emit("update:score", this.value)
    },
  },
}
</script>

<style scoped>
.star-rating__star {
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
  line-height: 1;
  font-size: 1.5em;
  color: #ababab;
  transition: color 0.2s ease-out;
}
/* .star-rating__star:hover {
  cursor: pointer;
} */
.hover-highlight {
  cursor: pointer;
}

.star-rating__star.is-selected {
  color: #ffd700;
}

.star-rating.is-disabled:hover {
  cursor: default;
}

.star-rating__checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
/* %visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px; width: 1px;
  margin: -1px; padding: 0; border: 0;
}

.star-rating {
  &__star {
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    line-height: 1;
    font-size: 1.5em;
    color: #ABABAB;
    transition: color .2s ease-out;

    &:hover {
      cursor: pointer;
    }

    &.is-selected {
      color: #FFD700;
    }

    &.is-disabled:hover {
      cursor: default;
    }
  }

  &__checkbox {
    @extend %visually-hidden;
  }
} */
</style>
