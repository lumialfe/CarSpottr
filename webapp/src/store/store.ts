import {createStore, Store,} from "vuex";

import type {ComponentCustomProperties} from "vue";
import {api_predict} from "./endpoint.js";

export const store: Store<ComponentCustomProperties> = createStore({
    state: {
        files: [],
        previewUrl: "",
        isShowingResults: false,
        isLoading: false,
        res_img: "",
        res_mask: "",
        res_res: ""
    },
    getters: {
        files: (state) => state.files,
        previewUrl: (state) => state.previewUrl,
        isShowingResults: (state) => state.isShowingResults,
        isLoading: (state) => state.isLoading,
        getResImg: (state) => state.res_img,
        getResMask: (state) => state.res_mask,
        getResRes: (state) => state.res_res
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
        setResImg(state, result) {
            state.res_img = result;
        },
        setResMask(state, result) {
            state.res_mask = result;
        },
        setResRes(state, result) {
            state.res_res = result;
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
                    commit("setResImg", "data:image/jpg;base64," + response["v1"].split("'")[1]);
                    commit("setResMask", "data:image/jpg;base64," + response["v2"].split("'")[1]);
                    commit("setResRes", "data:image/jpg;base64," + response["v3"].split("'")[1]);
                })

            commit("setIsLoading", false);
            commit("setIsShowingResults", true);
        },
        save(state) {
            let a = document.createElement('a');
            a.setAttribute("href", state.getters["getResImg"]);
            a.setAttribute("download", "original.png");
            a.click();
            a.setAttribute("href", state.getters["getResMask"]);
            a.setAttribute("download", "mask.png");
            a.click();
            a.setAttribute("href", state.getters["getResRes"]);
            a.setAttribute("download", "result.png");
            a.click();
        },
        try() {
            console.log("click!");
        }
    }
});