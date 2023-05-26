<template>
    <div class="drop-zone" @dragleave="dragleave"
         @dragover="dragover" @drop="drop">
        <input id="assetsFieldHandle" ref="file" accept=".jpg,.jpeg,.png,.webp" style="display: none" type="file"
               @change="onChange(true)"/>
        <label class="block cursor-pointer" for="assetsFieldHandle">
            <span>
                Drag and drop your Car Picture or <span class="link">click here</span> to choose a file
            </span>
        </label>
        <Transition name="slide-fade">
            <div v-if="store.getters.files.length" class="drop-result">
                <output>
                    <img v-if="store.getters.previewUrl" :src="store.getters.previewUrl" class="img--preview">
                    <p v-else>Couldn't load preview</p>
                </output>
                <button class="close-button"
                        @click="remove()">
                    <i aria-hidden="true" class="fa fa-times"></i>
                </button>
            </div>
        </Transition>
    </div>
    <Transition>
        <div v-if="store.getters.files.length" class="buttons">
            <alfa-button color="secondary" icon="fa fa-times" type="solid" @click="cancel()">Cancel</alfa-button>
            <alfa-button color="primary" icon="fa fa-chevron-right" type="solid" @click="next()">
                Next
            </alfa-button>
        </div>
    </Transition>
</template>

<script>
import {store} from "@/store/store";
import AlfaButton from "@/components/button.component.vue";

// Gets the images and transforms them to base64
export async function fileListToBase64(fileList) {
    function getBase64(file) {
        const reader = new FileReader()
        return new Promise(resolve => {
            reader.onload = ev => {
                resolve(ev.target.result)
            }
            reader.readAsDataURL(file)
        })
    }

    const promises = []

    for (let i = 0; i < fileList.length; i++) {
        promises.push(getBase64(fileList[i]))
    }

    return await Promise.all(promises)
}

export default {
    name: "FileDroppper",
    components: {AlfaButton},
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

            store.commit("setFiles", [arrayOfBase64[0].split(",")[1]]);

        },
        cancel() {
            this.fileList = [];
            this.previewUrl = "";
        },
        next() {
            store.dispatch("predict");
        },
        clickInput() {
            document.getElementById("assetsFieldHandle").click();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/style.scss";

.drop-zone {
  border-radius: 50px;
  width: 100%;
  height: 350px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  border: 2px solid $primary-color;
  box-shadow: $primary-color 0 0 15px;

  &:hover {
    transition: all 0.3s ease-in-out;
    box-shadow: $primary-color 0 0 50px;
  }

  span {
    &:hover {
      cursor: pointer;
    }

    .link {
      font-weight: bold;
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .drop-result {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
    margin-top: 20px;

    button {

      &:hover {
        cursor: pointer;
      }
    }

    .img--preview {
      max-height: 200px;
      border-radius: 10px;
    }
  }
}

.buttons {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;

  margin: 20px 0;

  width: 100%;
}

@media only screen and (max-width: 600px) {
  .drop-zone {
    height: 60vh;
    width: 60%;
    font-size: .8rem;
    padding: 10%;
    text-align: center;

    .drop-result {
      flex-direction: column;
      gap: 10px;

      .img--preview {
        max-height: 150px;

      }
    }
  }
  .buttons {
    justify-content: center;
  }
}
</style>