import{r as ye,j as b,u as ze,R as Fe,_ as Ue}from"./index-D5vEyPHo.js";import{z as Te,u as We,t as $e,F as qe,a as Ie,b as Re,c as ke}from"./form-DoCkAq2a.js";import{F as He,a as Ae}from"./index-BhiIR7t5.js";import{U as Ye,a as Xe}from"./App-Djhw_SJK.js";import{c as Je,B as Ge}from"./createLucideIcon-8mYcU7v_.js";import{I as Ne}from"./input-2rwcTciZ.js";import{L as Ke}from"./loader-circle-BuNOI4_W.js";import{L as Qe}from"./routes-B8Fxvvtg.js";import"./label-_-sDx8Dq.js";import"./iconBase-Kpgs8Efe.js";const Ze="/assets/LRSlogo-DjM5HuCv.png";var Ce={exports:{}};(()=>{var de={296:(m,d,c)=>{var A=/^\s+|\s+$/g,k=/^[-+]0x[0-9a-f]+$/i,U=/^0b[01]+$/i,O=/^0o[0-7]+$/i,E=parseInt,R=typeof c.g=="object"&&c.g&&c.g.Object===Object&&c.g,Y=typeof self=="object"&&self&&self.Object===Object&&self,W=R||Y||Function("return this")(),fe=Object.prototype.toString,ee=Math.max,ce=Math.min,ne=function(){return W.Date.now()};function oe(h){var x=typeof h;return!!h&&(x=="object"||x=="function")}function be(h){if(typeof h=="number")return h;if(function(u){return typeof u=="symbol"||function(g){return!!g&&typeof g=="object"}(u)&&fe.call(u)=="[object Symbol]"}(h))return NaN;if(oe(h)){var x=typeof h.valueOf=="function"?h.valueOf():h;h=oe(x)?x+"":x}if(typeof h!="string")return h===0?h:+h;h=h.replace(A,"");var $=U.test(h);return $||O.test(h)?E(h.slice(2),$?2:8):k.test(h)?NaN:+h}m.exports=function(h,x,$){var u,g,F,N,_,q,C=0,G=!1,M=!1,K=!0;if(typeof h!="function")throw new TypeError("Expected a function");function te(L){var V=u,J=g;return u=g=void 0,C=L,N=h.apply(J,V)}function re(L){var V=L-q;return q===void 0||V>=x||V<0||M&&L-C>=F}function j(){var L=ne();if(re(L))return Q(L);_=setTimeout(j,function(V){var J=x-(V-q);return M?ce(J,F-(V-C)):J}(L))}function Q(L){return _=void 0,K&&u?te(L):(u=g=void 0,N)}function X(){var L=ne(),V=re(L);if(u=arguments,g=this,q=L,V){if(_===void 0)return function(J){return C=J,_=setTimeout(j,x),G?te(J):N}(q);if(M)return _=setTimeout(j,x),te(q)}return _===void 0&&(_=setTimeout(j,x)),N}return x=be(x)||0,oe($)&&(G=!!$.leading,F=(M="maxWait"in $)?ee(be($.maxWait)||0,x):F,K="trailing"in $?!!$.trailing:K),X.cancel=function(){_!==void 0&&clearTimeout(_),C=0,u=q=g=_=void 0},X.flush=function(){return _===void 0?N:Q(ne())},X}},96:(m,d,c)=>{var A="Expected a function",k=NaN,U="[object Symbol]",O=/^\s+|\s+$/g,E=/^[-+]0x[0-9a-f]+$/i,R=/^0b[01]+$/i,Y=/^0o[0-7]+$/i,W=parseInt,fe=typeof c.g=="object"&&c.g&&c.g.Object===Object&&c.g,ee=typeof self=="object"&&self&&self.Object===Object&&self,ce=fe||ee||Function("return this")(),ne=Object.prototype.toString,oe=Math.max,be=Math.min,h=function(){return ce.Date.now()};function x(u){var g=typeof u;return!!u&&(g=="object"||g=="function")}function $(u){if(typeof u=="number")return u;if(function(N){return typeof N=="symbol"||function(_){return!!_&&typeof _=="object"}(N)&&ne.call(N)==U}(u))return k;if(x(u)){var g=typeof u.valueOf=="function"?u.valueOf():u;u=x(g)?g+"":g}if(typeof u!="string")return u===0?u:+u;u=u.replace(O,"");var F=R.test(u);return F||Y.test(u)?W(u.slice(2),F?2:8):E.test(u)?k:+u}m.exports=function(u,g,F){var N=!0,_=!0;if(typeof u!="function")throw new TypeError(A);return x(F)&&(N="leading"in F?!!F.leading:N,_="trailing"in F?!!F.trailing:_),function(q,C,G){var M,K,te,re,j,Q,X=0,L=!1,V=!1,J=!0;if(typeof q!="function")throw new TypeError(A);function ie(D){var Z=M,H=K;return M=K=void 0,X=D,re=q.apply(H,Z)}function ve(D){var Z=D-Q;return Q===void 0||Z>=C||Z<0||V&&D-X>=te}function le(){var D=h();if(ve(D))return he(D);j=setTimeout(le,function(Z){var H=C-(Z-Q);return V?be(H,te-(Z-X)):H}(D))}function he(D){return j=void 0,J&&M?ie(D):(M=K=void 0,re)}function ue(){var D=h(),Z=ve(D);if(M=arguments,K=this,Q=D,Z){if(j===void 0)return function(H){return X=H,j=setTimeout(le,C),L?ie(H):re}(Q);if(V)return j=setTimeout(le,C),ie(Q)}return j===void 0&&(j=setTimeout(le,C)),re}return C=$(C)||0,x(G)&&(L=!!G.leading,te=(V="maxWait"in G)?oe($(G.maxWait)||0,C):te,J="trailing"in G?!!G.trailing:J),ue.cancel=function(){j!==void 0&&clearTimeout(j),X=0,M=Q=K=j=void 0},ue.flush=function(){return j===void 0?re:he(h())},ue}(u,g,{leading:N,maxWait:g,trailing:_})}},703:(m,d,c)=>{var A=c(414);function k(){}function U(){}U.resetWarningCache=k,m.exports=function(){function O(Y,W,fe,ee,ce,ne){if(ne!==A){var oe=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw oe.name="Invariant Violation",oe}}function E(){return O}O.isRequired=O;var R={array:O,bigint:O,bool:O,func:O,number:O,object:O,string:O,symbol:O,any:O,arrayOf:E,element:O,elementType:O,instanceOf:E,node:O,objectOf:E,oneOf:E,oneOfType:E,shape:E,exact:E,checkPropTypes:U,resetWarningCache:k};return R.PropTypes=R,R}},697:(m,d,c)=>{m.exports=c(703)()},414:m=>{m.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},ae={};function S(m){var d=ae[m];if(d!==void 0)return d.exports;var c=ae[m]={exports:{}};return de[m](c,c.exports,S),c.exports}S.n=m=>{var d=m&&m.__esModule?()=>m.default:()=>m;return S.d(d,{a:d}),d},S.d=(m,d)=>{for(var c in d)S.o(d,c)&&!S.o(m,c)&&Object.defineProperty(m,c,{enumerable:!0,get:d[c]})},S.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),S.o=(m,d)=>Object.prototype.hasOwnProperty.call(m,d),S.r=m=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(m,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(m,"__esModule",{value:!0})};var se={};(()=>{S.r(se),S.d(se,{LazyLoadComponent:()=>Z,LazyLoadImage:()=>Ve,trackWindowScroll:()=>re});const m=ye;var d=S.n(m),c=S(697);function A(){return typeof window<"u"&&"IntersectionObserver"in window&&"isIntersecting"in window.IntersectionObserverEntry.prototype}function k(n){return k=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(n)}function U(n,e){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(f){return Object.getOwnPropertyDescriptor(n,f).enumerable})),o.push.apply(o,i)}return o}function O(n,e,o){return(e=R(e))in n?Object.defineProperty(n,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[e]=o,n}function E(n,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,R(i.key),i)}}function R(n){var e=function(o,i){if(k(o)!=="object"||o===null)return o;var f=o[Symbol.toPrimitive];if(f!==void 0){var p=f.call(o,"string");if(k(p)!=="object")return p;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(n);return k(e)==="symbol"?e:String(e)}function Y(n,e){return Y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,i){return o.__proto__=i,o},Y(n,e)}function W(n){return W=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},W(n)}var fe=function(n){n.forEach(function(e){e.isIntersecting&&e.target.onVisible()})},ee={},ce=function(n){(function(t,r){if(typeof r!="function"&&r!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),r&&Y(t,r)})(v,n);var e,o,i,f,p=(i=v,f=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var t,r=W(i);if(f){var l=W(this).constructor;t=Reflect.construct(r,arguments,l)}else t=r.apply(this,arguments);return function(a,s){if(s&&(k(s)==="object"||typeof s=="function"))return s;if(s!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return function(y){if(y===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return y}(a)}(this,t)});function v(t){var r;if(function(a,s){if(!(a instanceof s))throw new TypeError("Cannot call a class as a function")}(this,v),(r=p.call(this,t)).supportsObserver=!t.scrollPosition&&t.useIntersectionObserver&&A(),r.supportsObserver){var l=t.threshold;r.observer=function(a){return ee[a]=ee[a]||new IntersectionObserver(fe,{rootMargin:a+"px"}),ee[a]}(l)}return r}return e=v,o=[{key:"componentDidMount",value:function(){this.placeholder&&this.observer&&(this.placeholder.onVisible=this.props.onVisible,this.observer.observe(this.placeholder)),this.supportsObserver||this.updateVisibility()}},{key:"componentWillUnmount",value:function(){this.observer&&this.placeholder&&this.observer.unobserve(this.placeholder)}},{key:"componentDidUpdate",value:function(){this.supportsObserver||this.updateVisibility()}},{key:"getPlaceholderBoundingBox",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.props.scrollPosition,r=this.placeholder.getBoundingClientRect(),l=this.placeholder.style,a=parseInt(l.getPropertyValue("margin-left"),10)||0,s=parseInt(l.getPropertyValue("margin-top"),10)||0;return{bottom:t.y+r.bottom+s,left:t.x+r.left+a,right:t.x+r.right+a,top:t.y+r.top+s}}},{key:"isPlaceholderInViewport",value:function(){if(typeof window>"u"||!this.placeholder)return!1;var t=this.props,r=t.scrollPosition,l=t.threshold,a=this.getPlaceholderBoundingBox(r),s=r.y+window.innerHeight,y=r.x,P=r.x+window.innerWidth,T=r.y;return T-l<=a.bottom&&s+l>=a.top&&y-l<=a.right&&P+l>=a.left}},{key:"updateVisibility",value:function(){this.isPlaceholderInViewport()&&this.props.onVisible()}},{key:"render",value:function(){var t=this,r=this.props,l=r.className,a=r.height,s=r.placeholder,y=r.style,P=r.width;if(s&&typeof s.type!="function")return d().cloneElement(s,{ref:function(w){return t.placeholder=w}});var T=function(w){for(var B=1;B<arguments.length;B++){var I=arguments[B]!=null?arguments[B]:{};B%2?U(Object(I),!0).forEach(function(z){O(w,z,I[z])}):Object.getOwnPropertyDescriptors?Object.defineProperties(w,Object.getOwnPropertyDescriptors(I)):U(Object(I)).forEach(function(z){Object.defineProperty(w,z,Object.getOwnPropertyDescriptor(I,z))})}return w}({display:"inline-block"},y);return P!==void 0&&(T.width=P),a!==void 0&&(T.height=a),d().createElement("span",{className:l,ref:function(w){return t.placeholder=w},style:T},s)}}],o&&E(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),v}(d().Component);ce.propTypes={onVisible:c.PropTypes.func.isRequired,className:c.PropTypes.string,height:c.PropTypes.oneOfType([c.PropTypes.number,c.PropTypes.string]),placeholder:c.PropTypes.element,threshold:c.PropTypes.number,useIntersectionObserver:c.PropTypes.bool,scrollPosition:c.PropTypes.shape({x:c.PropTypes.number.isRequired,y:c.PropTypes.number.isRequired}),width:c.PropTypes.oneOfType([c.PropTypes.number,c.PropTypes.string])},ce.defaultProps={className:"",placeholder:null,threshold:100,useIntersectionObserver:!0};const ne=ce;var oe=S(296),be=S.n(oe),h=S(96),x=S.n(h),$=function(n){var e=getComputedStyle(n,null);return e.getPropertyValue("overflow")+e.getPropertyValue("overflow-y")+e.getPropertyValue("overflow-x")};const u=function(n){if(!(n instanceof HTMLElement))return window;for(var e=n;e&&e instanceof HTMLElement;){if(/(scroll|auto)/.test($(e)))return e;e=e.parentNode}return window};function g(n){return g=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(n)}var F=["delayMethod","delayTime"];function N(){return N=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(n[i]=o[i])}return n},N.apply(this,arguments)}function _(n,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,(f=function(p,v){if(g(p)!=="object"||p===null)return p;var t=p[Symbol.toPrimitive];if(t!==void 0){var r=t.call(p,"string");if(g(r)!=="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),g(f)==="symbol"?f:String(f)),i)}var f}function q(n,e){return q=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,i){return o.__proto__=i,o},q(n,e)}function C(n,e){if(e&&(g(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return G(n)}function G(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function M(n){return M=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},M(n)}var K=function(){return typeof window>"u"?0:window.scrollX||window.pageXOffset},te=function(){return typeof window>"u"?0:window.scrollY||window.pageYOffset};const re=function(n){var e=function(o){(function(l,a){if(typeof a!="function"&&a!==null)throw new TypeError("Super expression must either be null or a function");l.prototype=Object.create(a&&a.prototype,{constructor:{value:l,writable:!0,configurable:!0}}),Object.defineProperty(l,"prototype",{writable:!1}),a&&q(l,a)})(r,o);var i,f,p,v,t=(p=r,v=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var l,a=M(p);if(v){var s=M(this).constructor;l=Reflect.construct(a,arguments,s)}else l=a.apply(this,arguments);return C(this,l)});function r(l){var a;if(function(y,P){if(!(y instanceof P))throw new TypeError("Cannot call a class as a function")}(this,r),(a=t.call(this,l)).useIntersectionObserver=l.useIntersectionObserver&&A(),a.useIntersectionObserver)return C(a);var s=a.onChangeScroll.bind(G(a));return l.delayMethod==="debounce"?a.delayedScroll=be()(s,l.delayTime):l.delayMethod==="throttle"&&(a.delayedScroll=x()(s,l.delayTime)),a.state={scrollPosition:{x:K(),y:te()}},a.baseComponentRef=d().createRef(),a}return i=r,(f=[{key:"componentDidMount",value:function(){this.addListeners()}},{key:"componentWillUnmount",value:function(){this.removeListeners()}},{key:"componentDidUpdate",value:function(){typeof window>"u"||this.useIntersectionObserver||u(this.baseComponentRef.current)!==this.scrollElement&&(this.removeListeners(),this.addListeners())}},{key:"addListeners",value:function(){typeof window>"u"||this.useIntersectionObserver||(this.scrollElement=u(this.baseComponentRef.current),this.scrollElement.addEventListener("scroll",this.delayedScroll,{passive:!0}),window.addEventListener("resize",this.delayedScroll,{passive:!0}),this.scrollElement!==window&&window.addEventListener("scroll",this.delayedScroll,{passive:!0}))}},{key:"removeListeners",value:function(){typeof window>"u"||this.useIntersectionObserver||(this.scrollElement.removeEventListener("scroll",this.delayedScroll),window.removeEventListener("resize",this.delayedScroll),this.scrollElement!==window&&window.removeEventListener("scroll",this.delayedScroll))}},{key:"onChangeScroll",value:function(){this.useIntersectionObserver||this.setState({scrollPosition:{x:K(),y:te()}})}},{key:"render",value:function(){var l=this.props,a=(l.delayMethod,l.delayTime,function(y,P){if(y==null)return{};var T,w,B=function(z,me){if(z==null)return{};var pe,Oe,Ee={},_e=Object.keys(z);for(Oe=0;Oe<_e.length;Oe++)pe=_e[Oe],me.indexOf(pe)>=0||(Ee[pe]=z[pe]);return Ee}(y,P);if(Object.getOwnPropertySymbols){var I=Object.getOwnPropertySymbols(y);for(w=0;w<I.length;w++)T=I[w],P.indexOf(T)>=0||Object.prototype.propertyIsEnumerable.call(y,T)&&(B[T]=y[T])}return B}(l,F)),s=this.useIntersectionObserver?null:this.state.scrollPosition;return d().createElement(n,N({forwardRef:this.baseComponentRef,scrollPosition:s},a))}}])&&_(i.prototype,f),Object.defineProperty(i,"prototype",{writable:!1}),r}(d().Component);return e.propTypes={delayMethod:c.PropTypes.oneOf(["debounce","throttle"]),delayTime:c.PropTypes.number,useIntersectionObserver:c.PropTypes.bool},e.defaultProps={delayMethod:"throttle",delayTime:300,useIntersectionObserver:!0},e};function j(n){return j=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(n)}function Q(n,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,(f=function(p,v){if(j(p)!=="object"||p===null)return p;var t=p[Symbol.toPrimitive];if(t!==void 0){var r=t.call(p,"string");if(j(r)!=="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),j(f)==="symbol"?f:String(f)),i)}var f}function X(n,e){return X=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,i){return o.__proto__=i,o},X(n,e)}function L(n){return L=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},L(n)}var V=function(n){(function(t,r){if(typeof r!="function"&&r!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),r&&X(t,r)})(v,n);var e,o,i,f,p=(i=v,f=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var t,r=L(i);if(f){var l=L(this).constructor;t=Reflect.construct(r,arguments,l)}else t=r.apply(this,arguments);return function(a,s){if(s&&(j(s)==="object"||typeof s=="function"))return s;if(s!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return function(y){if(y===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return y}(a)}(this,t)});function v(t){return function(r,l){if(!(r instanceof l))throw new TypeError("Cannot call a class as a function")}(this,v),p.call(this,t)}return e=v,(o=[{key:"render",value:function(){return d().createElement(ne,this.props)}}])&&Q(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),v}(d().Component);const J=re(V);function ie(n){return ie=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ie(n)}function ve(n,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,(f=function(p,v){if(ie(p)!=="object"||p===null)return p;var t=p[Symbol.toPrimitive];if(t!==void 0){var r=t.call(p,"string");if(ie(r)!=="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),ie(f)==="symbol"?f:String(f)),i)}var f}function le(n,e){return le=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,i){return o.__proto__=i,o},le(n,e)}function he(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function ue(n){return ue=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},ue(n)}var D=function(n){(function(t,r){if(typeof r!="function"&&r!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),r&&le(t,r)})(v,n);var e,o,i,f,p=(i=v,f=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var t,r=ue(i);if(f){var l=ue(this).constructor;t=Reflect.construct(r,arguments,l)}else t=r.apply(this,arguments);return function(a,s){if(s&&(ie(s)==="object"||typeof s=="function"))return s;if(s!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return he(a)}(this,t)});function v(t){var r;(function(P,T){if(!(P instanceof T))throw new TypeError("Cannot call a class as a function")})(this,v),r=p.call(this,t);var l=t.afterLoad,a=t.beforeLoad,s=t.scrollPosition,y=t.visibleByDefault;return r.state={visible:y},y&&(a(),l()),r.onVisible=r.onVisible.bind(he(r)),r.isScrollTracked=!!(s&&Number.isFinite(s.x)&&s.x>=0&&Number.isFinite(s.y)&&s.y>=0),r}return e=v,(o=[{key:"componentDidUpdate",value:function(t,r){r.visible!==this.state.visible&&this.props.afterLoad()}},{key:"onVisible",value:function(){this.props.beforeLoad(),this.setState({visible:!0})}},{key:"render",value:function(){if(this.state.visible)return this.props.children;var t=this.props,r=t.className,l=t.delayMethod,a=t.delayTime,s=t.height,y=t.placeholder,P=t.scrollPosition,T=t.style,w=t.threshold,B=t.useIntersectionObserver,I=t.width;return this.isScrollTracked||B&&A()?d().createElement(ne,{className:r,height:s,onVisible:this.onVisible,placeholder:y,scrollPosition:P,style:T,threshold:w,useIntersectionObserver:B,width:I}):d().createElement(J,{className:r,delayMethod:l,delayTime:a,height:s,onVisible:this.onVisible,placeholder:y,style:T,threshold:w,width:I})}}])&&ve(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),v}(d().Component);D.propTypes={afterLoad:c.PropTypes.func,beforeLoad:c.PropTypes.func,useIntersectionObserver:c.PropTypes.bool,visibleByDefault:c.PropTypes.bool},D.defaultProps={afterLoad:function(){return{}},beforeLoad:function(){return{}},useIntersectionObserver:!0,visibleByDefault:!1};const Z=D;function H(n){return H=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},H(n)}var De=["afterLoad","beforeLoad","delayMethod","delayTime","effect","placeholder","placeholderSrc","scrollPosition","threshold","useIntersectionObserver","visibleByDefault","wrapperClassName","wrapperProps"];function Se(n,e){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(f){return Object.getOwnPropertyDescriptor(n,f).enumerable})),o.push.apply(o,i)}return o}function xe(n){for(var e=1;e<arguments.length;e++){var o=arguments[e]!=null?arguments[e]:{};e%2?Se(Object(o),!0).forEach(function(i){Be(n,i,o[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):Se(Object(o)).forEach(function(i){Object.defineProperty(n,i,Object.getOwnPropertyDescriptor(o,i))})}return n}function Be(n,e,o){return(e=Le(e))in n?Object.defineProperty(n,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[e]=o,n}function ge(){return ge=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(n[i]=o[i])}return n},ge.apply(this,arguments)}function Me(n,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,Le(i.key),i)}}function Le(n){var e=function(o,i){if(H(o)!=="object"||o===null)return o;var f=o[Symbol.toPrimitive];if(f!==void 0){var p=f.call(o,"string");if(H(p)!=="object")return p;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(n);return H(e)==="symbol"?e:String(e)}function je(n,e){return je=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,i){return o.__proto__=i,o},je(n,e)}function we(n){return we=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},we(n)}var Pe=function(n){(function(t,r){if(typeof r!="function"&&r!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),r&&je(t,r)})(v,n);var e,o,i,f,p=(i=v,f=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var t,r=we(i);if(f){var l=we(this).constructor;t=Reflect.construct(r,arguments,l)}else t=r.apply(this,arguments);return function(a,s){if(s&&(H(s)==="object"||typeof s=="function"))return s;if(s!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return function(y){if(y===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return y}(a)}(this,t)});function v(t){var r;return function(l,a){if(!(l instanceof a))throw new TypeError("Cannot call a class as a function")}(this,v),(r=p.call(this,t)).state={loaded:!1},r}return e=v,(o=[{key:"onImageLoad",value:function(){var t=this;return this.state.loaded?null:function(r){t.props.onLoad(r),t.props.afterLoad(),t.setState({loaded:!0})}}},{key:"getImg",value:function(){var t=this.props,r=(t.afterLoad,t.beforeLoad,t.delayMethod,t.delayTime,t.effect,t.placeholder,t.placeholderSrc,t.scrollPosition,t.threshold,t.useIntersectionObserver,t.visibleByDefault,t.wrapperClassName,t.wrapperProps,function(l,a){if(l==null)return{};var s,y,P=function(w,B){if(w==null)return{};var I,z,me={},pe=Object.keys(w);for(z=0;z<pe.length;z++)I=pe[z],B.indexOf(I)>=0||(me[I]=w[I]);return me}(l,a);if(Object.getOwnPropertySymbols){var T=Object.getOwnPropertySymbols(l);for(y=0;y<T.length;y++)s=T[y],a.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(l,s)&&(P[s]=l[s])}return P}(t,De));return d().createElement("img",ge({},r,{onLoad:this.onImageLoad()}))}},{key:"getLazyLoadImage",value:function(){var t=this.props,r=t.beforeLoad,l=t.className,a=t.delayMethod,s=t.delayTime,y=t.height,P=t.placeholder,T=t.scrollPosition,w=t.style,B=t.threshold,I=t.useIntersectionObserver,z=t.visibleByDefault,me=t.width;return d().createElement(Z,{beforeLoad:r,className:l,delayMethod:a,delayTime:s,height:y,placeholder:P,scrollPosition:T,style:w,threshold:B,useIntersectionObserver:I,visibleByDefault:z,width:me},this.getImg())}},{key:"getWrappedLazyLoadImage",value:function(t){var r=this.props,l=r.effect,a=r.height,s=r.placeholderSrc,y=r.width,P=r.wrapperClassName,T=r.wrapperProps,w=this.state.loaded,B=w?" lazy-load-image-loaded":"",I=w||!s?{}:{backgroundImage:"url(".concat(s,")"),backgroundSize:"100% 100%"};return d().createElement("span",ge({className:P+" lazy-load-image-background "+l+B,style:xe(xe({},I),{},{color:"transparent",display:"inline-block",height:a,width:y})},T),t)}},{key:"render",value:function(){var t=this.props,r=t.effect,l=t.placeholderSrc,a=t.visibleByDefault,s=t.wrapperClassName,y=t.wrapperProps,P=this.getLazyLoadImage();return(r||l)&&!a||s||y?this.getWrappedLazyLoadImage(P):P}}])&&Me(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),v}(d().Component);Pe.propTypes={onLoad:c.PropTypes.func,afterLoad:c.PropTypes.func,beforeLoad:c.PropTypes.func,delayMethod:c.PropTypes.string,delayTime:c.PropTypes.number,effect:c.PropTypes.string,placeholderSrc:c.PropTypes.string,threshold:c.PropTypes.number,useIntersectionObserver:c.PropTypes.bool,visibleByDefault:c.PropTypes.bool,wrapperClassName:c.PropTypes.string,wrapperProps:c.PropTypes.object},Pe.defaultProps={onLoad:function(){},afterLoad:function(){return{}},beforeLoad:function(){return{}},delayMethod:"throttle",delayTime:300,effect:"",placeholderSrc:null,threshold:100,useIntersectionObserver:!0,visibleByDefault:!1,wrapperClassName:""};const Ve=Pe})(),Ce.exports=se})();var et=Ce.exports;const tt=({message:de,type:ae,duration:S=3e3,onClose:se})=>{const[m,d]=ye.useState(!0);return ye.useEffect(()=>{const c=setTimeout(()=>{d(!1),se()},S);return()=>clearTimeout(c)},[S,se]),m?b.jsx("div",{className:Je("fixed left-1/2 bottom-20 transform -translate-x-1/2 px-4 py-2 rounded-md text-white text-sm font-medium shadow-lg transition-opacity duration-300",ae==="success"?"bg-green-500":"bg-red-500"),role:"alert",children:de}):null},rt=Te.object({username:Te.string().nonempty({message:"Username is required"}),password:Te.string().nonempty({message:"Password is required."})}),nt=()=>{const[de,ae]=ye.useState(null),[S,se]=ye.useState("error"),{setUserRole:m,setUserData:d}=ye.useContext(Ye),c=ze(),[A,k]=ye.useState(!1),U=We({resolver:$e(rt),defaultValues:{username:"",password:""}}),O=async E=>{k(!0);try{const R=await Xe.post("http://localhost:5000/login",{username:E.username,password:E.password});if(R.status===200){const{account_id:Y,role:W,imageUrl:fe,...ee}=R.data;localStorage.setItem("account_id",Y),localStorage.setItem("userRole",W),localStorage.setItem("userData",JSON.stringify(ee)),m(W),d(ee),se("success"),ae("Login successful!"),setTimeout(()=>{c(W==="Administrator"?"/dashboard":W==="Employee"?"/home":"/unauthorized")},1e3)}}catch(R){let Y="Something went wrong. Please try again.";R.response&&R.response.data&&(Y=R.response.data.message||"Invalid credentials"),se("error"),ae(Y),console.error("Login failed",R)}finally{k(!1)}};return b.jsxs(b.Fragment,{children:[b.jsx(qe,{...U,children:b.jsxs("form",{onSubmit:U.handleSubmit(O),className:"space-y-4",children:[b.jsx(Ie,{control:U.control,name:"username",render:({field:E})=>b.jsx(Re,{children:b.jsx(ke,{children:b.jsxs("div",{className:"relative form-field",children:[b.jsx("span",{className:"focus-input"}),b.jsx(He,{className:"absolute left-5 top-3 z-10 icon"}),b.jsx("div",{className:"input-container",children:b.jsx(Ne,{id:"username",className:"input-field bg-white",placeholder:"Username",...E})})]})})})}),b.jsx(Ie,{control:U.control,name:"password",render:({field:E})=>b.jsx(Re,{children:b.jsx(ke,{children:b.jsxs("div",{className:"relative form-field",children:[b.jsx("span",{className:"focus-input"}),b.jsx(Ae,{className:"absolute left-5 top-3 z-10 icon"}),b.jsx("div",{className:"input-container",children:b.jsx(Ne,{id:"password",type:"password",className:"input-field bg-white",placeholder:"Password",...E})})]})})})}),b.jsx("div",{className:"flex justify-center",children:b.jsx(Ge,{className:"LoginForm_button  ",type:"submit",disabled:A,children:A?b.jsxs(b.Fragment,{children:[b.jsx(Ke,{className:"mr-1 h-4 w-4 animate-spin"}),"Checking"]}):b.jsx("span",{className:"poppins-regular text-sm",children:"Login"})})})]})}),de&&b.jsx(tt,{message:de,type:S,onClose:()=>ae(null)})]})},ot=Object.freeze(Object.defineProperty({__proto__:null,default:nt},Symbol.toStringTag,{value:"Module"})),it=Fe.lazy(()=>Ue(()=>Promise.resolve().then(()=>ot),void 0)),mt=()=>b.jsxs("div",{className:"relative container-xl bg-cover bg-center overflow-hidden",style:{backgroundImage:`url(${Qe})`,width:"100vw"},children:[b.jsx("div",{className:"absolute inset-0 z-auto",style:{backgroundColor:"#00205B",opacity:"70%"}}),b.jsx("div",{className:"flex justify-center items-center min-h-screen ",children:b.jsxs("div",{className:"w-96 p-6 z-10 form-title",children:[b.jsx(et.LazyLoadImage,{src:Ze,className:"mb-[-8%]",loading:"lazy"}),b.jsx(it,{})]})})]});export{mt as default};
