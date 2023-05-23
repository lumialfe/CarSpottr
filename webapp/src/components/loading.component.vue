<template>
    <div class="loading">
        <h1>Loading...</h1>
    </div>
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

@media only screen and (max-width: 600px) {
  .loading {
    width: 100%;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>