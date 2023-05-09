<template>
  <div class="results">
    <h1>Results</h1>
    <div class="results--buttons">
      <button class="button--primary" @click="save()">Download</button>
      <button class="button--secondary" @click="exit()">Try Again</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Results",
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