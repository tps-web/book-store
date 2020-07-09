import Vue from 'vue'

import { Button ,Tabbar, TabbarItem, Icon,Cell,CellGroup,AddressList,NavBar,AddressEdit,CouponCell,CouponList,Field,Sidebar, SidebarItem,PullRefresh,Toast,
Swipe, SwipeItem,Search ,Grid, GridItem   } from 'vant';

const components=[
   Button ,Tabbar, TabbarItem,Icon,Cell,CellGroup,AddressList,NavBar,AddressEdit,CouponCell,CouponList,Field,Sidebar, SidebarItem,PullRefresh,Toast,
   Swipe, SwipeItem,Search, Grid, GridItem
]

// Vue.use(Button);

  components.forEach(Component => {
        Vue.use(Component)
   });