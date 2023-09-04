import { Q as QBtn } from "./QBtn.da666cb1.js";
import { _ as _export_sfc, s as defineComponent, v as openBlock, N as createElementBlock, C as createBaseVNode, z as createVNode, O as Fragment, P as renderList, K as withDirectives, Q as vModelText, R as withKeys, S as createTextVNode, U as toDisplayString, D as pushScopeId, E as popScopeId } from "./index.2f099809.js";
import "./dom.6c943660.js";
var Questions_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "QuestionsPage",
  data() {
    return {
      questions: [
        { id: 1, text: "Question 1" },
        { id: 2, text: "Question 2" },
        { id: 3, text: "Question 3" },
        { id: 4, text: "Question 4" },
        { id: 5, text: "Question 5" },
        { id: 6, text: "Question 6" },
        { id: 7, text: "Question 7" },
        { id: 8, text: "Question 8" },
        { id: 9, text: "Question 9" },
        { id: 10, text: "Question 10" }
      ],
      selectedQuestions: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    startQuiz() {
      this.$router.push({ name: "game" });
    },
    addQuestion(question) {
      this.selectedQuestions.push(question);
      const index = this.questions.findIndex((q) => q.id === question.id);
      this.questions.splice(index, 1);
    },
    removeQuestion(question) {
      const index = this.questions.findIndex((q) => q.id === question.id);
      if (index !== -1) {
        this.questions.splice(index, 1);
      }
    },
    removeFromSelected(selectedQuestion) {
      const index = this.selectedQuestions.findIndex((q) => q.id === selectedQuestion.id);
      this.selectedQuestions.splice(index, 1);
      this.questions.push(selectedQuestion);
    },
    addUserQuestion() {
      if (this.newQuestion.trim() === "") {
        return;
      }
      const newQuestion = {
        id: this.questions.length + 1,
        text: this.newQuestion
      };
      this.questions.push(newQuestion);
      this.newQuestion = "";
    }
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-01a60ec4"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "grid-container" };
const _hoisted_2 = { class: "q-card q-column-card" };
const _hoisted_3 = { class: "q-card-section q-column-card-section scrollable-list" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h2", { class: "text-h6 text-center" }, "Questions", -1));
const _hoisted_5 = { class: "q-list" };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { class: "q-card q-column-card" };
const _hoisted_9 = { class: "q-card-section q-column-card-section scrollable-list" };
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h2", { class: "text-h6 text-center" }, "Selected Questions", -1));
const _hoisted_11 = { class: "q-list" };
const _hoisted_12 = ["onClick"];
const _hoisted_13 = { class: "user-input-row" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      createVNode(QBtn, {
        class: "back-button",
        flat: "",
        round: "",
        dense: "",
        icon: "arrow_back",
        onClick: _ctx.goBack
      }, null, 8, ["onClick"]),
      createBaseVNode("div", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, [
          _hoisted_4,
          createBaseVNode("ul", _hoisted_5, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.questions, (question) => {
              return openBlock(), createElementBlock("li", {
                key: question.id
              }, [
                createTextVNode(toDisplayString(question.text) + " ", 1),
                createBaseVNode("button", {
                  onClick: ($event) => _ctx.addQuestion(question)
                }, "Add", 8, _hoisted_6),
                createBaseVNode("button", {
                  onClick: ($event) => _ctx.removeQuestion(question)
                }, "Remove", 8, _hoisted_7)
              ]);
            }), 128))
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_8, [
        createBaseVNode("div", _hoisted_9, [
          _hoisted_10,
          createBaseVNode("ul", _hoisted_11, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.selectedQuestions, (selectedQuestion) => {
              return openBlock(), createElementBlock("li", {
                key: selectedQuestion.id,
                onClick: ($event) => _ctx.removeFromSelected(selectedQuestion)
              }, toDisplayString(selectedQuestion.text), 9, _hoisted_12);
            }), 128))
          ])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_13, [
      withDirectives(createBaseVNode("input", {
        type: "text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.newQuestion = $event),
        placeholder: "Enter a new question",
        onKeydown: _cache[1] || (_cache[1] = withKeys((...args) => _ctx.addUserQuestion && _ctx.addUserQuestion(...args), ["enter"]))
      }, null, 544), [
        [vModelText, _ctx.newQuestion]
      ]),
      createBaseVNode("button", {
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.addUserQuestion && _ctx.addUserQuestion(...args))
      }, "Add Question")
    ]),
    createVNode(QBtn, {
      class: "start-button",
      color: "secondary",
      label: "Start",
      onClick: _ctx.startQuiz
    }, null, 8, ["onClick"])
  ], 64);
}
var Questions = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-01a60ec4"], ["__file", "Questions.vue"]]);
export { Questions as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVlc3Rpb25zLjg1YzViZGM1LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvUXVlc3Rpb25zLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImdyaWQtY29udGFpbmVyXCI+XHJcbiAgICA8cS1idG5cclxuICAgICAgY2xhc3M9XCJiYWNrLWJ1dHRvblwiXHJcbiAgICAgIGZsYXRcclxuICAgICAgcm91bmRcclxuICAgICAgZGVuc2VcclxuICAgICAgaWNvbj1cImFycm93X2JhY2tcIlxyXG4gICAgICBAY2xpY2s9XCJnb0JhY2tcIlxyXG4gICAgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJxLWNhcmQgcS1jb2x1bW4tY2FyZFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicS1jYXJkLXNlY3Rpb24gcS1jb2x1bW4tY2FyZC1zZWN0aW9uIHNjcm9sbGFibGUtbGlzdFwiPlxyXG4gICAgICAgIDxoMiBjbGFzcz1cInRleHQtaDYgdGV4dC1jZW50ZXJcIj5RdWVzdGlvbnM8L2gyPlxyXG4gICAgICAgIDx1bCBjbGFzcz1cInEtbGlzdFwiPlxyXG4gICAgICAgICAgPGxpIHYtZm9yPVwicXVlc3Rpb24gaW4gcXVlc3Rpb25zXCIgOmtleT1cInF1ZXN0aW9uLmlkXCI+XHJcbiAgICAgICAgICAgIHt7IHF1ZXN0aW9uLnRleHQgfX1cclxuICAgICAgICAgICAgPGJ1dHRvbiBAY2xpY2s9XCJhZGRRdWVzdGlvbihxdWVzdGlvbilcIj5BZGQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBAY2xpY2s9XCJyZW1vdmVRdWVzdGlvbihxdWVzdGlvbilcIj5SZW1vdmU8L2J1dHRvbj5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJxLWNhcmQgcS1jb2x1bW4tY2FyZFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicS1jYXJkLXNlY3Rpb24gcS1jb2x1bW4tY2FyZC1zZWN0aW9uIHNjcm9sbGFibGUtbGlzdFwiPlxyXG4gICAgICAgIDxoMiBjbGFzcz1cInRleHQtaDYgdGV4dC1jZW50ZXJcIj5TZWxlY3RlZCBRdWVzdGlvbnM8L2gyPlxyXG4gICAgICAgIDx1bCBjbGFzcz1cInEtbGlzdFwiPlxyXG4gICAgICAgICAgPGxpIHYtZm9yPVwic2VsZWN0ZWRRdWVzdGlvbiBpbiBzZWxlY3RlZFF1ZXN0aW9uc1wiIDprZXk9XCJzZWxlY3RlZFF1ZXN0aW9uLmlkXCIgQGNsaWNrPVwicmVtb3ZlRnJvbVNlbGVjdGVkKHNlbGVjdGVkUXVlc3Rpb24pXCI+XHJcbiAgICAgICAgICAgIHt7IHNlbGVjdGVkUXVlc3Rpb24udGV4dCB9fVxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgXHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cInVzZXItaW5wdXQtcm93XCI+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHYtbW9kZWw9XCJuZXdRdWVzdGlvblwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgYSBuZXcgcXVlc3Rpb25cIiBAa2V5ZG93bi5lbnRlcj1cImFkZFVzZXJRdWVzdGlvblwiIC8+XHJcbiAgICAgIDxidXR0b24gQGNsaWNrPVwiYWRkVXNlclF1ZXN0aW9uXCI+QWRkIFF1ZXN0aW9uPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbiAgPHEtYnRuIGNsYXNzPVwic3RhcnQtYnV0dG9uXCIgY29sb3I9XCJzZWNvbmRhcnlcIiBsYWJlbD1cIlN0YXJ0XCIgQGNsaWNrPVwic3RhcnRRdWl6XCIgLz5cclxuXHJcbjwvdGVtcGxhdGU+XHJcbiAgXHJcbiAgPHNjcmlwdD5cclxuICBpbXBvcnQgeyBkZWZpbmVDb21wb25lbnQsIHJlZiB9IGZyb20gJ3Z1ZSdcclxuICBcclxuICBleHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xyXG4gICAgbmFtZTogJ1F1ZXN0aW9uc1BhZ2UnLFxyXG4gICAgXHJcbiAgICBkYXRhKCl7XHJcbiAgICAgIHJldHVybntcclxuICAgICAgICBxdWVzdGlvbnM6IFtcclxuICAgICAgICAgIHtpZDogMSwgdGV4dDogJ1F1ZXN0aW9uIDEnfSxcclxuICAgICAgICAgIHtpZDogMiwgdGV4dDogJ1F1ZXN0aW9uIDInfSxcclxuICAgICAgICAgIHtpZDogMywgdGV4dDogJ1F1ZXN0aW9uIDMnfSxcclxuICAgICAgICAgIHtpZDogNCwgdGV4dDogJ1F1ZXN0aW9uIDQnfSxcclxuICAgICAgICAgIHtpZDogNSwgdGV4dDogJ1F1ZXN0aW9uIDUnfSxcclxuICAgICAgICAgIHtpZDogNiwgdGV4dDogJ1F1ZXN0aW9uIDYnfSxcclxuICAgICAgICAgIHtpZDogNywgdGV4dDogJ1F1ZXN0aW9uIDcnfSxcclxuICAgICAgICAgIHtpZDogOCwgdGV4dDogJ1F1ZXN0aW9uIDgnfSxcclxuICAgICAgICAgIHtpZDogOSwgdGV4dDogJ1F1ZXN0aW9uIDknfSxcclxuICAgICAgICAgIHtpZDogMTAsIHRleHQ6ICdRdWVzdGlvbiAxMCd9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2VsZWN0ZWRRdWVzdGlvbnM6IFtdLFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgZ29CYWNrKCkge1xyXG4gICAgICAvLyBBZGQgeW91ciBsb2dpYyBoZXJlIHRvIG5hdmlnYXRlIGJhY2sgdG8gdGhlIHByZXZpb3VzIHBhZ2VcclxuICAgICAgLy8gRm9yIGV4YW1wbGUsIHlvdSBjYW4gdXNlIHRoZSBWdWUgUm91dGVyJ3MgYHJvdXRlci5nbygtMSlgIG1ldGhvZFxyXG4gICAgICB0aGlzLiRyb3V0ZXIuZ28oLTEpO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgc3RhcnRRdWl6KCkge1xyXG4gICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHsgbmFtZTogXCJnYW1lXCIgfSk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBhZGRRdWVzdGlvbihxdWVzdGlvbil7XHJcbiAgICAgIC8vIEFkZCB0aGUgY2xpY2tlZCBxdWVzdGlvbiB0byB0aGUgc2VsZWN0ZWRRdWVzdGlvbnMgYXJyYXlcclxuICAgICAgdGhpcy5zZWxlY3RlZFF1ZXN0aW9ucy5wdXNoKHF1ZXN0aW9uKTtcclxuICAgICAgLy8gUmVtb3ZlIHRoZSBxdWVzdGlvbiBmcm9tIHRoZSBxdWVzdGlvbnMgYXJyYXlcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnF1ZXN0aW9ucy5maW5kSW5kZXgocSA9PiBxLmlkID09PSBxdWVzdGlvbi5pZCk7XHJcbiAgICAgIHRoaXMucXVlc3Rpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbW92ZVF1ZXN0aW9uKHF1ZXN0aW9uKXtcclxuICAgICAgLy8gUmVtb3ZlIHRoZSBjbGlja2VkIHF1ZXN0aW9uIGZyb20gdGhlIHF1ZXN0aW9ucyBhcnJheVxyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMucXVlc3Rpb25zLmZpbmRJbmRleChxID0+IHEuaWQgPT09IHF1ZXN0aW9uLmlkKTtcclxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgcmVtb3ZlRnJvbVNlbGVjdGVkKHNlbGVjdGVkUXVlc3Rpb24pe1xyXG4gICAgICAvLyBSZW1vdmUgdGhlIGNsaWNrZWQgc2VsZWN0ZWRRdWVzdGlvbiBmcm9tIHRoZSBzZWxlY3RlZFF1ZXN0aW9ucyBhcnJheVxyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0ZWRRdWVzdGlvbnMuZmluZEluZGV4KHEgPT4gcS5pZCA9PT0gc2VsZWN0ZWRRdWVzdGlvbi5pZCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRRdWVzdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgLy8gQWRkIHRoZSBzZWxlY3RlZFF1ZXN0aW9uIGJhY2sgdG8gdGhlIHF1ZXN0aW9ucyBhcnJheVxyXG4gICAgICB0aGlzLnF1ZXN0aW9ucy5wdXNoKHNlbGVjdGVkUXVlc3Rpb24pO1xyXG4gICAgICB9LFxyXG4gICAgICBhZGRVc2VyUXVlc3Rpb24oKSB7XHJcbiAgICAgIGlmICh0aGlzLm5ld1F1ZXN0aW9uLnRyaW0oKSA9PT0gJycpIHtcclxuICAgICAgICByZXR1cm47IC8vIElnbm9yZSBlbXB0eSBpbnB1dFxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDcmVhdGUgYSBuZXcgcXVlc3Rpb24gb2JqZWN0IHdpdGggdGhlIHVzZXIgaW5wdXR0ZWQgdGV4dFxyXG4gICAgICBjb25zdCBuZXdRdWVzdGlvbiA9IHtcclxuICAgICAgICBpZDogdGhpcy5xdWVzdGlvbnMubGVuZ3RoICsgMSxcclxuICAgICAgICB0ZXh0OiB0aGlzLm5ld1F1ZXN0aW9uXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBBZGQgdGhlIG5ldyBxdWVzdGlvbiB0byB0aGUgcXVlc3Rpb25zIGFycmF5XHJcbiAgICAgIHRoaXMucXVlc3Rpb25zLnB1c2gobmV3UXVlc3Rpb24pO1xyXG5cclxuICAgICAgLy8gQ2xlYXIgdGhlIGlucHV0IGZpZWxkXHJcbiAgICAgIHRoaXMubmV3UXVlc3Rpb24gPSAnJztcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSlcclxuICA8L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5xLWNvbHVtbi1jYXJkIHtcclxuICB3aWR0aDogMzIwcHg7IC8qIFNldCB0aGUgd2lkdGggb2YgdGhlIGNvbHVtbnMgKi9cclxuICBoZWlnaHQ6IDQwMHB4OyAvKiBTZXQgdGhlIGhlaWdodCBvZiB0aGUgY29sdW1ucyAqL1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG4ucS1jb2x1bW4tY2FyZC1zZWN0aW9uIHtcclxuICBtYXgtaGVpZ2h0OiAzMDBweDsgLyogc2V0IHRoZSBtYXhpbXVtIGhlaWdodCBmb3IgdGhlIGxpc3QgdG8gbWFrZSBpdCBzY3JvbGxhYmxlICovXHJcbn1cclxuXHJcbi5xLWxpc3Qge1xyXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuICBwYWRkaW5nOiAwO1xyXG59XHJcblxyXG4ucS1saXN0IGxpIHtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDVweDsgLyogUGFkZGluZyBiZXR3ZWVuIG5ldyBsaW5lcyAqL1xyXG59XHJcblxyXG4uc2Nyb2xsYWJsZS1saXN0IHtcclxuICBtYXgtaGVpZ2h0OiAxMDAlOyAvKiBTZXQgdGhlIG1heGltdW0gaGVpZ2h0IGZvciB0aGUgbGlzdCB0byBtYWtlIGl0IHNjcm9sbGFibGUgKi9cclxuICBvdmVyZmxvdy15OiBhdXRvOyAvKiBFbmFibGUgdmVydGljYWwgc2Nyb2xsaW5nICovXHJcbn1cclxuXHJcbi5ncmlkLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDMyMHB4LCAxZnIpKTtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDBweDtcclxufVxyXG5cclxuLnVzZXItaW5wdXQtcm93IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxuICBnYXA6IDhweDtcclxufVxyXG5cclxuLmJhY2stYnV0dG9uIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAxMHB4O1xyXG4gIHJpZ2h0OiAxMHB4O1xyXG59XHJcblxyXG4uc3RhcnQtYnV0dG9uIHtcclxuICBtYXJnaW4tdG9wOiA1MHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuXHJcblxyXG4vKiBBZGQgYW55IG90aGVyIGN1c3RvbSBzdHlsZXMgeW91IG5lZWQgaGVyZSAqL1xyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl90b0Rpc3BsYXlTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7QUE2Q0UsTUFBSyxZQUFhLGdCQUFhO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTTtBQUNKLFdBQU07QUFBQSxNQUNKLFdBQVc7QUFBQSxRQUNULEVBQUMsSUFBSSxHQUFHLE1BQU0sYUFBWTtBQUFBLFFBQzFCLEVBQUMsSUFBSSxHQUFHLE1BQU0sYUFBWTtBQUFBLFFBQzFCLEVBQUMsSUFBSSxHQUFHLE1BQU0sYUFBWTtBQUFBLFFBQzFCLEVBQUMsSUFBSSxHQUFHLE1BQU0sYUFBWTtBQUFBLFFBQzFCLEVBQUMsSUFBSSxHQUFHLE1BQU0sYUFBWTtBQUFBLFFBQzFCLEVBQUMsSUFBSSxHQUFHLE1BQU0sYUFBWTtBQUFBLFFBQzFCLEVBQUMsSUFBSSxHQUFHLE1BQU0sYUFBWTtBQUFBLFFBQzFCLEVBQUMsSUFBSSxHQUFHLE1BQU0sYUFBWTtBQUFBLFFBQzFCLEVBQUMsSUFBSSxHQUFHLE1BQU0sYUFBWTtBQUFBLFFBQzFCLEVBQUMsSUFBSSxJQUFJLE1BQU0sY0FBYTtBQUFBLE1BQzdCO0FBQUEsTUFDRCxtQkFBbUIsQ0FBRTtBQUFBO0VBRXhCO0FBQUEsRUFDRCxTQUFTO0FBQUEsSUFDUCxTQUFTO0FBR1QsV0FBSyxRQUFRLEdBQUcsRUFBRTtBQUFBLElBQ2pCO0FBQUEsSUFFRCxZQUFZO0FBQ1YsV0FBSyxRQUFR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
