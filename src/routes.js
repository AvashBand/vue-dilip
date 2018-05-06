import MemberLogin  from './components/MemberLogin.vue';
import MemberReg  from './components/MemberRegistration.vue';
// import AdminPanel  from './components/AdminPanel.vue';
import OrderPanel  from './components/OrderPanel.vue';

import UserTable  from './components/UsersTable.vue';
import FoodTable from './components/FoodTable.vue';
import OrderRecords from './components/OrderRecords.vue';

import UserfullUI from './components/USERFULLUI.vue';
import Error403 from './components/Error403.vue';
import Error404 from './components/Error404.vue';

import Main from './components/test/Main.vue';

export default [
	{ path: '/',  component: MemberLogin },
	// { path: '/admin',  component: AdminPanel},
	{ path: '/reg', component: MemberReg},
	{ path: '/order',  component: OrderPanel},
	{ path: '/fullui',  component: UserfullUI},

	{ path: '/main',  component: Main},

	{ path: '/usertable',  component: UserTable},
	{ path: '/foodtable',  component: FoodTable},
    { path: '/orderrecords',  component: OrderRecords},	
    { path: '/error403', component: Error403},
    { path: '/error404', component: Error404}
]