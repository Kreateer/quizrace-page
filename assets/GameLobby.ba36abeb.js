import{Q as l}from"./QBtn.bee9747c.js";import{Q as g}from"./QPage.b03bf737.js";import{emitter as d}from"./mitt.ea317fc3.js";import{api as f}from"./axios.bc18a3b9.js";import{_,s as h,t as v,v as o,x as r,y as s,C as e,z as c,S as m,V as u,U as b,D as k,E as S}from"./index.262ebc36.js";import"./dom.dd4fd412.js";var y="/assets/qrloading.dafd20dc.gif";const w=h({name:"GameLobby",data(){return{gameStarted:!1,timer:0}},mounted(){d.on("game.started",t=>{this.gameStarted=!0,this.countdownStart(t.countdown)})},unmounted(){d.off("game.started")},methods:{backToStart(){this.$router.go(-1)},goToGame(){this.$router.push({name:"game"})},triggerButton(){const a="gle/sessions/3b79a6c1-2fd4-4b09-a954-f7aa30450c0e/start";f.get(a).then(n=>{console.log(n)})},countdownStart(t){clearInterval(this.timerInterval),t!=null&&t!=0&&(this.timer=t),this.timerInterval=setInterval(()=>{this.timer>0?this.timer--:(clearInterval(this.timerInterval),this.goToGame())},1e3)}}}),x=t=>(k("data-v-7ca1193d"),t=t(),S(),t),C={class:"page-content"},I=x(()=>e("div",{class:"quiz-logo"},[e("img",{alt:"Quasar logo",src:y,style:{width:"200px",height:"200px","background-color":"transparent"}})],-1)),G={class:"flex flex-center"};function B(t,a,n,T,$,Q){const i=v("q-text");return o(),r(g,{class:"flex flex-center"},{default:s(()=>[e("div",C,[c(l,{class:"back-button",flat:"",round:"",dense:"",icon:"arrow_back",onClick:t.backToStart},null,8,["onClick"]),c(l,{class:"forward-button",flat:"",round:"",dense:"",icon:"arrow_forward",onClick:t.goToGame},null,8,["onClick"]),e("button",{onClick:a[0]||(a[0]=(...p)=>t.triggerButton&&t.triggerButton(...p)),style:{position:"absolute",top:"40px",left:"10px"}},"Trigger Game Start"),I,e("div",G,[t.gameStarted==!1?(o(),r(i,{key:0,class:"waiting-text"},{default:s(()=>[m("Waiting for players...")]),_:1})):u("",!0),t.gameStarted==!0?(o(),r(i,{key:1,class:"waiting-text"},{default:s(()=>[m("Game starting in: "+b(t.timer),1)]),_:1})):u("",!0)])])]),_:1})}var E=_(w,[["render",B],["__scopeId","data-v-7ca1193d"]]);export{E as default};
