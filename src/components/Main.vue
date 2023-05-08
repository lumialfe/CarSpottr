<template>
    <div class="main-view">
        <FileDroppper></FileDroppper>
    </div>
</template>

<script>
import FileDroppper from "@/components/FileDropper.vue";

export default {
    name: "Main",
    components: {FileDroppper}
}
</script>

<style lang="scss" scoped>

.main-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>