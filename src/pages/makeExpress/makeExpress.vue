<template>
  <div>
      <!-- 发货人信息 -->
      <addAddress  ref="currentAddress"/>
      <!-- 收件人信息 -->
       <div class="recipients">
          <div class="name">
              <span>收件人：{{recipientsDesc.name}}</span> &nbsp;&nbsp;&nbsp;<span>{{recipientsDesc.phone}}</span>
          </div>
          <div class="address">
            收货地址：{{recipientsDesc.detailAddress}}
          </div>
       </div>
       <div>
          <van-cell title="选择快递" is-link :value="expressValue.expressName"  title-style="text-align: left;"  @click="showExpress=true"  class="expresscell"/>
            <van-popup v-model="showExpress"  position="bottom" >
                <van-picker
                  title="选择快递"
                  show-toolbar
                  :default-index="0"
                  :columns="columns"
                  value-key = "expressName"
                  @confirm="expressConfirm"
                  @cancel="onCancel"
              />
           </van-popup>
           <!-- 上门时间 -->
        <van-cell title="期望上门时间" is-link :value="faceDate" title-style="text-align: left" size="large" @click="()=>{isSelectDate=true}"  class="datecell"/>
         <van-popup v-model="isSelectDate" position="bottom">
        <div class="boxbtn">
           <div @click="cancel">取消</div>
           <div @click="confirm">确定</div>
         </div>
          <van-tree-select
              :items="items"
              :main-active-index="mainActiveIndex"
              :active-id="activeId"
              @navclick="onNavClick"
              @itemclick="onItemClick"
            />
         </van-popup>
       </div>
        <div class="btn" @click="submit">
            预约
        </div>
  </div>
</template>

