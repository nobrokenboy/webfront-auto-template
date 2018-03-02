module.exports = {
    template:`<div class="ui-loadmore">
        <!--头部-->
        <div class="ui-loadmore_header"></div>
        <!--内容-->
        <div class="ui-loadmore_body">
            <slot name="loadmoreBody"></slot>
        </div>
        <!--脚步-->
        <div class="ui-loadmore_footer">
              <p class="warm-msg-tip" align="center" v-if="isHasLoading">
                <i class="iconfont f24 loading-animate loading-layer icon-btn-loading-1"></i>
                <span>加载刷新中...</span>
              </p>
              <p class="warm-msg-tip f12 padding-bottom-10" align="center" v-if="isFinished">已经加载到底了O(∩_∩)O~！</p>
        </div>
    </div>`,
    props:{
        "isHasLoading":{
            type:Boolean,
            default:true
        },
        "isFinished":{
            type:Boolean,
            default:false
        },
        "datas":{
            type:Array,
            require:false,
            default: []
        },
        contentWrapper:{//内容的id
            type:String
        }
    },
    data(){
        return {
            screenHeight: $(window).height(),
            dataLists:[]
        }

    },
    watch:{
        datas(nVal,oVal){
           this.dataLists=nVal;
        },
        dataLists(nVal,oVal){
            //console.log("进入中");
            const self=this;
            // const screenHeight=$(window).height();//可见区域
            self.$nextTick(()=>{
                self.contentHeight=$("#"+self.contentWrapper).height();//内容区域
                // console.log(self.contentHeight);
                //判断内容高度是否小于屏幕高度
                if(self.contentHeight<=self.screenHeight){
                    self.loadmore();
                }
            });
        }
    },
    mounted(){
        const self=this;
        self.dataLists=self.datas;
        $(window).on("scroll",function(){
            const $this=$(this),
                scrollTop=$this.scrollTop();
            self.contentHeight=$(document).height();//内容区域
            const dis=self.contentHeight-self.screenHeight-scrollTop;
            if(dis<10&&!self.isFinished&&!self.isHasLoading){//底部距离小于10,未加载完成以及不能在加载中
                self.loadmore();
            }

        });
    },
    methods:{
        loadmore(){//触发load
            this.$emit('load');
        },
    }
};
