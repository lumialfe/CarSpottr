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
        predict({commit, state}) {
            commit("setIsLoading", true);

            let formData = new FormData();
            formData.append("image", state.files[0]);

            // Call API
            fetch('http://127.0.0.1:8000/predict/', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"image": state.files[0]}),
            })
                .then(response => response.json())
                .then(response => console.log(JSON.stringify(response)))

            commit("setIsLoading", false);
            commit("setIsShowingResults", true);
        }
    }
});