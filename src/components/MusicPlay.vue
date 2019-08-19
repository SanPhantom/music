<template>
  <mu-container>
    <mu-paper
      class="demo-paper"
      circle
      :z-depth="1"
      @click="openFullScreenDialog"
    >
      <div class="img-box" :class="playing ? 'rotate' : ''">
        <img
          v-if="currentMusic.id"
          :src="currentMusic.al.picUrl"
          alt=""
          width="100%"
        />
      </div>
      <mu-circular-progress
        class="demo-circular-progress"
        mode="determinate"
        :value="percent"
        color="secondary"
        :stroke-width="2"
        :size="64"
      ></mu-circular-progress>
      <audio
        :src="currentMusic.music_url"
        ref="audio"
        autoplay="autoplay"
        style="display: none;"
      ></audio>
    </mu-paper>
    <mu-dialog
      width="375"
      fullscreen
      transition="slide-bottom"
      :open.sync="openFullScreen"
    >
      <music
        @prev="prevMusic"
        @next="nextMusic"
        @updateCurrentTime="updateCurrentTime"
        @closeDialog="closeFullScreenDialog"
        @isplay="playControl"
        :currentTime="currentTime"
        :playing="playing"
      >
      </music>
    </mu-dialog>
  </mu-container>
</template>

<script>
import Music from "../views/Music.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "MusicPlay",
  components: {
    Music
  },
  computed: {
    ...mapState(["currentMusic", "playList", "current_index", "playType"])
  },
  data() {
    return {
      openFullScreen: false,
      percent: 0,
      playing: false,
      currentTime: 0
    };
  },
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      let audio = this.$refs.audio;
      audio.addEventListener("canplay", function() {
        this.play();
        _this.playing = true;
        _this.$lyric.getLyric(_this, _this.currentMusic.id, function(lyric) {
          console.log(lyric);
          _this.$store.commit("setLyrics", lyric);
        });
      });
      audio.addEventListener("pause", function() {
        // this.pause();
        _this.playing = false;
      });
      audio.addEventListener("play", function() {
        // this.pause();
        _this.playing = true;
      });
      audio.addEventListener("timeupdate", function() {
        _this.setPercent(this.currentTime);
        _this.currentTime = this.currentTime;
      });
      audio.addEventListener("ended", function() {
        _this.percent = 0;
        _this.playing = false;

        if (_this.playType === 2) {
          // 单曲循环
          this.play();
          return;
          // currentIndex = currentIndex - 1;
        }
        _this.nextMusic();
      });
    });
  },
  methods: {
    ...mapMutations(["setMusicList"]),
    setPercent(currentTime) {
      this.percent =
        Math.min(1, (currentTime * 1000) / this.currentMusic.dt) * 100;
    },
    openFullScreenDialog() {
      this.openFullScreen = true;
    },
    closeFullScreenDialog() {
      this.openFullScreen = false;
    },
    playControl() {
      this.playing = !this.playing;
      if (this.playing) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    updateCurrentTime(currentTime) {
      this.$refs.audio.currentTime = currentTime;
    },
    prevMusic() {
      let _this = this;
      let currentIndex = _this.current_index;

      if (currentIndex === 0) {
        currentIndex = _this.playList.length;
      }
      _this.$music.getMusicUrl(
        _this,
        _this.playList[currentIndex - 1].id,
        function(res) {
          _this.playList[currentIndex - 1].music_url = res.data[0].url;
          _this.$store.commit(
            "setCurrentMusic",
            _this.playList[currentIndex - 1]
          );
          _this.$store.commit("setCurrentIndex", currentIndex - 1);
        }
      );
    },
    nextMusic() {
      let _this = this;
      let currentIndex = _this.current_index;

      if (currentIndex === _this.playList.length - 1) {
        currentIndex = -1;
      }
      console.log(currentIndex);
      console.log(_this.playList);
      _this.$music.getMusicUrl(
        _this,
        _this.playList[currentIndex + 1].id,
        function(res) {
          _this.playList[currentIndex + 1].music_url = res.data[0].url;
          _this.$store.commit(
            "setCurrentMusic",
            _this.playList[currentIndex + 1]
          );
          _this.$store.commit("setCurrentIndex", currentIndex + 1);
        }
      );
    }
  },
  watch: {
    current_music(newValue, oldValue) {
      const _this = this;
      setInterval(function() {
        _this.setPercent();
      }, 500);
    }
  }
};
</script>

<style lang="scss">
.demo-paper {
  position: fixed;
  bottom: 50px;
  right: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  .img-box {
    position: absolute;
    left: 0;
    height: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    &.rotate {
      animation-name: rotate;
      animation-duration: 25s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation: rotate 25s linear inherit;
      -webkit-animation: rotate 25s linear inherit;
    }

    img {
      border-radius: 50%;
    }
  }

  .demo-circular-progress {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
  }
}

.mu-dialog-fullscreen .mu-dialog-body {
  padding: 0;
  height: 100%;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
