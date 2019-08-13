<template>
    <mu-paper class="demo-paper" circle :z-depth="1">
        <div class="img-box" :class="playing ? 'rotate' : ''">
            <img v-if="currentMusic.id" :src="current_music.al.picUrl" alt="" width="100%">
        </div>
        <mu-circular-progress class="demo-circular-progress" mode="determinate" :value="percent" color="secondary"
            :stroke-width="2" :size="64"></mu-circular-progress>
        <audio :src="currentMusic.music_url" ref="audio" autoplay="autoplay" style="display: none;"></audio>
    </mu-paper>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    export default {
        name: 'MusicPlay',
        computed: {
            ...mapState(['currentMusic'])

        },
        data() {
            return {
                percent: 0,
                playing: false
            }
        },
        mounted() {
            let _this = this;
            this.$nextTick(() => {
                let audio = this.$refs.audio;
                audio.addEventListener("timeupdate", function() {
                    _this.setPercent(this.currentTime);
                    _this.playing = true;
                });
                audio.addEventListener('ended', function() {
                    _this.percent = 0;
                    _this.playing = false;
                });
            })
        },
        methods: {
            ...mapMutations(['setMusicList']),
            setPercent(currentTime) {
                this.percent = Math.min(1, currentTime * 1000 / this.currentMusic.dt) * 100;
            }
        },
        watch: {
            current_music(newValue, oldValue) {
                const _this = this;
                console.log(newValue);
                setInterval(function() {
                    _this.setPercent();
                }, 500);
            }
        }

    }
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
                animation-duration: 5s;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
                animation: rotate 2s linear inherit;
                -webkit-animation: rotate 2s linear inherit;
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
