<template>
  <div class="music">
    <img src="../assets/music_bg.jpg" alt="" class="img_bg" />
    <mu-appbar style="width: 100%;" color="transparent">
      <mu-button icon slot="left" @click="closeSelf()">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <mu-flex slot="default" direction="column" justify-content="center">
        <span>{{ currentMusic.name }}</span>
        <div class="singers">
          <span v-for="(ar, index) in currentMusic.ar" :key="ar.id"
            >{{ ar.name
            }}<i v-if="index != currentMusic.ar.length - 1">/</i></span
          >
        </div>
      </mu-flex>
      <mu-button flat slot="right">
        <mu-icon value="share"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-container>
      <div class="music_img" :class="playing ? 'rotate' : ''">
        <img :src="currentMusic.al.picUrl" alt="" class="" width="100%" />
      </div>

      <div class="lyric_box" ref="lyricBox">
        <div class="lyric_scroll" ref="lyrics">
          <div
            class="lyric"
            :class="currentLyric === index ? 'active' : ''"
            v-for="(lyric, index) in lyrics"
            :key="index"
          >
            <p>{{ lyric.words }}</p>
            <p v-if="lyric.twords !== ''">{{ lyric.twords }}</p>
          </div>
        </div>
      </div>
    </mu-container>

    <div class="footer">
      <div class="prograss">
        <span>{{ $utils.formatTime(currentTime) }}</span>
        <mu-slider
          @change="musicRate"
          class="demo-slider"
          thumb-color="white"
          v-model="precent"
          display-value
        ></mu-slider>
        <span>{{ $utils.formatTime(currentMusic.dt / 1000 || 0) }}</span>
      </div>
      <div class="btns">
        <mu-icon
          @click="chooseType"
          :value="type[playType]"
          color="#ffffff"
          size="32"
        ></mu-icon>
        <mu-icon
          @click="prevMusic"
          value="skip_previous"
          color="#ffffff"
          size="32"
        ></mu-icon>
        <mu-icon
          @click="isPlay"
          :value="playing ? 'pause_circle_outline' : 'play_circle_outline'"
          color="#ffffff"
          size="52"
        ></mu-icon>
        <mu-icon
          @click="nextMusic"
          value="skip_next"
          color="#ffffff"
          size="32"
        ></mu-icon>
        <mu-icon value="queue_music" color="#ffffff" size="32"></mu-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Music",
  computed: {
    ...mapState(["currentMusic", "playType", "lyrics"])
  },
  props: {
    currentTime: {
      type: Number,
      default: 0
    },
    playing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      precent: 0,
      type: ["shuffle", "repeat", "repeat_one"],
      type_index: this.playType,
      currentLyric: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.currentMusic.dt);
      console.log(this.playType);
      console.log(this.lyrics);
    });
  },
  methods: {
    closeSelf() {
      console.log("Im coming");
      this.$emit("closeDialog");
    },
    isPlay() {
      this.$emit("isplay");
    },
    chooseType() {
      console.log(parseInt(this.playType) === this.type.length - 1);
      let x =
        parseInt(this.playType) === this.type.length - 1
          ? 0
          : this.playType + 1;
      console.log("playType ===> " + x);
      this.$store.commit("setPlayType", x);
    },
    musicRate(value) {
      let currentTime = (this.currentMusic.dt / 1000) * (value / 100);
      this.$emit("updateCurrentTime", currentTime);
    },
    prevMusic() {
      this.$emit("prev");
    },
    nextMusic() {
      this.$emit("next");
    },
    lyricScroll(currentTime) {
      let _this = this;
      let flag = false;
      try {
        this.lyrics.forEach((element, index) => {
          if (currentTime < element.time / 1000) {
            _this.currentLyric = index - 1;
            // console.log("index ===> " + index);
            // console.log("offsetTop ===> " + _this.$refs.lyrics.childNodes[index - 1].offsetTop);
            // console.log("clientHeight ===> " + _this.$refs.lyricBox.clientHeight / 2);
            _this.$refs.lyrics.style.top = _this.$refs.lyricBox.clientHeight / 2 - _this.$refs.lyrics.childNodes[index - 1].offsetTop + 'px' || 0;
            flag = true;
            throw new Error("ended");
          }
        });
      } catch (e) {
        if (e.message !== "ended") throw e;
      }

      if (!flag) {
          _this.currentLyric = _this.$refs.lyrics.childNodes.length - 1;
          _this.$refs.lyrics.style.top = _this.$refs.lyricBox.clientHeight / 2 - _this.$refs.lyrics.childNodes[_this.$refs.lyrics.childNodes.length - 1].offsetTop + 'px'
      }
    }
  },
  watch: {
    currentTime(newValue, oldValue) {
      this.currentTime = newValue;
      this.precent = (this.currentTime / (this.currentMusic.dt / 1000)) * 100;
      this.lyricScroll(this.currentTime);
    }
  }
};
</script>
<style lang="scss">
.music {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  & .img_bg {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .mu-appbar {
    &-title {
      height: 100%;
      line-height: normal;
      font-size: 18px;

      .d-flex {
        height: 100%;
      }

      .singers {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.68);
        line-height: 14px;
      }
    }
  }

  .container {
    flex: 1;
    position: relative;
    z-index: 99;
    overflow: hidden;
    .music_img {
      display: none;
      width: 240px;
      height: 240px;
      padding: 5px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -180px;
      margin-left: -125px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.6);

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
    .lyric_box {
      //   display: none;
      overflow: hidden;
      text-align: center;
      position: relative;
      height: 100%;
      .lyric_scroll {
        position: absolute;
        top: 50%;
        width: 100%;
        .lyric {
          padding: 5px 0;
          color: #ffffff;
          font-size: 15px;
          opacity: 0.5;
          &.active {
            opacity: 1;
          }
        }
      }
    }
  }

  .footer {
    width: 100%;
    height: 100px;
    padding: 0 8px;
    position: relative;
    z-index: 99;
    .prograss {
      // padding: 0 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ffffff;

      span {
        font-size: 12px;
      }

      .mu-slider {
        margin-bottom: 0;
        margin: 0 10px;

        &-display-value {
          display: none;
        }

        &-track {
          height: 2px;
        }

        &-thumb {
          width: 8px;
          height: 8px;
        }
      }
    }

    .btns {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
    }
  }
}

// .music {
//   .mu-appbar {
//     position: fixed;
//     left: 0;
//     top: 0;
//   }

//   .container {
//     position: relative;
//     top: 56px;
//     z-index: 99;
//     height: calc(100% - 56px);
//     display: flex;
//     flex-direction: column;
//     .content {
//       flex: 1;
//       position: relative;

//     }
//   }
// }

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
