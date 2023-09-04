import { Q as QBtn } from "./QBtn.da666cb1.js";
import { Q as QPage } from "./QPage.6732de9a.js";
import { _ as _imports_0 } from "./Quizrace.5f367a82.js";
import { _ as _export_sfc, s as defineComponent, r as ref, v as openBlock, x as createBlock, y as withCtx, C as createBaseVNode, z as createVNode, D as pushScopeId, E as popScopeId } from "./index.2f099809.js";
import "./dom.6c943660.js";
var IndexPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "IndexPage",
  setup() {
    const loading = ref([
      false
    ]);
    const progress = ref(false);
    function simulateProgress(number) {
      loading.value[number] = true;
      setTimeout(() => {
        loading.value[number] = false;
      }, 3e3);
    }
    return {
      loading,
      progress,
      simulateProgress
    };
  },
  methods: {
    goQuestions() {
      this.$router.push({ name: "login" });
    }
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-13c9ebbc"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "page-content" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "image-container" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    alt: "Quasar logo",
    src: _imports_0,
    style: { "width": "200px", "height": "200px" }
  })
], -1));
const _hoisted_3 = { class: "button-container" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "flex flex-center" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        _hoisted_2,
        createBaseVNode("div", _hoisted_3, [
          createVNode(QBtn, {
            loading: _ctx.loading[0],
            color: "secondary",
            onClick: _cache[0] || (_cache[0] = ($event) => {
              _ctx.simulateProgress(0);
              _ctx.goQuestions();
            }),
            label: "Start",
            class: "center-image"
          }, null, 8, ["loading"])
        ])
      ])
    ]),
    _: 1
  });
}
var IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-13c9ebbc"], ["__file", "IndexPage.vue"]]);
export { IndexPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXhQYWdlLjEwYzNhZjRlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvSW5kZXhQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJmbGV4IGZsZXgtY2VudGVyXCI+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2UtY29udGVudFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImltYWdlLWNvbnRhaW5lclwiPlxuICAgICAgPGltZ1xuICAgICAgYWx0PVwiUXVhc2FyIGxvZ29cIlxuICAgICAgc3JjPVwifmFzc2V0cy9RdWl6cmFjZS5wbmdcIlxuICAgICAgc3R5bGU9XCJ3aWR0aDogMjAwcHg7IGhlaWdodDogMjAwcHhcIlxuICAgID5cbiAgICAgIDwvZGl2PlxuICAgIFxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1jb250YWluZXJcIj5cbiAgICAgICAgPHEtYnRuIDpsb2FkaW5nPVwibG9hZGluZ1swXVwiIGNvbG9yPVwic2Vjb25kYXJ5XCIgQGNsaWNrPVwic2ltdWxhdGVQcm9ncmVzcygwKTsgZ29RdWVzdGlvbnMoKVwiIGxhYmVsPVwiU3RhcnRcIiBjbGFzcz1cImNlbnRlci1pbWFnZVwiIC8+XG4gICAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IGRlZmluZUNvbXBvbmVudCwgcmVmIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAnSW5kZXhQYWdlJyxcblxuICBzZXR1cCAoKSB7XG4gICAgY29uc3QgbG9hZGluZyA9IHJlZihbXG4gICAgICBmYWxzZSxcbiAgICBdKVxuXG4gICAgY29uc3QgcHJvZ3Jlc3MgPSByZWYoZmFsc2UpXG5cbiAgICBmdW5jdGlvbiBzaW11bGF0ZVByb2dyZXNzIChudW1iZXIpIHtcbiAgICAgIC8vIHdlIHNldCBsb2FkaW5nIHN0YXRlXG4gICAgICBsb2FkaW5nLnZhbHVlWyBudW1iZXIgXSA9IHRydWVcblxuICAgICAgLy8gc2ltdWxhdGUgYSBkZWxheVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIHdlJ3JlIGRvbmUsIHdlIHJlc2V0IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgbG9hZGluZy52YWx1ZVsgbnVtYmVyIF0gPSBmYWxzZVxuICAgICAgfSwgMzAwMClcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbG9hZGluZyxcbiAgICAgIHByb2dyZXNzLFxuICAgICAgc2ltdWxhdGVQcm9ncmVzc1xuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOntcbiAgICBnb1F1ZXN0aW9ucygpIHtcbiAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goeyBuYW1lOiBcImxvZ2luXCIgfSk7XG4gICAgICB9LFxuICB9XG4gICAgICBcbn0pXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuLmltYWdlLWNvbnRhaW5lciB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIGFuaW1hdGlvbjogZmFkZUluRG93biAxcyBlYXNlO1xufVxuXG4ucGFnZS1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmNlbnRlci1pbWFnZSB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogMTAwJTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmJ1dHRvbi1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYW5pbWF0aW9uOiBmYWRlSW5VcCAxcyBlYXNlO1xufVxuPC9zdHlsZT5cblxuPCEtLS08dGVtcGxhdGU+XG4gIDxxLXBhZ2UgcGFkZGluZz5cbiAgICA8ZGl2IGNsYXNzPVwicGFnZS1jb250ZW50XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtY29udGFpbmVyXCI+XG4gICAgICAgIDxpbWcgc3JjPVwifmFzc2V0c1xccXVhc2FyLWxvZ28tdmVydGljYWwuc3ZnXCIgYWx0PVwiSW1hZ2VcIiBjbGFzcz1cImNlbnRlci1pbWFnZVwiPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgICA8cS1idG4gOmxvYWRpbmc9XCJsb2FkaW5nWzBdXCIgY29sb3I9XCJzZWNvbmRhcnlcIiBAY2xpY2s9XCJzaW11bGF0ZVByb2dyZXNzKDApXCIgbGFiZWw9XCJCdXR0b25cIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuXG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2V0dXAgKCkge1xuICAgIGNvbnN0IGxvYWRpbmcgPSByZWYoW1xuICAgICAgZmFsc2UsXG4gICAgXSlcblxuICAgIGNvbnN0IHByb2dyZXNzID0gcmVmKGZhbHNlKVxuXG4gICAgZnVuY3Rpb24gc2ltdWxhdGVQcm9ncmVzcyAobnVtYmVyKSB7XG4gICAgICAvLyB3ZSBzZXQgbG9hZGluZyBzdGF0ZVxuICAgICAgbG9hZGluZy52YWx1ZVsgbnVtYmVyIF0gPSB0cnVlXG5cbiAgICAgIC8vIHNpbXVsYXRlIGEgZGVsYXlcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyB3ZSdyZSBkb25lLCB3ZSByZXNldCBsb2FkaW5nIHN0YXRlXG4gICAgICAgIGxvYWRpbmcudmFsdWVbIG51bWJlciBdID0gZmFsc2VcbiAgICAgIH0sIDMwMDApXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxvYWRpbmcsXG4gICAgICBwcm9ncmVzcyxcbiAgICAgIHNpbXVsYXRlUHJvZ3Jlc3NcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbi5wYWdlLWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uaW1hZ2UtY29udGFpbmVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmNlbnRlci1pbWFnZSB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogMTAwJTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmJ1dHRvbi1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbjwvc3R5bGU+LS0+Il0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQXFCQSxNQUFLLFlBQWEsZ0JBQWE7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixRQUFTO0FBQ1AsVUFBTSxVQUFVLElBQUk7QUFBQSxNQUNsQjtBQUFBLEtBQ0Q7QUFFRCxVQUFNLFdBQVcsSUFBSSxLQUFLO0FBRTFCLGFBQVMsaUJBQWtCLFFBQVE7QUFFakMsY0FBUSxNQUFPLFVBQVc7QUFHMUIsaUJBQVcsTUFBTTtBQUVmLGdCQUFRLE1BQU8sVUFBVztBQUFBLE1BQzNCLEdBQUUsR0FBSTtBQUFBLElBQ1Q7QUFFQSxXQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Q7QUFBQSxFQUVELFNBQVE7QUFBQSxJQUNOLGNBQWM7QUFDVixXQUFLLFFBQVEsS0FBSyxFQUFFLE1BQU0sUUFBUyxDQUFBO0FBQUEsSUFDcEM7QUFBQSxFQUNMO0FBRUYsQ0FBQzs7QUFyRFEsTUFBQSxhQUFBLEVBQUEsT0FBTSxlQUFjO3NEQUN2QkEsZ0NBTU0sT0FBQSxFQU5ELE9BQU0scUJBQWlCO0FBQUEsRUFDNUJBLGdDQUlELE9BQUE7QUFBQSxJQUhDLEtBQUk7QUFBQSxJQUNKLEtBQUE7QUFBQSxJQUNBLE9BQUEsRUFBbUMsU0FBQSxTQUFBLFVBQUEsUUFBQTtBQUFBOztBQUk5QixNQUFBLGFBQUEsRUFBQSxPQUFNLG1CQUFrQjs7c0JBVmpDQyxZQWNTLE9BQUEsRUFBQSxPQUFBLHNCQWR1QjtBQUFBLHFCQUM5QixNQVlJO0FBQUEsTUFaSkQsZ0JBWUksT0FaSixZQVlJO0FBQUEsUUFYRjtBQUFBLFFBUUFBLGdCQUVNLE9BRk4sWUFFTTtBQUFBLFVBREpFLFlBQWdJLE1BQUE7QUFBQSxZQUF4SCxTQUFTLEtBQU8sUUFBQTtBQUFBLFlBQUssT0FBTTtBQUFBLFlBQWEsU0FBSyxPQUFBLE9BQUEsT0FBQSxLQUFBLFlBQUE7QUFBRSxtQkFBZ0IsaUJBQUEsQ0FBQTtBQUFLLG1CQUFXLFlBQUE7QUFBQSxZQUFBO0FBQUEsWUFBSSxPQUFNO0FBQUEsWUFBUSxPQUFNO0FBQUE7Ozs7Ozs7OzsifQ==
