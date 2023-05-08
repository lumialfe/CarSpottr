<template>
  <div class="main-view">
    <div
        id="drop_zone"
        ondrop="dropHandler(event);"
        ondragover="dragOverHandler(event);"
        @click="importData()">
      <label for="car-picture">Drag and drop your <b>car picture</b> here or</label>
      <button id="car-picture">Choose a File</button>
      <span id="chosen-file"></span>
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
      document.getElementById('drop_zone').style.backgroundColor = '#e2e2e2';
    },
    importData() {
      let input = document.createElement('input');
      input.type = 'file';
      input.onchange = _ => {
        let files = Array.from(input.files);
        console.log(files);
        document.getElementById("chosen-file").innerHTML = files[0].name;
      };
      input.click();
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
    transition: all 0.3s ease-in-out;

    &:hover {
      transition: all 0.3s ease-in-out;
      //TODO
    }

    button {
      background: none;
      color: $primary-color;
      font-family: 'Montserrat', sans-serif;
      padding: 10px 20px;
      border-radius: 5px;
      border: $primary-color 3px solid;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      margin-top: 20px;

      &:hover {
        transition: all 0.3s ease-in-out;
        color: $background-color;
        background-color: #FAFAFF;
        border: #FAFAFF 3px solid;
      }
    }
  }
}
</style>