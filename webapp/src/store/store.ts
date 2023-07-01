import {createStore, Store,} from "vuex";

import type {ComponentCustomProperties} from "vue";
import {api_predict} from "./endpoint.js";

export const store: Store<ComponentCustomProperties> = createStore({
    state: {
        files: [],
        previewUrl: "",
        isShowingResults: false,
        isLoading: false,
        res_v1: "",
        res_v2: "",
        res_v3: ""
    },
    getters: {
        files: (state) => state.files,
        previewUrl: (state) => state.previewUrl,
        isShowingResults: (state) => state.isShowingResults,
        isLoading: (state) => state.isLoading,
        getResV1: (state) => state.res_v1,
        getResV2: (state) => state.res_v2,
        getResV3: (state) => state.res_v3
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
        setResV1(state, result) {
            state.res_v1 = result;
        },
        setResV2(state, result) {
            state.res_v2 = result;
        },
        setResV3(state, result) {
            state.res_v3 = result;
        }
    },
    actions: {
        predict({commit, state}) {
            commit("setIsLoading", true);

            // Call API
            fetch(api_predict, {
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
                    commit("setResV1", "data:image/jpg;base64," + response["v1"].split("'")[1]);
                    commit("setResV2", "data:image/jpg;base64," + response["v2"].split("'")[1]);
                    commit("setResV3", "data:image/jpg;base64," + response["v3"].split("'")[1]);
                })

            commit("setIsLoading", false);
            commit("setIsShowingResults", true);
        },
        save(state) {
            let a = document.createElement('a');
            a.setAttribute("href", state.getters["getResV1"]);
            a.setAttribute("download", "v1.png");
            a.click();
            a.setAttribute("href", state.getters["getResV2"]);
            a.setAttribute("download", "v2.png");
            a.click();
            a.setAttribute("href", state.getters["getResV3"]);
            a.setAttribute("download", "v3.png");
            a.click();
        },
        try() {
            console.log("click!");
        }
    }
});