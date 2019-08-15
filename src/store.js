import Vue from 'vue'
import Vuex from 'vuex'

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
        state.musicList = musicList;
    },
    setPlayList: (state, playList) => {
        state.playList = playList;
    },
    setCurrentIndex: (state, index) => {
        state.current_index = index;
    },
    setPlayType: (state, index) => {
        state.playType = index;
    }
  },
  actions: {

  }
})
