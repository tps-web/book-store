 <template>
  <div class="">
    <!-- 发货信息 -->
       <div class="deliver_msg">
         <!-- 发货快递 -->
          <van-cell title="选择快递" is-link :value="expressValue"  title-style="text-align: left;"  @click="showExpress=true"/>
          <van-popup v-model="showExpress"  position="bottom" >
            <van-picker
              title="选择快递"
              show-toolbar
              :default-index="0"
              :columns="columns"
              @confirm="expressConfirm"
              @cancel="onCancel"
           />
        </van-popup>
          <!-- 发货时间 -->
          <van-cell title="发货时间" is-link :value="date||selectDate"  title-style="text-align: left;" @click="dateShow = true"/>
          <van-calendar v-model="dateShow" @confirm="onConfirm" />
          <!-- 借阅时间 -->
          <van-cell title="借阅时间" :value="dateQuantum" @click="show = true" title-style="text-align: left;"/>
          <van-calendar v-model="show" type="range" @confirm="onDateConfirm" />
  </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
       columns: ['系统默认','顺丰快递', '圆通快递', '申通快递'],
       expressValue:'系统默认', //快递
       showExpress:false,  //快递展示
       dateShow:false,    //发货时间展示
       date:this.selectDate,  //发货时间
       dateQuantum:'', //借阅时间段
       show: false,   //借阅时间段展示
    }
  },
  computed:{
    //格式化今天时间
    selectDate(){
      var d1 = this.formatDate(new Date());
      return d1
    },
  },
  methods:{
    //借阅期间
    onDateConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.dateQuantum = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    //快递
   expressConfirm(value, index){
    this.expressValue=value
    this.showExpress=false
  },
  onCancel() {
      this.showExpress=false
    },
    //发货时间
   formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
   },
  onConfirm(date){
      this.dateShow = false;
      var day=this.formatDate(date);
      this.date=day
   },
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
