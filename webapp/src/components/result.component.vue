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
            <alfa-button color="secondary" icon="fa fa-rotate-left" type="outline" @click="exit()">Try Again
            </alfa-button>
            <alfa-button color="primary" icon="fa fa-download" type="solid" @click="save()">
                Download
            </alfa-button>
        </div>
    </div>
    <Loading v-else></Loading>
</template>

<script>
import {store} from "@/store/store";
import Loading from "@/components/loading.component.vue";
import AlfaButton from "@/components/button.component.vue";

export default {
    name: "Results",
    components: {AlfaButton, Loading},
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
  width: 100%;

  .img_results {
    display: grid;
    grid-template-columns: 250px auto;
    gap: 15px;

    border-radius: 15px;
    border: 5px solid $primary-color;

    padding: 10px;

    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;

      img {
        width: 100%;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;

      img {
        width: 69%;
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
    gap: 10px;

    margin: 20px 0;

    width: 100%;
  }
}
</style>