import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current_music: {
        music_url: "",
        dt: 1
    },
    music_list: [],
    play_list: [],
    current_index: 0,
  },
  mutations: {
    setCurrentMusic: (state, current_music) => {
        state.current_music = current_music;
    },

    setMusicList: (state, music_list) => {
        state.music_list = music_list;
    },
    setPlayList: (state, play_list) => {
        state.play_list = play_list;
    }
  },
  actions: {

  }
})
