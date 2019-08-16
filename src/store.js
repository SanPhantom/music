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
    playType: 0
  },
  mutations: {
    setCurrentMusic: (state, currentMusic) => {
        state.currentMusic = currentMusic;
    },

    setMusicList: (state, musicList) => {
        state.musicList = {...musicList};
        if (state.playType == 0) {
            state.playList = utils.shuffle(JSON.parse(JSON.stringify(musicList)));
        } else if (state.playType == 1 || state.playType == 2) {
            state.playList = {...musicList}
        }
        let size = state.playList.length;
        while (--size) {
            if (state.playList[size].id === state.currentMusic.id) {
                state.current_index = size;
                break;
            }
        }

    },
    setPlayList: (state, playList) => {
        state.playList = playList;
    },
    setCurrentIndex: (state, index) => {
        state.current_index = index;
    },
    setPlayType: (state, index) => {
        state.playType = index;
        let list = {...state.musicList};
        if (index == 0) {
            state.playList = utils.shuffle(list);
        } else if (index == 1 || index == 2) {
            state.playList = list
        }
        // let size = Object.keys(state.playList).length - 1;
        // while (size >= 0) {
        //     if (state.playList[size].id === state.currentMusic.id) {
        //         state.current_index = size;
        //         break;
        //     }
        //     size --;
        // }
        console.log(state.playList);
        state.current_index = state.playList.filter(function(elem, index) {
            console.log(elem);
            if (elem.id = state.currentMusic.id) {
                return index;
            }
        })
        console.log(state.current_index)
    }
  },
  actions: {

  }
})
