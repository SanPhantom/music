var getMusicStatus = function(_this, musicId, callback) {
    _this.$axios.get('/check/music', {
        params: {
            id: musicId
        }
    }).then((res) => {
        const data = res.data;
        callback(data)
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
                    if (data.code === 200) {
                        callback(data);
                    }
                })
            } else {
                console.log(evt.message);
            }
        })
    }
}
