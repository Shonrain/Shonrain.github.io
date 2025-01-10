import{_ as o,r as t,o as i,c as l,d as e,e as n,a as s,w as d,b as c}from"./app-fcfb95bc.js";const _={},u=e("h1",{id:"介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#介绍","aria-hidden":"true"},"#"),n(" 介绍")],-1),h=e("code",null,"monorepo 架构",-1),m={href:"https://pnpm.io/",target:"_blank",rel:"noopener noreferrer"},p={href:"https://rollupjs.org/",target:"_blank",rel:"noopener noreferrer"},v=c(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>miya-design
├─ packages
│  ├─ rollup.config.js
│  └─ package.json
├─ dist
│  └─ package.json
├─ docs
│  └─ package.json
├─ retail-test
│  └─ package.json
├─ tests
│  └─ package.json
├─ pnpm-workspace.yaml
└─ package.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),b=e("code",null,"packages",-1),g=e("code",null,"dist",-1),f={href:"https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm",target:"_blank",rel:"noopener noreferrer"},k={href:"https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm",target:"_blank",rel:"noopener noreferrer"},j=e("code",null,"docs",-1),x={href:"https://v2.vuepress.vuejs.org/",target:"_blank",rel:"noopener noreferrer"},w=e("code",null,"retail-test",-1),y={href:"https://gitlab.infra.miyatech.com/miya-front-end/retail",target:"_blank",rel:"noopener noreferrer"},V=e("code",null,"tests",-1),B={href:"https://vitejs.dev/",target:"_blank",rel:"noopener noreferrer"};function L(N,E){const r=t("ExternalLinkIcon"),a=t("RouterLink");return i(),l("div",null,[u,e("p",null,[n("MiYa Design 是一个基于 "),h,n(" 开发的前端组件库，整个项目通过 "),e("a",m,[n("pnpm"),s(r)]),n(" 进行包管理，打包工具采用 "),e("a",p,[n("rollup"),s(r)]),n("，项目的目录结构如下：")]),v,e("ul",null,[e("li",null,[b,n("：组件开发工程，miya-design 的所有组件都是在这个工程下进行开发。如果你想贡献组件，请参考 "),s(a,{to:"/advanced/"},{default:d(()=>[n("开发")]),_:1})]),e("li",null,[g,n("：打包之后的组件，支持 "),e("a",f,[n("esm"),s(r)]),n("、"),e("a",k,[n("umd"),s(r)])]),e("li",null,[j,n("：文档，基于 "),e("a",x,[n("VuePress"),s(r)])]),e("li",null,[w,n("：基于"),e("a",y,[n("零售B端工程"),s(r)]),n("，用于测试")]),e("li",null,[V,n("：基于 "),e("a",B,[n("vite"),s(r)]),n(" 打包的脚手架，用于测试")])])])}const I=o(_,[["render",L],["__file","index.html.vue"]]);export{I as default};
