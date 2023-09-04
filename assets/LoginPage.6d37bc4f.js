import { u as useSizeProps, a as useSize, b as QIcon, c as QSpinner, Q as QBtn } from "./QBtn.da666cb1.js";
import { c as createComponent, e as hMergeSlotSafely, h as hSlot } from "./dom.6c943660.js";
import { c as computed, h, i as inject, w as watch, o as onMounted, d as onBeforeUnmount, W as formKey, g as getCurrentInstance, r as ref, X as debounce, Y as injectProp, Z as onBeforeUpdate, L as stopAndPrevent, k as nextTick, $ as onDeactivated, a0 as onActivated, j as isRuntimeSsrPreHydration, M as prevent, T as Transition, a1 as shouldIgnoreKey, a2 as client, I as stop, _ as _export_sfc, s as defineComponent, u as useRoute, v as openBlock, x as createBlock, y as withCtx, C as createBaseVNode, z as createVNode, R as withKeys, D as pushScopeId, E as popScopeId } from "./index.2f099809.js";
import { Q as QPage } from "./QPage.6732de9a.js";
import { api } from "./axios.d1cedc7f.js";
import { i as initPusher } from "./pusher.283019e9.js";
import { e as emitter } from "./mitt.eb8c962f.js";
import { _ as _imports_0 } from "./Quizrace.5f367a82.js";
var QAvatar = createComponent({
  name: "QAvatar",
  props: {
    ...useSizeProps,
    fontSize: String,
    color: String,
    textColor: String,
    icon: String,
    square: Boolean,
    rounded: Boolean
  },
  setup(props, { slots }) {
    const sizeStyle = useSize(props);
    const classes = computed(
      () => "q-avatar" + (props.color ? ` bg-${props.color}` : "") + (props.textColor ? ` text-${props.textColor} q-chip--colored` : "") + (props.square === true ? " q-avatar--square" : props.rounded === true ? " rounded-borders" : "")
    );
    const contentStyle = computed(() => props.fontSize ? { fontSize: props.fontSize } : null);
    return () => {
      const icon = props.icon !== void 0 ? [h(QIcon, { name: props.icon })] : void 0;
      return h("div", {
        class: classes.value,
        style: sizeStyle.value
      }, [
        h("div", {
          class: "q-avatar__content row flex-center overflow-hidden",
          style: contentStyle.value
        }, hMergeSlotSafely(slots.default, icon))
      ]);
    };
  }
});
const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};
function useDark(props, $q) {
  return computed(() => props.dark === null ? $q.dark.isActive : props.dark);
}
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    onMounted(() => {
      props.disable !== true && $form.bindComponent(proxy);
    });
    onBeforeUnmount(() => {
      props.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(null);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(
    () => props.rules !== void 0 && props.rules !== null && props.rules.length !== 0
  );
  const hasActiveRules = computed(
    () => props.disable !== true && hasRules.value === true
  );
  const hasError = computed(
    () => props.error === true || innerError.value === true
  );
  const errorMessage = computed(() => typeof props.errorMessage === "string" && props.errorMessage.length !== 0 ? props.errorMessage : innerErrorMessage.value);
  watch(() => props.modelValue, () => {
    validateIfNeeded();
  });
  watch(() => props.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, () => {
          validateIfNeeded(true);
        });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(focused, (val) => {
    if (val === true) {
      if (isDirtyModel.value === null) {
        isDirtyModel.value = false;
      }
    } else if (isDirtyModel.value === false) {
      isDirtyModel.value = true;
      if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && innerLoading.value === false) {
        debouncedValidate();
      }
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = null;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props.modelValue) {
    if (hasActiveRules.value !== true) {
      return true;
    }
    const index = ++validateIndex;
    const setDirty = innerLoading.value !== true ? () => {
      isDirtyModel.value = true;
    } : () => {
    };
    const update = (err, msg) => {
      err === true && setDirty();
      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val, testPattern);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false);
          return true;
        }
        const msg = res.find((r) => r === false || typeof r === "string");
        index === validateIndex && update(msg !== void 0, msg);
        return msg === void 0;
      },
      (e) => {
        if (index === validateIndex) {
          console.error(e);
          update(true);
        }
        return false;
      }
    );
  }
  function validateIfNeeded(changedRules) {
    if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && (isDirtyModel.value === true || props.lazyRules !== true && changedRules !== true)) {
      debouncedValidate();
    }
  }
  const debouncedValidate = debounce(validate, 0);
  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
    debouncedValidate.cancel();
  });
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs(attrs, vnode) {
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update() {
    const attributes = {};
    const listeners = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }
  onBeforeUpdate(update);
  update();
  return acc;
}
let buf, bufIdx = 0;
const hexBytes = new Array(256);
for (let i = 0; i < 256; i++) {
  hexBytes[i] = (i + 256).toString(16).substring(1);
}
const randomBytes = (() => {
  const lib = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes;
    }
    if (lib.getRandomValues !== void 0) {
      return (n) => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes;
      };
    }
  }
  return (n) => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r;
  };
})();
const BUFFER_SIZE = 4096;
function uid() {
  if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }
  const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
  b[6] = b[6] & 15 | 64;
  b[8] = b[8] & 63 | 128;
  return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
}
let queue = [];
let waitFlags = [];
function addFocusFn(fn) {
  if (waitFlags.length === 0) {
    fn();
  } else {
    queue.push(fn);
  }
}
function removeFocusFn(fn) {
  queue = queue.filter((entry) => entry !== fn);
}
function getTargetUid(val) {
  return val === void 0 ? `f_${uid()}` : val;
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length !== 0;
}
const useFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur", "popupShow", "popupHide"];
function useFieldState() {
  const { props, attrs, proxy, vnode } = getCurrentInstance();
  const isDark = useDark(props, proxy.$q);
  return {
    isDark,
    editable: computed(
      () => props.disable !== true && props.readonly !== true
    ),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(attrs, vnode),
    targetUid: ref(getTargetUid(props.for)),
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
  };
}
function useField(state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer = null;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === "string" || typeof props.modelValue === "number" ? ("" + props.modelValue).length : Array.isArray(props.modelValue) === true ? props.modelValue.length : 0;
        const max = props.maxlength !== void 0 ? props.maxlength : props.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(
    () => props.bottomSlots === true || props.hint !== void 0 || hasRules.value === true || props.counter === true || props.error !== null
  );
  const styleType = computed(() => {
    if (props.filled === true) {
      return "filled";
    }
    if (props.outlined === true) {
      return "outlined";
    }
    if (props.borderless === true) {
      return "borderless";
    }
    if (props.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(
    () => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props.rounded === true ? " q-field--rounded" : "") + (props.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props.dense === true ? " q-field--dense" : "") + (props.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props.disable === true ? " q-field--disabled" : props.readonly === true ? " q-field--readonly" : "")
  );
  const contentClass = computed(
    () => "q-field__control relative-position row no-wrap" + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props.standout === "string" && props.standout.length !== 0 && state.focused.value === true ? ` ${props.standout}` : props.color !== void 0 ? ` text-${props.color}` : "")
  );
  const hasLabel = computed(
    () => props.labelSlot === true || props.label !== void 0
  );
  const labelClass = computed(
    () => "q-field__label no-pointer-events absolute ellipsis" + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${props.labelColor}` : "")
  );
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {
      for: state.targetUid.value
    };
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    } else if (props.readonly === true) {
      acc["aria-readonly"] = "true";
    }
    return acc;
  });
  watch(() => props.for, (val) => {
    state.targetUid.value = getTargetUid(val);
  });
  function focusHandler() {
    const el = document.activeElement;
    let target = state.targetRef !== void 0 && state.targetRef.value;
    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute("tabindex") === true || (target = target.querySelector("[tabindex]"));
      if (target && target !== el) {
        target.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) {
        return;
      }
      if (state.focused.value === true) {
        state.focused.value = false;
        emit("blur", e);
      }
      then !== void 0 && then();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef !== void 0 && state.targetRef.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props.type === "file") {
      state.inputRef.value.value = null;
    }
    emit("update:modelValue", null);
    emit("clear", props.modelValue);
    nextTick(() => {
      resetValidation();
      if ($q.platform.is.mobile !== true) {
        isDirtyModel.value = false;
      }
    });
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(
      h("div", {
        class: "q-field__prepend q-field__marginal row no-wrap items-center",
        key: "prepend",
        onClick: prevent
      }, slots.prepend())
    );
    node.push(
      h("div", {
        class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
      }, getControlContainer())
    );
    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode("error", [
        h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
      ])
    );
    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          "inner-loading-append",
          slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props.color })]
        )
      );
    } else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode("inner-clearable-append", [
          h(QIcon, {
            class: "q-field__focusable-action",
            tag: "button",
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            type: "button",
            "aria-hidden": null,
            role: null,
            onClick: clearValue
          })
        ])
      );
    }
    slots.append !== void 0 && node.push(
      h("div", {
        class: "q-field__append q-field__marginal row no-wrap items-center",
        key: "append",
        onClick: prevent
      }, slots.append())
    );
    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode("inner-append", state.getInnerAppend())
    );
    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );
    return node;
  }
  function getControlContainer() {
    const node = [];
    props.prefix !== void 0 && props.prefix !== null && node.push(
      h("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, props.prefix)
    );
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(
        h("div", {
          ref: state.targetRef,
          class: "q-field__native row",
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          "data-autofocus": props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }
    hasLabel.value === true && node.push(
      h("div", {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );
    props.suffix !== void 0 && props.suffix !== null && node.push(
      h("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, props.suffix)
    );
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [h("div", props.hint)];
        key = `q--slot-hint-${props.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props.counter === true || slots.counter !== void 0;
    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) {
      return;
    }
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props.hideBottomSpace !== true ? "animated" : "stale"),
      onClick: prevent
    }, [
      props.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });
  onMounted(() => {
    if (isRuntimeSsrPreHydration.value === true && props.for === void 0) {
      state.targetUid.value = getTargetUid();
    }
    props.autofocus === true && proxy.focus();
  });
  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });
  Object.assign(proxy, { focus, blur });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h("label", {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const TOKENS = {
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
};
const KEYS = Object.keys(TOKENS);
KEYS.forEach((key) => {
  TOKENS[key].regex = new RegExp(TOKENS[key].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g;
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean
};
function useMask(props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask, pastedTextStart, selectionAnchor;
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props.type);
  }
  watch(() => props.type + props.autogrow, updateMaskInternals);
  watch(() => props.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit("update:modelValue", val);
    }
  });
  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));
      return props.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props.modelValue;
  }
  function getPaddedMaskMarked(size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size);
    }
    let pad = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos > -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props.mask !== void 0 && props.mask.length !== 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props.mask] === void 0 ? props.mask : NAMED_MASKS[props.mask], fillChar = typeof props.fillMask === "string" && props.fillMask.length !== 0 ? props.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[token];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp(
      "^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?" + (unmaskChar === "" ? "" : "[" + unmaskChar + "]*") + "$"
    ), extractLast = extract.length - 1, extractMatcher = extract.map((re, index) => {
      if (index === 0 && props.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index === extractLast) {
        return new RegExp(
          "^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props.reverseFillMask === true ? "$" : fillCharEscaped + "*")
        );
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(props.reverseFillMask === true ? val : val.slice(0, mask.length + 1));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length !== 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked), masked = props.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props.reverseFillMask !== true) {
        const maxEnd = inp.selectionEnd;
        let cursor = end - 1;
        for (let i = pastedTextStart; i <= cursor && i < maxEnd; i++) {
          if (maskMarked[i] !== MARKER) {
            cursor++;
          }
        }
        moveCursor.right(inp, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) > -1) {
        const cursor = props.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor);
        }
      }
    });
    const val = props.unmaskedValue === true ? unmaskValue(masked) : masked;
    String(props.modelValue) !== val && emitValue(val, true);
  }
  function moveCursorForPaste(inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    pastedTextStart = start;
    inp.setSelectionRange(start, end, "forward");
  }
  const moveCursor = {
    left(inp, cursor) {
      const noMarkBefore = maskMarked.slice(cursor - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          noMarkBefore === true && cursor++;
          break;
        }
      }
      if (i < 0 && maskMarked[cursor] !== void 0 && maskMarked[cursor] !== MARKER) {
        return moveCursor.right(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    right(inp, cursor) {
      const limit = inp.value.length;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          cursor = i;
        }
      }
      if (i > limit && maskMarked[cursor - 1] !== void 0 && maskMarked[cursor - 1] !== MARKER) {
        return moveCursor.left(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    },
    leftReverse(inp, cursor) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          cursor = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[cursor] !== void 0 && localMaskMarked[cursor] !== MARKER) {
        return moveCursor.rightReverse(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    rightReverse(inp, cursor) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, cursor + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          cursor > 0 && noMarkBefore === true && cursor--;
          break;
        }
      }
      if (i > limit && localMaskMarked[cursor - 1] !== void 0 && localMaskMarked[cursor - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    }
  };
  function onMaskedClick(e) {
    emit("click", e);
    selectionAnchor = void 0;
  }
  function onMaskedKeydown(e) {
    emit("keydown", e);
    if (shouldIgnoreKey(e) === true || e.altKey === true) {
      return;
    }
    const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
    if (!e.shiftKey) {
      selectionAnchor = void 0;
    }
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (e.shiftKey && selectionAnchor === void 0) {
        selectionAnchor = inp.selectionDirection === "forward" ? start : end;
      }
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, selectionAnchor === start ? end : start);
      if (e.shiftKey) {
        const cursor = inp.selectionStart;
        inp.setSelectionRange(Math.min(selectionAnchor, cursor), Math.max(selectionAnchor, cursor), "forward");
      }
    } else if (e.keyCode === 8 && props.reverseFillMask !== true && start === end) {
      moveCursor.left(inp, start);
      inp.setSelectionRange(inp.selectionStart, end, "backward");
    } else if (e.keyCode === 46 && props.reverseFillMask === true && start === end) {
      moveCursor.rightReverse(inp, end);
      inp.setSelectionRange(start, inp.selectionEnd, "forward");
    }
  }
  function maskValue(val) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props.reverseFillMask === true) {
      return maskValueReverse(val);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
        valChar === maskDef && valIndex++;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex > -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props.reverseFillMask === true && val.length !== 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown,
    onMaskedClick
  };
}
const useFormProps = {
  name: String
};
function useFormInputNameAttr(props) {
  return computed(() => props.name || props.for);
}
function useFileFormDomProps(props, typeGuard) {
  function getFormDomProps() {
    const model = props.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return typeGuard === true ? computed(() => {
    if (props.type !== "file") {
      return;
    }
    return getFormDomProps();
  }) : computed(getFormDomProps);
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true) {
        return;
      }
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
var QInput = createComponent({
  name: "QInput",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,
    modelValue: { required: false },
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    "paste",
    "change",
    "keydown",
    "click",
    "animationend"
  ],
  setup(props, { emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer = null, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown,
      onMaskedClick
    } = useMask(props, emit, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(props, true);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState();
    const isTextarea = computed(
      () => props.type === "textarea" || props.autogrow === true
    );
    const isTypeText = computed(
      () => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props.type)
    );
    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
        evt.onClick = onMaskedClick;
      }
      if (props.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = {
        tabindex: 0,
        "data-autofocus": props.autofocus === true || void 0,
        rows: props.type === "textarea" ? 6 : void 0,
        "aria-label": props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };
      if (isTextarea.value === false) {
        attrs2.type = props.type;
      }
      if (props.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });
    watch(() => props.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) {
            return;
          }
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }
    function select() {
      inputRef.value !== null && inputRef.value.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target) {
        return;
      }
      if (props.type === "file") {
        emit("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (e.target.qComposing === true) {
        temp.value = val;
        return;
      }
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props.autogrow === true && adjustHeight();
    }
    function onAnimationend(e) {
      emit("animationend", e);
      adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        emitTimer = null;
        if (props.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;
          stopWatcher === true && (stopValueWatcher = true);
          emit("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props.debounce !== void 0) {
        emitTimer !== null && clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          const { scrollTop } = inp;
          const { overflowY, maxHeight } = $q.platform.is.firefox === true ? {} : window.getComputedStyle(inp);
          const changeOverflow = overflowY !== void 0 && overflowY !== "scroll";
          changeOverflow === true && (inp.style.overflowY = "hidden");
          parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
          inp.style.height = "1px";
          inp.style.height = inp.scrollHeight + "px";
          changeOverflow === true && (inp.style.overflowY = parseInt(maxHeight, 10) < inp.scrollHeight ? "auto" : "hidden");
          parentStyle.marginBottom = "";
          inp.scrollTop = scrollTop;
        }
      });
    }
    function onChange(e) {
      onComposition(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      emit("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    onBeforeUnmount(() => {
      onFinishEditing();
    });
    onMounted(() => {
      props.autogrow === true && adjustHeight();
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props.autogrow === true ? " q-textarea--autogrow" : "")
      ),
      hasShadow: computed(
        () => props.type !== "file" && typeof props.shadowText === "string" && props.shadowText.length !== 0
      ),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(
        () => hasValue.value === true && (props.type !== "number" || isNaN(innerValue.value) === false) || fieldValueIsFilled(props.displayValue)
      ),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", {
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...props.type !== "file" ? { value: getCurValue() } : formDomProps.value
        });
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
    });
    injectProp(proxy, "nativeEl", () => inputRef.value);
    return renderFn;
  }
});
var LoginPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "LoginPage",
  route: useRoute,
  data() {
    return {
      playerName: "",
      uuid: "",
      pusher: { channel: null },
      data: { name }
    };
  },
  mounted() {
    initPusher();
    emitter.on("player.registered", this.data);
    this.uuid = "3b79a6c1-2fd4-4b09-a954-f7aa30450c0e";
    console.log("The UUID is: " + this.uuid);
  },
  unmounted() {
    emitter.off("player.registered");
  },
  methods: {
    verifyID() {
      this.subscribeEmit(this.uuid);
      this.registerPlayer(this.playerName);
      this.playerName = "";
    },
    backToStart() {
      this.$router.go(-1);
    },
    goToLobby() {
      this.$router.push({ name: "lobby" });
    },
    registerPlayer(playerName) {
      const url = "gle/sessions/3b79a6c1-2fd4-4b09-a954-f7aa30450c0e/register";
      const data = { name: playerName };
      api.post(url, data).then((response) => {
        console.log(response);
        this.goToLobby();
      }).catch((error) => {
        console.error(error);
      });
    },
    subscribeEmit(uid2) {
      emitter.emit("pusher.subscribe", uid2);
    }
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-71adc37c"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "page-content" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "img-anim" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    alt: "Quasar logo",
    src: _imports_0,
    style: { "width": "200px", "height": "200px" }
  })
], -1));
const _hoisted_3 = { class: "session-input-box" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/logo-v2/svg/logo.svg" }, null, -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
          onClick: _ctx.goToLobby
        }, null, 8, ["onClick"]),
        _hoisted_2,
        createBaseVNode("div", _hoisted_3, [
          createVNode(QInput, {
            type: "text",
            filled: "",
            placeholder: "Enter player name",
            onKeydown: withKeys(_ctx.verifyID, ["enter"]),
            modelValue: _ctx.playerName,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.playerName = $event)
          }, {
            append: withCtx(() => [
              createVNode(QAvatar, null, {
                default: withCtx(() => [
                  _hoisted_4
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["onKeydown", "modelValue"])
        ])
      ])
    ]),
    _: 1
  });
}
var LoginPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-71adc37c"], ["__file", "LoginPage.vue"]]);
export { LoginPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9naW5QYWdlLjZkMzdiYzRmLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2F2YXRhci9RQXZhdGFyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1mb3JtLWNoaWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcGF0dGVybnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS12YWxpZGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNwbGl0LWF0dHJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvdWlkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9mb2N1cy1tYW5hZ2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmllbGQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2lucHV0L3VzZS1tYXNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpbGUtZG9tLXByb3BzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Uta2V5LWNvbXBvc2l0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pbnB1dC9RSW5wdXQuanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvTG9naW5QYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5cbmltcG9ydCB1c2VTaXplLCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNpemUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdFNhZmVseSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUF2YXRhcicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VTaXplUHJvcHMsXG5cbiAgICBmb250U2l6ZTogU3RyaW5nLFxuXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIGljb246IFN0cmluZyxcbiAgICBzcXVhcmU6IEJvb2xlYW4sXG4gICAgcm91bmRlZDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgc2l6ZVN0eWxlID0gdXNlU2l6ZShwcm9wcylcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtYXZhdGFyJ1xuICAgICAgKyAocHJvcHMuY29sb3IgPyBgIGJnLSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICArIChwcm9wcy50ZXh0Q29sb3IgPyBgIHRleHQtJHsgcHJvcHMudGV4dENvbG9yIH0gcS1jaGlwLS1jb2xvcmVkYCA6ICcnKVxuICAgICAgKyAoXG4gICAgICAgIHByb3BzLnNxdWFyZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBxLWF2YXRhci0tc3F1YXJlJ1xuICAgICAgICAgIDogKHByb3BzLnJvdW5kZWQgPT09IHRydWUgPyAnIHJvdW5kZWQtYm9yZGVycycgOiAnJylcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBjb250ZW50U3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5mb250U2l6ZVxuICAgICAgICA/IHsgZm9udFNpemU6IHByb3BzLmZvbnRTaXplIH1cbiAgICAgICAgOiBudWxsXG4gICAgKSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBpY29uID0gcHJvcHMuaWNvbiAhPT0gdm9pZCAwXG4gICAgICAgID8gWyBoKFFJY29uLCB7IG5hbWU6IHByb3BzLmljb24gfSkgXVxuICAgICAgICA6IHZvaWQgMFxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHNpemVTdHlsZS52YWx1ZVxuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWF2YXRhcl9fY29udGVudCByb3cgZmxleC1jZW50ZXIgb3ZlcmZsb3ctaGlkZGVuJyxcbiAgICAgICAgICBzdHlsZTogY29udGVudFN0eWxlLnZhbHVlXG4gICAgICAgIH0sIGhNZXJnZVNsb3RTYWZlbHkoc2xvdHMuZGVmYXVsdCwgaWNvbikpXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlRGFya1Byb3BzID0ge1xuICBkYXJrOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCAkcSkge1xuICAvLyByZXR1cm4gaXNEYXJrXG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuZGFyayA9PT0gbnVsbFxuICAgICAgPyAkcS5kYXJrLmlzQWN0aXZlXG4gICAgICA6IHByb3BzLmRhcmtcbiAgKSlcbn1cbiIsImltcG9ydCB7IGluamVjdCwgd2F0Y2gsIGdldEN1cnJlbnRJbnN0YW5jZSwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGZvcm1LZXkgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24sIHJlcXVpcmVzUUZvcm0gfSkge1xuICBjb25zdCAkZm9ybSA9IGluamVjdChmb3JtS2V5LCBmYWxzZSlcblxuICBpZiAoJGZvcm0gIT09IGZhbHNlKSB7XG4gICAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICAvLyBleHBvcnQgcHVibGljIG1ldGhvZCAoc28gaXQgY2FuIGJlIHVzZWQgaW4gUUZvcm0pXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyB2YWxpZGF0ZSwgcmVzZXRWYWxpZGF0aW9uIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5kaXNhYmxlLCB2YWwgPT4ge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICB0eXBlb2YgcmVzZXRWYWxpZGF0aW9uID09PSAnZnVuY3Rpb24nICYmIHJlc2V0VmFsaWRhdGlvbigpXG4gICAgICAgICRmb3JtLnVuYmluZENvbXBvbmVudChwcm94eSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkZm9ybS5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgLy8gcmVnaXN0ZXIgdG8gcGFyZW50IFFGb3JtXG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmICRmb3JtLmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICAvLyB1bi1yZWdpc3RlciBmcm9tIHBhcmVudCBRRm9ybVxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiAkZm9ybS51bmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgfSlcbiAgfVxuICBlbHNlIGlmIChyZXF1aXJlc1FGb3JtID09PSB0cnVlKSB7XG4gICAgY29uc29sZS5lcnJvcignUGFyZW50IFFGb3JtIG5vdCBmb3VuZCBvbiB1c2VGb3JtQ2hpbGQoKSEnKVxuICB9XG59XG4iLCIvLyBmaWxlIHJlZmVyZW5jZWQgZnJvbSBkb2NzXG5cbmNvbnN0XG4gIGhleCA9IC9eI1swLTlhLWZBLUZdezN9KFswLTlhLWZBLUZdezN9KT8kLyxcbiAgaGV4YSA9IC9eI1swLTlhLWZBLUZdezR9KFswLTlhLWZBLUZdezR9KT8kLyxcbiAgaGV4T3JIZXhhID0gL14jKFswLTlhLWZBLUZdezN9fFswLTlhLWZBLUZdezR9fFswLTlhLWZBLUZdezZ9fFswLTlhLWZBLUZdezh9KSQvLFxuICByZ2IgPSAvXnJnYlxcKCgoMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pLCl7Mn0oMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pXFwpJC8sXG4gIHJnYmEgPSAvXnJnYmFcXCgoKDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKSwpezJ9KDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKSwoMHwwXFwuWzAtOV0rWzEtOV18MFxcLlsxLTldK3wxKVxcKSQvXG5cbi8vIEtlZXAgaW4gc3luYyB3aXRoIHVpL3R5cGVzL2FwaS92YWxpZGF0aW9uLmQudHNcbmV4cG9ydCBjb25zdCB0ZXN0UGF0dGVybiA9IHtcbiAgZGF0ZTogdiA9PiAvXi0/W1xcZF0rXFwvWzAtMV1cXGRcXC9bMC0zXVxcZCQvLnRlc3QodiksXG4gIHRpbWU6IHYgPT4gL14oWzAtMV0/XFxkfDJbMC0zXSk6WzAtNV1cXGQkLy50ZXN0KHYpLFxuICBmdWxsdGltZTogdiA9PiAvXihbMC0xXT9cXGR8MlswLTNdKTpbMC01XVxcZDpbMC01XVxcZCQvLnRlc3QodiksXG4gIHRpbWVPckZ1bGx0aW1lOiB2ID0+IC9eKFswLTFdP1xcZHwyWzAtM10pOlswLTVdXFxkKDpbMC01XVxcZCk/JC8udGVzdCh2KSxcblxuICAvLyAtLSBSRkMgNTMyMiAtLVxuICAvLyAtLSBBZGRlZCBpbiB2Mi42LjYgLS1cbiAgLy8gVGhpcyBpcyBhIGJhc2ljIGhlbHBlciB2YWxpZGF0aW9uLlxuICAvLyBGb3Igc29tZXRoaW5nIG1vcmUgY29tcGxleCAobGlrZSBSRkMgODIyKSB5b3Ugc2hvdWxkIHdyaXRlIGFuZCB1c2UgeW91ciBvd24gcnVsZS5cbiAgLy8gV2Ugd29uJ3QgYmUgYWNjZXB0aW5nIFBScyB0byBlbmhhbmNlIHRoZSBvbmUgYmVsb3cgYmVjYXVzZSBvZiB0aGUgcmVhc29uIGFib3ZlLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgZW1haWw6IHYgPT4gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC8udGVzdCh2KSxcblxuICBoZXhDb2xvcjogdiA9PiBoZXgudGVzdCh2KSxcbiAgaGV4YUNvbG9yOiB2ID0+IGhleGEudGVzdCh2KSxcbiAgaGV4T3JIZXhhQ29sb3I6IHYgPT4gaGV4T3JIZXhhLnRlc3QodiksXG5cbiAgcmdiQ29sb3I6IHYgPT4gcmdiLnRlc3QodiksXG4gIHJnYmFDb2xvcjogdiA9PiByZ2JhLnRlc3QodiksXG4gIHJnYk9yUmdiYUNvbG9yOiB2ID0+IHJnYi50ZXN0KHYpIHx8IHJnYmEudGVzdCh2KSxcblxuICBoZXhPclJnYkNvbG9yOiB2ID0+IGhleC50ZXN0KHYpIHx8IHJnYi50ZXN0KHYpLFxuICBoZXhhT3JSZ2JhQ29sb3I6IHYgPT4gaGV4YS50ZXN0KHYpIHx8IHJnYmEudGVzdCh2KSxcbiAgYW55Q29sb3I6IHYgPT4gaGV4T3JIZXhhLnRlc3QodikgfHwgcmdiLnRlc3QodikgfHwgcmdiYS50ZXN0KHYpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGVzdFBhdHRlcm5cbn1cbiIsImltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUZvcm1DaGlsZCBmcm9tICcuLi91c2UtZm9ybS1jaGlsZC5qcydcbmltcG9ydCB7IHRlc3RQYXR0ZXJuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcGF0dGVybnMuanMnXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vLi4vdXRpbHMvZGVib3VuY2UuanMnXG5pbXBvcnQgeyBpbmplY3RQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9pbmplY3Qtb2JqLXByb3AuanMnXG5cbmNvbnN0IGxhenlSdWxlc1ZhbHVlcyA9IFsgdHJ1ZSwgZmFsc2UsICdvbmRlbWFuZCcgXVxuXG5leHBvcnQgY29uc3QgdXNlVmFsaWRhdGVQcm9wcyA9IHtcbiAgbW9kZWxWYWx1ZToge30sXG5cbiAgZXJyb3I6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgZXJyb3JNZXNzYWdlOiBTdHJpbmcsXG4gIG5vRXJyb3JJY29uOiBCb29sZWFuLFxuXG4gIHJ1bGVzOiBBcnJheSxcbiAgcmVhY3RpdmVSdWxlczogQm9vbGVhbixcbiAgbGF6eVJ1bGVzOiB7XG4gICAgdHlwZTogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgICB2YWxpZGF0b3I6IHYgPT4gbGF6eVJ1bGVzVmFsdWVzLmluY2x1ZGVzKHYpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZvY3VzZWQsIGlubmVyTG9hZGluZykge1xuICBjb25zdCB7IHByb3BzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBpbm5lckVycm9yID0gcmVmKGZhbHNlKVxuICBjb25zdCBpbm5lckVycm9yTWVzc2FnZSA9IHJlZihudWxsKVxuICBjb25zdCBpc0RpcnR5TW9kZWwgPSByZWYobnVsbClcblxuICB1c2VGb3JtQ2hpbGQoeyB2YWxpZGF0ZSwgcmVzZXRWYWxpZGF0aW9uIH0pXG5cbiAgbGV0IHZhbGlkYXRlSW5kZXggPSAwLCB1bndhdGNoUnVsZXNcblxuICBjb25zdCBoYXNSdWxlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMucnVsZXMgIT09IHZvaWQgMFxuICAgICYmIHByb3BzLnJ1bGVzICE9PSBudWxsXG4gICAgJiYgcHJvcHMucnVsZXMubGVuZ3RoICE9PSAwXG4gIClcblxuICBjb25zdCBoYXNBY3RpdmVSdWxlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZVxuICAgICYmIGhhc1J1bGVzLnZhbHVlID09PSB0cnVlXG4gIClcblxuICBjb25zdCBoYXNFcnJvciA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMuZXJyb3IgPT09IHRydWUgfHwgaW5uZXJFcnJvci52YWx1ZSA9PT0gdHJ1ZVxuICApXG5cbiAgY29uc3QgZXJyb3JNZXNzYWdlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHR5cGVvZiBwcm9wcy5lcnJvck1lc3NhZ2UgPT09ICdzdHJpbmcnICYmIHByb3BzLmVycm9yTWVzc2FnZS5sZW5ndGggIT09IDBcbiAgICAgID8gcHJvcHMuZXJyb3JNZXNzYWdlXG4gICAgICA6IGlubmVyRXJyb3JNZXNzYWdlLnZhbHVlXG4gICkpXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgKCkgPT4ge1xuICAgIHZhbGlkYXRlSWZOZWVkZWQoKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnJlYWN0aXZlUnVsZXMsIHZhbCA9PiB7XG4gICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHVud2F0Y2hSdWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hSdWxlcyA9IHdhdGNoKCgpID0+IHByb3BzLnJ1bGVzLCAoKSA9PiB7XG4gICAgICAgICAgdmFsaWRhdGVJZk5lZWRlZCh0cnVlKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh1bndhdGNoUnVsZXMgIT09IHZvaWQgMCkge1xuICAgICAgdW53YXRjaFJ1bGVzKClcbiAgICAgIHVud2F0Y2hSdWxlcyA9IHZvaWQgMFxuICAgIH1cbiAgfSwgeyBpbW1lZGlhdGU6IHRydWUgfSlcblxuICB3YXRjaChmb2N1c2VkLCB2YWwgPT4ge1xuICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgIGlmIChpc0RpcnR5TW9kZWwudmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNEaXJ0eU1vZGVsLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gdHJ1ZVxuXG4gICAgICBpZiAoXG4gICAgICAgIGhhc0FjdGl2ZVJ1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgICAgICYmIHByb3BzLmxhenlSdWxlcyAhPT0gJ29uZGVtYW5kJ1xuICAgICAgICAvLyBEb24ndCByZS10cmlnZ2VyIGlmIGl0J3MgYWxyZWFkeSBpbiBwcm9ncmVzcztcbiAgICAgICAgLy8gSXQgbWlnaHQgbWVhbiB0aGF0IGZvY3VzIHN3aXRjaGVkIHRvIHN1Ym1pdCBidG4gYW5kXG4gICAgICAgIC8vIFFGb3JtJ3Mgc3VibWl0KCkgaGFzIGJlZW4gY2FsbGVkIGFscmVhZHkgKEVOVEVSIGtleSlcbiAgICAgICAgJiYgaW5uZXJMb2FkaW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgKSB7XG4gICAgICAgIGRlYm91bmNlZFZhbGlkYXRlKClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgZnVuY3Rpb24gcmVzZXRWYWxpZGF0aW9uICgpIHtcbiAgICB2YWxpZGF0ZUluZGV4KytcbiAgICBpbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IG51bGxcbiAgICBpbm5lckVycm9yLnZhbHVlID0gZmFsc2VcbiAgICBpbm5lckVycm9yTWVzc2FnZS52YWx1ZSA9IG51bGxcbiAgICBkZWJvdW5jZWRWYWxpZGF0ZS5jYW5jZWwoKVxuICB9XG5cbiAgLypcbiAgICogUmV0dXJuIHZhbHVlXG4gICAqICAgLSB0cnVlICh2YWxpZGF0aW9uIHN1Y2NlZWRlZClcbiAgICogICAtIGZhbHNlICh2YWxpZGF0aW9uIGZhaWxlZClcbiAgICogICAtIFByb21pc2UgKHBlbmRpbmcgYXN5bmMgdmFsaWRhdGlvbilcbiAgICovXG4gIGZ1bmN0aW9uIHZhbGlkYXRlICh2YWwgPSBwcm9wcy5tb2RlbFZhbHVlKSB7XG4gICAgaWYgKGhhc0FjdGl2ZVJ1bGVzLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gKyt2YWxpZGF0ZUluZGV4XG5cbiAgICBjb25zdCBzZXREaXJ0eSA9IGlubmVyTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgPyAoKSA9PiB7IGlzRGlydHlNb2RlbC52YWx1ZSA9IHRydWUgfVxuICAgICAgOiAoKSA9PiB7fVxuXG4gICAgY29uc3QgdXBkYXRlID0gKGVyciwgbXNnKSA9PiB7XG4gICAgICBlcnIgPT09IHRydWUgJiYgc2V0RGlydHkoKVxuXG4gICAgICBpbm5lckVycm9yLnZhbHVlID0gZXJyXG4gICAgICBpbm5lckVycm9yTWVzc2FnZS52YWx1ZSA9IG1zZyB8fCBudWxsXG4gICAgICBpbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2VzID0gW11cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMucnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJ1bGUgPSBwcm9wcy5ydWxlc1sgaSBdXG4gICAgICBsZXQgcmVzXG5cbiAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXMgPSBydWxlKHZhbCwgdGVzdFBhdHRlcm4pXG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgcnVsZSA9PT0gJ3N0cmluZycgJiYgdGVzdFBhdHRlcm5bIHJ1bGUgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJlcyA9IHRlc3RQYXR0ZXJuWyBydWxlIF0odmFsKVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzID09PSBmYWxzZSB8fCB0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICB1cGRhdGUodHJ1ZSwgcmVzKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHJlcyAhPT0gdHJ1ZSAmJiByZXMgIT09IHZvaWQgMCkge1xuICAgICAgICBwcm9taXNlcy5wdXNoKHJlcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvbWlzZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB1cGRhdGUoZmFsc2UpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGlubmVyTG9hZGluZy52YWx1ZSA9IHRydWVcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihcbiAgICAgIHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMgPT09IHZvaWQgMCB8fCBBcnJheS5pc0FycmF5KHJlcykgPT09IGZhbHNlIHx8IHJlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB1cGRhdGUoZmFsc2UpXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1zZyA9IHJlcy5maW5kKHIgPT4gciA9PT0gZmFsc2UgfHwgdHlwZW9mIHIgPT09ICdzdHJpbmcnKVxuICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB1cGRhdGUobXNnICE9PSB2b2lkIDAsIG1zZylcbiAgICAgICAgcmV0dXJuIG1zZyA9PT0gdm9pZCAwXG4gICAgICB9LFxuICAgICAgZSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdmFsaWRhdGVJbmRleCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICB1cGRhdGUodHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlSWZOZWVkZWQgKGNoYW5nZWRSdWxlcykge1xuICAgIGlmIChcbiAgICAgIGhhc0FjdGl2ZVJ1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBwcm9wcy5sYXp5UnVsZXMgIT09ICdvbmRlbWFuZCdcbiAgICAgICYmIChpc0RpcnR5TW9kZWwudmFsdWUgPT09IHRydWUgfHwgKHByb3BzLmxhenlSdWxlcyAhPT0gdHJ1ZSAmJiBjaGFuZ2VkUnVsZXMgIT09IHRydWUpKVxuICAgICkge1xuICAgICAgZGVib3VuY2VkVmFsaWRhdGUoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRlYm91bmNlZFZhbGlkYXRlID0gZGVib3VuY2UodmFsaWRhdGUsIDApXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICB1bndhdGNoUnVsZXMgIT09IHZvaWQgMCAmJiB1bndhdGNoUnVsZXMoKVxuICAgIGRlYm91bmNlZFZhbGlkYXRlLmNhbmNlbCgpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzICYgcHJvcHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyByZXNldFZhbGlkYXRpb24sIHZhbGlkYXRlIH0pXG4gIGluamVjdFByb3AocHJveHksICdoYXNFcnJvcicsICgpID0+IGhhc0Vycm9yLnZhbHVlKVxuXG4gIHJldHVybiB7XG4gICAgaXNEaXJ0eU1vZGVsLFxuICAgIGhhc1J1bGVzLFxuICAgIGhhc0Vycm9yLFxuICAgIGVycm9yTWVzc2FnZSxcblxuICAgIHZhbGlkYXRlLFxuICAgIHJlc2V0VmFsaWRhdGlvblxuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIG9uQmVmb3JlVXBkYXRlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBsaXN0ZW5lclJFID0gL15vbltBLVpdL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoYXR0cnMsIHZub2RlKSB7XG4gIGNvbnN0IGFjYyA9IHtcbiAgICBsaXN0ZW5lcnM6IHJlZih7fSksXG4gICAgYXR0cmlidXRlczogcmVmKHt9KVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlICgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0ge31cbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB7fVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cnMpIHtcbiAgICAgIGlmIChrZXkgIT09ICdjbGFzcycgJiYga2V5ICE9PSAnc3R5bGUnICYmIGxpc3RlbmVyUkUudGVzdChrZXkpID09PSBmYWxzZSkge1xuICAgICAgICBhdHRyaWJ1dGVzWyBrZXkgXSA9IGF0dHJzWyBrZXkgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIHZub2RlLnByb3BzKSB7XG4gICAgICBpZiAobGlzdGVuZXJSRS50ZXN0KGtleSkgPT09IHRydWUpIHtcbiAgICAgICAgbGlzdGVuZXJzWyBrZXkgXSA9IHZub2RlLnByb3BzWyBrZXkgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGFjYy5hdHRyaWJ1dGVzLnZhbHVlID0gYXR0cmlidXRlc1xuICAgIGFjYy5saXN0ZW5lcnMudmFsdWUgPSBsaXN0ZW5lcnNcbiAgfVxuXG4gIG9uQmVmb3JlVXBkYXRlKHVwZGF0ZSlcblxuICB1cGRhdGUoKVxuXG4gIHJldHVybiBhY2Ncbn1cbiIsIi8qKlxuICogQmFzZWQgb24gdGhlIHdvcmsgb2YgaHR0cHM6Ly9naXRodWIuY29tL2pjaG9vay91dWlkLXJhbmRvbVxuICovXG5cbmxldFxuICBidWYsXG4gIGJ1ZklkeCA9IDBcbmNvbnN0IGhleEJ5dGVzID0gbmV3IEFycmF5KDI1NilcblxuLy8gUHJlLWNhbGN1bGF0ZSB0b1N0cmluZygxNikgZm9yIHNwZWVkXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gIGhleEJ5dGVzWyBpIF0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpXG59XG5cbi8vIFVzZSBiZXN0IGF2YWlsYWJsZSBQUk5HXG5jb25zdCByYW5kb21CeXRlcyA9ICgoKSA9PiB7XG4gIC8vIE5vZGUgJiBCcm93c2VyIHN1cHBvcnRcbiAgY29uc3QgbGliID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IGNyeXB0b1xuICAgIDogKFxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgID8gd2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG9cbiAgICAgICAgICA6IHZvaWQgMFxuICAgICAgKVxuXG4gIGlmIChsaWIgIT09IHZvaWQgMCkge1xuICAgIGlmIChsaWIucmFuZG9tQnl0ZXMgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIGxpYi5yYW5kb21CeXRlc1xuICAgIH1cbiAgICBpZiAobGliLmdldFJhbmRvbVZhbHVlcyAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gbiA9PiB7XG4gICAgICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobilcbiAgICAgICAgbGliLmdldFJhbmRvbVZhbHVlcyhieXRlcylcbiAgICAgICAgcmV0dXJuIGJ5dGVzXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG4gPT4ge1xuICAgIGNvbnN0IHIgPSBbXVxuICAgIGZvciAobGV0IGkgPSBuOyBpID4gMDsgaS0tKSB7XG4gICAgICByLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSlcbiAgICB9XG4gICAgcmV0dXJuIHJcbiAgfVxufSkoKVxuXG4vLyBCdWZmZXIgcmFuZG9tIG51bWJlcnMgZm9yIHNwZWVkXG4vLyBSZWR1Y2UgbWVtb3J5IHVzYWdlIGJ5IGRlY3JlYXNpbmcgdGhpcyBudW1iZXIgKG1pbiAxNilcbi8vIG9yIGltcHJvdmUgc3BlZWQgYnkgaW5jcmVhc2luZyB0aGlzIG51bWJlciAodHJ5IDE2Mzg0KVxuY29uc3QgQlVGRkVSX1NJWkUgPSA0MDk2XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgLy8gQnVmZmVyIHNvbWUgcmFuZG9tIGJ5dGVzIGZvciBzcGVlZFxuICBpZiAoYnVmID09PSB2b2lkIDAgfHwgKGJ1ZklkeCArIDE2ID4gQlVGRkVSX1NJWkUpKSB7XG4gICAgYnVmSWR4ID0gMFxuICAgIGJ1ZiA9IHJhbmRvbUJ5dGVzKEJVRkZFUl9TSVpFKVxuICB9XG5cbiAgY29uc3QgYiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGJ1ZiwgYnVmSWR4LCAoYnVmSWR4ICs9IDE2KSlcbiAgYlsgNiBdID0gKGJbIDYgXSAmIDB4MGYpIHwgMHg0MFxuICBiWyA4IF0gPSAoYlsgOCBdICYgMHgzZikgfCAweDgwXG5cbiAgcmV0dXJuIGhleEJ5dGVzWyBiWyAwIF0gXSArIGhleEJ5dGVzWyBiWyAxIF0gXVxuICAgICsgaGV4Qnl0ZXNbIGJbIDIgXSBdICsgaGV4Qnl0ZXNbIGJbIDMgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgNCBdIF0gKyBoZXhCeXRlc1sgYlsgNSBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyA2IF0gXSArIGhleEJ5dGVzWyBiWyA3IF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDggXSBdICsgaGV4Qnl0ZXNbIGJbIDkgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgMTAgXSBdICsgaGV4Qnl0ZXNbIGJbIDExIF0gXVxuICAgICsgaGV4Qnl0ZXNbIGJbIDEyIF0gXSArIGhleEJ5dGVzWyBiWyAxMyBdIF1cbiAgICArIGhleEJ5dGVzWyBiWyAxNCBdIF0gKyBoZXhCeXRlc1sgYlsgMTUgXSBdXG59XG4iLCJsZXQgcXVldWUgPSBbXVxubGV0IHdhaXRGbGFncyA9IFtdXG5cbmZ1bmN0aW9uIGNsZWFyRmxhZyAoZmxhZykge1xuICB3YWl0RmxhZ3MgPSB3YWl0RmxhZ3MuZmlsdGVyKGVudHJ5ID0+IGVudHJ5ICE9PSBmbGFnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRm9jdXNXYWl0RmxhZyAoZmxhZykge1xuICBjbGVhckZsYWcoZmxhZylcbiAgd2FpdEZsYWdzLnB1c2goZmxhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZvY3VzV2FpdEZsYWcgKGZsYWcpIHtcbiAgY2xlYXJGbGFnKGZsYWcpXG5cbiAgaWYgKHdhaXRGbGFncy5sZW5ndGggPT09IDAgJiYgcXVldWUubGVuZ3RoICE9PSAwKSB7XG4gICAgLy8gb25seSBjYWxsIGxhc3QgZm9jdXMgaGFuZGxlciAoY2FuJ3QgZm9jdXMgbXVsdGlwbGUgdGhpbmdzIGF0IG9uY2UpXG4gICAgcXVldWVbIHF1ZXVlLmxlbmd0aCAtIDEgXSgpXG4gICAgcXVldWUgPSBbXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c0ZuIChmbikge1xuICBpZiAod2FpdEZsYWdzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZuKClcbiAgfVxuICBlbHNlIHtcbiAgICBxdWV1ZS5wdXNoKGZuKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c0ZuIChmbikge1xuICBxdWV1ZSA9IHF1ZXVlLmZpbHRlcihlbnRyeSA9PiBlbnRyeSAhPT0gZm4pXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgVHJhbnNpdGlvbiwgbmV4dFRpY2ssIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3Bpbm5lci9RU3Bpbm5lci5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VWYWxpZGF0ZSwgeyB1c2VWYWxpZGF0ZVByb3BzIH0gZnJvbSAnLi91c2UtdmFsaWRhdGUuanMnXG5pbXBvcnQgdXNlU3BsaXRBdHRycyBmcm9tICcuL3VzZS1zcGxpdC1hdHRycy5qcydcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB1aWQgZnJvbSAnLi4vLi4vdXRpbHMvdWlkLmpzJ1xuaW1wb3J0IHsgcHJldmVudCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4sIHJlbW92ZUZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5cbmZ1bmN0aW9uIGdldFRhcmdldFVpZCAodmFsKSB7XG4gIHJldHVybiB2YWwgPT09IHZvaWQgMCA/IGBmXyR7IHVpZCgpIH1gIDogdmFsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZFZhbHVlSXNGaWxsZWQgKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2b2lkIDBcbiAgICAmJiB2YWwgIT09IG51bGxcbiAgICAmJiAoJycgKyB2YWwpLmxlbmd0aCAhPT0gMFxufVxuXG5leHBvcnQgY29uc3QgdXNlRmllbGRQcm9wcyA9IHtcbiAgLi4udXNlRGFya1Byb3BzLFxuICAuLi51c2VWYWxpZGF0ZVByb3BzLFxuXG4gIGxhYmVsOiBTdHJpbmcsXG4gIHN0YWNrTGFiZWw6IEJvb2xlYW4sXG4gIGhpbnQ6IFN0cmluZyxcbiAgaGlkZUhpbnQ6IEJvb2xlYW4sXG4gIHByZWZpeDogU3RyaW5nLFxuICBzdWZmaXg6IFN0cmluZyxcblxuICBsYWJlbENvbG9yOiBTdHJpbmcsXG4gIGNvbG9yOiBTdHJpbmcsXG4gIGJnQ29sb3I6IFN0cmluZyxcblxuICBmaWxsZWQ6IEJvb2xlYW4sXG4gIG91dGxpbmVkOiBCb29sZWFuLFxuICBib3JkZXJsZXNzOiBCb29sZWFuLFxuICBzdGFuZG91dDogWyBCb29sZWFuLCBTdHJpbmcgXSxcblxuICBzcXVhcmU6IEJvb2xlYW4sXG5cbiAgbG9hZGluZzogQm9vbGVhbixcblxuICBsYWJlbFNsb3Q6IEJvb2xlYW4sXG5cbiAgYm90dG9tU2xvdHM6IEJvb2xlYW4sXG4gIGhpZGVCb3R0b21TcGFjZTogQm9vbGVhbixcblxuICByb3VuZGVkOiBCb29sZWFuLFxuICBkZW5zZTogQm9vbGVhbixcbiAgaXRlbUFsaWduZWQ6IEJvb2xlYW4sXG5cbiAgY291bnRlcjogQm9vbGVhbixcblxuICBjbGVhcmFibGU6IEJvb2xlYW4sXG4gIGNsZWFySWNvbjogU3RyaW5nLFxuXG4gIGRpc2FibGU6IEJvb2xlYW4sXG4gIHJlYWRvbmx5OiBCb29sZWFuLFxuXG4gIGF1dG9mb2N1czogQm9vbGVhbixcblxuICBmb3I6IFN0cmluZyxcblxuICBtYXhsZW5ndGg6IFsgTnVtYmVyLCBTdHJpbmcgXVxufVxuXG5leHBvcnQgY29uc3QgdXNlRmllbGRFbWl0cyA9IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ2NsZWFyJywgJ2ZvY3VzJywgJ2JsdXInLCAncG9wdXBTaG93JywgJ3BvcHVwSGlkZScgXVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRmllbGRTdGF0ZSAoKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGF0dHJzLCBwcm94eSwgdm5vZGUgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgcHJveHkuJHEpXG5cbiAgcmV0dXJuIHtcbiAgICBpc0RhcmssXG5cbiAgICBlZGl0YWJsZTogY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgcHJvcHMucmVhZG9ubHkgIT09IHRydWVcbiAgICApLFxuXG4gICAgaW5uZXJMb2FkaW5nOiByZWYoZmFsc2UpLFxuICAgIGZvY3VzZWQ6IHJlZihmYWxzZSksXG4gICAgaGFzUG9wdXBPcGVuOiBmYWxzZSxcblxuICAgIHNwbGl0QXR0cnM6IHVzZVNwbGl0QXR0cnMoYXR0cnMsIHZub2RlKSxcbiAgICB0YXJnZXRVaWQ6IHJlZihnZXRUYXJnZXRVaWQocHJvcHMuZm9yKSksXG5cbiAgICByb290UmVmOiByZWYobnVsbCksXG4gICAgdGFyZ2V0UmVmOiByZWYobnVsbCksXG4gICAgY29udHJvbFJlZjogcmVmKG51bGwpXG5cbiAgICAvKipcbiAgICAgKiB1c2VyIHN1cHBsaWVkIGFkZGl0aW9uYWxzOlxuXG4gICAgICogaW5uZXJWYWx1ZSAtIGNvbXB1dGVkXG4gICAgICogZmxvYXRpbmdMYWJlbCAtIGNvbXB1dGVkXG4gICAgICogaW5wdXRSZWYgLSBjb21wdXRlZFxuXG4gICAgICogZmllbGRDbGFzcyAtIGNvbXB1dGVkXG4gICAgICogaGFzU2hhZG93IC0gY29tcHV0ZWRcblxuICAgICAqIGNvbnRyb2xFdmVudHMgLSBPYmplY3Qgd2l0aCBmbihlKVxuXG4gICAgICogZ2V0Q29udHJvbCAtIGZuXG4gICAgICogZ2V0SW5uZXJBcHBlbmQgLSBmblxuICAgICAqIGdldENvbnRyb2xDaGlsZCAtIGZuXG4gICAgICogZ2V0U2hhZG93Q29udHJvbCAtIGZuXG4gICAgICogc2hvd1BvcHVwIC0gZm5cbiAgICAgKi9cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgc2xvdHMsIGF0dHJzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICBsZXQgZm9jdXNvdXRUaW1lciA9IG51bGxcblxuICBpZiAoc3RhdGUuaGFzVmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmhhc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZmllbGRWYWx1ZUlzRmlsbGVkKHByb3BzLm1vZGVsVmFsdWUpKVxuICB9XG5cbiAgaWYgKHN0YXRlLmVtaXRWYWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuZW1pdFZhbHVlID0gdmFsdWUgPT4ge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWx1ZSlcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUuY29udHJvbEV2ZW50cyA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuY29udHJvbEV2ZW50cyA9IHtcbiAgICAgIG9uRm9jdXNpbjogb25Db250cm9sRm9jdXNpbixcbiAgICAgIG9uRm9jdXNvdXQ6IG9uQ29udHJvbEZvY3Vzb3V0XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgIGNsZWFyVmFsdWUsXG4gICAgb25Db250cm9sRm9jdXNpbixcbiAgICBvbkNvbnRyb2xGb2N1c291dCxcbiAgICBmb2N1c1xuICB9KVxuXG4gIGlmIChzdGF0ZS5jb21wdXRlZENvdW50ZXIgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmNvbXB1dGVkQ291bnRlciA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5jb3VudGVyICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBsZW4gPSB0eXBlb2YgcHJvcHMubW9kZWxWYWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdudW1iZXInXG4gICAgICAgICAgPyAoJycgKyBwcm9wcy5tb2RlbFZhbHVlKS5sZW5ndGhcbiAgICAgICAgICA6IChBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpID09PSB0cnVlID8gcHJvcHMubW9kZWxWYWx1ZS5sZW5ndGggOiAwKVxuXG4gICAgICAgIGNvbnN0IG1heCA9IHByb3BzLm1heGxlbmd0aCAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBwcm9wcy5tYXhsZW5ndGhcbiAgICAgICAgICA6IHByb3BzLm1heFZhbHVlc1xuXG4gICAgICAgIHJldHVybiBsZW4gKyAobWF4ICE9PSB2b2lkIDAgPyAnIC8gJyArIG1heCA6ICcnKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb25zdCB7XG4gICAgaXNEaXJ0eU1vZGVsLFxuICAgIGhhc1J1bGVzLFxuICAgIGhhc0Vycm9yLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICByZXNldFZhbGlkYXRpb25cbiAgfSA9IHVzZVZhbGlkYXRlKHN0YXRlLmZvY3VzZWQsIHN0YXRlLmlubmVyTG9hZGluZylcblxuICBjb25zdCBmbG9hdGluZ0xhYmVsID0gc3RhdGUuZmxvYXRpbmdMYWJlbCAhPT0gdm9pZCAwXG4gICAgPyBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGFja0xhYmVsID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuZmxvYXRpbmdMYWJlbC52YWx1ZSA9PT0gdHJ1ZSlcbiAgICA6IGNvbXB1dGVkKCgpID0+IHByb3BzLnN0YWNrTGFiZWwgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5oYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZSlcblxuICBjb25zdCBzaG91bGRSZW5kZXJCb3R0b20gPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmJvdHRvbVNsb3RzID09PSB0cnVlXG4gICAgfHwgcHJvcHMuaGludCAhPT0gdm9pZCAwXG4gICAgfHwgaGFzUnVsZXMudmFsdWUgPT09IHRydWVcbiAgICB8fCBwcm9wcy5jb3VudGVyID09PSB0cnVlXG4gICAgfHwgcHJvcHMuZXJyb3IgIT09IG51bGxcbiAgKVxuXG4gIGNvbnN0IHN0eWxlVHlwZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAocHJvcHMuZmlsbGVkID09PSB0cnVlKSB7IHJldHVybiAnZmlsbGVkJyB9XG4gICAgaWYgKHByb3BzLm91dGxpbmVkID09PSB0cnVlKSB7IHJldHVybiAnb3V0bGluZWQnIH1cbiAgICBpZiAocHJvcHMuYm9yZGVybGVzcyA9PT0gdHJ1ZSkgeyByZXR1cm4gJ2JvcmRlcmxlc3MnIH1cbiAgICBpZiAocHJvcHMuc3RhbmRvdXQpIHsgcmV0dXJuICdzdGFuZG91dCcgfVxuICAgIHJldHVybiAnc3RhbmRhcmQnXG4gIH0pXG5cbiAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgYHEtZmllbGQgcm93IG5vLXdyYXAgaXRlbXMtc3RhcnQgcS1maWVsZC0tJHsgc3R5bGVUeXBlLnZhbHVlIH1gXG4gICAgKyAoc3RhdGUuZmllbGRDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBzdGF0ZS5maWVsZENsYXNzLnZhbHVlIH1gIDogJycpXG4gICAgKyAocHJvcHMucm91bmRlZCA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tcm91bmRlZCcgOiAnJylcbiAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtZmllbGQtLXNxdWFyZScgOiAnJylcbiAgICArIChmbG9hdGluZ0xhYmVsLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1mbG9hdCcgOiAnJylcbiAgICArIChoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tbGFiZWxlZCcgOiAnJylcbiAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZGVuc2UnIDogJycpXG4gICAgKyAocHJvcHMuaXRlbUFsaWduZWQgPT09IHRydWUgPyAnIHEtZmllbGQtLWl0ZW0tYWxpZ25lZCBxLWl0ZW0tdHlwZScgOiAnJylcbiAgICArIChzdGF0ZS5pc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWRhcmsnIDogJycpXG4gICAgKyAoc3RhdGUuZ2V0Q29udHJvbCA9PT0gdm9pZCAwID8gJyBxLWZpZWxkLS1hdXRvLWhlaWdodCcgOiAnJylcbiAgICArIChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1mb2N1c2VkJyA6ICcnKVxuICAgICsgKGhhc0Vycm9yLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1lcnJvcicgOiAnJylcbiAgICArIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1oaWdobGlnaHRlZCcgOiAnJylcbiAgICArIChwcm9wcy5oaWRlQm90dG9tU3BhY2UgIT09IHRydWUgJiYgc2hvdWxkUmVuZGVyQm90dG9tLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS13aXRoLWJvdHRvbScgOiAnJylcbiAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBxLWZpZWxkLS1kaXNhYmxlZCcgOiAocHJvcHMucmVhZG9ubHkgPT09IHRydWUgPyAnIHEtZmllbGQtLXJlYWRvbmx5JyA6ICcnKSlcbiAgKVxuXG4gIGNvbnN0IGNvbnRlbnRDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3EtZmllbGRfX2NvbnRyb2wgcmVsYXRpdmUtcG9zaXRpb24gcm93IG5vLXdyYXAnXG4gICAgKyAocHJvcHMuYmdDb2xvciAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wcy5iZ0NvbG9yIH1gIDogJycpXG4gICAgKyAoXG4gICAgICBoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICcgdGV4dC1uZWdhdGl2ZSdcbiAgICAgICAgOiAoXG4gICAgICAgICAgICB0eXBlb2YgcHJvcHMuc3RhbmRvdXQgPT09ICdzdHJpbmcnICYmIHByb3BzLnN0YW5kb3V0Lmxlbmd0aCAhPT0gMCAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8gYCAkeyBwcm9wcy5zdGFuZG91dCB9YFxuICAgICAgICAgICAgICA6IChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICAgICAgKVxuICAgIClcbiAgKVxuXG4gIGNvbnN0IGhhc0xhYmVsID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5sYWJlbFNsb3QgPT09IHRydWUgfHwgcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICApXG5cbiAgY29uc3QgbGFiZWxDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3EtZmllbGRfX2xhYmVsIG5vLXBvaW50ZXItZXZlbnRzIGFic29sdXRlIGVsbGlwc2lzJ1xuICAgICsgKHByb3BzLmxhYmVsQ29sb3IgIT09IHZvaWQgMCAmJiBoYXNFcnJvci52YWx1ZSAhPT0gdHJ1ZSA/IGAgdGV4dC0keyBwcm9wcy5sYWJlbENvbG9yIH1gIDogJycpXG4gIClcblxuICBjb25zdCBjb250cm9sU2xvdFNjb3BlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICBpZDogc3RhdGUudGFyZ2V0VWlkLnZhbHVlLFxuICAgIGVkaXRhYmxlOiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSxcbiAgICBmb2N1c2VkOiBzdGF0ZS5mb2N1c2VkLnZhbHVlLFxuICAgIGZsb2F0aW5nTGFiZWw6IGZsb2F0aW5nTGFiZWwudmFsdWUsXG4gICAgbW9kZWxWYWx1ZTogcHJvcHMubW9kZWxWYWx1ZSxcbiAgICBlbWl0VmFsdWU6IHN0YXRlLmVtaXRWYWx1ZVxuICB9KSlcblxuICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGFjYyA9IHtcbiAgICAgIGZvcjogc3RhdGUudGFyZ2V0VWlkLnZhbHVlXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIGFjY1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMucmVhZG9ubHkgPT09IHRydWUpIHtcbiAgICAgIGFjY1sgJ2FyaWEtcmVhZG9ubHknIF0gPSAndHJ1ZSdcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjXG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZm9yLCB2YWwgPT4ge1xuICAgIC8vIGRvbid0IHRyYW5zZm9ybSB0YXJnZXRVaWQgaW50byBhIGNvbXB1dGVkXG4gICAgLy8gcHJvcCBhcyBpdCB3aWxsIGJyZWFrIFNTUlxuICAgIHN0YXRlLnRhcmdldFVpZC52YWx1ZSA9IGdldFRhcmdldFVpZCh2YWwpXG4gIH0pXG5cbiAgZnVuY3Rpb24gZm9jdXNIYW5kbGVyICgpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICBsZXQgdGFyZ2V0ID0gc3RhdGUudGFyZ2V0UmVmICE9PSB2b2lkIDAgJiYgc3RhdGUudGFyZ2V0UmVmLnZhbHVlXG5cbiAgICBpZiAodGFyZ2V0ICYmIChlbCA9PT0gbnVsbCB8fCBlbC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlKSkge1xuICAgICAgdGFyZ2V0Lmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSA9PT0gdHJ1ZSB8fCAodGFyZ2V0ID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ1t0YWJpbmRleF0nKSlcbiAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBlbCkge1xuICAgICAgICB0YXJnZXQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgIGFkZEZvY3VzRm4oZm9jdXNIYW5kbGVyKVxuICB9XG5cbiAgZnVuY3Rpb24gYmx1ciAoKSB7XG4gICAgcmVtb3ZlRm9jdXNGbihmb2N1c0hhbmRsZXIpXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgaWYgKGVsICE9PSBudWxsICYmIHN0YXRlLnJvb3RSZWYudmFsdWUuY29udGFpbnMoZWwpKSB7XG4gICAgICBlbC5ibHVyKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbnRyb2xGb2N1c2luIChlKSB7XG4gICAgaWYgKGZvY3Vzb3V0VGltZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dChmb2N1c291dFRpbWVyKVxuICAgICAgZm9jdXNvdXRUaW1lciA9IG51bGxcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPSB0cnVlXG4gICAgICBlbWl0KCdmb2N1cycsIGUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Db250cm9sRm9jdXNvdXQgKGUsIHRoZW4pIHtcbiAgICBmb2N1c291dFRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChmb2N1c291dFRpbWVyKVxuICAgIGZvY3Vzb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGZvY3Vzb3V0VGltZXIgPSBudWxsXG5cbiAgICAgIGlmIChcbiAgICAgICAgZG9jdW1lbnQuaGFzRm9jdXMoKSA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgc3RhdGUuaGFzUG9wdXBPcGVuID09PSB0cnVlXG4gICAgICAgICAgfHwgc3RhdGUuY29udHJvbFJlZiA9PT0gdm9pZCAwXG4gICAgICAgICAgfHwgc3RhdGUuY29udHJvbFJlZi52YWx1ZSA9PT0gbnVsbFxuICAgICAgICAgIHx8IHN0YXRlLmNvbnRyb2xSZWYudmFsdWUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgIT09IGZhbHNlXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9IGZhbHNlXG4gICAgICAgIGVtaXQoJ2JsdXInLCBlKVxuICAgICAgfVxuXG4gICAgICB0aGVuICE9PSB2b2lkIDAgJiYgdGhlbigpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyVmFsdWUgKGUpIHtcbiAgICAvLyBwcmV2ZW50IGFjdGl2YXRpbmcgdGhlIGZpZWxkIGJ1dCBrZWVwIGZvY3VzIG9uIGRlc2t0b3BcbiAgICBzdG9wQW5kUHJldmVudChlKVxuXG4gICAgaWYgKCRxLnBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSkge1xuICAgICAgY29uc3QgZWwgPSAoc3RhdGUudGFyZ2V0UmVmICE9PSB2b2lkIDAgJiYgc3RhdGUudGFyZ2V0UmVmLnZhbHVlKSB8fCBzdGF0ZS5yb290UmVmLnZhbHVlXG4gICAgICBlbC5mb2N1cygpXG4gICAgfVxuICAgIGVsc2UgaWYgKHN0YXRlLnJvb3RSZWYudmFsdWUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgPT09IHRydWUpIHtcbiAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLnR5cGUgPT09ICdmaWxlJykgeyAvLyBUT0RPIHZ1ZTNcbiAgICAgIC8vIGRvIG5vdCBsZXQgZm9jdXMgYmUgdHJpZ2dlcmVkXG4gICAgICAvLyBhcyBpdCB3aWxsIG1ha2UgdGhlIG5hdGl2ZSBmaWxlIGRpYWxvZ1xuICAgICAgLy8gYXBwZWFyIGZvciBhbm90aGVyIHNlbGVjdGlvblxuICAgICAgc3RhdGUuaW5wdXRSZWYudmFsdWUudmFsdWUgPSBudWxsXG4gICAgfVxuXG4gICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBudWxsKVxuICAgIGVtaXQoJ2NsZWFyJywgcHJvcHMubW9kZWxWYWx1ZSlcblxuICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgIHJlc2V0VmFsaWRhdGlvbigpXG5cbiAgICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUpIHtcbiAgICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgY29uc3Qgbm9kZSA9IFtdXG5cbiAgICBzbG90cy5wcmVwZW5kICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX3ByZXBlbmQgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAga2V5OiAncHJlcGVuZCcsXG4gICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgIH0sIHNsb3RzLnByZXBlbmQoKSlcbiAgICApXG5cbiAgICBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fY29udHJvbC1jb250YWluZXIgY29sIHJlbGF0aXZlLXBvc2l0aW9uIHJvdyBuby13cmFwIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgfSwgZ2V0Q29udHJvbENvbnRhaW5lcigpKVxuICAgIClcblxuICAgIGhhc0Vycm9yLnZhbHVlID09PSB0cnVlICYmIHByb3BzLm5vRXJyb3JJY29uID09PSBmYWxzZSAmJiBub2RlLnB1c2goXG4gICAgICBnZXRJbm5lckFwcGVuZE5vZGUoJ2Vycm9yJywgW1xuICAgICAgICBoKFFJY29uLCB7IG5hbWU6ICRxLmljb25TZXQuZmllbGQuZXJyb3IsIGNvbG9yOiAnbmVnYXRpdmUnIH0pXG4gICAgICBdKVxuICAgIClcblxuICAgIGlmIChwcm9wcy5sb2FkaW5nID09PSB0cnVlIHx8IHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBnZXRJbm5lckFwcGVuZE5vZGUoXG4gICAgICAgICAgJ2lubmVyLWxvYWRpbmctYXBwZW5kJyxcbiAgICAgICAgICBzbG90cy5sb2FkaW5nICE9PSB2b2lkIDBcbiAgICAgICAgICAgID8gc2xvdHMubG9hZGluZygpXG4gICAgICAgICAgICA6IFsgaChRU3Bpbm5lciwgeyBjb2xvcjogcHJvcHMuY29sb3IgfSkgXVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLmNsZWFyYWJsZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5oYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBnZXRJbm5lckFwcGVuZE5vZGUoJ2lubmVyLWNsZWFyYWJsZS1hcHBlbmQnLCBbXG4gICAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19mb2N1c2FibGUtYWN0aW9uJyxcbiAgICAgICAgICAgIHRhZzogJ2J1dHRvbicsXG4gICAgICAgICAgICBuYW1lOiBwcm9wcy5jbGVhckljb24gfHwgJHEuaWNvblNldC5maWVsZC5jbGVhcixcbiAgICAgICAgICAgIHRhYmluZGV4OiAwLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiBudWxsLFxuICAgICAgICAgICAgcm9sZTogbnVsbCxcbiAgICAgICAgICAgIG9uQ2xpY2s6IGNsZWFyVmFsdWVcbiAgICAgICAgICB9KVxuICAgICAgICBdKVxuICAgICAgKVxuICAgIH1cblxuICAgIHNsb3RzLmFwcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19hcHBlbmQgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAga2V5OiAnYXBwZW5kJyxcbiAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgfSwgc2xvdHMuYXBwZW5kKCkpXG4gICAgKVxuXG4gICAgc3RhdGUuZ2V0SW5uZXJBcHBlbmQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBnZXRJbm5lckFwcGVuZE5vZGUoJ2lubmVyLWFwcGVuZCcsIHN0YXRlLmdldElubmVyQXBwZW5kKCkpXG4gICAgKVxuXG4gICAgc3RhdGUuZ2V0Q29udHJvbENoaWxkICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgc3RhdGUuZ2V0Q29udHJvbENoaWxkKClcbiAgICApXG5cbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29udHJvbENvbnRhaW5lciAoKSB7XG4gICAgY29uc3Qgbm9kZSA9IFtdXG5cbiAgICBwcm9wcy5wcmVmaXggIT09IHZvaWQgMCAmJiBwcm9wcy5wcmVmaXggIT09IG51bGwgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX3ByZWZpeCBuby1wb2ludGVyLWV2ZW50cyByb3cgaXRlbXMtY2VudGVyJ1xuICAgICAgfSwgcHJvcHMucHJlZml4KVxuICAgIClcblxuICAgIGlmIChzdGF0ZS5nZXRTaGFkb3dDb250cm9sICE9PSB2b2lkIDAgJiYgc3RhdGUuaGFzU2hhZG93LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIHN0YXRlLmdldFNoYWRvd0NvbnRyb2woKVxuICAgICAgKVxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5nZXRDb250cm9sICE9PSB2b2lkIDApIHtcbiAgICAgIG5vZGUucHVzaChzdGF0ZS5nZXRDb250cm9sKCkpXG4gICAgfVxuICAgIC8vIGludGVybmFsIHVzYWdlIG9ubHk6XG4gICAgZWxzZSBpZiAoc2xvdHMucmF3Q29udHJvbCAhPT0gdm9pZCAwKSB7XG4gICAgICBub2RlLnB1c2goc2xvdHMucmF3Q29udHJvbCgpKVxuICAgIH1cbiAgICBlbHNlIGlmIChzbG90cy5jb250cm9sICE9PSB2b2lkIDApIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogc3RhdGUudGFyZ2V0UmVmLFxuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fbmF0aXZlIHJvdycsXG4gICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwXG4gICAgICAgIH0sIHNsb3RzLmNvbnRyb2woY29udHJvbFNsb3RTY29wZS52YWx1ZSkpXG4gICAgICApXG4gICAgfVxuXG4gICAgaGFzTGFiZWwudmFsdWUgPT09IHRydWUgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogbGFiZWxDbGFzcy52YWx1ZVxuICAgICAgfSwgaFNsb3Qoc2xvdHMubGFiZWwsIHByb3BzLmxhYmVsKSlcbiAgICApXG5cbiAgICBwcm9wcy5zdWZmaXggIT09IHZvaWQgMCAmJiBwcm9wcy5zdWZmaXggIT09IG51bGwgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX3N1ZmZpeCBuby1wb2ludGVyLWV2ZW50cyByb3cgaXRlbXMtY2VudGVyJ1xuICAgICAgfSwgcHJvcHMuc3VmZml4KVxuICAgIClcblxuICAgIHJldHVybiBub2RlLmNvbmNhdChoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvdHRvbSAoKSB7XG4gICAgbGV0IG1zZywga2V5XG5cbiAgICBpZiAoaGFzRXJyb3IudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChlcnJvck1lc3NhZ2UudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgbXNnID0gWyBoKCdkaXYnLCB7IHJvbGU6ICdhbGVydCcgfSwgZXJyb3JNZXNzYWdlLnZhbHVlKSBdXG4gICAgICAgIGtleSA9IGBxLS1zbG90LWVycm9yLSR7IGVycm9yTWVzc2FnZS52YWx1ZSB9YFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG1zZyA9IGhTbG90KHNsb3RzLmVycm9yKVxuICAgICAgICBrZXkgPSAncS0tc2xvdC1lcnJvcidcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMuaGlkZUhpbnQgIT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb3BzLmhpbnQgIT09IHZvaWQgMCkge1xuICAgICAgICBtc2cgPSBbIGgoJ2RpdicsIHByb3BzLmhpbnQpIF1cbiAgICAgICAga2V5ID0gYHEtLXNsb3QtaGludC0keyBwcm9wcy5oaW50IH1gXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbXNnID0gaFNsb3Qoc2xvdHMuaGludClcbiAgICAgICAga2V5ID0gJ3EtLXNsb3QtaGludCdcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBoYXNDb3VudGVyID0gcHJvcHMuY291bnRlciA9PT0gdHJ1ZSB8fCBzbG90cy5jb3VudGVyICE9PSB2b2lkIDBcblxuICAgIGlmIChwcm9wcy5oaWRlQm90dG9tU3BhY2UgPT09IHRydWUgJiYgaGFzQ291bnRlciA9PT0gZmFsc2UgJiYgbXNnID09PSB2b2lkIDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IG1haW4gPSBoKCdkaXYnLCB7XG4gICAgICBrZXksXG4gICAgICBjbGFzczogJ3EtZmllbGRfX21lc3NhZ2VzIGNvbCdcbiAgICB9LCBtc2cpXG5cbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6ICdxLWZpZWxkX19ib3R0b20gcm93IGl0ZW1zLXN0YXJ0IHEtZmllbGRfX2JvdHRvbS0tJ1xuICAgICAgICArIChwcm9wcy5oaWRlQm90dG9tU3BhY2UgIT09IHRydWUgPyAnYW5pbWF0ZWQnIDogJ3N0YWxlJyksXG4gICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgfSwgW1xuICAgICAgcHJvcHMuaGlkZUJvdHRvbVNwYWNlID09PSB0cnVlXG4gICAgICAgID8gbWFpblxuICAgICAgICA6IGgoVHJhbnNpdGlvbiwgeyBuYW1lOiAncS10cmFuc2l0aW9uLS1maWVsZC1tZXNzYWdlJyB9LCAoKSA9PiBtYWluKSxcblxuICAgICAgaGFzQ291bnRlciA9PT0gdHJ1ZVxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2NvdW50ZXInXG4gICAgICAgIH0sIHNsb3RzLmNvdW50ZXIgIT09IHZvaWQgMCA/IHNsb3RzLmNvdW50ZXIoKSA6IHN0YXRlLmNvbXB1dGVkQ291bnRlci52YWx1ZSlcbiAgICAgICAgOiBudWxsXG4gICAgXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldElubmVyQXBwZW5kTm9kZSAoa2V5LCBjb250ZW50KSB7XG4gICAgcmV0dXJuIGNvbnRlbnQgPT09IG51bGxcbiAgICAgID8gbnVsbFxuICAgICAgOiBoKCdkaXYnLCB7XG4gICAgICAgIGtleSxcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19hcHBlbmQgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgfSwgY29udGVudClcbiAgfVxuXG4gIGxldCBzaG91bGRBY3RpdmF0ZSA9IGZhbHNlXG5cbiAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPSB0cnVlXG4gIH0pXG5cbiAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgIHNob3VsZEFjdGl2YXRlID09PSB0cnVlICYmIHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSAmJiBwcm94eS5mb2N1cygpXG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBpZiAoaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uLnZhbHVlID09PSB0cnVlICYmIHByb3BzLmZvciA9PT0gdm9pZCAwKSB7XG4gICAgICBzdGF0ZS50YXJnZXRVaWQudmFsdWUgPSBnZXRUYXJnZXRVaWQoKVxuICAgIH1cblxuICAgIHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSAmJiBwcm94eS5mb2N1cygpXG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICBmb2N1c291dFRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChmb2N1c291dFRpbWVyKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7IGZvY3VzLCBibHVyIH0pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbmRlckZpZWxkICgpIHtcbiAgICBjb25zdCBsYWJlbEF0dHJzID0gc3RhdGUuZ2V0Q29udHJvbCA9PT0gdm9pZCAwICYmIHNsb3RzLmNvbnRyb2wgPT09IHZvaWQgMFxuICAgICAgPyB7XG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDAsXG4gICAgICAgICAgLi4uYXR0cmlidXRlcy52YWx1ZVxuICAgICAgICB9XG4gICAgICA6IGF0dHJpYnV0ZXMudmFsdWVcblxuICAgIHJldHVybiBoKCdsYWJlbCcsIHtcbiAgICAgIHJlZjogc3RhdGUucm9vdFJlZixcbiAgICAgIGNsYXNzOiBbXG4gICAgICAgIGNsYXNzZXMudmFsdWUsXG4gICAgICAgIGF0dHJzLmNsYXNzXG4gICAgICBdLFxuICAgICAgc3R5bGU6IGF0dHJzLnN0eWxlLFxuICAgICAgLi4ubGFiZWxBdHRyc1xuICAgIH0sIFtcbiAgICAgIHNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fYmVmb3JlIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgICB9LCBzbG90cy5iZWZvcmUoKSlcbiAgICAgICAgOiBudWxsLFxuXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9faW5uZXIgcmVsYXRpdmUtcG9zaXRpb24gY29sIHNlbGYtc3RyZXRjaCdcbiAgICAgIH0sIFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogc3RhdGUuY29udHJvbFJlZixcbiAgICAgICAgICBjbGFzczogY29udGVudENsYXNzLnZhbHVlLFxuICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAuLi5zdGF0ZS5jb250cm9sRXZlbnRzXG4gICAgICAgIH0sIGdldENvbnRlbnQoKSksXG5cbiAgICAgICAgc2hvdWxkUmVuZGVyQm90dG9tLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyBnZXRCb3R0b20oKVxuICAgICAgICAgIDogbnVsbFxuICAgICAgXSksXG5cbiAgICAgIHNsb3RzLmFmdGVyICE9PSB2b2lkIDBcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19hZnRlciBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgICAgfSwgc2xvdHMuYWZ0ZXIoKSlcbiAgICAgICAgOiBudWxsXG4gICAgXSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCwgbmV4dFRpY2sgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHNob3VsZElnbm9yZUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUva2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG4vLyBsZWF2ZSBOQU1FRF9NQVNLUyBhdCB0b3Agb2YgZmlsZSAoY29kZSByZWZlcmVuY2VkIGZyb20gZG9jcylcbmNvbnN0IE5BTUVEX01BU0tTID0ge1xuICBkYXRlOiAnIyMjIy8jIy8jIycsXG4gIGRhdGV0aW1lOiAnIyMjIy8jIy8jIyAjIzojIycsXG4gIHRpbWU6ICcjIzojIycsXG4gIGZ1bGx0aW1lOiAnIyM6IyM6IyMnLFxuICBwaG9uZTogJygjIyMpICMjIyAtICMjIyMnLFxuICBjYXJkOiAnIyMjIyAjIyMjICMjIyMgIyMjIydcbn1cblxuY29uc3QgVE9LRU5TID0ge1xuICAnIyc6IHsgcGF0dGVybjogJ1tcXFxcZF0nLCBuZWdhdGU6ICdbXlxcXFxkXScgfSxcblxuICBTOiB7IHBhdHRlcm46ICdbYS16QS1aXScsIG5lZ2F0ZTogJ1teYS16QS1aXScgfSxcbiAgTjogeyBwYXR0ZXJuOiAnWzAtOWEtekEtWl0nLCBuZWdhdGU6ICdbXjAtOWEtekEtWl0nIH0sXG5cbiAgQTogeyBwYXR0ZXJuOiAnW2EtekEtWl0nLCBuZWdhdGU6ICdbXmEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZVVwcGVyQ2FzZSgpIH0sXG4gIGE6IHsgcGF0dGVybjogJ1thLXpBLVpdJywgbmVnYXRlOiAnW15hLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVMb3dlckNhc2UoKSB9LFxuXG4gIFg6IHsgcGF0dGVybjogJ1swLTlhLXpBLVpdJywgbmVnYXRlOiAnW14wLTlhLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVVcHBlckNhc2UoKSB9LFxuICB4OiB7IHBhdHRlcm46ICdbMC05YS16QS1aXScsIG5lZ2F0ZTogJ1teMC05YS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlTG93ZXJDYXNlKCkgfVxufVxuXG5jb25zdCBLRVlTID0gT2JqZWN0LmtleXMoVE9LRU5TKVxuS0VZUy5mb3JFYWNoKGtleSA9PiB7XG4gIFRPS0VOU1sga2V5IF0ucmVnZXggPSBuZXcgUmVnRXhwKFRPS0VOU1sga2V5IF0ucGF0dGVybilcbn0pXG5cbmNvbnN0XG4gIHRva2VuUmVnZXhNYXNrID0gbmV3IFJlZ0V4cCgnXFxcXFxcXFwoW14uKis/XiR7fSgpfChbXFxcXF1dKXwoWy4qKz9eJHt9KCl8W1xcXFxdXSl8KFsnICsgS0VZUy5qb2luKCcnKSArICddKXwoLiknLCAnZycpLFxuICBlc2NSZWdleCA9IC9bLiorP14ke30oKXxbXFxdXFxcXF0vZ1xuXG5jb25zdCBNQVJLRVIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDEpXG5cbmV4cG9ydCBjb25zdCB1c2VNYXNrUHJvcHMgPSB7XG4gIG1hc2s6IFN0cmluZyxcbiAgcmV2ZXJzZUZpbGxNYXNrOiBCb29sZWFuLFxuICBmaWxsTWFzazogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgdW5tYXNrZWRWYWx1ZTogQm9vbGVhblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIGVtaXQsIGVtaXRWYWx1ZSwgaW5wdXRSZWYpIHtcbiAgbGV0IG1hc2tNYXJrZWQsIG1hc2tSZXBsYWNlZCwgY29tcHV0ZWRNYXNrLCBjb21wdXRlZFVubWFzaywgcGFzdGVkVGV4dFN0YXJ0LCBzZWxlY3Rpb25BbmNob3JcblxuICBjb25zdCBoYXNNYXNrID0gcmVmKG51bGwpXG4gIGNvbnN0IGlubmVyVmFsdWUgPSByZWYoZ2V0SW5pdGlhbE1hc2tlZFZhbHVlKCkpXG5cbiAgZnVuY3Rpb24gZ2V0SXNUeXBlVGV4dCAoKSB7XG4gICAgcmV0dXJuIHByb3BzLmF1dG9ncm93ID09PSB0cnVlXG4gICAgICB8fCBbICd0ZXh0YXJlYScsICd0ZXh0JywgJ3NlYXJjaCcsICd1cmwnLCAndGVsJywgJ3Bhc3N3b3JkJyBdLmluY2x1ZGVzKHByb3BzLnR5cGUpXG4gIH1cblxuICB3YXRjaCgoKSA9PiBwcm9wcy50eXBlICsgcHJvcHMuYXV0b2dyb3csIHVwZGF0ZU1hc2tJbnRlcm5hbHMpXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubWFzaywgdiA9PiB7XG4gICAgaWYgKHYgIT09IHZvaWQgMCkge1xuICAgICAgdXBkYXRlTWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUsIHRydWUpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgdmFsID0gdW5tYXNrVmFsdWUoaW5uZXJWYWx1ZS52YWx1ZSlcbiAgICAgIHVwZGF0ZU1hc2tJbnRlcm5hbHMoKVxuICAgICAgcHJvcHMubW9kZWxWYWx1ZSAhPT0gdmFsICYmIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsKVxuICAgIH1cbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5maWxsTWFzayArIHByb3BzLnJldmVyc2VGaWxsTWFzaywgKCkgPT4ge1xuICAgIGhhc01hc2sudmFsdWUgPT09IHRydWUgJiYgdXBkYXRlTWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUsIHRydWUpXG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudW5tYXNrZWRWYWx1ZSwgKCkgPT4ge1xuICAgIGhhc01hc2sudmFsdWUgPT09IHRydWUgJiYgdXBkYXRlTWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUpXG4gIH0pXG5cbiAgZnVuY3Rpb24gZ2V0SW5pdGlhbE1hc2tlZFZhbHVlICgpIHtcbiAgICB1cGRhdGVNYXNrSW50ZXJuYWxzKClcblxuICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBtYXNrZWQgPSBtYXNrVmFsdWUodW5tYXNrVmFsdWUocHJvcHMubW9kZWxWYWx1ZSkpXG5cbiAgICAgIHJldHVybiBwcm9wcy5maWxsTWFzayAhPT0gZmFsc2VcbiAgICAgICAgPyBmaWxsV2l0aE1hc2sobWFza2VkKVxuICAgICAgICA6IG1hc2tlZFxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5tb2RlbFZhbHVlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYWRkZWRNYXNrTWFya2VkIChzaXplKSB7XG4gICAgaWYgKHNpemUgPCBtYXNrTWFya2VkLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG1hc2tNYXJrZWQuc2xpY2UoLXNpemUpXG4gICAgfVxuXG4gICAgbGV0IHBhZCA9ICcnLCBsb2NhbE1hc2tNYXJrZWQgPSBtYXNrTWFya2VkXG4gICAgY29uc3QgcGFkUG9zID0gbG9jYWxNYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKVxuXG4gICAgaWYgKHBhZFBvcyA+IC0xKSB7XG4gICAgICBmb3IgKGxldCBpID0gc2l6ZSAtIGxvY2FsTWFza01hcmtlZC5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgcGFkICs9IE1BUktFUlxuICAgICAgfVxuXG4gICAgICBsb2NhbE1hc2tNYXJrZWQgPSBsb2NhbE1hc2tNYXJrZWQuc2xpY2UoMCwgcGFkUG9zKSArIHBhZCArIGxvY2FsTWFza01hcmtlZC5zbGljZShwYWRQb3MpXG4gICAgfVxuXG4gICAgcmV0dXJuIGxvY2FsTWFza01hcmtlZFxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTWFza0ludGVybmFscyAoKSB7XG4gICAgaGFzTWFzay52YWx1ZSA9IHByb3BzLm1hc2sgIT09IHZvaWQgMFxuICAgICAgJiYgcHJvcHMubWFzay5sZW5ndGggIT09IDBcbiAgICAgICYmIGdldElzVHlwZVRleHQoKVxuXG4gICAgaWYgKGhhc01hc2sudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBjb21wdXRlZFVubWFzayA9IHZvaWQgMFxuICAgICAgbWFza01hcmtlZCA9ICcnXG4gICAgICBtYXNrUmVwbGFjZWQgPSAnJ1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3RcbiAgICAgIGxvY2FsQ29tcHV0ZWRNYXNrID0gTkFNRURfTUFTS1NbIHByb3BzLm1hc2sgXSA9PT0gdm9pZCAwXG4gICAgICAgID8gcHJvcHMubWFza1xuICAgICAgICA6IE5BTUVEX01BU0tTWyBwcm9wcy5tYXNrIF0sXG4gICAgICBmaWxsQ2hhciA9IHR5cGVvZiBwcm9wcy5maWxsTWFzayA9PT0gJ3N0cmluZycgJiYgcHJvcHMuZmlsbE1hc2subGVuZ3RoICE9PSAwXG4gICAgICAgID8gcHJvcHMuZmlsbE1hc2suc2xpY2UoMCwgMSlcbiAgICAgICAgOiAnXycsXG4gICAgICBmaWxsQ2hhckVzY2FwZWQgPSBmaWxsQ2hhci5yZXBsYWNlKGVzY1JlZ2V4LCAnXFxcXCQmJyksXG4gICAgICB1bm1hc2sgPSBbXSxcbiAgICAgIGV4dHJhY3QgPSBbXSxcbiAgICAgIG1hc2sgPSBbXVxuXG4gICAgbGV0XG4gICAgICBmaXJzdE1hdGNoID0gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlLFxuICAgICAgdW5tYXNrQ2hhciA9ICcnLFxuICAgICAgbmVnYXRlQ2hhciA9ICcnXG5cbiAgICBsb2NhbENvbXB1dGVkTWFzay5yZXBsYWNlKHRva2VuUmVnZXhNYXNrLCAoXywgY2hhcjEsIGVzYywgdG9rZW4sIGNoYXIyKSA9PiB7XG4gICAgICBpZiAodG9rZW4gIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCBjID0gVE9LRU5TWyB0b2tlbiBdXG4gICAgICAgIG1hc2sucHVzaChjKVxuICAgICAgICBuZWdhdGVDaGFyID0gYy5uZWdhdGVcbiAgICAgICAgaWYgKGZpcnN0TWF0Y2ggPT09IHRydWUpIHtcbiAgICAgICAgICBleHRyYWN0LnB1c2goJyg/OicgKyBuZWdhdGVDaGFyICsgJyspPygnICsgYy5wYXR0ZXJuICsgJyspPyg/OicgKyBuZWdhdGVDaGFyICsgJyspPygnICsgYy5wYXR0ZXJuICsgJyspPycpXG4gICAgICAgICAgZmlyc3RNYXRjaCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZXh0cmFjdC5wdXNoKCcoPzonICsgbmVnYXRlQ2hhciArICcrKT8oJyArIGMucGF0dGVybiArICcpPycpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChlc2MgIT09IHZvaWQgMCkge1xuICAgICAgICB1bm1hc2tDaGFyID0gJ1xcXFwnICsgKGVzYyA9PT0gJ1xcXFwnID8gJycgOiBlc2MpXG4gICAgICAgIG1hc2sucHVzaChlc2MpXG4gICAgICAgIHVubWFzay5wdXNoKCcoW14nICsgdW5tYXNrQ2hhciArICddKyk/JyArIHVubWFza0NoYXIgKyAnPycpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgYyA9IGNoYXIxICE9PSB2b2lkIDAgPyBjaGFyMSA6IGNoYXIyXG4gICAgICAgIHVubWFza0NoYXIgPSBjID09PSAnXFxcXCcgPyAnXFxcXFxcXFxcXFxcXFxcXCcgOiBjLnJlcGxhY2UoZXNjUmVnZXgsICdcXFxcXFxcXCQmJylcbiAgICAgICAgbWFzay5wdXNoKGMpXG4gICAgICAgIHVubWFzay5wdXNoKCcoW14nICsgdW5tYXNrQ2hhciArICddKyk/JyArIHVubWFza0NoYXIgKyAnPycpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0XG4gICAgICB1bm1hc2tNYXRjaGVyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgJ14nXG4gICAgICAgICsgdW5tYXNrLmpvaW4oJycpXG4gICAgICAgICsgJygnICsgKHVubWFza0NoYXIgPT09ICcnID8gJy4nIDogJ1teJyArIHVubWFza0NoYXIgKyAnXScpICsgJyspPydcbiAgICAgICAgKyAodW5tYXNrQ2hhciA9PT0gJycgPyAnJyA6ICdbJyArIHVubWFza0NoYXIgKyAnXSonKSArICckJ1xuICAgICAgKSxcbiAgICAgIGV4dHJhY3RMYXN0ID0gZXh0cmFjdC5sZW5ndGggLSAxLFxuICAgICAgZXh0cmFjdE1hdGNoZXIgPSBleHRyYWN0Lm1hcCgocmUsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyBmaWxsQ2hhckVzY2FwZWQgKyAnKicgKyByZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gZXh0cmFjdExhc3QpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICdeJyArIHJlXG4gICAgICAgICAgICArICcoJyArIChuZWdhdGVDaGFyID09PSAnJyA/ICcuJyA6IG5lZ2F0ZUNoYXIpICsgJyspPydcbiAgICAgICAgICAgICsgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/ICckJyA6IGZpbGxDaGFyRXNjYXBlZCArICcqJylcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyByZSlcbiAgICAgIH0pXG5cbiAgICBjb21wdXRlZE1hc2sgPSBtYXNrXG4gICAgY29tcHV0ZWRVbm1hc2sgPSB2YWwgPT4ge1xuICAgICAgY29uc3QgdW5tYXNrTWF0Y2ggPSB1bm1hc2tNYXRjaGVyLmV4ZWMocHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlID8gdmFsIDogdmFsLnNsaWNlKDAsIG1hc2subGVuZ3RoICsgMSkpXG4gICAgICBpZiAodW5tYXNrTWF0Y2ggIT09IG51bGwpIHtcbiAgICAgICAgdmFsID0gdW5tYXNrTWF0Y2guc2xpY2UoMSkuam9pbignJylcbiAgICAgIH1cblxuICAgICAgY29uc3RcbiAgICAgICAgZXh0cmFjdE1hdGNoID0gW10sXG4gICAgICAgIGV4dHJhY3RNYXRjaGVyTGVuZ3RoID0gZXh0cmFjdE1hdGNoZXIubGVuZ3RoXG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBzdHIgPSB2YWw7IGkgPCBleHRyYWN0TWF0Y2hlckxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG0gPSBleHRyYWN0TWF0Y2hlclsgaSBdLmV4ZWMoc3RyKVxuXG4gICAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0ciA9IHN0ci5zbGljZShtLnNoaWZ0KCkubGVuZ3RoKVxuICAgICAgICBleHRyYWN0TWF0Y2gucHVzaCguLi5tKVxuICAgICAgfVxuICAgICAgaWYgKGV4dHJhY3RNYXRjaC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmV0dXJuIGV4dHJhY3RNYXRjaC5qb2luKCcnKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsXG4gICAgfVxuICAgIG1hc2tNYXJrZWQgPSBtYXNrLm1hcCh2ID0+ICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgPyB2IDogTUFSS0VSKSkuam9pbignJylcbiAgICBtYXNrUmVwbGFjZWQgPSBtYXNrTWFya2VkLnNwbGl0KE1BUktFUikuam9pbihmaWxsQ2hhcilcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1hc2tWYWx1ZSAocmF3VmFsLCB1cGRhdGVNYXNrSW50ZXJuYWxzRmxhZywgaW5wdXRUeXBlKSB7XG4gICAgY29uc3RcbiAgICAgIGlucCA9IGlucHV0UmVmLnZhbHVlLFxuICAgICAgZW5kID0gaW5wLnNlbGVjdGlvbkVuZCxcbiAgICAgIGVuZFJldmVyc2UgPSBpbnAudmFsdWUubGVuZ3RoIC0gZW5kLFxuICAgICAgdW5tYXNrZWQgPSB1bm1hc2tWYWx1ZShyYXdWYWwpXG5cbiAgICAvLyBVcGRhdGUgaGVyZSBzbyB1bm1hc2sgdXNlcyB0aGUgb3JpZ2luYWwgZmlsbENoYXJcbiAgICB1cGRhdGVNYXNrSW50ZXJuYWxzRmxhZyA9PT0gdHJ1ZSAmJiB1cGRhdGVNYXNrSW50ZXJuYWxzKClcblxuICAgIGNvbnN0XG4gICAgICBwcmVNYXNrZWQgPSBtYXNrVmFsdWUodW5tYXNrZWQpLFxuICAgICAgbWFza2VkID0gcHJvcHMuZmlsbE1hc2sgIT09IGZhbHNlXG4gICAgICAgID8gZmlsbFdpdGhNYXNrKHByZU1hc2tlZClcbiAgICAgICAgOiBwcmVNYXNrZWQsXG4gICAgICBjaGFuZ2VkID0gaW5uZXJWYWx1ZS52YWx1ZSAhPT0gbWFza2VkXG5cbiAgICAvLyBXZSB3YW50IHRvIGF2b2lkIFwiZmxpY2tlcmluZ1wiIHNvIHdlIHNldCB2YWx1ZSBpbW1lZGlhdGVseVxuICAgIGlucC52YWx1ZSAhPT0gbWFza2VkICYmIChpbnAudmFsdWUgPSBtYXNrZWQpXG5cbiAgICBjaGFuZ2VkID09PSB0cnVlICYmIChpbm5lclZhbHVlLnZhbHVlID0gbWFza2VkKVxuXG4gICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gaW5wICYmIG5leHRUaWNrKCgpID0+IHtcbiAgICAgIGlmIChtYXNrZWQgPT09IG1hc2tSZXBsYWNlZCkge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgPyBtYXNrUmVwbGFjZWQubGVuZ3RoIDogMFxuICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGlucHV0VHlwZSA9PT0gJ2luc2VydEZyb21QYXN0ZScgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1heEVuZCA9IGlucC5zZWxlY3Rpb25FbmRcbiAgICAgICAgbGV0IGN1cnNvciA9IGVuZCAtIDFcbiAgICAgICAgLy8gZWFjaCBub24tbWFya2VyIGNoYXIgbWVhbnMgd2UgbW92ZSBvbmNlIHRvIHJpZ2h0XG4gICAgICAgIGZvciAobGV0IGkgPSBwYXN0ZWRUZXh0U3RhcnQ7IGkgPD0gY3Vyc29yICYmIGkgPCBtYXhFbmQ7IGkrKykge1xuICAgICAgICAgIGlmIChtYXNrTWFya2VkWyBpIF0gIT09IE1BUktFUikge1xuICAgICAgICAgICAgY3Vyc29yKytcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbW92ZUN1cnNvci5yaWdodChpbnAsIGN1cnNvcilcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKFsgJ2RlbGV0ZUNvbnRlbnRCYWNrd2FyZCcsICdkZWxldGVDb250ZW50Rm9yd2FyZCcgXS5pbmRleE9mKGlucHV0VHlwZSkgPiAtMSkge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWVcbiAgICAgICAgICA/IChcbiAgICAgICAgICAgICAgZW5kID09PSAwXG4gICAgICAgICAgICAgICAgPyAobWFza2VkLmxlbmd0aCA+IHByZU1hc2tlZC5sZW5ndGggPyAxIDogMClcbiAgICAgICAgICAgICAgICA6IE1hdGgubWF4KDAsIG1hc2tlZC5sZW5ndGggLSAobWFza2VkID09PSBtYXNrUmVwbGFjZWQgPyAwIDogTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgZW5kUmV2ZXJzZSkgKyAxKSkgKyAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBlbmRcblxuICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGNoYW5nZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBNYXRoLm1heCgwLCBtYXNrZWQubGVuZ3RoIC0gKG1hc2tlZCA9PT0gbWFza1JlcGxhY2VkID8gMCA6IE1hdGgubWluKHByZU1hc2tlZC5sZW5ndGgsIGVuZFJldmVyc2UgKyAxKSkpXG5cbiAgICAgICAgICBpZiAoY3Vyc29yID09PSAxICYmIGVuZCA9PT0gMSkge1xuICAgICAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnZm9yd2FyZCcpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbW92ZUN1cnNvci5yaWdodFJldmVyc2UoaW5wLCBjdXJzb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IG1hc2tlZC5sZW5ndGggLSBlbmRSZXZlcnNlXG4gICAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnYmFja3dhcmQnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGNoYW5nZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBNYXRoLm1heCgwLCBtYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKSwgTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgZW5kKSAtIDEpXG4gICAgICAgICAgbW92ZUN1cnNvci5yaWdodChpbnAsIGN1cnNvcilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBlbmQgLSAxXG4gICAgICAgICAgbW92ZUN1cnNvci5yaWdodChpbnAsIGN1cnNvcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCB2YWwgPSBwcm9wcy51bm1hc2tlZFZhbHVlID09PSB0cnVlXG4gICAgICA/IHVubWFza1ZhbHVlKG1hc2tlZClcbiAgICAgIDogbWFza2VkXG5cbiAgICBTdHJpbmcocHJvcHMubW9kZWxWYWx1ZSkgIT09IHZhbCAmJiBlbWl0VmFsdWUodmFsLCB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gbW92ZUN1cnNvckZvclBhc3RlIChpbnAsIHN0YXJ0LCBlbmQpIHtcbiAgICBjb25zdCBwcmVNYXNrZWQgPSBtYXNrVmFsdWUodW5tYXNrVmFsdWUoaW5wLnZhbHVlKSlcblxuICAgIHN0YXJ0ID0gTWF0aC5tYXgoMCwgbWFza01hcmtlZC5pbmRleE9mKE1BUktFUiksIE1hdGgubWluKHByZU1hc2tlZC5sZW5ndGgsIHN0YXJ0KSlcbiAgICBwYXN0ZWRUZXh0U3RhcnQgPSBzdGFydFxuXG4gICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LCBlbmQsICdmb3J3YXJkJylcbiAgfVxuXG4gIGNvbnN0IG1vdmVDdXJzb3IgPSB7XG4gICAgbGVmdCAoaW5wLCBjdXJzb3IpIHtcbiAgICAgIGNvbnN0IG5vTWFya0JlZm9yZSA9IG1hc2tNYXJrZWQuc2xpY2UoY3Vyc29yIC0gMSkuaW5kZXhPZihNQVJLRVIpID09PSAtMVxuICAgICAgbGV0IGkgPSBNYXRoLm1heCgwLCBjdXJzb3IgLSAxKVxuXG4gICAgICBmb3IgKDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKG1hc2tNYXJrZWRbIGkgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICAgIG5vTWFya0JlZm9yZSA9PT0gdHJ1ZSAmJiBjdXJzb3IrK1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpIDwgMFxuICAgICAgICAmJiBtYXNrTWFya2VkWyBjdXJzb3IgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGN1cnNvciBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5yaWdodChpbnAsIDApXG4gICAgICB9XG5cbiAgICAgIGN1cnNvciA+PSAwICYmIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2JhY2t3YXJkJylcbiAgICB9LFxuXG4gICAgcmlnaHQgKGlucCwgY3Vyc29yKSB7XG4gICAgICBjb25zdCBsaW1pdCA9IGlucC52YWx1ZS5sZW5ndGhcbiAgICAgIGxldCBpID0gTWF0aC5taW4obGltaXQsIGN1cnNvciArIDEpXG5cbiAgICAgIGZvciAoOyBpIDw9IGxpbWl0OyBpKyspIHtcbiAgICAgICAgaWYgKG1hc2tNYXJrZWRbIGkgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWFza01hcmtlZFsgaSAtIDEgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA+IGxpbWl0XG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGN1cnNvciAtIDEgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGN1cnNvciAtIDEgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IubGVmdChpbnAsIGxpbWl0KVxuICAgICAgfVxuXG4gICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICB9LFxuXG4gICAgbGVmdFJldmVyc2UgKGlucCwgY3Vyc29yKSB7XG4gICAgICBjb25zdFxuICAgICAgICBsb2NhbE1hc2tNYXJrZWQgPSBnZXRQYWRkZWRNYXNrTWFya2VkKGlucC52YWx1ZS5sZW5ndGgpXG4gICAgICBsZXQgaSA9IE1hdGgubWF4KDAsIGN1cnNvciAtIDEpXG5cbiAgICAgIGZvciAoOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAobG9jYWxNYXNrTWFya2VkWyBpIC0gMSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsb2NhbE1hc2tNYXJrZWRbIGkgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgY3Vyc29yIF0gIT09IHZvaWQgMFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIGN1cnNvciBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5yaWdodFJldmVyc2UoaW5wLCAwKVxuICAgICAgfVxuXG4gICAgICBjdXJzb3IgPj0gMCAmJiBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdiYWNrd2FyZCcpXG4gICAgfSxcblxuICAgIHJpZ2h0UmV2ZXJzZSAoaW5wLCBjdXJzb3IpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGxpbWl0ID0gaW5wLnZhbHVlLmxlbmd0aCxcbiAgICAgICAgbG9jYWxNYXNrTWFya2VkID0gZ2V0UGFkZGVkTWFza01hcmtlZChsaW1pdCksXG4gICAgICAgIG5vTWFya0JlZm9yZSA9IGxvY2FsTWFza01hcmtlZC5zbGljZSgwLCBjdXJzb3IgKyAxKS5pbmRleE9mKE1BUktFUikgPT09IC0xXG4gICAgICBsZXQgaSA9IE1hdGgubWluKGxpbWl0LCBjdXJzb3IgKyAxKVxuXG4gICAgICBmb3IgKDsgaSA8PSBsaW1pdDsgaSsrKSB7XG4gICAgICAgIGlmIChsb2NhbE1hc2tNYXJrZWRbIGkgLSAxIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIGN1cnNvciA9IGlcbiAgICAgICAgICBjdXJzb3IgPiAwICYmIG5vTWFya0JlZm9yZSA9PT0gdHJ1ZSAmJiBjdXJzb3ItLVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpID4gbGltaXRcbiAgICAgICAgJiYgbG9jYWxNYXNrTWFya2VkWyBjdXJzb3IgLSAxIF0gIT09IHZvaWQgMFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIGN1cnNvciAtIDEgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IubGVmdFJldmVyc2UoaW5wLCBsaW1pdClcbiAgICAgIH1cblxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnZm9yd2FyZCcpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25NYXNrZWRDbGljayAoZSkge1xuICAgIGVtaXQoJ2NsaWNrJywgZSlcblxuICAgIHNlbGVjdGlvbkFuY2hvciA9IHZvaWQgMFxuICB9XG5cbiAgZnVuY3Rpb24gb25NYXNrZWRLZXlkb3duIChlKSB7XG4gICAgZW1pdCgna2V5ZG93bicsIGUpXG5cbiAgICBpZiAoXG4gICAgICBzaG91bGRJZ25vcmVLZXkoZSkgPT09IHRydWVcbiAgICAgIHx8IGUuYWx0S2V5ID09PSB0cnVlIC8vIGxldCBicm93c2VyIGhhbmRsZSB0aGVzZVxuICAgICkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3RcbiAgICAgIGlucCA9IGlucHV0UmVmLnZhbHVlLFxuICAgICAgc3RhcnQgPSBpbnAuc2VsZWN0aW9uU3RhcnQsXG4gICAgICBlbmQgPSBpbnAuc2VsZWN0aW9uRW5kXG5cbiAgICBpZiAoIWUuc2hpZnRLZXkpIHtcbiAgICAgIHNlbGVjdGlvbkFuY2hvciA9IHZvaWQgMFxuICAgIH1cblxuICAgIGlmIChlLmtleUNvZGUgPT09IDM3IHx8IGUua2V5Q29kZSA9PT0gMzkpIHsgLy8gTGVmdCAvIFJpZ2h0XG4gICAgICBpZiAoZS5zaGlmdEtleSAmJiBzZWxlY3Rpb25BbmNob3IgPT09IHZvaWQgMCkge1xuICAgICAgICBzZWxlY3Rpb25BbmNob3IgPSBpbnAuc2VsZWN0aW9uRGlyZWN0aW9uID09PSAnZm9yd2FyZCcgPyBzdGFydCA6IGVuZFxuICAgICAgfVxuXG4gICAgICBjb25zdCBmbiA9IG1vdmVDdXJzb3JbIChlLmtleUNvZGUgPT09IDM5ID8gJ3JpZ2h0JyA6ICdsZWZ0JykgKyAocHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlID8gJ1JldmVyc2UnIDogJycpIF1cblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBmbihpbnAsIHNlbGVjdGlvbkFuY2hvciA9PT0gc3RhcnQgPyBlbmQgOiBzdGFydClcblxuICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gaW5wLnNlbGVjdGlvblN0YXJ0XG4gICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShNYXRoLm1pbihzZWxlY3Rpb25BbmNob3IsIGN1cnNvciksIE1hdGgubWF4KHNlbGVjdGlvbkFuY2hvciwgY3Vyc29yKSwgJ2ZvcndhcmQnKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIGUua2V5Q29kZSA9PT0gOCAvLyBCYWNrc3BhY2VcbiAgICAgICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayAhPT0gdHJ1ZVxuICAgICAgJiYgc3RhcnQgPT09IGVuZFxuICAgICkge1xuICAgICAgbW92ZUN1cnNvci5sZWZ0KGlucCwgc3RhcnQpXG4gICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoaW5wLnNlbGVjdGlvblN0YXJ0LCBlbmQsICdiYWNrd2FyZCcpXG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgZS5rZXlDb2RlID09PSA0NiAvLyBEZWxldGVcbiAgICAgICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZVxuICAgICAgJiYgc3RhcnQgPT09IGVuZFxuICAgICkge1xuICAgICAgbW92ZUN1cnNvci5yaWdodFJldmVyc2UoaW5wLCBlbmQpXG4gICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2Uoc3RhcnQsIGlucC5zZWxlY3Rpb25FbmQsICdmb3J3YXJkJylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXNrVmFsdWUgKHZhbCkge1xuICAgIGlmICh2YWwgPT09IHZvaWQgMCB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSAnJykgeyByZXR1cm4gJycgfVxuXG4gICAgaWYgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIG1hc2tWYWx1ZVJldmVyc2UodmFsKVxuICAgIH1cblxuICAgIGNvbnN0IG1hc2sgPSBjb21wdXRlZE1hc2tcblxuICAgIGxldCB2YWxJbmRleCA9IDAsIG91dHB1dCA9ICcnXG5cbiAgICBmb3IgKGxldCBtYXNrSW5kZXggPSAwOyBtYXNrSW5kZXggPCBtYXNrLmxlbmd0aDsgbWFza0luZGV4KyspIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF0sXG4gICAgICAgIG1hc2tEZWYgPSBtYXNrWyBtYXNrSW5kZXggXVxuXG4gICAgICBpZiAodHlwZW9mIG1hc2tEZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG91dHB1dCArPSBtYXNrRGVmXG4gICAgICAgIHZhbENoYXIgPT09IG1hc2tEZWYgJiYgdmFsSW5kZXgrK1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSkge1xuICAgICAgICBvdXRwdXQgKz0gbWFza0RlZi50cmFuc2Zvcm0gIT09IHZvaWQgMFxuICAgICAgICAgID8gbWFza0RlZi50cmFuc2Zvcm0odmFsQ2hhcilcbiAgICAgICAgICA6IHZhbENoYXJcbiAgICAgICAgdmFsSW5kZXgrK1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBvdXRwdXRcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0XG4gIH1cblxuICBmdW5jdGlvbiBtYXNrVmFsdWVSZXZlcnNlICh2YWwpIHtcbiAgICBjb25zdFxuICAgICAgbWFzayA9IGNvbXB1dGVkTWFzayxcbiAgICAgIGZpcnN0VG9rZW5JbmRleCA9IG1hc2tNYXJrZWQuaW5kZXhPZihNQVJLRVIpXG5cbiAgICBsZXQgdmFsSW5kZXggPSB2YWwubGVuZ3RoIC0gMSwgb3V0cHV0ID0gJydcblxuICAgIGZvciAobGV0IG1hc2tJbmRleCA9IG1hc2subGVuZ3RoIC0gMTsgbWFza0luZGV4ID49IDAgJiYgdmFsSW5kZXggPiAtMTsgbWFza0luZGV4LS0pIHtcbiAgICAgIGNvbnN0IG1hc2tEZWYgPSBtYXNrWyBtYXNrSW5kZXggXVxuXG4gICAgICBsZXQgdmFsQ2hhciA9IHZhbFsgdmFsSW5kZXggXVxuXG4gICAgICBpZiAodHlwZW9mIG1hc2tEZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG91dHB1dCA9IG1hc2tEZWYgKyBvdXRwdXRcbiAgICAgICAgdmFsQ2hhciA9PT0gbWFza0RlZiAmJiB2YWxJbmRleC0tXG4gICAgICB9XG4gICAgICBlbHNlIGlmICh2YWxDaGFyICE9PSB2b2lkIDAgJiYgbWFza0RlZi5yZWdleC50ZXN0KHZhbENoYXIpKSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICBvdXRwdXQgPSAobWFza0RlZi50cmFuc2Zvcm0gIT09IHZvaWQgMCA/IG1hc2tEZWYudHJhbnNmb3JtKHZhbENoYXIpIDogdmFsQ2hhcikgKyBvdXRwdXRcbiAgICAgICAgICB2YWxJbmRleC0tXG4gICAgICAgICAgdmFsQ2hhciA9IHZhbFsgdmFsSW5kZXggXVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5tb2RpZmllZC1sb29wLWNvbmRpdGlvblxuICAgICAgICB9IHdoaWxlIChmaXJzdFRva2VuSW5kZXggPT09IG1hc2tJbmRleCAmJiB2YWxDaGFyICE9PSB2b2lkIDAgJiYgbWFza0RlZi5yZWdleC50ZXN0KHZhbENoYXIpKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBvdXRwdXRcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0XG4gIH1cblxuICBmdW5jdGlvbiB1bm1hc2tWYWx1ZSAodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnIHx8IGNvbXB1dGVkVW5tYXNrID09PSB2b2lkIDBcbiAgICAgID8gKHR5cGVvZiB2YWwgPT09ICdudW1iZXInID8gY29tcHV0ZWRVbm1hc2soJycgKyB2YWwpIDogdmFsKVxuICAgICAgOiBjb21wdXRlZFVubWFzayh2YWwpXG4gIH1cblxuICBmdW5jdGlvbiBmaWxsV2l0aE1hc2sgKHZhbCkge1xuICAgIGlmIChtYXNrUmVwbGFjZWQubGVuZ3RoIC0gdmFsLmxlbmd0aCA8PSAwKSB7XG4gICAgICByZXR1cm4gdmFsXG4gICAgfVxuXG4gICAgcmV0dXJuIHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSAmJiB2YWwubGVuZ3RoICE9PSAwXG4gICAgICA/IG1hc2tSZXBsYWNlZC5zbGljZSgwLCAtdmFsLmxlbmd0aCkgKyB2YWxcbiAgICAgIDogdmFsICsgbWFza1JlcGxhY2VkLnNsaWNlKHZhbC5sZW5ndGgpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlubmVyVmFsdWUsXG4gICAgaGFzTWFzayxcbiAgICBtb3ZlQ3Vyc29yRm9yUGFzdGUsXG4gICAgdXBkYXRlTWFza1ZhbHVlLFxuICAgIG9uTWFza2VkS2V5ZG93bixcbiAgICBvbk1hc2tlZENsaWNrXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlRm9ybVByb3BzID0ge1xuICBuYW1lOiBTdHJpbmdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm1BdHRycyAocHJvcHMpIHtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+ICh7XG4gICAgdHlwZTogJ2hpZGRlbicsXG4gICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICB2YWx1ZTogcHJvcHMubW9kZWxWYWx1ZVxuICB9KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm1JbmplY3QgKGZvcm1BdHRycyA9IHt9KSB7XG4gIHJldHVybiAoY2hpbGQsIGFjdGlvbiwgY2xhc3NOYW1lKSA9PiB7XG4gICAgY2hpbGRbIGFjdGlvbiBdKFxuICAgICAgaCgnaW5wdXQnLCB7XG4gICAgICAgIGNsYXNzOiAnaGlkZGVuJyArIChjbGFzc05hbWUgfHwgJycpLFxuICAgICAgICAuLi5mb3JtQXR0cnMudmFsdWVcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtSW5wdXROYW1lQXR0ciAocHJvcHMpIHtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHByb3BzLm5hbWUgfHwgcHJvcHMuZm9yKVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgdHlwZUd1YXJkKSB7XG4gIGZ1bmN0aW9uIGdldEZvcm1Eb21Qcm9wcyAoKSB7XG4gICAgY29uc3QgbW9kZWwgPSBwcm9wcy5tb2RlbFZhbHVlXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZHQgPSAnRGF0YVRyYW5zZmVyJyBpbiB3aW5kb3dcbiAgICAgICAgPyBuZXcgRGF0YVRyYW5zZmVyKClcbiAgICAgICAgOiAoJ0NsaXBib2FyZEV2ZW50JyBpbiB3aW5kb3dcbiAgICAgICAgICAgID8gbmV3IENsaXBib2FyZEV2ZW50KCcnKS5jbGlwYm9hcmREYXRhXG4gICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcblxuICAgICAgaWYgKE9iamVjdChtb2RlbCkgPT09IG1vZGVsKSB7XG4gICAgICAgICgnbGVuZ3RoJyBpbiBtb2RlbFxuICAgICAgICAgID8gQXJyYXkuZnJvbShtb2RlbClcbiAgICAgICAgICA6IFsgbW9kZWwgXVxuICAgICAgICApLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICAgICAgZHQuaXRlbXMuYWRkKGZpbGUpXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZpbGVzOiBkdC5maWxlc1xuICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZmlsZXM6IHZvaWQgMFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0eXBlR3VhcmQgPT09IHRydWVcbiAgICA/IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy50eXBlICE9PSAnZmlsZScpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRGb3JtRG9tUHJvcHMoKVxuICAgIH0pXG4gICAgOiBjb21wdXRlZChnZXRGb3JtRG9tUHJvcHMpXG59XG4iLCJpbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5jb25zdCBpc0phcGFuZXNlID0gL1tcXHUzMDAwLVxcdTMwM2ZcXHUzMDQwLVxcdTMwOWZcXHUzMGEwLVxcdTMwZmZcXHVmZjAwLVxcdWZmOWZcXHU0ZTAwLVxcdTlmYWZcXHUzNDAwLVxcdTRkYmZdL1xuY29uc3QgaXNDaGluZXNlID0gL1tcXHU0ZTAwLVxcdTlmZmZcXHUzNDAwLVxcdTRkYmZcXHV7MjAwMDB9LVxcdXsyYTZkZn1cXHV7MmE3MDB9LVxcdXsyYjczZn1cXHV7MmI3NDB9LVxcdXsyYjgxZn1cXHV7MmI4MjB9LVxcdXsyY2VhZn1cXHVmOTAwLVxcdWZhZmZcXHUzMzAwLVxcdTMzZmZcXHVmZTMwLVxcdWZlNGZcXHVmOTAwLVxcdWZhZmZcXHV7MmY4MDB9LVxcdXsyZmExZn1dL3VcbmNvbnN0IGlzS29yZWFuID0gL1tcXHUzMTMxLVxcdTMxNGVcXHUzMTRmLVxcdTMxNjNcXHVhYzAwLVxcdWQ3YTNdL1xuY29uc3QgaXNQbGFpblRleHQgPSAvW2EtejAtOV8gLV0kL2lcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9uSW5wdXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG9uQ29tcG9zaXRpb24gKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAnY29tcG9zaXRpb25lbmQnIHx8IGUudHlwZSA9PT0gJ2NoYW5nZScpIHtcbiAgICAgIGlmIChlLnRhcmdldC5xQ29tcG9zaW5nICE9PSB0cnVlKSB7IHJldHVybiB9XG4gICAgICBlLnRhcmdldC5xQ29tcG9zaW5nID0gZmFsc2VcbiAgICAgIG9uSW5wdXQoZSlcbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLnR5cGUgPT09ICdjb21wb3NpdGlvbnVwZGF0ZSdcbiAgICAgICYmIGUudGFyZ2V0LnFDb21wb3NpbmcgIT09IHRydWVcbiAgICAgICYmIHR5cGVvZiBlLmRhdGEgPT09ICdzdHJpbmcnXG4gICAgKSB7XG4gICAgICBjb25zdCBpc0NvbXBvc2luZyA9IGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlXG4gICAgICAgID8gaXNQbGFpblRleHQudGVzdChlLmRhdGEpID09PSBmYWxzZVxuICAgICAgICA6IGlzSmFwYW5lc2UudGVzdChlLmRhdGEpID09PSB0cnVlIHx8IGlzQ2hpbmVzZS50ZXN0KGUuZGF0YSkgPT09IHRydWUgfHwgaXNLb3JlYW4udGVzdChlLmRhdGEpID09PSB0cnVlXG5cbiAgICAgIGlmIChpc0NvbXBvc2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICBlLnRhcmdldC5xQ29tcG9zaW5nID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgb25Nb3VudGVkLCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRmllbGQsIHsgdXNlRmllbGRTdGF0ZSwgdXNlRmllbGRQcm9wcywgdXNlRmllbGRFbWl0cywgZmllbGRWYWx1ZUlzRmlsbGVkIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmllbGQuanMnXG5pbXBvcnQgdXNlTWFzaywgeyB1c2VNYXNrUHJvcHMgfSBmcm9tICcuL3VzZS1tYXNrLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5wdXROYW1lQXR0ciB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZvcm0uanMnXG5pbXBvcnQgdXNlRmlsZUZvcm1Eb21Qcm9wcyBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWxlLWRvbS1wcm9wcy5qcydcbmltcG9ydCB1c2VLZXlDb21wb3NpdGlvbiBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1rZXktY29tcG9zaXRpb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXMtbWFuYWdlci5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2luamVjdC1vYmotcHJvcC5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJbnB1dCcsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUZpZWxkUHJvcHMsXG4gICAgLi4udXNlTWFza1Byb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcblxuICAgIG1vZGVsVmFsdWU6IHsgcmVxdWlyZWQ6IGZhbHNlIH0sXG5cbiAgICBzaGFkb3dUZXh0OiBTdHJpbmcsXG5cbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndGV4dCdcbiAgICB9LFxuXG4gICAgZGVib3VuY2U6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIGF1dG9ncm93OiBCb29sZWFuLCAvLyBtYWtlcyBhIHRleHRhcmVhXG5cbiAgICBpbnB1dENsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGlucHV0U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF1cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZUZpZWxkRW1pdHMsXG4gICAgJ3Bhc3RlJywgJ2NoYW5nZScsXG4gICAgJ2tleWRvd24nLCAnY2xpY2snLCAnYW5pbWF0aW9uZW5kJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBlbWl0LCBhdHRycyB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgdGVtcCA9IHt9XG4gICAgbGV0IGVtaXRDYWNoZWRWYWx1ZSA9IE5hTiwgdHlwZWROdW1iZXIsIHN0b3BWYWx1ZVdhdGNoZXIsIGVtaXRUaW1lciA9IG51bGwsIGVtaXRWYWx1ZUZuXG5cbiAgICBjb25zdCBpbnB1dFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IG5hbWVQcm9wID0gdXNlRm9ybUlucHV0TmFtZUF0dHIocHJvcHMpXG5cbiAgICBjb25zdCB7XG4gICAgICBpbm5lclZhbHVlLFxuICAgICAgaGFzTWFzayxcbiAgICAgIG1vdmVDdXJzb3JGb3JQYXN0ZSxcbiAgICAgIHVwZGF0ZU1hc2tWYWx1ZSxcbiAgICAgIG9uTWFza2VkS2V5ZG93bixcbiAgICAgIG9uTWFza2VkQ2xpY2tcbiAgICB9ID0gdXNlTWFzayhwcm9wcywgZW1pdCwgZW1pdFZhbHVlLCBpbnB1dFJlZilcblxuICAgIGNvbnN0IGZvcm1Eb21Qcm9wcyA9IHVzZUZpbGVGb3JtRG9tUHJvcHMocHJvcHMsIC8qIHR5cGUgZ3VhcmQgKi8gdHJ1ZSlcbiAgICBjb25zdCBoYXNWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGZpZWxkVmFsdWVJc0ZpbGxlZChpbm5lclZhbHVlLnZhbHVlKSlcblxuICAgIGNvbnN0IG9uQ29tcG9zaXRpb24gPSB1c2VLZXlDb21wb3NpdGlvbihvbklucHV0KVxuXG4gICAgY29uc3Qgc3RhdGUgPSB1c2VGaWVsZFN0YXRlKClcblxuICAgIGNvbnN0IGlzVGV4dGFyZWEgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMudHlwZSA9PT0gJ3RleHRhcmVhJyB8fCBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IGlzVHlwZVRleHQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgfHwgWyAndGV4dCcsICdzZWFyY2gnLCAndXJsJywgJ3RlbCcsICdwYXNzd29yZCcgXS5pbmNsdWRlcyhwcm9wcy50eXBlKVxuICAgIClcblxuICAgIGNvbnN0IG9uRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgZXZ0ID0ge1xuICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmxpc3RlbmVycy52YWx1ZSxcbiAgICAgICAgb25JbnB1dCxcbiAgICAgICAgb25QYXN0ZSxcbiAgICAgICAgLy8gU2FmYXJpIDwgMTAuMiAmIFVJV2ViVmlldyBkb2Vzbid0IGZpcmUgY29tcG9zaXRpb25lbmQgd2hlblxuICAgICAgICAvLyBzd2l0Y2hpbmcgZm9jdXMgYmVmb3JlIGNvbmZpcm1pbmcgY29tcG9zaXRpb24gY2hvaWNlXG4gICAgICAgIC8vIHRoaXMgYWxzbyBmaXhlcyB0aGUgaXNzdWUgd2hlcmUgc29tZSBicm93c2VycyBlLmcuIGlPUyBDaHJvbWVcbiAgICAgICAgLy8gZmlyZXMgXCJjaGFuZ2VcIiBpbnN0ZWFkIG9mIFwiaW5wdXRcIiBvbiBhdXRvY29tcGxldGUuXG4gICAgICAgIG9uQ2hhbmdlLFxuICAgICAgICBvbkJsdXI6IG9uRmluaXNoRWRpdGluZyxcbiAgICAgICAgb25Gb2N1czogc3RvcFxuICAgICAgfVxuXG4gICAgICBldnQub25Db21wb3NpdGlvbnN0YXJ0ID0gZXZ0Lm9uQ29tcG9zaXRpb251cGRhdGUgPSBldnQub25Db21wb3NpdGlvbmVuZCA9IG9uQ29tcG9zaXRpb25cblxuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgZXZ0Lm9uS2V5ZG93biA9IG9uTWFza2VkS2V5ZG93blxuICAgICAgICAvLyByZXNldCBzZWxlY3Rpb24gYW5jaG9yIG9uIHBvaW50ZXIgc2VsZWN0aW9uXG4gICAgICAgIGV2dC5vbkNsaWNrID0gb25NYXNrZWRDbGlja1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuYXV0b2dyb3cgPT09IHRydWUpIHtcbiAgICAgICAgZXZ0Lm9uQW5pbWF0aW9uZW5kID0gb25BbmltYXRpb25lbmRcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV2dFxuICAgIH0pXG5cbiAgICBjb25zdCBpbnB1dEF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICAgIHRhYmluZGV4OiAwLFxuICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICByb3dzOiBwcm9wcy50eXBlID09PSAndGV4dGFyZWEnID8gNiA6IHZvaWQgMCxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5sYWJlbCxcbiAgICAgICAgbmFtZTogbmFtZVByb3AudmFsdWUsXG4gICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgaWQ6IHN0YXRlLnRhcmdldFVpZC52YWx1ZSxcbiAgICAgICAgbWF4bGVuZ3RoOiBwcm9wcy5tYXhsZW5ndGgsXG4gICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlID09PSB0cnVlLFxuICAgICAgICByZWFkb25seTogcHJvcHMucmVhZG9ubHkgPT09IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKGlzVGV4dGFyZWEudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGF0dHJzLnR5cGUgPSBwcm9wcy50eXBlXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSkge1xuICAgICAgICBhdHRycy5yb3dzID0gMVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXR0cnNcbiAgICB9KVxuXG4gICAgLy8gc29tZSBicm93c2VycyBsb3NlIHRoZSBuYXRpdmUgaW5wdXQgdmFsdWVcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIHJlYXR0YWNoIGl0IGR5bmFtaWNhbGx5XG4gICAgLy8gKGxpa2UgdHlwZT1cInBhc3N3b3JkXCIgPC0+IHR5cGU9XCJ0ZXh0XCI7IHNlZSAjMTIwNzgpXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMudHlwZSwgKCkgPT4ge1xuICAgICAgaWYgKGlucHV0UmVmLnZhbHVlKSB7XG4gICAgICAgIGlucHV0UmVmLnZhbHVlLnZhbHVlID0gcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCB2ID0+IHtcbiAgICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChzdG9wVmFsdWVXYXRjaGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgc3RvcFZhbHVlV2F0Y2hlciA9IGZhbHNlXG5cbiAgICAgICAgICBpZiAoU3RyaW5nKHYpID09PSBlbWl0Q2FjaGVkVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZU1hc2tWYWx1ZSh2KVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaW5uZXJWYWx1ZS52YWx1ZSAhPT0gdikge1xuICAgICAgICBpbm5lclZhbHVlLnZhbHVlID0gdlxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wcy50eXBlID09PSAnbnVtYmVyJ1xuICAgICAgICAgICYmIHRlbXAuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgPT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHR5cGVkTnVtYmVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0eXBlZE51bWJlciA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRlbXAudmFsdWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGV4dGFyZWEgb25seVxuICAgICAgcHJvcHMuYXV0b2dyb3cgPT09IHRydWUgJiYgbmV4dFRpY2soYWRqdXN0SGVpZ2h0KVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5hdXRvZ3JvdywgdmFsID0+IHtcbiAgICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgbmV4dFRpY2soYWRqdXN0SGVpZ2h0KVxuICAgICAgfVxuICAgICAgLy8gaWYgaXQgaGFzIGEgbnVtYmVyIG9mIHJvd3Mgc2V0IHJlc3BlY3QgaXRcbiAgICAgIGVsc2UgaWYgKGlucHV0UmVmLnZhbHVlICE9PSBudWxsICYmIGF0dHJzLnJvd3MgPiAwKSB7XG4gICAgICAgIGlucHV0UmVmLnZhbHVlLnN0eWxlLmhlaWdodCA9ICdhdXRvJ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5kZW5zZSwgKCkgPT4ge1xuICAgICAgcHJvcHMuYXV0b2dyb3cgPT09IHRydWUgJiYgbmV4dFRpY2soYWRqdXN0SGVpZ2h0KVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgICBhZGRGb2N1c0ZuKCgpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICAgICYmIGlucHV0UmVmLnZhbHVlICE9PSBlbFxuICAgICAgICAgICYmIChlbCA9PT0gbnVsbCB8fCBlbC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlKVxuICAgICAgICApIHtcbiAgICAgICAgICBpbnB1dFJlZi52YWx1ZS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWxlY3QgKCkge1xuICAgICAgaW5wdXRSZWYudmFsdWUgIT09IG51bGwgJiYgaW5wdXRSZWYudmFsdWUuc2VsZWN0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhc3RlIChlKSB7XG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgIT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgaW5wID0gZS50YXJnZXRcbiAgICAgICAgbW92ZUN1cnNvckZvclBhc3RlKGlucCwgaW5wLnNlbGVjdGlvblN0YXJ0LCBpbnAuc2VsZWN0aW9uRW5kKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdwYXN0ZScsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25JbnB1dCAoZSkge1xuICAgICAgaWYgKCFlIHx8ICFlLnRhcmdldCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGUudGFyZ2V0LmZpbGVzKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsID0gZS50YXJnZXQudmFsdWVcblxuICAgICAgaWYgKGUudGFyZ2V0LnFDb21wb3NpbmcgPT09IHRydWUpIHtcbiAgICAgICAgdGVtcC52YWx1ZSA9IHZhbFxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB1cGRhdGVNYXNrVmFsdWUodmFsLCBmYWxzZSwgZS5pbnB1dFR5cGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZW1pdFZhbHVlKHZhbClcblxuICAgICAgICBpZiAoaXNUeXBlVGV4dC52YWx1ZSA9PT0gdHJ1ZSAmJiBlLnRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgIGNvbnN0IHsgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCB9ID0gZS50YXJnZXRcblxuICAgICAgICAgIGlmIChzZWxlY3Rpb25TdGFydCAhPT0gdm9pZCAwICYmIHNlbGVjdGlvbkVuZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiB2YWwuaW5kZXhPZihlLnRhcmdldC52YWx1ZSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHRyaWdnZXIgaXQgaW1tZWRpYXRlbHkgdG9vLFxuICAgICAgLy8gdG8gYXZvaWQgXCJmbGlja2VyaW5nXCJcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIGFkanVzdEhlaWdodCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25BbmltYXRpb25lbmQgKGUpIHtcbiAgICAgIGVtaXQoJ2FuaW1hdGlvbmVuZCcsIGUpXG4gICAgICBhZGp1c3RIZWlnaHQoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRWYWx1ZSAodmFsLCBzdG9wV2F0Y2hlcikge1xuICAgICAgZW1pdFZhbHVlRm4gPSAoKSA9PiB7XG4gICAgICAgIGVtaXRUaW1lciA9IG51bGxcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSAhPT0gJ251bWJlcidcbiAgICAgICAgICAmJiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSAhPT0gdmFsICYmIGVtaXRDYWNoZWRWYWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgICAgZW1pdENhY2hlZFZhbHVlID0gdmFsXG5cbiAgICAgICAgICBzdG9wV2F0Y2hlciA9PT0gdHJ1ZSAmJiAoc3RvcFZhbHVlV2F0Y2hlciA9IHRydWUpXG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWwpXG5cbiAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICBlbWl0Q2FjaGVkVmFsdWUgPT09IHZhbCAmJiAoZW1pdENhY2hlZFZhbHVlID0gTmFOKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0VmFsdWVGbiA9IHZvaWQgMFxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMudHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdHlwZWROdW1iZXIgPSB0cnVlXG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWxcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmRlYm91bmNlICE9PSB2b2lkIDApIHtcbiAgICAgICAgZW1pdFRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChlbWl0VGltZXIpXG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWxcbiAgICAgICAgZW1pdFRpbWVyID0gc2V0VGltZW91dChlbWl0VmFsdWVGbiwgcHJvcHMuZGVib3VuY2UpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZW1pdFZhbHVlRm4oKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICBmdW5jdGlvbiBhZGp1c3RIZWlnaHQgKCkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgY29uc3QgaW5wID0gaW5wdXRSZWYudmFsdWVcbiAgICAgICAgaWYgKGlucCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHBhcmVudFN0eWxlID0gaW5wLnBhcmVudE5vZGUuc3R5bGVcbiAgICAgICAgICAvLyBjaHJvbWUgZG9lcyBub3Qga2VlcCBzY3JvbGwgIzE1NDk4XG4gICAgICAgICAgY29uc3QgeyBzY3JvbGxUb3AgfSA9IGlucFxuICAgICAgICAgIC8vIGNocm9tZSBjYWxjdWxhdGVzIGEgc21hbGxlciBzY3JvbGxIZWlnaHQgd2hlbiBpbiBhIC5jb2x1bW4gY29udGFpbmVyXG4gICAgICAgICAgY29uc3QgeyBvdmVyZmxvd1ksIG1heEhlaWdodCB9ID0gJHEucGxhdGZvcm0uaXMuZmlyZWZveCA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyB7fVxuICAgICAgICAgICAgOiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShpbnApXG4gICAgICAgICAgLy8gb24gZmlyZWZveCBvciBpZiBvdmVyZmxvd1kgaXMgc3BlY2lmaWVkIGFzIHNjcm9sbCAjMTQyNjMsICMxNDM0NFxuICAgICAgICAgIC8vIHdlIGRvbid0IHRvdWNoIG92ZXJmbG93XG4gICAgICAgICAgLy8gZmlyZWZveCBpcyBub3Qgc28gYmFkIGluIHRoZSBlbmRcbiAgICAgICAgICBjb25zdCBjaGFuZ2VPdmVyZmxvdyA9IG92ZXJmbG93WSAhPT0gdm9pZCAwICYmIG92ZXJmbG93WSAhPT0gJ3Njcm9sbCdcblxuICAgICAgICAgIC8vIHJlc2V0IGhlaWdodCBvZiB0ZXh0YXJlYSB0byBhIHNtYWxsIHNpemUgdG8gZGV0ZWN0IHRoZSByZWFsIGhlaWdodFxuICAgICAgICAgIC8vIGJ1dCBrZWVwIHRoZSB0b3RhbCBjb250cm9sIHNpemUgdGhlIHNhbWVcbiAgICAgICAgICBjaGFuZ2VPdmVyZmxvdyA9PT0gdHJ1ZSAmJiAoaW5wLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nKVxuICAgICAgICAgIHBhcmVudFN0eWxlLm1hcmdpbkJvdHRvbSA9IChpbnAuc2Nyb2xsSGVpZ2h0IC0gMSkgKyAncHgnXG4gICAgICAgICAgaW5wLnN0eWxlLmhlaWdodCA9ICcxcHgnXG5cbiAgICAgICAgICBpbnAuc3R5bGUuaGVpZ2h0ID0gaW5wLnNjcm9sbEhlaWdodCArICdweCdcbiAgICAgICAgICAvLyB3ZSBzaG91bGQgYWxsb3cgc2Nyb2xsYmFycyBvbmx5XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgbWF4SGVpZ2h0IGFuZCBjb250ZW50IGlzIHRhbGxlciB0aGFuIG1heEhlaWdodFxuICAgICAgICAgIGNoYW5nZU92ZXJmbG93ID09PSB0cnVlICYmIChpbnAuc3R5bGUub3ZlcmZsb3dZID0gcGFyc2VJbnQobWF4SGVpZ2h0LCAxMCkgPCBpbnAuc2Nyb2xsSGVpZ2h0ID8gJ2F1dG8nIDogJ2hpZGRlbicpXG4gICAgICAgICAgcGFyZW50U3R5bGUubWFyZ2luQm90dG9tID0gJydcbiAgICAgICAgICBpbnAuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UgKGUpIHtcbiAgICAgIG9uQ29tcG9zaXRpb24oZSlcblxuICAgICAgaWYgKGVtaXRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZW1pdFRpbWVyKVxuICAgICAgICBlbWl0VGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGVtaXRWYWx1ZUZuICE9PSB2b2lkIDAgJiYgZW1pdFZhbHVlRm4oKVxuXG4gICAgICBlbWl0KCdjaGFuZ2UnLCBlLnRhcmdldC52YWx1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZpbmlzaEVkaXRpbmcgKGUpIHtcbiAgICAgIGUgIT09IHZvaWQgMCAmJiBzdG9wKGUpXG5cbiAgICAgIGlmIChlbWl0VGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGVtaXRUaW1lcilcbiAgICAgICAgZW1pdFRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBlbWl0VmFsdWVGbiAhPT0gdm9pZCAwICYmIGVtaXRWYWx1ZUZuKClcblxuICAgICAgdHlwZWROdW1iZXIgPSBmYWxzZVxuICAgICAgc3RvcFZhbHVlV2F0Y2hlciA9IGZhbHNlXG4gICAgICBkZWxldGUgdGVtcC52YWx1ZVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHVzZSBzZXRUaW1lb3V0IGluc3RlYWQgb2YgdGhpcy4kbmV4dFRpY2tcbiAgICAgIC8vIHRvIGF2b2lkIGEgYnVnIHdoZXJlIGZvY3Vzb3V0IGlzIG5vdCBlbWl0dGVkIGZvciB0eXBlIGRhdGUvdGltZS93ZWVrLy4uLlxuICAgICAgcHJvcHMudHlwZSAhPT0gJ2ZpbGUnICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoaW5wdXRSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBpbnB1dFJlZi52YWx1ZS52YWx1ZSA9IGlubmVyVmFsdWUudmFsdWUgIT09IHZvaWQgMCA/IGlubmVyVmFsdWUudmFsdWUgOiAnJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEN1clZhbHVlICgpIHtcbiAgICAgIHJldHVybiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgID8gdGVtcC52YWx1ZVxuICAgICAgICA6IChpbm5lclZhbHVlLnZhbHVlICE9PSB2b2lkIDAgPyBpbm5lclZhbHVlLnZhbHVlIDogJycpXG4gICAgfVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIG9uRmluaXNoRWRpdGluZygpXG4gICAgfSlcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgICBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSAmJiBhZGp1c3RIZWlnaHQoKVxuICAgIH0pXG5cbiAgICBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgICBpbm5lclZhbHVlLFxuXG4gICAgICBmaWVsZENsYXNzOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICBgcS0keyBpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlID8gJ3RleHRhcmVhJyA6ICdpbnB1dCcgfWBcbiAgICAgICAgKyAocHJvcHMuYXV0b2dyb3cgPT09IHRydWUgPyAnIHEtdGV4dGFyZWEtLWF1dG9ncm93JyA6ICcnKVxuICAgICAgKSxcblxuICAgICAgaGFzU2hhZG93OiBjb21wdXRlZCgoKSA9PlxuICAgICAgICBwcm9wcy50eXBlICE9PSAnZmlsZSdcbiAgICAgICAgJiYgdHlwZW9mIHByb3BzLnNoYWRvd1RleHQgPT09ICdzdHJpbmcnXG4gICAgICAgICYmIHByb3BzLnNoYWRvd1RleHQubGVuZ3RoICE9PSAwXG4gICAgICApLFxuXG4gICAgICBpbnB1dFJlZixcblxuICAgICAgZW1pdFZhbHVlLFxuXG4gICAgICBoYXNWYWx1ZSxcblxuICAgICAgZmxvYXRpbmdMYWJlbDogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgKFxuICAgICAgICAgIGhhc1ZhbHVlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgJiYgKHByb3BzLnR5cGUgIT09ICdudW1iZXInIHx8IGlzTmFOKGlubmVyVmFsdWUudmFsdWUpID09PSBmYWxzZSlcbiAgICAgICAgKVxuICAgICAgICB8fCBmaWVsZFZhbHVlSXNGaWxsZWQocHJvcHMuZGlzcGxheVZhbHVlKVxuICAgICAgKSxcblxuICAgICAgZ2V0Q29udHJvbDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gaChpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlID8gJ3RleHRhcmVhJyA6ICdpbnB1dCcsIHtcbiAgICAgICAgICByZWY6IGlucHV0UmVmLFxuICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAncS1maWVsZF9fbmF0aXZlIHEtcGxhY2Vob2xkZXInLFxuICAgICAgICAgICAgcHJvcHMuaW5wdXRDbGFzc1xuICAgICAgICAgIF0sXG4gICAgICAgICAgc3R5bGU6IHByb3BzLmlucHV0U3R5bGUsXG4gICAgICAgICAgLi4uaW5wdXRBdHRycy52YWx1ZSxcbiAgICAgICAgICAuLi5vbkV2ZW50cy52YWx1ZSxcbiAgICAgICAgICAuLi4oXG4gICAgICAgICAgICBwcm9wcy50eXBlICE9PSAnZmlsZSdcbiAgICAgICAgICAgICAgPyB7IHZhbHVlOiBnZXRDdXJWYWx1ZSgpIH1cbiAgICAgICAgICAgICAgOiBmb3JtRG9tUHJvcHMudmFsdWVcbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICB9LFxuXG4gICAgICBnZXRTaGFkb3dDb250cm9sOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19uYXRpdmUgcS1maWVsZF9fc2hhZG93IGFic29sdXRlLWJvdHRvbSBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICAgICAgICsgKGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgdGV4dC1uby13cmFwJylcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoJ3NwYW4nLCB7IGNsYXNzOiAnaW52aXNpYmxlJyB9LCBnZXRDdXJWYWx1ZSgpKSxcbiAgICAgICAgICBoKCdzcGFuJywgcHJvcHMuc2hhZG93VGV4dClcbiAgICAgICAgXSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcmVuZGVyRm4gPSB1c2VGaWVsZChzdGF0ZSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIGZvY3VzLFxuICAgICAgc2VsZWN0LFxuICAgICAgZ2V0TmF0aXZlRWxlbWVudDogKCkgPT4gaW5wdXRSZWYudmFsdWUgLy8gZGVwcmVjYXRlZFxuICAgIH0pXG5cbiAgICBpbmplY3RQcm9wKHByb3h5LCAnbmF0aXZlRWwnLCAoKSA9PiBpbnB1dFJlZi52YWx1ZSlcblxuICAgIHJldHVybiByZW5kZXJGblxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxyXG4gICAgPHEtcGFnZSBjbGFzcz1cImZsZXggZmxleC1jZW50ZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtY29udGVudFwiPlxyXG4gICAgICAgIDxxLWJ0blxyXG4gICAgICBjbGFzcz1cImJhY2stYnV0dG9uXCJcclxuICAgICAgZmxhdFxyXG4gICAgICByb3VuZFxyXG4gICAgICBkZW5zZVxyXG4gICAgICBpY29uPVwiYXJyb3dfYmFja1wiXHJcbiAgICAgIEBjbGljaz1cImJhY2tUb1N0YXJ0XCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxxLWJ0blxyXG4gICAgICBjbGFzcz1cImZvcndhcmQtYnV0dG9uXCJcclxuICAgICAgZmxhdFxyXG4gICAgICByb3VuZFxyXG4gICAgICBkZW5zZVxyXG4gICAgICBpY29uPVwiYXJyb3dfZm9yd2FyZFwiXHJcbiAgICAgIEBjbGljaz1cImdvVG9Mb2JieVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW1nLWFuaW1cIj5cclxuICAgICAgICAgIDxpbWdcclxuICAgICAgICAgIGFsdD1cIlF1YXNhciBsb2dvXCJcclxuICAgICAgICAgIHNyYz1cIn5hc3NldHMvUXVpenJhY2UucG5nXCJcclxuICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4O1wiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZXNzaW9uLWlucHV0LWJveFwiPlxyXG4gICAgICAgICAgICA8cS1pbnB1dCB0eXBlPVwidGV4dFwiIGZpbGxlZCBwbGFjZWhvbGRlcj1cIkVudGVyIHBsYXllciBuYW1lXCIgQGtleWRvd24uZW50ZXI9XCJ2ZXJpZnlJRFwiIHYtbW9kZWw9XCJwbGF5ZXJOYW1lXCI+XHJcbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgICAgICAgIDxxLWF2YXRhcj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9sb2dvLXYyL3N2Zy9sb2dvLnN2Z1wiPlxyXG4gICAgICAgICAgICAgIDwvcS1hdmF0YXI+XHJcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L3EtaW5wdXQ+XHJcbiAgICAgICAgICAgIDwhLS0tPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdi1tb2RlbD1cInBsYXllck5hbWVcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHBsYXllciBuYW1lXCIgQGtleWRvd24uZW50ZXI9XCJ2ZXJpZnlJRFwiIC8+XHJcbiAgICAgICAgICAgIDxidXR0b24gQGNsaWNrPVwidmVyaWZ5SURcIj5FbnRlcjwvYnV0dG9uPi0tPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8IS0tLVRoaXMgaXMgZHVtbXkgc3R1ZmYgZm9yIGR1bW15IGRhdGEgdGVzdGluZyBmb3IgZHVtbWllcy0tPlxyXG5cclxuICAgICAgICA8IS0tLTxkaXYgY2xhc3M9XCJkdW1teS1kYXRhLWZpZWxkXCIgdi1pZj1cImR1bW15RGF0YSAhPT0gJydcIj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIDp2YWx1ZT1cImR1bW15RGF0YVwiIHJlYWRvbmx5IC8+XHJcbiAgICAgICAgPC9kaXY+IC0tPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8L3EtcGFnZT5cclxuICA8L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuIGltcG9ydCB7IGRlZmluZUNvbXBvbmVudCwgcmVmIH0gZnJvbSAndnVlJ1xyXG4gaW1wb3J0IHthcGl9IGZyb20gJ2Jvb3QvYXhpb3MnXHJcbiBpbXBvcnQge3B1c2hlciwgaW5pdFB1c2hlcn0gZnJvbSAnYm9vdC9wdXNoZXInXHJcbiBpbXBvcnQge3VzZVJvdXRlfSBmcm9tICd2dWUtcm91dGVyJ1xyXG4gaW1wb3J0IHtlbWl0dGVyfSBmcm9tICdib290L21pdHQnXHJcbiAgXHJcbiAgZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcclxuICAgIG5hbWU6ICdMb2dpblBhZ2UnLFxyXG4gICAgcm91dGU6IHVzZVJvdXRlLFxyXG4gICAgXHJcbiAgICBkYXRhKCl7XHJcbiAgICAgIHJldHVybntcclxuICAgICAgICAvLyBEdW1teSBkYXRhIGZvciB0aGUgdGV4dCBib3g7IElucHV0IHRha2VzIGlucHV0IGZyb20gdGhlIGlucHV0IGJveDtcclxuICAgICAgICAvLyBkdW1teURhdGEgaG9sZHMgdGhlIGlucHV0IGFuZCBkaXNwbGF5cyBpdCB0aHJvdWdoIGdlbmVyYXRlRHVtbXlEYXRhXHJcbiAgICAgICAgLy9pbnB1dERhdGE6ICcnLFxyXG4gICAgICAgIC8vZHVtbXlEYXRhOiAnJ1xyXG4gICAgICAgIHBsYXllck5hbWU6ICcnLFxyXG4gICAgICAgIHV1aWQ6ICcnLFxyXG4gICAgICAgIHB1c2hlcjoge2NoYW5uZWw6IG51bGx9LFxyXG4gICAgICAgIGRhdGE6IHtuYW1lOiBuYW1lfSxcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkICgpe1xyXG4gICAgICBpbml0UHVzaGVyKCk7XHJcblxyXG4gICAgICBcclxuXHJcbiAgICAgIC8vdGhpcy5sb2dpbigpO1xyXG5cclxuICAgICAgZW1pdHRlci5vbigncGxheWVyLnJlZ2lzdGVyZWQnLCB0aGlzLmRhdGEpO1xyXG4gICAgICAvL3RoaXMudXVpZCA9IHRoaXMuJHJvdXRlLnF1ZXJ5LnV1aWQ7XHJcbiAgICAgIHRoaXMudXVpZCA9ICczYjc5YTZjMS0yZmQ0LTRiMDktYTk1NC1mN2FhMzA0NTBjMGUnXHJcbiAgICAgIC8vdGhpcy5yb3V0ZXIucHVzaCh7cGF0aDogcm91dGVyLmN1cnJlbnRSb3V0ZS52YWx1ZS5wYXRoICsgdGhpcy51dWlkfSlcclxuICAgICAgY29uc29sZS5sb2coXCJUaGUgVVVJRCBpczogXCIgKyB0aGlzLnV1aWQpO1xyXG4gICAgICAvL3RoaXMuc3Vic2NyaWJlRW1pdCh0aGlzLnV1aWQpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1bm1vdW50ZWQoKXtcclxuICAgICAgZW1pdHRlci5vZmYoJ3BsYXllci5yZWdpc3RlcmVkJyk7XHJcbiAgICB9LFxyXG5cclxuICBcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBcclxuICAgICAgICAvLyBGdW5jdGlvbiB0byBiZSB1c2VkIHRvIG1ha2UgQVBJIGNhbGwgZm9yIHZlcmlmaWNhdGlvblxyXG4gICAgICAgIHZlcmlmeUlEKCkge1xyXG4gICAgICAgIC8vIEdlbmVyYXRlIGR1bW15IGRhdGFcclxuICAgICAgICB0aGlzLnN1YnNjcmliZUVtaXQodGhpcy51dWlkKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyUGxheWVyKHRoaXMucGxheWVyTmFtZSk7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIHRoZSBpbnB1dCBmaWVsZFxyXG4gICAgICAgIHRoaXMucGxheWVyTmFtZSA9ICcnO1xyXG4gICAgICB9LFxyXG4gICAgICAgIC8vIENhbGxlZCBieSB0aGUgYnV0dG9uIHRvIGdvIHRvIHRoZSBwcmV2aW91cyBicm93c2VyIHBhZ2VcclxuICAgICAgICBiYWNrVG9TdGFydCgpe1xyXG4gICAgICAgICAgdGhpcy4kcm91dGVyLmdvKC0xKTtcclxuICAgICAgfSxcclxuICAgICAgICBnb1RvTG9iYnkoKXtcclxuICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHsgbmFtZTogXCJsb2JieVwiIH0pO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgICByZWdpc3RlclBsYXllcihwbGF5ZXJOYW1lKSB7XHJcbiAgICAgICAgICBjb25zdCB1cmwgPSAnZ2xlL3Nlc3Npb25zLzNiNzlhNmMxLTJmZDQtNGIwOS1hOTU0LWY3YWEzMDQ1MGMwZS9yZWdpc3Rlcic7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0geyBuYW1lOiBwbGF5ZXJOYW1lIH07ICAgICAgICAgIFxyXG5cclxuICAgICAgICAgIGFwaS5wb3N0KHVybCwgZGF0YSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgIC8vIEhhbmRsZSByZXNwb25zZVxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB0aGlzLmdvVG9Mb2JieSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgIC8vIEhhbmRsZSBlcnJvclxyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIC8vdGhpcy5nb1RvTG9iYnkoKTtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIHN1YnNjcmliZUVtaXQodWlkKXtcclxuICAgICAgICBlbWl0dGVyLmVtaXQoJ3B1c2hlci5zdWJzY3JpYmUnLCB1aWQpXHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJTdWJzY3JpYmVkIHRvIHB1c2hlciBldmVudFwiKVxyXG4gICAgICB9LFxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcblxyXG4ucGFnZS1jb250ZW50IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbi5zZXNzaW9uLWlucHV0LWJveCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgZ2FwOiA4cHg7XHJcbiAgYW5pbWF0aW9uOiBiYWNrSW5VcCAxcyBlYXNlO1xyXG59XHJcblxyXG4uYmFjay1idXR0b24ge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDEwcHg7XHJcbiAgcmlnaHQ6IDEwcHg7XHJcbn1cclxuXHJcbi5mb3J3YXJkLWJ1dHRvbiB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogNDBweDtcclxuICByaWdodDogMTBweDtcclxufVxyXG5cclxuLnN0YXJ0LWJ1dHRvbiB7XHJcbiAgbWFyZ2luLXRvcDogNTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5pbWctYW5pbXtcclxuICBhbmltYXRpb246IGJhY2tJbkRvd24gMXMgZWFzZTtcclxufVxyXG48L3N0eWxlPiJdLCJuYW1lcyI6WyJhdHRycyIsInVpZCIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBU0EsSUFBQSxVQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUVILFVBQVU7QUFBQSxJQUVWLE9BQU87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
