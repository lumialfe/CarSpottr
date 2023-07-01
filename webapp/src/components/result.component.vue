<template>
    <div v-if='store.getters["getResV1"]' class="results">
        <h1>Results</h1>
        <div class="img_results">
            <ResultCard v-if='store.getters["getResV1"]' title="No Data Augmentation" v-bind:type="'secondary'">
                <img :class="'card--image'" :src='store.getters["getResV1"]'
                     alt="Cropped image."/>
            </ResultCard>
            <ResultCard v-if='store.getters["getResMask"]' title="Data Augmentation" v-bind:type="'secondary'">
                <img :class="'card--image'" :src='store.getters["getResV2"]'
                     alt="Cropped image."/>
            </ResultCard>
            <ResultCard v-if='store.getters["getResRes"]' title="Blender Augmentation" v-bind:type="'primary'">
                <img :class="'card--image'" :src='store.getters["getResV3"]'
                     alt="Cropped image."/>
            </ResultCard>
        </div>
        <Transition>
            <div v-if='store.getters["getResV1"]' class="buttons">
                <alfa-button color="secondary" icon="fa fa-rotate-left" type="outline" @click="exit()">Try Again
                </alfa-button>
                <alfa-button color="primary" icon="fa fa-download" type="solid" @click="save()">
                    Download
                </alfa-button>
            </div>
        </Transition>
    </div>
    <Loading v-else></Loading>
</template>

<script>
import {store} from "@/store/store";
import Loading from "@/components/loading.component.vue";
import AlfaButton from "@/components/button.component.vue";
import ResultCard from "@/components/result-card.component.vue";

export default {
    name: "Results",
    components: {ResultCard, AlfaButton, Loading},
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
    display: flex;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    gap: 20px;
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

@media only screen and (max-width: 600px) {
  .results {

    h1 {
      margin-left: 20px;
    }

    .img_results {
      flex-direction: column-reverse;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .buttons {
      justify-content: center;
    }
  }
}
</style>