import{_ as a,c as l,a as n,o as i}from"./app-HaVGcHMr.js";const p={};function r(t,e){return i(),l("div",null,e[0]||(e[0]=[n('<h2 class="blog-title"> [译] 响应式 Web 应用（一）</h2><h2 id="原书" tabindex="-1"><a class="header-anchor" href="#原书"><span>原书</span></a></h2><p><a href="https://www.manning.com/books/reactive-web-applications" target="_blank" rel="noopener noreferrer">https://www.manning.com/books/reactive-web-applications</a></p><h2 id="第一章-你是说「响应式」" tabindex="-1"><a class="header-anchor" href="#第一章-你是说「响应式」"><span>第一章：你是说「响应式」？</span></a></h2><p>本章所包含的内容：</p><h2 id="本章内容" tabindex="-1"><a class="header-anchor" href="#本章内容"><span>本章内容</span></a></h2><ul><li><p>响应式应用及其起源</p></li><li><p>为什么响应式应用是必要的</p></li><li><p>Play 如何帮你构建响应式应用</p></li></ul><h2 id="概览" tabindex="-1"><a class="header-anchor" href="#概览"><span>概览</span></a></h2><p>在过去几年，Web 应用开始在我们的生活中发挥越来越重要的作用，不论是像社交网络这样的大型应用、电子银行站点这样的中型应用，还是一些小型应用，如在线账户系统以及一些小型企业的项目管理工具，它们对这些服务的依赖呈现出明显增加的趋势。而这一趋势现在也转向了物理设备，根据信息技术研究与咨询公司 <a href="www.gartner.com/newsroom/id/2636073">Gartner</a> 的预测，到 2020 年物联网设备将增至260亿台。</p><p>这一快速演变对高可用性以及资源效率提出了更高的要求，而响应式应用就是为此而量身定做的。以前的 Web 程序开发一般都是利用一个应用程序尝试解决各种问题，但随着云计算的出现与云服务的接踵而至，应用程序可以连接到云服务，只需解决那些剩余没有很好解决的问题。</p><p>所以我们需要一套新的工具来有效地应对这一演变带来的挑战。Play! 框架是一套崭新的方案，以便构建出能够实时响应用户行为的 Web 应用程序，即使在高负载和分布式的环境下也是如此。</p><p>在撰写本文时，Play! 是 Java 虚拟机上唯一真正的全栈响应式 Web 应用程序框架。作为一款免费且开源的软件，Play! 已经被许多大公司所采用，比如 摩根士丹利（Morgan Stan-ley）、领英（LinkedIn）、卫报（The Guardian）等，当然还有许多小型的 Play! 玩家。Play! 随时等着你去下载把玩呢！</p><p>在本章中，我们将探究：</p><ul><li>响应式 Web 应用程序是什么</li><li>为什么要构建这样的程序</li><li>以及为什么 Play! 是构建这种程序的好工具。</li></ul><p>我们将首先澄清「响应式」一词的意思，并探讨在新的硬件设计和软件架构的趋势下，如何重新考虑使用可计算资源。最后，还将探究为什么失败处理起着关键性的作用，以及如何去实现相应的逻辑。</p><h2 id="_1-1-特定场景下的「响应式」" tabindex="-1"><a class="header-anchor" href="#_1-1-特定场景下的「响应式」"><span>1.1 特定场景下的「响应式」</span></a></h2><p>如果你正在阅读本书，你可能听过诸如「响应式应用」、「响应式编程」、「响应式流」或「响应式宣言」等概念。这些词加上「响应式」前缀后感觉更加高大上了，但是你可能会去思考在这些不同场景下「响应式」的含义。那就让我们去看看这个词在计算机系统中的起源，从中寻求答案。</p><h3 id="_1-1-1-「响应式」的起源" tabindex="-1"><a class="header-anchor" href="#_1-1-1-「响应式」的起源"><span>1.1.1 「响应式」的起源</span></a></h3><p>「响应式系统」并不是一个新的概念。David Harel 和 Amir Pnueli 在<a href="http://mng.bz/p1n3" target="_blank" rel="noopener noreferrer">《关于响应式系统的发展》</a>（1985年出版）的论文中就收集整理了几个二分法，以此来表征复杂的计算机系统，并提出了一个新的二分法：<strong>转换系统与响应式系统</strong>。转换系统接受一组已知的输入，然后转换这些输入，最终产生输出。例如，转换系统可以提示用户进行一些输入，然后再根据用户提供的内容来提示用户，并最终产出结果。</p><p>思考一下，比如，袖珍计算器，它接受数字并执行基本操作，以便在按下等号键时最终返回结果。另一方面，响应式系统由外部环境持续刺激，其作用是不断响应这些刺激。例如，具有运动监测测功能的 WIFI 摄像机可以注意到小偷进入了房间，然后它会向摄像机主人的手机发送警报，于是他们无助地目睹了小偷将其房间里的贵重物品洗劫一空，以及不久之后警察到达现场的情景。</p><p>几年后，<a href="https://hal.inria.fr/inria-00075494/document" target="_blank" rel="noopener noreferrer">Gérard Berry</a> 通过介绍交互式程序和响应式程序之间的区别来改进了这一定义。 交互式程序与环境交互的速度由程序本身决定，而响应式程序则由外部环境决定。</p><p>因此，响应式程序能够：</p><ul><li><p>持续与它们的环境进行交互</p></li><li><p>交互速度由外部环境而不是程序本身决定</p></li><li><p>对外部的需求进行响应</p></li></ul><p>让我们再回到当下，响应式程序以前的操作，看起来很像是 Web 应用程序的运行方式，或者说是 Web 应用程序应该如何运行。尽管这在理论上很有吸引力，但是要实现这些标准难度很大，并且当系统的用户量增加以及系统所需要的性能提高时，对硬件资源的要求也提出了一个很严峻的挑战。因为缺乏广泛的高性能硬件去实现大规模的实时交互，所以一直到最近几年之前「响应式系统」都没有经常被提及，直到「<strong>响应式宣言</strong>」 的出现，这份「宣言」阐明了响应式系统的一系列核心特征。</p><h3 id="_1-1-2-「响应式」宣言" tabindex="-1"><a class="header-anchor" href="#_1-1-2-「响应式」宣言"><span>1.1.2 「响应式」宣言</span></a></h3><p>响应式宣言的第一个版本在 2013 年 6 月发布，它描述了「响应式应用程序」的软件架构体系。 「响应式应用程序」的定义中包含了许多特性，这些特性使得应用程序能够像我们前面讨论过的响应式程序那样 —— 持续可用以及实时响应外部需求。虽然 <strong>响应式宣言</strong> 看上去似乎是在描述一种全新的架构模式，但其核心原则在一些需要 IT 系统能够实时响应的行业中早已被广泛接受，比如金融交易行业。</p><p>下面这四个特性组成了响应式应用程序：</p><ul><li><p>响应式——响应用户</p></li><li><p>可伸缩——响应负载</p></li><li><p>弹性化——响应失败</p></li><li><p>事件驱动——响应事件</p></li></ul><p>响应式应用程序要能满足用户对可用性以及实时响应行为的期望。所谓实时，或者说类实时，意味着应用程序能够在短时间或者极短时间内作出响应。请求和响应之间的时间间隔我们称为「延迟」，它是评估一个系统执行情况的关键测量之一。</p><p>为了能够持续地与所在环境进行交互，响应式应用要能够适应它们所面临的负载。突然的流量爆发可能会对程序造成一定的影响；比如，一条带有新闻外链的热门推特可能会对外链指向的新闻网站造成冲击。因此，应用程序必须是可扩展的，必要时，能够增加其计算能力。这就意味着应用程序不仅要能在一台机器上（可能具有一个或者多个CPU内核）有效地使用硬件资源，而且，当系统负载增加时，它还要能在多个计算机节点上运行。</p><ul><li>注：我们使用术语「计算机节点」或简称为「节点」来指代运行 Web 应用程序的资源。 实际上，这可能指的是物理计算机，虚拟机，甚至是服务提供商上的逻辑节点。</li></ul><p>因为即使是最简单的系统也容易出现故障（不论是与软件相关还是与硬件相关），所以，要想让系统持续可用，响应式应用程序必须能够弹性化地处理失败的情况。当涉及到可伸缩性系统时，应用程序面对问题之后的恢复能力将变得更加重要，因为这类系统在本质上以及分布上面的复杂程度会导致其在硬件以及网络上面出现故障的几率增加。</p><p>基于异步通讯的事件驱动应用程序能够使我们的系统具有前面列举出的那几个特性。在这种设置下，系统（或子系统）能够对诸如 HTTP 请求之类的离散事件发生反应，而不需要在等待事件发生时独占计算资源。与传统的同步方法调用相比，这种自然级别的并发性带来了更低的延迟。编写事件驱动程序的另一个结果是组件松散耦合，长远来看，这会使得软件更加易于维护。</p>',33)]))}const h=a(p,[["render",r],["__file","reactive-web-applications-1.html.vue"]]),o=JSON.parse('{"path":"/reactive/reactive-web-applications-1.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"原书","slug":"原书","link":"#原书","children":[]},{"level":2,"title":"第一章：你是说「响应式」？","slug":"第一章-你是说「响应式」","link":"#第一章-你是说「响应式」","children":[]},{"level":2,"title":"本章内容","slug":"本章内容","link":"#本章内容","children":[]},{"level":2,"title":"概览","slug":"概览","link":"#概览","children":[]},{"level":2,"title":"1.1 特定场景下的「响应式」","slug":"_1-1-特定场景下的「响应式」","link":"#_1-1-特定场景下的「响应式」","children":[{"level":3,"title":"1.1.1 「响应式」的起源","slug":"_1-1-1-「响应式」的起源","link":"#_1-1-1-「响应式」的起源","children":[]},{"level":3,"title":"1.1.2 「响应式」宣言","slug":"_1-1-2-「响应式」宣言","link":"#_1-1-2-「响应式」宣言","children":[]}]}],"git":{},"filePathRelative":"reactive/reactive-web-applications-1.md","excerpt":"<h2 class=\\"blog-title\\"> [译] 响应式 Web 应用（一）</h2>\\n<h2>原书</h2>\\n<p><a href=\\"https://www.manning.com/books/reactive-web-applications\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.manning.com/books/reactive-web-applications</a></p>\\n<h2>第一章：你是说「响应式」？</h2>\\n<p>本章所包含的内容：</p>\\n<h2>本章内容</h2>\\n<ul>\\n<li>\\n<p>响应式应用及其起源</p>\\n</li>\\n<li>\\n<p>为什么响应式应用是必要的</p>\\n</li>\\n<li>\\n<p>Play 如何帮你构建响应式应用</p>\\n</li>\\n</ul>"}');export{h as comp,o as data};
