import { Q as QBtn } from "./QBtn.da666cb1.js";
import { Q as QPage } from "./QPage.6732de9a.js";
import { e as emitter } from "./mitt.eb8c962f.js";
import { api } from "./axios.d1cedc7f.js";
import { _ as _export_sfc, s as defineComponent, t as resolveComponent, v as openBlock, x as createBlock, y as withCtx, C as createBaseVNode, z as createVNode, S as createTextVNode, V as createCommentVNode, U as toDisplayString, D as pushScopeId, E as popScopeId } from "./index.2f099809.js";
import "./dom.6c943660.js";
var _imports_0 = "/assets/qrloading.dafd20dc.gif";
var GameLobby_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "GameLobby",
  data() {
    return {
      gameStarted: false,
      timer: 0
    };
  },
  mounted() {
    emitter.on("game.started", (data) => {
      this.gameStarted = true;
      this.countdownStart(data.countdown);
    });
  },
  unmounted() {
    emitter.off("game.started");
  },
  methods: {
    backToStart() {
      this.$router.go(-1);
    },
    goToGame() {
      this.$router.push({ name: "game" });
    },
    triggerButton() {
      const url = "gle/sessions/3b79a6c1-2fd4-4b09-a954-f7aa30450c0e/start";
      const payload = url;
      api.get(payload).then((response) => {
        console.log(response);
      });
    },
    countdownStart(cntd) {
      clearInterval(this.timerInterval);
      if (cntd != null && cntd != 0) {
        this.timer = cntd;
      }
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(this.timerInterval);
          this.goToGame();
        }
      }, 1e3);
    }
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-7ca1193d"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "page-content" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "quiz-logo" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    alt: "Quasar logo",
    src: _imports_0,
    style: { "width": "200px", "height": "200px", "background-color": "transparent" }
  })
], -1));
const _hoisted_3 = { class: "flex flex-center" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_q_text = resolveComponent("q-text");
  return openBlock(), createBlock(QPage, { class: "flex flex-center" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode(QBtn, {
          class: "back-button",
          flat: "",
          round: "",
          dense: "",
          icon: "arrow_back",
          onClick: _ctx.backToStart
        }, null, 8, ["onClick"]),
        createVNode(QBtn, {
          class: "forward-button",
          flat: "",
          round: "",
          dense: "",
          icon: "arrow_forward",
          onClick: _ctx.goToGame
        }, null, 8, ["onClick"]),
        createBaseVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.triggerButton && _ctx.triggerButton(...args)),
          style: { "position": "absolute", "top": "40px", "left": "10px" }
        }, "Trigger Game Start"),
        _hoisted_2,
        createBaseVNode("div", _hoisted_3, [
          _ctx.gameStarted == false ? (openBlock(), createBlock(_component_q_text, {
            key: 0,
            class: "waiting-text"
          }, {
            default: withCtx(() => [
              createTextVNode("Waiting for players...")
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.gameStarted == true ? (openBlock(), createBlock(_component_q_text, {
            key: 1,
            class: "waiting-text"
          }, {
            default: withCtx(() => [
              createTextVNode("Game starting in: " + toDisplayString(_ctx.timer), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ])
      ])
    ]),
    _: 1
  });
}
var GameLobby = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7ca1193d"], ["__file", "GameLobby.vue"]]);
export { GameLobby as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZUxvYmJ5LjBjMDBkYzZhLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXNzZXRzL3FybG9hZGluZy5naWYiLCIuLi8uLi8uLi9zcmMvcGFnZXMvR2FtZUxvYmJ5LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcIl9fVklURV9BU1NFVF9fZGFmZDIwZGNfX1wiIiwiPHRlbXBsYXRlPlxyXG4gICAgPHEtcGFnZSBjbGFzcz1cImZsZXggZmxleC1jZW50ZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtY29udGVudFwiPlxyXG4gICAgICAgIDxxLWJ0blxyXG4gICAgICBjbGFzcz1cImJhY2stYnV0dG9uXCJcclxuICAgICAgZmxhdFxyXG4gICAgICByb3VuZFxyXG4gICAgICBkZW5zZVxyXG4gICAgICBpY29uPVwiYXJyb3dfYmFja1wiXHJcbiAgICAgIEBjbGljaz1cImJhY2tUb1N0YXJ0XCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxxLWJ0blxyXG4gICAgICBjbGFzcz1cImZvcndhcmQtYnV0dG9uXCJcclxuICAgICAgZmxhdFxyXG4gICAgICByb3VuZFxyXG4gICAgICBkZW5zZVxyXG4gICAgICBpY29uPVwiYXJyb3dfZm9yd2FyZFwiXHJcbiAgICAgIEBjbGljaz1cImdvVG9HYW1lXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgQGNsaWNrPVwidHJpZ2dlckJ1dHRvblwiXHJcbiAgICAgIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDQwcHg7IGxlZnQ6IDEwcHg7XCI+VHJpZ2dlciBHYW1lIFN0YXJ0PC9idXR0b24+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInF1aXotbG9nb1wiPlxyXG4gICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgYWx0PVwiUXVhc2FyIGxvZ29cIlxyXG4gICAgICAgICAgc3JjPVwifmFzc2V0cy9xcmxvYWRpbmcuZ2lmXCJcclxuICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtY2VudGVyXCI+XHJcbiAgICAgICAgICA8cS10ZXh0IGNsYXNzPVwid2FpdGluZy10ZXh0XCIgdi1pZj1cImdhbWVTdGFydGVkID09IGZhbHNlXCI+V2FpdGluZyBmb3IgcGxheWVycy4uLjwvcS10ZXh0PlxyXG4gICAgICAgICAgPHEtdGV4dCBjbGFzcz1cIndhaXRpbmctdGV4dFwiIHYtaWY9XCJnYW1lU3RhcnRlZCA9PSB0cnVlXCI+R2FtZSBzdGFydGluZyBpbjoge3sgdGltZXIgfX08L3EtdGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPC9xLXBhZ2U+XHJcbiAgPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiBpbXBvcnQgeyBkZWZpbmVDb21wb25lbnQsIHJlZiB9IGZyb20gJ3Z1ZSdcclxuIGltcG9ydCB7ZW1pdHRlcn0gZnJvbSAnYm9vdC9taXR0J1xyXG4gaW1wb3J0IHthcGl9IGZyb20gJ2Jvb3QvYXhpb3MnXHJcbiAgXHJcbiAgZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcclxuICAgIG5hbWU6ICdHYW1lTG9iYnknLFxyXG4gICAgXHJcbiAgICBkYXRhKCl7XHJcbiAgICAgIHJldHVybntcclxuICAgICAgICBnYW1lU3RhcnRlZDogZmFsc2UsXHJcbiAgICAgICAgdGltZXI6IDAsXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW91bnRlZCgpe1xyXG4gICAgICBlbWl0dGVyLm9uKCdnYW1lLnN0YXJ0ZWQnLCBkYXRhID0+IHtcclxuICAgICAgICB0aGlzLmdhbWVTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvdW50ZG93blN0YXJ0KGRhdGEuY291bnRkb3duKTsgIFxyXG4gICAgICAgIC8vdGhpcy5nb1RvR2FtZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICB1bm1vdW50ZWQoKXtcclxuICAgICAgZW1pdHRlci5vZmYoJ2dhbWUuc3RhcnRlZCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2FsbGVkIGJ5IHRoZSBidXR0b24gdG8gZ28gdG8gdGhlIHByZXZpb3VzIGJyb3dzZXIgcGFnZVxyXG4gICAgICAgIGJhY2tUb1N0YXJ0KCl7XHJcbiAgICAgICAgICB0aGlzLiRyb3V0ZXIuZ28oLTEpO1xyXG4gICAgICB9LFxyXG4gICAgICAgIC8vIENhbGxlZCBieSB0aGUgYnV0dG9uIHRvIGdvIHRvIHRoZSBwcmV2aW91cyBicm93c2VyIHBhZ2VcclxuICAgICAgICBnb1RvR2FtZSgpe1xyXG4gICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe25hbWU6IFwiZ2FtZVwifSk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICB0cmlnZ2VyQnV0dG9uKCl7XHJcbiAgICAgICAgY29uc3QgdXJsID0gJ2dsZS9zZXNzaW9ucy8zYjc5YTZjMS0yZmQ0LTRiMDktYTk1NC1mN2FhMzA0NTBjMGUvc3RhcnQnXHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHVybFxyXG5cclxuICAgICAgICBhcGkuZ2V0KHBheWxvYWQpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICBcclxuICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGNvdW50ZG93blN0YXJ0KGNudGQpe1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lckludGVydmFsKTsgLy8gU3RvcCB0aGUgdGltZXJcclxuICAgICAgICBpZihjbnRkICE9IG51bGwgJiYgY250ZCAhPSAwKXtcclxuICAgICAgICAgIHRoaXMudGltZXIgPSBjbnRkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnRpbWVyID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXItLTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ29Ub0dhbWUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICB9KVxyXG5cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG5cclxuLnBhZ2UtY29udGVudCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4uYmFjay1idXR0b24ge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDEwcHg7XHJcbiAgcmlnaHQ6IDEwcHg7XHJcbn1cclxuXHJcbi5mb3J3YXJkLWJ1dHRvbiB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogNDBweDtcclxuICByaWdodDogMTBweDtcclxufVxyXG5cclxuLndhaXRpbmctdGV4dCB7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XHJcbiAgYW5pbWF0aW9uOiBmYWRlSW5VcCAxcyBlYXNlO1xyXG59XHJcblxyXG4ucXVpei1sb2dvIHtcclxuICBhbmltYXRpb246IGZhZGVJbkRvd24gMXMgZWFzZTtcclxufVxyXG48L3N0eWxlPiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZVRleHRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBZSxhQUFBOztBQzBDYixNQUFLLFlBQWEsZ0JBQWE7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFNO0FBQ0osV0FBTTtBQUFBLE1BQ0osYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLElBQ1Q7QUFBQSxFQUNEO0FBQUEsRUFFRCxVQUFTO0FBQ1AsWUFBUSxHQUFHLGdCQUFnQixVQUFRO0FBQ2pDLFdBQUssY0FBYztBQUNuQixXQUFLLGVBQWUsS0FBSyxTQUFTO0FBQUEsSUFFbEMsQ0FBQztBQUFBLEVBQ0o7QUFBQSxFQUVELFlBQVc7QUFDVCxZQUFRLElBQUksY0FBYztBQUFBLEVBQzNCO0FBQUEsRUFFRCxTQUFTO0FBQUEsSUFHTCxjQUFhO0FBQ1gsV0FBSyxRQUFRLEdBQUcsRUFBRTtBQUFBLElBQ3JCO0FBQUEsSUFFQyxXQUFVO0FBQ1IsV0FBSyxRQUFRLEtBQUssRUFBQyxNQUFNLE9BQU0sQ0FBQztBQUFBLElBQ25DO0FBQUEsSUFFRCxnQkFBZTtBQUNiLFlBQU0sTUFBTTtBQUNaLFlBQU0sVUFBVTtBQUVoQixVQUFJLElBQUksT0FBTyxFQUFFLEtBQUssQ0FBQyxhQUFhO0FBQ2xDLGdCQUFRLElBQUksUUFBUTtBQUFBLE9BRXZCO0FBQUEsSUFDQTtBQUFBLElBRUQsZUFBZSxNQUFLO0FBQ2xCLG9CQUFjLEtBQUssYUFBYTtBQUNoQyxVQUFHLFFBQVEsUUFBUSxRQUFRLEdBQUU7QUFDM0IsYUFBSyxRQUFRO0FBQUEsTUFDYjtBQUNGLFdBQUssZ0JBQWdCLFlBQVksTUFBTTtBQUNyQyxZQUFJLEtBQUssUUFBUSxHQUFFO0FBQ2pCLGVBQUs7QUFBQSxRQUNQLE9BQ0s7QUFDSCx3QkFBYyxLQUFLLGFBQWE7QUFDaEMsZUFBSyxTQUFRO0FBQUEsUUFDZjtBQUFBLE1BQ0QsR0FBRSxHQUFJO0FBQUEsSUFDVDtBQUFBLEVBQ0Q7Q0FFRjs7QUFwR1EsTUFBQSxhQUFBLEVBQUEsT0FBTSxlQUFjO3NEQW9CdkJBLGdDQU1NLE9BQUEsRUFORCxPQUFNLGVBQVc7QUFBQSxFQUNwQkEsZ0NBSUMsT0FBQTtBQUFBLElBSEQsS0FBSTtBQUFBLElBQ0osS0FBQTtBQUFBLElBQ0EsT0FBQSxFQUFtRSxTQUFBLFNBQUEsVUFBQSxTQUFBLG9CQUFBLGNBQUE7QUFBQTs7QUFHaEUsTUFBQSxhQUFBLEVBQUEsT0FBTSxtQkFBa0I7OztzQkE1QmpDQyxZQWlDUyxPQUFBLEVBQUEsT0FBQSxzQkFqQ3VCO0FBQUEscUJBQzlCLE1BK0JJO0FBQUEsTUEvQkpELGdCQStCSSxPQS9CSixZQStCSTtBQUFBLFFBOUJGRSxZQU9FLE1BQUE7QUFBQSxVQU5KLE9BQU07QUFBQSxVQUNOLE1BQUE7QUFBQSxVQUNBLE9BQUE7QUFBQSxVQUNBLE9BQUE7QUFBQSxVQUNBLE1BQUs7QUFBQSxVQUNKLFNBQU8sS0FBVztBQUFBO1FBRWpCQSxZQU9FLE1BQUE7QUFBQSxVQU5KLE9BQU07QUFBQSxVQUNOLE1BQUE7QUFBQSxVQUNBLE9BQUE7QUFBQSxVQUNBLE9BQUE7QUFBQSxVQUNBLE1BQUs7QUFBQSxVQUNKLFNBQU8sS0FBUTtBQUFBO1FBRWRGLGdCQUU0RSxVQUFBO0FBQUEsVUFEN0UsZ0RBQU8sS0FBYSxpQkFBQSxLQUFBLGNBQUEsR0FBQSxJQUFBO0FBQUEsVUFDckIsT0FBQSxFQUFrRCxZQUFBLFlBQUEsT0FBQSxRQUFBLFFBQUEsT0FBQTtBQUFBLFdBQUMsb0JBQWtCO0FBQUEsUUFDbkU7QUFBQSxRQU9BQSxnQkFHTSxPQUhOLFlBR007QUFBQSxVQUYrQixLQUFXLGVBQUEsc0JBQTlDQyxZQUF3RixtQkFBQTtBQUFBO1lBQWhGLE9BQU07QUFBQTs2QkFBMkMsTUFBc0I7QUFBQSw4QkFBdEIsd0JBQXNCO0FBQUE7OztVQUM1QyxLQUFXLGVBQUEscUJBQTlDQSxZQUE4RixtQkFBQTtBQUFBO1lBQXRGLE9BQU07QUFBQTs2QkFBMEMsTUFBa0I7QUFBQSxjQUFsQkUsZ0JBQUEsdUNBQXFCLEtBQUssS0FBQSxHQUFBLENBQUE7QUFBQTs7Ozs7Ozs7Ozs7In0=
