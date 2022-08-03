// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const t = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e = Symbol(), n = new WeakMap;
class s {
    constructor(t, n, s){
        if (this._$cssResult$ = !0, s !== e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = n;
    }
    get styleSheet() {
        let e = this.o;
        const s = this.t;
        if (t && void 0 === e) {
            const t1 = void 0 !== s && 1 === s.length;
            t1 && (e = n.get(s)), void 0 === e && ((this.o = e = new CSSStyleSheet).replaceSync(this.cssText), t1 && n.set(s, e));
        }
        return e;
    }
    toString() {
        return this.cssText;
    }
}
const o = (t)=>new s("string" == typeof t ? t : t + "", void 0, e), r = (t, ...n)=>{
    const o = 1 === t.length ? t[0] : n.reduce((e, n, s)=>e + ((t)=>{
            if (!0 === t._$cssResult$) return t.cssText;
            if ("number" == typeof t) return t;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(n) + t[s + 1], t[0]);
    return new s(o, t, e);
}, i = (e, n)=>{
    t ? e.adoptedStyleSheets = n.map((t)=>t instanceof CSSStyleSheet ? t : t.styleSheet) : n.forEach((t)=>{
        const n = document.createElement("style"), s = window.litNonce;
        void 0 !== s && n.setAttribute("nonce", s), n.textContent = t.cssText, e.appendChild(n);
    });
}, S = t ? (t)=>t : (t)=>t instanceof CSSStyleSheet ? ((t)=>{
        let e = "";
        for (const n of t.cssRules)e += n.cssText;
        return o(e);
    })(t) : t;
var s1;
const e1 = window.trustedTypes, r1 = e1 ? e1.emptyScript : "", h = window.reactiveElementPolyfillSupport, o1 = {
    toAttribute (t, i) {
        switch(i){
            case Boolean:
                t = t ? r1 : null;
                break;
            case Object:
            case Array:
                t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute (t, i) {
        let s = t;
        switch(i){
            case Boolean:
                s = null !== t;
                break;
            case Number:
                s = null === t ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    s = JSON.parse(t);
                } catch (t1) {
                    s = null;
                }
        }
        return s;
    }
}, n1 = (t, i)=>i !== t && (i == i || t == t), l = {
    attribute: !0,
    type: String,
    converter: o1,
    reflect: !1,
    hasChanged: n1
};
class a extends HTMLElement {
    constructor(){
        super(), this._$Ei = new Map, this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
    }
    static addInitializer(t) {
        var i;
        null !== (i = this.h) && void 0 !== i || (this.h = []), this.h.push(t);
    }
    static get observedAttributes() {
        this.finalize();
        const t = [];
        return this.elementProperties.forEach((i, s)=>{
            const e = this._$Ep(s, i);
            void 0 !== e && (this._$Ev.set(e, s), t.push(e));
        }), t;
    }
    static createProperty(t, i = l) {
        if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
            const s = "symbol" == typeof t ? Symbol() : "__" + t, e = this.getPropertyDescriptor(t, s, i);
            void 0 !== e && Object.defineProperty(this.prototype, t, e);
        }
    }
    static getPropertyDescriptor(t, i, s) {
        return {
            get () {
                return this[i];
            },
            set (e) {
                const r = this[t];
                this[i] = e, this.requestUpdate(t, r, s);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) || l;
    }
    static finalize() {
        if (this.hasOwnProperty("finalized")) return !1;
        this.finalized = !0;
        const t = Object.getPrototypeOf(this);
        if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map, this.hasOwnProperty("properties")) {
            const t1 = this.properties, i = [
                ...Object.getOwnPropertyNames(t1),
                ...Object.getOwnPropertySymbols(t1)
            ];
            for (const s of i)this.createProperty(s, t1[s]);
        }
        return this.elementStyles = this.finalizeStyles(this.styles), !0;
    }
    static finalizeStyles(i) {
        const s = [];
        if (Array.isArray(i)) {
            const e = new Set(i.flat(1 / 0).reverse());
            for (const i1 of e)s.unshift(S(i1));
        } else void 0 !== i && s.push(S(i));
        return s;
    }
    static _$Ep(t, i) {
        const s = i.attribute;
        return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    u() {
        var t;
        this._$E_ = new Promise((t)=>this.enableUpdating = t), this._$AL = new Map, this._$Eg(), this.requestUpdate(), null === (t = this.constructor.h) || void 0 === t || t.forEach((t)=>t(this));
    }
    addController(t) {
        var i, s;
        (null !== (i = this._$ES) && void 0 !== i ? i : this._$ES = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
    }
    removeController(t) {
        var i;
        null === (i = this._$ES) || void 0 === i || i.splice(this._$ES.indexOf(t) >>> 0, 1);
    }
    _$Eg() {
        this.constructor.elementProperties.forEach((t, i)=>{
            this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
        });
    }
    createRenderRoot() {
        var t;
        const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
        return i(s, this.constructor.elementStyles), s;
    }
    connectedCallback() {
        var t;
        void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$ES) || void 0 === t || t.forEach((t)=>{
            var i;
            return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
        });
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        var t;
        null === (t = this._$ES) || void 0 === t || t.forEach((t)=>{
            var i;
            return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
        });
    }
    attributeChangedCallback(t, i, s) {
        this._$AK(t, s);
    }
    _$EO(t, i, s = l) {
        var e, r;
        const h = this.constructor._$Ep(t, s);
        if (void 0 !== h && !0 === s.reflect) {
            const n = (null !== (r = null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) && void 0 !== r ? r : o1.toAttribute)(i, s.type);
            this._$El = t, null == n ? this.removeAttribute(h) : this.setAttribute(h, n), this._$El = null;
        }
    }
    _$AK(t, i) {
        var s, e;
        const r = this.constructor, h = r._$Ev.get(t);
        if (void 0 !== h && this._$El !== h) {
            const t1 = r.getPropertyOptions(h), n = t1.converter, l = null !== (e = null !== (s = null == n ? void 0 : n.fromAttribute) && void 0 !== s ? s : "function" == typeof n ? n : null) && void 0 !== e ? e : o1.fromAttribute;
            this._$El = h, this[h] = l(i, t1.type), this._$El = null;
        }
    }
    requestUpdate(t, i, s) {
        let e = !0;
        void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || n1)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map), this._$EC.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
        this.isUpdatePending = !0;
        try {
            await this._$E_;
        } catch (t) {
            Promise.reject(t);
        }
        const t1 = this.scheduleUpdate();
        return null != t1 && await t1, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        var t;
        if (!this.isUpdatePending) return;
        this.hasUpdated, this._$Ei && (this._$Ei.forEach((t, i)=>this[i] = t), this._$Ei = void 0);
        let i = !1;
        const s = this._$AL;
        try {
            i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$ES) || void 0 === t || t.forEach((t)=>{
                var i;
                return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
            }), this.update(s)) : this._$Ek();
        } catch (t1) {
            throw i = !1, this._$Ek(), t1;
        }
        i && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
        var i;
        null === (i = this._$ES) || void 0 === i || i.forEach((t)=>{
            var i;
            return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
        }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    _$Ek() {
        this._$AL = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$E_;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        void 0 !== this._$EC && (this._$EC.forEach((t, i)=>this._$EO(i, this[i], t)), this._$EC = void 0), this._$Ek();
    }
    updated(t) {}
    firstUpdated(t) {}
}
a.finalized = !0, a.elementProperties = new Map, a.elementStyles = [], a.shadowRootOptions = {
    mode: "open"
}, null == h || h({
    ReactiveElement: a
}), (null !== (s1 = globalThis.reactiveElementVersions) && void 0 !== s1 ? s1 : globalThis.reactiveElementVersions = []).push("1.3.4");
var t1;
const i1 = globalThis.trustedTypes, s2 = i1 ? i1.createPolicy("lit-html", {
    createHTML: (t)=>t
}) : void 0, e2 = `lit$${(Math.random() + "").slice(9)}$`, o2 = "?" + e2, n2 = `<${o2}>`, l1 = document, h1 = (t = "")=>l1.createComment(t), r2 = (t)=>null === t || "object" != typeof t && "function" != typeof t, d = Array.isArray, u = (t)=>d(t) || "function" == typeof (null == t ? void 0 : t[Symbol.iterator]), c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a1 = />/g, f = RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)", "g"), _ = /'/g, g = /"/g, m = /^(?:script|style|textarea|title)$/i, p = (t)=>(i, ...s)=>({
            _$litType$: t,
            strings: i,
            values: s
        }), $ = p(1), y = p(2), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), x = new WeakMap, T = (t, i, s)=>{
    var e, o;
    const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
    let l = n._$litPart$;
    if (void 0 === l) {
        const t1 = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
        n._$litPart$ = l = new N(i.insertBefore(h1(), t1), t1, void 0, null != s ? s : {});
    }
    return l._$AI(t), l;
}, A = l1.createTreeWalker(l1, 129, null, !1), E = (t, i)=>{
    const o = t.length - 1, l = [];
    let h, r = 2 === i ? "<svg>" : "", d = c;
    for(let i1 = 0; i1 < o; i1++){
        const s1 = t[i1];
        let o1, u, p = -1, $ = 0;
        for(; $ < s1.length && (d.lastIndex = $, u = d.exec(s1), null !== u);)$ = d.lastIndex, d === c ? "!--" === u[1] ? d = v : void 0 !== u[1] ? d = a1 : void 0 !== u[2] ? (m.test(u[2]) && (h = RegExp("</" + u[2], "g")), d = f) : void 0 !== u[3] && (d = f) : d === f ? ">" === u[0] ? (d = null != h ? h : c, p = -1) : void 0 === u[1] ? p = -2 : (p = d.lastIndex - u[2].length, o1 = u[1], d = void 0 === u[3] ? f : '"' === u[3] ? g : _) : d === g || d === _ ? d = f : d === v || d === a1 ? d = c : (d = f, h = void 0);
        const y = d === f && t[i1 + 1].startsWith("/>") ? " " : "";
        r += d === c ? s1 + n2 : p >= 0 ? (l.push(o1), s1.slice(0, p) + "$lit$" + s1.slice(p) + e2 + y) : s1 + e2 + (-2 === p ? (l.push(void 0), i1) : y);
    }
    const u1 = r + (t[o] || "<?>") + (2 === i ? "</svg>" : "");
    if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return [
        void 0 !== s2 ? s2.createHTML(u1) : u1,
        l
    ];
};
class C {
    constructor({ strings: t , _$litType$: s  }, n){
        let l;
        this.parts = [];
        let r = 0, d = 0;
        const u = t.length - 1, c = this.parts, [v, a] = E(t, s);
        if (this.el = C.createElement(v, n), A.currentNode = this.el.content, 2 === s) {
            const t1 = this.el.content, i11 = t1.firstChild;
            i11.remove(), t1.append(...i11.childNodes);
        }
        for(; null !== (l = A.nextNode()) && c.length < u;){
            if (1 === l.nodeType) {
                if (l.hasAttributes()) {
                    const t2 = [];
                    for (const i2 of l.getAttributeNames())if (i2.endsWith("$lit$") || i2.startsWith(e2)) {
                        const s1 = a[d++];
                        if (t2.push(i2), void 0 !== s1) {
                            const t3 = l.getAttribute(s1.toLowerCase() + "$lit$").split(e2), i3 = /([.?@])?(.*)/.exec(s1);
                            c.push({
                                type: 1,
                                index: r,
                                name: i3[2],
                                strings: t3,
                                ctor: "." === i3[1] ? M : "?" === i3[1] ? k : "@" === i3[1] ? H : S1
                            });
                        } else c.push({
                            type: 6,
                            index: r
                        });
                    }
                    for (const i4 of t2)l.removeAttribute(i4);
                }
                if (m.test(l.tagName)) {
                    const t4 = l.textContent.split(e2), s2 = t4.length - 1;
                    if (s2 > 0) {
                        l.textContent = i1 ? i1.emptyScript : "";
                        for(let i5 = 0; i5 < s2; i5++)l.append(t4[i5], h1()), A.nextNode(), c.push({
                            type: 2,
                            index: ++r
                        });
                        l.append(t4[s2], h1());
                    }
                }
            } else if (8 === l.nodeType) if (l.data === o2) c.push({
                type: 2,
                index: r
            });
            else {
                let t5 = -1;
                for(; -1 !== (t5 = l.data.indexOf(e2, t5 + 1));)c.push({
                    type: 7,
                    index: r
                }), t5 += e2.length - 1;
            }
            r++;
        }
    }
    static createElement(t, i) {
        const s = l1.createElement("template");
        return s.innerHTML = t, s;
    }
}
function P(t, i, s = t, e) {
    var o, n, l, h;
    if (i === b) return i;
    let d = void 0 !== e ? null === (o = s._$Cl) || void 0 === o ? void 0 : o[e] : s._$Cu;
    const u = r2(i) ? void 0 : i._$litDirective$;
    return (null == d ? void 0 : d.constructor) !== u && (null === (n = null == d ? void 0 : d._$AO) || void 0 === n || n.call(d, !1), void 0 === u ? d = void 0 : (d = new u(t), d._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Cl) && void 0 !== l ? l : h._$Cl = [])[e] = d : s._$Cu = d), void 0 !== d && (i = P(t, d._$AS(t, i.values), d, e)), i;
}
class V {
    constructor(t, i){
        this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    p(t) {
        var i;
        const { el: { content: s  } , parts: e  } = this._$AD, o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : l1).importNode(s, !0);
        A.currentNode = o;
        let n = A.nextNode(), h = 0, r = 0, d = e[0];
        for(; void 0 !== d;){
            if (h === d.index) {
                let i1;
                2 === d.type ? i1 = new N(n, n.nextSibling, this, t) : 1 === d.type ? i1 = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i1 = new I(n, this, t)), this.v.push(i1), d = e[++r];
            }
            h !== (null == d ? void 0 : d.index) && (n = A.nextNode(), h++);
        }
        return o;
    }
    m(t) {
        let i = 0;
        for (const s of this.v)void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }
}
class N {
    constructor(t, i, s, e){
        var o;
        this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$C_ = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
    }
    get _$AU() {
        var t, i;
        return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$C_;
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t, i = this) {
        t = P(this, t, i), r2(t) ? t === w || null == t || "" === t ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== b && this.T(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.k(t) : u(t) ? this.S(t) : this.T(t);
    }
    j(t, i = this._$AB) {
        return this._$AA.parentNode.insertBefore(t, i);
    }
    k(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.j(t));
    }
    T(t) {
        this._$AH !== w && r2(this._$AH) ? this._$AA.nextSibling.data = t : this.k(l1.createTextNode(t)), this._$AH = t;
    }
    $(t) {
        var i;
        const { values: s , _$litType$: e  } = t, o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = C.createElement(e.h, this.options)), e);
        if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.m(s);
        else {
            const t1 = new V(o, this), i1 = t1.p(this.options);
            t1.m(s), this.k(i1), this._$AH = t1;
        }
    }
    _$AC(t) {
        let i = x.get(t.strings);
        return void 0 === i && x.set(t.strings, i = new C(t)), i;
    }
    S(t) {
        d(this._$AH) || (this._$AH = [], this._$AR());
        const i = this._$AH;
        let s, e = 0;
        for (const o of t)e === i.length ? i.push(s = new N(this.j(h1()), this.j(h1()), this, this.options)) : s = i[e], s._$AI(o), e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
    _$AR(t = this._$AA.nextSibling, i) {
        var s;
        for(null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;){
            const i1 = t.nextSibling;
            t.remove(), t = i1;
        }
    }
    setConnected(t) {
        var i;
        void 0 === this._$AM && (this._$C_ = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
    }
}
class S1 {
    constructor(t, i, s, e, o){
        this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = w;
    }
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t, i = this, s, e) {
        const o = this.strings;
        let n = !1;
        if (void 0 === o) t = P(this, t, i, 0), n = !r2(t) || t !== this._$AH && t !== b, n && (this._$AH = t);
        else {
            const e1 = t;
            let l, h;
            for(t = o[0], l = 0; l < o.length - 1; l++)h = P(this, e1[s + l], i, l), h === b && (h = this._$AH[l]), n || (n = !r2(h) || h !== this._$AH[l]), h === w ? t = w : t !== w && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
        }
        n && !e && this.P(t);
    }
    P(t) {
        t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
    }
}
class M extends S1 {
    constructor(){
        super(...arguments), this.type = 3;
    }
    P(t) {
        this.element[this.name] = t === w ? void 0 : t;
    }
}
const R = i1 ? i1.emptyScript : "";
class k extends S1 {
    constructor(){
        super(...arguments), this.type = 4;
    }
    P(t) {
        t && t !== w ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
    }
}
class H extends S1 {
    constructor(t, i, s, e, o){
        super(t, i, s, e, o), this.type = 5;
    }
    _$AI(t, i = this) {
        var s;
        if ((t = null !== (s = P(this, t, i, 0)) && void 0 !== s ? s : w) === b) return;
        const e = this._$AH, o = t === w && e !== w || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive, n = t !== w && (e === w || o);
        o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
        var i, s;
        "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
    }
}
class I {
    constructor(t, i, s){
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t) {
        P(this, t);
    }
}
const z = window.litHtmlPolyfillSupport;
null == z || z(C, N), (null !== (t1 = globalThis.litHtmlVersions) && void 0 !== t1 ? t1 : globalThis.litHtmlVersions = []).push("2.2.7");
var l2, o3;
class s3 extends a {
    constructor(){
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0;
    }
    createRenderRoot() {
        var t, e;
        const i = super.createRenderRoot();
        return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
    }
    update(t) {
        const i = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = T(i, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        var t;
        super.connectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
    }
    disconnectedCallback() {
        var t;
        super.disconnectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
    }
    render() {
        return b;
    }
}
s3.finalized = !0, s3._$litElement$ = !0, null === (l2 = globalThis.litElementHydrateSupport) || void 0 === l2 || l2.call(globalThis, {
    LitElement: s3
});
const n3 = globalThis.litElementPolyfillSupport;
null == n3 || n3({
    LitElement: s3
});
(null !== (o3 = globalThis.litElementVersions) && void 0 !== o3 ? o3 : globalThis.litElementVersions = []).push("3.2.2");
const n4 = (n)=>(e)=>"function" == typeof e ? ((n, e)=>(window.customElements.define(n, e), e))(n, e) : ((n, e)=>{
            const { kind: t , elements: i  } = e;
            return {
                kind: t,
                elements: i,
                finisher (e) {
                    window.customElements.define(n, e);
                }
            };
        })(n, e);
var n5;
null != (null === (n5 = window.HTMLSlotElement) || void 0 === n5 ? void 0 : n5.prototype.assignedElements) ? (o, n)=>o.assignedElements(n) : (o, n)=>o.assignedNodes(n).filter((o)=>o.nodeType === Node.ELEMENT_NODE);
var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let PageBounds = class PageBounds extends s3 {
    static styles = [
        r`
      :host {
        position: absolute;
        inset: 0rem 0rem;

        display: flex;
        flex: none;
        flex-direction: column;

        background: #f6f6f6;
      }

      .node.bounds-warp {
        position: relative;

        display: flex;
        flex: 1;
        flex-direction: column;
      }
    `, 
    ];
    render() {
        return $`
      <div class="node bounds-warp">
        <!---->
        <slot></slot>
        <!---->
      </div>
    `;
    }
};
PageBounds = __decorate([
    n4('page-bounds')
], PageBounds);
function requestMove(eve) {
    eve.preventDefault();
    if (globalThis.performance.now() - this.frame.ratLas <= 250) {
        this.frame.rat = 1 / 2.5;
        this.whenTranslate();
        return;
    }
    this.frame.ratLas = globalThis.performance.now();
    let close;
    const wid = this.parentNode.offsetWidth;
    const start = {
        x: eve.pageX
    };
    const delta = wid * this.frame.rat - start.x;
    this.whenTranslate();
    const onMove = (eve)=>{
        if (close) return;
        eve.preventDefault();
        const wid = this.parentNode.offsetWidth;
        const pos = {
            x: eve.pageX - start.x
        };
        const val = Math.max(0.1, Math.min(0.9, (start.x + pos.x + delta) / wid));
        const rat = Math.round(val * 100) / 100;
        if (!this.tra && Math.abs(wid * rat - wid * this.frame.rat) <= 1) return;
        this.tra = true;
        this.frame.rat = rat;
        this.whenTranslate();
    };
    const onExit = async (eve)=>{
        if (close) return;
        eve.preventDefault();
        close = true;
        this.tra = false;
        this.removeEventListener('pointerup', onExit);
        this.removeEventListener('pointermove', onMove);
        requestAnimationFrame(()=>{
            this.whenTranslate();
        });
    };
    onMove(eve);
    globalThis.addEventListener('lostpointercapture', onExit);
    globalThis.addEventListener('pointerup', onExit);
    globalThis.addEventListener('pointermove', onMove);
}
function InspectAppPages() {
    return r`
    /*  */
    .node.app-pages {
      display: flex;
      flex: 1;
      flex-direction: row;
    }

    .node.app-pages > .pages-inner {
      display: flex;
      flex: 1;
      flex-direction: column;

      min-width: calc(var(--page-wid, unset) + 0.625rem);
      max-width: calc(var(--page-wid, unset) + 0.625rem);

      overflow: hidden;
    }

    .node.app-pages > .pages-inner:not(:first-child) {
      margin-left: -0.625rem;
    }

    .node.app-pages > .pages-inner:not(:last-child) {
      margin-right: -0.625rem;
    }

    /*  */
    .pages-inner-resize {
      z-index: 20;
      position: relative;

      width: 0.25rem;
      margin: -50vh -0.125rem;

      cursor: w-resize;
      touch-action: none;
    }

    .pages-inner-resize[node-active] {
      background: #858585;
    }

    .pages-inner-resize::after {
      content: '';

      position: absolute;
      inset: 0rem calc(0.25rem - 0.5rem);
    }
    .pages-inner-resize[node-active]::after {
      cursor: w-resize;
      inset: 0rem -100vw;
    }
  `;
}
function InspectAppTools() {
    return r`
    /*  */
    .node.app-tools {
      display: flex;
      flex: none;
      flex-direction: row;

      height: 3rem;
      background: #f6f6f6;
    }

    .node.app-tools > .tools-focus {
      display: flex;
      flex: none;
      flex-direction: row;

      height: 3rem;
      width: 3rem;

      background: #f6f6f6;
    }

    .node.app-tools > .tools-inner {
    }
  `;
}
function InspectAppViews() {
    return r`
    /*  */
    .node.app-views {
      position: relative;

      display: flex;
      flex: 1;
      flex-direction: row;
    }

    .node.app-views > .app-views-plane:not([node-active]) {
      display: none;
      pointer-events: none;
    }

    .node.app-views > .app-views-plane {
      position: absolute;
      inset: 0rem 0rem;

      display: flex;
      flex-direction: column;
    }

    /*  */
    .node.app-views-navigation {
      display: flex;
      flex: none;
      flex-direction: row;

      width: min(75%, calc(100% - 1.25rem * 2));

      gap: 0.625rem;
      margin: 0rem auto 0rem auto;
      padding: 0rem 0rem 1.25rem 0rem;

      overflow-y: hidden;
      overflow-x: auto;
      overflow-x: overlay;
    }

    .node.app-views-navigation::-webkit-scrollbar {
      display: none;
    }

    /*  */
    .views-navigation-item {
      all: unset;

      display: flex;
      flex: auto;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      height: 2.5rem;

      margin: 0rem 0rem;
      padding: 0rem 0.625rem;
      
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
    }

    .views-navigation-item > span {
      flex: none;

      font-family: 'BreezeSans', 'Breeze Sans', 'ui-sans-serif', 'system-ui';
      font-size: 1rem;
      line-height: 1.25rem;

      letter-spacing: 0.012ch;
      font-weight: 500;
      color: #3a3a3a;

      border-top: 2.5px solid transparent;
      border-bottom: 2.5px solid currentColor;
    }

    .views-navigation-item:not([node-active]) > span {
      letter-spacing: 0.026ch;
      font-weight: 400;
      color: #909090;

      border-color: transparent;
    }
  `;
}
var __decorate1 = this && this.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let InspectAppExports = class InspectAppExports extends s3 {
    static styles = [
        r`
      :host {
        display: flex;
        flex: 1;
        flex-direction: column;
      }

      .node.c {
        display: flex;
        flex: 1;

        margin: 1.25rem;
        background: #c5ebdc;
      }
    `, 
    ];
    render() {
        return $` <div class="node c"></div> `;
    }
};
InspectAppExports = __decorate1([
    n4('inspect-app-exports')
], InspectAppExports);
var __decorate2 = this && this.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let InspectAppImports = class InspectAppImports extends s3 {
    static styles = [
        r`
      :host {
        display: flex;
        flex: 1;
        flex-direction: column;
      }

      .node.c {
        display: flex;
        flex: 1;

        margin: 1.25rem;
        background: #dce3ff;
      }
    `, 
    ];
    render() {
        return $` <div class="node c"></div> `;
    }
};
InspectAppImports = __decorate2([
    n4('inspect-app-imports')
], InspectAppImports);
var __decorate3 = this && this.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let InspectAppLibrary = class InspectAppLibrary extends s3 {
    static styles = [
        r`
      :host {
        display: flex;
        flex: 1;
        flex-direction: column;
      }

      .node.c {
        display: flex;
        flex: 1;

        margin: 1.25rem;
        background: #efefef;
      }
    `, 
    ];
    render() {
        return $` <div class="node c"></div> `;
    }
};
InspectAppLibrary = __decorate3([
    n4('inspect-app-library')
], InspectAppLibrary);
var __decorate4 = this && this.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let InspectAppPreview = class InspectAppPreview extends s3 {
    static styles = [
        r`
      :host {
        display: flex;
        flex: 1;
        flex-direction: column;
      }

      .node.c {
        display: flex;
        flex: 1;

        margin: 1.25rem;
        background: #f8d8a7;
      }
    `, 
    ];
    render() {
        return $` <div class="node c"></div> `;
    }
};
InspectAppPreview = __decorate4([
    n4('inspect-app-preview')
], InspectAppPreview);
var __decorate5 = this && this.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let InspectApp = class InspectApp extends s3 {
    static styles = [
        r`
      :host {
        position: relative;

        display: flex;
        flex: 1;
        flex-direction: column;

        overflow: hidden;
      }

      ${InspectAppPages()}
      ${InspectAppViews()}
      ${InspectAppTools()}
    `, 
    ];
    render() {
        return $`
      <div class="node app-pages">
        <!---->
        <div class="pages-inner" style="--page-wid: ${this.prime.length >= 1 ? 100 * this.frame.rat : 100}%;">
          <!----
          <div class="node app-tools">
            <div class="tools-focus"></div>
            <div class="tools-inner"></div>
          </div>
          !---->

          <!---->
          <div class="node app-views">
            <!---->
            ${this.aside.map((ele)=>$`<div class="app-views-plane" ?node-active="${ele.active}">${ele.node}</div> `)}
            <!---->
          </div>
          <!---->

          <!---->
          ${this.aside.length >= 2 ? $`
                <div class="node app-views-navigation">
                  ${this.aside.map((ele)=>$`
                      <button class="views-navigation-item" ?node-active="${ele.active}" @click="${this.requestView.bind(this, ele)}">
                        <span>${ele.caption}</span>
                      </button>
                    `)}
                </div>
              ` : $``}
          <!---->
        </div>
        <!---->

        <!---->
        ${this.prime.length >= 1 ? $`
              <div class="pages-inner-resize" @pointerdown="${requestMove.bind(this)}" ?node-active="${this.tra}"></div>

              <div class="pages-inner">
                <!---->
                <div class="node app-tools">
                  <div class="tools-inner"></div>
                </div>
                <!---->

                <!---->
                <div class="node app-views">
                  <!---->
                  ${this.prime.map((ele)=>$`<div class="app-views-plane" ?node-active="${true}">${ele.node}</div> `)}
                  <!---->
                </div>
                <!---->
              </div>
            ` : $``}
        <!---->
      </div>
    `;
    }
    frame;
    aside;
    prime;
    connectedCallback() {
        super.connectedCallback();
        globalThis.document.title = `Inspect - Twitch Elements`;
        this.frame = {
            rat: 1 / 2.5,
            ele: {
                imp: {
                    caption: 'Imports',
                    node: new InspectAppImports()
                },
                pre: {
                    caption: 'Preview',
                    node: new InspectAppPreview()
                },
                exp: {
                    caption: 'Exports',
                    node: new InspectAppExports()
                }
            }
        };
        this.aside = [];
        this.prime = [];
    }
    firstUpdated() {
        globalThis.addEventListener('resize', this.whenTranslate.bind(this), false);
        this.whenTranslate();
    }
    updated() {
        const seg = Object.values(this.frame.ele);
        this.prime = this.frame.lay >= 1 ? [
            seg.shift()
        ] : [];
        this.aside = this.frame.lay >= 1 ? seg : seg;
        const act = this.aside.filter((seg)=>seg.active);
        if (act.length <= 0) {
            Object.values(this.frame.ele).map((seg)=>{
                seg.active = false;
            });
            this.aside[0].active = true;
        }
    }
    whenTranslate() {
        this.frame.lay = this.parentNode.offsetWidth < 840 ? 0 : 1;
        this.requestUpdate();
        requestAnimationFrame(()=>this.requestUpdate());
    }
    requestView(ele) {
        Object.values(this.frame.ele).map((seg)=>{
            seg.active = false;
        });
        ele.active = true;
        this.requestUpdate();
    }
};
InspectApp = __decorate5([
    n4('inspect-app')
], InspectApp);

