<template>
    <div class="results">
        <h1>Results</h1>
        <div class="img_results">
            <img v-if='store.getters["getResult"]' id="result_img" :src='store.getters["getResult"]'
                 alt="Cropped image."/>
        </div>
        <div class="results--buttons">
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
.results {
  .img_results {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 500px;
      object-fit: cover;
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