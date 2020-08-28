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
           <!-- 上面时间 -->
        <van-cell title="选择上门时间" is-link :value="faceDate" title-style="text-align: left" size="large" @click="()=>{isSelectDate=true}"  class="datecell"/>
         <van-popup v-model="isSelectDate" position="bottom">
         <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            :min-hour="minHour"
            :max-hour="maxHour"
            :formatter="formatter"
            @confirm="confirm"
            @cancel="cancel"
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
import {formatDate,currentDateLater,getformatDate} from '@/utils'
var that
export default {
  components:{
      addAddress
  },
  data () {
    return {
        columns: [],  //快递列表
        showExpress:false,  //展示快递
        expressValue:'', //快递
        recipientsDesc:'',
        minHour: 8,
        maxHour: 18,
        // minDate: new Date(),
        minDate:new Date(new Date().getTime() + 1 * 60 * 60 * 1000),  //加一个小时
        // maxDate: new Date(2030, 12, 12),
        maxDate:new Date(new Date().getTime() + 1 * 60 * 60 * 1000 * 48),  //加两天时间
        currentDate:'',
        faceDate:'',
        isSelectDate:false,
        startTime:"",
        endTime:""
    }
  },
  created(){
    console.log(this.$route.params.id)
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
     //快递
   expressConfirm(value, index){
    this.expressValue=value
    this.showExpress=false
  },
    onCancel() {
      this.showExpress=false
    },
       // 选项格式化函数
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      } else if (type === 'second') {
        return `${value}秒`
      }
      return value
    },
     //选择上门时间
      confirm(){
          var end=new Date(this.currentDate.getTime() + 2 * 60 * 60 * 1000)
          this.startTime=getformatDate(this.currentDate)
          this.endTime=getformatDate(end)
          this.faceDate=formatDate(this.currentDate)
          this.isSelectDate=false
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
            let op={
              addressId:slectAddressExpess.id,
              expressId:this.expressValue.id,
              orderSn:this.$route.params.id,
              receiverId:this.recipientsDesc.id,
              takeStartTime:this.startTime,
              takeEndTime:this.endTime
            }
            console.log(op)
            // orderOnline(op).then(res=>{
            //   console.log(res)
            // })
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
</style>
