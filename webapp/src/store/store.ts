import {createStore, Store,} from "vuex";

import type {ComponentCustomProperties} from "vue";

export const store: Store<ComponentCustomProperties> = createStore({
    state: {
        files: [],
        previewUrl: "",
        isShowingResults: false,
        isLoading: false,
        result: ""
    },
    getters: {
        files: (state) => state.files,
        previewUrl: (state) => state.previewUrl,
        isShowingResults: (state) => state.isShowingResults,
        isLoading: (state) => state.isLoading,
        getResult: (state) => state.result
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
        },
        setResult(state, result) {
            state.result = result;
        }
    },
    actions: {
        predict({commit, state}) {
            commit("setIsLoading", true);

            // Call API
            fetch('http://127.0.0.1:8000/predict/', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"image": state.files[0]}),
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    commit("setResult", "data:image/jpg;base64," + response["mask"].split("'")[1]);
                })

            commit("setIsLoading", false);
            commit("setIsShowingResults", true);
        }
    }
});