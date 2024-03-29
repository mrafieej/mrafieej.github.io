/*!
  * Bootstrap v4.3.1
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, function(t, g, u) {
    "use strict";
    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }
    function s(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }
    function e(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t && (i = i.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), n.push.apply(n, i)
        }
        return n
    }
    function l(o) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? e(Object(r), !0).forEach(function(t) {
                var e,
                    n,
                    i;
                e = o, i = r[n = t], n in e ? Object.defineProperty(e, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(r)) : e(Object(r)).forEach(function(t) {
                Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return o
    }
    g = g && g.hasOwnProperty("default") ? g.default : g, u = u && u.hasOwnProperty("default") ? u.default : u;
    var n = "transitionend";
    function o(t) {
        var e = this,
            n = !1;
        return g(this).one(_.TRANSITION_END, function() {
            n = !0
        }), setTimeout(function() {
            n || _.triggerTransitionEnd(e)
        }, t), this
    }
    var _ = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function(t) {
            for (; t += ~~(1e6 * Math.random()), document.getElementById(t);)
                ;
            return t
        },
        getSelectorFromElement: function(t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                e = n && "#" !== n ? n.trim() : ""
            }
            try {
                return document.querySelector(e) ? e : null
            } catch (t) {
                return null
            }
        },
        getTransitionDurationFromElement: function(t) {
            if (!t)
                return 0;
            var e = g(t).css("transition-duration"),
                n = g(t).css("transition-delay"),
                i = parseFloat(e),
                o = parseFloat(n);
            return i || o ? (e = e.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(e) + parseFloat(n))) : 0
        },
        reflow: function(t) {
            return t.offsetHeight
        },
        triggerTransitionEnd: function(t) {
            g(t).trigger(n)
        },
        supportsTransitionEnd: function() {
            return Boolean(n)
        },
        isElement: function(t) {
            return (t[0] || t).nodeType
        },
        typeCheckConfig: function(t, e, n) {
            for (var i in n)
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    var o = n[i],
                        r = e[i],
                        s = r && _.isElement(r) ? "element" : (a = r, {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
                    if (!new RegExp(o).test(s))
                        throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".')
                }
            var a
        },
        findShadowRoot: function(t) {
            if (!document.documentElement.attachShadow)
                return null;
            if ("function" != typeof t.getRootNode)
                return t instanceof ShadowRoot ? t : t.parentNode ? _.findShadowRoot(t.parentNode) : null;
            var e = t.getRootNode();
            return e instanceof ShadowRoot ? e : null
        }
    };
    g.fn.emulateTransitionEnd = o, g.event.special[_.TRANSITION_END] = {
        bindType: n,
        delegateType: n,
        handle: function(t) {
            if (g(t.target).is(this))
                return t.handleObj.handler.apply(this, arguments)
        }
    };
    var r = "alert",
        a = "bs.alert",
        c = "." + a,
        h = g.fn[r],
        f = {
            CLOSE: "close" + c,
            CLOSED: "closed" + c,
            CLICK_DATA_API: "click" + c + ".data-api"
        },
        d = "alert",
        m = "fade",
        p = "show",
        v = function() {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.close = function(t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, t.dispose = function() {
                g.removeData(this._element, a), this._element = null
            }, t._getRootElement = function(t) {
                var e = _.getSelectorFromElement(t),
                    n = !1;
                return e && (n = document.querySelector(e)), n = n || g(t).closest("." + d)[0]
            }, t._triggerCloseEvent = function(t) {
                var e = g.Event(f.CLOSE);
                return g(t).trigger(e), e
            }, t._removeElement = function(e) {
                var n = this;
                if (g(e).removeClass(p), g(e).hasClass(m)) {
                    var t = _.getTransitionDurationFromElement(e);
                    g(e).one(_.TRANSITION_END, function(t) {
                        return n._destroyElement(e, t)
                    }).emulateTransitionEnd(t)
                } else
                    this._destroyElement(e)
            }, t._destroyElement = function(t) {
                g(t).detach().trigger(f.CLOSED).remove()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(a);
                    e || (e = new i(this), t.data(a, e)), "close" === n && e[n](this)
                })
            }, i._handleDismiss = function(e) {
                return function(t) {
                    t && t.preventDefault(), e.close(this)
                }
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }]), i
        }();
    g(document).on(f.CLICK_DATA_API, '[data-dismiss="alert"]', v._handleDismiss(new v)), g.fn[r] = v._jQueryInterface, g.fn[r].Constructor = v, g.fn[r].noConflict = function() {
        return g.fn[r] = h, v._jQueryInterface
    };
    var E = "button",
        y = "bs.button",
        C = "." + y,
        T = ".data-api",
        b = g.fn[E],
        S = "active",
        I = "btn",
        D = "focus",
        w = '[data-toggle^="button"]',
        A = '[data-toggle="buttons"]',
        N = 'input:not([type="hidden"])',
        O = ".active",
        k = ".btn",
        P = {
            CLICK_DATA_API: "click" + C + T,
            FOCUS_BLUR_DATA_API: "focus" + C + T + " blur" + C + T
        },
        L = function() {
            function n(t) {
                this._element = t
            }
            var t = n.prototype;
            return t.toggle = function() {
                var t = !0,
                    e = !0,
                    n = g(this._element).closest(A)[0];
                if (n) {
                    var i = this._element.querySelector(N);
                    if (i) {
                        if ("radio" === i.type)
                            if (i.checked && this._element.classList.contains(S))
                                t = !1;
                            else {
                                var o = n.querySelector(O);
                                o && g(o).removeClass(S)
                            }
                        if (t) {
                            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled"))
                                return;
                            i.checked = !this._element.classList.contains(S), g(i).trigger("change")
                        }
                        i.focus(), e = !1
                    }
                }
                e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(S)), t && g(this._element).toggleClass(S)
            }, t.dispose = function() {
                g.removeData(this._element, y), this._element = null
            }, n._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = g(this).data(y);
                    t || (t = new n(this), g(this).data(y, t)), "toggle" === e && t[e]()
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }]), n
        }();
    g(document).on(P.CLICK_DATA_API, w, function(t) {
        t.preventDefault();
        var e = t.target;
        g(e).hasClass(I) || (e = g(e).closest(k)), L._jQueryInterface.call(g(e), "toggle")
    }).on(P.FOCUS_BLUR_DATA_API, w, function(t) {
        var e = g(t.target).closest(k)[0];
        g(e).toggleClass(D, /^focus(in)?$/.test(t.type))
    }), g.fn[E] = L._jQueryInterface, g.fn[E].Constructor = L, g.fn[E].noConflict = function() {
        return g.fn[E] = b, L._jQueryInterface
    };
    var j = "carousel",
        H = "bs.carousel",
        R = "." + H,
        x = ".data-api",
        F = g.fn[j],
        U = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        W = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        q = "next",
        M = "prev",
        K = "left",
        Q = "right",
        B = {
            SLIDE: "slide" + R,
            SLID: "slid" + R,
            KEYDOWN: "keydown" + R,
            MOUSEENTER: "mouseenter" + R,
            MOUSELEAVE: "mouseleave" + R,
            TOUCHSTART: "touchstart" + R,
            TOUCHMOVE: "touchmove" + R,
            TOUCHEND: "touchend" + R,
            POINTERDOWN: "pointerdown" + R,
            POINTERUP: "pointerup" + R,
            DRAG_START: "dragstart" + R,
            LOAD_DATA_API: "load" + R + x,
            CLICK_DATA_API: "click" + R + x
        },
        V = "carousel",
        Y = "active",
        z = "slide",
        X = "carousel-item-right",
        $ = "carousel-item-left",
        G = "carousel-item-next",
        J = "carousel-item-prev",
        Z = "pointer-event",
        tt = ".active",
        et = ".active.carousel-item",
        nt = ".carousel-item",
        it = ".carousel-item img",
        ot = ".carousel-item-next, .carousel-item-prev",
        rt = ".carousel-indicators",
        st = "[data-slide], [data-slide-to]",
        at = '[data-ride="carousel"]',
        lt = {
            TOUCH: "touch",
            PEN: "pen"
        },
        ct = function() {
            function r(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(rt), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
            }
            var t = r.prototype;
            return t.next = function() {
                this._isSliding || this._slide(q)
            }, t.nextWhenVisible = function() {
                !document.hidden && g(this._element).is(":visible") && "hidden" !== g(this._element).css("visibility") && this.next()
            }, t.prev = function() {
                this._isSliding || this._slide(M)
            }, t.pause = function(t) {
                t || (this._isPaused = !0), this._element.querySelector(ot) && (_.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, t.cycle = function(t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, t.to = function(t) {
                var e = this;
                this._activeElement = this._element.querySelector(et);
                var n = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding)
                        g(this._element).one(B.SLID, function() {
                            return e.to(t)
                        });
                    else {
                        if (n === t)
                            return this.pause(), void this.cycle();
                        var i = n < t ? q : M;
                        this._slide(i, this._items[t])
                    }
            }, t.dispose = function() {
                g(this._element).off(R), g.removeData(this._element, H), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, t._getConfig = function(t) {
                return t = l({}, U, {}, t), _.typeCheckConfig(j, t, W), t
            }, t._handleSwipe = function() {
                var t = Math.abs(this.touchDeltaX);
                if (!(t <= 40)) {
                    var e = t / this.touchDeltaX;
                    0 < e && this.prev(), e < 0 && this.next()
                }
            }, t._addEventListeners = function() {
                var e = this;
                this._config.keyboard && g(this._element).on(B.KEYDOWN, function(t) {
                    return e._keydown(t)
                }), "hover" === this._config.pause && g(this._element).on(B.MOUSEENTER, function(t) {
                    return e.pause(t)
                }).on(B.MOUSELEAVE, function(t) {
                    return e.cycle(t)
                }), this._config.touch && this._addTouchEventListeners()
            }, t._addTouchEventListeners = function() {
                var n = this;
                if (this._touchSupported) {
                    var e = function(t) {
                            n._pointerEvent && lt[t.originalEvent.pointerType.toUpperCase()] ? n.touchStartX = t.originalEvent.clientX : n._pointerEvent || (n.touchStartX = t.originalEvent.touches[0].clientX)
                        },
                        i = function(t) {
                            n._pointerEvent && lt[t.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = t.originalEvent.clientX - n.touchStartX), n._handleSwipe(), "hover" === n._config.pause && (n.pause(), n.touchTimeout && clearTimeout(n.touchTimeout), n.touchTimeout = setTimeout(function(t) {
                                return n.cycle(t)
                            }, 500 + n._config.interval))
                        };
                    g(this._element.querySelectorAll(it)).on(B.DRAG_START, function(t) {
                        return t.preventDefault()
                    }), this._pointerEvent ? (g(this._element).on(B.POINTERDOWN, function(t) {
                        return e(t)
                    }), g(this._element).on(B.POINTERUP, function(t) {
                        return i(t)
                    }), this._element.classList.add(Z)) : (g(this._element).on(B.TOUCHSTART, function(t) {
                        return e(t)
                    }), g(this._element).on(B.TOUCHMOVE, function(t) {
                        var e;
                        (e = t).originalEvent.touches && 1 < e.originalEvent.touches.length ? n.touchDeltaX = 0 : n.touchDeltaX = e.originalEvent.touches[0].clientX - n.touchStartX
                    }), g(this._element).on(B.TOUCHEND, function(t) {
                        return i(t)
                    }))
                }
            }, t._keydown = function(t) {
                if (!/input|textarea/i.test(t.target.tagName))
                    switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                    }
            }, t._getItemIndex = function(t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(nt)) : [], this._items.indexOf(t)
            }, t._getItemByDirection = function(t, e) {
                var n = t === q,
                    i = t === M,
                    o = this._getItemIndex(e),
                    r = this._items.length - 1;
                if ((i && 0 === o || n && o === r) && !this._config.wrap)
                    return e;
                var s = (o + (t === M ? -1 : 1)) % this._items.length;
                return -1 == s ? this._items[this._items.length - 1] : this._items[s]
            }, t._triggerSlideEvent = function(t, e) {
                var n = this._getItemIndex(t),
                    i = this._getItemIndex(this._element.querySelector(et)),
                    o = g.Event(B.SLIDE, {
                        relatedTarget: t,
                        direction: e,
                        from: i,
                        to: n
                    });
                return g(this._element).trigger(o), o
            }, t._setActiveIndicatorElement = function(t) {
                if (this._indicatorsElement) {
                    var e = [].slice.call(this._indicatorsElement.querySelectorAll(tt));
                    g(e).removeClass(Y);
                    var n = this._indicatorsElement.children[this._getItemIndex(t)];
                    n && g(n).addClass(Y)
                }
            }, t._slide = function(t, e) {
                var n,
                    i,
                    o,
                    r = this,
                    s = this._element.querySelector(et),
                    a = this._getItemIndex(s),
                    l = e || s && this._getItemByDirection(t, s),
                    c = this._getItemIndex(l),
                    h = Boolean(this._interval);
                if (o = t === q ? (n = $, i = G, K) : (n = X, i = J, Q), l && g(l).hasClass(Y))
                    this._isSliding = !1;
                else if (!this._triggerSlideEvent(l, o).isDefaultPrevented() && s && l) {
                    this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(l);
                    var u = g.Event(B.SLID, {
                        relatedTarget: l,
                        direction: o,
                        from: a,
                        to: c
                    });
                    if (g(this._element).hasClass(z)) {
                        g(l).addClass(i), _.reflow(l), g(s).addClass(n), g(l).addClass(n);
                        var f = parseInt(l.getAttribute("data-interval"), 10);
                        f ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = f) : this._config.interval = this._config.defaultInterval || this._config.interval;
                        var d = _.getTransitionDurationFromElement(s);
                        g(s).one(_.TRANSITION_END, function() {
                            g(l).removeClass(n + " " + i).addClass(Y), g(s).removeClass(Y + " " + i + " " + n), r._isSliding = !1, setTimeout(function() {
                                return g(r._element).trigger(u)
                            }, 0)
                        }).emulateTransitionEnd(d)
                    } else
                        g(s).removeClass(Y), g(l).addClass(Y), this._isSliding = !1, g(this._element).trigger(u);
                    h && this.cycle()
                }
            }, r._jQueryInterface = function(i) {
                return this.each(function() {
                    var t = g(this).data(H),
                        e = l({}, U, {}, g(this).data());
                    "object" == typeof i && (e = l({}, e, {}, i));
                    var n = "string" == typeof i ? i : e.slide;
                    if (t || (t = new r(this, e), g(this).data(H, t)), "number" == typeof i)
                        t.to(i);
                    else if ("string" == typeof n) {
                        if (void 0 === t[n])
                            throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    } else
                        e.interval && e.ride && (t.pause(), t.cycle())
                })
            }, r._dataApiClickHandler = function(t) {
                var e = _.getSelectorFromElement(this);
                if (e) {
                    var n = g(e)[0];
                    if (n && g(n).hasClass(V)) {
                        var i = l({}, g(n).data(), {}, g(this).data()),
                            o = this.getAttribute("data-slide-to");
                        o && (i.interval = !1), r._jQueryInterface.call(g(n), i), o && g(n).data(H).to(o), t.preventDefault()
                    }
                }
            }, s(r, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return U
                }
            }]), r
        }();
    g(document).on(B.CLICK_DATA_API, st, ct._dataApiClickHandler), g(window).on(B.LOAD_DATA_API, function() {
        for (var t = [].slice.call(document.querySelectorAll(at)), e = 0, n = t.length; e < n; e++) {
            var i = g(t[e]);
            ct._jQueryInterface.call(i, i.data())
        }
    }), g.fn[j] = ct._jQueryInterface, g.fn[j].Constructor = ct, g.fn[j].noConflict = function() {
        return g.fn[j] = F, ct._jQueryInterface
    };
    var ht = "collapse",
        ut = "bs.collapse",
        ft = "." + ut,
        dt = g.fn[ht],
        gt = {
            toggle: !0,
            parent: ""
        },
        _t = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        mt = {
            SHOW: "show" + ft,
            SHOWN: "shown" + ft,
            HIDE: "hide" + ft,
            HIDDEN: "hidden" + ft,
            CLICK_DATA_API: "click" + ft + ".data-api"
        },
        pt = "show",
        vt = "collapse",
        Et = "collapsing",
        yt = "collapsed",
        Ct = "width",
        Tt = "height",
        bt = ".show, .collapsing",
        St = '[data-toggle="collapse"]',
        It = function() {
            function a(e, t) {
                this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(St)), i = 0, o = n.length; i < o; i++) {
                    var r = n[i],
                        s = _.getSelectorFromElement(r),
                        a = [].slice.call(document.querySelectorAll(s)).filter(function(t) {
                            return t === e
                        });
                    null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(r))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var t = a.prototype;
            return t.toggle = function() {
                g(this._element).hasClass(pt) ? this.hide() : this.show()
            }, t.show = function() {
                var t,
                    e,
                    n = this;
                if (!this._isTransitioning && !g(this._element).hasClass(pt) && (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(bt)).filter(function(t) {
                    return "string" == typeof n._config.parent ? t.getAttribute("data-parent") === n._config.parent : t.classList.contains(vt)
                })).length && (t = null), !(t && (e = g(t).not(this._selector).data(ut)) && e._isTransitioning))) {
                    var i = g.Event(mt.SHOW);
                    if (g(this._element).trigger(i), !i.isDefaultPrevented()) {
                        t && (a._jQueryInterface.call(g(t).not(this._selector), "hide"), e || g(t).data(ut, null));
                        var o = this._getDimension();
                        g(this._element).removeClass(vt).addClass(Et), this._element.style[o] = 0, this._triggerArray.length && g(this._triggerArray).removeClass(yt).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var r = "scroll" + (o[0].toUpperCase() + o.slice(1)),
                            s = _.getTransitionDurationFromElement(this._element);
                        g(this._element).one(_.TRANSITION_END, function() {
                            g(n._element).removeClass(Et).addClass(vt).addClass(pt), n._element.style[o] = "", n.setTransitioning(!1), g(n._element).trigger(mt.SHOWN)
                        }).emulateTransitionEnd(s), this._element.style[o] = this._element[r] + "px"
                    }
                }
            }, t.hide = function() {
                var t = this;
                if (!this._isTransitioning && g(this._element).hasClass(pt)) {
                    var e = g.Event(mt.HIDE);
                    if (g(this._element).trigger(e), !e.isDefaultPrevented()) {
                        var n = this._getDimension();
                        this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", _.reflow(this._element), g(this._element).addClass(Et).removeClass(vt).removeClass(pt);
                        var i = this._triggerArray.length;
                        if (0 < i)
                            for (var o = 0; o < i; o++) {
                                var r = this._triggerArray[o],
                                    s = _.getSelectorFromElement(r);
                                if (null !== s)
                                    g([].slice.call(document.querySelectorAll(s))).hasClass(pt) || g(r).addClass(yt).attr("aria-expanded", !1)
                            }
                        this.setTransitioning(!0);
                        this._element.style[n] = "";
                        var a = _.getTransitionDurationFromElement(this._element);
                        g(this._element).one(_.TRANSITION_END, function() {
                            t.setTransitioning(!1), g(t._element).removeClass(Et).addClass(vt).trigger(mt.HIDDEN)
                        }).emulateTransitionEnd(a)
                    }
                }
            }, t.setTransitioning = function(t) {
                this._isTransitioning = t
            }, t.dispose = function() {
                g.removeData(this._element, ut), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, t._getConfig = function(t) {
                return (t = l({}, gt, {}, t)).toggle = Boolean(t.toggle), _.typeCheckConfig(ht, t, _t), t
            }, t._getDimension = function() {
                return g(this._element).hasClass(Ct) ? Ct : Tt
            }, t._getParent = function() {
                var t,
                    n = this;
                _.isElement(this._config.parent) ? (t = this._config.parent, void 0 !== this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
                var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    i = [].slice.call(t.querySelectorAll(e));
                return g(i).each(function(t, e) {
                    n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e])
                }), t
            }, t._addAriaAndCollapsedClass = function(t, e) {
                var n = g(t).hasClass(pt);
                e.length && g(e).toggleClass(yt, !n).attr("aria-expanded", n)
            }, a._getTargetFromElement = function(t) {
                var e = _.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null
            }, a._jQueryInterface = function(i) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(ut),
                        n = l({}, gt, {}, t.data(), {}, "object" == typeof i && i ? i : {});
                    if (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1), e || (e = new a(this, n), t.data(ut, e)), "string" == typeof i) {
                        if (void 0 === e[i])
                            throw new TypeError('No method named "' + i + '"');
                        e[i]()
                    }
                })
            }, s(a, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return gt
                }
            }]), a
        }();
    g(document).on(mt.CLICK_DATA_API, St, function(t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = g(this),
            e = _.getSelectorFromElement(this),
            i = [].slice.call(document.querySelectorAll(e));
        g(i).each(function() {
            var t = g(this),
                e = t.data(ut) ? "toggle" : n.data();
            It._jQueryInterface.call(t, e)
        })
    }), g.fn[ht] = It._jQueryInterface, g.fn[ht].Constructor = It, g.fn[ht].noConflict = function() {
        return g.fn[ht] = dt, It._jQueryInterface
    };
    var Dt = "dropdown",
        wt = "bs.dropdown",
        At = "." + wt,
        Nt = ".data-api",
        Ot = g.fn[Dt],
        kt = new RegExp("38|40|27"),
        Pt = {
            HIDE: "hide" + At,
            HIDDEN: "hidden" + At,
            SHOW: "show" + At,
            SHOWN: "shown" + At,
            CLICK: "click" + At,
            CLICK_DATA_API: "click" + At + Nt,
            KEYDOWN_DATA_API: "keydown" + At + Nt,
            KEYUP_DATA_API: "keyup" + At + Nt
        },
        Lt = "disabled",
        jt = "show",
        Ht = "dropup",
        Rt = "dropright",
        xt = "dropleft",
        Ft = "dropdown-menu-right",
        Ut = "position-static",
        Wt = '[data-toggle="dropdown"]',
        qt = ".dropdown form",
        Mt = ".dropdown-menu",
        Kt = ".navbar-nav",
        Qt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
        Bt = "top-start",
        Vt = "top-end",
        Yt = "bottom-start",
        zt = "bottom-end",
        Xt = "right-start",
        $t = "left-start",
        Gt = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        },
        Jt = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        },
        Zt = function() {
            function c(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var t = c.prototype;
            return t.toggle = function() {
                if (!this._element.disabled && !g(this._element).hasClass(Lt)) {
                    var t = c._getParentFromElement(this._element),
                        e = g(this._menu).hasClass(jt);
                    if (c._clearMenus(), !e) {
                        var n = {
                                relatedTarget: this._element
                            },
                            i = g.Event(Pt.SHOW, n);
                        if (g(t).trigger(i), !i.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if (void 0 === u)
                                    throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                var o = this._element;
                                "parent" === this._config.reference ? o = t : _.isElement(this._config.reference) && (o = this._config.reference, void 0 !== this._config.reference.jquery && (o = this._config.reference[0])), "scrollParent" !== this._config.boundary && g(t).addClass(Ut), this._popper = new u(o, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === g(t).closest(Kt).length && g(document.body).children().on("mouseover", null, g.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), g(this._menu).toggleClass(jt), g(t).toggleClass(jt).trigger(g.Event(Pt.SHOWN, n))
                        }
                    }
                }
            }, t.show = function() {
                if (!(this._element.disabled || g(this._element).hasClass(Lt) || g(this._menu).hasClass(jt))) {
                    var t = {
                            relatedTarget: this._element
                        },
                        e = g.Event(Pt.SHOW, t),
                        n = c._getParentFromElement(this._element);
                    g(n).trigger(e), e.isDefaultPrevented() || (g(this._menu).toggleClass(jt), g(n).toggleClass(jt).trigger(g.Event(Pt.SHOWN, t)))
                }
            }, t.hide = function() {
                if (!this._element.disabled && !g(this._element).hasClass(Lt) && g(this._menu).hasClass(jt)) {
                    var t = {
                            relatedTarget: this._element
                        },
                        e = g.Event(Pt.HIDE, t),
                        n = c._getParentFromElement(this._element);
                    g(n).trigger(e), e.isDefaultPrevented() || (g(this._menu).toggleClass(jt), g(n).toggleClass(jt).trigger(g.Event(Pt.HIDDEN, t)))
                }
            }, t.dispose = function() {
                g.removeData(this._element, wt), g(this._element).off(At), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, t.update = function() {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, t._addEventListeners = function() {
                var e = this;
                g(this._element).on(Pt.CLICK, function(t) {
                    t.preventDefault(), t.stopPropagation(), e.toggle()
                })
            }, t._getConfig = function(t) {
                return t = l({}, this.constructor.Default, {}, g(this._element).data(), {}, t), _.typeCheckConfig(Dt, t, this.constructor.DefaultType), t
            }, t._getMenuElement = function() {
                if (!this._menu) {
                    var t = c._getParentFromElement(this._element);
                    t && (this._menu = t.querySelector(Mt))
                }
                return this._menu
            }, t._getPlacement = function() {
                var t = g(this._element.parentNode),
                    e = Yt;
                return t.hasClass(Ht) ? (e = Bt, g(this._menu).hasClass(Ft) && (e = Vt)) : t.hasClass(Rt) ? e = Xt : t.hasClass(xt) ? e = $t : g(this._menu).hasClass(Ft) && (e = zt), e
            }, t._detectNavbar = function() {
                return 0 < g(this._element).closest(".navbar").length
            }, t._getOffset = function() {
                var e = this,
                    t = {};
                return "function" == typeof this._config.offset ? t.fn = function(t) {
                    return t.offsets = l({}, t.offsets, {}, e._config.offset(t.offsets, e._element) || {}), t
                } : t.offset = this._config.offset, t
            }, t._getPopperConfig = function() {
                var t = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (t.modifiers.applyStyle = {
                    enabled: !1
                }), t
            }, c._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = g(this).data(wt);
                    if (t || (t = new c(this, "object" == typeof e ? e : null), g(this).data(wt, t)), "string" == typeof e) {
                        if (void 0 === t[e])
                            throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, c._clearMenus = function(t) {
                if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
                    for (var e = [].slice.call(document.querySelectorAll(Wt)), n = 0, i = e.length; n < i; n++) {
                        var o = c._getParentFromElement(e[n]),
                            r = g(e[n]).data(wt),
                            s = {
                                relatedTarget: e[n]
                            };
                        if (t && "click" === t.type && (s.clickEvent = t), r) {
                            var a = r._menu;
                            if (g(o).hasClass(jt) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && g.contains(o, t.target))) {
                                var l = g.Event(Pt.HIDE, s);
                                g(o).trigger(l), l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop), e[n].setAttribute("aria-expanded", "false"), g(a).removeClass(jt), g(o).removeClass(jt).trigger(g.Event(Pt.HIDDEN, s)))
                            }
                        }
                    }
            }, c._getParentFromElement = function(t) {
                var e,
                    n = _.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode
            }, c._dataApiKeydownHandler = function(t) {
                if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || g(t.target).closest(Mt).length)) : kt.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !g(this).hasClass(Lt))) {
                    var e = c._getParentFromElement(this),
                        n = g(e).hasClass(jt);
                    if (n && (!n || 27 !== t.which && 32 !== t.which)) {
                        var i = [].slice.call(e.querySelectorAll(Qt));
                        if (0 !== i.length) {
                            var o = i.indexOf(t.target);
                            38 === t.which && 0 < o && o--, 40 === t.which && o < i.length - 1 && o++, o < 0 && (o = 0), i[o].focus()
                        }
                    } else {
                        if (27 === t.which) {
                            var r = e.querySelector(Wt);
                            g(r).trigger("focus")
                        }
                        g(this).trigger("click")
                    }
                }
            }, s(c, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Gt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Jt
                }
            }]), c
        }();
    g(document).on(Pt.KEYDOWN_DATA_API, Wt, Zt._dataApiKeydownHandler).on(Pt.KEYDOWN_DATA_API, Mt, Zt._dataApiKeydownHandler).on(Pt.CLICK_DATA_API + " " + Pt.KEYUP_DATA_API, Zt._clearMenus).on(Pt.CLICK_DATA_API, Wt, function(t) {
        t.preventDefault(), t.stopPropagation(), Zt._jQueryInterface.call(g(this), "toggle")
    }).on(Pt.CLICK_DATA_API, qt, function(t) {
        t.stopPropagation()
    }), g.fn[Dt] = Zt._jQueryInterface, g.fn[Dt].Constructor = Zt, g.fn[Dt].noConflict = function() {
        return g.fn[Dt] = Ot, Zt._jQueryInterface
    };
    var te = "modal",
        ee = "bs.modal",
        ne = "." + ee,
        ie = g.fn[te],
        oe = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        re = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        se = {
            HIDE: "hide" + ne,
            HIDDEN: "hidden" + ne,
            SHOW: "show" + ne,
            SHOWN: "shown" + ne,
            FOCUSIN: "focusin" + ne,
            RESIZE: "resize" + ne,
            CLICK_DISMISS: "click.dismiss" + ne,
            KEYDOWN_DISMISS: "keydown.dismiss" + ne,
            MOUSEUP_DISMISS: "mouseup.dismiss" + ne,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + ne,
            CLICK_DATA_API: "click" + ne + ".data-api"
        },
        ae = "modal-dialog-scrollable",
        le = "modal-scrollbar-measure",
        ce = "modal-backdrop",
        he = "modal-open",
        ue = "fade",
        fe = "show",
        de = ".modal-dialog",
        ge = ".modal-body",
        _e = '[data-toggle="modal"]',
        me = '[data-dismiss="modal"]',
        pe = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        ve = ".sticky-top",
        Ee = function() {
            function o(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(de), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }
            var t = o.prototype;
            return t.toggle = function(t) {
                return this._isShown ? this.hide() : this.show(t)
            }, t.show = function(t) {
                var e = this;
                if (!this._isShown && !this._isTransitioning) {
                    g(this._element).hasClass(ue) && (this._isTransitioning = !0);
                    var n = g.Event(se.SHOW, {
                        relatedTarget: t
                    });
                    g(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), g(this._element).on(se.CLICK_DISMISS, me, function(t) {
                        return e.hide(t)
                    }), g(this._dialog).on(se.MOUSEDOWN_DISMISS, function() {
                        g(e._element).one(se.MOUSEUP_DISMISS, function(t) {
                            g(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function() {
                        return e._showElement(t)
                    }))
                }
            }, t.hide = function(t) {
                var e = this;
                if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
                    var n = g.Event(se.HIDE);
                    if (g(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                        this._isShown = !1;
                        var i = g(this._element).hasClass(ue);
                        if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), g(document).off(se.FOCUSIN), g(this._element).removeClass(fe), g(this._element).off(se.CLICK_DISMISS), g(this._dialog).off(se.MOUSEDOWN_DISMISS), i) {
                            var o = _.getTransitionDurationFromElement(this._element);
                            g(this._element).one(_.TRANSITION_END, function(t) {
                                return e._hideModal(t)
                            }).emulateTransitionEnd(o)
                        } else
                            this._hideModal()
                    }
                }
            }, t.dispose = function() {
                [window, this._element, this._dialog].forEach(function(t) {
                    return g(t).off(ne)
                }), g(document).off(se.FOCUSIN), g.removeData(this._element, ee), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, t.handleUpdate = function() {
                this._adjustDialog()
            }, t._getConfig = function(t) {
                return t = l({}, oe, {}, t), _.typeCheckConfig(te, t, re), t
            }, t._showElement = function(t) {
                var e = this,
                    n = g(this._element).hasClass(ue);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), g(this._dialog).hasClass(ae) ? this._dialog.querySelector(ge).scrollTop = 0 : this._element.scrollTop = 0, n && _.reflow(this._element), g(this._element).addClass(fe), this._config.focus && this._enforceFocus();
                function i() {
                    e._config.focus && e._element.focus(), e._isTransitioning = !1, g(e._element).trigger(o)
                }
                var o = g.Event(se.SHOWN, {
                    relatedTarget: t
                });
                if (n) {
                    var r = _.getTransitionDurationFromElement(this._dialog);
                    g(this._dialog).one(_.TRANSITION_END, i).emulateTransitionEnd(r)
                } else
                    i()
            }, t._enforceFocus = function() {
                var e = this;
                g(document).off(se.FOCUSIN).on(se.FOCUSIN, function(t) {
                    document !== t.target && e._element !== t.target && 0 === g(e._element).has(t.target).length && e._element.focus()
                })
            }, t._setEscapeEvent = function() {
                var e = this;
                this._isShown && this._config.keyboard ? g(this._element).on(se.KEYDOWN_DISMISS, function(t) {
                    27 === t.which && (t.preventDefault(), e.hide())
                }) : this._isShown || g(this._element).off(se.KEYDOWN_DISMISS)
            }, t._setResizeEvent = function() {
                var e = this;
                this._isShown ? g(window).on(se.RESIZE, function(t) {
                    return e.handleUpdate(t)
                }) : g(window).off(se.RESIZE)
            }, t._hideModal = function() {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function() {
                    g(document.body).removeClass(he), t._resetAdjustments(), t._resetScrollbar(), g(t._element).trigger(se.HIDDEN)
                })
            }, t._removeBackdrop = function() {
                this._backdrop && (g(this._backdrop).remove(), this._backdrop = null)
            }, t._showBackdrop = function(t) {
                var e = this,
                    n = g(this._element).hasClass(ue) ? ue : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = ce, n && this._backdrop.classList.add(n), g(this._backdrop).appendTo(document.body), g(this._element).on(se.CLICK_DISMISS, function(t) {
                        e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
                    }), n && _.reflow(this._backdrop), g(this._backdrop).addClass(fe), !t)
                        return;
                    if (!n)
                        return void t();
                    var i = _.getTransitionDurationFromElement(this._backdrop);
                    g(this._backdrop).one(_.TRANSITION_END, t).emulateTransitionEnd(i)
                } else if (!this._isShown && this._backdrop) {
                    g(this._backdrop).removeClass(fe);
                    var o = function() {
                        e._removeBackdrop(), t && t()
                    };
                    if (g(this._element).hasClass(ue)) {
                        var r = _.getTransitionDurationFromElement(this._backdrop);
                        g(this._backdrop).one(_.TRANSITION_END, o).emulateTransitionEnd(r)
                    } else
                        o()
                } else
                    t && t()
            }, t._adjustDialog = function() {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, t._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, t._checkScrollbar = function() {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, t._setScrollbar = function() {
                var o = this;
                if (this._isBodyOverflowing) {
                    var t = [].slice.call(document.querySelectorAll(pe)),
                        e = [].slice.call(document.querySelectorAll(ve));
                    g(t).each(function(t, e) {
                        var n = e.style.paddingRight,
                            i = g(e).css("padding-right");
                        g(e).data("padding-right", n).css("padding-right", parseFloat(i) + o._scrollbarWidth + "px")
                    }), g(e).each(function(t, e) {
                        var n = e.style.marginRight,
                            i = g(e).css("margin-right");
                        g(e).data("margin-right", n).css("margin-right", parseFloat(i) - o._scrollbarWidth + "px")
                    });
                    var n = document.body.style.paddingRight,
                        i = g(document.body).css("padding-right");
                    g(document.body).data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                }
                g(document.body).addClass(he)
            }, t._resetScrollbar = function() {
                var t = [].slice.call(document.querySelectorAll(pe));
                g(t).each(function(t, e) {
                    var n = g(e).data("padding-right");
                    g(e).removeData("padding-right"), e.style.paddingRight = n || ""
                });
                var e = [].slice.call(document.querySelectorAll("" + ve));
                g(e).each(function(t, e) {
                    var n = g(e).data("margin-right");
                    void 0 !== n && g(e).css("margin-right", n).removeData("margin-right")
                });
                var n = g(document.body).data("padding-right");
                g(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
            }, t._getScrollbarWidth = function() {
                var t = document.createElement("div");
                t.className = le, document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, o._jQueryInterface = function(n, i) {
                return this.each(function() {
                    var t = g(this).data(ee),
                        e = l({}, oe, {}, g(this).data(), {}, "object" == typeof n && n ? n : {});
                    if (t || (t = new o(this, e), g(this).data(ee, t)), "string" == typeof n) {
                        if (void 0 === t[n])
                            throw new TypeError('No method named "' + n + '"');
                        t[n](i)
                    } else
                        e.show && t.show(i)
                })
            }, s(o, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return oe
                }
            }]), o
        }();
    g(document).on(se.CLICK_DATA_API, _e, function(t) {
        var e,
            n = this,
            i = _.getSelectorFromElement(this);
        i && (e = document.querySelector(i));
        var o = g(e).data(ee) ? "toggle" : l({}, g(e).data(), {}, g(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var r = g(e).one(se.SHOW, function(t) {
            t.isDefaultPrevented() || r.one(se.HIDDEN, function() {
                g(n).is(":visible") && n.focus()
            })
        });
        Ee._jQueryInterface.call(g(e), o, this)
    }), g.fn[te] = Ee._jQueryInterface, g.fn[te].Constructor = Ee, g.fn[te].noConflict = function() {
        return g.fn[te] = ie, Ee._jQueryInterface
    };
    var ye = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        Ce = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        },
        Te = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        be = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
    function Se(t, r, e) {
        if (0 === t.length)
            return t;
        if (e && "function" == typeof e)
            return e(t);
        for (var n = (new window.DOMParser).parseFromString(t, "text/html"), s = Object.keys(r), a = [].slice.call(n.body.querySelectorAll("*")), i = function(t) {
                var e = a[t],
                    n = e.nodeName.toLowerCase();
                if (-1 === s.indexOf(e.nodeName.toLowerCase()))
                    return e.parentNode.removeChild(e), "continue";
                var i = [].slice.call(e.attributes),
                    o = [].concat(r["*"] || [], r[n] || []);
                i.forEach(function(t) {
                    !function(t, e) {
                        var n = t.nodeName.toLowerCase();
                        if (-1 !== e.indexOf(n))
                            return -1 === ye.indexOf(n) || Boolean(t.nodeValue.match(Te) || t.nodeValue.match(be));
                        for (var i = e.filter(function(t) {
                                return t instanceof RegExp
                            }), o = 0, r = i.length; o < r; o++)
                            if (n.match(i[o]))
                                return 1
                    }(t, o) && e.removeAttribute(t.nodeName)
                })
            }, o = 0, l = a.length; o < l; o++)
            i(o);
        return n.body.innerHTML
    }
    var Ie = "tooltip",
        De = "bs.tooltip",
        we = "." + De,
        Ae = g.fn[Ie],
        Ne = "bs-tooltip",
        Oe = new RegExp("(^|\\s)" + Ne + "\\S+", "g"),
        ke = ["sanitize", "whiteList", "sanitizeFn"],
        Pe = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        },
        Le = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        je = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: Ce
        },
        He = "show",
        Re = "out",
        xe = {
            HIDE: "hide" + we,
            HIDDEN: "hidden" + we,
            SHOW: "show" + we,
            SHOWN: "shown" + we,
            INSERTED: "inserted" + we,
            CLICK: "click" + we,
            FOCUSIN: "focusin" + we,
            FOCUSOUT: "focusout" + we,
            MOUSEENTER: "mouseenter" + we,
            MOUSELEAVE: "mouseleave" + we
        },
        Fe = "fade",
        Ue = "show",
        We = ".tooltip-inner",
        qe = ".arrow",
        Me = "hover",
        Ke = "focus",
        Qe = "click",
        Be = "manual",
        Ve = function() {
            function i(t, e) {
                if (void 0 === u)
                    throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }
            var t = i.prototype;
            return t.enable = function() {
                this._isEnabled = !0
            }, t.disable = function() {
                this._isEnabled = !1
            }, t.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled
            }, t.toggle = function(t) {
                if (this._isEnabled)
                    if (t) {
                        var e = this.constructor.DATA_KEY,
                            n = g(t.currentTarget).data(e);
                        n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                    } else {
                        if (g(this.getTipElement()).hasClass(Ue))
                            return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, t.dispose = function() {
                clearTimeout(this._timeout), g.removeData(this.element, this.constructor.DATA_KEY), g(this.element).off(this.constructor.EVENT_KEY), g(this.element).closest(".modal").off("hide.bs.modal"), this.tip && g(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, t.show = function() {
                var e = this;
                if ("none" === g(this.element).css("display"))
                    throw new Error("Please use show on visible elements");
                var t = g.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    g(this.element).trigger(t);
                    var n = _.findShadowRoot(this.element),
                        i = g.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
                    if (t.isDefaultPrevented() || !i)
                        return;
                    var o = this.getTipElement(),
                        r = _.getUID(this.constructor.NAME);
                    o.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && g(o).addClass(Fe);
                    var s = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
                        a = this._getAttachment(s);
                    this.addAttachmentClass(a);
                    var l = this._getContainer();
                    g(o).data(this.constructor.DATA_KEY, this), g.contains(this.element.ownerDocument.documentElement, this.tip) || g(o).appendTo(l), g(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new u(this.element, o, {
                        placement: a,
                        modifiers: {
                            offset: this._getOffset(),
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: qe
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function(t) {
                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                        },
                        onUpdate: function(t) {
                            return e._handlePopperPlacementChange(t)
                        }
                    }), g(o).addClass(Ue), "ontouchstart" in document.documentElement && g(document.body).children().on("mouseover", null, g.noop);
                    var c = function() {
                        e.config.animation && e._fixTransition();
                        var t = e._hoverState;
                        e._hoverState = null, g(e.element).trigger(e.constructor.Event.SHOWN), t === Re && e._leave(null, e)
                    };
                    if (g(this.tip).hasClass(Fe)) {
                        var h = _.getTransitionDurationFromElement(this.tip);
                        g(this.tip).one(_.TRANSITION_END, c).emulateTransitionEnd(h)
                    } else
                        c()
                }
            }, t.hide = function(t) {
                function e() {
                    n._hoverState !== He && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), g(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t()
                }
                var n = this,
                    i = this.getTipElement(),
                    o = g.Event(this.constructor.Event.HIDE);
                if (g(this.element).trigger(o), !o.isDefaultPrevented()) {
                    if (g(i).removeClass(Ue), "ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop), this._activeTrigger[Qe] = !1, this._activeTrigger[Ke] = !1, this._activeTrigger[Me] = !1, g(this.tip).hasClass(Fe)) {
                        var r = _.getTransitionDurationFromElement(i);
                        g(i).one(_.TRANSITION_END, e).emulateTransitionEnd(r)
                    } else
                        e();
                    this._hoverState = ""
                }
            }, t.update = function() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, t.isWithContent = function() {
                return Boolean(this.getTitle())
            }, t.addAttachmentClass = function(t) {
                g(this.getTipElement()).addClass(Ne + "-" + t)
            }, t.getTipElement = function() {
                return this.tip = this.tip || g(this.config.template)[0], this.tip
            }, t.setContent = function() {
                var t = this.getTipElement();
                this.setElementContent(g(t.querySelectorAll(We)), this.getTitle()), g(t).removeClass(Fe + " " + Ue)
            }, t.setElementContent = function(t, e) {
                "object" != typeof e || !e.nodeType && !e.jquery ? this.config.html ? (this.config.sanitize && (e = Se(e, this.config.whiteList, this.config.sanitizeFn)), t.html(e)) : t.text(e) : this.config.html ? g(e).parent().is(t) || t.empty().append(e) : t.text(g(e).text())
            }, t.getTitle = function() {
                var t = this.element.getAttribute("data-original-title");
                return t = t || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title)
            }, t._getOffset = function() {
                var e = this,
                    t = {};
                return "function" == typeof this.config.offset ? t.fn = function(t) {
                    return t.offsets = l({}, t.offsets, {}, e.config.offset(t.offsets, e.element) || {}), t
                } : t.offset = this.config.offset, t
            }, t._getContainer = function() {
                return !1 === this.config.container ? document.body : _.isElement(this.config.container) ? g(this.config.container) : g(document).find(this.config.container)
            }, t._getAttachment = function(t) {
                return Le[t.toUpperCase()]
            }, t._setListeners = function() {
                var i = this;
                this.config.trigger.split(" ").forEach(function(t) {
                    if ("click" === t)
                        g(i.element).on(i.constructor.Event.CLICK, i.config.selector, function(t) {
                            return i.toggle(t)
                        });
                    else if (t !== Be) {
                        var e = t === Me ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN,
                            n = t === Me ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT;
                        g(i.element).on(e, i.config.selector, function(t) {
                            return i._enter(t)
                        }).on(n, i.config.selector, function(t) {
                            return i._leave(t)
                        })
                    }
                }), g(this.element).closest(".modal").on("hide.bs.modal", function() {
                    i.element && i.hide()
                }), this.config.selector ? this.config = l({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, t._fixTitle = function() {
                var t = typeof this.element.getAttribute("data-original-title");
                !this.element.getAttribute("title") && "string" == t || (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, t._enter = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusin" === t.type ? Ke : Me] = !0), g(e.getTipElement()).hasClass(Ue) || e._hoverState === He ? e._hoverState = He : (clearTimeout(e._timeout), e._hoverState = He, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function() {
                    e._hoverState === He && e.show()
                }, e.config.delay.show) : e.show())
            }, t._leave = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusout" === t.type ? Ke : Me] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = Re, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function() {
                    e._hoverState === Re && e.hide()
                }, e.config.delay.hide) : e.hide())
            }, t._isWithActiveTrigger = function() {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t])
                        return !0;
                return !1
            }, t._getConfig = function(t) {
                var e = g(this.element).data();
                return Object.keys(e).forEach(function(t) {
                    -1 !== ke.indexOf(t) && delete e[t]
                }), "number" == typeof (t = l({}, this.constructor.Default, {}, e, {}, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), _.typeCheckConfig(Ie, t, this.constructor.DefaultType), t.sanitize && (t.template = Se(t.template, t.whiteList, t.sanitizeFn)), t
            }, t._getDelegateConfig = function() {
                var t = {};
                if (this.config)
                    for (var e in this.config)
                        this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, t._cleanTipClass = function() {
                var t = g(this.getTipElement()),
                    e = t.attr("class").match(Oe);
                null !== e && e.length && t.removeClass(e.join(""))
            }, t._handlePopperPlacementChange = function(t) {
                var e = t.instance;
                this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, t._fixTransition = function() {
                var t = this.getTipElement(),
                    e = this.config.animation;
                null === t.getAttribute("x-placement") && (g(t).removeClass(Fe), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this).data(De),
                        e = "object" == typeof n && n;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), g(this).data(De, t)), "string" == typeof n)) {
                        if (void 0 === t[n])
                            throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return je
                }
            }, {
                key: "NAME",
                get: function() {
                    return Ie
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return De
                }
            }, {
                key: "Event",
                get: function() {
                    return xe
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return we
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Pe
                }
            }]), i
        }();
    g.fn[Ie] = Ve._jQueryInterface, g.fn[Ie].Constructor = Ve, g.fn[Ie].noConflict = function() {
        return g.fn[Ie] = Ae, Ve._jQueryInterface
    };
    var Ye = "popover",
        ze = "bs.popover",
        Xe = "." + ze,
        $e = g.fn[Ye],
        Ge = "bs-popover",
        Je = new RegExp("(^|\\s)" + Ge + "\\S+", "g"),
        Ze = l({}, Ve.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        tn = l({}, Ve.DefaultType, {
            content: "(string|element|function)"
        }),
        en = "fade",
        nn = "show",
        on = ".popover-header",
        rn = ".popover-body",
        sn = {
            HIDE: "hide" + Xe,
            HIDDEN: "hidden" + Xe,
            SHOW: "show" + Xe,
            SHOWN: "shown" + Xe,
            INSERTED: "inserted" + Xe,
            CLICK: "click" + Xe,
            FOCUSIN: "focusin" + Xe,
            FOCUSOUT: "focusout" + Xe,
            MOUSEENTER: "mouseenter" + Xe,
            MOUSELEAVE: "mouseleave" + Xe
        },
        an = function(t) {
            var e,
                n;
            function i() {
                return t.apply(this, arguments) || this
            }
            n = t, (e = i).prototype = Object.create(n.prototype), (e.prototype.constructor = e).__proto__ = n;
            var o = i.prototype;
            return o.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, o.addAttachmentClass = function(t) {
                g(this.getTipElement()).addClass(Ge + "-" + t)
            }, o.getTipElement = function() {
                return this.tip = this.tip || g(this.config.template)[0], this.tip
            }, o.setContent = function() {
                var t = g(this.getTipElement());
                this.setElementContent(t.find(on), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(rn), e), t.removeClass(en + " " + nn)
            }, o._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, o._cleanTipClass = function() {
                var t = g(this.getTipElement()),
                    e = t.attr("class").match(Je);
                null !== e && 0 < e.length && t.removeClass(e.join(""))
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this).data(ze),
                        e = "object" == typeof n ? n : null;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), g(this).data(ze, t)), "string" == typeof n)) {
                        if (void 0 === t[n])
                            throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Ze
                }
            }, {
                key: "NAME",
                get: function() {
                    return Ye
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return ze
                }
            }, {
                key: "Event",
                get: function() {
                    return sn
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return Xe
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return tn
                }
            }]), i
        }(Ve);
    g.fn[Ye] = an._jQueryInterface, g.fn[Ye].Constructor = an, g.fn[Ye].noConflict = function() {
        return g.fn[Ye] = $e, an._jQueryInterface
    };
    var ln = "scrollspy",
        cn = "bs.scrollspy",
        hn = "." + cn,
        un = g.fn[ln],
        fn = {
            offset: 10,
            method: "auto",
            target: ""
        },
        dn = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        gn = {
            ACTIVATE: "activate" + hn,
            SCROLL: "scroll" + hn,
            LOAD_DATA_API: "load" + hn + ".data-api"
        },
        _n = "dropdown-item",
        mn = "active",
        pn = '[data-spy="scroll"]',
        vn = ".nav, .list-group",
        En = ".nav-link",
        yn = ".nav-item",
        Cn = ".list-group-item",
        Tn = ".dropdown",
        bn = ".dropdown-item",
        Sn = ".dropdown-toggle",
        In = "offset",
        Dn = "position",
        wn = function() {
            function n(t, e) {
                var n = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + En + "," + this._config.target + " " + Cn + "," + this._config.target + " " + bn, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, g(this._scrollElement).on(gn.SCROLL, function(t) {
                    return n._process(t)
                }), this.refresh(), this._process()
            }
            var t = n.prototype;
            return t.refresh = function() {
                var e = this,
                    t = this._scrollElement === this._scrollElement.window ? In : Dn,
                    o = "auto" === this._config.method ? t : this._config.method,
                    r = o === Dn ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(t) {
                    var e,
                        n = _.getSelectorFromElement(t);
                    if (n && (e = document.querySelector(n)), e) {
                        var i = e.getBoundingClientRect();
                        if (i.width || i.height)
                            return [g(e)[o]().top + r, n]
                    }
                    return null
                }).filter(function(t) {
                    return t
                }).sort(function(t, e) {
                    return t[0] - e[0]
                }).forEach(function(t) {
                    e._offsets.push(t[0]), e._targets.push(t[1])
                })
            }, t.dispose = function() {
                g.removeData(this._element, cn), g(this._scrollElement).off(hn), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, t._getConfig = function(t) {
                if ("string" != typeof (t = l({}, fn, {}, "object" == typeof t && t ? t : {})).target) {
                    var e = g(t.target).attr("id");
                    e || (e = _.getUID(ln), g(t.target).attr("id", e)), t.target = "#" + e
                }
                return _.typeCheckConfig(ln, t, dn), t
            }, t._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, t._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, t._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, t._process = function() {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), n <= t) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0])
                        return this._activeTarget = null, void this._clear();
                    for (var o = this._offsets.length; o--;) {
                        this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                    }
                }
            }, t._activate = function(e) {
                this._activeTarget = e, this._clear();
                var t = this._selector.split(",").map(function(t) {
                        return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                    }),
                    n = g([].slice.call(document.querySelectorAll(t.join(","))));
                n.hasClass(_n) ? (n.closest(Tn).find(Sn).addClass(mn), n.addClass(mn)) : (n.addClass(mn), n.parents(vn).prev(En + ", " + Cn).addClass(mn), n.parents(vn).prev(yn).children(En).addClass(mn)), g(this._scrollElement).trigger(gn.ACTIVATE, {
                    relatedTarget: e
                })
            }, t._clear = function() {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function(t) {
                    return t.classList.contains(mn)
                }).forEach(function(t) {
                    return t.classList.remove(mn)
                })
            }, n._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = g(this).data(cn);
                    if (t || (t = new n(this, "object" == typeof e && e), g(this).data(cn, t)), "string" == typeof e) {
                        if (void 0 === t[e])
                            throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return fn
                }
            }]), n
        }();
    g(window).on(gn.LOAD_DATA_API, function() {
        for (var t = [].slice.call(document.querySelectorAll(pn)), e = t.length; e--;) {
            var n = g(t[e]);
            wn._jQueryInterface.call(n, n.data())
        }
    }), g.fn[ln] = wn._jQueryInterface, g.fn[ln].Constructor = wn, g.fn[ln].noConflict = function() {
        return g.fn[ln] = un, wn._jQueryInterface
    };
    var An = "bs.tab",
        Nn = "." + An,
        On = g.fn.tab,
        kn = {
            HIDE: "hide" + Nn,
            HIDDEN: "hidden" + Nn,
            SHOW: "show" + Nn,
            SHOWN: "shown" + Nn,
            CLICK_DATA_API: "click" + Nn + ".data-api"
        },
        Pn = "dropdown-menu",
        Ln = "active",
        jn = "disabled",
        Hn = "fade",
        Rn = "show",
        xn = ".dropdown",
        Fn = ".nav, .list-group",
        Un = ".active",
        Wn = "> li > .active",
        qn = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        Mn = ".dropdown-toggle",
        Kn = "> .dropdown-menu .active",
        Qn = function() {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.show = function() {
                var n = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && g(this._element).hasClass(Ln) || g(this._element).hasClass(jn))) {
                    var t,
                        i,
                        e = g(this._element).closest(Fn)[0],
                        o = _.getSelectorFromElement(this._element);
                    if (e) {
                        var r = "UL" === e.nodeName || "OL" === e.nodeName ? Wn : Un;
                        i = (i = g.makeArray(g(e).find(r)))[i.length - 1]
                    }
                    var s = g.Event(kn.HIDE, {
                            relatedTarget: this._element
                        }),
                        a = g.Event(kn.SHOW, {
                            relatedTarget: i
                        });
                    if (i && g(i).trigger(s), g(this._element).trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                        o && (t = document.querySelector(o)), this._activate(this._element, e);
                        var l = function() {
                            var t = g.Event(kn.HIDDEN, {
                                    relatedTarget: n._element
                                }),
                                e = g.Event(kn.SHOWN, {
                                    relatedTarget: i
                                });
                            g(i).trigger(t), g(n._element).trigger(e)
                        };
                        t ? this._activate(t, t.parentNode, l) : l()
                    }
                }
            }, t.dispose = function() {
                g.removeData(this._element, An), this._element = null
            }, t._activate = function(t, e, n) {
                function i() {
                    return o._transitionComplete(t, r, n)
                }
                var o = this,
                    r = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? g(e).children(Un) : g(e).find(Wn))[0],
                    s = n && r && g(r).hasClass(Hn);
                if (r && s) {
                    var a = _.getTransitionDurationFromElement(r);
                    g(r).removeClass(Rn).one(_.TRANSITION_END, i).emulateTransitionEnd(a)
                } else
                    i()
            }, t._transitionComplete = function(t, e, n) {
                if (e) {
                    g(e).removeClass(Ln);
                    var i = g(e.parentNode).find(Kn)[0];
                    i && g(i).removeClass(Ln), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
                }
                if (g(t).addClass(Ln), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), _.reflow(t), t.classList.contains(Hn) && t.classList.add(Rn), t.parentNode && g(t.parentNode).hasClass(Pn)) {
                    var o = g(t).closest(xn)[0];
                    if (o) {
                        var r = [].slice.call(o.querySelectorAll(Mn));
                        g(r).addClass(Ln)
                    }
                    t.setAttribute("aria-expanded", !0)
                }
                n && n()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(An);
                    if (e || (e = new i(this), t.data(An, e)), "string" == typeof n) {
                        if (void 0 === e[n])
                            throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }]), i
        }();
    g(document).on(kn.CLICK_DATA_API, qn, function(t) {
        t.preventDefault(), Qn._jQueryInterface.call(g(this), "show")
    }), g.fn.tab = Qn._jQueryInterface, g.fn.tab.Constructor = Qn, g.fn.tab.noConflict = function() {
        return g.fn.tab = On, Qn._jQueryInterface
    };
    var Bn = "toast",
        Vn = "bs.toast",
        Yn = "." + Vn,
        zn = g.fn[Bn],
        Xn = {
            CLICK_DISMISS: "click.dismiss" + Yn,
            HIDE: "hide" + Yn,
            HIDDEN: "hidden" + Yn,
            SHOW: "show" + Yn,
            SHOWN: "shown" + Yn
        },
        $n = "fade",
        Gn = "hide",
        Jn = "show",
        Zn = "showing",
        ti = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        ei = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        ni = '[data-dismiss="toast"]',
        ii = function() {
            function i(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
            }
            var t = i.prototype;
            return t.show = function() {
                var t = this;
                g(this._element).trigger(Xn.SHOW), this._config.animation && this._element.classList.add($n);
                function e() {
                    t._element.classList.remove(Zn), t._element.classList.add(Jn), g(t._element).trigger(Xn.SHOWN), t._config.autohide && t.hide()
                }
                if (this._element.classList.remove(Gn), this._element.classList.add(Zn), this._config.animation) {
                    var n = _.getTransitionDurationFromElement(this._element);
                    g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n)
                } else
                    e()
            }, t.hide = function(t) {
                var e = this;
                this._element.classList.contains(Jn) && (g(this._element).trigger(Xn.HIDE), t ? this._close() : this._timeout = setTimeout(function() {
                    e._close()
                }, this._config.delay))
            }, t.dispose = function() {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(Jn) && this._element.classList.remove(Jn), g(this._element).off(Xn.CLICK_DISMISS), g.removeData(this._element, Vn), this._element = null, this._config = null
            }, t._getConfig = function(t) {
                return t = l({}, ei, {}, g(this._element).data(), {}, "object" == typeof t && t ? t : {}), _.typeCheckConfig(Bn, t, this.constructor.DefaultType), t
            }, t._setListeners = function() {
                var t = this;
                g(this._element).on(Xn.CLICK_DISMISS, ni, function() {
                    return t.hide(!0)
                })
            }, t._close = function() {
                function t() {
                    e._element.classList.add(Gn), g(e._element).trigger(Xn.HIDDEN)
                }
                var e = this;
                if (this._element.classList.remove(Jn), this._config.animation) {
                    var n = _.getTransitionDurationFromElement(this._element);
                    g(this._element).one(_.TRANSITION_END, t).emulateTransitionEnd(n)
                } else
                    t()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(Vn);
                    if (e || (e = new i(this, "object" == typeof n && n), t.data(Vn, e)), "string" == typeof n) {
                        if (void 0 === e[n])
                            throw new TypeError('No method named "' + n + '"');
                        e[n](this)
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return ti
                }
            }, {
                key: "Default",
                get: function() {
                    return ei
                }
            }]), i
        }();
    g.fn[Bn] = ii._jQueryInterface, g.fn[Bn].Constructor = ii, g.fn[Bn].noConflict = function() {
        return g.fn[Bn] = zn, ii._jQueryInterface
    }, function() {
        if (void 0 === g)
            throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var t = g.fn.jquery.split(" ")[0].split(".");
        if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0])
            throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(), t.Alert = v, t.Button = L, t.Carousel = ct, t.Collapse = It, t.Dropdown = Zt, t.Modal = Ee, t.Popover = an, t.Scrollspy = wn, t.Tab = Qn, t.Toast = ii, t.Tooltip = Ve, t.Util = _, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});
//# sourceMappingURL=bootstrap.js.map

