(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{25:function(e,t,n){},26:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),s=n(16),a=n.n(s),o=n(17),i=n(2),u=n(1);function j(){return Object(u.jsx)("h2",{children:"Dashboard"})}var l=n(7),d=n.n(l),p=n(11),h=n(10),b=function(){var e={API_HOST:"http://dbhausen.pythonanywhere.com"};return e.API_HOST="http://dbhausen.pythonanywhere.com",e},O=function(){var e=Object(h.a)(d.a.mark((function e(){var t,n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==(t=sessionStorage.getItem("csrf_token"))&&null!==t){e.next=9;break}return e.next=4,fetch("".concat("http://localhost:8000","/csrf/"),{credentials:"include"});case 4:return n=e.sent,e.next=7,n.json();case 7:r=e.sent,t=r.csrfToken;case 9:return null===t?t="NO_TOKEN":sessionStorage.setItem("csrf_token",t),e.abrupt("return",t);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();n(25);function f(e,t){return x.apply(this,arguments)}function x(){return(x=Object(h.a)(d.a.mark((function e(t,n){var r,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.t0=fetch,e.t1="".concat(b().API_HOST,"/api/v1/users/auth/login/"),e.t2=t,"POST"!==t){e.next=10;break}return e.next=6,O();case 6:e.t4=e.sent,e.t3={"Content-Type":"application/json","X-CSRFToken":e.t4},e.next=11;break;case 10:e.t3={};case 11:return e.t5=e.t3,e.t6=JSON.stringify(n),e.t7={method:e.t2,headers:e.t5,credentials:"include",body:e.t6},e.next=16,(0,e.t0)(e.t1,e.t7);case 16:return r=e.sent,e.next=19,r.json();case 19:return c=e.sent,e.abrupt("return",c.key);case 21:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e){var t=e.setToken,n=Object(r.useState)(""),c=Object(p.a)(n,2),s=c[0],a=c[1],o=Object(r.useState)(""),i=Object(p.a)(o,2),j=i[0],l=i[1],b=function(){var e=Object(h.a)(d.a.mark((function e(n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,f("POST",{email:s,password:j});case 3:r=e.sent,t(r);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(u.jsxs)("div",{className:"login-wrapper",children:[Object(u.jsx)("h1",{children:"Please Log In"}),Object(u.jsxs)("form",{onSubmit:b,children:[Object(u.jsxs)("label",{children:[Object(u.jsx)("p",{children:"Username"}),Object(u.jsx)("input",{type:"text",onChange:function(e){return a(e.target.value)}})]}),Object(u.jsxs)("label",{children:[Object(u.jsx)("p",{children:"Password"}),Object(u.jsx)("input",{type:"password",onChange:function(e){return l(e.target.value)}})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"Submit"})})]}),Object(u.jsxs)("div",{children:[Object(u.jsxs)("small",{children:["You are running this application in ",Object(u.jsx)("b",{children:"production"})," mode."]}),Object(u.jsx)("form",{children:Object(u.jsx)("input",{type:"hidden",defaultValue:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_NOT_SECRET_CODE})})]})]})}function v(){return Object(u.jsx)("h2",{children:"Preferences"})}n(26);var m=function(){var e=function(){var e=Object(r.useState)(function(){var e=sessionStorage.getItem("token");if(null!==e)return console.log(e),console.log(JSON.parse(e)),JSON.parse(e)}()),t=Object(p.a)(e,2),n=t[0],c=t[1];return{setToken:function(e){sessionStorage.setItem("token",JSON.stringify(e)),c(e)},token:n}}(),t=e.token,n=e.setToken;return t?Object(u.jsxs)("div",{className:"wrapper",children:[Object(u.jsx)("h1",{children:"Application"}),Object(u.jsx)(o.a,{children:Object(u.jsxs)(i.c,{children:[Object(u.jsx)(i.a,{path:"/dashboard",children:Object(u.jsx)(j,{})}),Object(u.jsx)(i.a,{path:"/preferences",children:Object(u.jsx)(v,{})})]})})]}):Object(u.jsx)(S,{setToken:n})};n(35);a.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(m,{})}),document.getElementById("root"))}},[[36,1,2]]]);
//# sourceMappingURL=main.109019d7.chunk.js.map