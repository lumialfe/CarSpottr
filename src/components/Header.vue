<script setup>

</script>

<template>
    <header class="header">
        <a href="index.html"><h1>CarSpottr</h1></a>
        <p class="p--small">Powered by DeepLabV3+</p>
    </header>
</template>

<style lang="scss" scoped>
@import "../assets/styles/style";

.header {
  display: flex;
  align-items: baseline;

  height: 70px;

  background-color: #30343F;

  a {
    margin-left: 20px;
  }

  .p--small {
    font-size: .6rem;
  }
}
</style>