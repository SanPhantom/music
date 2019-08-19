var getMusicStatus = function(_this, musicId, callback) {
    _this.$axios.get('/check/music', {
        params: {
            id: musicId
        }
    }).then((res) => {
        const data = res.data;
        callback(data)
    }).catch((err) => {
        _this.$toast.message(err.response.data.message);
        _this.nextMusic();
    })
}

module.exports = {
    getMusicUrl: (_this, musicId, callback) => {
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
                    if (data.code === 200 && data.data[0].url !== null) {
                        callback(data);
                    } else {
                        _this.$toast.message("亲爱的，暂无版权");
                    }
                })
            } else {
                _this.nextMusic();
            }
        })
    }
}
