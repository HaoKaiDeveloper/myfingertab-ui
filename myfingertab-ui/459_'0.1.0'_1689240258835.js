"use strict";(self["webpackChunkmyfingertab"]=self["webpackChunkmyfingertab"]||[]).push([[459],{6459:(e,n,t)=>{t.r(n),t.d(n,{default:()=>A});t(8309);var r=t(3396),l=t(9242),o=t(7139),a=t(7783),u=function(e){return(0,r.dD)("data-v-09a95381"),e=e(),(0,r.Cn)(),e},i=u((function(){return(0,r._)("label",null,"Email",-1)})),c=u((function(){return(0,r._)("label",{for:"name"},"姓名",-1)})),d=["placeholder"],f=u((function(){return(0,r._)("label",{for:"tel"},"聯絡電話",-1)})),p=["placeholder"],m={class:"gender"},s=u((function(){return(0,r._)("label",{for:"gender"},"性別",-1)})),b={for:"man"},h=["checked"],v={for:"woman"},_=["checked"],g=u((function(){return(0,r._)("label",{for:"address"},"聯絡地址",-1)})),y=["placeholder"],w=u((function(){return(0,r._)("label",{for:"birthday"},"生日 ",-1)})),k=["placeholder"],Z={class:"msg"},M={type:"submit"};function U(e,n,t,u,U,x){return(0,r.wg)(),(0,r.iD)("form",{class:"basic_info",onSubmit:n[7]||(n[7]=(0,l.iM)((function(){return u.setMemberInfo&&u.setMemberInfo.apply(u,arguments)}),["prevent"]))},[(0,r._)("div",null,[i,(0,r._)("p",null,(0,o.zw)(u.info.email),1)]),(0,r._)("div",null,[c,(0,r.wy)((0,r._)("input",{type:"text",id:"name",placeholder:u.info.name,"onUpdate:modelValue":n[0]||(n[0]=function(e){return u.info.name=e})},null,8,d),[[l.nr,u.info.name]])]),(0,r._)("div",null,[f,(0,r.wy)((0,r._)("input",{type:"tel",id:"tel",placeholder:u.info.tel,"onUpdate:modelValue":n[1]||(n[1]=function(e){return u.info.tel=e})},null,8,p),[[l.nr,u.info.tel]])]),(0,r._)("div",m,[s,(0,r._)("label",b,[(0,r.wy)((0,r._)("input",{type:"radio",name:"gender",id:"man",value:"M","onUpdate:modelValue":n[2]||(n[2]=function(e){return u.info.gender=e}),checked:"M"===u.info.gender},null,8,h),[[l.G2,u.info.gender]]),(0,r.Uk)(" 男 ")]),(0,r._)("label",v,[(0,r.wy)((0,r._)("input",{type:"radio",name:"gender",id:"woman",value:"F","onUpdate:modelValue":n[3]||(n[3]=function(e){return u.info.gender=e}),checked:"F"===u.info.gender},null,8,_),[[l.G2,u.info.gender]]),(0,r.Uk)(" 女 ")])]),(0,r._)("div",null,[g,(0,r.wy)((0,r._)("input",{type:"text",id:"address",placeholder:u.info.addr,"onUpdate:modelValue":n[4]||(n[4]=function(e){return u.info.addr=e})},null,8,y),[[l.nr,u.info.addr]])]),(0,r._)("div",null,[w,(0,r.wy)((0,r._)("input",{type:"date",id:"birthday",placeholder:u.info.birth,"onUpdate:modelValue":n[5]||(n[5]=function(e){return u.info.birth=e})},null,8,k),[[l.nr,u.info.birth]])]),(0,r._)("p",Z,(0,o.zw)(u.msg),1),(0,r._)("button",M,[(0,r.Uk)(" 儲存會員資料 "),(0,r.Wm)(a.t,{icon:"mdi-arrow-right",class:"i"})]),(0,r._)("button",{type:"button",onClick:n[6]||(n[6]=function(){return u.logout&&u.logout.apply(u,arguments)})},"登出")],32)}var x=t(124),I=t(5082),V=t(8534),C=(t(7658),t(2564),t(4870)),F=t(65),z=t(2483);const D={setup:function(){var e=(0,F.oR)(),n=(0,z.tv)(),t=(0,C.iH)(""),l=(0,C.iH)({addr:"",birth:"",name:"",tel:"",gender:"",email:""}),o=(0,r.Fl)((function(){return e.getters["member/menubarAuthInfo"]}));function a(){return u.apply(this,arguments)}function u(){return u=(0,V.Z)((0,x.Z)().mark((function n(){var t;return(0,x.Z)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.dispatch("member/getMemberInfo",o.value);case 3:t=n.sent,l.value=(0,I.Z)((0,I.Z)({},l.value),t),n.next=10;break;case 7:n.prev=7,n.t0=n["catch"](0),console.log(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])}))),u.apply(this,arguments)}function i(){return c.apply(this,arguments)}function c(){return c=(0,V.Z)((0,x.Z)().mark((function n(){return(0,x.Z)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.dispatch("member/setMemberInfo",(0,I.Z)({info:(0,I.Z)({},l.value)},o.value));case 3:e.commit("member/setMemberName",l.value.name),t.value="資料更新完成",n.next=10;break;case 7:n.prev=7,n.t0=n["catch"](0),console.log(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])}))),c.apply(this,arguments)}function d(){e.commit("member/logout"),n.push("/")}return a(),(0,r.YP)((function(){return t.value}),(function(){t.value&&setTimeout((function(){t.value=""}),2e3)})),{info:l,setMemberInfo:i,msg:t,logout:d}}};var G=t(89);const H=(0,G.Z)(D,[["render",U],["__scopeId","data-v-09a95381"]]),A=H}}]);
//# sourceMappingURL=459_'0.1.0'_1689240258835.js.map