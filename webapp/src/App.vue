<script lang="ts" setup>
import Header from "./components/header.component.vue";
import Main from "./components/main-view.component.vue";
import Footer from "./components/footer.component.vue";</script>

<template>
    <div class="main">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
    </div>
</template>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-rows: auto 85vh auto;
}

@media only screen and (max-width: 600px) {
  .main {
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 50px;
  }
}
</style>
