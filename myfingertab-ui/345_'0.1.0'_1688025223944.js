"use strict";(self["webpackChunkmyfingertab"]=self["webpackChunkmyfingertab"]||[]).push([[345],{5345:(e,t,a)=>{a.r(t),a.d(t,{default:()=>K});var n=a(3396),u=a(9242),i=a(7139),c=a(7783),r=function(e){return(0,n.dD)("data-v-1a549c7b"),e=e(),(0,n.Cn)(),e},s={id:"sheetMusicPage"},l={class:"header"},o=r((function(){return(0,n._)("p",{class:"title"},"指彈樂譜",-1)})),v={class:"select"},p=r((function(){return(0,n._)("option",{value:"1"},"難易度:簡單到難",-1)})),h=r((function(){return(0,n._)("option",{value:"2"},"難易度:難到簡單",-1)})),g=r((function(){return(0,n._)("option",{value:"3"},"熱門程度",-1)})),f=r((function(){return(0,n._)("option",{value:"4"},"最新上架",-1)})),d=[p,h,g,f],w={for:"search"},k={class:"music_cards"},y={class:"pages_box"},P={key:0,class:"pages"},M=["onClick"];function D(e,t,a,r,p,h){var g=(0,n.up)("MusicCard"),f=(0,n.up)("MusicDetailPopup");return(0,n.wg)(),(0,n.iD)("section",s,[(0,n._)("div",l,[o,(0,n._)("div",v,[(0,n.wy)((0,n._)("select",{"onUpdate:modelValue":t[0]||(t[0]=function(e){return r.musicKind=e})},d,512),[[u.bM,r.musicKind]])]),(0,n._)("label",w,[(0,n.Uk)("樂譜搜尋 "),(0,n.wy)((0,n._)("input",{type:"text",id:"search","onUpdate:modelValue":t[1]||(t[1]=function(e){return r.searchInput=e}),onKeypress:t[2]||(t[2]=(0,u.D2)((function(){return r.searchMusicSheet&&r.searchMusicSheet.apply(r,arguments)}),["enter"]))},null,544),[[u.nr,r.searchInput]]),(0,n.Wm)(c.t,{icon:"mdi-magnify",class:"icon",onClick:r.searchMusicSheet},null,8,["onClick"])])]),(0,n._)("div",k,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.allMusic,(function(e){return(0,n.wg)(),(0,n.j4)(g,{key:e.sheetid,music:e,onOpenMusicDetail:r.openMusicDetail},null,8,["music","onOpenMusicDetail"])})),128))]),(0,n.Wm)(f,{data:r.musicDetail,show:r.showMusicDetail,onCloseMusicDetail:r.openMusicDetail},null,8,["data","show","onCloseMusicDetail"]),(0,n._)("div",y,[r.showPages?((0,n.wg)(),(0,n.iD)("div",P,[r.activePage>=2?((0,n.wg)(),(0,n.iD)("button",{key:0,type:"button",onClick:t[3]||(t[3]=function(e){return r.changeActivePage(r.activePage-1)})}," 上一頁 ")):(0,n.kq)("",!0),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.pagesArr[r.activePagesArr],(function(e){return(0,n.wg)(),(0,n.iD)("button",{type:"button",key:e,class:(0,i.C_)({active:r.activePage===e}),onClick:function(t){return r.changeActivePage(e)}},(0,i.zw)(e),11,M)})),128)),r.activePage<r.totalPages?((0,n.wg)(),(0,n.iD)("button",{key:1,type:"button",onClick:t[4]||(t[4]=function(e){return r.changeActivePage(r.activePage+1)})}," 下一頁 ")):(0,n.kq)("",!0),r.activePage<r.totalPages?((0,n.wg)(),(0,n.iD)("button",{key:2,type:"button",onClick:t[5]||(t[5]=function(e){return r.changeActivePage(r.totalPages)})}," 最後 ")):(0,n.kq)("",!0)])):(0,n.kq)("",!0),r.activePage<r.totalPages?((0,n.wg)(),(0,n.iD)("button",{key:1,type:"button",class:"loadBtn",onClick:t[6]||(t[6]=function(e){return r.changeActivePage(r.activePage+1)})}," 載入更多 ")):(0,n.kq)("",!0)])])}var b=a(124),m=a(9584),_=a(8534),C=(a(2222),a(7658),a(1038),a(8783),a(7042),a(2406)),H=a(2533),Z=a(4870),A=a(65);const x={components:{MusicCard:C.Z,MusicDetailPopup:H.Z},setup:function(){var e=(0,A.oR)(),t=(0,Z.iH)([]),a=(0,Z.iH)({}),u=(0,Z.iH)(!1),i=(0,Z.iH)("1"),c=(0,Z.iH)(9),r=(0,Z.iH)(""),s=(0,Z.iH)(0),l=(0,Z.iH)(0),o=(0,Z.iH)([]),v=(0,Z.iH)(0),p=(0,Z.iH)(1),h=(0,Z.iH)(!0);function g(){return f.apply(this,arguments)}function f(){return f=(0,_.Z)((0,b.Z)().mark((function a(){var n,u,r;return(0,b.Z)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.dispatch("getAllMusic",{pageSize:c.value,kind:i.value,page:p.value});case 2:for(n=a.sent,window.innerWidth<=550?t.value=[].concat((0,m.Z)(t.value),(0,m.Z)(n.SheetInfo)):t.value=n.SheetInfo,s.value=n.totalpage,h.value=!0,u=[],r=1;r<=s.value;r++)u.push(r);Array.from({length:Math.ceil(s.value/5)},(function(e,t){var a=5*t,n=5*(t+1);o.value.push(u.slice(a,n))}));case 9:case"end":return a.stop()}}),a)}))),f.apply(this,arguments)}function d(){return w.apply(this,arguments)}function w(){return w=(0,_.Z)((0,b.Z)().mark((function a(){var n;return(0,b.Z)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r.value.length){a.next=2;break}return a.abrupt("return",g());case 2:return a.next=4,e.dispatch("searchMusicSheet",{keyword:r.value});case 4:n=a.sent,t.value=n,s.value=0,h.value=!1;case 8:case"end":return a.stop()}}),a)}))),w.apply(this,arguments)}function k(e){return y.apply(this,arguments)}function y(){return y=(0,_.Z)((0,b.Z)().mark((function t(n){var i;return(0,b.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n){t.next=4;break}return u.value=!1,a.value={},t.abrupt("return");case 4:return t.next=6,e.dispatch("getSingleMusicSheet",{sheetid:n,userid:"userid-1"});case 6:i=t.sent,a.value=i,u.value=!0;case 9:case"end":return t.stop()}}),t)}))),y.apply(this,arguments)}function P(e){p.value=e}return g(),(0,n.YP)((function(){return[p.value,i.value]}),(function(){var e=o.value[v.value][4],t=o.value[v.value][0];p.value>e&&v.value++,p.value<t&&v.value--,p.value===s.value&&(v.value=o.value.length-1),g()})),{allMusic:t,musicKind:i,searchInput:r,getMusic:g,searchMusicSheet:d,totalPages:s,active:l,pagesArr:o,activePagesArr:v,activePage:p,musicDetail:a,showMusicDetail:u,openMusicDetail:k,changeActivePage:P,showPages:h}}};var S=a(89);const I=(0,S.Z)(x,[["render",D],["__scopeId","data-v-1a549c7b"]]),K=I}}]);
//# sourceMappingURL=345_'0.1.0'_1688025223944.js.map