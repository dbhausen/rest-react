(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{127:function(e,t,n){},138:function(e,t,n){},142:function(e,t,n){},143:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(13),i=n.n(c),s=n(98),o=n(18),u=function(){var e={API_HOST:"http://dbhausen.pythonanywhere.com"};return e.API_HOST="http://dbhausen.pythonanywhere.com",e},l=n(7),d=n(21),j=n.n(d),b=n(35),p=function(){var e=Object(b.a)(j.a.mark((function e(){var t,n,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==(t=sessionStorage.getItem("csrf_token"))&&null!==t){e.next=9;break}return e.next=4,fetch("".concat(u().API_HOST,"/csrf/"),{credentials:"include"});case 4:return n=e.sent,e.next=7,n.json();case 7:r=e.sent,t=r.csrfToken;case 9:return null===t?t="NO_TOKEN":sessionStorage.setItem("csrf_token",t),e.abrupt("return",t);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),h=(n(127),n(4)),O=function(){var e=Object(b.a)(j.a.mark((function e(t,n){var r,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.t0=fetch,e.t1="".concat(u().API_HOST,"/api/v1/users/auth/login/"),e.t2=t,"POST"!==t){e.next=10;break}return e.next=6,p();case 6:e.t4=e.sent,e.t3={"Content-Type":"application/json","X-CSRFToken":e.t4},e.next=11;break;case 10:e.t3={};case 11:return e.t5=e.t3,e.t6=JSON.stringify(n),e.t7={method:e.t2,headers:e.t5,credentials:"include",body:e.t6},e.next=16,(0,e.t0)(e.t1,e.t7);case 16:return r=e.sent,e.next=19,r.json();case 19:return a=e.sent,e.abrupt("return",a.key);case 21:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),f=function(e){var t=e.setToken,n=Object(r.useState)("d@dd.com"),a=Object(l.a)(n,2),c=a[0],i=a[1],s=Object(r.useState)("postman!!01"),o=Object(l.a)(s,2),u=o[0],d=o[1],p=function(){var e=Object(b.a)(j.a.mark((function e(n){var r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,O("POST",{email:c,password:u});case 3:r=e.sent,t(r);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsxs)("div",{className:"login-wrapper",children:[Object(h.jsx)("h1",{children:"Please Log In"}),Object(h.jsxs)("form",{onSubmit:p,children:[Object(h.jsxs)("label",{children:[Object(h.jsx)("p",{children:"Username"}),Object(h.jsx)("input",{value:c,type:"text",onChange:function(e){return i(e.target.value)}})]}),Object(h.jsxs)("label",{children:[Object(h.jsx)("p",{children:"Password"}),Object(h.jsx)("input",{value:u,type:"password",onChange:function(e){return d(e.target.value)}})]}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{type:"submit",children:"Submit"})})]}),Object(h.jsxs)("div",{children:[Object(h.jsxs)("small",{children:["You are running this application in ",Object(h.jsx)("b",{children:"production"})," mode."]}),Object(h.jsx)("form",{children:Object(h.jsx)("input",{type:"hidden",defaultValue:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_NOT_SECRET_CODE})})]})]})},x=n(12),m=n(32),v=n(92),y=n(194),k=n(23),T=n(38),S=n(26),g=n(79),w=n(54),_=n(195),C=n(196),P=n(149),R=n(95),A=n(2),I=n(148),N=n(106),E=n(107),H=n(75),F=["decimal","float","number","dateTime-local","date","email","checkbox","text"];function D(e){var t=e.inputRef,n=e.onChange,r=Object(A.a)(e,["inputRef","onChange"]);return Object(h.jsx)(H.a,Object(k.a)(Object(k.a)({},r),{},{getInputRef:t,onChange:n,decimalScale:2,fixedDecimalScale:!0,thousandSeparator:!0,isNumericString:!0}))}function J(e){var t=e.inputRef,n=e.onChange,r=Object(A.a)(e,["inputRef","onChange"]);return Object(h.jsx)(H.a,Object(k.a)(Object(k.a)({},r),{},{getInputRef:t,onChange:n,isNumericString:!0}))}var U=function(e){var t,n=e.type,r=e.value,a=e.label;return F.includes(n)?("decimal"===n?t=D:"float"===n&&(t=J),"checkbox"===n?Object(h.jsx)(g.a,{elevation:3,children:Object(h.jsx)(I.a,{control:Object(h.jsx)(N.a,Object(k.a)(Object(k.a)({},e),{},{onClick:e.onChange,color:"primary",checked:r})),label:a})}):Object(h.jsx)(g.a,{elevation:3,variant:"elevation",children:Object(h.jsx)(E.a,Object(k.a)(Object(k.a)({},e),{},{variant:"standard",InputProps:{inputComponent:t}}))})):Object(h.jsx)(y.a,{justify:"center",children:Object(h.jsxs)(g.a,{variant:"outlined",children:["type ",n," is not implemented"]})})},B=new(function(){function e(){var t=this;Object(T.a)(this,e),this.url=void 0,this.hook=void 0,this.metaFields=void 0,this.handleRowSelected=function(e){var n=t.metaFields.map((function(t){var n=t;return n.value=e.data[t.name],n}));t.hook(n),console.log(e)},this.getRows=Object(b.a)(j.a.mark((function e(){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t.url,{method:"GET"}).then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){throw console.error("no database >>> ".concat(e)),e}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)}))),this.getColumns=Object(b.a)(j.a.mark((function e(){var n,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getMetaFields();case 2:return n=e.sent,r=n.map((function(e){return{field:e.name,headerName:e.label,type:e.colType}})),e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)}))),this.getMetaFields=Object(b.a)(j.a.mark((function e(){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t.url,{method:"OPTIONS"}).then((function(e){return e.json()})).then((function(e){var t=e.actions.POST,n=[];for(var r in t){var a=t[r],c={name:r,modelType:a.type,inputType:a.type,inputShrink:!0,colType:"string",required:a.required,readOnly:a.read_only,label:a.label,width:150,value:""};switch(a.type){case"integer":c.inputType="number",c.colType="number";break;case"decimal":case"float":c.colType="number";break;case"boolean":c.inputType="checkbox",c.value=!1;break;case"datetime":c.inputType="dateTime-local",c.colType="dateTime",c.width=300;break;case"date":c.width=300;break;case"string":c.inputType="text";break;case"email":c.colType="string";break;case"file upload":c.width=300,c.colType="string"}n.push(c)}return n}));case 2:return n=e.sent,t.metaFields=n,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})))}return Object(S.a)(e,[{key:"setUrl",value:function(e){this.url=e}},{key:"setHook",value:function(e){this.hook=e}}]),e}()),L=function(e){var t=[],n=Object(r.useState)(t),a=Object(l.a)(n,2),c=a[0],i=a[1],s=Object(r.useState)([]),o=Object(l.a)(s,2),u=o[0],d=o[1];return B.setUrl(e.url),Object(r.useEffect)((function(){c===t&&(e.cols?i(e.cols):B.getColumns().then((function(e){i(e)})).catch((function(e){console.error(e)})),B.getRows().then((function(e){d(e)})).catch((function(e){console.error(e)})))}),[]),Object(h.jsx)(R.a,{rows:u,columns:c,onRowSelected:B.handleRowSelected})},W=function(e){var t=Object(m.a)((function(){return Object(v.a)({wordwrap:{overflowWrap:"anywhere"}})})),n=[],a=Object(r.useState)(n),c=Object(l.a)(a,2),i=c[0],s=c[1],o=Object(r.useState)(""),d=Object(l.a)(o,2),O=d[0],f=d[1],T=Object(r.useState)({ok:!1,statusText:"",url:""}),S=Object(l.a)(T,2),R=S[0],A=S[1],I=t();B.setUrl(e.url),B.setHook(s),Object(r.useEffect)((function(){i===n&&B.getMetaFields().then((function(e){s(e)})).catch((function(){}))}));var N=function(e){var t=e.target.value,n=e.target,r=n.type,a=n.id,c=n.checked,i=parseInt(a,10);s((function(e){return e.map((function(e,n){return n!==i?e:("checkbox"===r&&(t=c),Object(k.a)(Object(k.a)({},e),{},{value:t}))}))}))},E=function(){var e=Object(b.a)(j.a.mark((function e(t){var n,r,a,c,s,o,l,d,b;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),n=i.filter((function(e){return e.value&&e.readOnly})).map((function(e){return{name:e.name,value:e.value}})),r=0,(a=n.length>0)&&(r=n[0].value),c=(c=i.filter((function(e){return!e.readOnly})).map((function(e){var t={name:e.name,value:e.value};return"decimal"===e.inputType&&e.value&&(t.value=t.value.replaceAll(",",""),t.value=t.value.replaceAll("$",""),t.value=t.value.replaceAll(" ",""),t.value=parseFloat(t.value)),"number"===e.inputType&&e.value&&(t.value=parseInt(t.value,10)),""===t.value&&(t.value=null),t}))).concat(n),!H()){e.next=34;break}if(s=c.reduce((function(e,t){return Object(k.a)(Object(k.a)({},e),{},Object(x.a)({},t.name,t.value))}),{}),f(JSON.stringify(s)),!a){e.next=24;break}return e.next=14,p();case 14:return e.t0=e.sent,e.t1={"Content-Type":"application/json","X-CSRFToken":e.t0},e.t2=JSON.stringify(s),o={method:"PUT",headers:e.t1,body:e.t2,id:2},e.next=20,fetch("".concat(u().API_HOST,"/api/update/").concat(r),o);case 20:l=e.sent,A({ok:l.ok,statusText:l.statusText,url:l.url}),e.next=34;break;case 24:return e.next=26,p();case 26:return e.t3=e.sent,e.t4={"Content-Type":"application/json","X-CSRFToken":e.t3},e.t5=JSON.stringify(s),d={method:"POST",headers:e.t4,body:e.t5},e.next=32,fetch("".concat(u().API_HOST,"/api/"),d);case 32:b=e.sent,A({ok:b.ok,statusText:b.statusText,url:b.url});case 34:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),H=function(){return!0};return Object(h.jsx)(y.a,{item:!0,direction:"column",container:!0,spacing:0,children:Object(h.jsxs)("form",{onSubmit:E,children:[i.map((function(e,t){return Object(h.jsx)("div",{children:e.readOnly?Object(h.jsx)(y.a,{item:!0,children:Object(h.jsx)(g.a,{variant:"outlined",children:Object(h.jsx)("span",{children:"".concat(e.name," : ").concat(e.value)})})}):Object(h.jsx)(y.a,{item:!0,children:Object(h.jsx)(U,{label:e.label,type:e.inputType,fullWidth:!0,value:e.value,required:e.required,onChange:N,id:t.toString(),name:e.name,InputLabelProps:{shrink:e.inputShrink}})})},e.name)})),Object(h.jsx)(y.a,{item:!0,children:Object(h.jsx)(w.a,{variant:"contained",color:"primary",type:"submit",children:"submit"})}),Object(h.jsx)(y.a,{item:!0,children:Object(h.jsx)(_.a,{children:Object(h.jsxs)(C.a,{children:[Object(h.jsx)(P.a,{color:"textPrimary",gutterBottom:!0,children:"Data sent:"}),Object(h.jsx)(P.a,{variant:"body2",component:"p",className:I.wordwrap,children:O}),Object(h.jsx)(P.a,{color:"textPrimary",gutterBottom:!0,children:"Response:"}),Object(h.jsxs)(P.a,{variant:"body2",component:"div",children:[Object(h.jsxs)(y.a,{container:!0,direction:"row",children:[Object(h.jsx)(y.a,{item:!0,xs:2,children:"Ok:"}),Object(h.jsx)(y.a,{children:R.ok.toString()})]}),Object(h.jsxs)(y.a,{container:!0,direction:"row",children:[Object(h.jsx)(y.a,{item:!0,xs:2,children:"Status Text:"}),Object(h.jsx)(y.a,{children:R.statusText})]}),Object(h.jsxs)(y.a,{container:!0,direction:"row",children:[Object(h.jsx)(y.a,{item:!0,xs:2,children:"Url:"}),Object(h.jsx)(y.a,{children:R.url})]})]})]})})})]})})},q=[{field:"myemail",width:250,headerName:"Email Address"},{field:"id"}],K=function(){var e=Object(m.a)((function(e){return Object(v.a)({header:{border:"1px",borderStyle:"solid",borderTopLeftRadius:"7px",borderTopRightRadius:"7px",background:"#90A4AE"},body:Object(x.a)({flexGrow:1,background:"#90A4AE"},e.breakpoints.down("xs"),{background:"red"}),footer:{border:"1px",borderStyle:"solid",borderBottomLeftRadius:"7px",borderBottomRightRadius:"7px",background:"#90A4AE"}})}))();return Object(h.jsxs)(y.a,{container:!0,direction:"column",spacing:1,children:[Object(h.jsx)(y.a,{item:!0,xs:12,className:e.header,children:"Header"}),Object(h.jsxs)(y.a,{item:!0,xs:12,container:!0,direction:"row",spacing:0,className:e.body,children:[Object(h.jsx)(y.a,{item:!0,xs:3,style:{minWidth:"250px"},children:Object(h.jsx)(W,{url:"".concat(u().API_HOST,"/api/")})}),Object(h.jsx)(y.a,{item:!0,xs:9,style:{flexShrink:1,minHeight:"400px"},children:Object(h.jsx)(L,{url:"".concat(u().API_HOST,"/api/"),cols:q})})]}),Object(h.jsx)(y.a,{item:!0,xs:12,className:e.footer,children:"footer"})]})},M=n(49),X=n(191),G=Object(M.a)({palette:{type:"dark",primary:{main:"#304ffe"},secondary:{main:"#009688"}}}),V=function(e){return Object(h.jsx)(X.a,{theme:G,children:e.children})},Y=(n(138),function(){var e=Object(r.useState)(function(){var e=sessionStorage.getItem("token");if(null!==e)return JSON.parse(e)}()),t=Object(l.a)(e,2),n=t[0],a=t[1];return{setToken:function(e){sessionStorage.setItem("token",JSON.stringify(e)),a(e)},token:n}});var $=function(){var e=Y(),t=e.token,n=e.setToken;return t?Object(h.jsx)(V,{children:Object(h.jsxs)("div",{className:"wrapper",children:[Object(h.jsx)("h1",{children:"Application"}),Object(h.jsx)(s.a,{children:Object(h.jsxs)(o.c,{children:[Object(h.jsx)(o.a,{path:"/rest_grid",children:Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{children:Object(h.jsx)(L,{url:"".concat(u().API_HOST,"/api/"),cols:[{field:"myemail",width:250,headerName:"Email Address"},{field:"id"}]})}),Object(h.jsx)("div",{children:Object(h.jsx)(L,{url:"".concat(u().API_HOST,"/api/")})})]})}),Object(h.jsx)(o.a,{path:"/rest_form",children:Object(h.jsx)(K,{})})]})})]})}):Object(h.jsx)(f,{setToken:n})};n(142);i.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)($,{})}),document.getElementById("root"))}},[[143,1,2]]]);
//# sourceMappingURL=main.35a301d7.chunk.js.map