<template>
  <div>
   <item :status="status"/>
  </div>
</template>

<script>
// 订单状态：-1->全部订单；0->待付款；1->待发货；2->待收货；3->待归还；4->待评价；5->已关闭；6->无效订单
// '-1': '全部订单','0': '待付款','1': '待发货', '2': '待收货', '3': '待评价','4': '已关闭','5': '无效订单'
var that
// import {getOrderType,updateOrder,removeOrder} from '@/api'
// import {orderStatus} from '@/utils'
import item from './components/item'
export default {
  components:{item},
  data () {
    return {
       status:-1
    }
  },
  created(){
 
  },
  methods:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
