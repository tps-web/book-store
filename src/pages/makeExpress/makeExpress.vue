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
           <!-- 上面时间 -->
        <van-cell title="选择上门时间" is-link :value="faceDate" title-style="text-align: left" size="large" @click="()=>{isSelectDate=true}"  class="datecell"/>
         <van-popup v-model="isSelectDate" position="bottom">
         <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
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
import {getDefaultCompany} from '@/api'
import {formatDate} from '@/utils'
var that
export default {
  components:{
      addAddress
  },
  data () {
    return {
        recipientsDesc:'',
        minHour: 10,
        maxHour: 20,
        minDate: new Date(),
        maxDate: new Date(2030, 12, 12),
        currentDate:'',
        faceDate:'',
        isSelectDate:false
    }
  },
  created(){
    getDefaultCompany().then(res=>{
        // console.log(res.data.item)
        this.recipientsDesc=res.data.item
    })
  },
  methods:{
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
      confirm(){
        //   console.log(formatDate(this.currentDate))
          this.faceDate=formatDate(this.currentDate)
          this.isSelectDate=false
      },
      cancel(){
          this.isSelectDate=false
      },
      submit(){
          var slectAddressExpess=this.$refs.currentAddress.addressExpess
          if(!this.faceDate){
              this.$toast('请选择上面时间')
          }else if(!slectAddressExpess){
              this.$toast('请选择发件人信息')
          }else{
             let op={
                addressExpess:slectAddressExpess,
                faceDate:this.faceDate,
                recipientsDesc:this.recipientsDesc
                }
            console.log(op)
          }
      
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recipients{
    width: 90%;
    margin: 20px auto 10px; 
    padding: 12px 8px;
    text-align: left;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}
.address{
    margin-top: 12px;
}
.datecell{
    width: 94%;
    margin: 20px auto;
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
