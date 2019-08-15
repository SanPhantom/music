<template>
    <div id="app">
        <router-view />
        <music-play v-if="currentMusic.id != -1"></music-play>
    </div>
</template>

<script>
    import MusicPlay from './components/MusicPlay.vue'
    import {
        mapState
    } from 'vuex'
    export default {
        name: 'App',
        components: {
            MusicPlay
        },
        computed: {
            ...mapState(['currentMusic'])
        },
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }
</style>
