(this["webpackJsonpaxie-manager"]=this["webpackJsonpaxie-manager"]||[]).push([[0],{105:function(e,t,a){},106:function(e,t,a){},235:function(e,t,a){"use strict";a.r(t);var n,c=a(0),s=a.n(c),r=a(38),i=a.n(r),l=(a(105),a(39)),o=(a(106),a(3)),d=a(24),b=a(6),j=function(e){return{type:"SET_IS_LOGGED_IN",isLoggedIn:e}},u=a(1),h=function(e){Object(l.a)(e);var t=Object(d.b)(),a=Object(c.useState)(""),n=Object(b.a)(a,2),s=n[0],r=n[1],i=Object(c.useState)(""),o=Object(b.a)(i,2),h=o[0],O=o[1];return Object(u.jsxs)("div",{children:[Object(u.jsx)("br",{}),Object(u.jsx)("h4",{children:"Login"}),Object(u.jsx)("br",{}),Object(u.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t(function(e,t){return function(a,n){return a(j("admin"===e&&"axie-manager-admin"===t))}}(s,h))},children:[Object(u.jsx)("input",{placeholder:"Username",type:"text",value:s,onChange:function(e){r(e.target.value)},required:!0}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{placeholder:"Password",type:"password",value:h,onChange:function(e){O(e.target.value)},required:!0}),Object(u.jsx)("br",{}),Object(u.jsx)("button",{type:"submit",children:"Log in"})]})]})},O=a(55),x=a.n(O),g=a(8),p=a(4),m=a(92),f=a(56),y=a.n(f),v=a(60),S="slp",k="usd",N="eth",C="add",T="DETAILS",A=["jk","pkt","mpt","pl","jkb","pls","plc1","plc2"],I=function(e){var t=e.add,a=void 0===t?"":t,n=e.user,c=void 0===n?"":n,s=e.rate,r=void 0===s?0:s,i=e.total,l=void 0===i?0:i,o=e.start,d=void 0===o?0:o,b=e.earnings,j=void 0===b?[]:b;return{add:String(a),user:String(c),rate:Number(r),total:Number(l),start:Number(d),earnings:j.map((function(e){return Number(e)}))}},L=a(95),w=a(96).a.tr(n||(n=Object(L.a)(["\n  cursor: pointer;\n\n  :hover {\n    background-color: #7aa9f5;\n  }\n"]))),M=function(){var e=Object(o.g)().search,t=new URLSearchParams(e).get("user"),a=Object(c.useState)(0),n=Object(b.a)(a,2),r=n[0],i=n[1],l=Object(c.useState)([]),d=Object(b.a)(l,2),j=d[0],h=d[1],O=Object(c.useState)({}),f=Object(b.a)(O,2),L=f[0],M=f[1],E=Object(c.useState)(S),D=Object(b.a)(E,2),F=D[0],B=D[1],R=Object(c.useState)(1),P=Object(b.a)(R,2),_=P[0],G=P[1],U=Object(c.useState)(10),W=Object(b.a)(U,2),J=W[0],z=W[1],H=Object(c.useState)(C),$=Object(b.a)(H,2),q=$[0],K=$[1],Q=Object(c.useState)(I({})),V=Object(b.a)(Q,2),X=V[0],Y=V[1],Z=Object(c.useRef)();Object(c.useEffect)((function(){return ee(),function(){}}),[]);var ee=function(){var e=Object(m.a)(x.a.mark((function e(){var a,n,c,s,r;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,"mock"!==t){e.next=4;break}return h([{add:"0xa06775d35109ebb35ad97f79984bc338f9eb5cc5",user:"mock",rate:1,start:1001,total:1076,earnings:[548,680,842,1001]}]),e.abrupt("return");case 4:return e.next=6,y.a.get("/api/daily/fetch");case 6:return e.next=8,e.sent.data.response.data;case 8:return a=e.sent,n=a.wallets,c=a.managerTotal,"manager"===t?(i(c),h(Object(p.a)(n))):A.includes(t)&&(s=n.filter((function(e){return e.user===t})),h(Object(p.a)(s))),e.next=13,y.a.get("/api/coins/all");case 13:r=e.sent,M(Object(g.a)({},r.data.response.data)),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(0),console.error(e.t0);case 20:case"end":return e.stop()}}),e,null,[[0,17]])})));return function(){return e.apply(this,arguments)}}(),te=function(){K(C)},ae=function(e){if(!e)return[];for(var t=new Date,a=[],n="",c=0;c<=e;c++)n=(n=new Date(t-24*(e-c)*3600*1e3).toUTCString()).split(" "),n="".concat(n[2]," ").concat(n[1]),a.push(n);return a};return"manager"===t||A.includes(t)||"mock"===t?Object(u.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(u.jsxs)("div",{className:"card",style:{maxWidth:1024,display:"flex",alignItems:"center",justifyContent:"center",marginTop:"5vh",marginLeft:8,marginRight:8,padding:8,minWidth:373},children:[Object(u.jsx)("h4",{className:"mt-2",children:"Dashboard"}),"manager"===t&&Object(u.jsxs)(s.a.Fragment,{children:[Object(u.jsx)("button",{type:"button",className:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",style:{borderRadius:"50%"},onClick:te,children:"+"}),Object(u.jsx)("br",{})]}),1===j.length&&Object(u.jsx)(v.a,{data:{labels:ae(j[0].earnings.length)||[],datasets:[{label:"total",fill:!0,lineTension:.5,backgroundColor:"rgba(75, 192, 192, .3)",borderColor:"rgba(0, 0, 0, 1)",borderWidth:2,data:[].concat(Object(p.a)(j[0].earnings),[j[0].total])||[]}]},options:{plugins:{title:{display:!0,text:"SLP earnings for past 14 days",fontSize:20},legend:{display:!0}}}}),Object(u.jsxs)("div",{children:[Object(u.jsx)("strong",{children:"ETH:"})," $",L.eth]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("strong",{children:"SLP:"})," $",L.slp]}),"manager"===t&&Object(u.jsxs)(s.a.Fragment,{children:[Object(u.jsx)("br",{}),Object(u.jsxs)("div",{children:[Object(u.jsx)("strong",{children:"Total (manager):"}),"\xa0",r," slp | \xa0$",Math.round(r*L.slp*100)/100," | \xa0",Math.round(r*L.slp/L.eth*1e5)/1e5," eth"]})]}),Object(u.jsxs)("div",{className:"btn-group",role:"group","aria-label":"Radio toggle for basic unit of table",children:[Object(u.jsx)("input",{type:"radio",className:"btn-check",name:"btnradio",id:"val-slp",autocomplete:"off",checked:F===S,onClick:function(){B(S),G(1),z(10)}}),Object(u.jsx)("label",{className:"btn btn-outline-primary",for:"val-slp",style:{boxShadow:"none"},children:"SLP"}),Object(u.jsx)("input",{type:"radio",className:"btn-check",name:"btnradio",id:"val-usd",autocomplete:"off",checked:F===k,onClick:function(){B(k),G(L.slp),z(100)}}),Object(u.jsx)("label",{className:"btn btn-outline-primary",for:"val-usd",style:{boxShadow:"none"},children:"USD"}),Object(u.jsx)("input",{type:"radio",className:"btn-check",name:"btnradio",id:"val-eth",autocomplete:"off",checked:F===N,onClick:function(){B(N),G(L.slp/L.eth),z(1e3)}}),Object(u.jsx)("label",{className:"btn btn-outline-primary",for:"val-eth",style:{boxShadow:"none"},children:"ETH"})]}),Object(u.jsxs)("table",{className:"table table-striped",children:[Object(u.jsxs)("caption",{children:["Note: All units are in ",F.toUpperCase()," except for 'Split' column"]}),Object(u.jsx)("thead",{children:Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{style:{textAlign:"center"},scope:"col",children:"Name"}),Object(u.jsx)("th",{style:{textAlign:"center"},scope:"col",children:"Total"}),Object(u.jsx)("th",{style:{textAlign:"center"},scope:"col",children:"Daily"}),Object(u.jsx)("th",{style:{textAlign:"center"},scope:"col",children:"Manager"}),Object(u.jsx)("th",{style:{textAlign:"center"},scope:"col",children:"Scholar"}),Object(u.jsx)("th",{style:{textAlign:"center"},scope:"col",children:"Split"})]})}),Object(u.jsx)("tbody",{children:j.length?j.map((function(e,t){return Object(u.jsxs)(w,{onClick:function(){return e=t,K(T),Y(I(j[e])),void Z.current.click();var e},children:[Object(u.jsx)("th",{scope:"row",children:Object(u.jsx)("strong",{children:e.user})}),Object(u.jsx)("td",{style:{textAlign:"right"},children:Math.round(e.total*_*J)/J}),Object(u.jsx)("td",{style:{textAlign:"right"},children:Math.round((e.total-e.start)*_*J)/J}),Object(u.jsx)("td",{style:{textAlign:"right"},children:Math.round(e.total*e.rate*_*J)/J}),Object(u.jsx)("td",{style:{textAlign:"right"},children:Math.round(e.total*(1-e.rate)*_*J)/J}),Object(u.jsxs)("td",{style:{textAlign:"center"},children:[100*e.rate,"%"]})]},"row-".concat(t))})):Object(u.jsx)("tr",{children:Object(u.jsxs)("td",{colSpan:100,style:{textAlign:"center"},children:["No Data","manager"===t&&Object(u.jsxs)(s.a.Fragment,{children:[Object(u.jsx)("br",{}),Object(u.jsx)("button",{type:"button",className:"btn btn-outline-primary","data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",onClick:te,children:"Add scholar"})]})]})})})]}),Object(u.jsx)("button",{ref:Z,type:"button",className:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",style:{display:"none"},children:"ROW INFORMATION MODAL"}),Object(u.jsx)("div",{className:"modal fade",id:"staticBackdrop","data-bs-backdrop":"static","data-bs-keyboard":"false",tabIndex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true",children:Object(u.jsx)("div",{className:"modal-dialog modal-dialog-centered modal-dialog-scrollable",children:Object(u.jsxs)("div",{className:"modal-content",children:[Object(u.jsxs)("div",{className:"modal-header",children:[Object(u.jsxs)("h5",{className:"modal-title",id:"staticBackdropLabel",children:[q===C&&Object(u.jsx)(s.a.Fragment,{children:"Add scholar"}),q===T&&Object(u.jsxs)(s.a.Fragment,{children:["Information on ",X.user||""]})]}),Object(u.jsx)("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),Object(u.jsxs)("div",{className:"modal-body",children:[q===C&&Object(u.jsx)(s.a.Fragment,{children:"Coming soon..."}),q===T&&Object(u.jsxs)(s.a.Fragment,{children:[Object(u.jsx)(v.a,{data:{labels:ae(null===X||void 0===X?void 0:X.earnings.length)||[],datasets:[{label:"total",fill:!0,lineTension:.5,backgroundColor:"rgba(75, 192, 192, .3)",borderColor:"rgba(0, 0, 0, 1)",borderWidth:2,data:[].concat(Object(p.a)(null===X||void 0===X?void 0:X.earnings),[null===X||void 0===X?void 0:X.total])||[]}]},options:{plugins:{title:{display:!0,text:"SLP earnings for past 14 days",fontSize:20},legend:{display:!0}}}}),Object(u.jsxs)("ul",{children:[Object(u.jsxs)("li",{children:["Total: ",X.total]}),Object(u.jsxs)("li",{children:["History: [",null===X||void 0===X?void 0:X.earnings.map((function(e,t){return t===X.earnings.length-1?e:"".concat(e,", ")})),"]"]})]})]})]}),Object(u.jsxs)("div",{className:"modal-footer",children:[Object(u.jsx)("button",{type:"button",className:"btn btn-secondary","data-bs-dismiss":"modal",children:"Close"}),q===C&&Object(u.jsx)("button",{type:"button",className:"btn btn-primary",children:"Submit"})]})]})})})]})}):Object(u.jsx)("div",{style:{display:"flex",height:"70vh",justifyContent:"center",alignItems:"center"},children:"403: FORBIDDEN"})},E=function(e){Object(l.a)(e);var t=Object(o.g)().search,a=Object(d.c)((function(e){return e.user.isLoggedIn})),n=t?"dashboard".concat(t):"dashboard";return Object(u.jsxs)("div",{className:"App",children:[a?Object(u.jsx)(o.a,{to:n}):Object(u.jsx)(o.a,{to:"/login"}),Object(u.jsx)("div",{style:{position:"sticky",top:0,width:"100%",zIndex:100,backgroundColor:"white",padding:"12px 16px",boxShadow:"0 2px 2px -2px gray"},children:Object(u.jsxs)("div",{style:{textAlign:"center",lineHeight:"1.2"},children:[Object(u.jsx)("div",{style:{fontSize:"calc(1.325rem + .9vw)",fontWeight:500},children:"Axie Manager"}),Object(u.jsx)("sub",{style:{bottom:"0"},children:"v-0.0.3"})]})}),Object(u.jsxs)(o.d,{children:[Object(u.jsx)(o.b,{path:"/login",component:h}),Object(u.jsx)(o.b,{path:"/dashboard?",component:M}),Object(u.jsx)(o.b,{path:"/",component:M})]})]})},D=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,236)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),s(e),r(e)}))},F=a(28),B=a(100),R={email:"",username:"",isLoggedIn:!0},P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_IS_LOGGED_IN":return t.isLoggedIn||(document.cookie="auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;",document.cookie="email=; expires=Thu, 01 Jan 1970 00:00:01 GMT;",document.cookie="password=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"),Object(g.a)(Object(g.a)({},e),{},{isLoggedIn:t.isLoggedIn});case"SET_EMAIL":return Object(g.a)(Object(g.a)({},e),{},{email:t.email});case"SET_USERNAME":return Object(g.a)(Object(g.a)({},e),{},{username:t.username});default:return e}},_=Object(F.b)({user:P}),G=a(26),U=Object(F.c)(_,Object(F.a)(B.a));i.a.render(Object(u.jsx)(s.a.StrictMode,{children:Object(u.jsx)(d.a,{store:U,children:Object(u.jsx)(G.a,{children:Object(u.jsx)(E,{})})})}),document.getElementById("root")),D()}},[[235,1,2]]]);
//# sourceMappingURL=main.0502489f.chunk.js.map