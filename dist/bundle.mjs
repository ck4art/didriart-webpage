import Ce, { useRef as Ne, useEffect as we } from "react";
var h = { exports: {} }, N = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ve;
function pe() {
  if (ve) return N;
  ve = 1;
  var s = Symbol.for("react.transitional.element"), S = Symbol.for("react.fragment");
  function R(O, f, c) {
    var i = null;
    if (c !== void 0 && (i = "" + c), f.key !== void 0 && (i = "" + f.key), "key" in f) {
      c = {};
      for (var b in f)
        b !== "key" && (c[b] = f[b]);
    } else c = f;
    return f = c.ref, {
      $$typeof: s,
      type: O,
      key: i,
      ref: f !== void 0 ? f : null,
      props: c
    };
  }
  return N.Fragment = S, N.jsx = R, N.jsxs = R, N;
}
var w = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var be;
function ye() {
  return be || (be = 1, process.env.NODE_ENV !== "production" && function() {
    function s(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === Oe ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case U:
          return "Fragment";
        case _e:
          return "Portal";
        case K:
          return "Profiler";
        case Z:
          return "StrictMode";
        case I:
          return "Suspense";
        case $:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case D:
            return (e.displayName || "Context") + ".Provider";
          case Q:
            return (e._context.displayName || "Context") + ".Consumer";
          case M:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case W:
            return r = e.displayName || null, r !== null ? r : s(e.type) || "Memo";
          case L:
            r = e._payload, e = e._init;
            try {
              return s(e(r));
            } catch {
            }
        }
      return null;
    }
    function S(e) {
      return "" + e;
    }
    function R(e) {
      try {
        S(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var t = r.error, o = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          o
        ), S(e);
      }
    }
    function O() {
    }
    function f() {
      if (A === 0) {
        te = console.log, ne = console.info, oe = console.warn, ae = console.error, ue = console.group, le = console.groupCollapsed, fe = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: O,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      A++;
    }
    function c() {
      if (A--, A === 0) {
        var e = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: g({}, e, { value: te }),
          info: g({}, e, { value: ne }),
          warn: g({}, e, { value: oe }),
          error: g({}, e, { value: ae }),
          group: g({}, e, { value: ue }),
          groupCollapsed: g({}, e, { value: le }),
          groupEnd: g({}, e, { value: fe })
        });
      }
      0 > A && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function i(e) {
      if (z === void 0)
        try {
          throw Error();
        } catch (t) {
          var r = t.stack.trim().match(/\n( *(at )?)/);
          z = r && r[1] || "", se = -1 < t.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < t.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + z + e + se;
    }
    function b(e, r) {
      if (!e || J) return "";
      var t = V.get(e);
      if (t !== void 0) return t;
      J = !0, t = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var o = null;
      o = m.H, m.H = null, f();
      try {
        var u = {
          DetermineComponentFrameRoot: function() {
            try {
              if (r) {
                var v = function() {
                  throw Error();
                };
                if (Object.defineProperty(v.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(v, []);
                  } catch (d) {
                    var j = d;
                  }
                  Reflect.construct(e, [], v);
                } else {
                  try {
                    v.call();
                  } catch (d) {
                    j = d;
                  }
                  e.call(v.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (d) {
                  j = d;
                }
                (v = e()) && typeof v.catch == "function" && v.catch(function() {
                });
              }
            } catch (d) {
              if (d && j && typeof d.stack == "string")
                return [d.stack, j.stack];
            }
            return [null, null];
          }
        };
        u.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var a = Object.getOwnPropertyDescriptor(
          u.DetermineComponentFrameRoot,
          "name"
        );
        a && a.configurable && Object.defineProperty(
          u.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var n = u.DetermineComponentFrameRoot(), E = n[0], _ = n[1];
        if (E && _) {
          var l = E.split(`
`), T = _.split(`
`);
          for (n = a = 0; a < l.length && !l[a].includes(
            "DetermineComponentFrameRoot"
          ); )
            a++;
          for (; n < T.length && !T[n].includes(
            "DetermineComponentFrameRoot"
          ); )
            n++;
          if (a === l.length || n === T.length)
            for (a = l.length - 1, n = T.length - 1; 1 <= a && 0 <= n && l[a] !== T[n]; )
              n--;
          for (; 1 <= a && 0 <= n; a--, n--)
            if (l[a] !== T[n]) {
              if (a !== 1 || n !== 1)
                do
                  if (a--, n--, 0 > n || l[a] !== T[n]) {
                    var C = `
` + l[a].replace(
                      " at new ",
                      " at "
                    );
                    return e.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", e.displayName)), typeof e == "function" && V.set(e, C), C;
                  }
                while (1 <= a && 0 <= n);
              break;
            }
        }
      } finally {
        J = !1, m.H = o, c(), Error.prepareStackTrace = t;
      }
      return l = (l = e ? e.displayName || e.name : "") ? i(l) : "", typeof e == "function" && V.set(e, l), l;
    }
    function p(e) {
      if (e == null) return "";
      if (typeof e == "function") {
        var r = e.prototype;
        return b(
          e,
          !(!r || !r.isReactComponent)
        );
      }
      if (typeof e == "string") return i(e);
      switch (e) {
        case I:
          return i("Suspense");
        case $:
          return i("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case M:
            return e = b(e.render, !1), e;
          case W:
            return p(e.type);
          case L:
            r = e._payload, e = e._init;
            try {
              return p(e(r));
            } catch {
            }
        }
      return "";
    }
    function y() {
      var e = m.A;
      return e === null ? null : e.getOwner();
    }
    function G(e) {
      if (re.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function H(e, r) {
      function t() {
        ce || (ce = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      t.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: t,
        configurable: !0
      });
    }
    function B() {
      var e = s(this.type);
      return ie[e] || (ie[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function X(e, r, t, o, u, a) {
      return t = a.ref, e = {
        $$typeof: Y,
        type: e,
        key: r,
        props: a,
        _owner: u
      }, (t !== void 0 ? t : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: B
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function x(e, r, t, o, u, a) {
      if (typeof e == "string" || typeof e == "function" || e === U || e === K || e === Z || e === I || e === $ || e === Se || typeof e == "object" && e !== null && (e.$$typeof === L || e.$$typeof === W || e.$$typeof === D || e.$$typeof === Q || e.$$typeof === M || e.$$typeof === xe || e.getModuleId !== void 0)) {
        var n = r.children;
        if (n !== void 0)
          if (o)
            if (q(n)) {
              for (o = 0; o < n.length; o++)
                k(n[o], e);
              Object.freeze && Object.freeze(n);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else k(n, e);
      } else
        n = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (n += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? o = "null" : q(e) ? o = "array" : e !== void 0 && e.$$typeof === Y ? (o = "<" + (s(e.type) || "Unknown") + " />", n = " Did you accidentally export a JSX literal instead of a component?") : o = typeof e, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          o,
          n
        );
      if (re.call(r, "key")) {
        n = s(e);
        var E = Object.keys(r).filter(function(l) {
          return l !== "key";
        });
        o = 0 < E.length ? "{key: someKey, " + E.join(": ..., ") + ": ...}" : "{key: someKey}", Ee[n + o] || (E = 0 < E.length ? "{" + E.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          o,
          n,
          E,
          n
        ), Ee[n + o] = !0);
      }
      if (n = null, t !== void 0 && (R(t), n = "" + t), G(r) && (R(r.key), n = "" + r.key), "key" in r) {
        t = {};
        for (var _ in r)
          _ !== "key" && (t[_] = r[_]);
      } else t = r;
      return n && H(
        t,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), X(e, n, a, u, y(), t);
    }
    function k(e, r) {
      if (typeof e == "object" && e && e.$$typeof !== Ae) {
        if (q(e))
          for (var t = 0; t < e.length; t++) {
            var o = e[t];
            P(o) && F(o, r);
          }
        else if (P(e))
          e._store && (e._store.validated = 1);
        else if (e === null || typeof e != "object" ? t = null : (t = ee && e[ee] || e["@@iterator"], t = typeof t == "function" ? t : null), typeof t == "function" && t !== e.entries && (t = t.call(e), t !== e))
          for (; !(e = t.next()).done; )
            P(e.value) && F(e.value, r);
      }
    }
    function P(e) {
      return typeof e == "object" && e !== null && e.$$typeof === Y;
    }
    function F(e, r) {
      if (e._store && !e._store.validated && e.key == null && (e._store.validated = 1, r = Te(r), !de[r])) {
        de[r] = !0;
        var t = "";
        e && e._owner != null && e._owner !== y() && (t = null, typeof e._owner.tag == "number" ? t = s(e._owner.type) : typeof e._owner.name == "string" && (t = e._owner.name), t = " It was passed a child from " + t + ".");
        var o = m.getCurrentStack;
        m.getCurrentStack = function() {
          var u = p(e.type);
          return o && (u += o() || ""), u;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          r,
          t
        ), m.getCurrentStack = o;
      }
    }
    function Te(e) {
      var r = "", t = y();
      return t && (t = s(t.type)) && (r = `

Check the render method of \`` + t + "`."), r || (e = s(e)) && (r = `

Check the top-level render call using <` + e + ">."), r;
    }
    var Re = Ce, Y = Symbol.for("react.transitional.element"), _e = Symbol.for("react.portal"), U = Symbol.for("react.fragment"), Z = Symbol.for("react.strict_mode"), K = Symbol.for("react.profiler"), Q = Symbol.for("react.consumer"), D = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), $ = Symbol.for("react.suspense_list"), W = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), Se = Symbol.for("react.offscreen"), ee = Symbol.iterator, Oe = Symbol.for("react.client.reference"), m = Re.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, re = Object.prototype.hasOwnProperty, g = Object.assign, xe = Symbol.for("react.client.reference"), q = Array.isArray, A = 0, te, ne, oe, ae, ue, le, fe;
    O.__reactDisabledLog = !0;
    var z, se, J = !1, V = new (typeof WeakMap == "function" ? WeakMap : Map)(), Ae = Symbol.for("react.client.reference"), ce, ie = {}, Ee = {}, de = {};
    w.Fragment = U, w.jsx = function(e, r, t, o, u) {
      return x(e, r, t, !1, o, u);
    }, w.jsxs = function(e, r, t, o, u) {
      return x(e, r, t, !0, o, u);
    };
  }()), w;
}
var me;
function je() {
  return me || (me = 1, process.env.NODE_ENV === "production" ? h.exports = pe() : h.exports = ye()), h.exports;
}
var ge = je();
function ke({
  SIM_RESOLUTION: s = 128,
  DYE_RESOLUTION: S = 1440,
  CAPTURE_RESOLUTION: R = 512,
  DENSITY_DISSIPATION: O = 3.5,
  VELOCITY_DISSIPATION: f = 2,
  PRESSURE: c = 0.1,
  PRESSURE_ITERATIONS: i = 20,
  CURL: b = 3,
  SPLAT_RADIUS: p = 0.2,
  SPLAT_FORCE: y = 6e3,
  SHADING: G = !0,
  COLOR_UPDATE_SPEED: H = 10,
  BACK_COLOR: B = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT: X = !0
}) {
  const x = Ne(null);
  return we(() => {
    x.current;
  }, []), /* @__PURE__ */ ge.jsx("div", { className: "fixed top-0 left-0 z-50 pointer-events-none", children: /* @__PURE__ */ ge.jsx("canvas", { ref: x, id: "fluid", className: "w-screen h-screen" }) });
}
export {
  ke as SplashCursor
};
