<template>
    <div class="main-view">
        <FileDropper></FileDropper>
    </div>
</template>

<script>

import FileDropper from "@/components/FileDropper.vue";

export default {
    name: "Main",
    components: {FileDropper}
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