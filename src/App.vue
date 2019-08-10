<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.mu-appbar {
  position: fixed;
  left: 0;
  top: 0;
}

.content {
  padding-top: 56px;
}

.mu-tab {
  min-width: 0;
}

.mu-tab-active {
  font-size: 16px;
}

.mu-tab-link-highlight {
  display: none;
}

.login-info {
  width: 100%;
  height: 200px;
  background-color: #eaeaea;

  .no-login {
    width: 100%;
    height: 200px;

    p {
      line-height: 18px;
      color: #333333;
    }

    .mu-button {
      width: 120px;
      font-size: 12px;
      height: 28px;
      line-height: 28px;
      letter-spacing: 1px;
      margin-top: 18px;
    }
  }
}

.mu-list {
  .mu-item {
    .mu-item-action {
      min-width: 24px;
      margin-right: 15px;
    }
  }
}

.mu-divider {
  width: auto;
  margin: 0 16px;
}
</style>
