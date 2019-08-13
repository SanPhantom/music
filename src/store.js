import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMusic: {
        music_url: "",
        dt: 1
    },
    musicList: [],
    playList: [],
    current_index: 0
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
    }
  },
  actions: {

  }
})
