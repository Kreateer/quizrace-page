import { Q as QPage } from "./QPage.6732de9a.js";
import { c as createComponent, h as hSlot, a as css, g as getElement, b as hMergeSlot } from "./dom.6c943660.js";
import { i as inject, e as emptyRenderFn, p as provide, c as computed, h, l as layoutKey, a as pageContainerKey, g as getCurrentInstance, w as watch, o as onMounted, d as onBeforeUnmount, n as noop, f as listenOpts, r as ref, j as isRuntimeSsrPreHydration, k as nextTick, m as reactive, q as onUnmounted, _ as _export_sfc, s as defineComponent, u as useRoute, t as resolveComponent, v as openBlock, x as createBlock, y as withCtx, z as createVNode } from "./index.2f099809.js";
import { api } from "./axios.d1cedc7f.js";
import { p as pusher } from "./pusher.283019e9.js";
import { e as emitter } from "./mitt.eb8c962f.js";
var QPageContainer = createComponent({
  name: "QPageContainer",
  setup(_, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QPageContainer needs to be child of QLayout");
      return emptyRenderFn;
    }
    provide(pageContainerKey, true);
    const style = computed(() => {
      const css2 = {};
      if ($layout.header.space === true) {
        css2.paddingTop = `${$layout.header.size}px`;
      }
      if ($layout.right.space === true) {
        css2[`padding${$q.lang.rtl === true ? "Left" : "Right"}`] = `${$layout.right.size}px`;
      }
      if ($layout.footer.space === true) {
        css2.paddingBottom = `${$layout.footer.size}px`;
      }
      if ($layout.left.space === true) {
        css2[`padding${$q.lang.rtl === true ? "Right" : "Left"}`] = `${$layout.left.size}px`;
      }
      return css2;
    });
    return () => h("div", {
      class: "q-page-container",
      style: style.value
    }, hSlot(slots.default));
  }
});
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(el, targetEl) {
  let target = getElement(targetEl);
  if (target === void 0) {
    if (el === void 0 || el === null) {
      return window;
    }
    target = el.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(target) ? window : target;
}
function getVerticalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : scrollTarget.scrollTop;
}
function getHorizontalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : scrollTarget.scrollLeft;
}
let size;
function getScrollbarWidth() {
  if (size !== void 0) {
    return size;
  }
  const inner = document.createElement("p"), outer = document.createElement("div");
  css(inner, {
    width: "100%",
    height: "200px"
  });
  css(outer, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  });
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  size = w1 - w2;
  return size;
}
const { passive } = listenOpts;
const axisValues = ["both", "horizontal", "vertical"];
var QScrollObserver = createComponent({
  name: "QScrollObserver",
  props: {
    axis: {
      type: String,
      validator: (v) => axisValues.includes(v),
      default: "vertical"
    },
    debounce: [String, Number],
    scrollTarget: {
      default: void 0
    }
  },
  emits: ["scroll"],
  setup(props, { emit }) {
    const scroll = {
      position: {
        top: 0,
        left: 0
      },
      direction: "down",
      directionChanged: false,
      delta: {
        top: 0,
        left: 0
      },
      inflectionPoint: {
        top: 0,
        left: 0
      }
    };
    let clearTimer = null, localScrollTarget, parentEl;
    watch(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });
    function emitEvent() {
      clearTimer !== null && clearTimer();
      const top = Math.max(0, getVerticalScrollPosition(localScrollTarget));
      const left = getHorizontalScrollPosition(localScrollTarget);
      const delta = {
        top: top - scroll.position.top,
        left: left - scroll.position.left
      };
      if (props.axis === "vertical" && delta.top === 0 || props.axis === "horizontal" && delta.left === 0) {
        return;
      }
      const curDir = Math.abs(delta.top) >= Math.abs(delta.left) ? delta.top < 0 ? "up" : "down" : delta.left < 0 ? "left" : "right";
      scroll.position = { top, left };
      scroll.directionChanged = scroll.direction !== curDir;
      scroll.delta = delta;
      if (scroll.directionChanged === true) {
        scroll.direction = curDir;
        scroll.inflectionPoint = scroll.position;
      }
      emit("scroll", { ...scroll });
    }
    function configureScrollTarget() {
      localScrollTarget = getScrollTarget(parentEl, props.scrollTarget);
      localScrollTarget.addEventListener("scroll", trigger, passive);
      trigger(true);
    }
    function unconfigureScrollTarget() {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener("scroll", trigger, passive);
        localScrollTarget = void 0;
      }
    }
    function trigger(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (clearTimer === null) {
        const [timer, fn] = props.debounce ? [setTimeout(emitEvent, props.debounce), clearTimeout] : [requestAnimationFrame(emitEvent), cancelAnimationFrame];
        clearTimer = () => {
          fn(timer);
          clearTimer = null;
        };
      }
    }
    const { proxy } = getCurrentInstance();
    watch(() => proxy.$q.lang.rtl, emitEvent);
    onMounted(() => {
      parentEl = proxy.$el.parentNode;
      configureScrollTarget();
    });
    onBeforeUnmount(() => {
      clearTimer !== null && clearTimer();
      unconfigureScrollTarget();
    });
    Object.assign(proxy, {
      trigger,
      getPosition: () => scroll
    });
    return noop;
  }
});
function useCanRender() {
  const canRender = ref(!isRuntimeSsrPreHydration.value);
  if (canRender.value === false) {
    onMounted(() => {
      canRender.value = true;
    });
  }
  return canRender;
}
const hasObserver = typeof ResizeObserver !== "undefined";
const resizeProps = hasObserver === true ? {} : {
  style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
  url: "about:blank"
};
var QResizeObserver = createComponent({
  name: "QResizeObserver",
  props: {
    debounce: {
      type: [String, Number],
      default: 100
    }
  },
  emits: ["resize"],
  setup(props, { emit }) {
    let timer = null, targetEl, size2 = { width: -1, height: -1 };
    function trigger(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (timer === null) {
        timer = setTimeout(emitEvent, props.debounce);
      }
    }
    function emitEvent() {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (targetEl) {
        const { offsetWidth: width, offsetHeight: height } = targetEl;
        if (width !== size2.width || height !== size2.height) {
          size2 = { width, height };
          emit("resize", size2);
        }
      }
    }
    const { proxy } = getCurrentInstance();
    if (hasObserver === true) {
      let observer;
      const init = (stop) => {
        targetEl = proxy.$el.parentNode;
        if (targetEl) {
          observer = new ResizeObserver(trigger);
          observer.observe(targetEl);
          emitEvent();
        } else if (stop !== true) {
          nextTick(() => {
            init(true);
          });
        }
      };
      onMounted(() => {
        init();
      });
      onBeforeUnmount(() => {
        timer !== null && clearTimeout(timer);
        if (observer !== void 0) {
          if (observer.disconnect !== void 0) {
            observer.disconnect();
          } else if (targetEl) {
            observer.unobserve(targetEl);
          }
        }
      });
      return noop;
    } else {
      let cleanup = function() {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
        if (curDocView !== void 0) {
          if (curDocView.removeEventListener !== void 0) {
            curDocView.removeEventListener("resize", trigger, listenOpts.passive);
          }
          curDocView = void 0;
        }
      }, onObjLoad = function() {
        cleanup();
        if (targetEl && targetEl.contentDocument) {
          curDocView = targetEl.contentDocument.defaultView;
          curDocView.addEventListener("resize", trigger, listenOpts.passive);
          emitEvent();
        }
      };
      const canRender = useCanRender();
      let curDocView;
      onMounted(() => {
        nextTick(() => {
          targetEl = proxy.$el;
          targetEl && onObjLoad();
        });
      });
      onBeforeUnmount(cleanup);
      proxy.trigger = trigger;
      return () => {
        if (canRender.value === true) {
          return h("object", {
            style: resizeProps.style,
            tabindex: -1,
            type: "text/html",
            data: resizeProps.url,
            "aria-hidden": "true",
            onLoad: onObjLoad
          });
        }
      };
    }
  }
});
var QLayout = createComponent({
  name: "QLayout",
  props: {
    container: Boolean,
    view: {
      type: String,
      default: "hhh lpr fff",
      validator: (v) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    },
    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const rootRef = ref(null);
    const height = ref($q.screen.height);
    const width = ref(props.container === true ? 0 : $q.screen.width);
    const scroll = ref({ position: 0, direction: "down", inflectionPoint: 0 });
    const containerHeight = ref(0);
    const scrollbarWidth = ref(isRuntimeSsrPreHydration.value === true ? 0 : getScrollbarWidth());
    const classes = computed(
      () => "q-layout q-layout--" + (props.container === true ? "containerized" : "standard")
    );
    const style = computed(() => props.container === false ? { minHeight: $q.screen.height + "px" } : null);
    const targetStyle = computed(() => scrollbarWidth.value !== 0 ? { [$q.lang.rtl === true ? "left" : "right"]: `${scrollbarWidth.value}px` } : null);
    const targetChildStyle = computed(() => scrollbarWidth.value !== 0 ? {
      [$q.lang.rtl === true ? "right" : "left"]: 0,
      [$q.lang.rtl === true ? "left" : "right"]: `-${scrollbarWidth.value}px`,
      width: `calc(100% + ${scrollbarWidth.value}px)`
    } : null);
    function onPageScroll(data) {
      if (props.container === true || document.qScrollPrevented !== true) {
        const info = {
          position: data.position.top,
          direction: data.direction,
          directionChanged: data.directionChanged,
          inflectionPoint: data.inflectionPoint.top,
          delta: data.delta.top
        };
        scroll.value = info;
        props.onScroll !== void 0 && emit("scroll", info);
      }
    }
    function onPageResize(data) {
      const { height: newHeight, width: newWidth } = data;
      let resized = false;
      if (height.value !== newHeight) {
        resized = true;
        height.value = newHeight;
        props.onScrollHeight !== void 0 && emit("scrollHeight", newHeight);
        updateScrollbarWidth();
      }
      if (width.value !== newWidth) {
        resized = true;
        width.value = newWidth;
      }
      if (resized === true && props.onResize !== void 0) {
        emit("resize", data);
      }
    }
    function onContainerResize({ height: height2 }) {
      if (containerHeight.value !== height2) {
        containerHeight.value = height2;
        updateScrollbarWidth();
      }
    }
    function updateScrollbarWidth() {
      if (props.container === true) {
        const width2 = height.value > containerHeight.value ? getScrollbarWidth() : 0;
        if (scrollbarWidth.value !== width2) {
          scrollbarWidth.value = width2;
        }
      }
    }
    let animateTimer = null;
    const $layout = {
      instances: {},
      view: computed(() => props.view),
      isContainer: computed(() => props.container),
      rootRef,
      height,
      containerHeight,
      scrollbarWidth,
      totalWidth: computed(() => width.value + scrollbarWidth.value),
      rows: computed(() => {
        const rows = props.view.toLowerCase().split(" ");
        return {
          top: rows[0].split(""),
          middle: rows[1].split(""),
          bottom: rows[2].split("")
        };
      }),
      header: reactive({ size: 0, offset: 0, space: false }),
      right: reactive({ size: 300, offset: 0, space: false }),
      footer: reactive({ size: 0, offset: 0, space: false }),
      left: reactive({ size: 300, offset: 0, space: false }),
      scroll,
      animate() {
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
        } else {
          document.body.classList.add("q-body--layout-animate");
        }
        animateTimer = setTimeout(() => {
          animateTimer = null;
          document.body.classList.remove("q-body--layout-animate");
        }, 155);
      },
      update(part, prop, val) {
        $layout[part][prop] = val;
      }
    };
    provide(layoutKey, $layout);
    if (getScrollbarWidth() > 0) {
      let restoreScrollbar = function() {
        timer = null;
        el.classList.remove("hide-scrollbar");
      }, hideScrollbar = function() {
        if (timer === null) {
          if (el.scrollHeight > $q.screen.height) {
            return;
          }
          el.classList.add("hide-scrollbar");
        } else {
          clearTimeout(timer);
        }
        timer = setTimeout(restoreScrollbar, 300);
      }, updateScrollEvent = function(action) {
        if (timer !== null && action === "remove") {
          clearTimeout(timer);
          restoreScrollbar();
        }
        window[`${action}EventListener`]("resize", hideScrollbar);
      };
      let timer = null;
      const el = document.body;
      watch(
        () => props.container !== true ? "add" : "remove",
        updateScrollEvent
      );
      props.container !== true && updateScrollEvent("add");
      onUnmounted(() => {
        updateScrollEvent("remove");
      });
    }
    return () => {
      const content = hMergeSlot(slots.default, [
        h(QScrollObserver, { onScroll: onPageScroll }),
        h(QResizeObserver, { onResize: onPageResize })
      ]);
      const layout = h("div", {
        class: classes.value,
        style: style.value,
        ref: props.container === true ? void 0 : rootRef,
        tabindex: -1
      }, content);
      if (props.container === true) {
        return h("div", {
          class: "q-layout-container overflow-hidden",
          ref: rootRef
        }, [
          h(QResizeObserver, { onResize: onContainerResize }),
          h("div", {
            class: "absolute-full",
            style: targetStyle.value
          }, [
            h("div", {
              class: "scroll",
              style: targetChildStyle.value
            }, [layout])
          ])
        ]);
      }
      return layout;
    };
  }
});
var MainLayout_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "MainLayout",
  route: useRoute,
  data() {
    return {
      uuid: "",
      pusher: { channel: null }
    };
  },
  mounted() {
    this.getCookieAndLogin();
    emitter.on("pusher.subscribe", (uid) => {
      this.subscribeChannel(uid);
    });
  },
  methods: {
    subscribeChannel(uid) {
      if (pusher.channel != null) {
        this.pusher.channel = pusher.unbind();
      }
      this.pusher.channel = pusher.subscribe(`private-gamingdrv.${uid}`);
      this.pusher.channel.bind("pusher:subscription_succeeded", () => {
        this.status = "Connected to channel";
        this.pusher.connected = true;
        console.log("Connected to channel!");
        this.pusher.channel.bind("player.registered", (data) => {
          console.log("New player registered: ", data);
          emitter.emit("player.registered", data);
        });
        this.pusher.channel.bind("game.start", (data) => {
          console.log("Game started: ", data);
          emitter.emit("game.started", data);
        });
        this.pusher.channel.bind("question.show", (data) => {
          console.log("New question: ", data);
          emitter.emit("question.show", data);
        });
        this.pusher.channel.bind("question.timeout", (data) => {
          console.log("Answer timeout: ", data);
          emitter.emit("question.timeout", data);
        });
        this.pusher.channel.bind("results.show", (data) => {
          console.log("Results: ", data);
          emitter.emit("results.show", data);
        });
        this.pusher.channel.bind("game.end", (data) => {
          console.log("Game ended: ", data);
          emitter.emit("game.ended", data);
        });
      });
    },
    getCookieAndLogin() {
      api.get("/sanctum/csrf-cookie").then((response) => {
        api.post("/login", { email: "gamingdrv.test@marulk.nu", password: "gamingdrv" }).then((response2) => {
          if (response2.status === 200) {
            console.log("Logged in!");
          }
        });
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "lHr lpR lFr" }, {
    default: withCtx(() => [
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          createVNode(QPage, { class: "bg-gradient" }, {
            default: withCtx(() => [
              createVNode(_component_router_view)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e1453b16"], ["__file", "MainLayout.vue"]]);
export { MainLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkxheW91dC5kY2MxZjU5YS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlL1FQYWdlQ29udGFpbmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvc2Nyb2xsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zY3JvbGwtb2JzZXJ2ZXIvUVNjcm9sbE9ic2VydmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtY2FuLXJlbmRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvbGF5b3V0L1FMYXlvdXQuanMiLCIuLi8uLi8uLi9zcmMvbGF5b3V0cy9NYWluTGF5b3V0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgcHJvdmlkZSwgaW5qZWN0LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IHBhZ2VDb250YWluZXJLZXksIGxheW91dEtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FQYWdlQ29udGFpbmVyJyxcblxuICBzZXR1cCAoXywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgJGxheW91dCA9IGluamVjdChsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4pXG4gICAgaWYgKCRsYXlvdXQgPT09IGVtcHR5UmVuZGVyRm4pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1FQYWdlQ29udGFpbmVyIG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBwcm92aWRlKHBhZ2VDb250YWluZXJLZXksIHRydWUpXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGNzcyA9IHt9XG5cbiAgICAgIGlmICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3MucGFkZGluZ1RvcCA9IGAkeyAkbGF5b3V0LmhlYWRlci5zaXplIH1weGBcbiAgICAgIH1cbiAgICAgIGlmICgkbGF5b3V0LnJpZ2h0LnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzc1sgYHBhZGRpbmckeyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdMZWZ0JyA6ICdSaWdodCcgfWAgXSA9IGAkeyAkbGF5b3V0LnJpZ2h0LnNpemUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKCRsYXlvdXQuZm9vdGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzcy5wYWRkaW5nQm90dG9tID0gYCR7ICRsYXlvdXQuZm9vdGVyLnNpemUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKCRsYXlvdXQubGVmdC5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3NbIGBwYWRkaW5nJHsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnUmlnaHQnIDogJ0xlZnQnIH1gIF0gPSBgJHsgJGxheW91dC5sZWZ0LnNpemUgfXB4YFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3NzXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogJ3EtcGFnZS1jb250YWluZXInLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlXG4gICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBjc3MsIGdldEVsZW1lbnQgfSBmcm9tICcuL2RvbS5qcydcblxuY29uc3Qgc2Nyb2xsVGFyZ2V0cyA9IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICA/IFtdXG4gIDogWyBudWxsLCBkb2N1bWVudCwgZG9jdW1lbnQuYm9keSwgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IF1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbFRhcmdldCAoZWwsIHRhcmdldEVsKSB7XG4gIGxldCB0YXJnZXQgPSBnZXRFbGVtZW50KHRhcmdldEVsKVxuXG4gIGlmICh0YXJnZXQgPT09IHZvaWQgMCkge1xuICAgIGlmIChlbCA9PT0gdm9pZCAwIHx8IGVsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gd2luZG93XG4gICAgfVxuXG4gICAgdGFyZ2V0ID0gZWwuY2xvc2VzdCgnLnNjcm9sbCwuc2Nyb2xsLXksLm92ZXJmbG93LWF1dG8nKVxuICB9XG5cbiAgcmV0dXJuIHNjcm9sbFRhcmdldHMuaW5jbHVkZXModGFyZ2V0KVxuICAgID8gd2luZG93XG4gICAgOiB0YXJnZXRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbEhlaWdodCAoZWwpIHtcbiAgcmV0dXJuIChlbCA9PT0gd2luZG93ID8gZG9jdW1lbnQuYm9keSA6IGVsKS5zY3JvbGxIZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbFdpZHRoIChlbCkge1xuICByZXR1cm4gKGVsID09PSB3aW5kb3cgPyBkb2N1bWVudC5ib2R5IDogZWwpLnNjcm9sbFdpZHRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQpIHtcbiAgcmV0dXJuIHNjcm9sbFRhcmdldCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMFxuICAgIDogc2Nyb2xsVGFyZ2V0LnNjcm9sbFRvcFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQpIHtcbiAgcmV0dXJuIHNjcm9sbFRhcmdldCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDBcbiAgICA6IHNjcm9sbFRhcmdldC5zY3JvbGxMZWZ0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmltVmVydGljYWxTY3JvbGxUbyAoZWwsIHRvLCBkdXJhdGlvbiA9IDAgLyogLCBwcmV2VGltZSAqLykge1xuICBjb25zdCBwcmV2VGltZSA9IGFyZ3VtZW50c1sgMyBdID09PSB2b2lkIDAgPyBwZXJmb3JtYW5jZS5ub3coKSA6IGFyZ3VtZW50c1sgMyBdXG4gIGNvbnN0IHBvcyA9IGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24oZWwpXG5cbiAgaWYgKGR1cmF0aW9uIDw9IDApIHtcbiAgICBpZiAocG9zICE9PSB0bykge1xuICAgICAgc2V0U2Nyb2xsKGVsLCB0bylcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobm93VGltZSA9PiB7XG4gICAgY29uc3QgZnJhbWVUaW1lID0gbm93VGltZSAtIHByZXZUaW1lXG4gICAgY29uc3QgbmV3UG9zID0gcG9zICsgKHRvIC0gcG9zKSAvIE1hdGgubWF4KGZyYW1lVGltZSwgZHVyYXRpb24pICogZnJhbWVUaW1lXG4gICAgc2V0U2Nyb2xsKGVsLCBuZXdQb3MpXG4gICAgaWYgKG5ld1BvcyAhPT0gdG8pIHtcbiAgICAgIGFuaW1WZXJ0aWNhbFNjcm9sbFRvKGVsLCB0bywgZHVyYXRpb24gLSBmcmFtZVRpbWUsIG5vd1RpbWUpXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYW5pbUhvcml6b250YWxTY3JvbGxUbyAoZWwsIHRvLCBkdXJhdGlvbiA9IDAgLyogLCBwcmV2VGltZSAqLykge1xuICBjb25zdCBwcmV2VGltZSA9IGFyZ3VtZW50c1sgMyBdID09PSB2b2lkIDAgPyBwZXJmb3JtYW5jZS5ub3coKSA6IGFyZ3VtZW50c1sgMyBdXG4gIGNvbnN0IHBvcyA9IGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihlbClcblxuICBpZiAoZHVyYXRpb24gPD0gMCkge1xuICAgIGlmIChwb3MgIT09IHRvKSB7XG4gICAgICBzZXRIb3Jpem9udGFsU2Nyb2xsKGVsLCB0bylcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobm93VGltZSA9PiB7XG4gICAgY29uc3QgZnJhbWVUaW1lID0gbm93VGltZSAtIHByZXZUaW1lXG4gICAgY29uc3QgbmV3UG9zID0gcG9zICsgKHRvIC0gcG9zKSAvIE1hdGgubWF4KGZyYW1lVGltZSwgZHVyYXRpb24pICogZnJhbWVUaW1lXG4gICAgc2V0SG9yaXpvbnRhbFNjcm9sbChlbCwgbmV3UG9zKVxuICAgIGlmIChuZXdQb3MgIT09IHRvKSB7XG4gICAgICBhbmltSG9yaXpvbnRhbFNjcm9sbFRvKGVsLCB0bywgZHVyYXRpb24gLSBmcmFtZVRpbWUsIG5vd1RpbWUpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBzZXRTY3JvbGwgKHNjcm9sbFRhcmdldCwgb2Zmc2V0KSB7XG4gIGlmIChzY3JvbGxUYXJnZXQgPT09IHdpbmRvdykge1xuICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDAsIG9mZnNldClcbiAgICByZXR1cm5cbiAgfVxuICBzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wID0gb2Zmc2V0XG59XG5cbmZ1bmN0aW9uIHNldEhvcml6b250YWxTY3JvbGwgKHNjcm9sbFRhcmdldCwgb2Zmc2V0KSB7XG4gIGlmIChzY3JvbGxUYXJnZXQgPT09IHdpbmRvdykge1xuICAgIHdpbmRvdy5zY3JvbGxUbyhvZmZzZXQsIHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwKVxuICAgIHJldHVyblxuICB9XG4gIHNjcm9sbFRhcmdldC5zY3JvbGxMZWZ0ID0gb2Zmc2V0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pIHtcbiAgaWYgKGR1cmF0aW9uKSB7XG4gICAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8oc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKVxuICAgIHJldHVyblxuICB9XG4gIHNldFNjcm9sbChzY3JvbGxUYXJnZXQsIG9mZnNldClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbiAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKSB7XG4gIGlmIChkdXJhdGlvbikge1xuICAgIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8oc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKVxuICAgIHJldHVyblxuICB9XG4gIHNldEhvcml6b250YWxTY3JvbGwoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpXG59XG5cbmxldCBzaXplXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsYmFyV2lkdGggKCkge1xuICBpZiAoc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNpemVcbiAgfVxuXG4gIGNvbnN0XG4gICAgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyksXG4gICAgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIGNzcyhpbm5lciwge1xuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMjAwcHgnXG4gIH0pXG4gIGNzcyhvdXRlciwge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcDogJzBweCcsXG4gICAgbGVmdDogJzBweCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgd2lkdGg6ICcyMDBweCcsXG4gICAgaGVpZ2h0OiAnMTUwcHgnLFxuICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICB9KVxuXG4gIG91dGVyLmFwcGVuZENoaWxkKGlubmVyKVxuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3V0ZXIpXG5cbiAgY29uc3QgdzEgPSBpbm5lci5vZmZzZXRXaWR0aFxuICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnXG4gIGxldCB3MiA9IGlubmVyLm9mZnNldFdpZHRoXG5cbiAgaWYgKHcxID09PSB3Mikge1xuICAgIHcyID0gb3V0ZXIuY2xpZW50V2lkdGhcbiAgfVxuXG4gIG91dGVyLnJlbW92ZSgpXG4gIHNpemUgPSB3MSAtIHcyXG5cbiAgcmV0dXJuIHNpemVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1Njcm9sbGJhciAoZWwsIG9uWSA9IHRydWUpIHtcbiAgaWYgKCFlbCB8fCBlbC5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiBvbllcbiAgICA/IChcbiAgICAgICAgZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICYmIChcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3Njcm9sbCcpXG4gICAgICAgICAgfHwgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVyZmxvdy1hdXRvJylcbiAgICAgICAgICB8fCBbICdhdXRvJywgJ3Njcm9sbCcgXS5pbmNsdWRlcyh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbClbICdvdmVyZmxvdy15JyBdKVxuICAgICAgICApXG4gICAgICApXG4gICAgOiAoXG4gICAgICAgIGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggJiYgKFxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5jb250YWlucygnc2Nyb2xsJylcbiAgICAgICAgICB8fCBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJmbG93LWF1dG8nKVxuICAgICAgICAgIHx8IFsgJ2F1dG8nLCAnc2Nyb2xsJyBdLmluY2x1ZGVzKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVsgJ292ZXJmbG93LXgnIF0pXG4gICAgICAgIClcbiAgICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRTY3JvbGxUYXJnZXQsXG5cbiAgZ2V0U2Nyb2xsSGVpZ2h0LFxuICBnZXRTY3JvbGxXaWR0aCxcblxuICBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLFxuICBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24sXG5cbiAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8sXG4gIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8sXG5cbiAgc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbixcbiAgc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uLFxuXG4gIGdldFNjcm9sbGJhcldpZHRoLFxuICBoYXNTY3JvbGxiYXJcbn1cbiIsImltcG9ydCB7IHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldFNjcm9sbFRhcmdldCwgZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbiwgZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgbGlzdGVuT3B0cywgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuXG5jb25zdCB7IHBhc3NpdmUgfSA9IGxpc3Rlbk9wdHNcbmNvbnN0IGF4aXNWYWx1ZXMgPSBbICdib3RoJywgJ2hvcml6b250YWwnLCAndmVydGljYWwnIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTY3JvbGxPYnNlcnZlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBheGlzOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gYXhpc1ZhbHVlcy5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICd2ZXJ0aWNhbCdcbiAgICB9LFxuXG4gICAgZGVib3VuY2U6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIHNjcm9sbFRhcmdldDoge1xuICAgICAgZGVmYXVsdDogdm9pZCAwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdzY3JvbGwnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGVtaXQgfSkge1xuICAgIGNvbnN0IHNjcm9sbCA9IHtcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgbGVmdDogMFxuICAgICAgfSxcblxuICAgICAgZGlyZWN0aW9uOiAnZG93bicsXG4gICAgICBkaXJlY3Rpb25DaGFuZ2VkOiBmYWxzZSxcblxuICAgICAgZGVsdGE6IHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwXG4gICAgICB9LFxuXG4gICAgICBpbmZsZWN0aW9uUG9pbnQ6IHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGNsZWFyVGltZXIgPSBudWxsLCBsb2NhbFNjcm9sbFRhcmdldCwgcGFyZW50RWxcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLnNjcm9sbFRhcmdldCwgKCkgPT4ge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZW1pdEV2ZW50ICgpIHtcbiAgICAgIGNsZWFyVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lcigpXG5cbiAgICAgIGNvbnN0IHRvcCA9IE1hdGgubWF4KDAsIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24obG9jYWxTY3JvbGxUYXJnZXQpKVxuICAgICAgY29uc3QgbGVmdCA9IGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihsb2NhbFNjcm9sbFRhcmdldClcblxuICAgICAgY29uc3QgZGVsdGEgPSB7XG4gICAgICAgIHRvcDogdG9wIC0gc2Nyb2xsLnBvc2l0aW9uLnRvcCxcbiAgICAgICAgbGVmdDogbGVmdCAtIHNjcm9sbC5wb3NpdGlvbi5sZWZ0XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgKHByb3BzLmF4aXMgPT09ICd2ZXJ0aWNhbCcgJiYgZGVsdGEudG9wID09PSAwKVxuICAgICAgICB8fCAocHJvcHMuYXhpcyA9PT0gJ2hvcml6b250YWwnICYmIGRlbHRhLmxlZnQgPT09IDApXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1ckRpciA9IE1hdGguYWJzKGRlbHRhLnRvcCkgPj0gTWF0aC5hYnMoZGVsdGEubGVmdClcbiAgICAgICAgPyAoZGVsdGEudG9wIDwgMCA/ICd1cCcgOiAnZG93bicpXG4gICAgICAgIDogKGRlbHRhLmxlZnQgPCAwID8gJ2xlZnQnIDogJ3JpZ2h0JylcblxuICAgICAgc2Nyb2xsLnBvc2l0aW9uID0geyB0b3AsIGxlZnQgfVxuICAgICAgc2Nyb2xsLmRpcmVjdGlvbkNoYW5nZWQgPSBzY3JvbGwuZGlyZWN0aW9uICE9PSBjdXJEaXJcbiAgICAgIHNjcm9sbC5kZWx0YSA9IGRlbHRhXG5cbiAgICAgIGlmIChzY3JvbGwuZGlyZWN0aW9uQ2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBzY3JvbGwuZGlyZWN0aW9uID0gY3VyRGlyXG4gICAgICAgIHNjcm9sbC5pbmZsZWN0aW9uUG9pbnQgPSBzY3JvbGwucG9zaXRpb25cbiAgICAgIH1cblxuICAgICAgZW1pdCgnc2Nyb2xsJywgeyAuLi5zY3JvbGwgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgbG9jYWxTY3JvbGxUYXJnZXQgPSBnZXRTY3JvbGxUYXJnZXQocGFyZW50RWwsIHByb3BzLnNjcm9sbFRhcmdldClcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyaWdnZXIsIHBhc3NpdmUpXG4gICAgICB0cmlnZ2VyKHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5jb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJpZ2dlciwgcGFzc2l2ZSlcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQgPSB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmlnZ2VyIChpbW1lZGlhdGVseSkge1xuICAgICAgaWYgKGltbWVkaWF0ZWx5ID09PSB0cnVlIHx8IHByb3BzLmRlYm91bmNlID09PSAwIHx8IHByb3BzLmRlYm91bmNlID09PSAnMCcpIHtcbiAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNsZWFyVGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgWyB0aW1lciwgZm4gXSA9IHByb3BzLmRlYm91bmNlXG4gICAgICAgICAgPyBbIHNldFRpbWVvdXQoZW1pdEV2ZW50LCBwcm9wcy5kZWJvdW5jZSksIGNsZWFyVGltZW91dCBdXG4gICAgICAgICAgOiBbIHJlcXVlc3RBbmltYXRpb25GcmFtZShlbWl0RXZlbnQpLCBjYW5jZWxBbmltYXRpb25GcmFtZSBdXG5cbiAgICAgICAgY2xlYXJUaW1lciA9ICgpID0+IHtcbiAgICAgICAgICBmbih0aW1lcilcbiAgICAgICAgICBjbGVhclRpbWVyID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIHdhdGNoKCgpID0+IHByb3h5LiRxLmxhbmcucnRsLCBlbWl0RXZlbnQpXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgcGFyZW50RWwgPSBwcm94eS4kZWwucGFyZW50Tm9kZVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGNsZWFyVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lcigpXG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIHRyaWdnZXIsXG4gICAgICBnZXRQb3NpdGlvbjogKCkgPT4gc2Nyb2xsXG4gICAgfSlcblxuICAgIHJldHVybiBub29wXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyByZWYsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcblxuLy8gdXNpbmcgaXQgdG8gbWFuYWdlIFNTUiByZW5kZXJpbmcgd2l0aCBiZXN0IHBlcmZvcm1hbmNlXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGNhblJlbmRlciA9IHJlZighaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uLnZhbHVlKVxuXG4gIGlmIChjYW5SZW5kZXIudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIGNhblJlbmRlci52YWx1ZSA9IHRydWVcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIGNhblJlbmRlclxufVxuIiwiaW1wb3J0IHsgaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSwgbmV4dFRpY2sgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VDYW5SZW5kZXIgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtY2FuLXJlbmRlci5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBsaXN0ZW5PcHRzLCBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5cbmNvbnN0IGhhc09ic2VydmVyID0gdHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJ1xuY29uc3QgcmVzaXplUHJvcHMgPSBoYXNPYnNlcnZlciA9PT0gdHJ1ZVxuICA/IHt9XG4gIDoge1xuICAgICAgc3R5bGU6ICdkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3BvaW50ZXItZXZlbnRzOm5vbmU7ei1pbmRleDotMTsnLFxuICAgICAgdXJsOiAnYWJvdXQ6YmxhbmsnXG4gICAgfVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVJlc2l6ZU9ic2VydmVyJyxcblxuICBwcm9wczoge1xuICAgIGRlYm91bmNlOiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAxMDBcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3Jlc2l6ZScgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCB9KSB7XG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXykgeyByZXR1cm4gbm9vcCB9XG5cbiAgICBsZXQgdGltZXIgPSBudWxsLCB0YXJnZXRFbCwgc2l6ZSA9IHsgd2lkdGg6IC0xLCBoZWlnaHQ6IC0xIH1cblxuICAgIGZ1bmN0aW9uIHRyaWdnZXIgKGltbWVkaWF0ZWx5KSB7XG4gICAgICBpZiAoaW1tZWRpYXRlbHkgPT09IHRydWUgfHwgcHJvcHMuZGVib3VuY2UgPT09IDAgfHwgcHJvcHMuZGVib3VuY2UgPT09ICcwJykge1xuICAgICAgICBlbWl0RXZlbnQoKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGVtaXRFdmVudCwgcHJvcHMuZGVib3VuY2UpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW1pdEV2ZW50ICgpIHtcbiAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0RWwpIHtcbiAgICAgICAgY29uc3QgeyBvZmZzZXRXaWR0aDogd2lkdGgsIG9mZnNldEhlaWdodDogaGVpZ2h0IH0gPSB0YXJnZXRFbFxuXG4gICAgICAgIGlmICh3aWR0aCAhPT0gc2l6ZS53aWR0aCB8fCBoZWlnaHQgIT09IHNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgc2l6ZSA9IHsgd2lkdGgsIGhlaWdodCB9XG4gICAgICAgICAgZW1pdCgncmVzaXplJywgc2l6ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBpZiAoaGFzT2JzZXJ2ZXIgPT09IHRydWUpIHtcbiAgICAgIGxldCBvYnNlcnZlclxuXG4gICAgICAvLyBpbml0aWFsaXplIGFzIHNvb24gYXMgcG9zc2libGVcbiAgICAgIGNvbnN0IGluaXQgPSBzdG9wID0+IHtcbiAgICAgICAgdGFyZ2V0RWwgPSBwcm94eS4kZWwucGFyZW50Tm9kZVxuXG4gICAgICAgIGlmICh0YXJnZXRFbCkge1xuICAgICAgICAgIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKHRyaWdnZXIpXG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXRFbClcbiAgICAgICAgICBlbWl0RXZlbnQoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0b3AgIT09IHRydWUpIHtcbiAgICAgICAgICBuZXh0VGljaygoKSA9PiB7IGluaXQodHJ1ZSkgfSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbk1vdW50ZWQoKCkgPT4geyBpbml0KCkgfSlcblxuICAgICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgICAgdGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKVxuXG4gICAgICAgIGlmIChvYnNlcnZlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLmRpc2Nvbm5lY3QgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHRhcmdldEVsKSB7IC8vIEZGIGZvciBBbmRyb2lkXG4gICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUodGFyZ2V0RWwpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH1cbiAgICBlbHNlIHsgLy8gbm8gb2JzZXJ2ZXIsIHNvIGZhbGxiYWNrIHRvIG9sZCBpZnJhbWUgbWV0aG9kXG4gICAgICBjb25zdCBjYW5SZW5kZXIgPSB1c2VDYW5SZW5kZXIoKVxuXG4gICAgICBsZXQgY3VyRG9jVmlld1xuXG4gICAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1ckRvY1ZpZXcgIT09IHZvaWQgMCkge1xuICAgICAgICAgIC8vIGlPUyBpcyBmdXp6eSwgbmVlZCB0byBjaGVjayBpdCBmaXJzdFxuICAgICAgICAgIGlmIChjdXJEb2NWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgY3VyRG9jVmlldy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0cmlnZ2VyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGN1ckRvY1ZpZXcgPSB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbk9iakxvYWQgKCkge1xuICAgICAgICBjbGVhbnVwKClcblxuICAgICAgICBpZiAodGFyZ2V0RWwgJiYgdGFyZ2V0RWwuY29udGVudERvY3VtZW50KSB7XG4gICAgICAgICAgY3VyRG9jVmlldyA9IHRhcmdldEVsLmNvbnRlbnREb2N1bWVudC5kZWZhdWx0Vmlld1xuICAgICAgICAgIGN1ckRvY1ZpZXcuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdHJpZ2dlciwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuICAgICAgICAgIGVtaXRFdmVudCgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIHRhcmdldEVsID0gcHJveHkuJGVsXG4gICAgICAgICAgdGFyZ2V0RWwgJiYgb25PYmpMb2FkKClcbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIG9uQmVmb3JlVW5tb3VudChjbGVhbnVwKVxuXG4gICAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZFxuICAgICAgcHJveHkudHJpZ2dlciA9IHRyaWdnZXJcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKGNhblJlbmRlci52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBoKCdvYmplY3QnLCB7XG4gICAgICAgICAgICBzdHlsZTogcmVzaXplUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICB0YWJpbmRleDogLTEsIC8vIGZpeCBmb3IgRmlyZWZveFxuICAgICAgICAgICAgdHlwZTogJ3RleHQvaHRtbCcsXG4gICAgICAgICAgICBkYXRhOiByZXNpemVQcm9wcy51cmwsXG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICBvbkxvYWQ6IG9uT2JqTG9hZFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIHJlYWN0aXZlLCBjb21wdXRlZCwgd2F0Y2gsIHByb3ZpZGUsIG9uVW5tb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmltcG9ydCBRU2Nyb2xsT2JzZXJ2ZXIgZnJvbSAnLi4vc2Nyb2xsLW9ic2VydmVyL1FTY3JvbGxPYnNlcnZlci5qcydcbmltcG9ydCBRUmVzaXplT2JzZXJ2ZXIgZnJvbSAnLi4vcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBnZXRTY3JvbGxiYXJXaWR0aCB9IGZyb20gJy4uLy4uL3V0aWxzL3Njcm9sbC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGxheW91dEtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FMYXlvdXQnLFxuXG4gIHByb3BzOiB7XG4gICAgY29udGFpbmVyOiBCb29sZWFuLFxuICAgIHZpZXc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdoaGggbHByIGZmZicsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gL14oaHxsKWgoaHxyKSBscHIgKGZ8bClmKGZ8cikkLy50ZXN0KHYudG9Mb3dlckNhc2UoKSlcbiAgICB9LFxuXG4gICAgb25TY3JvbGw6IEZ1bmN0aW9uLFxuICAgIG9uU2Nyb2xsSGVpZ2h0OiBGdW5jdGlvbixcbiAgICBvblJlc2l6ZTogRnVuY3Rpb25cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcblxuICAgIC8vIHBhZ2UgcmVsYXRlZFxuICAgIGNvbnN0IGhlaWdodCA9IHJlZigkcS5zY3JlZW4uaGVpZ2h0KVxuICAgIGNvbnN0IHdpZHRoID0gcmVmKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSA/IDAgOiAkcS5zY3JlZW4ud2lkdGgpXG4gICAgY29uc3Qgc2Nyb2xsID0gcmVmKHsgcG9zaXRpb246IDAsIGRpcmVjdGlvbjogJ2Rvd24nLCBpbmZsZWN0aW9uUG9pbnQ6IDAgfSlcblxuICAgIC8vIGNvbnRhaW5lciBvbmx5IHByb3BcbiAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSByZWYoMClcbiAgICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IHJlZihpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUgPT09IHRydWUgPyAwIDogZ2V0U2Nyb2xsYmFyV2lkdGgoKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtbGF5b3V0IHEtbGF5b3V0LS0nXG4gICAgICArIChwcm9wcy5jb250YWluZXIgPT09IHRydWUgPyAnY29udGFpbmVyaXplZCcgOiAnc3RhbmRhcmQnKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuY29udGFpbmVyID09PSBmYWxzZVxuICAgICAgICA/IHsgbWluSGVpZ2h0OiAkcS5zY3JlZW4uaGVpZ2h0ICsgJ3B4JyB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICAvLyB1c2VkIGJ5IGNvbnRhaW5lciBvbmx5XG4gICAgY29uc3QgdGFyZ2V0U3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBzY3JvbGxiYXJXaWR0aC52YWx1ZSAhPT0gMFxuICAgICAgICA/IHsgWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcgXTogYCR7IHNjcm9sbGJhcldpZHRoLnZhbHVlIH1weGAgfVxuICAgICAgICA6IG51bGxcbiAgICApKVxuXG4gICAgY29uc3QgdGFyZ2V0Q2hpbGRTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNjcm9sbGJhcldpZHRoLnZhbHVlICE9PSAwXG4gICAgICAgID8ge1xuICAgICAgICAgICAgWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgXTogMCxcbiAgICAgICAgICAgIFsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnbGVmdCcgOiAncmlnaHQnIF06IGAtJHsgc2Nyb2xsYmFyV2lkdGgudmFsdWUgfXB4YCxcbiAgICAgICAgICAgIHdpZHRoOiBgY2FsYygxMDAlICsgJHsgc2Nyb2xsYmFyV2lkdGgudmFsdWUgfXB4KWBcbiAgICAgICAgICB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBvblBhZ2VTY3JvbGwgKGRhdGEpIHtcbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUgfHwgZG9jdW1lbnQucVNjcm9sbFByZXZlbnRlZCAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgIHBvc2l0aW9uOiBkYXRhLnBvc2l0aW9uLnRvcCxcbiAgICAgICAgICBkaXJlY3Rpb246IGRhdGEuZGlyZWN0aW9uLFxuICAgICAgICAgIGRpcmVjdGlvbkNoYW5nZWQ6IGRhdGEuZGlyZWN0aW9uQ2hhbmdlZCxcbiAgICAgICAgICBpbmZsZWN0aW9uUG9pbnQ6IGRhdGEuaW5mbGVjdGlvblBvaW50LnRvcCxcbiAgICAgICAgICBkZWx0YTogZGF0YS5kZWx0YS50b3BcbiAgICAgICAgfVxuXG4gICAgICAgIHNjcm9sbC52YWx1ZSA9IGluZm9cbiAgICAgICAgcHJvcHMub25TY3JvbGwgIT09IHZvaWQgMCAmJiBlbWl0KCdzY3JvbGwnLCBpbmZvKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGFnZVJlc2l6ZSAoZGF0YSkge1xuICAgICAgY29uc3QgeyBoZWlnaHQ6IG5ld0hlaWdodCwgd2lkdGg6IG5ld1dpZHRoIH0gPSBkYXRhXG4gICAgICBsZXQgcmVzaXplZCA9IGZhbHNlXG5cbiAgICAgIGlmIChoZWlnaHQudmFsdWUgIT09IG5ld0hlaWdodCkge1xuICAgICAgICByZXNpemVkID0gdHJ1ZVxuICAgICAgICBoZWlnaHQudmFsdWUgPSBuZXdIZWlnaHRcbiAgICAgICAgcHJvcHMub25TY3JvbGxIZWlnaHQgIT09IHZvaWQgMCAmJiBlbWl0KCdzY3JvbGxIZWlnaHQnLCBuZXdIZWlnaHQpXG4gICAgICAgIHVwZGF0ZVNjcm9sbGJhcldpZHRoKClcbiAgICAgIH1cbiAgICAgIGlmICh3aWR0aC52YWx1ZSAhPT0gbmV3V2lkdGgpIHtcbiAgICAgICAgcmVzaXplZCA9IHRydWVcbiAgICAgICAgd2lkdGgudmFsdWUgPSBuZXdXaWR0aFxuICAgICAgfVxuXG4gICAgICBpZiAocmVzaXplZCA9PT0gdHJ1ZSAmJiBwcm9wcy5vblJlc2l6ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVtaXQoJ3Jlc2l6ZScsIGRhdGEpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Db250YWluZXJSZXNpemUgKHsgaGVpZ2h0IH0pIHtcbiAgICAgIGlmIChjb250YWluZXJIZWlnaHQudmFsdWUgIT09IGhlaWdodCkge1xuICAgICAgICBjb250YWluZXJIZWlnaHQudmFsdWUgPSBoZWlnaHRcbiAgICAgICAgdXBkYXRlU2Nyb2xsYmFyV2lkdGgoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbGJhcldpZHRoICgpIHtcbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBoZWlnaHQudmFsdWUgPiBjb250YWluZXJIZWlnaHQudmFsdWVcbiAgICAgICAgICA/IGdldFNjcm9sbGJhcldpZHRoKClcbiAgICAgICAgICA6IDBcblxuICAgICAgICBpZiAoc2Nyb2xsYmFyV2lkdGgudmFsdWUgIT09IHdpZHRoKSB7XG4gICAgICAgICAgc2Nyb2xsYmFyV2lkdGgudmFsdWUgPSB3aWR0aFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGFuaW1hdGVUaW1lciA9IG51bGxcblxuICAgIGNvbnN0ICRsYXlvdXQgPSB7XG4gICAgICBpbnN0YW5jZXM6IHt9LFxuICAgICAgdmlldzogY29tcHV0ZWQoKCkgPT4gcHJvcHMudmlldyksXG4gICAgICBpc0NvbnRhaW5lcjogY29tcHV0ZWQoKCkgPT4gcHJvcHMuY29udGFpbmVyKSxcblxuICAgICAgcm9vdFJlZixcblxuICAgICAgaGVpZ2h0LFxuICAgICAgY29udGFpbmVySGVpZ2h0LFxuICAgICAgc2Nyb2xsYmFyV2lkdGgsXG4gICAgICB0b3RhbFdpZHRoOiBjb21wdXRlZCgoKSA9PiB3aWR0aC52YWx1ZSArIHNjcm9sbGJhcldpZHRoLnZhbHVlKSxcblxuICAgICAgcm93czogY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCByb3dzID0gcHJvcHMudmlldy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJylcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b3A6IHJvd3NbIDAgXS5zcGxpdCgnJyksXG4gICAgICAgICAgbWlkZGxlOiByb3dzWyAxIF0uc3BsaXQoJycpLFxuICAgICAgICAgIGJvdHRvbTogcm93c1sgMiBdLnNwbGl0KCcnKVxuICAgICAgICB9XG4gICAgICB9KSxcblxuICAgICAgaGVhZGVyOiByZWFjdGl2ZSh7IHNpemU6IDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuICAgICAgcmlnaHQ6IHJlYWN0aXZlKHsgc2l6ZTogMzAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcbiAgICAgIGZvb3RlcjogcmVhY3RpdmUoeyBzaXplOiAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcbiAgICAgIGxlZnQ6IHJlYWN0aXZlKHsgc2l6ZTogMzAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcblxuICAgICAgc2Nyb2xsLFxuXG4gICAgICBhbmltYXRlICgpIHtcbiAgICAgICAgaWYgKGFuaW1hdGVUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChhbmltYXRlVGltZXIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWxheW91dC1hbmltYXRlJylcbiAgICAgICAgfVxuXG4gICAgICAgIGFuaW1hdGVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGFuaW1hdGVUaW1lciA9IG51bGxcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tbGF5b3V0LWFuaW1hdGUnKVxuICAgICAgICB9LCAxNTUpXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGUgKHBhcnQsIHByb3AsIHZhbCkge1xuICAgICAgICAkbGF5b3V0WyBwYXJ0IF1bIHByb3AgXSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIHByb3ZpZGUobGF5b3V0S2V5LCAkbGF5b3V0KVxuXG4gICAgLy8gcHJldmVudCBzY3JvbGxiYXIgZmxpY2tlciB3aGlsZSByZXNpemluZyB3aW5kb3cgaGVpZ2h0XG4gICAgLy8gaWYgbm8gcGFnZSBzY3JvbGxiYXIgaXMgYWxyZWFkeSBwcmVzZW50XG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSAmJiBnZXRTY3JvbGxiYXJXaWR0aCgpID4gMCkge1xuICAgICAgbGV0IHRpbWVyID0gbnVsbFxuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5ib2R5XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3RvcmVTY3JvbGxiYXIgKCkge1xuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zY3JvbGxiYXInKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBoaWRlU2Nyb2xsYmFyICgpIHtcbiAgICAgICAgaWYgKHRpbWVyID09PSBudWxsKSB7XG4gICAgICAgICAgLy8gaWYgaXQgaGFzIG5vIHNjcm9sbGJhciB0aGVuIHRoZXJlJ3Mgbm90aGluZyB0byBkb1xuXG4gICAgICAgICAgaWYgKGVsLnNjcm9sbEhlaWdodCA+ICRxLnNjcmVlbi5oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2Nyb2xsYmFyJylcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIH1cblxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQocmVzdG9yZVNjcm9sbGJhciwgMzAwKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVTY3JvbGxFdmVudCAoYWN0aW9uKSB7XG4gICAgICAgIGlmICh0aW1lciAhPT0gbnVsbCAmJiBhY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIHJlc3RvcmVTY3JvbGxiYXIoKVxuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93WyBgJHsgYWN0aW9uIH1FdmVudExpc3RlbmVyYCBdKCdyZXNpemUnLCBoaWRlU2Nyb2xsYmFyKVxuICAgICAgfVxuXG4gICAgICB3YXRjaChcbiAgICAgICAgKCkgPT4gKHByb3BzLmNvbnRhaW5lciAhPT0gdHJ1ZSA/ICdhZGQnIDogJ3JlbW92ZScpLFxuICAgICAgICB1cGRhdGVTY3JvbGxFdmVudFxuICAgICAgKVxuXG4gICAgICBwcm9wcy5jb250YWluZXIgIT09IHRydWUgJiYgdXBkYXRlU2Nyb2xsRXZlbnQoJ2FkZCcpXG5cbiAgICAgIG9uVW5tb3VudGVkKCgpID0+IHtcbiAgICAgICAgdXBkYXRlU2Nyb2xsRXZlbnQoJ3JlbW92ZScpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgIGgoUVNjcm9sbE9ic2VydmVyLCB7IG9uU2Nyb2xsOiBvblBhZ2VTY3JvbGwgfSksXG4gICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7IG9uUmVzaXplOiBvblBhZ2VSZXNpemUgfSlcbiAgICAgIF0pXG5cbiAgICAgIGNvbnN0IGxheW91dCA9IGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcmVmOiBwcm9wcy5jb250YWluZXIgPT09IHRydWUgPyB2b2lkIDAgOiByb290UmVmLFxuICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgIH0sIGNvbnRlbnQpXG5cbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtbGF5b3V0LWNvbnRhaW5lciBvdmVyZmxvdy1oaWRkZW4nLFxuICAgICAgICAgIHJlZjogcm9vdFJlZlxuICAgICAgICB9LCBbXG4gICAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHsgb25SZXNpemU6IG9uQ29udGFpbmVyUmVzaXplIH0pLFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnYWJzb2x1dGUtZnVsbCcsXG4gICAgICAgICAgICBzdHlsZTogdGFyZ2V0U3R5bGUudmFsdWVcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnc2Nyb2xsJyxcbiAgICAgICAgICAgICAgc3R5bGU6IHRhcmdldENoaWxkU3R5bGUudmFsdWVcbiAgICAgICAgICAgIH0sIFsgbGF5b3V0IF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxheW91dFxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtbGF5b3V0IHZpZXc9XCJsSHIgbHBSIGxGclwiPlxuXG4gICAgPHEtcGFnZS1jb250YWluZXI+XG4gICAgICA8cS1wYWdlIGNsYXNzPVwiYmctZ3JhZGllbnRcIj5cbiAgICAgIDxyb3V0ZXItdmlldyAvPlxuICAgICAgPC9xLXBhZ2U+XG4gICAgPC9xLXBhZ2UtY29udGFpbmVyPlxuXG4gIDwvcS1sYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgZGVmaW5lQ29tcG9uZW50LCByZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQge2FwaX0gZnJvbSAnYm9vdC9heGlvcydcbmltcG9ydCB7cHVzaGVyLCBpbml0UHVzaGVyfSBmcm9tICdib290L3B1c2hlcidcbmltcG9ydCB7dXNlUm91dGV9IGZyb20gJ3Z1ZS1yb3V0ZXInXG5pbXBvcnQge2VtaXR0ZXJ9IGZyb20gJ2Jvb3QvbWl0dCdcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAnTWFpbkxheW91dCcsXG4gIHJvdXRlOiB1c2VSb3V0ZSxcbiAgXG4gIFxuICBkYXRhKCl7XG4gICAgcmV0dXJue1xuICAgICAgdXVpZDogJycsXG4gICAgICBwdXNoZXI6IHtjaGFubmVsOiBudWxsfSxcbiAgICB9XG4gIH0sXG5cbiAgbW91bnRlZCgpe1xuICAgIHRoaXMuZ2V0Q29va2llQW5kTG9naW4oKTtcbiAgICBcbiAgICBlbWl0dGVyLm9uKCdwdXNoZXIuc3Vic2NyaWJlJywgdWlkID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlQ2hhbm5lbCh1aWQpO1xuICAgIH0pO1xuICAgIC8vbGV0IG1vZElEXG4gICAgXG4gICAgLy90aGlzLnN1YnNjcmliZUNoYW5uZWwoKTtcbiAgfSxcbiAgXG5cbm1ldGhvZHM6IHtcblxuICBzdWJzY3JpYmVDaGFubmVsKHVpZCkge1xuICAgIGlmKHB1c2hlci5jaGFubmVsICE9IG51bGwpe1xuICAgICAgdGhpcy5wdXNoZXIuY2hhbm5lbCA9IHB1c2hlci51bmJpbmQoKTtcbiAgICB9XG4gICAgdGhpcy5wdXNoZXIuY2hhbm5lbCA9IHB1c2hlci5zdWJzY3JpYmUoYHByaXZhdGUtZ2FtaW5nZHJ2LiR7dWlkfWApXG4gICAgLy9lbWl0dGVyLm9uKCdwdXNoZXIuc3Vic2NyaWJlJywgdGhpcy5jb25uZWN0KVxuXG4gICAgdGhpcy5wdXNoZXIuY2hhbm5lbC5iaW5kKCdwdXNoZXI6c3Vic2NyaXB0aW9uX3N1Y2NlZWRlZCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAnQ29ubmVjdGVkIHRvIGNoYW5uZWwnXG4gICAgICAgIHRoaXMucHVzaGVyLmNvbm5lY3RlZCA9IHRydWVcblxuICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkIHRvIGNoYW5uZWwhJylcbiAgICAgICAgLy8gb25jZSBjb25uZWN0ZWQgdG8gY2hhbm5lbCwgYmluZCB0byB0aGUgZGlmZmVyZW50IGV2ZW50c1xuXG4gICAgICAgIC8vIC0tLSBQbGF5ZXIgcmVnaXN0ZXIgZXZlbnRcbiAgICAgICAgdGhpcy5wdXNoZXIuY2hhbm5lbC5iaW5kKCdwbGF5ZXIucmVnaXN0ZXJlZCcsIChkYXRhKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ05ldyBwbGF5ZXIgcmVnaXN0ZXJlZDogJywgZGF0YSlcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoJ3BsYXllci5yZWdpc3RlcmVkJywgZGF0YSlcbiAgICAgICAgICBcbiAgICAgICAgfSlcblxuICAgICAgICAvLyAtLS0gR2FtZSBzdGFydCBldmVudFxuICAgICAgICB0aGlzLnB1c2hlci5jaGFubmVsLmJpbmQoJ2dhbWUuc3RhcnQnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdHYW1lIHN0YXJ0ZWQ6ICcsIGRhdGEpXG4gICAgICAgICAgZW1pdHRlci5lbWl0KCdnYW1lLnN0YXJ0ZWQnLCBkYXRhKVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIC0tLSBTaG93IHF1ZXN0aW9uIGV2ZW50XG4gICAgICAgIHRoaXMucHVzaGVyLmNoYW5uZWwuYmluZCgncXVlc3Rpb24uc2hvdycsIChkYXRhKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ05ldyBxdWVzdGlvbjogJywgZGF0YSlcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoJ3F1ZXN0aW9uLnNob3cnLCBkYXRhKVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIC0tLSBRdWVzdGlvbiB0aW1lb3V0IGV2ZW50XG4gICAgICAgIHRoaXMucHVzaGVyLmNoYW5uZWwuYmluZCgncXVlc3Rpb24udGltZW91dCcsIChkYXRhKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Fuc3dlciB0aW1lb3V0OiAnLCBkYXRhKVxuICAgICAgICAgIGVtaXR0ZXIuZW1pdCgncXVlc3Rpb24udGltZW91dCcsIGRhdGEpXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gLS0tIFNob3cgcm91bmQgcmVzdWx0cyBldmVudFxuICAgICAgICB0aGlzLnB1c2hlci5jaGFubmVsLmJpbmQoJ3Jlc3VsdHMuc2hvdycsIChkYXRhKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VsdHM6ICcsIGRhdGEpXG4gICAgICAgICAgZW1pdHRlci5lbWl0KCdyZXN1bHRzLnNob3cnLCBkYXRhKVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIC0tLSBHYW1lIGVuZCBldmVudFxuICAgICAgICB0aGlzLnB1c2hlci5jaGFubmVsLmJpbmQoJ2dhbWUuZW5kJywgKGRhdGEpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnR2FtZSBlbmRlZDogJywgZGF0YSlcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoJ2dhbWUuZW5kZWQnLCBkYXRhKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgfSxcblxuICBnZXRDb29raWVBbmRMb2dpbigpe1xuICAgIGFwaS5nZXQoJy9zYW5jdHVtL2NzcmYtY29va2llJykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICBhcGkucG9zdCgnL2xvZ2luJywgeyBlbWFpbDogJ2dhbWluZ2Rydi50ZXN0QG1hcnVsay5udScsIHBhc3N3b3JkOiAnZ2FtaW5nZHJ2JyB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7IGNvbnNvbGUubG9nKCdMb2dnZWQgaW4hJykgfVxuICAgIH0pXG4gIH0pXG4gICAgLy90aGlzLmdldFF1ZXN0aW9uSUQoKTtcbiAgICAvL3RoaXMuZ2V0UXVlc3Rpb25MaXN0KCk7XG4gIH0sXG5cblxuICBcblxuXG59LFxufSlcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLmJnLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgI2ZmMDAwMCwgIzAwMDBmZik7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLyouYmctYmxhY2t7XG4gIGJhY2tncm91bmQ6YmxhY2s7XG4gIGhlaWdodDphdXRvO1xufSovXG5cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiY3NzIiwic2l6ZSIsImhlaWdodCIsIndpZHRoIiwicmVzcG9uc2UiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1BLElBQUEsaUJBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sTUFBTyxHQUFHLEVBQUUsU0FBUztBQUNuQixVQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUksRUFBQSxJQUFLLG1CQUFvQjtBQUU5QyxVQUFNLFVBQVUsT0FBTyxXQUFXLGFBQWE7QUFDL0MsUUFBSSxZQUFZLGVBQWU7QUFDN0IsY0FBUSxNQUFNLDZDQUE2QztBQUMzRCxhQUFPO0FBQUEsSUFDUjtBQUVELFlBQVEsa0JBQWtCLElBQUk7QUFFOUIsVUFBTSxRQUFRLFNBQVMsTUFBTTtBQUMzQixZQUFNQSxPQUFNLENBQUU7QUFFZCxVQUFJLFFBQVEsT0FBTyxVQUFVLE1BQU07QUFDakMsUUFBQUEsS0FBSSxhQUFhLEdBQUksUUFBUSxPQUFPO0FBQUEsTUFDckM7QUFDRCxVQUFJLFFBQVEsTUFBTSxVQUFVLE1BQU07QUFDaEMsUUFBQUEsS0FBSyxVQUFXLEdBQUcsS0FBSyxRQUFRLE9BQU8sU0FBUyxhQUFlLEdBQUksUUFBUSxNQUFNO0FBQUEsTUFDbEY7QUFDRCxVQUFJLFFBQVEsT0FBTyxVQUFVLE1BQU07QUFDakMsUUFBQUEsS0FBSSxnQkFBZ0IsR0FBSSxRQUFRLE9BQU87QUFBQSxNQUN4QztBQUNELFVBQUksUUFBUSxLQUFLLFVBQVUsTUFBTTtBQUMvQixRQUFBQSxLQUFLLFVBQVcsR0FBRyxLQUFLLFFBQVEsT0FBTyxVQUFVLFlBQWMsR0FBSSxRQUFRLEtBQUs7QUFBQSxNQUNqRjtBQUVELGFBQU9BO0FBQUEsSUFDYixDQUFLO0FBRUQsV0FBTyxNQUFNLEVBQUUsT0FBTztBQUFBLE1BQ3BCLE9BQU87QUFBQSxNQUNQLE9BQU8sTUFBTTtBQUFBLElBQ25C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
