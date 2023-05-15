<template>
    <div v-if='store.getters["getResImg"]' class="results">
        <h1>Results</h1>
        <div class="img_results">
            <div class="left">
                <img v-if='store.getters["getResImg"]' id="result_img" :src='store.getters["getResImg"]'
                     alt="Cropped image."/>
                <img v-if='store.getters["getResMask"]' id="result_img" :src='store.getters["getResMask"]'
                     alt="Cropped image."/>
            </div>
            <div class="right">
                <img v-if='store.getters["getResRes"]' id="result_img" :src='store.getters["getResRes"]'
                     alt="Cropped image."/>
            </div>
        </div>
        <div v-if='store.getters["getResImg"]' class="buttons">
            <button class="button--primary" @click="save()">Download</button>
            <button class="button--secondary" @click="exit()">Try Again</button>
        </div>
    </div>
    <Loading v-else></Loading>
</template>

<script>
import {store} from "@/store/store";
import Loading from "@/components/Loading.vue";

export default {
    name: "Results",
    components: {Loading},
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
    grid-template-columns: 30% auto;
    gap: 15px;

    padding: 30px;
    border-radius: 15px;
    border: 5px solid $primary-color;

    width: 600px;

    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;

      img {
        width: 90%;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 70%;
      }
    }

    img {
      border-radius: 15px;
      transition: all .3s ease-in-out;

      &:hover {
        transition: all .3s ease-in-out;

        scale: 1.2;
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
    gap: 15px;
  }
}
</style>