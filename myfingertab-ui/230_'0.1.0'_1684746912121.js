"use strict";(self["webpackChunkmyfingertab"]=self["webpackChunkmyfingertab"]||[]).push([[230],{5230:(e,t,n)=>{n.r(t),n.d(t,{default:()=>H});n(8309);var r=n(3396),a=n(7139),u=n(9242),i=function(e){return(0,r.dD)("data-v-6c78c73c"),e=e(),(0,r.Cn)(),e},o={id:"loginPage"},l={key:0},s={key:0,for:"name"},c={for:"email"},m={for:"password"},p={key:1,class:"err_msg"},b={key:2,type:"submit",class:"submit_btn"},g=i((function(){return(0,r._)("hr",null,null,-1)})),f={class:"btns"},v={key:1},w=["src"],d=i((function(){return(0,r._)("p",{class:"regi_msg"},"註冊成功，請至信箱查看確認信",-1)}));function k(e,t,n,i,k,h){var y=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("section",o,[i.registerStatus?((0,r.wg)(),(0,r.iD)("main",v,[(0,r._)("img",{src:i.logo,alt:"logo"},null,8,w),d])):((0,r.wg)(),(0,r.iD)("main",l,[(0,r._)("h1",null,(0,a.zw)(i.title),1),(0,r._)("form",{onSubmit:t[4]||(t[4]=(0,u.iM)((function(){return i.memberAuth&&i.memberAuth.apply(i,arguments)}),["prevent"]))},[i.isMember?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("label",s,[(0,r.Uk)(" 姓名 : "),(0,r.wy)((0,r._)("input",{type:"text",id:"name","onUpdate:modelValue":t[0]||(t[0]=function(e){return i.name=e})},null,512),[[u.nr,i.name]])])),(0,r._)("label",c,[(0,r.Uk)(" Email : "),(0,r.wy)((0,r._)("input",{type:"email",id:"email","onUpdate:modelValue":t[1]||(t[1]=function(e){return i.email=e})},null,512),[[u.nr,i.email]])]),(0,r._)("label",m,[(0,r.Uk)(" 密碼 : "),(0,r.wy)((0,r._)("input",{type:"password",id:"password","onUpdate:modelValue":t[2]||(t[2]=function(e){return i.password=e})},null,512),[[u.nr,i.password]])]),i.errMsg?((0,r.wg)(),(0,r.iD)("p",p,(0,a.zw)(i.errMsg),1)):((0,r.wg)(),(0,r.iD)("button",b,(0,a.zw)(i.isMember?"登入":"註冊"),1)),(0,r._)("button",{type:"button",onClick:t[3]||(t[3]=function(){return i.toggleIsMember&&i.toggleIsMember.apply(i,arguments)}),class:"toggle_btn"},(0,a.zw)(i.isMember?"會員註冊":"會員登入"),1)],32),g,(0,r._)("div",f,[(0,r._)("button",{type:"button",onClick:t[5]||(t[5]=function(){return i.googleLogin&&i.googleLogin.apply(i,arguments)})},"Google"),i.isMember?((0,r.wg)(),(0,r.j4)(y,{key:0,to:"/setPassword"},{default:(0,r.w5)((function(){return[(0,r.Uk)("忘記密碼")]})),_:1})):(0,r.kq)("",!0)])]))])}var h=n(124),y=n(8534),_=(n(7941),n(2564),n(8862),n(7658),n(4870)),x=n(65),M=n(2483),D=n(6206);const I={setup:function(){var e=(0,x.oR)(),t=(0,M.yj)(),n=(0,M.tv)(),a=(0,_.iH)(!0),u=(0,_.iH)(""),i=(0,_.iH)(""),o=(0,_.iH)(""),l=(0,_.iH)(!1),s=(0,_.iH)(""),c=(0,r.Fl)((function(){return a.value?"會員登入":"會員註冊"}));function m(){return p.apply(this,arguments)}function p(){return p=(0,y.Z)((0,h.Z)().mark((function t(){var n;return(0,h.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(o.value){t.next=2;break}return t.abrupt("return");case 2:return t.prev=2,t.next=5,e.dispatch("member/memberRegister",{name:o.value,email:u.value,password:i.value,userId:o.value});case 5:if(n=t.sent,n){t.next=8;break}return t.abrupt("return",l.value=!1);case 8:l.value=!0,t.next=15;break;case 11:t.prev=11,t.t0=t["catch"](2),l.value=!1,console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[2,11]])}))),p.apply(this,arguments)}function b(){return g.apply(this,arguments)}function g(){return g=(0,y.Z)((0,h.Z)().mark((function t(){var r,a,o;return(0,h.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.dispatch("member/memberLogin",{email:u.value,password:i.value});case 3:if(r=t.sent,a=r.accessToken,o=r.mbrID,a){t.next=7;break}return t.abrupt("return",s.value="登入失敗");case 7:localStorage.setItem("member",JSON.stringify({token:a,mbrID:o})),e.commit("member/setMemberAuthInfo",{token:a,mbrID:o}),n.push("/"),t.next=16;break;case 12:t.prev=12,t.t0=t["catch"](0),s.value="登入失敗",console.log(t.t0);case 16:case"end":return t.stop()}}),t,null,[[0,12]])}))),g.apply(this,arguments)}function f(){return v.apply(this,arguments)}function v(){return v=(0,y.Z)((0,h.Z)().mark((function e(){return(0,h.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(u.value&&i.value){e.next=2;break}return e.abrupt("return");case 2:if(!a.value){e.next=4;break}return e.abrupt("return",b());case 4:m();case 5:case"end":return e.stop()}}),e)}))),v.apply(this,arguments)}function w(){window.location.href="https://s.intella.co/myfingertab/oauth2/authorization/google"}function d(){a.value=!a.value}return Object.keys(t.query).length>0&&e.dispatch("member/memberActivate",t.query.token),(0,r.YP)((function(){return s.value}),(function(){s.value&&setTimeout((function(){s.value=""}),2e3)})),{logo:D,isMember:a,memberAuth:f,name:o,password:i,email:u,title:c,errMsg:s,toggleIsMember:d,registerStatus:l,googleLogin:w}}};var Z=n(89);const U=(0,Z.Z)(I,[["render",k],["__scopeId","data-v-6c78c73c"]]),H=U}}]);
//# sourceMappingURL=230_'0.1.0'_1684746912121.js.map