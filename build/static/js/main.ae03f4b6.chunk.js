(this["webpackJsonpaxie-manager"]=this["webpackJsonpaxie-manager"]||[]).push([[0],{42:function(e,t,a){},43:function(e,t,a){},69:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a.n(c),s=a(17),r=a.n(s),i=(a(42),a(12)),l=(a(43),a(3)),o=a(13),d=a(10),j=function(e){return{type:"SET_IS_LOGGED_IN",isLoggedIn:e}},b=a(1),h=function(e){Object(i.a)(e);var t=Object(o.b)(),a=Object(c.useState)(""),n=Object(d.a)(a,2),s=n[0],r=n[1],l=Object(c.useState)(""),h=Object(d.a)(l,2),u=h[0],x=h[1];return Object(b.jsxs)("div",{children:[Object(b.jsx)("br",{}),Object(b.jsx)("h4",{children:"Login"}),Object(b.jsx)("br",{}),Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t(function(e,t){return function(a,c){return a(j("admin"===e&&"axie-manager-admin"===t))}}(s,u))},children:[Object(b.jsx)("input",{placeholder:"Username",type:"text",value:s,onChange:function(e){r(e.target.value)},required:!0}),Object(b.jsx)("br",{}),Object(b.jsx)("input",{placeholder:"Password",type:"password",value:u,onChange:function(e){x(e.target.value)},required:!0}),Object(b.jsx)("br",{}),Object(b.jsx)("button",{type:"submit",children:"Log in"})]})]})},u=a(24),x=a.n(u),O=a(9),p=a(37),m=a(35),g=a(20),f=a.n(g),y=["https://game-api.skymavis.com/game-api/clients/","/items/1"],v=function(e){Object(i.a)(e);var t=Object(c.useState)(0),a=Object(d.a)(t,2),n=a[0],s=a[1],r=Object(c.useState)([]),l=Object(d.a)(r,2),o=l[0],j=l[1],h=Object(c.useState)({}),u=Object(d.a)(h,2),g=u[0],v=u[1];return Object(c.useEffect)(Object(m.a)(x.a.mark((function e(){var t,a,c,n,r;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.get("/api/daily/");case 3:return e.next=5,e.sent.data.response.data.wallets;case 5:return t=e.sent,a=t.map((function(e){return f.a.get("".concat(y[0]+e.add+y[1]))})),e.next=9,Promise.all(a);case 9:return c=e.sent,n=0,c.forEach((function(e,a){var c=e.data;t[a].total=c.total,n+=c.total*t[a].rate})),s(n),j(Object(p.a)(t)),e.next=16,f.a.get("/api/coins/all");case 16:r=e.sent,v(Object(O.a)({},r.data.response.data)),e.next=23;break;case 20:e.prev=20,e.t0=e.catch(0),console.error(e.t0);case 23:return e.abrupt("return",(function(){}));case 24:case"end":return e.stop()}}),e,null,[[0,20]])}))),[]),Object(b.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(b.jsxs)("div",{className:"card",style:{maxWidth:1024,display:"flex",alignItems:"center",justifyContent:"center",marginTop:"5vh",marginLeft:8,marginRight:8,padding:8,minWidth:391},children:[Object(b.jsx)("h4",{className:"mt-2",children:"Dashboard"}),Object(b.jsx)("button",{type:"button",className:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",style:{borderRadius:"50%"},children:"+"}),Object(b.jsx)("br",{}),Object(b.jsxs)("div",{children:[Object(b.jsx)("strong",{children:"ETH:"})," $",g.eth]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("strong",{children:"SLP:"})," $",g.slp]}),Object(b.jsx)("br",{}),Object(b.jsxs)("div",{children:[Object(b.jsx)("strong",{children:"Total (manager):"}),"\xa0",n," slp | \xa0$",Math.round(n*g.slp*100)/100," |","\xa0",Math.round(n*g.slp/g.eth*1e5)/1e5," eth"]}),Object(b.jsx)("br",{}),Object(b.jsxs)("table",{className:"table table-striped",children:[Object(b.jsx)("caption",{children:"Note: All units are in SLP except for 'Split' column"}),Object(b.jsx)("thead",{children:Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{scope:"col",children:"Name"}),Object(b.jsx)("th",{scope:"col",children:"Total"}),Object(b.jsx)("th",{scope:"col",children:"Daily"}),Object(b.jsx)("th",{scope:"col",children:"Manager"}),Object(b.jsx)("th",{scope:"col",children:"Scholar"}),Object(b.jsx)("th",{scope:"col",children:"Split"})]})}),Object(b.jsx)("tbody",{children:o.length?o.map((function(e,t){return Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{scope:"row",children:Object(b.jsx)("strong",{children:e.user})}),Object(b.jsx)("td",{style:{textAlign:"right"},children:e.total}),Object(b.jsx)("td",{style:{textAlign:"right"},children:e.total-e.start}),Object(b.jsx)("td",{style:{textAlign:"right"},children:e.total*e.rate}),Object(b.jsx)("td",{style:{textAlign:"right"},children:e.total*(1-e.rate)}),Object(b.jsxs)("td",{style:{textAlign:"center"},children:[100*e.rate,"%"]})]},"row-".concat(t))})):Object(b.jsx)("tr",{children:Object(b.jsxs)("td",{colSpan:100,style:{textAlign:"center"},children:["No Data",Object(b.jsx)("br",{}),Object(b.jsx)("button",{type:"button",className:"btn btn-outline-primary","data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",children:"Add scholar"})]})})})]}),Object(b.jsx)("div",{className:"modal fade",id:"staticBackdrop","data-bs-backdrop":"static","data-bs-keyboard":"false",tabIndex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true",children:Object(b.jsx)("div",{className:"modal-dialog modal-dialog-centered modal-dialog-scrollable",children:Object(b.jsxs)("div",{className:"modal-content",children:[Object(b.jsxs)("div",{className:"modal-header",children:[Object(b.jsx)("h5",{className:"modal-title",id:"staticBackdropLabel",children:"Add scholar"}),Object(b.jsx)("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),Object(b.jsx)("div",{className:"modal-body",children:"Coming soon..."}),Object(b.jsxs)("div",{className:"modal-footer",children:[Object(b.jsx)("button",{type:"button",className:"btn btn-secondary","data-bs-dismiss":"modal",children:"Close"}),Object(b.jsx)("button",{type:"button",className:"btn btn-primary",children:"Submit"})]})]})})})]})})},S=function(e){Object(i.a)(e);var t=Object(o.c)((function(e){return e.user.isLoggedIn}));return Object(b.jsxs)("div",{className:"App",children:[t?Object(b.jsx)(l.a,{to:"/dashboard"}):Object(b.jsx)(l.a,{to:"/login"}),Object(b.jsx)("div",{style:{position:"sticky",top:0,width:"100%",zIndex:100,backgroundColor:"white",padding:"12px 16px",boxShadow:"0 2px 2px -2px gray"},children:Object(b.jsxs)("div",{style:{textAlign:"center",lineHeight:"1.2"},children:[Object(b.jsx)("div",{style:{fontSize:"calc(1.325rem + .9vw)",fontWeight:500},children:"Axie Manager"}),Object(b.jsx)("sub",{style:{bottom:"0"},children:"v-0.0.2"})]})}),Object(b.jsxs)(l.d,{children:[Object(b.jsx)(l.b,{path:"/login",component:h}),Object(b.jsx)(l.b,{path:"/dashboard",component:v}),Object(b.jsx)(l.b,{path:"/",component:v})]})]})},N=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,70)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,s=t.getLCP,r=t.getTTFB;a(e),c(e),n(e),s(e),r(e)}))},L=a(16),k=a(36),I={email:"",username:"",isLoggedIn:!0},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_IS_LOGGED_IN":return t.isLoggedIn||(document.cookie="auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;",document.cookie="email=; expires=Thu, 01 Jan 1970 00:00:01 GMT;",document.cookie="password=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"),Object(O.a)(Object(O.a)({},e),{},{isLoggedIn:t.isLoggedIn});case"SET_EMAIL":return Object(O.a)(Object(O.a)({},e),{},{email:t.email});case"SET_USERNAME":return Object(O.a)(Object(O.a)({},e),{},{username:t.username});default:return e}},w=Object(L.b)({user:T}),A=a(23),E=Object(L.c)(w,Object(L.a)(k.a));r.a.render(Object(b.jsx)(n.a.StrictMode,{children:Object(b.jsx)(o.a,{store:E,children:Object(b.jsx)(A.a,{children:Object(b.jsx)(S,{})})})}),document.getElementById("root")),N()}},[[69,1,2]]]);
//# sourceMappingURL=main.ae03f4b6.chunk.js.map