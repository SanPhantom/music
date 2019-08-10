<template>
  <div>
    <mu-appbar style="width: 100%;" color="transparent">
      <mu-button icon slot="left">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <span v-if="title_status === 0">歌单</span>
      <span v-else>{{playlist.name}}</span>

      <mu-button icon slot="right">
        <mu-icon value="search"></mu-icon>
      </mu-button>

      <mu-button icon slot="right">
        <mu-icon value="more_vert"></mu-icon>
      </mu-button>
    </mu-appbar>

    <div class="content">
      <img src="../assets/bg.jpg" alt class="bg-img" />
      <div class="list-info">
        <div class="list-info-img">
          <img :src="playlist.coverImgUrl" alt width="100%" />
          <div class="playCount">
            <mu-icon size="16" value="play_arrow" color="white"></mu-icon>
            {{playlist.playCount}}
          </div>
        </div>
        <div class="list-info-desc">
          <div class="top">
            <div class="title">
              <p>{{playlist.name}}</p>
            </div>
            <div class="adaver">
              <mu-chip color="transparent" text-color="#eeeeee">
                <mu-avatar :size="24">
                  <img v-if="typeof playlist.creator.avatarUrl !== 'undefined'" :src="playlist.creator.avatarUrl" />
                </mu-avatar>
                {{playlist.creator.nickname}}
                <mu-icon value="chevron_right"></mu-icon>
              </mu-chip>
            </div>
          </div>
          <div class="bottom">
            <pre>{{playlist.description}}</pre>

            <mu-icon value="chevron_right"></mu-icon>
          </div>
        </div>
      </div>

      <div class="funcs">
        <mu-bottom-nav>
          <mu-bottom-nav-item :title="playlist.commentCount+''" icon="chat"></mu-bottom-nav-item>
          <mu-bottom-nav-item :title="playlist.shareCount+''" icon="share"></mu-bottom-nav-item>
          <mu-bottom-nav-item title="下载" icon="cloud_download"></mu-bottom-nav-item>
          <mu-bottom-nav-item title="多选" icon="check_box"></mu-bottom-nav-item>
        </mu-bottom-nav>
      </div>

      <div class="music-list"></div>
    </div>
  </div>
</template>

<script>
// window.onscroll = function () {
//   var scrollTop = document.documentElement.scrollTop || document.body.scrollTop

//   var infoH = document.getElementsByClassName('list-info')[0].clientHeight
//   console.log(scrollTop / infoH)
//   if (scrollTop > 0) {
//     document.getElementsByClassName('mu-appbar')[0].style.backgroundColor =
//       'rgba(169,96,124, ' + scrollTop / infoH + ')'
//     // document.getElementsByClassName('mu-appbar')[0].style.opacity = scrollTop / info_H;
//   } else {
//   }
// }
export default {
  name: 'ListDetail',
  data () {
    return {
      playlist: {
        creator: {}
      },
      list_id: 0,
      title_status: 1
    }
  },
  created () {
    console.log(this.list_id)
    this.list_id =
      this.list_id === 0 ? this.$route.params.list_id : this.list_id
    console.log(this.list_id)
    if (this.list_id === 0 || typeof this.list_id === 'undefined') {
      this.$router.push({
        path: '/'
      })
    } else {
      this.getListInfo(this)
    }
  },
  methods: {
    getListInfo (_this) {
      this.$axios
        .get('/playlist/detail', {
          params: {
            id: _this.list_id
          }
        })
        .then(res => {
          const data = res.data
          console.log(data)
          if (data.code === 200) {
            // data.playlist.description = data.playlist.description.replace('\n', '<br />');
            console.log(data.playlist.description)
            var playCount = this.$utils.unitConvert(data.playlist.playCount)
            data.playlist.playCount = playCount.num + playCount.unit
            _this.playlist = data.playlist
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
.mu-appbar {
  &-title {
    padding-left: 0;
    font-size: 16px;
  }

  .mu-item-sub-title {
    color: rgba(255, 255, 255, 0.5);
  }

  .mu-icon-button {
    width: auto;
    height: auto;
    padding: 8px;
  }

  &.mu-elevation-4 {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}

.content {
  .list-info {
    padding: 20px;
    display: flex;
    flex-wrap: nowrap;

    &-img {
      font-size: 0;
      width: 130px;
      height: 130px;
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
        background: linear-gradient(top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
      }
    }

    &-desc {
      flex: 1;
      height: 130px;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;

      .top {
        .title {
          color: #ffffff;
          font-size: 17px;
          font-weight: bold;

          p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }

        .mu-chip {
          margin-top: 8px;
        }
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #ffffff;

        pre {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        // .p-box {
        //   display: -webkit-box;
        //   -webkit-box-orient: vertical;
        //   -webkit-line-clamp: 2;
        //   overflow: hidden;
        //   p {
        //     font-size: 12px;
        //   }
        // }
      }
    }
  }

  .funcs {
    .mu-bottom-nav {
      background-color: transparent;
    }
    .mu-bottom-item {
      color: #ffffff;
    }
    .mu-bottom-item-active {
      color: #ffffff;
      .mu-bottom-item-text {
        font-size: 12px;
      }
    }
  }

  .music-list {
    width: 100%;
    height: calc(100vh - 56px);
    background-color: #ffffff;
  }

  .bg-img {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
  }
}
</style>
