<template>
    <div>
        <div class="chat-line">
            <div class="scroll-chat" id="scrollChat">
                <div class="chat-container-box" id="sysbox">
                    <div class="system-box">
                        <p class="msg-content" v-show="msg.status==1">买家未付款，等待买家付款！</p>
                        <p class="msg-content" v-show="msg.status==2">买家已付款，等待卖家放行！</p>
                        <p class="msg-content" v-show="msg.status==3">订单已完成交易！</p>
                        <p class="msg-content" v-show="msg.status==4">订单正在申诉中！</p>
                        <p class="msg-content" v-show="msg.status==0">订单已取消！</p>
                    </div>
                </div>
                <h5 class="more" v-show="currentPage<totalPage||currentPage==totalPage">
                    <Icon type="clock"></Icon>
                    <span @click="getBefore">加载更多</span>
                </h5>
                <template v-for="item in msgLists">
                    <div class="chat-container-box" v-show="item.uidFrom!=msg.myId">
                        <div class="user-chat-box">
                            <div class="user-avatar-box">
                                <div class="avatar-box">
                                    <div class="user-face user-avatar-public">
                                        <span class="user-avatar-in">{{msgnameS}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="user-content-box">
                                <p class="user-name">{{msg.otherSide}}</p>
                                <div class="chat-info">
                                    <div class="user-desc">
                                        <p class="icon"></p>
                                        <em class="input-in">{{item.content}}</em>
                                    </div>
                                    <span class="times">{{item.sendTimeStr}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-container-box" v-show="item.uidFrom==msg.myId">
                        <div class="user-chat-box self-chat-box">
                            <div class="user-content-box">
                                <p class="user-name">{{user.username}}</p>
                                <div class="chat-info">
                                    <div class="user-desc self-desc">
                                        <p class="icon"></p>
                                        <em class="input-in">{{item.content}}</em>
                                    </div>
                                    <span class="times">{{item.timeNow||item.sendTimeStr}}</span>
                                </div>
                            </div>
                            <div class="user-avatar-box">
                                <div class="avatar-box">
                                    <div class="user-face user-avatar-public">
                                        <span class="user-avatar-in">{{usernameS}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

            </div>
            <!---->
            <h5 class="spe_show">
                <i class="iconfont icon-warning"></i>
                防诈骗提示：近期，屡有诈骗份子利用银行转账汇款信息和假汇款凭据进行诈骗，请一定登陆自己的收款账号核实。保证汇入资金的安全，避免银行卡被冻结的风险！
            </h5>
            <!---->
            <div class="send-msg-box">
                <div class="img-btn" style="background: #fff;cursor: default;">
                    <!-- <Icon type="image" class="img-icons"></Icon>
                                            <input title="上传图片" type="file" accept="image/jpg,image/jpeg,image/png" class="input-file"> -->
                </div>
                <input v-model="mytext" @keyup.enter="sendName" autocomplete="off" type="text" placeholder="请输入聊天内容 回车键发送" style=" background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;">
                <button class="send-btn" @click="sendName">
                    <Icon type="paper-airplane" class="iconfont"></Icon>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
var Stomp = require('stompjs');
var SockJS = require('sockjs-client');
var stompClient = null;
export default {
    props: ['msg'],
    data() {
        return {
            currentPage: 1,
            totalPage: 1,
            showMore: true,
            mytext: '',
            othermsg: '11',
            mymsg: '22',
            msgLists: [],
            otherList: [],
            myList: [],
            myitem: {},
            otheritem: {},
            timeNow: '',
            systext: '',
        }
    },
    computed: {
        msgnameS: function() {
            return (this.msg.otherSide + '').slice(0, 1)
        },
        user: function() {
            return JSON.parse(localStorage.getItem("MEMBER"))
        },
        usernameS: function() {
            return (this.user.username + '').slice(0, 1)
        },
        orderId: function() {
            return this.$route.query.tradeId
        },

    },
    watch: {
        'processData': 'scrollToBottom',
    },
    methods: {
        //让浏览器滚动条保持在最低部
        scrollToBottom: function() {
            this.$nextTick(() => {
                var div = document.getElementById('scrollChat')
                div.scrollTop = div.scrollHeight
            })
        },
        connect: function() {
            let self = this
            var socket = new SockJS('http://api.bitrade.wxmarket.cn/chat/chat-webSocket');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function(frame) {
                stompClient.subscribe('/user/' + self.msg.myId + '/' + self.orderId, function(response) {
                    self.otheritem = JSON.parse(response.body)
                    self.msgLists.push(self.otheritem)
                })
            });
        },
        sendName: function() {
            if (this.mytext) {
                let self = this
                var content = this.mytext
                var jsonParam = {
                    'uidTo': this.msg.hisId,
                    'uidFrom': this.msg.myId,
                    'orderId': this.orderId,
                    'nameFrom': this.user.username,
                    'nameTo': this.msg.otherSide,
                    'content': content,
                };

                stompClient.send("/app/message/chat", {}, JSON.stringify(jsonParam));
                self.myitem = jsonParam
                self.myitem['timeNow'] = self.CurentTime()
                self.msgLists.push(self.myitem)
                this.scrollToBottom()
                self.mytext = ''
            } else {
                this.$Message.info('消息不能为空');
            }
        },
        CurentTime: function() {
            var now = new Date();

            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日

            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分

            var clock = year + "-";

            if (month < 10)
                clock += "0";

            clock += month + "-";

            if (day < 10)
                clock += "0";

            clock += day + " ";

            if (hh < 10)
                clock += "0";

            clock += hh + ":";
            if (mm < 10) clock += '0';
            clock += mm;
            return clock;
        },
        getBefore: function(page) {
            let self = this
            let params = {}
            let selfarr = []
            let myarr = []
            params['orderId'] = this.orderId
            params['Page'] = this.currentPage
            this.$http.post('http://api.bitrade.wxmarket.cn/chat/getHistoryMessage', params).then(response => {
                var resp = response.body;
                this.totalPage = resp.totalPage
                if (resp.data) {
                    if (this.currentPage < resp.totalPage || this.currentPage == resp.totalPage) {
                        this.showMore = true
                        for (let i = 0; i < resp.data.length; i++) {
                            let objitem = {}
                            objitem = resp.data[i]
                            self.msgLists.unshift(objitem)
                        }
                        this.currentPage = this.currentPage - 0 + 1
                    } else {
                        this.showMore = false
                    }

                } else {
                    this.showMore = false
                }
            })
        },

    },
    created() {
        this.getBefore()
        this.scrollToBottom()
        this.connect()
    }
}
</script>
<style scoped>
.chat-in-box .chat-in .chat-line .spe_show {
    background-color: #fdf1e9;
    color: #ed2525;
    padding: 16px;
    margin-right: 3px;
}

.chat-in-box .chat-in .chat-line {
    background-color: white;
    padding: 100px 24px 100px 24px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #ebeff5;
    width: 95%;
    margin: 0 auto;
    position: relative;
    min-height: 650px;
    transform: translate(0, 0);
}

#sysbox {
    position: fixed;
    top: 15px;
    left: 0;
    right: 0;
}

.chat-in-box .chat-in .chat-line .scroll-chat {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 557px;
    overflow-y: auto;
    padding-right: 10px;
}

.chat-in-box .chat-in .chat-line .scroll-chat .more {
    text-align: center;
    color: #00aeef;
}

.chat-in-box .chat-in .chat-line .scroll-chat .more span {
    cursor: pointer;
    padding: 6px 20px 6px 0;
}

.chat-container-box {
    margin-bottom: 20px;
    position: relative;
}

.chat-container-box h5 {
    text-align: center;
    font-size: 14px;
    padding: 10px 0;
}

.chat-container-box .user-chat-box .user-avatar-box,
.chat-container-box .user-chat-box {
    float: left;
}

.chat-container-box .user-chat-box .user-avatar-box,
.chat-container-box .user-chat-box {
    float: left;
}

.avatar-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
}

