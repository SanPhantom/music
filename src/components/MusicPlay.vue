<template>
    <mu-paper class="demo-paper" circle :z-depth="1">
        <mu-circular-progress class="demo-circular-progress" mode="determinate" :value="5.50" color="secondary" :stroke-width="2" :size="64"></mu-circular-progress>
    </mu-paper>
</template>

<script>
    export default {
        name: 'MusicPlay'

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
        .demo-circular-progress {
            transform:rotate(-90deg);
            -webkit-transform:rotate(-90deg);
        }
    }
</style>
