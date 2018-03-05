import Vue from "vue";
var bus = new Vue();
module.exports = {
    template:`<div class="mult-select-wrapper" :class="[uIdClassName]" >
        <div type="button" class="select-button" @click.prevent.stop="change($event)" >
            <div class="text-wrapper">
                 <a class="show-init-value" v-if="isInit&&isMult">{{initValue}}</a>
                 <a class="mult-tags" v-for="value in activeText" v-else>
                     <span>{{value.text}}</span>
                    <!-- <i class="icon-delete"@click="delectOptions(value)">
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path fill="#fff" d="M572.633359 511.999999 1009.831801 73.205942c15.956148-15.956148 15.956148-43.081598 0-60.633361s-43.081598-15.956148-60.633361 0L511.999999 451.366638 73.205942 14.168196c-15.956148-15.956148-43.081598-15.956148-60.633361 0s-15.956148 43.081598 0 60.633361L451.366638 511.999999 14.168196 950.794056c-15.956148 15.956148-15.956148 43.081598 0 60.633361s43.081598 15.956148 60.633361 0L511.999999 572.633359l438.794057 438.794057c15.956148 15.956148 43.081598 15.956148 60.633361 0s15.956148-43.081598 0-60.633361L572.633359 511.999999z"></path></svg>
                     </i>-->
                </a>
            </div>
            <i class="icon-slide-down" ></i>
        </div>
        <!--<select name="options" :multiple="isMult" v-model="value" style="display:none;"></select>-->
        <ul class="slide-down-menu" :style="{'z-index':zindex}" v-if="isMult==true&&isChoose==true">
            <li v-for="item in options" :data-value="item.value" @click.prevent.stop="chooseMultItem(item)" :class="{'mult-active':item.isActive}" >
               <span> {{item.text}}</span>
               <i class="icon-check"></i>
            </li>
        </ul>
         <ul class="slide-down-menu" :style="{'z-index':zindex}" v-if="isMult==false&&isChoose==true">
             <li v-for="item in options" :data-value="item.value" @click.prevent.stop="chooseItem(item)" :class="{'active':item.isActive}" >
               <span> {{item.text}}</span>
               <i class="icon-check"></i>
            </li>
        </ul>
    </div>`,
    props:{
        isMult:{
            type:Boolean,
            default:false
        },
        placeholder:{
            type:String,
            defalut:"全部"
        },
        options:{
            type:Array,
            default:[]
        },
        zindex:{
            type:Number,
            default:10
        },
        value:{

        },
        initValue:{
            type:String,
            default:"全部"
        },
        // refValue:{//区分辨别组件的
        //     type:String,
        //     require:true
        // }

    },
    data(){
      return {
          isInit:true,
          activeText:[],
          isChoose:false,
          returnArray:[],
          returnVal:"",
          uIdClassName:""
      }
    },
    mounted() {
        this.dealValue();
        this.cancelSlide();
        // $(".mult-select-wrapper").addClass(this.refValue);
        this.uIdClassName=this._uid.toString();
        // console.log(this._uid);
        bus.$on('send',(uIdClassName)=>{//非父子通讯
          if(this.uIdClassName!=uIdClassName){
                this.isChoose=false;
          }
        });
    },
    methods:{
        handleClickOut(event){//点击其他地方隐藏
            if($(event.target).parents(".mult-select-wrapper").length == 0){
                //隐藏元素
                this.isChoose=false;
            }
        },
        dealValue(){//处理数据
            const valueType=typeof this.value;
            let tempArray=[];
            if(this.isMult){//多选
                if(valueType=='string'){
                    if(this.value.indexOf(";")>-1){//多个值时
                        tempArray=this.value.split(";");
                        let arrTemp=[];

                        this.options.forEach((item)=>{
                            item.isActive=false;
                        });
                        tempArray.forEach((item)=>{
                            arrTemp=this.options.find((menu)=>{
                                if(menu.value===item){
                                    menu.isActive=true;
                                }
                                return menu.value==item;

                            });
                            this.activeText.push(arrTemp)
                        });
                        console.log(this.activeText);


                    }else{//一个值时
                        this.options.forEach((item)=>{
                            if(item.value===this.value){
                                item.isActive=true;
                            }else{
                                this.isActive=false;
                            }
                        });
                        this.activeText=this.options.filter((menu)=>{
                            return menu.value==this.value;
                        });
                        /*if(this.value==""){//意味着选了全部

                            console.log(this.options);
                            console.log(typeof this.options);
                            this.options.forEach((a)=>{
                                a.isActive=true;
                                console.log(a);

                            });
                            this.activeText=this.options;

                        }else{

                            this.options.forEach((item)=>{
                                if(item.value===this.value){
                                    item.isActive=true;
                                }else{
                                    this.isActive=false;
                                }
                            });
                            this.activeText=this.options.filter((menu)=>{
                                return menu.value==this.value;
                            });
                        }*/

                    }
                }
            }else{//单选
                this.options.forEach((item)=>{
                   if(item.value===this.value){
                       item.isActive=true;
                   }else{
                       this.isActive=false;
                   }
                });
                this.activeText=this.options.filter((menu)=>{
                    return menu.value==this.value;
                });
            }
        },
        change(event){
            this.isChoose=!this.isChoose;
            bus.$emit("send",this.uIdClassName);
        },
        cancelSlide(){//点击空白处隐藏
            document.body.addEventListener("click",(event)=>{
                this.isChoose=false;
                // let targetClass="."+this.uIdClassName;
                // if($(event.target).parents(targetClass).length == 0||!$(event.target).hasClass(targetClass)){
                //     //隐藏元素
                //     this.isChoose=false;
                //
                // }
            });
            //

        },
        chooseMultItem(item){
            this.isInit=false;
            item.isActive=!item.isActive;
            if(item.isActive){
                this.activeText.push(item);
            }else{
                this.activeText.forEach((menu,key)=>{
                    if(menu.value==item.value){
                        this.activeText.splice(key,1);
                    }
                });

            }
            this.returnArray=[];
            this.returnVal="";
            this.activeText.forEach((item)=>{
                this.returnArray.push(item.value);
            });

            this.returnVal=this.returnArray.join(";");
            if(this.returnVal==""){
                this.isInit=true;
            }
            this.$emit('input', this.returnVal);

        },
        chooseItem(item) { //选中
            this.activeText=[];
            this.options.forEach((menu,index)=>{
                   if(menu.value==item.value){
                       menu.isActive=true;
                   }else{
                       menu.isActive=false;
                   }
            });

            this.activeText.push(item);
            this.isChoose=!this.isChoose;
            this.$emit('input',item.value);
        },

       /* delectOptions(item){//删除选项
            this.activeText=this.options.filter(()=>{

            });
        }*/
    }
}