.user-avatar-public {
    background: #fff;
    height: 52px;
    width: 52px;
    box-shadow: 0 1px 5px 0 rgba(71, 78, 114, .24);
    position: relative;
}

.user-avatar-public>.user-avatar-in,
.user-avatar-public {
    border-radius: 50%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.user-avatar-public>.user-avatar-in {
    background: #00b5f6;
    height: 42px;
    width: 42px;
    color: #fff;
}

.chat-container-box .user-chat-box .user-content-box {
    max-width: 700px;
    float: left;
}

.chat-container-box .user-chat-box .user-content-box .user-name {
    padding-left: 16px;
    font-size: 12px;
    color: #8994a3;
    margin-bottom: 4px;
}

.chat-container-box .user-chat-box .user-content-box .chat-info .user-desc {
    background-color: #f1f1f4;
    padding: 10px 16px;
    border-radius: 6px;
    margin-bottom: 0;
    margin-left: 16px;
    position: relative;
    font-size: 14px;
    word-break: break-all;
}

.chat-container-box .user-chat-box .user-content-box .chat-info .times {
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 6px;
    display: block;
    text-align: right;
    color: #c3c1c1;
}

.chat-container-box .user-chat-box .user-content-box .chat-info .user-desc .icon {
    height: 0;
    width: 0;
    border: 8px solid transparent;
    border-right: 14px solid #f1f1f4;
    position: absolute;
    top: 6px;
    left: -20px;
}

.chat-container-box .user-chat-box .user-content-box .chat-info .user-desc em {
    font-style: normal;
    font-size: 12px;
}

.chat-container-box .system-box {
    padding: 16px 24px;
    background-color: #ebeff5;
    border-radius: 7px;
    margin: 0 auto;
    margin-bottom: 20px;
    font-size: 16px;
    color: #8994a3;
    max-width: 500px;
}

.chat-container-box .system-box .times {
    text-align: right;
    font-size: 12px;
}

.chat-container-box .user-chat-box.self-chat-box .user-avatar-box,
.chat-container-box .user-chat-box.self-chat-box {
    float: right;
}

.chat-container-box .user-chat-box.self-chat-box .user-content-box .user-name {
    text-align: right;
    padding-right: 16px;
}

.chat-container-box .user-chat-box .user-content-box .chat-info .self-desc {
    margin-left: 0;
    margin-right: 16px;
    background-color: #00aeef;
    color: #fff;
}

.chat-container-box .user-chat-box .user-content-box .chat-info .self-desc .icon {
    height: 0;
    width: 0;
    border: 8px solid transparent;
    border-left: 14px solid #00aeef;
    position: absolute;
    top: 6px;
    right: -18px;
    left: unset;
}

.chat-in-box .chat-in .chat-line .send-msg-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 94%;
    position: absolute;
    bottom: 21px;
    left: 25px;
    -webkit-box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
}

.chat-in-box .chat-in .chat-line .send-msg-box .img-btn {
    position: relative;
    overflow: hidden;
    background-color: transparent;
    width: 10%;
    min-width: 60px;
    /* border: 1px solid #dfe8f2; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    background: #ebeff5;
}

.chat-in-box .chat-in .chat-line .send-msg-box .img-btn .input-file {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
}

.chat-in-box .chat-in .chat-line .send-msg-box input {
    height: 60px;
    border: 1px solid transparent;
    border-left: none;
    background-color: transparent;
    padding: 10px;
    outline: none;
    width: 80%;
}

.chat-in-box .chat-in .chat-line .send-msg-box .send-btn {
    height: 60px;
    border: none;
    background-color: transparent;
    color: white;
    width: 12%;
    outline: none;
    font-size: 18px;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: #ebeff5;
}

.chat-in-box .chat-in .chat-line .send-msg-box .img-btn .img-icons {
    font-size: 24px;
    color: #15b3f0;
}

.chat-in-box .chat-in .chat-line .send-msg-box .send-btn .iconfont {
    font-size: 28px;
    color: #00aeef;
}
</style>




