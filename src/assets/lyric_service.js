let getLyric = function(_this, musicId, callback) {
    _this.$axios.get('/lyric', {
        params: {
            id: musicId
        }
    }).then((res) => {
        let data = res.data;
        console.log(data);
        let lyric = formatLyric(data.lrc.lyric, data.tlyric.lyric);
        console.log(lyric);
        callback(lyric);
    }).catch((err) => {
        _this.$toast.message(err.response);
    })
}

let formatLyric = function(lyricString, tlyricString) {
    let lyricArr = lyricString.split("\n");
    let pattern = /\[\d{2}:\d{2}.\d{2,3}\].+/;
    let lyricObj = lyricArr.filter(x => pattern.test(x)).map(x => x.substring(1).split("]"));
    let lyric = lyricObj.map(x => ({ time: formatTime(x[0]), words: x[1].trim() }));
    if (tlyricString !== null) {
        let tlyricArr = tlyricString.split("\n");

        let tlyricObj = tlyricArr.filter(x => pattern.test(x)).map(x => x.substring(1).split("]"));
        let tlyric = tlyricObj.map(x => ({ time: formatTime(x[0]), words: x[1].trim() }));

        lyric.forEach((item, index) => {
            let t = tlyric.filter(x => x.time === item.time) || null;
            if (t.length === 0) {
                item.twords = "";
            } else {
                item.twords = t[0].words;
            }
        })
    } else {
        lyric.forEach(item => {
            item.twords = "";
        })
    }
    return lyric;
}

let formatTime = function(time) {
    let timeArr = time.split(/[-:.]/);
    let t = timeArr.map(x => parseInt(x));
    return (t[0] * 60 + t[1]) * 1000 + t[2];
}

export default {
    getLyric
};