<template>
    <div class="drop-zone" @dragleave="dragleave" @dragover="dragover" @drop="drop">
        <input id="assetsFieldHandle" ref="file" accept=".jpg,.jpeg,.png" style="display: none" type="file"
               @change="onChange(true)"/>
        <label class="block cursor-pointer" for="assetsFieldHandle">
            <p>
                Drag and drop your Car Picture or <span class="link">click here</span> to choose a file
            </p>
        </label>
        <ul v-if="store.getters.files.length">
            <li v-for="file in store.getters.files" class="text-sm p-1">
                <output>
                    <img v-if="store.getters.previewUrl" :src="store.getters.previewUrl" class="img--preview">
                    <p v-else>Couldn't load preview</p>
                </output>
                <button class="close-button" title="Remove file" type="button"
                        @click="remove()">
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

export async function fileListToBase64(fileList) {
    // create function which return resolved promise
    // with data:base64 string
    function getBase64(file) {
        const reader = new FileReader()
        return new Promise(resolve => {
            reader.onload = ev => {
                resolve(ev.target.result)
            }
            reader.readAsDataURL(file)
        })
    }

    // here will be array of promisified functions
    const promises = []

    // loop through fileList with for loop
    for (let i = 0; i < fileList.length; i++) {
        promises.push(getBase64(fileList[i]))
    }

    // array with base64 strings
    return await Promise.all(promises)
}

export default {
    name: "FileDroppper",
    computed: {
        store() {
            return store
        }
    },
    data() {
        return {
            fileList: [],
            previewUrl: ""
        }
    },
    watch: {
        fileList: function (val) {
            store.commit("setFiles", val);
        },
        previewUrl: function (val) {
            store.commit("setPreviewUrl", val);
        }
    },
    methods: {
        onChange(flag) {
            this.onFileChange(flag);
        },
        remove() {
            this.fileList = [];
            this.previewUrl = "";
        },
        dragover(event) {
            event.preventDefault();
        },
        dragleave(event) {
        },
        drop(event) {
            event.preventDefault();
            this.fileList = event.dataTransfer.files;
            this.onChange(false);
        },
        onFileChange: async function (flag) {
            if (flag) {
                this.fileList = this.$refs.file.files;
            }
            const file = this.fileList[0]
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

            reader.readAsDataURL(file);

            const arrayOfBase64 = await fileListToBase64([file]);

            //console.log(arrayOfBase64[0].split(",")[1]);
            store.commit("setFiles", [arrayOfBase64[0].split(",")[1]]);

        },
        cancel() {
            this.fileList = [];
            this.previewUrl = "";
        },
        next() {
            store.dispatch("predict");
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