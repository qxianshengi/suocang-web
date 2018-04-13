import Vue from 'vue'
import Layout from '../public/layout'

export default [{
        path: '/',
        // redirect: '/index',
        component: resolve => { require(['../pages/uc/login.vue'], resolve); }
    },
    {
        path: '*',
        component: resolve => { require(['../pages/uc/login.vue'], resolve); }
    },
    {
        path: '/index',
        component: resolve => { require(['../pages/index.vue'], resolve); }
    },
    {
        path: '/tradingcenter',
        component: resolve => { require(['../pages/tradingcenter.vue'], resolve); },
    },
    {
        path: '/ordermanagement',
        component: resolve => { require(['../pages/uc/OrderManagement.vue'], resolve); },
        children: [{
                path: '',
                component:  resolve => { require(['../components/uc/Myorder'], resolve); }
            },
            {
                path: 'myorder',
                component:  resolve => { require(['../components/uc/Myorder'], resolve); }
            },
            {
                path: 'myad',
                component:  resolve => { require(['../components/myad'], resolve); }
            },
             {
                path: 'confirm',
                component:  resolve => { require(['../components/Confirm'], resolve); }
            }
        ]
    },
    {
        path: '/myorder',
       component:  resolve => { require(['../components/uc/Myorder.vue'], resolve); }
    },
    {
        path: '/mytransaction',
       component:  resolve => { require(['../components/uc/MyTransaction.vue'], resolve); }
    },
    {
        path: '/moneymanagem',
        component: resolve => { require(['../pages/uc/MoneyManagem.vue'], resolve); },
        children: [
        {
                path: '',
                component: resolve => { require(['../components/uc/Record.vue'], resolve); },
              },

            {
                path: 'record',
                component: resolve => { require(['../components/uc/Record.vue'], resolve); },
            },
            {
                path: 'recharge',
                component: resolve => { require(['../components/uc/Recharge.vue'], resolve); },
            },{
                path: 'assets',
                component: resolve => { require(['../components/uc/PersonalAssets.vue'], resolve); },
            },
            {
                path: 'withdraw',
                component: resolve => { require(['../components/uc/Withdraw.vue'], resolve); },
            },
            {
                path: 'withdrawAddr',
                component: resolve => { require(['../components/uc/WithdrawAddr.vue'], resolve); },
            },
            {
                path: 'transfer',
                component: resolve => { require(['../components/uc/Transfer.vue'], resolve); },
            },
        ]
    },
    {
        path: '/suocang',
        component: resolve => { require(['../pages/CertifiedBusiness.vue'], resolve); },
        children: [
            {
                path: 'application',
                component: resolve => { require(['../components/Application.vue'], resolve); }
            },
            {
                path: 'applicationStatus',
                component: resolve => { require(['../components/ApplicationStatus.vue'], resolve); }
            },
        ]
    },
    {
        path: '/certifiedAgreement',
        component: resolve => { require(['../components/CertifiedBusinessAgreement.vue'], resolve); }
    },
    {
        path: '/membercenter',
        component: resolve => { require(['../pages/uc/MemberCenter.vue'], resolve); },
        children: [{
                path: '',
                component: resolve => { require(['../components/uc/Safe.vue'], resolve); }
            },
            {
                path: 'safe',
                name:'safes',
                component: resolve => { require(['../components/uc/Safe.vue'], resolve); }
            },
            {
                path: 'account',
                component: resolve => { require(['../components/uc/Account.vue'], resolve); }
            }
        ]
    },
    {
        path: '/withdrawAddr',
        component: resolve => { require(['../components/uc/WithdrawAddr.vue'], resolve); }
    },
    {
        path: '/newhelp',
        component: resolve => { require(['../components/NewHelp.vue'], resolve); }
    },
    {
        path: '/customerservice',
        component: resolve => { require(['../pages/uc/CustomerService.vue'], resolve); }
    },
     {
        path: '/advance',
        name:'advance',
        component: resolve => { require(['../components/Advance.vue'], resolve); }
    },
    {
        path: '/tradeInfoBuy',
        component: resolve => { require(['../pages/tradeInfoBuy.vue'], resolve); }
    },
    {
        path: '/tradeInfoSell',
        component: resolve => { require(['../pages/tradeInfoSell.vue'], resolve); }
    },
    {
        path: '/notice',
        component: resolve => { require(['../pages/Announcement.vue'], resolve); }
    },
       {
        path: '/noticedetail',

        component: resolve => { require(['../components/AnnouncementDetail.vue'], resolve); }
    },
    {
        path: '/checkuser',
        component: resolve => { require(['../pages/checkuser.vue'], resolve); }
    },
    {
        path: '/chat',
        component: resolve => { require(['../pages/chat.vue'], resolve); }
    },
    {
        path: '/question',
        component: resolve => { require(['../pages/question.vue'], resolve); }
    },
    {
        path: '/agreement',
        component: resolve => { require(['../pages/agreement.vue'], resolve); }
    },
    {
        path: '/converter',
        component: resolve => { require(['../components/Converter.vue'], resolve); }
    },
    {
        path: '/withfriend',
        component: resolve => { require(['../components/WithFriends.vue'], resolve); }
    },
    {
        path: '/rate',
        component: resolve => { require(['../pages/rate.vue'], resolve); }
    },
    {
        path: '/login',
        component: resolve => { require(['../pages/uc/Login.vue'], resolve); }
    },
     {
        path: '/loginreal',
        name:'logins',
        component: resolve => { require(['../pages/uc/LoginReal.vue'], resolve); }
    },
    {
        path: '/login/returnUrl/:returnUrl',
        component: resolve => { require(['../pages/uc/Login.vue'], resolve); }
    },
    {
        path: '/register',
        component: resolve => { require(['../pages/uc/Register.vue'], resolve); }
    },
    {   path: '/findPwd',
        component:resolve => { require(['../pages/uc/FindPwd.vue'], resolve); }
    }


];