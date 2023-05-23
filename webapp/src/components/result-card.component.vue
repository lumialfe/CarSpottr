<template>
    <div :class="this.classes">
        <div class="image-container">
            <slot></slot>
        </div>
        <span class="card--title">
            {{ title }}
        </span>
    </div>
</template>

<script>
export default {
    name: "ResultCard",
    props: {
        title: {
            type: String,
            default: "Image"
        },
        type: {
            type: String, //primary, secondary
            default: "primary"
        }
    },
    computed: {
        classes() {
            const baseClass = "card";
            return [
                baseClass,
                `${baseClass}--${this.type}`
            ]
        }
    }
}
</script>

<style lang="scss">
@import "../assets/styles/style.scss";

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  border-radius: 15px;
  padding: 10px;
  background-color: lighten($background-color, 6.9%);
  color: $text-color;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  .image-container {
    width: 369px;
    height: 369px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;

    .card--image {
      height: 369px;
      margin: -100%;
      max-width: none;
      width: auto;
    }
  }

  &--title {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

@media only screen and (max-width: 600px) {
  .card {
    .image-container {
      width: 280px;
      height: 280px;

      .card--image {
        height: 280px;
      }
    }
  }
}

</style>