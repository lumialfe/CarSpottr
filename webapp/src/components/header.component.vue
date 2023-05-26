<script setup>

</script>

<template>
    <header class="header">
        <a href="../../index.html"><h1>CarSpottr</h1></a>
        <p class="p--small">Powered by DeepLabV3+</p>
    </header>
</template>

<style lang="scss" scoped>
@import "../assets/styles/style.scss";

.header {
  display: flex;
  align-items: baseline;


  background-color: $background-color;
  width: 1200px;
  margin: auto;
  border-radius: 8px;

  a {
    margin-left: 20px;
    transition: all .5s ease-in-out;

    &:hover {
      -webkit-filter: drop-shadow(0 0 10px $primary-color);
      filter: drop-shadow(0 0 10px $primary-color);
      transition: all .5s ease-in-out;
    }
  }

  .p--small {
    font-size: .9rem;
  }
}

@media only screen and (max-width: 600px) {
  .header {
    justify-content: center;
    width: 100vw;

    margin: 0;

    a {
      margin: 0;
    }

    .p--small {
      font-size: .6rem;
    }
  }
}

</style>