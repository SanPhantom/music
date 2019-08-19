import Vue from 'vue'
import Vuex from 'vuex'
import utils from './assets/utils.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentMusic: {
            id: -1,
            music_url: "",
            dt: 0,
            al: {}
        },
        musicList: [],
        playList: [],
        current_index: -1,
        playType: 0,
        lyrics: []
    },
    mutations: {
        setCurrentMusic: (state, currentMusic) => {
            state.currentMusic = currentMusic;
        },

        setMusicList: (state, musicList) => {
            let list = Object.values(JSON.parse(JSON.stringify(musicList)));

            state.musicList = list;
            if (state.playType === 0) {
                state.playList = utils.shuffle(list);
            } else if (state.playType === 1 || state.playType === 2) {
                state.playList = list;
            }
            console.log(state.playList);
            state.current_index = state.playList.findIndex(item => item.id === state.currentMusic.id);
        },
        setPlayList: (state, playList) => {
            state.playList = playList;
        },
        setCurrentIndex: (state, index) => {
            state.current_index = index;
        },
        setPlayType: (state, index) => {
            state.playType = index;
            let list = Object.values(JSON.parse(JSON.stringify(state.musicList)));
            if (index === 0) {
                state.playList = utils.shuffle(list);
            } else if (index === 1 || index === 2) {
                state.playList = list
            }
            state.current_index = state.playList.findIndex(item => item.id === state.currentMusic.id);
        },
        setLyrics: (state, lyrics) => {
            state.lyrics = lyrics;
        }
    },
    actions: {

    }
})
