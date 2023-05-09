<template>
  <div class="drop-zone" @dragleave="dragleave" @dragover="dragover" @drop="drop">
    <input id="assetsFieldHandle" ref="file" accept=".jpg,.jpeg,.png" style="display: none" type="file"
           @change="onChange"/>
    <label class="block cursor-pointer" for="assetsFieldHandle">
      <p>
        Drag and drop your Car Picture or <span class="link">click here</span> to choose a file
      </p>
    </label>
    <ul v-cloak v-if="store.getters.files.length">
      <li v-for="file in store.getters.files" class="text-sm p-1">
        <output>
          <img v-if="store.getters.previewUrl" :src="store.getters.previewUrl" class="img--preview">
          <p v-else>Couldn't load preview</p>
        </output>
        <button class="close-button" title="Remove file" type="button"
                @click="remove(store.getters.files.indexOf(file))">
          <i aria-hidden="true" class="fa fa-times"></i>
        </button>
      </li>
    </ul>
  </div>
  <div v-if="store.getters.files.length" class="buttons">
    <button class="button--secondary" @click="cancel()">Cancel</button>
    <button class="button--primary" @click="next()">Next</button>
  </div>
</template>

<script>
import {store} from "@/store/store";

export default {
  name: "FileDroppper",
  computed: {
    store() {
      return store
    }
  },
  methods: {
    onChange(event) {
      store.commit("setFiles", event.dataTransfer.files);
      this.onFileChange(event);
    },
    remove(i) {
      store.commit("removeFile", i);
    },
    dragover(event) {
      event.preventDefault();
    },
    dragleave(event) {
    },
    drop(event) {
      event.preventDefault();
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
        store.commit("setPreviewUrl", e.target.result);
      }
      reader.readAsDataURL(file)
    },
    cancel() {
      store.commit("setFiles", []);
      store.commit("etPreviewUrl", "");
    },
    next() {
      window.alert(store.getters.files[0].name);
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
      max-height: 100px;
      border-radius: 10px;
    }
  }
}

.buttons {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  gap: 15px;

  width: 700px;
}
</style>