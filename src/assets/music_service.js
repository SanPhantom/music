var getMusicStatus = function(_this, music_id, callback) {
    _this.$axios.get('/check/music', {
        params: {
            id: music_id
        }
    }).then((res) => {
        const data = res.data;
        callback(data)
    })
}


module.exports = {
    getMusicUrl: (_this, music_id, callback) => {
        console.log(this);
        getMusicStatus(_this, music_id, function(evt) {
            if (evt.success) {
                // this.music_br = music_br || 999000;
                _this.$axios.get('/song/url', {
                    params: {
                        id: music_id,
                        // br: this.music_br
                    }
                }).then((res) => {
                    const data = res.data;
                    if (data.code == 200) {
                        callback(data);
                    }
                })
            } else {
                console.log(evt.message);
            }
        })


    },


}
