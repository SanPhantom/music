<template>
    <div class="music">
        <img src="../assets/music_bg.jpg" alt="" class="img_bg" />
        <mu-appbar style="width: 100%;" color="transparent">
            <mu-button icon slot="left" @click="closeSelf()">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            <mu-flex slot="default" direction="column" justify-content="center">
                <span>{{currentMusic.name}}</span>
                <div class="singers">
                    <span v-for="(ar, index) in currentMusic.ar" :key="ar.id">{{ar.name}}<i v-if="index != currentMusic.ar.length - 1">/</i></span>
                </div>
            </mu-flex>
            <mu-button flat slot="right">
                <mu-icon value="share"></mu-icon>
            </mu-button>
        </mu-appbar>
        <mu-container>
            <div class="music_img" :class="playing ? 'rotate' : ''">
                <img :src="currentMusic.al.picUrl" alt="" class="" width="100%">
            </div>

            <div class="footer">
                <div class="prograss">
                    <span>{{$utils.formatTime(currentTime)}}</span>
                    <mu-slider @change="musicRate" class="demo-slider" thumb-color="white" v-model="precent"
                        display-value></mu-slider>
                    <span>{{$utils.formatTime((currentMusic.dt/1000) || 0)}}</span>
                </div>
                <div class="btns">
                    <mu-icon @click="chooseType" :value="type[playType]" color="#ffffff" size="32"></mu-icon>
                    <mu-icon @click="prevMusic" value="skip_previous" color="#ffffff" size="32"></mu-icon>
                    <mu-icon @click="isPlay" :value="playing ? 'pause_circle_outline' : 'play_circle_outline'" color="#ffffff"
                        size="52"></mu-icon>
                    <mu-icon @click="nextMusic" value="skip_next" color="#ffffff" size="32"></mu-icon>
                    <mu-icon value="queue_music" color="#ffffff" size="32"></mu-icon>
                </div>
            </div>
        </mu-container>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    export default {
        name: "Music",
        computed: {
            ...mapState(['currentMusic', 'playType'])
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
                type: ['shuffle', 'repeat', 'repeat_one'],
                type_index: this.playType
            }
        },
        mounted() {
            this.$nextTick(() => {
                console.log(this.currentMusic.dt);
                console.log(this.playType);
            })
        },
        methods: {
            closeSelf() {
                console.log("Im coming")
                this.$emit('closeDialog');
            },
            isPlay() {
                this.$emit('isplay');
            },
            chooseType() {
                console.log(parseInt(this.playType) === this.type.length - 1);
                let x = parseInt(this.playType) === this.type.length - 1 ? 0 : this.playType + 1;
                console.log("playType ===> " + x);
                this.$store.commit('setPlayType', x);
            },
            musicRate(value) {
                let currentTime = (this.currentMusic.dt / 1000) * (value / 100);
                this.$emit('updateCurrentTime', currentTime);
            },
            prevMusic() {
                this.$emit('prev');
            },
            nextMusic() {
                this.$emit('next');
            }
        },
        watch: {
            currentTime(newValue, oldValue) {
                this.currentTime = newValue;
                this.precent = this.currentTime / (this.currentMusic.dt / 1000) * 100;
            }
        }
    }
</script>
<style lang="scss">
    .music {
        & .img_bg {
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1;
        }

        .mu-appbar {
            position: fixed;
            left: 0;
            top: 0;

            &-title {
                height: 100%;
                line-height: normal;
                font-size: 18px;

                .d-flex {
                    height: 100%;
                }

                .singers {
                    font-size: 12px;
                    color: rgba(255, 255, 255, .68);
                    line-height: 14px;
                }
            }
        }

        .container {
            position: relative;
            top: 56px;
            z-index: 99;

            .music_img {
                width: 240px;
                height: 240px;
                padding: 5px;
                position: fixed;
                top: 50%;
                left: 50%;
                margin-top: -180px;
                margin-left: -125px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, .6);

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

            .footer {
                width: 100%;
                padding: 0 8px;
                position: fixed;
                bottom: 25px;
                left: 0;

                .prograss {
                    // padding: 0 8px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #FFFFFF;

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
