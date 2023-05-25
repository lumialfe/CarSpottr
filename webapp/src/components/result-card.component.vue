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
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;

  animation: 1s ease-in-out 0s 1 slideIn;
  @keyframes slideIn {
    0% {
      transform: translateY(-30%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  transition: width 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &:active {
    & > .image-container {
      width: fit-content;
      transition: width 0.3s ease-in-out;
    }


    & > .image-container > .card--image {
      transition: all 0.3s ease-in-out;
      transform: scale(1.1);
    }
  }

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
    &:hover {
      cursor: default;
    }

    &:active {
      & > .image-container {
        width: 280px;
      }


      & > .image-container > .card--image {
        transition: all 0.3s ease-in-out;
        transform: none;
      }
    }

    .image-container {
      width: 280px;
      height: 280px;

      .card--image {
        height: 280px;
      }
    }
  }

  @keyframes slideIn {
    0% {
      transform: translateX(30%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
}

</style>