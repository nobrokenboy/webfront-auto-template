/**
 * Created by jessic on 2017/8/4.
 */
module.exports = {
    template: `<transition enter-active-class="animated fadeIn">
        <div class="loading-layer-wrapper"  v-show="isShowLoading">
            <div class="loading-layer-content">
                <i class="icon-btn icon-btn-loading loading-animate"></i>
                <span  class="margin-left-10" v-if="dataType===0" >数据加载中，请稍等...</span>
                <span  class="margin-left-10" v-else>数据正在提交，请稍等...</span>
                <i class="icon-btn icon-btn-smile margin-left-10"></i>
            </div>
        </div>
    </transition>`,
    data(){
        return {

        }
    },
    watch:{

    },
    props:["isShowLoading","dataType"],
    created(){

    },
    mounted(){

    },
    methods:{

    }

}