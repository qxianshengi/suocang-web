import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        member: null,
        activeNav: '',
        token:null,
        userLeftActiveName: '',
        financeLeftActiveName: '',
        showTradePanelLogout: '',
        showTradePanelLogin: '',
        HeaderActiveName: '',
        userLeftActiveName: '',
        currentStep: 0,
    },
    mutations: {
        navigate(state,nav){
            state.activeNav = nav;
        },
        getCurrentStep(state,currentStep){
            state.currentStep = currentStep;
        },
        setMember(state, member) {
            state.member = member;
            localStorage.setItem('MEMBER', JSON.stringify(member));
        },
        recoveryMember(state){
            state.member = JSON.parse(localStorage.getItem('MEMBER'));
        },
        setToken(state,token){
            if(!token)
                return;
            if(!state.token||
                state.token!=token){
                state.token = token;
                localStorage.setItem('TOKEN',token);
            }

        }
    },
    getters: {
        getTabbarStatus(state) {
            return state.isShowTabbar;
        },
        member(state) {
            return state.member;
        },
        isLogin(state){
            return state.member != null;
        }
    }
});