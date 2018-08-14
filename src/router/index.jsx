import React from '../../node_modules/_react@16.4.1@react'
import Main from '../layouts/Main'
import LoginPage from '../pages/Login'
import NotFound from '../views/notfound'
import DashboardView from '../views/Dashboard'
import UsersView from '../views/user/Users'
import LeadersView from '../views/user/Leaders'
import GroupView from '../views/org/group'
import OrgView from '../views/org/org'
import MsgView from '../views/setting/msg'
import SysView from '../views/setting/sys'
import CalendarView from '../views/calendar'


 import Threemeeting from 'Zbtpm/pages/threemeet.jsx'    
import ThreeWrite from 'Zbtpm/pages/threemeeting/write'		//创建三会一课
import ThreeHistory from 'Zbtpm/pages/threemeeting/history'  //历史记录
import ThreeWait from 'Zbtpm/pages/threemeeting/wait'		//当前上报 
import ThreeOverdue from 'Zbtpm/pages/threemeeting/overdue'   //逾期预警
import Merge from 'Zbtpm/pages/threemeeting/merge'   //合并三会一课

//党务模块
import PartyOverdue from 'Zbtpm/pages/party/overdue'
import PartyHistory from 'Zbtpm/pages/party/history'
import PartyWrite from 'Zbtpm/pages/party/write'
import PartyWait from 'Zbtpm/pages/party/wait'
import PartyDetail from 'Zbtpm/pages/party/detail'


//村务模块
import VillageOverdue from 'Zbtpm/pages/village/overdue'
import VillageHistory from 'Zbtpm/pages/village/history'
import VillageWrite from 'Zbtpm/pages/village/write'
import VillageWait from 'Zbtpm/pages/village/wait'
import VillageDetail from 'Zbtpm/pages/village/detail'


import { Router, Route, Switch} from '../../node_modules/_react-router-dom@4.3.1@react-router-dom'
const RouterConfig = [
  { 
  	path: '/',
  	exact:true,
  	strict:true,
	component: DashboardView
	},
	{
		path: '/dashboard',
		exact: true,
		strict: true,
		component: DashboardView
	},{
		path:'/three',
		exact:true,
		strict:true,
		component:Threemeeting
	},{
		path:'/three/write',
		exact:true,
		strict:true,
		component:ThreeWrite
	},{
		path:'/three/history',
		exact:true,
		strict:true,
		component:ThreeHistory
	},{
		path:'/three/wait',
		exact:true,
		strict:true,
		component:ThreeWait
	},{
		path:'/three/overdue',
		exact:true,
		strict:true,
		component:ThreeOverdue
	},{
		path:'/three/merge',
		exact:true,
		strict:true,
		component:Merge
	},
	{
		path:'/party/write',
		exact:true,
		strict:true,
		component:PartyWrite
	},
	{
		path:'/party/overdue',
		exact:true,
		strict:true,
		component:PartyOverdue
	},{
		path:'/party/history',
		exact:true,
		strict:true,
		component:PartyHistory
	},{
		path:'/party/wait',
		exact:true,
		strict:true,
		component:PartyWait
	},{
		path:'/party/wait/detail',
		exact:true,
		strict:true,
		component:PartyDetail
	},{
		path:'/party/history/detail',
		exact:true,
		strict:true,
		component:PartyDetail
	},




	{
		path:'/village/overdue',
		exact:true,
		strict:true,
		component: VillageOverdue
		
	},{
		path:'/village/history',
		exact:true,
		strict:true,
		component: VillageHistory
		
	},{
		path:'/village/history/detail',
		exact:true,
		strict:true,
		component: VillageDetail
		
	},{
		path:'/village/write',
		exact:true,
		strict:true,
		component: VillageWrite
		
	},{
		path:'/village/wait/detail',
		exact:true,
		strict:true,
		component: VillageDetail
		
	},{
		path:'/village/wait',
		exact:true,
		strict:true,
		component: VillageWait
		
	},
	{/*
  	{ 
		path: '/option/msg',
		exact:true,
		strict:true,
		component: MsgView
  	},
  	{	 
		path: '/option/setting',
  		exact:true,
  		strict:true,
    	component: SysView
  	},
  	{ 
		path: '/users/sys',
  		exact:true,
  		strict:true,
		component: UsersView
  	},
  	{ 
		path: '/users/app',
  		exact:true,
  		strict:true,
		component: LeadersView
  	},
  	{ 
		path: '/group/org',
  		exact:true,
  		strict:true,
		component: OrgView
  	},
  	{ 
		path: '/group/users',
  		exact:true,
  		strict:true,
		component: GroupView
  	},
  	{ 
		path: '/calendar',
  		exact:true,
  		strict:true,
		component: CalendarView
  	},
  	{ 
		path: '/demo',
  		exact:true,
  		strict:true,
		component: DemoView
  	},*/}
]
function checkLogin(){ 
	// return localStorage.getItem('openid')==="undefined"
	return false;
}
const RootRouter=({history})=>(
	<Router history={history}>
			{/* exact用来关闭局部跳转 */}
		<Switch>
			<Route /*exact*/ strict path="/" component={Main} />
			<Route exact strict path="/login" component={LoginPage} />
			<Route exact strict path="/threemeeting" component={Main} />
			<Route strict path="/dashboard" component={Main} />
			<Route strict path='/three/write' component={Main}/>
			<Route strict path='/three/history' component={Main}/>
			<Route strict path='/three/wait' component={Main}/>
			<Route strict path='/three/overdue' component={Main}/>
			<Route strict path='/three/merge' component={Main}/>



			<Route strict path='/party/overdue' component={Main}/>
			<Route strict path='/party/history' component={Main}/>
			<Route strict path='/party/write' component={Main}/>
			<Route strict path='/party/wait' component={Main}/>
			<Route strict path='/party/wait/detail' component={Main}/>
			<Route strict path='/party/history/detail' component={Main}/>

			<Route strict path='/village/write' component={Main}/>
			<Route strict path='/village/overdue' component={Main}/>
			<Route strict path='/village/history' component={Main}/>
			<Route strict path='/village/wait' component={Main}/>
			<Route strict path='/village/wait/detail' component={Main}/>
			<Route strict path='/village/history/detail' component={Main}/>

			{/* <Route  strict path="/option/msg" component={Main} />
			<Route  strict path="/option/setting" component={Main} />
			<Route  strict path="/users/sys" component={Main} />
			<Route  strict path="/users/app" component={Main} />
			<Route  strict path="/group/org" component={Main} />
			<Route  strict path="/group/users" component={Main} />
			<Route  strict path="/calendar" component={Main} />
			<Route  strict path="/demo" component={Main} />
			<Route component={NotFound}/> */}
		</Switch>
	</Router>
)

export {RouterConfig,RootRouter}