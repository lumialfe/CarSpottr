<template>
  <div class="main-view">
    <div
        id="drop_zone"
        ondrop="dropHandler(event);"
        ondragover="dragOverHandler(event);">
      <label for="car-picture">Drag and drop your <b>car picture</b> here or</label>

      <input type="file"
             id="car-picture" name="car-picture"
             accept="image/png, image/jpeg">
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  methods: {
    dropHandler(event) {

    },
    dragOverHandler(event) {
      event.preventDefault();
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/style";

.main-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  #drop_zone {
    border: 5px dotted $primary-color;
    border-radius: 50px;
    padding: 50px;
    width: 600px;
    height: 100px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
      margin-top: 20px;
      font-family: 'Montserrat', sans-serif;
      &::file-selector-button {
        background: none;
        color: $primary-color;
        font-family: 'Montserrat', sans-serif;
        text-transform: uppercase;
        padding: 10px 20px;
        border-radius: 5px;
        border: $primary-color 3px solid;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
          transition: all 0.3s ease-in-out;
          background-color: #FAFAFF;
        }
      }
    }
  }
}
</style>