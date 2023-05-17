<template>
    <button :class="buttonClass">
        <slot></slot>
        <i v-if="icon !== ''" :class="icon"></i>
    </button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "AlfaButton",
    props: {
        type: {
            type: String, // solid, outline
            default: "solid"
        },
        color: {
            type: String, // primary, secondary
            default: "primary"
        },
        icon: {
            type: String,
            default: ""
        }
    },
    computed: {
        buttonClass() {
            const baseClass = "alfa-button";
            const classes = [baseClass];
            classes.push(baseClass + "--" + this.type);
            classes.push(baseClass + "--" + this.color);

            return classes;
        }
    }
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/style.scss";

.alfa-button {
  $base-class: &;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  text-transform: uppercase;

  min-width: 69px;
  min-height: 35px;

  border-radius: 5px;
  border: none;

  background: none;

  color: black;

  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 5px;

  transition: all 0.2s ease-in-out;

  padding: 0 5px;

  &--solid {
    &#{ $base-class } {
      &--primary {
        background-color: $primary-color;
        color: $background-color;

        &#{ $base-class } {
          &:hover {
            background-color: lighten($primary-color, 5%);
          }

          &:active {
            background-color: darken($primary-color, 5%);
          }
        }
      }

      &--secondary {
        background-color: $secondary-color;
        color: $background-color;

        &#{ $base-class } {
          &:hover {
            background-color: lighten($secondary-color, 5%);
          }

          &:active {
            background-color: darken($secondary-color, 5%);
          }
        }
      }
    }
  }

  &--outline {
    &#{ $base-class } {
      border: 2px solid;

      &--primary {
        background-color: $background-color;
        color: $primary-color;
        border-color: $primary-color;

        &#{ $base-class } {
          &:hover {
            background-color: lighten($primary-color, 5%);
            color: $background-color;
          }

          &:active {
            background-color: darken($primary-color, 5%);
          }
        }
      }

      &--secondary {
        background-color: $background-color;
        color: $secondary-color;
        border-color: $secondary-color;

        &#{ $base-class } {
          &:hover {
            background-color: lighten($secondary-color, 5%);
            color: $background-color;
          }

          &:active {
            background-color: darken($secondary-color, 5%);
          }
        }
      }
    }
  }

  &:disabled {
    opacity: 0.5;
  }
}
</style>