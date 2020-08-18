// 根组件
let vm = new Vue({
    el: "#app",
    data: {
        // 表单值
        msg: "",
        // 歌曲种类
        tooldata: "",
        // 歌曲id
        musicId: "",
        // 热评
        tops: "",
        // 图片
        imgs: "",
        // mv的ID
        idmv: "",
        // mv的路径
        vurl: "",
        // 显示隐藏
        isShow: false,
        // 歌曲路径
        pmu: "",
        ismuic: true,
    },
    methods: {
        toolWords() {
            // 歌曲种类
            if (this.msg.length > 0) {
                axios.get("https://apimusic.linweiqin.com/search", {
                    params: { keywords: this.msg }
                }).then(date => {
                    this.tooldata = date.result.songs
                    console.log(this.tooldata)
                }).catch(err => { alert(err) })
            } else {
                alert("请输入关键字")
            }

        },
        mplay(index) {
            this.musicId = index
            // 歌曲
            axios.get("https://apimusic.linweiqin.com/song/url", {
                params: { id: this.musicId }
            }).then(res => {
                this.pmu = res.data[0].url
            }).catch(err => {
                console.log(err)
            })
            // 热评
            axios.get("https://apimusic.linweiqin.com/comment/hot?type=0", {
                params: { id: this.musicId }
            }).then(res => {
                this.tops = res.hotComments
            })
            // 图片
            axios.get("https://apimusic.linweiqin.com/song/detail", {
                params: { ids: this.musicId }
            }).then(res => {
                this.imgs = res.songs[0].al.picUrl
            })
        },
        vplay(mvid) {
            this.idmv = mvid
            this.isShow = !this.isShow
            this.$refs.maut.pause();
            // 视频
            axios.get("https://apimusic.linweiqin.com/mv/url", {
                params: { id: this.idmv }
            }).then(res => {
                this.vurl = res.data.url
                console.log(this.vurl)
            })
        },
        close() {
            this.isShow = !this.isShow
            this.$refs.video.pause();
        },
        audioPause() {
            this.ismuic = !this.isShow
        }
    },
    mounted() {
        this.musicId = 514761281
        this.ismuic = true
        axios.interceptors.response.use(
            function (response) {
                return response.data
            },
            function (error) {
                return Promise.reject(error)
            }
        )
        // 歌曲种类
        axios.get("https://apimusic.linweiqin.com/search", {
            params: { keywords: "热门" }
        }).then(date => {
            this.tooldata = date.result.songs
        }).catch(err => { alert(err) })
        // 歌曲
        axios.get("https://apimusic.linweiqin.com/song/url", {
            params: { id: this.musicId }
        }).then(res => {
            this.pmu = res.data[0].url
        }).catch(err => {
            console.log(err)
        })
        // 热评
        axios.get("https://apimusic.linweiqin.com/comment/hot?type=0", {
            params: { id: this.musicId }
        }).then(res => {
            this.tops = res.hotComments
        })
        // 图片
        axios.get("https://apimusic.linweiqin.com/song/detail", {
            params: { ids: this.musicId }
        }).then(res => {
            this.imgs = res.songs[0].al.picUrl
        })
    }

})