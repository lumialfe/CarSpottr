import {createStore, Store,} from "vuex";

import type {ComponentCustomProperties} from "vue";

export const store: Store<ComponentCustomProperties> = createStore({
    state: {
        files: [],
        previewUrl: "",
    },
    getters: {
        files: (state) => state.files,
        previewUrl: (state) => state.previewUrl,
    },
    mutations: {
        setFiles(state, file) {
            state.files = file;
        },
        setPreviewUrl(state, previewUrl) {
            state.previewUrl = previewUrl;
        },
        removeFile(state, index) {
            state.files.splice(index, 1);
        }
    }
});