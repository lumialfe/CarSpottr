<template>
    <div class="main-view">
        <Loading v-if="store.getters.isLoading"></Loading>
        <Results v-else-if="store.getters.isShowingResults"></Results>
        <FileDropper v-else></FileDropper>
    </div>
</template>

<script>

import FileDropper from "@/components/file-dropper.component.vue";
import {store} from "@/store/store";
import Loading from "@/components/loading.component.vue";
import Results from "@/components/result.component.vue";
import AlfaButton from "@/components/button.component.vue";

export default {
    name: "Main",
    computed: {
        store() {
            return store
        }
    },
    components: {AlfaButton, Results, Loading, FileDropper}
}
</script>

<style lang="scss" scoped>
.main-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
  margin: 0 auto;
}

@media only screen and (max-width: 600px) {
  .main-view {
    max-width: 100vw;
    height: fit-content;
  }
}
</style>