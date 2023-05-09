<template>
  <div class="drop-zone" @dragleave="dragleave" @dragover="dragover" @drop="drop">
    <input id="assetsFieldHandle" ref="file" accept=".jpg,.jpeg,.png" style="display: none" type="file"
           @change="onChange"/>
    <label class="block cursor-pointer" for="assetsFieldHandle">
      <p>
        Drag and drop your Car Picture or <span class="link">click here</span> to choose a file
      </p>
    </label>
    <ul v-cloak v-if="this.fileList.length" class="mt-4">
      <li v-for="file in fileList" class="text-sm p-1">
        <output>
          <img v-if="previewUrl" :src="previewUrl" class="img--preview">
          <p v-else>Couldn't load preview</p>
        </output>
        <button class="close-button" title="Remove file" type="button" @click="remove(fileList.indexOf(file))">
          <i aria-hidden="true" class="fa fa-times"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FileDroppper",
  data() {
    return {
      fileList: [], // Store our uploaded files
      previewUrl: ""
    }
  },
  methods: {
    onChange(event) {
      this.fileList = [...this.$refs.file.files];
      this.onFileChange(event);
    },
    remove(i) {
      this.fileList.splice(i, 1);
    },
    dragover(event) {
      event.preventDefault();
    },
    dragleave(event) {
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange(event);
    },
    onFileChange: function (event) {
      const file = event.target.files[0]
      if (!file) {
        return false
      }
      if (!file.type.match('image.*')) {
        return false
      }
      const reader = new FileReader()
      const that = this
      reader.onload = function (e) {
        that.previewUrl = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/style.scss";

.drop-zone {
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

  p {
    .link {
      font-weight: bold;
      cursor: pointer;
      text-decoration: underline;
    }
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .img--preview {
      width: 200px;
      border-radius: 10px;
    }
  }
}
</style>