<script>
export default {
    name: "FileDroppper",
    data() {
        return {
            filelist: [] // Store our uploaded files
        }
    },
    methods: {
        onChange() {
            this.filelist = [...this.$refs.file.files];
        },
        remove(i) {
            this.filelist.splice(i, 1);
        },
        dragover(event) {
            event.preventDefault();
        },
        dragleave(event) {
        },
        drop(event) {
            event.preventDefault();
            this.$refs.file.files = event.dataTransfer.files;
            this.onChange();
        }
    }
}
</script>

<template>
    <div class="drop-zone" @dragleave="dragleave" @dragover="dragover" @drop="drop">
        <input id="assetsFieldHandle" ref="file" accept=".jpg,.jpeg,.png" style="display: none" type="file"
               @change="onChange"/>
        <label class="block cursor-pointer" for="assetsFieldHandle">
            <p>
                Drag and drop your Car Picture or <span class="link">click here</span> to choose a file
            </p>
        </label>
        <ul v-cloak v-if="this.filelist.length" class="mt-4">
            <li v-for="file in filelist" class="text-sm p-1">
                {{ file.name }}
                <button title="Remove file" type="button" @click="remove(filelist.indexOf(file))">
                    Remove
                </button>
            </li>
        </ul>
    </div>
</template>

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
</style>