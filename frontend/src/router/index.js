import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Schedule from '@/components/ScheduleList'
import VoteList from '@/components/VoteList'
import NoVoteList from '@/components/NoVoteList'
import NotVoteList from '@/components/NotVoteList'
import MemberList from '@/components/MemberList'
import LatecomerList from '@/components/LatecomerList';
import LatecomerDetailList from '@/components/LatecomerDetailList';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Login', component: Login },
    { path: '/schedule', name: 'Schedule', component: Schedule, props: true },
    { path: '/voteList:play_index', name: 'VoteList', component: VoteList, props: true },
    { path: '/noVoteList:play_index', name: 'NoVoteList', component: NoVoteList, props: true },
    { path: '/notVoteList:play_index', name: 'NotVoteList', component: NotVoteList, props: true },
    { path: '/memberList', name: 'MemberList', component: MemberList },
    { path: '/latecomerList', name: 'LatecomerList', component: LatecomerList},
    { path: '/latecomerDetailList', name: 'LatecomerDetailList', component: LatecomerDetailList}
  ]
})