<script>
import addAddress from './address' 
import {getDefaultCompany,listOrder,orderOnline} from '@/api'
import {formatDate,currentDateLater,getformatDate,getNowFormatDate,getafterDay,getafterTwoDay} from '@/utils'
var that
export default {
  components:{
      addAddress
  },
  data () {
    return {
        selectTime:'',
        selectDate:'',
         items:[],
        // 左侧高亮元素的index
        mainActiveIndex: '',
        // 被选中元素的id
        activeId: 1,
        columns: [],  //快递列表
        showExpress:false,  //展示快递
        expressValue:'', //快递
        recipientsDesc:'',
        minHour: 8,
        maxHour: 18,
        currentDate:'',
        faceDate:'',
        isSelectDate:false,
        startTime:"",
        endTime:""
    }
  },
  created(){
    var time=new Date().getHours()+1
    // console.log(time)
    if(time>=18){  //明天
        this.selectDate='明天'
        var itemList=[
          {
          // text:'明天'+(new Date().getMonth()+1) +'月'+(new Date().getDate()+1)+'日',
          text:'明天'+ getafterDay(new Date()),
          children:[
            {text:'9:00 -10:00',id:9},
            {text:'10:00 -11:00',id:10},
            {text:'11:00 -12:00',id:11},
            {text:'12:00 -13:00',id:12},
            {text:'13:00 -14:00',id:13},
            {text:'14:00 -15:00',id:14},
            {text:'15:00 -16:00',id:15},
            {text:'16:00 -17:00',id:16},
            {text:'17:00 -18:00',id:17}
          ]
          },
          {
          text:'后天'+getafterTwoDay(new Date()),
          children:[
            {text:'9:00 -10:00',id:9},
            {text:'10:00 -11:00',id:10},
            {text:'11:00 -12:00',id:11},
            {text:'12:00 -13:00',id:12},
            {text:'13:00 -14:00',id:13},
            {text:'14:00 -15:00',id:14},
            {text:'15:00 -16:00',id:15},
            {text:'16:00 -17:00',id:16},
            {text:'17:00 -18:00',id:17}
          ]
          }
        ]
        this.items=itemList
    }else{
        this.selectDate='今天'
        var itemList=[{
            // text: '今天'+(new Date().getMonth()+1) +'月'+new Date().getDate()+'日',
            text:'今天'+ getNowFormatDate(new Date()),
            children: []
          },
          {
          text:'明天'+getafterDay(new Date()),
          children:[
            {text:'9:00 -10:00',id:9},
            {text:'10:00 -11:00',id:10},
            {text:'11:00 -12:00',id:11},
            {text:'12:00 -13:00',id:12},
            {text:'13:00 -14:00',id:13},
            {text:'14:00 -15:00',id:14},
            {text:'15:00 -16:00',id:15},
            {text:'16:00 -17:00',id:16},
            {text:'17:00 -18:00',id:17}
          ]
          }]
          var arr=[]
            if(9<=time&&time<=17){
              for(var time;time<=17;time++){
                  var obj={
                    text:time+':00'+ '-' + (time+1)+':00',
                    id:time
                  }
                  arr.push(obj)
              }
            }
            itemList[0].children=arr
            this.items=itemList
    }
    
    // console.log(this.$route.params.id)
    //收件地址
    getDefaultCompany().then(res=>{
        // console.log(res.data.item)
        this.recipientsDesc=res.data.item
    })
    //预约快递公司
    listOrder().then(res=>{
        this.columns=res.data.items
        this.expressValue=res.data.items[0]
    })
  },
  methods:{
    onNavClick(index){
       if(index===0){
        //  this.selectDate='今天'
          var time=new Date().getHours()+1
          if(time>=18){  //明天
             this.selectDate='明天'
          }else{
             this.selectDate='今天'
          }
      }else {
        var time=new Date().getHours()+1
          if(time>=18){  //后天
             this.selectDate='后天'
          }else{
             this.selectDate='明天'
          }
      }
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.selectTime=data.text
      this.activeId = data.id;
    },
     //快递
   expressConfirm(value, index){
    this.expressValue=value
    this.showExpress=false
  },
    onCancel() {
      this.showExpress=false
    },
     //选择上门时间
      confirm(){
         if(this.selectDate&&this.selectTime){
          this.faceDate=this.selectDate + this.selectTime
          this.isSelectDate=false
           }else {
            this.$toast('请选择上门时间')
         }
      },
      cancel(){
          this.isSelectDate=false
      },
      submit(){
          var slectAddressExpess=this.$refs.currentAddress.addressExpess
          if(!this.faceDate){
              this.$toast('请选择上门时间')
          }else if(!slectAddressExpess){
              this.$toast('请选择发件人信息')
          }else{
            var start=""
            var end=""
            // console.log(this.selectTime,this.selectDate)
            if(this.selectDate=='今天'){
              // console.log(getNowFormatDate(new Date()),this.activeId)
              var beforeDate=getNowFormatDate(new Date())
              var timeS= this.activeId+':00:00'
              var timeE= (this.activeId+1) +':00:00'
              start=beforeDate +' '+ timeS
              end=beforeDate+' '+timeE
            }else if(this.selectDate=='明天'){
              var afterDate=getafterDay(new Date())
              var timeS= this.activeId+':00:00'
              var timeE= (this.activeId+1) +':00:00'
               start=afterDate +' '+ timeS
              end=afterDate+' '+timeE
              // console.log(afterDate,this.activeId)
            }else{
              //后天
               var afterDate=getafterTwoDay(new Date())
              var timeS= this.activeId+':00:00'
              var timeE= (this.activeId+1) +':00:00'
               start=afterDate +' '+ timeS
               end=afterDate+' '+timeE
            }
            let op={
              addressId:slectAddressExpess.id,
              expressId:this.expressValue.id,
              orderSn:this.$route.params.id,
              receiverId:this.recipientsDesc.id,
              takeStartTime:start,
              takeEndTime:end
            }
            console.log(op)
            orderOnline(op).then(res=>{
              console.log(res)
              this.$toast('预约成功')
              this.$router.go(-1)
            })
          }
      
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recipients{
    width: 90%;
    margin: 26px auto 10px; 
    padding: 20px 10px 12px;
    text-align: left;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.address{
    margin-top: 16px;
}
.expresscell{
    width: 94%;
   margin: 20px auto 0;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.datecell{
    width: 94%;
    margin: 0px auto;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.btn{
  width: 100%;
  height: 45px;
  line-height: 45px;
  position:absolute;
  bottom: 0;
  background:rgba(255,205,1,1);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.boxbtn{
  height: 30px;
  line-height:30px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}
</style>
