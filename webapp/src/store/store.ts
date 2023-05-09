import {createStore, Store,} from "vuex";

import type {ComponentCustomProperties} from "vue";

export const store: Store<ComponentCustomProperties> = createStore({
    state: {
        files: [],
        previewUrl: "",
        isShowingResults: false,
        isLoading: false,
    },
    getters: {
        files: (state) => state.files,
        previewUrl: (state) => state.previewUrl,
        isShowingResults: (state) => state.isShowingResults,
        isLoading: (state) => state.isLoading,
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
        },
        setIsShowingResults(state, isShowingResults) {
            state.isShowingResults = isShowingResults;
        },
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading;
        }
    },
    actions: {
        predict({commit}) {
            commit("setIsLoading", true);

            // Call API

            commit("setIsLoading", false);
            commit("setIsShowingResults", true);
        }
    }
});