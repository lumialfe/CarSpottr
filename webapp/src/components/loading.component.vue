<template>
    <h1>Loading...</h1>
</template>

<script>
export default {
    name: "Loading"
}
</script>

<style lang="scss" scoped>
h1 {
  animation: blinker 3s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>