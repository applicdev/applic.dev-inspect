// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e = Symbol(), n = new WeakMap();
class s {
    constructor(t2, n2, s3){
        if (this._$cssResult$ = true, s3 !== e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t2, this.t = n2;
    }
    get styleSheet() {
        let e2 = this.o;
        const s3 = this.t;
        if (t && e2 === void 0) {
            const t2 = s3 !== void 0 && s3.length === 1;
            t2 && (e2 = n.get(s3)), e2 === void 0 && ((this.o = e2 = new CSSStyleSheet()).replaceSync(this.cssText), t2 && n.set(s3, e2));
        }
        return e2;
    }
    toString() {
        return this.cssText;
    }
}
const o = (t2)=>new s(typeof t2 == "string" ? t2 : t2 + "", void 0, e), r = (t2, ...n2)=>{
    const o2 = t2.length === 1 ? t2[0] : n2.reduce((e2, n3, s2)=>e2 + ((t3)=>{
            if (t3._$cssResult$ === true) return t3.cssText;
            if (typeof t3 == "number") return t3;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(n3) + t2[s2 + 1], t2[0]);
    return new s(o2, t2, e);
}, i = (e2, n2)=>{
    t ? e2.adoptedStyleSheets = n2.map((t2)=>t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((t2)=>{
        const n3 = document.createElement("style"), s2 = window.litNonce;
        s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t2.cssText, e2.appendChild(n3);
    });
}, S = t ? (t2)=>t2 : (t2)=>t2 instanceof CSSStyleSheet ? ((t3)=>{
        let e2 = "";
        for (const n2 of t3.cssRules)e2 += n2.cssText;
        return o(e2);
    })(t2) : t2;
var s1;
const e1 = window.trustedTypes, r1 = e1 ? e1.emptyScript : "", h = window.reactiveElementPolyfillSupport, o1 = {
    toAttribute (t, i2) {
        switch(i2){
            case Boolean:
                t = t ? r1 : null;
                break;
            case Object:
            case Array:
                t = t == null ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute (t, i2) {
        let s2 = t;
        switch(i2){
            case Boolean:
                s2 = t !== null;
                break;
            case Number:
                s2 = t === null ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    s2 = JSON.parse(t);
                } catch (t2) {
                    s2 = null;
                }
        }
        return s2;
    }
}, n1 = (t, i2)=>i2 !== t && (i2 == i2 || t == t), l = {
    attribute: true,
    type: String,
    converter: o1,
    reflect: false,
    hasChanged: n1
};
class a extends HTMLElement {
    constructor(){
        super(), this._$Ei = new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t) {
        var i2;
        (i2 = this.h) !== null && i2 !== void 0 || (this.h = []), this.h.push(t);
    }
    static get observedAttributes() {
        this.finalize();
        const t = [];
        return this.elementProperties.forEach((i2, s2)=>{
            const e2 = this._$Ep(s2, i2);
            e2 !== void 0 && (this._$Ev.set(e2, s2), t.push(e2));
        }), t;
    }
    static createProperty(t, i2 = l) {
        if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t)) {
            const s2 = typeof t == "symbol" ? Symbol() : "__" + t, e2 = this.getPropertyDescriptor(t, s2, i2);
            e2 !== void 0 && Object.defineProperty(this.prototype, t, e2);
        }
    }
    static getPropertyDescriptor(t, i2, s2) {
        return {
            get () {
                return this[i2];
            },
            set (e2) {
                const r2 = this[t];
                this[i2] = e2, this.requestUpdate(t, r2, s2);
            },
            configurable: true,
            enumerable: true
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) || l;
    }
    static finalize() {
        if (this.hasOwnProperty("finalized")) return false;
        this.finalized = true;
        const t = Object.getPrototypeOf(this);
        if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map(), this.hasOwnProperty("properties")) {
            const t2 = this.properties, i2 = [
                ...Object.getOwnPropertyNames(t2),
                ...Object.getOwnPropertySymbols(t2)
            ];
            for (const s2 of i2)this.createProperty(s2, t2[s2]);
        }
        return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i2) {
        const s2 = [];
        if (Array.isArray(i2)) {
            const e2 = new Set(i2.flat(1 / 0).reverse());
            for (const i3 of e2)s2.unshift(S(i3));
        } else i2 !== void 0 && s2.push(S(i2));
        return s2;
    }
    static _$Ep(t, i2) {
        const s2 = i2.attribute;
        return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t == "string" ? t.toLowerCase() : void 0;
    }
    u() {
        var t;
        this._$E_ = new Promise((t2)=>this.enableUpdating = t2), this._$AL = new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((t2)=>t2(this));
    }
    addController(t) {
        var i2, s2;
        ((i2 = this._$ES) !== null && i2 !== void 0 ? i2 : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((s2 = t.hostConnected) === null || s2 === void 0 || s2.call(t));
    }
    removeController(t) {
        var i2;
        (i2 = this._$ES) === null || i2 === void 0 || i2.splice(this._$ES.indexOf(t) >>> 0, 1);
    }
    _$Eg() {
        this.constructor.elementProperties.forEach((t, i2)=>{
            this.hasOwnProperty(i2) && (this._$Ei.set(i2, this[i2]), delete this[i2]);
        });
    }
    createRenderRoot() {
        var t;
        const s2 = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
        return i(s2, this.constructor.elementStyles), s2;
    }
    connectedCallback() {
        var t;
        this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t = this._$ES) === null || t === void 0 || t.forEach((t2)=>{
            var i2;
            return (i2 = t2.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t2);
        });
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        var t;
        (t = this._$ES) === null || t === void 0 || t.forEach((t2)=>{
            var i2;
            return (i2 = t2.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t2);
        });
    }
    attributeChangedCallback(t, i2, s2) {
        this._$AK(t, s2);
    }
    _$EO(t, i2, s2 = l) {
        var e2, r2;
        const h2 = this.constructor._$Ep(t, s2);
        if (h2 !== void 0 && s2.reflect === true) {
            const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o1.toAttribute)(i2, s2.type);
            this._$El = t, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$El = null;
        }
    }
    _$AK(t, i2) {
        var s2, e2;
        const r2 = this.constructor, h2 = r2._$Ev.get(t);
        if (h2 !== void 0 && this._$El !== h2) {
            const t2 = r2.getPropertyOptions(h2), n2 = t2.converter, l2 = (e2 = (s2 = n2 == null ? void 0 : n2.fromAttribute) !== null && s2 !== void 0 ? s2 : typeof n2 == "function" ? n2 : null) !== null && e2 !== void 0 ? e2 : o1.fromAttribute;
            this._$El = h2, this[h2] = l2(i2, t2.type), this._$El = null;
        }
    }
    requestUpdate(t, i2, s2) {
        let e2 = true;
        t !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t)).hasChanged || n1)(this[t], i2) ? (this._$AL.has(t) || this._$AL.set(t, i2), s2.reflect === true && this._$El !== t && (this._$EC === void 0 && (this._$EC = new Map()), this._$EC.set(t, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
        this.isUpdatePending = true;
        try {
            await this._$E_;
        } catch (t2) {
            Promise.reject(t2);
        }
        const t = this.scheduleUpdate();
        return t != null && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        var t;
        if (!this.isUpdatePending) return;
        this.hasUpdated, this._$Ei && (this._$Ei.forEach((t2, i3)=>this[i3] = t2), this._$Ei = void 0);
        let i2 = false;
        const s2 = this._$AL;
        try {
            i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t = this._$ES) === null || t === void 0 || t.forEach((t2)=>{
                var i3;
                return (i3 = t2.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t2);
            }), this.update(s2)) : this._$Ek();
        } catch (t2) {
            throw i2 = false, this._$Ek(), t2;
        }
        i2 && this._$AE(s2);
    }
    willUpdate(t) {}
    _$AE(t) {
        var i2;
        (i2 = this._$ES) === null || i2 === void 0 || i2.forEach((t2)=>{
            var i3;
            return (i3 = t2.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t2);
        }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t)), this.updated(t);
    }
    _$Ek() {
        this._$AL = new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$E_;
    }
    shouldUpdate(t) {
        return true;
    }
    update(t) {
        this._$EC !== void 0 && (this._$EC.forEach((t2, i2)=>this._$EO(i2, this[i2], t2)), this._$EC = void 0), this._$Ek();
    }
    updated(t) {}
    firstUpdated(t) {}
}
a.finalized = true, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = {
    mode: "open"
}, h == null || h({
    ReactiveElement: a
}), ((s1 = globalThis.reactiveElementVersions) !== null && s1 !== void 0 ? s1 : globalThis.reactiveElementVersions = []).push("1.3.4");
var t1;
const i1 = globalThis.trustedTypes, s2 = i1 ? i1.createPolicy("lit-html", {
    createHTML: (t2)=>t2
}) : void 0, e2 = `lit$${(Math.random() + "").slice(9)}$`, o2 = "?" + e2, n2 = `<${o2}>`, l1 = document, h1 = (t2 = "")=>l1.createComment(t2), r2 = (t2)=>t2 === null || typeof t2 != "object" && typeof t2 != "function", d = Array.isArray, u = (t2)=>d(t2) || typeof (t2 == null ? void 0 : t2[Symbol.iterator]) == "function", c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a1 = />/g, f = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _ = /'/g, g = /"/g, m = /^(?:script|style|textarea|title)$/i, p = (t2)=>(i2, ...s2)=>({
            _$litType$: t2,
            strings: i2,
            values: s2
        }), $ = p(1), y = p(2), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), x = new WeakMap(), T = (t2, i2, s2)=>{
    var e2, o2;
    const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
    let l2 = n2._$litPart$;
    if (l2 === void 0) {
        const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
        n2._$litPart$ = l2 = new N(i2.insertBefore(h1(), t3), t3, void 0, s2 != null ? s2 : {});
    }
    return l2._$AI(t2), l2;
}, A = l1.createTreeWalker(l1, 129, null, false), E = (t2, i2)=>{
    const o2 = t2.length - 1, l2 = [];
    let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c;
    for(let i3 = 0; i3 < o2; i3++){
        const s21 = t2[i3];
        let o3, u3, p2 = -1, $2 = 0;
        for(; $2 < s21.length && (d2.lastIndex = $2, u3 = d2.exec(s21), u3 !== null);)$2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a1 : u3[2] !== void 0 ? (m.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c, p2 = -1) : u3[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? g : _) : d2 === g || d2 === _ ? d2 = f : d2 === v || d2 === a1 ? d2 = c : (d2 = f, h2 = void 0);
        const y2 = d2 === f && t2[i3 + 1].startsWith("/>") ? " " : "";
        r2 += d2 === c ? s21 + n2 : p2 >= 0 ? (l2.push(o3), s21.slice(0, p2) + "$lit$" + s21.slice(p2) + e2 + y2) : s21 + e2 + (p2 === -2 ? (l2.push(void 0), i3) : y2);
    }
    const u2 = r2 + (t2[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
    if (!Array.isArray(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return [
        s2 !== void 0 ? s2.createHTML(u2) : u2,
        l2
    ];
};
class C {
    constructor({ strings: t2 , _$litType$: s2  }, n2){
        let l2;
        this.parts = [];
        let r2 = 0, d2 = 0;
        const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = E(t2, s2);
        if (this.el = C.createElement(v2, n2), A.currentNode = this.el.content, s2 === 2) {
            const t3 = this.el.content, i2 = t3.firstChild;
            i2.remove(), t3.append(...i2.childNodes);
        }
        for(; (l2 = A.nextNode()) !== null && c2.length < u2;){
            if (l2.nodeType === 1) {
                if (l2.hasAttributes()) {
                    const t31 = [];
                    for (const i21 of l2.getAttributeNames())if (i21.endsWith("$lit$") || i21.startsWith(e2)) {
                        const s3 = a2[d2++];
                        if (t31.push(i21), s3 !== void 0) {
                            const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e2), i3 = /([.?@])?(.*)/.exec(s3);
                            c2.push({
                                type: 1,
                                index: r2,
                                name: i3[2],
                                strings: t4,
                                ctor: i3[1] === "." ? M : i3[1] === "?" ? k : i3[1] === "@" ? H : S1
                            });
                        } else c2.push({
                            type: 6,
                            index: r2
                        });
                    }
                    for (const i22 of t31)l2.removeAttribute(i22);
                }
                if (m.test(l2.tagName)) {
                    const t32 = l2.textContent.split(e2), s31 = t32.length - 1;
                    if (s31 > 0) {
                        l2.textContent = i1 ? i1.emptyScript : "";
                        for(let i23 = 0; i23 < s31; i23++)l2.append(t32[i23], h1()), A.nextNode(), c2.push({
                            type: 2,
                            index: ++r2
                        });
                        l2.append(t32[s31], h1());
                    }
                }
            } else if (l2.nodeType === 8) if (l2.data === o2) c2.push({
                type: 2,
                index: r2
            });
            else {
                let t33 = -1;
                for(; (t33 = l2.data.indexOf(e2, t33 + 1)) !== -1;)c2.push({
                    type: 7,
                    index: r2
                }), t33 += e2.length - 1;
            }
            r2++;
        }
    }
    static createElement(t2, i2) {
        const s2 = l1.createElement("template");
        return s2.innerHTML = t2, s2;
    }
}
function P(t2, i2, s2 = t2, e2) {
    var o2, n2, l2, h2;
    if (i2 === b) return i2;
    let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
    const u2 = r2(i2) ? void 0 : i2._$litDirective$;
    return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
}
class V {
    constructor(t2, i2){
        this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    p(t2) {
        var i2;
        const { el: { content: s2  } , parts: e2  } = this._$AD, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : l1).importNode(s2, true);
        A.currentNode = o2;
        let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
        for(; d2 !== void 0;){
            if (h2 === d2.index) {
                let i3;
                d2.type === 2 ? i3 = new N(n2, n2.nextSibling, this, t2) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : d2.type === 6 && (i3 = new I(n2, this, t2)), this.v.push(i3), d2 = e2[++r2];
            }
            h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
        }
        return o2;
    }
    m(t2) {
        let i2 = 0;
        for (const s2 of this.v)s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
    }
}
class N {
    constructor(t2, i2, s2, e2){
        var o2;
        this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$C_ = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
    }
    get _$AU() {
        var t2, i2;
        return (i2 = (t2 = this._$AM) === null || t2 === void 0 ? void 0 : t2._$AU) !== null && i2 !== void 0 ? i2 : this._$C_;
    }
    get parentNode() {
        let t2 = this._$AA.parentNode;
        const i2 = this._$AM;
        return i2 !== void 0 && t2.nodeType === 11 && (t2 = i2.parentNode), t2;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t2, i2 = this) {
        t2 = P(this, t2, i2), r2(t2) ? t2 === w || t2 == null || t2 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t2 !== this._$AH && t2 !== b && this.T(t2) : t2._$litType$ !== void 0 ? this.$(t2) : t2.nodeType !== void 0 ? this.k(t2) : u(t2) ? this.S(t2) : this.T(t2);
    }
    j(t2, i2 = this._$AB) {
        return this._$AA.parentNode.insertBefore(t2, i2);
    }
    k(t2) {
        this._$AH !== t2 && (this._$AR(), this._$AH = this.j(t2));
    }
    T(t2) {
        this._$AH !== w && r2(this._$AH) ? this._$AA.nextSibling.data = t2 : this.k(l1.createTextNode(t2)), this._$AH = t2;
    }
    $(t2) {
        var i2;
        const { values: s2 , _$litType$: e2  } = t2, o2 = typeof e2 == "number" ? this._$AC(t2) : (e2.el === void 0 && (e2.el = C.createElement(e2.h, this.options)), e2);
        if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2) this._$AH.m(s2);
        else {
            const t3 = new V(o2, this), i3 = t3.p(this.options);
            t3.m(s2), this.k(i3), this._$AH = t3;
        }
    }
    _$AC(t2) {
        let i2 = x.get(t2.strings);
        return i2 === void 0 && x.set(t2.strings, i2 = new C(t2)), i2;
    }
    S(t2) {
        d(this._$AH) || (this._$AH = [], this._$AR());
        const i2 = this._$AH;
        let s2, e2 = 0;
        for (const o2 of t2)e2 === i2.length ? i2.push(s2 = new N(this.j(h1()), this.j(h1()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
        e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
    }
    _$AR(t2 = this._$AA.nextSibling, i2) {
        var s2;
        for((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB;){
            const i3 = t2.nextSibling;
            t2.remove(), t2 = i3;
        }
    }
    setConnected(t2) {
        var i2;
        this._$AM === void 0 && (this._$C_ = t2, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t2));
    }
}
class S1 {
    constructor(t2, i2, s2, e2, o2){
        this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = w;
    }
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t2, i2 = this, s2, e2) {
        const o2 = this.strings;
        let n2 = false;
        if (o2 === void 0) t2 = P(this, t2, i2, 0), n2 = !r2(t2) || t2 !== this._$AH && t2 !== b, n2 && (this._$AH = t2);
        else {
            const e3 = t2;
            let l2, h2;
            for(t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)h2 = P(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r2(h2) || h2 !== this._$AH[l2]), h2 === w ? t2 = w : t2 !== w && (t2 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
        }
        n2 && !e2 && this.P(t2);
    }
    P(t2) {
        t2 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
    }
}
class M extends S1 {
    constructor(){
        super(...arguments), this.type = 3;
    }
    P(t2) {
        this.element[this.name] = t2 === w ? void 0 : t2;
    }
}
const R = i1 ? i1.emptyScript : "";
class k extends S1 {
    constructor(){
        super(...arguments), this.type = 4;
    }
    P(t2) {
        t2 && t2 !== w ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
    }
}
class H extends S1 {
    constructor(t2, i2, s2, e2, o2){
        super(t2, i2, s2, e2, o2), this.type = 5;
    }
    _$AI(t2, i2 = this) {
        var s2;
        if ((t2 = (s2 = P(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : w) === b) return;
        const e2 = this._$AH, o2 = t2 === w && e2 !== w || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== w && (e2 === w || o2);
        o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
    }
    handleEvent(t2) {
        var i2, s2;
        typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
    }
}
class I {
    constructor(t2, i2, s2){
        this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t2) {
        P(this, t2);
    }
}
const z = window.litHtmlPolyfillSupport;
z == null || z(C, N), ((t1 = globalThis.litHtmlVersions) !== null && t1 !== void 0 ? t1 : globalThis.litHtmlVersions = []).push("2.2.7");
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
        return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
    }
    update(t) {
        const i = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = T(i, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        var t;
        super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(true);
    }
    disconnectedCallback() {
        var t;
        super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(false);
    }
    render() {
        return b;
    }
}
s3.finalized = true, s3._$litElement$ = true, (l2 = globalThis.litElementHydrateSupport) === null || l2 === void 0 || l2.call(globalThis, {
    LitElement: s3
});
const n3 = globalThis.litElementPolyfillSupport;
n3 == null || n3({
    LitElement: s3
});
((o3 = globalThis.litElementVersions) !== null && o3 !== void 0 ? o3 : globalThis.litElementVersions = []).push("3.2.2");
const n4 = (n2)=>(e)=>typeof e == "function" ? ((n3, e2)=>(window.customElements.define(n3, e2), e2))(n2, e) : ((n3, e2)=>{
            const { kind: t , elements: i  } = e2;
            return {
                kind: t,
                elements: i,
                finisher (e3) {
                    window.customElements.define(n3, e3);
                }
            };
        })(n2, e);
var n5;
((n5 = window.HTMLSlotElement) === null || n5 === void 0 ? void 0 : n5.prototype.assignedElements) != null ? (o2, n2)=>o2.assignedElements(n2) : (o2, n2)=>o2.assignedNodes(n2).filter((o3)=>o3.nodeType === Node.ELEMENT_NODE);
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
function r3(r2) {
    return "Minified Redux error #" + r2 + "; visit https://redux.js.org/Errors?code=" + r2 + " for the full message or use the non-minified dev environment for full errors. ";
}
var t2 = typeof Symbol == "function" && Symbol.observable || "@@observable", n6 = function() {
    return Math.random().toString(36).substring(7).split("").join(".");
}, e3 = {
    INIT: "@@redux/INIT" + n6(),
    REPLACE: "@@redux/REPLACE" + n6(),
    PROBE_UNKNOWN_ACTION: function() {
        return "@@redux/PROBE_UNKNOWN_ACTION" + n6();
    }
};
function o4(r2) {
    if (typeof r2 != "object" || r2 === null) return false;
    for(var t2 = r2; Object.getPrototypeOf(t2) !== null;)t2 = Object.getPrototypeOf(t2);
    return Object.getPrototypeOf(r2) === t2;
}
function i2(n2, f2, u2) {
    var c2;
    if (typeof f2 == "function" && typeof u2 == "function" || typeof u2 == "function" && typeof arguments[3] == "function") throw Error(r3(0));
    if (typeof f2 == "function" && u2 === void 0 && (u2 = f2, f2 = void 0), u2 !== void 0) {
        if (typeof u2 != "function") throw Error(r3(1));
        return u2(i2)(n2, f2);
    }
    if (typeof n2 != "function") throw Error(r3(2));
    var p2 = n2, a2 = f2, y2 = [], l2 = y2, s2 = false;
    function v2() {
        l2 === y2 && (l2 = y2.slice());
    }
    function h() {
        if (s2) throw Error(r3(3));
        return a2;
    }
    function b(t2) {
        if (typeof t2 != "function") throw Error(r3(4));
        if (s2) throw Error(r3(5));
        var n3 = true;
        return v2(), l2.push(t2), function() {
            if (n3) {
                if (s2) throw Error(r3(6));
                n3 = false, v2();
                var e2 = l2.indexOf(t2);
                l2.splice(e2, 1), y2 = null;
            }
        };
    }
    function O(t2) {
        if (!o4(t2)) throw Error(r3(7));
        if (t2.type === void 0) throw Error(r3(8));
        if (s2) throw Error(r3(9));
        try {
            s2 = true, a2 = p2(a2, t2);
        } finally{
            s2 = false;
        }
        for(var n3 = y2 = l2, e2 = 0; n3.length > e2; e2++){
            (0, n3[e2])();
        }
        return t2;
    }
    function d(t2) {
        if (typeof t2 != "function") throw Error(r3(10));
        p2 = t2, O({
            type: e3.REPLACE
        });
    }
    function E() {
        var n3, e2 = b;
        return (n3 = {
            subscribe: function(t2) {
                if (typeof t2 != "object" || t2 === null) throw Error(r3(11));
                function n4() {
                    t2.next && t2.next(h());
                }
                return n4(), {
                    unsubscribe: e2(n4)
                };
            }
        })[t2] = function() {
            return this;
        }, n3;
    }
    return O({
        type: e3.INIT
    }), (c2 = {
        dispatch: O,
        subscribe: b,
        getState: h,
        replaceReducer: d
    })[t2] = E, c2;
}
const initial = {
    shortlived: {
        version: 0
    },
    persistent: {
        'debug:counter': {
            val: 0
        },
        scheme: {
            type: 0,
            role: 0
        },
        config: {}
    }
};
const storage = i2((state, { type  }, value)=>{
    if (!state) state = {
        ...initial.shortlived,
        ...initial.persistent
    };
    switch(type){
        case 'storage:sync':
            state = {
                ...state,
                ...value
            };
            break;
        case 'counter:inc':
            state['debug:counter'].val += 1;
            break;
        case 'counter:dec':
            state['debug:counter'].val -= 1;
            break;
    }
    return state;
});
function storageChanged({ force  }) {
    const cur = globalThis.localStorage;
    const sta = storage.getState();
    for(const k in cur){
        if (Object.prototype.hasOwnProperty.call(cur, k)) {
            if (!force && cur.getItem(k) == JSON.stringify(sta[k])) continue;
            if (k in sta) {
                sta[k] = JSON.parse(cur.getItem(k));
            }
        }
    }
    for(const k1 in cur){
        if (Object.prototype.hasOwnProperty.call(cur, k1)) {
            if (k1 in initial.shortlived || k1 in initial.persistent) continue;
            localStorage.removeItem(k1);
        }
    }
    storage.dispatch({
        type: 'storage:sync'
    }, sta);
}
if (initial.shortlived.version != storage.getState().version) {
    globalThis.localStorage.clear();
    globalThis.localStorage.setItem('version', initial.shortlived.version);
}
storageChanged({
    force: true
});
globalThis.addEventListener('storage', storageChanged);
storage.subscribe(()=>{
    const cur = globalThis.localStorage;
    const sta = storage.getState();
    for(const k in sta){
        if (k in initial.shortlived) continue;
        const pla = JSON.stringify(sta[k]);
        const val = cur.getItem(k);
        if (val != pla) {
            globalThis.localStorage.setItem(k, pla);
        }
    }
});
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
        const rat = Math.round((start.x + pos.x + delta) / wid * 1000) / 1000;
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

      min-width: var(--page-wid, unset);
      max-width: var(--page-wid, unset);

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
      background: transparent;

      transition: background 20ms 0ms;
    }
    
    .pages-inner-resize[node-active] {
      background: #858585;
      transition: background 20ms 50ms;
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

        padding: 1.25rem;
      }

      .node.c {
        display: flex;
        flex: 1;
        background: #dce3ff;
      }
    `, 
    ];
    render() {
        return $`
      <div class="">
        <button @click="${this.storageInc.bind(this)}">+</button>
        <button @click="${this.storageDec.bind(this)}">-</button>
        <br />
        <h2>Counter: ${this.storage['debug:counter'].val}</h2>
      </div>
      <div class="node c"></div>
    `;
    }
    storageInc() {
        storage.dispatch({
            type: 'counter:inc'
        }, {});
    }
    storageDec() {
        storage.dispatch({
            type: 'counter:dec'
        }, {});
    }
    constructor(){
        super();
        this.storage = storage.getState();
    }
    firstUpdated() {
        storage.subscribe(()=>{
            this.storage = storage.getState();
            this.requestUpdate();
        });
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
    `, 
    ];
    render() {
        return $`
      <div class="node app-pages">
        <!---->
        <div class="pages-inner" style="--page-wid: calc(${this.prime.length >= 1 ? `${100 * this.frame.rat}% + 0.625rem` : '100%'})">
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
        this.frame.rat = Math.max(0.1, Math.min(0.9, this.frame.rat));
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
requestAnimationFrame(()=>{
    globalThis.document.title = `Inspect - Twitch Elements`;
});

