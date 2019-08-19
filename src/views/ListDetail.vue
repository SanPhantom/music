<template>
    <div>
        <mu-appbar style="width: 100%;" color="transparent" ref="header">
            <mu-button icon slot="left">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            <span v-if="title_status === 0">歌单</span>
            <span v-else>{{songlist.name}}</span>

            <mu-button icon slot="right">
                <mu-icon value="search"></mu-icon>
            </mu-button>

            <mu-button icon slot="right">
                <mu-icon value="more_vert"></mu-icon>
            </mu-button>
        </mu-appbar>

        <div class="content">
            <img src="../assets/bg.jpg" alt class="bg-img" />
            <div class="list-info" ref="list">
                <div class="list-info-img">
                    <img :src="songlist.coverImgUrl" alt width="100%" />
                    <div class="playCount">
                        <mu-icon size="16" value="play_arrow" color="white"></mu-icon>
                        {{$utils.unitConvert(songlist.playCount, 1)}}
                    </div>
                </div>
                <div class="list-info-desc">
                    <div class="top">
                        <div class="title">
                            <p>{{songlist.name}}</p>
                        </div>
                        <div class="adaver">
                            <mu-chip color="transparent" text-color="#eeeeee">
                                <mu-avatar :size="24">
                                    <img v-if="typeof songlist.creator.avatarUrl !== 'undefined'" :src="songlist.creator.avatarUrl" />
                                </mu-avatar>
                                <span class="nickname">{{songlist.creator.nickname}}</span>
                                <mu-icon value="chevron_right"></mu-icon>
                            </mu-chip>
                        </div>
                    </div>
                    <div class="bottom">
                        <pre>{{songlist.description}}</pre>

                        <mu-icon value="chevron_right"></mu-icon>
                    </div>
                </div>
            </div>

            <div class="funcs" ref="funcs">
                <mu-bottom-nav>
                    <mu-bottom-nav-item :title="songlist.commentCount+''" icon="chat"></mu-bottom-nav-item>
                    <mu-bottom-nav-item :title="songlist.shareCount+''" icon="share"></mu-bottom-nav-item>
                    <mu-bottom-nav-item title="下载" icon="cloud_download"></mu-bottom-nav-item>
                    <mu-bottom-nav-item title="多选" icon="check_box"></mu-bottom-nav-item>
                </mu-bottom-nav>
            </div>

            <div class="music-list">
                <div class="controls">
                    <div class="play_all">
                        <mu-icon value="play_circle_outline" size="22"></mu-icon>
                        播放全部<span>(共{{songlist.trackCount}}首)</span>
                    </div>
                    <div class="collect">
                        <mu-button round color="#f32121">
                            <mu-icon value="add" size="18"></mu-icon>
                            收藏({{$utils.unitConvert(songlist.subscribedCount, 0)}})
                        </mu-button>
                    </div>
                </div>
                <div class="songs" ref="songs">
                    <mu-list textline="two-line">
                        <mu-list-item avatar button :ripple="false" @click="play_music(track, index)" v-for="(track, index) in songlist.tracks"
                            :key="track.id">
                            <mu-list-item-action class="number">
                                {{index + 1}}
                            </mu-list-item-action>
                            <mu-list-item-content :class="currentMusic.id === track.id ? 'active' : ''">
                                <mu-list-item-title>{{track.name}}<span v-if="track.alia.length">({{track.alia[0]}})</span></mu-list-item-title>
                                <mu-list-item-sub-title>
                                    <div class="singers">
                                        <span v-for="(ar, index) in track.ar" :key="ar.id">{{ar.name}}<i v-if="index != track.ar.length - 1">/</i></span>
                                    </div>
                                    <div class="con-line">-</div>
                                    <div class="album">
                                        <span>{{track.al.name}}</span>
                                    </div>
                                </mu-list-item-sub-title>
                            </mu-list-item-content>
                            <mu-list-item-action v-if="track.mv != 0">
                                <mu-button icon>
                                    <mu-icon value="music_video"></mu-icon>
                                </mu-button>
                            </mu-list-item-action>
                            <mu-list-item-action>
                                <mu-button icon>
                                    <mu-icon value="more_vert"></mu-icon>
                                </mu-button>
                            </mu-list-item-action>
                        </mu-list-item>
                    </mu-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    export default {
        name: "ListDetail",
        computed: {
            ...mapState(['current_index', 'playList', 'currentMusic'])
        },
        data() {
            return {
                songlist: {
                    creator: {},
                    tracks: []
                },
                list_id: 0,
                title_status: 1
            };
        },
        created() {
            this.list_id =
                this.list_id === 0 ? this.$route.params.list_id : this.list_id;

            if (this.list_id === 0 || typeof this.list_id === "undefined") {
                this.$router.push({
                    path: "/"
                });
            } else {
                this.getListInfo(this);
            }
        },

        mounted() {
            this.$nextTick(() => {
                this.initDom();
            });
        },

        beforeDestroy() {
            document.removeEventListener("scroll", this.listenDomScroll);
        },
        methods: {
            initDom() {
                document.addEventListener("scroll", this.listenDomScroll);
            },

            listenDomScroll() {
                if (this.$refs.list) {
                    let infoH = this.$refs.list.offsetHeight;
                    let funcsH = this.$refs.funcs.offsetHeight;
                    let _this = this;
                    var scrollTop =
                        document.documentElement.scrollTop || document.body.scrollTop;
                    if (scrollTop > 0) {
                        _this.$refs.header.$el.style.backgroundColor =
                            "rgba(169,96,124, " + scrollTop / infoH + ")";
                    } else {
                        _this.$refs.header.$el.style.backgroundColor = "rgba(169,96,124, 0)";
                    }

                    if (scrollTop >= infoH + funcsH) {
                        _this.$refs.songs.style.overflow = "auto";
                    } else {
                        _this.$refs.songs.style.overflow = "hidden";
                    }
                }
            },

            getListInfo(_this) {
                this.$axios
                    .get("/playlist/detail", {
                        params: {
                            id: _this.list_id
                        }
                    })
                    .then(res => {
                        const data = res.data;
                        if (data.code === 200) {
                            _this.songlist = data.playlist;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

            play_music(track, index) {
                console.log(this);
                let _this = this;
                this.$music.getMusicUrl(this, track.id, function(res) {
                    console.log(res);
                    track.music_url = res.data[0].url;
                    console.log(_this);
                    _this.$store.commit('setCurrentMusic', track);
                    // _this.$store.commit('setCurrentIndex', index);
                    _this.$store.commit('setMusicList', _this.songlist.tracks);
                    console.log(_this.$store.state.musicList);
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .mu-appbar {
        position: fixed;
        left: 0;
        top: 0;

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
        padding-top: 56px;

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
                        white-space: normal;

                        .nickname {
                            white-space: normal;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1;
                            overflow: hidden;
                            flex: 1;
                        }
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
            border-radius: 20px 20px 0 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;

            .controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 5px 10px 15px;

                .play_all {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 16px;

                    .mu-icon {
                        margin-right: 8px;
                    }

                    span {
                        font-size: 12px;
                        color: #999999;
                    }
                }

                .collect {
                    .mu-button {
                        font-size: 12px;

                        .mu-icon {
                            margin-right: 2px;
                        }
                    }
                }
            }

            .songs {
                flex: 1;
                overflow: hidden;

                &::-webkit-scrollbar {
                    display: none
                }

                .mu-list {
                    .mu-item {
                        &-content {
                            &.active {
                                .mu-item-title {
                                    color: rgba(243, 33, 33, .87)
                                }

                                .mu-item-sub-title {
                                    color: rgba(243, 33, 33, .54)
                                }
                            }
                        }

                        &-title {
                            font-size: 16px;
                        }

                        &-sub-title {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            font-size: 12px;

                            .con-line {
                                padding: 0 2px;
                            }
                        }

                        &-action {
                            min-width: 0;
                            margin-right: 0;
                            margin-left: 10px;

                            .mu-button {
                                padding: 0px;
                                width: auto;
                            }

                            &.number {
                                font-size: 14px;
                                margin-right: 16px;
                            }
                        }

                    }
                }
            }
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
