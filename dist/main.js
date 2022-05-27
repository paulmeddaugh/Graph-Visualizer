(()=>{"use strict";Map;class e{#e;constructor(e,t){if(this.neighbors=new Map,null!=e){if(!Array.isArray(e))throw new TypeError("param 'vertices' must be an Array of vertices with 'x' and 'y' properties.");for(let t of e)this.addVertex(t)}if(null!=t){if(!Array.isArray(t))throw new TypeError("param 'edges' must be an Array.");for(let e of t)Array.isArray(e)?this.addEdge(e[0],e[1]):this.addEdge(e.u,e.v)}}vertexAt(e){if(e<0||e>=this.neighbors.keys().length)throw new TypeError("i must be within the size of total vertices");let t=0;for(let n of this.neighbors.keys()){if(t===e)return n;t++}return null}indexOf(e){let t=0;for(let n of this.neighbors.keys()){if(n===e)return t;t++}return-1}addVertex(e){this.neighbors.set(e,[])}addEdge(e,t){if(!isNaN(e)||!isNaN(t)){if(e<0||e>=this.neighbors.size)return console.log("couldn't add 'u' "+e+": index out of bounds"),-1;if(t<0||t>=this.neighbors.size)return console.log("couldn't add 'v': index out of bounds"),-1;let n=this.vertexAt(e),i=this.vertexAt(t);return this.neighbors.get(n).push(i),this.neighbors.get(i).push(n),!0}return!!this.neighbors.has(e)&&(this.neighbors.get(e).push(t),this.neighbors.get(t).push(e),!0)}removeVertex(e){let t=isNaN(e)?e:this.vertexAt(e);if(!this.neighbors.has(e))throw new TypeError("v must be a vertex in the graph or an index to one.");var n=!1;for(let e of this.neighbors.get(t)){let i=this.neighbors.get(e);for(let e=0;e<i.length;e++)i[e]==t&&(n=!0),n&&(i[e]=i[e+1]);i.length=i.length-1,n=!1}return this.neighbors.delete(t),!0}removeEdge(e,t){let n=e,i=t;if("number"==typeof e&&"number"==typeof t&&((e<0||e>=this.neighbors.size)&&console.log("u cannot be removed because it does not exist."),(t<0||t>=this.neighbors.size)&&console.log("v cannot be removed because it does not exist."),n=this.vertexAt(e),i=this.vertexAt(t)),this.neighbors.has(n)&&this.neighbors.has(i)){let e=this.neighbors.get(n);for(var r=e.length;r>=0;r--)e[r]===i&&e[r].splice(r,r);return!0}return!1}getVertices(){return JSON.parse(JSON.stringify([...this.neighbors.keys()]))}getNeighbors(){return this.neighbors}getSize(){return this.neighbors.keys().length}isDisplayable(){return this.getVertices().every((e=>"x"in e&&"y"in e&&"name"in e))}hasVertex(e){for(let[t,n]of this.neighbors)if(JSON.stringify(e)===JSON.stringify(t))return t;return null}hasVertexInRadius(e,t){for(let[n,i]of this.neighbors)if(Math.sqrt((e.x-n.x)*(e.x-n.x)+(e.y-n.y)*(e.y-n.y))<=t)return n;return null}print(){this.neighbors.forEach(((e,t)=>{let n=0==e.length?"-":e.reduce(((e,t)=>e.name+", "+t.name));console.log("vertex["+t.name+"]: x: "+t.x+", y: "+t.y+" -> "+n)}))}dfs(e){if("number"==typeof e&&(e=this.vertexAt(e)),null==e)throw new TypeError("Must pass in a vertex or an index to a vertex to search the graph.");var n=[],i={};return this.dfsRecursive(e,i,n,{}),new t(e,i,n)}dfsRecursive(e,t,n,i){n.push(e),i[JSON.stringify(e)]=!0;let r=this.neighbors.get(e);for(let o of r)i[JSON.stringify(o)]||(t[JSON.stringify(o)]=JSON.stringify(e),this.dfsRecursive(o,t,n,i))}bfs(e){if("number"==typeof e&&(e=this.vertexAt(e)),null==e)throw new TypeError("Must pass in a vertex or an index to a vertex to search the graph.");var n=[],i={},r=[e],o={};for(o[JSON.stringify(r[0])]=!0;0!=r.length;){let e=r.shift(),t=this.neighbors.get(e);for(let a of t)o[JSON.stringify(a)]||(n.push(a),r.push(a),i[JSON.stringify(a)]=JSON.stringify(e),o[JSON.stringify(a)]=!0)}return new t(e,i,n)}}class t{root;parents;searchOrder;constructor(e,t,n){this.root=e,this.parents=t,this.searchOrder=n}getRoot(){return JSON.parse(JSON.stringify(this.root))}getParents(){return this.parents}getNumberOfVerticesFound(){return this.searchOrder.length}getPath(e){"string"!=typeof e&&(e=JSON.stringify(e));let t=[];do{t.push(e),e=this.parents[e]}while(null!=this.parents[e]);return t}printTree(){console.log("Root: "+this.root),console.log("Edges: ");for(let e in this.parents)console.log("("+this.parents[e]+", "+e+")")}}const n=e,i=document.getElementById("graphView"),r=i.getContext("2d"),o=window.mobileCheck?15:5,a=.93,s=10;function l(t){if(t instanceof e)return!0;if(void 0===t)return t=new e,console.log("graph in GraphView was undefined"),!1;throw new TypeError("Cannot display anything other then a Graph object")}function d(){r.clearRect(0,0,i.clientWidth,i.clientHeight)}function h(e,t){i.width=e,i.height=t}function c(e,t="black",n){if(r.lineWidth=2*o,r.lineCap="round",r.strokeStyle=t,r.beginPath(),r.moveTo(e.x,e.y),r.lineTo(e.x,e.y),r.stroke(),1===n)(s=r.createLinearGradient(0,e.y,e.x*a,e.y)).addColorStop(0,t),s.addColorStop(1,"rgba(0, 0, 0, 0)"),r.strokeStyle=s,r.lineWidth=2,r.beginPath(),r.moveTo(0,e.y),r.lineTo(e.x*a,e.y),r.stroke();else if(2===n){const n=2-a;var s;(s=r.createLinearGradient(e.x,i.height,e.x,e.y*n)).addColorStop(0,t),s.addColorStop(1,"rgba(0, 0, 0, 0)"),r.strokeStyle=s,r.lineWidth=2,r.beginPath(),r.moveTo(e.x,i.height),r.lineTo(e.x,e.y*n),r.stroke()}}function g(e,t,n=!0,o="black"){n&&r.clearRect(0,0,i.width,i.height);for(let n of e)c(n,o,t)}function u(e,t,n="black",i=n,o=2){r.lineWidth=o,r.strokeStyle=n,r.beginPath(),r.moveTo(e.x,e.y),r.lineTo(t.x,t.y),r.stroke(),null!==i&&(c(e,i),c(t,i))}function y(e,t,n="black",i=n){u(e,t,n,i);let a=Math.atan2(t.y-e.y,t.x-e.x),l={x:t.x-o*Math.cos(a),y:t.y-o*Math.sin(a)};r.beginPath(),r.moveTo(l.x,l.y),r.lineTo(l.x-s*Math.cos(a-Math.PI/6),l.y-s*Math.sin(a-Math.PI/6)),r.moveTo(l.x,l.y),r.lineTo(l.x-s*Math.cos(a+Math.PI/6),l.y-s*Math.sin(a+Math.PI/6)),r.closePath(),r.strokeStyle="blue",r.lineWidth=2,r.stroke()}function m(e,t,n=!0,a=.9,l="black",d=l,h="blue"){return u(e,t,l,d),new Promise((l=>{let d,c=Math.atan2(t.y-e.y,t.x-e.x),g=Math.sqrt((t.x-e.x)*(t.x-e.x)+(t.y-e.y)*(t.y-e.y)),u=document.createElement("canvas");u.width=i.width,u.height=i.height,u.style.top=parseInt(window.getComputedStyle(i).border)+"px",u.style.left=parseInt(window.getComputedStyle(i).border)+"px",u.style.position="absolute",document.getElementById("canvasContainer").appendChild(u);let y=u.getContext("2d");const m=()=>{g*=a,d={x:t.x-g*Math.cos(c),y:t.y-g*Math.sin(c)},y.clearRect(0,0,i.width,i.height),y.beginPath(),y.moveTo(d.x,d.y),y.lineTo(d.x-s*Math.cos(c-Math.PI/6),d.y-s*Math.sin(c-Math.PI/6)),y.moveTo(d.x,d.y),y.lineTo(d.x-s*Math.cos(c+Math.PI/6),d.y-s*Math.sin(c+Math.PI/6)),y.closePath(),y.strokeStyle=h,y.lineWidth=2,y.stroke();var e=r.createLinearGradient(d.x,d.y,d.x-20*Math.cos(c),d.y-20*Math.sin(c));e.addColorStop(0,h),e.addColorStop(1,"rgba(0, 0, 0, 0)"),y.beginPath(),y.moveTo(d.x,d.y),y.lineTo(d.x-20*Math.cos(c),d.y-20*Math.sin(c)),y.closePath(),y.strokeStyle=e,y.lineWidth=2,y.stroke(),g>o?requestAnimationFrame(m):(n&&r.drawImage(u,0,0),document.getElementById("canvasContainer").removeChild(u),l())};requestAnimationFrame(m)}))}async function f(e,t=!0,n){l(e),t&&r.clearRect(0,0,i.width,i.height),e.getNeighbors().forEach(((e,t)=>{for(let i of e)if(parseInt(t.name)<parseInt(i.name))switch(n){case 1:y(t,i);break;case 2:m(t,i);break;default:u(t,i)}c(t)}))}var p,w=document.getElementById("graphView"),b=w.getContext("2d");function x(e,t="y",n=!0,i=2,r=.1,o=1e3,a=[],s=!0){return new Promise((l=>{p=new Array(e.length).fill(!1,0,e.length);var d=void 0;!0===n&&(d="y"===t?w.clientHeight/e.length:w.clientWidth/e.length),this.delayed=0,s&&b.clearRect(0,0,w.width,w.height);const h=async()=>{b.fillStyle="rgb(255, 255, 255, "+r+")",b.fillRect(0,0,w.width,w.height);for(var s=0;s<e.length;s++){let r=Array.isArray(n)?n[s]:Math.floor((s+1)*d-d/2),o=a[s]?a[s]:"0, 0, 0";v(e[s],r,i,t,o)}k()?(this.delayed||(this.delayed=Date.now()),Date.now()-this.delayed<=o?window.requestAnimationFrame(h):l()):window.requestAnimationFrame(h)};requestAnimationFrame(h)}))}function v(e,t,n,i,r){var o=Object.getOwnPropertyDescriptor(e,i).value;o<t?o=o+n>t?t:o+n:o>t&&(o=o-n<t?t:o-n),Object.defineProperty(e,i,{value:o}),c(e,"rgb("+(r||"0, 0, 0")+", .5)","y"===i?1:2),o===t&&(p[e.name]=!0)}const k=()=>p.every((e=>e));function E(e,t,n,i=0){return new Promise((r=>{let o=1,a=0,s=0;const l=async()=>{o-=n,a=1-o,Math.min(o,a)==a?t():e();let d=Math.max(o,a)-Math.min(o,a);b.fillStyle="rgb(255, 255, 255, "+d+")",b.fillRect(0,0,w.width,w.height),Math.min(o,a)==a?e():t(),b.fillStyle="rgb(255, 255, 255, "+Math.min(o,a)+")",b.fillRect(0,0,w.width,w.height),parseFloat(o-1)>-1?requestAnimationFrame(l):(s||(s=Date.now()),Date.now()-s>=i?r():requestAnimationFrame(l))};requestAnimationFrame(l)}))}var M,S;async function T(e,t){if(!t)throw new TypeError("Must specify an axis of the array objects to compare ('x' or 'y').");if(!(e instanceof n&&e.isDisplayable()))throw new TypeError("Every object must have 'x' and 'y' co-ordinates.");S="x"===(M=t)?"y":"x";const i=e.getVertices(),r="x"===M?1:2;"x"===M?i.sort(((e,t)=>e.y-t.y)):i.sort(((e,t)=>e.x-t.x)),await E((()=>f(e,!1,!1)),(()=>g(i,r,!1)),.014,150),await new x(i,S,void 0,1.05,void 0,1500,void 0,!1),await I(0,i.length-1,i),await new Promise((t=>{setTimeout((async()=>{await function(e,t,n){return E((()=>{g(t,n,!1,"rgb(0, 255, 0, 255)"),function(e,t){for(let n of e)"x"===t?u({x:n.x,y:0},{x:n.x,y:w.height},"black",null,1):u({x:0,y:n.y},{x:w.width,y:n.y},"black",null,1)}(e.getVertices(),n)}),(()=>f(e,!1,1)),.01)}(e,i,M),t()}),2500)}))}async function I(e,t,n){if(t-e!=0){let i=e,r=0|e+(t-e)/2;await I(i,r,n);let o=r+1,a=t;await I(o,a,n),await new Promise((e=>e(function(e,t,n,i,r){let o=e,a=new Array(i-e+1),s=0;for(;e<=t&&n<=i;)Object.getOwnPropertyDescriptor(r[e],M).value<Object.getOwnPropertyDescriptor(r[n],M).value?a[s++]=r[e++]:a[s++]=r[n++];for(;e<=t;)a[s++]=r[e++];for(;n<=i;)a[s++]=r[n++];for(let e=0;e<a.length;e++)r[o++]=a[e]}(i,r,o,a,n)))),await function(e,t,n,i){return new x(e,t,!0,"y"==t?4:2.5,.1,500,new Array(e.length).fill("0, 255, 0",n,i+1),!1)}(n,S,e,t)}}document.getElementById("graphView");const P=document.getElementById("graphView"),O=P.getContext("2d"),A="blue",N=500;function C(e,t,n,i,r,o){return new Promise((a=>{g(e,void 0,!0),u(t.p1,t.p2,A),u(n,i,"green"),L(e[0===r?0:r-1].x,e[o].x),setTimeout((()=>{d(),a()}),500)}))}function B(e,t,n,i){return new Promise((r=>{g(e,void 0,!0),u(t.p1,t.p2,A),L(e[0===n?0:n-1].x,e[i].x),setTimeout((()=>{r()}),500)}))}function L(e,t,n="yellow"){u({x:e,y:0},{x:e,y:P.clientHeight},n,null),u({x:t,y:0},{x:t,y:P.clientHeight},n,null)}async function R(e){if(!e.every((e=>e.hasOwnProperty("x")&&e.hasOwnProperty("y"))))throw new TypeError("Every object must have an 'x' and a 'y' property.");var t=[...e].sort(((e,t)=>e.x-t.x)),n=[...e].sort(((e,t)=>e.y-t.y));let i=await V(t,0,t.length-1,n);return function(e,t){d(),g(e,void 0,!1),u(t.p1,t.p2,A)}(t,i),[i.p1,i.p2]}async function V(e,t,n,i){if(n-t<=3)return await async function(e,t,n,i){let r=new D(e[0],e[1]);for(let o=0;o<e.length;o++)for(let a=o+1;a<e.length;a++)await C(t,r,e[o],e[a],n,i),J(e[o],e[a])<r.getDistance()&&(r=new D(e[o],e[a])),await B(t,r,n,i);return r}(e.slice(t,n+1),e,t,n);{let r=t,o=0|t+(n-t)/2,a=await V(e,r,o,i),s=o+1,l=n,h=await V(e,s,l,i),c=a.getDistance()<h.getDistance()?a:h;await function(e,t,n,i,r,o){return new Promise((a=>{g(e,void 0,!0),u(t.p1,t.p2,A),u(n.p1,n.p2,A),L(e[r].x,e[o].x);let s=e[0|r+(o-r)/2+(+(0!=r)?1:0)].x;u({x:s,y:0},{x:s,y:P.clientHeight},"yellow",null),setTimeout((()=>{d(),g(e,void 0,!1),u(i.p1,i.p2,A),L(e[r].x,e[o].x),u({x:s,y:0},{x:s,y:P.clientHeight},"yellow",null),setTimeout((()=>{a()}),N)}),N)}))}(e,a,h,c,0===t?0:t-1,n);let y=await async function(e,t,n,i,r){let o=t[0|n+(i-n)/2].x;!function(e,t){var n;d(),L(e-t,e+t,A),n=e,O.strokeStyle="yellow",O.beginPath(),O.setLineDash([5,10]),O.moveTo(n,0),O.lineTo(n,P.height),O.stroke(),O.setLineDash([])}(o,e.dist);let a=[],s=[];for(let t of r)t.x<=o&&t.x>=o-e.getDistance()?a.push(t):t.x>o&&t.x<=o+e.getDistance()&&s.push(t);let l=0;for(let t of a){for(;l<s.length&&s[l].y<=t.y-e.getDistance();)l++;let n=l;for(;n<s.length&&+(s[n].y-t.y)<=e.getDistance();)J(t,s[n])<e.getDistance()&&(e=new D(t,s[n])),n++}return e}(c,e,t,n,i);return await function(e,t,n,i,r){return new Promise((o=>{g(e,void 0,!1),u(t.p1,t.p2,A),L(e[i].x,e[r].x),setTimeout((()=>{g(e,void 0,!0),u(n.p1,n.p2,A),L(e[i].x,e[r].x),setTimeout((()=>{o()}),N)}),N)}))}(e,c,y,t,n),y}}function J(e,t){let n=(t.x-e.x)*(t.x-e.x),i=(t.y-e.y)*(t.y-e.y);return Math.sqrt(n+i)}class D{constructor(e,t){this.p1=e,this.p2=t,this.dist=this.distance(this.p1,this.p2)}distance=J;getDistance(){return this.dist}}async function z(e){if(!e instanceof t)throw new TypeError("Only displays results from a SearchTree class, returned from a Graph.dfs or Graph.bfs");let n=e.getParents(),i=new Map;i.set(JSON.stringify(e.getRoot()),[]);for(let e in n)i.has(n[e])||await r(i),i.get(n[e]).push(e);async function r(e){let t,n=[];for(let[i,r]of e){for(let e of r)t=m(JSON.parse(i),JSON.parse(e),!0,.95),c(JSON.parse(i),"blue"),c(JSON.parse(e),"blue"),n.push(e);e.delete(i)}await t;for(let t of n)e.set(t,[])}await r(i)}var q,j,H,F,G,W,X=!1;let Y,_;const K=window.mobileCheck?5:20;var Q=K;function U(e){if(X)return;let t=e.clientX-_,n=e.clientY-F-W-_,a=q.hasVertexInRadius({x:t,y:n},o);2==e.button?a&&function(e,t){l(t),r.clearRect(0,0,i.width,i.height),e=t.hasVertex(e);let n=t.getNeighbors().get(e);t.removeVertex(e);for(let t of n)u(e,t,"red"),c(t);c(e,"red"),f(t,!1,1),setTimeout((()=>{f(t,!0,1)}),1e3)}(a,q):0==e.button&&(a?(Y=a,c(Y,"blue")):function(e,t){l(t),t.addVertex(e),f(t,!0,1)}({name:Q++,x:t,y:n},q))}function Z(e){if(!Y)return;let t={x:e.clientX-_,y:e.clientY-F-W-_};d(),u(Y,t,"blue"),f(q,!1,1),c(Y,"blue")}function $(e){if(!Y)return;let t={name:Q++,x:e.clientX-_,y:e.clientY-F-W-_},n=q.hasVertexInRadius(t,o);if(n===Y)return f(q,!0,1),Y=null,void re(e);n?(f(q,!0,1),m(Y,n,!0,.95),q.addEdge(Y,n)):(f(q,!0,1),m(Y,t,!0,.95),c(t),q.addVertex(t),q.addEdge(Y,t),q.print()),Y=null}function ee(){var e=new Array(K);for(let t=0;t<e.length;t++)e[t]={name:t,x:Math.floor(Math.random()*j.width),y:Math.floor(Math.random()*j.height)};(q=new n(e,[[6,3],[1,8],[2,19],[11,7],[3,1],[6,11],[8,19],[7,2]])).print(),console.log("randomized"),f(q,!0,2)}function te(e){F=H.getBoundingClientRect().height;var t=document.body.clientWidth-2*_,n=document.body.clientHeight-F-W-2*_;"load"===e.type?h(t,n):(h(t,n),f(q,!0,1))}async function ne(e){document.getElementById("legend").innerHTML="",oe("green","Merging Range");let t="byX"===e.target.id?"x":"y";se(),await T(q,t),le(),ae()}async function ie(){document.getElementById("legend").innerHTML="",oe("blue","Closest Pair"),oe("darkGreen","Comparing Pair"),oe("yellow","Searching Sector"),oe("blue-yellow","Merging Sectors"),se(),await R(q.getVertices()),le(),ae()}async function re(e){if(document.getElementById("legend").innerHTML="",oe("blue","Traversed Edges"),se(),f(q),"depth"==e.target.id)await async function(e){if(!e instanceof t)throw new TypeError("Only displays results from a SearchTree class, returned from a Graph.dfs or Graph.bfs");let n=e.getParents();for(let e in n)await m(JSON.parse(n[e]),JSON.parse(e),!0,.93)}(q.dfs(6));else if("breadth"==e.target.id)await z(q.bfs(6));else if("mouseup"===e.type){let t={x:e.clientX-_,y:e.clientY-F-W-_},n=q.hasVertexInRadius(t,o);await z(q.bfs(n))}le(),ae()}function oe(e,t){let n=document.createElement("div"),i=document.createElement("div");i.classList.add("legendItem"),i.classList.add(e),n.appendChild(i),n.innerHTML+=t,document.getElementById("legend").appendChild(n)}function ae(){document.getElementById("legend").innerHTML="",oe("click","Add Point"),oe("drag","Add Edge"),oe("","Remove Point"),oe("","Shortest Route")}function se(){X=!0;for(let e of["genRand","closest","depth","breadth"])document.getElementById(e).setAttribute("disabled",""),document.getElementById(e).setAttribute("aria-disabled","");document.getElementById("sort").classList.add("disabled"),j.style.cursor="default"}function le(){X=!1;for(let e of["genRand","closest","depth","breadth"])document.getElementById(e).removeAttribute("disabled"),document.getElementById(e).removeAttribute("aria-disabled");document.getElementById("sort").classList.remove("disabled"),j.style.cursor="pointer"}window.mobileCheck=function(){let e=!1;var t;return t=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0),e},window.addEventListener("load",(async e=>{(j=document.getElementById("graphView")).style.border="2px solid black",H=document.getElementById("header"),G=document.getElementById("legend"),W=G.getBoundingClientRect().height,_=parseInt(window.getComputedStyle(document.getElementById("canvasContainer")).marginTop)+parseInt(window.getComputedStyle(j).border),j.addEventListener("mousedown",U),j.addEventListener("mousemove",Z),j.addEventListener("mouseup",$),document.getElementById("genRand").addEventListener("click",ee),document.getElementById("closest").addEventListener("click",ie),document.getElementById("byX").addEventListener("click",ne),document.getElementById("byY").addEventListener("click",ne),document.getElementById("depth").addEventListener("click",re),document.getElementById("breadth").addEventListener("click",re),await te(e),ee(),le()})),window.addEventListener("resize",te),window.addEventListener("orientationchange",te,!1),window.addEventListener("contextmenu",(e=>e.preventDefault())),document.getElementsByClassName("navbar-brand")[0].addEventListener("click",(()=>{new Audio("a-whole-new-world-cropped.mp3").play()}))})();