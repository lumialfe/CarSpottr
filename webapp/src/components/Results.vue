<template>
    <div class="results">
        <h1>Results</h1>
        <div v-if='store.getters["getResImg"]' class="img_results">
            <img v-if='store.getters["getResImg"]' id="result_img" :src='store.getters["getResImg"]'
                 alt="Cropped image."/>
            <img v-if='store.getters["getResMask"]' id="result_img" :src='store.getters["getResMask"]'
                 alt="Cropped image."/>
            <img v-if='store.getters["getResRes"]' id="result_img" :src='store.getters["getResRes"]'
                 alt="Cropped image."/>
        </div>
        <div v-else class="loading">
            <h2>Loading...</h2>
        </div>
        <div v-if='store.getters["getResImg"]' class="results--buttons">
            <button class="button--primary" @click="save()">Download</button>
            <button class="button--secondary" @click="exit()">Try Again</button>
        </div>
    </div>
</template>

<script>
import {store} from "@/store/store";

export default {
    name: "Results",
    computed: {
        store() {
            return store
        }
    },
    methods: {
        save() {
            this.$store.dispatch("save");
        },
        exit() {
            window.location.href = "/";
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/style.scss";

.results {
  .img_results {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;

    padding: 15px 15px;
    border-radius: 15px;
    box-shadow: $primary-color 0 0 15px;


    img {
      max-width: 14vw;
      border-radius: 15px;
      transition: all .3s ease-in-out;

      &:hover {
        transition: all .3s ease-in-out;

        scale: 1.2;
      }
    }
  }

  .loading {
    h2 {
      animation: blinker 3s linear infinite;
    }

    @keyframes blinker {
      50% {
        opacity: 0;
      }
    }
  }

  &--buttons {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
    gap: 15px;

    width: 700px;
  }
}
</style>