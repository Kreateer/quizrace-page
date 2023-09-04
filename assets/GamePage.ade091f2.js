import{Q as h}from"./QBtn.999febb8.js";import{Q as v}from"./QPage.39929c7d.js";import{api as u}from"./axios.0c417d83.js";import{emitter as d}from"./mitt.5c15a272.js";import{_ as y,v as p,x,y as m,N as f,V as _,C as t,U as n,S as i,z as g,D as b,E as C}from"./index.e7bf1127.js";import"./dom.04508eaf.js";var k="/assets/roadmove.5e0f3157.gif",q="/assets/blue_car.1f92bfc2.png",I="/assets/orange_car.8d5c8db2.png",P="/assets/red_car.2c840d35.png",S="/assets/purple_car.81f09268.png";const D={data(){return{showOverlay:!1,showEnd:!1,question:"",questions:"",answer1:"",answer2:"",answer3:"",answerIs:!1,answerPopupText:"",answerPopup:!1,buttonClicked:!1,modID:"",timer:0}},mounted(){this.resetCars(),u.get("/modules").then(s=>{this.modID=s.data[0].uuid,console.log(this.modID),this.getQuestionID()}),d.on("question.show",s=>{this.triggerOverlay()}),d.on("question.timeout",s=>{this.moveCars()})},unmounted(){d.off("question.show"),d.off("question.timeout")},methods:{backToStart(){this.$router.go(-1)},questionShowButton(){const e="gle/sessions/3b79a6c1-2fd4-4b09-a954-f7aa30450c0e/start";u.get(e).then(w=>{console.log(w)})},triggerOverlay(){this.showOverlay=!0,this.spliceQuestion()},resetAnswerPopup(){this.answerPopup=!1,this.answerPopupText=""},startTimer(){clearInterval(this.timerInterval),this.timer=30,this.timerInterval=setInterval(()=>{this.timer>0?(this.timer--,console.log(this.timer)):(this.showOverlay=!1,clearInterval(this.timerInterval),this.resetAnswerPopup(),this.buttonClicked=!1)},1e3)},showEndScreen(){this.showEnd=!0,setTimeout(()=>{this.showEnd=!1,this.resetCars()},5e3)},getQuestionID(){u.get("/modules/"+this.modID).then(s=>{this.itemid=s.data.question_lists[2].id,console.log(this.itemid),this.getQuestionList(this.itemid)})},getQuestionList(s){u.get("/question_lists/"+s).then(e=>{console.log(e.data.questions),this.questions=e.data.questions})},spliceQuestion(){if(this.questions.length>0){var s=Math.floor(Math.random()*this.questions.length);this.question=this.questions[s].text,this.questions.slice(s,1),console.log(this.question),this.answer1=this.questions[s].answers[0].text,this.answer2=this.questions[s].answers[1].text,this.answer3=this.questions[s].answers[2].text}else console.log("boop")},checkAnswer(s){if(this.buttonClicked=!0,s==this.answer1){const e=2+this.timer;this.answerIs=!0,this.answerPopup=!0,this.answerPopupText="Correct!",this.moveCars(1,e)}else if(s==null){console.log("Wrong answer");const e=5;this.answerIs=!1,this.answerPopup=!0,this.answerPopupText="Incorrect!",this.moveCars(1,e)}else{console.log("Wrong answer");const e=0+this.timer;this.answerIs=!1,this.answerPopup=!0,this.answerPopupText="Incorrect!",this.moveCars(1,e)}},moveCars(s=null,e=null){document.querySelectorAll(".car").forEach((c,o)=>{if(s==null||s==o){let r=parseInt(c.style.top)||0;r>0?(c.style.transition="top 5s",c.style.top=`${r-e}%`):this.showEndScreen()}})},resetCars(){document.querySelectorAll(".car").forEach(e=>{e.style.transition="none",e.style.top="85%"})}}},l=s=>(b("data-v-9da1576a"),s=s(),C(),s),T={key:0,class:"end-overlay",style:{"font-size":"xx-large","font-weight":"bold",color:"white"}},E={key:1,class:"overlay"},Q={class:"overlay-content"},O={class:"text-wrapper"},A={class:"text"},z={class:"flex justify-center"},B={class:"flex flex-column items-center"},M=l(()=>t("p",{style:{"font-size":"large","font-weight":"bold",padding:"5px"}},[i(" 1:"),t("br"),i(" 2:"),t("br"),i(" 3:")],-1)),N={style:{"font-size":"large","font-weight":"bold"}},V=l(()=>t("br",null,null,-1)),G=l(()=>t("br",null,null,-1)),j={key:0,class:"flex justify-center q-ml-xl",style:{position:"absolute",bottom:"25%",left:"45%"}},L=l(()=>t("br",null,null,-1)),R={class:"page-content"},W={class:"road"},U={ref:"roadImage",alt:"Road",src:k,style:{"max-width":"100%",height:"651px"}},Y=l(()=>t("div",{class:"cars"},[t("img",{class:"car car1",alt:"Car1",src:q,style:{"max-width":"20%","max-height":"13.5%"}}),t("img",{class:"car car2",alt:"Car2",src:I,style:{"max-width":"20%","max-height":"13.5%"}}),t("img",{class:"car car3",alt:"Car3",src:P,style:{"max-width":"20%","max-height":"13.5%"}}),t("img",{class:"car car4",alt:"Car4",src:S,style:{"max-width":"20%","max-height":"13.5%"}})],-1));function F(s,e,w,c,o,r){return p(),x(v,{class:"flex flex-center"},{default:m(()=>[o.showEnd?(p(),f("div",T," Game Over! ")):_("",!0),o.showOverlay?(p(),f("div",E,[t("div",Q,[t("div",O,[t("p",A,n(o.question),1)]),t("div",z,[t("div",B,[M,t("p",N,[i(n(o.answer1),1),V,i(" "+n(o.answer2),1),G,i(" "+n(o.answer3),1)])])]),t("div",null,[o.answerPopup?(p(),f("div",j,[i(" You answered"),L,i(n(o.answerPopupText),1)])):_("",!0),g(h,{class:"glossy",rounded:"",color:"teal",dense:"",style:{width:"20%","font-weight":"bold","font-size":"large","margin-top":"15%"},onClick:e[0]||(e[0]=a=>r.checkAnswer(this.answer1)),disable:o.buttonClicked},{default:m(()=>[i("1 ")]),_:1},8,["disable"]),g(h,{class:"glossy",rounded:"",color:"teal",dense:"",style:{width:"20%","font-weight":"bold","font-size":"large","margin-top":"15%"},onClick:e[1]||(e[1]=a=>r.checkAnswer(this.answer2)),disable:o.buttonClicked},{default:m(()=>[i("2 ")]),_:1},8,["disable"]),g(h,{class:"glossy",rounded:"",color:"teal",dense:"",style:{width:"20%","font-weight":"bold","font-size":"large","margin-top":"15%"},onClick:e[2]||(e[2]=a=>r.checkAnswer(this.answer3)),disable:o.buttonClicked},{default:m(()=>[i("3 ")]),_:1},8,["disable"])])])])):_("",!0),t("div",R,[g(h,{class:"back-button",flat:"",round:"",dense:"",icon:"arrow_back",onClick:r.backToStart},null,8,["onClick"]),t("div",W,[t("img",U,null,512),Y]),t("button",{style:{position:"absolute",top:"60px",right:"10px"},onClick:e[3]||(e[3]=(...a)=>r.triggerOverlay&&r.triggerOverlay(...a))},"Boop"),t("button",{style:{position:"absolute",top:"90px",right:"10px"},onClick:e[4]||(e[4]=a=>r.moveCars(0,5))},"Move Cars"),t("button",{style:{position:"absolute",top:"120px",right:"10px"},onClick:e[5]||(e[5]=(...a)=>r.resetCars&&r.resetCars(...a))},"Reset")])]),_:1})}var ee=y(D,[["render",F],["__scopeId","data-v-9da1576a"]]);export{ee as default};
