!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], e)
    : e((t.echarts = {}));
})(this, function (t, window, document) {
  'use strict';
  function e(t, e) {
    function n() {
      this.constructor = t;
    }
    if ('function' != typeof e && null !== e)
      throw new TypeError('Class extends value ' + String(e) + ' is not a constructor or null');
    qg(t, e),
      (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
  }
  function n(t, e) {
    var n = e.browser,
      i = t.match(/Firefox\/([\d.]+)/),
      r = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/),
      o = t.match(/Edge?\/([\d.]+)/),
      a = /micromessenger/i.test(t);
    i && ((n.firefox = !0), (n.version = i[1])),
      r && ((n.ie = !0), (n.version = r[1])),
      o && ((n.edge = !0), (n.version = o[1]), (n.newEdge = +o[1].split('.')[0] > 18)),
      a && (n.weChat = !0),
      (e.svgSupported = 'undefined' != typeof SVGRect),
      (e.touchEventsSupported = 'ontouchstart' in window && !n.ie && !n.edge),
      (e.pointerEventsSupported =
        'onpointerdown' in window && (n.edge || (n.ie && +n.version >= 11))),
      (e.domSupported = 'undefined' != typeof document);
    var s = document.documentElement.style;
    (e.transform3dSupported =
      ((n.ie && 'transition' in s) ||
        n.edge ||
        ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()) ||
        'MozPerspective' in s) &&
      !('OTransition' in s)),
      (e.transformSupported = e.transform3dSupported || (n.ie && +n.version >= 9));
  }
  function i(t) {
    var e = {};
    if ('undefined' == typeof JSON) return e;
    for (var n = 0; n < t.length; n++) {
      var i = String.fromCharCode(n + 32),
        r = (t.charCodeAt(n) - ev) / nv;
      e[i] = r;
    }
    return e;
  }
  function r(t) {
    for (var e in ov) t[e] && (ov[e] = t[e]);
  }
  function o() {
    return yv++;
  }
  function a() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    'undefined' != typeof console && console.error.apply(console, t);
  }
  function s(t) {
    if (null == t || 'object' != typeof t) return t;
    var e = t,
      n = lv.call(t);
    if ('[object Array]' === n) {
      if (!U(t)) {
        e = [];
        for (var i = 0, r = t.length; r > i; i++) e[i] = s(t[i]);
      }
    } else if (sv[n]) {
      if (!U(t)) {
        var o = t.constructor;
        if (o.from) e = o.from(t);
        else {
          e = new o(t.length);
          for (var i = 0, r = t.length; r > i; i++) e[i] = t[i];
        }
      }
    } else if (!av[n] && !U(t) && !P(t)) {
      e = {};
      for (var a in t) t.hasOwnProperty(a) && a !== vv && (e[a] = s(t[a]));
    }
    return e;
  }
  function l(t, e, n) {
    if (!I(e) || !I(t)) return n ? s(e) : t;
    for (var i in e)
      if (e.hasOwnProperty(i) && i !== vv) {
        var r = t[i],
          o = e[i];
        !I(o) || !I(r) || M(o) || M(r) || P(o) || P(r) || A(o) || A(r) || U(o) || U(r)
          ? (!n && i in t) || (t[i] = s(e[i]))
          : l(r, o, n);
      }
    return t;
  }
  function u(t, e) {
    for (var n = t[0], i = 1, r = t.length; r > i; i++) n = l(n, t[i], e);
    return n;
  }
  function h(t, e) {
    if (Object.assign) Object.assign(t, e);
    else for (var n in e) e.hasOwnProperty(n) && n !== vv && (t[n] = e[n]);
    return t;
  }
  function c(t, e, n) {
    for (var i = w(e), r = 0; r < i.length; r++) {
      var o = i[r];
      (n ? null != e[o] : null == t[o]) && (t[o] = e[o]);
    }
    return t;
  }
  function p(t, e) {
    if (t) {
      if (t.indexOf) return t.indexOf(e);
      for (var n = 0, i = t.length; i > n; n++) if (t[n] === e) return n;
    }
    return -1;
  }
  function f(t, e) {
    function n() {}
    var i = t.prototype;
    (n.prototype = e.prototype), (t.prototype = new n());
    for (var r in i) i.hasOwnProperty(r) && (t.prototype[r] = i[r]);
    (t.prototype.constructor = t), (t.superClass = e);
  }
  function d(t, e, n) {
    if (
      ((t = 'prototype' in t ? t.prototype : t),
      (e = 'prototype' in e ? e.prototype : e),
      Object.getOwnPropertyNames)
    )
      for (var i = Object.getOwnPropertyNames(e), r = 0; r < i.length; r++) {
        var o = i[r];
        'constructor' !== o && (n ? null != e[o] : null == t[o]) && (t[o] = e[o]);
      }
    else c(t, e, n);
  }
  function g(t) {
    return t ? ('string' == typeof t ? !1 : 'number' == typeof t.length) : !1;
  }
  function v(t, e, n) {
    if (t && e)
      if (t.forEach && t.forEach === hv) t.forEach(e, n);
      else if (t.length === +t.length)
        for (var i = 0, r = t.length; r > i; i++) e.call(n, t[i], i, t);
      else for (var o in t) t.hasOwnProperty(o) && e.call(n, t[o], o, t);
  }
  function y(t, e, n) {
    if (!t) return [];
    if (!e) return V(t);
    if (t.map && t.map === fv) return t.map(e, n);
    for (var i = [], r = 0, o = t.length; o > r; r++) i.push(e.call(n, t[r], r, t));
    return i;
  }
  function m(t, e, n, i) {
    if (t && e) {
      for (var r = 0, o = t.length; o > r; r++) n = e.call(i, n, t[r], r, t);
      return n;
    }
  }
  function _(t, e, n) {
    if (!t) return [];
    if (!e) return V(t);
    if (t.filter && t.filter === cv) return t.filter(e, n);
    for (var i = [], r = 0, o = t.length; o > r; r++) e.call(n, t[r], r, t) && i.push(t[r]);
    return i;
  }
  function x(t, e, n) {
    if (t && e) for (var i = 0, r = t.length; r > i; i++) if (e.call(n, t[i], i, t)) return t[i];
  }
  function w(t) {
    if (!t) return [];
    if (Object.keys) return Object.keys(t);
    var e = [];
    for (var n in t) t.hasOwnProperty(n) && e.push(n);
    return e;
  }
  function b(t, e) {
    for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
    return function () {
      return t.apply(e, n.concat(pv.call(arguments)));
    };
  }
  function S(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    return function () {
      return t.apply(this, e.concat(pv.call(arguments)));
    };
  }
  function M(t) {
    return Array.isArray ? Array.isArray(t) : '[object Array]' === lv.call(t);
  }
  function T(t) {
    return 'function' == typeof t;
  }
  function C(t) {
    return 'string' == typeof t;
  }
  function k(t) {
    return '[object String]' === lv.call(t);
  }
  function D(t) {
    return 'number' == typeof t;
  }
  function I(t) {
    var e = typeof t;
    return 'function' === e || (!!t && 'object' === e);
  }
  function A(t) {
    return !!av[lv.call(t)];
  }
  function L(t) {
    return !!sv[lv.call(t)];
  }
  function P(t) {
    return (
      'object' == typeof t && 'number' == typeof t.nodeType && 'object' == typeof t.ownerDocument
    );
  }
  function O(t) {
    return null != t.colorStops;
  }
  function R(t) {
    return null != t.image;
  }
  function E(t) {
    return '[object RegExp]' === lv.call(t);
  }
  function B(t) {
    return t !== t;
  }
  function z() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    for (var n = 0, i = t.length; i > n; n++) if (null != t[n]) return t[n];
  }
  function N(t, e) {
    return null != t ? t : e;
  }
  function F(t, e, n) {
    return null != t ? t : null != e ? e : n;
  }
  function V(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    return pv.apply(t, e);
  }
  function H(t) {
    if ('number' == typeof t) return [t, t, t, t];
    var e = t.length;
    return 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t;
  }
  function W(t, e) {
    if (!t) throw new Error(e);
  }
  function G(t) {
    return null == t
      ? null
      : 'function' == typeof t.trim
      ? t.trim()
      : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }
  function Z(t) {
    t[xv] = !0;
  }
  function U(t) {
    return t[xv];
  }
  function X(t) {
    return new wv(t);
  }
  function Y(t, e) {
    for (var n = new t.constructor(t.length + e.length), i = 0; i < t.length; i++) n[i] = t[i];
    for (var r = t.length, i = 0; i < e.length; i++) n[i + r] = e[i];
    return n;
  }
  function q(t, e) {
    var n;
    if (Object.create) n = Object.create(t);
    else {
      var i = function () {};
      (i.prototype = t), (n = new i());
    }
    return e && h(n, e), n;
  }
  function j(t) {
    var e = t.style;
    (e.webkitUserSelect = 'none'),
      (e.userSelect = 'none'),
      (e.webkitTapHighlightColor = 'rgba(0,0,0,0)'),
      (e['-webkit-touch-callout'] = 'none');
  }
  function K(t, e) {
    return t.hasOwnProperty(e);
  }
  function $() {}
  function Q(t, e) {
    return null == t && (t = 0), null == e && (e = 0), [t, e];
  }
  function J(t, e) {
    return (t[0] = e[0]), (t[1] = e[1]), t;
  }
  function te(t) {
    return [t[0], t[1]];
  }
  function ee(t, e, n) {
    return (t[0] = e), (t[1] = n), t;
  }
  function ne(t, e, n) {
    return (t[0] = e[0] + n[0]), (t[1] = e[1] + n[1]), t;
  }
  function ie(t, e, n, i) {
    return (t[0] = e[0] + n[0] * i), (t[1] = e[1] + n[1] * i), t;
  }
  function re(t, e, n) {
    return (t[0] = e[0] - n[0]), (t[1] = e[1] - n[1]), t;
  }
  function oe(t) {
    return Math.sqrt(ae(t));
  }
  function ae(t) {
    return t[0] * t[0] + t[1] * t[1];
  }
  function se(t, e, n) {
    return (t[0] = e[0] * n[0]), (t[1] = e[1] * n[1]), t;
  }
  function le(t, e, n) {
    return (t[0] = e[0] / n[0]), (t[1] = e[1] / n[1]), t;
  }
  function ue(t, e) {
    return t[0] * e[0] + t[1] * e[1];
  }
  function he(t, e, n) {
    return (t[0] = e[0] * n), (t[1] = e[1] * n), t;
  }
  function ce(t, e) {
    var n = oe(e);
    return 0 === n ? ((t[0] = 0), (t[1] = 0)) : ((t[0] = e[0] / n), (t[1] = e[1] / n)), t;
  }
  function pe(t, e) {
    return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));
  }
  function fe(t, e) {
    return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]);
  }
  function de(t, e) {
    return (t[0] = -e[0]), (t[1] = -e[1]), t;
  }
  function ge(t, e, n, i) {
    return (t[0] = e[0] + i * (n[0] - e[0])), (t[1] = e[1] + i * (n[1] - e[1])), t;
  }
  function ve(t, e, n) {
    var i = e[0],
      r = e[1];
    return (t[0] = n[0] * i + n[2] * r + n[4]), (t[1] = n[1] * i + n[3] * r + n[5]), t;
  }
  function ye(t, e, n) {
    return (t[0] = Math.min(e[0], n[0])), (t[1] = Math.min(e[1], n[1])), t;
  }
  function me(t, e, n) {
    return (t[0] = Math.max(e[0], n[0])), (t[1] = Math.max(e[1], n[1])), t;
  }
  function _e(t, e, n, i, r, o) {
    var a = i + '-' + r,
      s = t.length;
    if (o.hasOwnProperty(a)) return o[a];
    if (1 === e) {
      var l = Math.round(Math.log(((1 << s) - 1) & ~r) / Pv);
      return t[n][l];
    }
    for (var u = i | (1 << n), h = n + 1; i & (1 << h); ) h++;
    for (var c = 0, p = 0, f = 0; s > p; p++) {
      var d = 1 << p;
      d & r || ((c += (f % 2 ? -1 : 1) * t[n][p] * _e(t, e - 1, h, u, r | d, o)), f++);
    }
    return (o[a] = c), c;
  }
  function xe(t, e) {
    var n = [
        [t[0], t[1], 1, 0, 0, 0, -e[0] * t[0], -e[0] * t[1]],
        [0, 0, 0, t[0], t[1], 1, -e[1] * t[0], -e[1] * t[1]],
        [t[2], t[3], 1, 0, 0, 0, -e[2] * t[2], -e[2] * t[3]],
        [0, 0, 0, t[2], t[3], 1, -e[3] * t[2], -e[3] * t[3]],
        [t[4], t[5], 1, 0, 0, 0, -e[4] * t[4], -e[4] * t[5]],
        [0, 0, 0, t[4], t[5], 1, -e[5] * t[4], -e[5] * t[5]],
        [t[6], t[7], 1, 0, 0, 0, -e[6] * t[6], -e[6] * t[7]],
        [0, 0, 0, t[6], t[7], 1, -e[7] * t[6], -e[7] * t[7]],
      ],
      i = {},
      r = _e(n, 8, 0, 0, 0, i);
    if (0 !== r) {
      for (var o = [], a = 0; 8 > a; a++)
        for (var s = 0; 8 > s; s++)
          null == o[s] && (o[s] = 0),
            (o[s] +=
              ((((a + s) % 2 ? -1 : 1) * _e(n, 7, 0 === a ? 1 : 0, 1 << a, 1 << s, i)) / r) * e[a]);
      return function (t, e, n) {
        var i = e * o[6] + n * o[7] + 1;
        (t[0] = (e * o[0] + n * o[1] + o[2]) / i), (t[1] = (e * o[3] + n * o[4] + o[5]) / i);
      };
    }
  }
  function we(t, e, n, i, r) {
    if (e.getBoundingClientRect && $g.domSupported && !Me(e)) {
      var o = e[Ov] || (e[Ov] = {}),
        a = be(e, o),
        s = Se(a, o, r);
      if (s) return s(t, n, i), !0;
    }
    return !1;
  }
  function be(t, e) {
    var n = e.markers;
    if (n) return n;
    n = e.markers = [];
    for (var i = ['left', 'right'], r = ['top', 'bottom'], o = 0; 4 > o; o++) {
      var a = document.createElement('div'),
        s = a.style,
        l = o % 2,
        u = (o >> 1) % 2;
      (s.cssText = [
        'position: absolute',
        'visibility: hidden',
        'padding: 0',
        'margin: 0',
        'border-width: 0',
        'user-select: none',
        'width:0',
        'height:0',
        i[l] + ':0',
        r[u] + ':0',
        i[1 - l] + ':auto',
        r[1 - u] + ':auto',
        '',
      ].join('!important;')),
        t.appendChild(a),
        n.push(a);
    }
    return n;
  }
  function Se(t, e, n) {
    for (
      var i = n ? 'invTrans' : 'trans', r = e[i], o = e.srcCoords, a = [], s = [], l = !0, u = 0;
      4 > u;
      u++
    ) {
      var h = t[u].getBoundingClientRect(),
        c = 2 * u,
        p = h.left,
        f = h.top;
      a.push(p, f),
        (l = l && o && p === o[c] && f === o[c + 1]),
        s.push(t[u].offsetLeft, t[u].offsetTop);
    }
    return l && r ? r : ((e.srcCoords = a), (e[i] = n ? xe(s, a) : xe(a, s)));
  }
  function Me(t) {
    return 'CANVAS' === t.nodeName.toUpperCase();
  }
  function Te(t, e, n, i) {
    return (
      (n = n || {}),
      i
        ? Ce(t, e, n)
        : Bv && null != e.layerX && e.layerX !== e.offsetX
        ? ((n.zrX = e.layerX), (n.zrY = e.layerY))
        : null != e.offsetX
        ? ((n.zrX = e.offsetX), (n.zrY = e.offsetY))
        : Ce(t, e, n),
      n
    );
  }
  function Ce(t, e, n) {
    if ($g.domSupported && t.getBoundingClientRect) {
      var i = e.clientX,
        r = e.clientY;
      if (Me(t)) {
        var o = t.getBoundingClientRect();
        return (n.zrX = i - o.left), void (n.zrY = r - o.top);
      }
      if (we(Ev, t, i, r)) return (n.zrX = Ev[0]), void (n.zrY = Ev[1]);
    }
    n.zrX = n.zrY = 0;
  }
  function ke(t) {
    return t || window.event;
  }
  function De(t, e, n) {
    if (((e = ke(e)), null != e.zrX)) return e;
    var i = e.type,
      r = i && i.indexOf('touch') >= 0;
    if (r) {
      var o = 'touchend' !== i ? e.targetTouches[0] : e.changedTouches[0];
      o && Te(t, o, e, n);
    } else {
      Te(t, e, e, n);
      var a = Ie(e);
      e.zrDelta = a ? a / 120 : -(e.detail || 0) / 3;
    }
    var s = e.button;
    return (
      null == e.which &&
        void 0 !== s &&
        Rv.test(e.type) &&
        (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0),
      e
    );
  }
  function Ie(t) {
    var e = t.wheelDelta;
    if (e) return e;
    var n = t.deltaX,
      i = t.deltaY;
    if (null == n || null == i) return e;
    var r = Math.abs(0 !== i ? i : n),
      o = i > 0 ? -1 : 0 > i ? 1 : n > 0 ? -1 : 1;
    return 3 * r * o;
  }
  function Ae(t, e, n, i) {
    t.addEventListener?.(e, n, i);
  }
  function Le(t, e, n, i) {
    t.removeEventListener(e, n, i);
  }
  function Pe(t) {
    return 2 === t.which || 3 === t.which;
  }
  function Oe(t) {
    var e = t[1][0] - t[0][0],
      n = t[1][1] - t[0][1];
    return Math.sqrt(e * e + n * n);
  }
  function Re(t) {
    return [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2];
  }
  function Ee(t, e, n) {
    return {
      type: t,
      event: n,
      target: e.target,
      topTarget: e.topTarget,
      cancelBubble: !1,
      offsetX: n.zrX,
      offsetY: n.zrY,
      gestureEvent: n.gestureEvent,
      pinchX: n.pinchX,
      pinchY: n.pinchY,
      pinchScale: n.pinchScale,
      wheelDelta: n.zrDelta,
      zrByTouch: n.zrByTouch,
      which: n.which,
      stop: Be,
    };
  }
  function Be() {
    zv(this.event);
  }
  function ze(t, e, n) {
    if (t[t.rectHover ? 'rectContain' : 'contain'](e, n)) {
      for (var i = t, r = void 0, o = !1; i; ) {
        if ((i.ignoreClip && (o = !0), !o)) {
          var a = i.getClipPath();
          if (a && !a.contain(e, n)) return !1;
          i.silent && (r = !0);
        }
        var s = i.__hostTarget;
        i = s ? s : i.parent;
      }
      return r ? Vv : !0;
    }
    return !1;
  }
  function Ne(t, e, n) {
    var i = t.painter;
    return 0 > e || e > i.getWidth() || 0 > n || n > i.getHeight();
  }
  function Fe(t) {
    for (var e = 0; t >= Xv; ) (e |= 1 & t), (t >>= 1);
    return t + e;
  }
  function Ve(t, e, n, i) {
    var r = e + 1;
    if (r === n) return 1;
    if (i(t[r++], t[e]) < 0) {
      for (; n > r && i(t[r], t[r - 1]) < 0; ) r++;
      He(t, e, r);
    } else for (; n > r && i(t[r], t[r - 1]) >= 0; ) r++;
    return r - e;
  }
  function He(t, e, n) {
    for (n--; n > e; ) {
      var i = t[e];
      (t[e++] = t[n]), (t[n--] = i);
    }
  }
  function We(t, e, n, i, r) {
    for (i === e && i++; n > i; i++) {
      for (var o, a = t[i], s = e, l = i; l > s; )
        (o = (s + l) >>> 1), r(a, t[o]) < 0 ? (l = o) : (s = o + 1);
      var u = i - s;
      switch (u) {
        case 3:
          t[s + 3] = t[s + 2];
        case 2:
          t[s + 2] = t[s + 1];
        case 1:
          t[s + 1] = t[s];
          break;
        default:
          for (; u > 0; ) (t[s + u] = t[s + u - 1]), u--;
      }
      t[s] = a;
    }
  }
  function Ge(t, e, n, i, r, o) {
    var a = 0,
      s = 0,
      l = 1;
    if (o(t, e[n + r]) > 0) {
      for (s = i - r; s > l && o(t, e[n + r + l]) > 0; )
        (a = l), (l = (l << 1) + 1), 0 >= l && (l = s);
      l > s && (l = s), (a += r), (l += r);
    } else {
      for (s = r + 1; s > l && o(t, e[n + r - l]) <= 0; )
        (a = l), (l = (l << 1) + 1), 0 >= l && (l = s);
      l > s && (l = s);
      var u = a;
      (a = r - l), (l = r - u);
    }
    for (a++; l > a; ) {
      var h = a + ((l - a) >>> 1);
      o(t, e[n + h]) > 0 ? (a = h + 1) : (l = h);
    }
    return l;
  }
  function Ze(t, e, n, i, r, o) {
    var a = 0,
      s = 0,
      l = 1;
    if (o(t, e[n + r]) < 0) {
      for (s = r + 1; s > l && o(t, e[n + r - l]) < 0; )
        (a = l), (l = (l << 1) + 1), 0 >= l && (l = s);
      l > s && (l = s);
      var u = a;
      (a = r - l), (l = r - u);
    } else {
      for (s = i - r; s > l && o(t, e[n + r + l]) >= 0; )
        (a = l), (l = (l << 1) + 1), 0 >= l && (l = s);
      l > s && (l = s), (a += r), (l += r);
    }
    for (a++; l > a; ) {
      var h = a + ((l - a) >>> 1);
      o(t, e[n + h]) < 0 ? (l = h) : (a = h + 1);
    }
    return l;
  }
  function Ue(t, e) {
    function n(t, e) {
      (l[c] = t), (u[c] = e), (c += 1);
    }
    function i() {
      for (; c > 1; ) {
        var t = c - 2;
        if ((t >= 1 && u[t - 1] <= u[t] + u[t + 1]) || (t >= 2 && u[t - 2] <= u[t] + u[t - 1]))
          u[t - 1] < u[t + 1] && t--;
        else if (u[t] > u[t + 1]) break;
        o(t);
      }
    }
    function r() {
      for (; c > 1; ) {
        var t = c - 2;
        t > 0 && u[t - 1] < u[t + 1] && t--, o(t);
      }
    }
    function o(n) {
      var i = l[n],
        r = u[n],
        o = l[n + 1],
        h = u[n + 1];
      (u[n] = r + h), n === c - 3 && ((l[n + 1] = l[n + 2]), (u[n + 1] = u[n + 2])), c--;
      var p = Ze(t[o], t, i, r, 0, e);
      (i += p),
        (r -= p),
        0 !== r &&
          ((h = Ge(t[i + r - 1], t, o, h, h - 1, e)),
          0 !== h && (h >= r ? a(i, r, o, h) : s(i, r, o, h)));
    }
    function a(n, i, r, o) {
      var a = 0;
      for (a = 0; i > a; a++) p[a] = t[n + a];
      var s = 0,
        l = r,
        u = n;
      if (((t[u++] = t[l++]), 0 !== --o)) {
        if (1 === i) {
          for (a = 0; o > a; a++) t[u + a] = t[l + a];
          return void (t[u + o] = p[s]);
        }
        for (var c, f, d, g = h; ; ) {
          (c = 0), (f = 0), (d = !1);
          do
            if (e(t[l], p[s]) < 0) {
              if (((t[u++] = t[l++]), f++, (c = 0), 0 === --o)) {
                d = !0;
                break;
              }
            } else if (((t[u++] = p[s++]), c++, (f = 0), 1 === --i)) {
              d = !0;
              break;
            }
          while (g > (c | f));
          if (d) break;
          do {
            if (((c = Ze(t[l], p, s, i, 0, e)), 0 !== c)) {
              for (a = 0; c > a; a++) t[u + a] = p[s + a];
              if (((u += c), (s += c), (i -= c), 1 >= i)) {
                d = !0;
                break;
              }
            }
            if (((t[u++] = t[l++]), 0 === --o)) {
              d = !0;
              break;
            }
            if (((f = Ge(p[s], t, l, o, 0, e)), 0 !== f)) {
              for (a = 0; f > a; a++) t[u + a] = t[l + a];
              if (((u += f), (l += f), (o -= f), 0 === o)) {
                d = !0;
                break;
              }
            }
            if (((t[u++] = p[s++]), 1 === --i)) {
              d = !0;
              break;
            }
            g--;
          } while (c >= Yv || f >= Yv);
          if (d) break;
          0 > g && (g = 0), (g += 2);
        }
        if (((h = g), 1 > h && (h = 1), 1 === i)) {
          for (a = 0; o > a; a++) t[u + a] = t[l + a];
          t[u + o] = p[s];
        } else {
          if (0 === i) throw new Error();
          for (a = 0; i > a; a++) t[u + a] = p[s + a];
        }
      } else for (a = 0; i > a; a++) t[u + a] = p[s + a];
    }
    function s(n, i, r, o) {
      var a = 0;
      for (a = 0; o > a; a++) p[a] = t[r + a];
      var s = n + i - 1,
        l = o - 1,
        u = r + o - 1,
        c = 0,
        f = 0;
      if (((t[u--] = t[s--]), 0 !== --i)) {
        if (1 === o) {
          for (u -= i, s -= i, f = u + 1, c = s + 1, a = i - 1; a >= 0; a--) t[f + a] = t[c + a];
          return void (t[u] = p[l]);
        }
        for (var d = h; ; ) {
          var g = 0,
            v = 0,
            y = !1;
          do
            if (e(p[l], t[s]) < 0) {
              if (((t[u--] = t[s--]), g++, (v = 0), 0 === --i)) {
                y = !0;
                break;
              }
            } else if (((t[u--] = p[l--]), v++, (g = 0), 1 === --o)) {
              y = !0;
              break;
            }
          while (d > (g | v));
          if (y) break;
          do {
            if (((g = i - Ze(p[l], t, n, i, i - 1, e)), 0 !== g)) {
              for (u -= g, s -= g, i -= g, f = u + 1, c = s + 1, a = g - 1; a >= 0; a--)
                t[f + a] = t[c + a];
              if (0 === i) {
                y = !0;
                break;
              }
            }
            if (((t[u--] = p[l--]), 1 === --o)) {
              y = !0;
              break;
            }
            if (((v = o - Ge(t[s], p, 0, o, o - 1, e)), 0 !== v)) {
              for (u -= v, l -= v, o -= v, f = u + 1, c = l + 1, a = 0; v > a; a++)
                t[f + a] = p[c + a];
              if (1 >= o) {
                y = !0;
                break;
              }
            }
            if (((t[u--] = t[s--]), 0 === --i)) {
              y = !0;
              break;
            }
            d--;
          } while (g >= Yv || v >= Yv);
          if (y) break;
          0 > d && (d = 0), (d += 2);
        }
        if (((h = d), 1 > h && (h = 1), 1 === o)) {
          for (u -= i, s -= i, f = u + 1, c = s + 1, a = i - 1; a >= 0; a--) t[f + a] = t[c + a];
          t[u] = p[l];
        } else {
          if (0 === o) throw new Error();
          for (c = u - (o - 1), a = 0; o > a; a++) t[c + a] = p[a];
        }
      } else for (c = u - (o - 1), a = 0; o > a; a++) t[c + a] = p[a];
    }
    var l,
      u,
      h = Yv,
      c = 0,
      p = [];
    return (l = []), (u = []), { mergeRuns: i, forceMergeRuns: r, pushRun: n };
  }
  function Xe(t, e, n, i) {
    n || (n = 0), i || (i = t.length);
    var r = i - n;
    if (!(2 > r)) {
      var o = 0;
      if (Xv > r) return (o = Ve(t, n, i, e)), void We(t, n, i, n + o, e);
      var a = Ue(t, e),
        s = Fe(r);
      do {
        if (((o = Ve(t, n, i, e)), s > o)) {
          var l = r;
          l > s && (l = s), We(t, n, n + l, n + o, e), (o = l);
        }
        a.pushRun(n, o), a.mergeRuns(), (r -= o), (n += o);
      } while (0 !== r);
      a.forceMergeRuns();
    }
  }
  function Ye() {
    $v ||
      (($v = !0),
      console.warn('z / z2 / zlevel of displayable is invalid, which may cause unexpected errors'));
  }
  function qe(t, e) {
    return t.zlevel === e.zlevel ? (t.z === e.z ? t.z2 - e.z2 : t.z - e.z) : t.zlevel - e.zlevel;
  }
  function je(t) {
    return t > -iy && iy > t;
  }
  function Ke(t) {
    return t > iy || -iy > t;
  }
  function $e(t, e, n, i, r) {
    var o = 1 - r;
    return o * o * (o * t + 3 * r * e) + r * r * (r * i + 3 * o * n);
  }
  function Qe(t, e, n, i, r) {
    var o = 1 - r;
    return 3 * (((e - t) * o + 2 * (n - e) * r) * o + (i - n) * r * r);
  }
  function Je(t, e, n, i, r, o) {
    var a = i + 3 * (e - n) - t,
      s = 3 * (n - 2 * e + t),
      l = 3 * (e - t),
      u = t - r,
      h = s * s - 3 * a * l,
      c = s * l - 9 * a * u,
      p = l * l - 3 * s * u,
      f = 0;
    if (je(h) && je(c))
      if (je(s)) o[0] = 0;
      else {
        var d = -l / s;
        d >= 0 && 1 >= d && (o[f++] = d);
      }
    else {
      var g = c * c - 4 * h * p;
      if (je(g)) {
        var v = c / h,
          d = -s / a + v,
          y = -v / 2;
        d >= 0 && 1 >= d && (o[f++] = d), y >= 0 && 1 >= y && (o[f++] = y);
      } else if (g > 0) {
        var m = ny(g),
          _ = h * s + 1.5 * a * (-c + m),
          x = h * s + 1.5 * a * (-c - m);
        (_ = 0 > _ ? -ey(-_, ay) : ey(_, ay)), (x = 0 > x ? -ey(-x, ay) : ey(x, ay));
        var d = (-s - (_ + x)) / (3 * a);
        d >= 0 && 1 >= d && (o[f++] = d);
      } else {
        var w = (2 * h * s - 3 * a * c) / (2 * ny(h * h * h)),
          b = Math.acos(w) / 3,
          S = ny(h),
          M = Math.cos(b),
          d = (-s - 2 * S * M) / (3 * a),
          y = (-s + S * (M + oy * Math.sin(b))) / (3 * a),
          T = (-s + S * (M - oy * Math.sin(b))) / (3 * a);
        d >= 0 && 1 >= d && (o[f++] = d),
          y >= 0 && 1 >= y && (o[f++] = y),
          T >= 0 && 1 >= T && (o[f++] = T);
      }
    }
    return f;
  }
  function tn(t, e, n, i, r) {
    var o = 6 * n - 12 * e + 6 * t,
      a = 9 * e + 3 * i - 3 * t - 9 * n,
      s = 3 * e - 3 * t,
      l = 0;
    if (je(a)) {
      if (Ke(o)) {
        var u = -s / o;
        u >= 0 && 1 >= u && (r[l++] = u);
      }
    } else {
      var h = o * o - 4 * a * s;
      if (je(h)) r[0] = -o / (2 * a);
      else if (h > 0) {
        var c = ny(h),
          u = (-o + c) / (2 * a),
          p = (-o - c) / (2 * a);
        u >= 0 && 1 >= u && (r[l++] = u), p >= 0 && 1 >= p && (r[l++] = p);
      }
    }
    return l;
  }
  function en(t, e, n, i, r, o) {
    var a = (e - t) * r + t,
      s = (n - e) * r + e,
      l = (i - n) * r + n,
      u = (s - a) * r + a,
      h = (l - s) * r + s,
      c = (h - u) * r + u;
    (o[0] = t), (o[1] = a), (o[2] = u), (o[3] = c), (o[4] = c), (o[5] = h), (o[6] = l), (o[7] = i);
  }
  function nn(t, e, n, i, r, o, a, s, l, u, h) {
    var c,
      p,
      f,
      d,
      g,
      v = 0.005,
      y = 1 / 0;
    (sy[0] = l), (sy[1] = u);
    for (var m = 0; 1 > m; m += 0.05)
      (ly[0] = $e(t, n, r, a, m)),
        (ly[1] = $e(e, i, o, s, m)),
        (d = kv(sy, ly)),
        y > d && ((c = m), (y = d));
    y = 1 / 0;
    for (var _ = 0; 32 > _ && !(ry > v); _++)
      (p = c - v),
        (f = c + v),
        (ly[0] = $e(t, n, r, a, p)),
        (ly[1] = $e(e, i, o, s, p)),
        (d = kv(ly, sy)),
        p >= 0 && y > d
          ? ((c = p), (y = d))
          : ((uy[0] = $e(t, n, r, a, f)),
            (uy[1] = $e(e, i, o, s, f)),
            (g = kv(uy, sy)),
            1 >= f && y > g ? ((c = f), (y = g)) : (v *= 0.5));
    return h && ((h[0] = $e(t, n, r, a, c)), (h[1] = $e(e, i, o, s, c))), ny(y);
  }
  function rn(t, e, n, i, r, o, a, s, l) {
    for (var u = t, h = e, c = 0, p = 1 / l, f = 1; l >= f; f++) {
      var d = f * p,
        g = $e(t, n, r, a, d),
        v = $e(e, i, o, s, d),
        y = g - u,
        m = v - h;
      (c += Math.sqrt(y * y + m * m)), (u = g), (h = v);
    }
    return c;
  }
  function on(t, e, n, i) {
    var r = 1 - i;
    return r * (r * t + 2 * i * e) + i * i * n;
  }
  function an(t, e, n, i) {
    return 2 * ((1 - i) * (e - t) + i * (n - e));
  }
  function sn(t, e, n, i, r) {
    var o = t - 2 * e + n,
      a = 2 * (e - t),
      s = t - i,
      l = 0;
    if (je(o)) {
      if (Ke(a)) {
        var u = -s / a;
        u >= 0 && 1 >= u && (r[l++] = u);
      }
    } else {
      var h = a * a - 4 * o * s;
      if (je(h)) {
        var u = -a / (2 * o);
        u >= 0 && 1 >= u && (r[l++] = u);
      } else if (h > 0) {
        var c = ny(h),
          u = (-a + c) / (2 * o),
          p = (-a - c) / (2 * o);
        u >= 0 && 1 >= u && (r[l++] = u), p >= 0 && 1 >= p && (r[l++] = p);
      }
    }
    return l;
  }
  function ln(t, e, n) {
    var i = t + n - 2 * e;
    return 0 === i ? 0.5 : (t - e) / i;
  }
  function un(t, e, n, i, r) {
    var o = (e - t) * i + t,
      a = (n - e) * i + e,
      s = (a - o) * i + o;
    (r[0] = t), (r[1] = o), (r[2] = s), (r[3] = s), (r[4] = a), (r[5] = n);
  }
  function hn(t, e, n, i, r, o, a, s, l) {
    var u,
      h = 0.005,
      c = 1 / 0;
    (sy[0] = a), (sy[1] = s);
    for (var p = 0; 1 > p; p += 0.05) {
      (ly[0] = on(t, n, r, p)), (ly[1] = on(e, i, o, p));
      var f = kv(sy, ly);
      c > f && ((u = p), (c = f));
    }
    c = 1 / 0;
    for (var d = 0; 32 > d && !(ry > h); d++) {
      var g = u - h,
        v = u + h;
      (ly[0] = on(t, n, r, g)), (ly[1] = on(e, i, o, g));
      var f = kv(ly, sy);
      if (g >= 0 && c > f) (u = g), (c = f);
      else {
        (uy[0] = on(t, n, r, v)), (uy[1] = on(e, i, o, v));
        var y = kv(uy, sy);
        1 >= v && c > y ? ((u = v), (c = y)) : (h *= 0.5);
      }
    }
    return l && ((l[0] = on(t, n, r, u)), (l[1] = on(e, i, o, u))), ny(c);
  }
  function cn(t, e, n, i, r, o, a) {
    for (var s = t, l = e, u = 0, h = 1 / a, c = 1; a >= c; c++) {
      var p = c * h,
        f = on(t, n, r, p),
        d = on(e, i, o, p),
        g = f - s,
        v = d - l;
      (u += Math.sqrt(g * g + v * v)), (s = f), (l = d);
    }
    return u;
  }
  function pn(t) {
    var e = t && hy.exec(t);
    if (e) {
      var n = e[1].split(','),
        i = +G(n[0]),
        r = +G(n[1]),
        o = +G(n[2]),
        a = +G(n[3]);
      if (isNaN(i + r + o + a)) return;
      var s = [];
      return function (t) {
        return 0 >= t ? 0 : t >= 1 ? 1 : Je(0, i, o, 1, t, s) && $e(0, r, a, 1, s[0]);
      };
    }
  }
  function fn(t) {
    return (t = Math.round(t)), 0 > t ? 0 : t > 255 ? 255 : t;
  }
  function dn(t) {
    return (t = Math.round(t)), 0 > t ? 0 : t > 360 ? 360 : t;
  }
  function gn(t) {
    return 0 > t ? 0 : t > 1 ? 1 : t;
  }
  function vn(t) {
    var e = t;
    return fn(
      e.length && '%' === e.charAt(e.length - 1) ? (parseFloat(e) / 100) * 255 : parseInt(e, 10)
    );
  }
  function yn(t) {
    var e = t;
    return gn(e.length && '%' === e.charAt(e.length - 1) ? parseFloat(e) / 100 : parseFloat(e));
  }
  function mn(t, e, n) {
    return (
      0 > n ? (n += 1) : n > 1 && (n -= 1),
      1 > 6 * n
        ? t + (e - t) * n * 6
        : 1 > 2 * n
        ? e
        : 2 > 3 * n
        ? t + (e - t) * (2 / 3 - n) * 6
        : t
    );
  }
  function _n(t, e, n) {
    return t + (e - t) * n;
  }
  function xn(t, e, n, i, r) {
    return (t[0] = e), (t[1] = n), (t[2] = i), (t[3] = r), t;
  }
  function wn(t, e) {
    return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t;
  }
  function bn(t, e) {
    yy && wn(yy, e), (yy = vy.put(t, yy || e.slice()));
  }
  function Sn(t, e) {
    if (t) {
      e = e || [];
      var n = vy.get(t);
      if (n) return wn(e, n);
      t += '';
      var i = t.replace(/ /g, '').toLowerCase();
      if (i in gy) return wn(e, gy[i]), bn(t, e), e;
      var r = i.length;
      if ('#' !== i.charAt(0)) {
        var o = i.indexOf('('),
          a = i.indexOf(')');
        if (-1 !== o && a + 1 === r) {
          var s = i.substr(0, o),
            l = i.substr(o + 1, a - (o + 1)).split(','),
            u = 1;
          switch (s) {
            case 'rgba':
              if (4 !== l.length)
                return 3 === l.length ? xn(e, +l[0], +l[1], +l[2], 1) : xn(e, 0, 0, 0, 1);
              u = yn(l.pop());
            case 'rgb':
              return 3 !== l.length
                ? void xn(e, 0, 0, 0, 1)
                : (xn(e, vn(l[0]), vn(l[1]), vn(l[2]), u), bn(t, e), e);
            case 'hsla':
              return 4 !== l.length
                ? void xn(e, 0, 0, 0, 1)
                : ((l[3] = yn(l[3])), Mn(l, e), bn(t, e), e);
            case 'hsl':
              return 3 !== l.length ? void xn(e, 0, 0, 0, 1) : (Mn(l, e), bn(t, e), e);
            default:
              return;
          }
        }
        xn(e, 0, 0, 0, 1);
      } else {
        if (4 === r || 5 === r) {
          var h = parseInt(i.slice(1, 4), 16);
          return h >= 0 && 4095 >= h
            ? (xn(
                e,
                ((3840 & h) >> 4) | ((3840 & h) >> 8),
                (240 & h) | ((240 & h) >> 4),
                (15 & h) | ((15 & h) << 4),
                5 === r ? parseInt(i.slice(4), 16) / 15 : 1
              ),
              bn(t, e),
              e)
            : void xn(e, 0, 0, 0, 1);
        }
        if (7 === r || 9 === r) {
          var h = parseInt(i.slice(1, 7), 16);
          return h >= 0 && 16777215 >= h
            ? (xn(
                e,
                (16711680 & h) >> 16,
                (65280 & h) >> 8,
                255 & h,
                9 === r ? parseInt(i.slice(7), 16) / 255 : 1
              ),
              bn(t, e),
              e)
            : void xn(e, 0, 0, 0, 1);
        }
      }
    }
  }
  function Mn(t, e) {
    var n = (((parseFloat(t[0]) % 360) + 360) % 360) / 360,
      i = yn(t[1]),
      r = yn(t[2]),
      o = 0.5 >= r ? r * (i + 1) : r + i - r * i,
      a = 2 * r - o;
    return (
      (e = e || []),
      xn(e, fn(255 * mn(a, o, n + 1 / 3)), fn(255 * mn(a, o, n)), fn(255 * mn(a, o, n - 1 / 3)), 1),
      4 === t.length && (e[3] = t[3]),
      e
    );
  }
  function Tn(t) {
    if (t) {
      var e,
        n,
        i = t[0] / 255,
        r = t[1] / 255,
        o = t[2] / 255,
        a = Math.min(i, r, o),
        s = Math.max(i, r, o),
        l = s - a,
        u = (s + a) / 2;
      if (0 === l) (e = 0), (n = 0);
      else {
        n = 0.5 > u ? l / (s + a) : l / (2 - s - a);
        var h = ((s - i) / 6 + l / 2) / l,
          c = ((s - r) / 6 + l / 2) / l,
          p = ((s - o) / 6 + l / 2) / l;
        i === s ? (e = p - c) : r === s ? (e = 1 / 3 + h - p) : o === s && (e = 2 / 3 + c - h),
          0 > e && (e += 1),
          e > 1 && (e -= 1);
      }
      var f = [360 * e, n, u];
      return null != t[3] && f.push(t[3]), f;
    }
  }
  function Cn(t, e) {
    var n = Sn(t);
    if (n) {
      for (var i = 0; 3 > i; i++)
        (n[i] = 0 > e ? (n[i] * (1 - e)) | 0 : ((255 - n[i]) * e + n[i]) | 0),
          n[i] > 255 ? (n[i] = 255) : n[i] < 0 && (n[i] = 0);
      return Pn(n, 4 === n.length ? 'rgba' : 'rgb');
    }
  }
  function kn(t) {
    var e = Sn(t);
    return e ? ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1) : void 0;
  }
  function Dn(t, e, n) {
    if (e && e.length && t >= 0 && 1 >= t) {
      n = n || [];
      var i = t * (e.length - 1),
        r = Math.floor(i),
        o = Math.ceil(i),
        a = e[r],
        s = e[o],
        l = i - r;
      return (
        (n[0] = fn(_n(a[0], s[0], l))),
        (n[1] = fn(_n(a[1], s[1], l))),
        (n[2] = fn(_n(a[2], s[2], l))),
        (n[3] = gn(_n(a[3], s[3], l))),
        n
      );
    }
  }
  function In(t, e, n) {
    if (e && e.length && t >= 0 && 1 >= t) {
      var i = t * (e.length - 1),
        r = Math.floor(i),
        o = Math.ceil(i),
        a = Sn(e[r]),
        s = Sn(e[o]),
        l = i - r,
        u = Pn(
          [
            fn(_n(a[0], s[0], l)),
            fn(_n(a[1], s[1], l)),
            fn(_n(a[2], s[2], l)),
            gn(_n(a[3], s[3], l)),
          ],
          'rgba'
        );
      return n ? { color: u, leftIndex: r, rightIndex: o, value: i } : u;
    }
  }
  function An(t, e, n, i) {
    var r = Sn(t);
    return t
      ? ((r = Tn(r)),
        null != e && (r[0] = dn(e)),
        null != n && (r[1] = yn(n)),
        null != i && (r[2] = yn(i)),
        Pn(Mn(r), 'rgba'))
      : void 0;
  }
  function Ln(t, e) {
    var n = Sn(t);
    return n && null != e ? ((n[3] = gn(e)), Pn(n, 'rgba')) : void 0;
  }
  function Pn(t, e) {
    if (t && t.length) {
      var n = t[0] + ',' + t[1] + ',' + t[2];
      return ('rgba' === e || 'hsva' === e || 'hsla' === e) && (n += ',' + t[3]), e + '(' + n + ')';
    }
  }
  function On(t, e) {
    var n = Sn(t);
    return n ? ((0.299 * n[0] + 0.587 * n[1] + 0.114 * n[2]) * n[3]) / 255 + (1 - n[3]) * e : 0;
  }
  function Rn() {
    return Pn(
      [
        Math.round(255 * Math.random()),
        Math.round(255 * Math.random()),
        Math.round(255 * Math.random()),
      ],
      'rgb'
    );
  }
  function En(t) {
    return 'linear' === t.type;
  }
  function Bn(t) {
    return 'radial' === t.type;
  }
  function zn(t, e, n) {
    return (e - t) * n + t;
  }
  function Nn(t, e, n, i) {
    for (var r = e.length, o = 0; r > o; o++) t[o] = zn(e[o], n[o], i);
    return t;
  }
  function Fn(t, e, n, i) {
    for (var r = e.length, o = r && e[0].length, a = 0; r > a; a++) {
      t[a] || (t[a] = []);
      for (var s = 0; o > s; s++) t[a][s] = zn(e[a][s], n[a][s], i);
    }
    return t;
  }
  function Vn(t, e, n, i) {
    for (var r = e.length, o = 0; r > o; o++) t[o] = e[o] + n[o] * i;
    return t;
  }
  function Hn(t, e, n, i) {
    for (var r = e.length, o = r && e[0].length, a = 0; r > a; a++) {
      t[a] || (t[a] = []);
      for (var s = 0; o > s; s++) t[a][s] = e[a][s] + n[a][s] * i;
    }
    return t;
  }
  function Wn(t, e) {
    for (
      var n = t.length,
        i = e.length,
        r = n > i ? e : t,
        o = Math.min(n, i),
        a = r[o - 1] || { color: [0, 0, 0, 0], offset: 0 },
        s = o;
      s < Math.max(n, i);
      s++
    )
      r.push({ offset: a.offset, color: a.color.slice() });
  }
  function Gn(t, e, n) {
    var i = t,
      r = e;
    if (i.push && r.push) {
      var o = i.length,
        a = r.length;
      if (o !== a) {
        var s = o > a;
        if (s) i.length = a;
        else for (var l = o; a > l; l++) i.push(1 === n ? r[l] : wy.call(r[l]));
      }
      for (var u = i[0] && i[0].length, l = 0; l < i.length; l++)
        if (1 === n) isNaN(i[l]) && (i[l] = r[l]);
        else for (var h = 0; u > h; h++) isNaN(i[l][h]) && (i[l][h] = r[l][h]);
    }
  }
  function Zn(t) {
    if (g(t)) {
      var e = t.length;
      if (g(t[0])) {
        for (var n = [], i = 0; e > i; i++) n.push(wy.call(t[i]));
        return n;
      }
      return wy.call(t);
    }
    return t;
  }
  function Un(t) {
    return (
      (t[0] = Math.floor(t[0]) || 0),
      (t[1] = Math.floor(t[1]) || 0),
      (t[2] = Math.floor(t[2]) || 0),
      (t[3] = null == t[3] ? 1 : t[3]),
      'rgba(' + t.join(',') + ')'
    );
  }
  function Xn(t) {
    return g(t && t[0]) ? 2 : 1;
  }
  function Yn(t) {
    return t === Cy || t === ky;
  }
  function qn(t) {
    return t === Sy || t === My;
  }
  function jn() {
    return new Date().getTime();
  }
  function Kn(t) {
    var e = t.pointerType;
    return 'pen' === e || 'touch' === e;
  }
  function $n(t) {
    (t.touching = !0),
      null != t.touchTimer && (clearTimeout(t.touchTimer), (t.touchTimer = null)),
      (t.touchTimer = setTimeout(function () {
        (t.touching = !1), (t.touchTimer = null);
      }, 700));
  }
  function Qn(t) {
    t && (t.zrByTouch = !0);
  }
  function Jn(t, e) {
    return De(t.dom, new Ny(t, e), !0);
  }
  function ti(t, e) {
    for (
      var n = e, i = !1;
      n && 9 !== n.nodeType && !(i = n.domBelongToZr || (n !== e && n === t.painterRoot));

    )
      n = n.parentNode;
    return i;
  }
  function ei(t, e) {
    var n = e.domHandlers;
    $g.pointerEventsSupported
      ? v(Ey.pointer, function (i) {
          ii(e, i, function (e) {
            n[i].call(t, e);
          });
        })
      : ($g.touchEventsSupported &&
          v(Ey.touch, function (i) {
            ii(e, i, function (r) {
              n[i].call(t, r), $n(e);
            });
          }),
        v(Ey.mouse, function (i) {
          ii(e, i, function (r) {
            (r = ke(r)), e.touching || n[i].call(t, r);
          });
        }));
  }
  function ni(t, e) {
    function n(n) {
      function i(i) {
        (i = ke(i)), ti(t, i.target) || ((i = Jn(t, i)), e.domHandlers[n].call(t, i));
      }
      ii(e, n, i, { capture: !0 });
    }
    $g.pointerEventsSupported ? v(By.pointer, n) : $g.touchEventsSupported || v(By.mouse, n);
  }
  function ii(t, e, n, i) {
    (t.mounted[e] = n), (t.listenerOpts[e] = i), Ae(t.domTarget, e, n, i);
  }
  function ri(t) {
    var e = t.mounted;
    for (var n in e) e.hasOwnProperty(n) && Le(t.domTarget, n, e[n], t.listenerOpts[n]);
    t.mounted = {};
  }
  function oi() {
    return [1, 0, 0, 1, 0, 0];
  }
  function ai(t) {
    return (t[0] = 1), (t[1] = 0), (t[2] = 0), (t[3] = 1), (t[4] = 0), (t[5] = 0), t;
  }
  function si(t, e) {
    return (
      (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), (t[4] = e[4]), (t[5] = e[5]), t
    );
  }
  function li(t, e, n) {
    var i = e[0] * n[0] + e[2] * n[1],
      r = e[1] * n[0] + e[3] * n[1],
      o = e[0] * n[2] + e[2] * n[3],
      a = e[1] * n[2] + e[3] * n[3],
      s = e[0] * n[4] + e[2] * n[5] + e[4],
      l = e[1] * n[4] + e[3] * n[5] + e[5];
    return (t[0] = i), (t[1] = r), (t[2] = o), (t[3] = a), (t[4] = s), (t[5] = l), t;
  }
  function ui(t, e, n) {
    return (
      (t[0] = e[0]),
      (t[1] = e[1]),
      (t[2] = e[2]),
      (t[3] = e[3]),
      (t[4] = e[4] + n[0]),
      (t[5] = e[5] + n[1]),
      t
    );
  }
  function hi(t, e, n) {
    var i = e[0],
      r = e[2],
      o = e[4],
      a = e[1],
      s = e[3],
      l = e[5],
      u = Math.sin(n),
      h = Math.cos(n);
    return (
      (t[0] = i * h + a * u),
      (t[1] = -i * u + a * h),
      (t[2] = r * h + s * u),
      (t[3] = -r * u + h * s),
      (t[4] = h * o + u * l),
      (t[5] = h * l - u * o),
      t
    );
  }
  function ci(t, e, n) {
    var i = n[0],
      r = n[1];
    return (
      (t[0] = e[0] * i),
      (t[1] = e[1] * r),
      (t[2] = e[2] * i),
      (t[3] = e[3] * r),
      (t[4] = e[4] * i),
      (t[5] = e[5] * r),
      t
    );
  }
  function pi(t, e) {
    var n = e[0],
      i = e[2],
      r = e[4],
      o = e[1],
      a = e[3],
      s = e[5],
      l = n * a - o * i;
    return l
      ? ((l = 1 / l),
        (t[0] = a * l),
        (t[1] = -o * l),
        (t[2] = -i * l),
        (t[3] = n * l),
        (t[4] = (i * s - a * r) * l),
        (t[5] = (o * r - n * s) * l),
        t)
      : null;
  }
  function fi(t) {
    var e = oi();
    return si(e, t), e;
  }
  function di(t) {
    return t > $y || -$y > t;
  }
  function gi(t, e) {
    for (var n = 0; n < im.length; n++) {
      var i = im[n];
      t[i] = e[i];
    }
  }
  function vi(t, e) {
    e = e || tv;
    var n = dm[e];
    n || (n = dm[e] = new dy(500));
    var i = n.get(t);
    return null == i && ((i = ov.measureText(t, e).width), n.put(t, i)), i;
  }
  function yi(t, e, n, i) {
    var r = vi(t, e),
      o = wi(e),
      a = _i(0, r, n),
      s = xi(0, o, i),
      l = new fm(a, s, r, o);
    return l;
  }
  function mi(t, e, n, i) {
    var r = ((t || '') + '').split('\n'),
      o = r.length;
    if (1 === o) return yi(r[0], e, n, i);
    for (var a = new fm(0, 0, 0, 0), s = 0; s < r.length; s++) {
      var l = yi(r[s], e, n, i);
      0 === s ? a.copy(l) : a.union(l);
    }
    return a;
  }
  function _i(t, e, n) {
    return 'right' === n ? (t -= e) : 'center' === n && (t -= e / 2), t;
  }
  function xi(t, e, n) {
    return 'middle' === n ? (t -= e / 2) : 'bottom' === n && (t -= e), t;
  }
  function wi(t) {
    return vi('国', t);
  }
  function bi(t, e) {
    return 'string' == typeof t
      ? t.lastIndexOf('%') >= 0
        ? (parseFloat(t) / 100) * e
        : parseFloat(t)
      : t;
  }
  function Si(t, e, n) {
    var i = e.position || 'inside',
      r = null != e.distance ? e.distance : 5,
      o = n.height,
      a = n.width,
      s = o / 2,
      l = n.x,
      u = n.y,
      h = 'left',
      c = 'top';
    if (i instanceof Array)
      (l += bi(i[0], n.width)), (u += bi(i[1], n.height)), (h = null), (c = null);
    else
      switch (i) {
        case 'left':
          (l -= r), (u += s), (h = 'right'), (c = 'middle');
          break;
        case 'right':
          (l += r + a), (u += s), (c = 'middle');
          break;
        case 'top':
          (l += a / 2), (u -= r), (h = 'center'), (c = 'bottom');
          break;
        case 'bottom':
          (l += a / 2), (u += o + r), (h = 'center');
          break;
        case 'inside':
          (l += a / 2), (u += s), (h = 'center'), (c = 'middle');
          break;
        case 'insideLeft':
          (l += r), (u += s), (c = 'middle');
          break;
        case 'insideRight':
          (l += a - r), (u += s), (h = 'right'), (c = 'middle');
          break;
        case 'insideTop':
          (l += a / 2), (u += r), (h = 'center');
          break;
        case 'insideBottom':
          (l += a / 2), (u += o - r), (h = 'center'), (c = 'bottom');
          break;
        case 'insideTopLeft':
          (l += r), (u += r);
          break;
        case 'insideTopRight':
          (l += a - r), (u += r), (h = 'right');
          break;
        case 'insideBottomLeft':
          (l += r), (u += o - r), (c = 'bottom');
          break;
        case 'insideBottomRight':
          (l += a - r), (u += o - r), (h = 'right'), (c = 'bottom');
      }
    return (t = t || {}), (t.x = l), (t.y = u), (t.align = h), (t.verticalAlign = c), t;
  }
  function Mi(t, e, n, i, r) {
    n = n || {};
    var o = [];
    Ai(t, '', t, e, n, i, o, r);
    var a = o.length,
      s = !1,
      l = n.done,
      u = n.aborted,
      h = function () {
        (s = !0), a--, 0 >= a && (s ? l && l() : u && u());
      },
      c = function () {
        a--, 0 >= a && (s ? l && l() : u && u());
      };
    a || (l && l()),
      o.length > 0 &&
        n.during &&
        o[0].during(function (t, e) {
          n.during(e);
        });
    for (var p = 0; p < o.length; p++) {
      var f = o[p];
      h && f.done(h), c && f.aborted(c), n.force && f.duration(n.duration), f.start(n.easing);
    }
    return o;
  }
  function Ti(t, e, n) {
    for (var i = 0; n > i; i++) t[i] = e[i];
  }
  function Ci(t) {
    return g(t[0]);
  }
  function ki(t, e, n) {
    if (g(e[n]))
      if ((g(t[n]) || (t[n] = []), L(e[n]))) {
        var i = e[n].length;
        t[n].length !== i && ((t[n] = new e[n].constructor(i)), Ti(t[n], e[n], i));
      } else {
        var r = e[n],
          o = t[n],
          a = r.length;
        if (Ci(r))
          for (var s = r[0].length, l = 0; a > l; l++)
            o[l] ? Ti(o[l], r[l], s) : (o[l] = Array.prototype.slice.call(r[l]));
        else Ti(o, r, a);
        o.length = r.length;
      }
    else t[n] = e[n];
  }
  function Di(t, e) {
    return t === e || (g(t) && g(e) && Ii(t, e));
  }
  function Ii(t, e) {
    var n = t.length;
    if (n !== e.length) return !1;
    for (var i = 0; n > i; i++) if (t[i] !== e[i]) return !1;
    return !0;
  }
  function Ai(t, e, n, i, r, o, a, s) {
    for (
      var l = w(i),
        u = r.duration,
        h = r.delay,
        c = r.additive,
        f = r.setToFinal,
        d = !I(o),
        v = t.animators,
        y = [],
        m = 0;
      m < l.length;
      m++
    ) {
      var x = l[m],
        b = i[x];
      if (null != b && null != n[x] && (d || o[x]))
        if (!I(b) || g(b) || O(b)) y.push(x);
        else {
          if (e) {
            s || ((n[x] = b), t.updateDuringAnimation(e));
            continue;
          }
          Ai(t, x, n[x], b, r, o && o[x], a, s);
        }
      else s || ((n[x] = b), t.updateDuringAnimation(e), y.push(x));
    }
    var S = y.length;
    if (!c && S)
      for (var M = 0; M < v.length; M++) {
        var T = v[M];
        if (T.targetName === e) {
          var C = T.stopTracks(y);
          if (C) {
            var k = p(v, T);
            v.splice(k, 1);
          }
        }
      }
    if (
      (r.force ||
        ((y = _(y, function (t) {
          return !Di(i[t], n[t]);
        })),
        (S = y.length)),
      S > 0 || (r.force && !a.length))
    ) {
      var D = void 0,
        A = void 0,
        L = void 0;
      if (s) {
        (A = {}), f && (D = {});
        for (var M = 0; S > M; M++) {
          var x = y[M];
          (A[x] = n[x]), f ? (D[x] = i[x]) : (n[x] = i[x]);
        }
      } else if (f) {
        L = {};
        for (var M = 0; S > M; M++) {
          var x = y[M];
          (L[x] = Zn(n[x])), ki(n, i, x);
        }
      }
      var T = new Ly(
        n,
        !1,
        !1,
        c
          ? _(v, function (t) {
              return t.targetName === e;
            })
          : null
      );
      (T.targetName = e),
        r.scope && (T.scope = r.scope),
        f && D && T.whenWithKeys(0, D, y),
        L && T.whenWithKeys(0, L, y),
        T.whenWithKeys(null == u ? 500 : u, s ? A : i, y).delay(h || 0),
        t.addAnimator(T, e),
        a.push(T);
    }
  }
  function Li(t) {
    delete Sm[t];
  }
  function Pi(t) {
    if (!t) return !1;
    if ('string' == typeof t) return On(t, 1) < Uy;
    if (t.colorStops) {
      for (var e = t.colorStops, n = 0, i = e.length, r = 0; i > r; r++) n += On(e[r].color, 1);
      return (n /= i), Uy > n;
    }
    return !1;
  }
  function Oi(t, e) {
    var n = new Mm(o(), t, e);
    return (Sm[n.id] = n), n;
  }
  function Ri(t) {
    t.dispose();
  }
  function Ei() {
    for (var t in Sm) Sm.hasOwnProperty(t) && Sm[t].dispose();
    Sm = {};
  }
  function Bi(t) {
    return Sm[t];
  }
  function zi(t, e) {
    bm[t] = e;
  }
  function Ni(t) {
    return t.replace(/^\s+|\s+$/g, '');
  }
  function Fi(t, e, n, i) {
    var r = e[0],
      o = e[1],
      a = n[0],
      s = n[1],
      l = o - r,
      u = s - a;
    if (0 === l) return 0 === u ? a : (a + s) / 2;
    if (i)
      if (l > 0) {
        if (r >= t) return a;
        if (t >= o) return s;
      } else {
        if (t >= r) return a;
        if (o >= t) return s;
      }
    else {
      if (t === r) return a;
      if (t === o) return s;
    }
    return ((t - r) / l) * u + a;
  }
  function Vi(t, e) {
    switch (t) {
      case 'center':
      case 'middle':
        t = '50%';
        break;
      case 'left':
      case 'top':
        t = '0%';
        break;
      case 'right':
      case 'bottom':
        t = '100%';
    }
    return C(t)
      ? Ni(t).match(/%$/)
        ? (parseFloat(t) / 100) * e
        : parseFloat(t)
      : null == t
      ? 0 / 0
      : +t;
  }
  function Hi(t, e, n) {
    return (
      null == e && (e = 10), (e = Math.min(Math.max(0, e), Dm)), (t = (+t).toFixed(e)), n ? t : +t
    );
  }
  function Wi(t) {
    return (
      t.sort(function (t, e) {
        return t - e;
      }),
      t
    );
  }
  function Gi(t) {
    if (((t = +t), isNaN(t))) return 0;
    if (t > 1e-14)
      for (var e = 1, n = 0; 15 > n; n++, e *= 10) if (Math.round(t * e) / e === t) return n;
    return Zi(t);
  }
  function Zi(t) {
    var e = t.toString().toLowerCase(),
      n = e.indexOf('e'),
      i = n > 0 ? +e.slice(n + 1) : 0,
      r = n > 0 ? n : e.length,
      o = e.indexOf('.'),
      a = 0 > o ? 0 : r - 1 - o;
    return Math.max(0, a - i);
  }
  function Ui(t, e) {
    var n = Math.log,
      i = Math.LN10,
      r = Math.floor(n(t[1] - t[0]) / i),
      o = Math.round(n(Math.abs(e[1] - e[0])) / i),
      a = Math.min(Math.max(-r + o, 0), 20);
    return isFinite(a) ? a : 20;
  }
  function Xi(t, e, n) {
    if (!t[e]) return 0;
    var i = m(
      t,
      function (t, e) {
        return t + (isNaN(e) ? 0 : e);
      },
      0
    );
    if (0 === i) return 0;
    for (
      var r = Math.pow(10, n),
        o = y(t, function (t) {
          return ((isNaN(t) ? 0 : t) / i) * r * 100;
        }),
        a = 100 * r,
        s = y(o, function (t) {
          return Math.floor(t);
        }),
        l = m(
          s,
          function (t, e) {
            return t + e;
          },
          0
        ),
        u = y(o, function (t, e) {
          return t - s[e];
        });
      a > l;

    ) {
      for (var h = Number.NEGATIVE_INFINITY, c = null, p = 0, f = u.length; f > p; ++p)
        u[p] > h && ((h = u[p]), (c = p));
      ++s[c], (u[c] = 0), ++l;
    }
    return s[e] / r;
  }
  function Yi(t, e) {
    var n = Math.max(Gi(t), Gi(e)),
      i = t + e;
    return n > Dm ? i : Hi(i, n);
  }
  function qi(t) {
    var e = 2 * Math.PI;
    return ((t % e) + e) % e;
  }
  function ji(t) {
    return t > -km && km > t;
  }
  function Ki(t) {
    if (t instanceof Date) return t;
    if (C(t)) {
      var e = Am.exec(t);
      if (!e) return new Date(0 / 0);
      if (e[8]) {
        var n = +e[4] || 0;
        return (
          'Z' !== e[8].toUpperCase() && (n -= +e[8].slice(0, 3)),
          new Date(
            Date.UTC(
              +e[1],
              +(e[2] || 1) - 1,
              +e[3] || 1,
              n,
              +(e[5] || 0),
              +e[6] || 0,
              e[7] ? +e[7].substring(0, 3) : 0
            )
          )
        );
      }
      return new Date(
        +e[1],
        +(e[2] || 1) - 1,
        +e[3] || 1,
        +e[4] || 0,
        +(e[5] || 0),
        +e[6] || 0,
        e[7] ? +e[7].substring(0, 3) : 0
      );
    }
    return new Date(null == t ? 0 / 0 : Math.round(t));
  }
  function $i(t) {
    return Math.pow(10, Qi(t));
  }
  function Qi(t) {
    if (0 === t) return 0;
    var e = Math.floor(Math.log(t) / Math.LN10);
    return t / Math.pow(10, e) >= 10 && e++, e;
  }
  function Ji(t, e) {
    var n,
      i = Qi(t),
      r = Math.pow(10, i),
      o = t / r;
    return (
      (n = e
        ? 1.5 > o
          ? 1
          : 2.5 > o
          ? 2
          : 4 > o
          ? 3
          : 7 > o
          ? 5
          : 10
        : 1 > o
        ? 1
        : 2 > o
        ? 2
        : 3 > o
        ? 3
        : 5 > o
        ? 5
        : 10),
      (t = n * r),
      i >= -20 ? +t.toFixed(0 > i ? -i : 0) : t
    );
  }
  function tr(t, e) {
    var n = (t.length - 1) * e + 1,
      i = Math.floor(n),
      r = +t[i - 1],
      o = n - i;
    return o ? r + o * (t[i] - r) : r;
  }
  function er(t) {
    function e(t, n, i) {
      return (
        t.interval[i] < n.interval[i] ||
        (t.interval[i] === n.interval[i] &&
          (t.close[i] - n.close[i] === (i ? -1 : 1) || (!i && e(t, n, 1))))
      );
    }
    t.sort(function (t, n) {
      return e(t, n, 0) ? -1 : 1;
    });
    for (var n = -1 / 0, i = 1, r = 0; r < t.length; ) {
      for (var o = t[r].interval, a = t[r].close, s = 0; 2 > s; s++)
        o[s] <= n && ((o[s] = n), (a[s] = s ? 1 : 1 - i)), (n = o[s]), (i = a[s]);
      o[0] === o[1] && a[0] * a[1] !== 1 ? t.splice(r, 1) : r++;
    }
    return t;
  }
  function nr(t) {
    var e = parseFloat(t);
    return e == t && (0 !== e || !C(t) || t.indexOf('x') <= 0) ? e : 0 / 0;
  }
  function ir(t) {
    return !isNaN(nr(t));
  }
  function rr() {
    return Math.round(9 * Math.random());
  }
  function or(t, e) {
    return 0 === e ? t : or(e, t % e);
  }
  function ar(t, e) {
    return null == t ? e : null == e ? t : (t * e) / or(t, e);
  }
  function sr(t) {
    throw new Error(t);
  }
  function lr(t, e, n) {
    return (e - t) * n + t;
  }
  function ur(t) {
    return t instanceof Array ? t : null == t ? [] : [t];
  }
  function hr(t, e, n) {
    if (t) {
      (t[e] = t[e] || {}), (t.emphasis = t.emphasis || {}), (t.emphasis[e] = t.emphasis[e] || {});
      for (var i = 0, r = n.length; r > i; i++) {
        var o = n[i];
        !t.emphasis[e].hasOwnProperty(o) && t[e].hasOwnProperty(o) && (t.emphasis[e][o] = t[e][o]);
      }
    }
  }
  function cr(t) {
    return !I(t) || M(t) || t instanceof Date ? t : t.value;
  }
  function pr(t) {
    return I(t) && !(t instanceof Array);
  }
  function fr(t, e, n) {
    var i = 'normalMerge' === n,
      r = 'replaceMerge' === n,
      o = 'replaceAll' === n;
    (t = t || []), (e = (e || []).slice());
    var a = X();
    v(e, function (t, n) {
      return I(t) ? void 0 : void (e[n] = null);
    });
    var s = dr(t, a, n);
    return (
      (i || r) && gr(s, t, a, e), i && vr(s, e), i || r ? yr(s, e, r) : o && mr(s, e), _r(s), s
    );
  }
  function dr(t, e, n) {
    var i = [];
    if ('replaceAll' === n) return i;
    for (var r = 0; r < t.length; r++) {
      var o = t[r];
      o && null != o.id && e.set(o.id, r),
        i.push({
          existing: 'replaceMerge' === n || Mr(o) ? null : o,
          newOption: null,
          keyInfo: null,
          brandNew: null,
        });
    }
    return i;
  }
  function gr(t, e, n, i) {
    v(i, function (r, o) {
      if (r && null != r.id) {
        var a = wr(r.id),
          s = n.get(a);
        if (null != s) {
          var l = t[s];
          W(!l.newOption, 'Duplicated option on id "' + a + '".'),
            (l.newOption = r),
            (l.existing = e[s]),
            (i[o] = null);
        }
      }
    });
  }
  function vr(t, e) {
    v(e, function (n, i) {
      if (n && null != n.name)
        for (var r = 0; r < t.length; r++) {
          var o = t[r].existing;
          if (
            !t[r].newOption &&
            o &&
            (null == o.id || null == n.id) &&
            !Mr(n) &&
            !Mr(o) &&
            xr('name', o, n)
          )
            return (t[r].newOption = n), void (e[i] = null);
        }
    });
  }
  function yr(t, e, n) {
    v(e, function (e) {
      if (e) {
        for (
          var i, r = 0;
          (i = t[r]) &&
          (i.newOption ||
            Mr(i.existing) ||
            (i.existing && null != e.id && !xr('id', e, i.existing)));

        )
          r++;
        i
          ? ((i.newOption = e), (i.brandNew = n))
          : t.push({ newOption: e, brandNew: n, existing: null, keyInfo: null }),
          r++;
      }
    });
  }
  function mr(t, e) {
    v(e, function (e) {
      t.push({ newOption: e, brandNew: !0, existing: null, keyInfo: null });
    });
  }
  function _r(t) {
    var e = X();
    v(t, function (t) {
      var n = t.existing;
      n && e.set(n.id, t);
    }),
      v(t, function (t) {
        var n = t.newOption;
        W(!n || null == n.id || !e.get(n.id) || e.get(n.id) === t, 'id duplicates: ' + (n && n.id)),
          n && null != n.id && e.set(n.id, t),
          !t.keyInfo && (t.keyInfo = {});
      }),
      v(t, function (t, n) {
        var i = t.existing,
          r = t.newOption,
          o = t.keyInfo;
        if (I(r)) {
          if (((o.name = null != r.name ? wr(r.name) : i ? i.name : Lm + n), i)) o.id = wr(i.id);
          else if (null != r.id) o.id = wr(r.id);
          else {
            var a = 0;
            do o.id = '\x00' + o.name + '\x00' + a++;
            while (e.get(o.id));
          }
          e.set(o.id, t);
        }
      });
  }
  function xr(t, e, n) {
    var i = br(e[t], null),
      r = br(n[t], null);
    return null != i && null != r && i === r;
  }
  function wr(t) {
    return br(t, '');
  }
  function br(t, e) {
    return null == t ? e : C(t) ? t : D(t) || k(t) ? t + '' : e;
  }
  function Sr(t) {
    var e = t.name;
    return !(!e || !e.indexOf(Lm));
  }
  function Mr(t) {
    return t && null != t.id && 0 === wr(t.id).indexOf(Pm);
  }
  function Tr(t, e, n) {
    v(t, function (t) {
      var i = t.newOption;
      I(i) && ((t.keyInfo.mainType = e), (t.keyInfo.subType = Cr(e, i, t.existing, n)));
    });
  }
  function Cr(t, e, n, i) {
    var r = e.type ? e.type : n ? n.subType : i.determineSubType(t, e);
    return r;
  }
  function kr(t, e) {
    return null != e.dataIndexInside
      ? e.dataIndexInside
      : null != e.dataIndex
      ? M(e.dataIndex)
        ? y(e.dataIndex, function (e) {
            return t.indexOfRawIndex(e);
          })
        : t.indexOfRawIndex(e.dataIndex)
      : null != e.name
      ? M(e.name)
        ? y(e.name, function (e) {
            return t.indexOfName(e);
          })
        : t.indexOfName(e.name)
      : void 0;
  }
  function Dr() {
    var t = '__ec_inner_' + Rm++;
    return function (e) {
      return e[t] || (e[t] = {});
    };
  }
  function Ir(t, e, n) {
    var i = Ar(e, n),
      r = i.mainTypeSpecified,
      o = i.queryOptionMap,
      a = i.others,
      s = a,
      l = n ? n.defaultMainType : null;
    return (
      !r && l && o.set(l, {}),
      o.each(function (e, i) {
        var r = Lr(t, i, e, {
          useDefault: l === i,
          enableAll: n && null != n.enableAll ? n.enableAll : !0,
          enableNone: n && null != n.enableNone ? n.enableNone : !0,
        });
        (s[i + 'Models'] = r.models), (s[i + 'Model'] = r.models[0]);
      }),
      s
    );
  }
  function Ar(t, e) {
    var n;
    if (C(t)) {
      var i = {};
      (i[t + 'Index'] = 0), (n = i);
    } else n = t;
    var r = X(),
      o = {},
      a = !1;
    return (
      v(n, function (t, n) {
        if ('dataIndex' === n || 'dataIndexInside' === n) return void (o[n] = t);
        var i = n.match(/^(\w+)(Index|Id|Name)$/) || [],
          s = i[1],
          l = (i[2] || '').toLowerCase();
        if (s && l && !(e && e.includeMainTypes && p(e.includeMainTypes, s) < 0)) {
          a = a || !!s;
          var u = r.get(s) || r.set(s, {});
          u[l] = t;
        }
      }),
      { mainTypeSpecified: a, queryOptionMap: r, others: o }
    );
  }
  function Lr(t, e, n, i) {
    i = i || Em;
    var r = n.index,
      o = n.id,
      a = n.name,
      s = { models: null, specified: null != r || null != o || null != a };
    if (!s.specified) {
      var l = void 0;
      return (s.models = i.useDefault && (l = t.getComponent(e)) ? [l] : []), s;
    }
    return 'none' === r || r === !1
      ? (W(i.enableNone, '`"none"` or `false` is not a valid value on index option.'),
        (s.models = []),
        s)
      : ('all' === r &&
          (W(i.enableAll, '`"all"` is not a valid value on index option.'), (r = o = a = null)),
        (s.models = t.queryComponents({ mainType: e, index: r, id: o, name: a })),
        s);
  }
  function Pr(t, e, n) {
    t.setAttribute ? t.setAttribute(e, n) : (t[e] = n);
  }
  function Or(t, e) {
    return t.getAttribute ? t.getAttribute(e) : t[e];
  }
  function Rr(t, e, n, i, r) {
    var o = null == e || 'auto' === e;
    if (null == i) return i;
    if (D(i)) {
      var a = lr(n || 0, i, r);
      return Hi(a, o ? Math.max(Gi(n || 0), Gi(i)) : e);
    }
    if (C(i)) return 1 > r ? n : i;
    for (var s = [], l = n, u = i, h = Math.max(l ? l.length : 0, u.length), c = 0; h > c; ++c) {
      var p = t.getDimensionInfo(c);
      if (p && 'ordinal' === p.type) s[c] = (1 > r && l ? l : u)[c];
      else {
        var f = l && l[c] ? l[c] : 0,
          d = u[c],
          a = lr(f, d, r);
        s[c] = Hi(a, o ? Math.max(Gi(f), Gi(d)) : e);
      }
    }
    return s;
  }
  function Er(t) {
    var e = { main: '', sub: '' };
    if (t) {
      var n = t.split(zm);
      (e.main = n[0] || ''), (e.sub = n[1] || '');
    }
    return e;
  }
  function Br(t) {
    W(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal');
  }
  function zr(t) {
    return !(!t || !t[Fm]);
  }
  function Nr(t) {
    (t.$constructor = t),
      (t.extend = function (t) {
        var n,
          i = this;
        return (
          Fr(i)
            ? (n = (function (t) {
                function n() {
                  return t.apply(this, arguments) || this;
                }
                return e(n, t), n;
              })(i))
            : ((n = function () {
                (t.$constructor || i).apply(this, arguments);
              }),
              f(n, this)),
          h(n.prototype, t),
          (n[Fm] = !0),
          (n.extend = this.extend),
          (n.superCall = Wr),
          (n.superApply = Gr),
          (n.superClass = i),
          n
        );
      });
  }
  function Fr(t) {
    return T(t) && /^class\s/.test(Function.prototype.toString.call(t));
  }
  function Vr(t, e) {
    t.extend = e.extend;
  }
  function Hr(t) {
    var e = ['__\x00is_clz', Vm++].join('_');
    (t.prototype[e] = !0),
      (t.isInstance = function (t) {
        return !(!t || !t[e]);
      });
  }
  function Wr(t, e) {
    for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
    return this.superClass.prototype[e].apply(t, n);
  }
  function Gr(t, e, n) {
    return this.superClass.prototype[e].apply(t, n);
  }
  function Zr(t) {
    function e(t) {
      var e = n[t.main];
      return (e && e[Nm]) || ((e = n[t.main] = {}), (e[Nm] = !0)), e;
    }
    var n = {};
    (t.registerClass = function (t) {
      var i = t.type || t.prototype.type;
      if (i) {
        Br(i), (t.prototype.type = i);
        var r = Er(i);
        if (r.sub) {
          if (r.sub !== Nm) {
            var o = e(r);
            o[r.sub] = t;
          }
        } else n[r.main] = t;
      }
      return t;
    }),
      (t.getClass = function (t, e, i) {
        var r = n[t];
        if ((r && r[Nm] && (r = e ? r[e] : null), i && !r))
          throw new Error(
            e
              ? 'Component ' + t + '.' + (e || '') + ' is used but not imported.'
              : t + '.type should be specified.'
          );
        return r;
      }),
      (t.getClassesByMainType = function (t) {
        var e = Er(t),
          i = [],
          r = n[e.main];
        return (
          r && r[Nm]
            ? v(r, function (t, e) {
                e !== Nm && i.push(t);
              })
            : i.push(r),
          i
        );
      }),
      (t.hasClass = function (t) {
        var e = Er(t);
        return !!n[e.main];
      }),
      (t.getAllClassMainTypes = function () {
        var t = [];
        return (
          v(n, function (e, n) {
            t.push(n);
          }),
          t
        );
      }),
      (t.hasSubTypes = function (t) {
        var e = Er(t),
          i = n[e.main];
        return i && i[Nm];
      });
  }
  function Ur(t, e) {
    for (var n = 0; n < t.length; n++) t[n][1] || (t[n][1] = t[n][0]);
    return (
      (e = e || !1),
      function (n, i, r) {
        for (var o = {}, a = 0; a < t.length; a++) {
          var s = t[a][1];
          if (!((i && p(i, s) >= 0) || (r && p(r, s) < 0))) {
            var l = n.getShallow(s, e);
            null != l && (o[t[a][0]] = l);
          }
        }
        return o;
      }
    );
  }
  function Xr(t) {
    if ('string' == typeof t) {
      var e = Zm.get(t);
      return e && e.image;
    }
    return t;
  }
  function Yr(t, e, n, i, r) {
    if (t) {
      if ('string' == typeof t) {
        if ((e && e.__zrImageSrc === t) || !n) return e;
        var o = Zm.get(t),
          a = { hostEl: n, cb: i, cbPayload: r };
        if (o) (e = o.image), !jr(e) && o.pending.push(a);
        else {
          var s = ov.loadImage(t, qr, qr);
          (s.__zrImageSrc = t), Zm.put(t, (s.__cachedImgObj = { image: s, pending: [a] }));
        }
        return e;
      }
      return t;
    }
    return e;
  }
  function qr() {
    var t = this.__cachedImgObj;
    this.onload = this.onerror = this.__cachedImgObj = null;
    for (var e = 0; e < t.pending.length; e++) {
      var n = t.pending[e],
        i = n.cb;
      i && i(this, n.cbPayload), n.hostEl.dirty();
    }
    t.pending.length = 0;
  }
  function jr(t) {
    return t && t.width && t.height;
  }
  function Kr(t, e, n, i, r) {
    if (!e) return '';
    var o = (t + '').split('\n');
    r = $r(e, n, i, r);
    for (var a = 0, s = o.length; s > a; a++) o[a] = Qr(o[a], r);
    return o.join('\n');
  }
  function $r(t, e, n, i) {
    i = i || {};
    var r = h({}, i);
    (r.font = e), (n = N(n, '...')), (r.maxIterations = N(i.maxIterations, 2));
    var o = (r.minChar = N(i.minChar, 0));
    r.cnCharWidth = vi('国', e);
    var a = (r.ascCharWidth = vi('a', e));
    r.placeholder = N(i.placeholder, '');
    for (var s = (t = Math.max(0, t - 1)), l = 0; o > l && s >= a; l++) s -= a;
    var u = vi(n, e);
    return (
      u > s && ((n = ''), (u = 0)),
      (s = t - u),
      (r.ellipsis = n),
      (r.ellipsisWidth = u),
      (r.contentWidth = s),
      (r.containerWidth = t),
      r
    );
  }
  function Qr(t, e) {
    var n = e.containerWidth,
      i = e.font,
      r = e.contentWidth;
    if (!n) return '';
    var o = vi(t, i);
    if (n >= o) return t;
    for (var a = 0; ; a++) {
      if (r >= o || a >= e.maxIterations) {
        t += e.ellipsis;
        break;
      }
      var s =
        0 === a
          ? Jr(t, r, e.ascCharWidth, e.cnCharWidth)
          : o > 0
          ? Math.floor((t.length * r) / o)
          : 0;
      (t = t.substr(0, s)), (o = vi(t, i));
    }
    return '' === t && (t = e.placeholder), t;
  }
  function Jr(t, e, n, i) {
    for (var r = 0, o = 0, a = t.length; a > o && e > r; o++) {
      var s = t.charCodeAt(o);
      r += s >= 0 && 127 >= s ? n : i;
    }
    return o;
  }
  function to(t, e) {
    null != t && (t += '');
    var n,
      i = e.overflow,
      r = e.padding,
      o = e.font,
      a = 'truncate' === i,
      s = wi(o),
      l = N(e.lineHeight, s),
      u = !!e.backgroundColor,
      h = 'truncate' === e.lineOverflow,
      c = e.width;
    n =
      null == c || ('break' !== i && 'breakAll' !== i)
        ? t
          ? t.split('\n')
          : []
        : t
        ? oo(t, e.font, c, 'breakAll' === i, 0).lines
        : [];
    var p = n.length * l,
      f = N(e.height, p);
    if (p > f && h) {
      var d = Math.floor(f / l);
      n = n.slice(0, d);
    }
    if (t && a && null != c)
      for (
        var g = $r(c, o, e.ellipsis, { minChar: e.truncateMinChar, placeholder: e.placeholder }),
          v = 0;
        v < n.length;
        v++
      )
        n[v] = Qr(n[v], g);
    for (var y = f, m = 0, v = 0; v < n.length; v++) m = Math.max(vi(n[v], o), m);
    null == c && (c = m);
    var _ = m;
    return (
      r && ((y += r[0] + r[2]), (_ += r[1] + r[3]), (c += r[1] + r[3])),
      u && (_ = c),
      {
        lines: n,
        height: f,
        outerWidth: _,
        outerHeight: y,
        lineHeight: l,
        calculatedLineHeight: s,
        contentWidth: m,
        contentHeight: p,
        width: c,
      }
    );
  }
  function eo(t, e) {
    function n(t, e, n) {
      (t.width = e), (t.lineHeight = n), (p += n), (f = Math.max(f, e));
    }
    var i = new qm();
    if ((null != t && (t += ''), !t)) return i;
    for (
      var r,
        o = e.width,
        a = e.height,
        s = e.overflow,
        l =
          ('break' !== s && 'breakAll' !== s) || null == o
            ? null
            : { width: o, accumWidth: 0, breakAll: 'breakAll' === s },
        u = (Um.lastIndex = 0);
      null != (r = Um.exec(t));

    ) {
      var h = r.index;
      h > u && no(i, t.substring(u, h), e, l), no(i, r[2], e, l, r[1]), (u = Um.lastIndex);
    }
    u < t.length && no(i, t.substring(u, t.length), e, l);
    var c = [],
      p = 0,
      f = 0,
      d = e.padding,
      g = 'truncate' === s,
      v = 'truncate' === e.lineOverflow;
    t: for (var y = 0; y < i.lines.length; y++) {
      for (var m = i.lines[y], _ = 0, x = 0, w = 0; w < m.tokens.length; w++) {
        var b = m.tokens[w],
          S = (b.styleName && e.rich[b.styleName]) || {},
          M = (b.textPadding = S.padding),
          T = M ? M[1] + M[3] : 0,
          C = (b.font = S.font || e.font);
        b.contentHeight = wi(C);
        var k = N(S.height, b.contentHeight);
        if (
          ((b.innerHeight = k),
          M && (k += M[0] + M[2]),
          (b.height = k),
          (b.lineHeight = F(S.lineHeight, e.lineHeight, k)),
          (b.align = (S && S.align) || e.align),
          (b.verticalAlign = (S && S.verticalAlign) || 'middle'),
          v && null != a && p + b.lineHeight > a)
        ) {
          w > 0
            ? ((m.tokens = m.tokens.slice(0, w)), n(m, x, _), (i.lines = i.lines.slice(0, y + 1)))
            : (i.lines = i.lines.slice(0, y));
          break t;
        }
        var D = S.width,
          I = null == D || 'auto' === D;
        if ('string' == typeof D && '%' === D.charAt(D.length - 1))
          (b.percentWidth = D), c.push(b), (b.contentWidth = vi(b.text, C));
        else {
          if (I) {
            var A = S.backgroundColor,
              L = A && A.image;
            L && ((L = Xr(L)), jr(L) && (b.width = Math.max(b.width, (L.width * k) / L.height)));
          }
          var P = g && null != o ? o - x : null;
          null != P && P < b.width
            ? !I || T > P
              ? ((b.text = ''), (b.width = b.contentWidth = 0))
              : ((b.text = Kr(b.text, P - T, C, e.ellipsis, { minChar: e.truncateMinChar })),
                (b.width = b.contentWidth = vi(b.text, C)))
            : (b.contentWidth = vi(b.text, C));
        }
        (b.width += T), (x += b.width), S && (_ = Math.max(_, b.lineHeight));
      }
      n(m, x, _);
    }
    (i.outerWidth = i.width = N(o, f)),
      (i.outerHeight = i.height = N(a, p)),
      (i.contentHeight = p),
      (i.contentWidth = f),
      d && ((i.outerWidth += d[1] + d[3]), (i.outerHeight += d[0] + d[2]));
    for (var y = 0; y < c.length; y++) {
      var b = c[y],
        O = b.percentWidth;
      b.width = (parseInt(O, 10) / 100) * i.width;
    }
    return i;
  }
  function no(t, e, n, i, r) {
    var o,
      a,
      s = '' === e,
      l = (r && n.rich[r]) || {},
      u = t.lines,
      h = l.font || n.font,
      c = !1;
    if (i) {
      var p = l.padding,
        f = p ? p[1] + p[3] : 0;
      if (null != l.width && 'auto' !== l.width) {
        var d = bi(l.width, i.width) + f;
        u.length > 0 && d + i.accumWidth > i.width && ((o = e.split('\n')), (c = !0)),
          (i.accumWidth = d);
      } else {
        var g = oo(e, h, i.width, i.breakAll, i.accumWidth);
        (i.accumWidth = g.accumWidth + f), (a = g.linesWidths), (o = g.lines);
      }
    } else o = e.split('\n');
    for (var v = 0; v < o.length; v++) {
      var y = o[v],
        m = new Xm();
      if (
        ((m.styleName = r),
        (m.text = y),
        (m.isLineHolder = !y && !s),
        (m.width = 'number' == typeof l.width ? l.width : a ? a[v] : vi(y, h)),
        v || c)
      )
        u.push(new Ym([m]));
      else {
        var _ = (u[u.length - 1] || (u[0] = new Ym())).tokens,
          x = _.length;
        1 === x && _[0].isLineHolder ? (_[0] = m) : (y || !x || s) && _.push(m);
      }
    }
  }
  function io(t) {
    var e = t.charCodeAt(0);
    return e >= 33 && 383 >= e;
  }
  function ro(t) {
    return io(t) ? (jm[t] ? !0 : !1) : !0;
  }
  function oo(t, e, n, i, r) {
    for (var o = [], a = [], s = '', l = '', u = 0, h = 0, c = 0; c < t.length; c++) {
      var p = t.charAt(c);
      if ('\n' !== p) {
        var f = vi(p, e),
          d = i ? !1 : !ro(p);
        (o.length ? h + f > n : r + h + f > n)
          ? h
            ? (s || l) &&
              (d
                ? (s || ((s = l), (l = ''), (u = 0), (h = u)),
                  o.push(s),
                  a.push(h - u),
                  (l += p),
                  (u += f),
                  (s = ''),
                  (h = u))
                : (l && ((s += l), (l = ''), (u = 0)), o.push(s), a.push(h), (s = p), (h = f)))
            : d
            ? (o.push(l), a.push(u), (l = p), (u = f))
            : (o.push(p), a.push(f))
          : ((h += f), d ? ((l += p), (u += f)) : (l && ((s += l), (l = ''), (u = 0)), (s += p)));
      } else l && ((s += l), (h += u)), o.push(s), a.push(h), (s = ''), (l = ''), (u = 0), (h = 0);
    }
    return (
      o.length || s || ((s = t), (l = ''), (u = 0)),
      l && (s += l),
      s && (o.push(s), a.push(h)),
      1 === o.length && (h += r),
      { accumWidth: h, lines: o, linesWidths: a }
    );
  }
  function ao(t, e, n) {
    return (
      n_.copy(t.getBoundingRect()),
      t.transform && n_.applyTransform(t.transform),
      (i_.width = e),
      (i_.height = n),
      !n_.intersect(i_)
    );
  }
  function so(t, e, n, i, r, o) {
    (r[0] = r_(t, n)), (r[1] = r_(e, i)), (o[0] = o_(t, n)), (o[1] = o_(e, i));
  }
  function lo(t, e, n, i, r, o, a, s, l, u) {
    var h = tn,
      c = $e,
      p = h(t, n, r, a, p_);
    (l[0] = 1 / 0), (l[1] = 1 / 0), (u[0] = -1 / 0), (u[1] = -1 / 0);
    for (var f = 0; p > f; f++) {
      var d = c(t, n, r, a, p_[f]);
      (l[0] = r_(d, l[0])), (u[0] = o_(d, u[0]));
    }
    p = h(e, i, o, s, f_);
    for (var f = 0; p > f; f++) {
      var g = c(e, i, o, s, f_[f]);
      (l[1] = r_(g, l[1])), (u[1] = o_(g, u[1]));
    }
    (l[0] = r_(t, l[0])),
      (u[0] = o_(t, u[0])),
      (l[0] = r_(a, l[0])),
      (u[0] = o_(a, u[0])),
      (l[1] = r_(e, l[1])),
      (u[1] = o_(e, u[1])),
      (l[1] = r_(s, l[1])),
      (u[1] = o_(s, u[1]));
  }
  function uo(t, e, n, i, r, o, a, s) {
    var l = ln,
      u = on,
      h = o_(r_(l(t, n, r), 1), 0),
      c = o_(r_(l(e, i, o), 1), 0),
      p = u(t, n, r, h),
      f = u(e, i, o, c);
    (a[0] = r_(t, r, p)), (a[1] = r_(e, o, f)), (s[0] = o_(t, r, p)), (s[1] = o_(e, o, f));
  }
  function ho(t, e, n, i, r, o, a, s, l) {
    var u = ye,
      h = me,
      c = Math.abs(r - o);
    if (1e-4 > c % l_ && c > 1e-4)
      return (s[0] = t - n), (s[1] = e - i), (l[0] = t + n), void (l[1] = e + i);
    if (
      ((u_[0] = s_(r) * n + t),
      (u_[1] = a_(r) * i + e),
      (h_[0] = s_(o) * n + t),
      (h_[1] = a_(o) * i + e),
      u(s, u_, h_),
      h(l, u_, h_),
      (r %= l_),
      0 > r && (r += l_),
      (o %= l_),
      0 > o && (o += l_),
      r > o && !a ? (o += l_) : o > r && a && (r += l_),
      a)
    ) {
      var p = o;
      (o = r), (r = p);
    }
    for (var f = 0; o > f; f += Math.PI / 2)
      f > r && ((c_[0] = s_(f) * n + t), (c_[1] = a_(f) * i + e), u(s, c_, s), h(l, c_, l));
  }
  function co(t) {
    var e = Math.round((t / C_) * 1e8) / 1e8;
    return (e % 2) * C_;
  }
  function po(t, e) {
    var n = co(t[0]);
    0 > n && (n += k_);
    var i = n - t[0],
      r = t[1];
    (r += i),
      !e && r - n >= k_
        ? (r = n + k_)
        : e && n - r >= k_
        ? (r = n - k_)
        : !e && n > r
        ? (r = n + (k_ - co(n - r)))
        : e && r > n && (r = n - (k_ - co(r - n))),
      (t[0] = n),
      (t[1] = r);
  }
  function fo(t, e, n, i, r, o, a) {
    if (0 === r) return !1;
    var s = r,
      l = 0,
      u = t;
    if (
      (a > e + s && a > i + s) ||
      (e - s > a && i - s > a) ||
      (o > t + s && o > n + s) ||
      (t - s > o && n - s > o)
    )
      return !1;
    if (t === n) return Math.abs(o - t) <= s / 2;
    (l = (e - i) / (t - n)), (u = (t * i - n * e) / (t - n));
    var h = l * o - a + u,
      c = (h * h) / (l * l + 1);
    return ((s / 2) * s) / 2 >= c;
  }
  function go(t, e, n, i, r, o, a, s, l, u, h) {
    if (0 === l) return !1;
    var c = l;
    if (
      (h > e + c && h > i + c && h > o + c && h > s + c) ||
      (e - c > h && i - c > h && o - c > h && s - c > h) ||
      (u > t + c && u > n + c && u > r + c && u > a + c) ||
      (t - c > u && n - c > u && r - c > u && a - c > u)
    )
      return !1;
    var p = nn(t, e, n, i, r, o, a, s, u, h, null);
    return c / 2 >= p;
  }
  function vo(t, e, n, i, r, o, a, s, l) {
    if (0 === a) return !1;
    var u = a;
    if (
      (l > e + u && l > i + u && l > o + u) ||
      (e - u > l && i - u > l && o - u > l) ||
      (s > t + u && s > n + u && s > r + u) ||
      (t - u > s && n - u > s && r - u > s)
    )
      return !1;
    var h = hn(t, e, n, i, r, o, s, l, null);
    return u / 2 >= h;
  }
  function yo(t) {
    return (t %= L_), 0 > t && (t += L_), t;
  }
  function mo(t, e, n, i, r, o, a, s, l) {
    if (0 === a) return !1;
    var u = a;
    (s -= t), (l -= e);
    var h = Math.sqrt(s * s + l * l);
    if (h - u > n || n > h + u) return !1;
    if (Math.abs(i - r) % P_ < 1e-4) return !0;
    if (o) {
      var c = i;
      (i = yo(r)), (r = yo(c));
    } else (i = yo(i)), (r = yo(r));
    i > r && (r += P_);
    var p = Math.atan2(l, s);
    return 0 > p && (p += P_), (p >= i && r >= p) || (p + P_ >= i && r >= p + P_);
  }
  function _o(t, e, n, i, r, o) {
    if ((o > e && o > i) || (e > o && i > o)) return 0;
    if (i === e) return 0;
    var a = (o - e) / (i - e),
      s = e > i ? 1 : -1;
    (1 === a || 0 === a) && (s = e > i ? 0.5 : -0.5);
    var l = a * (n - t) + t;
    return l === r ? 1 / 0 : l > r ? s : 0;
  }
  function xo(t, e) {
    return Math.abs(t - e) < E_;
  }
  function wo() {
    var t = z_[0];
    (z_[0] = z_[1]), (z_[1] = t);
  }
  function bo(t, e, n, i, r, o, a, s, l, u) {
    if ((u > e && u > i && u > o && u > s) || (e > u && i > u && o > u && s > u)) return 0;
    var h = Je(e, i, o, s, u, B_);
    if (0 === h) return 0;
    for (var c = 0, p = -1, f = void 0, d = void 0, g = 0; h > g; g++) {
      var v = B_[g],
        y = 0 === v || 1 === v ? 0.5 : 1,
        m = $e(t, n, r, a, v);
      l > m ||
        (0 > p &&
          ((p = tn(e, i, o, s, z_)),
          z_[1] < z_[0] && p > 1 && wo(),
          (f = $e(e, i, o, s, z_[0])),
          p > 1 && (d = $e(e, i, o, s, z_[1]))),
        (c +=
          2 === p
            ? v < z_[0]
              ? e > f
                ? y
                : -y
              : v < z_[1]
              ? f > d
                ? y
                : -y
              : d > s
              ? y
              : -y
            : v < z_[0]
            ? e > f
              ? y
              : -y
            : f > s
            ? y
            : -y));
    }
    return c;
  }
  function So(t, e, n, i, r, o, a, s) {
    if ((s > e && s > i && s > o) || (e > s && i > s && o > s)) return 0;
    var l = sn(e, i, o, s, B_);
    if (0 === l) return 0;
    var u = ln(e, i, o);
    if (u >= 0 && 1 >= u) {
      for (var h = 0, c = on(e, i, o, u), p = 0; l > p; p++) {
        var f = 0 === B_[p] || 1 === B_[p] ? 0.5 : 1,
          d = on(t, n, r, B_[p]);
        a > d || (h += B_[p] < u ? (e > c ? f : -f) : c > o ? f : -f);
      }
      return h;
    }
    var f = 0 === B_[0] || 1 === B_[0] ? 0.5 : 1,
      d = on(t, n, r, B_[0]);
    return a > d ? 0 : e > o ? f : -f;
  }
  function Mo(t, e, n, i, r, o, a, s) {
    if (((s -= e), s > n || -n > s)) return 0;
    var l = Math.sqrt(n * n - s * s);
    (B_[0] = -l), (B_[1] = l);
    var u = Math.abs(i - r);
    if (1e-4 > u) return 0;
    if (u >= R_ - 1e-4) {
      (i = 0), (r = R_);
      var h = o ? 1 : -1;
      return a >= B_[0] + t && a <= B_[1] + t ? h : 0;
    }
    if (i > r) {
      var c = i;
      (i = r), (r = c);
    }
    0 > i && ((i += R_), (r += R_));
    for (var p = 0, f = 0; 2 > f; f++) {
      var d = B_[f];
      if (d + t > a) {
        var g = Math.atan2(s, d),
          h = o ? 1 : -1;
        0 > g && (g = R_ + g),
          ((g >= i && r >= g) || (g + R_ >= i && r >= g + R_)) &&
            (g > Math.PI / 2 && g < 1.5 * Math.PI && (h = -h), (p += h));
      }
    }
    return p;
  }
  function To(t, e, n, i, r) {
    for (var o, a, s = t.data, l = t.len(), u = 0, h = 0, c = 0, p = 0, f = 0, d = 0; l > d; ) {
      var g = s[d++],
        v = 1 === d;
      switch (
        (g === O_.M && d > 1 && (n || (u += _o(h, c, p, f, i, r))),
        v && ((h = s[d]), (c = s[d + 1]), (p = h), (f = c)),
        g)
      ) {
        case O_.M:
          (p = s[d++]), (f = s[d++]), (h = p), (c = f);
          break;
        case O_.L:
          if (n) {
            if (fo(h, c, s[d], s[d + 1], e, i, r)) return !0;
          } else u += _o(h, c, s[d], s[d + 1], i, r) || 0;
          (h = s[d++]), (c = s[d++]);
          break;
        case O_.C:
          if (n) {
            if (go(h, c, s[d++], s[d++], s[d++], s[d++], s[d], s[d + 1], e, i, r)) return !0;
          } else u += bo(h, c, s[d++], s[d++], s[d++], s[d++], s[d], s[d + 1], i, r) || 0;
          (h = s[d++]), (c = s[d++]);
          break;
        case O_.Q:
          if (n) {
            if (vo(h, c, s[d++], s[d++], s[d], s[d + 1], e, i, r)) return !0;
          } else u += So(h, c, s[d++], s[d++], s[d], s[d + 1], i, r) || 0;
          (h = s[d++]), (c = s[d++]);
          break;
        case O_.A:
          var y = s[d++],
            m = s[d++],
            _ = s[d++],
            x = s[d++],
            w = s[d++],
            b = s[d++];
          d += 1;
          var S = !!(1 - s[d++]);
          (o = Math.cos(w) * _ + y),
            (a = Math.sin(w) * x + m),
            v ? ((p = o), (f = a)) : (u += _o(h, c, o, a, i, r));
          var M = ((i - y) * x) / _ + y;
          if (n) {
            if (mo(y, m, x, w, w + b, S, e, M, r)) return !0;
          } else u += Mo(y, m, x, w, w + b, S, M, r);
          (h = Math.cos(w + b) * _ + y), (c = Math.sin(w + b) * x + m);
          break;
        case O_.R:
          (p = h = s[d++]), (f = c = s[d++]);
          var T = s[d++],
            C = s[d++];
          if (((o = p + T), (a = f + C), n)) {
            if (
              fo(p, f, o, f, e, i, r) ||
              fo(o, f, o, a, e, i, r) ||
              fo(o, a, p, a, e, i, r) ||
              fo(p, a, p, f, e, i, r)
            )
              return !0;
          } else (u += _o(o, f, o, a, i, r)), (u += _o(p, a, p, f, i, r));
          break;
        case O_.Z:
          if (n) {
            if (fo(h, c, p, f, e, i, r)) return !0;
          } else u += _o(h, c, p, f, i, r);
          (h = p), (c = f);
      }
    }
    return n || xo(c, f) || (u += _o(h, c, p, f, i, r) || 0), 0 !== u;
  }
  function Co(t, e, n) {
    return To(t, 0, !1, e, n);
  }
  function ko(t, e, n, i) {
    return To(t, e, !0, n, i);
  }
  function Do(t) {
    return !!(t && 'string' != typeof t && t.width && t.height);
  }
  function Io(t, e) {
    var n,
      i,
      r,
      o,
      a = e.x,
      s = e.y,
      l = e.width,
      u = e.height,
      h = e.r;
    0 > l && ((a += l), (l = -l)),
      0 > u && ((s += u), (u = -u)),
      'number' == typeof h
        ? (n = i = r = o = h)
        : h instanceof Array
        ? 1 === h.length
          ? (n = i = r = o = h[0])
          : 2 === h.length
          ? ((n = r = h[0]), (i = o = h[1]))
          : 3 === h.length
          ? ((n = h[0]), (i = o = h[1]), (r = h[2]))
          : ((n = h[0]), (i = h[1]), (r = h[2]), (o = h[3]))
        : (n = i = r = o = 0);
    var c;
    n + i > l && ((c = n + i), (n *= l / c), (i *= l / c)),
      r + o > l && ((c = r + o), (r *= l / c), (o *= l / c)),
      i + r > u && ((c = i + r), (i *= u / c), (r *= u / c)),
      n + o > u && ((c = n + o), (n *= u / c), (o *= u / c)),
      t.moveTo(a + n, s),
      t.lineTo(a + l - i, s),
      0 !== i && t.arc(a + l - i, s + i, i, -Math.PI / 2, 0),
      t.lineTo(a + l, s + u - r),
      0 !== r && t.arc(a + l - r, s + u - r, r, 0, Math.PI / 2),
      t.lineTo(a + o, s + u),
      0 !== o && t.arc(a + o, s + u - o, o, Math.PI / 2, Math.PI),
      t.lineTo(a, s + n),
      0 !== n && t.arc(a + n, s + n, n, Math.PI, 1.5 * Math.PI);
  }
  function Ao(t, e, n) {
    if (e) {
      var i = e.x1,
        r = e.x2,
        o = e.y1,
        a = e.y2;
      (t.x1 = i), (t.x2 = r), (t.y1 = o), (t.y2 = a);
      var s = n && n.lineWidth;
      return s
        ? (Y_(2 * i) === Y_(2 * r) && (t.x1 = t.x2 = Po(i, s, !0)),
          Y_(2 * o) === Y_(2 * a) && (t.y1 = t.y2 = Po(o, s, !0)),
          t)
        : t;
    }
  }
  function Lo(t, e, n) {
    if (e) {
      var i = e.x,
        r = e.y,
        o = e.width,
        a = e.height;
      (t.x = i), (t.y = r), (t.width = o), (t.height = a);
      var s = n && n.lineWidth;
      return s
        ? ((t.x = Po(i, s, !0)),
          (t.y = Po(r, s, !0)),
          (t.width = Math.max(Po(i + o, s, !1) - t.x, 0 === o ? 0 : 1)),
          (t.height = Math.max(Po(r + a, s, !1) - t.y, 0 === a ? 0 : 1)),
          t)
        : t;
    }
  }
  function Po(t, e, n) {
    if (!e) return t;
    var i = Y_(2 * t);
    return (i + Y_(e)) % 2 === 0 ? i / 2 : (i + (n ? 1 : -1)) / 2;
  }
  function Oo(t) {
    return 'string' != typeof t ||
      (-1 === t.indexOf('px') && -1 === t.indexOf('rem') && -1 === t.indexOf('em'))
      ? isNaN(+t)
        ? Qg + 'px'
        : t + 'px'
      : t;
  }
  function Ro(t, e) {
    for (var n = 0; n < ix.length; n++) {
      var i = ix[n],
        r = e[i];
      null != r && (t[i] = r);
    }
  }
  function Eo(t) {
    return null != t.fontSize || t.fontFamily || t.fontWeight;
  }
  function Bo(t) {
    return zo(t), v(t.rich, zo), t;
  }
  function zo(t) {
    if (t) {
      t.font = tx.makeFont(t);
      var e = t.align;
      'middle' === e && (e = 'center'), (t.align = null == e || ex[e] ? e : 'left');
      var n = t.verticalAlign;
      'center' === n && (n = 'middle'), (t.verticalAlign = null == n || nx[n] ? n : 'top');
      var i = t.padding;
      i && (t.padding = H(t.padding));
    }
  }
  function No(t, e) {
    return null == t || 0 >= e || 'transparent' === t || 'none' === t
      ? null
      : t.image || t.colorStops
      ? '#000'
      : t;
  }
  function Fo(t) {
    return null == t || 'none' === t ? null : t.image || t.colorStops ? '#000' : t;
  }
  function Vo(t, e, n) {
    return 'right' === e ? t - n[1] : 'center' === e ? t + n[3] / 2 - n[1] / 2 : t + n[3];
  }
  function Ho(t) {
    var e = t.text;
    return null != e && (e += ''), e;
  }
  function Wo(t) {
    return !!(t.backgroundColor || t.lineHeight || (t.borderWidth && t.borderColor));
  }
  function Go(t) {
    return null != t && 'none' !== t;
  }
  function Zo(t) {
    if (C(t)) {
      var e = Sx.get(t);
      return e || ((e = Cn(t, -0.1)), Sx.put(t, e)), e;
    }
    if (O(t)) {
      var n = h({}, t);
      return (
        (n.colorStops = y(t.colorStops, function (t) {
          return { offset: t.offset, color: Cn(t.color, -0.1) };
        })),
        n
      );
    }
    return t;
  }
  function Uo(t, e, n) {
    t.onHoverStateChange && (t.hoverState || 0) !== n && t.onHoverStateChange(e),
      (t.hoverState = n);
  }
  function Xo(t) {
    Uo(t, 'emphasis', px);
  }
  function Yo(t) {
    t.hoverState === px && Uo(t, 'normal', hx);
  }
  function qo(t) {
    Uo(t, 'blur', cx);
  }
  function jo(t) {
    t.hoverState === cx && Uo(t, 'normal', hx);
  }
  function Ko(t) {
    t.selected = !0;
  }
  function $o(t) {
    t.selected = !1;
  }
  function Qo(t, e, n) {
    e(t, n);
  }
  function Jo(t, e, n) {
    Qo(t, e, n),
      t.isGroup &&
        t.traverse(function (t) {
          Qo(t, e, n);
        });
  }
  function ta(t, e, n, i) {
    for (var r = t.style, o = {}, a = 0; a < e.length; a++) {
      var s = e[a],
        l = r[s];
      o[s] = null == l ? i && i[s] : l;
    }
    for (var a = 0; a < t.animators.length; a++) {
      var u = t.animators[a];
      u.__fromStateTransition &&
        u.__fromStateTransition.indexOf(n) < 0 &&
        'style' === u.targetName &&
        u.saveTo(o, e);
    }
    return o;
  }
  function ea(t, e, n, i) {
    var r = n && p(n, 'select') >= 0,
      o = !1;
    if (t instanceof H_) {
      var a = lx(t),
        s = r ? a.selectFill || a.normalFill : a.normalFill,
        l = r ? a.selectStroke || a.normalStroke : a.normalStroke;
      if (Go(s) || Go(l)) {
        i = i || {};
        var u = i.style || {};
        'inherit' === u.fill
          ? ((o = !0), (i = h({}, i)), (u = h({}, u)), (u.fill = s))
          : !Go(u.fill) && Go(s)
          ? ((o = !0), (i = h({}, i)), (u = h({}, u)), (u.fill = Zo(s)))
          : !Go(u.stroke) && Go(l) && (o || ((i = h({}, i)), (u = h({}, u))), (u.stroke = Zo(l))),
          (i.style = u);
      }
    }
    if (i && null == i.z2) {
      o || (i = h({}, i));
      var c = t.z2EmphasisLift;
      i.z2 = t.z2 + (null != c ? c : gx);
    }
    return i;
  }
  function na(t, e, n) {
    if (n && null == n.z2) {
      n = h({}, n);
      var i = t.z2SelectLift;
      n.z2 = t.z2 + (null != i ? i : vx);
    }
    return n;
  }
  function ia(t, e, n) {
    var i = p(t.currentStates, e) >= 0,
      r = t.style.opacity,
      o = i ? null : ta(t, ['opacity'], e, { opacity: 1 });
    n = n || {};
    var a = n.style || {};
    return (
      null == a.opacity &&
        ((n = h({}, n)), (a = h({ opacity: i ? r : 0.1 * o.opacity }, a)), (n.style = a)),
      n
    );
  }
  function ra(t, e) {
    var n = this.states[t];
    if (this.style) {
      if ('emphasis' === t) return ea(this, t, e, n);
      if ('blur' === t) return ia(this, t, n);
      if ('select' === t) return na(this, t, n);
    }
    return n;
  }
  function oa(t) {
    t.stateProxy = ra;
    var e = t.getTextContent(),
      n = t.getTextGuideLine();
    e && (e.stateProxy = ra), n && (n.stateProxy = ra);
  }
  function aa(t, e) {
    !da(t, e) && !t.__highByOuter && Jo(t, Xo);
  }
  function sa(t, e) {
    !da(t, e) && !t.__highByOuter && Jo(t, Yo);
  }
  function la(t, e) {
    (t.__highByOuter |= 1 << (e || 0)), Jo(t, Xo);
  }
  function ua(t, e) {
    !(t.__highByOuter &= ~(1 << (e || 0))) && Jo(t, Yo);
  }
  function ha(t) {
    Jo(t, qo);
  }
  function ca(t) {
    Jo(t, jo);
  }
  function pa(t) {
    Jo(t, Ko);
  }
  function fa(t) {
    Jo(t, $o);
  }
  function da(t, e) {
    return t.__highDownSilentOnTouch && e.zrByTouch;
  }
  function ga(t) {
    var e = t.getModel(),
      n = [],
      i = [];
    e.eachComponent(function (e, r) {
      var o = ux(r),
        a = 'series' === e,
        s = a ? t.getViewOfSeriesModel(r) : t.getViewOfComponentModel(r);
      !a && i.push(s),
        o.isBlured &&
          (s.group.traverse(function (t) {
            jo(t);
          }),
          a && n.push(r)),
        (o.isBlured = !1);
    }),
      v(i, function (t) {
        t && t.toggleBlurSeries && t.toggleBlurSeries(n, !1, e);
      });
  }
  function va(t, e, n, i) {
    function r(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = t.getItemGraphicEl(e[n]);
        i && ca(i);
      }
    }
    var o = i.getModel();
    if (((n = n || 'coordinateSystem'), null != t && e && 'none' !== e)) {
      var a = o.getSeriesByIndex(t),
        s = a.coordinateSystem;
      s && s.master && (s = s.master);
      var l = [];
      o.eachSeries(function (t) {
        var o = a === t,
          u = t.coordinateSystem;
        u && u.master && (u = u.master);
        var h = u && s ? u === s : o;
        if (
          !(('series' === n && !o) || ('coordinateSystem' === n && !h) || ('series' === e && o))
        ) {
          var c = i.getViewOfSeriesModel(t);
          if (
            (c.group.traverse(function (t) {
              qo(t);
            }),
            g(e))
          )
            r(t.getData(), e);
          else if (I(e)) for (var p = w(e), f = 0; f < p.length; f++) r(t.getData(p[f]), e[p[f]]);
          l.push(t), (ux(t).isBlured = !0);
        }
      }),
        o.eachComponent(function (t, e) {
          if ('series' !== t) {
            var n = i.getViewOfComponentModel(e);
            n && n.toggleBlurSeries && n.toggleBlurSeries(l, !0, o);
          }
        });
    }
  }
  function ya(t, e, n) {
    if (null != t && null != e) {
      var i = n.getModel().getComponent(t, e);
      if (i) {
        ux(i).isBlured = !0;
        var r = n.getViewOfComponentModel(i);
        r &&
          r.focusBlurEnabled &&
          r.group.traverse(function (t) {
            qo(t);
          });
      }
    }
  }
  function ma(t, e, n) {
    var i = t.seriesIndex,
      r = t.getData(e.dataType);
    if (r) {
      var o = kr(r, e);
      o = (M(o) ? o[0] : o) || 0;
      var a = r.getItemGraphicEl(o);
      if (!a) for (var s = r.count(), l = 0; !a && s > l; ) a = r.getItemGraphicEl(l++);
      if (a) {
        var u = rx(a);
        va(i, u.focus, u.blurScope, n);
      } else {
        var h = t.get(['emphasis', 'focus']),
          c = t.get(['emphasis', 'blurScope']);
        null != h && va(i, h, c, n);
      }
    }
  }
  function _a(t, e, n, i) {
    var r = { focusSelf: !1, dispatchers: null };
    if (null == t || 'series' === t || null == e || null == n) return r;
    var o = i.getModel().getComponent(t, e);
    if (!o) return r;
    var a = i.getViewOfComponentModel(o);
    if (!a || !a.findHighDownDispatchers) return r;
    for (var s, l = a.findHighDownDispatchers(n), u = 0; u < l.length; u++)
      if ('self' === rx(l[u]).focus) {
        s = !0;
        break;
      }
    return { focusSelf: s, dispatchers: l };
  }
  function xa(t, e, n) {
    var i = rx(t),
      r = _a(i.componentMainType, i.componentIndex, i.componentHighDownName, n),
      o = r.dispatchers,
      a = r.focusSelf;
    o
      ? (a && ya(i.componentMainType, i.componentIndex, n),
        v(o, function (t) {
          return aa(t, e);
        }))
      : (va(i.seriesIndex, i.focus, i.blurScope, n),
        'self' === i.focus && ya(i.componentMainType, i.componentIndex, n),
        aa(t, e));
  }
  function wa(t, e, n) {
    ga(n);
    var i = rx(t),
      r = _a(i.componentMainType, i.componentIndex, i.componentHighDownName, n).dispatchers;
    r
      ? v(r, function (t) {
          return sa(t, e);
        })
      : sa(t, e);
  }
  function ba(t, e) {
    if (Oa(e)) {
      var n = e.dataType,
        i = t.getData(n),
        r = kr(i, e);
      M(r) || (r = [r]),
        t[e.type === bx ? 'toggleSelect' : e.type === _x ? 'select' : 'unselect'](r, n);
    }
  }
  function Sa(t) {
    var e = t.getAllData();
    v(e, function (e) {
      var n = e.data,
        i = e.type;
      n.eachItemGraphicEl(function (e, n) {
        t.isSelected(n, i) ? pa(e) : fa(e);
      });
    });
  }
  function Ma(t) {
    var e = [];
    return (
      t.eachSeries(function (t) {
        var n = t.getAllData();
        v(n, function (n) {
          var i = (n.data, n.type),
            r = t.getSelectedDataIndices();
          if (r.length > 0) {
            var o = { dataIndex: r, seriesIndex: t.seriesIndex };
            null != i && (o.dataType = i), e.push(o);
          }
        });
      }),
      e
    );
  }
  function Ta(t, e, n) {
    Aa(t, !0), Jo(t, oa), Da(t, e, n);
  }
  function Ca(t) {
    Aa(t, !1);
  }
  function ka(t, e, n, i) {
    i ? Ca(t) : Ta(t, e, n);
  }
  function Da(t, e, n) {
    var i = rx(t);
    null != e ? ((i.focus = e), (i.blurScope = n)) : i.focus && (i.focus = null);
  }
  function Ia(t, e, n, i) {
    n = n || 'itemStyle';
    for (var r = 0; r < Mx.length; r++) {
      var o = Mx[r],
        a = e.getModel([o, n]),
        s = t.ensureState(o);
      s.style = i ? i(a) : a[Tx[n]]();
    }
  }
  function Aa(t, e) {
    var n = e === !1,
      i = t;
    t.highDownSilentOnTouch && (i.__highDownSilentOnTouch = t.highDownSilentOnTouch),
      (!n || i.__highDownDispatcher) &&
        ((i.__highByOuter = i.__highByOuter || 0), (i.__highDownDispatcher = !n));
  }
  function La(t) {
    return !(!t || !t.__highDownDispatcher);
  }
  function Pa(t) {
    var e = sx[t];
    return null == e && 32 >= ax && (e = sx[t] = ax++), e;
  }
  function Oa(t) {
    var e = t.type;
    return e === _x || e === xx || e === bx;
  }
  function Ra(t) {
    var e = t.type;
    return e === yx || e === mx;
  }
  function Ea(t) {
    var e = lx(t);
    (e.normalFill = t.style.fill), (e.normalStroke = t.style.stroke);
    var n = t.states.select || {};
    (e.selectFill = (n.style && n.style.fill) || null),
      (e.selectStroke = (n.style && n.style.stroke) || null);
  }
  function Ba(t, e) {
    if (e) {
      var n,
        i,
        r,
        o,
        a,
        s,
        l = t.data,
        u = t.len(),
        h = Cx.M,
        c = Cx.C,
        p = Cx.L,
        f = Cx.R,
        d = Cx.A,
        g = Cx.Q;
      for (r = 0, o = 0; u > r; ) {
        switch (((n = l[r++]), (o = r), (i = 0), n)) {
          case h:
            i = 1;
            break;
          case p:
            i = 1;
            break;
          case c:
            i = 3;
            break;
          case g:
            i = 2;
            break;
          case d:
            var v = e[4],
              y = e[5],
              m = Dx(e[0] * e[0] + e[1] * e[1]),
              _ = Dx(e[2] * e[2] + e[3] * e[3]),
              x = Ix(-e[1] / _, e[0] / m);
            (l[r] *= m),
              (l[r++] += v),
              (l[r] *= _),
              (l[r++] += y),
              (l[r++] *= m),
              (l[r++] *= _),
              (l[r++] += x),
              (l[r++] += x),
              (r += 2),
              (o = r);
            break;
          case f:
            (s[0] = l[r++]),
              (s[1] = l[r++]),
              ve(s, s, e),
              (l[o++] = s[0]),
              (l[o++] = s[1]),
              (s[0] += l[r++]),
              (s[1] += l[r++]),
              ve(s, s, e),
              (l[o++] = s[0]),
              (l[o++] = s[1]);
        }
        for (a = 0; i > a; a++) {
          var w = kx[a];
          (w[0] = l[r++]), (w[1] = l[r++]), ve(w, w, e), (l[o++] = w[0]), (l[o++] = w[1]);
        }
      }
      t.increaseVersion();
    }
  }
  function za(t) {
    return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
  }
  function Na(t, e) {
    return (t[0] * e[0] + t[1] * e[1]) / (za(t) * za(e));
  }
  function Fa(t, e) {
    return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(Na(t, e));
  }
  function Va(t, e, n, i, r, o, a, s, l, u, h) {
    var c = l * (Ox / 180),
      p = (Px(c) * (t - n)) / 2 + (Lx(c) * (e - i)) / 2,
      f = (-1 * Lx(c) * (t - n)) / 2 + (Px(c) * (e - i)) / 2,
      d = (p * p) / (a * a) + (f * f) / (s * s);
    d > 1 && ((a *= Ax(d)), (s *= Ax(d)));
    var g =
        (r === o ? -1 : 1) *
          Ax((a * a * s * s - a * a * f * f - s * s * p * p) / (a * a * f * f + s * s * p * p)) ||
        0,
      v = (g * a * f) / s,
      y = (g * -s * p) / a,
      m = (t + n) / 2 + Px(c) * v - Lx(c) * y,
      _ = (e + i) / 2 + Lx(c) * v + Px(c) * y,
      x = Fa([1, 0], [(p - v) / a, (f - y) / s]),
      w = [(p - v) / a, (f - y) / s],
      b = [(-1 * p - v) / a, (-1 * f - y) / s],
      S = Fa(w, b);
    if ((Na(w, b) <= -1 && (S = Ox), Na(w, b) >= 1 && (S = 0), 0 > S)) {
      var M = Math.round((S / Ox) * 1e6) / 1e6;
      S = 2 * Ox + (M % 2) * Ox;
    }
    h.addData(u, m, _, a, s, x, S, c, o);
  }
  function Ha(t) {
    var e = new A_();
    if (!t) return e;
    var n,
      i = 0,
      r = 0,
      o = i,
      a = r,
      s = A_.CMD,
      l = t.match(Rx);
    if (!l) return e;
    for (var u = 0; u < l.length; u++) {
      for (
        var h = l[u], c = h.charAt(0), p = void 0, f = h.match(Ex) || [], d = f.length, g = 0;
        d > g;
        g++
      )
        f[g] = parseFloat(f[g]);
      for (var v = 0; d > v; ) {
        var y = void 0,
          m = void 0,
          _ = void 0,
          x = void 0,
          w = void 0,
          b = void 0,
          S = void 0,
          M = i,
          T = r,
          C = void 0,
          k = void 0;
        switch (c) {
          case 'l':
            (i += f[v++]), (r += f[v++]), (p = s.L), e.addData(p, i, r);
            break;
          case 'L':
            (i = f[v++]), (r = f[v++]), (p = s.L), e.addData(p, i, r);
            break;
          case 'm':
            (i += f[v++]),
              (r += f[v++]),
              (p = s.M),
              e.addData(p, i, r),
              (o = i),
              (a = r),
              (c = 'l');
            break;
          case 'M':
            (i = f[v++]), (r = f[v++]), (p = s.M), e.addData(p, i, r), (o = i), (a = r), (c = 'L');
            break;
          case 'h':
            (i += f[v++]), (p = s.L), e.addData(p, i, r);
            break;
          case 'H':
            (i = f[v++]), (p = s.L), e.addData(p, i, r);
            break;
          case 'v':
            (r += f[v++]), (p = s.L), e.addData(p, i, r);
            break;
          case 'V':
            (r = f[v++]), (p = s.L), e.addData(p, i, r);
            break;
          case 'C':
            (p = s.C),
              e.addData(p, f[v++], f[v++], f[v++], f[v++], f[v++], f[v++]),
              (i = f[v - 2]),
              (r = f[v - 1]);
            break;
          case 'c':
            (p = s.C),
              e.addData(p, f[v++] + i, f[v++] + r, f[v++] + i, f[v++] + r, f[v++] + i, f[v++] + r),
              (i += f[v - 2]),
              (r += f[v - 1]);
            break;
          case 'S':
            (y = i),
              (m = r),
              (C = e.len()),
              (k = e.data),
              n === s.C && ((y += i - k[C - 4]), (m += r - k[C - 3])),
              (p = s.C),
              (M = f[v++]),
              (T = f[v++]),
              (i = f[v++]),
              (r = f[v++]),
              e.addData(p, y, m, M, T, i, r);
            break;
          case 's':
            (y = i),
              (m = r),
              (C = e.len()),
              (k = e.data),
              n === s.C && ((y += i - k[C - 4]), (m += r - k[C - 3])),
              (p = s.C),
              (M = i + f[v++]),
              (T = r + f[v++]),
              (i += f[v++]),
              (r += f[v++]),
              e.addData(p, y, m, M, T, i, r);
            break;
          case 'Q':
            (M = f[v++]),
              (T = f[v++]),
              (i = f[v++]),
              (r = f[v++]),
              (p = s.Q),
              e.addData(p, M, T, i, r);
            break;
          case 'q':
            (M = f[v++] + i),
              (T = f[v++] + r),
              (i += f[v++]),
              (r += f[v++]),
              (p = s.Q),
              e.addData(p, M, T, i, r);
            break;
          case 'T':
            (y = i),
              (m = r),
              (C = e.len()),
              (k = e.data),
              n === s.Q && ((y += i - k[C - 4]), (m += r - k[C - 3])),
              (i = f[v++]),
              (r = f[v++]),
              (p = s.Q),
              e.addData(p, y, m, i, r);
            break;
          case 't':
            (y = i),
              (m = r),
              (C = e.len()),
              (k = e.data),
              n === s.Q && ((y += i - k[C - 4]), (m += r - k[C - 3])),
              (i += f[v++]),
              (r += f[v++]),
              (p = s.Q),
              e.addData(p, y, m, i, r);
            break;
          case 'A':
            (_ = f[v++]),
              (x = f[v++]),
              (w = f[v++]),
              (b = f[v++]),
              (S = f[v++]),
              (M = i),
              (T = r),
              (i = f[v++]),
              (r = f[v++]),
              (p = s.A),
              Va(M, T, i, r, b, S, _, x, w, p, e);
            break;
          case 'a':
            (_ = f[v++]),
              (x = f[v++]),
              (w = f[v++]),
              (b = f[v++]),
              (S = f[v++]),
              (M = i),
              (T = r),
              (i += f[v++]),
              (r += f[v++]),
              (p = s.A),
              Va(M, T, i, r, b, S, _, x, w, p, e);
        }
      }
      ('z' === c || 'Z' === c) && ((p = s.Z), e.addData(p), (i = o), (r = a)), (n = p);
    }
    return e.toStatic(), e;
  }
  function Wa(t) {
    return null != t.setData;
  }
  function Ga(t, e) {
    var n = Ha(t),
      i = h({}, e);
    return (
      (i.buildPath = function (t) {
        if (Wa(t)) {
          t.setData(n.data);
          var e = t.getContext();
          e && t.rebuildPath(e, 1);
        } else {
          var e = t;
          n.rebuildPath(e, 1);
        }
      }),
      (i.applyTransform = function (t) {
        Ba(n, t), this.dirtyShape();
      }),
      i
    );
  }
  function Za(t, e) {
    return new Bx(Ga(t, e));
  }
  function Ua(t, n) {
    var i = Ga(t, n),
      r = (function (t) {
        function n(e) {
          var n = t.call(this, e) || this;
          return (n.applyTransform = i.applyTransform), (n.buildPath = i.buildPath), n;
        }
        return e(n, t), n;
      })(Bx);
    return r;
  }
  function Xa(t, e) {
    for (var n = [], i = t.length, r = 0; i > r; r++) {
      var o = t[r];
      n.push(o.getUpdatedPathProxy(!0));
    }
    var a = new H_(e);
    return (
      a.createPathProxy(),
      (a.buildPath = function (t) {
        if (Wa(t)) {
          t.appendPath(n);
          var e = t.getContext();
          e && t.rebuildPath(e, 1);
        }
      }),
      a
    );
  }
  function Ya(t, e, n, i, r, o, a, s) {
    var l = n - t,
      u = i - e,
      h = a - r,
      c = s - o,
      p = c * l - h * u;
    return $x > p * p ? void 0 : ((p = (h * (e - o) - c * (t - r)) / p), [t + p * l, e + p * u]);
  }
  function qa(t, e, n, i, r, o, a) {
    var s = t - n,
      l = e - i,
      u = (a ? o : -o) / qx(s * s + l * l),
      h = u * l,
      c = -u * s,
      p = t + h,
      f = e + c,
      d = n + h,
      g = i + c,
      v = (p + d) / 2,
      y = (f + g) / 2,
      m = d - p,
      _ = g - f,
      x = m * m + _ * _,
      w = r - o,
      b = p * g - d * f,
      S = (0 > _ ? -1 : 1) * qx(jx(0, w * w * x - b * b)),
      M = (b * _ - m * S) / x,
      T = (-b * m - _ * S) / x,
      C = (b * _ + m * S) / x,
      k = (-b * m + _ * S) / x,
      D = M - v,
      I = T - y,
      A = C - v,
      L = k - y;
    return (
      D * D + I * I > A * A + L * L && ((M = C), (T = k)),
      { cx: M, cy: T, x0: -h, y0: -c, x1: M * (r / w - 1), y1: T * (r / w - 1) }
    );
  }
  function ja(t) {
    var e;
    if (M(t)) {
      var n = t.length;
      if (!n) return t;
      e =
        1 === n
          ? [t[0], t[0], 0, 0]
          : 2 === n
          ? [t[0], t[0], t[1], t[1]]
          : 3 === n
          ? t.concat(t[2])
          : t;
    } else e = [t, t, t, t];
    return e;
  }
  function Ka(t, e) {
    var n,
      i = jx(e.r, 0),
      r = jx(e.r0 || 0, 0),
      o = i > 0,
      a = r > 0;
    if (o || a) {
      if ((o || ((i = r), (r = 0)), r > i)) {
        var s = i;
        (i = r), (r = s);
      }
      var l = e.startAngle,
        u = e.endAngle;
      if (!isNaN(l) && !isNaN(u)) {
        var h = e.cx,
          c = e.cy,
          p = !!e.clockwise,
          f = Yx(u - l),
          d = f > Wx && f % Wx;
        if ((d > $x && (f = d), i > $x))
          if (f > Wx - $x)
            t.moveTo(h + i * Zx(l), c + i * Gx(l)),
              t.arc(h, c, i, l, u, !p),
              r > $x && (t.moveTo(h + r * Zx(u), c + r * Gx(u)), t.arc(h, c, r, u, l, p));
          else {
            var g = void 0,
              v = void 0,
              y = void 0,
              m = void 0,
              _ = void 0,
              x = void 0,
              w = void 0,
              b = void 0,
              S = void 0,
              M = void 0,
              T = void 0,
              C = void 0,
              k = void 0,
              D = void 0,
              I = void 0,
              A = void 0,
              L = i * Zx(l),
              P = i * Gx(l),
              O = r * Zx(u),
              R = r * Gx(u),
              E = f > $x;
            if (E) {
              var B = e.cornerRadius;
              B && ((n = ja(B)), (g = n[0]), (v = n[1]), (y = n[2]), (m = n[3]));
              var z = Yx(i - r) / 2;
              if (
                ((_ = Kx(z, y)),
                (x = Kx(z, m)),
                (w = Kx(z, g)),
                (b = Kx(z, v)),
                (T = S = jx(_, x)),
                (C = M = jx(w, b)),
                (S > $x || M > $x) &&
                  ((k = i * Zx(u)), (D = i * Gx(u)), (I = r * Zx(l)), (A = r * Gx(l)), Hx > f))
              ) {
                var N = Ya(L, P, I, A, k, D, O, R);
                if (N) {
                  var F = L - N[0],
                    V = P - N[1],
                    H = k - N[0],
                    W = D - N[1],
                    G = 1 / Gx(Ux((F * H + V * W) / (qx(F * F + V * V) * qx(H * H + W * W))) / 2),
                    Z = qx(N[0] * N[0] + N[1] * N[1]);
                  (T = Kx(S, (i - Z) / (G + 1))), (C = Kx(M, (r - Z) / (G - 1)));
                }
              }
            }
            if (E)
              if (T > $x) {
                var U = Kx(y, T),
                  X = Kx(m, T),
                  Y = qa(I, A, L, P, i, U, p),
                  q = qa(k, D, O, R, i, X, p);
                t.moveTo(h + Y.cx + Y.x0, c + Y.cy + Y.y0),
                  S > T && U === X
                    ? t.arc(h + Y.cx, c + Y.cy, T, Xx(Y.y0, Y.x0), Xx(q.y0, q.x0), !p)
                    : (U > 0 && t.arc(h + Y.cx, c + Y.cy, U, Xx(Y.y0, Y.x0), Xx(Y.y1, Y.x1), !p),
                      t.arc(
                        h,
                        c,
                        i,
                        Xx(Y.cy + Y.y1, Y.cx + Y.x1),
                        Xx(q.cy + q.y1, q.cx + q.x1),
                        !p
                      ),
                      X > 0 && t.arc(h + q.cx, c + q.cy, X, Xx(q.y1, q.x1), Xx(q.y0, q.x0), !p));
              } else t.moveTo(h + L, c + P), t.arc(h, c, i, l, u, !p);
            else t.moveTo(h + L, c + P);
            if (r > $x && E)
              if (C > $x) {
                var U = Kx(g, C),
                  X = Kx(v, C),
                  Y = qa(O, R, k, D, r, -X, p),
                  q = qa(L, P, I, A, r, -U, p);
                t.lineTo(h + Y.cx + Y.x0, c + Y.cy + Y.y0),
                  M > C && U === X
                    ? t.arc(h + Y.cx, c + Y.cy, C, Xx(Y.y0, Y.x0), Xx(q.y0, q.x0), !p)
                    : (X > 0 && t.arc(h + Y.cx, c + Y.cy, X, Xx(Y.y0, Y.x0), Xx(Y.y1, Y.x1), !p),
                      t.arc(h, c, r, Xx(Y.cy + Y.y1, Y.cx + Y.x1), Xx(q.cy + q.y1, q.cx + q.x1), p),
                      U > 0 && t.arc(h + q.cx, c + q.cy, U, Xx(q.y1, q.x1), Xx(q.y0, q.x0), !p));
              } else t.lineTo(h + O, c + R), t.arc(h, c, r, u, l, p);
            else t.lineTo(h + O, c + R);
          }
        else t.moveTo(h, c);
        t.closePath();
      }
    }
  }
  function $a(t, e, n, i) {
    var r,
      o,
      a,
      s,
      l = [],
      u = [],
      h = [],
      c = [];
    if (i) {
      (a = [1 / 0, 1 / 0]), (s = [-1 / 0, -1 / 0]);
      for (var p = 0, f = t.length; f > p; p++) ye(a, a, t[p]), me(s, s, t[p]);
      ye(a, a, i[0]), me(s, s, i[1]);
    }
    for (var p = 0, f = t.length; f > p; p++) {
      var d = t[p];
      if (n) (r = t[p ? p - 1 : f - 1]), (o = t[(p + 1) % f]);
      else {
        if (0 === p || p === f - 1) {
          l.push(te(t[p]));
          continue;
        }
        (r = t[p - 1]), (o = t[p + 1]);
      }
      re(u, o, r), he(u, u, e);
      var g = pe(d, r),
        v = pe(d, o),
        y = g + v;
      0 !== y && ((g /= y), (v /= y)), he(h, u, -g), he(c, u, v);
      var m = ne([], d, h),
        _ = ne([], d, c);
      i && (me(m, m, a), ye(m, m, s), me(_, _, a), ye(_, _, s)), l.push(m), l.push(_);
    }
    return n && l.push(l.shift()), l;
  }
  function Qa(t, e, n) {
    var i = e.smooth,
      r = e.points;
    if (r && r.length >= 2) {
      if (i) {
        var o = $a(r, i, n, e.smoothConstraint);
        t.moveTo(r[0][0], r[0][1]);
        for (var a = r.length, s = 0; (n ? a : a - 1) > s; s++) {
          var l = o[2 * s],
            u = o[2 * s + 1],
            h = r[(s + 1) % a];
          t.bezierCurveTo(l[0], l[1], u[0], u[1], h[0], h[1]);
        }
      } else {
        t.moveTo(r[0][0], r[0][1]);
        for (var s = 1, c = r.length; c > s; s++) t.lineTo(r[s][0], r[s][1]);
      }
      n && t.closePath();
    }
  }
  function Ja(t, e, n) {
    var i = t.cpx2,
      r = t.cpy2;
    return null != i || null != r
      ? [(n ? Qe : $e)(t.x1, t.cpx1, t.cpx2, t.x2, e), (n ? Qe : $e)(t.y1, t.cpy1, t.cpy2, t.y2, e)]
      : [(n ? an : on)(t.x1, t.cpx1, t.x2, e), (n ? an : on)(t.y1, t.cpy1, t.y2, e)];
  }
  function ts(t, e, n, i, r) {
    var o;
    if (e && e.ecModel) {
      var a = e.ecModel.getUpdatePayload();
      o = a && a.animation;
    }
    var s = e && e.isAnimationEnabled(),
      l = 'update' === t;
    if (s) {
      var u = void 0,
        h = void 0,
        c = void 0;
      i
        ? ((u = N(i.duration, 200)), (h = N(i.easing, 'cubicOut')), (c = 0))
        : ((u = e.getShallow(l ? 'animationDurationUpdate' : 'animationDuration')),
          (h = e.getShallow(l ? 'animationEasingUpdate' : 'animationEasing')),
          (c = e.getShallow(l ? 'animationDelayUpdate' : 'animationDelay'))),
        o &&
          (null != o.duration && (u = o.duration),
          null != o.easing && (h = o.easing),
          null != o.delay && (c = o.delay)),
        T(c) && (c = c(n, r)),
        T(u) && (u = u(n));
      var p = { duration: u || 0, delay: c, easing: h };
      return p;
    }
    return null;
  }
  function es(t, e, n, i, r, o, a) {
    var s,
      l = !1;
    T(r)
      ? ((a = o), (o = r), (r = null))
      : I(r) && ((o = r.cb), (a = r.during), (l = r.isFrom), (s = r.removeOpt), (r = r.dataIndex));
    var u = 'leave' === t;
    u || e.stopAnimation('leave');
    var h = ts(
      t,
      i,
      r,
      u ? s || {} : null,
      i && i.getAnimationDelayParams ? i.getAnimationDelayParams(e, r) : null
    );
    if (h && h.duration > 0) {
      var c = h.duration,
        p = h.delay,
        f = h.easing,
        d = {
          duration: c,
          delay: p || 0,
          easing: f,
          done: o,
          force: !!o || !!a,
          setToFinal: !u,
          scope: t,
          during: a,
        };
      l ? e.animateFrom(n, d) : e.animateTo(n, d);
    } else e.stopAnimation(), !l && e.attr(n), a && a(1), o && o();
  }
  function ns(t, e, n, i, r, o) {
    es('update', t, e, n, i, r, o);
  }
  function is(t, e, n, i, r, o) {
    es('enter', t, e, n, i, r, o);
  }
  function rs(t) {
    if (!t.__zr) return !0;
    for (var e = 0; e < t.animators.length; e++) {
      var n = t.animators[e];
      if ('leave' === n.scope) return !0;
    }
    return !1;
  }
  function os(t, e, n, i, r, o) {
    rs(t) || es('leave', t, e, n, i, r, o);
  }
  function as(t, e, n, i) {
    t.removeTextContent(), t.removeTextGuideLine(), os(t, { style: { opacity: 0 } }, e, n, i);
  }
  function ss(t, e, n) {
    function i() {
      t.parent && t.parent.remove(t);
    }
    t.isGroup
      ? t.traverse(function (t) {
          t.isGroup || as(t, e, n, i);
        })
      : as(t, e, n, i);
  }
  function ls(t) {
    Tw(t).oldStyle = t.style;
  }
  function us(t) {
    return H_.extend(t);
  }
  function hs(t, e) {
    return Iw(t, e);
  }
  function cs(t, e) {
    Dw[t] = e;
  }
  function ps(t) {
    return Dw.hasOwnProperty(t) ? Dw[t] : void 0;
  }
  function fs(t, e, n, i) {
    var r = Za(t, e);
    return n && ('center' === i && (n = gs(n, r.getBoundingRect())), vs(r, n)), r;
  }
  function ds(t, e, n) {
    var i = new X_({
      style: { image: t, x: e.x, y: e.y, width: e.width, height: e.height },
      onload: function (t) {
        if ('center' === n) {
          var r = { width: t.width, height: t.height };
          i.setStyle(gs(e, r));
        }
      },
    });
    return i;
  }
  function gs(t, e) {
    var n,
      i = e.width / e.height,
      r = t.height * i;
    r <= t.width ? (n = t.height) : ((r = t.width), (n = r / i));
    var o = t.x + t.width / 2,
      a = t.y + t.height / 2;
    return { x: o - r / 2, y: a - n / 2, width: r, height: n };
  }
  function vs(t, e) {
    if (t.applyTransform) {
      var n = t.getBoundingRect(),
        i = n.calculateTransform(e);
      t.applyTransform(i);
    }
  }
  function ys(t, e) {
    for (var n = ai([]); t && t !== e; ) li(n, t.getLocalTransform(), n), (t = t.parent);
    return n;
  }
  function ms(t, e, n) {
    return e && !g(e) && (e = nm.getLocalTransform(e)), n && (e = pi([], e)), ve([], t, e);
  }
  function _s(t, e, n) {
    var i = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs((2 * e[4]) / e[0]),
      r = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs((2 * e[4]) / e[2]),
      o = ['left' === t ? -i : 'right' === t ? i : 0, 'top' === t ? -r : 'bottom' === t ? r : 0];
    return (
      (o = ms(o, e, n)),
      Math.abs(o[0]) > Math.abs(o[1]) ? (o[0] > 0 ? 'right' : 'left') : o[1] > 0 ? 'bottom' : 'top'
    );
  }
  function xs(t) {
    return !t.isGroup;
  }
  function ws(t) {
    return null != t.shape;
  }
  function bs(t, e, n) {
    function i(t) {
      var e = {};
      return (
        t.traverse(function (t) {
          xs(t) && t.anid && (e[t.anid] = t);
        }),
        e
      );
    }
    function r(t) {
      var e = { x: t.x, y: t.y, rotation: t.rotation };
      return ws(t) && (e.shape = h({}, t.shape)), e;
    }
    if (t && e) {
      var o = i(t);
      e.traverse(function (t) {
        if (xs(t) && t.anid) {
          var e = o[t.anid];
          if (e) {
            var i = r(t);
            t.attr(r(e)), ns(t, i, n, rx(t).dataIndex);
          }
        }
      });
    }
  }
  function Ss(t, e) {
    return y(t, function (t) {
      var n = t[0];
      (n = Cw(n, e.x)), (n = kw(n, e.x + e.width));
      var i = t[1];
      return (i = Cw(i, e.y)), (i = kw(i, e.y + e.height)), [n, i];
    });
  }
  function Ms(t, e) {
    var n = Cw(t.x, e.x),
      i = kw(t.x + t.width, e.x + e.width),
      r = Cw(t.y, e.y),
      o = kw(t.y + t.height, e.y + e.height);
    return i >= n && o >= r ? { x: n, y: r, width: i - n, height: o - r } : void 0;
  }
  function Ts(t, e, n) {
    var i = h({ rectHover: !0 }, e),
      r = (i.style = { strokeNoScale: !0 });
    return (
      (n = n || { x: -1, y: -1, width: 2, height: 2 }),
      t
        ? 0 === t.indexOf('image://')
          ? ((r.image = t.slice(8)), c(r, n), new X_(i))
          : fs(t.replace('path://', ''), i, n, 'center')
        : void 0
    );
  }
  function Cs(t) {
    var e = t.itemTooltipOption,
      n = t.componentModel,
      i = t.itemName,
      r = C(e) ? { formatter: e } : e,
      o = n.mainType,
      a = n.componentIndex,
      s = { componentType: o, name: i, $vars: ['name'] };
    s[o + 'Index'] = a;
    var l = t.formatterParamsExtra;
    l &&
      v(w(l), function (t) {
        K(s, t) || ((s[t] = l[t]), s.$vars.push(t));
      });
    var u = rx(t.el);
    (u.componentMainType = o),
      (u.componentIndex = a),
      (u.tooltipConfig = { name: i, option: c({ content: i, formatterParams: s }, r) });
  }
  function ks(t, e) {
    var n;
    t.isGroup && (n = e(t)), n || t.traverse(e);
  }
  function Ds(t, e) {
    if (t)
      if (M(t)) for (var n = 0; n < t.length; n++) ks(t[n], e);
      else ks(t, e);
  }
  function Is(t, e) {
    for (var n = 0; n < fx.length; n++) {
      var i = fx[n],
        r = e[i],
        o = t.ensureState(i);
      (o.style = o.style || {}), (o.style.text = r);
    }
    var a = t.currentStates.slice();
    t.clearStates(!0), t.setStyle({ text: e.normal }), t.useStates(a, !0);
  }
  function As(t, e, n) {
    var i,
      r = t.labelFetcher,
      o = t.labelDataIndex,
      a = t.labelDimIndex,
      s = e.normal;
    r &&
      (i = r.getFormattedLabel(
        o,
        'normal',
        null,
        a,
        s && s.get('formatter'),
        null != n ? { interpolatedValue: n } : null
      )),
      null == i && (i = T(t.defaultText) ? t.defaultText(o, t, n) : t.defaultText);
    for (var l = { normal: i }, u = 0; u < fx.length; u++) {
      var h = fx[u],
        c = e[h];
      l[h] = N(r ? r.getFormattedLabel(o, h, null, a, c && c.get('formatter')) : null, i);
    }
    return l;
  }
  function Ls(t, e, n, i) {
    n = n || Lw;
    for (var r = t instanceof tx, o = !1, a = 0; a < dx.length; a++) {
      var s = e[dx[a]];
      if (s && s.getShallow('show')) {
        o = !0;
        break;
      }
    }
    var l = r ? t : t.getTextContent();
    if (o) {
      r ||
        (l || ((l = new tx()), t.setTextContent(l)), t.stateProxy && (l.stateProxy = t.stateProxy));
      var u = As(n, e),
        h = e.normal,
        c = !!h.getShallow('show'),
        p = Os(h, i && i.normal, n, !1, !r);
      (p.text = u.normal), r || t.setTextConfig(Rs(h, n, !1));
      for (var a = 0; a < fx.length; a++) {
        var f = fx[a],
          s = e[f];
        if (s) {
          var d = l.ensureState(f),
            g = !!N(s.getShallow('show'), c);
          if (
            (g !== c && (d.ignore = !g),
            (d.style = Os(s, i && i[f], n, !0, !r)),
            (d.style.text = u[f]),
            !r)
          ) {
            var v = t.ensureState(f);
            v.textConfig = Rs(s, n, !0);
          }
        }
      }
      (l.silent = !!h.getShallow('silent')),
        null != l.style.x && (p.x = l.style.x),
        null != l.style.y && (p.y = l.style.y),
        (l.ignore = !c),
        l.useStyle(p),
        l.dirty(),
        n.enableTextSetter &&
          (Ew(l).setLabelText = function (t) {
            var i = As(n, e, t);
            Is(l, i);
          });
    } else l && (l.ignore = !0);
    t.dirty();
  }
  function Ps(t, e) {
    e = e || 'label';
    for (var n = { normal: t.getModel(e) }, i = 0; i < fx.length; i++) {
      var r = fx[i];
      n[r] = t.getModel([r, e]);
    }
    return n;
  }
  function Os(t, e, n, i, r) {
    var o = {};
    return Es(o, t, n, i, r), e && h(o, e), o;
  }
  function Rs(t, e, n) {
    e = e || {};
    var i,
      r = {},
      o = t.getShallow('rotate'),
      a = N(t.getShallow('distance'), n ? null : 5),
      s = t.getShallow('offset');
    return (
      (i = t.getShallow('position') || (n ? null : 'inside')),
      'outside' === i && (i = e.defaultOutsidePosition || 'top'),
      null != i && (r.position = i),
      null != s && (r.offset = s),
      null != o && ((o *= Math.PI / 180), (r.rotation = o)),
      null != a && (r.distance = a),
      (r.outsideFill = 'inherit' === t.get('color') ? e.inheritColor || null : 'auto'),
      r
    );
  }
  function Es(t, e, n, i, r) {
    n = n || Lw;
    var o,
      a = e.ecModel,
      s = a && a.option.textStyle,
      l = Bs(e);
    if (l) {
      o = {};
      for (var u in l)
        if (l.hasOwnProperty(u)) {
          var h = e.getModel(['rich', u]);
          zs((o[u] = {}), h, s, n, i, r, !1, !0);
        }
    }
    o && (t.rich = o);
    var c = e.get('overflow');
    c && (t.overflow = c);
    var p = e.get('minMargin');
    null != p && (t.margin = p), zs(t, e, s, n, i, r, !0, !1);
  }
  function Bs(t) {
    for (var e; t && t !== t.ecModel; ) {
      var n = (t.option || Lw).rich;
      if (n) {
        e = e || {};
        for (var i = w(n), r = 0; r < i.length; r++) {
          var o = i[r];
          e[o] = 1;
        }
      }
      t = t.parentModel;
    }
    return e;
  }
  function zs(t, e, n, i, r, o, a, s) {
    n = (!r && n) || Lw;
    var l = i && i.inheritColor,
      u = e.getShallow('color'),
      h = e.getShallow('textBorderColor'),
      c = N(e.getShallow('opacity'), n.opacity);
    ('inherit' === u || 'auto' === u) && (u = l ? l : null),
      ('inherit' === h || 'auto' === h) && (h = l ? l : null),
      o || ((u = u || n.color), (h = h || n.textBorderColor)),
      null != u && (t.fill = u),
      null != h && (t.stroke = h);
    var p = N(e.getShallow('textBorderWidth'), n.textBorderWidth);
    null != p && (t.lineWidth = p);
    var f = N(e.getShallow('textBorderType'), n.textBorderType);
    null != f && (t.lineDash = f);
    var d = N(e.getShallow('textBorderDashOffset'), n.textBorderDashOffset);
    null != d && (t.lineDashOffset = d),
      r || null != c || s || (c = i && i.defaultOpacity),
      null != c && (t.opacity = c),
      r || o || (null == t.fill && i.inheritColor && (t.fill = i.inheritColor));
    for (var g = 0; g < Pw.length; g++) {
      var v = Pw[g],
        y = N(e.getShallow(v), n[v]);
      null != y && (t[v] = y);
    }
    for (var g = 0; g < Ow.length; g++) {
      var v = Ow[g],
        y = e.getShallow(v);
      null != y && (t[v] = y);
    }
    if (null == t.verticalAlign) {
      var m = e.getShallow('baseline');
      null != m && (t.verticalAlign = m);
    }
    if (!a || !i.disableBox) {
      for (var g = 0; g < Rw.length; g++) {
        var v = Rw[g],
          y = e.getShallow(v);
        null != y && (t[v] = y);
      }
      var _ = e.getShallow('borderType');
      null != _ && (t.borderDash = _),
        ('auto' !== t.backgroundColor && 'inherit' !== t.backgroundColor) ||
          !l ||
          (t.backgroundColor = l),
        ('auto' !== t.borderColor && 'inherit' !== t.borderColor) || !l || (t.borderColor = l);
    }
  }
  function Ns(t, e) {
    var n = e && e.getModel('textStyle');
    return G(
      [
        t.fontStyle || (n && n.getShallow('fontStyle')) || '',
        t.fontWeight || (n && n.getShallow('fontWeight')) || '',
        (t.fontSize || (n && n.getShallow('fontSize')) || 12) + 'px',
        t.fontFamily || (n && n.getShallow('fontFamily')) || 'sans-serif',
      ].join(' ')
    );
  }
  function Fs(t, e, n, i) {
    if (t) {
      var r = Ew(t);
      (r.prevValue = r.value), (r.value = n);
      var o = e.normal;
      (r.valueAnimation = o.get('valueAnimation')),
        r.valueAnimation &&
          ((r.precision = o.get('precision')),
          (r.defaultInterpolatedText = i),
          (r.statesModels = e));
    }
  }
  function Vs(t, e, n, i, r) {
    function o(i) {
      var o = Rr(n, a.precision, l, u, i);
      a.interpolatedValue = 1 === i ? null : o;
      var h = As(
        { labelDataIndex: e, labelFetcher: r, defaultText: s ? s(o) : o + '' },
        a.statesModels,
        o
      );
      Is(t, h);
    }
    var a = Ew(t);
    if (a.valueAnimation && a.prevValue !== a.value) {
      var s = a.defaultInterpolatedText,
        l = N(a.interpolatedValue, a.prevValue),
        u = a.value;
      (t.percent = 0), (null == a.prevValue ? is : ns)(t, { percent: 1 }, i, e, null, o);
    }
  }
  function Hs(t) {
    return [t || '', Yw++].join('_');
  }
  function Ws(t) {
    var e = {};
    (t.registerSubTypeDefaulter = function (t, n) {
      var i = Er(t);
      e[i.main] = n;
    }),
      (t.determineSubType = function (n, i) {
        var r = i.type;
        if (!r) {
          var o = Er(n).main;
          t.hasSubTypes(n) && e[o] && (r = e[o](i));
        }
        return r;
      });
  }
  function Gs(t, e) {
    function n(t) {
      var n = {},
        o = [];
      return (
        v(t, function (a) {
          var s = i(n, a),
            l = (s.originalDeps = e(a)),
            u = r(l, t);
          (s.entryCount = u.length),
            0 === s.entryCount && o.push(a),
            v(u, function (t) {
              p(s.predecessor, t) < 0 && s.predecessor.push(t);
              var e = i(n, t);
              p(e.successor, t) < 0 && e.successor.push(a);
            });
        }),
        { graph: n, noEntryList: o }
      );
    }
    function i(t, e) {
      return t[e] || (t[e] = { predecessor: [], successor: [] }), t[e];
    }
    function r(t, e) {
      var n = [];
      return (
        v(t, function (t) {
          p(e, t) >= 0 && n.push(t);
        }),
        n
      );
    }
    t.topologicalTravel = function (t, e, i, r) {
      function o(t) {
        l[t].entryCount--, 0 === l[t].entryCount && u.push(t);
      }
      function a(t) {
        (h[t] = !0), o(t);
      }
      if (t.length) {
        var s = n(e),
          l = s.graph,
          u = s.noEntryList,
          h = {};
        for (
          v(t, function (t) {
            h[t] = !0;
          });
          u.length;

        ) {
          var c = u.pop(),
            p = l[c],
            f = !!h[c];
          f && (i.call(r, c, p.originalDeps.slice()), delete h[c]), v(p.successor, f ? a : o);
        }
        v(h, function () {
          var t = '';
          throw new Error(t);
        });
      }
    };
  }
  function Zs(t, e) {
    return l(l({}, t, !0), e, !0);
  }
  function Us(t, e) {
    (t = t.toUpperCase()), (tb[t] = new Xw(e)), (Jw[t] = e);
  }
  function Xs(t) {
    if (C(t)) {
      var e = Jw[t.toUpperCase()] || {};
      return t === Kw || t === $w ? s(e) : l(s(e), s(Jw[Qw]), !1);
    }
    return l(s(t), s(Jw[Qw]), !1);
  }
  function Ys(t) {
    return tb[t];
  }
  function qs() {
    return tb[Qw];
  }
  function js(t, e) {
    return (t += ''), '0000'.substr(0, e - t.length) + t;
  }
  function Ks(t) {
    switch (t) {
      case 'half-year':
      case 'quarter':
        return 'month';
      case 'week':
      case 'half-week':
        return 'day';
      case 'half-day':
      case 'quarter-day':
        return 'hour';
      default:
        return t;
    }
  }
  function $s(t) {
    return t === Ks(t);
  }
  function Qs(t) {
    switch (t) {
      case 'year':
      case 'month':
        return 'day';
      case 'millisecond':
        return 'millisecond';
      default:
        return 'second';
    }
  }
  function Js(t, e, n, i) {
    var r = Ki(t),
      o = r[il(n)](),
      a = r[rl(n)]() + 1,
      s = Math.floor((a - 1) / 4) + 1,
      l = r[ol(n)](),
      u = r['get' + (n ? 'UTC' : '') + 'Day'](),
      h = r[al(n)](),
      c = ((h - 1) % 12) + 1,
      p = r[sl(n)](),
      f = r[ll(n)](),
      d = r[ul(n)](),
      g = i instanceof Xw ? i : Ys(i || eb) || qs(),
      v = g.getModel('time'),
      y = v.get('month'),
      m = v.get('monthAbbr'),
      _ = v.get('dayOfWeek'),
      x = v.get('dayOfWeekAbbr');
    return (e || '')
      .replace(/{yyyy}/g, o + '')
      .replace(/{yy}/g, (o % 100) + '')
      .replace(/{Q}/g, s + '')
      .replace(/{MMMM}/g, y[a - 1])
      .replace(/{MMM}/g, m[a - 1])
      .replace(/{MM}/g, js(a, 2))
      .replace(/{M}/g, a + '')
      .replace(/{dd}/g, js(l, 2))
      .replace(/{d}/g, l + '')
      .replace(/{eeee}/g, _[u])
      .replace(/{ee}/g, x[u])
      .replace(/{e}/g, u + '')
      .replace(/{HH}/g, js(h, 2))
      .replace(/{H}/g, h + '')
      .replace(/{hh}/g, js(c + '', 2))
      .replace(/{h}/g, c + '')
      .replace(/{mm}/g, js(p, 2))
      .replace(/{m}/g, p + '')
      .replace(/{ss}/g, js(f, 2))
      .replace(/{s}/g, f + '')
      .replace(/{SSS}/g, js(d, 3))
      .replace(/{S}/g, d + '');
  }
  function tl(t, e, n, i, r) {
    var o = null;
    if (C(n)) o = n;
    else if (T(n)) o = n(t.value, e, { level: t.level });
    else {
      var a = h({}, sb);
      if (t.level > 0) for (var s = 0; s < hb.length; ++s) a[hb[s]] = '{primary|' + a[hb[s]] + '}';
      var l = n ? (n.inherit === !1 ? n : c(n, a)) : a,
        u = el(t.value, r);
      if (l[u]) o = l[u];
      else if (l.inherit) {
        for (var p = cb.indexOf(u), s = p - 1; s >= 0; --s)
          if (l[u]) {
            o = l[u];
            break;
          }
        o = o || a.none;
      }
      if (M(o)) {
        var f = null == t.level ? 0 : t.level >= 0 ? t.level : o.length + t.level;
        (f = Math.min(f, o.length - 1)), (o = o[f]);
      }
    }
    return Js(new Date(t.value), o, r, i);
  }
  function el(t, e) {
    var n = Ki(t),
      i = n[rl(e)]() + 1,
      r = n[ol(e)](),
      o = n[al(e)](),
      a = n[sl(e)](),
      s = n[ll(e)](),
      l = n[ul(e)](),
      u = 0 === l,
      h = u && 0 === s,
      c = h && 0 === a,
      p = c && 0 === o,
      f = p && 1 === r,
      d = f && 1 === i;
    return d
      ? 'year'
      : f
      ? 'month'
      : p
      ? 'day'
      : c
      ? 'hour'
      : h
      ? 'minute'
      : u
      ? 'second'
      : 'millisecond';
  }
  function nl(t, e, n) {
    var i = D(t) ? Ki(t) : t;
    switch ((e = e || el(t, n))) {
      case 'year':
        return i[il(n)]();
      case 'half-year':
        return i[rl(n)]() >= 6 ? 1 : 0;
      case 'quarter':
        return Math.floor((i[rl(n)]() + 1) / 4);
      case 'month':
        return i[rl(n)]();
      case 'day':
        return i[ol(n)]();
      case 'half-day':
        return i[al(n)]() / 24;
      case 'hour':
        return i[al(n)]();
      case 'minute':
        return i[sl(n)]();
      case 'second':
        return i[ll(n)]();
      case 'millisecond':
        return i[ul(n)]();
    }
  }
  function il(t) {
    return t ? 'getUTCFullYear' : 'getFullYear';
  }
  function rl(t) {
    return t ? 'getUTCMonth' : 'getMonth';
  }
  function ol(t) {
    return t ? 'getUTCDate' : 'getDate';
  }
  function al(t) {
    return t ? 'getUTCHours' : 'getHours';
  }
  function sl(t) {
    return t ? 'getUTCMinutes' : 'getMinutes';
  }
  function ll(t) {
    return t ? 'getUTCSeconds' : 'getSeconds';
  }
  function ul(t) {
    return t ? 'getUTCMilliseconds' : 'getMilliseconds';
  }
  function hl(t) {
    return t ? 'setUTCFullYear' : 'setFullYear';
  }
  function cl(t) {
    return t ? 'setUTCMonth' : 'setMonth';
  }
  function pl(t) {
    return t ? 'setUTCDate' : 'setDate';
  }
  function fl(t) {
    return t ? 'setUTCHours' : 'setHours';
  }
  function dl(t) {
    return t ? 'setUTCMinutes' : 'setMinutes';
  }
  function gl(t) {
    return t ? 'setUTCSeconds' : 'setSeconds';
  }
  function vl(t) {
    return t ? 'setUTCMilliseconds' : 'setMilliseconds';
  }
  function yl(t, e, n, i, r, o, a, s) {
    var l = new tx({
      style: {
        text: t,
        font: e,
        align: n,
        verticalAlign: i,
        padding: r,
        rich: o,
        overflow: a ? 'truncate' : null,
        lineHeight: s,
      },
    });
    return l.getBoundingRect();
  }
  function ml(t) {
    if (!ir(t)) return C(t) ? t : '-';
    var e = (t + '').split('.');
    return e[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + (e.length > 1 ? '.' + e[1] : '');
  }
  function _l(t, e) {
    return (
      (t = (t || '').toLowerCase().replace(/-(.)/g, function (t, e) {
        return e.toUpperCase();
      })),
      e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)),
      t
    );
  }
  function xl(t) {
    return null == t
      ? ''
      : (t + '').replace(fb, function (t, e) {
          return db[e];
        });
  }
  function wl(t, e, n) {
    M(e) || (e = [e]);
    var i = e.length;
    if (!i) return '';
    for (var r = e[0].$vars || [], o = 0; o < r.length; o++) {
      var a = gb[o];
      t = t.replace(vb(a), vb(a, 0));
    }
    for (var s = 0; i > s; s++)
      for (var l = 0; l < r.length; l++) {
        var u = e[s][r[l]];
        t = t.replace(vb(gb[l], s), n ? xl(u) : u);
      }
    return t;
  }
  function bl(t, e) {
    var n = C(t) ? { color: t, extraCssText: e } : t || {},
      i = n.color,
      r = n.type;
    e = n.extraCssText;
    var o = n.renderMode || 'html';
    if (!i) return '';
    if ('html' === o)
      return 'subItem' === r
        ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' +
            xl(i) +
            ';' +
            (e || '') +
            '"></span>'
        : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' +
            xl(i) +
            ';' +
            (e || '') +
            '"></span>';
    var a = n.markerId || 'markerX';
    return {
      renderMode: o,
      content: '{' + a + '|}  ',
      style:
        'subItem' === r
          ? { width: 4, height: 4, borderRadius: 2, backgroundColor: i }
          : { width: 10, height: 10, borderRadius: 5, backgroundColor: i },
    };
  }
  function Sl(t, e, n) {
    ('week' === t || 'month' === t || 'quarter' === t || 'half-year' === t || 'year' === t) &&
      (t = 'MM-dd\nyyyy');
    var i = Ki(e),
      r = n ? 'getUTC' : 'get',
      o = i[r + 'FullYear'](),
      a = i[r + 'Month']() + 1,
      s = i[r + 'Date'](),
      l = i[r + 'Hours'](),
      u = i[r + 'Minutes'](),
      h = i[r + 'Seconds'](),
      c = i[r + 'Milliseconds']();
    return (t = t
      .replace('MM', js(a, 2))
      .replace('M', a)
      .replace('yyyy', o)
      .replace('yy', (o % 100) + '')
      .replace('dd', js(s, 2))
      .replace('d', s)
      .replace('hh', js(l, 2))
      .replace('h', l)
      .replace('mm', js(u, 2))
      .replace('m', u)
      .replace('ss', js(h, 2))
      .replace('s', h)
      .replace('SSS', js(c, 3)));
  }
  function Ml(t) {
    return t ? t.charAt(0).toUpperCase() + t.substr(1) : t;
  }
  function Tl(t, e) {
    return (
      (e = e || 'transparent'),
      C(t) ? t : I(t) ? (t.colorStops && (t.colorStops[0] || {}).color) || e : e
    );
  }
  function Cl(t, e, n, i, r) {
    var o = 0,
      a = 0;
    null == i && (i = 1 / 0), null == r && (r = 1 / 0);
    var s = 0;
    e.eachChild(function (l, u) {
      var h,
        c,
        p = l.getBoundingRect(),
        f = e.childAt(u + 1),
        d = f && f.getBoundingRect();
      if ('horizontal' === t) {
        var g = p.width + (d ? -d.x + p.x : 0);
        (h = o + g),
          h > i || l.newline
            ? ((o = 0), (h = g), (a += s + n), (s = p.height))
            : (s = Math.max(s, p.height));
      } else {
        var v = p.height + (d ? -d.y + p.y : 0);
        (c = a + v),
          c > r || l.newline
            ? ((o += s + n), (a = 0), (c = v), (s = p.width))
            : (s = Math.max(s, p.width));
      }
      l.newline ||
        ((l.x = o), (l.y = a), l.markRedraw(), 'horizontal' === t ? (o = h + n) : (a = c + n));
    });
  }
  function kl(t, e, n) {
    n = pb(n || 0);
    var i = e.width,
      r = e.height,
      o = Vi(t.left, i),
      a = Vi(t.top, r),
      s = Vi(t.right, i),
      l = Vi(t.bottom, r),
      u = Vi(t.width, i),
      h = Vi(t.height, r),
      c = n[2] + n[0],
      p = n[1] + n[3],
      f = t.aspect;
    switch (
      (isNaN(u) && (u = i - s - p - o),
      isNaN(h) && (h = r - l - c - a),
      null != f &&
        (isNaN(u) && isNaN(h) && (f > i / r ? (u = 0.8 * i) : (h = 0.8 * r)),
        isNaN(u) && (u = f * h),
        isNaN(h) && (h = u / f)),
      isNaN(o) && (o = i - s - u - p),
      isNaN(a) && (a = r - l - h - c),
      t.left || t.right)
    ) {
      case 'center':
        o = i / 2 - u / 2 - n[3];
        break;
      case 'right':
        o = i - u - p;
    }
    switch (t.top || t.bottom) {
      case 'middle':
      case 'center':
        a = r / 2 - h / 2 - n[0];
        break;
      case 'bottom':
        a = r - h - c;
    }
    (o = o || 0),
      (a = a || 0),
      isNaN(u) && (u = i - p - o - (s || 0)),
      isNaN(h) && (h = r - c - a - (l || 0));
    var d = new fm(o + n[3], a + n[0], u, h);
    return (d.margin = n), d;
  }
  function Dl(t) {
    var e = t.layoutMode || t.constructor.layoutMode;
    return I(e) ? e : e ? { type: e } : null;
  }
  function Il(t, e, n) {
    function i(n, i) {
      var a = {},
        l = 0,
        u = {},
        h = 0,
        c = 2;
      if (
        (yb(n, function (e) {
          u[e] = t[e];
        }),
        yb(n, function (t) {
          r(e, t) && (a[t] = u[t] = e[t]), o(a, t) && l++, o(u, t) && h++;
        }),
        s[i])
      )
        return o(e, n[1]) ? (u[n[2]] = null) : o(e, n[2]) && (u[n[1]] = null), u;
      if (h !== c && l) {
        if (l >= c) return a;
        for (var p = 0; p < n.length; p++) {
          var f = n[p];
          if (!r(a, f) && r(t, f)) {
            a[f] = t[f];
            break;
          }
        }
        return a;
      }
      return u;
    }
    function r(t, e) {
      return t.hasOwnProperty(e);
    }
    function o(t, e) {
      return null != t[e] && 'auto' !== t[e];
    }
    function a(t, e, n) {
      yb(t, function (t) {
        e[t] = n[t];
      });
    }
    var s = n && n.ignoreSize;
    !M(s) && (s = [s, s]);
    var l = i(_b[0], 0),
      u = i(_b[1], 1);
    a(_b[0], t, l), a(_b[1], t, u);
  }
  function Al(t) {
    return Ll({}, t);
  }
  function Ll(t, e) {
    return (
      e &&
        t &&
        yb(mb, function (n) {
          e.hasOwnProperty(n) && (t[n] = e[n]);
        }),
      t
    );
  }
  function Pl(t) {
    var e = [];
    return (
      v(wb.getClassesByMainType(t), function (t) {
        e = e.concat(t.dependencies || t.prototype.dependencies || []);
      }),
      (e = y(e, function (t) {
        return Er(t).main;
      })),
      'dataset' !== t && p(e, 'dataset') <= 0 && e.unshift('dataset'),
      e
    );
  }
  function Ol(t) {
    zb(t).datasetMap = X();
  }
  function Rl(t, e, n) {
    function i(t, e, n) {
      for (var i = 0; n > i; i++) t.push(e + i);
    }
    function r(t) {
      var e = t.dimsDef;
      return e ? e.length : 1;
    }
    var o = {},
      a = El(e);
    if (!a || !t) return o;
    var s,
      l,
      u = [],
      h = [],
      c = e.ecModel,
      p = zb(c).datasetMap,
      f = a.uid + '_' + n.seriesLayoutBy;
    (t = t.slice()),
      v(t, function (e, n) {
        var i = I(e) ? e : (t[n] = { name: e });
        'ordinal' === i.type && null == s && ((s = n), (l = r(i))), (o[i.name] = []);
      });
    var d = p.get(f) || p.set(f, { categoryWayDim: l, valueWayDim: 0 });
    return (
      v(t, function (t, e) {
        var n = t.name,
          a = r(t);
        if (null == s) {
          var l = d.valueWayDim;
          i(o[n], l, a), i(h, l, a), (d.valueWayDim += a);
        } else if (s === e) i(o[n], 0, a), i(u, 0, a);
        else {
          var l = d.categoryWayDim;
          i(o[n], l, a), i(h, l, a), (d.categoryWayDim += a);
        }
      }),
      u.length && (o.itemName = u),
      h.length && (o.seriesName = h),
      o
    );
  }
  function El(t) {
    var e = t.get('data', !0);
    return e
      ? void 0
      : Lr(
          t.ecModel,
          'dataset',
          { index: t.get('datasetIndex', !0), id: t.get('datasetId', !0) },
          Em
        ).models[0];
  }
  function Bl(t) {
    return t.get('transform', !0) || t.get('fromTransformResult', !0)
      ? Lr(
          t.ecModel,
          'dataset',
          { index: t.get('fromDatasetIndex', !0), id: t.get('fromDatasetId', !0) },
          Em
        ).models
      : [];
  }
  function zl(t, e) {
    return Nl(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e);
  }
  function Nl(t, e, n, i, r, o) {
    function a(t) {
      var e = C(t);
      return null != t && isFinite(t) && '' !== t
        ? e
          ? Bb.Might
          : Bb.Not
        : e && '-' !== t
        ? Bb.Must
        : void 0;
    }
    var s,
      l = 5;
    if (L(t)) return Bb.Not;
    var u, h;
    if (i) {
      var c = i[o];
      I(c) ? ((u = c.name), (h = c.type)) : C(c) && (u = c);
    }
    if (null != h) return 'ordinal' === h ? Bb.Must : Bb.Not;
    if (e === Ib) {
      var p = t;
      if (n === Eb) {
        for (var f = p[o], d = 0; d < (f || []).length && l > d; d++)
          if (null != (s = a(f[r + d]))) return s;
      } else
        for (var d = 0; d < p.length && l > d; d++) {
          var g = p[r + d];
          if (g && null != (s = a(g[o]))) return s;
        }
    } else if (e === Ab) {
      var v = t;
      if (!u) return Bb.Not;
      for (var d = 0; d < v.length && l > d; d++) {
        var y = v[d];
        if (y && null != (s = a(y[u]))) return s;
      }
    } else if (e === Lb) {
      var m = t;
      if (!u) return Bb.Not;
      var f = m[u];
      if (!f || L(f)) return Bb.Not;
      for (var d = 0; d < f.length && l > d; d++) if (null != (s = a(f[d]))) return s;
    } else if (e === Db)
      for (var _ = t, d = 0; d < _.length && l > d; d++) {
        var y = _[d],
          x = cr(y);
        if (!M(x)) return Bb.Not;
        if (null != (s = a(x[o]))) return s;
      }
    return Bb.Not;
  }
  function Fl(t, e, n) {
    var i = Nb.get(e);
    if (!i) return n;
    var r = i(t);
    return r ? n.concat(r) : n;
  }
  function Vl(t, e) {
    for (var n = t.length, i = 0; n > i; i++) if (t[i].length > e) return t[i];
    return t[n - 1];
  }
  function Hl(t, e, n, i, r, o, a) {
    o = o || t;
    var s = e(o),
      l = s.paletteIdx || 0,
      u = (s.paletteNameMap = s.paletteNameMap || {});
    if (u.hasOwnProperty(r)) return u[r];
    var h = null != a && i ? Vl(i, a) : n;
    if (((h = h || n), h && h.length)) {
      var c = h[l];
      return r && (u[r] = c), (s.paletteIdx = (l + 1) % h.length), c;
    }
  }
  function Wl(t, e) {
    (e(t).paletteIdx = 0), (e(t).paletteNameMap = {});
  }
  function Gl(t, e) {
    if (e) {
      var n = e.seriesIndex,
        i = e.seriesId,
        r = e.seriesName;
      return (
        (null != n && t.componentIndex !== n) ||
        (null != i && t.id !== i) ||
        (null != r && t.name !== r)
      );
    }
  }
  function Zl(t, e) {
    var n = t.color && !t.colorLayer;
    v(e, function (e, i) {
      ('colorLayer' === i && n) ||
        wb.hasClass(i) ||
        ('object' == typeof e ? (t[i] = t[i] ? l(t[i], e, !1) : s(e)) : null == t[i] && (t[i] = e));
    });
  }
  function Ul(t, e, n) {
    if (M(e)) {
      var i = X();
      return (
        v(e, function (t) {
          if (null != t) {
            var e = br(t, null);
            null != e && i.set(t, !0);
          }
        }),
        _(n, function (e) {
          return e && i.get(e[t]);
        })
      );
    }
    var r = br(e, null);
    return _(n, function (e) {
      return e && null != r && e[t] === r;
    });
  }
  function Xl(t, e) {
    return e.hasOwnProperty('subType')
      ? _(t, function (t) {
          return t && t.subType === e.subType;
        })
      : t;
  }
  function Yl(t) {
    var e = X();
    return (
      t &&
        v(ur(t.replaceMerge), function (t) {
          e.set(t, !0);
        }),
      { replaceMergeMainTypeMap: e }
    );
  }
  function ql(t, e, n) {
    function i(t) {
      v(e, function (e) {
        e(t, n);
      });
    }
    var r,
      o,
      a = [],
      s = t.baseOption,
      l = t.timeline,
      u = t.options,
      h = t.media,
      c = !!t.media,
      p = !!(u || l || (s && s.timeline));
    return (
      s
        ? ((o = s), o.timeline || (o.timeline = l))
        : ((p || c) && (t.options = t.media = null), (o = t)),
      c &&
        M(h) &&
        v(h, function (t) {
          t && t.option && (t.query ? a.push(t) : r || (r = t));
        }),
      i(o),
      v(u, function (t) {
        return i(t);
      }),
      v(a, function (t) {
        return i(t.option);
      }),
      { baseOption: o, timelineOptions: u || [], mediaDefault: r, mediaList: a }
    );
  }
  function jl(t, e, n) {
    var i = { width: e, height: n, aspectratio: e / n },
      r = !0;
    return (
      v(t, function (t, e) {
        var n = e.match(tS);
        if (n && n[1] && n[2]) {
          var o = n[1],
            a = n[2].toLowerCase();
          Kl(i[a], t, o) || (r = !1);
        }
      }),
      r
    );
  }
  function Kl(t, e, n) {
    return 'min' === n ? t >= e : 'max' === n ? e >= t : t === e;
  }
  function $l(t, e) {
    return t.join(',') === e.join(',');
  }
  function Ql(t) {
    var e = t && t.itemStyle;
    if (e)
      for (var n = 0, i = rS.length; i > n; n++) {
        var r = rS[n],
          o = e.normal,
          a = e.emphasis;
        o &&
          o[r] &&
          ((t[r] = t[r] || {}),
          t[r].normal ? l(t[r].normal, o[r]) : (t[r].normal = o[r]),
          (o[r] = null)),
          a &&
            a[r] &&
            ((t[r] = t[r] || {}),
            t[r].emphasis ? l(t[r].emphasis, a[r]) : (t[r].emphasis = a[r]),
            (a[r] = null));
      }
  }
  function Jl(t, e, n) {
    if (t && t[e] && (t[e].normal || t[e].emphasis)) {
      var i = t[e].normal,
        r = t[e].emphasis;
      i && (n ? ((t[e].normal = t[e].emphasis = null), c(t[e], i)) : (t[e] = i)),
        r &&
          ((t.emphasis = t.emphasis || {}),
          (t.emphasis[e] = r),
          r.focus && (t.emphasis.focus = r.focus),
          r.blurScope && (t.emphasis.blurScope = r.blurScope));
    }
  }
  function tu(t) {
    Jl(t, 'itemStyle'),
      Jl(t, 'lineStyle'),
      Jl(t, 'areaStyle'),
      Jl(t, 'label'),
      Jl(t, 'labelLine'),
      Jl(t, 'upperLabel'),
      Jl(t, 'edgeLabel');
  }
  function eu(t, e) {
    var n = iS(t) && t[e],
      i = iS(n) && n.textStyle;
    if (i)
      for (var r = 0, o = Om.length; o > r; r++) {
        var a = Om[r];
        i.hasOwnProperty(a) && (n[a] = i[a]);
      }
  }
  function nu(t) {
    t && (tu(t), eu(t, 'label'), t.emphasis && eu(t.emphasis, 'label'));
  }
  function iu(t) {
    if (iS(t)) {
      Ql(t),
        tu(t),
        eu(t, 'label'),
        eu(t, 'upperLabel'),
        eu(t, 'edgeLabel'),
        t.emphasis &&
          (eu(t.emphasis, 'label'), eu(t.emphasis, 'upperLabel'), eu(t.emphasis, 'edgeLabel'));
      var e = t.markPoint;
      e && (Ql(e), nu(e));
      var n = t.markLine;
      n && (Ql(n), nu(n));
      var i = t.markArea;
      i && nu(i);
      var r = t.data;
      if ('graph' === t.type) {
        r = r || t.nodes;
        var o = t.links || t.edges;
        if (o && !L(o)) for (var a = 0; a < o.length; a++) nu(o[a]);
        v(t.categories, function (t) {
          tu(t);
        });
      }
      if (r && !L(r)) for (var a = 0; a < r.length; a++) nu(r[a]);
      if (((e = t.markPoint), e && e.data)) for (var s = e.data, a = 0; a < s.length; a++) nu(s[a]);
      if (((n = t.markLine), n && n.data))
        for (var l = n.data, a = 0; a < l.length; a++)
          M(l[a]) ? (nu(l[a][0]), nu(l[a][1])) : nu(l[a]);
      'gauge' === t.type
        ? (eu(t, 'axisLabel'), eu(t, 'title'), eu(t, 'detail'))
        : 'treemap' === t.type
        ? (Jl(t.breadcrumb, 'itemStyle'),
          v(t.levels, function (t) {
            tu(t);
          }))
        : 'tree' === t.type && tu(t.leaves);
    }
  }
  function ru(t) {
    return M(t) ? t : t ? [t] : [];
  }
  function ou(t) {
    return (M(t) ? t[0] : t) || {};
  }
  function au(t, e) {
    nS(ru(t.series), function (t) {
      iS(t) && iu(t);
    });
    var n = ['xAxis', 'yAxis', 'radiusAxis', 'angleAxis', 'singleAxis', 'parallelAxis', 'radar'];
    e && n.push('valueAxis', 'categoryAxis', 'logAxis', 'timeAxis'),
      nS(n, function (e) {
        nS(ru(t[e]), function (t) {
          t && (eu(t, 'axisLabel'), eu(t.axisPointer, 'label'));
        });
      }),
      nS(ru(t.parallel), function (t) {
        var e = t && t.parallelAxisDefault;
        eu(e, 'axisLabel'), eu(e && e.axisPointer, 'label');
      }),
      nS(ru(t.calendar), function (t) {
        Jl(t, 'itemStyle'), eu(t, 'dayLabel'), eu(t, 'monthLabel'), eu(t, 'yearLabel');
      }),
      nS(ru(t.radar), function (t) {
        eu(t, 'name'),
          t.name && null == t.axisName && ((t.axisName = t.name), delete t.name),
          null != t.nameGap &&
            null == t.axisNameGap &&
            ((t.axisNameGap = t.nameGap), delete t.nameGap);
      }),
      nS(ru(t.geo), function (t) {
        iS(t) &&
          (nu(t),
          nS(ru(t.regions), function (t) {
            nu(t);
          }));
      }),
      nS(ru(t.timeline), function (t) {
        nu(t), Jl(t, 'label'), Jl(t, 'itemStyle'), Jl(t, 'controlStyle', !0);
        var e = t.data;
        M(e) &&
          v(e, function (t) {
            I(t) && (Jl(t, 'label'), Jl(t, 'itemStyle'));
          });
      }),
      nS(ru(t.toolbox), function (t) {
        Jl(t, 'iconStyle'),
          nS(t.feature, function (t) {
            Jl(t, 'iconStyle');
          });
      }),
      eu(ou(t.axisPointer), 'label'),
      eu(ou(t.tooltip).axisPointer, 'label');
  }
  function su(t, e) {
    for (var n = e.split(','), i = t, r = 0; r < n.length && ((i = i && i[n[r]]), null != i); r++);
    return i;
  }
  function lu(t, e, n, i) {
    for (var r, o = e.split(','), a = t, s = 0; s < o.length - 1; s++)
      (r = o[s]), null == a[r] && (a[r] = {}), (a = a[r]);
    (i || null == a[o[s]]) && (a[o[s]] = n);
  }
  function uu(t) {
    t &&
      v(oS, function (e) {
        e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]]);
      });
  }
  function hu(t) {
    var e = t && t.itemStyle;
    if (e)
      for (var n = 0; n < sS.length; n++) {
        var i = sS[n][1],
          r = sS[n][0];
        null != e[i] && (e[r] = e[i]);
      }
  }
  function cu(t) {
    t &&
      'edge' === t.alignTo &&
      null != t.margin &&
      null == t.edgeDistance &&
      (t.edgeDistance = t.margin);
  }
  function pu(t) {
    t && t.downplay && !t.blur && (t.blur = t.downplay);
  }
  function fu(t) {
    t &&
      null != t.focusNodeAdjacency &&
      ((t.emphasis = t.emphasis || {}),
      null == t.emphasis.focus && (t.emphasis.focus = 'adjacency'));
  }
  function du(t, e) {
    if (t) for (var n = 0; n < t.length; n++) e(t[n]), t[n] && du(t[n].children, e);
  }
  function gu(t, e) {
    au(t, e),
      (t.series = ur(t.series)),
      v(t.series, function (t) {
        if (I(t)) {
          var e = t.type;
          if ('line' === e) null != t.clipOverflow && (t.clip = t.clipOverflow);
          else if ('pie' === e || 'gauge' === e) {
            null != t.clockWise && (t.clockwise = t.clockWise), cu(t.label);
            var n = t.data;
            if (n && !L(n)) for (var i = 0; i < n.length; i++) cu(n[i]);
            null != t.hoverOffset &&
              ((t.emphasis = t.emphasis || {}),
              (t.emphasis.scaleSize = null) && (t.emphasis.scaleSize = t.hoverOffset));
          } else if ('gauge' === e) {
            var r = su(t, 'pointer.color');
            null != r && lu(t, 'itemStyle.color', r);
          } else if ('bar' === e) {
            hu(t), hu(t.backgroundStyle), hu(t.emphasis);
            var n = t.data;
            if (n && !L(n))
              for (var i = 0; i < n.length; i++)
                'object' == typeof n[i] && (hu(n[i]), hu(n[i] && n[i].emphasis));
          } else if ('sunburst' === e) {
            var o = t.highlightPolicy;
            o && ((t.emphasis = t.emphasis || {}), t.emphasis.focus || (t.emphasis.focus = o)),
              pu(t),
              du(t.data, pu);
          } else
            'graph' === e || 'sankey' === e
              ? fu(t)
              : 'map' === e &&
                (t.mapType && !t.map && (t.map = t.mapType), t.mapLocation && c(t, t.mapLocation));
          null != t.hoverAnimation &&
            ((t.emphasis = t.emphasis || {}),
            t.emphasis && null == t.emphasis.scale && (t.emphasis.scale = t.hoverAnimation)),
            uu(t);
        }
      }),
      t.dataRange && (t.visualMap = t.dataRange),
      v(aS, function (e) {
        var n = t[e];
        n &&
          (M(n) || (n = [n]),
          v(n, function (t) {
            uu(t);
          }));
      });
  }
  function vu(t) {
    var e = X();
    t.eachSeries(function (t) {
      var n = t.get('stack');
      if (n) {
        var i = e.get(n) || e.set(n, []),
          r = t.getData(),
          o = {
            stackResultDimension: r.getCalculationInfo('stackResultDimension'),
            stackedOverDimension: r.getCalculationInfo('stackedOverDimension'),
            stackedDimension: r.getCalculationInfo('stackedDimension'),
            stackedByDimension: r.getCalculationInfo('stackedByDimension'),
            isStackedByIndex: r.getCalculationInfo('isStackedByIndex'),
            data: r,
            seriesModel: t,
          };
        if (!o.stackedDimension || (!o.isStackedByIndex && !o.stackedByDimension)) return;
        i.length && r.setCalculationInfo('stackedOnSeries', i[i.length - 1].seriesModel), i.push(o);
      }
    }),
      e.each(yu);
  }
  function yu(t) {
    v(t, function (e, n) {
      var i = [],
        r = [0 / 0, 0 / 0],
        o = [e.stackResultDimension, e.stackedOverDimension],
        a = e.data,
        s = e.isStackedByIndex;
      a.modify(o, function (o, l, u) {
        var h = a.get(e.stackedDimension, u);
        if (isNaN(h)) return r;
        var c, p;
        s ? (p = a.getRawIndex(u)) : (c = a.get(e.stackedByDimension, u));
        for (var f = 0 / 0, d = n - 1; d >= 0; d--) {
          var g = t[d];
          if ((s || (p = g.data.rawIndexOf(g.stackedByDimension, c)), p >= 0)) {
            var v = g.data.getByRawIndex(g.stackResultDimension, p);
            if ((h >= 0 && v > 0) || (0 >= h && 0 > v)) {
              (h = Yi(h, v)), (f = v);
              break;
            }
          }
        }
        return (i[0] = h), (i[1] = f), i;
      });
    });
  }
  function mu(t) {
    return t instanceof lS;
  }
  function _u(t, e, n) {
    n = n || bu(t);
    var i = e.seriesLayoutBy,
      r = Su(t, n, i, e.sourceHeader, e.dimensions),
      o = new lS({
        data: t,
        sourceFormat: n,
        seriesLayoutBy: i,
        dimensionsDefine: r.dimensionsDefine,
        startIndex: r.startIndex,
        dimensionsDetectedCount: r.dimensionsDetectedCount,
        metaRawOption: s(e),
      });
    return o;
  }
  function xu(t) {
    return new lS({ data: t, sourceFormat: L(t) ? Pb : Db });
  }
  function wu(t) {
    return new lS({
      data: t.data,
      sourceFormat: t.sourceFormat,
      seriesLayoutBy: t.seriesLayoutBy,
      dimensionsDefine: s(t.dimensionsDefine),
      startIndex: t.startIndex,
      dimensionsDetectedCount: t.dimensionsDetectedCount,
    });
  }
  function bu(t) {
    var e = Ob;
    if (L(t)) e = Pb;
    else if (M(t)) {
      0 === t.length && (e = Ib);
      for (var n = 0, i = t.length; i > n; n++) {
        var r = t[n];
        if (null != r) {
          if (M(r)) {
            e = Ib;
            break;
          }
          if (I(r)) {
            e = Ab;
            break;
          }
        }
      }
    } else if (I(t))
      for (var o in t)
        if (K(t, o) && g(t[o])) {
          e = Lb;
          break;
        }
    return e;
  }
  function Su(t, e, n, i, r) {
    var o, a;
    if (!t) return { dimensionsDefine: Tu(r), startIndex: a, dimensionsDetectedCount: o };
    if (e === Ib) {
      var s = t;
      'auto' === i || null == i
        ? Cu(
            function (t) {
              null != t && '-' !== t && (C(t) ? null == a && (a = 1) : (a = 0));
            },
            n,
            s,
            10
          )
        : (a = D(i) ? i : i ? 1 : 0),
        r ||
          1 !== a ||
          ((r = []),
          Cu(
            function (t, e) {
              r[e] = null != t ? t + '' : '';
            },
            n,
            s,
            1 / 0
          )),
        (o = r ? r.length : n === Eb ? s.length : s[0] ? s[0].length : null);
    } else if (e === Ab) r || (r = Mu(t));
    else if (e === Lb)
      r ||
        ((r = []),
        v(t, function (t, e) {
          r.push(e);
        }));
    else if (e === Db) {
      var l = cr(t[0]);
      o = (M(l) && l.length) || 1;
    }
    return { startIndex: a, dimensionsDefine: Tu(r), dimensionsDetectedCount: o };
  }
  function Mu(t) {
    for (var e, n = 0; n < t.length && !(e = t[n++]); );
    if (e) {
      var i = [];
      return (
        v(e, function (t, e) {
          i.push(e);
        }),
        i
      );
    }
  }
  function Tu(t) {
    if (t) {
      var e = X();
      return y(t, function (t) {
        t = I(t) ? t : { name: t };
        var n = { name: t.name, displayName: t.displayName, type: t.type };
        if (null == n.name) return n;
        (n.name += ''), null == n.displayName && (n.displayName = n.name);
        var i = e.get(n.name);
        return i ? (n.name += '-' + i.count++) : e.set(n.name, { count: 1 }), n;
      });
    }
  }
  function Cu(t, e, n, i) {
    if (e === Eb) for (var r = 0; r < n.length && i > r; r++) t(n[r] ? n[r][0] : null, r);
    else for (var o = n[0] || [], r = 0; r < o.length && i > r; r++) t(o[r], r);
  }
  function ku(t) {
    var e = t.sourceFormat;
    return e === Ab || e === Lb;
  }
  function Du(t, e) {
    var n = cS[Lu(t, e)];
    return n;
  }
  function Iu(t, e) {
    var n = fS[Lu(t, e)];
    return n;
  }
  function Au(t) {
    var e = gS[t];
    return e;
  }
  function Lu(t, e) {
    return t === Ib ? t + '_' + e : t;
  }
  function Pu(t, e, n) {
    if (t) {
      var i = t.getRawDataItem(e);
      if (null != i) {
        var r = t.getStore(),
          o = r.getSource().sourceFormat;
        if (null != n) {
          var a = t.getDimensionIndex(n),
            s = r.getDimensionProperty(a);
          return Au(o)(i, a, s);
        }
        var l = i;
        return o === Db && (l = cr(i)), l;
      }
    }
  }
  function Ou(t) {
    return new mS(t);
  }
  function Ru(t, e) {
    var n = e && e.type;
    return 'ordinal' === n
      ? t
      : ('time' !== n || D(t) || null == t || '-' === t || (t = +Ki(t)),
        null == t || '' === t ? 0 / 0 : +t);
  }
  function Eu(t, e) {
    var n = new wS(),
      i = t.data,
      r = (n.sourceFormat = t.sourceFormat),
      o = t.startIndex,
      a = '';
    t.seriesLayoutBy !== Rb && sr(a);
    var s = [],
      l = {},
      u = t.dimensionsDefine;
    if (u)
      v(u, function (t, e) {
        var n = t.name,
          i = { index: e, name: n, displayName: t.displayName };
        if ((s.push(i), null != n)) {
          var r = '';
          K(l, n) && sr(r), (l[n] = i);
        }
      });
    else for (var h = 0; h < t.dimensionsDetectedCount; h++) s.push({ index: h });
    var c = Du(r, Rb);
    e.__isBuiltIn &&
      ((n.getRawDataItem = function (t) {
        return c(i, o, s, t);
      }),
      (n.getRawData = _v(Bu, null, t))),
      (n.cloneRawData = _v(zu, null, t));
    var p = Iu(r, Rb);
    n.count = _v(p, null, i, o, s);
    var f = Au(r);
    n.retrieveValue = function (t, e) {
      var n = c(i, o, s, t);
      return d(n, e);
    };
    var d = (n.retrieveValueFromItem = function (t, e) {
      if (null != t) {
        var n = s[e];
        return n ? f(t, e, n.name) : void 0;
      }
    });
    return (
      (n.getDimensionInfo = _v(Nu, null, s, l)), (n.cloneAllDimensionInfo = _v(Fu, null, s)), n
    );
  }
  function Bu(t) {
    var e = t.sourceFormat;
    if (!Gu(e)) {
      var n = '';
      sr(n);
    }
    return t.data;
  }
  function zu(t) {
    var e = t.sourceFormat,
      n = t.data;
    if (!Gu(e)) {
      var i = '';
      sr(i);
    }
    if (e === Ib) {
      for (var r = [], o = 0, a = n.length; a > o; o++) r.push(n[o].slice());
      return r;
    }
    if (e === Ab) {
      for (var r = [], o = 0, a = n.length; a > o; o++) r.push(h({}, n[o]));
      return r;
    }
  }
  function Nu(t, e, n) {
    return null != n ? (D(n) || (!isNaN(n) && !K(e, n)) ? t[n] : K(e, n) ? e[n] : void 0) : void 0;
  }
  function Fu(t) {
    return s(t);
  }
  function Vu(t) {
    t = s(t);
    var e = t.type,
      n = '';
    e || sr(n);
    var i = e.split(':');
    2 !== i.length && sr(n);
    var r = !1;
    'echarts' === i[0] && ((e = i[1]), (r = !0)), (t.__isBuiltIn = r), bS.set(e, t);
  }
  function Hu(t, e, n) {
    var i = ur(t),
      r = i.length,
      o = '';
    r || sr(o);
    for (var a = 0, s = r; s > a; a++) {
      var l = i[a];
      (e = Wu(l, e, n, 1 === r ? null : a)), a !== s - 1 && (e.length = Math.max(e.length, 1));
    }
    return e;
  }
  function Wu(t, e) {
    var n = '';
    e.length || sr(n), I(t) || sr(n);
    var i = t.type,
      r = bS.get(i);
    r || sr(n);
    var o = y(e, function (t) {
        return Eu(t, r);
      }),
      a = ur(r.transform({ upstream: o[0], upstreamList: o, config: s(t.config) }));
    return y(a, function (t, n) {
      var i = '';
      I(t) || sr(i), t.data || sr(i);
      var r = bu(t.data);
      Gu(r) || sr(i);
      var o,
        a = e[0];
      if (a && 0 === n && !t.dimensions) {
        var s = a.startIndex;
        s && (t.data = a.data.slice(0, s).concat(t.data)),
          (o = { seriesLayoutBy: Rb, sourceHeader: s, dimensions: a.metaRawOption.dimensions });
      } else o = { seriesLayoutBy: Rb, sourceHeader: 0, dimensions: t.dimensions };
      return _u(t.data, o, null);
    });
  }
  function Gu(t) {
    return t === Ib || t === Ab;
  }
  function Zu(t) {
    return t > 65535 ? MS : TS;
  }
  function Uu() {
    return [1 / 0, -1 / 0];
  }
  function Xu(t) {
    var e = t.constructor;
    return e === Array ? t.slice() : new e(t);
  }
  function Yu(t, e, n, i, r) {
    var o = DS[n || 'float'];
    if (r) {
      var a = t[e],
        s = a && a.length;
      if (s !== i) {
        for (var l = new o(i), u = 0; s > u; u++) l[u] = a[u];
        t[e] = l;
      }
    } else t[e] = new o(i);
  }
  function qu(t) {
    var e = t.option.transform;
    e && Z(t.option.transform);
  }
  function ju(t) {
    return 'series' === t.mainType;
  }
  function Ku(t) {
    throw new Error(t);
  }
  function $u(t, e) {
    return (e.type = t), e;
  }
  function Qu(t, e) {
    var n = t.getData().getItemVisual(e, 'style'),
      i = n[t.visualDrawType];
    return Tl(i);
  }
  function Ju(t) {
    var e,
      n,
      i,
      r,
      o = t.series,
      a = t.dataIndex,
      s = t.multipleSeries,
      l = o.getData(),
      u = l.mapDimensionsAll('defaultedTooltip'),
      h = u.length,
      c = o.getRawValue(a),
      p = M(c),
      f = Qu(o, a);
    if (h > 1 || (p && !h)) {
      var d = th(c, o, a, u, f);
      (e = d.inlineValues), (n = d.inlineValueTypes), (i = d.blocks), (r = d.inlineValues[0]);
    } else if (h) {
      var g = l.getDimensionInfo(u[0]);
      (r = e = Pu(l, a, u[0])), (n = g.type);
    } else r = e = p ? c[0] : c;
    var v = Sr(o),
      y = (v && o.name) || '',
      m = l.getName(a),
      _ = s ? y : m;
    return $u('section', {
      header: y,
      noHeader: s || !v,
      sortParam: r,
      blocks: [
        $u('nameValue', {
          markerType: 'item',
          markerColor: f,
          name: _,
          noName: !G(_),
          value: e,
          valueType: n,
        }),
      ].concat(i || []),
    });
  }
  function th(t, e, n, i, r) {
    function o(t, e) {
      var n = a.getDimensionInfo(e);
      n &&
        n.otherDims.tooltip !== !1 &&
        (s
          ? h.push(
              $u('nameValue', {
                markerType: 'subItem',
                markerColor: r,
                name: n.displayName,
                value: t,
                valueType: n.type,
              })
            )
          : (l.push(t), u.push(n.type)));
    }
    var a = e.getData(),
      s = m(
        t,
        function (t, e, n) {
          var i = a.getDimensionInfo(n);
          return (t = t || (i && i.tooltip !== !1 && null != i.displayName));
        },
        !1
      ),
      l = [],
      u = [],
      h = [];
    return (
      i.length
        ? v(i, function (t) {
            o(Pu(a, n, t), t);
          })
        : v(t, o),
      { inlineValues: l, inlineValueTypes: u, blocks: h }
    );
  }
  function eh(t, e) {
    return t.getName(e) || t.getId(e);
  }
  function nh(t) {
    var e = t.name;
    Sr(t) || (t.name = ih(t) || e);
  }
  function ih(t) {
    var e = t.getRawData(),
      n = e.mapDimensionsAll('seriesName'),
      i = [];
    return (
      v(n, function (t) {
        var n = e.getDimensionInfo(t);
        n.displayName && i.push(n.displayName);
      }),
      i.join(' ')
    );
  }
  function rh(t) {
    return t.model.getRawData().count();
  }
  function oh(t) {
    var e = t.model;
    return e.setData(e.getRawData().cloneShallow()), ah;
  }
  function ah(t, e) {
    e.outputData && t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData);
  }
  function sh(t, e) {
    v(Y(t.CHANGABLE_METHODS, t.DOWNSAMPLE_METHODS), function (n) {
      t.wrapMethod(n, S(lh, e));
    });
  }
  function lh(t, e) {
    var n = uh(t);
    return n && n.setOutputEnd((e || this).count()), e;
  }
  function uh(t) {
    var e = (t.ecModel || {}).scheduler,
      n = e && e.getPipeline(t.uid);
    if (n) {
      var i = n.currentTask;
      if (i) {
        var r = i.agentStubMap;
        r && (i = r.get(t.uid));
      }
      return i;
    }
  }
  function hh() {
    var t = Dr();
    return function (e) {
      var n = t(e),
        i = e.pipelineContext,
        r = !!n.large,
        o = !!n.progressiveRender,
        a = (n.large = !(!i || !i.large)),
        s = (n.progressiveRender = !(!i || !i.progressiveRender));
      return !(r === a && o === s) && 'reset';
    };
  }
  function ch(t, e, n) {
    t && La(t) && ('emphasis' === e ? la : ua)(t, n);
  }
  function ph(t, e, n) {
    var i = kr(t, e),
      r = e && null != e.highlightKey ? Pa(e.highlightKey) : null;
    null != i
      ? v(ur(i), function (e) {
          ch(t.getItemGraphicEl(e), n, r);
        })
      : t.eachItemGraphicEl(function (t) {
          ch(t, n, r);
        });
  }
  function fh(t) {
    return BS(t.model);
  }
  function dh(t) {
    var e = t.model,
      n = t.ecModel,
      i = t.api,
      r = t.payload,
      o = e.pipelineContext.progressiveRender,
      a = t.view,
      s = r && ES(r).updateMethod,
      l = o ? 'incrementalPrepareRender' : s && a[s] ? s : 'render';
    return 'render' !== l && a[l](e, n, i, r), FS[l];
  }
  function gh(t, e, n) {
    function i() {
      (h = new Date().getTime()), (c = null), t.apply(a, s || []);
    }
    var r,
      o,
      a,
      s,
      l,
      u = 0,
      h = 0,
      c = null;
    e = e || 0;
    var p = function () {
      for (var t = [], p = 0; p < arguments.length; p++) t[p] = arguments[p];
      (r = new Date().getTime()), (a = this), (s = t);
      var f = l || e,
        d = l || n;
      (l = null),
        (o = r - (d ? u : h) - f),
        clearTimeout(c),
        d ? (c = setTimeout(i, f)) : o >= 0 ? i() : (c = setTimeout(i, -o)),
        (u = r);
    };
    return (
      (p.clear = function () {
        c && (clearTimeout(c), (c = null));
      }),
      (p.debounceNextCall = function (t) {
        l = t;
      }),
      p
    );
  }
  function vh(t, e, n, i) {
    var r = t[e];
    if (r) {
      var o = r[VS] || r,
        a = r[WS],
        s = r[HS];
      if (s !== n || a !== i) {
        if (null == n || !i) return (t[e] = o);
        (r = t[e] = gh(o, n, 'debounce' === i)), (r[VS] = o), (r[WS] = i), (r[HS] = n);
      }
      return r;
    }
  }
  function yh(t, e) {
    var n = t[e];
    n && n[VS] && (n.clear && n.clear(), (t[e] = n[VS]));
  }
  function mh(t, e) {
    var n = t.visualStyleMapper || ZS[e];
    return n ? n : (console.warn("Unkown style type '" + e + "'."), ZS.itemStyle);
  }
  function _h(t, e) {
    var n = t.visualDrawType || US[e];
    return n ? n : (console.warn("Unkown style type '" + e + "'."), 'fill');
  }
  function xh(t, e) {
    (e = e || {}),
      c(e, {
        text: 'loading',
        textColor: '#000',
        fontSize: 12,
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontFamily: 'sans-serif',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        showSpinner: !0,
        color: '#5470c6',
        spinnerRadius: 10,
        lineWidth: 5,
        zlevel: 0,
      });
    var n = new wm(),
      i = new K_({ style: { fill: e.maskColor }, zlevel: e.zlevel, z: 1e4 });
    n.add(i);
    var r = new tx({
        style: {
          text: e.text,
          fill: e.textColor,
          fontSize: e.fontSize,
          fontWeight: e.fontWeight,
          fontStyle: e.fontStyle,
          fontFamily: e.fontFamily,
        },
        zlevel: e.zlevel,
        z: 10001,
      }),
      o = new K_({
        style: { fill: 'none' },
        textContent: r,
        textConfig: { position: 'right', distance: 10 },
        zlevel: e.zlevel,
        z: 10001,
      });
    n.add(o);
    var a;
    return (
      e.showSpinner &&
        ((a = new fw({
          shape: { startAngle: -KS / 2, endAngle: -KS / 2 + 0.1, r: e.spinnerRadius },
          style: { stroke: e.color, lineCap: 'round', lineWidth: e.lineWidth },
          zlevel: e.zlevel,
          z: 10001,
        })),
        a
          .animateShape(!0)
          .when(1e3, { endAngle: (3 * KS) / 2 })
          .start('circularInOut'),
        a
          .animateShape(!0)
          .when(1e3, { startAngle: (3 * KS) / 2 })
          .delay(300)
          .start('circularInOut'),
        n.add(a)),
      (n.resize = function () {
        var n = r.getBoundingRect().width,
          s = e.showSpinner ? e.spinnerRadius : 0,
          l =
            (t.getWidth() - 2 * s - (e.showSpinner && n ? 10 : 0) - n) / 2 -
            (e.showSpinner && n ? 0 : 5 + n / 2) +
            (e.showSpinner ? 0 : n / 2) +
            (n ? 0 : s),
          u = t.getHeight() / 2;
        e.showSpinner && a.setShape({ cx: l, cy: u }),
          o.setShape({ x: l - s, y: u - s, width: 2 * s, height: 2 * s }),
          i.setShape({ x: 0, y: 0, width: t.getWidth(), height: t.getHeight() });
      }),
      n.resize(),
      n
    );
  }
  function wh(t) {
    t.overallReset(t.ecModel, t.api, t.payload);
  }
  function bh(t) {
    return t.overallProgress && Sh;
  }
  function Sh() {
    this.agent.dirty(), this.getDownstream().dirty();
  }
  function Mh() {
    this.agent && this.agent.dirty();
  }
  function Th(t) {
    return t.plan ? t.plan(t.model, t.ecModel, t.api, t.payload) : null;
  }
  function Ch(t) {
    t.useClearVisual && t.data.clearAllVisual();
    var e = (t.resetDefines = ur(t.reset(t.model, t.ecModel, t.api, t.payload)));
    return e.length > 1
      ? y(e, function (t, e) {
          return kh(e);
        })
      : QS;
  }
  function kh(t) {
    return function (e, n) {
      var i = n.data,
        r = n.resetDefines[t];
      if (r && r.dataEach) for (var o = e.start; o < e.end; o++) r.dataEach(i, o);
      else r && r.progress && r.progress(e, i);
    };
  }
  function Dh(t) {
    return t.data.count();
  }
  function Ih(t) {
    NS = null;
    try {
      t(JS, tM);
    } catch (e) {}
    return NS;
  }
  function Ah(t, e) {
    for (var n in e.prototype) t[n] = $;
  }
  function Lh(t, e, n) {
    switch (n) {
      case 'color':
        var i = t.getItemVisual(e, 'style');
        return i[t.getVisual('drawType')];
      case 'opacity':
        return t.getItemVisual(e, 'style').opacity;
      case 'symbol':
      case 'symbolSize':
      case 'liftZ':
        return t.getItemVisual(e, n);
    }
  }
  function Ph(t, e) {
    switch (e) {
      case 'color':
        var n = t.getVisual('style');
        return n[t.getVisual('drawType')];
      case 'opacity':
        return t.getVisual('style').opacity;
      case 'symbol':
      case 'symbolSize':
      case 'liftZ':
        return t.getVisual(e);
    }
  }
  function Oh(t, e, n, i, r) {
    var o = t + e;
    n.isSilent(o) ||
      i.eachComponent({ mainType: 'series', subType: 'pie' }, function (t) {
        for (
          var e = t.seriesIndex, i = t.option.selectedMap, a = r.selected, s = 0;
          s < a.length;
          s++
        )
          if (a[s].seriesIndex === e) {
            var l = t.getData(),
              u = kr(l, r.fromActionPayload);
            n.trigger(o, {
              type: o,
              seriesId: t.id,
              name: l.getName(M(u) ? u[0] : u),
              selected: C(i) ? i : h({}, i),
            });
          }
      });
  }
  function Rh(t, e, n) {
    t.on('selectchanged', function (t) {
      var i = n.getModel();
      t.isFromClick
        ? (Oh('map', 'selectchanged', e, i, t), Oh('pie', 'selectchanged', e, i, t))
        : 'select' === t.fromAction
        ? (Oh('map', 'selected', e, i, t), Oh('pie', 'selected', e, i, t))
        : 'unselect' === t.fromAction &&
          (Oh('map', 'unselected', e, i, t), Oh('pie', 'unselected', e, i, t));
    });
  }
  function Eh(t, e, n) {
    for (var i; t && (!e(t) || ((i = t), !n)); ) t = t.__hostTarget || t.parent;
    return i;
  }
  function Bh(t, e) {
    if ('image' !== this.type) {
      var n = this.style;
      this.__isEmptyBrush
        ? ((n.stroke = t), (n.fill = e || '#fff'), (n.lineWidth = 2))
        : 'line' === this.shape.symbolType
        ? (n.stroke = t)
        : (n.fill = t),
        this.markRedraw();
    }
  }
  function zh(t, e, n, i, r, o, a) {
    var s = 0 === t.indexOf('empty');
    s && (t = t.substr(5, 1).toLowerCase() + t.substr(6));
    var l;
    return (
      (l =
        0 === t.indexOf('image://')
          ? ds(t.slice(8), new fm(e, n, i, r), a ? 'center' : 'cover')
          : 0 === t.indexOf('path://')
          ? fs(t.slice(7), {}, new fm(e, n, i, r), a ? 'center' : 'cover')
          : new SM({ shape: { symbolType: t, x: e, y: n, width: i, height: r } })),
      (l.__isEmptyBrush = s),
      (l.setColor = Bh),
      o && l.setColor(o),
      l
    );
  }
  function Nh(t, e) {
    return null != t
      ? (M(t) || (t = [t, t]), [Vi(t[0], e[0]) || 0, Vi(N(t[1], t[0]), e[1]) || 0])
      : void 0;
  }
  function Fh(t, e, n) {
    var i = null == e.x ? 0 : e.x,
      r = null == e.x2 ? 1 : e.x2,
      o = null == e.y ? 0 : e.y,
      a = null == e.y2 ? 0 : e.y2;
    e.global ||
      ((i = i * n.width + n.x),
      (r = r * n.width + n.x),
      (o = o * n.height + n.y),
      (a = a * n.height + n.y)),
      (i = isNaN(i) ? 0 : i),
      (r = isNaN(r) ? 1 : r),
      (o = isNaN(o) ? 0 : o),
      (a = isNaN(a) ? 0 : a);
    var s = t.createLinearGradient(i, o, r, a);
    return s;
  }
  function Vh(t, e, n) {
    var i = n.width,
      r = n.height,
      o = Math.min(i, r),
      a = null == e.x ? 0.5 : e.x,
      s = null == e.y ? 0.5 : e.y,
      l = null == e.r ? 0.5 : e.r;
    e.global || ((a = a * i + n.x), (s = s * r + n.y), (l *= o));
    var u = t.createRadialGradient(a, s, 0, a, s, l);
    return u;
  }
  function Hh(t, e, n) {
    for (
      var i = 'radial' === e.type ? Vh(t, e, n) : Fh(t, e, n), r = e.colorStops, o = 0;
      o < r.length;
      o++
    )
      i.addColorStop(r[o].offset, r[o].color);
    return i;
  }
  function Wh(t, e) {
    if (t === e || (!t && !e)) return !1;
    if (!t || !e || t.length !== e.length) return !0;
    for (var n = 0; n < t.length; n++) if (t[n] !== e[n]) return !0;
    return !1;
  }
  function Gh(t) {
    return parseInt(t, 10);
  }
  function Zh(t, e, n) {
    var i = ['width', 'height'][e],
      r = ['clientWidth', 'clientHeight'][e],
      o = ['paddingLeft', 'paddingTop'][e],
      a = ['paddingRight', 'paddingBottom'][e];
    if (null != n[i] && 'auto' !== n[i]) return parseFloat(n[i]);
    var s = document.defaultView.getComputedStyle(t);
    return ((t[r] || Gh(s[i]) || Gh(t.style[i])) - (Gh(s[o]) || 0) - (Gh(s[a]) || 0)) | 0;
  }
  function Uh(t, e) {
    return t && 'solid' !== t && e > 0
      ? 'dashed' === t
        ? [4 * e, 2 * e]
        : 'dotted' === t
        ? [e]
        : D(t)
        ? [t]
        : M(t)
        ? t
        : null
      : null;
  }
  function Xh(t) {
    var e = t.style,
      n = e.lineDash && e.lineWidth > 0 && Uh(e.lineDash, e.lineWidth),
      i = e.lineDashOffset;
    if (n) {
      var r = e.strokeNoScale && t.getLineScale ? t.getLineScale() : 1;
      r &&
        1 !== r &&
        ((n = y(n, function (t) {
          return t / r;
        })),
        (i /= r));
    }
    return [n, i];
  }
  function Yh(t) {
    var e = t.stroke;
    return !(null == e || 'none' === e || !(t.lineWidth > 0));
  }
  function qh(t) {
    return 'string' == typeof t && 'none' !== t;
  }
  function jh(t) {
    var e = t.fill;
    return null != e && 'none' !== e;
  }
  function Kh(t, e) {
    if (null != e.fillOpacity && 1 !== e.fillOpacity) {
      var n = t.globalAlpha;
      (t.globalAlpha = e.fillOpacity * e.opacity), t.fill(), (t.globalAlpha = n);
    } else t.fill();
  }
  function $h(t, e) {
    if (null != e.strokeOpacity && 1 !== e.strokeOpacity) {
      var n = t.globalAlpha;
      (t.globalAlpha = e.strokeOpacity * e.opacity), t.stroke(), (t.globalAlpha = n);
    } else t.stroke();
  }
  function Qh(t, e, n) {
    var i = Yr(e.image, e.__image, n);
    if (jr(i)) {
      var r = t.createPattern(i, e.repeat || 'repeat');
      if ('function' == typeof DOMMatrix && r && r.setTransform) {
        var o = new DOMMatrix();
        o.translateSelf(e.x || 0, e.y || 0),
          o.rotateSelf(0, 0, (e.rotation || 0) * bv),
          o.scaleSelf(e.scaleX || 1, e.scaleY || 1),
          r.setTransform(o);
      }
      return r;
    }
  }
  function Jh(t, e, n, i) {
    var r,
      o = Yh(n),
      a = jh(n),
      s = n.strokePercent,
      l = 1 > s,
      u = !e.path;
    (e.silent && !l) || !u || e.createPathProxy();
    var h = e.path || MM,
      c = e.__dirty;
    if (!i) {
      var p = n.fill,
        f = n.stroke,
        d = a && !!p.colorStops,
        g = o && !!f.colorStops,
        v = a && !!p.image,
        y = o && !!f.image,
        m = void 0,
        _ = void 0,
        x = void 0,
        w = void 0,
        b = void 0;
      (d || g) && (b = e.getBoundingRect()),
        d && ((m = c ? Hh(t, p, b) : e.__canvasFillGradient), (e.__canvasFillGradient = m)),
        g && ((_ = c ? Hh(t, f, b) : e.__canvasStrokeGradient), (e.__canvasStrokeGradient = _)),
        v &&
          ((x = c || !e.__canvasFillPattern ? Qh(t, p, e) : e.__canvasFillPattern),
          (e.__canvasFillPattern = x)),
        y &&
          ((w = c || !e.__canvasStrokePattern ? Qh(t, f, e) : e.__canvasStrokePattern),
          (e.__canvasStrokePattern = x)),
        d ? (t.fillStyle = m) : v && (x ? (t.fillStyle = x) : (a = !1)),
        g ? (t.strokeStyle = _) : y && (w ? (t.strokeStyle = w) : (o = !1));
    }
    var S = e.getGlobalScale();
    h.setScale(S[0], S[1], e.segmentIgnoreThreshold);
    var M, T;
    t.setLineDash && n.lineDash && ((r = Xh(e)), (M = r[0]), (T = r[1]));
    var C = !0;
    (u || c & Kv) &&
      (h.setDPR(t.dpr),
      l ? h.setContext(null) : (h.setContext(t), (C = !1)),
      h.reset(),
      e.buildPath(h, e.shape, i),
      h.toStatic(),
      e.pathUpdated()),
      C && h.rebuildPath(t, l ? s : 1),
      M && (t.setLineDash(M), (t.lineDashOffset = T)),
      i || (n.strokeFirst ? (o && $h(t, n), a && Kh(t, n)) : (a && Kh(t, n), o && $h(t, n))),
      M && t.setLineDash([]);
  }
  function tc(t, e, n) {
    var i = (e.__image = Yr(n.image, e.__image, e, e.onload));
    if (i && jr(i)) {
      var r = n.x || 0,
        o = n.y || 0,
        a = e.getWidth(),
        s = e.getHeight(),
        l = i.width / i.height;
      if (
        (null == a && null != s
          ? (a = s * l)
          : null == s && null != a
          ? (s = a / l)
          : null == a && null == s && ((a = i.width), (s = i.height)),
        n.sWidth && n.sHeight)
      ) {
        var u = n.sx || 0,
          h = n.sy || 0;
        t.drawImage(i, u, h, n.sWidth, n.sHeight, r, o, a, s);
      } else if (n.sx && n.sy) {
        var u = n.sx,
          h = n.sy,
          c = a - u,
          p = s - h;
        t.drawImage(i, u, h, c, p, r, o, a, s);
      } else t.drawImage(i, r, o, a, s);
    }
  }
  function ec(t, e, n) {
    var i,
      r = n.text;
    if ((null != r && (r += ''), r)) {
      (t.font = n.font || tv), (t.textAlign = n.textAlign), (t.textBaseline = n.textBaseline);
      var o = void 0,
        a = void 0;
      t.setLineDash && n.lineDash && ((i = Xh(e)), (o = i[0]), (a = i[1])),
        o && (t.setLineDash(o), (t.lineDashOffset = a)),
        n.strokeFirst
          ? (Yh(n) && t.strokeText(r, n.x, n.y), jh(n) && t.fillText(r, n.x, n.y))
          : (jh(n) && t.fillText(r, n.x, n.y), Yh(n) && t.strokeText(r, n.x, n.y)),
        o && t.setLineDash([]);
    }
  }
  function nc(t, e, n, i, r) {
    var o = !1;
    if (!i && ((n = n || {}), e === n)) return !1;
    if (i || e.opacity !== n.opacity) {
      uc(t, r), (o = !0);
      var a = Math.max(Math.min(e.opacity, 1), 0);
      t.globalAlpha = isNaN(a) ? $m.opacity : a;
    }
    (i || e.blend !== n.blend) &&
      (o || (uc(t, r), (o = !0)), (t.globalCompositeOperation = e.blend || $m.blend));
    for (var s = 0; s < TM.length; s++) {
      var l = TM[s];
      (i || e[l] !== n[l]) && (o || (uc(t, r), (o = !0)), (t[l] = t.dpr * (e[l] || 0)));
    }
    return (
      (i || e.shadowColor !== n.shadowColor) &&
        (o || (uc(t, r), (o = !0)), (t.shadowColor = e.shadowColor || $m.shadowColor)),
      o
    );
  }
  function ic(t, e, n, i, r) {
    var o = hc(e, r.inHover),
      a = i ? null : (n && hc(n, r.inHover)) || {};
    if (o === a) return !1;
    var s = nc(t, o, a, i, r);
    if (
      ((i || o.fill !== a.fill) &&
        (s || (uc(t, r), (s = !0)), qh(o.fill) && (t.fillStyle = o.fill)),
      (i || o.stroke !== a.stroke) &&
        (s || (uc(t, r), (s = !0)), qh(o.stroke) && (t.strokeStyle = o.stroke)),
      (i || o.opacity !== a.opacity) &&
        (s || (uc(t, r), (s = !0)), (t.globalAlpha = null == o.opacity ? 1 : o.opacity)),
      e.hasStroke())
    ) {
      var l = o.lineWidth,
        u = l / (o.strokeNoScale && e.getLineScale ? e.getLineScale() : 1);
      t.lineWidth !== u && (s || (uc(t, r), (s = !0)), (t.lineWidth = u));
    }
    for (var h = 0; h < CM.length; h++) {
      var c = CM[h],
        p = c[0];
      (i || o[p] !== a[p]) && (s || (uc(t, r), (s = !0)), (t[p] = o[p] || c[1]));
    }
    return s;
  }
  function rc(t, e, n, i, r) {
    return nc(t, hc(e, r.inHover), n && hc(n, r.inHover), i, r);
  }
  function oc(t, e) {
    var n = e.transform,
      i = t.dpr || 1;
    n
      ? t.setTransform(i * n[0], i * n[1], i * n[2], i * n[3], i * n[4], i * n[5])
      : t.setTransform(i, 0, 0, i, 0, 0);
  }
  function ac(t, e, n) {
    for (var i = !1, r = 0; r < t.length; r++) {
      var o = t[r];
      (i = i || o.isZeroArea()), oc(e, o), e.beginPath(), o.buildPath(e, o.shape), e.clip();
    }
    n.allClipped = i;
  }
  function sc(t, e) {
    return t && e
      ? t[0] !== e[0] ||
          t[1] !== e[1] ||
          t[2] !== e[2] ||
          t[3] !== e[3] ||
          t[4] !== e[4] ||
          t[5] !== e[5]
      : t || e
      ? !0
      : !1;
  }
  function lc(t) {
    var e = jh(t),
      n = Yh(t);
    return !(
      t.lineDash ||
      !(+e ^ +n) ||
      (e && 'string' != typeof t.fill) ||
      (n && 'string' != typeof t.stroke) ||
      t.strokePercent < 1 ||
      t.strokeOpacity < 1 ||
      t.fillOpacity < 1
    );
  }
  function uc(t, e) {
    e.batchFill && t.fill(), e.batchStroke && t.stroke(), (e.batchFill = ''), (e.batchStroke = '');
  }
  function hc(t, e) {
    return e ? t.__hoverStyle || t.style : t.style;
  }
  function cc(t, e) {
    pc(t, e, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
  }
  function pc(t, e, n, i) {
    var r = e.transform;
    if (!e.shouldBePainted(n.viewWidth, n.viewHeight, !1, !1))
      return (e.__dirty &= ~qv), void (e.__isRendered = !1);
    var o = e.__clipPaths,
      a = n.prevElClipPaths,
      s = !1,
      l = !1;
    if (
      ((!a || Wh(o, a)) &&
        (a &&
          a.length &&
          (uc(t, n),
          t.restore(),
          (l = s = !0),
          (n.prevElClipPaths = null),
          (n.allClipped = !1),
          (n.prevEl = null)),
        o && o.length && (uc(t, n), t.save(), ac(o, t, n), (s = !0)),
        (n.prevElClipPaths = o)),
      n.allClipped)
    )
      return void (e.__isRendered = !1);
    e.beforeBrush && e.beforeBrush(), e.innerBeforeBrush();
    var u = n.prevEl;
    u || (l = s = !0);
    var h = e instanceof H_ && e.autoBatch && lc(e.style);
    s || sc(r, u.transform) ? (uc(t, n), oc(t, e)) : h || uc(t, n);
    var c = hc(e, n.inHover);
    e instanceof H_
      ? (n.lastDrawType !== kM && ((l = !0), (n.lastDrawType = kM)),
        ic(t, e, u, l, n),
        (h && (n.batchFill || n.batchStroke)) || t.beginPath(),
        Jh(t, e, c, h),
        h && ((n.batchFill = c.fill || ''), (n.batchStroke = c.stroke || '')))
      : e instanceof G_
      ? (n.lastDrawType !== IM && ((l = !0), (n.lastDrawType = IM)), ic(t, e, u, l, n), ec(t, e, c))
      : e instanceof X_
      ? (n.lastDrawType !== DM && ((l = !0), (n.lastDrawType = DM)), rc(t, e, u, l, n), tc(t, e, c))
      : e.getTemporalDisplayables &&
        (n.lastDrawType !== AM && ((l = !0), (n.lastDrawType = AM)), fc(t, e, n)),
      h && i && uc(t, n),
      e.innerAfterBrush(),
      e.afterBrush && e.afterBrush(),
      (n.prevEl = e),
      (e.__dirty = 0),
      (e.__isRendered = !0);
  }
  function fc(t, e, n) {
    var i = e.getDisplayables(),
      r = e.getTemporalDisplayables();
    t.save();
    var o,
      a,
      s = {
        prevElClipPaths: null,
        prevEl: null,
        allClipped: !1,
        viewWidth: n.viewWidth,
        viewHeight: n.viewHeight,
        inHover: n.inHover,
      };
    for (o = e.getCursor(), a = i.length; a > o; o++) {
      var l = i[o];
      l.beforeBrush && l.beforeBrush(),
        l.innerBeforeBrush(),
        pc(t, l, s, o === a - 1),
        l.innerAfterBrush(),
        l.afterBrush && l.afterBrush(),
        (s.prevEl = l);
    }
    for (var u = 0, h = r.length; h > u; u++) {
      var l = r[u];
      l.beforeBrush && l.beforeBrush(),
        l.innerBeforeBrush(),
        pc(t, l, s, u === h - 1),
        l.innerAfterBrush(),
        l.afterBrush && l.afterBrush(),
        (s.prevEl = l);
    }
    e.clearTemporalDisplayables(), (e.notClear = !0), t.restore();
  }
  function dc(t, e) {
    function n(t) {
      function e() {
        for (var t = 1, e = 0, n = y.length; n > e; ++e) t = ar(t, y[e]);
        for (var i = 1, e = 0, n = v.length; n > e; ++e) i = ar(i, v[e].length);
        t *= i;
        var r = m * y.length * v.length;
        return {
          width: Math.max(1, Math.min(t, s.maxTileWidth)),
          height: Math.max(1, Math.min(r, s.maxTileHeight)),
        };
      }
      function n() {
        function t(t, e, n, a, l) {
          var u = o ? 1 : i,
            h = zh(l, t * u, e * u, n * u, a * u, s.color, s.symbolKeepAspect);
          if (o) {
            var c = r.painter.renderOneToVNode(h);
            c && x.children.push(c);
          } else cc(f, h);
        }
        f &&
          (f.clearRect(0, 0, _.width, _.height),
          s.backgroundColor &&
            ((f.fillStyle = s.backgroundColor), f.fillRect(0, 0, _.width, _.height)));
        for (var e = 0, n = 0; n < g.length; ++n) e += g[n];
        if (!(0 >= e))
          for (var a = -m, l = 0, u = 0, h = 0; a < w.height; ) {
            if (l % 2 === 0) {
              for (var c = (u / 2) % v.length, p = 0, y = 0, b = 0; p < 2 * w.width; ) {
                for (var S = 0, n = 0; n < d[h].length; ++n) S += d[h][n];
                if (0 >= S) break;
                if (y % 2 === 0) {
                  var M = 0.5 * (1 - s.symbolSize),
                    T = p + d[h][y] * M,
                    C = a + g[l] * M,
                    k = d[h][y] * s.symbolSize,
                    D = g[l] * s.symbolSize,
                    I = (b / 2) % v[c].length;
                  t(T, C, k, D, v[c][I]);
                }
                (p += d[h][y]), ++b, ++y, y === d[h].length && (y = 0);
              }
              ++h, h === d.length && (h = 0);
            }
            (a += g[l]), ++u, ++l, l === g.length && (l = 0);
          }
      }
      for (var a = [i], l = !0, u = 0; u < OM.length; ++u) {
        var h = s[OM[u]];
        if (null != h && !M(h) && !C(h) && !D(h) && 'boolean' != typeof h) {
          l = !1;
          break;
        }
        a.push(h);
      }
      var c;
      if (l) {
        c = a.join(',') + (o ? '-svg' : '');
        var p = PM.get(c);
        p && (o ? (t.svgElement = p) : (t.image = p));
      }
      var f,
        d = vc(s.dashArrayX),
        g = yc(s.dashArrayY),
        v = gc(s.symbol),
        y = mc(d),
        m = _c(g),
        _ = !o && ov.createCanvas(),
        x = o && { tag: 'g', attrs: {}, key: 'dcl', children: [] },
        w = e();
      _ && ((_.width = w.width * i), (_.height = w.height * i), (f = _.getContext('2d'))),
        n(),
        l && PM.put(c, _ || x),
        (t.image = _),
        (t.svgElement = x),
        (t.svgWidth = w.width),
        (t.svgHeight = w.height);
    }
    if ('none' === t) return null;
    var i = e.getDevicePixelRatio(),
      r = e.getZr(),
      o = 'svg' === r.painter.type;
    t.dirty && LM['delete'](t);
    var a = LM.get(t);
    if (a) return a;
    var s = c(t, {
      symbol: 'rect',
      symbolSize: 1,
      symbolKeepAspect: !0,
      color: 'rgba(0, 0, 0, 0.2)',
      backgroundColor: null,
      dashArrayX: 5,
      dashArrayY: 5,
      rotation: 0,
      maxTileWidth: 512,
      maxTileHeight: 512,
    });
    'none' === s.backgroundColor && (s.backgroundColor = null);
    var l = { repeat: 'repeat' };
    return (
      n(l),
      (l.rotation = s.rotation),
      (l.scaleX = l.scaleY = o ? 1 : 1 / i),
      LM.set(t, l),
      (t.dirty = !1),
      l
    );
  }
  function gc(t) {
    if (!t || 0 === t.length) return [['rect']];
    if (C(t)) return [[t]];
    for (var e = !0, n = 0; n < t.length; ++n)
      if (!C(t[n])) {
        e = !1;
        break;
      }
    if (e) return gc([t]);
    for (var i = [], n = 0; n < t.length; ++n) i.push(C(t[n]) ? [t[n]] : t[n]);
    return i;
  }
  function vc(t) {
    if (!t || 0 === t.length) return [[0, 0]];
    if (D(t)) {
      var e = Math.ceil(t);
      return [[e, e]];
    }
    for (var n = !0, i = 0; i < t.length; ++i)
      if (!D(t[i])) {
        n = !1;
        break;
      }
    if (n) return vc([t]);
    for (var r = [], i = 0; i < t.length; ++i)
      if (D(t[i])) {
        var e = Math.ceil(t[i]);
        r.push([e, e]);
      } else {
        var e = y(t[i], function (t) {
          return Math.ceil(t);
        });
        r.push(e.length % 2 === 1 ? e.concat(e) : e);
      }
    return r;
  }
  function yc(t) {
    if (!t || ('object' == typeof t && 0 === t.length)) return [0, 0];
    if (D(t)) {
      var e = Math.ceil(t);
      return [e, e];
    }
    var n = y(t, function (t) {
      return Math.ceil(t);
    });
    return t.length % 2 ? n.concat(n) : n;
  }
  function mc(t) {
    return y(t, function (t) {
      return _c(t);
    });
  }
  function _c(t) {
    for (var e = 0, n = 0; n < t.length; ++n) e += t[n];
    return t.length % 2 === 1 ? 2 * e : e;
  }
  function xc(t, e) {
    t.eachRawSeries(function (n) {
      if (!t.isSeriesFiltered(n)) {
        var i = n.getData();
        i.hasItemVisual() &&
          i.each(function (t) {
            var n = i.getItemVisual(t, 'decal');
            if (n) {
              var r = i.ensureUniqueItemVisual(t, 'style');
              r.decal = dc(n, e);
            }
          });
        var r = i.getVisual('decal');
        if (r) {
          var o = i.getVisual('style');
          o.decal = dc(r, e);
        }
      }
    });
  }
  function wc(t, e) {
    EM[t] = e;
  }
  function bc(t) {
    return EM[t];
  }
  function Sc(t) {
    return function () {
      for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
      return this.isDisposed() ? void 0 : Tc(this, t, e);
    };
  }
  function Mc(t) {
    return function () {
      for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
      return Tc(this, t, e);
    };
  }
  function Tc(t, e, n) {
    return (n[0] = n[0] && n[0].toLowerCase()), Lv.prototype[e].apply(t, n);
  }
  function Cc(t, e, n) {
    var i = !(n && n.ssr);
    if (i) {
      var r = Ac(t);
      if (r) return r;
    }
    var o = new AT(t, e, n);
    return (
      (o.id = 'ec_' + WT++),
      (VT[o.id] = o),
      i && Pr(t, ZT, o.id),
      kT(o),
      RM.trigger('afterinit', o),
      o
    );
  }
  function kc(t) {
    if (M(t)) {
      var e = t;
      (t = null),
        v(e, function (e) {
          null != e.group && (t = e.group);
        }),
        (t = t || 'g_' + GT++),
        v(e, function (e) {
          e.group = t;
        });
    }
    return (HT[t] = !0), t;
  }
  function Dc(t) {
    HT[t] = !1;
  }
  function Ic(t) {
    C(t) ? (t = VT[t]) : t instanceof AT || (t = Ac(t)),
      t instanceof AT && !t.isDisposed() && t.dispose();
  }
  function Ac(t) {
    return VT[Or(t, ZT)];
  }
  function Lc(t) {
    return VT[t];
  }
  function Pc(t, e) {
    NT[t] = e;
  }
  function Oc(t) {
    p(BT, t) < 0 && BT.push(t);
  }
  function Rc(t, e) {
    Gc(ET, t, e, GM);
  }
  function Ec(t) {
    zc('afterinit', t);
  }
  function Bc(t) {
    zc('afterupdate', t);
  }
  function zc(t, e) {
    RM.on(t, e);
  }
  function Nc(t, e, n) {
    T(e) && ((n = e), (e = ''));
    var i = I(t) ? t.type : [t, (t = { event: e })][0];
    (t.event = (t.event || i).toLowerCase()),
      (e = t.event),
      RT[e] ||
        (W(oT.test(i) && oT.test(e)), OT[i] || (OT[i] = { action: n, actionInfo: t }), (RT[e] = i));
  }
  function Fc(t, e) {
    Jb.register(t, e);
  }
  function Vc(t) {
    var e = Jb.get(t);
    return e ? (e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice()) : void 0;
  }
  function Hc(t, e) {
    Gc(zT, t, e, UM, 'layout');
  }
  function Wc(t, e) {
    Gc(zT, t, e, qM, 'visual');
  }
  function Gc(t, e, n, i, r) {
    if (((T(e) || I(e)) && ((n = e), (e = i)), !(p(XT, n) >= 0))) {
      XT.push(n);
      var o = $S.wrapStageHandler(n, r);
      (o.__prio = e), (o.__raw = n), t.push(o);
    }
  }
  function Zc(t, e) {
    FT[t] = e;
  }
  function Uc(t) {
    r({ createCanvas: t });
  }
  function Xc(t, e, n) {
    var i = bc('registerMap');
    i && i(t, e, n);
  }
  function Yc(t) {
    var e = bc('getMap');
    return e && e(t);
  }
  function qc(t) {
    return null == t ? 0 : t.length || 1;
  }
  function jc(t) {
    return t;
  }
  function Kc(t, e) {
    var n = {},
      i = (n.encode = {}),
      r = X(),
      o = [],
      a = [],
      s = {};
    v(t.dimensions, function (e) {
      var n = t.getDimensionInfo(e),
        l = n.coordDim;
      if (l) {
        var u = n.coordDimIndex;
        ($c(i, l)[u] = e),
          n.isExtraCoord ||
            (r.set(l, 1), Jc(n.type) && (o[0] = e), ($c(s, l)[u] = t.getDimensionIndex(n.name))),
          n.defaultTooltip && a.push(e);
      }
      kb.each(function (t, e) {
        var r = $c(i, e),
          o = n.otherDims[e];
        null != o && o !== !1 && (r[o] = n.name);
      });
    });
    var l = [],
      u = {};
    r.each(function (t, e) {
      var n = i[e];
      (u[e] = n[0]), (l = l.concat(n));
    }),
      (n.dataDimsOnCoord = l),
      (n.dataDimIndicesOnCoord = y(l, function (e) {
        return t.getDimensionInfo(e).storeDimIndex;
      })),
      (n.encodeFirstDimNotExtra = u);
    var h = i.label;
    h && h.length && (o = h.slice());
    var c = i.tooltip;
    return (
      c && c.length ? (a = c.slice()) : a.length || (a = o.slice()),
      (i.defaultedLabel = o),
      (i.defaultedTooltip = a),
      (n.userOutput = new iC(s, e)),
      n
    );
  }
  function $c(t, e) {
    return t.hasOwnProperty(e) || (t[e] = []), t[e];
  }
  function Qc(t) {
    return 'category' === t ? 'ordinal' : 'time' === t ? 'time' : 'float';
  }
  function Jc(t) {
    return !('ordinal' === t || 'time' === t);
  }
  function tp(t) {
    return t instanceof sC;
  }
  function ep(t) {
    for (var e = X(), n = 0; n < (t || []).length; n++) {
      var i = t[n],
        r = I(i) ? i.name : i;
      null != r && null == e.get(r) && e.set(r, n);
    }
    return e;
  }
  function np(t) {
    var e = oC(t);
    return e.dimNameMap || (e.dimNameMap = ep(t.dimensionsDefine));
  }
  function ip(t) {
    return t > 30;
  }
  function rp(t, e) {
    return op(t, e).dimensions;
  }
  function op(t, e) {
    function n(t) {
      var e = m[t];
      if (0 > e) {
        var n = a[t],
          i = I(n) ? n : { name: n },
          r = new rC(),
          o = i.name;
        null != o && null != d.get(o) && (r.name = r.displayName = o),
          null != i.type && (r.type = i.type),
          null != i.displayName && (r.displayName = i.displayName);
        var s = l.length;
        return (m[t] = s), (r.storeDimIndex = t), l.push(r), r;
      }
      return l[e];
    }
    function i(t, e, n) {
      null != kb.get(e)
        ? (t.otherDims[e] = n)
        : ((t.coordDim = e), (t.coordDimIndex = n), s.set(e, !0));
    }
    function r(t) {
      null == t.name && (t.name = t.coordDim);
    }
    mu(t) || (t = xu(t)), (e = e || {});
    var o = e.coordDimensions || [],
      a = e.dimensionsDefine || t.dimensionsDefine || [],
      s = X(),
      l = [],
      u = sp(t, o, a, e.dimensionsCount),
      p = e.canOmitUnusedDimensions && ip(u),
      f = a === t.dimensionsDefine,
      d = f ? np(t) : ep(a),
      g = e.encodeDefine;
    !g && e.encodeDefaulter && (g = e.encodeDefaulter(t, u));
    for (var y = X(g), m = new CS(u), _ = 0; _ < m.length; _++) m[_] = -1;
    if (!p) for (var _ = 0; u > _; _++) n(_);
    y.each(function (t, e) {
      var r = ur(t).slice();
      if (1 === r.length && !C(r[0]) && r[0] < 0) return void y.set(e, !1);
      var o = y.set(e, []);
      v(r, function (t, r) {
        var a = C(t) ? d.get(t) : t;
        null != a && u > a && ((o[r] = a), i(n(a), e, r));
      });
    });
    var x = 0;
    v(o, function (t) {
      var e, r, o, a;
      if (C(t)) (e = t), (a = {});
      else {
        (a = t), (e = a.name);
        var s = a.ordinalMeta;
        (a.ordinalMeta = null),
          (a = h({}, a)),
          (a.ordinalMeta = s),
          (r = a.dimsDef),
          (o = a.otherDims),
          (a.name = a.coordDim = a.coordDimIndex = a.dimsDef = a.otherDims = null);
      }
      var l = y.get(e);
      if (l !== !1) {
        if (((l = ur(l)), !l.length))
          for (var p = 0; p < ((r && r.length) || 1); p++) {
            for (; u > x && null != n(x).coordDim; ) x++;
            u > x && l.push(x++);
          }
        v(l, function (t, s) {
          var l = n(t);
          if ((f && null != a.type && (l.type = a.type), i(c(l, a), e, s), null == l.name && r)) {
            var u = r[s];
            !I(u) && (u = { name: u }),
              (l.name = l.displayName = u.name),
              (l.defaultTooltip = u.defaultTooltip);
          }
          o && c(l.otherDims, o);
        });
      }
    });
    var w = e.generateCoord,
      b = e.generateCoordCount,
      S = null != b;
    b = w ? b || 1 : 0;
    var M = w || 'value';
    if (p)
      v(l, function (t) {
        r(t);
      }),
        l.sort(function (t, e) {
          return t.storeDimIndex - e.storeDimIndex;
        });
    else
      for (var T = 0; u > T; T++) {
        var k = n(T),
          D = k.coordDim;
        null == D &&
          ((k.coordDim = lp(M, s, S)),
          (k.coordDimIndex = 0),
          (!w || 0 >= b) && (k.isExtraCoord = !0),
          b--),
          r(k),
          null != k.type ||
            (zl(t, T) !== Bb.Must &&
              (!k.isExtraCoord ||
                (null == k.otherDims.itemName && null == k.otherDims.seriesName))) ||
            (k.type = 'ordinal');
      }
    return ap(l), new sC({ source: t, dimensions: l, fullDimensionCount: u, dimensionOmitted: p });
  }
  function ap(t) {
    for (var e = X(), n = 0; n < t.length; n++) {
      var i = t[n],
        r = i.name,
        o = e.get(r) || 0;
      o > 0 && (i.name = r + (o - 1)), o++, e.set(r, o);
    }
  }
  function sp(t, e, n, i) {
    var r = Math.max(t.dimensionsDetectedCount || 1, e.length, n.length, i || 0);
    return (
      v(e, function (t) {
        var e;
        I(t) && (e = t.dimsDef) && (r = Math.max(r, e.length));
      }),
      r
    );
  }
  function lp(t, e, n) {
    var i = e.data;
    if (n || i.hasOwnProperty(t)) {
      for (var r = 0; i.hasOwnProperty(t + r); ) r++;
      t += r;
    }
    return e.set(t, !0), t;
  }
  function up(t) {
    var e = t.get('coordinateSystem'),
      n = new vC(e),
      i = yC[e];
    return i ? (i(t, n, n.axisMap, n.categoryAxisMap), n) : void 0;
  }
  function hp(t) {
    return 'category' === t.get('type');
  }
  function cp(t, e, n) {
    n = n || {};
    var i,
      r,
      o,
      a = n.byIndex,
      s = n.stackedCoordDimension;
    pp(e) ? (i = e) : ((r = e.schema), (i = r.dimensions), (o = e.store));
    var l,
      u,
      h,
      c,
      p = !(!t || !t.get('stack'));
    if (
      (v(i, function (t, e) {
        C(t) && (i[e] = t = { name: t }),
          p &&
            !t.isExtraCoord &&
            (a || l || !t.ordinalMeta || (l = t),
            u || 'ordinal' === t.type || 'time' === t.type || (s && s !== t.coordDim) || (u = t));
      }),
      !u || a || l || (a = !0),
      u)
    ) {
      (h = '__\x00ecstackresult_' + t.id),
        (c = '__\x00ecstackedover_' + t.id),
        l && (l.createInvertedIndices = !0);
      var f = u.coordDim,
        d = u.type,
        g = 0;
      v(i, function (t) {
        t.coordDim === f && g++;
      });
      var y = {
          name: h,
          coordDim: f,
          coordDimIndex: g,
          type: d,
          isExtraCoord: !0,
          isCalculationCoord: !0,
          storeDimIndex: i.length,
        },
        m = {
          name: c,
          coordDim: c,
          coordDimIndex: g + 1,
          type: d,
          isExtraCoord: !0,
          isCalculationCoord: !0,
          storeDimIndex: i.length + 1,
        };
      r
        ? (o &&
            ((y.storeDimIndex = o.ensureCalculationDimension(c, d)),
            (m.storeDimIndex = o.ensureCalculationDimension(h, d))),
          r.appendCalculationDimension(y),
          r.appendCalculationDimension(m))
        : (i.push(y), i.push(m));
    }
    return {
      stackedDimension: u && u.name,
      stackedByDimension: l && l.name,
      isStackedByIndex: a,
      stackedOverDimension: c,
      stackResultDimension: h,
    };
  }
  function pp(t) {
    return !tp(t.schema);
  }
  function fp(t, e) {
    return !!e && e === t.getCalculationInfo('stackedDimension');
  }
  function dp(t, e) {
    return fp(t, e) ? t.getCalculationInfo('stackResultDimension') : e;
  }
  function gp(t, e) {
    var n,
      i = t.get('coordinateSystem'),
      r = Jb.get(i);
    return (
      e &&
        e.coordSysDims &&
        (n = y(e.coordSysDims, function (t) {
          var n = { name: t },
            i = e.axisMap.get(t);
          if (i) {
            var r = i.get('type');
            n.type = Qc(r);
          }
          return n;
        })),
      n ||
        (n = (r && (r.getDimensionsInfo ? r.getDimensionsInfo() : r.dimensions.slice())) || [
          'x',
          'y',
        ]),
      n
    );
  }
  function vp(t, e, n) {
    var i, r;
    return (
      n &&
        v(t, function (t, o) {
          var a = t.coordDim,
            s = n.categoryAxisMap.get(a);
          s &&
            (null == i && (i = o),
            (t.ordinalMeta = s.getOrdinalMeta()),
            e && (t.createInvertedIndices = !0)),
            null != t.otherDims.itemName && (r = !0);
        }),
      r || null == i || (t[i].otherDims.itemName = 0),
      i
    );
  }
  function yp(t, e, n) {
    n = n || {};
    var i,
      r = e.getSourceManager(),
      o = !1;
    t ? ((o = !0), (i = xu(t))) : ((i = r.getSource()), (o = i.sourceFormat === Db));
    var a = up(e),
      s = gp(e, a),
      l = n.useEncodeDefaulter,
      u = T(l) ? l : l ? S(Rl, s, e) : null,
      h = {
        coordDimensions: s,
        generateCoord: n.generateCoord,
        encodeDefine: e.getEncode(),
        encodeDefaulter: u,
        canOmitUnusedDimensions: !o,
      },
      c = op(i, h),
      p = vp(c.dimensions, n.createInvertedIndices, a),
      f = o ? null : r.getSharedDataStore(c),
      d = cp(e, { schema: c, store: f }),
      g = new gC(c, e);
    g.setCalculationInfo(d);
    var v =
      null != p && mp(i)
        ? function (t, e, n, i) {
            return i === p ? n : this.defaultDimValueGetter(t, e, n, i);
          }
        : null;
    return (g.hasItemOption = !1), g.initData(o ? i : f, null, v), g;
  }
  function mp(t) {
    if (t.sourceFormat === Db) {
      var e = _p(t.data || []);
      return !M(cr(e));
    }
  }
  function _p(t) {
    for (var e = 0; e < t.length && null == t[e]; ) e++;
    return t[e];
  }
  function xp(t) {
    return I(t) && null != t.value ? t.value : t + '';
  }
  function wp(t) {
    return 'interval' === t.type || 'log' === t.type;
  }
  function bp(t, e, n, i) {
    var r = {},
      o = t[1] - t[0],
      a = (r.interval = Ji(o / e, !0));
    null != n && n > a && (a = r.interval = n), null != i && a > i && (a = r.interval = i);
    var s = (r.intervalPrecision = Mp(a)),
      l = (r.niceTickExtent = [Hi(Math.ceil(t[0] / a) * a, s), Hi(Math.floor(t[1] / a) * a, s)]);
    return Cp(l, t), r;
  }
  function Sp(t) {
    var e = Math.pow(10, Qi(t)),
      n = t / e;
    return n ? (2 === n ? (n = 3) : 3 === n ? (n = 5) : (n *= 2)) : (n = 1), Hi(n * e);
  }
  function Mp(t) {
    return Gi(t) + 2;
  }
  function Tp(t, e, n) {
    t[e] = Math.max(Math.min(t[e], n[1]), n[0]);
  }
  function Cp(t, e) {
    !isFinite(t[0]) && (t[0] = e[0]),
      !isFinite(t[1]) && (t[1] = e[1]),
      Tp(t, 0, e),
      Tp(t, 1, e),
      t[0] > t[1] && (t[0] = t[1]);
  }
  function kp(t, e) {
    return t >= e[0] && t <= e[1];
  }
  function Dp(t, e) {
    return e[1] === e[0] ? 0.5 : (t - e[0]) / (e[1] - e[0]);
  }
  function Ip(t, e) {
    return t * (e[1] - e[0]) + e[0];
  }
  function Ap(t) {
    return M(t) ? (MC ? new Float32Array(t) : t) : new TC(t);
  }
  function Lp(t) {
    return t.get('stack') || CC + t.seriesIndex;
  }
  function Pp(t) {
    return t.dim + t.index;
  }
  function Op(t, e) {
    var n = [];
    return (
      e.eachSeriesByType(t, function (t) {
        Vp(t) && n.push(t);
      }),
      n
    );
  }
  function Rp(t) {
    var e = {};
    v(t, function (t) {
      var n = t.coordinateSystem,
        i = n.getBaseAxis();
      if ('time' === i.type || 'value' === i.type)
        for (
          var r = t.getData(),
            o = i.dim + '_' + i.index,
            a = r.getDimensionIndex(r.mapDimension(i.dim)),
            s = r.getStore(),
            l = 0,
            u = s.count();
          u > l;
          ++l
        ) {
          var h = s.get(a, l);
          e[o] ? e[o].push(h) : (e[o] = [h]);
        }
    });
    var n = {};
    for (var i in e)
      if (e.hasOwnProperty(i)) {
        var r = e[i];
        if (r) {
          r.sort(function (t, e) {
            return t - e;
          });
          for (var o = null, a = 1; a < r.length; ++a) {
            var s = r[a] - r[a - 1];
            s > 0 && (o = null === o ? s : Math.min(o, s));
          }
          n[i] = o;
        }
      }
    return n;
  }
  function Ep(t) {
    var e = Rp(t),
      n = [];
    return (
      v(t, function (t) {
        var i,
          r = t.coordinateSystem,
          o = r.getBaseAxis(),
          a = o.getExtent();
        if ('category' === o.type) i = o.getBandWidth();
        else if ('value' === o.type || 'time' === o.type) {
          var s = o.dim + '_' + o.index,
            l = e[s],
            u = Math.abs(a[1] - a[0]),
            h = o.scale.getExtent(),
            c = Math.abs(h[1] - h[0]);
          i = l ? (u / c) * l : u;
        } else {
          var p = t.getData();
          i = Math.abs(a[1] - a[0]) / p.count();
        }
        var f = Vi(t.get('barWidth'), i),
          d = Vi(t.get('barMaxWidth'), i),
          g = Vi(t.get('barMinWidth') || (Hp(t) ? 0.5 : 1), i),
          v = t.get('barGap'),
          y = t.get('barCategoryGap');
        n.push({
          bandWidth: i,
          barWidth: f,
          barMaxWidth: d,
          barMinWidth: g,
          barGap: v,
          barCategoryGap: y,
          axisKey: Pp(o),
          stackId: Lp(t),
        });
      }),
      Bp(n)
    );
  }
  function Bp(t) {
    var e = {};
    v(t, function (t) {
      var n = t.axisKey,
        i = t.bandWidth,
        r = e[n] || {
          bandWidth: i,
          remainedWidth: i,
          autoWidthCount: 0,
          categoryGap: null,
          gap: '20%',
          stacks: {},
        },
        o = r.stacks;
      e[n] = r;
      var a = t.stackId;
      o[a] || r.autoWidthCount++, (o[a] = o[a] || { width: 0, maxWidth: 0 });
      var s = t.barWidth;
      s &&
        !o[a].width &&
        ((o[a].width = s), (s = Math.min(r.remainedWidth, s)), (r.remainedWidth -= s));
      var l = t.barMaxWidth;
      l && (o[a].maxWidth = l);
      var u = t.barMinWidth;
      u && (o[a].minWidth = u);
      var h = t.barGap;
      null != h && (r.gap = h);
      var c = t.barCategoryGap;
      null != c && (r.categoryGap = c);
    });
    var n = {};
    return (
      v(e, function (t, e) {
        n[e] = {};
        var i = t.stacks,
          r = t.bandWidth,
          o = t.categoryGap;
        if (null == o) {
          var a = w(i).length;
          o = Math.max(35 - 4 * a, 15) + '%';
        }
        var s = Vi(o, r),
          l = Vi(t.gap, 1),
          u = t.remainedWidth,
          h = t.autoWidthCount,
          c = (u - s) / (h + (h - 1) * l);
        (c = Math.max(c, 0)),
          v(i, function (t) {
            var e = t.maxWidth,
              n = t.minWidth;
            if (t.width) {
              var i = t.width;
              e && (i = Math.min(i, e)),
                n && (i = Math.max(i, n)),
                (t.width = i),
                (u -= i + l * i),
                h--;
            } else {
              var i = c;
              e && i > e && (i = Math.min(e, u)),
                n && n > i && (i = n),
                i !== c && ((t.width = i), (u -= i + l * i), h--);
            }
          }),
          (c = (u - s) / (h + (h - 1) * l)),
          (c = Math.max(c, 0));
        var p,
          f = 0;
        v(i, function (t) {
          t.width || (t.width = c), (p = t), (f += t.width * (1 + l));
        }),
          p && (f -= p.width * l);
        var d = -f / 2;
        v(i, function (t, i) {
          (n[e][i] = n[e][i] || { bandWidth: r, offset: d, width: t.width }),
            (d += t.width * (1 + l));
        });
      }),
      n
    );
  }
  function zp(t, e, n) {
    if (t && e) {
      var i = t[Pp(e)];
      return null != i && null != n ? i[Lp(n)] : i;
    }
  }
  function Np(t, e) {
    var n = Op(t, e),
      i = Ep(n);
    v(n, function (t) {
      var e = t.getData(),
        n = t.coordinateSystem,
        r = n.getBaseAxis(),
        o = Lp(t),
        a = i[Pp(r)][o],
        s = a.offset,
        l = a.width;
      e.setLayout({ bandWidth: a.bandWidth, offset: s, size: l });
    });
  }
  function Fp(t) {
    return {
      seriesType: t,
      plan: hh(),
      reset: function (t) {
        if (Vp(t)) {
          var e = t.getData(),
            n = t.coordinateSystem,
            i = n.getBaseAxis(),
            r = n.getOtherAxis(i),
            o = e.getDimensionIndex(e.mapDimension(r.dim)),
            a = e.getDimensionIndex(e.mapDimension(i.dim)),
            s = t.get('showBackground', !0),
            l = e.mapDimension(r.dim),
            u = e.getCalculationInfo('stackResultDimension'),
            h = fp(e, l) && !!e.getCalculationInfo('stackedOnSeries'),
            c = r.isHorizontal(),
            p = Wp(i, r),
            f = Hp(t),
            d = t.get('barMinHeight') || 0,
            g = u && e.getDimensionIndex(u),
            v = e.getLayout('size'),
            y = e.getLayout('offset');
          return {
            progress: function (t, e) {
              for (
                var i,
                  r = t.count,
                  l = f && Ap(3 * r),
                  u = f && s && Ap(3 * r),
                  m = f && Ap(r),
                  _ = n.master.getRect(),
                  x = c ? _.width : _.height,
                  w = e.getStore(),
                  b = 0;
                null != (i = t.next());

              ) {
                var S = w.get(h ? g : o, i),
                  M = w.get(a, i),
                  T = p,
                  C = void 0;
                h && (C = +S - w.get(o, i));
                var k = void 0,
                  D = void 0,
                  I = void 0,
                  A = void 0;
                if (c) {
                  var L = n.dataToPoint([S, M]);
                  if (h) {
                    var P = n.dataToPoint([C, M]);
                    T = P[0];
                  }
                  (k = T),
                    (D = L[1] + y),
                    (I = L[0] - T),
                    (A = v),
                    Math.abs(I) < d && (I = (0 > I ? -1 : 1) * d);
                } else {
                  var L = n.dataToPoint([M, S]);
                  if (h) {
                    var P = n.dataToPoint([M, C]);
                    T = P[1];
                  }
                  (k = L[0] + y),
                    (D = T),
                    (I = v),
                    (A = L[1] - T),
                    Math.abs(A) < d && (A = (0 >= A ? -1 : 1) * d);
                }
                f
                  ? ((l[b] = k),
                    (l[b + 1] = D),
                    (l[b + 2] = c ? I : A),
                    u && ((u[b] = c ? _.x : k), (u[b + 1] = c ? D : _.y), (u[b + 2] = x)),
                    (m[i] = i))
                  : e.setItemLayout(i, { x: k, y: D, width: I, height: A }),
                  (b += 3);
              }
              f &&
                e.setLayout({
                  largePoints: l,
                  largeDataIndices: m,
                  largeBackgroundPoints: u,
                  valueAxisHorizontal: c,
                });
            },
          };
        }
      },
    };
  }
  function Vp(t) {
    return t.coordinateSystem && 'cartesian2d' === t.coordinateSystem.type;
  }
  function Hp(t) {
    return t.pipelineContext && t.pipelineContext.large;
  }
  function Wp(t, e) {
    return e.toGlobalCoord(e.dataToCoord('log' === e.type ? 1 : 0));
  }
  function Gp(t, e, n, i) {
    var r = Ki(e),
      o = Ki(n),
      a = function (t) {
        return nl(r, t, i) === nl(o, t, i);
      },
      s = function () {
        return a('year');
      },
      l = function () {
        return s() && a('month');
      },
      u = function () {
        return l() && a('day');
      },
      h = function () {
        return u() && a('hour');
      },
      c = function () {
        return h() && a('minute');
      },
      p = function () {
        return c() && a('second');
      },
      f = function () {
        return p() && a('millisecond');
      };
    switch (t) {
      case 'year':
        return s();
      case 'month':
        return l();
      case 'day':
        return u();
      case 'hour':
        return h();
      case 'minute':
        return c();
      case 'second':
        return p();
      case 'millisecond':
        return f();
    }
  }
  function Zp(t) {
    return (t /= ob), t > 16 ? 16 : t > 7.5 ? 7 : t > 3.5 ? 4 : t > 1.5 ? 2 : 1;
  }
  function Up(t) {
    var e = 30 * ob;
    return (t /= e), t > 6 ? 6 : t > 3 ? 3 : t > 2 ? 2 : 1;
  }
  function Xp(t) {
    return (t /= rb), t > 12 ? 12 : t > 6 ? 6 : t > 3.5 ? 4 : t > 2 ? 2 : 1;
  }
  function Yp(t, e) {
    return (
      (t /= e ? ib : nb),
      t > 30 ? 30 : t > 20 ? 20 : t > 15 ? 15 : t > 10 ? 10 : t > 5 ? 5 : t > 2 ? 2 : 1
    );
  }
  function qp(t) {
    return Ji(t, !0);
  }
  function jp(t, e, n) {
    var i = new Date(t);
    switch (Ks(e)) {
      case 'year':
      case 'month':
        i[cl(n)](0);
      case 'day':
        i[pl(n)](1);
      case 'hour':
        i[fl(n)](0);
      case 'minute':
        i[dl(n)](0);
      case 'second':
        i[gl(n)](0), i[vl(n)](0);
    }
    return i.getTime();
  }
  function Kp(t, e, n, i) {
    function r(t, e, n, r, o, a, s) {
      for (var l = new Date(e), u = e, h = l[r](); n > u && u <= i[1]; )
        s.push({ value: u }), (h += t), l[o](h), (u = l.getTime());
      s.push({ value: u, notAdd: !0 });
    }
    function o(t, o, a) {
      var s = [],
        l = !o.length;
      if (!Gp(Ks(t), i[0], i[1], n)) {
        l && (o = [{ value: jp(new Date(i[0]), t, n) }, { value: i[1] }]);
        for (var u = 0; u < o.length - 1; u++) {
          var h = o[u].value,
            c = o[u + 1].value;
          if (h !== c) {
            var p = void 0,
              f = void 0,
              d = void 0,
              g = !1;
            switch (t) {
              case 'year':
                (p = Math.max(1, Math.round(e / ob / 365))), (f = il(n)), (d = hl(n));
                break;
              case 'half-year':
              case 'quarter':
              case 'month':
                (p = Up(e)), (f = rl(n)), (d = cl(n));
                break;
              case 'week':
              case 'half-week':
              case 'day':
                (p = Zp(e, 31)), (f = ol(n)), (d = pl(n)), (g = !0);
                break;
              case 'half-day':
              case 'quarter-day':
              case 'hour':
                (p = Xp(e)), (f = al(n)), (d = fl(n));
                break;
              case 'minute':
                (p = Yp(e, !0)), (f = sl(n)), (d = dl(n));
                break;
              case 'second':
                (p = Yp(e, !1)), (f = ll(n)), (d = gl(n));
                break;
              case 'millisecond':
                (p = qp(e)), (f = ul(n)), (d = vl(n));
            }
            r(p, h, c, f, d, g, s),
              'year' === t && a.length > 1 && 0 === u && a.unshift({ value: a[0].value - p });
          }
        }
        for (var u = 0; u < s.length; u++) a.push(s[u]);
        return s;
      }
    }
    for (
      var a = 1e4, s = cb, l = 0, u = [], h = [], c = 0, p = 0, f = 0;
      f < s.length && l++ < a;
      ++f
    ) {
      var d = Ks(s[f]);
      if ($s(s[f])) {
        o(s[f], u[u.length - 1] || [], h);
        var g = s[f + 1] ? Ks(s[f + 1]) : null;
        if (d !== g) {
          if (h.length) {
            (p = c),
              h.sort(function (t, e) {
                return t.value - e.value;
              });
            for (var v = [], m = 0; m < h.length; ++m) {
              var x = h[m].value;
              (0 === m || h[m - 1].value !== x) && (v.push(h[m]), x >= i[0] && x <= i[1] && c++);
            }
            var w = (i[1] - i[0]) / e;
            if (c > 1.5 * w && p > w / 1.5) break;
            if ((u.push(v), c > w || t === s[f])) break;
          }
          h = [];
        }
      }
    }
    for (
      var b = _(
          y(u, function (t) {
            return _(t, function (t) {
              return t.value >= i[0] && t.value <= i[1] && !t.notAdd;
            });
          }),
          function (t) {
            return t.length > 0;
          }
        ),
        S = [],
        M = b.length - 1,
        f = 0;
      f < b.length;
      ++f
    )
      for (var T = b[f], C = 0; C < T.length; ++C) S.push({ value: T[C].value, level: M - f });
    S.sort(function (t, e) {
      return t.value - e.value;
    });
    for (var k = [], f = 0; f < S.length; ++f)
      (0 === f || S[f].value !== S[f - 1].value) && k.push(S[f]);
    return k;
  }
  function $p(t, e) {
    return PC(t, Gi(e));
  }
  function Qp(t, e, n) {
    var i = t.rawExtentInfo;
    return i ? i : ((i = new FC(t, e, n)), (t.rawExtentInfo = i), i);
  }
  function Jp(t, e) {
    return null == e ? null : B(e) ? 0 / 0 : t.parse(e);
  }
  function tf(t, e) {
    var n = t.type,
      i = Qp(t, e, t.getExtent()).calculate();
    t.setBlank(i.isBlank);
    var r = i.min,
      o = i.max,
      a = e.ecModel;
    if (a && 'time' === n) {
      var s = Op('bar', a),
        l = !1;
      if (
        (v(s, function (t) {
          l = l || t.getBaseAxis() === e.axis;
        }),
        l)
      ) {
        var u = Ep(s),
          h = ef(r, o, e, u);
        (r = h.min), (o = h.max);
      }
    }
    return { extent: [r, o], fixMin: i.minFixed, fixMax: i.maxFixed };
  }
  function ef(t, e, n, i) {
    var r = n.axis.getExtent(),
      o = r[1] - r[0],
      a = zp(i, n.axis);
    if (void 0 === a) return { min: t, max: e };
    var s = 1 / 0;
    v(a, function (t) {
      s = Math.min(t.offset, s);
    });
    var l = -1 / 0;
    v(a, function (t) {
      l = Math.max(t.offset + t.width, l);
    }),
      (s = Math.abs(s)),
      (l = Math.abs(l));
    var u = s + l,
      h = e - t,
      c = 1 - (s + l) / o,
      p = h / c - h;
    return (e += p * (l / u)), (t -= p * (s / u)), { min: t, max: e };
  }
  function nf(t, e) {
    var n = e,
      i = tf(t, n),
      r = i.extent,
      o = n.get('splitNumber');
    t instanceof zC && (t.base = n.get('logBase'));
    var a = t.type,
      s = n.get('interval'),
      l = 'interval' === a || 'time' === a;
    t.setExtent(r[0], r[1]),
      t.calcNiceExtent({
        splitNumber: o,
        fixMin: i.fixMin,
        fixMax: i.fixMax,
        minInterval: l ? n.get('minInterval') : null,
        maxInterval: l ? n.get('maxInterval') : null,
      }),
      null != s && t.setInterval && t.setInterval(s);
  }
  function rf(t, e) {
    if ((e = e || t.get('type')))
      switch (e) {
        case 'category':
          return new wC({
            ordinalMeta: t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(),
            extent: [1 / 0, -1 / 0],
          });
        case 'time':
          return new DC({ locale: t.ecModel.getLocaleModel(), useUTC: t.ecModel.get('useUTC') });
        default:
          return new (mC.getClass(e) || SC)();
      }
  }
  function of(t) {
    var e = t.scale.getExtent(),
      n = e[0],
      i = e[1];
    return !((n > 0 && i > 0) || (0 > n && 0 > i));
  }
  function af(t) {
    var e = t.getLabelModel().get('formatter'),
      n = 'category' === t.type ? t.scale.getExtent()[0] : null;
    return 'time' === t.scale.type
      ? (function (e) {
          return function (n, i) {
            return t.scale.getFormattedLabel(n, i, e);
          };
        })(e)
      : C(e)
      ? (function (e) {
          return function (n) {
            var i = t.scale.getLabel(n),
              r = e.replace('{value}', null != i ? i : '');
            return r;
          };
        })(e)
      : T(e)
      ? (function (e) {
          return function (i, r) {
            return (
              null != n && (r = i.value - n),
              e(sf(t, i), r, null != i.level ? { level: i.level } : null)
            );
          };
        })(e)
      : function (e) {
          return t.scale.getLabel(e);
        };
  }
  function sf(t, e) {
    return 'category' === t.type ? t.scale.getLabel(e) : e.value;
  }
  function lf(t) {
    var e = t.model,
      n = t.scale;
    if (e.get(['axisLabel', 'show']) && !n.isBlank()) {
      var i,
        r,
        o = n.getExtent();
      n instanceof wC ? (r = n.count()) : ((i = n.getTicks()), (r = i.length));
      var a,
        s = t.getLabelModel(),
        l = af(t),
        u = 1;
      r > 40 && (u = Math.ceil(r / 40));
      for (var h = 0; r > h; h += u) {
        var c = i ? i[h] : { value: o[0] + h },
          p = l(c, h),
          f = s.getTextRect(p),
          d = uf(f, s.get('rotate') || 0);
        a ? a.union(d) : (a = d);
      }
      return a;
    }
  }
  function uf(t, e) {
    var n = (e * Math.PI) / 180,
      i = t.width,
      r = t.height,
      o = i * Math.abs(Math.cos(n)) + Math.abs(r * Math.sin(n)),
      a = i * Math.abs(Math.sin(n)) + Math.abs(r * Math.cos(n)),
      s = new fm(t.x, t.y, o, a);
    return s;
  }
  function hf(t) {
    var e = t.get('interval');
    return null == e ? 'auto' : e;
  }
  function cf(t) {
    return 'category' === t.type && 0 === hf(t.getLabelModel());
  }
  function pf(t, e) {
    var n = {};
    return (
      v(t.mapDimensionsAll(e), function (e) {
        n[dp(t, e)] = !0;
      }),
      w(n)
    );
  }
  function ff(t, e, n) {
    e &&
      v(pf(e, n), function (n) {
        var i = e.getApproximateExtent(n);
        i[0] < t[0] && (t[0] = i[0]), i[1] > t[1] && (t[1] = i[1]);
      });
  }
  function df(t) {
    return yp(null, t);
  }
  function gf(t, e) {
    var n = e;
    e instanceof Xw || (n = new Xw(e));
    var i = rf(n);
    return i.setExtent(t[0], t[1]), nf(i, n), i;
  }
  function vf(t) {
    d(t, WC);
  }
  function yf(t, e) {
    return (e = e || {}), Os(t, null, null, 'normal' !== e.state);
  }
  function mf(t) {
    return M(t)
      ? void v(t, function (t) {
          mf(t);
        })
      : void (p(UC, t) >= 0 || (UC.push(t), T(t) && (t = { install: t }), t.install(XC)));
  }
  function _f(t, e) {
    return Math.abs(t - e) < YC;
  }
  function xf(t, e, n) {
    var i = 0,
      r = t[0];
    if (!r) return !1;
    for (var o = 1; o < t.length; o++) {
      var a = t[o];
      (i += _o(r[0], r[1], a[0], a[1], e, n)), (r = a);
    }
    var s = t[0];
    return (_f(r[0], s[0]) && _f(r[1], s[1])) || (i += _o(r[0], r[1], s[0], s[1], e, n)), 0 !== i;
  }
  function wf(t, e) {
    for (var n = 0; n < t.length; n++) ve(t[n], t[n], e);
  }
  function bf(t, e, n, i) {
    for (var r = 0; r < t.length; r++) {
      var o = t[r];
      i && (o = i.project(o)), o && isFinite(o[0]) && isFinite(o[1]) && (ye(e, e, o), me(n, n, o));
    }
  }
  function Sf(t) {
    for (
      var e = 0, n = 0, i = 0, r = t.length, o = t[r - 1][0], a = t[r - 1][1], s = 0;
      r > s;
      s++
    ) {
      var l = t[s][0],
        u = t[s][1],
        h = o * u - l * a;
      (e += h), (n += (o + l) * h), (i += (a + u) * h), (o = l), (a = u);
    }
    return e ? [n / e / 3, i / e / 3, e] : [t[0][0] || 0, t[0][1] || 0];
  }
  function Mf(t) {
    if (!t.UTF8Encoding) return t;
    var e = t,
      n = e.UTF8Scale;
    null == n && (n = 1024);
    var i = e.features;
    return (
      v(i, function (t) {
        var e = t.geometry,
          i = e.encodeOffsets,
          r = e.coordinates;
        if (i)
          switch (e.type) {
            case 'LineString':
              e.coordinates = Cf(r, i, n);
              break;
            case 'Polygon':
              Tf(r, i, n);
              break;
            case 'MultiLineString':
              Tf(r, i, n);
              break;
            case 'MultiPolygon':
              v(r, function (t, e) {
                return Tf(t, i[e], n);
              });
          }
      }),
      (e.UTF8Encoding = !1),
      e
    );
  }
  function Tf(t, e, n) {
    for (var i = 0; i < t.length; i++) t[i] = Cf(t[i], e[i], n);
  }
  function Cf(t, e, n) {
    for (var i = [], r = e[0], o = e[1], a = 0; a < t.length; a += 2) {
      var s = t.charCodeAt(a) - 64,
        l = t.charCodeAt(a + 1) - 64;
      (s = (s >> 1) ^ -(1 & s)),
        (l = (l >> 1) ^ -(1 & l)),
        (s += r),
        (l += o),
        (r = s),
        (o = l),
        i.push([s / n, l / n]);
    }
    return i;
  }
  function kf(t, e) {
    return (
      (t = Mf(t)),
      y(
        _(t.features, function (t) {
          return t.geometry && t.properties && t.geometry.coordinates.length > 0;
        }),
        function (t) {
          var n = t.properties,
            i = t.geometry,
            r = [];
          switch (i.type) {
            case 'Polygon':
              var o = i.coordinates;
              r.push(new KC(o[0], o.slice(1)));
              break;
            case 'MultiPolygon':
              v(i.coordinates, function (t) {
                t[0] && r.push(new KC(t[0], t.slice(1)));
              });
              break;
            case 'LineString':
              r.push(new $C([i.coordinates]));
              break;
            case 'MultiLineString':
              r.push(new $C(i.coordinates));
          }
          var a = new QC(n[e || 'name'], r, n.cp);
          return (a.properties = n), a;
        }
      )
    );
  }
  function Df(t) {
    return 'category' === t.type ? Af(t) : Of(t);
  }
  function If(t, e) {
    return 'category' === t.type
      ? Pf(t, e)
      : {
          ticks: y(t.scale.getTicks(), function (t) {
            return t.value;
          }),
        };
  }
  function Af(t) {
    var e = t.getLabelModel(),
      n = Lf(t, e);
    return !e.get('show') || t.scale.isBlank()
      ? { labels: [], labelCategoryInterval: n.labelCategoryInterval }
      : n;
  }
  function Lf(t, e) {
    var n = Rf(t, 'labels'),
      i = hf(e),
      r = Ef(n, i);
    if (r) return r;
    var o, a;
    return (
      T(i) ? (o = Hf(t, i)) : ((a = 'auto' === i ? zf(t) : i), (o = Vf(t, a))),
      Bf(n, i, { labels: o, labelCategoryInterval: a })
    );
  }
  function Pf(t, e) {
    var n = Rf(t, 'ticks'),
      i = hf(e),
      r = Ef(n, i);
    if (r) return r;
    var o, a;
    if (((!e.get('show') || t.scale.isBlank()) && (o = []), T(i))) o = Hf(t, i, !0);
    else if ('auto' === i) {
      var s = Lf(t, t.getLabelModel());
      (a = s.labelCategoryInterval),
        (o = y(s.labels, function (t) {
          return t.tickValue;
        }));
    } else (a = i), (o = Vf(t, a, !0));
    return Bf(n, i, { ticks: o, tickCategoryInterval: a });
  }
  function Of(t) {
    var e = t.scale.getTicks(),
      n = af(t);
    return {
      labels: y(e, function (e, i) {
        return {
          level: e.level,
          formattedLabel: n(e, i),
          rawLabel: t.scale.getLabel(e),
          tickValue: e.value,
        };
      }),
    };
  }
  function Rf(t, e) {
    return rk(t)[e] || (rk(t)[e] = []);
  }
  function Ef(t, e) {
    for (var n = 0; n < t.length; n++) if (t[n].key === e) return t[n].value;
  }
  function Bf(t, e, n) {
    return t.push({ key: e, value: n }), n;
  }
  function zf(t) {
    var e = rk(t).autoInterval;
    return null != e ? e : (rk(t).autoInterval = t.calculateCategoryInterval());
  }
  function Nf(t) {
    var e = Ff(t),
      n = af(t),
      i = ((e.axisRotate - e.labelRotate) / 180) * Math.PI,
      r = t.scale,
      o = r.getExtent(),
      a = r.count();
    if (o[1] - o[0] < 1) return 0;
    var s = 1;
    a > 40 && (s = Math.max(1, Math.floor(a / 40)));
    for (
      var l = o[0],
        u = t.dataToCoord(l + 1) - t.dataToCoord(l),
        h = Math.abs(u * Math.cos(i)),
        c = Math.abs(u * Math.sin(i)),
        p = 0,
        f = 0;
      l <= o[1];
      l += s
    ) {
      var d = 0,
        g = 0,
        v = mi(n({ value: l }), e.font, 'center', 'top');
      (d = 1.3 * v.width), (g = 1.3 * v.height), (p = Math.max(p, d, 7)), (f = Math.max(f, g, 7));
    }
    var y = p / h,
      m = f / c;
    isNaN(y) && (y = 1 / 0), isNaN(m) && (m = 1 / 0);
    var _ = Math.max(0, Math.floor(Math.min(y, m))),
      x = rk(t.model),
      w = t.getExtent(),
      b = x.lastAutoInterval,
      S = x.lastTickCount;
    return (
      null != b &&
      null != S &&
      Math.abs(b - _) <= 1 &&
      Math.abs(S - a) <= 1 &&
      b > _ &&
      x.axisExtent0 === w[0] &&
      x.axisExtent1 === w[1]
        ? (_ = b)
        : ((x.lastTickCount = a),
          (x.lastAutoInterval = _),
          (x.axisExtent0 = w[0]),
          (x.axisExtent1 = w[1])),
      _
    );
  }
  function Ff(t) {
    var e = t.getLabelModel();
    return {
      axisRotate: t.getRotate ? t.getRotate() : t.isHorizontal && !t.isHorizontal() ? 90 : 0,
      labelRotate: e.get('rotate') || 0,
      font: e.getFont(),
    };
  }
  function Vf(t, e, n) {
    function i(t) {
      var e = { value: t };
      l.push(n ? t : { formattedLabel: r(e), rawLabel: o.getLabel(e), tickValue: t });
    }
    var r = af(t),
      o = t.scale,
      a = o.getExtent(),
      s = t.getLabelModel(),
      l = [],
      u = Math.max((e || 0) + 1, 1),
      h = a[0],
      c = o.count();
    0 !== h && u > 1 && c / u > 2 && (h = Math.round(Math.ceil(h / u) * u));
    var p = cf(t),
      f = s.get('showMinLabel') || p,
      d = s.get('showMaxLabel') || p;
    f && h !== a[0] && i(a[0]);
    for (var g = h; g <= a[1]; g += u) i(g);
    return d && g - u !== a[1] && i(a[1]), l;
  }
  function Hf(t, e, n) {
    var i = t.scale,
      r = af(t),
      o = [];
    return (
      v(i.getTicks(), function (t) {
        var a = i.getLabel(t),
          s = t.value;
        e(t.value, a) && o.push(n ? s : { formattedLabel: r(t), rawLabel: a, tickValue: s });
      }),
      o
    );
  }
  function Wf(t, e) {
    var n = t[1] - t[0],
      i = e,
      r = n / i / 2;
    (t[0] += r), (t[1] -= r);
  }
  function Gf(t, e, n, i) {
    function r(t, e) {
      return (t = Hi(t)), (e = Hi(e)), p ? t > e : e > t;
    }
    var o = e.length;
    if (t.onBand && !n && o) {
      var a,
        s,
        l = t.getExtent();
      if (1 === o) (e[0].coord = l[0]), (a = e[1] = { coord: l[0] });
      else {
        var u = e[o - 1].tickValue - e[0].tickValue,
          h = (e[o - 1].coord - e[0].coord) / u;
        v(e, function (t) {
          t.coord -= h / 2;
        });
        var c = t.scale.getExtent();
        (s = 1 + c[1] - e[o - 1].tickValue), (a = { coord: e[o - 1].coord + h * s }), e.push(a);
      }
      var p = l[0] > l[1];
      r(e[0].coord, l[0]) && (i ? (e[0].coord = l[0]) : e.shift()),
        i && r(l[0], e[0].coord) && e.unshift({ coord: l[0] }),
        r(l[1], a.coord) && (i ? (a.coord = l[1]) : e.pop()),
        i && r(a.coord, l[1]) && e.push({ coord: l[1] });
    }
  }
  function Zf(t) {
    var e = wb.extend(t);
    return wb.registerClass(e), e;
  }
  function Uf(t) {
    var e = RS.extend(t);
    return RS.registerClass(e), e;
  }
  function Xf(t) {
    var e = OS.extend(t);
    return OS.registerClass(e), e;
  }
  function Yf(t) {
    var e = zS.extend(t);
    return zS.registerClass(e), e;
  }
  function qf(t, e, n, i, r) {
    var o = n.width,
      a = n.height;
    switch (t) {
      case 'top':
        i.set(n.x + o / 2, n.y - e), r.set(0, -1);
        break;
      case 'bottom':
        i.set(n.x + o / 2, n.y + a + e), r.set(0, 1);
        break;
      case 'left':
        i.set(n.x - e, n.y + a / 2), r.set(-1, 0);
        break;
      case 'right':
        i.set(n.x + o + e, n.y + a / 2), r.set(1, 0);
    }
  }
  function jf(t, e, n, i, r, o, a, s, l) {
    (a -= t), (s -= e);
    var u = Math.sqrt(a * a + s * s);
    (a /= u), (s /= u);
    var h = a * n + t,
      c = s * n + e;
    if (Math.abs(i - r) % sk < 1e-4) return (l[0] = h), (l[1] = c), u - n;
    if (o) {
      var p = i;
      (i = yo(r)), (r = yo(p));
    } else (i = yo(i)), (r = yo(r));
    i > r && (r += sk);
    var f = Math.atan2(s, a);
    if ((0 > f && (f += sk), (f >= i && r >= f) || (f + sk >= i && r >= f + sk)))
      return (l[0] = h), (l[1] = c), u - n;
    var d = n * Math.cos(i) + t,
      g = n * Math.sin(i) + e,
      v = n * Math.cos(r) + t,
      y = n * Math.sin(r) + e,
      m = (d - a) * (d - a) + (g - s) * (g - s),
      _ = (v - a) * (v - a) + (y - s) * (y - s);
    return _ > m ? ((l[0] = d), (l[1] = g), Math.sqrt(m)) : ((l[0] = v), (l[1] = y), Math.sqrt(_));
  }
  function Kf(t, e, n, i, r, o, a, s) {
    var l = r - t,
      u = o - e,
      h = n - t,
      c = i - e,
      p = Math.sqrt(h * h + c * c);
    (h /= p), (c /= p);
    var f = l * h + u * c,
      d = f / p;
    s && (d = Math.min(Math.max(d, 0), 1)), (d *= p);
    var g = (a[0] = t + d * h),
      v = (a[1] = e + d * c);
    return Math.sqrt((g - r) * (g - r) + (v - o) * (v - o));
  }
  function $f(t, e, n, i, r, o, a) {
    0 > n && ((t += n), (n = -n)), 0 > i && ((e += i), (i = -i));
    var s = t + n,
      l = e + i,
      u = (a[0] = Math.min(Math.max(r, t), s)),
      h = (a[1] = Math.min(Math.max(o, e), l));
    return Math.sqrt((u - r) * (u - r) + (h - o) * (h - o));
  }
  function Qf(t, e, n) {
    var i = $f(e.x, e.y, e.width, e.height, t.x, t.y, hk);
    return n.set(hk[0], hk[1]), i;
  }
  function Jf(t, e, n) {
    for (
      var i, r, o = 0, a = 0, s = 0, l = 0, u = 1 / 0, h = e.data, c = t.x, p = t.y, f = 0;
      f < h.length;

    ) {
      var d = h[f++];
      1 === f && ((o = h[f]), (a = h[f + 1]), (s = o), (l = a));
      var g = u;
      switch (d) {
        case lk.M:
          (s = h[f++]), (l = h[f++]), (o = s), (a = l);
          break;
        case lk.L:
          (g = Kf(o, a, h[f], h[f + 1], c, p, hk, !0)), (o = h[f++]), (a = h[f++]);
          break;
        case lk.C:
          (g = nn(o, a, h[f++], h[f++], h[f++], h[f++], h[f], h[f + 1], c, p, hk)),
            (o = h[f++]),
            (a = h[f++]);
          break;
        case lk.Q:
          (g = hn(o, a, h[f++], h[f++], h[f], h[f + 1], c, p, hk)), (o = h[f++]), (a = h[f++]);
          break;
        case lk.A:
          var v = h[f++],
            y = h[f++],
            m = h[f++],
            _ = h[f++],
            x = h[f++],
            w = h[f++];
          f += 1;
          var b = !!(1 - h[f++]);
          (i = Math.cos(x) * m + v), (r = Math.sin(x) * _ + y), 1 >= f && ((s = i), (l = r));
          var S = ((c - v) * _) / m + v;
          (g = jf(v, y, _, x, x + w, b, S, p, hk)),
            (o = Math.cos(x + w) * m + v),
            (a = Math.sin(x + w) * _ + y);
          break;
        case lk.R:
          (s = o = h[f++]), (l = a = h[f++]);
          var M = h[f++],
            T = h[f++];
          g = $f(s, l, M, T, c, p, hk);
          break;
        case lk.Z:
          (g = Kf(o, a, s, l, c, p, hk, !0)), (o = s), (a = l);
      }
      u > g && ((u = g), n.set(hk[0], hk[1]));
    }
    return u;
  }
  function td(t, e) {
    if (t) {
      var n = t.getTextGuideLine(),
        i = t.getTextContent();
      if (i && n) {
        var r = t.textGuideLineConfig || {},
          o = [
            [0, 0],
            [0, 0],
            [0, 0],
          ],
          a = r.candidates || uk,
          s = i.getBoundingRect().clone();
        s.applyTransform(i.getComputedTransform());
        var l = 1 / 0,
          u = r.anchor,
          h = t.getComputedTransform(),
          c = h && pi([], h),
          p = e.get('length2') || 0;
        u && fk.copy(u);
        for (var f = 0; f < a.length; f++) {
          var d = a[f];
          qf(d, 0, s, ck, dk), rm.scaleAndAdd(pk, ck, dk, p), pk.transform(c);
          var g = t.getBoundingRect(),
            v = u ? u.distance(pk) : t instanceof H_ ? Jf(pk, t.path, fk) : Qf(pk, g, fk);
          l > v &&
            ((l = v),
            pk.transform(h),
            fk.transform(h),
            fk.toArray(o[0]),
            pk.toArray(o[1]),
            ck.toArray(o[2]));
        }
        ed(o, e.get('minTurnAngle')), n.setShape({ points: o });
      }
    }
  }
  function ed(t, e) {
    if (180 >= e && e > 0) {
      (e = (e / 180) * Math.PI),
        ck.fromArray(t[0]),
        pk.fromArray(t[1]),
        fk.fromArray(t[2]),
        rm.sub(dk, ck, pk),
        rm.sub(gk, fk, pk);
      var n = dk.len(),
        i = gk.len();
      if (!(0.001 > n || 0.001 > i)) {
        dk.scale(1 / n), gk.scale(1 / i);
        var r = dk.dot(gk),
          o = Math.cos(e);
        if (r > o) {
          var a = Kf(pk.x, pk.y, fk.x, fk.y, ck.x, ck.y, vk, !1);
          yk.fromArray(vk), yk.scaleAndAdd(gk, a / Math.tan(Math.PI - e));
          var s = fk.x !== pk.x ? (yk.x - pk.x) / (fk.x - pk.x) : (yk.y - pk.y) / (fk.y - pk.y);
          if (isNaN(s)) return;
          0 > s ? rm.copy(yk, pk) : s > 1 && rm.copy(yk, fk), yk.toArray(t[1]);
        }
      }
    }
  }
  function nd(t, e, n, i) {
    var r = 'normal' === n,
      o = r ? t : t.ensureState(n);
    o.ignore = e;
    var a = i.get('smooth');
    a && a === !0 && (a = 0.3), (o.shape = o.shape || {}), a > 0 && (o.shape.smooth = a);
    var s = i.getModel('lineStyle').getLineStyle();
    r ? t.useStyle(s) : (o.style = s);
  }
  function id(t, e) {
    var n = e.smooth,
      i = e.points;
    if (i)
      if ((t.moveTo(i[0][0], i[0][1]), n > 0 && i.length >= 3)) {
        var r = Cv(i[0], i[1]),
          o = Cv(i[1], i[2]);
        if (!r || !o) return t.lineTo(i[1][0], i[1][1]), void t.lineTo(i[2][0], i[2][1]);
        var a = Math.min(r, o) * n,
          s = ge([], i[1], i[0], a / r),
          l = ge([], i[1], i[2], a / o),
          u = ge([], s, l, 0.5);
        t.bezierCurveTo(s[0], s[1], s[0], s[1], u[0], u[1]),
          t.bezierCurveTo(l[0], l[1], l[0], l[1], i[2][0], i[2][1]);
      } else for (var h = 1; h < i.length; h++) t.lineTo(i[h][0], i[h][1]);
  }
  function rd(t, e, n) {
    var i = t.getTextGuideLine(),
      r = t.getTextContent();
    if (!r) return void (i && t.removeTextGuideLine());
    for (var o = e.normal, a = o.get('show'), s = r.ignore, l = 0; l < dx.length; l++) {
      var u = dx[l],
        h = e[u],
        p = 'normal' === u;
      if (h) {
        var f = h.get('show'),
          d = p ? s : N(r.states[u] && r.states[u].ignore, s);
        if (d || !N(f, a)) {
          var g = p ? i : i && i.states[u];
          g && (g.ignore = !0);
          continue;
        }
        i ||
          ((i = new ow()),
          t.setTextGuideLine(i),
          p || (!s && a) || nd(i, !0, 'normal', e.normal),
          t.stateProxy && (i.stateProxy = t.stateProxy)),
          nd(i, !1, u, h);
      }
    }
    if (i) {
      c(i.style, n), (i.style.fill = null);
      var v = o.get('showAbove'),
        y = (t.textGuideLineConfig = t.textGuideLineConfig || {});
      (y.showAbove = v || !1), (i.buildPath = id);
    }
  }
  function od(t, e) {
    e = e || 'labelLine';
    for (var n = { normal: t.getModel(e) }, i = 0; i < fx.length; i++) {
      var r = fx[i];
      n[r] = t.getModel([r, e]);
    }
    return n;
  }
  function ad(t) {
    for (var e = [], n = 0; n < t.length; n++) {
      var i = t[n];
      if (!i.defaultAttr.ignore) {
        var r = i.label,
          o = r.getComputedTransform(),
          a = r.getBoundingRect(),
          s = !o || (o[1] < 1e-5 && o[2] < 1e-5),
          l = r.style.margin || 0,
          u = a.clone();
        u.applyTransform(o), (u.x -= l / 2), (u.y -= l / 2), (u.width += l), (u.height += l);
        var h = s ? new bw(a, o) : null;
        e.push({
          label: r,
          labelLine: i.labelLine,
          rect: u,
          localRect: a,
          obb: h,
          priority: i.priority,
          defaultAttr: i.defaultAttr,
          layoutOption: i.computedLayoutOption,
          axisAligned: s,
          transform: o,
        });
      }
    }
    return e;
  }
  function sd(t, e, n, i, r, o) {
    function a() {
      (w = S.rect[e] - i), (b = r - M.rect[e] - M.rect[n]);
    }
    function s(t, e, n) {
      if (0 > t) {
        var i = Math.min(e, -t);
        if (i > 0) {
          l(i * n, 0, c);
          var r = i + t;
          0 > r && u(-r * n, 1);
        } else u(-t * n, 1);
      }
    }
    function l(n, i, r) {
      0 !== n && (d = !0);
      for (var o = i; r > o; o++) {
        var a = t[o],
          s = a.rect;
        (s[e] += n), (a.label[e] += n);
      }
    }
    function u(i, r) {
      for (var o = [], a = 0, s = 1; c > s; s++) {
        var u = t[s - 1].rect,
          h = Math.max(t[s].rect[e] - u[e] - u[n], 0);
        o.push(h), (a += h);
      }
      if (a) {
        var p = Math.min(Math.abs(i) / a, r);
        if (i > 0)
          for (var s = 0; c - 1 > s; s++) {
            var f = o[s] * p;
            l(f, 0, s + 1);
          }
        else
          for (var s = c - 1; s > 0; s--) {
            var f = o[s - 1] * p;
            l(-f, s, c);
          }
      }
    }
    function h(t) {
      var e = 0 > t ? -1 : 1;
      t = Math.abs(t);
      for (var n = Math.ceil(t / (c - 1)), i = 0; c - 1 > i; i++)
        if ((e > 0 ? l(n, 0, i + 1) : l(-n, c - i - 1, c), (t -= n), 0 >= t)) return;
    }
    var c = t.length;
    if (!(2 > c)) {
      t.sort(function (t, n) {
        return t.rect[e] - n.rect[e];
      });
      for (var p, f = 0, d = !1, g = [], v = 0, y = 0; c > y; y++) {
        var m = t[y],
          _ = m.rect;
        (p = _[e] - f), 0 > p && ((_[e] -= p), (m.label[e] -= p), (d = !0));
        var x = Math.max(-p, 0);
        g.push(x), (v += x), (f = _[e] + _[n]);
      }
      v > 0 && o && l(-v / c, 0, c);
      var w,
        b,
        S = t[0],
        M = t[c - 1];
      return (
        a(),
        0 > w && u(-w, 0.8),
        0 > b && u(b, 0.8),
        a(),
        s(w, b, 1),
        s(b, w, -1),
        a(),
        0 > w && h(-w),
        0 > b && h(b),
        d
      );
    }
  }
  function ld(t, e, n, i) {
    return sd(t, 'x', 'width', e, n, i);
  }
  function ud(t, e, n, i) {
    return sd(t, 'y', 'height', e, n, i);
  }
  function hd(t) {
    function e(t) {
      if (!t.ignore) {
        var e = t.ensureState('emphasis');
        null == e.ignore && (e.ignore = !1);
      }
      t.ignore = !0;
    }
    var n = [];
    t.sort(function (t, e) {
      return e.priority - t.priority;
    });
    for (var i = new fm(0, 0, 0, 0), r = 0; r < t.length; r++) {
      var o = t[r],
        a = o.axisAligned,
        s = o.localRect,
        l = o.transform,
        u = o.label,
        h = o.labelLine;
      i.copy(o.rect), (i.width -= 0.1), (i.height -= 0.1), (i.x += 0.05), (i.y += 0.05);
      for (var c = o.obb, p = !1, f = 0; f < n.length; f++) {
        var d = n[f];
        if (i.intersect(d.rect)) {
          if (a && d.axisAligned) {
            p = !0;
            break;
          }
          if (
            (d.obb || (d.obb = new bw(d.localRect, d.transform)),
            c || (c = new bw(s, l)),
            c.intersect(d.obb))
          ) {
            p = !0;
            break;
          }
        }
      }
      p
        ? (e(u), h && e(h))
        : (u.attr('ignore', o.defaultAttr.ignore),
          h && h.attr('ignore', o.defaultAttr.labelGuideIgnore),
          n.push(o));
    }
  }
  function cd(t) {
    if (t) {
      for (var e = [], n = 0; n < t.length; n++) e.push(t[n].slice());
      return e;
    }
  }
  function pd(t, e) {
    var n = t.label,
      i = e && e.getTextGuideLine();
    return {
      dataIndex: t.dataIndex,
      dataType: t.dataType,
      seriesIndex: t.seriesModel.seriesIndex,
      text: t.label.style.text,
      rect: t.hostRect,
      labelRect: t.rect,
      align: n.style.align,
      verticalAlign: n.style.verticalAlign,
      labelLinePoints: cd(i && i.shape.points),
    };
  }
  function fd(t, e, n) {
    for (var i = 0; i < n.length; i++) {
      var r = n[i];
      null != e[r] && (t[r] = e[r]);
    }
  }
  function dd(t) {
    t.registerUpdateLifecycle('series:beforeupdate', function (t, e) {
      var n = Mk(e).labelManager;
      n || (n = Mk(e).labelManager = new Sk()), n.clearLabels();
    }),
      t.registerUpdateLifecycle('series:layoutlabels', function (t, e, n) {
        var i = Mk(e).labelManager;
        n.updatedSeries.forEach(function (t) {
          i.addLabelsOfSeries(e.getViewOfSeriesModel(t));
        }),
          i.updateLayoutConfig(e),
          i.layout(e),
          i.processLabelsOverall();
      });
  }
  function gd(t, e, n) {
    var i = ov.createCanvas(),
      r = e.getWidth(),
      o = e.getHeight(),
      a = i.style;
    return (
      a &&
        ((a.position = 'absolute'),
        (a.left = '0'),
        (a.top = '0'),
        (a.width = r + 'px'),
        (a.height = o + 'px'),
        i.setAttribute('data-zr-dom-id', t)),
      (i.width = r * n),
      (i.height = o * n),
      i
    );
  }
  function vd(t) {
    return t
      ? t.__builtin__
        ? !0
        : 'function' != typeof t.resize || 'function' != typeof t.refresh
        ? !1
        : !0
      : !1;
  }
  function yd(t, e) {
    var n = document.createElement('div');
    return (
      (n.style.cssText =
        [
          'position:relative',
          'width:' + t + 'px',
          'height:' + e + 'px',
          'padding:0',
          'margin:0',
          'border-width:0',
        ].join(';') + ';'),
      n
    );
  }
  function md(t) {
    t.registerPainter('canvas', Ak);
  }
  function _d(t) {
    t.registerComponentModel(Lk), t.registerComponentView(Pk);
  }
  function xd(t) {
    return {
      seriesType: t,
      reset: function (t, e, n) {
        var i = t.getData(),
          r = t.get('sampling'),
          o = t.coordinateSystem,
          a = i.count();
        if (a > 10 && 'cartesian2d' === o.type && r) {
          var s = o.getBaseAxis(),
            l = o.getOtherAxis(s),
            u = s.getExtent(),
            h = n.getDevicePixelRatio(),
            c = Math.abs(u[1] - u[0]) * (h || 1),
            p = Math.round(a / c);
          if (isFinite(p) && p > 1) {
            'lttb' === r && t.setData(i.lttbDownSample(i.mapDimension(l.dim), 1 / p));
            var f = void 0;
            C(r) ? (f = Ok[r]) : T(r) && (f = r),
              f && t.setData(i.downSample(i.mapDimension(l.dim), 1 / p, f, Rk));
          }
        }
      },
    };
  }
  function wd(t, e, n, i, r) {
    var o = t.getArea(),
      a = o.x,
      s = o.y,
      l = o.width,
      u = o.height,
      h = n.get(['lineStyle', 'width']) || 2;
    (a -= h / 2), (s -= h / 2), (l += h), (u += h), (a = Math.floor(a)), (l = Math.round(l));
    var c = new K_({ shape: { x: a, y: s, width: l, height: u } });
    if (e) {
      var p = t.getBaseAxis(),
        f = p.isHorizontal(),
        d = p.inverse;
      f
        ? (d && (c.shape.x += l), (c.shape.width = 0))
        : (d || (c.shape.y += u), (c.shape.height = 0));
      var g = T(r)
        ? function (t) {
            r(t, c);
          }
        : null;
      is(c, { shape: { width: l, height: u, x: a, y: s } }, n, null, i, g);
    }
    return c;
  }
  function bd(t, e, n) {
    var i = t.getArea(),
      r = Hi(i.r0, 1),
      o = Hi(i.r, 1),
      a = new Jx({
        shape: {
          cx: Hi(t.cx, 1),
          cy: Hi(t.cy, 1),
          r0: r,
          r: o,
          startAngle: i.startAngle,
          endAngle: i.endAngle,
          clockwise: i.clockwise,
        },
      });
    if (e) {
      var s = 'angle' === t.getBaseAxis().dim;
      s ? (a.shape.endAngle = i.startAngle) : (a.shape.r = r),
        is(a, { shape: { endAngle: i.endAngle, r: o } }, n);
    }
    return a;
  }
  function Sd(t, e, n, i, r) {
    return t
      ? 'polar' === t.type
        ? bd(t, e, n)
        : 'cartesian2d' === t.type
        ? wd(t, e, n, i, r)
        : null
      : null;
  }
  function Md(t, e) {
    return t.type === e;
  }
  function Td(t, e) {
    var n = t.mapDimensionsAll('defaultedLabel'),
      i = n.length;
    if (1 === i) {
      var r = Pu(t, e, n[0]);
      return null != r ? r + '' : null;
    }
    if (i) {
      for (var o = [], a = 0; a < n.length; a++) o.push(Pu(t, e, n[a]));
      return o.join(' ');
    }
  }
  function Cd(t, e) {
    var n = t.mapDimensionsAll('defaultedLabel');
    if (!M(e)) return e + '';
    for (var i = [], r = 0; r < n.length; r++) {
      var o = t.getDimensionIndex(n[r]);
      o >= 0 && i.push(e[o]);
    }
    return i.join(' ');
  }
  function kd(t, e) {
    e = e || {};
    var n = e.isRoundCap;
    return function (e, i, r) {
      var o = i.position;
      if (!o || o instanceof Array) return Si(e, i, r);
      var a = t(o),
        s = null != i.distance ? i.distance : 5,
        l = this.shape,
        u = l.cx,
        h = l.cy,
        c = l.r,
        p = l.r0,
        f = (c + p) / 2,
        d = l.startAngle,
        g = l.endAngle,
        v = (d + g) / 2,
        y = n ? Math.abs(c - p) / 2 : 0,
        m = Math.cos,
        _ = Math.sin,
        x = u + c * m(d),
        w = h + c * _(d),
        b = 'left',
        S = 'top';
      switch (a) {
        case 'startArc':
          (x = u + (p - s) * m(v)), (w = h + (p - s) * _(v)), (b = 'center'), (S = 'top');
          break;
        case 'insideStartArc':
          (x = u + (p + s) * m(v)), (w = h + (p + s) * _(v)), (b = 'center'), (S = 'bottom');
          break;
        case 'startAngle':
          (x = u + f * m(d) + Id(d, s + y, !1)),
            (w = h + f * _(d) + Ad(d, s + y, !1)),
            (b = 'right'),
            (S = 'middle');
          break;
        case 'insideStartAngle':
          (x = u + f * m(d) + Id(d, -s + y, !1)),
            (w = h + f * _(d) + Ad(d, -s + y, !1)),
            (b = 'left'),
            (S = 'middle');
          break;
        case 'middle':
          (x = u + f * m(v)), (w = h + f * _(v)), (b = 'center'), (S = 'middle');
          break;
        case 'endArc':
          (x = u + (c + s) * m(v)), (w = h + (c + s) * _(v)), (b = 'center'), (S = 'bottom');
          break;
        case 'insideEndArc':
          (x = u + (c - s) * m(v)), (w = h + (c - s) * _(v)), (b = 'center'), (S = 'top');
          break;
        case 'endAngle':
          (x = u + f * m(g) + Id(g, s + y, !0)),
            (w = h + f * _(g) + Ad(g, s + y, !0)),
            (b = 'left'),
            (S = 'middle');
          break;
        case 'insideEndAngle':
          (x = u + f * m(g) + Id(g, -s + y, !0)),
            (w = h + f * _(g) + Ad(g, -s + y, !0)),
            (b = 'right'),
            (S = 'middle');
          break;
        default:
          return Si(e, i, r);
      }
      return (e = e || {}), (e.x = x), (e.y = w), (e.align = b), (e.verticalAlign = S), e;
    };
  }
  function Dd(t, e, n, i) {
    if (D(i)) return void t.setTextConfig({ rotation: i });
    if (M(e)) return void t.setTextConfig({ rotation: 0 });
    var r,
      o = t.shape,
      a = o.clockwise ? o.startAngle : o.endAngle,
      s = o.clockwise ? o.endAngle : o.startAngle,
      l = (a + s) / 2,
      u = n(e);
    switch (u) {
      case 'startArc':
      case 'insideStartArc':
      case 'middle':
      case 'insideEndArc':
      case 'endArc':
        r = l;
        break;
      case 'startAngle':
      case 'insideStartAngle':
        r = a;
        break;
      case 'endAngle':
      case 'insideEndAngle':
        r = s;
        break;
      default:
        return void t.setTextConfig({ rotation: 0 });
    }
    var h = 1.5 * Math.PI - r;
    'middle' === u && h > Math.PI / 2 && h < 1.5 * Math.PI && (h -= Math.PI),
      t.setTextConfig({ rotation: h });
  }
  function Id(t, e, n) {
    return e * Math.sin(t) * (n ? -1 : 1);
  }
  function Ad(t, e, n) {
    return e * Math.cos(t) * (n ? 1 : -1);
  }
  function Ld(t, e) {
    var n = t.getArea && t.getArea();
    if (Md(t, 'cartesian2d')) {
      var i = t.getBaseAxis();
      if ('category' !== i.type || !i.onBand) {
        var r = e.getLayout('bandWidth');
        i.isHorizontal() ? ((n.x -= r), (n.width += 2 * r)) : ((n.y -= r), (n.height += 2 * r));
      }
    }
    return n;
  }
  function Pd(t, e) {
    var n = t.get('realtimeSort', !0),
      i = e.getBaseAxis();
    return n && 'category' === i.type && 'cartesian2d' === e.type
      ? { baseAxis: i, otherAxis: e.getOtherAxis(i) }
      : void 0;
  }
  function Od(t, e, n, i, r, o, a, s) {
    var l, u;
    o
      ? ((u = { x: i.x, width: i.width }), (l = { y: i.y, height: i.height }))
      : ((u = { y: i.y, height: i.height }), (l = { x: i.x, width: i.width })),
      s || (a ? ns : is)(n, { shape: l }, e, r, null);
    var h = e ? t.baseAxis.model : null;
    (a ? ns : is)(n, { shape: u }, h, r);
  }
  function Rd(t, e) {
    for (var n = 0; n < e.length; n++) if (!isFinite(t[e[n]])) return !0;
    return !1;
  }
  function Ed(t) {
    return null != t.startAngle && null != t.endAngle && t.startAngle === t.endAngle;
  }
  function Bd(t) {
    return (function (t) {
      var e = t ? 'Arc' : 'Angle';
      return function (t) {
        switch (t) {
          case 'start':
          case 'insideStart':
          case 'end':
          case 'insideEnd':
            return t + e;
          default:
            return t;
        }
      };
    })(t);
  }
  function zd(t, e, n, i, r, o, a, s) {
    var l = e.getItemVisual(n, 'style');
    s || t.setShape('r', i.get(['itemStyle', 'borderRadius']) || 0), t.useStyle(l);
    var u = i.getShallow('cursor');
    u && t.attr('cursor', u);
    var h = s
        ? a
          ? r.r >= r.r0
            ? 'endArc'
            : 'startArc'
          : r.endAngle >= r.startAngle
          ? 'endAngle'
          : 'startAngle'
        : a
        ? r.height >= 0
          ? 'bottom'
          : 'top'
        : r.width >= 0
        ? 'right'
        : 'left',
      c = Ps(i);
    Ls(t, c, {
      labelFetcher: o,
      labelDataIndex: n,
      defaultText: Td(o.getData(), n),
      inheritColor: l.fill,
      defaultOpacity: l.opacity,
      defaultOutsidePosition: h,
    });
    var p = t.getTextContent();
    if (s && p) {
      var f = i.get(['label', 'position']);
      (t.textConfig.inside = 'middle' === f ? !0 : null),
        Dd(t, 'outside' === f ? h : f, Bd(a), i.get(['label', 'rotate']));
    }
    Fs(p, c, o.getRawValue(n), function (t) {
      return Cd(e, t);
    });
    var d = i.getModel(['emphasis']);
    ka(t, d.get('focus'), d.get('blurScope'), d.get('disabled')),
      Ia(t, i),
      Ed(r) &&
        ((t.style.fill = 'none'),
        (t.style.stroke = 'none'),
        v(t.states, function (t) {
          t.style && (t.style.fill = t.style.stroke = 'none');
        }));
  }
  function Nd(t, e) {
    var n = t.get(['itemStyle', 'borderColor']);
    if (!n || 'none' === n) return 0;
    var i = t.get(['itemStyle', 'borderWidth']) || 0,
      r = isNaN(e.width) ? Number.MAX_VALUE : Math.abs(e.width),
      o = isNaN(e.height) ? Number.MAX_VALUE : Math.abs(e.height);
    return Math.min(i, r, o);
  }
  function Fd(t, e, n, i) {
    var r = t.getData(),
      o = r.getLayout('valueAxisHorizontal') ? 1 : 0,
      a = r.getLayout('largeDataIndices'),
      s = r.getLayout('size'),
      l = t.getModel('backgroundStyle'),
      u = r.getLayout('largeBackgroundPoints');
    if (u) {
      var h = new jk({ shape: { points: u }, incremental: !!i, silent: !0, z2: 0 });
      (h.baseDimIdx = o),
        (h.largeDataIndices = a),
        (h.barWidth = s),
        h.useStyle(l.getItemStyle()),
        e.add(h),
        n && n.push(h);
    }
    var c = new jk({ shape: { points: r.getLayout('largePoints') }, incremental: !!i, z2: 1 });
    (c.baseDimIdx = o),
      (c.largeDataIndices = a),
      (c.barWidth = s),
      e.add(c),
      c.useStyle(r.getVisual('style')),
      (rx(c).seriesIndex = t.seriesIndex),
      t.get('silent') || (c.on('mousedown', Kk), c.on('mousemove', Kk)),
      n && n.push(c);
  }
  function Vd(t, e, n) {
    for (
      var i = t.baseDimIdx,
        r = 1 - i,
        o = t.shape.points,
        a = t.largeDataIndices,
        s = [],
        l = [],
        u = t.barWidth,
        h = 0,
        c = o.length / 3;
      c > h;
      h++
    ) {
      var p = 3 * h;
      if (
        ((l[i] = u),
        (l[r] = o[p + 2]),
        (s[i] = o[p + i]),
        (s[r] = o[p + r]),
        l[r] < 0 && ((s[r] += l[r]), (l[r] = -l[r])),
        e >= s[0] && e <= s[0] + l[0] && n >= s[1] && n <= s[1] + l[1])
      )
        return a[h];
    }
    return -1;
  }
  function Hd(t, e, n) {
    if (Md(n, 'cartesian2d')) {
      var i = e,
        r = n.getArea();
      return {
        x: t ? i.x : r.x,
        y: t ? r.y : i.y,
        width: t ? i.width : r.width,
        height: t ? r.height : i.height,
      };
    }
    var r = n.getArea(),
      o = e;
    return {
      cx: r.cx,
      cy: r.cy,
      r0: t ? r.r0 : o.r0,
      r: t ? r.r : o.r,
      startAngle: t ? o.startAngle : 0,
      endAngle: t ? o.endAngle : 2 * Math.PI,
    };
  }
  function Wd(t, e, n) {
    var i = 'polar' === t.type ? Jx : K_;
    return new i({ shape: Hd(e, n, t), silent: !0, z2: 0 });
  }
  function Gd(t) {
    t.registerChartView(Hk),
      t.registerSeriesModel(Bk),
      t.registerLayout(t.PRIORITY.VISUAL.LAYOUT, S(Np, 'bar')),
      t.registerLayout(t.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, Fp('bar')),
      t.registerProcessor(t.PRIORITY.PROCESSOR.STATISTIC, xd('bar')),
      t.registerAction(
        { type: 'changeAxisOrder', event: 'changeAxisOrder', update: 'update' },
        function (t, e) {
          var n = t.componentType || 'series';
          e.eachComponent({ mainType: n, query: t }, function (e) {
            t.sortInfo && e.axis.setCategorySortInfo(t.sortInfo);
          });
        }
      );
  }
  function Zd(t, n, i, r) {
    v(oD, function (o, a) {
      var s = l(l({}, rD[a], !0), r, !0),
        u = (function (t) {
          function i() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (e.type = n + 'Axis.' + a), e;
          }
          return (
            e(i, t),
            (i.prototype.mergeDefaultAndTheme = function (t, e) {
              var n = Dl(this),
                i = n ? Al(t) : {},
                r = e.getTheme();
              l(t, r.get(a + 'Axis')),
                l(t, this.getDefaultOption()),
                (t.type = Ud(t)),
                n && Il(t, i, n);
            }),
            (i.prototype.optionUpdated = function () {
              var t = this.option;
              'category' === t.type && (this.__ordinalMeta = xC.createByAxisModel(this));
            }),
            (i.prototype.getCategories = function (t) {
              var e = this.option;
              return 'category' === e.type ? (t ? e.data : this.__ordinalMeta.categories) : void 0;
            }),
            (i.prototype.getOrdinalMeta = function () {
              return this.__ordinalMeta;
            }),
            (i.type = n + 'Axis.' + a),
            (i.defaultOption = s),
            i
          );
        })(i);
      t.registerComponentModel(u);
    }),
      t.registerSubTypeDefaulter(n + 'Axis', Ud);
  }
  function Ud(t) {
    return t.type || (t.data ? 'category' : 'value');
  }
  function Xd(t) {
    return 'interval' === t.type || 'time' === t.type;
  }
  function Yd(t, e, n) {
    n = n || {};
    var i = t.coordinateSystem,
      r = e.axis,
      o = {},
      a = r.getAxesOnZeroOf()[0],
      s = r.position,
      l = a ? 'onZero' : s,
      u = r.dim,
      h = i.getRect(),
      c = [h.x, h.x + h.width, h.y, h.y + h.height],
      p = { left: 0, right: 1, top: 0, bottom: 1, onZero: 2 },
      f = e.get('offset') || 0,
      d = 'x' === u ? [c[2] - f, c[3] + f] : [c[0] - f, c[1] + f];
    if (a) {
      var g = a.toGlobalCoord(a.dataToCoord(0));
      d[p.onZero] = Math.max(Math.min(g, d[1]), d[0]);
    }
    (o.position = ['y' === u ? d[p[l]] : c[0], 'x' === u ? d[p[l]] : c[3]]),
      (o.rotation = (Math.PI / 2) * ('x' === u ? 0 : 1));
    var v = { top: -1, bottom: 1, left: -1, right: 1 };
    (o.labelDirection = o.tickDirection = o.nameDirection = v[s]),
      (o.labelOffset = a ? d[p[s]] - d[p.onZero] : 0),
      e.get(['axisTick', 'inside']) && (o.tickDirection = -o.tickDirection),
      z(n.labelInside, e.get(['axisLabel', 'inside'])) && (o.labelDirection = -o.labelDirection);
    var y = e.get(['axisLabel', 'rotate']);
    return (o.labelRotate = 'top' === l ? -y : y), (o.z2 = 1), o;
  }
  function qd(t) {
    return 'cartesian2d' === t.get('coordinateSystem');
  }
  function jd(t) {
    var e = { xAxisModel: null, yAxisModel: null };
    return (
      v(e, function (n, i) {
        var r = i.replace(/Model$/, ''),
          o = t.getReferringComponents(r, Em).models[0];
        e[i] = o;
      }),
      e
    );
  }
  function Kd(t, e, n) {
    var i = SC.prototype,
      r = i.getTicks.call(n),
      o = i.getTicks.call(n, !0),
      a = r.length - 1,
      s = i.getInterval.call(n),
      l = tf(t, e),
      u = l.extent,
      h = l.fixMin,
      c = l.fixMax;
    if ('log' === t.type) {
      var p = hD(t.base);
      u = [hD(u[0]) / p, hD(u[1]) / p];
    }
    t.setExtent(u[0], u[1]), t.calcNiceExtent({ splitNumber: a, fixMin: h, fixMax: c });
    var f = i.getExtent.call(t);
    h && (u[0] = f[0]), c && (u[1] = f[1]);
    var d = i.getInterval.call(t),
      g = u[0],
      v = u[1];
    if (h && c) d = (v - g) / a;
    else if (h)
      for (v = u[0] + d * a; v < u[1] && isFinite(v) && isFinite(u[1]); )
        (d = Sp(d)), (v = u[0] + d * a);
    else if (c)
      for (g = u[1] - d * a; g > u[0] && isFinite(g) && isFinite(u[0]); )
        (d = Sp(d)), (g = u[1] - d * a);
    else {
      var y = t.getTicks().length - 1;
      y > a && (d = Sp(d));
      var m = d * a;
      (v = Math.ceil(u[1] / d) * d),
        (g = Hi(v - m)),
        0 > g && u[0] >= 0 ? ((g = 0), (v = Hi(m))) : v > 0 && u[1] <= 0 && ((v = 0), (g = -Hi(m)));
    }
    var _ = (r[0].value - o[0].value) / s,
      x = (r[a].value - o[a].value) / s;
    i.setExtent.call(t, g + d * _, v + d * x),
      i.setInterval.call(t, d),
      (_ || x) && i.setNiceExtent.call(t, g + d, v - d);
  }
  function $d(t, e) {
    return t.getCoordSysModel() === e;
  }
  function Qd(t, e, n, i) {
    function r(t) {
      return t.dim + '_' + t.index;
    }
    n.getAxesOnZeroOf = function () {
      return o ? [o] : [];
    };
    var o,
      a = t[e],
      s = n.model,
      l = s.get(['axisLine', 'onZero']),
      u = s.get(['axisLine', 'onZeroAxisIndex']);
    if (l) {
      if (null != u) Jd(a[u]) && (o = a[u]);
      else
        for (var h in a)
          if (a.hasOwnProperty(h) && Jd(a[h]) && !i[r(a[h])]) {
            o = a[h];
            break;
          }
      o && (i[r(o)] = !0);
    }
  }
  function Jd(t) {
    return t && 'category' !== t.type && 'time' !== t.type && of(t);
  }
  function tg(t, e) {
    var n = t.getExtent(),
      i = n[0] + n[1];
    (t.toGlobalCoord =
      'x' === t.dim
        ? function (t) {
            return t + e;
          }
        : function (t) {
            return i - t + e;
          }),
      (t.toLocalCoord =
        'x' === t.dim
          ? function (t) {
              return t - e;
            }
          : function (t) {
              return i - t + e;
            });
  }
  function eg(t, e, n, i) {
    var r,
      o,
      a = qi(n - t),
      s = i[0] > i[1],
      l = ('start' === e && !s) || ('start' !== e && s);
    return (
      ji(a - pD / 2)
        ? ((o = l ? 'bottom' : 'top'), (r = 'center'))
        : ji(a - 1.5 * pD)
        ? ((o = l ? 'top' : 'bottom'), (r = 'center'))
        : ((o = 'middle'),
          (r = 1.5 * pD > a && a > pD / 2 ? (l ? 'left' : 'right') : l ? 'right' : 'left')),
      { rotation: a, textAlign: r, textVerticalAlign: o }
    );
  }
  function ng(t, e, n) {
    if (!cf(t.axis)) {
      var i = t.get(['axisLabel', 'showMinLabel']),
        r = t.get(['axisLabel', 'showMaxLabel']);
      (e = e || []), (n = n || []);
      var o = e[0],
        a = e[1],
        s = e[e.length - 1],
        l = e[e.length - 2],
        u = n[0],
        h = n[1],
        c = n[n.length - 1],
        p = n[n.length - 2];
      i === !1 ? (ig(o), ig(u)) : rg(o, a) && (i ? (ig(a), ig(h)) : (ig(o), ig(u))),
        r === !1 ? (ig(s), ig(c)) : rg(l, s) && (r ? (ig(l), ig(p)) : (ig(s), ig(c)));
    }
  }
  function ig(t) {
    t && (t.ignore = !0);
  }
  function rg(t, e) {
    var n = t && t.getBoundingRect().clone(),
      i = e && e.getBoundingRect().clone();
    if (n && i) {
      var r = ai([]);
      return (
        hi(r, r, -t.rotation),
        n.applyTransform(li([], r, t.getLocalTransform())),
        i.applyTransform(li([], r, e.getLocalTransform())),
        n.intersect(i)
      );
    }
  }
  function og(t) {
    return 'middle' === t || 'center' === t;
  }
  function ag(t, e, n, i, r) {
    for (var o = [], a = [], s = [], l = 0; l < t.length; l++) {
      var u = t[l].coord;
      (a[0] = u), (a[1] = 0), (s[0] = u), (s[1] = n), e && (ve(a, a, e), ve(s, s, e));
      var h = new lw({
        subPixelOptimize: !0,
        shape: { x1: a[0], y1: a[1], x2: s[0], y2: s[1] },
        style: i,
        z2: 2,
        autoBatch: !0,
        silent: !0,
      });
      (h.anid = r + '_' + t[l].tickValue), o.push(h);
    }
    return o;
  }
  function sg(t, e, n, i) {
    var r = n.axis,
      o = n.getModel('axisTick'),
      a = o.get('show');
    if (
      ('auto' === a && i.handleAutoShown && (a = i.handleAutoShown('axisTick')),
      a && !r.scale.isBlank())
    ) {
      for (
        var s = o.getModel('lineStyle'),
          l = i.tickDirection * o.get('length'),
          u = r.getTicksCoords(),
          h = ag(
            u,
            e.transform,
            l,
            c(s.getLineStyle(), { stroke: n.get(['axisLine', 'lineStyle', 'color']) }),
            'ticks'
          ),
          p = 0;
        p < h.length;
        p++
      )
        t.add(h[p]);
      return h;
    }
  }
  function lg(t, e, n, i) {
    var r = n.axis,
      o = n.getModel('minorTick');
    if (o.get('show') && !r.scale.isBlank()) {
      var a = r.getMinorTicksCoords();
      if (a.length)
        for (
          var s = o.getModel('lineStyle'),
            l = i * o.get('length'),
            u = c(
              s.getLineStyle(),
              c(n.getModel('axisTick').getLineStyle(), {
                stroke: n.get(['axisLine', 'lineStyle', 'color']),
              })
            ),
            h = 0;
          h < a.length;
          h++
        )
          for (var p = ag(a[h], e.transform, l, u, 'minorticks_' + h), f = 0; f < p.length; f++)
            t.add(p[f]);
    }
  }
  function ug(t, e, n, i) {
    var r = n.axis,
      o = z(i.axisLabelShow, n.get(['axisLabel', 'show']));
    if (o && !r.scale.isBlank()) {
      var a = n.getModel('axisLabel'),
        s = a.get('margin'),
        l = r.getViewLabels(),
        u = ((z(i.labelRotate, a.get('rotate')) || 0) * pD) / 180,
        h = fD.innerTextLayout(i.rotation, u, i.labelDirection),
        c = n.getCategories && n.getCategories(!0),
        p = [],
        f = fD.isLabelSilent(n),
        d = n.get('triggerEvent');
      return (
        v(l, function (o, l) {
          var u =
              'ordinal' === r.scale.type ? r.scale.getRawOrdinalNumber(o.tickValue) : o.tickValue,
            g = o.formattedLabel,
            v = o.rawLabel,
            y = a;
          if (c && c[u]) {
            var m = c[u];
            I(m) && m.textStyle && (y = new Xw(m.textStyle, a, n.ecModel));
          }
          var _ = y.getTextColor() || n.get(['axisLine', 'lineStyle', 'color']),
            x = r.dataToCoord(u),
            w = new tx({
              x: x,
              y: i.labelOffset + i.labelDirection * s,
              rotation: h.rotation,
              silent: f,
              z2: 10 + (o.level || 0),
              style: Os(y, {
                text: g,
                align: y.getShallow('align', !0) || h.textAlign,
                verticalAlign:
                  y.getShallow('verticalAlign', !0) ||
                  y.getShallow('baseline', !0) ||
                  h.textVerticalAlign,
                fill: T(_) ? _('category' === r.type ? v : 'value' === r.type ? u + '' : u, l) : _,
              }),
            });
          if (((w.anid = 'label_' + u), d)) {
            var b = fD.makeAxisEventDataBase(n);
            (b.targetType = 'axisLabel'),
              (b.value = v),
              (b.tickIndex = l),
              'category' === r.type && (b.dataIndex = u),
              (rx(w).eventData = b);
          }
          e.add(w), w.updateTransform(), p.push(w), t.add(w), w.decomposeTransform();
        }),
        p
      );
    }
  }
  function hg(t) {
    var e = cg(t);
    if (e) {
      var n = e.axisPointerModel,
        i = e.axis.scale,
        r = n.option,
        o = n.get('status'),
        a = n.get('value');
      null != a && (a = i.parse(a));
      var s = fg(n);
      null == o && (r.status = s ? 'show' : 'hide');
      var l = i.getExtent().slice();
      l[0] > l[1] && l.reverse(),
        (null == a || a > l[1]) && (a = l[1]),
        a < l[0] && (a = l[0]),
        (r.value = a),
        s && (r.status = e.axis.scale.isBlank() ? 'hide' : 'show');
    }
  }
  function cg(t) {
    var e = (t.ecModel.getComponent('axisPointer') || {}).coordSysAxesInfo;
    return e && e.axesInfo[dg(t)];
  }
  function pg(t) {
    var e = cg(t);
    return e && e.axisPointerModel;
  }
  function fg(t) {
    return !!t.get(['handle', 'show']);
  }
  function dg(t) {
    return t.type + '||' + t.id;
  }
  function gg(t, e, n, i) {
    var r = n.axis;
    if (!r.scale.isBlank()) {
      var o = n.getModel('splitArea'),
        a = o.getModel('areaStyle'),
        s = a.get('color'),
        l = i.coordinateSystem.getRect(),
        u = r.getTicksCoords({ tickModel: o, clamp: !0 });
      if (u.length) {
        var h = s.length,
          p = yD(t).splitAreaColors,
          f = X(),
          d = 0;
        if (p)
          for (var g = 0; g < u.length; g++) {
            var v = p.get(u[g].tickValue);
            if (null != v) {
              d = (v + (h - 1) * g) % h;
              break;
            }
          }
        var y = r.toGlobalCoord(u[0].coord),
          m = a.getAreaStyle();
        s = M(s) ? s : [s];
        for (var g = 1; g < u.length; g++) {
          var _ = r.toGlobalCoord(u[g].coord),
            x = void 0,
            w = void 0,
            b = void 0,
            S = void 0;
          r.isHorizontal()
            ? ((x = y), (w = l.y), (b = _ - x), (S = l.height), (y = x + b))
            : ((x = l.x), (w = y), (b = l.width), (S = _ - w), (y = w + S));
          var T = u[g - 1].tickValue;
          null != T && f.set(T, d),
            e.add(
              new K_({
                anid: null != T ? 'area_' + T : null,
                shape: { x: x, y: w, width: b, height: S },
                style: c({ fill: s[d] }, m),
                autoBatch: !0,
                silent: !0,
              })
            ),
            (d = (d + 1) % h);
        }
        yD(t).splitAreaColors = f;
      }
    }
  }
  function vg(t) {
    yD(t).splitAreaColors = null;
  }
  function yg(t) {
    t.registerComponentView(MD),
      t.registerComponentModel($k),
      t.registerCoordinateSystem('cartesian2d', cD),
      Zd(t, 'x', Qk, TD),
      Zd(t, 'y', Qk, TD),
      t.registerComponentView(bD),
      t.registerComponentView(SD),
      t.registerPreprocessor(function (t) {
        t.xAxis && t.yAxis && !t.grid && (t.grid = {});
      });
  }
  function mg(t) {
    var e = t.get('coordinateSystem');
    return p(kD, e) >= 0;
  }
  function _g(t) {
    return t + 'Axis';
  }
  function xg(t, e) {
    function n(t) {
      !l.get(t.uid) && r(t) && (i(t), (u = !0));
    }
    function i(t) {
      l.set(t.uid, !0), s.push(t), o(t);
    }
    function r(t) {
      var e = !1;
      return (
        t.eachTargetAxis(function (t, n) {
          var i = a.get(t);
          i && i[n] && (e = !0);
        }),
        e
      );
    }
    function o(t) {
      t.eachTargetAxis(function (t, e) {
        (a.get(t) || a.set(t, []))[e] = !0;
      });
    }
    var a = X(),
      s = [],
      l = X();
    t.eachComponent({ mainType: 'dataZoom', query: e }, function (t) {
      l.get(t.uid) || i(t);
    });
    var u;
    do (u = !1), t.eachComponent('dataZoom', n);
    while (u);
    return s;
  }
  function wg(t) {
    var e = t.ecModel,
      n = { infoList: [], infoMap: X() };
    return (
      t.eachTargetAxis(function (t, i) {
        var r = e.getComponent(_g(t), i);
        if (r) {
          var o = r.getCoordSysModel();
          if (o) {
            var a = o.uid,
              s = n.infoMap.get(a);
            s || ((s = { model: o, axisModels: [] }), n.infoList.push(s), n.infoMap.set(a, s)),
              s.axisModels.push(r);
          }
        }
      }),
      n
    );
  }
  function bg(t) {
    var e = {};
    return (
      v(['start', 'end', 'startValue', 'endValue', 'throttle'], function (n) {
        t.hasOwnProperty(n) && (e[n] = t[n]);
      }),
      e
    );
  }
  function Sg(t, e, n, i, r, o) {
    t = t || 0;
    var a = n[1] - n[0];
    if (
      (null != r && (r = Tg(r, [0, a])),
      null != o && (o = Math.max(o, null != r ? r : 0)),
      'all' === i)
    ) {
      var s = Math.abs(e[1] - e[0]);
      (s = Tg(s, [0, a])), (r = o = Tg(s, [r, o])), (i = 0);
    }
    (e[0] = Tg(e[0], n)), (e[1] = Tg(e[1], n));
    var l = Mg(e, i);
    e[i] += t;
    var u = r || 0,
      h = n.slice();
    l.sign < 0 ? (h[0] += u) : (h[1] -= u), (e[i] = Tg(e[i], h));
    var c;
    return (
      (c = Mg(e, i)),
      null != r && (c.sign !== l.sign || c.span < r) && (e[1 - i] = e[i] + l.sign * r),
      (c = Mg(e, i)),
      null != o && c.span > o && (e[1 - i] = e[i] + c.sign * o),
      e
    );
  }
  function Mg(t, e) {
    var n = t[e] - t[1 - e];
    return { span: Math.abs(n), sign: n > 0 ? -1 : 0 > n ? 1 : e ? -1 : 1 };
  }
  function Tg(t, e) {
    return Math.min(null != e[1] ? e[1] : 1 / 0, Math.max(null != e[0] ? e[0] : -1 / 0, t));
  }
  function Cg(t, e) {
    return !!kg(t)[e];
  }
  function kg(t) {
    return t[PD] || (t[PD] = {});
  }
  function Dg(t, e, n, i, r) {
    t.pointerChecker &&
      t.pointerChecker(i, r.originX, r.originY) &&
      (zv(i.event), Ig(t, e, n, i, r));
  }
  function Ig(t, e, n, i, r) {
    (r.isAvailableBehavior = _v(Ag, null, n, i)), t.trigger(e, r);
  }
  function Ag(t, e, n) {
    var i = n[t];
    return !t || (i && (!C(i) || e.event[i + 'Key']));
  }
  function Lg(t, e, n) {
    RD(t).coordSysRecordMap.each(function (t) {
      var i = t.dataZoomInfoMap.get(e.uid);
      i && (i.getRange = n);
    });
  }
  function Pg(t, e) {
    for (var n = RD(t).coordSysRecordMap, i = n.keys(), r = 0; r < i.length; r++) {
      var o = i[r],
        a = n.get(o),
        s = a.dataZoomInfoMap;
      if (s) {
        var l = e.uid,
          u = s.get(l);
        u && (s.removeKey(l), s.keys().length || Og(n, a));
      }
    }
  }
  function Og(t, e) {
    if (e) {
      t.removeKey(e.model.uid);
      var n = e.controller;
      n && n.dispose();
    }
  }
  function Rg(t, e) {
    var n = {
        model: e,
        containsPoint: S(Bg, e),
        dispatchAction: S(Eg, t),
        dataZoomInfoMap: null,
        controller: null,
      },
      i = (n.controller = new OD(t.getZr()));
    return (
      v(['pan', 'zoom', 'scrollMove'], function (t) {
        i.on(t, function (e) {
          var i = [];
          n.dataZoomInfoMap.each(function (r) {
            if (e.isAvailableBehavior(r.model.option)) {
              var o = (r.getRange || {})[t],
                a = o && o(r.dzReferCoordSysInfo, n.model.mainType, n.controller, e);
              !r.model.get('disabled', !0) &&
                a &&
                i.push({ dataZoomId: r.model.id, start: a[0], end: a[1] });
            }
          }),
            i.length && n.dispatchAction(i);
        });
      }),
      n
    );
  }
  function Eg(t, e) {
    t.isDisposed() ||
      t.dispatchAction({
        type: 'dataZoom',
        animation: { easing: 'cubicOut', duration: 100 },
        batch: e,
      });
  }
  function Bg(t, e, n, i) {
    return t.coordinateSystem.containPoint([n, i]);
  }
  function zg(t) {
    var e,
      n = 'type_',
      i = { type_true: 2, type_move: 1, type_false: 0, type_undefined: -1 },
      r = !0;
    return (
      t.each(function (t) {
        var o = t.model,
          a = o.get('disabled', !0) ? !1 : o.get('zoomLock', !0) ? 'move' : !0;
        i[n + a] > i[n + e] && (e = a), (r = r && o.get('preventDefaultMouseMove', !0));
      }),
      {
        controlType: e,
        opt: {
          zoomOnMouseWheel: !0,
          moveOnMouseMove: !0,
          moveOnMouseWheel: !0,
          preventDefaultMouseMove: !!r,
        },
      }
    );
  }
  function Ng(t) {
    t.registerProcessor(t.PRIORITY.PROCESSOR.FILTER, function (t, e) {
      var n = RD(e),
        i = n.coordSysRecordMap || (n.coordSysRecordMap = X());
      i.each(function (t) {
        t.dataZoomInfoMap = null;
      }),
        t.eachComponent({ mainType: 'dataZoom', subType: 'inside' }, function (t) {
          var n = wg(t);
          v(n.infoList, function (n) {
            var r = n.model.uid,
              o = i.get(r) || i.set(r, Rg(e, n.model)),
              a = o.dataZoomInfoMap || (o.dataZoomInfoMap = X());
            a.set(t.uid, { dzReferCoordSysInfo: n, model: t, getRange: null });
          });
        }),
        i.each(function (t) {
          var e,
            n = t.controller,
            r = t.dataZoomInfoMap;
          if (r) {
            var o = r.keys()[0];
            null != o && (e = r.get(o));
          }
          if (!e) return void Og(i, t);
          var a = zg(r);
          n.enable(a.controlType, a.opt),
            n.setPointerChecker(t.containsPoint),
            vh(t, 'dispatchAction', e.model.get('throttle', !0), 'fixRate');
        });
    });
  }
  function Fg(t) {
    return function (e, n, i, r) {
      var o = this.range,
        a = o.slice(),
        s = e.axisModels[0];
      if (s) {
        var l = t(a, s, e, n, i, r);
        return (
          Sg(l, a, [0, 100], 'all'), (this.range = a), o[0] !== a[0] || o[1] !== a[1] ? a : void 0
        );
      }
    };
  }
  function Vg(t, e, n) {
    var i = [1 / 0, -1 / 0];
    ND(n, function (t) {
      ff(i, t.getData(), e);
    });
    var r = t.getAxisModel(),
      o = Qp(r.axis.scale, r, i).calculate();
    return [o.min, o.max];
  }
  function Hg(t) {
    t.registerAction('dataZoom', function (t, e) {
      var n = xg(e, t);
      v(n, function (e) {
        e.setRawRange({
          start: t.start,
          end: t.end,
          startValue: t.startValue,
          endValue: t.endValue,
        });
      });
    });
  }
  function Wg(t) {
    WD ||
      ((WD = !0),
      t.registerProcessor(t.PRIORITY.PROCESSOR.FILTER, HD),
      Hg(t),
      t.registerSubTypeDefaulter('dataZoom', function () {
        return 'slider';
      }));
  }
  function Gg(t) {
    Wg(t), t.registerComponentModel(AD), t.registerComponentView(ED), Ng(t);
  }
  function Zg(t) {
    var e = { x: 'y', y: 'x', radius: 'angle', angle: 'radius' };
    return e[t];
  }
  function Ug(t) {
    return 'vertical' === t ? 'ns-resize' : 'ew-resize';
  }
  function Xg(t) {
    t.registerComponentModel(GD), t.registerComponentView(tI), Wg(t);
  }
  function Yg() {
    mf(Gg), mf(Xg);
  }
  var qg = function (t, e) {
      return (qg =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        })(t, e);
    },
    jg = (function () {
      function t() {
        (this.firefox = !1),
          (this.ie = !1),
          (this.edge = !1),
          (this.newEdge = !1),
          (this.weChat = !1);
      }
      return t;
    })(),
    Kg = (function () {
      function t() {
        (this.browser = new jg()),
          (this.node = !1),
          (this.wxa = !1),
          (this.worker = !1),
          (this.svgSupported = !1),
          (this.touchEventsSupported = !1),
          (this.pointerEventsSupported = !1),
          (this.domSupported = !1),
          (this.transformSupported = !1),
          (this.transform3dSupported = !1),
          (this.hasGlobalWindow = 'undefined' != typeof window);
      }
      return t;
    })(),
    $g = new Kg();
  'object' == typeof wx && 'function' == typeof wx.getSystemInfoSync
    ? (($g.wxa = !0), ($g.touchEventsSupported = !0))
    : 'undefined' == typeof document && 'undefined' != typeof self
    ? ($g.worker = !0)
    : 'undefined' == typeof navigator
    ? (($g.node = !0), ($g.svgSupported = !0))
    : n(navigator.userAgent, $g);
  var Qg = 12,
    Jg = 'sans-serif',
    tv = Qg + 'px ' + Jg,
    ev = 20,
    nv = 100,
    iv =
      "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N",
    rv = i(iv),
    ov = {
      createCanvas: function () {
        return 'undefined' != typeof document && document.createElement('canvas');
      },
      measureText: (function () {
        var t, e;
        return function (n, i) {
          if (!t) {
            var r = ov.createCanvas();
            t = r && r.getContext('2d');
          }
          if (t) return e !== i && (e = t.font = i || tv), t.measureText(n);
          (n = n || ''), (i = i || tv);
          var o = /^([0-9]*?)px$/.exec(i),
            a = +(o && o[1]) || Qg,
            s = 0;
          if (i.indexOf('mono') >= 0) s = a * n.length;
          else
            for (var l = 0; l < n.length; l++) {
              var u = rv[n[l]];
              s += null == u ? a : u * a;
            }
          return { width: s };
        };
      })(),
      loadImage: function (t, e, n) {
        var i = new Image();
        return (i.onload = e), (i.onerror = n), (i.src = t), i;
      },
    },
    av = m(
      ['Function', 'RegExp', 'Date', 'Error', 'CanvasGradient', 'CanvasPattern', 'Image', 'Canvas'],
      function (t, e) {
        return (t['[object ' + e + ']'] = !0), t;
      },
      {}
    ),
    sv = m(
      ['Int8', 'Uint8', 'Uint8Clamped', 'Int16', 'Uint16', 'Int32', 'Uint32', 'Float32', 'Float64'],
      function (t, e) {
        return (t['[object ' + e + 'Array]'] = !0), t;
      },
      {}
    ),
    lv = Object.prototype.toString,
    uv = Array.prototype,
    hv = uv.forEach,
    cv = uv.filter,
    pv = uv.slice,
    fv = uv.map,
    dv = function () {}.constructor,
    gv = dv ? dv.prototype : null,
    vv = '__proto__',
    yv = 2311,
    mv = ov.createCanvas,
    _v = gv && T(gv.bind) ? gv.call.bind(gv.bind) : b,
    xv = '__ec_primitive__',
    wv = (function () {
      function t(e) {
        function n(t, e) {
          i ? r.set(t, e) : r.set(e, t);
        }
        this.data = {};
        var i = M(e);
        this.data = {};
        var r = this;
        e instanceof t ? e.each(n) : e && v(e, n);
      }
      return (
        (t.prototype.get = function (t) {
          return this.data.hasOwnProperty(t) ? this.data[t] : null;
        }),
        (t.prototype.set = function (t, e) {
          return (this.data[t] = e);
        }),
        (t.prototype.each = function (t, e) {
          for (var n in this.data) this.data.hasOwnProperty(n) && t.call(e, this.data[n], n);
        }),
        (t.prototype.keys = function () {
          return w(this.data);
        }),
        (t.prototype.removeKey = function (t) {
          delete this.data[t];
        }),
        t
      );
    })(),
    bv = 180 / Math.PI,
    Sv = (Object.freeze || Object)({
      guid: o,
      logError: a,
      clone: s,
      merge: l,
      mergeAll: u,
      extend: h,
      defaults: c,
      createCanvas: mv,
      indexOf: p,
      inherits: f,
      mixin: d,
      isArrayLike: g,
      each: v,
      map: y,
      reduce: m,
      filter: _,
      find: x,
      keys: w,
      bind: _v,
      curry: S,
      isArray: M,
      isFunction: T,
      isString: C,
      isStringSafe: k,
      isNumber: D,
      isObject: I,
      isBuiltInObject: A,
      isTypedArray: L,
      isDom: P,
      isGradientObject: O,
      isImagePatternObject: R,
      isRegExp: E,
      eqNaN: B,
      retrieve: z,
      retrieve2: N,
      retrieve3: F,
      slice: V,
      normalizeCssArray: H,
      assert: W,
      trim: G,
      setAsPrimitive: Z,
      isPrimitive: U,
      HashMap: wv,
      createHashMap: X,
      concatArray: Y,
      createObject: q,
      disableUserSelect: j,
      hasOwn: K,
      noop: $,
      RADIAN_TO_DEGREE: bv,
    }),
    Mv = oe,
    Tv = ae,
    Cv = pe,
    kv = fe,
    Dv = (Object.freeze || Object)({
      create: Q,
      copy: J,
      clone: te,
      set: ee,
      add: ne,
      scaleAndAdd: ie,
      sub: re,
      len: oe,
      length: Mv,
      lenSquare: ae,
      lengthSquare: Tv,
      mul: se,
      div: le,
      dot: ue,
      scale: he,
      normalize: ce,
      distance: pe,
      dist: Cv,
      distanceSquare: fe,
      distSquare: kv,
      negate: de,
      lerp: ge,
      applyTransform: ve,
      min: ye,
      max: me,
    }),
    Iv = (function () {
      function t(t, e) {
        (this.target = t), (this.topTarget = e && e.topTarget);
      }
      return t;
    })(),
    Av = (function () {
      function t(t) {
        (this.handler = t),
          t.on('mousedown', this._dragStart, this),
          t.on('mousemove', this._drag, this),
          t.on('mouseup', this._dragEnd, this);
      }
      return (
        (t.prototype._dragStart = function (t) {
          for (var e = t.target; e && !e.draggable; ) e = e.parent || e.__hostTarget;
          e &&
            ((this._draggingTarget = e),
            (e.dragging = !0),
            (this._x = t.offsetX),
            (this._y = t.offsetY),
            this.handler.dispatchToElement(new Iv(e, t), 'dragstart', t.event));
        }),
        (t.prototype._drag = function (t) {
          var e = this._draggingTarget;
          if (e) {
            var n = t.offsetX,
              i = t.offsetY,
              r = n - this._x,
              o = i - this._y;
            (this._x = n),
              (this._y = i),
              e.drift(r, o, t),
              this.handler.dispatchToElement(new Iv(e, t), 'drag', t.event);
            var a = this.handler.findHover(n, i, e).target,
              s = this._dropTarget;
            (this._dropTarget = a),
              e !== a &&
                (s && a !== s && this.handler.dispatchToElement(new Iv(s, t), 'dragleave', t.event),
                a && a !== s && this.handler.dispatchToElement(new Iv(a, t), 'dragenter', t.event));
          }
        }),
        (t.prototype._dragEnd = function (t) {
          var e = this._draggingTarget;
          e && (e.dragging = !1),
            this.handler.dispatchToElement(new Iv(e, t), 'dragend', t.event),
            this._dropTarget &&
              this.handler.dispatchToElement(new Iv(this._dropTarget, t), 'drop', t.event),
            (this._draggingTarget = null),
            (this._dropTarget = null);
        }),
        t
      );
    })(),
    Lv = (function () {
      function t(t) {
        t && (this._$eventProcessor = t);
      }
      return (
        (t.prototype.on = function (t, e, n, i) {
          this._$handlers || (this._$handlers = {});
          var r = this._$handlers;
          if (('function' == typeof e && ((i = n), (n = e), (e = null)), !n || !t)) return this;
          var o = this._$eventProcessor;
          null != e && o && o.normalizeQuery && (e = o.normalizeQuery(e)), r[t] || (r[t] = []);
          for (var a = 0; a < r[t].length; a++) if (r[t][a].h === n) return this;
          var s = { h: n, query: e, ctx: i || this, callAtLast: n.zrEventfulCallAtLast },
            l = r[t].length - 1,
            u = r[t][l];
          return u && u.callAtLast ? r[t].splice(l, 0, s) : r[t].push(s), this;
        }),
        (t.prototype.isSilent = function (t) {
          var e = this._$handlers;
          return !e || !e[t] || !e[t].length;
        }),
        (t.prototype.off = function (t, e) {
          var n = this._$handlers;
          if (!n) return this;
          if (!t) return (this._$handlers = {}), this;
          if (e) {
            if (n[t]) {
              for (var i = [], r = 0, o = n[t].length; o > r; r++)
                n[t][r].h !== e && i.push(n[t][r]);
              n[t] = i;
            }
            n[t] && 0 === n[t].length && delete n[t];
          } else delete n[t];
          return this;
        }),
        (t.prototype.trigger = function (t) {
          for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
          if (!this._$handlers) return this;
          var i = this._$handlers[t],
            r = this._$eventProcessor;
          if (i)
            for (var o = e.length, a = i.length, s = 0; a > s; s++) {
              var l = i[s];
              if (!r || !r.filter || null == l.query || r.filter(t, l.query))
                switch (o) {
                  case 0:
                    l.h.call(l.ctx);
                    break;
                  case 1:
                    l.h.call(l.ctx, e[0]);
                    break;
                  case 2:
                    l.h.call(l.ctx, e[0], e[1]);
                    break;
                  default:
                    l.h.apply(l.ctx, e);
                }
            }
          return r && r.afterTrigger && r.afterTrigger(t), this;
        }),
        (t.prototype.triggerWithContext = function (t) {
          for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
          if (!this._$handlers) return this;
          var i = this._$handlers[t],
            r = this._$eventProcessor;
          if (i)
            for (var o = e.length, a = e[o - 1], s = i.length, l = 0; s > l; l++) {
              var u = i[l];
              if (!r || !r.filter || null == u.query || r.filter(t, u.query))
                switch (o) {
                  case 0:
                    u.h.call(a);
                    break;
                  case 1:
                    u.h.call(a, e[0]);
                    break;
                  case 2:
                    u.h.call(a, e[0], e[1]);
                    break;
                  default:
                    u.h.apply(a, e.slice(1, o - 1));
                }
            }
          return r && r.afterTrigger && r.afterTrigger(t), this;
        }),
        t
      );
    })(),
    Pv = Math.log(2),
    Ov = '___zrEVENTSAVED',
    Rv = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    Ev = [],
    Bv = $g.browser.firefox && +$g.browser.version.split('.')[0] < 39,
    zv = function (t) {
      t.preventDefault(), t.stopPropagation(), (t.cancelBubble = !0);
    },
    Nv = (function () {
      function t() {
        this._track = [];
      }
      return (
        (t.prototype.recognize = function (t, e, n) {
          return this._doTrack(t, e, n), this._recognize(t);
        }),
        (t.prototype.clear = function () {
          return (this._track.length = 0), this;
        }),
        (t.prototype._doTrack = function (t, e, n) {
          var i = t.touches;
          if (i) {
            for (
              var r = { points: [], touches: [], target: e, event: t }, o = 0, a = i.length;
              a > o;
              o++
            ) {
              var s = i[o],
                l = Te(n, s, {});
              r.points.push([l.zrX, l.zrY]), r.touches.push(s);
            }
            this._track.push(r);
          }
        }),
        (t.prototype._recognize = function (t) {
          for (var e in Fv)
            if (Fv.hasOwnProperty(e)) {
              var n = Fv[e](this._track, t);
              if (n) return n;
            }
        }),
        t
      );
    })(),
    Fv = {
      pinch: function (t, e) {
        var n = t.length;
        if (n) {
          var i = (t[n - 1] || {}).points,
            r = (t[n - 2] || {}).points || i;
          if (r && r.length > 1 && i && i.length > 1) {
            var o = Oe(i) / Oe(r);
            !isFinite(o) && (o = 1), (e.pinchScale = o);
            var a = Re(i);
            return (
              (e.pinchX = a[0]), (e.pinchY = a[1]), { type: 'pinch', target: t[0].target, event: e }
            );
          }
        }
      },
    },
    Vv = 'silent',
    Hv = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.handler = null), e;
      }
      return (
        e(n, t), (n.prototype.dispose = function () {}), (n.prototype.setCursor = function () {}), n
      );
    })(Lv),
    Wv = (function () {
      function t(t, e) {
        (this.x = t), (this.y = e);
      }
      return t;
    })(),
    Gv = [
      'click',
      'dblclick',
      'mousewheel',
      'mouseout',
      'mouseup',
      'mousedown',
      'mousemove',
      'contextmenu',
    ],
    Zv = (function (t) {
      function n(e, n, i, r) {
        var o = t.call(this) || this;
        return (
          (o._hovered = new Wv(0, 0)),
          (o.storage = e),
          (o.painter = n),
          (o.painterRoot = r),
          (i = i || new Hv()),
          (o.proxy = null),
          o.setHandlerProxy(i),
          (o._draggingMgr = new Av(o)),
          o
        );
      }
      return (
        e(n, t),
        (n.prototype.setHandlerProxy = function (t) {
          this.proxy && this.proxy.dispose(),
            t &&
              (v(
                Gv,
                function (e) {
                  t.on && t.on(e, this[e], this);
                },
                this
              ),
              (t.handler = this)),
            (this.proxy = t);
        }),
        (n.prototype.mousemove = function (t) {
          var e = t.zrX,
            n = t.zrY,
            i = Ne(this, e, n),
            r = this._hovered,
            o = r.target;
          o && !o.__zr && ((r = this.findHover(r.x, r.y)), (o = r.target));
          var a = (this._hovered = i ? new Wv(e, n) : this.findHover(e, n)),
            s = a.target,
            l = this.proxy;
          l.setCursor && l.setCursor(s ? s.cursor : 'default'),
            o && s !== o && this.dispatchToElement(r, 'mouseout', t),
            this.dispatchToElement(a, 'mousemove', t),
            s && s !== o && this.dispatchToElement(a, 'mouseover', t);
        }),
        (n.prototype.mouseout = function (t) {
          var e = t.zrEventControl;
          'only_globalout' !== e && this.dispatchToElement(this._hovered, 'mouseout', t),
            'no_globalout' !== e && this.trigger('globalout', { type: 'globalout', event: t });
        }),
        (n.prototype.resize = function () {
          this._hovered = new Wv(0, 0);
        }),
        (n.prototype.dispatch = function (t, e) {
          var n = this[t];
          n && n.call(this, e);
        }),
        (n.prototype.dispose = function () {
          this.proxy.dispose(), (this.storage = null), (this.proxy = null), (this.painter = null);
        }),
        (n.prototype.setCursorStyle = function (t) {
          var e = this.proxy;
          e.setCursor && e.setCursor(t);
        }),
        (n.prototype.dispatchToElement = function (t, e, n) {
          t = t || {};
          var i = t.target;
          if (!i || !i.silent) {
            for (
              var r = 'on' + e, o = Ee(e, t, n);
              i &&
              (i[r] && (o.cancelBubble = !!i[r].call(i, o)),
              i.trigger(e, o),
              (i = i.__hostTarget ? i.__hostTarget : i.parent),
              !o.cancelBubble);

            );
            o.cancelBubble ||
              (this.trigger(e, o),
              this.painter &&
                this.painter.eachOtherLayer &&
                this.painter.eachOtherLayer(function (t) {
                  'function' == typeof t[r] && t[r].call(t, o), t.trigger && t.trigger(e, o);
                }));
          }
        }),
        (n.prototype.findHover = function (t, e, n) {
          for (
            var i = this.storage.getDisplayList(), r = new Wv(t, e), o = i.length - 1;
            o >= 0;
            o--
          ) {
            var a = void 0;
            if (
              i[o] !== n &&
              !i[o].ignore &&
              (a = ze(i[o], t, e)) &&
              (!r.topTarget && (r.topTarget = i[o]), a !== Vv)
            ) {
              r.target = i[o];
              break;
            }
          }
          return r;
        }),
        (n.prototype.processGesture = function (t, e) {
          this._gestureMgr || (this._gestureMgr = new Nv());
          var n = this._gestureMgr;
          'start' === e && n.clear();
          var i = n.recognize(t, this.findHover(t.zrX, t.zrY, null).target, this.proxy.dom);
          if (('end' === e && n.clear(), i)) {
            var r = i.type;
            t.gestureEvent = r;
            var o = new Wv();
            (o.target = i.target), this.dispatchToElement(o, r, i.event);
          }
        }),
        n
      );
    })(Lv);
  v(['click', 'mousedown', 'mouseup', 'mousewheel', 'dblclick', 'contextmenu'], function (t) {
    Zv.prototype[t] = function (e) {
      var n,
        i,
        r = e.zrX,
        o = e.zrY,
        a = Ne(this, r, o);
      if (
        (('mouseup' === t && a) || ((n = this.findHover(r, o)), (i = n.target)), 'mousedown' === t)
      )
        (this._downEl = i), (this._downPoint = [e.zrX, e.zrY]), (this._upEl = i);
      else if ('mouseup' === t) this._upEl = i;
      else if ('click' === t) {
        if (
          this._downEl !== this._upEl ||
          !this._downPoint ||
          Cv(this._downPoint, [e.zrX, e.zrY]) > 4
        )
          return;
        this._downPoint = null;
      }
      this.dispatchToElement(n, t, e);
    };
  });
  var Uv,
    Xv = 32,
    Yv = 7,
    qv = 1,
    jv = 2,
    Kv = 4,
    $v = !1,
    Qv = (function () {
      function t() {
        (this._roots = []),
          (this._displayList = []),
          (this._displayListLen = 0),
          (this.displayableSortFunc = qe);
      }
      return (
        (t.prototype.traverse = function (t, e) {
          for (var n = 0; n < this._roots.length; n++) this._roots[n].traverse(t, e);
        }),
        (t.prototype.getDisplayList = function (t, e) {
          e = e || !1;
          var n = this._displayList;
          return (t || !n.length) && this.updateDisplayList(e), n;
        }),
        (t.prototype.updateDisplayList = function (t) {
          this._displayListLen = 0;
          for (var e = this._roots, n = this._displayList, i = 0, r = e.length; r > i; i++)
            this._updateAndAddDisplayable(e[i], null, t);
          (n.length = this._displayListLen), Xe(n, qe);
        }),
        (t.prototype._updateAndAddDisplayable = function (t, e, n) {
          if (!t.ignore || n) {
            t.beforeUpdate(), t.update(), t.afterUpdate();
            var i = t.getClipPath();
            if (t.ignoreClip) e = null;
            else if (i) {
              e = e ? e.slice() : [];
              for (var r = i, o = t; r; )
                (r.parent = o), r.updateTransform(), e.push(r), (o = r), (r = r.getClipPath());
            }
            if (t.childrenRef) {
              for (var a = t.childrenRef(), s = 0; s < a.length; s++) {
                var l = a[s];
                t.__dirty && (l.__dirty |= qv), this._updateAndAddDisplayable(l, e, n);
              }
              t.__dirty = 0;
            } else {
              var u = t;
              e && e.length
                ? (u.__clipPaths = e)
                : u.__clipPaths && u.__clipPaths.length > 0 && (u.__clipPaths = []),
                isNaN(u.z) && (Ye(), (u.z = 0)),
                isNaN(u.z2) && (Ye(), (u.z2 = 0)),
                isNaN(u.zlevel) && (Ye(), (u.zlevel = 0)),
                (this._displayList[this._displayListLen++] = u);
            }
            var h = t.getDecalElement && t.getDecalElement();
            h && this._updateAndAddDisplayable(h, e, n);
            var c = t.getTextGuideLine();
            c && this._updateAndAddDisplayable(c, e, n);
            var p = t.getTextContent();
            p && this._updateAndAddDisplayable(p, e, n);
          }
        }),
        (t.prototype.addRoot = function (t) {
          (t.__zr && t.__zr.storage === this) || this._roots.push(t);
        }),
        (t.prototype.delRoot = function (t) {
          if (t instanceof Array) for (var e = 0, n = t.length; n > e; e++) this.delRoot(t[e]);
          else {
            var i = p(this._roots, t);
            i >= 0 && this._roots.splice(i, 1);
          }
        }),
        (t.prototype.delAllRoots = function () {
          (this._roots = []), (this._displayList = []), (this._displayListLen = 0);
        }),
        (t.prototype.getRoots = function () {
          return this._roots;
        }),
        (t.prototype.dispose = function () {
          (this._displayList = null), (this._roots = null);
        }),
        t
      );
    })();
  Uv =
    ($g.hasGlobalWindow &&
      ((window.requestAnimationFrame && window.requestAnimationFrame.bind(window)) ||
        (window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window)) ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame)) ||
    function (t) {
      return setTimeout(t, 16);
    };
  var Jv = Uv,
    ty = {
      linear: function (t) {
        return t;
      },
      quadraticIn: function (t) {
        return t * t;
      },
      quadraticOut: function (t) {
        return t * (2 - t);
      },
      quadraticInOut: function (t) {
        return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
      },
      cubicIn: function (t) {
        return t * t * t;
      },
      cubicOut: function (t) {
        return --t * t * t + 1;
      },
      cubicInOut: function (t) {
        return (t *= 2) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
      },
      quarticIn: function (t) {
        return t * t * t * t;
      },
      quarticOut: function (t) {
        return 1 - --t * t * t * t;
      },
      quarticInOut: function (t) {
        return (t *= 2) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
      },
      quinticIn: function (t) {
        return t * t * t * t * t;
      },
      quinticOut: function (t) {
        return --t * t * t * t * t + 1;
      },
      quinticInOut: function (t) {
        return (t *= 2) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2);
      },
      sinusoidalIn: function (t) {
        return 1 - Math.cos((t * Math.PI) / 2);
      },
      sinusoidalOut: function (t) {
        return Math.sin((t * Math.PI) / 2);
      },
      sinusoidalInOut: function (t) {
        return 0.5 * (1 - Math.cos(Math.PI * t));
      },
      exponentialIn: function (t) {
        return 0 === t ? 0 : Math.pow(1024, t - 1);
      },
      exponentialOut: function (t) {
        return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
      },
      exponentialInOut: function (t) {
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : (t *= 2) < 1
          ? 0.5 * Math.pow(1024, t - 1)
          : 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
      },
      circularIn: function (t) {
        return 1 - Math.sqrt(1 - t * t);
      },
      circularOut: function (t) {
        return Math.sqrt(1 - --t * t);
      },
      circularInOut: function (t) {
        return (t *= 2) < 1
          ? -0.5 * (Math.sqrt(1 - t * t) - 1)
          : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
      },
      elasticIn: function (t) {
        var e,
          n = 0.1,
          i = 0.4;
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : (!n || 1 > n ? ((n = 1), (e = i / 4)) : (e = (i * Math.asin(1 / n)) / (2 * Math.PI)),
            -(n * Math.pow(2, 10 * (t -= 1)) * Math.sin((2 * (t - e) * Math.PI) / i)));
      },
      elasticOut: function (t) {
        var e,
          n = 0.1,
          i = 0.4;
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : (!n || 1 > n ? ((n = 1), (e = i / 4)) : (e = (i * Math.asin(1 / n)) / (2 * Math.PI)),
            n * Math.pow(2, -10 * t) * Math.sin((2 * (t - e) * Math.PI) / i) + 1);
      },
      elasticInOut: function (t) {
        var e,
          n = 0.1,
          i = 0.4;
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : (!n || 1 > n ? ((n = 1), (e = i / 4)) : (e = (i * Math.asin(1 / n)) / (2 * Math.PI)),
            (t *= 2) < 1
              ? -0.5 * n * Math.pow(2, 10 * (t -= 1)) * Math.sin((2 * (t - e) * Math.PI) / i)
              : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((2 * (t - e) * Math.PI) / i) * 0.5 + 1);
      },
      backIn: function (t) {
        var e = 1.70158;
        return t * t * ((e + 1) * t - e);
      },
      backOut: function (t) {
        var e = 1.70158;
        return --t * t * ((e + 1) * t + e) + 1;
      },
      backInOut: function (t) {
        var e = 2.5949095;
        return (t *= 2) < 1
          ? 0.5 * t * t * ((e + 1) * t - e)
          : 0.5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
      },
      bounceIn: function (t) {
        return 1 - ty.bounceOut(1 - t);
      },
      bounceOut: function (t) {
        return 1 / 2.75 > t
          ? 7.5625 * t * t
          : 2 / 2.75 > t
          ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
          : 2.5 / 2.75 > t
          ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
          : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      },
      bounceInOut: function (t) {
        return 0.5 > t ? 0.5 * ty.bounceIn(2 * t) : 0.5 * ty.bounceOut(2 * t - 1) + 0.5;
      },
    },
    ey = Math.pow,
    ny = Math.sqrt,
    iy = 1e-8,
    ry = 1e-4,
    oy = ny(3),
    ay = 1 / 3,
    sy = Q(),
    ly = Q(),
    uy = Q(),
    hy = /cubic-bezier\(([0-9,\.e ]+)\)/,
    cy = (function () {
      function t(t) {
        (this._inited = !1),
          (this._startTime = 0),
          (this._pausedTime = 0),
          (this._paused = !1),
          (this._life = t.life || 1e3),
          (this._delay = t.delay || 0),
          (this.loop = t.loop || !1),
          (this.onframe = t.onframe || $),
          (this.ondestroy = t.ondestroy || $),
          (this.onrestart = t.onrestart || $),
          t.easing && this.setEasing(t.easing);
      }
      return (
        (t.prototype.step = function (t, e) {
          if (
            (this._inited || ((this._startTime = t + this._delay), (this._inited = !0)),
            this._paused)
          )
            return void (this._pausedTime += e);
          var n = this._life,
            i = t - this._startTime - this._pausedTime,
            r = i / n;
          0 > r && (r = 0), (r = Math.min(r, 1));
          var o = this.easingFunc,
            a = o ? o(r) : r;
          if ((this.onframe(a), 1 === r)) {
            if (!this.loop) return !0;
            var s = i % n;
            (this._startTime = t - s), (this._pausedTime = 0), this.onrestart();
          }
          return !1;
        }),
        (t.prototype.pause = function () {
          this._paused = !0;
        }),
        (t.prototype.resume = function () {
          this._paused = !1;
        }),
        (t.prototype.setEasing = function (t) {
          (this.easing = t), (this.easingFunc = T(t) ? t : ty[t] || pn(t));
        }),
        t
      );
    })(),
    py = (function () {
      function t(t) {
        this.value = t;
      }
      return t;
    })(),
    fy = (function () {
      function t() {
        this._len = 0;
      }
      return (
        (t.prototype.insert = function (t) {
          var e = new py(t);
          return this.insertEntry(e), e;
        }),
        (t.prototype.insertEntry = function (t) {
          this.head
            ? ((this.tail.next = t), (t.prev = this.tail), (t.next = null), (this.tail = t))
            : (this.head = this.tail = t),
            this._len++;
        }),
        (t.prototype.remove = function (t) {
          var e = t.prev,
            n = t.next;
          e ? (e.next = n) : (this.head = n),
            n ? (n.prev = e) : (this.tail = e),
            (t.next = t.prev = null),
            this._len--;
        }),
        (t.prototype.len = function () {
          return this._len;
        }),
        (t.prototype.clear = function () {
          (this.head = this.tail = null), (this._len = 0);
        }),
        t
      );
    })(),
    dy = (function () {
      function t(t) {
        (this._list = new fy()), (this._maxSize = 10), (this._map = {}), (this._maxSize = t);
      }
      return (
        (t.prototype.put = function (t, e) {
          var n = this._list,
            i = this._map,
            r = null;
          if (null == i[t]) {
            var o = n.len(),
              a = this._lastRemovedEntry;
            if (o >= this._maxSize && o > 0) {
              var s = n.head;
              n.remove(s), delete i[s.key], (r = s.value), (this._lastRemovedEntry = s);
            }
            a ? (a.value = e) : (a = new py(e)), (a.key = t), n.insertEntry(a), (i[t] = a);
          }
          return r;
        }),
        (t.prototype.get = function (t) {
          var e = this._map[t],
            n = this._list;
          return null != e ? (e !== n.tail && (n.remove(e), n.insertEntry(e)), e.value) : void 0;
        }),
        (t.prototype.clear = function () {
          this._list.clear(), (this._map = {});
        }),
        (t.prototype.len = function () {
          return this._list.len();
        }),
        t
      );
    })(),
    gy = {
      transparent: [0, 0, 0, 0],
      aliceblue: [240, 248, 255, 1],
      antiquewhite: [250, 235, 215, 1],
      aqua: [0, 255, 255, 1],
      aquamarine: [127, 255, 212, 1],
      azure: [240, 255, 255, 1],
      beige: [245, 245, 220, 1],
      bisque: [255, 228, 196, 1],
      black: [0, 0, 0, 1],
      blanchedalmond: [255, 235, 205, 1],
      blue: [0, 0, 255, 1],
      blueviolet: [138, 43, 226, 1],
      brown: [165, 42, 42, 1],
      burlywood: [222, 184, 135, 1],
      cadetblue: [95, 158, 160, 1],
      chartreuse: [127, 255, 0, 1],
      chocolate: [210, 105, 30, 1],
      coral: [255, 127, 80, 1],
      cornflowerblue: [100, 149, 237, 1],
      cornsilk: [255, 248, 220, 1],
      crimson: [220, 20, 60, 1],
      cyan: [0, 255, 255, 1],
      darkblue: [0, 0, 139, 1],
      darkcyan: [0, 139, 139, 1],
      darkgoldenrod: [184, 134, 11, 1],
      darkgray: [169, 169, 169, 1],
      darkgreen: [0, 100, 0, 1],
      darkgrey: [169, 169, 169, 1],
      darkkhaki: [189, 183, 107, 1],
      darkmagenta: [139, 0, 139, 1],
      darkolivegreen: [85, 107, 47, 1],
      darkorange: [255, 140, 0, 1],
      darkorchid: [153, 50, 204, 1],
      darkred: [139, 0, 0, 1],
      darksalmon: [233, 150, 122, 1],
      darkseagreen: [143, 188, 143, 1],
      darkslateblue: [72, 61, 139, 1],
      darkslategray: [47, 79, 79, 1],
      darkslategrey: [47, 79, 79, 1],
      darkturquoise: [0, 206, 209, 1],
      darkviolet: [148, 0, 211, 1],
      deeppink: [255, 20, 147, 1],
      deepskyblue: [0, 191, 255, 1],
      dimgray: [105, 105, 105, 1],
      dimgrey: [105, 105, 105, 1],
      dodgerblue: [30, 144, 255, 1],
      firebrick: [178, 34, 34, 1],
      floralwhite: [255, 250, 240, 1],
      forestgreen: [34, 139, 34, 1],
      fuchsia: [255, 0, 255, 1],
      gainsboro: [220, 220, 220, 1],
      ghostwhite: [248, 248, 255, 1],
      gold: [255, 215, 0, 1],
      goldenrod: [218, 165, 32, 1],
      gray: [128, 128, 128, 1],
      green: [0, 128, 0, 1],
      greenyellow: [173, 255, 47, 1],
      grey: [128, 128, 128, 1],
      honeydew: [240, 255, 240, 1],
      hotpink: [255, 105, 180, 1],
      indianred: [205, 92, 92, 1],
      indigo: [75, 0, 130, 1],
      ivory: [255, 255, 240, 1],
      khaki: [240, 230, 140, 1],
      lavender: [230, 230, 250, 1],
      lavenderblush: [255, 240, 245, 1],
      lawngreen: [124, 252, 0, 1],
      lemonchiffon: [255, 250, 205, 1],
      lightblue: [173, 216, 230, 1],
      lightcoral: [240, 128, 128, 1],
      lightcyan: [224, 255, 255, 1],
      lightgoldenrodyellow: [250, 250, 210, 1],
      lightgray: [211, 211, 211, 1],
      lightgreen: [144, 238, 144, 1],
      lightgrey: [211, 211, 211, 1],
      lightpink: [255, 182, 193, 1],
      lightsalmon: [255, 160, 122, 1],
      lightseagreen: [32, 178, 170, 1],
      lightskyblue: [135, 206, 250, 1],
      lightslategray: [119, 136, 153, 1],
      lightslategrey: [119, 136, 153, 1],
      lightsteelblue: [176, 196, 222, 1],
      lightyellow: [255, 255, 224, 1],
      lime: [0, 255, 0, 1],
      limegreen: [50, 205, 50, 1],
      linen: [250, 240, 230, 1],
      magenta: [255, 0, 255, 1],
      maroon: [128, 0, 0, 1],
      mediumaquamarine: [102, 205, 170, 1],
      mediumblue: [0, 0, 205, 1],
      mediumorchid: [186, 85, 211, 1],
      mediumpurple: [147, 112, 219, 1],
      mediumseagreen: [60, 179, 113, 1],
      mediumslateblue: [123, 104, 238, 1],
      mediumspringgreen: [0, 250, 154, 1],
      mediumturquoise: [72, 209, 204, 1],
      mediumvioletred: [199, 21, 133, 1],
      midnightblue: [25, 25, 112, 1],
      mintcream: [245, 255, 250, 1],
      mistyrose: [255, 228, 225, 1],
      moccasin: [255, 228, 181, 1],
      navajowhite: [255, 222, 173, 1],
      navy: [0, 0, 128, 1],
      oldlace: [253, 245, 230, 1],
      olive: [128, 128, 0, 1],
      olivedrab: [107, 142, 35, 1],
      orange: [255, 165, 0, 1],
      orangered: [255, 69, 0, 1],
      orchid: [218, 112, 214, 1],
      palegoldenrod: [238, 232, 170, 1],
      palegreen: [152, 251, 152, 1],
      paleturquoise: [175, 238, 238, 1],
      palevioletred: [219, 112, 147, 1],
      papayawhip: [255, 239, 213, 1],
      peachpuff: [255, 218, 185, 1],
      peru: [205, 133, 63, 1],
      pink: [255, 192, 203, 1],
      plum: [221, 160, 221, 1],
      powderblue: [176, 224, 230, 1],
      purple: [128, 0, 128, 1],
      red: [255, 0, 0, 1],
      rosybrown: [188, 143, 143, 1],
      royalblue: [65, 105, 225, 1],
      saddlebrown: [139, 69, 19, 1],
      salmon: [250, 128, 114, 1],
      sandybrown: [244, 164, 96, 1],
      seagreen: [46, 139, 87, 1],
      seashell: [255, 245, 238, 1],
      sienna: [160, 82, 45, 1],
      silver: [192, 192, 192, 1],
      skyblue: [135, 206, 235, 1],
      slateblue: [106, 90, 205, 1],
      slategray: [112, 128, 144, 1],
      slategrey: [112, 128, 144, 1],
      snow: [255, 250, 250, 1],
      springgreen: [0, 255, 127, 1],
      steelblue: [70, 130, 180, 1],
      tan: [210, 180, 140, 1],
      teal: [0, 128, 128, 1],
      thistle: [216, 191, 216, 1],
      tomato: [255, 99, 71, 1],
      turquoise: [64, 224, 208, 1],
      violet: [238, 130, 238, 1],
      wheat: [245, 222, 179, 1],
      white: [255, 255, 255, 1],
      whitesmoke: [245, 245, 245, 1],
      yellow: [255, 255, 0, 1],
      yellowgreen: [154, 205, 50, 1],
    },
    vy = new dy(20),
    yy = null,
    my = Dn,
    _y = In,
    xy = (Object.freeze || Object)({
      parse: Sn,
      lift: Cn,
      toHex: kn,
      fastLerp: Dn,
      fastMapToColor: my,
      lerp: In,
      mapToColor: _y,
      modifyHSL: An,
      modifyAlpha: Ln,
      stringify: Pn,
      lum: On,
      random: Rn,
    }),
    wy =
      ((function () {
        return $g.hasGlobalWindow && T(window.btoa)
          ? function (t) {
              return window.btoa(unescape(t));
            }
          : 'undefined' != typeof Buffer
          ? function (t) {
              return Buffer.from(t).toString('base64');
            }
          : function () {
              return null;
            };
      })(),
      Array.prototype.slice),
    by = 0,
    Sy = 1,
    My = 2,
    Ty = 3,
    Cy = 4,
    ky = 5,
    Dy = 6,
    Iy = [0, 0, 0, 0],
    Ay = (function () {
      function t(t) {
        (this.keyframes = []),
          (this.discrete = !1),
          (this._invalid = !1),
          (this._needsSort = !1),
          (this._lastFr = 0),
          (this._lastFrP = 0),
          (this.propName = t);
      }
      return (
        (t.prototype.isFinished = function () {
          return this._finished;
        }),
        (t.prototype.setFinished = function () {
          (this._finished = !0), this._additiveTrack && this._additiveTrack.setFinished();
        }),
        (t.prototype.needsAnimate = function () {
          return this.keyframes.length >= 1;
        }),
        (t.prototype.getAdditiveTrack = function () {
          return this._additiveTrack;
        }),
        (t.prototype.addKeyframe = function (t, e, n) {
          this._needsSort = !0;
          var i = this.keyframes,
            r = i.length,
            o = !1,
            a = Dy,
            s = e;
          if (g(e)) {
            var l = Xn(e);
            (a = l), ((1 === l && !D(e[0])) || (2 === l && !D(e[0][0]))) && (o = !0);
          } else if (D(e) && !B(e)) a = by;
          else if (C(e))
            if (isNaN(+e)) {
              var u = Sn(e);
              u && ((s = u), (a = Ty));
            } else a = by;
          else if (O(e)) {
            var c = h({}, s);
            (c.colorStops = y(e.colorStops, function (t) {
              return { offset: t.offset, color: Sn(t.color) };
            })),
              En(e) ? (a = Cy) : Bn(e) && (a = ky),
              (s = c);
          }
          0 === r ? (this.valType = a) : (a !== this.valType || a === Dy) && (o = !0),
            (this.discrete = this.discrete || o);
          var p = { time: t, value: s, rawValue: e, percent: 0 };
          return n && ((p.easing = n), (p.easingFunc = T(n) ? n : ty[n] || pn(n))), i.push(p), p;
        }),
        (t.prototype.prepare = function (t, e) {
          var n = this.keyframes;
          this._needsSort &&
            n.sort(function (t, e) {
              return t.time - e.time;
            });
          for (
            var i = this.valType,
              r = n.length,
              o = n[r - 1],
              a = this.discrete,
              s = qn(i),
              l = Yn(i),
              u = 0;
            r > u;
            u++
          ) {
            var h = n[u],
              c = h.value,
              p = o.value;
            (h.percent = h.time / t),
              a || (s && u !== r - 1 ? Gn(c, p, i) : l && Wn(c.colorStops, p.colorStops));
          }
          if (
            !a &&
            i !== ky &&
            e &&
            this.needsAnimate() &&
            e.needsAnimate() &&
            i === e.valType &&
            !e._finished
          ) {
            this._additiveTrack = e;
            for (var f = n[0].value, u = 0; r > u; u++)
              i === by
                ? (n[u].additiveValue = n[u].value - f)
                : i === Ty
                ? (n[u].additiveValue = Vn([], n[u].value, f, -1))
                : qn(i) &&
                  (n[u].additiveValue =
                    i === Sy ? Vn([], n[u].value, f, -1) : Hn([], n[u].value, f, -1));
          }
        }),
        (t.prototype.step = function (t, e) {
          if (!this._finished) {
            this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
            var n,
              i,
              r,
              o = null != this._additiveTrack,
              a = o ? 'additiveValue' : 'value',
              s = this.valType,
              l = this.keyframes,
              u = l.length,
              h = this.propName,
              c = s === Ty,
              p = this._lastFr,
              f = Math.min;
            if (1 === u) i = r = l[0];
            else {
              if (0 > e) n = 0;
              else if (e < this._lastFrP) {
                var d = f(p + 1, u - 1);
                for (n = d; n >= 0 && !(l[n].percent <= e); n--);
                n = f(n, u - 2);
              } else {
                for (n = p; u > n && !(l[n].percent > e); n++);
                n = f(n - 1, u - 2);
              }
              (r = l[n + 1]), (i = l[n]);
            }
            if (i && r) {
              (this._lastFr = n), (this._lastFrP = e);
              var g = r.percent - i.percent,
                v = 0 === g ? 1 : f((e - i.percent) / g, 1);
              r.easingFunc && (v = r.easingFunc(v));
              var m = o ? this._additiveValue : c ? Iy : t[h];
              if (((!qn(s) && !c) || m || (m = this._additiveValue = []), this.discrete))
                t[h] = 1 > v ? i.rawValue : r.rawValue;
              else if (qn(s)) s === Sy ? Nn(m, i[a], r[a], v) : Fn(m, i[a], r[a], v);
              else if (Yn(s)) {
                var _ = i[a],
                  x = r[a],
                  w = s === Cy;
                (t[h] = {
                  type: w ? 'linear' : 'radial',
                  x: zn(_.x, x.x, v),
                  y: zn(_.y, x.y, v),
                  colorStops: y(_.colorStops, function (t, e) {
                    var n = x.colorStops[e];
                    return {
                      offset: zn(t.offset, n.offset, v),
                      color: Un(Nn([], t.color, n.color, v)),
                    };
                  }),
                  global: x.global,
                }),
                  w
                    ? ((t[h].x2 = zn(_.x2, x.x2, v)), (t[h].y2 = zn(_.y2, x.y2, v)))
                    : (t[h].r = zn(_.r, x.r, v));
              } else if (c) Nn(m, i[a], r[a], v), o || (t[h] = Un(m));
              else {
                var b = zn(i[a], r[a], v);
                o ? (this._additiveValue = b) : (t[h] = b);
              }
              o && this._addToTarget(t);
            }
          }
        }),
        (t.prototype._addToTarget = function (t) {
          var e = this.valType,
            n = this.propName,
            i = this._additiveValue;
          e === by
            ? (t[n] = t[n] + i)
            : e === Ty
            ? (Sn(t[n], Iy), Vn(Iy, Iy, i, 1), (t[n] = Un(Iy)))
            : e === Sy
            ? Vn(t[n], t[n], i, 1)
            : e === My && Hn(t[n], t[n], i, 1);
        }),
        t
      );
    })(),
    Ly = (function () {
      function t(t, e, n, i) {
        return (
          (this._tracks = {}),
          (this._trackKeys = []),
          (this._maxTime = 0),
          (this._started = 0),
          (this._clip = null),
          (this._target = t),
          (this._loop = e),
          e && i
            ? void a("Can' use additive animation on looped animation.")
            : ((this._additiveAnimators = i), void (this._allowDiscrete = n))
        );
      }
      return (
        (t.prototype.getMaxTime = function () {
          return this._maxTime;
        }),
        (t.prototype.getDelay = function () {
          return this._delay;
        }),
        (t.prototype.getLoop = function () {
          return this._loop;
        }),
        (t.prototype.getTarget = function () {
          return this._target;
        }),
        (t.prototype.changeTarget = function (t) {
          this._target = t;
        }),
        (t.prototype.when = function (t, e, n) {
          return this.whenWithKeys(t, e, w(e), n);
        }),
        (t.prototype.whenWithKeys = function (t, e, n, i) {
          for (var r = this._tracks, o = 0; o < n.length; o++) {
            var a = n[o],
              s = r[a];
            if (!s) {
              s = r[a] = new Ay(a);
              var l = void 0,
                u = this._getAdditiveTrack(a);
              if (u) {
                var h = u.keyframes,
                  c = h[h.length - 1];
                (l = c && c.value), u.valType === Ty && l && (l = Un(l));
              } else l = this._target[a];
              if (null == l) continue;
              t > 0 && s.addKeyframe(0, Zn(l), i), this._trackKeys.push(a);
            }
            s.addKeyframe(t, Zn(e[a]), i);
          }
          return (this._maxTime = Math.max(this._maxTime, t)), this;
        }),
        (t.prototype.pause = function () {
          this._clip.pause(), (this._paused = !0);
        }),
        (t.prototype.resume = function () {
          this._clip.resume(), (this._paused = !1);
        }),
        (t.prototype.isPaused = function () {
          return !!this._paused;
        }),
        (t.prototype.duration = function (t) {
          return (this._maxTime = t), (this._force = !0), this;
        }),
        (t.prototype._doneCallback = function () {
          this._setTracksFinished(), (this._clip = null);
          var t = this._doneCbs;
          if (t) for (var e = t.length, n = 0; e > n; n++) t[n].call(this);
        }),
        (t.prototype._abortedCallback = function () {
          this._setTracksFinished();
          var t = this.animation,
            e = this._abortedCbs;
          if ((t && t.removeClip(this._clip), (this._clip = null), e))
            for (var n = 0; n < e.length; n++) e[n].call(this);
        }),
        (t.prototype._setTracksFinished = function () {
          for (var t = this._tracks, e = this._trackKeys, n = 0; n < e.length; n++)
            t[e[n]].setFinished();
        }),
        (t.prototype._getAdditiveTrack = function (t) {
          var e,
            n = this._additiveAnimators;
          if (n)
            for (var i = 0; i < n.length; i++) {
              var r = n[i].getTrack(t);
              r && (e = r);
            }
          return e;
        }),
        (t.prototype.start = function (t) {
          if (!(this._started > 0)) {
            this._started = 1;
            for (
              var e = this, n = [], i = this._maxTime || 0, r = 0;
              r < this._trackKeys.length;
              r++
            ) {
              var o = this._trackKeys[r],
                a = this._tracks[o],
                s = this._getAdditiveTrack(o),
                l = a.keyframes,
                u = l.length;
              if ((a.prepare(i, s), a.needsAnimate()))
                if (!this._allowDiscrete && a.discrete) {
                  var h = l[u - 1];
                  h && (e._target[a.propName] = h.rawValue), a.setFinished();
                } else n.push(a);
            }
            if (n.length || this._force) {
              var c = new cy({
                life: i,
                loop: this._loop,
                delay: this._delay || 0,
                onframe: function (t) {
                  e._started = 2;
                  var i = e._additiveAnimators;
                  if (i) {
                    for (var r = !1, o = 0; o < i.length; o++)
                      if (i[o]._clip) {
                        r = !0;
                        break;
                      }
                    r || (e._additiveAnimators = null);
                  }
                  for (var o = 0; o < n.length; o++) n[o].step(e._target, t);
                  var a = e._onframeCbs;
                  if (a) for (var o = 0; o < a.length; o++) a[o](e._target, t);
                },
                ondestroy: function () {
                  e._doneCallback();
                },
              });
              (this._clip = c), this.animation && this.animation.addClip(c), t && c.setEasing(t);
            } else this._doneCallback();
            return this;
          }
        }),
        (t.prototype.stop = function (t) {
          if (this._clip) {
            var e = this._clip;
            t && e.onframe(1), this._abortedCallback();
          }
        }),
        (t.prototype.delay = function (t) {
          return (this._delay = t), this;
        }),
        (t.prototype.during = function (t) {
          return t && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(t)), this;
        }),
        (t.prototype.done = function (t) {
          return t && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(t)), this;
        }),
        (t.prototype.aborted = function (t) {
          return t && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(t)), this;
        }),
        (t.prototype.getClip = function () {
          return this._clip;
        }),
        (t.prototype.getTrack = function (t) {
          return this._tracks[t];
        }),
        (t.prototype.getTracks = function () {
          var t = this;
          return y(this._trackKeys, function (e) {
            return t._tracks[e];
          });
        }),
        (t.prototype.stopTracks = function (t, e) {
          if (!t.length || !this._clip) return !0;
          for (var n = this._tracks, i = this._trackKeys, r = 0; r < t.length; r++) {
            var o = n[t[r]];
            o &&
              !o.isFinished() &&
              (e ? o.step(this._target, 1) : 1 === this._started && o.step(this._target, 0),
              o.setFinished());
          }
          for (var a = !0, r = 0; r < i.length; r++)
            if (!n[i[r]].isFinished()) {
              a = !1;
              break;
            }
          return a && this._abortedCallback(), a;
        }),
        (t.prototype.saveTo = function (t, e, n) {
          if (t) {
            e = e || this._trackKeys;
            for (var i = 0; i < e.length; i++) {
              var r = e[i],
                o = this._tracks[r];
              if (o && !o.isFinished()) {
                var a = o.keyframes,
                  s = a[n ? 0 : a.length - 1];
                s && (t[r] = Zn(s.rawValue));
              }
            }
          }
        }),
        (t.prototype.__changeFinalValue = function (t, e) {
          e = e || w(t);
          for (var n = 0; n < e.length; n++) {
            var i = e[n],
              r = this._tracks[i];
            if (r) {
              var o = r.keyframes;
              if (o.length > 1) {
                var a = o.pop();
                r.addKeyframe(a.time, t[i]), r.prepare(this._maxTime, r.getAdditiveTrack());
              }
            }
          }
        }),
        t
      );
    })(),
    Py = (function (t) {
      function n(e) {
        var n = t.call(this) || this;
        return (
          (n._running = !1),
          (n._time = 0),
          (n._pausedTime = 0),
          (n._pauseStart = 0),
          (n._paused = !1),
          (e = e || {}),
          (n.stage = e.stage || {}),
          n
        );
      }
      return (
        e(n, t),
        (n.prototype.addClip = function (t) {
          t.animation && this.removeClip(t),
            this._head
              ? ((this._tail.next = t), (t.prev = this._tail), (t.next = null), (this._tail = t))
              : (this._head = this._tail = t),
            (t.animation = this);
        }),
        (n.prototype.addAnimator = function (t) {
          t.animation = this;
          var e = t.getClip();
          e && this.addClip(e);
        }),
        (n.prototype.removeClip = function (t) {
          if (t.animation) {
            var e = t.prev,
              n = t.next;
            e ? (e.next = n) : (this._head = n),
              n ? (n.prev = e) : (this._tail = e),
              (t.next = t.prev = t.animation = null);
          }
        }),
        (n.prototype.removeAnimator = function (t) {
          var e = t.getClip();
          e && this.removeClip(e), (t.animation = null);
        }),
        (n.prototype.update = function (t) {
          for (var e = jn() - this._pausedTime, n = e - this._time, i = this._head; i; ) {
            var r = i.next,
              o = i.step(e, n);
            o ? (i.ondestroy(), this.removeClip(i), (i = r)) : (i = r);
          }
          (this._time = e),
            t || (this.trigger('frame', n), this.stage.update && this.stage.update());
        }),
        (n.prototype._startLoop = function () {
          function t() {
            e._running && (Jv(t), !e._paused && e.update());
          }
          var e = this;
          (this._running = !0), Jv(t);
        }),
        (n.prototype.start = function () {
          this._running || ((this._time = jn()), (this._pausedTime = 0), this._startLoop());
        }),
        (n.prototype.stop = function () {
          this._running = !1;
        }),
        (n.prototype.pause = function () {
          this._paused || ((this._pauseStart = jn()), (this._paused = !0));
        }),
        (n.prototype.resume = function () {
          this._paused && ((this._pausedTime += jn() - this._pauseStart), (this._paused = !1));
        }),
        (n.prototype.clear = function () {
          for (var t = this._head; t; ) {
            var e = t.next;
            (t.prev = t.next = t.animation = null), (t = e);
          }
          this._head = this._tail = null;
        }),
        (n.prototype.isFinished = function () {
          return null == this._head;
        }),
        (n.prototype.animate = function (t, e) {
          (e = e || {}), this.start();
          var n = new Ly(t, e.loop);
          return this.addAnimator(n), n;
        }),
        n
      );
    })(Lv),
    Oy = 300,
    Ry = $g.domSupported,
    Ey = (function () {
      var t = [
          'click',
          'dblclick',
          'mousewheel',
          'wheel',
          'mouseout',
          'mouseup',
          'mousedown',
          'mousemove',
          'contextmenu',
        ],
        e = ['touchstart', 'touchend', 'touchmove'],
        n = { pointerdown: 1, pointerup: 1, pointermove: 1, pointerout: 1 },
        i = y(t, function (t) {
          var e = t.replace('mouse', 'pointer');
          return n.hasOwnProperty(e) ? e : t;
        });
      return { mouse: t, touch: e, pointer: i };
    })(),
    By = { mouse: ['mousemove', 'mouseup'], pointer: ['pointermove', 'pointerup'] },
    zy = !1,
    Ny = (function () {
      function t(t, e) {
        (this.stopPropagation = $),
          (this.stopImmediatePropagation = $),
          (this.preventDefault = $),
          (this.type = e.type),
          (this.target = this.currentTarget = t.dom),
          (this.pointerType = e.pointerType),
          (this.clientX = e.clientX),
          (this.clientY = e.clientY);
      }
      return t;
    })(),
    Fy = {
      mousedown: function (t) {
        (t = De(this.dom, t)),
          (this.__mayPointerCapture = [t.zrX, t.zrY]),
          this.trigger('mousedown', t);
      },
      mousemove: function (t) {
        t = De(this.dom, t);
        var e = this.__mayPointerCapture;
        !e || (t.zrX === e[0] && t.zrY === e[1]) || this.__togglePointerCapture(!0),
          this.trigger('mousemove', t);
      },
      mouseup: function (t) {
        (t = De(this.dom, t)), this.__togglePointerCapture(!1), this.trigger('mouseup', t);
      },
      mouseout: function (t) {
        t = De(this.dom, t);
        var e = t.toElement || t.relatedTarget;
        ti(this, e) ||
          (this.__pointerCapturing && (t.zrEventControl = 'no_globalout'),
          this.trigger('mouseout', t));
      },
      wheel: function (t) {
        (zy = !0), (t = De(this.dom, t)), this.trigger('mousewheel', t);
      },
      mousewheel: function (t) {
        zy || ((t = De(this.dom, t)), this.trigger('mousewheel', t));
      },
      touchstart: function (t) {
        (t = De(this.dom, t)),
          Qn(t),
          (this.__lastTouchMoment = new Date()),
          this.handler.processGesture(t, 'start'),
          Fy.mousemove.call(this, t),
          Fy.mousedown.call(this, t);
      },
      touchmove: function (t) {
        (t = De(this.dom, t)),
          Qn(t),
          this.handler.processGesture(t, 'change'),
          Fy.mousemove.call(this, t);
      },
      touchend: function (t) {
        (t = De(this.dom, t)),
          Qn(t),
          this.handler.processGesture(t, 'end'),
          Fy.mouseup.call(this, t),
          +new Date() - +this.__lastTouchMoment < Oy && Fy.click.call(this, t);
      },
      pointerdown: function (t) {
        Fy.mousedown.call(this, t);
      },
      pointermove: function (t) {
        Kn(t) || Fy.mousemove.call(this, t);
      },
      pointerup: function (t) {
        Fy.mouseup.call(this, t);
      },
      pointerout: function (t) {
        Kn(t) || Fy.mouseout.call(this, t);
      },
    };
  v(['click', 'dblclick', 'contextmenu'], function (t) {
    Fy[t] = function (e) {
      (e = De(this.dom, e)), this.trigger(t, e);
    };
  });
  var Vy = {
      pointermove: function (t) {
        Kn(t) || Vy.mousemove.call(this, t);
      },
      pointerup: function (t) {
        Vy.mouseup.call(this, t);
      },
      mousemove: function (t) {
        this.trigger('mousemove', t);
      },
      mouseup: function (t) {
        var e = this.__pointerCapturing;
        this.__togglePointerCapture(!1),
          this.trigger('mouseup', t),
          e && ((t.zrEventControl = 'only_globalout'), this.trigger('mouseout', t));
      },
    },
    Hy = (function () {
      function t(t, e) {
        (this.mounted = {}),
          (this.listenerOpts = {}),
          (this.touching = !1),
          (this.domTarget = t),
          (this.domHandlers = e);
      }
      return t;
    })(),
    Wy = (function (t) {
      function n(e, n) {
        var i = t.call(this) || this;
        return (
          (i.__pointerCapturing = !1),
          (i.dom = e),
          (i.painterRoot = n),
          (i._localHandlerScope = new Hy(e, Fy)),
          Ry && (i._globalHandlerScope = new Hy(document, Vy)),
          ei(i, i._localHandlerScope),
          i
        );
      }
      return (
        e(n, t),
        (n.prototype.dispose = function () {
          ri(this._localHandlerScope), Ry && ri(this._globalHandlerScope);
        }),
        (n.prototype.setCursor = function (t) {
          this.dom.style && (this.dom.style.cursor = t || 'default');
        }),
        (n.prototype.__togglePointerCapture = function (t) {
          if (((this.__mayPointerCapture = null), Ry && +this.__pointerCapturing ^ +t)) {
            this.__pointerCapturing = t;
            var e = this._globalHandlerScope;
            t ? ni(this, e) : ri(e);
          }
        }),
        n
      );
    })(Lv),
    Gy = 1;
  $g.hasGlobalWindow &&
    (Gy = Math.max(
      window.devicePixelRatio ||
        (window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI) ||
        1,
      1
    ));
  var Zy = Gy,
    Uy = 0.4,
    Xy = '#333',
    Yy = '#ccc',
    qy = '#eee',
    jy = (Object.freeze || Object)({
      create: oi,
      identity: ai,
      copy: si,
      mul: li,
      translate: ui,
      rotate: hi,
      scale: ci,
      invert: pi,
      clone: fi,
    }),
    Ky = ai,
    $y = 5e-5,
    Qy = [],
    Jy = [],
    tm = oi(),
    em = Math.abs,
    nm = (function () {
      function t() {}
      return (
        (t.prototype.getLocalTransform = function (e) {
          return t.getLocalTransform(this, e);
        }),
        (t.prototype.setPosition = function (t) {
          (this.x = t[0]), (this.y = t[1]);
        }),
        (t.prototype.setScale = function (t) {
          (this.scaleX = t[0]), (this.scaleY = t[1]);
        }),
        (t.prototype.setSkew = function (t) {
          (this.skewX = t[0]), (this.skewY = t[1]);
        }),
        (t.prototype.setOrigin = function (t) {
          (this.originX = t[0]), (this.originY = t[1]);
        }),
        (t.prototype.needLocalTransform = function () {
          return (
            di(this.rotation) ||
            di(this.x) ||
            di(this.y) ||
            di(this.scaleX - 1) ||
            di(this.scaleY - 1) ||
            di(this.skewX) ||
            di(this.skewY)
          );
        }),
        (t.prototype.updateTransform = function () {
          var t = this.parent && this.parent.transform,
            e = this.needLocalTransform(),
            n = this.transform;
          return e || t
            ? ((n = n || oi()),
              e ? this.getLocalTransform(n) : Ky(n),
              t && (e ? li(n, t, n) : si(n, t)),
              (this.transform = n),
              void this._resolveGlobalScaleRatio(n))
            : void (n && Ky(n));
        }),
        (t.prototype._resolveGlobalScaleRatio = function (t) {
          var e = this.globalScaleRatio;
          if (null != e && 1 !== e) {
            this.getGlobalScale(Qy);
            var n = Qy[0] < 0 ? -1 : 1,
              i = Qy[1] < 0 ? -1 : 1,
              r = ((Qy[0] - n) * e + n) / Qy[0] || 0,
              o = ((Qy[1] - i) * e + i) / Qy[1] || 0;
            (t[0] *= r), (t[1] *= r), (t[2] *= o), (t[3] *= o);
          }
          (this.invTransform = this.invTransform || oi()), pi(this.invTransform, t);
        }),
        (t.prototype.getComputedTransform = function () {
          for (var t = this, e = []; t; ) e.push(t), (t = t.parent);
          for (; (t = e.pop()); ) t.updateTransform();
          return this.transform;
        }),
        (t.prototype.setLocalTransform = function (t) {
          if (t) {
            var e = t[0] * t[0] + t[1] * t[1],
              n = t[2] * t[2] + t[3] * t[3],
              i = Math.atan2(t[1], t[0]),
              r = Math.PI / 2 + i - Math.atan2(t[3], t[2]);
            (n = Math.sqrt(n) * Math.cos(r)),
              (e = Math.sqrt(e)),
              (this.skewX = r),
              (this.skewY = 0),
              (this.rotation = -i),
              (this.x = +t[4]),
              (this.y = +t[5]),
              (this.scaleX = e),
              (this.scaleY = n),
              (this.originX = 0),
              (this.originY = 0);
          }
        }),
        (t.prototype.decomposeTransform = function () {
          if (this.transform) {
            var t = this.parent,
              e = this.transform;
            t && t.transform && (li(Jy, t.invTransform, e), (e = Jy));
            var n = this.originX,
              i = this.originY;
            (n || i) &&
              ((tm[4] = n), (tm[5] = i), li(Jy, e, tm), (Jy[4] -= n), (Jy[5] -= i), (e = Jy)),
              this.setLocalTransform(e);
          }
        }),
        (t.prototype.getGlobalScale = function (t) {
          var e = this.transform;
          return (
            (t = t || []),
            e
              ? ((t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1])),
                (t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3])),
                e[0] < 0 && (t[0] = -t[0]),
                e[3] < 0 && (t[1] = -t[1]),
                t)
              : ((t[0] = 1), (t[1] = 1), t)
          );
        }),
        (t.prototype.transformCoordToLocal = function (t, e) {
          var n = [t, e],
            i = this.invTransform;
          return i && ve(n, n, i), n;
        }),
        (t.prototype.transformCoordToGlobal = function (t, e) {
          var n = [t, e],
            i = this.transform;
          return i && ve(n, n, i), n;
        }),
        (t.prototype.getLineScale = function () {
          var t = this.transform;
          return t && em(t[0] - 1) > 1e-10 && em(t[3] - 1) > 1e-10
            ? Math.sqrt(em(t[0] * t[3] - t[2] * t[1]))
            : 1;
        }),
        (t.prototype.copyTransform = function (t) {
          gi(this, t);
        }),
        (t.getLocalTransform = function (t, e) {
          e = e || [];
          var n = t.originX || 0,
            i = t.originY || 0,
            r = t.scaleX,
            o = t.scaleY,
            a = t.anchorX,
            s = t.anchorY,
            l = t.rotation || 0,
            u = t.x,
            h = t.y,
            c = t.skewX ? Math.tan(t.skewX) : 0,
            p = t.skewY ? Math.tan(-t.skewY) : 0;
          if (n || i || a || s) {
            var f = n + a,
              d = i + s;
            (e[4] = -f * r - c * d * o), (e[5] = -d * o - p * f * r);
          } else e[4] = e[5] = 0;
          return (
            (e[0] = r),
            (e[3] = o),
            (e[1] = p * r),
            (e[2] = c * o),
            l && hi(e, e, l),
            (e[4] += n + u),
            (e[5] += i + h),
            e
          );
        }),
        (t.initDefaultProps = (function () {
          var e = t.prototype;
          (e.scaleX = e.scaleY = e.globalScaleRatio = 1),
            (e.x =
              e.y =
              e.originX =
              e.originY =
              e.skewX =
              e.skewY =
              e.rotation =
              e.anchorX =
              e.anchorY =
                0);
        })()),
        t
      );
    })(),
    im = [
      'x',
      'y',
      'originX',
      'originY',
      'anchorX',
      'anchorY',
      'rotation',
      'scaleX',
      'scaleY',
      'skewX',
      'skewY',
    ],
    rm = (function () {
      function t(t, e) {
        (this.x = t || 0), (this.y = e || 0);
      }
      return (
        (t.prototype.copy = function (t) {
          return (this.x = t.x), (this.y = t.y), this;
        }),
        (t.prototype.clone = function () {
          return new t(this.x, this.y);
        }),
        (t.prototype.set = function (t, e) {
          return (this.x = t), (this.y = e), this;
        }),
        (t.prototype.equal = function (t) {
          return t.x === this.x && t.y === this.y;
        }),
        (t.prototype.add = function (t) {
          return (this.x += t.x), (this.y += t.y), this;
        }),
        (t.prototype.scale = function (t) {
          (this.x *= t), (this.y *= t);
        }),
        (t.prototype.scaleAndAdd = function (t, e) {
          (this.x += t.x * e), (this.y += t.y * e);
        }),
        (t.prototype.sub = function (t) {
          return (this.x -= t.x), (this.y -= t.y), this;
        }),
        (t.prototype.dot = function (t) {
          return this.x * t.x + this.y * t.y;
        }),
        (t.prototype.len = function () {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        }),
        (t.prototype.lenSquare = function () {
          return this.x * this.x + this.y * this.y;
        }),
        (t.prototype.normalize = function () {
          var t = this.len();
          return (this.x /= t), (this.y /= t), this;
        }),
        (t.prototype.distance = function (t) {
          var e = this.x - t.x,
            n = this.y - t.y;
          return Math.sqrt(e * e + n * n);
        }),
        (t.prototype.distanceSquare = function (t) {
          var e = this.x - t.x,
            n = this.y - t.y;
          return e * e + n * n;
        }),
        (t.prototype.negate = function () {
          return (this.x = -this.x), (this.y = -this.y), this;
        }),
        (t.prototype.transform = function (t) {
          if (t) {
            var e = this.x,
              n = this.y;
            return (
              (this.x = t[0] * e + t[2] * n + t[4]), (this.y = t[1] * e + t[3] * n + t[5]), this
            );
          }
        }),
        (t.prototype.toArray = function (t) {
          return (t[0] = this.x), (t[1] = this.y), t;
        }),
        (t.prototype.fromArray = function (t) {
          (this.x = t[0]), (this.y = t[1]);
        }),
        (t.set = function (t, e, n) {
          (t.x = e), (t.y = n);
        }),
        (t.copy = function (t, e) {
          (t.x = e.x), (t.y = e.y);
        }),
        (t.len = function (t) {
          return Math.sqrt(t.x * t.x + t.y * t.y);
        }),
        (t.lenSquare = function (t) {
          return t.x * t.x + t.y * t.y;
        }),
        (t.dot = function (t, e) {
          return t.x * e.x + t.y * e.y;
        }),
        (t.add = function (t, e, n) {
          (t.x = e.x + n.x), (t.y = e.y + n.y);
        }),
        (t.sub = function (t, e, n) {
          (t.x = e.x - n.x), (t.y = e.y - n.y);
        }),
        (t.scale = function (t, e, n) {
          (t.x = e.x * n), (t.y = e.y * n);
        }),
        (t.scaleAndAdd = function (t, e, n, i) {
          (t.x = e.x + n.x * i), (t.y = e.y + n.y * i);
        }),
        (t.lerp = function (t, e, n, i) {
          var r = 1 - i;
          (t.x = r * e.x + i * n.x), (t.y = r * e.y + i * n.y);
        }),
        t
      );
    })(),
    om = Math.min,
    am = Math.max,
    sm = new rm(),
    lm = new rm(),
    um = new rm(),
    hm = new rm(),
    cm = new rm(),
    pm = new rm(),
    fm = (function () {
      function t(t, e, n, i) {
        0 > n && ((t += n), (n = -n)),
          0 > i && ((e += i), (i = -i)),
          (this.x = t),
          (this.y = e),
          (this.width = n),
          (this.height = i);
      }
      return (
        (t.prototype.union = function (t) {
          var e = om(t.x, this.x),
            n = om(t.y, this.y);
          (this.width =
            isFinite(this.x) && isFinite(this.width)
              ? am(t.x + t.width, this.x + this.width) - e
              : t.width),
            (this.height =
              isFinite(this.y) && isFinite(this.height)
                ? am(t.y + t.height, this.y + this.height) - n
                : t.height),
            (this.x = e),
            (this.y = n);
        }),
        (t.prototype.applyTransform = function (e) {
          t.applyTransform(this, this, e);
        }),
        (t.prototype.calculateTransform = function (t) {
          var e = this,
            n = t.width / e.width,
            i = t.height / e.height,
            r = oi();
          return ui(r, r, [-e.x, -e.y]), ci(r, r, [n, i]), ui(r, r, [t.x, t.y]), r;
        }),
        (t.prototype.intersect = function (e, n) {
          if (!e) return !1;
          e instanceof t || (e = t.create(e));
          var i = this,
            r = i.x,
            o = i.x + i.width,
            a = i.y,
            s = i.y + i.height,
            l = e.x,
            u = e.x + e.width,
            h = e.y,
            c = e.y + e.height,
            p = !(l > o || r > u || h > s || a > c);
          if (n) {
            var f = 1 / 0,
              d = 0,
              g = Math.abs(o - l),
              v = Math.abs(u - r),
              y = Math.abs(s - h),
              m = Math.abs(c - a),
              _ = Math.min(g, v),
              x = Math.min(y, m);
            l > o || r > u
              ? _ > d && ((d = _), v > g ? rm.set(pm, -g, 0) : rm.set(pm, v, 0))
              : f > _ && ((f = _), v > g ? rm.set(cm, g, 0) : rm.set(cm, -v, 0)),
              h > s || a > c
                ? x > d && ((d = x), m > y ? rm.set(pm, 0, -y) : rm.set(pm, 0, m))
                : f > _ && ((f = _), m > y ? rm.set(cm, 0, y) : rm.set(cm, 0, -m));
          }
          return n && rm.copy(n, p ? cm : pm), p;
        }),
        (t.prototype.contain = function (t, e) {
          var n = this;
          return t >= n.x && t <= n.x + n.width && e >= n.y && e <= n.y + n.height;
        }),
        (t.prototype.clone = function () {
          return new t(this.x, this.y, this.width, this.height);
        }),
        (t.prototype.copy = function (e) {
          t.copy(this, e);
        }),
        (t.prototype.plain = function () {
          return { x: this.x, y: this.y, width: this.width, height: this.height };
        }),
        (t.prototype.isFinite = function () {
          return (
            isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height)
          );
        }),
        (t.prototype.isZero = function () {
          return 0 === this.width || 0 === this.height;
        }),
        (t.create = function (e) {
          return new t(e.x, e.y, e.width, e.height);
        }),
        (t.copy = function (t, e) {
          (t.x = e.x), (t.y = e.y), (t.width = e.width), (t.height = e.height);
        }),
        (t.applyTransform = function (e, n, i) {
          if (!i) return void (e !== n && t.copy(e, n));
          if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
            var r = i[0],
              o = i[3],
              a = i[4],
              s = i[5];
            return (
              (e.x = n.x * r + a),
              (e.y = n.y * o + s),
              (e.width = n.width * r),
              (e.height = n.height * o),
              e.width < 0 && ((e.x += e.width), (e.width = -e.width)),
              void (e.height < 0 && ((e.y += e.height), (e.height = -e.height)))
            );
          }
          (sm.x = um.x = n.x),
            (sm.y = hm.y = n.y),
            (lm.x = hm.x = n.x + n.width),
            (lm.y = um.y = n.y + n.height),
            sm.transform(i),
            hm.transform(i),
            lm.transform(i),
            um.transform(i),
            (e.x = om(sm.x, lm.x, um.x, hm.x)),
            (e.y = om(sm.y, lm.y, um.y, hm.y));
          var l = am(sm.x, lm.x, um.x, hm.x),
            u = am(sm.y, lm.y, um.y, hm.y);
          (e.width = l - e.x), (e.height = u - e.y);
        }),
        t
      );
    })(),
    dm = {},
    gm = '__zr_normal__',
    vm = im.concat(['ignore']),
    ym = m(
      im,
      function (t, e) {
        return (t[e] = !0), t;
      },
      { ignore: !1 }
    ),
    mm = {},
    _m = new fm(0, 0, 0, 0),
    xm = (function () {
      function t(t) {
        (this.id = o()),
          (this.animators = []),
          (this.currentStates = []),
          (this.states = {}),
          this._init(t);
      }
      return (
        (t.prototype._init = function (t) {
          this.attr(t);
        }),
        (t.prototype.drift = function (t, e) {
          switch (this.draggable) {
            case 'horizontal':
              e = 0;
              break;
            case 'vertical':
              t = 0;
          }
          var n = this.transform;
          n || (n = this.transform = [1, 0, 0, 1, 0, 0]),
            (n[4] += t),
            (n[5] += e),
            this.decomposeTransform(),
            this.markRedraw();
        }),
        (t.prototype.beforeUpdate = function () {}),
        (t.prototype.afterUpdate = function () {}),
        (t.prototype.update = function () {
          this.updateTransform(), this.__dirty && this.updateInnerText();
        }),
        (t.prototype.updateInnerText = function (t) {
          var e = this._textContent;
          if (e && (!e.ignore || t)) {
            this.textConfig || (this.textConfig = {});
            var n = this.textConfig,
              i = n.local,
              r = e.innerTransformable,
              o = void 0,
              a = void 0,
              s = !1;
            r.parent = i ? this : null;
            var l = !1;
            if ((r.copyTransform(e), null != n.position)) {
              var u = _m;
              u.copy(n.layoutRect ? n.layoutRect : this.getBoundingRect()),
                i || u.applyTransform(this.transform),
                this.calculateTextPosition ? this.calculateTextPosition(mm, n, u) : Si(mm, n, u),
                (r.x = mm.x),
                (r.y = mm.y),
                (o = mm.align),
                (a = mm.verticalAlign);
              var h = n.origin;
              if (h && null != n.rotation) {
                var c = void 0,
                  p = void 0;
                'center' === h
                  ? ((c = 0.5 * u.width), (p = 0.5 * u.height))
                  : ((c = bi(h[0], u.width)), (p = bi(h[1], u.height))),
                  (l = !0),
                  (r.originX = -r.x + c + (i ? 0 : u.x)),
                  (r.originY = -r.y + p + (i ? 0 : u.y));
              }
            }
            null != n.rotation && (r.rotation = n.rotation);
            var f = n.offset;
            f && ((r.x += f[0]), (r.y += f[1]), l || ((r.originX = -f[0]), (r.originY = -f[1])));
            var d =
                null == n.inside
                  ? 'string' == typeof n.position && n.position.indexOf('inside') >= 0
                  : n.inside,
              g = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}),
              v = void 0,
              y = void 0,
              m = void 0;
            d && this.canBeInsideText()
              ? ((v = n.insideFill),
                (y = n.insideStroke),
                (null == v || 'auto' === v) && (v = this.getInsideTextFill()),
                (null == y || 'auto' === y) && ((y = this.getInsideTextStroke(v)), (m = !0)))
              : ((v = n.outsideFill),
                (y = n.outsideStroke),
                (null == v || 'auto' === v) && (v = this.getOutsideFill()),
                (null == y || 'auto' === y) && ((y = this.getOutsideStroke(v)), (m = !0))),
              (v = v || '#000'),
              (v !== g.fill ||
                y !== g.stroke ||
                m !== g.autoStroke ||
                o !== g.align ||
                a !== g.verticalAlign) &&
                ((s = !0),
                (g.fill = v),
                (g.stroke = y),
                (g.autoStroke = m),
                (g.align = o),
                (g.verticalAlign = a),
                e.setDefaultTextStyle(g)),
              (e.__dirty |= qv),
              s && e.dirtyStyle(!0);
          }
        }),
        (t.prototype.canBeInsideText = function () {
          return !0;
        }),
        (t.prototype.getInsideTextFill = function () {
          return '#fff';
        }),
        (t.prototype.getInsideTextStroke = function () {
          return '#000';
        }),
        (t.prototype.getOutsideFill = function () {
          return this.__zr && this.__zr.isDarkMode() ? Yy : Xy;
        }),
        (t.prototype.getOutsideStroke = function () {
          var t = this.__zr && this.__zr.getBackgroundColor(),
            e = 'string' == typeof t && Sn(t);
          e || (e = [255, 255, 255, 1]);
          for (var n = e[3], i = this.__zr.isDarkMode(), r = 0; 3 > r; r++)
            e[r] = e[r] * n + (i ? 0 : 255) * (1 - n);
          return (e[3] = 1), Pn(e, 'rgba');
        }),
        (t.prototype.traverse = function () {}),
        (t.prototype.attrKV = function (t, e) {
          'textConfig' === t
            ? this.setTextConfig(e)
            : 'textContent' === t
            ? this.setTextContent(e)
            : 'clipPath' === t
            ? this.setClipPath(e)
            : 'extra' === t
            ? ((this.extra = this.extra || {}), h(this.extra, e))
            : (this[t] = e);
        }),
        (t.prototype.hide = function () {
          (this.ignore = !0), this.markRedraw();
        }),
        (t.prototype.show = function () {
          (this.ignore = !1), this.markRedraw();
        }),
        (t.prototype.attr = function (t, e) {
          if ('string' == typeof t) this.attrKV(t, e);
          else if (I(t))
            for (var n = t, i = w(n), r = 0; r < i.length; r++) {
              var o = i[r];
              this.attrKV(o, t[o]);
            }
          return this.markRedraw(), this;
        }),
        (t.prototype.saveCurrentToNormalState = function (t) {
          this._innerSaveToNormal(t);
          for (var e = this._normalState, n = 0; n < this.animators.length; n++) {
            var i = this.animators[n],
              r = i.__fromStateTransition;
            if (!(i.getLoop() || (r && r !== gm))) {
              var o = i.targetName,
                a = o ? e[o] : e;
              i.saveTo(a);
            }
          }
        }),
        (t.prototype._innerSaveToNormal = function (t) {
          var e = this._normalState;
          e || (e = this._normalState = {}),
            t.textConfig && !e.textConfig && (e.textConfig = this.textConfig),
            this._savePrimaryToNormal(t, e, vm);
        }),
        (t.prototype._savePrimaryToNormal = function (t, e, n) {
          for (var i = 0; i < n.length; i++) {
            var r = n[i];
            null == t[r] || r in e || (e[r] = this[r]);
          }
        }),
        (t.prototype.hasState = function () {
          return this.currentStates.length > 0;
        }),
        (t.prototype.getState = function (t) {
          return this.states[t];
        }),
        (t.prototype.ensureState = function (t) {
          var e = this.states;
          return e[t] || (e[t] = {}), e[t];
        }),
        (t.prototype.clearStates = function (t) {
          this.useState(gm, !1, t);
        }),
        (t.prototype.useState = function (t, e, n, i) {
          var r = t === gm,
            o = this.hasState();
          if (o || !r) {
            var s = this.currentStates,
              l = this.stateTransition;
            if (!(p(s, t) >= 0) || (!e && 1 !== s.length)) {
              var u;
              if (
                (this.stateProxy && !r && (u = this.stateProxy(t)),
                u || (u = this.states && this.states[t]),
                !u && !r)
              )
                return void a('State ' + t + ' not exists.');
              r || this.saveCurrentToNormalState(u);
              var h = !!((u && u.hoverLayer) || i);
              h && this._toggleHoverLayerFlag(!0),
                this._applyStateObj(
                  t,
                  u,
                  this._normalState,
                  e,
                  !n && !this.__inHover && l && l.duration > 0,
                  l
                );
              var c = this._textContent,
                f = this._textGuide;
              return (
                c && c.useState(t, e, n, h),
                f && f.useState(t, e, n, h),
                r
                  ? ((this.currentStates = []), (this._normalState = {}))
                  : e
                  ? this.currentStates.push(t)
                  : (this.currentStates = [t]),
                this._updateAnimationTargets(),
                this.markRedraw(),
                !h && this.__inHover && (this._toggleHoverLayerFlag(!1), (this.__dirty &= ~qv)),
                u
              );
            }
          }
        }),
        (t.prototype.useStates = function (t, e, n) {
          if (t.length) {
            var i = [],
              r = this.currentStates,
              o = t.length,
              a = o === r.length;
            if (a)
              for (var s = 0; o > s; s++)
                if (t[s] !== r[s]) {
                  a = !1;
                  break;
                }
            if (a) return;
            for (var s = 0; o > s; s++) {
              var l = t[s],
                u = void 0;
              this.stateProxy && (u = this.stateProxy(l, t)),
                u || (u = this.states[l]),
                u && i.push(u);
            }
            var h = i[o - 1],
              c = !!((h && h.hoverLayer) || n);
            c && this._toggleHoverLayerFlag(!0);
            var p = this._mergeStates(i),
              f = this.stateTransition;
            this.saveCurrentToNormalState(p),
              this._applyStateObj(
                t.join(','),
                p,
                this._normalState,
                !1,
                !e && !this.__inHover && f && f.duration > 0,
                f
              );
            var d = this._textContent,
              g = this._textGuide;
            d && d.useStates(t, e, c),
              g && g.useStates(t, e, c),
              this._updateAnimationTargets(),
              (this.currentStates = t.slice()),
              this.markRedraw(),
              !c && this.__inHover && (this._toggleHoverLayerFlag(!1), (this.__dirty &= ~qv));
          } else this.clearStates();
        }),
        (t.prototype._updateAnimationTargets = function () {
          for (var t = 0; t < this.animators.length; t++) {
            var e = this.animators[t];
            e.targetName && e.changeTarget(this[e.targetName]);
          }
        }),
        (t.prototype.removeState = function (t) {
          var e = p(this.currentStates, t);
          if (e >= 0) {
            var n = this.currentStates.slice();
            n.splice(e, 1), this.useStates(n);
          }
        }),
        (t.prototype.replaceState = function (t, e, n) {
          var i = this.currentStates.slice(),
            r = p(i, t),
            o = p(i, e) >= 0;
          r >= 0 ? (o ? i.splice(r, 1) : (i[r] = e)) : n && !o && i.push(e), this.useStates(i);
        }),
        (t.prototype.toggleState = function (t, e) {
          e ? this.useState(t, !0) : this.removeState(t);
        }),
        (t.prototype._mergeStates = function (t) {
          for (var e, n = {}, i = 0; i < t.length; i++) {
            var r = t[i];
            h(n, r), r.textConfig && ((e = e || {}), h(e, r.textConfig));
          }
          return e && (n.textConfig = e), n;
        }),
        (t.prototype._applyStateObj = function (t, e, n, i, r, o) {
          var a = !(e && i);
          e && e.textConfig
            ? ((this.textConfig = h({}, i ? this.textConfig : n.textConfig)),
              h(this.textConfig, e.textConfig))
            : a && n.textConfig && (this.textConfig = n.textConfig);
          for (var s = {}, l = !1, u = 0; u < vm.length; u++) {
            var c = vm[u],
              p = r && ym[c];
            e && null != e[c]
              ? p
                ? ((l = !0), (s[c] = e[c]))
                : (this[c] = e[c])
              : a && null != n[c] && (p ? ((l = !0), (s[c] = n[c])) : (this[c] = n[c]));
          }
          if (!r)
            for (var u = 0; u < this.animators.length; u++) {
              var f = this.animators[u],
                d = f.targetName;
              f.getLoop() || f.__changeFinalValue(d ? (e || n)[d] : e || n);
            }
          l && this._transitionState(t, s, o);
        }),
        (t.prototype._attachComponent = function (t) {
          if ((!t.__zr || t.__hostTarget) && t !== this) {
            var e = this.__zr;
            e && t.addSelfToZr(e), (t.__zr = e), (t.__hostTarget = this);
          }
        }),
        (t.prototype._detachComponent = function (t) {
          t.__zr && t.removeSelfFromZr(t.__zr), (t.__zr = null), (t.__hostTarget = null);
        }),
        (t.prototype.getClipPath = function () {
          return this._clipPath;
        }),
        (t.prototype.setClipPath = function (t) {
          this._clipPath && this._clipPath !== t && this.removeClipPath(),
            this._attachComponent(t),
            (this._clipPath = t),
            this.markRedraw();
        }),
        (t.prototype.removeClipPath = function () {
          var t = this._clipPath;
          t && (this._detachComponent(t), (this._clipPath = null), this.markRedraw());
        }),
        (t.prototype.getTextContent = function () {
          return this._textContent;
        }),
        (t.prototype.setTextContent = function (t) {
          var e = this._textContent;
          e !== t &&
            (e && e !== t && this.removeTextContent(),
            (t.innerTransformable = new nm()),
            this._attachComponent(t),
            (this._textContent = t),
            this.markRedraw());
        }),
        (t.prototype.setTextConfig = function (t) {
          this.textConfig || (this.textConfig = {}), h(this.textConfig, t), this.markRedraw();
        }),
        (t.prototype.removeTextConfig = function () {
          (this.textConfig = null), this.markRedraw();
        }),
        (t.prototype.removeTextContent = function () {
          var t = this._textContent;
          t &&
            ((t.innerTransformable = null),
            this._detachComponent(t),
            (this._textContent = null),
            (this._innerTextDefaultStyle = null),
            this.markRedraw());
        }),
        (t.prototype.getTextGuideLine = function () {
          return this._textGuide;
        }),
        (t.prototype.setTextGuideLine = function (t) {
          this._textGuide && this._textGuide !== t && this.removeTextGuideLine(),
            this._attachComponent(t),
            (this._textGuide = t),
            this.markRedraw();
        }),
        (t.prototype.removeTextGuideLine = function () {
          var t = this._textGuide;
          t && (this._detachComponent(t), (this._textGuide = null), this.markRedraw());
        }),
        (t.prototype.markRedraw = function () {
          this.__dirty |= qv;
          var t = this.__zr;
          t && (this.__inHover ? t.refreshHover() : t.refresh()),
            this.__hostTarget && this.__hostTarget.markRedraw();
        }),
        (t.prototype.dirty = function () {
          this.markRedraw();
        }),
        (t.prototype._toggleHoverLayerFlag = function (t) {
          this.__inHover = t;
          var e = this._textContent,
            n = this._textGuide;
          e && (e.__inHover = t), n && (n.__inHover = t);
        }),
        (t.prototype.addSelfToZr = function (t) {
          if (this.__zr !== t) {
            this.__zr = t;
            var e = this.animators;
            if (e) for (var n = 0; n < e.length; n++) t.animation.addAnimator(e[n]);
            this._clipPath && this._clipPath.addSelfToZr(t),
              this._textContent && this._textContent.addSelfToZr(t),
              this._textGuide && this._textGuide.addSelfToZr(t);
          }
        }),
        (t.prototype.removeSelfFromZr = function (t) {
          if (this.__zr) {
            this.__zr = null;
            var e = this.animators;
            if (e) for (var n = 0; n < e.length; n++) t.animation.removeAnimator(e[n]);
            this._clipPath && this._clipPath.removeSelfFromZr(t),
              this._textContent && this._textContent.removeSelfFromZr(t),
              this._textGuide && this._textGuide.removeSelfFromZr(t);
          }
        }),
        (t.prototype.animate = function (t, e, n) {
          var i = t ? this[t] : this,
            r = new Ly(i, e, n);
          return t && (r.targetName = t), this.addAnimator(r, t), r;
        }),
        (t.prototype.addAnimator = function (t, e) {
          var n = this.__zr,
            i = this;
          t
            .during(function () {
              i.updateDuringAnimation(e);
            })
            .done(function () {
              var e = i.animators,
                n = p(e, t);
              n >= 0 && e.splice(n, 1);
            }),
            this.animators.push(t),
            n && n.animation.addAnimator(t),
            n && n.wakeUp();
        }),
        (t.prototype.updateDuringAnimation = function () {
          this.markRedraw();
        }),
        (t.prototype.stopAnimation = function (t, e) {
          for (var n = this.animators, i = n.length, r = [], o = 0; i > o; o++) {
            var a = n[o];
            t && t !== a.scope ? r.push(a) : a.stop(e);
          }
          return (this.animators = r), this;
        }),
        (t.prototype.animateTo = function (t, e, n) {
          Mi(this, t, e, n);
        }),
        (t.prototype.animateFrom = function (t, e, n) {
          Mi(this, t, e, n, !0);
        }),
        (t.prototype._transitionState = function (t, e, n, i) {
          for (var r = Mi(this, e, n, i), o = 0; o < r.length; o++) r[o].__fromStateTransition = t;
        }),
        (t.prototype.getBoundingRect = function () {
          return null;
        }),
        (t.prototype.getPaintRect = function () {
          return null;
        }),
        (t.initDefaultProps = (function () {
          function e(t, e, i, r) {
            function o(t, e) {
              Object.defineProperty(e, 0, {
                get: function () {
                  return t[i];
                },
                set: function (e) {
                  t[i] = e;
                },
              }),
                Object.defineProperty(e, 1, {
                  get: function () {
                    return t[r];
                  },
                  set: function (e) {
                    t[r] = e;
                  },
                });
            }
            Object.defineProperty(n, t, {
              get: function () {
                if (!this[e]) {
                  var t = (this[e] = []);
                  o(this, t);
                }
                return this[e];
              },
              set: function (t) {
                (this[i] = t[0]), (this[r] = t[1]), (this[e] = t), o(this, t);
              },
            });
          }
          var n = t.prototype;
          (n.type = 'element'),
            (n.name = ''),
            (n.ignore =
              n.silent =
              n.isGroup =
              n.draggable =
              n.dragging =
              n.ignoreClip =
              n.__inHover =
                !1),
            (n.__dirty = qv),
            Object.defineProperty &&
              (e('position', '_legacyPos', 'x', 'y'),
              e('scale', '_legacyScale', 'scaleX', 'scaleY'),
              e('origin', '_legacyOrigin', 'originX', 'originY'));
        })()),
        t
      );
    })();
  d(xm, Lv), d(xm, nm);
  var wm = (function (t) {
    function n(e) {
      var n = t.call(this) || this;
      return (n.isGroup = !0), (n._children = []), n.attr(e), n;
    }
    return (
      e(n, t),
      (n.prototype.childrenRef = function () {
        return this._children;
      }),
      (n.prototype.children = function () {
        return this._children.slice();
      }),
      (n.prototype.childAt = function (t) {
        return this._children[t];
      }),
      (n.prototype.childOfName = function (t) {
        for (var e = this._children, n = 0; n < e.length; n++) if (e[n].name === t) return e[n];
      }),
      (n.prototype.childCount = function () {
        return this._children.length;
      }),
      (n.prototype.add = function (t) {
        return (
          t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), this
        );
      }),
      (n.prototype.addBefore = function (t, e) {
        if (t && t !== this && t.parent !== this && e && e.parent === this) {
          var n = this._children,
            i = n.indexOf(e);
          i >= 0 && (n.splice(i, 0, t), this._doAdd(t));
        }
        return this;
      }),
      (n.prototype.replace = function (t, e) {
        var n = p(this._children, t);
        return n >= 0 && this.replaceAt(e, n), this;
      }),
      (n.prototype.replaceAt = function (t, e) {
        var n = this._children,
          i = n[e];
        if (t && t !== this && t.parent !== this && t !== i) {
          (n[e] = t), (i.parent = null);
          var r = this.__zr;
          r && i.removeSelfFromZr(r), this._doAdd(t);
        }
        return this;
      }),
      (n.prototype._doAdd = function (t) {
        t.parent && t.parent.remove(t), (t.parent = this);
        var e = this.__zr;
        e && e !== t.__zr && t.addSelfToZr(e), e && e.refresh();
      }),
      (n.prototype.remove = function (t) {
        var e = this.__zr,
          n = this._children,
          i = p(n, t);
        return 0 > i
          ? this
          : (n.splice(i, 1), (t.parent = null), e && t.removeSelfFromZr(e), e && e.refresh(), this);
      }),
      (n.prototype.removeAll = function () {
        for (var t = this._children, e = this.__zr, n = 0; n < t.length; n++) {
          var i = t[n];
          e && i.removeSelfFromZr(e), (i.parent = null);
        }
        return (t.length = 0), this;
      }),
      (n.prototype.eachChild = function (t, e) {
        for (var n = this._children, i = 0; i < n.length; i++) {
          var r = n[i];
          t.call(e, r, i);
        }
        return this;
      }),
      (n.prototype.traverse = function (t, e) {
        for (var n = 0; n < this._children.length; n++) {
          var i = this._children[n],
            r = t.call(e, i);
          i.isGroup && !r && i.traverse(t, e);
        }
        return this;
      }),
      (n.prototype.addSelfToZr = function (e) {
        t.prototype.addSelfToZr.call(this, e);
        for (var n = 0; n < this._children.length; n++) {
          var i = this._children[n];
          i.addSelfToZr(e);
        }
      }),
      (n.prototype.removeSelfFromZr = function (e) {
        t.prototype.removeSelfFromZr.call(this, e);
        for (var n = 0; n < this._children.length; n++) {
          var i = this._children[n];
          i.removeSelfFromZr(e);
        }
      }),
      (n.prototype.getBoundingRect = function (t) {
        for (
          var e = new fm(0, 0, 0, 0), n = t || this._children, i = [], r = null, o = 0;
          o < n.length;
          o++
        ) {
          var a = n[o];
          if (!a.ignore && !a.invisible) {
            var s = a.getBoundingRect(),
              l = a.getLocalTransform(i);
            l
              ? (fm.applyTransform(e, s, l), (r = r || e.clone()), r.union(e))
              : ((r = r || s.clone()), r.union(s));
          }
        }
        return r || e;
      }),
      n
    );
  })(xm);
  wm.prototype.type = 'group';
  var bm = {},
    Sm = {},
    Mm = (function () {
      function t(t, e, n) {
        var i = this;
        (this._sleepAfterStill = 10),
          (this._stillFrameAccum = 0),
          (this._needsRefresh = !0),
          (this._needsRefreshHover = !0),
          (this._darkMode = !1),
          (n = n || {}),
          (this.dom = e),
          (this.id = t);
        var r = new Qv(),
          o = n.renderer || 'canvas';
        bm[o] || (o = w(bm)[0]), (n.useDirtyRect = null == n.useDirtyRect ? !1 : n.useDirtyRect);
        var a = new bm[o](e, r, n, t),
          s = n.ssr || a.ssrOnly;
        (this.storage = r), (this.painter = a);
        var l = $g.node || $g.worker || s ? null : new Wy(a.getViewportRoot(), a.root);
        (this.handler = new Zv(r, a, l, a.root)),
          (this.animation = new Py({
            stage: {
              update: s
                ? null
                : function () {
                    return i._flush(!0);
                  },
            },
          })),
          s || this.animation.start();
      }
      return (
        (t.prototype.add = function (t) {
          t && (this.storage.addRoot(t), t.addSelfToZr(this), this.refresh());
        }),
        (t.prototype.remove = function (t) {
          t && (this.storage.delRoot(t), t.removeSelfFromZr(this), this.refresh());
        }),
        (t.prototype.configLayer = function (t, e) {
          this.painter.configLayer && this.painter.configLayer(t, e), this.refresh();
        }),
        (t.prototype.setBackgroundColor = function (t) {
          this.painter.setBackgroundColor && this.painter.setBackgroundColor(t),
            this.refresh(),
            (this._backgroundColor = t),
            (this._darkMode = Pi(t));
        }),
        (t.prototype.getBackgroundColor = function () {
          return this._backgroundColor;
        }),
        (t.prototype.setDarkMode = function (t) {
          this._darkMode = t;
        }),
        (t.prototype.isDarkMode = function () {
          return this._darkMode;
        }),
        (t.prototype.refreshImmediately = function (t) {
          t || this.animation.update(!0),
            (this._needsRefresh = !1),
            this.painter.refresh(),
            (this._needsRefresh = !1);
        }),
        (t.prototype.refresh = function () {
          (this._needsRefresh = !0), this.animation.start();
        }),
        (t.prototype.flush = function () {
          this._flush(!1);
        }),
        (t.prototype._flush = function (t) {
          var e,
            n = jn();
          this._needsRefresh && ((e = !0), this.refreshImmediately(t)),
            this._needsRefreshHover && ((e = !0), this.refreshHoverImmediately());
          var i = jn();
          e
            ? ((this._stillFrameAccum = 0), this.trigger('rendered', { elapsedTime: i - n }))
            : this._sleepAfterStill > 0 &&
              (this._stillFrameAccum++,
              this._stillFrameAccum > this._sleepAfterStill && this.animation.stop());
        }),
        (t.prototype.setSleepAfterStill = function (t) {
          this._sleepAfterStill = t;
        }),
        (t.prototype.wakeUp = function () {
          this.animation.start(), (this._stillFrameAccum = 0);
        }),
        (t.prototype.refreshHover = function () {
          this._needsRefreshHover = !0;
        }),
        (t.prototype.refreshHoverImmediately = function () {
          (this._needsRefreshHover = !1),
            this.painter.refreshHover &&
              'canvas' === this.painter.getType() &&
              this.painter.refreshHover();
        }),
        (t.prototype.resize = function (t) {
          (t = t || {}), this.painter.resize(t.width, t.height), this.handler.resize();
        }),
        (t.prototype.clearAnimation = function () {
          this.animation.clear();
        }),
        (t.prototype.getWidth = function () {
          return this.painter.getWidth();
        }),
        (t.prototype.getHeight = function () {
          return this.painter.getHeight();
        }),
        (t.prototype.setCursorStyle = function (t) {
          this.handler.setCursorStyle(t);
        }),
        (t.prototype.findHover = function (t, e) {
          return this.handler.findHover(t, e);
        }),
        (t.prototype.on = function (t, e, n) {
          return this.handler.on(t, e, n), this;
        }),
        (t.prototype.off = function (t, e) {
          this.handler.off(t, e);
        }),
        (t.prototype.trigger = function (t, e) {
          this.handler.trigger(t, e);
        }),
        (t.prototype.clear = function () {
          for (var t = this.storage.getRoots(), e = 0; e < t.length; e++)
            t[e] instanceof wm && t[e].removeSelfFromZr(this);
          this.storage.delAllRoots(), this.painter.clear();
        }),
        (t.prototype.dispose = function () {
          this.animation.stop(),
            this.clear(),
            this.storage.dispose(),
            this.painter.dispose(),
            this.handler.dispose(),
            (this.animation = this.storage = this.painter = this.handler = null),
            Li(this.id);
        }),
        t
      );
    })(),
    Tm = '5.3.0',
    Cm = (Object.freeze || Object)({
      init: Oi,
      dispose: Ri,
      disposeAll: Ei,
      getInstance: Bi,
      registerPainter: zi,
      version: Tm,
    }),
    km = 1e-4,
    Dm = 20,
    Im = 9007199254740991,
    Am =
      /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/,
    Lm = ('undefined' != typeof console && console.warn && console.log, 'series\x00'),
    Pm = '\x00_ec_\x00',
    Om = [
      'fontStyle',
      'fontWeight',
      'fontSize',
      'fontFamily',
      'rich',
      'tag',
      'color',
      'textBorderColor',
      'textBorderWidth',
      'width',
      'height',
      'lineHeight',
      'align',
      'verticalAlign',
      'baseline',
      'shadowColor',
      'shadowBlur',
      'shadowOffsetX',
      'shadowOffsetY',
      'textShadowColor',
      'textShadowBlur',
      'textShadowOffsetX',
      'textShadowOffsetY',
      'backgroundColor',
      'borderColor',
      'borderWidth',
      'borderRadius',
      'padding',
    ],
    Rm = rr(),
    Em = { useDefault: !0, enableAll: !1, enableNone: !1 },
    Bm = { useDefault: !1, enableAll: !0, enableNone: !0 },
    zm = '.',
    Nm = '___EC__COMPONENT__CONTAINER___',
    Fm = '___EC__EXTENDED_CLASS___',
    Vm = Math.round(10 * Math.random()),
    Hm = [
      ['fill', 'color'],
      ['shadowBlur'],
      ['shadowOffsetX'],
      ['shadowOffsetY'],
      ['opacity'],
      ['shadowColor'],
    ],
    Wm = Ur(Hm),
    Gm = (function () {
      function t() {}
      return (
        (t.prototype.getAreaStyle = function (t, e) {
          return Wm(this, t, e);
        }),
        t
      );
    })(),
    Zm = new dy(50),
    Um = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,
    Xm = (function () {
      function t() {}
      return t;
    })(),
    Ym = (function () {
      function t(t) {
        (this.tokens = []), t && (this.tokens = t);
      }
      return t;
    })(),
    qm = (function () {
      function t() {
        (this.width = 0),
          (this.height = 0),
          (this.contentWidth = 0),
          (this.contentHeight = 0),
          (this.outerWidth = 0),
          (this.outerHeight = 0),
          (this.lines = []);
      }
      return t;
    })(),
    jm = m(
      ',&?/;] '.split(''),
      function (t, e) {
        return (t[e] = !0), t;
      },
      {}
    ),
    Km = '__zr_style_' + Math.round(10 * Math.random()),
    $m = {
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: '#000',
      opacity: 1,
      blend: 'source-over',
    },
    Qm = {
      style: { shadowBlur: !0, shadowOffsetX: !0, shadowOffsetY: !0, shadowColor: !0, opacity: !0 },
    };
  $m[Km] = !0;
  var Jm = ['z', 'z2', 'invisible'],
    t_ = ['invisible'],
    e_ = (function (t) {
      function n(e) {
        return t.call(this, e) || this;
      }
      return (
        e(n, t),
        (n.prototype._init = function (e) {
          for (var n = w(e), i = 0; i < n.length; i++) {
            var r = n[i];
            'style' === r ? this.useStyle(e[r]) : t.prototype.attrKV.call(this, r, e[r]);
          }
          this.style || this.useStyle({});
        }),
        (n.prototype.beforeBrush = function () {}),
        (n.prototype.afterBrush = function () {}),
        (n.prototype.innerBeforeBrush = function () {}),
        (n.prototype.innerAfterBrush = function () {}),
        (n.prototype.shouldBePainted = function (t, e, n, i) {
          var r = this.transform;
          if (
            this.ignore ||
            this.invisible ||
            0 === this.style.opacity ||
            (this.culling && ao(this, t, e)) ||
            (r && !r[0] && !r[3])
          )
            return !1;
          if (n && this.__clipPaths)
            for (var o = 0; o < this.__clipPaths.length; ++o)
              if (this.__clipPaths[o].isZeroArea()) return !1;
          if (i && this.parent)
            for (var a = this.parent; a; ) {
              if (a.ignore) return !1;
              a = a.parent;
            }
          return !0;
        }),
        (n.prototype.contain = function (t, e) {
          return this.rectContain(t, e);
        }),
        (n.prototype.traverse = function (t, e) {
          t.call(e, this);
        }),
        (n.prototype.rectContain = function (t, e) {
          var n = this.transformCoordToLocal(t, e),
            i = this.getBoundingRect();
          return i.contain(n[0], n[1]);
        }),
        (n.prototype.getPaintRect = function () {
          var t = this._paintRect;
          if (!this._paintRect || this.__dirty) {
            var e = this.transform,
              n = this.getBoundingRect(),
              i = this.style,
              r = i.shadowBlur || 0,
              o = i.shadowOffsetX || 0,
              a = i.shadowOffsetY || 0;
            (t = this._paintRect || (this._paintRect = new fm(0, 0, 0, 0))),
              e ? fm.applyTransform(t, n, e) : t.copy(n),
              (r || o || a) &&
                ((t.width += 2 * r + Math.abs(o)),
                (t.height += 2 * r + Math.abs(a)),
                (t.x = Math.min(t.x, t.x + o - r)),
                (t.y = Math.min(t.y, t.y + a - r)));
            var s = this.dirtyRectTolerance;
            t.isZero() ||
              ((t.x = Math.floor(t.x - s)),
              (t.y = Math.floor(t.y - s)),
              (t.width = Math.ceil(t.width + 1 + 2 * s)),
              (t.height = Math.ceil(t.height + 1 + 2 * s)));
          }
          return t;
        }),
        (n.prototype.setPrevPaintRect = function (t) {
          t
            ? ((this._prevPaintRect = this._prevPaintRect || new fm(0, 0, 0, 0)),
              this._prevPaintRect.copy(t))
            : (this._prevPaintRect = null);
        }),
        (n.prototype.getPrevPaintRect = function () {
          return this._prevPaintRect;
        }),
        (n.prototype.animateStyle = function (t) {
          return this.animate('style', t);
        }),
        (n.prototype.updateDuringAnimation = function (t) {
          'style' === t ? this.dirtyStyle() : this.markRedraw();
        }),
        (n.prototype.attrKV = function (e, n) {
          'style' !== e
            ? t.prototype.attrKV.call(this, e, n)
            : this.style
            ? this.setStyle(n)
            : this.useStyle(n);
        }),
        (n.prototype.setStyle = function (t, e) {
          return (
            'string' == typeof t ? (this.style[t] = e) : h(this.style, t), this.dirtyStyle(), this
          );
        }),
        (n.prototype.dirtyStyle = function (t) {
          t || this.markRedraw(), (this.__dirty |= jv), this._rect && (this._rect = null);
        }),
        (n.prototype.dirty = function () {
          this.dirtyStyle();
        }),
        (n.prototype.styleChanged = function () {
          return !!(this.__dirty & jv);
        }),
        (n.prototype.styleUpdated = function () {
          this.__dirty &= ~jv;
        }),
        (n.prototype.createStyle = function (t) {
          return q($m, t);
        }),
        (n.prototype.useStyle = function (t) {
          t[Km] || (t = this.createStyle(t)),
            this.__inHover ? (this.__hoverStyle = t) : (this.style = t),
            this.dirtyStyle();
        }),
        (n.prototype.isStyleObject = function (t) {
          return t[Km];
        }),
        (n.prototype._innerSaveToNormal = function (e) {
          t.prototype._innerSaveToNormal.call(this, e);
          var n = this._normalState;
          e.style && !n.style && (n.style = this._mergeStyle(this.createStyle(), this.style)),
            this._savePrimaryToNormal(e, n, Jm);
        }),
        (n.prototype._applyStateObj = function (e, n, i, r, o, a) {
          t.prototype._applyStateObj.call(this, e, n, i, r, o, a);
          var s,
            l = !(n && r);
          if (
            (n && n.style
              ? o
                ? r
                  ? (s = n.style)
                  : ((s = this._mergeStyle(this.createStyle(), i.style)),
                    this._mergeStyle(s, n.style))
                : ((s = this._mergeStyle(this.createStyle(), r ? this.style : i.style)),
                  this._mergeStyle(s, n.style))
              : l && (s = i.style),
            s)
          )
            if (o) {
              var u = this.style;
              if (((this.style = this.createStyle(l ? {} : u)), l))
                for (var h = w(u), c = 0; c < h.length; c++) {
                  var p = h[c];
                  p in s && ((s[p] = s[p]), (this.style[p] = u[p]));
                }
              for (var f = w(s), c = 0; c < f.length; c++) {
                var p = f[c];
                this.style[p] = this.style[p];
              }
              this._transitionState(e, { style: s }, a, this.getAnimationStyleProps());
            } else this.useStyle(s);
          for (var d = this.__inHover ? t_ : Jm, c = 0; c < d.length; c++) {
            var p = d[c];
            n && null != n[p] ? (this[p] = n[p]) : l && null != i[p] && (this[p] = i[p]);
          }
        }),
        (n.prototype._mergeStates = function (e) {
          for (var n, i = t.prototype._mergeStates.call(this, e), r = 0; r < e.length; r++) {
            var o = e[r];
            o.style && ((n = n || {}), this._mergeStyle(n, o.style));
          }
          return n && (i.style = n), i;
        }),
        (n.prototype._mergeStyle = function (t, e) {
          return h(t, e), t;
        }),
        (n.prototype.getAnimationStyleProps = function () {
          return Qm;
        }),
        (n.initDefaultProps = (function () {
          var t = n.prototype;
          (t.type = 'displayable'),
            (t.invisible = !1),
            (t.z = 0),
            (t.z2 = 0),
            (t.zlevel = 0),
            (t.culling = !1),
            (t.cursor = 'pointer'),
            (t.rectHover = !1),
            (t.incremental = !1),
            (t._rect = null),
            (t.dirtyRectTolerance = 0),
            (t.__dirty = qv | jv);
        })()),
        n
      );
    })(xm),
    n_ = new fm(0, 0, 0, 0),
    i_ = new fm(0, 0, 0, 0),
    r_ = Math.min,
    o_ = Math.max,
    a_ = Math.sin,
    s_ = Math.cos,
    l_ = 2 * Math.PI,
    u_ = Q(),
    h_ = Q(),
    c_ = Q(),
    p_ = [],
    f_ = [],
    d_ = { M: 1, L: 2, C: 3, Q: 4, A: 5, Z: 6, R: 7 },
    g_ = [],
    v_ = [],
    y_ = [],
    m_ = [],
    __ = [],
    x_ = [],
    w_ = Math.min,
    b_ = Math.max,
    S_ = Math.cos,
    M_ = Math.sin,
    T_ = Math.abs,
    C_ = Math.PI,
    k_ = 2 * C_,
    D_ = 'undefined' != typeof Float32Array,
    I_ = [],
    A_ = (function () {
      function t(t) {
        (this.dpr = 1),
          (this._xi = 0),
          (this._yi = 0),
          (this._x0 = 0),
          (this._y0 = 0),
          (this._len = 0),
          t && (this._saveData = !1),
          this._saveData && (this.data = []);
      }
      return (
        (t.prototype.increaseVersion = function () {
          this._version++;
        }),
        (t.prototype.getVersion = function () {
          return this._version;
        }),
        (t.prototype.setScale = function (t, e, n) {
          (n = n || 0),
            n > 0 && ((this._ux = T_(n / Zy / t) || 0), (this._uy = T_(n / Zy / e) || 0));
        }),
        (t.prototype.setDPR = function (t) {
          this.dpr = t;
        }),
        (t.prototype.setContext = function (t) {
          this._ctx = t;
        }),
        (t.prototype.getContext = function () {
          return this._ctx;
        }),
        (t.prototype.beginPath = function () {
          return this._ctx && this._ctx.beginPath(), this.reset(), this;
        }),
        (t.prototype.reset = function () {
          this._saveData && (this._len = 0),
            this._pathSegLen && ((this._pathSegLen = null), (this._pathLen = 0)),
            this._version++;
        }),
        (t.prototype.moveTo = function (t, e) {
          return (
            this._drawPendingPt(),
            this.addData(d_.M, t, e),
            this._ctx && this._ctx.moveTo(t, e),
            (this._x0 = t),
            (this._y0 = e),
            (this._xi = t),
            (this._yi = e),
            this
          );
        }),
        (t.prototype.lineTo = function (t, e) {
          var n = T_(t - this._xi),
            i = T_(e - this._yi),
            r = n > this._ux || i > this._uy;
          if ((this.addData(d_.L, t, e), this._ctx && r && this._ctx.lineTo(t, e), r))
            (this._xi = t), (this._yi = e), (this._pendingPtDist = 0);
          else {
            var o = n * n + i * i;
            o > this._pendingPtDist &&
              ((this._pendingPtX = t), (this._pendingPtY = e), (this._pendingPtDist = o));
          }
          return this;
        }),
        (t.prototype.bezierCurveTo = function (t, e, n, i, r, o) {
          return (
            this._drawPendingPt(),
            this.addData(d_.C, t, e, n, i, r, o),
            this._ctx && this._ctx.bezierCurveTo(t, e, n, i, r, o),
            (this._xi = r),
            (this._yi = o),
            this
          );
        }),
        (t.prototype.quadraticCurveTo = function (t, e, n, i) {
          return (
            this._drawPendingPt(),
            this.addData(d_.Q, t, e, n, i),
            this._ctx && this._ctx.quadraticCurveTo(t, e, n, i),
            (this._xi = n),
            (this._yi = i),
            this
          );
        }),
        (t.prototype.arc = function (t, e, n, i, r, o) {
          this._drawPendingPt(), (I_[0] = i), (I_[1] = r), po(I_, o), (i = I_[0]), (r = I_[1]);
          var a = r - i;
          return (
            this.addData(d_.A, t, e, n, n, i, a, 0, o ? 0 : 1),
            this._ctx && this._ctx.arc(t, e, n, i, r, o),
            (this._xi = S_(r) * n + t),
            (this._yi = M_(r) * n + e),
            this
          );
        }),
        (t.prototype.arcTo = function (t, e, n, i, r) {
          return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, e, n, i, r), this;
        }),
        (t.prototype.rect = function (t, e, n, i) {
          return (
            this._drawPendingPt(),
            this._ctx && this._ctx.rect(t, e, n, i),
            this.addData(d_.R, t, e, n, i),
            this
          );
        }),
        (t.prototype.closePath = function () {
          this._drawPendingPt(), this.addData(d_.Z);
          var t = this._ctx,
            e = this._x0,
            n = this._y0;
          return t && t.closePath(), (this._xi = e), (this._yi = n), this;
        }),
        (t.prototype.fill = function (t) {
          t && t.fill(), this.toStatic();
        }),
        (t.prototype.stroke = function (t) {
          t && t.stroke(), this.toStatic();
        }),
        (t.prototype.len = function () {
          return this._len;
        }),
        (t.prototype.setData = function (t) {
          var e = t.length;
          (this.data && this.data.length === e) || !D_ || (this.data = new Float32Array(e));
          for (var n = 0; e > n; n++) this.data[n] = t[n];
          this._len = e;
        }),
        (t.prototype.appendPath = function (t) {
          t instanceof Array || (t = [t]);
          for (var e = t.length, n = 0, i = this._len, r = 0; e > r; r++) n += t[r].len();
          D_ && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));
          for (var r = 0; e > r; r++)
            for (var o = t[r].data, a = 0; a < o.length; a++) this.data[i++] = o[a];
          this._len = i;
        }),
        (t.prototype.addData = function () {
          if (this._saveData) {
            var t = this.data;
            this._len + arguments.length > t.length && (this._expandData(), (t = this.data));
            for (var e = 0; e < arguments.length; e++) t[this._len++] = arguments[e];
          }
        }),
        (t.prototype._drawPendingPt = function () {
          this._pendingPtDist > 0 &&
            (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY),
            (this._pendingPtDist = 0));
        }),
        (t.prototype._expandData = function () {
          if (!(this.data instanceof Array)) {
            for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];
            this.data = t;
          }
        }),
        (t.prototype.toStatic = function () {
          if (this._saveData) {
            this._drawPendingPt();
            var t = this.data;
            t instanceof Array &&
              ((t.length = this._len), D_ && this._len > 11 && (this.data = new Float32Array(t)));
          }
        }),
        (t.prototype.getBoundingRect = function () {
          (y_[0] = y_[1] = __[0] = __[1] = Number.MAX_VALUE),
            (m_[0] = m_[1] = x_[0] = x_[1] = -Number.MAX_VALUE);
          var t,
            e = this.data,
            n = 0,
            i = 0,
            r = 0,
            o = 0;
          for (t = 0; t < this._len; ) {
            var a = e[t++],
              s = 1 === t;
            switch ((s && ((n = e[t]), (i = e[t + 1]), (r = n), (o = i)), a)) {
              case d_.M:
                (n = r = e[t++]),
                  (i = o = e[t++]),
                  (__[0] = r),
                  (__[1] = o),
                  (x_[0] = r),
                  (x_[1] = o);
                break;
              case d_.L:
                so(n, i, e[t], e[t + 1], __, x_), (n = e[t++]), (i = e[t++]);
                break;
              case d_.C:
                lo(n, i, e[t++], e[t++], e[t++], e[t++], e[t], e[t + 1], __, x_),
                  (n = e[t++]),
                  (i = e[t++]);
                break;
              case d_.Q:
                uo(n, i, e[t++], e[t++], e[t], e[t + 1], __, x_), (n = e[t++]), (i = e[t++]);
                break;
              case d_.A:
                var l = e[t++],
                  u = e[t++],
                  h = e[t++],
                  c = e[t++],
                  p = e[t++],
                  f = e[t++] + p;
                t += 1;
                var d = !e[t++];
                s && ((r = S_(p) * h + l), (o = M_(p) * c + u)),
                  ho(l, u, h, c, p, f, d, __, x_),
                  (n = S_(f) * h + l),
                  (i = M_(f) * c + u);
                break;
              case d_.R:
                (r = n = e[t++]), (o = i = e[t++]);
                var g = e[t++],
                  v = e[t++];
                so(r, o, r + g, o + v, __, x_);
                break;
              case d_.Z:
                (n = r), (i = o);
            }
            ye(y_, y_, __), me(m_, m_, x_);
          }
          return (
            0 === t && (y_[0] = y_[1] = m_[0] = m_[1] = 0),
            new fm(y_[0], y_[1], m_[0] - y_[0], m_[1] - y_[1])
          );
        }),
        (t.prototype._calculateLength = function () {
          var t = this.data,
            e = this._len,
            n = this._ux,
            i = this._uy,
            r = 0,
            o = 0,
            a = 0,
            s = 0;
          this._pathSegLen || (this._pathSegLen = []);
          for (var l = this._pathSegLen, u = 0, h = 0, c = 0; e > c; ) {
            var p = t[c++],
              f = 1 === c;
            f && ((r = t[c]), (o = t[c + 1]), (a = r), (s = o));
            var d = -1;
            switch (p) {
              case d_.M:
                (r = a = t[c++]), (o = s = t[c++]);
                break;
              case d_.L:
                var g = t[c++],
                  v = t[c++],
                  y = g - r,
                  m = v - o;
                (T_(y) > n || T_(m) > i || c === e - 1) &&
                  ((d = Math.sqrt(y * y + m * m)), (r = g), (o = v));
                break;
              case d_.C:
                var _ = t[c++],
                  x = t[c++],
                  g = t[c++],
                  v = t[c++],
                  w = t[c++],
                  b = t[c++];
                (d = rn(r, o, _, x, g, v, w, b, 10)), (r = w), (o = b);
                break;
              case d_.Q:
                var _ = t[c++],
                  x = t[c++],
                  g = t[c++],
                  v = t[c++];
                (d = cn(r, o, _, x, g, v, 10)), (r = g), (o = v);
                break;
              case d_.A:
                var S = t[c++],
                  M = t[c++],
                  T = t[c++],
                  C = t[c++],
                  k = t[c++],
                  D = t[c++],
                  I = D + k;
                c += 1;
                {
                  !t[c++];
                }
                f && ((a = S_(k) * T + S), (s = M_(k) * C + M)),
                  (d = b_(T, C) * w_(k_, Math.abs(D))),
                  (r = S_(I) * T + S),
                  (o = M_(I) * C + M);
                break;
              case d_.R:
                (a = r = t[c++]), (s = o = t[c++]);
                var A = t[c++],
                  L = t[c++];
                d = 2 * A + 2 * L;
                break;
              case d_.Z:
                var y = a - r,
                  m = s - o;
                (d = Math.sqrt(y * y + m * m)), (r = a), (o = s);
            }
            d >= 0 && ((l[h++] = d), (u += d));
          }
          return (this._pathLen = u), u;
        }),
        (t.prototype.rebuildPath = function (t, e) {
          var n,
            i,
            r,
            o,
            a,
            s,
            l,
            u,
            h,
            c,
            p,
            f = this.data,
            d = this._ux,
            g = this._uy,
            v = this._len,
            y = 1 > e,
            m = 0,
            _ = 0,
            x = 0;
          if (
            !y ||
            (this._pathSegLen || this._calculateLength(),
            (l = this._pathSegLen),
            (u = this._pathLen),
            (h = e * u))
          )
            t: for (var w = 0; v > w; ) {
              var b = f[w++],
                S = 1 === w;
              switch (
                (S && ((r = f[w]), (o = f[w + 1]), (n = r), (i = o)),
                b !== d_.L && x > 0 && (t.lineTo(c, p), (x = 0)),
                b)
              ) {
                case d_.M:
                  (n = r = f[w++]), (i = o = f[w++]), t.moveTo(r, o);
                  break;
                case d_.L:
                  (a = f[w++]), (s = f[w++]);
                  var M = T_(a - r),
                    T = T_(s - o);
                  if (M > d || T > g) {
                    if (y) {
                      var C = l[_++];
                      if (m + C > h) {
                        var k = (h - m) / C;
                        t.lineTo(r * (1 - k) + a * k, o * (1 - k) + s * k);
                        break t;
                      }
                      m += C;
                    }
                    t.lineTo(a, s), (r = a), (o = s), (x = 0);
                  } else {
                    var D = M * M + T * T;
                    D > x && ((c = a), (p = s), (x = D));
                  }
                  break;
                case d_.C:
                  var I = f[w++],
                    A = f[w++],
                    L = f[w++],
                    P = f[w++],
                    O = f[w++],
                    R = f[w++];
                  if (y) {
                    var C = l[_++];
                    if (m + C > h) {
                      var k = (h - m) / C;
                      en(r, I, L, O, k, g_),
                        en(o, A, P, R, k, v_),
                        t.bezierCurveTo(g_[1], v_[1], g_[2], v_[2], g_[3], v_[3]);
                      break t;
                    }
                    m += C;
                  }
                  t.bezierCurveTo(I, A, L, P, O, R), (r = O), (o = R);
                  break;
                case d_.Q:
                  var I = f[w++],
                    A = f[w++],
                    L = f[w++],
                    P = f[w++];
                  if (y) {
                    var C = l[_++];
                    if (m + C > h) {
                      var k = (h - m) / C;
                      un(r, I, L, k, g_),
                        un(o, A, P, k, v_),
                        t.quadraticCurveTo(g_[1], v_[1], g_[2], v_[2]);
                      break t;
                    }
                    m += C;
                  }
                  t.quadraticCurveTo(I, A, L, P), (r = L), (o = P);
                  break;
                case d_.A:
                  var E = f[w++],
                    B = f[w++],
                    z = f[w++],
                    N = f[w++],
                    F = f[w++],
                    V = f[w++],
                    H = f[w++],
                    W = !f[w++],
                    G = z > N ? z : N,
                    Z = T_(z - N) > 0.001,
                    U = F + V,
                    X = !1;
                  if (y) {
                    var C = l[_++];
                    m + C > h && ((U = F + (V * (h - m)) / C), (X = !0)), (m += C);
                  }
                  if (
                    (Z && t.ellipse ? t.ellipse(E, B, z, N, H, F, U, W) : t.arc(E, B, G, F, U, W),
                    X)
                  )
                    break t;
                  S && ((n = S_(F) * z + E), (i = M_(F) * N + B)),
                    (r = S_(U) * z + E),
                    (o = M_(U) * N + B);
                  break;
                case d_.R:
                  (n = r = f[w]), (i = o = f[w + 1]), (a = f[w++]), (s = f[w++]);
                  var Y = f[w++],
                    q = f[w++];
                  if (y) {
                    var C = l[_++];
                    if (m + C > h) {
                      var j = h - m;
                      t.moveTo(a, s),
                        t.lineTo(a + w_(j, Y), s),
                        (j -= Y),
                        j > 0 && t.lineTo(a + Y, s + w_(j, q)),
                        (j -= q),
                        j > 0 && t.lineTo(a + b_(Y - j, 0), s + q),
                        (j -= Y),
                        j > 0 && t.lineTo(a, s + b_(q - j, 0));
                      break t;
                    }
                    m += C;
                  }
                  t.rect(a, s, Y, q);
                  break;
                case d_.Z:
                  if (y) {
                    var C = l[_++];
                    if (m + C > h) {
                      var k = (h - m) / C;
                      t.lineTo(r * (1 - k) + n * k, o * (1 - k) + i * k);
                      break t;
                    }
                    m += C;
                  }
                  t.closePath(), (r = n), (o = i);
              }
            }
        }),
        (t.prototype.clone = function () {
          var e = new t(),
            n = this.data;
          return (
            (e.data = n.slice ? n.slice() : Array.prototype.slice.call(n)), (e._len = this._len), e
          );
        }),
        (t.CMD = d_),
        (t.initDefaultProps = (function () {
          var e = t.prototype;
          (e._saveData = !0), (e._ux = 0), (e._uy = 0), (e._pendingPtDist = 0), (e._version = 0);
        })()),
        t
      );
    })(),
    L_ = 2 * Math.PI,
    P_ = 2 * Math.PI,
    O_ = A_.CMD,
    R_ = 2 * Math.PI,
    E_ = 1e-4,
    B_ = [-1, -1, -1],
    z_ = [-1, -1],
    N_ = c(
      {
        fill: '#000',
        stroke: null,
        strokePercent: 1,
        fillOpacity: 1,
        strokeOpacity: 1,
        lineDashOffset: 0,
        lineWidth: 1,
        lineCap: 'butt',
        miterLimit: 10,
        strokeNoScale: !1,
        strokeFirst: !1,
      },
      $m
    ),
    F_ = {
      style: c(
        {
          fill: !0,
          stroke: !0,
          strokePercent: !0,
          fillOpacity: !0,
          strokeOpacity: !0,
          lineDashOffset: !0,
          lineWidth: !0,
          miterLimit: !0,
        },
        Qm.style
      ),
    },
    V_ = im.concat(['invisible', 'culling', 'z', 'z2', 'zlevel', 'parent']),
    H_ = (function (t) {
      function n(e) {
        return t.call(this, e) || this;
      }
      return (
        e(n, t),
        (n.prototype.update = function () {
          var e = this;
          t.prototype.update.call(this);
          var i = this.style;
          if (i.decal) {
            var r = (this._decalEl = this._decalEl || new n());
            r.buildPath === n.prototype.buildPath &&
              (r.buildPath = function (t) {
                e.buildPath(t, e.shape);
              }),
              (r.silent = !0);
            var o = r.style;
            for (var a in i) o[a] !== i[a] && (o[a] = i[a]);
            (o.fill = i.fill ? i.decal : null),
              (o.decal = null),
              (o.shadowColor = null),
              i.strokeFirst && (o.stroke = null);
            for (var s = 0; s < V_.length; ++s) r[V_[s]] = this[V_[s]];
            r.__dirty |= qv;
          } else this._decalEl && (this._decalEl = null);
        }),
        (n.prototype.getDecalElement = function () {
          return this._decalEl;
        }),
        (n.prototype._init = function (e) {
          var n = w(e);
          this.shape = this.getDefaultShape();
          var i = this.getDefaultStyle();
          i && this.useStyle(i);
          for (var r = 0; r < n.length; r++) {
            var o = n[r],
              a = e[o];
            'style' === o
              ? this.style
                ? h(this.style, a)
                : this.useStyle(a)
              : 'shape' === o
              ? h(this.shape, a)
              : t.prototype.attrKV.call(this, o, a);
          }
          this.style || this.useStyle({});
        }),
        (n.prototype.getDefaultStyle = function () {
          return null;
        }),
        (n.prototype.getDefaultShape = function () {
          return {};
        }),
        (n.prototype.canBeInsideText = function () {
          return this.hasFill();
        }),
        (n.prototype.getInsideTextFill = function () {
          var t = this.style.fill;
          if ('none' !== t) {
            if (C(t)) {
              var e = On(t, 0);
              return e > 0.5 ? Xy : e > 0.2 ? qy : Yy;
            }
            if (t) return Yy;
          }
          return Xy;
        }),
        (n.prototype.getInsideTextStroke = function (t) {
          var e = this.style.fill;
          if (C(e)) {
            var n = this.__zr,
              i = !(!n || !n.isDarkMode()),
              r = On(t, 0) < Uy;
            if (i === r) return e;
          }
        }),
        (n.prototype.buildPath = function () {}),
        (n.prototype.pathUpdated = function () {
          this.__dirty &= ~Kv;
        }),
        (n.prototype.getUpdatedPathProxy = function (t) {
          return (
            !this.path && this.createPathProxy(),
            this.path.beginPath(),
            this.buildPath(this.path, this.shape, t),
            this.path
          );
        }),
        (n.prototype.createPathProxy = function () {
          this.path = new A_(!1);
        }),
        (n.prototype.hasStroke = function () {
          var t = this.style,
            e = t.stroke;
          return !(null == e || 'none' === e || !(t.lineWidth > 0));
        }),
        (n.prototype.hasFill = function () {
          var t = this.style,
            e = t.fill;
          return null != e && 'none' !== e;
        }),
        (n.prototype.getBoundingRect = function () {
          var t = this._rect,
            e = this.style,
            n = !t;
          if (n) {
            var i = !1;
            this.path || ((i = !0), this.createPathProxy());
            var r = this.path;
            (i || this.__dirty & Kv) &&
              (r.beginPath(), this.buildPath(r, this.shape, !1), this.pathUpdated()),
              (t = r.getBoundingRect());
          }
          if (((this._rect = t), this.hasStroke() && this.path && this.path.len() > 0)) {
            var o = this._rectStroke || (this._rectStroke = t.clone());
            if (this.__dirty || n) {
              o.copy(t);
              var a = e.strokeNoScale ? this.getLineScale() : 1,
                s = e.lineWidth;
              if (!this.hasFill()) {
                var l = this.strokeContainThreshold;
                s = Math.max(s, null == l ? 4 : l);
              }
              a > 1e-10 &&
                ((o.width += s / a), (o.height += s / a), (o.x -= s / a / 2), (o.y -= s / a / 2));
            }
            return o;
          }
          return t;
        }),
        (n.prototype.contain = function (t, e) {
          var n = this.transformCoordToLocal(t, e),
            i = this.getBoundingRect(),
            r = this.style;
          if (((t = n[0]), (e = n[1]), i.contain(t, e))) {
            var o = this.path;
            if (this.hasStroke()) {
              var a = r.lineWidth,
                s = r.strokeNoScale ? this.getLineScale() : 1;
              if (
                s > 1e-10 &&
                (this.hasFill() || (a = Math.max(a, this.strokeContainThreshold)),
                ko(o, a / s, t, e))
              )
                return !0;
            }
            if (this.hasFill()) return Co(o, t, e);
          }
          return !1;
        }),
        (n.prototype.dirtyShape = function () {
          (this.__dirty |= Kv),
            this._rect && (this._rect = null),
            this._decalEl && this._decalEl.dirtyShape(),
            this.markRedraw();
        }),
        (n.prototype.dirty = function () {
          this.dirtyStyle(), this.dirtyShape();
        }),
        (n.prototype.animateShape = function (t) {
          return this.animate('shape', t);
        }),
        (n.prototype.updateDuringAnimation = function (t) {
          'style' === t ? this.dirtyStyle() : 'shape' === t ? this.dirtyShape() : this.markRedraw();
        }),
        (n.prototype.attrKV = function (e, n) {
          'shape' === e ? this.setShape(n) : t.prototype.attrKV.call(this, e, n);
        }),
        (n.prototype.setShape = function (t, e) {
          var n = this.shape;
          return (
            n || (n = this.shape = {}),
            'string' == typeof t ? (n[t] = e) : h(n, t),
            this.dirtyShape(),
            this
          );
        }),
        (n.prototype.shapeChanged = function () {
          return !!(this.__dirty & Kv);
        }),
        (n.prototype.createStyle = function (t) {
          return q(N_, t);
        }),
        (n.prototype._innerSaveToNormal = function (e) {
          t.prototype._innerSaveToNormal.call(this, e);
          var n = this._normalState;
          e.shape && !n.shape && (n.shape = h({}, this.shape));
        }),
        (n.prototype._applyStateObj = function (e, n, i, r, o, a) {
          t.prototype._applyStateObj.call(this, e, n, i, r, o, a);
          var s,
            l = !(n && r);
          if (
            (n && n.shape
              ? o
                ? r
                  ? (s = n.shape)
                  : ((s = h({}, i.shape)), h(s, n.shape))
                : ((s = h({}, r ? this.shape : i.shape)), h(s, n.shape))
              : l && (s = i.shape),
            s)
          )
            if (o) {
              this.shape = h({}, this.shape);
              for (var u = {}, c = w(s), p = 0; p < c.length; p++) {
                var f = c[p];
                'object' == typeof s[f] ? (this.shape[f] = s[f]) : (u[f] = s[f]);
              }
              this._transitionState(e, { shape: u }, a);
            } else (this.shape = s), this.dirtyShape();
        }),
        (n.prototype._mergeStates = function (e) {
          for (var n, i = t.prototype._mergeStates.call(this, e), r = 0; r < e.length; r++) {
            var o = e[r];
            o.shape && ((n = n || {}), this._mergeStyle(n, o.shape));
          }
          return n && (i.shape = n), i;
        }),
        (n.prototype.getAnimationStyleProps = function () {
          return F_;
        }),
        (n.prototype.isZeroArea = function () {
          return !1;
        }),
        (n.extend = function (t) {
          var i = (function (n) {
            function i(e) {
              var i = n.call(this, e) || this;
              return t.init && t.init.call(i, e), i;
            }
            return (
              e(i, n),
              (i.prototype.getDefaultStyle = function () {
                return s(t.style);
              }),
              (i.prototype.getDefaultShape = function () {
                return s(t.shape);
              }),
              i
            );
          })(n);
          for (var r in t) 'function' == typeof t[r] && (i.prototype[r] = t[r]);
          return i;
        }),
        (n.initDefaultProps = (function () {
          var t = n.prototype;
          (t.type = 'path'),
            (t.strokeContainThreshold = 5),
            (t.segmentIgnoreThreshold = 0),
            (t.subPixelOptimize = !1),
            (t.autoBatch = !1),
            (t.__dirty = qv | jv | Kv);
        })()),
        n
      );
    })(e_),
    W_ = c(
      {
        strokeFirst: !0,
        font: tv,
        x: 0,
        y: 0,
        textAlign: 'left',
        textBaseline: 'top',
        miterLimit: 2,
      },
      N_
    ),
    G_ = (function (t) {
      function n() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        e(n, t),
        (n.prototype.hasStroke = function () {
          var t = this.style,
            e = t.stroke;
          return null != e && 'none' !== e && t.lineWidth > 0;
        }),
        (n.prototype.hasFill = function () {
          var t = this.style,
            e = t.fill;
          return null != e && 'none' !== e;
        }),
        (n.prototype.createStyle = function (t) {
          return q(W_, t);
        }),
        (n.prototype.setBoundingRect = function (t) {
          this._rect = t;
        }),
        (n.prototype.getBoundingRect = function () {
          var t = this.style;
          if (!this._rect) {
            var e = t.text;
            null != e ? (e += '') : (e = '');
            var n = mi(e, t.font, t.textAlign, t.textBaseline);
            if (((n.x += t.x || 0), (n.y += t.y || 0), this.hasStroke())) {
              var i = t.lineWidth;
              (n.x -= i / 2), (n.y -= i / 2), (n.width += i), (n.height += i);
            }
            this._rect = n;
          }
          return this._rect;
        }),
        (n.initDefaultProps = (function () {
          var t = n.prototype;
          t.dirtyRectTolerance = 10;
        })()),
        n
      );
    })(e_);
  G_.prototype.type = 'tspan';
  var Z_ = c({ x: 0, y: 0 }, $m),
    U_ = {
      style: c(
        { x: !0, y: !0, width: !0, height: !0, sx: !0, sy: !0, sWidth: !0, sHeight: !0 },
        Qm.style
      ),
    },
    X_ = (function (t) {
      function n() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        e(n, t),
        (n.prototype.createStyle = function (t) {
          return q(Z_, t);
        }),
        (n.prototype._getSize = function (t) {
          var e = this.style,
            n = e[t];
          if (null != n) return n;
          var i = Do(e.image) ? e.image : this.__image;
          if (!i) return 0;
          var r = 'width' === t ? 'height' : 'width',
            o = e[r];
          return null == o ? i[t] : (i[t] / i[r]) * o;
        }),
        (n.prototype.getWidth = function () {
          return this._getSize('width');
        }),
        (n.prototype.getHeight = function () {
          return this._getSize('height');
        }),
        (n.prototype.getAnimationStyleProps = function () {
          return U_;
        }),
        (n.prototype.getBoundingRect = function () {
          var t = this.style;
          return (
            this._rect ||
              (this._rect = new fm(t.x || 0, t.y || 0, this.getWidth(), this.getHeight())),
            this._rect
          );
        }),
        n
      );
    })(e_);
  X_.prototype.type = 'image';
  var Y_ = Math.round,
    q_ = (function () {
      function t() {
        (this.x = 0), (this.y = 0), (this.width = 0), (this.height = 0);
      }
      return t;
    })(),
    j_ = {},
    K_ = (function (t) {
      function n(e) {
        return t.call(this, e) || this;
      }
      return (
        e(n, t),
        (n.prototype.getDefaultShape = function () {
          return new q_();
        }),
        (n.prototype.buildPath = function (t, e) {
          var n, i, r, o;
          if (this.subPixelOptimize) {
            var a = Lo(j_, e, this.style);
            (n = a.x), (i = a.y), (r = a.width), (o = a.height), (a.r = e.r), (e = a);
          } else (n = e.x), (i = e.y), (r = e.width), (o = e.height);
          e.r ? Io(t, e) : t.rect(n, i, r, o);
        }),
        (n.prototype.isZeroArea = function () {
          return !this.shape.width || !this.shape.height;
        }),
        n
      );
    })(H_);
  K_.prototype.type = 'rect';
  var $_ = { fill: '#000' },
    Q_ = 2,
    J_ = {
      style: c(
        {
          fill: !0,
          stroke: !0,
          fillOpacity: !0,
          strokeOpacity: !0,
          lineWidth: !0,
          fontSize: !0,
          lineHeight: !0,
          width: !0,
          height: !0,
          textShadowColor: !0,
          textShadowBlur: !0,
          textShadowOffsetX: !0,
          textShadowOffsetY: !0,
          backgroundColor: !0,
          padding: !0,
          borderColor: !0,
          borderWidth: !0,
          borderRadius: !0,
        },
        Qm.style
      ),
    },
    tx = (function (t) {
      function n(e) {
        var n = t.call(this) || this;
        return (n.type = 'text'), (n._children = []), (n._defaultStyle = $_), n.attr(e), n;
      }
      return (
        e(n, t),
        (n.prototype.childrenRef = function () {
          return this._children;
        }),
        (n.prototype.update = function () {
          t.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
          for (var e = 0; e < this._children.length; e++) {
            var n = this._children[e];
            (n.zlevel = this.zlevel),
              (n.z = this.z),
              (n.z2 = this.z2),
              (n.culling = this.culling),
              (n.cursor = this.cursor),
              (n.invisible = this.invisible);
          }
        }),
        (n.prototype.updateTransform = function () {
          var e = this.innerTransformable;
          e
            ? (e.updateTransform(), e.transform && (this.transform = e.transform))
            : t.prototype.updateTransform.call(this);
        }),
        (n.prototype.getLocalTransform = function (e) {
          var n = this.innerTransformable;
          return n ? n.getLocalTransform(e) : t.prototype.getLocalTransform.call(this, e);
        }),
        (n.prototype.getComputedTransform = function () {
          return (
            this.__hostTarget &&
              (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)),
            t.prototype.getComputedTransform.call(this)
          );
        }),
        (n.prototype._updateSubTexts = function () {
          (this._childCursor = 0),
            Bo(this.style),
            this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(),
            (this._children.length = this._childCursor),
            this.styleUpdated();
        }),
        (n.prototype.addSelfToZr = function (e) {
          t.prototype.addSelfToZr.call(this, e);
          for (var n = 0; n < this._children.length; n++) this._children[n].__zr = e;
        }),
        (n.prototype.removeSelfFromZr = function (e) {
          t.prototype.removeSelfFromZr.call(this, e);
          for (var n = 0; n < this._children.length; n++) this._children[n].__zr = null;
        }),
        (n.prototype.getBoundingRect = function () {
          if ((this.styleChanged() && this._updateSubTexts(), !this._rect)) {
            for (
              var t = new fm(0, 0, 0, 0), e = this._children, n = [], i = null, r = 0;
              r < e.length;
              r++
            ) {
              var o = e[r],
                a = o.getBoundingRect(),
                s = o.getLocalTransform(n);
              s
                ? (t.copy(a), t.applyTransform(s), (i = i || t.clone()), i.union(t))
                : ((i = i || a.clone()), i.union(a));
            }
            this._rect = i || t;
          }
          return this._rect;
        }),
        (n.prototype.setDefaultTextStyle = function (t) {
          this._defaultStyle = t || $_;
        }),
        (n.prototype.setTextContent = function () {}),
        (n.prototype._mergeStyle = function (t, e) {
          if (!e) return t;
          var n = e.rich,
            i = t.rich || (n && {});
          return h(t, e), n && i ? (this._mergeRich(i, n), (t.rich = i)) : i && (t.rich = i), t;
        }),
        (n.prototype._mergeRich = function (t, e) {
          for (var n = w(e), i = 0; i < n.length; i++) {
            var r = n[i];
            (t[r] = t[r] || {}), h(t[r], e[r]);
          }
        }),
        (n.prototype.getAnimationStyleProps = function () {
          return J_;
        }),
        (n.prototype._getOrCreateChild = function (t) {
          var e = this._children[this._childCursor];
          return (
            (e && e instanceof t) || (e = new t()),
            (this._children[this._childCursor++] = e),
            (e.__zr = this.__zr),
            (e.parent = this),
            e
          );
        }),
        (n.prototype._updatePlainTexts = function () {
          var t = this.style,
            e = t.font || tv,
            n = t.padding,
            i = Ho(t),
            r = to(i, t),
            o = Wo(t),
            a = !!t.backgroundColor,
            s = r.outerHeight,
            l = r.outerWidth,
            u = r.contentWidth,
            h = r.lines,
            c = r.lineHeight,
            p = this._defaultStyle,
            f = t.x || 0,
            d = t.y || 0,
            g = t.align || p.align || 'left',
            v = t.verticalAlign || p.verticalAlign || 'top',
            y = f,
            m = xi(d, r.contentHeight, v);
          if (o || n) {
            var _ = _i(f, l, g),
              x = xi(d, s, v);
            o && this._renderBackground(t, t, _, x, l, s);
          }
          (m += c / 2),
            n && ((y = Vo(f, g, n)), 'top' === v ? (m += n[0]) : 'bottom' === v && (m -= n[2]));
          for (
            var w = 0,
              b = !1,
              S = Fo(('fill' in t) ? t.fill : ((b = !0), p.fill)),
              M = No(
                ('stroke' in t) ? t.stroke : a || (p.autoStroke && !b) ? null : ((w = Q_), p.stroke)
              ),
              T = t.textShadowBlur > 0,
              C =
                null != t.width &&
                ('truncate' === t.overflow || 'break' === t.overflow || 'breakAll' === t.overflow),
              k = r.calculatedLineHeight,
              D = 0;
            D < h.length;
            D++
          ) {
            var I = this._getOrCreateChild(G_),
              A = I.createStyle();
            I.useStyle(A),
              (A.text = h[D]),
              (A.x = y),
              (A.y = m),
              g && (A.textAlign = g),
              (A.textBaseline = 'middle'),
              (A.opacity = t.opacity),
              (A.strokeFirst = !0),
              T &&
                ((A.shadowBlur = t.textShadowBlur || 0),
                (A.shadowColor = t.textShadowColor || 'transparent'),
                (A.shadowOffsetX = t.textShadowOffsetX || 0),
                (A.shadowOffsetY = t.textShadowOffsetY || 0)),
              (A.stroke = M),
              (A.fill = S),
              M &&
                ((A.lineWidth = t.lineWidth || w),
                (A.lineDash = t.lineDash),
                (A.lineDashOffset = t.lineDashOffset || 0)),
              (A.font = e),
              Ro(A, t),
              (m += c),
              C &&
                I.setBoundingRect(
                  new fm(_i(A.x, t.width, A.textAlign), xi(A.y, k, A.textBaseline), u, k)
                );
          }
        }),
        (n.prototype._updateRichTexts = function () {
          var t = this.style,
            e = Ho(t),
            n = eo(e, t),
            i = n.width,
            r = n.outerWidth,
            o = n.outerHeight,
            a = t.padding,
            s = t.x || 0,
            l = t.y || 0,
            u = this._defaultStyle,
            h = t.align || u.align,
            c = t.verticalAlign || u.verticalAlign,
            p = _i(s, r, h),
            f = xi(l, o, c),
            d = p,
            g = f;
          a && ((d += a[3]), (g += a[0]));
          var v = d + i;
          Wo(t) && this._renderBackground(t, t, p, f, r, o);
          for (var y = !!t.backgroundColor, m = 0; m < n.lines.length; m++) {
            for (
              var _ = n.lines[m],
                x = _.tokens,
                w = x.length,
                b = _.lineHeight,
                S = _.width,
                M = 0,
                T = d,
                C = v,
                k = w - 1,
                D = void 0;
              w > M && ((D = x[M]), !D.align || 'left' === D.align);

            )
              this._placeToken(D, t, b, g, T, 'left', y), (S -= D.width), (T += D.width), M++;
            for (; k >= 0 && ((D = x[k]), 'right' === D.align); )
              this._placeToken(D, t, b, g, C, 'right', y), (S -= D.width), (C -= D.width), k--;
            for (T += (i - (T - d) - (v - C) - S) / 2; k >= M; )
              (D = x[M]),
                this._placeToken(D, t, b, g, T + D.width / 2, 'center', y),
                (T += D.width),
                M++;
            g += b;
          }
        }),
        (n.prototype._placeToken = function (t, e, n, i, r, o, a) {
          var s = e.rich[t.styleName] || {};
          s.text = t.text;
          var l = t.verticalAlign,
            u = i + n / 2;
          'top' === l ? (u = i + t.height / 2) : 'bottom' === l && (u = i + n - t.height / 2);
          var h = !t.isLineHolder && Wo(s);
          h &&
            this._renderBackground(
              s,
              e,
              'right' === o ? r - t.width : 'center' === o ? r - t.width / 2 : r,
              u - t.height / 2,
              t.width,
              t.height
            );
          var c = !!s.backgroundColor,
            p = t.textPadding;
          p && ((r = Vo(r, o, p)), (u -= t.height / 2 - p[0] - t.innerHeight / 2));
          var f = this._getOrCreateChild(G_),
            d = f.createStyle();
          f.useStyle(d);
          var g = this._defaultStyle,
            v = !1,
            y = 0,
            m = Fo('fill' in s ? s.fill : 'fill' in e ? e.fill : ((v = !0), g.fill)),
            _ = No(
              'stroke' in s
                ? s.stroke
                : 'stroke' in e
                ? e.stroke
                : c || a || (g.autoStroke && !v)
                ? null
                : ((y = Q_), g.stroke)
            ),
            x = s.textShadowBlur > 0 || e.textShadowBlur > 0;
          (d.text = t.text),
            (d.x = r),
            (d.y = u),
            x &&
              ((d.shadowBlur = s.textShadowBlur || e.textShadowBlur || 0),
              (d.shadowColor = s.textShadowColor || e.textShadowColor || 'transparent'),
              (d.shadowOffsetX = s.textShadowOffsetX || e.textShadowOffsetX || 0),
              (d.shadowOffsetY = s.textShadowOffsetY || e.textShadowOffsetY || 0)),
            (d.textAlign = o),
            (d.textBaseline = 'middle'),
            (d.font = t.font || tv),
            (d.opacity = F(s.opacity, e.opacity, 1)),
            Ro(d, s),
            _ &&
              ((d.lineWidth = F(s.lineWidth, e.lineWidth, y)),
              (d.lineDash = N(s.lineDash, e.lineDash)),
              (d.lineDashOffset = e.lineDashOffset || 0),
              (d.stroke = _)),
            m && (d.fill = m);
          var w = t.contentWidth,
            b = t.contentHeight;
          f.setBoundingRect(new fm(_i(d.x, w, d.textAlign), xi(d.y, b, d.textBaseline), w, b));
        }),
        (n.prototype._renderBackground = function (t, e, n, i, r, o) {
          var a,
            s,
            l = t.backgroundColor,
            u = t.borderWidth,
            h = t.borderColor,
            c = l && l.image,
            p = l && !c,
            f = t.borderRadius,
            d = this;
          if (p || t.lineHeight || (u && h)) {
            (a = this._getOrCreateChild(K_)), a.useStyle(a.createStyle()), (a.style.fill = null);
            var g = a.shape;
            (g.x = n), (g.y = i), (g.width = r), (g.height = o), (g.r = f), a.dirtyShape();
          }
          if (p) {
            var v = a.style;
            (v.fill = l || null), (v.fillOpacity = N(t.fillOpacity, 1));
          } else if (c) {
            (s = this._getOrCreateChild(X_)),
              (s.onload = function () {
                d.dirtyStyle();
              });
            var y = s.style;
            (y.image = l.image), (y.x = n), (y.y = i), (y.width = r), (y.height = o);
          }
          if (u && h) {
            var v = a.style;
            (v.lineWidth = u),
              (v.stroke = h),
              (v.strokeOpacity = N(t.strokeOpacity, 1)),
              (v.lineDash = t.borderDash),
              (v.lineDashOffset = t.borderDashOffset || 0),
              (a.strokeContainThreshold = 0),
              a.hasFill() && a.hasStroke() && ((v.strokeFirst = !0), (v.lineWidth *= 2));
          }
          var m = (a || s).style;
          (m.shadowBlur = t.shadowBlur || 0),
            (m.shadowColor = t.shadowColor || 'transparent'),
            (m.shadowOffsetX = t.shadowOffsetX || 0),
            (m.shadowOffsetY = t.shadowOffsetY || 0),
            (m.opacity = F(t.opacity, e.opacity, 1));
        }),
        (n.makeFont = function (t) {
          var e = '';
          return (
            Eo(t) &&
              (e = [t.fontStyle, t.fontWeight, Oo(t.fontSize), t.fontFamily || 'sans-serif'].join(
                ' '
              )),
            (e && G(e)) || t.textFont || t.font
          );
        }),
        n
      );
    })(e_),
    ex = { left: !0, right: 1, center: 1 },
    nx = { top: 1, bottom: 1, middle: 1 },
    ix = ['fontStyle', 'fontWeight', 'fontSize', 'fontFamily'],
    rx = Dr(),
    ox = function (t, e, n, i) {
      if (i) {
        var r = rx(i);
        (r.dataIndex = n),
          (r.dataType = e),
          (r.seriesIndex = t),
          'group' === i.type &&
            i.traverse(function (i) {
              var r = rx(i);
              (r.seriesIndex = t), (r.dataIndex = n), (r.dataType = e);
            });
      }
    },
    ax = 1,
    sx = {},
    lx = Dr(),
    ux = Dr(),
    hx = 0,
    cx = 1,
    px = 2,
    fx = ['emphasis', 'blur', 'select'],
    dx = ['normal', 'emphasis', 'blur', 'select'],
    gx = 10,
    vx = 9,
    yx = 'highlight',
    mx = 'downplay',
    _x = 'select',
    xx = 'unselect',
    bx = 'toggleSelect',
    Sx = new dy(100),
    Mx = ['emphasis', 'blur', 'select'],
    Tx = { itemStyle: 'getItemStyle', lineStyle: 'getLineStyle', areaStyle: 'getAreaStyle' },
    Cx = A_.CMD,
    kx = [[], [], []],
    Dx = Math.sqrt,
    Ix = Math.atan2,
    Ax = Math.sqrt,
    Lx = Math.sin,
    Px = Math.cos,
    Ox = Math.PI,
    Rx = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,
    Ex = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g,
    Bx = (function (t) {
      function n() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return e(n, t), (n.prototype.applyTransform = function () {}), n;
    })(H_),
    zx = (function () {
      function t() {
        (this.cx = 0), (this.cy = 0), (this.r = 0);
      }
      return t;
    })(),
    Nx = (function (t) {
      function n(e) {
        return t.call(this, e) || this;
      }
      return (
        e(n, t),
        (n.prototype.getDefaultShape = function () {
          return new zx();
        }),
        (n.prototype.buildPath = function (t, e) {
          t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI);
        }),
        n
      );
    })(H_);
  Nx.prototype.type = 'circle';
  var Fx = (function () {
      function t() {
        (this.cx = 0), (this.cy = 0), (this.rx = 0), (this.ry = 0);
      }
      return t;
    })(),
    Vx = (function (t) {
      function n(e) {
        return t.call(this, e) || this;
      }
      return (
        e(n, t),
        (n.prototype.getDefaultShape = function () {
          return new Fx();
        }),
        (n.prototype.buildPath = function (t, e) {
          var n = 0.5522848,
            i = e.cx,
            r = e.cy,
            o = e.rx,
            a = e.ry,
            s = o * n,
            l = a * n;
          t.moveTo(i - o, r),
            t.bezierCurveTo(i - o, r - l, i - s, r - a, i, r - a),
            t.bezierCurveTo(i + s, r - a, i + o, r - l, i + o, r),
            t.bezierCurveTo(i + o, r + l, i + s, r + a, i, r + a),
            t.bezierCurveTo(i - s, r + a, i - o, r + l, i - o, r),
            t.closePath();
        }),
        n
      );
    })(H_);
  Vx.prototype.type = 'ellipse';
  var Hx = Math.PI,
    Wx = 2 * Hx,
    Gx = Math.sin,
    Zx = Math.cos,
    Ux = Math.acos,
    Xx = Math.atan2,
    Yx = Math.abs,
    qx = Math.sqrt,
    jx = Math.max,
    Kx = Math.min,
    $x = 1e-4,
    Qx = (function () {
      function t() {
        (this.cx = 0),
          (this.cy = 0),
          (this.r0 = 0),
          (this.r = 0),
          (this.startAngle = 0),
          (this.endAngle = 2 * Math.PI),
          (this.clockwise = !0),
          (this.cornerRadius = 0);
      }
      return t;
    })(),
    Jx = (function (t) {
      function n(e) {
        return t.call(this, e) || this;
      }
      return (
        e(n, t),
        (n.prototype.getDefaultShape = function () {
          return new Qx();
        }),
        (n.prototype.buildPath = function (t, e) {
          Ka(t, e);
        }),
        (n.prototype.isZeroArea = function () {
          return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
        }),
        n
      );
    })(H_);
  Jx.prototype.type = 'sector';
  var tw = (function () {
      function t() {
        (this.cx = 0), (this.cy = 0), (this.r = 0), (this.r0 = 0);
      }
      return t;
    })(),
    ew = (function (t) {
      function n(e) {
        return t.call(this, e) || this;
      }
      return (
        e(n, t),
        (n.prototype.getDefaultShape = function () {
          return new tw();
        }),
        (n.prototype.buildPath = function (t, e) {
          var n = e.cx,
            i = e.cy,
            r = 2 * Math.PI;
          t.moveTo(n + e.r, i),
            t.arc(n, i, e.r, 0, r, !1),
            t.moveTo(n + e.r0, i),
            t.arc(n, i, e.r0, 0, r, !0);
        }),
        n
      );
    })(H_);
  ew.prototype.type = 'ring';
  var nw = (function () {
      function t() {
        (this.points = null), (this.smooth = 0), (this.smoothConstraint = null);
      }
      return t;
    })(),
    iw = (function (t) {
      function n(e) {
        return t.call(this, e) || this;
      }
      return (
        e(n, t),
        (n.prototype.getDefaultShape = function () {
          return new nw();
        }),
        (n.prototype.buildPath = function (t, e) {
          Qa(t, e, !0);
        }),
        n
      );
    })(H_);
  iw.prototype.type = 'polygon';
  var rw = (function () {
      function t() {
        (this.points = null), (this.percent = 1), (this.smooth = 0), (this.smoothConstraint = null);
      }
      return t;
    })(),
    ow = (function (t) {
      function n(e) {
        return t.call(this, e) || this;
      }
      return (
        e(n, t),
        (n.prototype.getDefaultStyle = function () {
          return { stroke: '#000', fill: null };
        }),
        (n.prototype.getDefaultShape = function () {
          return new rw();
        }),
        (n.prototype.buildPath = function (t, e) {
          Qa(t, e, !1);
        }),
        n
      );
    })(H_);
  ow.prototype.type = 'polyline';
  var aw = {},
    sw = (function () {
      function t() {
        (this.x1 = 0), (this.y1 = 0), (this.x2 = 0), (this.y2 = 0), (this.percent = 1);
      }
      return t;
    })(),
    lw = (function (t) {
      function n(e) {
        return t.call(this, e) || this;
      }
      return (
        e(n, t),
        (n.prototype.getDefaultStyle = function () {
          return { stroke: '#000', fill: null };
        }),
        (n.prototype.getDefaultShape = function () {
          return new sw();
        }),
        (n.prototype.buildPath = function (t, e) {
          var n, i, r, o;
          if (this.subPixelOptimize) {
            var a = Ao(aw, e, this.style);
            (n = a.x1), (i = a.y1), (r = a.x2), (o = a.y2);
          } else (n = e.x1), (i = e.y1), (r = e.x2), (o = e.y2);
          var s = e.percent;
          0 !== s &&
            (t.moveTo(n, i),
            1 > s && ((r = n * (1 - s) + r * s), (o = i * (1 - s) + o * s)),
            t.lineTo(r, o));
        }),
        (n.prototype.pointAt = function (t) {
          var e = this.shape;
          return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t];
        }),
        n
      );
    })(H_);
  lw.prototype.type = 'line';
  var uw = [],
    hw = (function () {
      function t() {
        (this.x1 = 0),
          (this.y1 = 0),
          (this.x2 = 0),
          (this.y2 = 0),
          (this.cpx1 = 0),
          (this.cpy1 = 0),
          (this.percent = 1);
      }
      return t;
    })(),
    cw = (function (t) {
      function n(e) {
        return t.call(this, e) || this;
      }
      return (
        e(n, t),
        (n.prototype.getDefaultStyle = function () {
          return { stroke: '#000', fill: null };
        }),
        (n.prototype.getDefaultShape = function () {
          return new hw();
        }),
        (n.prototype.buildPath = function (t, e) {
          var n = e.x1,
            i = e.y1,
            r = e.x2,
            o = e.y2,
            a = e.cpx1,
            s = e.cpy1,
            l = e.cpx2,
            u = e.cpy2,
            h = e.percent;
          0 !== h &&
            (t.moveTo(n, i),
            null == l || null == u
              ? (1 > h &&
                  (un(n, a, r, h, uw),
                  (a = uw[1]),
                  (r = uw[2]),
                  un(i, s, o, h, uw),
                  (s = uw[1]),
                  (o = uw[2])),
                t.quadraticCurveTo(a, s, r, o))
              : (1 > h &&
                  (en(n, a, l, r, h, uw),
                  (a = uw[1]),
                  (l = uw[2]),
                  (r = uw[3]),
                  en(i, s, u, o, h, uw),
                  (s = uw[1]),
                  (u = uw[2]),
                  (o = uw[3])),
                t.bezierCurveTo(a, s, l, u, r, o)));
        }),
        (n.prototype.pointAt = function (t) {
          return Ja(this.shape, t, !1);
        }),
        (n.prototype.tangentAt = function (t) {
          var e = Ja(this.shape, t, !0);
          return ce(e, e);
        }),
        n
      );
    })(H_);
  cw.prototype.type = 'bezier-curve';
  var pw = (function () {
      function t() {
        (this.cx = 0),
          (this.cy = 0),
          (this.r = 0),
          (this.startAngle = 0),
          (this.endAngle = 2 * Math.PI),
          (this.clockwise = !0);
      }
      return t;
    })(),
    fw = (function (t) {
      function n(e) {
        return t.call(this, e) || this;
      }
      return (
        e(n, t),
        (n.prototype.getDefaultStyle = function () {
          return { stroke: '#000', fill: null };
        }),
        (n.prototype.getDefaultShape = function () {
          return new pw();
        }),
        (n.prototype.buildPath = function (t, e) {
          var n = e.cx,
            i = e.cy,
            r = Math.max(e.r, 0),
            o = e.startAngle,
            a = e.endAngle,
            s = e.clockwise,
            l = Math.cos(o),
            u = Math.sin(o);
          t.moveTo(l * r + n, u * r + i), t.arc(n, i, r, o, a, !s);
        }),
        n
      );
    })(H_);
  fw.prototype.type = 'arc';
  var dw = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = 'compound'), e;
      }
      return (
        e(n, t),
        (n.prototype._updatePathDirty = function () {
          for (var t = this.shape.paths, e = this.shapeChanged(), n = 0; n < t.length; n++)
            e = e || t[n].shapeChanged();
          e && this.dirtyShape();
        }),
        (n.prototype.beforeBrush = function () {
          this._updatePathDirty();
          for (var t = this.shape.paths || [], e = this.getGlobalScale(), n = 0; n < t.length; n++)
            t[n].path || t[n].createPathProxy(),
              t[n].path.setScale(e[0], e[1], t[n].segmentIgnoreThreshold);
        }),
        (n.prototype.buildPath = function (t, e) {
          for (var n = e.paths || [], i = 0; i < n.length; i++) n[i].buildPath(t, n[i].shape, !0);
        }),
        (n.prototype.afterBrush = function () {
          for (var t = this.shape.paths || [], e = 0; e < t.length; e++) t[e].pathUpdated();
        }),
        (n.prototype.getBoundingRect = function () {
          return this._updatePathDirty.call(this), H_.prototype.getBoundingRect.call(this);
        }),
        n
      );
    })(H_),
    gw = (function () {
      function t(t) {
        this.colorStops = t || [];
      }
      return (
        (t.prototype.addColorStop = function (t, e) {
          this.colorStops.push({ offset: t, color: e });
        }),
        t
      );
    })(),
    vw = (function (t) {
      function n(e, n, i, r, o, a) {
        var s = t.call(this, o) || this;
        return (
          (s.x = null == e ? 0 : e),
          (s.y = null == n ? 0 : n),
          (s.x2 = null == i ? 1 : i),
          (s.y2 = null == r ? 0 : r),
          (s.type = 'linear'),
          (s.global = a || !1),
          s
        );
      }
      return e(n, t), n;
    })(gw),
    yw = (function (t) {
      function n(e, n, i, r, o) {
        var a = t.call(this, r) || this;
        return (
          (a.x = null == e ? 0.5 : e),
          (a.y = null == n ? 0.5 : n),
          (a.r = null == i ? 0.5 : i),
          (a.type = 'radial'),
          (a.global = o || !1),
          a
        );
      }
      return e(n, t), n;
    })(gw),
    mw = [0, 0],
    _w = [0, 0],
    xw = new rm(),
    ww = new rm(),
    bw = (function () {
      function t(t, e) {
        (this._corners = []), (this._axes = []), (this._origin = [0, 0]);
        for (var n = 0; 4 > n; n++) this._corners[n] = new rm();
        for (var n = 0; 2 > n; n++) this._axes[n] = new rm();
        t && this.fromBoundingRect(t, e);
      }
      return (
        (t.prototype.fromBoundingRect = function (t, e) {
          var n = this._corners,
            i = this._axes,
            r = t.x,
            o = t.y,
            a = r + t.width,
            s = o + t.height;
          if ((n[0].set(r, o), n[1].set(a, o), n[2].set(a, s), n[3].set(r, s), e))
            for (var l = 0; 4 > l; l++) n[l].transform(e);
          rm.sub(i[0], n[1], n[0]), rm.sub(i[1], n[3], n[0]), i[0].normalize(), i[1].normalize();
          for (var l = 0; 2 > l; l++) this._origin[l] = i[l].dot(n[0]);
        }),
        (t.prototype.intersect = function (t, e) {
          var n = !0,
            i = !e;
          return (
            xw.set(1 / 0, 1 / 0),
            ww.set(0, 0),
            !this._intersectCheckOneSide(this, t, xw, ww, i, 1) && ((n = !1), i)
              ? n
              : !this._intersectCheckOneSide(t, this, xw, ww, i, -1) && ((n = !1), i)
              ? n
              : (i || rm.copy(e, n ? xw : ww), n)
          );
        }),
        (t.prototype._intersectCheckOneSide = function (t, e, n, i, r, o) {
          for (var a = !0, s = 0; 2 > s; s++) {
            var l = this._axes[s];
            if (
              (this._getProjMinMaxOnAxis(s, t._corners, mw),
              this._getProjMinMaxOnAxis(s, e._corners, _w),
              mw[1] < _w[0] || mw[0] > _w[1])
            ) {
              if (((a = !1), r)) return a;
              var u = Math.abs(_w[0] - mw[1]),
                h = Math.abs(mw[0] - _w[1]);
              Math.min(u, h) > i.len() && (h > u ? rm.scale(i, l, -u * o) : rm.scale(i, l, h * o));
            } else if (n) {
              var u = Math.abs(_w[0] - mw[1]),
                h = Math.abs(mw[0] - _w[1]);
              Math.min(u, h) < n.len() && (h > u ? rm.scale(n, l, u * o) : rm.scale(n, l, -h * o));
            }
          }
          return a;
        }),
        (t.prototype._getProjMinMaxOnAxis = function (t, e, n) {
          for (
            var i = this._axes[t], r = this._origin, o = e[0].dot(i) + r[t], a = o, s = o, l = 1;
            l < e.length;
            l++
          ) {
            var u = e[l].dot(i) + r[t];
            (a = Math.min(u, a)), (s = Math.max(u, s));
          }
          (n[0] = a), (n[1] = s);
        }),
        t
      );
    })(),
    Sw = [],
    Mw = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (
          (e.notClear = !0),
          (e.incremental = !0),
          (e._displayables = []),
          (e._temporaryDisplayables = []),
          (e._cursor = 0),
          e
        );
      }
      return (
        e(n, t),
        (n.prototype.traverse = function (t, e) {
          t.call(e, this);
        }),
        (n.prototype.useStyle = function () {
          this.style = {};
        }),
        (n.prototype.getCursor = function () {
          return this._cursor;
        }),
        (n.prototype.innerAfterBrush = function () {
          this._cursor = this._displayables.length;
        }),
        (n.prototype.clearDisplaybles = function () {
          (this._displayables = []),
            (this._temporaryDisplayables = []),
            (this._cursor = 0),
            this.markRedraw(),
            (this.notClear = !1);
        }),
        (n.prototype.clearTemporalDisplayables = function () {
          this._temporaryDisplayables = [];
        }),
        (n.prototype.addDisplayable = function (t, e) {
          e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.markRedraw();
        }),
        (n.prototype.addDisplayables = function (t, e) {
          e = e || !1;
          for (var n = 0; n < t.length; n++) this.addDisplayable(t[n], e);
        }),
        (n.prototype.getDisplayables = function () {
          return this._displayables;
        }),
        (n.prototype.getTemporalDisplayables = function () {
          return this._temporaryDisplayables;
        }),
        (n.prototype.eachPendingDisplayable = function (t) {
          for (var e = this._cursor; e < this._displayables.length; e++)
            t && t(this._displayables[e]);
          for (var e = 0; e < this._temporaryDisplayables.length; e++)
            t && t(this._temporaryDisplayables[e]);
        }),
        (n.prototype.update = function () {
          this.updateTransform();
          for (var t = this._cursor; t < this._displayables.length; t++) {
            var e = this._displayables[t];
            (e.parent = this), e.update(), (e.parent = null);
          }
          for (var t = 0; t < this._temporaryDisplayables.length; t++) {
            var e = this._temporaryDisplayables[t];
            (e.parent = this), e.update(), (e.parent = null);
          }
        }),
        (n.prototype.getBoundingRect = function () {
          if (!this._rect) {
            for (
              var t = new fm(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0;
              e < this._displayables.length;
              e++
            ) {
              var n = this._displayables[e],
                i = n.getBoundingRect().clone();
              n.needLocalTransform() && i.applyTransform(n.getLocalTransform(Sw)), t.union(i);
            }
            this._rect = t;
          }
          return this._rect;
        }),
        (n.prototype.contain = function (t, e) {
          var n = this.transformCoordToLocal(t, e),
            i = this.getBoundingRect();
          if (i.contain(n[0], n[1]))
            for (var r = 0; r < this._displayables.length; r++) {
              var o = this._displayables[r];
              if (o.contain(t, e)) return !0;
            }
          return !1;
        }),
        n
      );
    })(e_),
    Tw = Dr(),
    Cw = Math.max,
    kw = Math.min,
    Dw = {},
    Iw = Ua,
    Aw = Xa;
  cs('circle', Nx),
    cs('ellipse', Vx),
    cs('sector', Jx),
    cs('ring', ew),
    cs('polygon', iw),
    cs('polyline', ow),
    cs('rect', K_),
    cs('line', lw),
    cs('bezierCurve', cw),
    cs('arc', fw);
  var Lw = {},
    Pw = [
      'fontStyle',
      'fontWeight',
      'fontSize',
      'fontFamily',
      'textShadowColor',
      'textShadowBlur',
      'textShadowOffsetX',
      'textShadowOffsetY',
    ],
    Ow = ['align', 'lineHeight', 'width', 'height', 'tag', 'verticalAlign'],
    Rw = [
      'padding',
      'borderWidth',
      'borderRadius',
      'borderDashOffset',
      'backgroundColor',
      'borderColor',
      'shadowColor',
      'shadowBlur',
      'shadowOffsetX',
      'shadowOffsetY',
    ],
    Ew = Dr(),
    Bw = ['textStyle', 'color'],
    zw = [
      'fontStyle',
      'fontWeight',
      'fontSize',
      'fontFamily',
      'padding',
      'lineHeight',
      'rich',
      'width',
      'height',
      'overflow',
    ],
    Nw = new tx(),
    Fw = (function () {
      function t() {}
      return (
        (t.prototype.getTextColor = function (t) {
          var e = this.ecModel;
          return this.getShallow('color') || (!t && e ? e.get(Bw) : null);
        }),
        (t.prototype.getFont = function () {
          return Ns(
            {
              fontStyle: this.getShallow('fontStyle'),
              fontWeight: this.getShallow('fontWeight'),
              fontSize: this.getShallow('fontSize'),
              fontFamily: this.getShallow('fontFamily'),
            },
            this.ecModel
          );
        }),
        (t.prototype.getTextRect = function (t) {
          for (
            var e = {
                text: t,
                verticalAlign: this.getShallow('verticalAlign') || this.getShallow('baseline'),
              },
              n = 0;
            n < zw.length;
            n++
          )
            e[zw[n]] = this.getShallow(zw[n]);
          return Nw.useStyle(e), Nw.update(), Nw.getBoundingRect();
        }),
        t
      );
    })(),
    Vw = [
      ['lineWidth', 'width'],
      ['stroke', 'color'],
      ['opacity'],
      ['shadowBlur'],
      ['shadowOffsetX'],
      ['shadowOffsetY'],
      ['shadowColor'],
      ['lineDash', 'type'],
      ['lineDashOffset', 'dashOffset'],
      ['lineCap', 'cap'],
      ['lineJoin', 'join'],
      ['miterLimit'],
    ],
    Hw = Ur(Vw),
    Ww = (function () {
      function t() {}
      return (
        (t.prototype.getLineStyle = function (t) {
          return Hw(this, t);
        }),
        t
      );
    })(),
    Gw = [
      ['fill', 'color'],
      ['stroke', 'borderColor'],
      ['lineWidth', 'borderWidth'],
      ['opacity'],
      ['shadowBlur'],
      ['shadowOffsetX'],
      ['shadowOffsetY'],
      ['shadowColor'],
      ['lineDash', 'borderType'],
      ['lineDashOffset', 'borderDashOffset'],
      ['lineCap', 'borderCap'],
      ['lineJoin', 'borderJoin'],
      ['miterLimit', 'borderMiterLimit'],
    ],
    Zw = Ur(Gw),
    Uw = (function () {
      function t() {}
      return (
        (t.prototype.getItemStyle = function (t, e) {
          return Zw(this, t, e);
        }),
        t
      );
    })(),
    Xw = (function () {
      function t(t, e, n) {
        (this.parentModel = e), (this.ecModel = n), (this.option = t);
      }
      return (
        (t.prototype.init = function () {
          for (var t = [], e = 3; e < arguments.length; e++) t[e - 3] = arguments[e];
        }),
        (t.prototype.mergeOption = function (t) {
          l(this.option, t, !0);
        }),
        (t.prototype.get = function (t, e) {
          return null == t ? this.option : this._doGet(this.parsePath(t), !e && this.parentModel);
        }),
        (t.prototype.getShallow = function (t, e) {
          var n = this.option,
            i = null == n ? n : n[t];
          if (null == i && !e) {
            var r = this.parentModel;
            r && (i = r.getShallow(t));
          }
          return i;
        }),
        (t.prototype.getModel = function (e, n) {
          var i = null != e,
            r = i ? this.parsePath(e) : null,
            o = i ? this._doGet(r) : this.option;
          return (
            (n = n || (this.parentModel && this.parentModel.getModel(this.resolveParentPath(r)))),
            new t(o, n, this.ecModel)
          );
        }),
        (t.prototype.isEmpty = function () {
          return null == this.option;
        }),
        (t.prototype.restoreData = function () {}),
        (t.prototype.clone = function () {
          var t = this.constructor;
          return new t(s(this.option));
        }),
        (t.prototype.parsePath = function (t) {
          return 'string' == typeof t ? t.split('.') : t;
        }),
        (t.prototype.resolveParentPath = function (t) {
          return t;
        }),
        (t.prototype.isAnimationEnabled = function () {
          if (!$g.node && this.option) {
            if (null != this.option.animation) return !!this.option.animation;
            if (this.parentModel) return this.parentModel.isAnimationEnabled();
          }
        }),
        (t.prototype._doGet = function (t, e) {
          var n = this.option;
          if (!t) return n;
          for (
            var i = 0;
            i < t.length &&
            (!t[i] || ((n = n && 'object' == typeof n ? n[t[i]] : null), null != n));
            i++
          );
          return null == n && e && (n = e._doGet(this.resolveParentPath(t), e.parentModel)), n;
        }),
        t
      );
    })();
  Nr(Xw), Hr(Xw), d(Xw, Ww), d(Xw, Uw), d(Xw, Gm), d(Xw, Fw);
  var Yw = Math.round(10 * Math.random()),
    qw = {
      time: {
        month: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        monthAbbr: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayOfWeekAbbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      legend: { selector: { all: 'All', inverse: 'Inv' } },
      toolbox: {
        brush: {
          title: {
            rect: 'Box Select',
            polygon: 'Lasso Select',
            lineX: 'Horizontally Select',
            lineY: 'Vertically Select',
            keep: 'Keep Selections',
            clear: 'Clear Selections',
          },
        },
        dataView: { title: 'Data View', lang: ['Data View', 'Close', 'Refresh'] },
        dataZoom: { title: { zoom: 'Zoom', back: 'Zoom Reset' } },
        magicType: {
          title: {
            line: 'Switch to Line Chart',
            bar: 'Switch to Bar Chart',
            stack: 'Stack',
            tiled: 'Tile',
          },
        },
        restore: { title: 'Restore' },
        saveAsImage: { title: 'Save as Image', lang: ['Right Click to Save Image'] },
      },
      series: {
        typeNames: {
          pie: 'Pie chart',
          bar: 'Bar chart',
          line: 'Line chart',
          scatter: 'Scatter plot',
          effectScatter: 'Ripple scatter plot',
          radar: 'Radar chart',
          tree: 'Tree',
          treemap: 'Treemap',
          boxplot: 'Boxplot',
          candlestick: 'Candlestick',
          k: 'K line chart',
          heatmap: 'Heat map',
          map: 'Map',
          parallel: 'Parallel coordinate map',
          lines: 'Line graph',
          graph: 'Relationship graph',
          sankey: 'Sankey diagram',
          funnel: 'Funnel chart',
          gauge: 'Gauge',
          pictorialBar: 'Pictorial bar',
          themeRiver: 'Theme River Map',
          sunburst: 'Sunburst',
        },
      },
      aria: {
        general: { withTitle: 'This is a chart about "{title}"', withoutTitle: 'This is a chart' },
        series: {
          single: {
            prefix: '',
            withName: ' with type {seriesType} named {seriesName}.',
            withoutName: ' with type {seriesType}.',
          },
          multiple: {
            prefix: '. It consists of {seriesCount} series count.',
            withName: ' The {seriesId} series is a {seriesType} representing {seriesName}.',
            withoutName: ' The {seriesId} series is a {seriesType}.',
            separator: { middle: '', end: '' },
          },
        },
        data: {
          allData: 'The data is as follows: ',
          partialData: 'The first {displayCnt} items are: ',
          withName: 'the data for {name} is {value}',
          withoutName: '{value}',
          separator: { middle: ', ', end: '. ' },
        },
      },
    },
    jw = {
      time: {
        month: [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月',
        ],
        monthAbbr: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
        dayOfWeek: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayOfWeekAbbr: ['日', '一', '二', '三', '四', '五', '六'],
      },
      legend: { selector: { all: '全选', inverse: '反选' } },
      toolbox: {
        brush: {
          title: {
            rect: '矩形选择',
            polygon: '圈选',
            lineX: '横向选择',
            lineY: '纵向选择',
            keep: '保持选择',
            clear: '清除选择',
          },
        },
        dataView: { title: '数据视图', lang: ['数据视图', '关闭', '刷新'] },
        dataZoom: { title: { zoom: '区域缩放', back: '区域缩放还原' } },
        magicType: {
          title: {
            line: '切换为折线图',
            bar: '切换为柱状图',
            stack: '切换为堆叠',
            tiled: '切换为平铺',
          },
        },
        restore: { title: '还原' },
        saveAsImage: { title: '保存为图片', lang: ['右键另存为图片'] },
      },
      series: {
        typeNames: {
          pie: '饼图',
          bar: '柱状图',
          line: '折线图',
          scatter: '散点图',
          effectScatter: '涟漪散点图',
          radar: '雷达图',
          tree: '树图',
          treemap: '矩形树图',
          boxplot: '箱型图',
          candlestick: 'K线图',
          k: 'K线图',
          heatmap: '热力图',
          map: '地图',
          parallel: '平行坐标图',
          lines: '线图',
          graph: '关系图',
          sankey: '桑基图',
          funnel: '漏斗图',
          gauge: '仪表盘图',
          pictorialBar: '象形柱图',
          themeRiver: '主题河流图',
          sunburst: '旭日图',
        },
      },
      aria: {
        general: { withTitle: '这是一个关于“{title}”的图表。', withoutTitle: '这是一个图表，' },
        series: {
          single: {
            prefix: '',
            withName: '图表类型是{seriesType}，表示{seriesName}。',
            withoutName: '图表类型是{seriesType}。',
          },
          multiple: {
            prefix: '它由{seriesCount}个图表系列组成。',
            withName: '第{seriesId}个系列是一个表示{seriesName}的{seriesType}，',
            withoutName: '第{seriesId}个系列是一个{seriesType}，',
            separator: { middle: '；', end: '。' },
          },
        },
        data: {
          allData: '其数据是——',
          partialData: '其中，前{displayCnt}项是——',
          withName: '{name}的数据是{value}',
          withoutName: '{value}',
          separator: { middle: '，', end: '' },
        },
      },
    },
    Kw = 'ZH',
    $w = 'EN',
    Qw = $w,
    Jw = {},
    tb = {},
    eb = $g.domSupported
      ? (function () {
          var t = (
            document.documentElement.lang ||
            navigator.language ||
            navigator.browserLanguage
          ).toUpperCase();
          return t.indexOf(Kw) > -1 ? Kw : Qw;
        })()
      : Qw;
  Us($w, qw), Us(Kw, jw);
  var nb = 1e3,
    ib = 60 * nb,
    rb = 60 * ib,
    ob = 24 * rb,
    ab = 365 * ob,
    sb = {
      year: '{yyyy}',
      month: '{MMM}',
      day: '{d}',
      hour: '{HH}:{mm}',
      minute: '{HH}:{mm}',
      second: '{HH}:{mm}:{ss}',
      millisecond: '{HH}:{mm}:{ss} {SSS}',
      none: '{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}',
    },
    lb = '{yyyy}-{MM}-{dd}',
    ub = {
      year: '{yyyy}',
      month: '{yyyy}-{MM}',
      day: lb,
      hour: lb + ' ' + sb.hour,
      minute: lb + ' ' + sb.minute,
      second: lb + ' ' + sb.second,
      millisecond: sb.none,
    },
    hb = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'],
    cb = [
      'year',
      'half-year',
      'quarter',
      'month',
      'week',
      'half-week',
      'day',
      'half-day',
      'quarter-day',
      'hour',
      'minute',
      'second',
      'millisecond',
    ],
    pb = H,
    fb = /([&<>"'])/g,
    db = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' },
    gb = ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    vb = function (t, e) {
      return '{' + t + (null == e ? '' : e) + '}';
    },
    yb = v,
    mb = ['left', 'right', 'top', 'bottom', 'width', 'height'],
    _b = [
      ['width', 'left', 'right'],
      ['height', 'top', 'bottom'],
    ],
    xb = (S(Cl, 'vertical'), S(Cl, 'horizontal'), Dr()),
    wb = (function (t) {
      function n(e, n, i) {
        var r = t.call(this, e, n, i) || this;
        return (r.uid = Hs('ec_cpt_model')), r;
      }
      return (
        e(n, t),
        (n.prototype.init = function (t, e, n) {
          this.mergeDefaultAndTheme(t, n);
        }),
        (n.prototype.mergeDefaultAndTheme = function (t, e) {
          var n = Dl(this),
            i = n ? Al(t) : {},
            r = e.getTheme();
          l(t, r.get(this.mainType)), l(t, this.getDefaultOption()), n && Il(t, i, n);
        }),
        (n.prototype.mergeOption = function (t) {
          l(this.option, t, !0);
          var e = Dl(this);
          e && Il(this.option, t, e);
        }),
        (n.prototype.optionUpdated = function () {}),
        (n.prototype.getDefaultOption = function () {
          var t = this.constructor;
          if (!zr(t)) return t.defaultOption;
          var e = xb(this);
          if (!e.defaultOption) {
            for (var n = [], i = t; i; ) {
              var r = i.prototype.defaultOption;
              r && n.push(r), (i = i.superClass);
            }
            for (var o = {}, a = n.length - 1; a >= 0; a--) o = l(o, n[a], !0);
            e.defaultOption = o;
          }
          return e.defaultOption;
        }),
        (n.prototype.getReferringComponents = function (t, e) {
          var n = t + 'Index',
            i = t + 'Id';
          return Lr(this.ecModel, t, { index: this.get(n, !0), id: this.get(i, !0) }, e);
        }),
        (n.prototype.getBoxLayoutParams = function () {
          var t = this;
          return {
            left: t.get('left'),
            top: t.get('top'),
            right: t.get('right'),
            bottom: t.get('bottom'),
            width: t.get('width'),
            height: t.get('height'),
          };
        }),
        (n.prototype.getZLevelKey = function () {
          return '';
        }),
        (n.prototype.setZLevel = function (t) {
          this.option.zlevel = t;
        }),
        (n.protoInitialize = (function () {
          var t = n.prototype;
          (t.type = 'component'),
            (t.id = ''),
            (t.name = ''),
            (t.mainType = ''),
            (t.subType = ''),
            (t.componentIndex = 0);
        })()),
        n
      );
    })(Xw);
  Vr(wb, Xw), Zr(wb), Ws(wb), Gs(wb, Pl);
  var bb = '';
  'undefined' != typeof navigator && (bb = navigator.platform || '');
  var Sb,
    Mb,
    Tb = 'rgba(0, 0, 0, 0.2)',
    Cb = {
      darkMode: 'auto',
      colorBy: 'series',
      color: [
        '#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
      ],
      gradientColor: ['#f6efa6', '#d88273', '#bf444c'],
      aria: {
        decal: {
          decals: [
            {
              color: Tb,
              dashArrayX: [1, 0],
              dashArrayY: [2, 5],
              symbolSize: 1,
              rotation: Math.PI / 6,
            },
            {
              color: Tb,
              symbol: 'circle',
              dashArrayX: [
                [8, 8],
                [0, 8, 8, 0],
              ],
              dashArrayY: [6, 0],
              symbolSize: 0.8,
            },
            { color: Tb, dashArrayX: [1, 0], dashArrayY: [4, 3], rotation: -Math.PI / 4 },
            {
              color: Tb,
              dashArrayX: [
                [6, 6],
                [0, 6, 6, 0],
              ],
              dashArrayY: [6, 0],
            },
            {
              color: Tb,
              dashArrayX: [
                [1, 0],
                [1, 6],
              ],
              dashArrayY: [1, 0, 6, 0],
              rotation: Math.PI / 4,
            },
            {
              color: Tb,
              symbol: 'triangle',
              dashArrayX: [
                [9, 9],
                [0, 9, 9, 0],
              ],
              dashArrayY: [7, 2],
              symbolSize: 0.75,
            },
          ],
        },
      },
      textStyle: {
        fontFamily: bb.match(/^Win/) ? 'Microsoft YaHei' : 'sans-serif',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
      blendMode: null,
      stateAnimation: { duration: 300, easing: 'cubicOut' },
      animation: 'auto',
      animationDuration: 1e3,
      animationDurationUpdate: 500,
      animationEasing: 'cubicInOut',
      animationEasingUpdate: 'cubicInOut',
      animationThreshold: 2e3,
      progressiveThreshold: 3e3,
      progressive: 400,
      hoverLayerThreshold: 3e3,
      useUTC: !1,
    },
    kb = X(['tooltip', 'label', 'itemName', 'itemId', 'itemGroupId', 'seriesName']),
    Db = 'original',
    Ib = 'arrayRows',
    Ab = 'objectRows',
    Lb = 'keyedColumns',
    Pb = 'typedArray',
    Ob = 'unknown',
    Rb = 'column',
    Eb = 'row',
    Bb = { Must: 1, Might: 2, Not: 3 },
    zb = Dr(),
    Nb = X(),
    Fb = Dr(),
    Vb =
      (Dr(),
      (function () {
        function t() {}
        return (
          (t.prototype.getColorFromPalette = function (t, e, n) {
            var i = ur(this.get('color', !0)),
              r = this.get('colorLayer', !0);
            return Hl(this, Fb, i, r, t, e, n);
          }),
          (t.prototype.clearColorPalette = function () {
            Wl(this, Fb);
          }),
          t
        );
      })()),
    Hb = '\x00_ec_inner',
    Wb = 1,
    Gb = (function (t) {
      function n() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        e(n, t),
        (n.prototype.init = function (t, e, n, i, r, o) {
          (i = i || {}),
            (this.option = null),
            (this._theme = new Xw(i)),
            (this._locale = new Xw(r)),
            (this._optionManager = o);
        }),
        (n.prototype.setOption = function (t, e, n) {
          var i = Yl(e);
          this._optionManager.setOption(t, n, i), this._resetOption(null, i);
        }),
        (n.prototype.resetOption = function (t, e) {
          return this._resetOption(t, Yl(e));
        }),
        (n.prototype._resetOption = function (t, e) {
          var n = !1,
            i = this._optionManager;
          if (!t || 'recreate' === t) {
            var r = i.mountOption('recreate' === t);
            this.option && 'recreate' !== t
              ? (this.restoreData(), this._mergeOption(r, e))
              : Mb(this, r),
              (n = !0);
          }
          if (
            (('timeline' === t || 'media' === t) && this.restoreData(),
            !t || 'recreate' === t || 'timeline' === t)
          ) {
            var o = i.getTimelineOption(this);
            o && ((n = !0), this._mergeOption(o, e));
          }
          if (!t || 'recreate' === t || 'media' === t) {
            var a = i.getMediaOption(this);
            a.length &&
              v(
                a,
                function (t) {
                  (n = !0), this._mergeOption(t, e);
                },
                this
              );
          }
          return n;
        }),
        (n.prototype.mergeOption = function (t) {
          this._mergeOption(t, null);
        }),
        (n.prototype._mergeOption = function (t, e) {
          function n(e) {
            var n = Fl(this, e, ur(t[e])),
              a = r.get(e),
              s = a ? (c && c.get(e) ? 'replaceMerge' : 'normalMerge') : 'replaceAll',
              l = fr(a, n, s);
            Tr(l, e, wb), (i[e] = null), r.set(e, null), o.set(e, 0);
            var u,
              p = [],
              f = [],
              d = 0;
            v(
              l,
              function (t, n) {
                var i = t.existing,
                  r = t.newOption;
                if (r) {
                  var o = 'series' === e,
                    a = wb.getClass(e, t.keyInfo.subType, !o);
                  if (!a) return;
                  if ('tooltip' === e) {
                    if (u) return;
                    u = !0;
                  }
                  if (i && i.constructor === a)
                    (i.name = t.keyInfo.name), i.mergeOption(r, this), i.optionUpdated(r, !1);
                  else {
                    var s = h({ componentIndex: n }, t.keyInfo);
                    (i = new a(r, this, this, s)),
                      h(i, s),
                      t.brandNew && (i.__requireNewView = !0),
                      i.init(r, this, this),
                      i.optionUpdated(null, !0);
                  }
                } else i && (i.mergeOption({}, this), i.optionUpdated({}, !1));
                i ? (p.push(i.option), f.push(i), d++) : (p.push(void 0), f.push(void 0));
              },
              this
            ),
              (i[e] = p),
              r.set(e, f),
              o.set(e, d),
              'series' === e && Sb(this);
          }
          var i = this.option,
            r = this._componentsMap,
            o = this._componentsCount,
            a = [],
            u = X(),
            c = e && e.replaceMergeMainTypeMap;
          Ol(this),
            v(t, function (t, e) {
              null != t &&
                (wb.hasClass(e)
                  ? e && (a.push(e), u.set(e, !0))
                  : (i[e] = null == i[e] ? s(t) : l(i[e], t, !0)));
            }),
            c &&
              c.each(function (t, e) {
                wb.hasClass(e) && !u.get(e) && (a.push(e), u.set(e, !0));
              }),
            wb.topologicalTravel(a, wb.getAllClassMainTypes(), n, this),
            this._seriesIndices || Sb(this);
        }),
        (n.prototype.getOption = function () {
          var t = s(this.option);
          return (
            v(t, function (e, n) {
              if (wb.hasClass(n)) {
                for (var i = ur(e), r = i.length, o = !1, a = r - 1; a >= 0; a--)
                  i[a] && !Mr(i[a]) ? (o = !0) : ((i[a] = null), !o && r--);
                (i.length = r), (t[n] = i);
              }
            }),
            delete t[Hb],
            t
          );
        }),
        (n.prototype.getTheme = function () {
          return this._theme;
        }),
        (n.prototype.getLocaleModel = function () {
          return this._locale;
        }),
        (n.prototype.setUpdatePayload = function (t) {
          this._payload = t;
        }),
        (n.prototype.getUpdatePayload = function () {
          return this._payload;
        }),
        (n.prototype.getComponent = function (t, e) {
          var n = this._componentsMap.get(t);
          if (n) {
            var i = n[e || 0];
            if (i) return i;
            if (null == e) for (var r = 0; r < n.length; r++) if (n[r]) return n[r];
          }
        }),
        (n.prototype.queryComponents = function (t) {
          var e = t.mainType;
          if (!e) return [];
          var n = t.index,
            i = t.id,
            r = t.name,
            o = this._componentsMap.get(e);
          if (!o || !o.length) return [];
          var a;
          return (
            null != n
              ? ((a = []),
                v(ur(n), function (t) {
                  o[t] && a.push(o[t]);
                }))
              : (a =
                  null != i
                    ? Ul('id', i, o)
                    : null != r
                    ? Ul('name', r, o)
                    : _(o, function (t) {
                        return !!t;
                      })),
            Xl(a, t)
          );
        }),
        (n.prototype.findComponents = function (t) {
          function e(t) {
            var e = r + 'Index',
              n = r + 'Id',
              i = r + 'Name';
            return !t || (null == t[e] && null == t[n] && null == t[i])
              ? null
              : { mainType: r, index: t[e], id: t[n], name: t[i] };
          }
          function n(e) {
            return t.filter ? _(e, t.filter) : e;
          }
          var i = t.query,
            r = t.mainType,
            o = e(i),
            a = o
              ? this.queryComponents(o)
              : _(this._componentsMap.get(r), function (t) {
                  return !!t;
                });
          return n(Xl(a, t));
        }),
        (n.prototype.eachComponent = function (t, e, n) {
          var i = this._componentsMap;
          if (T(t)) {
            var r = e,
              o = t;
            i.each(function (t, e) {
              for (var n = 0; t && n < t.length; n++) {
                var i = t[n];
                i && o.call(r, e, i, i.componentIndex);
              }
            });
          } else
            for (
              var a = C(t) ? i.get(t) : I(t) ? this.findComponents(t) : null, s = 0;
              a && s < a.length;
              s++
            ) {
              var l = a[s];
              l && e.call(n, l, l.componentIndex);
            }
        }),
        (n.prototype.getSeriesByName = function (t) {
          var e = br(t, null);
          return _(this._componentsMap.get('series'), function (t) {
            return !!t && null != e && t.name === e;
          });
        }),
        (n.prototype.getSeriesByIndex = function (t) {
          return this._componentsMap.get('series')[t];
        }),
        (n.prototype.getSeriesByType = function (t) {
          return _(this._componentsMap.get('series'), function (e) {
            return !!e && e.subType === t;
          });
        }),
        (n.prototype.getSeries = function () {
          return _(this._componentsMap.get('series'), function (t) {
            return !!t;
          });
        }),
        (n.prototype.getSeriesCount = function () {
          return this._componentsCount.get('series');
        }),
        (n.prototype.eachSeries = function (t, e) {
          v(
            this._seriesIndices,
            function (n) {
              var i = this._componentsMap.get('series')[n];
              t.call(e, i, n);
            },
            this
          );
        }),
        (n.prototype.eachRawSeries = function (t, e) {
          v(this._componentsMap.get('series'), function (n) {
            n && t.call(e, n, n.componentIndex);
          });
        }),
        (n.prototype.eachSeriesByType = function (t, e, n) {
          v(
            this._seriesIndices,
            function (i) {
              var r = this._componentsMap.get('series')[i];
              r.subType === t && e.call(n, r, i);
            },
            this
          );
        }),
        (n.prototype.eachRawSeriesByType = function (t, e, n) {
          return v(this.getSeriesByType(t), e, n);
        }),
        (n.prototype.isSeriesFiltered = function (t) {
          return null == this._seriesIndicesMap.get(t.componentIndex);
        }),
        (n.prototype.getCurrentSeriesIndices = function () {
          return (this._seriesIndices || []).slice();
        }),
        (n.prototype.filterSeries = function (t, e) {
          var n = [];
          v(
            this._seriesIndices,
            function (i) {
              var r = this._componentsMap.get('series')[i];
              t.call(e, r, i) && n.push(i);
            },
            this
          ),
            (this._seriesIndices = n),
            (this._seriesIndicesMap = X(n));
        }),
        (n.prototype.restoreData = function (t) {
          Sb(this);
          var e = this._componentsMap,
            n = [];
          e.each(function (t, e) {
            wb.hasClass(e) && n.push(e);
          }),
            wb.topologicalTravel(n, wb.getAllClassMainTypes(), function (n) {
              v(e.get(n), function (e) {
                !e || ('series' === n && Gl(e, t)) || e.restoreData();
              });
            });
        }),
        (n.internalField = (function () {
          (Sb = function (t) {
            var e = (t._seriesIndices = []);
            v(t._componentsMap.get('series'), function (t) {
              t && e.push(t.componentIndex);
            }),
              (t._seriesIndicesMap = X(e));
          }),
            (Mb = function (t, e) {
              (t.option = {}),
                (t.option[Hb] = Wb),
                (t._componentsMap = X({ series: [] })),
                (t._componentsCount = X());
              var n = e.aria;
              I(n) && null == n.enabled && (n.enabled = !0),
                Zl(e, t._theme.option),
                l(e, Cb, !1),
                t._mergeOption(e, null);
            });
        })()),
        n
      );
    })(Xw);
  d(Gb, Vb);
  var Zb,
    Ub,
    Xb,
    Yb,
    qb,
    jb,
    Kb = [
      'getDom',
      'getZr',
      'getWidth',
      'getHeight',
      'getDevicePixelRatio',
      'dispatchAction',
      'isSSR',
      'isDisposed',
      'on',
      'off',
      'getDataURL',
      'getConnectedDataURL',
      'getOption',
      'getId',
      'updateLabelLayout',
    ],
    $b = (function () {
      function t(t) {
        v(
          Kb,
          function (e) {
            this[e] = _v(t[e], t);
          },
          this
        );
      }
      return t;
    })(),
    Qb = {},
    Jb = (function () {
      function t() {
        this._coordinateSystems = [];
      }
      return (
        (t.prototype.create = function (t, e) {
          var n = [];
          v(Qb, function (i) {
            var r = i.create(t, e);
            n = n.concat(r || []);
          }),
            (this._coordinateSystems = n);
        }),
        (t.prototype.update = function (t, e) {
          v(this._coordinateSystems, function (n) {
            n.update && n.update(t, e);
          });
        }),
        (t.prototype.getCoordinateSystems = function () {
          return this._coordinateSystems.slice();
        }),
        (t.register = function (t, e) {
          Qb[t] = e;
        }),
        (t.get = function (t) {
          return Qb[t];
        }),
        t
      );
    })(),
    tS = /^(min|max)?(.+)$/,
    eS = (function () {
      function t(t) {
        (this._timelineOptions = []),
          (this._mediaList = []),
          (this._currentMediaIndices = []),
          (this._api = t);
      }
      return (
        (t.prototype.setOption = function (t, e) {
          t &&
            (v(ur(t.series), function (t) {
              t && t.data && L(t.data) && Z(t.data);
            }),
            v(ur(t.dataset), function (t) {
              t && t.source && L(t.source) && Z(t.source);
            })),
            (t = s(t));
          var n = this._optionBackup,
            i = ql(t, e, !n);
          (this._newBaseOption = i.baseOption),
            n
              ? (i.timelineOptions.length && (n.timelineOptions = i.timelineOptions),
                i.mediaList.length && (n.mediaList = i.mediaList),
                i.mediaDefault && (n.mediaDefault = i.mediaDefault))
              : (this._optionBackup = i);
        }),
        (t.prototype.mountOption = function (t) {
          var e = this._optionBackup;
          return (
            (this._timelineOptions = e.timelineOptions),
            (this._mediaList = e.mediaList),
            (this._mediaDefault = e.mediaDefault),
            (this._currentMediaIndices = []),
            s(t ? e.baseOption : this._newBaseOption)
          );
        }),
        (t.prototype.getTimelineOption = function (t) {
          var e,
            n = this._timelineOptions;
          if (n.length) {
            var i = t.getComponent('timeline');
            i && (e = s(n[i.getCurrentIndex()]));
          }
          return e;
        }),
        (t.prototype.getMediaOption = function () {
          var t = this._api.getWidth(),
            e = this._api.getHeight(),
            n = this._mediaList,
            i = this._mediaDefault,
            r = [],
            o = [];
          if (!n.length && !i) return o;
          for (var a = 0, l = n.length; l > a; a++) jl(n[a].query, t, e) && r.push(a);
          return (
            !r.length && i && (r = [-1]),
            r.length &&
              !$l(r, this._currentMediaIndices) &&
              (o = y(r, function (t) {
                return s(-1 === t ? i.option : n[t].option);
              })),
            (this._currentMediaIndices = r),
            o
          );
        }),
        t
      );
    })(),
    nS = v,
    iS = I,
    rS = ['areaStyle', 'lineStyle', 'nodeStyle', 'linkStyle', 'chordStyle', 'label', 'labelLine'],
    oS = [
      ['x', 'left'],
      ['y', 'top'],
      ['x2', 'right'],
      ['y2', 'bottom'],
    ],
    aS = [
      'grid',
      'geo',
      'parallel',
      'legend',
      'toolbox',
      'title',
      'visualMap',
      'dataZoom',
      'timeline',
    ],
    sS = [
      ['borderRadius', 'barBorderRadius'],
      ['borderColor', 'barBorderColor'],
      ['borderWidth', 'barBorderWidth'],
    ],
    lS = (function () {
      function t(t) {
        (this.data = t.data || (t.sourceFormat === Lb ? {} : [])),
          (this.sourceFormat = t.sourceFormat || Ob),
          (this.seriesLayoutBy = t.seriesLayoutBy || Rb),
          (this.startIndex = t.startIndex || 0),
          (this.dimensionsDetectedCount = t.dimensionsDetectedCount),
          (this.metaRawOption = t.metaRawOption);
        var e = (this.dimensionsDefine = t.dimensionsDefine);
        if (e)
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            null == i.type && zl(this, n) === Bb.Must && (i.type = 'ordinal');
          }
      }
      return t;
    })(),
    uS = (function () {
      function t(t, e) {
        var n = mu(t) ? t : xu(t);
        this._source = n;
        var i = (this._data = n.data);
        n.sourceFormat === Pb && ((this._offset = 0), (this._dimSize = e), (this._data = i)),
          qb(this, i, n);
      }
      return (
        (t.prototype.getSource = function () {
          return this._source;
        }),
        (t.prototype.count = function () {
          return 0;
        }),
        (t.prototype.getItem = function () {}),
        (t.prototype.appendData = function () {}),
        (t.prototype.clean = function () {}),
        (t.protoInitialize = (function () {
          var e = t.prototype;
          (e.pure = !1), (e.persistent = !0);
        })()),
        (t.internalField = (function () {
          function t(t) {
            for (var e = 0; e < t.length; e++) this._data.push(t[e]);
          }
          var e;
          qb = function (t, e, o) {
            var a = o.sourceFormat,
              s = o.seriesLayoutBy,
              l = o.startIndex,
              u = o.dimensionsDefine,
              c = Yb[Lu(a, s)];
            if ((h(t, c), a === Pb)) (t.getItem = n), (t.count = r), (t.fillStorage = i);
            else {
              var p = Du(a, s);
              t.getItem = _v(p, null, e, l, u);
              var f = Iu(a, s);
              t.count = _v(f, null, e, l, u);
            }
          };
          var n = function (t, e) {
              (t -= this._offset), (e = e || []);
              for (var n = this._data, i = this._dimSize, r = i * t, o = 0; i > o; o++)
                e[o] = n[r + o];
              return e;
            },
            i = function (t, e, n, i) {
              for (var r = this._data, o = this._dimSize, a = 0; o > a; a++) {
                for (
                  var s = i[a],
                    l = null == s[0] ? 1 / 0 : s[0],
                    u = null == s[1] ? -1 / 0 : s[1],
                    h = e - t,
                    c = n[a],
                    p = 0;
                  h > p;
                  p++
                ) {
                  var f = r[p * o + a];
                  (c[t + p] = f), l > f && (l = f), f > u && (u = f);
                }
                (s[0] = l), (s[1] = u);
              }
            },
            r = function () {
              return this._data ? this._data.length / this._dimSize : 0;
            };
          (e = {}),
            (e[Ib + '_' + Rb] = { pure: !0, appendData: t }),
            (e[Ib + '_' + Eb] = {
              pure: !0,
              appendData: function () {
                throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
              },
            }),
            (e[Ab] = { pure: !0, appendData: t }),
            (e[Lb] = {
              pure: !0,
              appendData: function (t) {
                var e = this._data;
                v(t, function (t, n) {
                  for (var i = e[n] || (e[n] = []), r = 0; r < (t || []).length; r++) i.push(t[r]);
                });
              },
            }),
            (e[Db] = { appendData: t }),
            (e[Pb] = {
              persistent: !1,
              pure: !0,
              appendData: function (t) {
                this._data = t;
              },
              clean: function () {
                (this._offset += this.count()), (this._data = null);
              },
            }),
            (Yb = e);
        })()),
        t
      );
    })(),
    hS = function (t, e, n, i) {
      return t[i];
    },
    cS =
      ((Zb = {}),
      (Zb[Ib + '_' + Rb] = function (t, e, n, i) {
        return t[i + e];
      }),
      (Zb[Ib + '_' + Eb] = function (t, e, n, i, r) {
        i += e;
        for (var o = r || [], a = t, s = 0; s < a.length; s++) {
          var l = a[s];
          o[s] = l ? l[i] : null;
        }
        return o;
      }),
      (Zb[Ab] = hS),
      (Zb[Lb] = function (t, e, n, i, r) {
        for (var o = r || [], a = 0; a < n.length; a++) {
          var s = n[a].name,
            l = t[s];
          o[a] = l ? l[i] : null;
        }
        return o;
      }),
      (Zb[Db] = hS),
      Zb),
    pS = function (t) {
      return t.length;
    },
    fS =
      ((Ub = {}),
      (Ub[Ib + '_' + Rb] = function (t, e) {
        return Math.max(0, t.length - e);
      }),
      (Ub[Ib + '_' + Eb] = function (t, e) {
        var n = t[0];
        return n ? Math.max(0, n.length - e) : 0;
      }),
      (Ub[Ab] = pS),
      (Ub[Lb] = function (t, e, n) {
        var i = n[0].name,
          r = t[i];
        return r ? r.length : 0;
      }),
      (Ub[Db] = pS),
      Ub),
    dS = function (t, e) {
      return t[e];
    },
    gS =
      ((Xb = {}),
      (Xb[Ib] = dS),
      (Xb[Ab] = function (t, e, n) {
        return t[n];
      }),
      (Xb[Lb] = dS),
      (Xb[Db] = function (t, e) {
        var n = cr(t);
        return n instanceof Array ? n[e] : n;
      }),
      (Xb[Pb] = dS),
      Xb),
    vS = /\{@(.+?)\}/g,
    yS = (function () {
      function t() {}
      return (
        (t.prototype.getDataParams = function (t, e) {
          var n = this.getData(e),
            i = this.getRawValue(t, e),
            r = n.getRawIndex(t),
            o = n.getName(t),
            a = n.getRawDataItem(t),
            s = n.getItemVisual(t, 'style'),
            l = s && s[n.getItemVisual(t, 'drawType') || 'fill'],
            u = s && s.stroke,
            h = this.mainType,
            c = 'series' === h,
            p = n.userOutput && n.userOutput.get();
          return {
            componentType: h,
            componentSubType: this.subType,
            componentIndex: this.componentIndex,
            seriesType: c ? this.subType : null,
            seriesIndex: this.seriesIndex,
            seriesId: c ? this.id : null,
            seriesName: c ? this.name : null,
            name: o,
            dataIndex: r,
            data: a,
            dataType: e,
            value: i,
            color: l,
            borderColor: u,
            dimensionNames: p ? p.fullDimensions : null,
            encode: p ? p.encode : null,
            $vars: ['seriesName', 'name', 'value'],
          };
        }),
        (t.prototype.getFormattedLabel = function (t, e, n, i, r, o) {
          e = e || 'normal';
          var a = this.getData(n),
            s = this.getDataParams(t, n);
          if (
            (o && (s.value = o.interpolatedValue),
            null != i && M(s.value) && (s.value = s.value[i]),
            !r)
          ) {
            var l = a.getItemModel(t);
            r = l.get('normal' === e ? ['label', 'formatter'] : [e, 'label', 'formatter']);
          }
          if (T(r)) return (s.status = e), (s.dimensionIndex = i), r(s);
          if (C(r)) {
            var u = wl(r, s);
            return u.replace(vS, function (e, n) {
              var i = n.length,
                r = n;
              '[' === r.charAt(0) && ']' === r.charAt(i - 1) && (r = +r.slice(1, i - 1));
              var s = Pu(a, t, r);
              if (o && M(o.interpolatedValue)) {
                var l = a.getDimensionIndex(r);
                l >= 0 && (s = o.interpolatedValue[l]);
              }
              return null != s ? s + '' : '';
            });
          }
        }),
        (t.prototype.getRawValue = function (t, e) {
          return Pu(this.getData(e), t);
        }),
        (t.prototype.formatTooltip = function () {}),
        t
      );
    })(),
    mS = (function () {
      function t(t) {
        (t = t || {}),
          (this._reset = t.reset),
          (this._plan = t.plan),
          (this._count = t.count),
          (this._onDirty = t.onDirty),
          (this._dirty = !0);
      }
      return (
        (t.prototype.perform = function (t) {
          function e(t) {
            return !(t >= 1) && (t = 1), t;
          }
          var n = this._upstream,
            i = t && t.skip;
          if (this._dirty && n) {
            var r = this.context;
            r.data = r.outputData = n.context.outputData;
          }
          this.__pipeline && (this.__pipeline.currentTask = this);
          var o;
          this._plan && !i && (o = this._plan(this.context));
          var a = e(this._modBy),
            s = this._modDataCount || 0,
            l = e(t && t.modBy),
            u = (t && t.modDataCount) || 0;
          (a !== l || s !== u) && (o = 'reset');
          var h;
          (this._dirty || 'reset' === o) && ((this._dirty = !1), (h = this._doReset(i))),
            (this._modBy = l),
            (this._modDataCount = u);
          var c = t && t.step;
          if (
            ((this._dueEnd = n ? n._outputDueEnd : this._count ? this._count(this.context) : 1 / 0),
            this._progress)
          ) {
            var p = this._dueIndex,
              f = Math.min(null != c ? this._dueIndex + c : 1 / 0, this._dueEnd);
            if (!i && (h || f > p)) {
              var d = this._progress;
              if (M(d)) for (var g = 0; g < d.length; g++) this._doProgress(d[g], p, f, l, u);
              else this._doProgress(d, p, f, l, u);
            }
            this._dueIndex = f;
            var v = null != this._settedOutputEnd ? this._settedOutputEnd : f;
            this._outputDueEnd = v;
          } else
            this._dueIndex = this._outputDueEnd =
              null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;
          return this.unfinished();
        }),
        (t.prototype.dirty = function () {
          (this._dirty = !0), this._onDirty && this._onDirty(this.context);
        }),
        (t.prototype._doProgress = function (t, e, n, i, r) {
          _S.reset(e, n, i, r),
            (this._callingProgress = t),
            this._callingProgress({ start: e, end: n, count: n - e, next: _S.next }, this.context);
        }),
        (t.prototype._doReset = function (t) {
          (this._dueIndex = this._outputDueEnd = this._dueEnd = 0), (this._settedOutputEnd = null);
          var e, n;
          !t &&
            this._reset &&
            ((e = this._reset(this.context)),
            e && e.progress && ((n = e.forceFirstProgress), (e = e.progress)),
            M(e) && !e.length && (e = null)),
            (this._progress = e),
            (this._modBy = this._modDataCount = null);
          var i = this._downstream;
          return i && i.dirty(), n;
        }),
        (t.prototype.unfinished = function () {
          return this._progress && this._dueIndex < this._dueEnd;
        }),
        (t.prototype.pipe = function (t) {
          (this._downstream !== t || this._dirty) &&
            ((this._downstream = t), (t._upstream = this), t.dirty());
        }),
        (t.prototype.dispose = function () {
          this._disposed ||
            (this._upstream && (this._upstream._downstream = null),
            this._downstream && (this._downstream._upstream = null),
            (this._dirty = !1),
            (this._disposed = !0));
        }),
        (t.prototype.getUpstream = function () {
          return this._upstream;
        }),
        (t.prototype.getDownstream = function () {
          return this._downstream;
        }),
        (t.prototype.setOutputEnd = function (t) {
          this._outputDueEnd = this._settedOutputEnd = t;
        }),
        t
      );
    })(),
    _S = (function () {
      function t() {
        return n > i ? i++ : null;
      }
      function e() {
        var t = (i % a) * r + Math.ceil(i / a),
          e = i >= n ? null : o > t ? t : i;
        return i++, e;
      }
      var n,
        i,
        r,
        o,
        a,
        s = {
          reset: function (l, u, h, c) {
            (i = l),
              (n = u),
              (r = h),
              (o = c),
              (a = Math.ceil(o / r)),
              (s.next = r > 1 && o > 0 ? e : t);
          },
        };
      return s;
    })(),
    xS =
      (X({
        number: function (t) {
          return parseFloat(t);
        },
        time: function (t) {
          return +Ki(t);
        },
        trim: function (t) {
          return C(t) ? G(t) : t;
        },
      }),
      {
        lt: function (t, e) {
          return e > t;
        },
        lte: function (t, e) {
          return e >= t;
        },
        gt: function (t, e) {
          return t > e;
        },
        gte: function (t, e) {
          return t >= e;
        },
      }),
    wS =
      ((function () {
        function t(t, e) {
          if (!D(e)) {
            var n = '';
            sr(n);
          }
          (this._opFn = xS[t]), (this._rvalFloat = nr(e));
        }
        return (
          (t.prototype.evaluate = function (t) {
            return D(t) ? this._opFn(t, this._rvalFloat) : this._opFn(nr(t), this._rvalFloat);
          }),
          t
        );
      })(),
      (function () {
        function t(t, e) {
          var n = 'desc' === t;
          (this._resultLT = n ? 1 : -1),
            null == e && (e = n ? 'min' : 'max'),
            (this._incomparable = 'min' === e ? -1 / 0 : 1 / 0);
        }
        return (
          (t.prototype.evaluate = function (t, e) {
            var n = D(t) ? t : nr(t),
              i = D(e) ? e : nr(e),
              r = isNaN(n),
              o = isNaN(i);
            if ((r && (n = this._incomparable), o && (i = this._incomparable), r && o)) {
              var a = C(t),
                s = C(e);
              a && (n = s ? t : 0), s && (i = a ? e : 0);
            }
            return i > n ? this._resultLT : n > i ? -this._resultLT : 0;
          }),
          t
        );
      })(),
      (function () {
        function t(t, e) {
          (this._rval = e),
            (this._isEQ = t),
            (this._rvalTypeof = typeof e),
            (this._rvalFloat = nr(e));
        }
        return (
          (t.prototype.evaluate = function (t) {
            var e = t === this._rval;
            if (!e) {
              var n = typeof t;
              n === this._rvalTypeof ||
                ('number' !== n && 'number' !== this._rvalTypeof) ||
                (e = nr(t) === this._rvalFloat);
            }
            return this._isEQ ? e : !e;
          }),
          t
        );
      })(),
      (function () {
        function t() {}
        return (
          (t.prototype.getRawData = function () {
            throw new Error('not supported');
          }),
          (t.prototype.getRawDataItem = function () {
            throw new Error('not supported');
          }),
          (t.prototype.cloneRawData = function () {}),
          (t.prototype.getDimensionInfo = function () {}),
          (t.prototype.cloneAllDimensionInfo = function () {}),
          (t.prototype.count = function () {}),
          (t.prototype.retrieveValue = function () {}),
          (t.prototype.retrieveValueFromItem = function () {}),
          (t.prototype.convertValue = function (t, e) {
            return Ru(t, e);
          }),
          t
        );
      })()),
    bS = X(),
    SS = 'undefined',
    MS = typeof Uint32Array === SS ? Array : Uint32Array,
    TS = typeof Uint16Array === SS ? Array : Uint16Array,
    CS = typeof Int32Array === SS ? Array : Int32Array,
    kS = typeof Float64Array === SS ? Array : Float64Array,
    DS = { float: kS, int: CS, ordinal: Array, number: Array, time: kS },
    IS = (function () {
      function t() {
        (this._chunks = []),
          (this._rawExtent = []),
          (this._extent = []),
          (this._count = 0),
          (this._rawCount = 0),
          (this._calcDimNameToIdx = X());
      }
      return (
        (t.prototype.initData = function (t, e, n) {
          (this._provider = t),
            (this._chunks = []),
            (this._indices = null),
            (this.getRawIndex = this._getRawIdxIdentity);
          var i = t.getSource(),
            r = (this.defaultDimValueGetter = jb[i.sourceFormat]);
          (this._dimValueGetter = n || r), (this._rawExtent = []);
          ku(i);
          (this._dimensions = y(e, function (t) {
            return { type: t.type, property: t.property };
          })),
            this._initDataFromProvider(0, t.count());
        }),
        (t.prototype.getProvider = function () {
          return this._provider;
        }),
        (t.prototype.getSource = function () {
          return this._provider.getSource();
        }),
        (t.prototype.ensureCalculationDimension = function (t, e) {
          var n = this._calcDimNameToIdx,
            i = this._dimensions,
            r = n.get(t);
          if (null != r) {
            if (i[r].type === e) return r;
          } else r = i.length;
          return (
            (i[r] = { type: e }),
            n.set(t, r),
            (this._chunks[r] = new DS[e || 'float'](this._rawCount)),
            (this._rawExtent[r] = Uu()),
            r
          );
        }),
        (t.prototype.collectOrdinalMeta = function (t, e) {
          var n = this._chunks[t],
            i = this._dimensions[t],
            r = this._rawExtent,
            o = i.ordinalOffset || 0,
            a = n.length;
          0 === o && (r[t] = Uu());
          for (var s = r[t], l = o; a > l; l++) {
            var u = (n[l] = e.parseAndCollect(n[l]));
            isNaN(u) || ((s[0] = Math.min(u, s[0])), (s[1] = Math.max(u, s[1])));
          }
          (i.ordinalMeta = e), (i.ordinalOffset = a), (i.type = 'ordinal');
        }),
        (t.prototype.getOrdinalMeta = function (t) {
          var e = this._dimensions[t],
            n = e.ordinalMeta;
          return n;
        }),
        (t.prototype.getDimensionProperty = function (t) {
          var e = this._dimensions[t];
          return e && e.property;
        }),
        (t.prototype.appendData = function (t) {
          var e = this._provider,
            n = this.count();
          e.appendData(t);
          var i = e.count();
          return e.persistent || (i += n), i > n && this._initDataFromProvider(n, i, !0), [n, i];
        }),
        (t.prototype.appendValues = function (t, e) {
          for (
            var n = this._chunks,
              i = this._dimensions,
              r = i.length,
              o = this._rawExtent,
              a = this.count(),
              s = a + Math.max(t.length, e || 0),
              l = 0;
            r > l;
            l++
          ) {
            var u = i[l];
            Yu(n, l, u.type, s, !0);
          }
          for (var h = [], c = a; s > c; c++)
            for (var p = c - a, f = 0; r > f; f++) {
              var u = i[f],
                d = jb.arrayRows.call(this, t[p] || h, u.property, p, f);
              n[f][c] = d;
              var g = o[f];
              d < g[0] && (g[0] = d), d > g[1] && (g[1] = d);
            }
          return (this._rawCount = this._count = s), { start: a, end: s };
        }),
        (t.prototype._initDataFromProvider = function (t, e, n) {
          for (
            var i = this._provider,
              r = this._chunks,
              o = this._dimensions,
              a = o.length,
              s = this._rawExtent,
              l = y(o, function (t) {
                return t.property;
              }),
              u = 0;
            a > u;
            u++
          ) {
            var h = o[u];
            s[u] || (s[u] = Uu()), Yu(r, u, h.type, e, n);
          }
          if (i.fillStorage) i.fillStorage(t, e, r, s);
          else
            for (var c = [], p = t; e > p; p++) {
              c = i.getItem(p, c);
              for (var f = 0; a > f; f++) {
                var d = r[f],
                  g = this._dimValueGetter(c, l[f], p, f);
                d[p] = g;
                var v = s[f];
                g < v[0] && (v[0] = g), g > v[1] && (v[1] = g);
              }
            }
          !i.persistent && i.clean && i.clean(),
            (this._rawCount = this._count = e),
            (this._extent = []);
        }),
        (t.prototype.count = function () {
          return this._count;
        }),
        (t.prototype.get = function (t, e) {
          if (!(e >= 0 && e < this._count)) return 0 / 0;
          var n = this._chunks[t];
          return n ? n[this.getRawIndex(e)] : 0 / 0;
        }),
        (t.prototype.getValues = function (t, e) {
          var n = [],
            i = [];
          if (null == e) {
            (e = t), (t = []);
            for (var r = 0; r < this._dimensions.length; r++) i.push(r);
          } else i = t;
          for (var r = 0, o = i.length; o > r; r++) n.push(this.get(i[r], e));
          return n;
        }),
        (t.prototype.getByRawIndex = function (t, e) {
          if (!(e >= 0 && e < this._rawCount)) return 0 / 0;
          var n = this._chunks[t];
          return n ? n[e] : 0 / 0;
        }),
        (t.prototype.getSum = function (t) {
          var e = this._chunks[t],
            n = 0;
          if (e)
            for (var i = 0, r = this.count(); r > i; i++) {
              var o = this.get(t, i);
              isNaN(o) || (n += o);
            }
          return n;
        }),
        (t.prototype.getMedian = function (t) {
          var e = [];
          this.each([t], function (t) {
            isNaN(t) || e.push(t);
          });
          var n = e.sort(function (t, e) {
              return t - e;
            }),
            i = this.count();
          return 0 === i ? 0 : i % 2 === 1 ? n[(i - 1) / 2] : (n[i / 2] + n[i / 2 - 1]) / 2;
        }),
        (t.prototype.indexOfRawIndex = function (t) {
          if (t >= this._rawCount || 0 > t) return -1;
          if (!this._indices) return t;
          var e = this._indices,
            n = e[t];
          if (null != n && n < this._count && n === t) return t;
          for (var i = 0, r = this._count - 1; r >= i; ) {
            var o = ((i + r) / 2) | 0;
            if (e[o] < t) i = o + 1;
            else {
              if (!(e[o] > t)) return o;
              r = o - 1;
            }
          }
          return -1;
        }),
        (t.prototype.indicesOfNearest = function (t, e, n) {
          var i = this._chunks,
            r = i[t],
            o = [];
          if (!r) return o;
          null == n && (n = 1 / 0);
          for (var a = 1 / 0, s = -1, l = 0, u = 0, h = this.count(); h > u; u++) {
            var c = this.getRawIndex(u),
              p = e - r[c],
              f = Math.abs(p);
            n >= f &&
              ((a > f || (f === a && p >= 0 && 0 > s)) && ((a = f), (s = p), (l = 0)),
              p === s && (o[l++] = u));
          }
          return (o.length = l), o;
        }),
        (t.prototype.getIndices = function () {
          var t,
            e = this._indices;
          if (e) {
            var n = e.constructor,
              i = this._count;
            if (n === Array) {
              t = new n(i);
              for (var r = 0; i > r; r++) t[r] = e[r];
            } else t = new n(e.buffer, 0, i);
          } else {
            var n = Zu(this._rawCount);
            t = new n(this.count());
            for (var r = 0; r < t.length; r++) t[r] = r;
          }
          return t;
        }),
        (t.prototype.filter = function (t, e) {
          if (!this._count) return this;
          for (
            var n = this.clone(),
              i = n.count(),
              r = Zu(n._rawCount),
              o = new r(i),
              a = [],
              s = t.length,
              l = 0,
              u = t[0],
              h = n._chunks,
              c = 0;
            i > c;
            c++
          ) {
            var p = void 0,
              f = n.getRawIndex(c);
            if (0 === s) p = e(c);
            else if (1 === s) {
              var d = h[u][f];
              p = e(d, c);
            } else {
              for (var g = 0; s > g; g++) a[g] = h[t[g]][f];
              (a[g] = c), (p = e.apply(null, a));
            }
            p && (o[l++] = f);
          }
          return (
            i > l && (n._indices = o), (n._count = l), (n._extent = []), n._updateGetRawIdx(), n
          );
        }),
        (t.prototype.selectRange = function (t) {
          var e = this.clone(),
            n = e._count;
          if (!n) return this;
          var i = w(t),
            r = i.length;
          if (!r) return this;
          var o = e.count(),
            a = Zu(e._rawCount),
            s = new a(o),
            l = 0,
            u = i[0],
            h = t[u][0],
            c = t[u][1],
            p = e._chunks,
            f = !1;
          if (!e._indices) {
            var d = 0;
            if (1 === r) {
              for (var g = p[i[0]], v = 0; n > v; v++) {
                var y = g[v];
                ((y >= h && c >= y) || isNaN(y)) && (s[l++] = d), d++;
              }
              f = !0;
            } else if (2 === r) {
              for (
                var g = p[i[0]], m = p[i[1]], _ = t[i[1]][0], x = t[i[1]][1], v = 0;
                n > v;
                v++
              ) {
                var y = g[v],
                  b = m[v];
                ((y >= h && c >= y) || isNaN(y)) &&
                  ((b >= _ && x >= b) || isNaN(b)) &&
                  (s[l++] = d),
                  d++;
              }
              f = !0;
            }
          }
          if (!f)
            if (1 === r)
              for (var v = 0; o > v; v++) {
                var S = e.getRawIndex(v),
                  y = p[i[0]][S];
                ((y >= h && c >= y) || isNaN(y)) && (s[l++] = S);
              }
            else
              for (var v = 0; o > v; v++) {
                for (var M = !0, S = e.getRawIndex(v), T = 0; r > T; T++) {
                  var C = i[T],
                    y = p[C][S];
                  (y < t[C][0] || y > t[C][1]) && (M = !1);
                }
                M && (s[l++] = e.getRawIndex(v));
              }
          return (
            o > l && (e._indices = s), (e._count = l), (e._extent = []), e._updateGetRawIdx(), e
          );
        }),
        (t.prototype.map = function (t, e) {
          var n = this.clone(t);
          return this._updateDims(n, t, e), n;
        }),
        (t.prototype.modify = function (t, e) {
          this._updateDims(this, t, e);
        }),
        (t.prototype._updateDims = function (t, e, n) {
          for (
            var i = t._chunks, r = [], o = e.length, a = t.count(), s = [], l = t._rawExtent, u = 0;
            u < e.length;
            u++
          )
            l[e[u]] = Uu();
          for (var h = 0; a > h; h++) {
            for (var c = t.getRawIndex(h), p = 0; o > p; p++) s[p] = i[e[p]][c];
            s[o] = h;
            var f = n && n.apply(null, s);
            if (null != f) {
              'object' != typeof f && ((r[0] = f), (f = r));
              for (var u = 0; u < f.length; u++) {
                var d = e[u],
                  g = f[u],
                  v = l[d],
                  y = i[d];
                y && (y[c] = g), g < v[0] && (v[0] = g), g > v[1] && (v[1] = g);
              }
            }
          }
        }),
        (t.prototype.lttbDownSample = function (t, e) {
          var n,
            i,
            r,
            o = this.clone([t], !0),
            a = o._chunks,
            s = a[t],
            l = this.count(),
            u = 0,
            h = Math.floor(1 / e),
            c = this.getRawIndex(0),
            p = new (Zu(this._rawCount))(Math.min(2 * (Math.ceil(l / h) + 2), l));
          p[u++] = c;
          for (var f = 1; l - 1 > f; f += h) {
            for (
              var d = Math.min(f + h, l - 1),
                g = Math.min(f + 2 * h, l),
                v = (g + d) / 2,
                y = 0,
                m = d;
              g > m;
              m++
            ) {
              var _ = this.getRawIndex(m),
                x = s[_];
              isNaN(x) || (y += x);
            }
            y /= g - d;
            var w = f,
              b = Math.min(f + h, l),
              S = f - 1,
              M = s[c];
            (n = -1), (r = w);
            for (var T = -1, C = 0, m = w; b > m; m++) {
              var _ = this.getRawIndex(m),
                x = s[_];
              isNaN(x)
                ? (C++, 0 > T && (T = _))
                : ((i = Math.abs((S - v) * (x - M) - (S - m) * (y - M))),
                  i > n && ((n = i), (r = _)));
            }
            C > 0 && b - w > C && ((p[u++] = Math.min(T, r)), (r = Math.max(T, r))),
              (p[u++] = r),
              (c = r);
          }
          return (
            (p[u++] = this.getRawIndex(l - 1)),
            (o._count = u),
            (o._indices = p),
            (o.getRawIndex = this._getRawIdx),
            o
          );
        }),
        (t.prototype.downSample = function (t, e, n, i) {
          for (
            var r = this.clone([t], !0),
              o = r._chunks,
              a = [],
              s = Math.floor(1 / e),
              l = o[t],
              u = this.count(),
              h = (r._rawExtent[t] = Uu()),
              c = new (Zu(this._rawCount))(Math.ceil(u / s)),
              p = 0,
              f = 0;
            u > f;
            f += s
          ) {
            s > u - f && ((s = u - f), (a.length = s));
            for (var d = 0; s > d; d++) {
              var g = this.getRawIndex(f + d);
              a[d] = l[g];
            }
            var v = n(a),
              y = this.getRawIndex(Math.min(f + i(a, v) || 0, u - 1));
            (l[y] = v), v < h[0] && (h[0] = v), v > h[1] && (h[1] = v), (c[p++] = y);
          }
          return (r._count = p), (r._indices = c), r._updateGetRawIdx(), r;
        }),
        (t.prototype.each = function (t, e) {
          if (this._count)
            for (var n = t.length, i = this._chunks, r = 0, o = this.count(); o > r; r++) {
              var a = this.getRawIndex(r);
              switch (n) {
                case 0:
                  e(r);
                  break;
                case 1:
                  e(i[t[0]][a], r);
                  break;
                case 2:
                  e(i[t[0]][a], i[t[1]][a], r);
                  break;
                default:
                  for (var s = 0, l = []; n > s; s++) l[s] = i[t[s]][a];
                  (l[s] = r), e.apply(null, l);
              }
            }
        }),
        (t.prototype.getDataExtent = function (t) {
          var e = this._chunks[t],
            n = Uu();
          if (!e) return n;
          var i,
            r = this.count(),
            o = !this._indices;
          if (o) return this._rawExtent[t].slice();
          if ((i = this._extent[t])) return i.slice();
          i = n;
          for (var a = i[0], s = i[1], l = 0; r > l; l++) {
            var u = this.getRawIndex(l),
              h = e[u];
            a > h && (a = h), h > s && (s = h);
          }
          return (i = [a, s]), (this._extent[t] = i), i;
        }),
        (t.prototype.getRawDataItem = function (t) {
          var e = this.getRawIndex(t);
          if (this._provider.persistent) return this._provider.getItem(e);
          for (var n = [], i = this._chunks, r = 0; r < i.length; r++) n.push(i[r][e]);
          return n;
        }),
        (t.prototype.clone = function (e, n) {
          var i = new t(),
            r = this._chunks,
            o =
              e &&
              m(
                e,
                function (t, e) {
                  return (t[e] = !0), t;
                },
                {}
              );
          if (o) for (var a = 0; a < r.length; a++) i._chunks[a] = o[a] ? Xu(r[a]) : r[a];
          else i._chunks = r;
          return (
            this._copyCommonProps(i),
            n || (i._indices = this._cloneIndices()),
            i._updateGetRawIdx(),
            i
          );
        }),
        (t.prototype._copyCommonProps = function (t) {
          (t._count = this._count),
            (t._rawCount = this._rawCount),
            (t._provider = this._provider),
            (t._dimensions = this._dimensions),
            (t._extent = s(this._extent)),
            (t._rawExtent = s(this._rawExtent));
        }),
        (t.prototype._cloneIndices = function () {
          if (this._indices) {
            var t = this._indices.constructor,
              e = void 0;
            if (t === Array) {
              var n = this._indices.length;
              e = new t(n);
              for (var i = 0; n > i; i++) e[i] = this._indices[i];
            } else e = new t(this._indices);
            return e;
          }
          return null;
        }),
        (t.prototype._getRawIdxIdentity = function (t) {
          return t;
        }),
        (t.prototype._getRawIdx = function (t) {
          return t < this._count && t >= 0 ? this._indices[t] : -1;
        }),
        (t.prototype._updateGetRawIdx = function () {
          this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
        }),
        (t.internalField = (function () {
          function t(t, e, n, i) {
            return Ru(t[i], this._dimensions[i]);
          }
          jb = {
            arrayRows: t,
            objectRows: function (t, e, n, i) {
              return Ru(t[e], this._dimensions[i]);
            },
            keyedColumns: t,
            original: function (t, e, n, i) {
              var r = t && (null == t.value ? t : t.value);
              return Ru(r instanceof Array ? r[i] : r, this._dimensions[i]);
            },
            typedArray: function (t, e, n, i) {
              return t[i];
            },
          };
        })()),
        t
      );
    })(),
    AS = (function () {
      function t(t) {
        (this._sourceList = []),
          (this._storeList = []),
          (this._upstreamSignList = []),
          (this._versionSignBase = 0),
          (this._dirty = !0),
          (this._sourceHost = t);
      }
      return (
        (t.prototype.dirty = function () {
          this._setLocalSource([], []), (this._storeList = []), (this._dirty = !0);
        }),
        (t.prototype._setLocalSource = function (t, e) {
          (this._sourceList = t),
            (this._upstreamSignList = e),
            this._versionSignBase++,
            this._versionSignBase > 9e10 && (this._versionSignBase = 0);
        }),
        (t.prototype._getVersionSign = function () {
          return this._sourceHost.uid + '_' + this._versionSignBase;
        }),
        (t.prototype.prepareSource = function () {
          this._isDirty() && (this._createSource(), (this._dirty = !1));
        }),
        (t.prototype._createSource = function () {
          this._setLocalSource([], []);
          var t,
            e,
            n = this._sourceHost,
            i = this._getUpstreamSourceManagers(),
            r = !!i.length;
          if (ju(n)) {
            var o = n,
              a = void 0,
              s = void 0,
              l = void 0;
            if (r) {
              var u = i[0];
              u.prepareSource(),
                (l = u.getSource()),
                (a = l.data),
                (s = l.sourceFormat),
                (e = [u._getVersionSign()]);
            } else (a = o.get('data', !0)), (s = L(a) ? Pb : Db), (e = []);
            var h = this._getSourceMetaRawOption() || {},
              c = (l && l.metaRawOption) || {},
              p = N(h.seriesLayoutBy, c.seriesLayoutBy) || null,
              f = N(h.sourceHeader, c.sourceHeader),
              d = N(h.dimensions, c.dimensions),
              g = p !== c.seriesLayoutBy || !!f != !!c.sourceHeader || d;
            t = g ? [_u(a, { seriesLayoutBy: p, sourceHeader: f, dimensions: d }, s)] : [];
          } else {
            var v = n;
            if (r) {
              var y = this._applyTransform(i);
              (t = y.sourceList), (e = y.upstreamSignList);
            } else {
              var m = v.get('source', !0);
              (t = [_u(m, this._getSourceMetaRawOption(), null)]), (e = []);
            }
          }
          this._setLocalSource(t, e);
        }),
        (t.prototype._applyTransform = function (t) {
          var e = this._sourceHost,
            n = e.get('transform', !0),
            i = e.get('fromTransformResult', !0);
          if (null != i) {
            var r = '';
            1 !== t.length && Ku(r);
          }
          var o,
            a = [],
            s = [];
          return (
            v(t, function (t) {
              t.prepareSource();
              var e = t.getSource(i || 0),
                n = '';
              null == i || e || Ku(n), a.push(e), s.push(t._getVersionSign());
            }),
            n ? (o = Hu(n, a, { datasetIndex: e.componentIndex })) : null != i && (o = [wu(a[0])]),
            { sourceList: o, upstreamSignList: s }
          );
        }),
        (t.prototype._isDirty = function () {
          if (this._dirty) return !0;
          for (var t = this._getUpstreamSourceManagers(), e = 0; e < t.length; e++) {
            var n = t[e];
            if (n._isDirty() || this._upstreamSignList[e] !== n._getVersionSign()) return !0;
          }
        }),
        (t.prototype.getSource = function (t) {
          t = t || 0;
          var e = this._sourceList[t];
          if (!e) {
            var n = this._getUpstreamSourceManagers();
            return n[0] && n[0].getSource(t);
          }
          return e;
        }),
        (t.prototype.getSharedDataStore = function (t) {
          var e = t.makeStoreSchema();
          return this._innerGetDataStore(e.dimensions, t.source, e.hash);
        }),
        (t.prototype._innerGetDataStore = function (t, e, n) {
          var i = 0,
            r = this._storeList,
            o = r[i];
          o || (o = r[i] = {});
          var a = o[n];
          if (!a) {
            var s = this._getUpstreamSourceManagers()[0];
            ju(this._sourceHost) && s
              ? (a = s._innerGetDataStore(t, e, n))
              : ((a = new IS()), a.initData(new uS(e, t.length), t)),
              (o[n] = a);
          }
          return a;
        }),
        (t.prototype._getUpstreamSourceManagers = function () {
          var t = this._sourceHost;
          if (ju(t)) {
            var e = El(t);
            return e ? [e.getSourceManager()] : [];
          }
          return y(Bl(t), function (t) {
            return t.getSourceManager();
          });
        }),
        (t.prototype._getSourceMetaRawOption = function () {
          var t,
            e,
            n,
            i = this._sourceHost;
          if (ju(i))
            (t = i.get('seriesLayoutBy', !0)),
              (e = i.get('sourceHeader', !0)),
              (n = i.get('dimensions', !0));
          else if (!this._getUpstreamSourceManagers().length) {
            var r = i;
            (t = r.get('seriesLayoutBy', !0)),
              (e = r.get('sourceHeader', !0)),
              (n = r.get('dimensions', !0));
          }
          return { seriesLayoutBy: t, sourceHeader: e, dimensions: n };
        }),
        t
      );
    })(),
    LS =
      ((function () {
        function t() {
          (this.richTextStyles = {}), (this._nextStyleNameId = rr());
        }
        return (
          (t.prototype._generateStyleName = function () {
            return '__EC_aUTo_' + this._nextStyleNameId++;
          }),
          (t.prototype.makeTooltipMarker = function (t, e, n) {
            var i = 'richText' === n ? this._generateStyleName() : null,
              r = bl({ color: e, type: t, renderMode: n, markerId: i });
            return C(r) ? r : ((this.richTextStyles[i] = r.style), r.content);
          }),
          (t.prototype.wrapRichTextStyle = function (t, e) {
            var n = {};
            M(e)
              ? v(e, function (t) {
                  return h(n, t);
                })
              : h(n, e);
            var i = this._generateStyleName();
            return (this.richTextStyles[i] = n), '{' + i + '|' + t + '}';
          }),
          t
        );
      })(),
      Dr()),
    PS = '__universalTransitionEnabled',
    OS = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e._selectedDataIndicesMap = {}), e;
      }
      return (
        e(n, t),
        (n.prototype.init = function (t, e, n) {
          (this.seriesIndex = this.componentIndex),
            (this.dataTask = Ou({ count: rh, reset: oh })),
            (this.dataTask.context = { model: this }),
            this.mergeDefaultAndTheme(t, n);
          var i = (LS(this).sourceManager = new AS(this));
          i.prepareSource();
          var r = this.getInitialData(t, n);
          sh(r, this),
            (this.dataTask.context.data = r),
            (LS(this).dataBeforeProcessed = r),
            nh(this),
            this._initSelectedMapFromData(r);
        }),
        (n.prototype.mergeDefaultAndTheme = function (t, e) {
          var n = Dl(this),
            i = n ? Al(t) : {},
            r = this.subType;
          wb.hasClass(r) && (r += 'Series'),
            l(t, e.getTheme().get(this.subType)),
            l(t, this.getDefaultOption()),
            hr(t, 'label', ['show']),
            this.fillDataTextStyle(t.data),
            n && Il(t, i, n);
        }),
        (n.prototype.mergeOption = function (t, e) {
          (t = l(this.option, t, !0)), this.fillDataTextStyle(t.data);
          var n = Dl(this);
          n && Il(this.option, t, n);
          var i = LS(this).sourceManager;
          i.dirty(), i.prepareSource();
          var r = this.getInitialData(t, e);
          sh(r, this),
            this.dataTask.dirty(),
            (this.dataTask.context.data = r),
            (LS(this).dataBeforeProcessed = r),
            nh(this),
            this._initSelectedMapFromData(r);
        }),
        (n.prototype.fillDataTextStyle = function (t) {
          if (t && !L(t))
            for (var e = ['show'], n = 0; n < t.length; n++)
              t[n] && t[n].label && hr(t[n], 'label', e);
        }),
        (n.prototype.getInitialData = function () {}),
        (n.prototype.appendData = function (t) {
          var e = this.getRawData();
          e.appendData(t.data);
        }),
        (n.prototype.getData = function (t) {
          var e = uh(this);
          if (e) {
            var n = e.context.data;
            return null == t ? n : n.getLinkedData(t);
          }
          return LS(this).data;
        }),
        (n.prototype.getAllData = function () {
          var t = this.getData();
          return t && t.getLinkedDataAll ? t.getLinkedDataAll() : [{ data: t }];
        }),
        (n.prototype.setData = function (t) {
          var e = uh(this);
          if (e) {
            var n = e.context;
            (n.outputData = t), e !== this.dataTask && (n.data = t);
          }
          LS(this).data = t;
        }),
        (n.prototype.getEncode = function () {
          var t = this.get('encode', !0);
          return t ? X(t) : void 0;
        }),
        (n.prototype.getSourceManager = function () {
          return LS(this).sourceManager;
        }),
        (n.prototype.getSource = function () {
          return this.getSourceManager().getSource();
        }),
        (n.prototype.getRawData = function () {
          return LS(this).dataBeforeProcessed;
        }),
        (n.prototype.getColorBy = function () {
          var t = this.get('colorBy');
          return t || 'series';
        }),
        (n.prototype.isColorBySeries = function () {
          return 'series' === this.getColorBy();
        }),
        (n.prototype.getBaseAxis = function () {
          var t = this.coordinateSystem;
          return t && t.getBaseAxis && t.getBaseAxis();
        }),
        (n.prototype.formatTooltip = function (t, e) {
          return Ju({ series: this, dataIndex: t, multipleSeries: e });
        }),
        (n.prototype.isAnimationEnabled = function () {
          var t = this.ecModel;
          if ($g.node && (!t || !t.ssr)) return !1;
          var e = this.getShallow('animation');
          return (
            e && this.getData().count() > this.getShallow('animationThreshold') && (e = !1), !!e
          );
        }),
        (n.prototype.restoreData = function () {
          this.dataTask.dirty();
        }),
        (n.prototype.getColorFromPalette = function (t, e, n) {
          var i = this.ecModel,
            r = Vb.prototype.getColorFromPalette.call(this, t, e, n);
          return r || (r = i.getColorFromPalette(t, e, n)), r;
        }),
        (n.prototype.coordDimToDataDim = function (t) {
          return this.getRawData().mapDimensionsAll(t);
        }),
        (n.prototype.getProgressive = function () {
          return this.get('progressive');
        }),
        (n.prototype.getProgressiveThreshold = function () {
          return this.get('progressiveThreshold');
        }),
        (n.prototype.select = function (t, e) {
          this._innerSelect(this.getData(e), t);
        }),
        (n.prototype.unselect = function (t, e) {
          var n = this.option.selectedMap;
          if (n) {
            var i = this.option.selectedMode,
              r = this.getData(e);
            if ('series' === i || 'all' === n)
              return (this.option.selectedMap = {}), void (this._selectedDataIndicesMap = {});
            for (var o = 0; o < t.length; o++) {
              var a = t[o],
                s = eh(r, a);
              (n[s] = !1), (this._selectedDataIndicesMap[s] = -1);
            }
          }
        }),
        (n.prototype.toggleSelect = function (t, e) {
          for (var n = [], i = 0; i < t.length; i++)
            (n[0] = t[i]), this.isSelected(t[i], e) ? this.unselect(n, e) : this.select(n, e);
        }),
        (n.prototype.getSelectedDataIndices = function () {
          if ('all' === this.option.selectedMap) return [].slice.call(this.getData().getIndices());
          for (var t = this._selectedDataIndicesMap, e = w(t), n = [], i = 0; i < e.length; i++) {
            var r = t[e[i]];
            r >= 0 && n.push(r);
          }
          return n;
        }),
        (n.prototype.isSelected = function (t, e) {
          var n = this.option.selectedMap;
          if (!n) return !1;
          var i = this.getData(e);
          return ('all' === n || n[eh(i, t)]) && !i.getItemModel(t).get(['select', 'disabled']);
        }),
        (n.prototype.isUniversalTransitionEnabled = function () {
          if (this[PS]) return !0;
          var t = this.option.universalTransition;
          return t ? (t === !0 ? !0 : t && t.enabled) : !1;
        }),
        (n.prototype._innerSelect = function (t, e) {
          var n,
            i,
            r = this.option,
            o = r.selectedMode,
            a = e.length;
          if (o && a)
            if ('series' === o) r.selectedMap = 'all';
            else if ('multiple' === o) {
              I(r.selectedMap) || (r.selectedMap = {});
              for (var s = r.selectedMap, l = 0; a > l; l++) {
                var u = e[l],
                  h = eh(t, u);
                (s[h] = !0), (this._selectedDataIndicesMap[h] = t.getRawIndex(u));
              }
            } else if ('single' === o || o === !0) {
              var c = e[a - 1],
                h = eh(t, c);
              (r.selectedMap = ((n = {}), (n[h] = !0), n)),
                (this._selectedDataIndicesMap = ((i = {}), (i[h] = t.getRawIndex(c)), i));
            }
        }),
        (n.prototype._initSelectedMapFromData = function (t) {
          if (!this.option.selectedMap) {
            var e = [];
            t.hasItemOption &&
              t.each(function (n) {
                var i = t.getRawDataItem(n);
                i && i.selected && e.push(n);
              }),
              e.length > 0 && this._innerSelect(t, e);
          }
        }),
        (n.registerClass = function (t) {
          return wb.registerClass(t);
        }),
        (n.protoInitialize = (function () {
          var t = n.prototype;
          (t.type = 'series.__base__'),
            (t.seriesIndex = 0),
            (t.ignoreStyleOnData = !1),
            (t.hasSymbolVisual = !1),
            (t.defaultSymbol = 'circle'),
            (t.visualStyleAccessPath = 'itemStyle'),
            (t.visualDrawType = 'fill');
        })()),
        n
      );
    })(wb);
  d(OS, yS), d(OS, Vb), Vr(OS, wb);
  var RS = (function () {
    function t() {
      (this.group = new wm()), (this.uid = Hs('viewComponent'));
    }
    return (
      (t.prototype.init = function () {}),
      (t.prototype.render = function () {}),
      (t.prototype.dispose = function () {}),
      (t.prototype.updateView = function () {}),
      (t.prototype.updateLayout = function () {}),
      (t.prototype.updateVisual = function () {}),
      (t.prototype.toggleBlurSeries = function () {}),
      (t.prototype.eachRendered = function (t) {
        var e = this.group;
        e && e.traverse(t);
      }),
      t
    );
  })();
  Nr(RS), Zr(RS);
  var ES = Dr(),
    BS = hh(),
    zS = (function () {
      function t() {
        (this.group = new wm()),
          (this.uid = Hs('viewChart')),
          (this.renderTask = Ou({ plan: fh, reset: dh })),
          (this.renderTask.context = { view: this });
      }
      return (
        (t.prototype.init = function () {}),
        (t.prototype.render = function () {}),
        (t.prototype.highlight = function (t, e, n, i) {
          var r = t.getData(i && i.dataType);
          r && ph(r, i, 'emphasis');
        }),
        (t.prototype.downplay = function (t, e, n, i) {
          var r = t.getData(i && i.dataType);
          r && ph(r, i, 'normal');
        }),
        (t.prototype.remove = function () {
          this.group.removeAll();
        }),
        (t.prototype.dispose = function () {}),
        (t.prototype.updateView = function (t, e, n, i) {
          this.render(t, e, n, i);
        }),
        (t.prototype.updateLayout = function (t, e, n, i) {
          this.render(t, e, n, i);
        }),
        (t.prototype.updateVisual = function (t, e, n, i) {
          this.render(t, e, n, i);
        }),
        (t.prototype.eachRendered = function (t) {
          Ds(this.group, t);
        }),
        (t.markUpdateMethod = function (t, e) {
          ES(t).updateMethod = e;
        }),
        (t.protoInitialize = (function () {
          var e = t.prototype;
          e.type = 'chart';
        })()),
        t
      );
    })();
  Nr(zS, ['dispose']), Zr(zS);
  var NS,
    FS = {
      incrementalPrepareRender: {
        progress: function (t, e) {
          e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload);
        },
      },
      render: {
        forceFirstProgress: !0,
        progress: function (t, e) {
          e.view.render(e.model, e.ecModel, e.api, e.payload);
        },
      },
    },
    VS = '\x00__throttleOriginMethod',
    HS = '\x00__throttleRate',
    WS = '\x00__throttleType',
    GS = Dr(),
    ZS = { itemStyle: Ur(Gw, !0), lineStyle: Ur(Vw, !0) },
    US = { lineStyle: 'stroke', itemStyle: 'fill' },
    XS = {
      createOnAllSeries: !0,
      performRawSeries: !0,
      reset: function (t, e) {
        var n = t.getData(),
          i = t.visualStyleAccessPath || 'itemStyle',
          r = t.getModel(i),
          o = mh(t, i),
          a = o(r),
          s = r.getShallow('decal');
        s && (n.setVisual('decal', s), (s.dirty = !0));
        var l = _h(t, i),
          u = a[l],
          c = T(u) ? u : null,
          p = 'auto' === a.fill || 'auto' === a.stroke;
        if (!a[l] || c || p) {
          var f = t.getColorFromPalette(t.name, null, e.getSeriesCount());
          a[l] || ((a[l] = f), n.setVisual('colorFromPalette', !0)),
            (a.fill = 'auto' === a.fill || T(a.fill) ? f : a.fill),
            (a.stroke = 'auto' === a.stroke || T(a.stroke) ? f : a.stroke);
        }
        return (
          n.setVisual('style', a),
          n.setVisual('drawType', l),
          !e.isSeriesFiltered(t) && c
            ? (n.setVisual('colorFromPalette', !1),
              {
                dataEach: function (e, n) {
                  var i = t.getDataParams(n),
                    r = h({}, a);
                  (r[l] = c(i)), e.setItemVisual(n, 'style', r);
                },
              })
            : void 0
        );
      },
    },
    YS = new Xw(),
    qS = {
      createOnAllSeries: !0,
      performRawSeries: !0,
      reset: function (t, e) {
        if (!t.ignoreStyleOnData && !e.isSeriesFiltered(t)) {
          var n = t.getData(),
            i = t.visualStyleAccessPath || 'itemStyle',
            r = mh(t, i),
            o = n.getVisual('drawType');
          return {
            dataEach: n.hasItemOption
              ? function (t, e) {
                  var n = t.getRawDataItem(e);
                  if (n && n[i]) {
                    YS.option = n[i];
                    var a = r(YS),
                      s = t.ensureUniqueItemVisual(e, 'style');
                    h(s, a),
                      YS.option.decal &&
                        (t.setItemVisual(e, 'decal', YS.option.decal),
                        (YS.option.decal.dirty = !0)),
                      o in a && t.setItemVisual(e, 'colorFromPalette', !1);
                  }
                }
              : null,
          };
        }
      },
    },
    jS = {
      performRawSeries: !0,
      overallReset: function (t) {
        var e = X();
        t.eachSeries(function (t) {
          var n = t.getColorBy();
          if (!t.isColorBySeries()) {
            var i = t.type + '-' + n,
              r = e.get(i);
            r || ((r = {}), e.set(i, r)), (GS(t).scope = r);
          }
        }),
          t.eachSeries(function (e) {
            if (!e.isColorBySeries() && !t.isSeriesFiltered(e)) {
              var n = e.getRawData(),
                i = {},
                r = e.getData(),
                o = GS(e).scope,
                a = e.visualStyleAccessPath || 'itemStyle',
                s = _h(e, a);
              r.each(function (t) {
                var e = r.getRawIndex(t);
                i[e] = t;
              }),
                n.each(function (t) {
                  var a = i[t],
                    l = r.getItemVisual(a, 'colorFromPalette');
                  if (l) {
                    var u = r.ensureUniqueItemVisual(a, 'style'),
                      h = n.getName(t) || t + '',
                      c = n.count();
                    u[s] = e.getColorFromPalette(h, o, c);
                  }
                });
            }
          });
      },
    },
    KS = Math.PI,
    $S = (function () {
      function t(t, e, n, i) {
        (this._stageTaskMap = X()),
          (this.ecInstance = t),
          (this.api = e),
          (n = this._dataProcessorHandlers = n.slice()),
          (i = this._visualHandlers = i.slice()),
          (this._allHandlers = n.concat(i));
      }
      return (
        (t.prototype.restoreData = function (t, e) {
          t.restoreData(e),
            this._stageTaskMap.each(function (t) {
              var e = t.overallTask;
              e && e.dirty();
            });
        }),
        (t.prototype.getPerformArgs = function (t, e) {
          if (t.__pipeline) {
            var n = this._pipelineMap.get(t.__pipeline.id),
              i = n.context,
              r =
                !e &&
                n.progressiveEnabled &&
                (!i || i.progressiveRender) &&
                t.__idxInPipeline > n.blockIndex,
              o = r ? n.step : null,
              a = i && i.modDataCount,
              s = null != a ? Math.ceil(a / o) : null;
            return { step: o, modBy: s, modDataCount: a };
          }
        }),
        (t.prototype.getPipeline = function (t) {
          return this._pipelineMap.get(t);
        }),
        (t.prototype.updateStreamModes = function (t, e) {
          var n = this._pipelineMap.get(t.uid),
            i = t.getData(),
            r = i.count(),
            o = n.progressiveEnabled && e.incrementalPrepareRender && r >= n.threshold,
            a = t.get('large') && r >= t.get('largeThreshold'),
            s = 'mod' === t.get('progressiveChunkMode') ? r : null;
          t.pipelineContext = n.context = { progressiveRender: o, modDataCount: s, large: a };
        }),
        (t.prototype.restorePipelines = function (t) {
          var e = this,
            n = (e._pipelineMap = X());
          t.eachSeries(function (t) {
            var i = t.getProgressive(),
              r = t.uid;
            n.set(r, {
              id: r,
              head: null,
              tail: null,
              threshold: t.getProgressiveThreshold(),
              progressiveEnabled: i && !(t.preventIncremental && t.preventIncremental()),
              blockIndex: -1,
              step: Math.round(i || 700),
              count: 0,
            }),
              e._pipe(t, t.dataTask);
          });
        }),
        (t.prototype.prepareStageTasks = function () {
          var t = this._stageTaskMap,
            e = this.api.getModel(),
            n = this.api;
          v(
            this._allHandlers,
            function (i) {
              var r = t.get(i.uid) || t.set(i.uid, {}),
                o = '';
              W(!(i.reset && i.overallReset), o),
                i.reset && this._createSeriesStageTask(i, r, e, n),
                i.overallReset && this._createOverallStageTask(i, r, e, n);
            },
            this
          );
        }),
        (t.prototype.prepareView = function (t, e, n, i) {
          var r = t.renderTask,
            o = r.context;
          (o.model = e),
            (o.ecModel = n),
            (o.api = i),
            (r.__block = !t.incrementalPrepareRender),
            this._pipe(e, r);
        }),
        (t.prototype.performDataProcessorTasks = function (t, e) {
          this._performStageTasks(this._dataProcessorHandlers, t, e, { block: !0 });
        }),
        (t.prototype.performVisualTasks = function (t, e, n) {
          this._performStageTasks(this._visualHandlers, t, e, n);
        }),
        (t.prototype._performStageTasks = function (t, e, n, i) {
          function r(t, e) {
            return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id));
          }
          i = i || {};
          var o = !1,
            a = this;
          v(t, function (t) {
            if (!i.visualType || i.visualType === t.visualType) {
              var s = a._stageTaskMap.get(t.uid),
                l = s.seriesTaskMap,
                u = s.overallTask;
              if (u) {
                var h,
                  c = u.agentStubMap;
                c.each(function (t) {
                  r(i, t) && (t.dirty(), (h = !0));
                }),
                  h && u.dirty(),
                  a.updatePayload(u, n);
                var p = a.getPerformArgs(u, i.block);
                c.each(function (t) {
                  t.perform(p);
                }),
                  u.perform(p) && (o = !0);
              } else
                l &&
                  l.each(function (s) {
                    r(i, s) && s.dirty();
                    var l = a.getPerformArgs(s, i.block);
                    (l.skip = !t.performRawSeries && e.isSeriesFiltered(s.context.model)),
                      a.updatePayload(s, n),
                      s.perform(l) && (o = !0);
                  });
            }
          }),
            (this.unfinished = o || this.unfinished);
        }),
        (t.prototype.performSeriesTasks = function (t) {
          var e;
          t.eachSeries(function (t) {
            e = t.dataTask.perform() || e;
          }),
            (this.unfinished = e || this.unfinished);
        }),
        (t.prototype.plan = function () {
          this._pipelineMap.each(function (t) {
            var e = t.tail;
            do {
              if (e.__block) {
                t.blockIndex = e.__idxInPipeline;
                break;
              }
              e = e.getUpstream();
            } while (e);
          });
        }),
        (t.prototype.updatePayload = function (t, e) {
          'remain' !== e && (t.context.payload = e);
        }),
        (t.prototype._createSeriesStageTask = function (t, e, n, i) {
          function r(e) {
            var r = e.uid,
              l = s.set(r, (a && a.get(r)) || Ou({ plan: Th, reset: Ch, count: Dh }));
            (l.context = {
              model: e,
              ecModel: n,
              api: i,
              useClearVisual: t.isVisual && !t.isLayout,
              plan: t.plan,
              reset: t.reset,
              scheduler: o,
            }),
              o._pipe(e, l);
          }
          var o = this,
            a = e.seriesTaskMap,
            s = (e.seriesTaskMap = X()),
            l = t.seriesType,
            u = t.getTargetSeries;
          t.createOnAllSeries
            ? n.eachRawSeries(r)
            : l
            ? n.eachRawSeriesByType(l, r)
            : u && u(n, i).each(r);
        }),
        (t.prototype._createOverallStageTask = function (t, e, n, i) {
          function r(t) {
            var e = t.uid,
              n = l.set(e, (s && s.get(e)) || ((p = !0), Ou({ reset: bh, onDirty: Mh })));
            (n.context = { model: t, overallProgress: c }),
              (n.agent = a),
              (n.__block = c),
              o._pipe(t, n);
          }
          var o = this,
            a = (e.overallTask = e.overallTask || Ou({ reset: wh }));
          a.context = { ecModel: n, api: i, overallReset: t.overallReset, scheduler: o };
          var s = a.agentStubMap,
            l = (a.agentStubMap = X()),
            u = t.seriesType,
            h = t.getTargetSeries,
            c = !0,
            p = !1,
            f = '';
          W(!t.createOnAllSeries, f),
            u ? n.eachRawSeriesByType(u, r) : h ? h(n, i).each(r) : ((c = !1), v(n.getSeries(), r)),
            p && a.dirty();
        }),
        (t.prototype._pipe = function (t, e) {
          var n = t.uid,
            i = this._pipelineMap.get(n);
          !i.head && (i.head = e),
            i.tail && i.tail.pipe(e),
            (i.tail = e),
            (e.__idxInPipeline = i.count++),
            (e.__pipeline = i);
        }),
        (t.wrapStageHandler = function (t, e) {
          return (
            T(t) && (t = { overallReset: t, seriesType: Ih(t) }),
            (t.uid = Hs('stageHandler')),
            e && (t.visualType = e),
            t
          );
        }),
        t
      );
    })(),
    QS = kh(0),
    JS = {},
    tM = {};
  Ah(JS, Gb),
    Ah(tM, $b),
    (JS.eachSeriesByType = JS.eachRawSeriesByType =
      function (t) {
        NS = t;
      }),
    (JS.eachComponent = function (t) {
      'series' === t.mainType && t.subType && (NS = t.subType);
    });
  var eM = [
      '#37A2DA',
      '#32C5E9',
      '#67E0E3',
      '#9FE6B8',
      '#FFDB5C',
      '#ff9f7f',
      '#fb7293',
      '#E062AE',
      '#E690D1',
      '#e7bcf3',
      '#9d96f5',
      '#8378EA',
      '#96BFFF',
    ],
    nM = {
      color: eM,
      colorLayer: [
        ['#37A2DA', '#ffd85c', '#fd7b5f'],
        ['#37A2DA', '#67E0E3', '#FFDB5C', '#ff9f7f', '#E062AE', '#9d96f5'],
        [
          '#37A2DA',
          '#32C5E9',
          '#9FE6B8',
          '#FFDB5C',
          '#ff9f7f',
          '#fb7293',
          '#e7bcf3',
          '#8378EA',
          '#96BFFF',
        ],
        eM,
      ],
    },
    iM = '#B9B8CE',
    rM = '#100C2A',
    oM = function () {
      return {
        axisLine: { lineStyle: { color: iM } },
        splitLine: { lineStyle: { color: '#484753' } },
        splitArea: { areaStyle: { color: ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.05)'] } },
        minorSplitLine: { lineStyle: { color: '#20203B' } },
      };
    },
    aM = [
      '#4992ff',
      '#7cffb2',
      '#fddd60',
      '#ff6e76',
      '#58d9f9',
      '#05c091',
      '#ff8a45',
      '#8d48e3',
      '#dd79ff',
    ],
    sM = {
      darkMode: !0,
      color: aM,
      backgroundColor: rM,
      axisPointer: {
        lineStyle: { color: '#817f91' },
        crossStyle: { color: '#817f91' },
        label: { color: '#fff' },
      },
      legend: { textStyle: { color: iM } },
      textStyle: { color: iM },
      title: { textStyle: { color: '#EEF1FA' }, subtextStyle: { color: '#B9B8CE' } },
      toolbox: { iconStyle: { borderColor: iM } },
      dataZoom: {
        borderColor: '#71708A',
        textStyle: { color: iM },
        brushStyle: { color: 'rgba(135,163,206,0.3)' },
        handleStyle: { color: '#353450', borderColor: '#C5CBE3' },
        moveHandleStyle: { color: '#B0B6C3', opacity: 0.3 },
        fillerColor: 'rgba(135,163,206,0.2)',
        emphasis: {
          handleStyle: { borderColor: '#91B7F2', color: '#4D587D' },
          moveHandleStyle: { color: '#636D9A', opacity: 0.7 },
        },
        dataBackground: {
          lineStyle: { color: '#71708A', width: 1 },
          areaStyle: { color: '#71708A' },
        },
        selectedDataBackground: {
          lineStyle: { color: '#87A3CE' },
          areaStyle: { color: '#87A3CE' },
        },
      },
      visualMap: { textStyle: { color: iM } },
      timeline: {
        lineStyle: { color: iM },
        label: { color: iM },
        controlStyle: { color: iM, borderColor: iM },
      },
      calendar: {
        itemStyle: { color: rM },
        dayLabel: { color: iM },
        monthLabel: { color: iM },
        yearLabel: { color: iM },
      },
      timeAxis: oM(),
      logAxis: oM(),
      valueAxis: oM(),
      categoryAxis: oM(),
      line: { symbol: 'circle' },
      graph: { color: aM },
      gauge: {
        title: { color: iM },
        axisLine: { lineStyle: { color: [[1, 'rgba(207,212,219,0.2)']] } },
        axisLabel: { color: iM },
        detail: { color: '#EEF1FA' },
      },
      candlestick: {
        itemStyle: {
          color: '#f64e56',
          color0: '#54ea92',
          borderColor: '#f64e56',
          borderColor0: '#54ea92',
        },
      },
    };
  sM.categoryAxis.splitLine.show = !1;
  var lM = (function () {
      function t() {}
      return (
        (t.prototype.normalizeQuery = function (t) {
          var e = {},
            n = {},
            i = {};
          if (C(t)) {
            var r = Er(t);
            (e.mainType = r.main || null), (e.subType = r.sub || null);
          } else {
            var o = ['Index', 'Name', 'Id'],
              a = { name: 1, dataIndex: 1, dataType: 1 };
            v(t, function (t, r) {
              for (var s = !1, l = 0; l < o.length; l++) {
                var u = o[l],
                  h = r.lastIndexOf(u);
                if (h > 0 && h === r.length - u.length) {
                  var c = r.slice(0, h);
                  'data' !== c && ((e.mainType = c), (e[u.toLowerCase()] = t), (s = !0));
                }
              }
              a.hasOwnProperty(r) && ((n[r] = t), (s = !0)), s || (i[r] = t);
            });
          }
          return { cptQuery: e, dataQuery: n, otherQuery: i };
        }),
        (t.prototype.filter = function (t, e) {
          function n(t, e, n, i) {
            return null == t[n] || e[i || n] === t[n];
          }
          var i = this.eventInfo;
          if (!i) return !0;
          var r = i.targetEl,
            o = i.packedEvent,
            a = i.model,
            s = i.view;
          if (!a || !s) return !0;
          var l = e.cptQuery,
            u = e.dataQuery;
          return (
            n(l, a, 'mainType') &&
            n(l, a, 'subType') &&
            n(l, a, 'index', 'componentIndex') &&
            n(l, a, 'name') &&
            n(l, a, 'id') &&
            n(u, o, 'name') &&
            n(u, o, 'dataIndex') &&
            n(u, o, 'dataType') &&
            (!s.filterForExposedEvent || s.filterForExposedEvent(t, e.otherQuery, r, o))
          );
        }),
        (t.prototype.afterTrigger = function () {
          this.eventInfo = null;
        }),
        t
      );
    })(),
    uM = ['symbol', 'symbolSize', 'symbolRotate', 'symbolOffset'],
    hM = uM.concat(['symbolKeepAspect']),
    cM = {
      createOnAllSeries: !0,
      performRawSeries: !0,
      reset: function (t, e) {
        function n(e, n) {
          for (var i = t.getRawValue(n), r = t.getDataParams(n), a = 0; a < c.length; a++) {
            var s = c[a];
            e.setItemVisual(n, s, o[s](i, r));
          }
        }
        var i = t.getData();
        if ((t.legendIcon && i.setVisual('legendIcon', t.legendIcon), t.hasSymbolVisual)) {
          for (var r = {}, o = {}, a = !1, s = 0; s < uM.length; s++) {
            var l = uM[s],
              u = t.get(l);
            T(u) ? ((a = !0), (o[l] = u)) : (r[l] = u);
          }
          if (
            ((r.symbol = r.symbol || t.defaultSymbol),
            i.setVisual(
              h(
                {
                  legendIcon: t.legendIcon || r.symbol,
                  symbolKeepAspect: t.get('symbolKeepAspect'),
                },
                r
              )
            ),
            !e.isSeriesFiltered(t))
          ) {
            var c = w(o);
            return { dataEach: a ? n : null };
          }
        }
      },
    },
    pM = {
      createOnAllSeries: !0,
      performRawSeries: !0,
      reset: function (t, e) {
        function n(t, e) {
          for (var n = t.getItemModel(e), i = 0; i < hM.length; i++) {
            var r = hM[i],
              o = n.getShallow(r, !0);
            null != o && t.setItemVisual(e, r, o);
          }
        }
        if (t.hasSymbolVisual && !e.isSeriesFiltered(t)) {
          var i = t.getData();
          return { dataEach: i.hasItemOption ? n : null };
        }
      },
    },
    fM = Math.round(9 * Math.random()),
    dM = 'function' == typeof Object.defineProperty,
    gM = (function () {
      function t() {
        this._id = '__ec_inner_' + fM++;
      }
      return (
        (t.prototype.get = function (t) {
          return this._guard(t)[this._id];
        }),
        (t.prototype.set = function (t, e) {
          var n = this._guard(t);
          return (
            dM
              ? Object.defineProperty(n, this._id, { value: e, enumerable: !1, configurable: !0 })
              : (n[this._id] = e),
            this
          );
        }),
        (t.prototype['delete'] = function (t) {
          return this.has(t) ? (delete this._guard(t)[this._id], !0) : !1;
        }),
        (t.prototype.has = function (t) {
          return !!this._guard(t)[this._id];
        }),
        (t.prototype._guard = function (t) {
          if (t !== Object(t)) throw TypeError('Value of WeakMap is not a non-null object.');
          return t;
        }),
        t
      );
    })(),
    vM = H_.extend({
      type: 'triangle',
      shape: { cx: 0, cy: 0, width: 0, height: 0 },
      buildPath: function (t, e) {
        var n = e.cx,
          i = e.cy,
          r = e.width / 2,
          o = e.height / 2;
        t.moveTo(n, i - o), t.lineTo(n + r, i + o), t.lineTo(n - r, i + o), t.closePath();
      },
    }),
    yM = H_.extend({
      type: 'diamond',
      shape: { cx: 0, cy: 0, width: 0, height: 0 },
      buildPath: function (t, e) {
        var n = e.cx,
          i = e.cy,
          r = e.width / 2,
          o = e.height / 2;
        t.moveTo(n, i - o),
          t.lineTo(n + r, i),
          t.lineTo(n, i + o),
          t.lineTo(n - r, i),
          t.closePath();
      },
    }),
    mM = H_.extend({
      type: 'pin',
      shape: { x: 0, y: 0, width: 0, height: 0 },
      buildPath: function (t, e) {
        var n = e.x,
          i = e.y,
          r = (e.width / 5) * 3,
          o = Math.max(r, e.height),
          a = r / 2,
          s = (a * a) / (o - a),
          l = i - o + a + s,
          u = Math.asin(s / a),
          h = Math.cos(u) * a,
          c = Math.sin(u),
          p = Math.cos(u),
          f = 0.6 * a,
          d = 0.7 * a;
        t.moveTo(n - h, l + s),
          t.arc(n, l, a, Math.PI - u, 2 * Math.PI + u),
          t.bezierCurveTo(n + h - c * f, l + s + p * f, n, i - d, n, i),
          t.bezierCurveTo(n, i - d, n - h + c * f, l + s + p * f, n - h, l + s),
          t.closePath();
      },
    }),
    _M = H_.extend({
      type: 'arrow',
      shape: { x: 0, y: 0, width: 0, height: 0 },
      buildPath: function (t, e) {
        var n = e.height,
          i = e.width,
          r = e.x,
          o = e.y,
          a = (i / 3) * 2;
        t.moveTo(r, o),
          t.lineTo(r + a, o + n),
          t.lineTo(r, o + (n / 4) * 3),
          t.lineTo(r - a, o + n),
          t.lineTo(r, o),
          t.closePath();
      },
    }),
    xM = {
      line: lw,
      rect: K_,
      roundRect: K_,
      square: K_,
      circle: Nx,
      diamond: yM,
      pin: mM,
      arrow: _M,
      triangle: vM,
    },
    wM = {
      line: function (t, e, n, i, r) {
        (r.x1 = t), (r.y1 = e + i / 2), (r.x2 = t + n), (r.y2 = e + i / 2);
      },
      rect: function (t, e, n, i, r) {
        (r.x = t), (r.y = e), (r.width = n), (r.height = i);
      },
      roundRect: function (t, e, n, i, r) {
        (r.x = t), (r.y = e), (r.width = n), (r.height = i), (r.r = Math.min(n, i) / 4);
      },
      square: function (t, e, n, i, r) {
        var o = Math.min(n, i);
        (r.x = t), (r.y = e), (r.width = o), (r.height = o);
      },
      circle: function (t, e, n, i, r) {
        (r.cx = t + n / 2), (r.cy = e + i / 2), (r.r = Math.min(n, i) / 2);
      },
      diamond: function (t, e, n, i, r) {
        (r.cx = t + n / 2), (r.cy = e + i / 2), (r.width = n), (r.height = i);
      },
      pin: function (t, e, n, i, r) {
        (r.x = t + n / 2), (r.y = e + i / 2), (r.width = n), (r.height = i);
      },
      arrow: function (t, e, n, i, r) {
        (r.x = t + n / 2), (r.y = e + i / 2), (r.width = n), (r.height = i);
      },
      triangle: function (t, e, n, i, r) {
        (r.cx = t + n / 2), (r.cy = e + i / 2), (r.width = n), (r.height = i);
      },
    },
    bM = {};
  v(xM, function (t, e) {
    bM[e] = new t();
  });
  var SM = H_.extend({
      type: 'symbol',
      shape: { symbolType: '', x: 0, y: 0, width: 0, height: 0 },
      calculateTextPosition: function (t, e, n) {
        var i = Si(t, e, n),
          r = this.shape;
        return (
          r && 'pin' === r.symbolType && 'inside' === e.position && (i.y = n.y + 0.4 * n.height), i
        );
      },
      buildPath: function (t, e, n) {
        var i = e.symbolType;
        if ('none' !== i) {
          var r = bM[i];
          r || ((i = 'rect'), (r = bM[i])),
            wM[i](e.x, e.y, e.width, e.height, r.shape),
            r.buildPath(t, r.shape, n);
        }
      },
    }),
    MM = new A_(!0),
    TM = ['shadowBlur', 'shadowOffsetX', 'shadowOffsetY'],
    CM = [
      ['lineCap', 'butt'],
      ['lineJoin', 'miter'],
      ['miterLimit', 10],
    ],
    kM = 1,
    DM = 2,
    IM = 3,
    AM = 4,
    LM = new gM(),
    PM = new dy(100),
    OM = [
      'symbol',
      'symbolSize',
      'symbolKeepAspect',
      'color',
      'backgroundColor',
      'dashArrayX',
      'dashArrayY',
      'maxTileWidth',
      'maxTileHeight',
    ],
    RM = new Lv(),
    EM = {},
    BM = 'undefined' != typeof window,
    zM = '5.3.2',
    NM = { zrender: '5.3.1' },
    FM = 1,
    VM = 800,
    HM = 900,
    WM = 1e3,
    GM = 2e3,
    ZM = 5e3,
    UM = 1e3,
    XM = 1100,
    YM = 2e3,
    qM = 3e3,
    jM = 4e3,
    KM = 4500,
    $M = 4600,
    QM = 5e3,
    JM = 6e3,
    tT = 7e3,
    eT = {
      PROCESSOR: { FILTER: WM, SERIES_FILTER: VM, STATISTIC: ZM },
      VISUAL: {
        LAYOUT: UM,
        PROGRESSIVE_LAYOUT: XM,
        GLOBAL: YM,
        CHART: qM,
        POST_CHART_LAYOUT: $M,
        COMPONENT: jM,
        BRUSH: QM,
        CHART_ITEM: KM,
        ARIA: JM,
        DECAL: tT,
      },
    },
    nT = '__flagInMainProcess',
    iT = '__pendingUpdate',
    rT = '__needsUpdateStatus',
    oT = /^[a-zA-Z0-9_]+$/,
    aT = '__connectUpdateStatus',
    sT = 0,
    lT = 1,
    uT = 2,
    hT = (function (t) {
      function n() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return e(n, t), n;
    })(Lv),
    cT = hT.prototype;
  (cT.on = Mc('on')), (cT.off = Mc('off'));
  var pT,
    fT,
    dT,
    gT,
    vT,
    yT,
    mT,
    _T,
    xT,
    wT,
    bT,
    ST,
    MT,
    TT,
    CT,
    kT,
    DT,
    IT,
    AT = (function (t) {
      function n(e, n, i) {
        function r(t, e) {
          return t.__prio - e.__prio;
        }
        var o = t.call(this, new lM()) || this;
        (o._chartsViews = []),
          (o._chartsMap = {}),
          (o._componentsViews = []),
          (o._componentsMap = {}),
          (o._pendingActions = []),
          (i = i || {}),
          C(n) && (n = NT[n]),
          (o._dom = e);
        var a = 'canvas',
          l = !1,
          u = (o._zr = Oi(e, {
            renderer: i.renderer || a,
            devicePixelRatio: i.devicePixelRatio,
            width: i.width,
            height: i.height,
            ssr: i.ssr,
            useDirtyRect: null == i.useDirtyRect ? l : i.useDirtyRect,
          }));
        (o._ssr = i.ssr),
          (o._throttledZrFlush = gh(_v(u.flush, u), 17)),
          (n = s(n)),
          n && gu(n, !0),
          (o._theme = n),
          (o._locale = Xs(i.locale || eb)),
          (o._coordSysMgr = new Jb());
        var h = (o._api = CT(o));
        return (
          Xe(zT, r),
          Xe(ET, r),
          (o._scheduler = new $S(o, h, ET, zT)),
          (o._messageCenter = new hT()),
          o._initEvents(),
          (o.resize = _v(o.resize, o)),
          u.animation.on('frame', o._onframe, o),
          wT(u, o),
          bT(u, o),
          Z(o),
          o
        );
      }
      return (
        e(n, t),
        (n.prototype._onframe = function () {
          if (!this._disposed) {
            IT(this);
            var t = this._scheduler;
            if (this[iT]) {
              var e = this[iT].silent;
              this[nT] = !0;
              try {
                pT(this), gT.update.call(this, null, this[iT].updateParams);
              } catch (n) {
                throw ((this[nT] = !1), (this[iT] = null), n);
              }
              this._zr.flush(),
                (this[nT] = !1),
                (this[iT] = null),
                _T.call(this, e),
                xT.call(this, e);
            } else if (t.unfinished) {
              var i = FM,
                r = this._model,
                o = this._api;
              t.unfinished = !1;
              do {
                var a = +new Date();
                t.performSeriesTasks(r),
                  t.performDataProcessorTasks(r),
                  yT(this, r),
                  t.performVisualTasks(r),
                  TT(this, this._model, o, 'remain', {}),
                  (i -= +new Date() - a);
              } while (i > 0 && t.unfinished);
              t.unfinished || this._zr.flush();
            }
          }
        }),
        (n.prototype.getDom = function () {
          return this._dom;
        }),
        (n.prototype.getId = function () {
          return this.id;
        }),
        (n.prototype.getZr = function () {
          return this._zr;
        }),
        (n.prototype.isSSR = function () {
          return this._ssr;
        }),
        (n.prototype.setOption = function (t, e, n) {
          if (!this[nT] && !this._disposed) {
            var i, r, o;
            if (
              (I(e) &&
                ((n = e.lazyUpdate),
                (i = e.silent),
                (r = e.replaceMerge),
                (o = e.transition),
                (e = e.notMerge)),
              (this[nT] = !0),
              !this._model || e)
            ) {
              var a = new eS(this._api),
                s = this._theme,
                l = (this._model = new Gb());
              (l.scheduler = this._scheduler),
                (l.ssr = this._ssr),
                l.init(null, null, null, s, this._locale, a);
            }
            this._model.setOption(t, { replaceMerge: r }, BT);
            var u = { seriesTransition: o, optionChanged: !0 };
            if (n)
              (this[iT] = { silent: i, updateParams: u }), (this[nT] = !1), this.getZr().wakeUp();
            else {
              try {
                pT(this), gT.update.call(this, null, u);
              } catch (h) {
                throw ((this[iT] = null), (this[nT] = !1), h);
              }
              this._ssr || this._zr.flush(),
                (this[iT] = null),
                (this[nT] = !1),
                _T.call(this, i),
                xT.call(this, i);
            }
          }
        }),
        (n.prototype.setTheme = function () {}),
        (n.prototype.getModel = function () {
          return this._model;
        }),
        (n.prototype.getOption = function () {
          return this._model && this._model.getOption();
        }),
        (n.prototype.getWidth = function () {
          return this._zr.getWidth();
        }),
        (n.prototype.getHeight = function () {
          return this._zr.getHeight();
        }),
        (n.prototype.getDevicePixelRatio = function () {
          return this._zr.painter.dpr || (BM && window.devicePixelRatio) || 1;
        }),
        (n.prototype.getRenderedCanvas = function (t) {
          return this.renderToCanvas(t);
        }),
        (n.prototype.renderToCanvas = function (t) {
          t = t || {};
          var e = this._zr.painter;
          return e.getRenderedCanvas({
            backgroundColor: t.backgroundColor || this._model.get('backgroundColor'),
            pixelRatio: t.pixelRatio || this.getDevicePixelRatio(),
          });
        }),
        (n.prototype.renderToSVGString = function (t) {
          t = t || {};
          var e = this._zr.painter;
          return e.renderToString({ useViewBox: t.useViewBox });
        }),
        (n.prototype.getSvgDataURL = function () {
          if ($g.svgSupported) {
            var t = this._zr,
              e = t.storage.getDisplayList();
            return (
              v(e, function (t) {
                t.stopAnimation(null, !0);
              }),
              t.painter.toDataURL()
            );
          }
        }),
        (n.prototype.getDataURL = function (t) {
          if (!this._disposed) {
            t = t || {};
            var e = t.excludeComponents,
              n = this._model,
              i = [],
              r = this;
            v(e, function (t) {
              n.eachComponent({ mainType: t }, function (t) {
                var e = r._componentsMap[t.__viewId];
                e.group.ignore || (i.push(e), (e.group.ignore = !0));
              });
            });
            var o =
              'svg' === this._zr.painter.getType()
                ? this.getSvgDataURL()
                : this.renderToCanvas(t).toDataURL('image/' + ((t && t.type) || 'png'));
            return (
              v(i, function (t) {
                t.group.ignore = !1;
              }),
              o
            );
          }
        }),
        (n.prototype.getConnectedDataURL = function (t) {
          if (!this._disposed) {
            var e = 'svg' === t.type,
              n = this.group,
              i = Math.min,
              r = Math.max,
              o = 1 / 0;
            if (HT[n]) {
              var a = o,
                l = o,
                u = -o,
                h = -o,
                c = [],
                p = (t && t.pixelRatio) || this.getDevicePixelRatio();
              v(VT, function (o) {
                if (o.group === n) {
                  var p = e ? o.getZr().painter.getSvgDom().innerHTML : o.renderToCanvas(s(t)),
                    f = o.getDom().getBoundingClientRect();
                  (a = i(f.left, a)),
                    (l = i(f.top, l)),
                    (u = r(f.right, u)),
                    (h = r(f.bottom, h)),
                    c.push({ dom: p, left: f.left, top: f.top });
                }
              }),
                (a *= p),
                (l *= p),
                (u *= p),
                (h *= p);
              var f = u - a,
                d = h - l,
                g = ov.createCanvas(),
                y = Oi(g, { renderer: e ? 'svg' : 'canvas' });
              if ((y.resize({ width: f, height: d }), e)) {
                var m = '';
                return (
                  v(c, function (t) {
                    var e = t.left - a,
                      n = t.top - l;
                    m += '<g transform="translate(' + e + ',' + n + ')">' + t.dom + '</g>';
                  }),
                  (y.painter.getSvgRoot().innerHTML = m),
                  t.connectedBackgroundColor &&
                    y.painter.setBackgroundColor(t.connectedBackgroundColor),
                  y.refreshImmediately(),
                  y.painter.toDataURL()
                );
              }
              return (
                t.connectedBackgroundColor &&
                  y.add(
                    new K_({
                      shape: { x: 0, y: 0, width: f, height: d },
                      style: { fill: t.connectedBackgroundColor },
                    })
                  ),
                v(c, function (t) {
                  var e = new X_({ style: { x: t.left * p - a, y: t.top * p - l, image: t.dom } });
                  y.add(e);
                }),
                y.refreshImmediately(),
                g.toDataURL('image/' + ((t && t.type) || 'png'))
              );
            }
            return this.getDataURL(t);
          }
        }),
        (n.prototype.convertToPixel = function (t, e) {
          return vT(this, 'convertToPixel', t, e);
        }),
        (n.prototype.convertFromPixel = function (t, e) {
          return vT(this, 'convertFromPixel', t, e);
        }),
        (n.prototype.containPixel = function (t, e) {
          if (!this._disposed) {
            var n,
              i = this._model,
              r = Ir(i, t);
            return (
              v(
                r,
                function (t, i) {
                  i.indexOf('Models') >= 0 &&
                    v(
                      t,
                      function (t) {
                        var r = t.coordinateSystem;
                        if (r && r.containPoint) n = n || !!r.containPoint(e);
                        else if ('seriesModels' === i) {
                          var o = this._chartsMap[t.__viewId];
                          o && o.containPoint && (n = n || o.containPoint(e, t));
                        }
                      },
                      this
                    );
                },
                this
              ),
              !!n
            );
          }
        }),
        (n.prototype.getVisual = function (t, e) {
          var n = this._model,
            i = Ir(n, t, { defaultMainType: 'series' }),
            r = i.seriesModel,
            o = r.getData(),
            a = i.hasOwnProperty('dataIndexInside')
              ? i.dataIndexInside
              : i.hasOwnProperty('dataIndex')
              ? o.indexOfRawIndex(i.dataIndex)
              : null;
          return null != a ? Lh(o, a, e) : Ph(o, e);
        }),
        (n.prototype.getViewOfComponentModel = function (t) {
          return this._componentsMap[t.__viewId];
        }),
        (n.prototype.getViewOfSeriesModel = function (t) {
          return this._chartsMap[t.__viewId];
        }),
        (n.prototype._initEvents = function () {
          var t = this;
          v(PT, function (e) {
            var n = function (n) {
              var i,
                r = t.getModel(),
                o = n.target,
                a = 'globalout' === e;
              if (
                (a
                  ? (i = {})
                  : o &&
                    Eh(
                      o,
                      function (t) {
                        var e = rx(t);
                        if (e && null != e.dataIndex) {
                          var n = e.dataModel || r.getSeriesByIndex(e.seriesIndex);
                          return (i = (n && n.getDataParams(e.dataIndex, e.dataType)) || {}), !0;
                        }
                        return e.eventData ? ((i = h({}, e.eventData)), !0) : void 0;
                      },
                      !0
                    ),
                i)
              ) {
                var s = i.componentType,
                  l = i.componentIndex;
                ('markLine' === s || 'markPoint' === s || 'markArea' === s) &&
                  ((s = 'series'), (l = i.seriesIndex));
                var u = s && null != l && r.getComponent(s, l),
                  c = u && t['series' === u.mainType ? '_chartsMap' : '_componentsMap'][u.__viewId];
                (i.event = n),
                  (i.type = e),
                  (t._$eventProcessor.eventInfo = {
                    targetEl: o,
                    packedEvent: i,
                    model: u,
                    view: c,
                  }),
                  t.trigger(e, i);
              }
            };
            (n.zrEventfulCallAtLast = !0), t._zr.on(e, n, t);
          }),
            v(RT, function (e, n) {
              t._messageCenter.on(
                n,
                function (t) {
                  this.trigger(n, t);
                },
                t
              );
            }),
            v(['selectchanged'], function (e) {
              t._messageCenter.on(
                e,
                function (t) {
                  this.trigger(e, t);
                },
                t
              );
            }),
            Rh(this._messageCenter, this, this._api);
        }),
        (n.prototype.isDisposed = function () {
          return this._disposed;
        }),
        (n.prototype.clear = function () {
          this._disposed || this.setOption({ series: [] }, !0);
        }),
        (n.prototype.dispose = function () {
          if (!this._disposed) {
            this._disposed = !0;
            var t = this.getDom();
            t && Pr(this.getDom(), ZT, '');
            var e = this,
              n = e._api,
              i = e._model;
            v(e._componentsViews, function (t) {
              t.dispose(i, n);
            }),
              v(e._chartsViews, function (t) {
                t.dispose(i, n);
              }),
              e._zr.dispose(),
              (e._dom =
                e._model =
                e._chartsMap =
                e._componentsMap =
                e._chartsViews =
                e._componentsViews =
                e._scheduler =
                e._api =
                e._zr =
                e._throttledZrFlush =
                e._theme =
                e._coordSysMgr =
                e._messageCenter =
                  null),
              delete VT[e.id];
          }
        }),
        (n.prototype.resize = function (t) {
          if (!this[nT] && !this._disposed) {
            this._zr.resize(t);
            var e = this._model;
            if ((this._loadingFX && this._loadingFX.resize(), e)) {
              var n = e.resetOption('media'),
                i = t && t.silent;
              this[iT] && (null == i && (i = this[iT].silent), (n = !0), (this[iT] = null)),
                (this[nT] = !0);
              try {
                n && pT(this),
                  gT.update.call(this, {
                    type: 'resize',
                    animation: h({ duration: 0 }, t && t.animation),
                  });
              } catch (r) {
                throw ((this[nT] = !1), r);
              }
              (this[nT] = !1), _T.call(this, i), xT.call(this, i);
            }
          }
        }),
        (n.prototype.showLoading = function (t, e) {
          if (
            !this._disposed &&
            (I(t) && ((e = t), (t = '')), (t = t || 'default'), this.hideLoading(), FT[t])
          ) {
            var n = FT[t](this._api, e),
              i = this._zr;
            (this._loadingFX = n), i.add(n);
          }
        }),
        (n.prototype.hideLoading = function () {
          this._disposed ||
            (this._loadingFX && this._zr.remove(this._loadingFX), (this._loadingFX = null));
        }),
        (n.prototype.makeActionFromEvent = function (t) {
          var e = h({}, t);
          return (e.type = RT[t.type]), e;
        }),
        (n.prototype.dispatchAction = function (t, e) {
          if (!this._disposed && (I(e) || (e = { silent: !!e }), OT[t.type] && this._model)) {
            if (this[nT]) return void this._pendingActions.push(t);
            var n = e.silent;
            mT.call(this, t, n);
            var i = e.flush;
            i ? this._zr.flush() : i !== !1 && $g.browser.weChat && this._throttledZrFlush(),
              _T.call(this, n),
              xT.call(this, n);
          }
        }),
        (n.prototype.updateLabelLayout = function () {
          RM.trigger('series:layoutlabels', this._model, this._api, { updatedSeries: [] });
        }),
        (n.prototype.appendData = function (t) {
          if (!this._disposed) {
            var e = t.seriesIndex,
              n = this.getModel(),
              i = n.getSeriesByIndex(e);
            i.appendData(t), (this._scheduler.unfinished = !0), this.getZr().wakeUp();
          }
        }),
        (n.internalField = (function () {
          function t(t) {
            t.clearColorPalette(),
              t.eachSeries(function (t) {
                t.clearColorPalette();
              });
          }
          function n(t) {
            var e = [],
              n = [],
              i = !1;
            if (
              (t.eachComponent(function (t, r) {
                var o = r.get('zlevel') || 0,
                  a = r.get('z') || 0,
                  s = r.getZLevelKey();
                (i = i || !!s),
                  ('series' === t ? n : e).push({
                    zlevel: o,
                    z: a,
                    idx: r.componentIndex,
                    type: t,
                    key: s,
                  });
              }),
              i)
            ) {
              var r,
                o,
                a = e.concat(n);
              Xe(a, function (t, e) {
                return t.zlevel === e.zlevel ? t.z - e.z : t.zlevel - e.zlevel;
              }),
                v(a, function (e) {
                  var n = t.getComponent(e.type, e.idx),
                    i = e.zlevel,
                    a = e.key;
                  null != r && (i = Math.max(r, i)),
                    a ? (i === r && a !== o && i++, (o = a)) : o && (i === r && i++, (o = '')),
                    (r = i),
                    n.setZLevel(i);
                });
            }
          }
          function i(t) {
            for (var e = [], n = t.currentStates, i = 0; i < n.length; i++) {
              var r = n[i];
              'emphasis' !== r && 'blur' !== r && 'select' !== r && e.push(r);
            }
            t.selected && t.states.select && e.push('select'),
              t.hoverState === px && t.states.emphasis
                ? e.push('emphasis')
                : t.hoverState === cx && t.states.blur && e.push('blur'),
              t.useStates(e);
          }
          function r(t, e) {
            var n = t._zr,
              i = n.storage,
              r = 0;
            i.traverse(function (t) {
              t.isGroup || r++;
            }),
              r > e.get('hoverLayerThreshold') &&
                !$g.node &&
                !$g.worker &&
                e.eachSeries(function (e) {
                  if (!e.preventUsingHoverLayer) {
                    var n = t._chartsMap[e.__viewId];
                    n.__alive &&
                      n.eachRendered(function (t) {
                        t.states.emphasis && (t.states.emphasis.hoverLayer = !0);
                      });
                  }
                });
          }
          function o(t, e) {
            var n = t.get('blendMode') || null;
            e.eachRendered(function (t) {
              t.isGroup || (t.style.blend = n);
            });
          }
          function a(t, e) {
            if (!t.preventAutoZ) {
              var n = t.get('z') || 0,
                i = t.get('zlevel') || 0;
              e.eachRendered(function (t) {
                return s(t, n, i, -1 / 0), !0;
              });
            }
          }
          function s(t, e, n, i) {
            var r = t.getTextContent(),
              o = t.getTextGuideLine(),
              a = t.isGroup;
            if (a)
              for (var l = t.childrenRef(), u = 0; u < l.length; u++)
                i = Math.max(s(l[u], e, n, i), i);
            else (t.z = e), (t.zlevel = n), (i = Math.max(t.z2, i));
            if ((r && ((r.z = e), (r.zlevel = n), isFinite(i) && (r.z2 = i + 2)), o)) {
              var h = t.textGuideLineConfig;
              (o.z = e), (o.zlevel = n), isFinite(i) && (o.z2 = i + (h && h.showAbove ? 1 : -1));
            }
            return i;
          }
          function l(t, e) {
            e.eachRendered(function (t) {
              if (!rs(t)) {
                var e = t.getTextContent(),
                  n = t.getTextGuideLine();
                t.stateTransition && (t.stateTransition = null),
                  e && e.stateTransition && (e.stateTransition = null),
                  n && n.stateTransition && (n.stateTransition = null),
                  t.hasState()
                    ? ((t.prevStates = t.currentStates), t.clearStates())
                    : t.prevStates && (t.prevStates = null);
              }
            });
          }
          function u(t, e) {
            var n = t.getModel('stateAnimation'),
              r = t.isAnimationEnabled(),
              o = n.get('duration'),
              a = o > 0 ? { duration: o, delay: n.get('delay'), easing: n.get('easing') } : null;
            e.eachRendered(function (t) {
              if (t.states && t.states.emphasis) {
                if (rs(t)) return;
                if ((t instanceof H_ && Ea(t), t.__dirty)) {
                  var e = t.prevStates;
                  e && t.useStates(e);
                }
                if (r) {
                  t.stateTransition = a;
                  var n = t.getTextContent(),
                    o = t.getTextGuideLine();
                  n && (n.stateTransition = a), o && (o.stateTransition = a);
                }
                t.__dirty && i(t);
              }
            });
          }
          (pT = function (t) {
            var e = t._scheduler;
            e.restorePipelines(t._model), e.prepareStageTasks(), fT(t, !0), fT(t, !1), e.plan();
          }),
            (fT = function (t, e) {
              function n(t) {
                var n = t.__requireNewView;
                t.__requireNewView = !1;
                var u = '_ec_' + t.id + '_' + t.type,
                  h = !n && a[u];
                if (!h) {
                  var c = Er(t.type),
                    p = e ? RS.getClass(c.main, c.sub) : zS.getClass(c.sub);
                  (h = new p()), h.init(i, l), (a[u] = h), o.push(h), s.add(h.group);
                }
                (t.__viewId = h.__id = u),
                  (h.__alive = !0),
                  (h.__model = t),
                  (h.group.__ecComponentInfo = { mainType: t.mainType, index: t.componentIndex }),
                  !e && r.prepareView(h, t, i, l);
              }
              for (
                var i = t._model,
                  r = t._scheduler,
                  o = e ? t._componentsViews : t._chartsViews,
                  a = e ? t._componentsMap : t._chartsMap,
                  s = t._zr,
                  l = t._api,
                  u = 0;
                u < o.length;
                u++
              )
                o[u].__alive = !1;
              e
                ? i.eachComponent(function (t, e) {
                    'series' !== t && n(e);
                  })
                : i.eachSeries(n);
              for (var u = 0; u < o.length; ) {
                var h = o[u];
                h.__alive
                  ? u++
                  : (!e && h.renderTask.dispose(),
                    s.remove(h.group),
                    h.dispose(i, l),
                    o.splice(u, 1),
                    a[h.__id] === h && delete a[h.__id],
                    (h.__id = h.group.__ecComponentInfo = null));
              }
            }),
            (dT = function (t, e, n, i, r) {
              function o(i) {
                i && i.__alive && i[e] && i[e](i.__model, a, t._api, n);
              }
              var a = t._model;
              if ((a.setUpdatePayload(n), !i))
                return void v([].concat(t._componentsViews).concat(t._chartsViews), o);
              var s = {};
              (s[i + 'Id'] = n[i + 'Id']),
                (s[i + 'Index'] = n[i + 'Index']),
                (s[i + 'Name'] = n[i + 'Name']);
              var l = { mainType: i, query: s };
              r && (l.subType = r);
              var u,
                h = n.excludeSeriesId;
              null != h &&
                ((u = X()),
                v(ur(h), function (t) {
                  var e = br(t, null);
                  null != e && u.set(e, !0);
                })),
                a &&
                  a.eachComponent(
                    l,
                    function (e) {
                      var i = u && null !== u.get(e.id);
                      if (!i)
                        if (Ra(n))
                          if (e instanceof OS)
                            n.type !== yx ||
                              n.notBlur ||
                              e.get(['emphasis', 'disabled']) ||
                              ma(e, n, t._api);
                          else {
                            var r = _a(e.mainType, e.componentIndex, n.name, t._api),
                              o = r.focusSelf,
                              a = r.dispatchers;
                            n.type === yx &&
                              o &&
                              !n.notBlur &&
                              ya(e.mainType, e.componentIndex, t._api),
                              a &&
                                v(a, function (t) {
                                  n.type === yx ? la(t) : ua(t);
                                });
                          }
                        else Oa(n) && e instanceof OS && (ba(e, n, t._api), Sa(e), DT(t));
                    },
                    t
                  ),
                a &&
                  a.eachComponent(
                    l,
                    function (e) {
                      var n = u && null !== u.get(e.id);
                      n || o(t['series' === i ? '_chartsMap' : '_componentsMap'][e.__viewId]);
                    },
                    t
                  );
            }),
            (gT = {
              prepareAndUpdate: function (t) {
                pT(this), gT.update.call(this, t, { optionChanged: null != t.newOption });
              },
              update: function (e, n) {
                var i = this._model,
                  r = this._api,
                  o = this._zr,
                  a = this._coordSysMgr,
                  s = this._scheduler;
                if (i) {
                  i.setUpdatePayload(e),
                    s.restoreData(i, e),
                    s.performSeriesTasks(i),
                    a.create(i, r),
                    s.performDataProcessorTasks(i, e),
                    yT(this, i),
                    a.update(i, r),
                    t(i),
                    s.performVisualTasks(i, e),
                    ST(this, i, r, e, n);
                  var l = i.get('backgroundColor') || 'transparent',
                    u = i.get('darkMode');
                  o.setBackgroundColor(l),
                    null != u && 'auto' !== u && o.setDarkMode(u),
                    RM.trigger('afterupdate', i, r);
                }
              },
              updateTransform: function (e) {
                var n = this,
                  i = this._model,
                  r = this._api;
                if (i) {
                  i.setUpdatePayload(e);
                  var o = [];
                  i.eachComponent(function (t, a) {
                    if ('series' !== t) {
                      var s = n.getViewOfComponentModel(a);
                      if (s && s.__alive)
                        if (s.updateTransform) {
                          var l = s.updateTransform(a, i, r, e);
                          l && l.update && o.push(s);
                        } else o.push(s);
                    }
                  });
                  var a = X();
                  i.eachSeries(function (t) {
                    var o = n._chartsMap[t.__viewId];
                    if (o.updateTransform) {
                      var s = o.updateTransform(t, i, r, e);
                      s && s.update && a.set(t.uid, 1);
                    } else a.set(t.uid, 1);
                  }),
                    t(i),
                    this._scheduler.performVisualTasks(i, e, { setDirty: !0, dirtyMap: a }),
                    TT(this, i, r, e, {}, a),
                    RM.trigger('afterupdate', i, r);
                }
              },
              updateView: function (e) {
                var n = this._model;
                n &&
                  (n.setUpdatePayload(e),
                  zS.markUpdateMethod(e, 'updateView'),
                  t(n),
                  this._scheduler.performVisualTasks(n, e, { setDirty: !0 }),
                  ST(this, n, this._api, e, {}),
                  RM.trigger('afterupdate', n, this._api));
              },
              updateVisual: function (e) {
                var n = this,
                  i = this._model;
                i &&
                  (i.setUpdatePayload(e),
                  i.eachSeries(function (t) {
                    t.getData().clearAllVisual();
                  }),
                  zS.markUpdateMethod(e, 'updateVisual'),
                  t(i),
                  this._scheduler.performVisualTasks(i, e, { visualType: 'visual', setDirty: !0 }),
                  i.eachComponent(function (t, r) {
                    if ('series' !== t) {
                      var o = n.getViewOfComponentModel(r);
                      o && o.__alive && o.updateVisual(r, i, n._api, e);
                    }
                  }),
                  i.eachSeries(function (t) {
                    var r = n._chartsMap[t.__viewId];
                    r.updateVisual(t, i, n._api, e);
                  }),
                  RM.trigger('afterupdate', i, this._api));
              },
              updateLayout: function (t) {
                gT.update.call(this, t);
              },
            }),
            (vT = function (t, e, n, i) {
              if (!t._disposed)
                for (
                  var r,
                    o = t._model,
                    a = t._coordSysMgr.getCoordinateSystems(),
                    s = Ir(o, n),
                    l = 0;
                  l < a.length;
                  l++
                ) {
                  var u = a[l];
                  if (u[e] && null != (r = u[e](o, s, i))) return r;
                }
            }),
            (yT = function (t, e) {
              var n = t._chartsMap,
                i = t._scheduler;
              e.eachSeries(function (t) {
                i.updateStreamModes(t, n[t.__viewId]);
              });
            }),
            (mT = function (t, e) {
              var n = this,
                i = this.getModel(),
                r = t.type,
                o = t.escapeConnect,
                a = OT[r],
                s = a.actionInfo,
                l = (s.update || 'update').split(':'),
                u = l.pop(),
                p = null != l[0] && Er(l[0]);
              this[nT] = !0;
              var f = [t],
                d = !1;
              t.batch &&
                ((d = !0),
                (f = y(t.batch, function (e) {
                  return (e = c(h({}, e), t)), (e.batch = null), e;
                })));
              var g,
                m = [],
                _ = Oa(t),
                x = Ra(t);
              if (
                (x && ga(this._api),
                v(f, function (e) {
                  if (
                    ((g = a.action(e, n._model, n._api)),
                    (g = g || h({}, e)),
                    (g.type = s.event || g.type),
                    m.push(g),
                    x)
                  ) {
                    var i = Ar(t),
                      r = i.queryOptionMap,
                      o = i.mainTypeSpecified,
                      l = o ? r.keys()[0] : 'series';
                    dT(n, u, e, l), DT(n);
                  } else _ ? (dT(n, u, e, 'series'), DT(n)) : p && dT(n, u, e, p.main, p.sub);
                }),
                'none' !== u && !x && !_ && !p)
              )
                try {
                  this[iT]
                    ? (pT(this), gT.update.call(this, t), (this[iT] = null))
                    : gT[u].call(this, t);
                } catch (w) {
                  throw ((this[nT] = !1), w);
                }
              if (
                ((g = d ? { type: s.event || r, escapeConnect: o, batch: m } : m[0]),
                (this[nT] = !1),
                !e)
              ) {
                var b = this._messageCenter;
                if ((b.trigger(g.type, g), _)) {
                  var S = {
                    type: 'selectchanged',
                    escapeConnect: o,
                    selected: Ma(i),
                    isFromClick: t.isFromClick || !1,
                    fromAction: t.type,
                    fromActionPayload: t,
                  };
                  b.trigger(S.type, S);
                }
              }
            }),
            (_T = function (t) {
              for (var e = this._pendingActions; e.length; ) {
                var n = e.shift();
                mT.call(this, n, t);
              }
            }),
            (xT = function (t) {
              !t && this.trigger('updated');
            }),
            (wT = function (t, e) {
              t.on('rendered', function (n) {
                e.trigger('rendered', n),
                  !t.animation.isFinished() ||
                    e[iT] ||
                    e._scheduler.unfinished ||
                    e._pendingActions.length ||
                    e.trigger('finished');
              });
            }),
            (bT = function (t, e) {
              t.on('mouseover', function (t) {
                var n = t.target,
                  i = Eh(n, La);
                i && (xa(i, t, e._api), DT(e));
              })
                .on('mouseout', function (t) {
                  var n = t.target,
                    i = Eh(n, La);
                  i && (wa(i, t, e._api), DT(e));
                })
                .on('click', function (t) {
                  var n = t.target,
                    i = Eh(
                      n,
                      function (t) {
                        return null != rx(t).dataIndex;
                      },
                      !0
                    );
                  if (i) {
                    var r = i.selected ? 'unselect' : 'select',
                      o = rx(i);
                    e._api.dispatchAction({
                      type: r,
                      dataType: o.dataType,
                      dataIndexInside: o.dataIndex,
                      seriesIndex: o.seriesIndex,
                      isFromClick: !0,
                    });
                  }
                });
            }),
            (ST = function (t, e, i, r, o) {
              n(e),
                MT(t, e, i, r, o),
                v(t._chartsViews, function (t) {
                  t.__alive = !1;
                }),
                TT(t, e, i, r, o),
                v(t._chartsViews, function (t) {
                  t.__alive || t.remove(e, i);
                });
            }),
            (MT = function (t, e, n, i, r, o) {
              v(o || t._componentsViews, function (t) {
                var r = t.__model;
                l(r, t), t.render(r, e, n, i), a(r, t), u(r, t);
              });
            }),
            (TT = function (t, e, n, i, s, c) {
              var p = t._scheduler;
              (s = h(s || {}, { updatedSeries: e.getSeries() })),
                RM.trigger('series:beforeupdate', e, n, s);
              var f = !1;
              e.eachSeries(function (e) {
                var n = t._chartsMap[e.__viewId];
                n.__alive = !0;
                var r = n.renderTask;
                p.updatePayload(r, i),
                  l(e, n),
                  c && c.get(e.uid) && r.dirty(),
                  r.perform(p.getPerformArgs(r)) && (f = !0),
                  (n.group.silent = !!e.get('silent')),
                  o(e, n),
                  Sa(e);
              }),
                (p.unfinished = f || p.unfinished),
                RM.trigger('series:layoutlabels', e, n, s),
                RM.trigger('series:transition', e, n, s),
                e.eachSeries(function (e) {
                  var n = t._chartsMap[e.__viewId];
                  a(e, n), u(e, n);
                }),
                r(t, e),
                RM.trigger('series:afterupdate', e, n, s);
            }),
            (DT = function (t) {
              (t[rT] = !0), t.getZr().wakeUp();
            }),
            (IT = function (t) {
              t[rT] &&
                (t.getZr().storage.traverse(function (t) {
                  rs(t) || i(t);
                }),
                (t[rT] = !1));
            }),
            (CT = function (t) {
              return new ((function (n) {
                function i() {
                  return (null !== n && n.apply(this, arguments)) || this;
                }
                return (
                  e(i, n),
                  (i.prototype.getCoordinateSystems = function () {
                    return t._coordSysMgr.getCoordinateSystems();
                  }),
                  (i.prototype.getComponentByElement = function (e) {
                    for (; e; ) {
                      var n = e.__ecComponentInfo;
                      if (null != n) return t._model.getComponent(n.mainType, n.index);
                      e = e.parent;
                    }
                  }),
                  (i.prototype.enterEmphasis = function (e, n) {
                    la(e, n), DT(t);
                  }),
                  (i.prototype.leaveEmphasis = function (e, n) {
                    ua(e, n), DT(t);
                  }),
                  (i.prototype.enterBlur = function (e) {
                    ha(e), DT(t);
                  }),
                  (i.prototype.leaveBlur = function (e) {
                    ca(e), DT(t);
                  }),
                  (i.prototype.enterSelect = function (e) {
                    pa(e), DT(t);
                  }),
                  (i.prototype.leaveSelect = function (e) {
                    fa(e), DT(t);
                  }),
                  (i.prototype.getModel = function () {
                    return t.getModel();
                  }),
                  (i.prototype.getViewOfComponentModel = function (e) {
                    return t.getViewOfComponentModel(e);
                  }),
                  (i.prototype.getViewOfSeriesModel = function (e) {
                    return t.getViewOfSeriesModel(e);
                  }),
                  i
                );
              })($b))(t);
            }),
            (kT = function (t) {
              function e(t, e) {
                for (var n = 0; n < t.length; n++) {
                  var i = t[n];
                  i[aT] = e;
                }
              }
              v(RT, function (n, i) {
                t._messageCenter.on(i, function (n) {
                  if (HT[t.group] && t[aT] !== sT) {
                    if (n && n.escapeConnect) return;
                    var i = t.makeActionFromEvent(n),
                      r = [];
                    v(VT, function (e) {
                      e !== t && e.group === t.group && r.push(e);
                    }),
                      e(r, sT),
                      v(r, function (t) {
                        t[aT] !== lT && t.dispatchAction(i);
                      }),
                      e(r, uT);
                  }
                });
              });
            });
        })()),
        n
      );
    })(Lv),
    LT = AT.prototype;
  (LT.on = Sc('on')),
    (LT.off = Sc('off')),
    (LT.one = function (t, e, n) {
      function i() {
        for (var n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
        e && e.apply && e.apply(this, n), r.off(t, i);
      }
      var r = this;
      this.on.call(this, t, i, n);
    });
  var PT = [
      'click',
      'dblclick',
      'mouseover',
      'mouseout',
      'mousemove',
      'mousedown',
      'mouseup',
      'globalout',
      'contextmenu',
    ],
    OT = {},
    RT = {},
    ET = [],
    BT = [],
    zT = [],
    NT = {},
    FT = {},
    VT = {},
    HT = {},
    WT = +new Date() - 0,
    GT = +new Date() - 0,
    ZT = '_echarts_instance_',
    UT = Dc,
    XT = [],
    YT = Vu;
  Wc(YM, XS),
    Wc(KM, qS),
    Wc(KM, jS),
    Wc(YM, cM),
    Wc(KM, pM),
    Wc(tT, xc),
    Oc(gu),
    Rc(HM, vu),
    Zc('default', xh),
    Nc({ type: yx, event: yx, update: yx }, $),
    Nc({ type: mx, event: mx, update: mx }, $),
    Nc({ type: _x, event: _x, update: _x }, $),
    Nc({ type: xx, event: xx, update: xx }, $),
    Nc({ type: bx, event: bx, update: bx }, $),
    Pc('light', nM),
    Pc('dark', sM);
  var qT,
    jT,
    KT,
    $T,
    QT,
    JT,
    tC,
    eC = {},
    nC = (function () {
      function t(t, e, n, i, r, o) {
        (this._old = t),
          (this._new = e),
          (this._oldKeyGetter = n || jc),
          (this._newKeyGetter = i || jc),
          (this.context = r),
          (this._diffModeMultiple = 'multiple' === o);
      }
      return (
        (t.prototype.add = function (t) {
          return (this._add = t), this;
        }),
        (t.prototype.update = function (t) {
          return (this._update = t), this;
        }),
        (t.prototype.updateManyToOne = function (t) {
          return (this._updateManyToOne = t), this;
        }),
        (t.prototype.updateOneToMany = function (t) {
          return (this._updateOneToMany = t), this;
        }),
        (t.prototype.updateManyToMany = function (t) {
          return (this._updateManyToMany = t), this;
        }),
        (t.prototype.remove = function (t) {
          return (this._remove = t), this;
        }),
        (t.prototype.execute = function () {
          this[this._diffModeMultiple ? '_executeMultiple' : '_executeOneToOne']();
        }),
        (t.prototype._executeOneToOne = function () {
          var t = this._old,
            e = this._new,
            n = {},
            i = new Array(t.length),
            r = new Array(e.length);
          this._initIndexMap(t, null, i, '_oldKeyGetter'),
            this._initIndexMap(e, n, r, '_newKeyGetter');
          for (var o = 0; o < t.length; o++) {
            var a = i[o],
              s = n[a],
              l = qc(s);
            if (l > 1) {
              var u = s.shift();
              1 === s.length && (n[a] = s[0]), this._update && this._update(u, o);
            } else
              1 === l
                ? ((n[a] = null), this._update && this._update(s, o))
                : this._remove && this._remove(o);
          }
          this._performRestAdd(r, n);
        }),
        (t.prototype._executeMultiple = function () {
          var t = this._old,
            e = this._new,
            n = {},
            i = {},
            r = [],
            o = [];
          this._initIndexMap(t, n, r, '_oldKeyGetter'),
            this._initIndexMap(e, i, o, '_newKeyGetter');
          for (var a = 0; a < r.length; a++) {
            var s = r[a],
              l = n[s],
              u = i[s],
              h = qc(l),
              c = qc(u);
            if (h > 1 && 1 === c)
              this._updateManyToOne && this._updateManyToOne(u, l), (i[s] = null);
            else if (1 === h && c > 1)
              this._updateOneToMany && this._updateOneToMany(u, l), (i[s] = null);
            else if (1 === h && 1 === c) this._update && this._update(u, l), (i[s] = null);
            else if (h > 1 && c > 1)
              this._updateManyToMany && this._updateManyToMany(u, l), (i[s] = null);
            else if (h > 1) for (var p = 0; h > p; p++) this._remove && this._remove(l[p]);
            else this._remove && this._remove(l);
          }
          this._performRestAdd(o, i);
        }),
        (t.prototype._performRestAdd = function (t, e) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n],
              r = e[i],
              o = qc(r);
            if (o > 1) for (var a = 0; o > a; a++) this._add && this._add(r[a]);
            else 1 === o && this._add && this._add(r);
            e[i] = null;
          }
        }),
        (t.prototype._initIndexMap = function (t, e, n, i) {
          for (var r = this._diffModeMultiple, o = 0; o < t.length; o++) {
            var a = '_ec_' + this[i](t[o], o);
            if ((r || (n[o] = a), e)) {
              var s = e[a],
                l = qc(s);
              0 === l ? ((e[a] = o), r && n.push(a)) : 1 === l ? (e[a] = [s, o]) : s.push(o);
            }
          }
        }),
        t
      );
    })(),
    iC = (function () {
      function t(t, e) {
        (this._encode = t), (this._schema = e);
      }
      return (
        (t.prototype.get = function () {
          return { fullDimensions: this._getFullDimensionNames(), encode: this._encode };
        }),
        (t.prototype._getFullDimensionNames = function () {
          return (
            this._cachedDimNames ||
              (this._cachedDimNames = this._schema ? this._schema.makeOutputDimensionNames() : []),
            this._cachedDimNames
          );
        }),
        t
      );
    })(),
    rC = (function () {
      function t(t) {
        (this.otherDims = {}), null != t && h(this, t);
      }
      return t;
    })(),
    oC = Dr(),
    aC = { float: 'f', int: 'i', ordinal: 'o', number: 'n', time: 't' },
    sC = (function () {
      function t(t) {
        (this.dimensions = t.dimensions),
          (this._dimOmitted = t.dimensionOmitted),
          (this.source = t.source),
          (this._fullDimCount = t.fullDimensionCount),
          this._updateDimOmitted(t.dimensionOmitted);
      }
      return (
        (t.prototype.isDimensionOmitted = function () {
          return this._dimOmitted;
        }),
        (t.prototype._updateDimOmitted = function (t) {
          (this._dimOmitted = t), t && (this._dimNameMap || (this._dimNameMap = np(this.source)));
        }),
        (t.prototype.getSourceDimensionIndex = function (t) {
          return N(this._dimNameMap.get(t), -1);
        }),
        (t.prototype.getSourceDimension = function (t) {
          var e = this.source.dimensionsDefine;
          return e ? e[t] : void 0;
        }),
        (t.prototype.makeStoreSchema = function () {
          for (
            var t = this._fullDimCount,
              e = ku(this.source),
              n = !ip(t),
              i = '',
              r = [],
              o = 0,
              a = 0;
            t > o;
            o++
          ) {
            var s = void 0,
              l = void 0,
              u = void 0,
              h = this.dimensions[a];
            if (h && h.storeDimIndex === o)
              (s = e ? h.name : null), (l = h.type), (u = h.ordinalMeta), a++;
            else {
              var c = this.getSourceDimension(o);
              c && ((s = e ? c.name : null), (l = c.type));
            }
            r.push({ property: s, type: l, ordinalMeta: u }),
              !e ||
                null == s ||
                (h && h.isCalculationCoord) ||
                (i += n ? s.replace(/\`/g, '`1').replace(/\$/g, '`2') : s),
              (i += '$'),
              (i += aC[l] || 'f'),
              u && (i += u.uid),
              (i += '$');
          }
          var p = this.source,
            f = [p.seriesLayoutBy, p.startIndex, i].join('$$');
          return { dimensions: r, hash: f };
        }),
        (t.prototype.makeOutputDimensionNames = function () {
          for (var t = [], e = 0, n = 0; e < this._fullDimCount; e++) {
            var i = void 0,
              r = this.dimensions[n];
            if (r && r.storeDimIndex === e) r.isCalculationCoord || (i = r.name), n++;
            else {
              var o = this.getSourceDimension(e);
              o && (i = o.name);
            }
            t.push(i);
          }
          return t;
        }),
        (t.prototype.appendCalculationDimension = function (t) {
          this.dimensions.push(t),
            (t.isCalculationCoord = !0),
            this._fullDimCount++,
            this._updateDimOmitted(!0);
        }),
        t
      );
    })(),
    lC = I,
    uC = y,
    hC = 'undefined' == typeof Int32Array ? Array : Int32Array,
    cC = 'e\x00\x00',
    pC = -1,
    fC = [
      'hasItemOption',
      '_nameList',
      '_idList',
      '_invertedIndicesMap',
      '_dimSummary',
      'userOutput',
      '_rawData',
      '_dimValueGetter',
      '_nameDimIdx',
      '_idDimIdx',
      '_nameRepeatCount',
    ],
    dC = ['_approximateExtent'],
    gC = (function () {
      function t(t, e) {
        (this.type = 'list'),
          (this._dimOmitted = !1),
          (this._nameList = []),
          (this._idList = []),
          (this._visual = {}),
          (this._layout = {}),
          (this._itemVisuals = []),
          (this._itemLayouts = []),
          (this._graphicEls = []),
          (this._approximateExtent = {}),
          (this._calculationInfo = {}),
          (this.hasItemOption = !1),
          (this.TRANSFERABLE_METHODS = ['cloneShallow', 'downSample', 'lttbDownSample', 'map']),
          (this.CHANGABLE_METHODS = ['filterSelf', 'selectRange']),
          (this.DOWNSAMPLE_METHODS = ['downSample', 'lttbDownSample']);
        var n,
          i = !1;
        tp(t)
          ? ((n = t.dimensions), (this._dimOmitted = t.isDimensionOmitted()), (this._schema = t))
          : ((i = !0), (n = t)),
          (n = n || ['x', 'y']);
        for (var r = {}, o = [], a = {}, s = !1, l = {}, u = 0; u < n.length; u++) {
          var h = n[u],
            c = C(h) ? new rC({ name: h }) : h instanceof rC ? h : new rC(h),
            p = c.name;
          (c.type = c.type || 'float'), c.coordDim || ((c.coordDim = p), (c.coordDimIndex = 0));
          var f = (c.otherDims = c.otherDims || {});
          o.push(p),
            (r[p] = c),
            null != l[p] && (s = !0),
            c.createInvertedIndices && (a[p] = []),
            0 === f.itemName && (this._nameDimIdx = u),
            0 === f.itemId && (this._idDimIdx = u),
            i && (c.storeDimIndex = u);
        }
        if (
          ((this.dimensions = o),
          (this._dimInfos = r),
          this._initGetDimensionInfo(s),
          (this.hostModel = e),
          (this._invertedIndicesMap = a),
          this._dimOmitted)
        ) {
          var d = (this._dimIdxToName = X());
          v(o, function (t) {
            d.set(r[t].storeDimIndex, t);
          });
        }
      }
      return (
        (t.prototype.getDimension = function (t) {
          var e = this._recognizeDimIndex(t);
          if (null == e) return t;
          if (((e = t), !this._dimOmitted)) return this.dimensions[e];
          var n = this._dimIdxToName.get(e);
          if (null != n) return n;
          var i = this._schema.getSourceDimension(e);
          return i ? i.name : void 0;
        }),
        (t.prototype.getDimensionIndex = function (t) {
          var e = this._recognizeDimIndex(t);
          if (null != e) return e;
          if (null == t) return -1;
          var n = this._getDimInfo(t);
          return n
            ? n.storeDimIndex
            : this._dimOmitted
            ? this._schema.getSourceDimensionIndex(t)
            : -1;
        }),
        (t.prototype._recognizeDimIndex = function (t) {
          return D(t) ||
            (null != t &&
              !isNaN(t) &&
              !this._getDimInfo(t) &&
              (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
            ? +t
            : void 0;
        }),
        (t.prototype._getStoreDimIndex = function (t) {
          var e = this.getDimensionIndex(t);
          return e;
        }),
        (t.prototype.getDimensionInfo = function (t) {
          return this._getDimInfo(this.getDimension(t));
        }),
        (t.prototype._initGetDimensionInfo = function (t) {
          var e = this._dimInfos;
          this._getDimInfo = t
            ? function (t) {
                return e.hasOwnProperty(t) ? e[t] : void 0;
              }
            : function (t) {
                return e[t];
              };
        }),
        (t.prototype.getDimensionsOnCoord = function () {
          return this._dimSummary.dataDimsOnCoord.slice();
        }),
        (t.prototype.mapDimension = function (t, e) {
          var n = this._dimSummary;
          if (null == e) return n.encodeFirstDimNotExtra[t];
          var i = n.encode[t];
          return i ? i[e] : null;
        }),
        (t.prototype.mapDimensionsAll = function (t) {
          var e = this._dimSummary,
            n = e.encode[t];
          return (n || []).slice();
        }),
        (t.prototype.getStore = function () {
          return this._store;
        }),
        (t.prototype.initData = function (t, e, n) {
          var i,
            r = this;
          if ((t instanceof IS && (i = t), !i)) {
            var o = this.dimensions,
              a = mu(t) || g(t) ? new uS(t, o.length) : t;
            i = new IS();
            var s = uC(o, function (t) {
              return { type: r._dimInfos[t].type, property: t };
            });
            i.initData(a, s, n);
          }
          (this._store = i),
            (this._nameList = (e || []).slice()),
            (this._idList = []),
            (this._nameRepeatCount = {}),
            this._doInit(0, i.count()),
            (this._dimSummary = Kc(this, this._schema)),
            (this.userOutput = this._dimSummary.userOutput);
        }),
        (t.prototype.appendData = function (t) {
          var e = this._store.appendData(t);
          this._doInit(e[0], e[1]);
        }),
        (t.prototype.appendValues = function (t, e) {
          var n = this._store.appendValues(t, e.length),
            i = n.start,
            r = n.end,
            o = this._shouldMakeIdFromName();
          if ((this._updateOrdinalMeta(), e))
            for (var a = i; r > a; a++) {
              var s = a - i;
              (this._nameList[a] = e[s]), o && tC(this, a);
            }
        }),
        (t.prototype._updateOrdinalMeta = function () {
          for (var t = this._store, e = this.dimensions, n = 0; n < e.length; n++) {
            var i = this._dimInfos[e[n]];
            i.ordinalMeta && t.collectOrdinalMeta(i.storeDimIndex, i.ordinalMeta);
          }
        }),
        (t.prototype._shouldMakeIdFromName = function () {
          var t = this._store.getProvider();
          return null == this._idDimIdx && t.getSource().sourceFormat !== Pb && !t.fillStorage;
        }),
        (t.prototype._doInit = function (t, e) {
          if (!(t >= e)) {
            var n = this._store,
              i = n.getProvider();
            this._updateOrdinalMeta();
            var r = this._nameList,
              o = this._idList,
              a = i.getSource().sourceFormat,
              s = a === Db;
            if (s && !i.pure)
              for (var l = [], u = t; e > u; u++) {
                var h = i.getItem(u, l);
                if ((!this.hasItemOption && pr(h) && (this.hasItemOption = !0), h)) {
                  var c = h.name;
                  null == r[u] && null != c && (r[u] = br(c, null));
                  var p = h.id;
                  null == o[u] && null != p && (o[u] = br(p, null));
                }
              }
            if (this._shouldMakeIdFromName()) for (var u = t; e > u; u++) tC(this, u);
            qT(this);
          }
        }),
        (t.prototype.getApproximateExtent = function (t) {
          return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
        }),
        (t.prototype.setApproximateExtent = function (t, e) {
          (e = this.getDimension(e)), (this._approximateExtent[e] = t.slice());
        }),
        (t.prototype.getCalculationInfo = function (t) {
          return this._calculationInfo[t];
        }),
        (t.prototype.setCalculationInfo = function (t, e) {
          lC(t) ? h(this._calculationInfo, t) : (this._calculationInfo[t] = e);
        }),
        (t.prototype.getName = function (t) {
          var e = this.getRawIndex(t),
            n = this._nameList[e];
          return (
            null == n && null != this._nameDimIdx && (n = KT(this, this._nameDimIdx, e)),
            null == n && (n = ''),
            n
          );
        }),
        (t.prototype._getCategory = function (t, e) {
          var n = this._store.get(t, e),
            i = this._store.getOrdinalMeta(t);
          return i ? i.categories[n] : n;
        }),
        (t.prototype.getId = function (t) {
          return jT(this, this.getRawIndex(t));
        }),
        (t.prototype.count = function () {
          return this._store.count();
        }),
        (t.prototype.get = function (t, e) {
          var n = this._store,
            i = this._dimInfos[t];
          return i ? n.get(i.storeDimIndex, e) : void 0;
        }),
        (t.prototype.getByRawIndex = function (t, e) {
          var n = this._store,
            i = this._dimInfos[t];
          return i ? n.getByRawIndex(i.storeDimIndex, e) : void 0;
        }),
        (t.prototype.getIndices = function () {
          return this._store.getIndices();
        }),
        (t.prototype.getDataExtent = function (t) {
          return this._store.getDataExtent(this._getStoreDimIndex(t));
        }),
        (t.prototype.getSum = function (t) {
          return this._store.getSum(this._getStoreDimIndex(t));
        }),
        (t.prototype.getMedian = function (t) {
          return this._store.getMedian(this._getStoreDimIndex(t));
        }),
        (t.prototype.getValues = function (t, e) {
          var n = this,
            i = this._store;
          return M(t)
            ? i.getValues(
                uC(t, function (t) {
                  return n._getStoreDimIndex(t);
                }),
                e
              )
            : i.getValues(t);
        }),
        (t.prototype.hasValue = function (t) {
          for (var e = this._dimSummary.dataDimIndicesOnCoord, n = 0, i = e.length; i > n; n++)
            if (isNaN(this._store.get(e[n], t))) return !1;
          return !0;
        }),
        (t.prototype.indexOfName = function (t) {
          for (var e = 0, n = this._store.count(); n > e; e++) if (this.getName(e) === t) return e;
          return -1;
        }),
        (t.prototype.getRawIndex = function (t) {
          return this._store.getRawIndex(t);
        }),
        (t.prototype.indexOfRawIndex = function (t) {
          return this._store.indexOfRawIndex(t);
        }),
        (t.prototype.rawIndexOf = function (t, e) {
          var n = t && this._invertedIndicesMap[t],
            i = n[e];
          return null == i || isNaN(i) ? pC : i;
        }),
        (t.prototype.indicesOfNearest = function (t, e, n) {
          return this._store.indicesOfNearest(this._getStoreDimIndex(t), e, n);
        }),
        (t.prototype.each = function (t, e, n) {
          T(t) && ((n = e), (e = t), (t = []));
          var i = n || this,
            r = uC($T(t), this._getStoreDimIndex, this);
          this._store.each(r, i ? _v(e, i) : e);
        }),
        (t.prototype.filterSelf = function (t, e, n) {
          T(t) && ((n = e), (e = t), (t = []));
          var i = n || this,
            r = uC($T(t), this._getStoreDimIndex, this);
          return (this._store = this._store.filter(r, i ? _v(e, i) : e)), this;
        }),
        (t.prototype.selectRange = function (t) {
          var e = this,
            n = {},
            i = w(t),
            r = [];
          return (
            v(i, function (i) {
              var o = e._getStoreDimIndex(i);
              (n[o] = t[i]), r.push(o);
            }),
            (this._store = this._store.selectRange(n)),
            this
          );
        }),
        (t.prototype.mapArray = function (t, e, n) {
          T(t) && ((n = e), (e = t), (t = [])), (n = n || this);
          var i = [];
          return (
            this.each(
              t,
              function () {
                i.push(e && e.apply(this, arguments));
              },
              n
            ),
            i
          );
        }),
        (t.prototype.map = function (t, e, n, i) {
          var r = n || i || this,
            o = uC($T(t), this._getStoreDimIndex, this),
            a = JT(this);
          return (a._store = this._store.map(o, r ? _v(e, r) : e)), a;
        }),
        (t.prototype.modify = function (t, e, n, i) {
          var r = n || i || this,
            o = uC($T(t), this._getStoreDimIndex, this);
          this._store.modify(o, r ? _v(e, r) : e);
        }),
        (t.prototype.downSample = function (t, e, n, i) {
          var r = JT(this);
          return (r._store = this._store.downSample(this._getStoreDimIndex(t), e, n, i)), r;
        }),
        (t.prototype.lttbDownSample = function (t, e) {
          var n = JT(this);
          return (n._store = this._store.lttbDownSample(this._getStoreDimIndex(t), e)), n;
        }),
        (t.prototype.getRawDataItem = function (t) {
          return this._store.getRawDataItem(t);
        }),
        (t.prototype.getItemModel = function (t) {
          var e = this.hostModel,
            n = this.getRawDataItem(t);
          return new Xw(n, e, e && e.ecModel);
        }),
        (t.prototype.diff = function (t) {
          var e = this;
          return new nC(
            t ? t.getStore().getIndices() : [],
            this.getStore().getIndices(),
            function (e) {
              return jT(t, e);
            },
            function (t) {
              return jT(e, t);
            }
          );
        }),
        (t.prototype.getVisual = function (t) {
          var e = this._visual;
          return e && e[t];
        }),
        (t.prototype.setVisual = function (t, e) {
          (this._visual = this._visual || {}), lC(t) ? h(this._visual, t) : (this._visual[t] = e);
        }),
        (t.prototype.getItemVisual = function (t, e) {
          var n = this._itemVisuals[t],
            i = n && n[e];
          return null == i ? this.getVisual(e) : i;
        }),
        (t.prototype.hasItemVisual = function () {
          return this._itemVisuals.length > 0;
        }),
        (t.prototype.ensureUniqueItemVisual = function (t, e) {
          var n = this._itemVisuals,
            i = n[t];
          i || (i = n[t] = {});
          var r = i[e];
          return (
            null == r &&
              ((r = this.getVisual(e)),
              M(r) ? (r = r.slice()) : lC(r) && (r = h({}, r)),
              (i[e] = r)),
            r
          );
        }),
        (t.prototype.setItemVisual = function (t, e, n) {
          var i = this._itemVisuals[t] || {};
          (this._itemVisuals[t] = i), lC(e) ? h(i, e) : (i[e] = n);
        }),
        (t.prototype.clearAllVisual = function () {
          (this._visual = {}), (this._itemVisuals = []);
        }),
        (t.prototype.setLayout = function (t, e) {
          lC(t) ? h(this._layout, t) : (this._layout[t] = e);
        }),
        (t.prototype.getLayout = function (t) {
          return this._layout[t];
        }),
        (t.prototype.getItemLayout = function (t) {
          return this._itemLayouts[t];
        }),
        (t.prototype.setItemLayout = function (t, e, n) {
          this._itemLayouts[t] = n ? h(this._itemLayouts[t] || {}, e) : e;
        }),
        (t.prototype.clearItemLayouts = function () {
          this._itemLayouts.length = 0;
        }),
        (t.prototype.setItemGraphicEl = function (t, e) {
          var n = this.hostModel && this.hostModel.seriesIndex;
          ox(n, this.dataType, t, e), (this._graphicEls[t] = e);
        }),
        (t.prototype.getItemGraphicEl = function (t) {
          return this._graphicEls[t];
        }),
        (t.prototype.eachItemGraphicEl = function (t, e) {
          v(this._graphicEls, function (n, i) {
            n && t && t.call(e, n, i);
          });
        }),
        (t.prototype.cloneShallow = function (e) {
          return (
            e ||
              (e = new t(
                this._schema ? this._schema : uC(this.dimensions, this._getDimInfo, this),
                this.hostModel
              )),
            QT(e, this),
            (e._store = this._store),
            e
          );
        }),
        (t.prototype.wrapMethod = function (t, e) {
          var n = this[t];
          T(n) &&
            ((this.__wrappedMethods = this.__wrappedMethods || []),
            this.__wrappedMethods.push(t),
            (this[t] = function () {
              var t = n.apply(this, arguments);
              return e.apply(this, [t].concat(V(arguments)));
            }));
        }),
        (t.internalField = (function () {
          (qT = function (t) {
            var e = t._invertedIndicesMap;
            v(e, function (n, i) {
              var r = t._dimInfos[i],
                o = r.ordinalMeta,
                a = t._store;
              if (o) {
                n = e[i] = new hC(o.categories.length);
                for (var s = 0; s < n.length; s++) n[s] = pC;
                for (var s = 0; s < a.count(); s++) n[a.get(r.storeDimIndex, s)] = s;
              }
            });
          }),
            (KT = function (t, e, n) {
              return br(t._getCategory(e, n), null);
            }),
            (jT = function (t, e) {
              var n = t._idList[e];
              return (
                null == n && null != t._idDimIdx && (n = KT(t, t._idDimIdx, e)),
                null == n && (n = cC + e),
                n
              );
            }),
            ($T = function (t) {
              return M(t) || (t = null != t ? [t] : []), t;
            }),
            (JT = function (e) {
              var n = new t(
                e._schema ? e._schema : uC(e.dimensions, e._getDimInfo, e),
                e.hostModel
              );
              return QT(n, e), n;
            }),
            (QT = function (t, e) {
              v(fC.concat(e.__wrappedMethods || []), function (n) {
                e.hasOwnProperty(n) && (t[n] = e[n]);
              }),
                (t.__wrappedMethods = e.__wrappedMethods),
                v(dC, function (n) {
                  t[n] = s(e[n]);
                }),
                (t._calculationInfo = h({}, e._calculationInfo));
            }),
            (tC = function (t, e) {
              var n = t._nameList,
                i = t._idList,
                r = t._nameDimIdx,
                o = t._idDimIdx,
                a = n[e],
                s = i[e];
              if (
                (null == a && null != r && (n[e] = a = KT(t, r, e)),
                null == s && null != o && (i[e] = s = KT(t, o, e)),
                null == s && null != a)
              ) {
                var l = t._nameRepeatCount,
                  u = (l[a] = (l[a] || 0) + 1);
                (s = a), u > 1 && (s += '__ec__' + u), (i[e] = s);
              }
            });
        })()),
        t
      );
    })(),
    vC = (function () {
      function t(t) {
        (this.coordSysDims = []),
          (this.axisMap = X()),
          (this.categoryAxisMap = X()),
          (this.coordSysName = t);
      }
      return t;
    })(),
    yC = {
      cartesian2d: function (t, e, n, i) {
        var r = t.getReferringComponents('xAxis', Em).models[0],
          o = t.getReferringComponents('yAxis', Em).models[0];
        (e.coordSysDims = ['x', 'y']),
          n.set('x', r),
          n.set('y', o),
          hp(r) && (i.set('x', r), (e.firstCategoryDimIndex = 0)),
          hp(o) &&
            (i.set('y', o), null == e.firstCategoryDimIndex && (e.firstCategoryDimIndex = 1));
      },
      singleAxis: function (t, e, n, i) {
        var r = t.getReferringComponents('singleAxis', Em).models[0];
        (e.coordSysDims = ['single']),
          n.set('single', r),
          hp(r) && (i.set('single', r), (e.firstCategoryDimIndex = 0));
      },
      polar: function (t, e, n, i) {
        var r = t.getReferringComponents('polar', Em).models[0],
          o = r.findAxisModel('radiusAxis'),
          a = r.findAxisModel('angleAxis');
        (e.coordSysDims = ['radius', 'angle']),
          n.set('radius', o),
          n.set('angle', a),
          hp(o) && (i.set('radius', o), (e.firstCategoryDimIndex = 0)),
          hp(a) &&
            (i.set('angle', a), null == e.firstCategoryDimIndex && (e.firstCategoryDimIndex = 1));
      },
      geo: function (t, e) {
        e.coordSysDims = ['lng', 'lat'];
      },
      parallel: function (t, e, n, i) {
        var r = t.ecModel,
          o = r.getComponent('parallel', t.get('parallelIndex')),
          a = (e.coordSysDims = o.dimensions.slice());
        v(o.parallelAxisIndex, function (t, o) {
          var s = r.getComponent('parallelAxis', t),
            l = a[o];
          n.set(l, s),
            hp(s) &&
              (i.set(l, s), null == e.firstCategoryDimIndex && (e.firstCategoryDimIndex = o));
        });
      },
    },
    mC = (function () {
      function t(t) {
        (this._setting = t || {}), (this._extent = [1 / 0, -1 / 0]);
      }
      return (
        (t.prototype.getSetting = function (t) {
          return this._setting[t];
        }),
        (t.prototype.unionExtent = function (t) {
          var e = this._extent;
          t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]);
        }),
        (t.prototype.unionExtentFromData = function (t, e) {
          this.unionExtent(t.getApproximateExtent(e));
        }),
        (t.prototype.getExtent = function () {
          return this._extent.slice();
        }),
        (t.prototype.setExtent = function (t, e) {
          var n = this._extent;
          isNaN(t) || (n[0] = t), isNaN(e) || (n[1] = e);
        }),
        (t.prototype.isInExtentRange = function (t) {
          return this._extent[0] <= t && this._extent[1] >= t;
        }),
        (t.prototype.isBlank = function () {
          return this._isBlank;
        }),
        (t.prototype.setBlank = function (t) {
          this._isBlank = t;
        }),
        t
      );
    })();
  Zr(mC);
  var _C = 0,
    xC = (function () {
      function t(t) {
        (this.categories = t.categories || []),
          (this._needCollect = t.needCollect),
          (this._deduplication = t.deduplication),
          (this.uid = ++_C);
      }
      return (
        (t.createByAxisModel = function (e) {
          var n = e.option,
            i = n.data,
            r = i && y(i, xp);
          return new t({ categories: r, needCollect: !r, deduplication: n.dedplication !== !1 });
        }),
        (t.prototype.getOrdinal = function (t) {
          return this._getOrCreateMap().get(t);
        }),
        (t.prototype.parseAndCollect = function (t) {
          var e,
            n = this._needCollect;
          if (!C(t) && !n) return t;
          if (n && !this._deduplication)
            return (e = this.categories.length), (this.categories[e] = t), e;
          var i = this._getOrCreateMap();
          return (
            (e = i.get(t)),
            null == e &&
              (n
                ? ((e = this.categories.length), (this.categories[e] = t), i.set(t, e))
                : (e = 0 / 0)),
            e
          );
        }),
        (t.prototype._getOrCreateMap = function () {
          return this._map || (this._map = X(this.categories));
        }),
        t
      );
    })(),
    wC = (function (t) {
      function n(e) {
        var n = t.call(this, e) || this;
        n.type = 'ordinal';
        var i = n.getSetting('ordinalMeta');
        return (
          i || (i = new xC({})),
          M(i) &&
            (i = new xC({
              categories: y(i, function (t) {
                return I(t) ? t.value : t;
              }),
            })),
          (n._ordinalMeta = i),
          (n._extent = n.getSetting('extent') || [0, i.categories.length - 1]),
          n
        );
      }
      return (
        e(n, t),
        (n.prototype.parse = function (t) {
          return null == t ? 0 / 0 : C(t) ? this._ordinalMeta.getOrdinal(t) : Math.round(t);
        }),
        (n.prototype.contain = function (t) {
          return (
            (t = this.parse(t)), kp(t, this._extent) && null != this._ordinalMeta.categories[t]
          );
        }),
        (n.prototype.normalize = function (t) {
          return (t = this._getTickNumber(this.parse(t))), Dp(t, this._extent);
        }),
        (n.prototype.scale = function (t) {
          return (t = Math.round(Ip(t, this._extent))), this.getRawOrdinalNumber(t);
        }),
        (n.prototype.getTicks = function () {
          for (var t = [], e = this._extent, n = e[0]; n <= e[1]; ) t.push({ value: n }), n++;
          return t;
        }),
        (n.prototype.getMinorTicks = function () {}),
        (n.prototype.setSortInfo = function (t) {
          if (null == t)
            return void (this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null);
          for (
            var e = t.ordinalNumbers,
              n = (this._ordinalNumbersByTick = []),
              i = (this._ticksByOrdinalNumber = []),
              r = 0,
              o = this._ordinalMeta.categories.length,
              a = Math.min(o, e.length);
            a > r;
            ++r
          ) {
            var s = e[r];
            (n[r] = s), (i[s] = r);
          }
          for (var l = 0; o > r; ++r) {
            for (; null != i[l]; ) l++;
            n.push(l), (i[l] = r);
          }
        }),
        (n.prototype._getTickNumber = function (t) {
          var e = this._ticksByOrdinalNumber;
          return e && t >= 0 && t < e.length ? e[t] : t;
        }),
        (n.prototype.getRawOrdinalNumber = function (t) {
          var e = this._ordinalNumbersByTick;
          return e && t >= 0 && t < e.length ? e[t] : t;
        }),
        (n.prototype.getLabel = function (t) {
          if (!this.isBlank()) {
            var e = this.getRawOrdinalNumber(t.value),
              n = this._ordinalMeta.categories[e];
            return null == n ? '' : n + '';
          }
        }),
        (n.prototype.count = function () {
          return this._extent[1] - this._extent[0] + 1;
        }),
        (n.prototype.unionExtentFromData = function (t, e) {
          this.unionExtent(t.getApproximateExtent(e));
        }),
        (n.prototype.isInExtentRange = function (t) {
          return (t = this._getTickNumber(t)), this._extent[0] <= t && this._extent[1] >= t;
        }),
        (n.prototype.getOrdinalMeta = function () {
          return this._ordinalMeta;
        }),
        (n.prototype.calcNiceTicks = function () {}),
        (n.prototype.calcNiceExtent = function () {}),
        (n.type = 'ordinal'),
        n
      );
    })(mC);
  mC.registerClass(wC);
  var bC = Hi,
    SC = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = 'interval'), (e._interval = 0), (e._intervalPrecision = 2), e;
      }
      return (
        e(n, t),
        (n.prototype.parse = function (t) {
          return t;
        }),
        (n.prototype.contain = function (t) {
          return kp(t, this._extent);
        }),
        (n.prototype.normalize = function (t) {
          return Dp(t, this._extent);
        }),
        (n.prototype.scale = function (t) {
          return Ip(t, this._extent);
        }),
        (n.prototype.setExtent = function (t, e) {
          var n = this._extent;
          isNaN(t) || (n[0] = parseFloat(t)), isNaN(e) || (n[1] = parseFloat(e));
        }),
        (n.prototype.unionExtent = function (t) {
          var e = this._extent;
          t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), this.setExtent(e[0], e[1]);
        }),
        (n.prototype.getInterval = function () {
          return this._interval;
        }),
        (n.prototype.setInterval = function (t) {
          (this._interval = t),
            (this._niceExtent = this._extent.slice()),
            (this._intervalPrecision = Mp(t));
        }),
        (n.prototype.getTicks = function (t) {
          var e = this._interval,
            n = this._extent,
            i = this._niceExtent,
            r = this._intervalPrecision,
            o = [];
          if (!e) return o;
          var a = 1e4;
          n[0] < i[0] && o.push(t ? { value: bC(i[0] - e, r) } : { value: n[0] });
          for (
            var s = i[0];
            s <= i[1] && (o.push({ value: s }), (s = bC(s + e, r)), s !== o[o.length - 1].value);

          )
            if (o.length > a) return [];
          var l = o.length ? o[o.length - 1].value : i[1];
          return n[1] > l && o.push(t ? { value: bC(l + e, r) } : { value: n[1] }), o;
        }),
        (n.prototype.getMinorTicks = function (t) {
          for (var e = this.getTicks(!0), n = [], i = this.getExtent(), r = 1; r < e.length; r++) {
            for (
              var o = e[r], a = e[r - 1], s = 0, l = [], u = o.value - a.value, h = u / t;
              t - 1 > s;

            ) {
              var c = bC(a.value + (s + 1) * h);
              c > i[0] && c < i[1] && l.push(c), s++;
            }
            n.push(l);
          }
          return n;
        }),
        (n.prototype.getLabel = function (t, e) {
          if (null == t) return '';
          var n = e && e.precision;
          null == n ? (n = Gi(t.value) || 0) : 'auto' === n && (n = this._intervalPrecision);
          var i = bC(t.value, n, !0);
          return ml(i);
        }),
        (n.prototype.calcNiceTicks = function (t, e, n) {
          t = t || 5;
          var i = this._extent,
            r = i[1] - i[0];
          if (isFinite(r)) {
            0 > r && ((r = -r), i.reverse());
            var o = bp(i, t, e, n);
            (this._intervalPrecision = o.intervalPrecision),
              (this._interval = o.interval),
              (this._niceExtent = o.niceTickExtent);
          }
        }),
        (n.prototype.calcNiceExtent = function (t) {
          var e = this._extent;
          if (e[0] === e[1])
            if (0 !== e[0]) {
              var n = e[0];
              t.fixMax ? (e[0] -= n / 2) : ((e[1] += n / 2), (e[0] -= n / 2));
            } else e[1] = 1;
          var i = e[1] - e[0];
          isFinite(i) || ((e[0] = 0), (e[1] = 1)),
            this.calcNiceTicks(t.splitNumber, t.minInterval, t.maxInterval);
          var r = this._interval;
          t.fixMin || (e[0] = bC(Math.floor(e[0] / r) * r)),
            t.fixMax || (e[1] = bC(Math.ceil(e[1] / r) * r));
        }),
        (n.prototype.setNiceExtent = function (t, e) {
          this._niceExtent = [t, e];
        }),
        (n.type = 'interval'),
        n
      );
    })(mC);
  mC.registerClass(SC);
  var MC = 'undefined' != typeof Float32Array,
    TC = MC ? Float32Array : Array,
    CC = '__ec_stack_',
    kC = function (t, e, n, i) {
      for (; i > n; ) {
        var r = (n + i) >>> 1;
        t[r][1] < e ? (n = r + 1) : (i = r);
      }
      return n;
    },
    DC = (function (t) {
      function n(e) {
        var n = t.call(this, e) || this;
        return (n.type = 'time'), n;
      }
      return (
        e(n, t),
        (n.prototype.getLabel = function (t) {
          var e = this.getSetting('useUTC');
          return Js(
            t.value,
            ub[Qs(Ks(this._minLevelUnit))] || ub.second,
            e,
            this.getSetting('locale')
          );
        }),
        (n.prototype.getFormattedLabel = function (t, e, n) {
          var i = this.getSetting('useUTC'),
            r = this.getSetting('locale');
          return tl(t, e, n, r, i);
        }),
        (n.prototype.getTicks = function () {
          var t = this._interval,
            e = this._extent,
            n = [];
          if (!t) return n;
          n.push({ value: e[0], level: 0 });
          var i = this.getSetting('useUTC'),
            r = Kp(this._minLevelUnit, this._approxInterval, i, e);
          return (n = n.concat(r)), n.push({ value: e[1], level: 0 }), n;
        }),
        (n.prototype.calcNiceExtent = function (t) {
          var e = this._extent;
          if ((e[0] === e[1] && ((e[0] -= ob), (e[1] += ob)), e[1] === -1 / 0 && 1 / 0 === e[0])) {
            var n = new Date();
            (e[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate())), (e[0] = e[1] - ob);
          }
          this.calcNiceTicks(t.splitNumber, t.minInterval, t.maxInterval);
        }),
        (n.prototype.calcNiceTicks = function (t, e, n) {
          t = t || 10;
          var i = this._extent,
            r = i[1] - i[0];
          (this._approxInterval = r / t),
            null != e && this._approxInterval < e && (this._approxInterval = e),
            null != n && this._approxInterval > n && (this._approxInterval = n);
          var o = IC.length,
            a = Math.min(kC(IC, this._approxInterval, 0, o), o - 1);
          (this._interval = IC[a][1]), (this._minLevelUnit = IC[Math.max(a - 1, 0)][0]);
        }),
        (n.prototype.parse = function (t) {
          return D(t) ? t : +Ki(t);
        }),
        (n.prototype.contain = function (t) {
          return kp(this.parse(t), this._extent);
        }),
        (n.prototype.normalize = function (t) {
          return Dp(this.parse(t), this._extent);
        }),
        (n.prototype.scale = function (t) {
          return Ip(t, this._extent);
        }),
        (n.type = 'time'),
        n
      );
    })(SC),
    IC = [
      ['second', nb],
      ['minute', ib],
      ['hour', rb],
      ['quarter-day', 6 * rb],
      ['half-day', 12 * rb],
      ['day', 1.2 * ob],
      ['half-week', 3.5 * ob],
      ['week', 7 * ob],
      ['month', 31 * ob],
      ['quarter', 95 * ob],
      ['half-year', ab / 2],
      ['year', ab],
    ];
  mC.registerClass(DC);
  var AC = mC.prototype,
    LC = SC.prototype,
    PC = Hi,
    OC = Math.floor,
    RC = Math.ceil,
    EC = Math.pow,
    BC = Math.log,
    zC = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = 'log'), (e.base = 10), (e._originalScale = new SC()), (e._interval = 0), e;
      }
      return (
        e(n, t),
        (n.prototype.getTicks = function (t) {
          var e = this._originalScale,
            n = this._extent,
            i = e.getExtent(),
            r = LC.getTicks.call(this, t);
          return y(
            r,
            function (t) {
              var e = t.value,
                r = Hi(EC(this.base, e));
              return (
                (r = e === n[0] && this._fixMin ? $p(r, i[0]) : r),
                (r = e === n[1] && this._fixMax ? $p(r, i[1]) : r),
                { value: r }
              );
            },
            this
          );
        }),
        (n.prototype.setExtent = function (t, e) {
          var n = this.base;
          (t = BC(t) / BC(n)), (e = BC(e) / BC(n)), LC.setExtent.call(this, t, e);
        }),
        (n.prototype.getExtent = function () {
          var t = this.base,
            e = AC.getExtent.call(this);
          (e[0] = EC(t, e[0])), (e[1] = EC(t, e[1]));
          var n = this._originalScale,
            i = n.getExtent();
          return (
            this._fixMin && (e[0] = $p(e[0], i[0])), this._fixMax && (e[1] = $p(e[1], i[1])), e
          );
        }),
        (n.prototype.unionExtent = function (t) {
          this._originalScale.unionExtent(t);
          var e = this.base;
          (t[0] = BC(t[0]) / BC(e)), (t[1] = BC(t[1]) / BC(e)), AC.unionExtent.call(this, t);
        }),
        (n.prototype.unionExtentFromData = function (t, e) {
          this.unionExtent(t.getApproximateExtent(e));
        }),
        (n.prototype.calcNiceTicks = function (t) {
          t = t || 10;
          var e = this._extent,
            n = e[1] - e[0];
          if (!(1 / 0 === n || 0 >= n)) {
            var i = $i(n),
              r = (t / n) * i;
            for (0.5 >= r && (i *= 10); !isNaN(i) && Math.abs(i) < 1 && Math.abs(i) > 0; ) i *= 10;
            var o = [Hi(RC(e[0] / i) * i), Hi(OC(e[1] / i) * i)];
            (this._interval = i), (this._niceExtent = o);
          }
        }),
        (n.prototype.calcNiceExtent = function (t) {
          LC.calcNiceExtent.call(this, t), (this._fixMin = t.fixMin), (this._fixMax = t.fixMax);
        }),
        (n.prototype.parse = function (t) {
          return t;
        }),
        (n.prototype.contain = function (t) {
          return (t = BC(t) / BC(this.base)), kp(t, this._extent);
        }),
        (n.prototype.normalize = function (t) {
          return (t = BC(t) / BC(this.base)), Dp(t, this._extent);
        }),
        (n.prototype.scale = function (t) {
          return (t = Ip(t, this._extent)), EC(this.base, t);
        }),
        (n.type = 'log'),
        n
      );
    })(mC),
    NC = zC.prototype;
  (NC.getMinorTicks = LC.getMinorTicks), (NC.getLabel = LC.getLabel), mC.registerClass(zC);
  var FC = (function () {
      function t(t, e, n) {
        this._prepareParams(t, e, n);
      }
      return (
        (t.prototype._prepareParams = function (t, e, n) {
          n[1] < n[0] && (n = [0 / 0, 0 / 0]), (this._dataMin = n[0]), (this._dataMax = n[1]);
          var i = (this._isOrdinal = 'ordinal' === t.type);
          this._needCrossZero = 'interval' === t.type && e.getNeedCrossZero && e.getNeedCrossZero();
          var r = (this._modelMinRaw = e.get('min', !0));
          T(r)
            ? (this._modelMinNum = Jp(t, r({ min: n[0], max: n[1] })))
            : 'dataMin' !== r && (this._modelMinNum = Jp(t, r));
          var o = (this._modelMaxRaw = e.get('max', !0));
          if (
            (T(o)
              ? (this._modelMaxNum = Jp(t, o({ min: n[0], max: n[1] })))
              : 'dataMax' !== o && (this._modelMaxNum = Jp(t, o)),
            i)
          )
            this._axisDataLen = e.getCategories().length;
          else {
            var a = e.get('boundaryGap'),
              s = M(a) ? a : [a || 0, a || 0];
            this._boundaryGapInner =
              'boolean' == typeof s[0] || 'boolean' == typeof s[1]
                ? [0, 0]
                : [bi(s[0], 1), bi(s[1], 1)];
          }
        }),
        (t.prototype.calculate = function () {
          var t = this._isOrdinal,
            e = this._dataMin,
            n = this._dataMax,
            i = this._axisDataLen,
            r = this._boundaryGapInner,
            o = t ? null : n - e || Math.abs(e),
            a = 'dataMin' === this._modelMinRaw ? e : this._modelMinNum,
            s = 'dataMax' === this._modelMaxRaw ? n : this._modelMaxNum,
            l = null != a,
            u = null != s;
          null == a && (a = t ? (i ? 0 : 0 / 0) : e - r[0] * o),
            null == s && (s = t ? (i ? i - 1 : 0 / 0) : n + r[1] * o),
            (null == a || !isFinite(a)) && (a = 0 / 0),
            (null == s || !isFinite(s)) && (s = 0 / 0);
          var h = B(a) || B(s) || (t && !i);
          this._needCrossZero && (a > 0 && s > 0 && !l && (a = 0), 0 > a && 0 > s && !u && (s = 0));
          var c = this._determinedMin,
            p = this._determinedMax;
          return (
            null != c && ((a = c), (l = !0)),
            null != p && ((s = p), (u = !0)),
            { min: a, max: s, minFixed: l, maxFixed: u, isBlank: h }
          );
        }),
        (t.prototype.modifyDataMinMax = function (t, e) {
          this[HC[t]] = e;
        }),
        (t.prototype.setDeterminedMinMax = function (t, e) {
          var n = VC[t];
          this[n] = e;
        }),
        (t.prototype.freeze = function () {
          this.frozen = !0;
        }),
        t
      );
    })(),
    VC = { min: '_determinedMin', max: '_determinedMax' },
    HC = { min: '_dataMin', max: '_dataMax' },
    WC = (function () {
      function t() {}
      return (
        (t.prototype.getNeedCrossZero = function () {
          var t = this.option;
          return !t.scale;
        }),
        (t.prototype.getCoordSysModel = function () {}),
        t
      );
    })(),
    GC = { isDimensionStacked: fp, enableDataStack: cp, getStackedDimension: dp },
    ZC = (Object.freeze || Object)({
      createList: df,
      getLayoutRect: kl,
      dataStack: GC,
      createScale: gf,
      mixinAxisModelCommonMethods: vf,
      getECData: rx,
      createTextStyle: yf,
      createDimensions: rp,
      createSymbol: zh,
      enableHoverEmphasis: Ta,
    }),
    UC = [],
    XC = {
      registerPreprocessor: Oc,
      registerProcessor: Rc,
      registerPostInit: Ec,
      registerPostUpdate: Bc,
      registerUpdateLifecycle: zc,
      registerAction: Nc,
      registerCoordinateSystem: Fc,
      registerLayout: Hc,
      registerVisual: Wc,
      registerTransform: YT,
      registerLoading: Zc,
      registerMap: Xc,
      registerImpl: wc,
      PRIORITY: eT,
      ComponentModel: wb,
      ComponentView: RS,
      SeriesModel: OS,
      ChartView: zS,
      registerComponentModel: function (t) {
        wb.registerClass(t);
      },
      registerComponentView: function (t) {
        RS.registerClass(t);
      },
      registerSeriesModel: function (t) {
        OS.registerClass(t);
      },
      registerChartView: function (t) {
        zS.registerClass(t);
      },
      registerSubTypeDefaulter: function (t, e) {
        wb.registerSubTypeDefaulter(t, e);
      },
      registerPainter: function (t, e) {
        zi(t, e);
      },
    },
    YC = 1e-8,
    qC = [],
    jC = (function () {
      function t(t) {
        this.name = t;
      }
      return (
        (t.prototype.setCenter = function (t) {
          this._center = t;
        }),
        (t.prototype.getCenter = function () {
          var t = this._center;
          return t || (t = this._center = this.calcCenter()), t;
        }),
        t
      );
    })(),
    KC = (function () {
      function t(t, e) {
        (this.type = 'polygon'), (this.exterior = t), (this.interiors = e);
      }
      return t;
    })(),
    $C = (function () {
      function t(t) {
        (this.type = 'linestring'), (this.points = t);
      }
      return t;
    })(),
    QC = (function (t) {
      function n(e, n, i) {
        var r = t.call(this, e) || this;
        return (r.type = 'geoJSON'), (r.geometries = n), (r._center = i && [i[0], i[1]]), r;
      }
      return (
        e(n, t),
        (n.prototype.calcCenter = function () {
          for (var t, e = this.geometries, n = 0, i = 0; i < e.length; i++) {
            var r = e[i],
              o = r.exterior,
              a = o && o.length;
            a > n && ((t = r), (n = a));
          }
          if (t) return Sf(t.exterior);
          var s = this.getBoundingRect();
          return [s.x + s.width / 2, s.y + s.height / 2];
        }),
        (n.prototype.getBoundingRect = function (t) {
          var e = this._rect;
          if (e && !t) return e;
          var n = [1 / 0, 1 / 0],
            i = [-1 / 0, -1 / 0],
            r = this.geometries;
          return (
            v(r, function (e) {
              'polygon' === e.type
                ? bf(e.exterior, n, i, t)
                : v(e.points, function (e) {
                    bf(e, n, i, t);
                  });
            }),
            (isFinite(n[0]) && isFinite(n[1]) && isFinite(i[0]) && isFinite(i[1])) ||
              (n[0] = n[1] = i[0] = i[1] = 0),
            (e = new fm(n[0], n[1], i[0] - n[0], i[1] - n[1])),
            t || (this._rect = e),
            e
          );
        }),
        (n.prototype.contain = function (t) {
          var e = this.getBoundingRect(),
            n = this.geometries;
          if (!e.contain(t[0], t[1])) return !1;
          t: for (var i = 0, r = n.length; r > i; i++) {
            var o = n[i];
            if ('polygon' === o.type) {
              var a = o.exterior,
                s = o.interiors;
              if (xf(a, t[0], t[1])) {
                for (var l = 0; l < (s ? s.length : 0); l++) if (xf(s[l], t[0], t[1])) continue t;
                return !0;
              }
            }
          }
          return !1;
        }),
        (n.prototype.transformTo = function (t, e, n, i) {
          var r = this.getBoundingRect(),
            o = r.width / r.height;
          n ? i || (i = n / o) : (n = o * i);
          for (
            var a = new fm(t, e, n, i), s = r.calculateTransform(a), l = this.geometries, u = 0;
            u < l.length;
            u++
          ) {
            var h = l[u];
            'polygon' === h.type
              ? (wf(h.exterior, s),
                v(h.interiors, function (t) {
                  wf(t, s);
                }))
              : v(h.points, function (t) {
                  wf(t, s);
                });
          }
          (r = this._rect), r.copy(a), (this._center = [r.x + r.width / 2, r.y + r.height / 2]);
        }),
        (n.prototype.cloneShallow = function (t) {
          null == t && (t = this.name);
          var e = new n(t, this.geometries, this._center);
          return (e._rect = this._rect), (e.transformTo = null), e;
        }),
        n
      );
    })(jC),
    JC =
      ((function (t) {
        function n(e, n) {
          var i = t.call(this, e) || this;
          return (i.type = 'geoSVG'), (i._elOnlyForCalculate = n), i;
        }
        return (
          e(n, t),
          (n.prototype.calcCenter = function () {
            for (
              var t = this._elOnlyForCalculate,
                e = t.getBoundingRect(),
                n = [e.x + e.width / 2, e.y + e.height / 2],
                i = ai(qC),
                r = t;
              r && !r.isGeoSVGGraphicRoot;

            )
              li(i, r.getLocalTransform(), i), (r = r.parent);
            return pi(i, i), ve(n, n, i), n;
          }),
          n
        );
      })(jC),
      (Object.freeze || Object)({
        linearMap: Fi,
        round: Hi,
        asc: Wi,
        getPrecision: Gi,
        getPrecisionSafe: Zi,
        getPixelPrecision: Ui,
        getPercentWithPrecision: Xi,
        MAX_SAFE_INTEGER: Im,
        remRadian: qi,
        isRadianAroundZero: ji,
        parseDate: Ki,
        quantity: $i,
        quantityExponent: Qi,
        nice: Ji,
        quantile: tr,
        reformIntervals: er,
        isNumeric: ir,
        numericToNumber: nr,
      })),
    tk = (Object.freeze || Object)({ parse: Ki, format: Js }),
    ek = (Object.freeze || Object)({
      extendShape: us,
      extendPath: hs,
      makePath: fs,
      makeImage: ds,
      mergePath: Aw,
      resizePath: vs,
      createIcon: Ts,
      updateProps: ns,
      initProps: is,
      getTransform: ys,
      clipPointsByRect: Ss,
      clipRectByRect: Ms,
      registerShape: cs,
      getShapeClass: ps,
      Group: wm,
      Image: X_,
      Text: tx,
      Circle: Nx,
      Ellipse: Vx,
      Sector: Jx,
      Ring: ew,
      Polygon: iw,
      Polyline: ow,
      Rect: K_,
      Line: lw,
      BezierCurve: cw,
      Arc: fw,
      IncrementalDisplayable: Mw,
      CompoundPath: dw,
      LinearGradient: vw,
      RadialGradient: yw,
      BoundingRect: fm,
    }),
    nk = (Object.freeze || Object)({
      addCommas: ml,
      toCamelCase: _l,
      normalizeCssArray: pb,
      encodeHTML: xl,
      formatTpl: wl,
      getTooltipMarker: bl,
      formatTime: Sl,
      capitalFirst: Ml,
      truncateText: Kr,
      getTextRect: yl,
    }),
    ik = (Object.freeze || Object)({
      map: y,
      each: v,
      indexOf: p,
      inherits: f,
      reduce: m,
      filter: _,
      bind: _v,
      curry: S,
      isArray: M,
      isString: C,
      isObject: I,
      isFunction: T,
      extend: h,
      defaults: c,
      clone: s,
      merge: l,
    }),
    rk = Dr(),
    ok = [0, 1],
    ak = (function () {
      function t(t, e, n) {
        (this.onBand = !1),
          (this.inverse = !1),
          (this.dim = t),
          (this.scale = e),
          (this._extent = n || [0, 0]);
      }
      return (
        (t.prototype.contain = function (t) {
          var e = this._extent,
            n = Math.min(e[0], e[1]),
            i = Math.max(e[0], e[1]);
          return t >= n && i >= t;
        }),
        (t.prototype.containData = function (t) {
          return this.scale.contain(t);
        }),
        (t.prototype.getExtent = function () {
          return this._extent.slice();
        }),
        (t.prototype.getPixelPrecision = function (t) {
          return Ui(t || this.scale.getExtent(), this._extent);
        }),
        (t.prototype.setExtent = function (t, e) {
          var n = this._extent;
          (n[0] = t), (n[1] = e);
        }),
        (t.prototype.dataToCoord = function (t, e) {
          var n = this._extent,
            i = this.scale;
          return (
            (t = i.normalize(t)),
            this.onBand && 'ordinal' === i.type && ((n = n.slice()), Wf(n, i.count())),
            Fi(t, ok, n, e)
          );
        }),
        (t.prototype.coordToData = function (t, e) {
          var n = this._extent,
            i = this.scale;
          this.onBand && 'ordinal' === i.type && ((n = n.slice()), Wf(n, i.count()));
          var r = Fi(t, n, ok, e);
          return this.scale.scale(r);
        }),
        (t.prototype.pointToData = function () {}),
        (t.prototype.getTicksCoords = function (t) {
          t = t || {};
          var e = t.tickModel || this.getTickModel(),
            n = If(this, e),
            i = n.ticks,
            r = y(
              i,
              function (t) {
                return {
                  coord: this.dataToCoord(
                    'ordinal' === this.scale.type ? this.scale.getRawOrdinalNumber(t) : t
                  ),
                  tickValue: t,
                };
              },
              this
            ),
            o = e.get('alignWithLabel');
          return Gf(this, r, o, t.clamp), r;
        }),
        (t.prototype.getMinorTicksCoords = function () {
          if ('ordinal' === this.scale.type) return [];
          var t = this.model.getModel('minorTick'),
            e = t.get('splitNumber');
          (e > 0 && 100 > e) || (e = 5);
          var n = this.scale.getMinorTicks(e),
            i = y(
              n,
              function (t) {
                return y(
                  t,
                  function (t) {
                    return { coord: this.dataToCoord(t), tickValue: t };
                  },
                  this
                );
              },
              this
            );
          return i;
        }),
        (t.prototype.getViewLabels = function () {
          return Df(this).labels;
        }),
        (t.prototype.getLabelModel = function () {
          return this.model.getModel('axisLabel');
        }),
        (t.prototype.getTickModel = function () {
          return this.model.getModel('axisTick');
        }),
        (t.prototype.getBandWidth = function () {
          var t = this._extent,
            e = this.scale.getExtent(),
            n = e[1] - e[0] + (this.onBand ? 1 : 0);
          0 === n && (n = 1);
          var i = Math.abs(t[1] - t[0]);
          return Math.abs(i) / n;
        }),
        (t.prototype.calculateCategoryInterval = function () {
          return Nf(this);
        }),
        t
      );
    })(),
    sk = 2 * Math.PI,
    lk = A_.CMD,
    uk = ['top', 'right', 'bottom', 'left'],
    hk = [],
    ck = new rm(),
    pk = new rm(),
    fk = new rm(),
    dk = new rm(),
    gk = new rm(),
    vk = [],
    yk = new rm(),
    mk = ['align', 'verticalAlign', 'width', 'height', 'fontSize'],
    _k = new nm(),
    xk = Dr(),
    wk = Dr(),
    bk = ['x', 'y', 'rotation'],
    Sk = (function () {
      function t() {
        (this._labelList = []), (this._chartViewList = []);
      }
      return (
        (t.prototype.clearLabels = function () {
          (this._labelList = []), (this._chartViewList = []);
        }),
        (t.prototype._addLabel = function (t, e, n, i, r) {
          var o = i.style,
            a = i.__hostTarget,
            s = a.textConfig || {},
            l = i.getComputedTransform(),
            u = i.getBoundingRect().plain();
          fm.applyTransform(u, u, l),
            l
              ? _k.setLocalTransform(l)
              : ((_k.x = _k.y = _k.rotation = _k.originX = _k.originY = 0),
                (_k.scaleX = _k.scaleY = 1));
          var h,
            c = i.__hostTarget;
          if (c) {
            h = c.getBoundingRect().plain();
            var p = c.getComputedTransform();
            fm.applyTransform(h, h, p);
          }
          var f = h && c.getTextGuideLine();
          this._labelList.push({
            label: i,
            labelLine: f,
            seriesModel: n,
            dataIndex: t,
            dataType: e,
            layoutOption: r,
            computedLayoutOption: null,
            rect: u,
            hostRect: h,
            priority: h ? h.width * h.height : 0,
            defaultAttr: {
              ignore: i.ignore,
              labelGuideIgnore: f && f.ignore,
              x: _k.x,
              y: _k.y,
              scaleX: _k.scaleX,
              scaleY: _k.scaleY,
              rotation: _k.rotation,
              style: {
                x: o.x,
                y: o.y,
                align: o.align,
                verticalAlign: o.verticalAlign,
                width: o.width,
                height: o.height,
                fontSize: o.fontSize,
              },
              cursor: i.cursor,
              attachedPos: s.position,
              attachedRot: s.rotation,
            },
          });
        }),
        (t.prototype.addLabelsOfSeries = function (t) {
          var e = this;
          this._chartViewList.push(t);
          var n = t.__model,
            i = n.get('labelLayout');
          (T(i) || w(i).length) &&
            t.group.traverse(function (t) {
              if (t.ignore) return !0;
              var r = t.getTextContent(),
                o = rx(t);
              r && !r.disableLabelLayout && e._addLabel(o.dataIndex, o.dataType, n, r, i);
            });
        }),
        (t.prototype.updateLayoutConfig = function (t) {
          function e(t, e) {
            return function () {
              td(t, e);
            };
          }
          for (var n = t.getWidth(), i = t.getHeight(), r = 0; r < this._labelList.length; r++) {
            var o = this._labelList[r],
              a = o.label,
              s = a.__hostTarget,
              l = o.defaultAttr,
              u = void 0;
            (u = T(o.layoutOption) ? o.layoutOption(pd(o, s)) : o.layoutOption),
              (u = u || {}),
              (o.computedLayoutOption = u);
            var h = Math.PI / 180;
            s &&
              s.setTextConfig({
                local: !1,
                position: null != u.x || null != u.y ? null : l.attachedPos,
                rotation: null != u.rotate ? u.rotate * h : l.attachedRot,
                offset: [u.dx || 0, u.dy || 0],
              });
            var c = !1;
            if (
              (null != u.x
                ? ((a.x = Vi(u.x, n)), a.setStyle('x', 0), (c = !0))
                : ((a.x = l.x), a.setStyle('x', l.style.x)),
              null != u.y
                ? ((a.y = Vi(u.y, i)), a.setStyle('y', 0), (c = !0))
                : ((a.y = l.y), a.setStyle('y', l.style.y)),
              u.labelLinePoints)
            ) {
              var p = s.getTextGuideLine();
              p && (p.setShape({ points: u.labelLinePoints }), (c = !1));
            }
            var f = xk(a);
            (f.needsUpdateLabelLine = c),
              (a.rotation = null != u.rotate ? u.rotate * h : l.rotation),
              (a.scaleX = l.scaleX),
              (a.scaleY = l.scaleY);
            for (var d = 0; d < mk.length; d++) {
              var g = mk[d];
              a.setStyle(g, null != u[g] ? u[g] : l.style[g]);
            }
            if (u.draggable) {
              if (((a.draggable = !0), (a.cursor = 'move'), s)) {
                var v = o.seriesModel;
                if (null != o.dataIndex) {
                  var y = o.seriesModel.getData(o.dataType);
                  v = y.getItemModel(o.dataIndex);
                }
                a.on('drag', e(s, v.getModel('labelLine')));
              }
            } else a.off('drag'), (a.cursor = l.cursor);
          }
        }),
        (t.prototype.layout = function (t) {
          var e = t.getWidth(),
            n = t.getHeight(),
            i = ad(this._labelList),
            r = _(i, function (t) {
              return 'shiftX' === t.layoutOption.moveOverlap;
            }),
            o = _(i, function (t) {
              return 'shiftY' === t.layoutOption.moveOverlap;
            });
          ld(r, 0, e), ud(o, 0, n);
          var a = _(i, function (t) {
            return t.layoutOption.hideOverlap;
          });
          hd(a);
        }),
        (t.prototype.processLabelsOverall = function () {
          var t = this;
          v(this._chartViewList, function (e) {
            var n = e.__model,
              i = e.ignoreLabelLineUpdate,
              r = n.isAnimationEnabled();
            e.group.traverse(function (e) {
              if (e.ignore && !e.forceLabelAnimation) return !0;
              var o = !i,
                a = e.getTextContent();
              !o && a && (o = xk(a).needsUpdateLabelLine),
                o && t._updateLabelLine(e, n),
                r && t._animateLabels(e, n);
            });
          });
        }),
        (t.prototype._updateLabelLine = function (t, e) {
          var n = t.getTextContent(),
            i = rx(t),
            r = i.dataIndex;
          if (n && null != r) {
            var o = e.getData(i.dataType),
              a = o.getItemModel(r),
              s = {},
              l = o.getItemVisual(r, 'style'),
              u = o.getVisual('drawType');
            s.stroke = l[u];
            var h = a.getModel('labelLine');
            rd(t, od(a), s), td(t, h);
          }
        }),
        (t.prototype._animateLabels = function (t, e) {
          var n = t.getTextContent(),
            i = t.getTextGuideLine();
          if (
            n &&
            (t.forceLabelAnimation ||
              (!n.ignore && !n.invisible && !t.disableLabelAnimation && !rs(t)))
          ) {
            var r = xk(n),
              o = r.oldLayout,
              a = rx(t),
              s = a.dataIndex,
              l = { x: n.x, y: n.y, rotation: n.rotation },
              u = e.getData(a.dataType);
            if (o) {
              n.attr(o);
              var h = t.prevStates;
              h &&
                (p(h, 'select') >= 0 && n.attr(r.oldLayoutSelect),
                p(h, 'emphasis') >= 0 && n.attr(r.oldLayoutEmphasis)),
                ns(n, l, e, s);
            } else if ((n.attr(l), !Ew(n).valueAnimation)) {
              var c = N(n.style.opacity, 1);
              (n.style.opacity = 0), is(n, { style: { opacity: c } }, e, s);
            }
            if (((r.oldLayout = l), n.states.select)) {
              var f = (r.oldLayoutSelect = {});
              fd(f, l, bk), fd(f, n.states.select, bk);
            }
            if (n.states.emphasis) {
              var d = (r.oldLayoutEmphasis = {});
              fd(d, l, bk), fd(d, n.states.emphasis, bk);
            }
            Vs(n, s, u, e, e);
          }
          if (i && !i.ignore && !i.invisible) {
            var r = wk(i),
              o = r.oldLayout,
              g = { points: i.shape.points };
            o
              ? (i.attr({ shape: o }), ns(i, { shape: g }, e))
              : (i.setShape(g),
                (i.style.strokePercent = 0),
                is(i, { style: { strokePercent: 1 } }, e)),
              (r.oldLayout = g);
          }
        }),
        t
      );
    })(),
    Mk = Dr();
  mf(dd);
  var Tk = (function (t) {
      function n(e, n, i) {
        var r = t.call(this) || this;
        (r.motionBlur = !1),
          (r.lastFrameAlpha = 0.7),
          (r.dpr = 1),
          (r.virtual = !1),
          (r.config = {}),
          (r.incremental = !1),
          (r.zlevel = 0),
          (r.maxRepaintRectCount = 5),
          (r.__dirty = !0),
          (r.__firstTimePaint = !0),
          (r.__used = !1),
          (r.__drawIndex = 0),
          (r.__startIndex = 0),
          (r.__endIndex = 0),
          (r.__prevStartIndex = null),
          (r.__prevEndIndex = null);
        var o;
        (i = i || Zy),
          'string' == typeof e ? (o = gd(e, n, i)) : I(e) && ((o = e), (e = o.id)),
          (r.id = e),
          (r.dom = o);
        var a = o.style;
        return (
          a &&
            (j(o),
            (o.onselectstart = function () {
              return !1;
            }),
            (a.padding = '0'),
            (a.margin = '0'),
            (a.borderWidth = '0')),
          (r.painter = n),
          (r.dpr = i),
          r
        );
      }
      return (
        e(n, t),
        (n.prototype.getElementCount = function () {
          return this.__endIndex - this.__startIndex;
        }),
        (n.prototype.afterBrush = function () {
          (this.__prevStartIndex = this.__startIndex), (this.__prevEndIndex = this.__endIndex);
        }),
        (n.prototype.initContext = function () {
          (this.ctx = this.dom.getContext('2d')), (this.ctx.dpr = this.dpr);
        }),
        (n.prototype.setUnpainted = function () {
          this.__firstTimePaint = !0;
        }),
        (n.prototype.createBackBuffer = function () {
          var t = this.dpr;
          (this.domBack = gd('back-' + this.id, this.painter, t)),
            (this.ctxBack = this.domBack.getContext('2d')),
            1 !== t && this.ctxBack.scale(t, t);
        }),
        (n.prototype.createRepaintRects = function (t, e, n, i) {
          function r(t) {
            if (t.isFinite() && !t.isZero())
              if (0 === o.length) {
                var e = new fm(0, 0, 0, 0);
                e.copy(t), o.push(e);
              } else {
                for (var n = !1, i = 1 / 0, r = 0, u = 0; u < o.length; ++u) {
                  var h = o[u];
                  if (h.intersect(t)) {
                    var c = new fm(0, 0, 0, 0);
                    c.copy(h), c.union(t), (o[u] = c), (n = !0);
                    break;
                  }
                  if (s) {
                    l.copy(t), l.union(h);
                    var p = t.width * t.height,
                      f = h.width * h.height,
                      d = l.width * l.height,
                      g = d - p - f;
                    i > g && ((i = g), (r = u));
                  }
                }
                if ((s && (o[r].union(t), (n = !0)), !n)) {
                  var e = new fm(0, 0, 0, 0);
                  e.copy(t), o.push(e);
                }
                s || (s = o.length >= a);
              }
          }
          if (this.__firstTimePaint) return (this.__firstTimePaint = !1), null;
          for (
            var o = [],
              a = this.maxRepaintRectCount,
              s = !1,
              l = new fm(0, 0, 0, 0),
              u = this.__startIndex;
            u < this.__endIndex;
            ++u
          ) {
            var h = t[u];
            if (h) {
              var c = h.shouldBePainted(n, i, !0, !0),
                p = h.__isRendered && (h.__dirty & qv || !c) ? h.getPrevPaintRect() : null;
              p && r(p);
              var f = c && (h.__dirty & qv || !h.__isRendered) ? h.getPaintRect() : null;
              f && r(f);
            }
          }
          for (var u = this.__prevStartIndex; u < this.__prevEndIndex; ++u) {
            var h = e[u],
              c = h.shouldBePainted(n, i, !0, !0);
            if (h && (!c || !h.__zr) && h.__isRendered) {
              var p = h.getPrevPaintRect();
              p && r(p);
            }
          }
          var d;
          do {
            d = !1;
            for (var u = 0; u < o.length; )
              if (o[u].isZero()) o.splice(u, 1);
              else {
                for (var g = u + 1; g < o.length; )
                  o[u].intersect(o[g]) ? ((d = !0), o[u].union(o[g]), o.splice(g, 1)) : g++;
                u++;
              }
          } while (d);
          return (this._paintRects = o), o;
        }),
        (n.prototype.debugGetPaintRects = function () {
          return (this._paintRects || []).slice();
        }),
        (n.prototype.resize = function (t, e) {
          var n = this.dpr,
            i = this.dom,
            r = i.style,
            o = this.domBack;
          r && ((r.width = t + 'px'), (r.height = e + 'px')),
            (i.width = t * n),
            (i.height = e * n),
            o && ((o.width = t * n), (o.height = e * n), 1 !== n && this.ctxBack.scale(n, n));
        }),
        (n.prototype.clear = function (t, e, n) {
          function i(t, n, i, r) {
            if ((o.clearRect(t, n, i, r), e && 'transparent' !== e)) {
              var a = void 0;
              O(e)
                ? ((a = e.__canvasGradient || Hh(o, e, { x: 0, y: 0, width: i, height: r })),
                  (e.__canvasGradient = a))
                : R(e) &&
                  (a = Qh(o, e, {
                    dirty: function () {
                      c.setUnpainted(), c.__painter.refresh();
                    },
                  })),
                o.save(),
                (o.fillStyle = a || e),
                o.fillRect(t, n, i, r),
                o.restore();
            }
            l && (o.save(), (o.globalAlpha = u), o.drawImage(p, t, n, i, r), o.restore());
          }
          var r = this.dom,
            o = this.ctx,
            a = r.width,
            s = r.height;
          e = e || this.clearColor;
          var l = this.motionBlur && !t,
            u = this.lastFrameAlpha,
            h = this.dpr,
            c = this;
          l &&
            (this.domBack || this.createBackBuffer(),
            (this.ctxBack.globalCompositeOperation = 'copy'),
            this.ctxBack.drawImage(r, 0, 0, a / h, s / h));
          var p = this.domBack;
          !n || l
            ? i(0, 0, a, s)
            : n.length &&
              v(n, function (t) {
                i(t.x * h, t.y * h, t.width * h, t.height * h);
              });
        }),
        n
      );
    })(Lv),
    Ck = 1e5,
    kk = 314159,
    Dk = 0.01,
    Ik = 0.001,
    Ak = (function () {
      function t(t, e, n) {
        (this.type = 'canvas'),
          (this._zlevelList = []),
          (this._prevDisplayList = []),
          (this._layers = {}),
          (this._layerConfig = {}),
          (this._needsManuallyCompositing = !1),
          (this.type = 'canvas');
        var i = !t.nodeName || 'CANVAS' === t.nodeName.toUpperCase();
        (this._opts = n = h({}, n || {})),
          (this.dpr = n.devicePixelRatio || Zy),
          (this._singleCanvas = i),
          (this.root = t);
        var r = t.style;
        r && (j(t), (t.innerHTML = '')), (this.storage = e);
        var o = this._zlevelList;
        this._prevDisplayList = [];
        var a = this._layers;
        if (i) {
          var s = t,
            l = s.width,
            u = s.height;
          null != n.width && (l = n.width),
            null != n.height && (u = n.height),
            (this.dpr = n.devicePixelRatio || 1),
            (s.width = l * this.dpr),
            (s.height = u * this.dpr),
            (this._width = l),
            (this._height = u);
          var c = new Tk(s, this, this.dpr);
          (c.__builtin__ = !0),
            c.initContext(),
            (a[kk] = c),
            (c.zlevel = kk),
            o.push(kk),
            (this._domRoot = t);
        } else {
          (this._width = Zh(t, 0, n)), (this._height = Zh(t, 1, n));
          var p = (this._domRoot = yd(this._width, this._height));
          t.appendChild(p);
        }
      }
      return (
        (t.prototype.getType = function () {
          return 'canvas';
        }),
        (t.prototype.isSingleCanvas = function () {
          return this._singleCanvas;
        }),
        (t.prototype.getViewportRoot = function () {
          return this._domRoot;
        }),
        (t.prototype.getViewportRootOffset = function () {
          var t = this.getViewportRoot();
          return t ? { offsetLeft: t.offsetLeft || 0, offsetTop: t.offsetTop || 0 } : void 0;
        }),
        (t.prototype.refresh = function (t) {
          var e = this.storage.getDisplayList(!0),
            n = this._prevDisplayList,
            i = this._zlevelList;
          (this._redrawId = Math.random()), this._paintList(e, n, t, this._redrawId);
          for (var r = 0; r < i.length; r++) {
            var o = i[r],
              a = this._layers[o];
            if (!a.__builtin__ && a.refresh) {
              var s = 0 === r ? this._backgroundColor : null;
              a.refresh(s);
            }
          }
          return this._opts.useDirtyRect && (this._prevDisplayList = e.slice()), this;
        }),
        (t.prototype.refreshHover = function () {
          this._paintHoverList(this.storage.getDisplayList(!1));
        }),
        (t.prototype._paintHoverList = function (t) {
          var e = t.length,
            n = this._hoverlayer;
          if ((n && n.clear(), e)) {
            for (
              var i, r = { inHover: !0, viewWidth: this._width, viewHeight: this._height }, o = 0;
              e > o;
              o++
            ) {
              var a = t[o];
              a.__inHover &&
                (n || (n = this._hoverlayer = this.getLayer(Ck)),
                i || ((i = n.ctx), i.save()),
                pc(i, a, r, o === e - 1));
            }
            i && i.restore();
          }
        }),
        (t.prototype.getHoverLayer = function () {
          return this.getLayer(Ck);
        }),
        (t.prototype.paintOne = function (t, e) {
          cc(t, e);
        }),
        (t.prototype._paintList = function (t, e, n, i) {
          if (this._redrawId === i) {
            (n = n || !1), this._updateLayerStatus(t);
            var r = this._doPaintList(t, e, n),
              o = r.finished,
              a = r.needsRefreshHover;
            if (
              (this._needsManuallyCompositing && this._compositeManually(),
              a && this._paintHoverList(t),
              o)
            )
              this.eachLayer(function (t) {
                t.afterBrush && t.afterBrush();
              });
            else {
              var s = this;
              Jv(function () {
                s._paintList(t, e, n, i);
              });
            }
          }
        }),
        (t.prototype._compositeManually = function () {
          var t = this.getLayer(kk).ctx,
            e = this._domRoot.width,
            n = this._domRoot.height;
          t.clearRect(0, 0, e, n),
            this.eachBuiltinLayer(function (i) {
              i.virtual && t.drawImage(i.dom, 0, 0, e, n);
            });
        }),
        (t.prototype._doPaintList = function (t, e, n) {
          for (
            var i = this, r = [], o = this._opts.useDirtyRect, a = 0;
            a < this._zlevelList.length;
            a++
          ) {
            var s = this._zlevelList[a],
              l = this._layers[s];
            l.__builtin__ && l !== this._hoverlayer && (l.__dirty || n) && r.push(l);
          }
          for (
            var u = !0,
              h = !1,
              c = function (a) {
                var s = r[a],
                  l = s.ctx,
                  c = o && s.createRepaintRects(t, e, p._width, p._height),
                  f = n ? s.__startIndex : s.__drawIndex,
                  d = !n && s.incremental && Date.now,
                  g = d && Date.now(),
                  v = s.zlevel === p._zlevelList[0] ? p._backgroundColor : null;
                if (s.__startIndex === s.__endIndex) s.clear(!1, v, c);
                else if (f === s.__startIndex) {
                  var y = t[f];
                  (y.incremental && y.notClear && !n) || s.clear(!1, v, c);
                }
                -1 === f &&
                  (console.error('For some unknown reason. drawIndex is -1'), (f = s.__startIndex));
                var m,
                  _ = function (e) {
                    var n = {
                      inHover: !1,
                      allClipped: !1,
                      prevEl: null,
                      viewWidth: i._width,
                      viewHeight: i._height,
                    };
                    for (m = f; m < s.__endIndex; m++) {
                      var r = t[m];
                      if (
                        (r.__inHover && (h = !0),
                        i._doPaintEl(r, s, o, e, n, m === s.__endIndex - 1),
                        d)
                      ) {
                        var a = Date.now() - g;
                        if (a > 15) break;
                      }
                    }
                    n.prevElClipPaths && l.restore();
                  };
                if (c)
                  if (0 === c.length) m = s.__endIndex;
                  else
                    for (var x = p.dpr, w = 0; w < c.length; ++w) {
                      var b = c[w];
                      l.save(),
                        l.beginPath(),
                        l.rect(b.x * x, b.y * x, b.width * x, b.height * x),
                        l.clip(),
                        _(b),
                        l.restore();
                    }
                else l.save(), _(), l.restore();
                (s.__drawIndex = m), s.__drawIndex < s.__endIndex && (u = !1);
              },
              p = this,
              f = 0;
            f < r.length;
            f++
          )
            c(f);
          return (
            $g.wxa &&
              v(this._layers, function (t) {
                t && t.ctx && t.ctx.draw && t.ctx.draw();
              }),
            { finished: u, needsRefreshHover: h }
          );
        }),
        (t.prototype._doPaintEl = function (t, e, n, i, r, o) {
          var a = e.ctx;
          if (n) {
            var s = t.getPaintRect();
            (!i || (s && s.intersect(i))) && (pc(a, t, r, o), t.setPrevPaintRect(s));
          } else pc(a, t, r, o);
        }),
        (t.prototype.getLayer = function (t, e) {
          this._singleCanvas && !this._needsManuallyCompositing && (t = kk);
          var n = this._layers[t];
          return (
            n ||
              ((n = new Tk('zr_' + t, this, this.dpr)),
              (n.zlevel = t),
              (n.__builtin__ = !0),
              this._layerConfig[t]
                ? l(n, this._layerConfig[t], !0)
                : this._layerConfig[t - Dk] && l(n, this._layerConfig[t - Dk], !0),
              e && (n.virtual = e),
              this.insertLayer(t, n),
              n.initContext()),
            n
          );
        }),
        (t.prototype.insertLayer = function (t, e) {
          var n = this._layers,
            i = this._zlevelList,
            r = i.length,
            o = this._domRoot,
            a = null,
            s = -1;
          if (!n[t] && vd(e)) {
            if (r > 0 && t > i[0]) {
              for (s = 0; r - 1 > s && !(i[s] < t && i[s + 1] > t); s++);
              a = n[i[s]];
            }
            if ((i.splice(s + 1, 0, t), (n[t] = e), !e.virtual))
              if (a) {
                var l = a.dom;
                l.nextSibling ? o.insertBefore(e.dom, l.nextSibling) : o.appendChild(e.dom);
              } else o.firstChild ? o.insertBefore(e.dom, o.firstChild) : o.appendChild(e.dom);
            e.__painter = this;
          }
        }),
        (t.prototype.eachLayer = function (t, e) {
          for (var n = this._zlevelList, i = 0; i < n.length; i++) {
            var r = n[i];
            t.call(e, this._layers[r], r);
          }
        }),
        (t.prototype.eachBuiltinLayer = function (t, e) {
          for (var n = this._zlevelList, i = 0; i < n.length; i++) {
            var r = n[i],
              o = this._layers[r];
            o.__builtin__ && t.call(e, o, r);
          }
        }),
        (t.prototype.eachOtherLayer = function (t, e) {
          for (var n = this._zlevelList, i = 0; i < n.length; i++) {
            var r = n[i],
              o = this._layers[r];
            o.__builtin__ || t.call(e, o, r);
          }
        }),
        (t.prototype.getLayers = function () {
          return this._layers;
        }),
        (t.prototype._updateLayerStatus = function (t) {
          function e(t) {
            s && (s.__endIndex !== t && (s.__dirty = !0), (s.__endIndex = t));
          }
          if (
            (this.eachBuiltinLayer(function (t) {
              t.__dirty = t.__used = !1;
            }),
            this._singleCanvas)
          )
            for (var n = 1; n < t.length; n++) {
              var i = t[n];
              if (i.zlevel !== t[n - 1].zlevel || i.incremental) {
                this._needsManuallyCompositing = !0;
                break;
              }
            }
          var r,
            o,
            s = null,
            l = 0;
          for (o = 0; o < t.length; o++) {
            var i = t[o],
              u = i.zlevel,
              h = void 0;
            r !== u && ((r = u), (l = 0)),
              i.incremental
                ? ((h = this.getLayer(u + Ik, this._needsManuallyCompositing)),
                  (h.incremental = !0),
                  (l = 1))
                : (h = this.getLayer(u + (l > 0 ? Dk : 0), this._needsManuallyCompositing)),
              h.__builtin__ || a('ZLevel ' + u + ' has been used by unkown layer ' + h.id),
              h !== s &&
                ((h.__used = !0),
                h.__startIndex !== o && (h.__dirty = !0),
                (h.__startIndex = o),
                (h.__drawIndex = h.incremental ? -1 : o),
                e(o),
                (s = h)),
              i.__dirty & qv &&
                !i.__inHover &&
                ((h.__dirty = !0), h.incremental && h.__drawIndex < 0 && (h.__drawIndex = o));
          }
          e(o),
            this.eachBuiltinLayer(function (t) {
              !t.__used &&
                t.getElementCount() > 0 &&
                ((t.__dirty = !0), (t.__startIndex = t.__endIndex = t.__drawIndex = 0)),
                t.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex);
            });
        }),
        (t.prototype.clear = function () {
          return this.eachBuiltinLayer(this._clearLayer), this;
        }),
        (t.prototype._clearLayer = function (t) {
          t.clear();
        }),
        (t.prototype.setBackgroundColor = function (t) {
          (this._backgroundColor = t),
            v(this._layers, function (t) {
              t.setUnpainted();
            });
        }),
        (t.prototype.configLayer = function (t, e) {
          if (e) {
            var n = this._layerConfig;
            n[t] ? l(n[t], e, !0) : (n[t] = e);
            for (var i = 0; i < this._zlevelList.length; i++) {
              var r = this._zlevelList[i];
              if (r === t || r === t + Dk) {
                var o = this._layers[r];
                l(o, n[t], !0);
              }
            }
          }
        }),
        (t.prototype.delLayer = function (t) {
          var e = this._layers,
            n = this._zlevelList,
            i = e[t];
          i && (i.dom.parentNode.removeChild(i.dom), delete e[t], n.splice(p(n, t), 1));
        }),
        (t.prototype.resize = function (t, e) {
          if (this._domRoot.style) {
            var n = this._domRoot;
            n.style.display = 'none';
            var i = this._opts,
              r = this.root;
            if (
              (null != t && (i.width = t),
              null != e && (i.height = e),
              (t = Zh(r, 0, i)),
              (e = Zh(r, 1, i)),
              (n.style.display = ''),
              this._width !== t || e !== this._height)
            ) {
              (n.style.width = t + 'px'), (n.style.height = e + 'px');
              for (var o in this._layers)
                this._layers.hasOwnProperty(o) && this._layers[o].resize(t, e);
              this.refresh(!0);
            }
            (this._width = t), (this._height = e);
          } else {
            if (null == t || null == e) return;
            (this._width = t), (this._height = e), this.getLayer(kk).resize(t, e);
          }
          return this;
        }),
        (t.prototype.clearLayer = function (t) {
          var e = this._layers[t];
          e && e.clear();
        }),
        (t.prototype.dispose = function () {
          (this.root.innerHTML = ''),
            (this.root = this.storage = this._domRoot = this._layers = null);
        }),
        (t.prototype.getRenderedCanvas = function (t) {
          if (((t = t || {}), this._singleCanvas && !this._compositeManually))
            return this._layers[kk].dom;
          var e = new Tk('image', this, t.pixelRatio || this.dpr);
          e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor);
          var n = e.ctx;
          if (t.pixelRatio <= this.dpr) {
            this.refresh();
            var i = e.dom.width,
              r = e.dom.height;
            this.eachLayer(function (t) {
              t.__builtin__
                ? n.drawImage(t.dom, 0, 0, i, r)
                : t.renderToCanvas && (n.save(), t.renderToCanvas(n), n.restore());
            });
          } else
            for (
              var o = { inHover: !1, viewWidth: this._width, viewHeight: this._height },
                a = this.storage.getDisplayList(!0),
                s = 0,
                l = a.length;
              l > s;
              s++
            ) {
              var u = a[s];
              pc(n, u, o, s === l - 1);
            }
          return e.dom;
        }),
        (t.prototype.getWidth = function () {
          return this._width;
        }),
        (t.prototype.getHeight = function () {
          return this._height;
        }),
        t
      );
    })(),
    Lk = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = 'dataset'), e;
      }
      return (
        e(n, t),
        (n.prototype.init = function (e, n, i) {
          t.prototype.init.call(this, e, n, i), (this._sourceManager = new AS(this)), qu(this);
        }),
        (n.prototype.mergeOption = function (e, n) {
          t.prototype.mergeOption.call(this, e, n), qu(this);
        }),
        (n.prototype.optionUpdated = function () {
          this._sourceManager.dirty();
        }),
        (n.prototype.getSourceManager = function () {
          return this._sourceManager;
        }),
        (n.type = 'dataset'),
        (n.defaultOption = { seriesLayoutBy: Rb }),
        n
      );
    })(wb),
    Pk = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = 'dataset'), e;
      }
      return e(n, t), (n.type = 'dataset'), n;
    })(RS);
  mf([md, _d]), mf(dd);
  var Ok = {
      average: function (t) {
        for (var e = 0, n = 0, i = 0; i < t.length; i++) isNaN(t[i]) || ((e += t[i]), n++);
        return 0 === n ? 0 / 0 : e / n;
      },
      sum: function (t) {
        for (var e = 0, n = 0; n < t.length; n++) e += t[n] || 0;
        return e;
      },
      max: function (t) {
        for (var e = -1 / 0, n = 0; n < t.length; n++) t[n] > e && (e = t[n]);
        return isFinite(e) ? e : 0 / 0;
      },
      min: function (t) {
        for (var e = 1 / 0, n = 0; n < t.length; n++) t[n] < e && (e = t[n]);
        return isFinite(e) ? e : 0 / 0;
      },
      nearest: function (t) {
        return t[0];
      },
    },
    Rk = function (t) {
      return Math.round(t.length / 2);
    },
    Ek = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = n.type), e;
      }
      return (
        e(n, t),
        (n.prototype.getInitialData = function () {
          return yp(null, this, { useEncodeDefaulter: !0 });
        }),
        (n.prototype.getMarkerPosition = function (t) {
          var e = this.coordinateSystem;
          if (e && e.clampData) {
            var n = e.dataToPoint(e.clampData(t)),
              i = this.getData(),
              r = i.getLayout('offset'),
              o = i.getLayout('size'),
              a = e.getBaseAxis().isHorizontal() ? 0 : 1;
            return (n[a] += r + o / 2), n;
          }
          return [0 / 0, 0 / 0];
        }),
        (n.type = 'series.__base_bar__'),
        (n.defaultOption = {
          z: 2,
          coordinateSystem: 'cartesian2d',
          legendHoverLink: !0,
          barMinHeight: 0,
          barMinAngle: 0,
          large: !1,
          largeThreshold: 400,
          progressive: 3e3,
          progressiveChunkMode: 'mod',
        }),
        n
      );
    })(OS);
  OS.registerClass(Ek);
  var Bk = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = n.type), e;
      }
      return (
        e(n, t),
        (n.prototype.getInitialData = function () {
          return yp(null, this, {
            useEncodeDefaulter: !0,
            createInvertedIndices: !!this.get('realtimeSort', !0) || null,
          });
        }),
        (n.prototype.getProgressive = function () {
          return this.get('large') ? this.get('progressive') : !1;
        }),
        (n.prototype.getProgressiveThreshold = function () {
          var t = this.get('progressiveThreshold'),
            e = this.get('largeThreshold');
          return e > t && (t = e), t;
        }),
        (n.prototype.brushSelector = function (t, e, n) {
          return n.rect(e.getItemLayout(t));
        }),
        (n.type = 'series.bar'),
        (n.dependencies = ['grid', 'polar']),
        (n.defaultOption = Zs(Ek.defaultOption, {
          clip: !0,
          roundCap: !1,
          showBackground: !1,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
            borderColor: null,
            borderWidth: 0,
            borderType: 'solid',
            borderRadius: 0,
            shadowBlur: 0,
            shadowColor: null,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1,
          },
          select: { itemStyle: { borderColor: '#212121' } },
          realtimeSort: !1,
        })),
        n
      );
    })(Ek),
    zk = (function () {
      function t() {
        (this.cx = 0),
          (this.cy = 0),
          (this.r0 = 0),
          (this.r = 0),
          (this.startAngle = 0),
          (this.endAngle = 2 * Math.PI),
          (this.clockwise = !0);
      }
      return t;
    })(),
    Nk = (function (t) {
      function n(e) {
        var n = t.call(this, e) || this;
        return (n.type = 'sausage'), n;
      }
      return (
        e(n, t),
        (n.prototype.getDefaultShape = function () {
          return new zk();
        }),
        (n.prototype.buildPath = function (t, e) {
          var n = e.cx,
            i = e.cy,
            r = Math.max(e.r0 || 0, 0),
            o = Math.max(e.r, 0),
            a = 0.5 * (o - r),
            s = r + a,
            l = e.startAngle,
            u = e.endAngle,
            h = e.clockwise,
            c = 2 * Math.PI,
            p = h ? c > u - l : c > l - u;
          p || (l = u - (h ? c : -c));
          var f = Math.cos(l),
            d = Math.sin(l),
            g = Math.cos(u),
            v = Math.sin(u);
          p
            ? (t.moveTo(f * r + n, d * r + i), t.arc(f * s + n, d * s + i, a, -Math.PI + l, l, !h))
            : t.moveTo(f * o + n, d * o + i),
            t.arc(n, i, o, l, u, !h),
            t.arc(g * s + n, v * s + i, a, u - 2 * Math.PI, u - Math.PI, !h),
            0 !== r && t.arc(n, i, r, u, l, h);
        }),
        n
      );
    })(H_),
    Fk = Math.max,
    Vk = Math.min,
    Hk = (function (t) {
      function n() {
        var e = t.call(this) || this;
        return (e.type = n.type), (e._isFirstFrame = !0), e;
      }
      return (
        e(n, t),
        (n.prototype.render = function (t, e, n, i) {
          (this._model = t), this._removeOnRenderedListener(n), this._updateDrawMode(t);
          var r = t.get('coordinateSystem');
          ('cartesian2d' === r || 'polar' === r) &&
            ((this._progressiveEls = null),
            this._isLargeDraw ? this._renderLarge(t, e, n) : this._renderNormal(t, e, n, i));
        }),
        (n.prototype.incrementalPrepareRender = function (t) {
          this._clear(), this._updateDrawMode(t), this._updateLargeClip(t);
        }),
        (n.prototype.incrementalRender = function (t, e) {
          (this._progressiveEls = []), this._incrementalRenderLarge(t, e);
        }),
        (n.prototype.eachRendered = function (t) {
          Ds(this._progressiveEls || this.group, t);
        }),
        (n.prototype._updateDrawMode = function (t) {
          var e = t.pipelineContext.large;
          (null == this._isLargeDraw || e !== this._isLargeDraw) &&
            ((this._isLargeDraw = e), this._clear());
        }),
        (n.prototype._renderNormal = function (t, e, n, i) {
          function r(t) {
            var e = Yk[u.type](s, t),
              n = Wd(u, o, e);
            return (
              n.useStyle(y.getItemStyle()),
              'cartesian2d' === u.type && n.setShape('r', m),
              (_[t] = n),
              n
            );
          }
          var o,
            a = this.group,
            s = t.getData(),
            l = this._data,
            u = t.coordinateSystem,
            h = u.getBaseAxis();
          'cartesian2d' === u.type
            ? (o = h.isHorizontal())
            : 'polar' === u.type && (o = 'angle' === h.dim);
          var c = t.isAnimationEnabled() ? t : null,
            p = Pd(t, u);
          p && this._enableRealtimeSort(p, s, n);
          var f = t.get('clip', !0) || p,
            d = Ld(u, s);
          a.removeClipPath();
          var g = t.get('roundCap', !0),
            v = t.get('showBackground', !0),
            y = t.getModel('backgroundStyle'),
            m = y.get('borderRadius') || 0,
            _ = [],
            x = this._backgroundEls,
            w = i && i.isInitSort,
            b = i && 'changeAxisOrder' === i.type;
          s.diff(l)
            .add(function (e) {
              var n = s.getItemModel(e),
                i = Yk[u.type](s, e, n);
              if ((v && r(e), s.hasValue(e) && Xk[u.type](i))) {
                var l = !1;
                f && (l = Wk[u.type](d, i));
                var y = Gk[u.type](t, s, e, i, o, c, h.model, !1, g);
                p && (y.forceLabelAnimation = !0),
                  zd(y, s, e, n, i, t, o, 'polar' === u.type),
                  w
                    ? y.attr({ shape: i })
                    : p
                    ? Od(p, c, y, i, e, o, !1, !1)
                    : is(y, { shape: i }, t, e),
                  s.setItemGraphicEl(e, y),
                  a.add(y),
                  (y.ignore = l);
              }
            })
            .update(function (e, n) {
              var i = s.getItemModel(e),
                S = Yk[u.type](s, e, i);
              if (v) {
                var M = void 0;
                0 === x.length
                  ? (M = r(n))
                  : ((M = x[n]),
                    M.useStyle(y.getItemStyle()),
                    'cartesian2d' === u.type && M.setShape('r', m),
                    (_[e] = M));
                var T = Yk[u.type](s, e),
                  C = Hd(o, T, u);
                ns(M, { shape: C }, c, e);
              }
              var k = l.getItemGraphicEl(n);
              if (!s.hasValue(e) || !Xk[u.type](S)) return void a.remove(k);
              var D = !1;
              if (
                (f && ((D = Wk[u.type](d, S)), D && a.remove(k)),
                k ? ls(k) : (k = Gk[u.type](t, s, e, S, o, c, h.model, !!k, g)),
                p && (k.forceLabelAnimation = !0),
                b)
              ) {
                var I = k.getTextContent();
                if (I) {
                  var A = Ew(I);
                  null != A.prevValue && (A.prevValue = A.value);
                }
              } else zd(k, s, e, i, S, t, o, 'polar' === u.type);
              w
                ? k.attr({ shape: S })
                : p
                ? Od(p, c, k, S, e, o, !0, b)
                : ns(k, { shape: S }, t, e, null),
                s.setItemGraphicEl(e, k),
                (k.ignore = D),
                a.add(k);
            })
            .remove(function (e) {
              var n = l.getItemGraphicEl(e);
              n && ss(n, t, e);
            })
            .execute();
          var S = this._backgroundGroup || (this._backgroundGroup = new wm());
          S.removeAll();
          for (var M = 0; M < _.length; ++M) S.add(_[M]);
          a.add(S), (this._backgroundEls = _), (this._data = s);
        }),
        (n.prototype._renderLarge = function (t) {
          this._clear(), Fd(t, this.group), this._updateLargeClip(t);
        }),
        (n.prototype._incrementalRenderLarge = function (t, e) {
          this._removeBackground(), Fd(e, this.group, this._progressiveEls, !0);
        }),
        (n.prototype._updateLargeClip = function (t) {
          var e = t.get('clip', !0) && Sd(t.coordinateSystem, !1, t),
            n = this.group;
          e ? n.setClipPath(e) : n.removeClipPath();
        }),
        (n.prototype._enableRealtimeSort = function (t, e, n) {
          var i = this;
          if (e.count()) {
            var r = t.baseAxis;
            if (this._isFirstFrame) this._dispatchInitSort(e, t, n), (this._isFirstFrame = !1);
            else {
              var o = function (t) {
                var n = e.getItemGraphicEl(t),
                  i = n && n.shape;
                return (i && Math.abs(r.isHorizontal() ? i.height : i.width)) || 0;
              };
              (this._onRendered = function () {
                i._updateSortWithinSameData(e, o, r, n);
              }),
                n.getZr().on('rendered', this._onRendered);
            }
          }
        }),
        (n.prototype._dataSort = function (t, e, n) {
          var i = [];
          return (
            t.each(t.mapDimension(e.dim), function (t, e) {
              var r = n(e);
              (r = null == r ? 0 / 0 : r),
                i.push({ dataIndex: e, mappedValue: r, ordinalNumber: t });
            }),
            i.sort(function (t, e) {
              return e.mappedValue - t.mappedValue;
            }),
            {
              ordinalNumbers: y(i, function (t) {
                return t.ordinalNumber;
              }),
            }
          );
        }),
        (n.prototype._isOrderChangedWithinSameData = function (t, e, n) {
          for (
            var i = n.scale,
              r = t.mapDimension(n.dim),
              o = Number.MAX_VALUE,
              a = 0,
              s = i.getOrdinalMeta().categories.length;
            s > a;
            ++a
          ) {
            var l = t.rawIndexOf(r, i.getRawOrdinalNumber(a)),
              u = 0 > l ? Number.MIN_VALUE : e(t.indexOfRawIndex(l));
            if (u > o) return !0;
            o = u;
          }
          return !1;
        }),
        (n.prototype._isOrderDifferentInView = function (t, e) {
          for (
            var n = e.scale,
              i = n.getExtent(),
              r = Math.max(0, i[0]),
              o = Math.min(i[1], n.getOrdinalMeta().categories.length - 1);
            o >= r;
            ++r
          )
            if (t.ordinalNumbers[r] !== n.getRawOrdinalNumber(r)) return !0;
        }),
        (n.prototype._updateSortWithinSameData = function (t, e, n, i) {
          if (this._isOrderChangedWithinSameData(t, e, n)) {
            var r = this._dataSort(t, n, e);
            this._isOrderDifferentInView(r, n) &&
              (this._removeOnRenderedListener(i),
              i.dispatchAction({
                type: 'changeAxisOrder',
                componentType: n.dim + 'Axis',
                axisId: n.index,
                sortInfo: r,
              }));
          }
        }),
        (n.prototype._dispatchInitSort = function (t, e, n) {
          var i = e.baseAxis,
            r = this._dataSort(t, i, function (n) {
              return t.get(t.mapDimension(e.otherAxis.dim), n);
            });
          n.dispatchAction({
            type: 'changeAxisOrder',
            componentType: i.dim + 'Axis',
            isInitSort: !0,
            axisId: i.index,
            sortInfo: r,
          });
        }),
        (n.prototype.remove = function (t, e) {
          this._clear(this._model), this._removeOnRenderedListener(e);
        }),
        (n.prototype.dispose = function (t, e) {
          this._removeOnRenderedListener(e);
        }),
        (n.prototype._removeOnRenderedListener = function (t) {
          this._onRendered &&
            (t.getZr().off('rendered', this._onRendered), (this._onRendered = null));
        }),
        (n.prototype._clear = function (t) {
          var e = this.group,
            n = this._data;
          t && t.isAnimationEnabled() && n && !this._isLargeDraw
            ? (this._removeBackground(),
              (this._backgroundEls = []),
              n.eachItemGraphicEl(function (e) {
                ss(e, t, rx(e).dataIndex);
              }))
            : e.removeAll(),
            (this._data = null),
            (this._isFirstFrame = !0);
        }),
        (n.prototype._removeBackground = function () {
          this.group.remove(this._backgroundGroup), (this._backgroundGroup = null);
        }),
        (n.type = 'bar'),
        n
      );
    })(zS),
    Wk = {
      cartesian2d: function (t, e) {
        var n = e.width < 0 ? -1 : 1,
          i = e.height < 0 ? -1 : 1;
        0 > n && ((e.x += e.width), (e.width = -e.width)),
          0 > i && ((e.y += e.height), (e.height = -e.height));
        var r = t.x + t.width,
          o = t.y + t.height,
          a = Fk(e.x, t.x),
          s = Vk(e.x + e.width, r),
          l = Fk(e.y, t.y),
          u = Vk(e.y + e.height, o),
          h = a > s,
          c = l > u;
        return (
          (e.x = h && a > r ? s : a),
          (e.y = c && l > o ? u : l),
          (e.width = h ? 0 : s - a),
          (e.height = c ? 0 : u - l),
          0 > n && ((e.x += e.width), (e.width = -e.width)),
          0 > i && ((e.y += e.height), (e.height = -e.height)),
          h || c
        );
      },
      polar: function (t, e) {
        var n = e.r0 <= e.r ? 1 : -1;
        if (0 > n) {
          var i = e.r;
          (e.r = e.r0), (e.r0 = i);
        }
        var r = Vk(e.r, t.r),
          o = Fk(e.r0, t.r0);
        (e.r = r), (e.r0 = o);
        var a = 0 > r - o;
        if (0 > n) {
          var i = e.r;
          (e.r = e.r0), (e.r0 = i);
        }
        return a;
      },
    },
    Gk = {
      cartesian2d: function (t, e, n, i, r, o) {
        var a = new K_({ shape: h({}, i), z2: 1 });
        if (((a.__dataIndex = n), (a.name = 'item'), o)) {
          var s = a.shape,
            l = r ? 'height' : 'width';
          s[l] = 0;
        }
        return a;
      },
      polar: function (t, e, n, i, r, o, a, s, l) {
        var u = !r && l ? Nk : Jx,
          h = new u({ shape: i, z2: 1 });
        h.name = 'item';
        var c = Bd(r);
        if (((h.calculateTextPosition = kd(c, { isRoundCap: u === Nk })), o)) {
          var p = h.shape,
            f = r ? 'r' : 'endAngle',
            d = {};
          (p[f] = r ? 0 : i.startAngle), (d[f] = i[f]), (s ? ns : is)(h, { shape: d }, o);
        }
        return h;
      },
    },
    Zk = ['x', 'y', 'width', 'height'],
    Uk = ['cx', 'cy', 'r', 'startAngle', 'endAngle'],
    Xk = {
      cartesian2d: function (t) {
        return !Rd(t, Zk);
      },
      polar: function (t) {
        return !Rd(t, Uk);
      },
    },
    Yk = {
      cartesian2d: function (t, e, n) {
        var i = t.getItemLayout(e),
          r = n ? Nd(n, i) : 0,
          o = i.width > 0 ? 1 : -1,
          a = i.height > 0 ? 1 : -1;
        return {
          x: i.x + (o * r) / 2,
          y: i.y + (a * r) / 2,
          width: i.width - o * r,
          height: i.height - a * r,
        };
      },
      polar: function (t, e) {
        var n = t.getItemLayout(e);
        return {
          cx: n.cx,
          cy: n.cy,
          r0: n.r0,
          r: n.r,
          startAngle: n.startAngle,
          endAngle: n.endAngle,
          clockwise: n.clockwise,
        };
      },
    },
    qk = (function () {
      function t() {}
      return t;
    })(),
    jk = (function (t) {
      function n(e) {
        var n = t.call(this, e) || this;
        return (n.type = 'largeBar'), n;
      }
      return (
        e(n, t),
        (n.prototype.getDefaultShape = function () {
          return new qk();
        }),
        (n.prototype.buildPath = function (t, e) {
          for (
            var n = e.points,
              i = this.baseDimIdx,
              r = 1 - this.baseDimIdx,
              o = [],
              a = [],
              s = this.barWidth,
              l = 0;
            l < n.length;
            l += 3
          )
            (a[i] = s),
              (a[r] = n[l + 2]),
              (o[i] = n[l + i]),
              (o[r] = n[l + r]),
              t.rect(o[0], o[1], a[0], a[1]);
        }),
        n
      );
    })(H_),
    Kk = gh(
      function (t) {
        var e = this,
          n = Vd(e, t.offsetX, t.offsetY);
        rx(e).dataIndex = n >= 0 ? n : null;
      },
      30,
      !1
    );
  mf(Gd);
  var $k = (function (t) {
      function n() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        e(n, t),
        (n.type = 'grid'),
        (n.dependencies = ['xAxis', 'yAxis']),
        (n.layoutMode = 'box'),
        (n.defaultOption = {
          show: !1,
          z: 0,
          left: '10%',
          top: 60,
          right: '10%',
          bottom: 70,
          containLabel: !1,
          backgroundColor: 'rgba(0,0,0,0)',
          borderWidth: 1,
          borderColor: '#ccc',
        }),
        n
      );
    })(wb),
    Qk = (function (t) {
      function n() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        e(n, t),
        (n.prototype.getCoordSysModel = function () {
          return this.getReferringComponents('grid', Em).models[0];
        }),
        (n.type = 'cartesian2dAxis'),
        n
      );
    })(wb);
  d(Qk, WC);
  var Jk = {
      show: !0,
      z: 0,
      inverse: !1,
      name: '',
      nameLocation: 'end',
      nameRotate: null,
      nameTruncate: { maxWidth: null, ellipsis: '...', placeholder: '.' },
      nameTextStyle: {},
      nameGap: 15,
      silent: !1,
      triggerEvent: !1,
      tooltip: { show: !1 },
      axisPointer: {},
      axisLine: {
        show: !0,
        onZero: !0,
        onZeroAxisIndex: null,
        lineStyle: { color: '#6E7079', width: 1, type: 'solid' },
        symbol: ['none', 'none'],
        symbolSize: [10, 15],
      },
      axisTick: { show: !0, inside: !1, length: 5, lineStyle: { width: 1 } },
      axisLabel: {
        show: !0,
        inside: !1,
        rotate: 0,
        showMinLabel: null,
        showMaxLabel: null,
        margin: 8,
        fontSize: 12,
      },
      splitLine: { show: !0, lineStyle: { color: ['#E0E6F1'], width: 1, type: 'solid' } },
      splitArea: {
        show: !1,
        areaStyle: { color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'] },
      },
    },
    tD = l(
      {
        boundaryGap: !0,
        deduplication: null,
        splitLine: { show: !1 },
        axisTick: { alignWithLabel: !1, interval: 'auto' },
        axisLabel: { interval: 'auto' },
      },
      Jk
    ),
    eD = l(
      {
        boundaryGap: [0, 0],
        axisLine: { show: 'auto' },
        axisTick: { show: 'auto' },
        splitNumber: 5,
        minorTick: { show: !1, splitNumber: 5, length: 3, lineStyle: {} },
        minorSplitLine: { show: !1, lineStyle: { color: '#F4F7FD', width: 1 } },
      },
      Jk
    ),
    nD = l(
      {
        splitNumber: 6,
        axisLabel: {
          showMinLabel: !1,
          showMaxLabel: !1,
          rich: { primary: { fontWeight: 'bold' } },
        },
        splitLine: { show: !1 },
      },
      eD
    ),
    iD = c({ logBase: 10 }, eD),
    rD = { category: tD, value: eD, time: nD, log: iD },
    oD = { value: 1, category: 1, time: 1, log: 1 },
    aD = (function () {
      function t(t) {
        (this.type = 'cartesian'), (this._dimList = []), (this._axes = {}), (this.name = t || '');
      }
      return (
        (t.prototype.getAxis = function (t) {
          return this._axes[t];
        }),
        (t.prototype.getAxes = function () {
          return y(
            this._dimList,
            function (t) {
              return this._axes[t];
            },
            this
          );
        }),
        (t.prototype.getAxesByScale = function (t) {
          return (
            (t = t.toLowerCase()),
            _(this.getAxes(), function (e) {
              return e.scale.type === t;
            })
          );
        }),
        (t.prototype.addAxis = function (t) {
          var e = t.dim;
          (this._axes[e] = t), this._dimList.push(e);
        }),
        t
      );
    })(),
    sD = ['x', 'y'],
    lD = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = 'cartesian2d'), (e.dimensions = sD), e;
      }
      return (
        e(n, t),
        (n.prototype.calcAffineTransform = function () {
          this._transform = this._invTransform = null;
          var t = this.getAxis('x').scale,
            e = this.getAxis('y').scale;
          if (Xd(t) && Xd(e)) {
            var n = t.getExtent(),
              i = e.getExtent(),
              r = this.dataToPoint([n[0], i[0]]),
              o = this.dataToPoint([n[1], i[1]]),
              a = n[1] - n[0],
              s = i[1] - i[0];
            if (a && s) {
              var l = (o[0] - r[0]) / a,
                u = (o[1] - r[1]) / s,
                h = r[0] - n[0] * l,
                c = r[1] - i[0] * u,
                p = (this._transform = [l, 0, 0, u, h, c]);
              this._invTransform = pi([], p);
            }
          }
        }),
        (n.prototype.getBaseAxis = function () {
          return (
            this.getAxesByScale('ordinal')[0] || this.getAxesByScale('time')[0] || this.getAxis('x')
          );
        }),
        (n.prototype.containPoint = function (t) {
          var e = this.getAxis('x'),
            n = this.getAxis('y');
          return e.contain(e.toLocalCoord(t[0])) && n.contain(n.toLocalCoord(t[1]));
        }),
        (n.prototype.containData = function (t) {
          return this.getAxis('x').containData(t[0]) && this.getAxis('y').containData(t[1]);
        }),
        (n.prototype.dataToPoint = function (t, e, n) {
          n = n || [];
          var i = t[0],
            r = t[1];
          if (this._transform && null != i && isFinite(i) && null != r && isFinite(r))
            return ve(n, t, this._transform);
          var o = this.getAxis('x'),
            a = this.getAxis('y');
          return (
            (n[0] = o.toGlobalCoord(o.dataToCoord(i, e))),
            (n[1] = a.toGlobalCoord(a.dataToCoord(r, e))),
            n
          );
        }),
        (n.prototype.clampData = function (t, e) {
          var n = this.getAxis('x').scale,
            i = this.getAxis('y').scale,
            r = n.getExtent(),
            o = i.getExtent(),
            a = n.parse(t[0]),
            s = i.parse(t[1]);
          return (
            (e = e || []),
            (e[0] = Math.min(Math.max(Math.min(r[0], r[1]), a), Math.max(r[0], r[1]))),
            (e[1] = Math.min(Math.max(Math.min(o[0], o[1]), s), Math.max(o[0], o[1]))),
            e
          );
        }),
        (n.prototype.pointToData = function (t, e) {
          var n = [];
          if (this._invTransform) return ve(n, t, this._invTransform);
          var i = this.getAxis('x'),
            r = this.getAxis('y');
          return (
            (n[0] = i.coordToData(i.toLocalCoord(t[0]), e)),
            (n[1] = r.coordToData(r.toLocalCoord(t[1]), e)),
            n
          );
        }),
        (n.prototype.getOtherAxis = function (t) {
          return this.getAxis('x' === t.dim ? 'y' : 'x');
        }),
        (n.prototype.getArea = function () {
          var t = this.getAxis('x').getGlobalExtent(),
            e = this.getAxis('y').getGlobalExtent(),
            n = Math.min(t[0], t[1]),
            i = Math.min(e[0], e[1]),
            r = Math.max(t[0], t[1]) - n,
            o = Math.max(e[0], e[1]) - i;
          return new fm(n, i, r, o);
        }),
        n
      );
    })(aD),
    uD = (function (t) {
      function n(e, n, i, r, o) {
        var a = t.call(this, e, n, i) || this;
        return (a.index = 0), (a.type = r || 'value'), (a.position = o || 'bottom'), a;
      }
      return (
        e(n, t),
        (n.prototype.isHorizontal = function () {
          var t = this.position;
          return 'top' === t || 'bottom' === t;
        }),
        (n.prototype.getGlobalExtent = function (t) {
          var e = this.getExtent();
          return (
            (e[0] = this.toGlobalCoord(e[0])),
            (e[1] = this.toGlobalCoord(e[1])),
            t && e[0] > e[1] && e.reverse(),
            e
          );
        }),
        (n.prototype.pointToData = function (t, e) {
          return this.coordToData(this.toLocalCoord(t['x' === this.dim ? 0 : 1]), e);
        }),
        (n.prototype.setCategorySortInfo = function (t) {
          return 'category' !== this.type
            ? !1
            : ((this.model.option.categorySortInfo = t), void this.scale.setSortInfo(t));
        }),
        n
      );
    })(ak),
    hD = Math.log,
    cD = (function () {
      function t(t, e, n) {
        (this.type = 'grid'),
          (this._coordsMap = {}),
          (this._coordsList = []),
          (this._axesMap = {}),
          (this._axesList = []),
          (this.axisPointerEnabled = !0),
          (this.dimensions = sD),
          this._initCartesian(t, e, n),
          (this.model = t);
      }
      return (
        (t.prototype.getRect = function () {
          return this._rect;
        }),
        (t.prototype.update = function (t, e) {
          function n(t) {
            var e,
              n = w(t),
              i = n.length;
            if (i) {
              for (var r = [], o = i - 1; o >= 0; o--) {
                var a = +n[o],
                  s = t[a],
                  l = s.model,
                  u = s.scale;
                wp(u) && l.get('alignTicks') && null == l.get('interval')
                  ? r.push(s)
                  : (nf(u, l), wp(u) && (e = s));
              }
              r.length &&
                (e || ((e = r.pop()), nf(e.scale, e.model)),
                v(r, function (t) {
                  Kd(t.scale, t.model, e.scale);
                }));
            }
          }
          var i = this._axesMap;
          this._updateScale(t, this.model), n(i.x), n(i.y);
          var r = {};
          v(i.x, function (t) {
            Qd(i, 'y', t, r);
          }),
            v(i.y, function (t) {
              Qd(i, 'x', t, r);
            }),
            this.resize(this.model, e);
        }),
        (t.prototype.resize = function (t, e, n) {
          function i() {
            v(s, function (t) {
              var e = t.isHorizontal(),
                n = e ? [0, a.width] : [0, a.height],
                i = t.inverse ? 1 : 0;
              t.setExtent(n[i], n[1 - i]), tg(t, e ? a.x : a.y);
            });
          }
          var r = t.getBoxLayoutParams(),
            o = !n && t.get('containLabel'),
            a = kl(r, { width: e.getWidth(), height: e.getHeight() });
          this._rect = a;
          var s = this._axesList;
          i(),
            o &&
              (v(s, function (t) {
                if (!t.model.get(['axisLabel', 'inside'])) {
                  var e = lf(t);
                  if (e) {
                    var n = t.isHorizontal() ? 'height' : 'width',
                      i = t.model.get(['axisLabel', 'margin']);
                    (a[n] -= e[n] + i),
                      'top' === t.position
                        ? (a.y += e.height + i)
                        : 'left' === t.position && (a.x += e.width + i);
                  }
                }
              }),
              i()),
            v(this._coordsList, function (t) {
              t.calcAffineTransform();
            });
        }),
        (t.prototype.getAxis = function (t, e) {
          var n = this._axesMap[t];
          return null != n ? n[e || 0] : void 0;
        }),
        (t.prototype.getAxes = function () {
          return this._axesList.slice();
        }),
        (t.prototype.getCartesian = function (t, e) {
          if (null != t && null != e) {
            var n = 'x' + t + 'y' + e;
            return this._coordsMap[n];
          }
          I(t) && ((e = t.yAxisIndex), (t = t.xAxisIndex));
          for (var i = 0, r = this._coordsList; i < r.length; i++)
            if (r[i].getAxis('x').index === t || r[i].getAxis('y').index === e) return r[i];
        }),
        (t.prototype.getCartesians = function () {
          return this._coordsList.slice();
        }),
        (t.prototype.convertToPixel = function (t, e, n) {
          var i = this._findConvertTarget(e);
          return i.cartesian
            ? i.cartesian.dataToPoint(n)
            : i.axis
            ? i.axis.toGlobalCoord(i.axis.dataToCoord(n))
            : null;
        }),
        (t.prototype.convertFromPixel = function (t, e, n) {
          var i = this._findConvertTarget(e);
          return i.cartesian
            ? i.cartesian.pointToData(n)
            : i.axis
            ? i.axis.coordToData(i.axis.toLocalCoord(n))
            : null;
        }),
        (t.prototype._findConvertTarget = function (t) {
          var e,
            n,
            i = t.seriesModel,
            r = t.xAxisModel || (i && i.getReferringComponents('xAxis', Em).models[0]),
            o = t.yAxisModel || (i && i.getReferringComponents('yAxis', Em).models[0]),
            a = t.gridModel,
            s = this._coordsList;
          if (i) (e = i.coordinateSystem), p(s, e) < 0 && (e = null);
          else if (r && o) e = this.getCartesian(r.componentIndex, o.componentIndex);
          else if (r) n = this.getAxis('x', r.componentIndex);
          else if (o) n = this.getAxis('y', o.componentIndex);
          else if (a) {
            var l = a.coordinateSystem;
            l === this && (e = this._coordsList[0]);
          }
          return { cartesian: e, axis: n };
        }),
        (t.prototype.containPoint = function (t) {
          var e = this._coordsList[0];
          return e ? e.containPoint(t) : void 0;
        }),
        (t.prototype._initCartesian = function (t, e) {
          function n(e) {
            return function (n, i) {
              if ($d(n, t)) {
                var l = n.get('position');
                'x' === e
                  ? 'top' !== l && 'bottom' !== l && (l = o.bottom ? 'top' : 'bottom')
                  : 'left' !== l && 'right' !== l && (l = o.left ? 'right' : 'left'),
                  (o[l] = !0);
                var u = new uD(e, rf(n), [0, 0], n.get('type'), l),
                  h = 'category' === u.type;
                (u.onBand = h && n.get('boundaryGap')),
                  (u.inverse = n.get('inverse')),
                  (n.axis = u),
                  (u.model = n),
                  (u.grid = r),
                  (u.index = i),
                  r._axesList.push(u),
                  (a[e][i] = u),
                  s[e]++;
              }
            };
          }
          var i = this,
            r = this,
            o = { left: !1, right: !1, top: !1, bottom: !1 },
            a = { x: {}, y: {} },
            s = { x: 0, y: 0 };
          return (
            e.eachComponent('xAxis', n('x'), this),
            e.eachComponent('yAxis', n('y'), this),
            s.x && s.y
              ? ((this._axesMap = a),
                void v(a.x, function (e, n) {
                  v(a.y, function (r, o) {
                    var a = 'x' + n + 'y' + o,
                      s = new lD(a);
                    (s.master = i),
                      (s.model = t),
                      (i._coordsMap[a] = s),
                      i._coordsList.push(s),
                      s.addAxis(e),
                      s.addAxis(r);
                  });
                }))
              : ((this._axesMap = {}), void (this._axesList = []))
          );
        }),
        (t.prototype._updateScale = function (t, e) {
          function n(t, e) {
            v(pf(t, e.dim), function (n) {
              e.scale.unionExtentFromData(t, n);
            });
          }
          v(this._axesList, function (t) {
            if ((t.scale.setExtent(1 / 0, -1 / 0), 'category' === t.type)) {
              var e = t.model.get('categorySortInfo');
              t.scale.setSortInfo(e);
            }
          }),
            t.eachSeries(function (t) {
              if (qd(t)) {
                var i = jd(t),
                  r = i.xAxisModel,
                  o = i.yAxisModel;
                if (!$d(r, e) || !$d(o, e)) return;
                var a = this.getCartesian(r.componentIndex, o.componentIndex),
                  s = t.getData(),
                  l = a.getAxis('x'),
                  u = a.getAxis('y');
                n(s, l), n(s, u);
              }
            }, this);
        }),
        (t.prototype.getTooltipAxes = function (t) {
          var e = [],
            n = [];
          return (
            v(this.getCartesians(), function (i) {
              var r = null != t && 'auto' !== t ? i.getAxis(t) : i.getBaseAxis(),
                o = i.getOtherAxis(r);
              p(e, r) < 0 && e.push(r), p(n, o) < 0 && n.push(o);
            }),
            { baseAxes: e, otherAxes: n }
          );
        }),
        (t.create = function (e, n) {
          var i = [];
          return (
            e.eachComponent('grid', function (r, o) {
              var a = new t(r, e, n);
              (a.name = 'grid_' + o), a.resize(r, n, !0), (r.coordinateSystem = a), i.push(a);
            }),
            e.eachSeries(function (t) {
              if (qd(t)) {
                var e = jd(t),
                  n = e.xAxisModel,
                  i = e.yAxisModel,
                  r = n.getCoordSysModel(),
                  o = r.coordinateSystem;
                t.coordinateSystem = o.getCartesian(n.componentIndex, i.componentIndex);
              }
            }),
            i
          );
        }),
        (t.dimensions = sD),
        t
      );
    })(),
    pD = Math.PI,
    fD = (function () {
      function t(t, e) {
        (this.group = new wm()),
          (this.opt = e),
          (this.axisModel = t),
          c(e, {
            labelOffset: 0,
            nameDirection: 1,
            tickDirection: 1,
            labelDirection: 1,
            silent: !0,
            handleAutoShown: function () {
              return !0;
            },
          });
        var n = new wm({ x: e.position[0], y: e.position[1], rotation: e.rotation });
        n.updateTransform(), (this._transformGroup = n);
      }
      return (
        (t.prototype.hasBuilder = function (t) {
          return !!dD[t];
        }),
        (t.prototype.add = function (t) {
          dD[t](this.opt, this.axisModel, this.group, this._transformGroup);
        }),
        (t.prototype.getGroup = function () {
          return this.group;
        }),
        (t.innerTextLayout = function (t, e, n) {
          var i,
            r,
            o = qi(e - t);
          return (
            ji(o)
              ? ((r = n > 0 ? 'top' : 'bottom'), (i = 'center'))
              : ji(o - pD)
              ? ((r = n > 0 ? 'bottom' : 'top'), (i = 'center'))
              : ((r = 'middle'),
                (i = o > 0 && pD > o ? (n > 0 ? 'right' : 'left') : n > 0 ? 'left' : 'right')),
            { rotation: o, textAlign: i, textVerticalAlign: r }
          );
        }),
        (t.makeAxisEventDataBase = function (t) {
          var e = { componentType: t.mainType, componentIndex: t.componentIndex };
          return (e[t.mainType + 'Index'] = t.componentIndex), e;
        }),
        (t.isLabelSilent = function (t) {
          var e = t.get('tooltip');
          return t.get('silent') || !(t.get('triggerEvent') || (e && e.show));
        }),
        t
      );
    })(),
    dD = {
      axisLine: function (t, e, n, i) {
        var r = e.get(['axisLine', 'show']);
        if (('auto' === r && t.handleAutoShown && (r = t.handleAutoShown('axisLine')), r)) {
          var o = e.axis.getExtent(),
            a = i.transform,
            s = [o[0], 0],
            l = [o[1], 0];
          a && (ve(s, s, a), ve(l, l, a));
          var u = h({ lineCap: 'round' }, e.getModel(['axisLine', 'lineStyle']).getLineStyle()),
            c = new lw({
              subPixelOptimize: !0,
              shape: { x1: s[0], y1: s[1], x2: l[0], y2: l[1] },
              style: u,
              strokeContainThreshold: t.strokeContainThreshold || 5,
              silent: !0,
              z2: 1,
            });
          (c.anid = 'line'), n.add(c);
          var p = e.get(['axisLine', 'symbol']);
          if (null != p) {
            var f = e.get(['axisLine', 'symbolSize']);
            C(p) && (p = [p, p]), (C(f) || D(f)) && (f = [f, f]);
            var d = Nh(e.get(['axisLine', 'symbolOffset']) || 0, f),
              g = f[0],
              y = f[1];
            v(
              [
                { rotate: t.rotation + Math.PI / 2, offset: d[0], r: 0 },
                {
                  rotate: t.rotation - Math.PI / 2,
                  offset: d[1],
                  r: Math.sqrt((s[0] - l[0]) * (s[0] - l[0]) + (s[1] - l[1]) * (s[1] - l[1])),
                },
              ],
              function (e, i) {
                if ('none' !== p[i] && null != p[i]) {
                  var r = zh(p[i], -g / 2, -y / 2, g, y, u.stroke, !0),
                    o = e.r + e.offset;
                  r.attr({
                    rotation: e.rotate,
                    x: s[0] + o * Math.cos(t.rotation),
                    y: s[1] - o * Math.sin(t.rotation),
                    silent: !0,
                    z2: 11,
                  }),
                    n.add(r);
                }
              }
            );
          }
        }
      },
      axisTickLabel: function (t, e, n, i) {
        var r = sg(n, i, e, t),
          o = ug(n, i, e, t);
        if ((ng(e, o, r), lg(n, i, e, t.tickDirection), e.get(['axisLabel', 'hideOverlap']))) {
          var a = ad(
            y(o, function (t) {
              return { label: t, priority: t.z2, defaultAttr: { ignore: t.ignore } };
            })
          );
          hd(a);
        }
      },
      axisName: function (t, e, n, i) {
        var r = z(t.axisName, e.get('name'));
        if (r) {
          var o,
            a = e.get('nameLocation'),
            s = t.nameDirection,
            l = e.getModel('nameTextStyle'),
            u = e.get('nameGap') || 0,
            h = e.axis.getExtent(),
            c = h[0] > h[1] ? -1 : 1,
            p = [
              'start' === a ? h[0] - c * u : 'end' === a ? h[1] + c * u : (h[0] + h[1]) / 2,
              og(a) ? t.labelOffset + s * u : 0,
            ],
            f = e.get('nameRotate');
          null != f && (f = (f * pD) / 180);
          var d;
          og(a)
            ? (o = fD.innerTextLayout(t.rotation, null != f ? f : t.rotation, s))
            : ((o = eg(t.rotation, a, f || 0, h)),
              (d = t.axisNameAvailableWidth),
              null != d && ((d = Math.abs(d / Math.sin(o.rotation))), !isFinite(d) && (d = null)));
          var g = l.getFont(),
            v = e.get('nameTruncate', !0) || {},
            y = v.ellipsis,
            m = z(t.nameTruncateMaxWidth, v.maxWidth, d),
            _ = new tx({
              x: p[0],
              y: p[1],
              rotation: o.rotation,
              silent: fD.isLabelSilent(e),
              style: Os(l, {
                text: r,
                font: g,
                overflow: 'truncate',
                width: m,
                ellipsis: y,
                fill: l.getTextColor() || e.get(['axisLine', 'lineStyle', 'color']),
                align: l.get('align') || o.textAlign,
                verticalAlign: l.get('verticalAlign') || o.textVerticalAlign,
              }),
              z2: 1,
            });
          if (
            (Cs({ el: _, componentModel: e, itemName: r }),
            (_.__fullText = r),
            (_.anid = 'name'),
            e.get('triggerEvent'))
          ) {
            var x = fD.makeAxisEventDataBase(e);
            (x.targetType = 'axisName'), (x.name = r), (rx(_).eventData = x);
          }
          i.add(_), _.updateTransform(), n.add(_), _.decomposeTransform();
        }
      },
    },
    gD = {},
    vD = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = n.type), e;
      }
      return (
        e(n, t),
        (n.prototype.render = function (e, n, i) {
          this.axisPointerClass && hg(e),
            t.prototype.render.apply(this, arguments),
            this._doUpdateAxisPointerClass(e, i, !0);
        }),
        (n.prototype.updateAxisPointer = function (t, e, n) {
          this._doUpdateAxisPointerClass(t, n, !1);
        }),
        (n.prototype.remove = function (t, e) {
          var n = this._axisPointer;
          n && n.remove(e);
        }),
        (n.prototype.dispose = function (e, n) {
          this._disposeAxisPointer(n), t.prototype.dispose.apply(this, arguments);
        }),
        (n.prototype._doUpdateAxisPointerClass = function (t, e, i) {
          var r = n.getAxisPointerClass(this.axisPointerClass);
          if (r) {
            var o = pg(t);
            o
              ? (this._axisPointer || (this._axisPointer = new r())).render(t, o, e, i)
              : this._disposeAxisPointer(e);
          }
        }),
        (n.prototype._disposeAxisPointer = function (t) {
          this._axisPointer && this._axisPointer.dispose(t), (this._axisPointer = null);
        }),
        (n.registerAxisPointerClass = function (t, e) {
          gD[t] = e;
        }),
        (n.getAxisPointerClass = function (t) {
          return t && gD[t];
        }),
        (n.type = 'axis'),
        n
      );
    })(RS),
    yD = Dr(),
    mD = ['axisLine', 'axisTickLabel', 'axisName'],
    _D = ['splitArea', 'splitLine', 'minorSplitLine'],
    xD = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = n.type), (e.axisPointerClass = 'CartesianAxisPointer'), e;
      }
      return (
        e(n, t),
        (n.prototype.render = function (e, n, i, r) {
          this.group.removeAll();
          var o = this._axisGroup;
          if (((this._axisGroup = new wm()), this.group.add(this._axisGroup), e.get('show'))) {
            var a = e.getCoordSysModel(),
              s = Yd(a, e),
              l = new fD(
                e,
                h(
                  {
                    handleAutoShown: function () {
                      for (var t = a.coordinateSystem.getCartesians(), n = 0; n < t.length; n++)
                        if (wp(t[n].getOtherAxis(e.axis).scale)) return !0;
                      return !1;
                    },
                  },
                  s
                )
              );
            v(mD, l.add, l),
              this._axisGroup.add(l.getGroup()),
              v(
                _D,
                function (t) {
                  e.get([t, 'show']) && wD[t](this, this._axisGroup, e, a);
                },
                this
              );
            var u = r && 'changeAxisOrder' === r.type && r.isInitSort;
            u || bs(o, this._axisGroup, e), t.prototype.render.call(this, e, n, i, r);
          }
        }),
        (n.prototype.remove = function () {
          vg(this);
        }),
        (n.type = 'cartesianAxis'),
        n
      );
    })(vD),
    wD = {
      splitLine: function (t, e, n, i) {
        var r = n.axis;
        if (!r.scale.isBlank()) {
          var o = n.getModel('splitLine'),
            a = o.getModel('lineStyle'),
            s = a.get('color');
          s = M(s) ? s : [s];
          for (
            var l = i.coordinateSystem.getRect(),
              u = r.isHorizontal(),
              h = 0,
              p = r.getTicksCoords({ tickModel: o }),
              f = [],
              d = [],
              g = a.getLineStyle(),
              v = 0;
            v < p.length;
            v++
          ) {
            var y = r.toGlobalCoord(p[v].coord);
            u
              ? ((f[0] = y), (f[1] = l.y), (d[0] = y), (d[1] = l.y + l.height))
              : ((f[0] = l.x), (f[1] = y), (d[0] = l.x + l.width), (d[1] = y));
            var m = h++ % s.length,
              _ = p[v].tickValue;
            e.add(
              new lw({
                anid: null != _ ? 'line_' + p[v].tickValue : null,
                subPixelOptimize: !0,
                autoBatch: !0,
                shape: { x1: f[0], y1: f[1], x2: d[0], y2: d[1] },
                style: c({ stroke: s[m] }, g),
                silent: !0,
              })
            );
          }
        }
      },
      minorSplitLine: function (t, e, n, i) {
        var r = n.axis,
          o = n.getModel('minorSplitLine'),
          a = o.getModel('lineStyle'),
          s = i.coordinateSystem.getRect(),
          l = r.isHorizontal(),
          u = r.getMinorTicksCoords();
        if (u.length)
          for (var h = [], c = [], p = a.getLineStyle(), f = 0; f < u.length; f++)
            for (var d = 0; d < u[f].length; d++) {
              var g = r.toGlobalCoord(u[f][d].coord);
              l
                ? ((h[0] = g), (h[1] = s.y), (c[0] = g), (c[1] = s.y + s.height))
                : ((h[0] = s.x), (h[1] = g), (c[0] = s.x + s.width), (c[1] = g)),
                e.add(
                  new lw({
                    anid: 'minor_line_' + u[f][d].tickValue,
                    subPixelOptimize: !0,
                    autoBatch: !0,
                    shape: { x1: h[0], y1: h[1], x2: c[0], y2: c[1] },
                    style: p,
                    silent: !0,
                  })
                );
            }
      },
      splitArea: function (t, e, n, i) {
        gg(t, e, n, i);
      },
    },
    bD = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = n.type), e;
      }
      return e(n, t), (n.type = 'xAxis'), n;
    })(xD),
    SD = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = bD.type), e;
      }
      return e(n, t), (n.type = 'yAxis'), n;
    })(xD),
    MD = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = 'grid'), e;
      }
      return (
        e(n, t),
        (n.prototype.render = function (t) {
          this.group.removeAll(),
            t.get('show') &&
              this.group.add(
                new K_({
                  shape: t.coordinateSystem.getRect(),
                  style: c({ fill: t.get('backgroundColor') }, t.getItemStyle()),
                  silent: !0,
                  z2: -1,
                })
              );
        }),
        (n.type = 'grid'),
        n
      );
    })(RS),
    TD = { offset: 0 };
  mf(yg);
  var CD = ['x', 'y', 'radius', 'angle', 'single'],
    kD = ['cartesian2d', 'polar', 'singleAxis'],
    DD = (function () {
      function t() {
        (this.indexList = []), (this.indexMap = []);
      }
      return (
        (t.prototype.add = function (t) {
          this.indexMap[t] || (this.indexList.push(t), (this.indexMap[t] = !0));
        }),
        t
      );
    })(),
    ID = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (
          (e.type = n.type),
          (e._autoThrottle = !0),
          (e._noTarget = !0),
          (e._rangePropMode = ['percent', 'percent']),
          e
        );
      }
      return (
        e(n, t),
        (n.prototype.init = function (t, e, n) {
          var i = bg(t);
          (this.settledOption = i), this.mergeDefaultAndTheme(t, n), this._doInit(i);
        }),
        (n.prototype.mergeOption = function (t) {
          var e = bg(t);
          l(this.option, t, !0), l(this.settledOption, e, !0), this._doInit(e);
        }),
        (n.prototype._doInit = function (t) {
          var e = this.option;
          this._setDefaultThrottle(t), this._updateRangeUse(t);
          var n = this.settledOption;
          v(
            [
              ['start', 'startValue'],
              ['end', 'endValue'],
            ],
            function (t, i) {
              'value' === this._rangePropMode[i] && (e[t[0]] = n[t[0]] = null);
            },
            this
          ),
            this._resetTarget();
        }),
        (n.prototype._resetTarget = function () {
          var t = this.get('orient', !0),
            e = (this._targetAxisInfoMap = X()),
            n = this._fillSpecifiedTargetAxis(e);
          n
            ? (this._orient = t || this._makeAutoOrientByTargetAxis())
            : ((this._orient = t || 'horizontal'),
              this._fillAutoTargetAxisByOrient(e, this._orient)),
            (this._noTarget = !0),
            e.each(function (t) {
              t.indexList.length && (this._noTarget = !1);
            }, this);
        }),
        (n.prototype._fillSpecifiedTargetAxis = function (t) {
          var e = !1;
          return (
            v(
              CD,
              function (n) {
                var i = this.getReferringComponents(_g(n), Bm);
                if (i.specified) {
                  e = !0;
                  var r = new DD();
                  v(i.models, function (t) {
                    r.add(t.componentIndex);
                  }),
                    t.set(n, r);
                }
              },
              this
            ),
            e
          );
        }),
        (n.prototype._fillAutoTargetAxisByOrient = function (t, e) {
          function n(e, n) {
            var i = e[0];
            if (i) {
              var o = new DD();
              if ((o.add(i.componentIndex), t.set(n, o), (r = !1), 'x' === n || 'y' === n)) {
                var a = i.getReferringComponents('grid', Em).models[0];
                a &&
                  v(e, function (t) {
                    i.componentIndex !== t.componentIndex &&
                      a === t.getReferringComponents('grid', Em).models[0] &&
                      o.add(t.componentIndex);
                  });
              }
            }
          }
          var i = this.ecModel,
            r = !0;
          if (r) {
            var o = 'vertical' === e ? 'y' : 'x',
              a = i.findComponents({ mainType: o + 'Axis' });
            n(a, o);
          }
          if (r) {
            var a = i.findComponents({
              mainType: 'singleAxis',
              filter: function (t) {
                return t.get('orient', !0) === e;
              },
            });
            n(a, 'single');
          }
          r &&
            v(
              CD,
              function (e) {
                if (r) {
                  var n = i.findComponents({
                    mainType: _g(e),
                    filter: function (t) {
                      return 'category' === t.get('type', !0);
                    },
                  });
                  if (n[0]) {
                    var o = new DD();
                    o.add(n[0].componentIndex), t.set(e, o), (r = !1);
                  }
                }
              },
              this
            );
        }),
        (n.prototype._makeAutoOrientByTargetAxis = function () {
          var t;
          return (
            this.eachTargetAxis(function (e) {
              !t && (t = e);
            }, this),
            'y' === t ? 'vertical' : 'horizontal'
          );
        }),
        (n.prototype._setDefaultThrottle = function (t) {
          if ((t.hasOwnProperty('throttle') && (this._autoThrottle = !1), this._autoThrottle)) {
            var e = this.ecModel.option;
            this.option.throttle = e.animation && e.animationDurationUpdate > 0 ? 100 : 20;
          }
        }),
        (n.prototype._updateRangeUse = function (t) {
          var e = this._rangePropMode,
            n = this.get('rangeMode');
          v(
            [
              ['start', 'startValue'],
              ['end', 'endValue'],
            ],
            function (i, r) {
              var o = null != t[i[0]],
                a = null != t[i[1]];
              o && !a
                ? (e[r] = 'percent')
                : !o && a
                ? (e[r] = 'value')
                : n
                ? (e[r] = n[r])
                : o && (e[r] = 'percent');
            }
          );
        }),
        (n.prototype.noTarget = function () {
          return this._noTarget;
        }),
        (n.prototype.getFirstTargetAxisModel = function () {
          var t;
          return (
            this.eachTargetAxis(function (e, n) {
              null == t && (t = this.ecModel.getComponent(_g(e), n));
            }, this),
            t
          );
        }),
        (n.prototype.eachTargetAxis = function (t, e) {
          this._targetAxisInfoMap.each(function (n, i) {
            v(n.indexList, function (n) {
              t.call(e, i, n);
            });
          });
        }),
        (n.prototype.getAxisProxy = function (t, e) {
          var n = this.getAxisModel(t, e);
          return n ? n.__dzAxisProxy : void 0;
        }),
        (n.prototype.getAxisModel = function (t, e) {
          var n = this._targetAxisInfoMap.get(t);
          return n && n.indexMap[e] ? this.ecModel.getComponent(_g(t), e) : void 0;
        }),
        (n.prototype.setRawRange = function (t) {
          var e = this.option,
            n = this.settledOption;
          v(
            [
              ['start', 'startValue'],
              ['end', 'endValue'],
            ],
            function (i) {
              (null != t[i[0]] || null != t[i[1]]) &&
                ((e[i[0]] = n[i[0]] = t[i[0]]), (e[i[1]] = n[i[1]] = t[i[1]]));
            },
            this
          ),
            this._updateRangeUse(t);
        }),
        (n.prototype.setCalculatedRange = function (t) {
          var e = this.option;
          v(['start', 'startValue', 'end', 'endValue'], function (n) {
            e[n] = t[n];
          });
        }),
        (n.prototype.getPercentRange = function () {
          var t = this.findRepresentativeAxisProxy();
          return t ? t.getDataPercentWindow() : void 0;
        }),
        (n.prototype.getValueRange = function (t, e) {
          if (null != t || null != e) return this.getAxisProxy(t, e).getDataValueWindow();
          var n = this.findRepresentativeAxisProxy();
          return n ? n.getDataValueWindow() : void 0;
        }),
        (n.prototype.findRepresentativeAxisProxy = function (t) {
          if (t) return t.__dzAxisProxy;
          for (var e, n = this._targetAxisInfoMap.keys(), i = 0; i < n.length; i++)
            for (
              var r = n[i], o = this._targetAxisInfoMap.get(r), a = 0;
              a < o.indexList.length;
              a++
            ) {
              var s = this.getAxisProxy(r, o.indexList[a]);
              if (s.hostedBy(this)) return s;
              e || (e = s);
            }
          return e;
        }),
        (n.prototype.getRangePropMode = function () {
          return this._rangePropMode.slice();
        }),
        (n.prototype.getOrient = function () {
          return this._orient;
        }),
        (n.type = 'dataZoom'),
        (n.dependencies = [
          'xAxis',
          'yAxis',
          'radiusAxis',
          'angleAxis',
          'singleAxis',
          'series',
          'toolbox',
        ]),
        (n.defaultOption = { z: 4, filterMode: 'filter', start: 0, end: 100 }),
        n
      );
    })(wb),
    AD = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = n.type), e;
      }
      return (
        e(n, t),
        (n.type = 'dataZoom.inside'),
        (n.defaultOption = Zs(ID.defaultOption, {
          disabled: !1,
          zoomLock: !1,
          zoomOnMouseWheel: !0,
          moveOnMouseMove: !0,
          moveOnMouseWheel: !1,
          preventDefaultMouseMove: !0,
        })),
        n
      );
    })(ID),
    LD = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = n.type), e;
      }
      return (
        e(n, t),
        (n.prototype.render = function (t, e, n) {
          (this.dataZoomModel = t), (this.ecModel = e), (this.api = n);
        }),
        (n.type = 'dataZoom'),
        n
      );
    })(RS),
    PD = '\x00_ec_interaction_mutex';
  Nc({ type: 'takeGlobalCursor', event: 'globalCursorTaken', update: 'update' }, $);
  var OD = (function (t) {
      function n(e) {
        var n = t.call(this) || this;
        n._zr = e;
        var i = _v(n._mousedownHandler, n),
          r = _v(n._mousemoveHandler, n),
          o = _v(n._mouseupHandler, n),
          a = _v(n._mousewheelHandler, n),
          l = _v(n._pinchHandler, n);
        return (
          (n.enable = function (t, n) {
            this.disable(),
              (this._opt = c(s(n) || {}, {
                zoomOnMouseWheel: !0,
                moveOnMouseMove: !0,
                moveOnMouseWheel: !1,
                preventDefaultMouseMove: !0,
              })),
              null == t && (t = !0),
              (t === !0 || 'move' === t || 'pan' === t) &&
                (e.on('mousedown', i), e.on('mousemove', r), e.on('mouseup', o)),
              (t === !0 || 'scale' === t || 'zoom' === t) &&
                (e.on('mousewheel', a), e.on('pinch', l));
          }),
          (n.disable = function () {
            e.off('mousedown', i),
              e.off('mousemove', r),
              e.off('mouseup', o),
              e.off('mousewheel', a),
              e.off('pinch', l);
          }),
          n
        );
      }
      return (
        e(n, t),
        (n.prototype.isDragging = function () {
          return this._dragging;
        }),
        (n.prototype.isPinching = function () {
          return this._pinching;
        }),
        (n.prototype.setPointerChecker = function (t) {
          this.pointerChecker = t;
        }),
        (n.prototype.dispose = function () {
          this.disable();
        }),
        (n.prototype._mousedownHandler = function (t) {
          if (!(Pe(t) || (t.target && t.target.draggable))) {
            var e = t.offsetX,
              n = t.offsetY;
            this.pointerChecker &&
              this.pointerChecker(t, e, n) &&
              ((this._x = e), (this._y = n), (this._dragging = !0));
          }
        }),
        (n.prototype._mousemoveHandler = function (t) {
          if (
            this._dragging &&
            Ag('moveOnMouseMove', t, this._opt) &&
            'pinch' !== t.gestureEvent &&
            !Cg(this._zr, 'globalPan')
          ) {
            var e = t.offsetX,
              n = t.offsetY,
              i = this._x,
              r = this._y,
              o = e - i,
              a = n - r;
            (this._x = e),
              (this._y = n),
              this._opt.preventDefaultMouseMove && zv(t.event),
              Ig(this, 'pan', 'moveOnMouseMove', t, {
                dx: o,
                dy: a,
                oldX: i,
                oldY: r,
                newX: e,
                newY: n,
                isAvailableBehavior: null,
              });
          }
        }),
        (n.prototype._mouseupHandler = function (t) {
          Pe(t) || (this._dragging = !1);
        }),
        (n.prototype._mousewheelHandler = function (t) {
          var e = Ag('zoomOnMouseWheel', t, this._opt),
            n = Ag('moveOnMouseWheel', t, this._opt),
            i = t.wheelDelta,
            r = Math.abs(i),
            o = t.offsetX,
            a = t.offsetY;
          if (0 !== i && (e || n)) {
            if (e) {
              var s = r > 3 ? 1.4 : r > 1 ? 1.2 : 1.1,
                l = i > 0 ? s : 1 / s;
              Dg(this, 'zoom', 'zoomOnMouseWheel', t, {
                scale: l,
                originX: o,
                originY: a,
                isAvailableBehavior: null,
              });
            }
            if (n) {
              var u = Math.abs(i),
                h = (i > 0 ? 1 : -1) * (u > 3 ? 0.4 : u > 1 ? 0.15 : 0.05);
              Dg(this, 'scrollMove', 'moveOnMouseWheel', t, {
                scrollDelta: h,
                originX: o,
                originY: a,
                isAvailableBehavior: null,
              });
            }
          }
        }),
        (n.prototype._pinchHandler = function (t) {
          if (!Cg(this._zr, 'globalPan')) {
            var e = t.pinchScale > 1 ? 1.1 : 1 / 1.1;
            Dg(this, 'zoom', null, t, {
              scale: e,
              originX: t.pinchX,
              originY: t.pinchY,
              isAvailableBehavior: null,
            });
          }
        }),
        n
      );
    })(Lv),
    RD = Dr(),
    ED = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = 'dataZoom.inside'), e;
      }
      return (
        e(n, t),
        (n.prototype.render = function (e, n, i) {
          return (
            t.prototype.render.apply(this, arguments),
            e.noTarget()
              ? void this._clear()
              : ((this.range = e.getPercentRange()),
                void Lg(i, e, {
                  pan: _v(BD.pan, this),
                  zoom: _v(BD.zoom, this),
                  scrollMove: _v(BD.scrollMove, this),
                }))
          );
        }),
        (n.prototype.dispose = function () {
          this._clear(), t.prototype.dispose.apply(this, arguments);
        }),
        (n.prototype._clear = function () {
          Pg(this.api, this.dataZoomModel), (this.range = null);
        }),
        (n.type = 'dataZoom.inside'),
        n
      );
    })(LD),
    BD = {
      zoom: function (t, e, n, i) {
        var r = this.range,
          o = r.slice(),
          a = t.axisModels[0];
        if (a) {
          var s = zD[e](null, [i.originX, i.originY], a, n, t),
            l =
              ((s.signal > 0 ? s.pixelStart + s.pixelLength - s.pixel : s.pixel - s.pixelStart) /
                s.pixelLength) *
                (o[1] - o[0]) +
              o[0],
            u = Math.max(1 / i.scale, 0);
          (o[0] = (o[0] - l) * u + l), (o[1] = (o[1] - l) * u + l);
          var h = this.dataZoomModel.findRepresentativeAxisProxy().getMinMaxSpan();
          return (
            Sg(0, o, [0, 100], 0, h.minSpan, h.maxSpan),
            (this.range = o),
            r[0] !== o[0] || r[1] !== o[1] ? o : void 0
          );
        }
      },
      pan: Fg(function (t, e, n, i, r, o) {
        var a = zD[i]([o.oldX, o.oldY], [o.newX, o.newY], e, r, n);
        return (a.signal * (t[1] - t[0]) * a.pixel) / a.pixelLength;
      }),
      scrollMove: Fg(function (t, e, n, i, r, o) {
        var a = zD[i]([0, 0], [o.scrollDelta, o.scrollDelta], e, r, n);
        return a.signal * (t[1] - t[0]) * o.scrollDelta;
      }),
    },
    zD = {
      grid: function (t, e, n, i, r) {
        var o = n.axis,
          a = {},
          s = r.model.coordinateSystem.getRect();
        return (
          (t = t || [0, 0]),
          'x' === o.dim
            ? ((a.pixel = e[0] - t[0]),
              (a.pixelLength = s.width),
              (a.pixelStart = s.x),
              (a.signal = o.inverse ? 1 : -1))
            : ((a.pixel = e[1] - t[1]),
              (a.pixelLength = s.height),
              (a.pixelStart = s.y),
              (a.signal = o.inverse ? -1 : 1)),
          a
        );
      },
      polar: function (t, e, n, i, r) {
        var o = n.axis,
          a = {},
          s = r.model.coordinateSystem,
          l = s.getRadiusAxis().getExtent(),
          u = s.getAngleAxis().getExtent();
        return (
          (t = t ? s.pointToCoord(t) : [0, 0]),
          (e = s.pointToCoord(e)),
          'radiusAxis' === n.mainType
            ? ((a.pixel = e[0] - t[0]),
              (a.pixelLength = l[1] - l[0]),
              (a.pixelStart = l[0]),
              (a.signal = o.inverse ? 1 : -1))
            : ((a.pixel = e[1] - t[1]),
              (a.pixelLength = u[1] - u[0]),
              (a.pixelStart = u[0]),
              (a.signal = o.inverse ? -1 : 1)),
          a
        );
      },
      singleAxis: function (t, e, n, i, r) {
        var o = n.axis,
          a = r.model.coordinateSystem.getRect(),
          s = {};
        return (
          (t = t || [0, 0]),
          'horizontal' === o.orient
            ? ((s.pixel = e[0] - t[0]),
              (s.pixelLength = a.width),
              (s.pixelStart = a.x),
              (s.signal = o.inverse ? 1 : -1))
            : ((s.pixel = e[1] - t[1]),
              (s.pixelLength = a.height),
              (s.pixelStart = a.y),
              (s.signal = o.inverse ? -1 : 1)),
          s
        );
      },
    },
    ND = v,
    FD = Wi,
    VD = (function () {
      function t(t, e, n, i) {
        (this._dimName = t), (this._axisIndex = e), (this.ecModel = i), (this._dataZoomModel = n);
      }
      return (
        (t.prototype.hostedBy = function (t) {
          return this._dataZoomModel === t;
        }),
        (t.prototype.getDataValueWindow = function () {
          return this._valueWindow.slice();
        }),
        (t.prototype.getDataPercentWindow = function () {
          return this._percentWindow.slice();
        }),
        (t.prototype.getTargetSeriesModels = function () {
          var t = [];
          return (
            this.ecModel.eachSeries(function (e) {
              if (mg(e)) {
                var n = _g(this._dimName),
                  i = e.getReferringComponents(n, Em).models[0];
                i && this._axisIndex === i.componentIndex && t.push(e);
              }
            }, this),
            t
          );
        }),
        (t.prototype.getAxisModel = function () {
          return this.ecModel.getComponent(this._dimName + 'Axis', this._axisIndex);
        }),
        (t.prototype.getMinMaxSpan = function () {
          return s(this._minMaxSpan);
        }),
        (t.prototype.calculateDataWindow = function (t) {
          function e(t, e, n, i, r) {
            var a = r ? 'Span' : 'ValueSpan';
            Sg(0, t, n, 'all', h['min' + a], h['max' + a]);
            for (var s = 0; 2 > s; s++) (e[s] = Fi(t[s], n, i, !0)), r && (e[s] = o.parse(e[s]));
          }
          var n,
            i = this._dataExtent,
            r = this.getAxisModel(),
            o = r.axis.scale,
            a = this._dataZoomModel.getRangePropMode(),
            s = [0, 100],
            l = [],
            u = [];
          ND(['start', 'end'], function (e, r) {
            var h = t[e],
              c = t[e + 'Value'];
            'percent' === a[r]
              ? (null == h && (h = s[r]), (c = o.parse(Fi(h, s, i))))
              : ((n = !0), (c = null == c ? i[r] : o.parse(c)), (h = Fi(c, i, s))),
              (u[r] = c),
              (l[r] = h);
          }),
            FD(u),
            FD(l);
          var h = this._minMaxSpan;
          return n ? e(u, l, i, s, !1) : e(l, u, s, i, !0), { valueWindow: u, percentWindow: l };
        }),
        (t.prototype.reset = function (t) {
          if (t === this._dataZoomModel) {
            var e = this.getTargetSeriesModels();
            (this._dataExtent = Vg(this, this._dimName, e)), this._updateMinMaxSpan();
            var n = this.calculateDataWindow(t.settledOption);
            (this._valueWindow = n.valueWindow),
              (this._percentWindow = n.percentWindow),
              this._setAxisModel();
          }
        }),
        (t.prototype.filterData = function (t) {
          function e(t) {
            return t >= o[0] && t <= o[1];
          }
          if (t === this._dataZoomModel) {
            var n = this._dimName,
              i = this.getTargetSeriesModels(),
              r = t.get('filterMode'),
              o = this._valueWindow;
            'none' !== r &&
              ND(i, function (t) {
                var i = t.getData(),
                  a = i.mapDimensionsAll(n);
                if (a.length) {
                  if ('weakFilter' === r) {
                    var s = i.getStore(),
                      l = y(
                        a,
                        function (t) {
                          return i.getDimensionIndex(t);
                        },
                        i
                      );
                    i.filterSelf(function (t) {
                      for (var e, n, i, r = 0; r < a.length; r++) {
                        var u = s.get(l[r], t),
                          h = !isNaN(u),
                          c = u < o[0],
                          p = u > o[1];
                        if (h && !c && !p) return !0;
                        h && (i = !0), c && (e = !0), p && (n = !0);
                      }
                      return i && e && n;
                    });
                  } else
                    ND(a, function (n) {
                      if ('empty' === r)
                        t.setData(
                          (i = i.map(n, function (t) {
                            return e(t) ? t : 0 / 0;
                          }))
                        );
                      else {
                        var a = {};
                        (a[n] = o), i.selectRange(a);
                      }
                    });
                  ND(a, function (t) {
                    i.setApproximateExtent(o, t);
                  });
                }
              });
          }
        }),
        (t.prototype._updateMinMaxSpan = function () {
          var t = (this._minMaxSpan = {}),
            e = this._dataZoomModel,
            n = this._dataExtent;
          ND(
            ['min', 'max'],
            function (i) {
              var r = e.get(i + 'Span'),
                o = e.get(i + 'ValueSpan');
              null != o && (o = this.getAxisModel().axis.scale.parse(o)),
                null != o
                  ? (r = Fi(n[0] + o, n, [0, 100], !0))
                  : null != r && (o = Fi(r, [0, 100], n, !0) - n[0]),
                (t[i + 'Span'] = r),
                (t[i + 'ValueSpan'] = o);
            },
            this
          );
        }),
        (t.prototype._setAxisModel = function () {
          var t = this.getAxisModel(),
            e = this._percentWindow,
            n = this._valueWindow;
          if (e) {
            var i = Ui(n, [0, 500]);
            i = Math.min(i, 20);
            var r = t.axis.scale.rawExtentInfo;
            0 !== e[0] && r.setDeterminedMinMax('min', +n[0].toFixed(i)),
              100 !== e[1] && r.setDeterminedMinMax('max', +n[1].toFixed(i)),
              r.freeze();
          }
        }),
        t
      );
    })(),
    HD = {
      getTargetSeries: function (t) {
        function e(e) {
          t.eachComponent('dataZoom', function (n) {
            n.eachTargetAxis(function (i, r) {
              var o = t.getComponent(_g(i), r);
              e(i, r, o, n);
            });
          });
        }
        e(function (t, e, n) {
          n.__dzAxisProxy = null;
        });
        var n = [];
        e(function (e, i, r, o) {
          r.__dzAxisProxy || ((r.__dzAxisProxy = new VD(e, i, o, t)), n.push(r.__dzAxisProxy));
        });
        var i = X();
        return (
          v(n, function (t) {
            v(t.getTargetSeriesModels(), function (t) {
              i.set(t.uid, t);
            });
          }),
          i
        );
      },
      overallReset: function (t, e) {
        t.eachComponent('dataZoom', function (t) {
          t.eachTargetAxis(function (e, n) {
            t.getAxisProxy(e, n).reset(t);
          }),
            t.eachTargetAxis(function (n, i) {
              t.getAxisProxy(n, i).filterData(t, e);
            });
        }),
          t.eachComponent('dataZoom', function (t) {
            var e = t.findRepresentativeAxisProxy();
            if (e) {
              var n = e.getDataPercentWindow(),
                i = e.getDataValueWindow();
              t.setCalculatedRange({ start: n[0], end: n[1], startValue: i[0], endValue: i[1] });
            }
          });
      },
    },
    WD = !1,
    GD = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = n.type), e;
      }
      return (
        e(n, t),
        (n.type = 'dataZoom.slider'),
        (n.layoutMode = 'box'),
        (n.defaultOption = Zs(ID.defaultOption, {
          show: !0,
          right: 'ph',
          top: 'ph',
          width: 'ph',
          height: 'ph',
          left: null,
          bottom: null,
          borderColor: '#d2dbee',
          borderRadius: 3,
          backgroundColor: 'rgba(47,69,84,0)',
          dataBackground: {
            lineStyle: { color: '#d2dbee', width: 0.5 },
            areaStyle: { color: '#d2dbee', opacity: 0.2 },
          },
          selectedDataBackground: {
            lineStyle: { color: '#8fb0f7', width: 0.5 },
            areaStyle: { color: '#8fb0f7', opacity: 0.2 },
          },
          fillerColor: 'rgba(135,175,274,0.2)',
          handleIcon:
            'path://M-9.35,34.56V42m0-40V9.5m-2,0h4a2,2,0,0,1,2,2v21a2,2,0,0,1-2,2h-4a2,2,0,0,1-2-2v-21A2,2,0,0,1-11.35,9.5Z',
          handleSize: '100%',
          handleStyle: { color: '#fff', borderColor: '#ACB8D1' },
          moveHandleSize: 7,
          moveHandleIcon:
            'path://M-320.9-50L-320.9-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-348-41-339-50-320.9-50z M-212.3-50L-212.3-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-239.4-41-230.4-50-212.3-50z M-103.7-50L-103.7-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-130.9-41-121.8-50-103.7-50z',
          moveHandleStyle: { color: '#D2DBEE', opacity: 0.7 },
          showDetail: !0,
          showDataShadow: 'auto',
          realtime: !0,
          zoomLock: !1,
          textStyle: { color: '#6E7079' },
          brushSelect: !0,
          brushStyle: { color: 'rgba(135,175,274,0.15)' },
          emphasis: {
            handleStyle: { borderColor: '#8FB0F7' },
            moveHandleStyle: { color: '#8FB0F7' },
          },
        })),
        n
      );
    })(ID),
    ZD = K_,
    UD = 7,
    XD = 1,
    YD = 30,
    qD = 7,
    jD = 'horizontal',
    KD = 'vertical',
    $D = 5,
    QD = ['line', 'bar', 'candlestick', 'scatter'],
    JD = { easing: 'cubicOut', duration: 100, delay: 0 },
    tI = (function (t) {
      function n() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = n.type), (e._displayables = {}), e;
      }
      return (
        e(n, t),
        (n.prototype.init = function (t, e) {
          (this.api = e),
            (this._onBrush = _v(this._onBrush, this)),
            (this._onBrushEnd = _v(this._onBrushEnd, this));
        }),
        (n.prototype.render = function (e, n, i, r) {
          return (
            t.prototype.render.apply(this, arguments),
            vh(this, '_dispatchZoomAction', e.get('throttle'), 'fixRate'),
            (this._orient = e.getOrient()),
            e.get('show') === !1
              ? void this.group.removeAll()
              : e.noTarget()
              ? (this._clear(), void this.group.removeAll())
              : ((r && 'dataZoom' === r.type && r.from === this.uid) || this._buildView(),
                void this._updateView())
          );
        }),
        (n.prototype.dispose = function () {
          this._clear(), t.prototype.dispose.apply(this, arguments);
        }),
        (n.prototype._clear = function () {
          yh(this, '_dispatchZoomAction');
          var t = this.api.getZr();
          t.off('mousemove', this._onBrush), t.off('mouseup', this._onBrushEnd);
        }),
        (n.prototype._buildView = function () {
          var t = this.group;
          t.removeAll(),
            (this._brushing = !1),
            (this._displayables.brushRect = null),
            this._resetLocation(),
            this._resetInterval();
          var e = (this._displayables.sliderGroup = new wm());
          this._renderBackground(),
            this._renderHandle(),
            this._renderDataShadow(),
            t.add(e),
            this._positionGroup();
        }),
        (n.prototype._resetLocation = function () {
          var t = this.dataZoomModel,
            e = this.api,
            n = t.get('brushSelect'),
            i = n ? qD : 0,
            r = this._findCoordRect(),
            o = { width: e.getWidth(), height: e.getHeight() },
            a =
              this._orient === jD
                ? {
                    right: o.width - r.x - r.width,
                    top: o.height - YD - UD - i,
                    width: r.width,
                    height: YD,
                  }
                : { right: UD, top: r.y, width: YD, height: r.height },
            s = Al(t.option);
          v(['right', 'top', 'width', 'height'], function (t) {
            'ph' === s[t] && (s[t] = a[t]);
          });
          var l = kl(s, o);
          (this._location = { x: l.x, y: l.y }),
            (this._size = [l.width, l.height]),
            this._orient === KD && this._size.reverse();
        }),
        (n.prototype._positionGroup = function () {
          var t = this.group,
            e = this._location,
            n = this._orient,
            i = this.dataZoomModel.getFirstTargetAxisModel(),
            r = i && i.get('inverse'),
            o = this._displayables.sliderGroup,
            a = (this._dataShadowInfo || {}).otherAxisInverse;
          o.attr(
            n !== jD || r
              ? n === jD && r
                ? { scaleY: a ? 1 : -1, scaleX: -1 }
                : n !== KD || r
                ? { scaleY: a ? -1 : 1, scaleX: -1, rotation: Math.PI / 2 }
                : { scaleY: a ? -1 : 1, scaleX: 1, rotation: Math.PI / 2 }
              : { scaleY: a ? 1 : -1, scaleX: 1 }
          );
          var s = t.getBoundingRect([o]);
          (t.x = e.x - s.x), (t.y = e.y - s.y), t.markRedraw();
        }),
        (n.prototype._getViewExtent = function () {
          return [0, this._size[0]];
        }),
        (n.prototype._renderBackground = function () {
          var t = this.dataZoomModel,
            e = this._size,
            n = this._displayables.sliderGroup,
            i = t.get('brushSelect');
          n.add(
            new ZD({
              silent: !0,
              shape: { x: 0, y: 0, width: e[0], height: e[1] },
              style: { fill: t.get('backgroundColor') },
              z2: -40,
            })
          );
          var r = new ZD({
              shape: { x: 0, y: 0, width: e[0], height: e[1] },
              style: { fill: 'transparent' },
              z2: 0,
              onclick: _v(this._onClickPanel, this),
            }),
            o = this.api.getZr();
          i
            ? (r.on('mousedown', this._onBrushStart, this),
              (r.cursor = 'crosshair'),
              o.on('mousemove', this._onBrush),
              o.on('mouseup', this._onBrushEnd))
            : (o.off('mousemove', this._onBrush), o.off('mouseup', this._onBrushEnd)),
            n.add(r);
        }),
        (n.prototype._renderDataShadow = function () {
          function t(t) {
            var e = _.getModel(t ? 'selectedDataBackground' : 'dataBackground'),
              n = new wm(),
              i = new iw({
                shape: { points: s },
                segmentIgnoreThreshold: 1,
                style: e.getModel('areaStyle').getAreaStyle(),
                silent: !0,
                z2: -20,
              }),
              r = new ow({
                shape: { points: l },
                segmentIgnoreThreshold: 1,
                style: e.getModel('lineStyle').getLineStyle(),
                silent: !0,
                z2: -19,
              });
            return n.add(i), n.add(r), n;
          }
          var e = (this._dataShadowInfo = this._prepareDataShadowInfo());
          if (((this._displayables.dataShadowSegs = []), e)) {
            var n = this._size,
              i = this._shadowSize || [],
              r = e.series,
              o = r.getRawData(),
              a = r.getShadowDim ? r.getShadowDim() : e.otherDim;
            if (null != a) {
              var s = this._shadowPolygonPts,
                l = this._shadowPolylinePts;
              if (
                o !== this._shadowData ||
                a !== this._shadowDim ||
                n[0] !== i[0] ||
                n[1] !== i[1]
              ) {
                var u = o.getDataExtent(a),
                  h = 0.3 * (u[1] - u[0]);
                u = [u[0] - h, u[1] + h];
                var c,
                  p = [0, n[1]],
                  f = [0, n[0]],
                  d = [
                    [n[0], 0],
                    [0, 0],
                  ],
                  g = [],
                  v = f[1] / (o.count() - 1),
                  y = 0,
                  m = Math.round(o.count() / n[0]);
                o.each([a], function (t, e) {
                  if (m > 0 && e % m) return void (y += v);
                  var n = null == t || isNaN(t) || '' === t,
                    i = n ? 0 : Fi(t, u, p, !0);
                  n && !c && e
                    ? (d.push([d[d.length - 1][0], 0]), g.push([g[g.length - 1][0], 0]))
                    : !n && c && (d.push([y, 0]), g.push([y, 0])),
                    d.push([y, i]),
                    g.push([y, i]),
                    (y += v),
                    (c = n);
                }),
                  (s = this._shadowPolygonPts = d),
                  (l = this._shadowPolylinePts = g);
              }
              (this._shadowData = o), (this._shadowDim = a), (this._shadowSize = [n[0], n[1]]);
              for (var _ = this.dataZoomModel, x = 0; 3 > x; x++) {
                var w = t(1 === x);
                this._displayables.sliderGroup.add(w), this._displayables.dataShadowSegs.push(w);
              }
            }
          }
        }),
        (n.prototype._prepareDataShadowInfo = function () {
          var t = this.dataZoomModel,
            e = t.get('showDataShadow');
          if (e !== !1) {
            var n,
              i = this.ecModel;
            return (
              t.eachTargetAxis(function (r, o) {
                var a = t.getAxisProxy(r, o).getTargetSeriesModels();
                v(
                  a,
                  function (t) {
                    if (!(n || (e !== !0 && p(QD, t.get('type')) < 0))) {
                      var a,
                        s = i.getComponent(_g(r), o).axis,
                        l = Zg(r),
                        u = t.coordinateSystem;
                      null != l && u.getOtherAxis && (a = u.getOtherAxis(s).inverse),
                        (l = t.getData().mapDimension(l)),
                        (n = {
                          thisAxis: s,
                          series: t,
                          thisDim: r,
                          otherDim: l,
                          otherAxisInverse: a,
                        });
                    }
                  },
                  this
                );
              }, this),
              n
            );
          }
        }),
        (n.prototype._renderHandle = function () {
          var t = this.group,
            e = this._displayables,
            n = (e.handles = [null, null]),
            i = (e.handleLabels = [null, null]),
            r = this._displayables.sliderGroup,
            o = this._size,
            a = this.dataZoomModel,
            s = this.api,
            l = a.get('borderRadius') || 0,
            u = a.get('brushSelect'),
            h = (e.filler = new ZD({
              silent: u,
              style: { fill: a.get('fillerColor') },
              textConfig: { position: 'inside' },
            }));
          r.add(h),
            r.add(
              new ZD({
                silent: !0,
                subPixelOptimize: !0,
                shape: { x: 0, y: 0, width: o[0], height: o[1], r: l },
                style: {
                  stroke: a.get('dataBackgroundColor') || a.get('borderColor'),
                  lineWidth: XD,
                  fill: 'rgba(0,0,0,0)',
                },
              })
            ),
            v(
              [0, 1],
              function (e) {
                var o = a.get('handleIcon');
                !bM[o] &&
                  o.indexOf('path://') < 0 &&
                  o.indexOf('image://') < 0 &&
                  (o = 'path://' + o);
                var s = zh(o, -1, 0, 2, 2, null, !0);
                s.attr({
                  cursor: Ug(this._orient),
                  draggable: !0,
                  drift: _v(this._onDragMove, this, e),
                  ondragend: _v(this._onDragEnd, this),
                  onmouseover: _v(this._showDataInfo, this, !0),
                  onmouseout: _v(this._showDataInfo, this, !1),
                  z2: 5,
                });
                var l = s.getBoundingRect(),
                  u = a.get('handleSize');
                (this._handleHeight = Vi(u, this._size[1])),
                  (this._handleWidth = (l.width / l.height) * this._handleHeight),
                  s.setStyle(a.getModel('handleStyle').getItemStyle()),
                  (s.style.strokeNoScale = !0),
                  (s.rectHover = !0),
                  (s.ensureState('emphasis').style = a
                    .getModel(['emphasis', 'handleStyle'])
                    .getItemStyle()),
                  Ta(s);
                var h = a.get('handleColor');
                null != h && (s.style.fill = h), r.add((n[e] = s));
                var c = a.getModel('textStyle');
                t.add(
                  (i[e] = new tx({
                    silent: !0,
                    invisible: !0,
                    style: Os(c, {
                      x: 0,
                      y: 0,
                      text: '',
                      verticalAlign: 'middle',
                      align: 'center',
                      fill: c.getTextColor(),
                      font: c.getFont(),
                    }),
                    z2: 10,
                  }))
                );
              },
              this
            );
          var c = h;
          if (u) {
            var p = Vi(a.get('moveHandleSize'), o[1]),
              f = (e.moveHandle = new K_({
                style: a.getModel('moveHandleStyle').getItemStyle(),
                silent: !0,
                shape: { r: [0, 0, 2, 2], y: o[1] - 0.5, height: p },
              })),
              d = 0.8 * p,
              g = (e.moveHandleIcon = zh(
                a.get('moveHandleIcon'),
                -d / 2,
                -d / 2,
                d,
                d,
                '#fff',
                !0
              ));
            (g.silent = !0),
              (g.y = o[1] + p / 2 - 0.5),
              (f.ensureState('emphasis').style = a
                .getModel(['emphasis', 'moveHandleStyle'])
                .getItemStyle());
            var y = Math.min(o[1] / 2, Math.max(p, 10));
            (c = e.moveZone = new K_({ invisible: !0, shape: { y: o[1] - y, height: p + y } })),
              c
                .on('mouseover', function () {
                  s.enterEmphasis(f);
                })
                .on('mouseout', function () {
                  s.leaveEmphasis(f);
                }),
              r.add(f),
              r.add(g),
              r.add(c);
          }
          c.attr({
            draggable: !0,
            cursor: Ug(this._orient),
            drift: _v(this._onDragMove, this, 'all'),
            ondragstart: _v(this._showDataInfo, this, !0),
            ondragend: _v(this._onDragEnd, this),
            onmouseover: _v(this._showDataInfo, this, !0),
            onmouseout: _v(this._showDataInfo, this, !1),
          });
        }),
        (n.prototype._resetInterval = function () {
          var t = (this._range = this.dataZoomModel.getPercentRange()),
            e = this._getViewExtent();
          this._handleEnds = [Fi(t[0], [0, 100], e, !0), Fi(t[1], [0, 100], e, !0)];
        }),
        (n.prototype._updateInterval = function (t, e) {
          var n = this.dataZoomModel,
            i = this._handleEnds,
            r = this._getViewExtent(),
            o = n.findRepresentativeAxisProxy().getMinMaxSpan(),
            a = [0, 100];
          Sg(
            e,
            i,
            r,
            n.get('zoomLock') ? 'all' : t,
            null != o.minSpan ? Fi(o.minSpan, a, r, !0) : null,
            null != o.maxSpan ? Fi(o.maxSpan, a, r, !0) : null
          );
          var s = this._range,
            l = (this._range = Wi([Fi(i[0], r, a, !0), Fi(i[1], r, a, !0)]));
          return !s || s[0] !== l[0] || s[1] !== l[1];
        }),
        (n.prototype._updateView = function (t) {
          var e = this._displayables,
            n = this._handleEnds,
            i = Wi(n.slice()),
            r = this._size;
          v(
            [0, 1],
            function (t) {
              var i = e.handles[t],
                o = this._handleHeight;
              i.attr({ scaleX: o / 2, scaleY: o / 2, x: n[t] + (t ? -1 : 1), y: r[1] / 2 - o / 2 });
            },
            this
          ),
            e.filler.setShape({ x: i[0], y: 0, width: i[1] - i[0], height: r[1] });
          var o = { x: i[0], width: i[1] - i[0] };
          e.moveHandle &&
            (e.moveHandle.setShape(o),
            e.moveZone.setShape(o),
            e.moveZone.getBoundingRect(),
            e.moveHandleIcon && e.moveHandleIcon.attr('x', o.x + o.width / 2));
          for (var a = e.dataShadowSegs, s = [0, i[0], i[1], r[0]], l = 0; l < a.length; l++) {
            var u = a[l],
              h = u.getClipPath();
            h || ((h = new K_()), u.setClipPath(h)),
              h.setShape({ x: s[l], y: 0, width: s[l + 1] - s[l], height: r[1] });
          }
          this._updateDataInfo(t);
        }),
        (n.prototype._updateDataInfo = function (t) {
          function e(t) {
            var e = ys(i.handles[t].parent, this.group),
              n = _s(0 === t ? 'right' : 'left', e),
              s = this._handleWidth / 2 + $D,
              l = ms([c[t] + (0 === t ? -s : s), this._size[1] / 2], e);
            r[t].setStyle({
              x: l[0],
              y: l[1],
              verticalAlign: o === jD ? 'middle' : n,
              align: o === jD ? n : 'center',
              text: a[t],
            });
          }
          var n = this.dataZoomModel,
            i = this._displayables,
            r = i.handleLabels,
            o = this._orient,
            a = ['', ''];
          if (n.get('showDetail')) {
            var s = n.findRepresentativeAxisProxy();
            if (s) {
              var l = s.getAxisModel().axis,
                u = this._range,
                h = t
                  ? s.calculateDataWindow({ start: u[0], end: u[1] }).valueWindow
                  : s.getDataValueWindow();
              a = [this._formatLabel(h[0], l), this._formatLabel(h[1], l)];
            }
          }
          var c = Wi(this._handleEnds.slice());
          e.call(this, 0), e.call(this, 1);
        }),
        (n.prototype._formatLabel = function (t, e) {
          var n = this.dataZoomModel,
            i = n.get('labelFormatter'),
            r = n.get('labelPrecision');
          (null == r || 'auto' === r) && (r = e.getPixelPrecision());
          var o =
            null == t || isNaN(t)
              ? ''
              : 'category' === e.type || 'time' === e.type
              ? e.scale.getLabel({ value: Math.round(t) })
              : t.toFixed(Math.min(r, 20));
          return T(i) ? i(t, o) : C(i) ? i.replace('{value}', o) : o;
        }),
        (n.prototype._showDataInfo = function (t) {
          t = this._dragging || t;
          var e = this._displayables,
            n = e.handleLabels;
          n[0].attr('invisible', !t),
            n[1].attr('invisible', !t),
            e.moveHandle && this.api[t ? 'enterEmphasis' : 'leaveEmphasis'](e.moveHandle, 1);
        }),
        (n.prototype._onDragMove = function (t, e, n, i) {
          (this._dragging = !0), zv(i.event);
          var r = this._displayables.sliderGroup.getLocalTransform(),
            o = ms([e, n], r, !0),
            a = this._updateInterval(t, o[0]),
            s = this.dataZoomModel.get('realtime');
          this._updateView(!s), a && s && this._dispatchZoomAction(!0);
        }),
        (n.prototype._onDragEnd = function () {
          (this._dragging = !1), this._showDataInfo(!1);
          var t = this.dataZoomModel.get('realtime');
          !t && this._dispatchZoomAction(!1);
        }),
        (n.prototype._onClickPanel = function (t) {
          var e = this._size,
            n = this._displayables.sliderGroup.transformCoordToLocal(t.offsetX, t.offsetY);
          if (!(n[0] < 0 || n[0] > e[0] || n[1] < 0 || n[1] > e[1])) {
            var i = this._handleEnds,
              r = (i[0] + i[1]) / 2,
              o = this._updateInterval('all', n[0] - r);
            this._updateView(), o && this._dispatchZoomAction(!1);
          }
        }),
        (n.prototype._onBrushStart = function (t) {
          var e = t.offsetX,
            n = t.offsetY;
          (this._brushStart = new rm(e, n)),
            (this._brushing = !0),
            (this._brushStartTime = +new Date());
        }),
        (n.prototype._onBrushEnd = function () {
          if (this._brushing) {
            var t = this._displayables.brushRect;
            if (((this._brushing = !1), t)) {
              t.attr('ignore', !0);
              var e = t.shape,
                n = +new Date();
              if (!(n - this._brushStartTime < 200 && Math.abs(e.width) < 5)) {
                var i = this._getViewExtent(),
                  r = [0, 100];
                (this._range = Wi([Fi(e.x, i, r, !0), Fi(e.x + e.width, i, r, !0)])),
                  (this._handleEnds = [e.x, e.x + e.width]),
                  this._updateView(),
                  this._dispatchZoomAction(!1);
              }
            }
          }
        }),
        (n.prototype._onBrush = function (t) {
          this._brushing && (zv(t.event), this._updateBrushRect(t.offsetX, t.offsetY));
        }),
        (n.prototype._updateBrushRect = function (t, e) {
          var n = this._displayables,
            i = this.dataZoomModel,
            r = n.brushRect;
          r ||
            ((r = n.brushRect =
              new ZD({ silent: !0, style: i.getModel('brushStyle').getItemStyle() })),
            n.sliderGroup.add(r)),
            r.attr('ignore', !1);
          var o = this._brushStart,
            a = this._displayables.sliderGroup,
            s = a.transformCoordToLocal(t, e),
            l = a.transformCoordToLocal(o.x, o.y),
            u = this._size;
          (s[0] = Math.max(Math.min(u[0], s[0]), 0)),
            r.setShape({ x: l[0], y: 0, width: s[0] - l[0], height: u[1] });
        }),
        (n.prototype._dispatchZoomAction = function (t) {
          var e = this._range;
          this.api.dispatchAction({
            type: 'dataZoom',
            from: this.uid,
            dataZoomId: this.dataZoomModel.id,
            animation: t ? JD : null,
            start: e[0],
            end: e[1],
          });
        }),
        (n.prototype._findCoordRect = function () {
          var t,
            e = wg(this.dataZoomModel).infoList;
          if (!t && e.length) {
            var n = e[0].model.coordinateSystem;
            t = n.getRect && n.getRect();
          }
          if (!t) {
            var i = this.api.getWidth(),
              r = this.api.getHeight();
            t = { x: 0.2 * i, y: 0.2 * r, width: 0.6 * i, height: 0.6 * r };
          }
          return t;
        }),
        (n.type = 'dataZoom.slider'),
        n
      );
    })(LD);
  mf(Yg),
    (t.version = zM),
    (t.dependencies = NM),
    (t.PRIORITY = eT),
    (t.init = Cc),
    (t.connect = kc),
    (t.disConnect = Dc),
    (t.disconnect = UT),
    (t.dispose = Ic),
    (t.getInstanceByDom = Ac),
    (t.getInstanceById = Lc),
    (t.registerTheme = Pc),
    (t.registerPreprocessor = Oc),
    (t.registerProcessor = Rc),
    (t.registerPostInit = Ec),
    (t.registerPostUpdate = Bc),
    (t.registerUpdateLifecycle = zc),
    (t.registerAction = Nc),
    (t.registerCoordinateSystem = Fc),
    (t.getCoordinateSystemDimensions = Vc),
    (t.registerLayout = Hc),
    (t.registerVisual = Wc),
    (t.registerLoading = Zc),
    (t.setCanvasCreator = Uc),
    (t.registerMap = Xc),
    (t.getMap = Yc),
    (t.registerTransform = YT),
    (t.dataTool = eC),
    (t.registerLocale = Us),
    (t.zrender = Cm),
    (t.matrix = jy),
    (t.vector = Dv),
    (t.zrUtil = Sv),
    (t.color = xy),
    (t.helper = ZC),
    (t.number = JC),
    (t.time = tk),
    (t.graphic = ek),
    (t.format = nk),
    (t.util = ik),
    (t.List = gC),
    (t.ComponentModel = wb),
    (t.ComponentView = RS),
    (t.SeriesModel = OS),
    (t.ChartView = zS),
    (t.extendComponentModel = Zf),
    (t.extendComponentView = Uf),
    (t.extendSeriesModel = Xf),
    (t.extendChartView = Yf),
    (t.throttle = gh),
    (t.use = mf),
    (t.setPlatformAPI = r),
    (t.parseGeoJSON = kf),
    (t.parseGeoJson = kf),
    (t.env = $g),
    (t.Model = Xw),
    (t.Axis = ak),
    (t.innerDrawElementOnCanvas = cc);
});
