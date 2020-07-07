import Vue from 'vue'

import { Button ,Tabbar, TabbarItem, Icon,Cell,AddressList,NavBar,AddressEdit   } from 'vant';

const components=[
   Button ,Tabbar, TabbarItem,Icon,Cell,AddressList,NavBar,AddressEdit 
]

// Vue.use(Button);

  components.forEach(Component => {
        Vue.use(Component)
   });