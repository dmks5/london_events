(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{44:function(e,t,a){e.exports=a(58)},53:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(37),c=a.n(o),s=a(41),l=a(79),i=(a(53),a(38)),d=a(81),m=a(82),u=a(80),p=a(83),E=a(84),v=a(78);const h=["\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435","\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a","\u0412\u0442\u043e\u0440\u043d\u0438\u043a","\u0421\u0440\u0435\u0434\u0430","\u0427\u0435\u0442\u0432\u0435\u0440\u0433","\u041f\u044f\u0442\u043d\u0438\u0446\u0430","\u0421\u0443\u0431\u0431\u043e\u0442\u0430"],y={"\u041c\u0430\u0444\u0438\u044f":"#FADADD","\u041a\u0432\u0438\u0437":"#ADD8E6","\u041d\u0435\u0442\u0432\u043e\u0440\u043a\u0438\u043d\u0433":"#90EE90","\u041d\u0430\u0441\u0442\u043e\u043b\u043a\u0438":"#FAFAD2"};const b=e=>{var t;let{event:a}=e;const r="\u0434\u0430"===(null===(t=a["\u041e\u0442\u043c\u0435\u043d\u0435\u043d\u043e?"])||void 0===t?void 0:t.toLowerCase()),o=a["\u041f\u0440\u0438\u0447\u0438\u043d\u0430 \u043e\u0442\u043c\u0435\u043d\u044b"]||"\u0413\u0410\u041b\u042f, \u0423 \u041d\u0410\u0421 \u041e\u0422\u041c\u0415\u041d\u0410";return n.a.createElement(u.a,{sx:{mb:2,backgroundColor:a.eventTypeColor,boxShadow:3,...r&&{bgcolor:"error.light",color:"error.contrastText"}}},n.a.createElement(p.a,null,n.a.createElement(E.a,{gutterBottom:!0,variant:"h5",component:"div",sx:{fontWeight:"bold",textTransform:"capitalize"}},a.\u0422\u0438\u043f||"\u041d\u0435 \u0443\u043a\u0430\u0437\u0430\u043d"),n.a.createElement(E.a,{variant:"body2",color:"text.secondary"},"".concat(a["\u0414\u0430\u0442\u0430"],", ").concat(a.dayOfWeek,", ").concat(a.displayTime)),n.a.createElement(E.a,{variant:"body2",sx:{mt:1}},a.\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435||"\u041d\u0435\u0442 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u044f"),n.a.createElement(E.a,{variant:"body2",sx:{mt:1}},"\u0410\u0434\u0440\u0435\u0441: ",a["\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0443"]?n.a.createElement(v.a,{href:a["\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0443"],target:"_blank"},a["\u0410\u0434\u0440\u0435\u0441 \u043f\u043e-\u0447\u0435\u043b\u043e\u0432\u0435\u0447\u0435\u0441\u043a\u0438"]):"\u041d\u0435 \u0443\u043a\u0430\u0437\u0430\u043d"),r&&n.a.createElement(E.a,{color:"error",sx:{mt:1}},"\u041e\u0442\u043c\u0435\u043d\u0435\u043d\u043e: ",o)))};var g=class extends r.Component{constructor(){super(),this.state={data:[]}}componentDidMount(){Object(i.a)("https://docs.google.com/spreadsheets/d/e/2PACX-1vTPva1TqjJb1q71rdIyiL8kCTg1ErWP8OWYJQqDLWZhNPP43EechxS7r7mOzKL43En-FHBx0Ql0J0Lp/pub?gid=0&single=true&output=csv",{complete:e=>{const t=this.convertArrayToJSON(e.data),a=this.sortAndFilterEvents(t);this.setState({data:a})}})}convertArrayToJSON(e){const t=e[0];return e.slice(1).map(e=>{let a={};return t.forEach((t,r)=>{a[t]=e[r]||""}),a})}sortAndFilterEvents(e){const t=new Date;return t.setHours(0,0,0,0),e.map(e=>{if(!e["\u0414\u0430\u0442\u0430"])return null;const t=e["\u0414\u0430\u0442\u0430"].split("/").reverse(),a=e["\u0412\u0440\u0435\u043c\u044f"]?e["\u0412\u0440\u0435\u043c\u044f"].split(":"):["00","00","00"],r=new Date(t.join("-")+"T"+a.join(":"));return isNaN(r)?null:{...e,dateObject:r,dayOfWeek:h[r.getDay()],displayTime:a.slice(0,2).join(":"),eventTypeColor:this.getEventTypeColor(e["\u0422\u0438\u043f"])}}).filter(e=>null!==e&&e.dateObject>=t).sort((e,t)=>e.dateObject-t.dateObject)}getEventTypeColor(e){let t="lightgrey";return Object.keys(y).forEach(a=>{e&&e.toLowerCase().includes(a.toLowerCase())&&(t=y[a])}),t}render(){return n.a.createElement(d.a,{maxWidth:"lg"},n.a.createElement(m.a,{container:!0,spacing:2,justifyContent:"center"},this.state.data.map((e,t)=>e&&n.a.createElement(m.a,{item:!0,xs:12,sm:6,md:4,lg:3,key:t},n.a.createElement(b,{event:e})))))}};const x=Object(s.a)({});c.a.createRoot(document.getElementById("root")).render(n.a.createElement(l.a,{theme:x},n.a.createElement(g,null)))}},[[44,1,2]]]);
//# sourceMappingURL=main.afac93bf.chunk.js.map