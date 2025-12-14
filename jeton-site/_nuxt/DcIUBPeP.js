import{V as e}from"./D_P8qzRA.js";function p(r,t){return!r||typeof r!="string"?[]:t==="double-break"?r.split(`

`):t==="break"?r.split(`
`):r}const o={props:{as:{type:String,default:"div"},text:{type:String,default:void 0},method:{type:String,default:"double-break",validator:r=>["double-break","break"].includes(r)}},render({text:r,as:t,method:n}){if(!r)return e(t,{"data-text-block":""});const a=p(r,n);return e(t,{"data-text-block":""},a.map(i=>e("p",{},i)))}};export{o as _};
