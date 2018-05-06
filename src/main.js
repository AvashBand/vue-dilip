import Vue from 'vue'
import App from './App.vue';
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
import { store } from './store/store'
import MenuBar from './components/MenuBar.vue'
import UsersTable from './components/UsersTable.vue'
import FoodTable from './components/FoodTable.vue'
import OrderRecords from './components/OrderRecords.vue'

import menubar from './components/test/menubar.vue';
import sidebar from './components/test/sidebar.vue';
import content from './components/test/content.vue';

 
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.component('Menu-Bar', MenuBar);
Vue.component('user-table', UsersTable);
Vue.component('food-table', FoodTable);
Vue.component('order-table', OrderRecords);

Vue.component('menubar-box', menubar);
Vue.component('sidebar-box', sidebar);
Vue.component('content-box', content);

const router = new VueRouter({
	routes : Routes, 
	mode: 'history'
});

Vue.filter('snippet', function(value){
	return value.slice(0,100)+ '...';
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store: store
})
