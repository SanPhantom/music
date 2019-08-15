var getMusicStatus = function(_this, musicId, callback) {
    _this.$axios.get('/check/music', {
        params: {
            id: musicId
        }
    }).then((res) => {
        console.log(res);
        const data = res.data;
        callback(data)
    }).catch((err) => {
        console.log(err.response.data.message);
        _this.$toast.message(err.response.data.message);
        console.log(_this.$store.state.playList);
    })
}

module.exports = {
    getMusicUrl: (_this, musicId, callback) => {
        console.log(this);
        getMusicStatus(_this, musicId, function(evt) {
            if (evt.success) {
                // this.music_br = music_br || 999000;
                _this.$axios.get('/song/url', {
                    params: {
                        id: musicId
                        // br: this.music_br
                    }
                }).then((res) => {
                    const data = res.data;
                    console.log(data.data[0].url);
                    console.log(typeof data.data.url !== "undefined");
                    if (data.code === 200 && data.data[0].url !== null) {
                        console.log("进来了");
                        callback(data);
                    } else {
                        _this.$toast.message("亲爱的，暂无版权");
                    }
                })
            } else {

            }
        })
    }
}
