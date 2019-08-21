<template>
  <div class="search">
    <mu-appbar color="#f32121">
      <mu-button icon slot="left">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <mu-text-field
        v-model="searchWord"
        color="white"
        full-width
        underline-color="#ffffff"
        placeholder="心如止水 最近很火哦"
        :action-icon="searchWord.length >= 1 ? 'clear' : ''"
        @keypress="selectKeyWord"
      ></mu-text-field>
      <mu-button icon slot="right">
        <mu-icon value="person"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-container>
      <div class="history-words" v-if="history.length != 0">
        <div class="sub-title">
          <mu-sub-header>历史记录</mu-sub-header>
          <mu-icon value="delete" color="grey" @click="removeHistory"></mu-icon>
        </div>

        <div class="chipes">
          <mu-chip v-for="(item, index) in history" :key="index">{{
            item
          }}</mu-chip>
        </div>
      </div>
      <div class="hot-search">

      </div>
    </mu-container>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchWord: "",
      iconShow: false,
      history: []
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  created() {
    this.history = JSON.parse(window.localStorage.getItem("history")) || [];
    console.log(this.history);
  },
  methods: {
    selectKeyWord(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        this.searchInfo();
      }
    },
    searchInfo() {
      this.history.push(this.searchWord);
      window.localStorage.removeItem("history");
      window.localStorage.setItem("history", JSON.stringify(this.history));
    },
    removeHistory() {
        window.localStorage.removeItem('history');
        this.history = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.mu-appbar {
  .mu-input {
    margin-bottom: 0;
  }
}
.container {
  .history-words {
    .sub-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .mu-sub-header {
        font-weight: bolder;
        font-size: 16px;
        color: #000000;
        padding-left: 0;
      }
    }
    .chipes {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      overflow: auto;
      padding: 10px 0;
      &::-webkit-scrollbar {
        display: none;
      }
      .mu-chip {
        margin: 0 5px;
      }
    }
  }
}
</style>
