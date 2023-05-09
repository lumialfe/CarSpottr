<template>
  <div class="main-view">
    <Loading v-if="store.getters.isLoading"></Loading>
    <Results v-else-if="store.getters.isShowingResults"></Results>
    <FileDropper v-else></FileDropper>
  </div>
</template>

<script>

import FileDropper from "@/components/FileDropper.vue";
import {store} from "@/store/store";
import Loading from "@/components/Loading.vue";
import Results from "@/components/Results.vue";

export default {
  name: "Main",
  computed: {
    store() {
      return store
    }
  },
  components: {Results, Loading, FileDropper}
}
</script>

<style lang="scss" scoped>
.main-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 90vh;
}
</style>