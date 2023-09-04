import { Q as QBtn } from "./QBtn.da666cb1.js";
import { Q as QPage } from "./QPage.6732de9a.js";
import { api } from "./axios.d1cedc7f.js";
import { e as emitter } from "./mitt.eb8c962f.js";
import { _ as _export_sfc, v as openBlock, x as createBlock, y as withCtx, N as createElementBlock, V as createCommentVNode, C as createBaseVNode, U as toDisplayString, S as createTextVNode, z as createVNode, D as pushScopeId, E as popScopeId } from "./index.2f099809.js";
import "./dom.6c943660.js";
var _imports_0 = "/assets/roadmove.5e0f3157.gif";
var _imports_1 = "/assets/blue_car.1f92bfc2.png";
var _imports_2 = "/assets/orange_car.8d5c8db2.png";
var _imports_3 = "/assets/red_car.2c840d35.png";
var _imports_4 = "/assets/purple_car.81f09268.png";
var GamePage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  data() {
    return {
      showOverlay: false,
      showEnd: false,
      question: "",
      questions: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answerIs: false,
      answerPopupText: "",
      answerPopup: false,
      buttonClicked: false,
      modID: "",
      timer: 0
    };
  },
  mounted() {
    this.resetCars();
    api.get("/modules").then((response) => {
      this.modID = response.data[0].uuid;
      console.log(this.modID);
      this.getQuestionID();
    });
    emitter.on("question.show", (data) => {
      this.triggerOverlay();
    });
    emitter.on("question.timeout", (data) => {
      this.moveCars();
    });
  },
  unmounted() {
    emitter.off("question.show");
    emitter.off("question.timeout");
  },
  methods: {
    backToStart() {
      this.$router.go(-1);
    },
    questionShowButton() {
      const url = "gle/sessions/3b79a6c1-2fd4-4b09-a954-f7aa30450c0e/start";
      const payload = url;
      api.get(payload).then((response) => {
        console.log(response);
      });
    },
    triggerOverlay() {
      this.showOverlay = true;
      this.spliceQuestion();
    },
    resetAnswerPopup() {
      this.answerPopup = false;
      this.answerPopupText = "";
    },
    startTimer() {
      clearInterval(this.timerInterval);
      this.timer = 30;
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
          console.log(this.timer);
        } else {
          this.showOverlay = false;
          clearInterval(this.timerInterval);
          this.resetAnswerPopup();
          this.buttonClicked = false;
        }
      }, 1e3);
    },
    showEndScreen() {
      this.showEnd = true;
      setTimeout(() => {
        this.showEnd = false;
        this.resetCars();
      }, 5e3);
    },
    getQuestionID() {
      api.get("/modules/" + this.modID).then((response) => {
        this.itemid = response.data.question_lists[2].id;
        console.log(this.itemid);
        this.getQuestionList(this.itemid);
      });
    },
    getQuestionList(id) {
      api.get("/question_lists/" + id).then(
        (response) => {
          console.log(response.data.questions);
          this.questions = response.data.questions;
        }
      );
    },
    spliceQuestion() {
      if (this.questions.length > 0) {
        var i = Math.floor(Math.random() * this.questions.length);
        this.question = this.questions[i].text;
        this.questions.slice(i, 1);
        console.log(this.question);
        this.answer1 = this.questions[i].answers[0].text;
        this.answer2 = this.questions[i].answers[1].text;
        this.answer3 = this.questions[i].answers[2].text;
      } else {
        console.log("boop");
      }
    },
    checkAnswer(ans) {
      this.buttonClicked = true;
      if (ans == this.answer1) {
        const carMoveDistance = 2 + this.timer;
        this.answerIs = true;
        this.answerPopup = true;
        this.answerPopupText = "Correct!";
        this.moveCars(1, carMoveDistance);
      } else if (ans == null) {
        console.log("Wrong answer");
        const carMoveDistance = 5;
        this.answerIs = false;
        this.answerPopup = true;
        this.answerPopupText = "Incorrect!";
        this.moveCars(1, carMoveDistance);
      } else {
        console.log("Wrong answer");
        const carMoveDistance = 0 + this.timer;
        this.answerIs = false;
        this.answerPopup = true;
        this.answerPopupText = "Incorrect!";
        this.moveCars(1, carMoveDistance);
      }
    },
    moveCars(carIndex = null, cmd = null) {
      const cars = document.querySelectorAll(".car");
      cars.forEach((car, index) => {
        if (carIndex == null || carIndex == index) {
          let currentPosition = parseInt(car.style.top) || 0;
          if (currentPosition > 0) {
            car.style.transition = "top 5s";
            car.style.top = `${currentPosition - cmd}%`;
          } else {
            this.showEndScreen();
          }
        }
      });
    },
    resetCars() {
      const cars = document.querySelectorAll(".car");
      cars.forEach((car) => {
        car.style.transition = "none";
        car.style.top = "85%";
      });
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-9da1576a"), n = n(), popScopeId(), n);
const _hoisted_1 = {
  key: 0,
  class: "end-overlay",
  style: { "font-size": "xx-large", "font-weight": "bold", "color": "white" }
};
const _hoisted_2 = {
  key: 1,
  class: "overlay"
};
const _hoisted_3 = { class: "overlay-content" };
const _hoisted_4 = { class: "text-wrapper" };
const _hoisted_5 = { class: "text" };
const _hoisted_6 = { class: "flex justify-center" };
const _hoisted_7 = { class: "flex flex-column items-center" };
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", { style: { "font-size": "large", "font-weight": "bold", "padding": "5px" } }, [
  /* @__PURE__ */ createTextVNode(" 1:"),
  /* @__PURE__ */ createBaseVNode("br"),
  /* @__PURE__ */ createTextVNode(" 2:"),
  /* @__PURE__ */ createBaseVNode("br"),
  /* @__PURE__ */ createTextVNode(" 3:")
], -1));
const _hoisted_9 = { style: { "font-size": "large", "font-weight": "bold" } };
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_12 = {
  key: 0,
  class: "flex justify-center q-ml-xl",
  style: { "position": "absolute", "bottom": "25%", "left": "45%" }
};
const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_14 = { class: "page-content" };
const _hoisted_15 = { class: "road" };
const _hoisted_16 = {
  ref: "roadImage",
  alt: "Road",
  src: _imports_0,
  style: { "max-width": "100%", "height": "651px" }
};
const _hoisted_17 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "cars" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    class: "car car1",
    alt: "Car1",
    src: _imports_1,
    style: { "max-width": "20%", "max-height": "13.5%" }
  }),
  /* @__PURE__ */ createBaseVNode("img", {
    class: "car car2",
    alt: "Car2",
    src: _imports_2,
    style: { "max-width": "20%", "max-height": "13.5%" }
  }),
  /* @__PURE__ */ createBaseVNode("img", {
    class: "car car3",
    alt: "Car3",
    src: _imports_3,
    style: { "max-width": "20%", "max-height": "13.5%" }
  }),
  /* @__PURE__ */ createBaseVNode("img", {
    class: "car car4",
    alt: "Car4",
    src: _imports_4,
    style: { "max-width": "20%", "max-height": "13.5%" }
  })
], -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "flex flex-center" }, {
    default: withCtx(() => [
      $data.showEnd ? (openBlock(), createElementBlock("div", _hoisted_1, " Game Over! ")) : createCommentVNode("", true),
      $data.showOverlay ? (openBlock(), createElementBlock("div", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("p", _hoisted_5, toDisplayString($data.question), 1)
          ]),
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, [
              _hoisted_8,
              createBaseVNode("p", _hoisted_9, [
                createTextVNode(toDisplayString($data.answer1), 1),
                _hoisted_10,
                createTextVNode(" " + toDisplayString($data.answer2), 1),
                _hoisted_11,
                createTextVNode(" " + toDisplayString($data.answer3), 1)
              ])
            ])
          ]),
          createBaseVNode("div", null, [
            $data.answerPopup ? (openBlock(), createElementBlock("div", _hoisted_12, [
              createTextVNode(" You answered"),
              _hoisted_13,
              createTextVNode(toDisplayString($data.answerPopupText), 1)
            ])) : createCommentVNode("", true),
            createVNode(QBtn, {
              class: "glossy",
              rounded: "",
              color: "teal",
              dense: "",
              style: { "width": "20%", "font-weight": "bold", "font-size": "large", "margin-top": "15%" },
              onClick: _cache[0] || (_cache[0] = ($event) => $options.checkAnswer(this.answer1)),
              disable: $data.buttonClicked
            }, {
              default: withCtx(() => [
                createTextVNode("1 ")
              ]),
              _: 1
            }, 8, ["disable"]),
            createVNode(QBtn, {
              class: "glossy",
              rounded: "",
              color: "teal",
              dense: "",
              style: { "width": "20%", "font-weight": "bold", "font-size": "large", "margin-top": "15%" },
              onClick: _cache[1] || (_cache[1] = ($event) => $options.checkAnswer(this.answer2)),
              disable: $data.buttonClicked
            }, {
              default: withCtx(() => [
                createTextVNode("2 ")
              ]),
              _: 1
            }, 8, ["disable"]),
            createVNode(QBtn, {
              class: "glossy",
              rounded: "",
              color: "teal",
              dense: "",
              style: { "width": "20%", "font-weight": "bold", "font-size": "large", "margin-top": "15%" },
              onClick: _cache[2] || (_cache[2] = ($event) => $options.checkAnswer(this.answer3)),
              disable: $data.buttonClicked
            }, {
              default: withCtx(() => [
                createTextVNode("3 ")
              ]),
              _: 1
            }, 8, ["disable"])
          ])
        ])
      ])) : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_14, [
        createVNode(QBtn, {
          class: "back-button",
          flat: "",
          round: "",
          dense: "",
          icon: "arrow_back",
          onClick: $options.backToStart
        }, null, 8, ["onClick"]),
        createBaseVNode("div", _hoisted_15, [
          createBaseVNode("img", _hoisted_16, null, 512),
          _hoisted_17
        ]),
        createBaseVNode("button", {
          style: { "position": "absolute", "top": "60px", "right": "10px" },
          onClick: _cache[3] || (_cache[3] = (...args) => $options.triggerOverlay && $options.triggerOverlay(...args))
        }, "Boop"),
        createBaseVNode("button", {
          style: { "position": "absolute", "top": "90px", "right": "10px" },
          onClick: _cache[4] || (_cache[4] = ($event) => $options.moveCars(0, 5))
        }, "Move Cars"),
        createBaseVNode("button", {
          style: { "position": "absolute", "top": "120px", "right": "10px" },
          onClick: _cache[5] || (_cache[5] = (...args) => $options.resetCars && $options.resetCars(...args))
        }, "Reset")
      ])
    ]),
    _: 1
  });
}
var GamePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9da1576a"], ["__file", "GamePage.vue"]]);
export { GamePage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZVBhZ2UuYzg1YjBjOTEuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hc3NldHMvcm9hZG1vdmUuZ2lmIiwiLi4vLi4vLi4vc3JjL2Fzc2V0cy9ibHVlX2Nhci5wbmciLCIuLi8uLi8uLi9zcmMvYXNzZXRzL29yYW5nZV9jYXIucG5nIiwiLi4vLi4vLi4vc3JjL2Fzc2V0cy9yZWRfY2FyLnBuZyIsIi4uLy4uLy4uL3NyYy9hc3NldHMvcHVycGxlX2Nhci5wbmciLCIuLi8uLi8uLi9zcmMvcGFnZXMvR2FtZVBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IFwiX19WSVRFX0FTU0VUX181ZTBmMzE1N19fXCIiLCJleHBvcnQgZGVmYXVsdCBcIl9fVklURV9BU1NFVF9fMWY5MmJmYzJfX1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJfX1ZJVEVfQVNTRVRfXzhkNWM4ZGIyX19cIiIsImV4cG9ydCBkZWZhdWx0IFwiX19WSVRFX0FTU0VUX18yYzg0MGQzNV9fXCIiLCJleHBvcnQgZGVmYXVsdCBcIl9fVklURV9BU1NFVF9fODFmMDkyNjhfX1wiIiwiPHRlbXBsYXRlPlxyXG48cS1wYWdlIGNsYXNzPVwiZmxleCBmbGV4LWNlbnRlclwiPlxyXG4gIDxkaXYgY2xhc3M9XCJlbmQtb3ZlcmxheVwiIHYtaWY9XCJzaG93RW5kXCIgc3R5bGU9XCJmb250LXNpemU6IHh4LWxhcmdlOyBmb250LXdlaWdodDogYm9sZDsgY29sb3I6IHdoaXRlO1wiPlxyXG4gIEdhbWUgT3ZlciFcclxuICBcclxuICA8L2Rpdj4gIFxyXG4gIFxyXG4gIDxkaXYgY2xhc3M9XCJvdmVybGF5XCIgdi1pZj1cInNob3dPdmVybGF5XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJvdmVybGF5LWNvbnRlbnRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13cmFwcGVyXCI+XHJcbiAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0XCI+e3sgcXVlc3Rpb24gfX08L3A+XHJcbiAgICAgIFxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImZsZXgganVzdGlmeS1jZW50ZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImZsZXggZmxleC1jb2x1bW4gaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgPHAgc3R5bGU9XCJmb250LXNpemU6IGxhcmdlOyBmb250LXdlaWdodDogYm9sZDsgcGFkZGluZzogNXB4O1wiPlxyXG4gICAgICAgIDE6PGJyPlxyXG4gICAgICAgIDI6PGJyPlxyXG4gICAgICAgIDM6PC9wPlxyXG4gICAgICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOiBsYXJnZTsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+XHJcbiAgICAgICAge3sgYW5zd2VyMSB9fTxicj5cclxuICAgICAgICB7eyBhbnN3ZXIyIH19PGJyPlxyXG4gICAgICAgIHt7IGFuc3dlcjMgfX08L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBcclxuICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBxLW1sLXhsXCJcclxuICAgICAgICAgIHN0eWxlPVwiXHJcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICBib3R0b206IDI1JTtcclxuICAgICAgICAgIGxlZnQ6IDQ1JVwiXHJcbiAgICAgICAgICB2LWlmPVwiYW5zd2VyUG9wdXBcIj5cclxuICAgICAgICBZb3UgYW5zd2VyZWQ8YnI+e3sgYW5zd2VyUG9wdXBUZXh0IH19XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxxLWJ0biBcclxuICAgICAgICAgIGNsYXNzPVwiZ2xvc3N5XCIgXHJcbiAgICAgICAgICByb3VuZGVkXHJcbiAgICAgICAgICBjb2xvcj1cInRlYWxcIlxyXG4gICAgICAgICAgZGVuc2VcclxuICAgICAgICAgIHN0eWxlPVwiXHJcbiAgICAgICAgICB3aWR0aDogMjAlOyBcclxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOyBcclxuICAgICAgICAgIGZvbnQtc2l6ZTpsYXJnZTtcclxuICAgICAgICAgIG1hcmdpbi10b3A6IDE1JTtcIlxyXG4gICAgICAgICAgQGNsaWNrPVwiY2hlY2tBbnN3ZXIodGhpcy5hbnN3ZXIxKVwiIDpkaXNhYmxlPVwiYnV0dG9uQ2xpY2tlZFwiXHJcbiAgICAgICAgICA+MVxyXG4gICAgICAgICAgPC9xLWJ0bj5cclxuICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgY2xhc3M9XCJnbG9zc3lcIiBcclxuICAgICAgICAgIHJvdW5kZWRcclxuICAgICAgICAgIGNvbG9yPVwidGVhbFwiXHJcbiAgICAgICAgICBkZW5zZVxyXG4gICAgICAgICAgc3R5bGU9XCJcclxuICAgICAgICAgIHdpZHRoOiAyMCU7IFxyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7IFxyXG4gICAgICAgICAgZm9udC1zaXplOmxhcmdlO1xyXG4gICAgICAgICAgbWFyZ2luLXRvcDogMTUlO1wiXHJcbiAgICAgICAgICBAY2xpY2s9XCJjaGVja0Fuc3dlcih0aGlzLmFuc3dlcjIpXCIgOmRpc2FibGU9XCJidXR0b25DbGlja2VkXCJcclxuICAgICAgICAgID4yXHJcbiAgICAgICAgICA8L3EtYnRuPlxyXG4gICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICBjbGFzcz1cImdsb3NzeVwiIFxyXG4gICAgICAgICAgcm91bmRlZFxyXG4gICAgICAgICAgY29sb3I9XCJ0ZWFsXCJcclxuICAgICAgICAgIGRlbnNlXHJcbiAgICAgICAgICBzdHlsZT1cIlxyXG4gICAgICAgICAgd2lkdGg6IDIwJTsgXHJcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDsgXHJcbiAgICAgICAgICBmb250LXNpemU6bGFyZ2U7XHJcbiAgICAgICAgICBtYXJnaW4tdG9wOiAxNSU7XCJcclxuICAgICAgICAgIEBjbGljaz1cImNoZWNrQW5zd2VyKHRoaXMuYW5zd2VyMylcIiA6ZGlzYWJsZT1cImJ1dHRvbkNsaWNrZWRcIlxyXG4gICAgICAgICAgPjNcclxuICAgICAgICAgIDwvcS1idG4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGFnZS1jb250ZW50XCI+XHJcbiAgICAgICAgPHEtYnRuXHJcbiAgICAgIGNsYXNzPVwiYmFjay1idXR0b25cIlxyXG4gICAgICBmbGF0XHJcbiAgICAgIHJvdW5kXHJcbiAgICAgIGRlbnNlXHJcbiAgICAgIGljb249XCJhcnJvd19iYWNrXCJcclxuICAgICAgQGNsaWNrPVwiYmFja1RvU3RhcnRcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvYWRcIj5cclxuICAgICAgICAgIDxpbWdcclxuICAgICAgICAgIHJlZj1cInJvYWRJbWFnZVwiXHJcbiAgICAgICAgICBhbHQ9XCJSb2FkXCJcclxuICAgICAgICAgIHNyYz1cIn5hc3NldHMvcm9hZG1vdmUuZ2lmXCJcclxuICAgICAgICAgIHN0eWxlPVwibWF4LXdpZHRoOiAxMDAlOyBoZWlnaHQ6IDY1MXB4XCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJzXCI+XHJcbiAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICBjbGFzcz1cImNhciBjYXIxXCJcclxuICAgICAgICAgIGFsdD1cIkNhcjFcIlxyXG4gICAgICAgICAgc3JjPVwifmFzc2V0cy9ibHVlX2Nhci5wbmdcIlxyXG4gICAgICAgICAgc3R5bGU9XCJtYXgtd2lkdGg6IDIwJTsgbWF4LWhlaWdodDogMTMuNSVcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgY2xhc3M9XCJjYXIgY2FyMlwiXHJcbiAgICAgICAgICBhbHQ9XCJDYXIyXCJcclxuICAgICAgICAgIHNyYz1cIn5hc3NldHMvb3JhbmdlX2Nhci5wbmdcIlxyXG4gICAgICAgICAgc3R5bGU9XCJtYXgtd2lkdGg6IDIwJTsgbWF4LWhlaWdodDogMTMuNSVcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgY2xhc3M9XCJjYXIgY2FyM1wiXHJcbiAgICAgICAgICBhbHQ9XCJDYXIzXCJcclxuICAgICAgICAgIHNyYz1cIn5hc3NldHMvcmVkX2Nhci5wbmdcIlxyXG4gICAgICAgICAgc3R5bGU9XCJtYXgtd2lkdGg6IDIwJTsgbWF4LWhlaWdodDogMTMuNSVcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgY2xhc3M9XCJjYXIgY2FyNFwiXHJcbiAgICAgICAgICBhbHQ9XCJDYXI0XCJcclxuICAgICAgICAgIHNyYz1cIn5hc3NldHMvcHVycGxlX2Nhci5wbmdcIlxyXG4gICAgICAgICAgc3R5bGU9XCJtYXgtd2lkdGg6IDIwJTsgbWF4LWhlaWdodDogMTMuNSVcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxidXR0b24gc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogNjBweDsgcmlnaHQ6IDEwcHhcIiBAY2xpY2s9XCJ0cmlnZ2VyT3ZlcmxheVwiPkJvb3A8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDkwcHg7IHJpZ2h0OiAxMHB4XCIgQGNsaWNrPVwibW92ZUNhcnMoMCwgNSlcIj5Nb3ZlIENhcnM8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDEyMHB4OyByaWdodDogMTBweFwiIEBjbGljaz1cInJlc2V0Q2Fyc1wiPlJlc2V0PC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuPC9xLXBhZ2U+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQge2FwaX0gZnJvbSAnYm9vdC9heGlvcydcclxuaW1wb3J0IHtlbWl0dGVyfSBmcm9tICdib290L21pdHQnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZGF0YSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNob3dPdmVybGF5OiBmYWxzZSxcclxuICAgICAgc2hvd0VuZDogZmFsc2UsXHJcbiAgICAgIHF1ZXN0aW9uOiAnJyxcclxuICAgICAgcXVlc3Rpb25zOiAnJyxcclxuICAgICAgYW5zd2VyMTogJycsXHJcbiAgICAgIGFuc3dlcjI6ICcnLFxyXG4gICAgICBhbnN3ZXIzOiAnJyxcclxuICAgICAgYW5zd2VySXM6IGZhbHNlLFxyXG4gICAgICBhbnN3ZXJQb3B1cFRleHQ6ICcnLFxyXG4gICAgICBhbnN3ZXJQb3B1cDogZmFsc2UsXHJcbiAgICAgIGJ1dHRvbkNsaWNrZWQ6IGZhbHNlLFxyXG4gICAgICBtb2RJRDogJycsXHJcbiAgICAgIHRpbWVyOiAwLFxyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBtb3VudGVkKCl7XHJcbiAgICB0aGlzLnJlc2V0Q2FycygpO1xyXG5cclxuICAgIGFwaS5nZXQoJy9tb2R1bGVzJykudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgdGhpcy5tb2RJRCA9IHJlc3BvbnNlLmRhdGFbMF0udXVpZFxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLm1vZElEKVxyXG4gICAgICB0aGlzLmdldFF1ZXN0aW9uSUQoKTtcclxuICAgICAgfSlcclxuICAgICAgXHJcbiAgICBlbWl0dGVyLm9uKCdxdWVzdGlvbi5zaG93JywgZGF0YSA9PiB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB0aGlzLnRyaWdnZXJPdmVybGF5KCk7XHJcbiAgICAgIH0pOyAgXHJcbiAgICBcclxuICAgIGVtaXR0ZXIub24oJ3F1ZXN0aW9uLnRpbWVvdXQnLCBkYXRhID0+IHtcclxuICAgICAgdGhpcy5tb3ZlQ2FycygpXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLypzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy50cmlnZ2VyT3ZlcmxheSgpO1xyXG4gICAgfSwgMzAwMCk7Ki9cclxuICB9LFxyXG5cclxuICB1bm1vdW50ZWQoKXtcclxuICAgIGVtaXR0ZXIub2ZmKCdxdWVzdGlvbi5zaG93Jyk7ICBcclxuICAgIFxyXG4gICAgZW1pdHRlci5vZmYoJ3F1ZXN0aW9uLnRpbWVvdXQnKTtcclxuICB9LFxyXG5cclxuICBtZXRob2RzOiB7XHJcblxyXG4gICAgYmFja1RvU3RhcnQoKXtcclxuICAgICAgICAgIHRoaXMuJHJvdXRlci5nbygtMSk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgcXVlc3Rpb25TaG93QnV0dG9uKCl7XHJcbiAgICAgICAgY29uc3QgdXJsID0gJ2dsZS9zZXNzaW9ucy8zYjc5YTZjMS0yZmQ0LTRiMDktYTk1NC1mN2FhMzA0NTBjMGUvc3RhcnQnXHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHVybFxyXG5cclxuICAgICAgICBhcGkuZ2V0KHBheWxvYWQpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICBcclxuICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICB0cmlnZ2VyT3ZlcmxheSgpIHtcclxuICAgICAgdGhpcy5zaG93T3ZlcmxheSA9IHRydWU7XHJcbiAgICAgIHRoaXMuc3BsaWNlUXVlc3Rpb24oKTtcclxuICAgICAgLy90aGlzLnN0YXJ0VGltZXIoKTsgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgcmVzZXRBbnN3ZXJQb3B1cCgpe1xyXG4gICAgICB0aGlzLmFuc3dlclBvcHVwID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYW5zd2VyUG9wdXBUZXh0ID0gJyc7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0VGltZXIoKSB7XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJJbnRlcnZhbCk7IC8vIFN0b3AgdGhlIHRpbWVyXHJcbiAgICB0aGlzLnRpbWVyID0gMzA7IC8vIFJlc2V0IHRoZSB0aW1lciB0byAzMCBzZWNvbmRzXHJcbiAgICB0aGlzLnRpbWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnRpbWVyID4gMCkge1xyXG4gICAgICAgIHRoaXMudGltZXItLTsgLy8gRGVjcmVtZW50IHRoZSB0aW1lclxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGltZXIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zaG93T3ZlcmxheSA9IGZhbHNlOyAvLyBIaWRlIHRoZSBvdmVybGF5IHdoZW4gdGhlIHRpbWVyIHJlYWNoZXMgMFxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lckludGVydmFsKTsgLy8gU3RvcCB0aGUgdGltZXJcclxuICAgICAgICB0aGlzLnJlc2V0QW5zd2VyUG9wdXAoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbkNsaWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIH1cclxuICAgIH0sIDEwMDApOyAvLyBVcGRhdGUgdGhlIHRpbWVyIGV2ZXJ5IDEgc2Vjb25kXHJcbiAgfSxcclxuXHJcbiAgICBzaG93RW5kU2NyZWVuKCkge1xyXG4gICAgICB0aGlzLnNob3dFbmQgPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLnNob3dFbmQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlc2V0Q2FycygpO1xyXG4gICAgICB9LCA1MDAwKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9GaW5kIHdoaWNoIGdhbWUgdG8gcHVsbCBmb3JcclxuICBnZXRRdWVzdGlvbklEKCl7XHJcbiAgICBhcGkuZ2V0KCcvbW9kdWxlcy8nICsgdGhpcy5tb2RJRCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICB0aGlzLml0ZW1pZCA9IHJlc3BvbnNlLmRhdGEucXVlc3Rpb25fbGlzdHNbMl0uaWRcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLml0ZW1pZClcclxuICAgICAgICB0aGlzLmdldFF1ZXN0aW9uTGlzdCh0aGlzLml0ZW1pZCk7XHJcbiAgICAgICAgLyphcGkuZ2V0KCcvcXVlc3Rpb25fbGlzdHMvJyArIGl0ZW1pZCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICkqL1xyXG4gICAgICB9KVxyXG4gICAgICAvL2FhMDkyYTJiLTdhNzAtNDIwMC05ZDhiLTVhODNjYzI1MTFmYiBcclxuICBcclxuICAgIH0sXHJcblxyXG4gIC8vR2V0cyBzcGVjaWZpYyBxdWVzdGlvbiBsaXN0IGZvciB0aGUgc2VsZWN0ZWQgZ2FtZVxyXG4gIGdldFF1ZXN0aW9uTGlzdChpZCl7XHJcbiAgICBhcGkuZ2V0KCcvcXVlc3Rpb25fbGlzdHMvJyArIGlkKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEucXVlc3Rpb25zKVxyXG4gICAgICAgIHRoaXMucXVlc3Rpb25zID0gcmVzcG9uc2UuZGF0YS5xdWVzdGlvbnNcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICB9LFxyXG5cclxuICBzcGxpY2VRdWVzdGlvbigpe1xyXG4gICAgaWYodGhpcy5xdWVzdGlvbnMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnF1ZXN0aW9ucy5sZW5ndGgpXHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9IHRoaXMucXVlc3Rpb25zW2ldLnRleHRcclxuICAgICAgICB0aGlzLnF1ZXN0aW9ucy5zbGljZShpLDEpXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5xdWVzdGlvbilcclxuICAgICAgICB0aGlzLmFuc3dlcjEgPSB0aGlzLnF1ZXN0aW9uc1tpXS5hbnN3ZXJzWzBdLnRleHRcclxuICAgICAgICB0aGlzLmFuc3dlcjIgPSB0aGlzLnF1ZXN0aW9uc1tpXS5hbnN3ZXJzWzFdLnRleHRcclxuICAgICAgICB0aGlzLmFuc3dlcjMgPSB0aGlzLnF1ZXN0aW9uc1tpXS5hbnN3ZXJzWzJdLnRleHRcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYm9vcFwiKVxyXG4gICAgICB9XHJcbiAgfSxcclxuXHJcbiAgY2hlY2tBbnN3ZXIoYW5zKXtcclxuICAgIHRoaXMuYnV0dG9uQ2xpY2tlZCA9IHRydWU7XHJcblxyXG4gICAgaWYoYW5zID09IHRoaXMuYW5zd2VyMSl7XHJcbiAgICAgIGNvbnN0IGNhck1vdmVEaXN0YW5jZSA9ICgyICsgdGhpcy50aW1lcik7XHJcbiAgICAgIHRoaXMuYW5zd2VySXMgPSB0cnVlO1xyXG4gICAgICB0aGlzLmFuc3dlclBvcHVwID0gdHJ1ZTtcclxuICAgICAgdGhpcy5hbnN3ZXJQb3B1cFRleHQgPSAnQ29ycmVjdCEnXHJcbiAgICAgIHRoaXMubW92ZUNhcnMoMSwgY2FyTW92ZURpc3RhbmNlKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGFucyA9PSBudWxsKXtcclxuICAgICAgY29uc29sZS5sb2coXCJXcm9uZyBhbnN3ZXJcIik7XHJcbiAgICAgIGNvbnN0IGNhck1vdmVEaXN0YW5jZSA9IDU7XHJcbiAgICAgIHRoaXMuYW5zd2VySXMgPSBmYWxzZTtcclxuICAgICAgdGhpcy5hbnN3ZXJQb3B1cCA9IHRydWU7XHJcbiAgICAgIHRoaXMuYW5zd2VyUG9wdXBUZXh0ID0gJ0luY29ycmVjdCEnXHJcbiAgICAgIHRoaXMubW92ZUNhcnMoMSwgY2FyTW92ZURpc3RhbmNlKTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiV3JvbmcgYW5zd2VyXCIpO1xyXG4gICAgICBjb25zdCBjYXJNb3ZlRGlzdGFuY2UgPSAoMCArIHRoaXMudGltZXIpO1xyXG4gICAgICB0aGlzLmFuc3dlcklzID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYW5zd2VyUG9wdXAgPSB0cnVlO1xyXG4gICAgICB0aGlzLmFuc3dlclBvcHVwVGV4dCA9ICdJbmNvcnJlY3QhJ1xyXG4gICAgICB0aGlzLm1vdmVDYXJzKDEsIGNhck1vdmVEaXN0YW5jZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy9HZXQgc3BlY2lmaWMgcXVlc3Rpb25zOiByZXNwb25zZS5kYXRhLnF1ZXN0aW9uc1tpbmRleF1cclxuICAvL0dldCBzcGVjaWZpYyBxdWVzdGlvbiB0ZXh0OiByZXNwb25zZS5kYXRhLnF1ZXN0aW9uc1tpbmRleF0udGV4dFxyXG4gIC8vR2V0IHNwZWNpZmljIHF1ZXN0aW9uIGFuc3dlcjogcmVzcG9uc2UuZGF0YS5xdWVzdGlvbnNbaW5kZXhdLmFuc3dlcnNbaW5kZXhdXHJcblxyXG4gICAgbW92ZUNhcnMoY2FySW5kZXggPSBudWxsLCBjbWQgPSBudWxsKXtcclxuICAgICAgY29uc3QgY2FycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2FyXCIpO1xyXG5cclxuICAgICAgY2Fycy5mb3JFYWNoKChjYXIsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKGNhckluZGV4ID09IG51bGwgfHwgY2FySW5kZXggPT0gaW5kZXgpe1xyXG4gICAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IHBhcnNlSW50KGNhci5zdHlsZS50b3ApIHx8IDA7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRQb3NpdGlvbiA+IDApIHtcclxuICAgICAgICAgIGNhci5zdHlsZS50cmFuc2l0aW9uID0gXCJ0b3AgNXNcIjsgLy8gQWRkIHRoZSB0cmFuc2l0aW9uIGJhY2tcclxuICAgICAgICAgIGNhci5zdHlsZS50b3AgPSBgJHtjdXJyZW50UG9zaXRpb24gLSBjbWR9JWA7IC8vIEFkanVzdCB0aGUgcG9zaXRpb24gYmFzZWQgb24geW91ciByZXF1aXJlbWVudHNcclxuICAgICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgdGhpcy5zaG93RW5kU2NyZWVuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVzZXRDYXJzKCkge1xyXG4gICAgICBjb25zdCBjYXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXJcIik7XHJcblxyXG4gICAgICBjYXJzLmZvckVhY2goKGNhcikgPT4ge1xyXG4gICAgICAgIGNhci5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7IC8vIFJlbW92ZSB0aGUgdHJhbnNpdGlvbiB0ZW1wb3JhcmlseVxyXG4gICAgICAgIGNhci5zdHlsZS50b3AgPSBcIjg1JVwiOyAvLyBSZXNldCB0aGUgcG9zaXRpb24gdG8gdGhlIGluaXRpYWwgdmFsdWVcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuXHJcbi5vdmVybGF5IHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICB6LWluZGV4OiA5OTk5O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNXgpO1xyXG59XHJcblxyXG4ub3ZlcmxheS1jb250ZW50IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDYwMHB4O1xyXG4gIGhlaWdodDogNTAwcHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLmVuZC1vdmVybGF5e1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG4gIHotaW5kZXg6IDk5OTk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig1eCk7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbn1cclxuXHJcbi50ZXh0LXdyYXBwZXJ7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgd2lkdGg6IGF1dG87XHJcbiAgaGVpZ2h0OiA1MCU7XHJcbn1cclxuLnRleHQge1xyXG4gIGZvbnQtc2l6ZTogeC1sYXJnZTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xyXG4gIG92ZXJmbG93OnZpc2libGVcclxufVxyXG5cclxuLmJhY2stYnV0dG9uIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAxMHB4O1xyXG4gIHJpZ2h0OiAxMHB4O1xyXG59XHJcblxyXG4ucGFnZS1jb250ZW50IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBtYXgtaGVpZ2h0OiAxMDAlO1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxufVxyXG5cclxuLnJvYWR7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBhbmltYXRpb246IHJ1YmJlckJhbmQgMXMgZWFzZVxyXG59XHJcblxyXG4uY2Fyc3tcclxuICBhbmltYXRpb246IGZhZGVJbiAxcyBlYXNlO1xyXG59XHJcblxyXG4uY2FyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiA4MCU7XHJcbiAgbGVmdDogNTAlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcclxuICB3aWR0aDogMTAwcHg7XHJcbiAgaGVpZ2h0OiAxMDBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5jYXIxe1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDgwJTtcclxuICBsZWZ0OiAyMCU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xyXG4gIHdpZHRoOiA1MDBweDtcclxuICBoZWlnaHQ6IDUwMHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmNhcjJ7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogODAlO1xyXG4gIGxlZnQ6IDQwJTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XHJcbiAgd2lkdGg6IDUwMHB4O1xyXG4gIGhlaWdodDogNTAwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uY2FyM3tcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiA4MCU7XHJcbiAgbGVmdDogNjAlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcclxuICB3aWR0aDogNTAwcHg7XHJcbiAgaGVpZ2h0OiA1MDBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5jYXI0e1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDgwJTtcclxuICBsZWZ0OiA4MCU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xyXG4gIHdpZHRoOiA1MDBweDtcclxuICBoZWlnaHQ6IDUwMHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmNhcjV7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogODAlO1xyXG4gIGxlZnQ6IDY1JTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XHJcbiAgd2lkdGg6IDUwMHB4O1xyXG4gIGhlaWdodDogNTAwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbjwvc3R5bGU+Il0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX29wZW5CbG9jayIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlVGV4dFZOb2RlIiwiX2NyZWF0ZVZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFlLGFBQUE7QUNBZixJQUFlLGFBQUE7QUNBZixJQUFlLGFBQUE7QUNBZixJQUFlLGFBQUE7QUNBZixJ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
