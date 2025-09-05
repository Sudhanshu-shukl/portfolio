import{d as t,a as i,j as e,m as n}from"./index-DTFuPBym.js";import{u as r}from"./index-CViaEUcd.js";import{C as y}from"./code-Kv-60E5A.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=t("Award",[["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}],["path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=t("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=t("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=t("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=t("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=t("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=t("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]),C=()=>{const[d,l]=r({threshold:.3,triggerOnce:!1}),[m,o]=r({threshold:.5}),[a,h]=i.useState(!1);i.useEffect(()=>{l&&!a&&h(!0)},[l,a]),i.useEffect(()=>{if(!o)return;const s=new CustomEvent("sectionInView",{detail:"achievements"});window.dispatchEvent(s)},[o]);const p=[{icon:e.jsx(v,{className:"w-12 h-12 text-yellow-500"}),title:"Chess Rating: 1835+",description:"Achieved a competitive chess rating of 1800+, demonstrating strategic thinking and planning abilities."},{icon:e.jsx(j,{className:"w-12 h-12 text-orange-500"}),title:"3x Hackathon Winner",description:"Secured victories in multiple hackathons, showcasing rapid prototyping and innovative problem-solving skills."},{icon:e.jsx(u,{className:"w-12 h-12 text-purple-500"}),title:"HackIndia 2025 Finalist",description:"Reached the finals of HackIndia 2025, one of India's premier Web3 hackathon competition."},{icon:e.jsx(b,{className:"w-12 h-12 text-blue-500"}),title:"Campus Ambassador",description:"Selected as Campus Ambassador for multiple tech and ed-tech platforms, demonstrating leadership and communication skills."},{icon:e.jsx(y,{className:"w-12 h-12 text-green-500"}),title:"Open Source Contributor",description:"Regularly contribute to open-source projects and maintain active personal repositories on GitHub."},{icon:e.jsx(f,{className:"w-12 h-12 text-orange-500"}),title:"LeetCode Contest Rating: 1697",description:"Global Rank: Top 13% (89,855 / 694,599) - Demonstrating strong problem-solving skills and algorithmic thinking."}];return e.jsx("section",{ref:m,className:"min-h-screen py-20 relative bg-slate-900/50",children:e.jsxs("div",{className:"container mx-auto px-4 py-16",children:[e.jsxs(n.div,{initial:"hidden",animate:a?"visible":"hidden",variants:{hidden:{opacity:0,y:30},visible:{opacity:1,y:0,transition:{duration:.8,ease:"easeOut"}}},ref:d,className:"text-center mb-16",children:[e.jsx("h2",{"data-text":"ACHIEVEMENTS",className:"glitch-text text-4xl md:text-5xl font-bold mb-8",children:"ACHIEVEMENTS"}),e.jsx("div",{className:"h-0.5 w-24 md:w-32 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mx-auto mb-8"})]}),e.jsxs("div",{className:"max-w-4xl mx-auto",children:[p.map((s,x)=>e.jsxs(n.div,{initial:{opacity:0,y:30},animate:a?{opacity:1,y:0}:{opacity:0,y:30},transition:{duration:.6,delay:.2},className:"holographic p-6 rounded-lg mb-8 relative overflow-hidden",children:[e.jsxs("div",{className:"flex flex-col md:flex-row items-center md:items-start gap-6",children:[e.jsx("div",{className:"p-4 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl",children:s.icon}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-2xl font-bold mb-2",children:s.title}),e.jsx("p",{className:"text-gray-300",children:s.description})]})]}),e.jsx("div",{className:"absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -z-10"}),e.jsx("div",{className:"absolute bottom-0 left-0 w-24 h-24 bg-amber-500/10 rounded-full blur-3xl -z-10"})]},x)),e.jsxs(n.div,{initial:{opacity:0,scale:.9},animate:a?{opacity:1,scale:1}:{opacity:0,scale:.9},transition:{duration:.8,delay:.4},className:"holographic p-8 rounded-lg mt-16 text-center",children:[e.jsx(g,{className:"w-16 h-16 text-indigo-400 mx-auto mb-6"}),e.jsx("h3",{className:"text-2xl font-bold mb-4",children:"Continuous Learning & Growth"}),e.jsx("p",{className:"text-gray-300 max-w-2xl mx-auto",children:"While I continue to build my formal achievement portfolio, I'm constantly participating in coding challenges, debates, and continuously enhancing my skills through practical projects and applications. My journey is focused on making a meaningful impact in the field of AI and software development."}),e.jsxs("div",{className:"mt-8 flex flex-col md:flex-row justify-center items-center gap-4",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(c,{className:"w-5 h-5 text-cyan-400 mr-2"}),e.jsx("span",{className:"text-gray-300",children:"Participating in hackathons"})]}),e.jsx("div",{className:"hidden md:block h-5 w-0.5 bg-gray-700"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(c,{className:"w-5 h-5 text-cyan-400 mr-2"}),e.jsx("span",{className:"text-gray-300",children:"Building real-world projects"})]}),e.jsx("div",{className:"hidden md:block h-5 w-0.5 bg-gray-700"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(c,{className:"w-5 h-5 text-cyan-400 mr-2"}),e.jsx("span",{className:"text-gray-300",children:"Expanding technical knowledge"})]})]})]})]})]})})};export{C as default};
