<template>
  <footer>
    <div class="footer--part">
      <a href="https://github.com/lumialfe/CarSpottr"><i class="fab fa-github"></i>
        GitHub Repository</a>
      <a href="https://keras.io/examples/vision/deeplabv3_plus/"><i class="fa-sharp fa-solid fa-k"></i>
        DeepLabV3+</a>
      <a href="https://www.uniovi.es/"><i class="fa-solid fa-building-columns"></i>
        UniOvi</a>
    </div>
    <div class="footer--part">
      <a href="https://europa.eu/europass/eportfolio/api/eprofile/shared-profile/4ada6c97-3625-4845-beab-623683fce3ac?view=html"><i class="fa-solid fa-user"></i>
        About the author</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/style.scss";

footer {
  background-color: $primary-color;
  font-family: 'Montserrat', sans-serif;

  display: grid;
  grid-template-columns: 50% 50%;

  height: 100px;
  padding: 50px 30%;

  .footer--part {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 15px;

    a {
      color: $background-color;

      &:hover {
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        font-weight: bold;
      }
    }
  }
}
</style>