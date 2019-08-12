<template>
  <div class="hello">
    <mu-carousel hide-controls>
      <template slot="indicator" style="margin-top: 20px" slot-scope="{ index, active }">
        <mu-button
          icon
          class="mu-carousel-indicator-button"
          :class="{'mu-carousel-indicator-button__active': active}"
          @click="changeActive(index)"
        >
          <span class="mu-carousel-indicator-icon"></span>
        </mu-button>
      </template>
      <mu-carousel-item v-for="(banner, index) in banners" :key="index">
        <div class="carousel-info">
          <img :src="banner.pic || banner.imageUrl" width="100%" />
          <div class="tag" :style="{backgroundColor: banner.titleColor}">
            <span>{{banner.typeTitle}}</span>
          </div>
        </div>
      </mu-carousel-item>
    </mu-carousel>

    <div class="functions">
      <div class="function" v-for="(func, index) in functions" :key="index">
        <mu-avatar color="#f32121">
          <mu-icon :value="func.icon" color="#ffffff"></mu-icon>
        </mu-avatar>
        <span>{{func.message}}</span>
      </div>
    </div>

    <mu-divider></mu-divider>

    <div class="recommend-song-list">
      <div class="title">
        <span class="title-desc">推荐歌单</span>
        <mu-chip color="transparent" text-color="black">歌单广场</mu-chip>
      </div>

      <div class="song-list" v-if="songList.length == 6">
        <div
          class="song-list-item"
          v-for="(item) in songList"
          :key="item.id"
          @click="listDetail(item)"
        >
          <div class="song-list-itemImg">
            <img :src="item.picUrl" alt width="100%" />
            <div class="playCount">
              <mu-icon size="16" value="play_arrow" color="white"></mu-icon>
              {{$utils.unitConvert(item.playCount, 1)}}
            </div>
          </div>
          <div class="song-list-itemDesc">
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VueAplayer from "vue-aplayer";
export default {
  name: 'HelloWorld',
  // components: {
  //   aplayer: VueAplayer
  // },
  data () {
    return {
      banners: [],
      songList: [],
      active: 0,
      functions: [
        {
          icon: 'date_range',
          message: '每日推荐'
        },
        {
          icon: 'radio',
          message: '私人FM'
        },
        {
          icon: 'equalizer',
          message: '排行榜'
        },
        {
          icon: 'library_music',
          message: '歌单'
        },
        {
          icon: 'headset_mic',
          message: '电台'
        }
      ]
    }
  },
  created () {
    // console.log(navigator);
    // 判断手机型号
    let ua = navigator.userAgent
    let os = 0
    if (ua.match('Android')) {
      os = 1
    } else if (ua.match('iPhone')) {
      os = 2
    } else if (ua.match('iPad')) {
      os = 3
    }

    this.getBanners(this, os)
    this.getSongList(this)
  },
  methods: {
    changeActive (index) {
      this.active = index
    },
    // 获取banner图
    getBanners (_this, os) {
      this.$axios
        .get('/banner', {
          params: {
            type: os
          }
        })
        .then(res => {
          // console.log(res);
          const data = res.data
          _this.banners = data.banners
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 获取歌单
    getSongList (_this) {
      this.$axios
        .get('/personalized', {
          params: {
            limit: 6
          }
        })
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            var result = data.result
            console.log(_this.songList)

            result.forEach(item => {
              _this.songList.push(item)
            })

            console.log(_this.songList)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    listDetail (item) {
      this.$router.push({
        name: 'playlist',
        params: {
          list_id: item.id
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mu-carousel {
  // height: 145px;
  margin-top: 10px;
  height: calc(355px * 145 / 375);

  .mu-carousel-item {
    padding: 0 10px;

    & > .carousel-info {
      border-radius: 15px;
      width: 100%;
      height: 100%;
      position: relative;
      font-size: 0;

      & > img {
        border-radius: 8px;
        height: 100%;
      }

      & > .tag {
        position: absolute;
        right: 0;
        bottom: 0;
        color: #fff;
        padding: 5px 8px;
        border-radius: 8px 0 8px 0;
        font-size: 12px;
      }
    }
  }

  .mu-carousel-indicator-button {
    width: 8px;
    height: 8px;
    padding: 0;
    margin: 0 4px;
    margin-top: 20px;
  }

  .mu-carousel-indicator-icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 50%;
    opacity: 0.5;
    -webkit-transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .mu-carousel-indicator-button__active .mu-carousel-indicator-icon {
    opacity: 1;
  }
}

.functions {
  margin-top: 20px;
  margin-bottom: 15px;
  display: flex;
  padding: 0 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  .function {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > span {
      margin-top: 8px;
      font-size: 12px;
    }
  }
}

.recommend-song-list {
  margin-top: 20px;
  padding: 0 10px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-desc {
      color: #000000;
      font-size: 20px;
    }

    .mu-chip {
      font-size: 12px;
      letter-spacing: 1px;
      padding: 0 10px;
      line-height: 22px;
      border: 1px solid #000000;
    }
  }

  .song-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;

    &-item {
      width: 110px;
      margin-top: 10px;

      &Img {
        font-size: 0;
        width: 110px;
        height: 110px;
        background-color: rgba(0, 0, 0, 0.3);
        position: relative;

        .playCount {
          position: absolute;
          right: 0;
          top: 0;
          padding: 0 10px;
          line-height: 20px;
          font-size: 12px;
          color: white;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          height: 30px;
          background: linear-gradient(
            top,
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0)
          );
        }
      }

      &Desc {
        height: 36px;
        margin: 10px 0;

        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
