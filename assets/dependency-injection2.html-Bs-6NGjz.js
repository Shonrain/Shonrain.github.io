import{_ as n,c as a,a as e,o as p}from"./app-HaVGcHMr.js";const c={};function l(t,s){return p(),a("div",null,s[0]||(s[0]=[e(`<h2 class="blog-title">Play! Framework 系列（四）：DI 模式比较</h2><p>在<a href="http://shawdubie.com/notes/dependency-injection" target="_blank" rel="noopener noreferrer">Play! Framework 系列（三）</a>中我们简单介绍了一下 Play 框架自身支持的两种依赖注入（运行时依赖注入、编译时依赖注入）。相信大家对 Play! 的依赖注入应该有所了解了。本文将详细地介绍一些在日常开发中所采用的依赖注入的方式，以供大家进行合理地选择。</p><h2 id="guice-和-手动注入" tabindex="-1"><a class="header-anchor" href="#guice-和-手动注入"><span>Guice 和 手动注入</span></a></h2><p>在<a href="http://shawdubie.com/notes/dependency-injection" target="_blank" rel="noopener noreferrer">上一篇</a>文章中我们所介绍的「运行时依赖注入」以及「编译时依赖注入」就是用的 Guice 以及手动注入，在这里就不作详细介绍了，大家可以去看看上篇文章以及相应的 <a href="https://github.com/Shonrain/Play-Demo/tree/master/play-demo-2" target="_blank" rel="noopener noreferrer">Demo</a></p><p>接下来我们介绍比较常用的依赖注入模式。</p><h2 id="cake-pattern-蛋糕模式" tabindex="-1"><a class="header-anchor" href="#cake-pattern-蛋糕模式"><span>cake pattern（蛋糕模式）</span></a></h2><p>我们首先介绍一下 Scala 中比较经典的一种依赖注入的模式—— cake pattern（也叫“蛋糕模式”），“蛋糕模式”也属于「编译时依赖注入」的一种，她不需要依赖 DI 框架。那 “蛋糕模式” 是如何实现的呢？我们知道，在 Scala 中，多个 trait（特质）能够 “混入” 到 class 中，这样在某个 class 中我们就能够得到所有 trait 中定义的东西了。“蛋糕模式”就是基于此种特性而实现的。</p><p>接下来我们就通过一个例子来了解一下“蛋糕模式”：</p><p>我们需要在页面上显示一个包含所有会员信息的会员列表，需要显示的内容有：</p><ol><li>会员信息</li><li>会员卡的信息</li></ol><p>需求很简单，接下来我来用代码组织一下业务：</p><p>我们需要从数据库中查询「会员卡」以及「会员」的信息，所以这里我们首先定义一个数据库连接的类：DatabaseAccessService 来对相应的数据库进行操作：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token keyword">trait</span> DatabaseAccessServiceComp <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">val</span> databaseAccessService <span class="token operator">=</span> <span class="token keyword">new</span> DatabaseAccessService<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> DatabaseAccessService<span class="token punctuation">{</span></span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大家可能会发现，在我们之前文章中的 service 中并没有定义 trait，而这里却定义了，并且在 trait 中，我们实例化了 DatabaseAccessService， 这就是“蛋糕模式”中所需要的，现在看好像并没有什么卵用，别急，等我们将所有的 service 都定义好了，她就有用了。</p><p>接下来我们定义 WxcardService 以及 WxcardMemberService：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token comment">//定义 WxcardService</span></span>
<span class="line"><span class="token keyword">trait</span> WxcardServiceComp <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">this</span><span class="token operator">:</span> DatabaseAccessServiceComp <span class="token keyword">=&gt;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">val</span> wxcardService <span class="token operator">=</span> <span class="token keyword">new</span> WxcardService<span class="token punctuation">(</span>databaseAccessService<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> WxcardService<span class="token punctuation">(</span>databaseAccessService<span class="token operator">:</span> DatabaseAccessService<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//定义 WxcardMembrService</span></span>
<span class="line"><span class="token keyword">trait</span> WxcardMemberServiceComp <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">this</span><span class="token operator">:</span> DatabaseAccessServiceComp <span class="token keyword">=&gt;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">val</span> wxcardMemberService <span class="token operator">=</span> <span class="token keyword">new</span> WxcardMemberService<span class="token punctuation">(</span>databaseAccessService<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> WxcardMemberService<span class="token punctuation">(</span>databaseAccessService<span class="token operator">:</span> DatabaseAccessService<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写法与上面定义的 DatabaseAccessService 没有什么区别，因为上面两个 service 都需要依赖 DatabaseAccessService，所以在特质中用「自身类型」来将其混入，如果需要多个依赖，可以这样写：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token keyword">this</span> DatabaseAccessServiceComp <span class="token keyword">with</span> BarComp <span class="token keyword">with</span> FooComp <span class="token keyword">=&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>最后我们需要定义一个 WxcardController，来将数据传递到相应的页面上去：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token keyword">class</span> WxcardController <span class="token punctuation">(</span></span>
<span class="line">  cc<span class="token operator">:</span> ControllerComponents<span class="token punctuation">,</span></span>
<span class="line">  wxcardService<span class="token operator">:</span> WxcardService<span class="token punctuation">,</span></span>
<span class="line">  wxcardMemberService<span class="token operator">:</span> WxcardMemberService</span>
<span class="line"><span class="token punctuation">)</span> <span class="token keyword">extends</span> AbstractController<span class="token punctuation">(</span>cc<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 WxcardController 需要依赖我们上面定义的一些 service，那么在蛋糕模式下，我们怎样才能将这些依赖注入到 WxcardController 中呢，由于“蛋糕模式”也是「编译时依赖注入」的一种，那么我们可以参考<a href="http://shawdubie.com/notes/dependency-injection" target="_blank" rel="noopener noreferrer">上一篇</a>文章中所采用的方式：</p><p>同样，我们需要实现自己的 ApplicationLoader：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token comment">//定义 load 那部分代码省略了，大家可以去看 Demo</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> MyComponents<span class="token punctuation">(</span>context<span class="token operator">:</span> ApplicationLoader<span class="token punctuation">.</span>Context<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">extends</span> BuiltInComponentsFromContext<span class="token punctuation">(</span>context<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">with</span> <span class="token namespace">play<span class="token punctuation">.</span>filters<span class="token punctuation">.</span></span>HttpFiltersComponents</span>
<span class="line">    <span class="token keyword">with</span> DatabaseAccessServiceComp</span>
<span class="line">    <span class="token keyword">with</span> WxcardServiceComp</span>
<span class="line">    <span class="token keyword">with</span> WxcardMemberServiceComp <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardController <span class="token operator">=</span> <span class="token keyword">new</span> WxcardController<span class="token punctuation">(</span>controllerComponents<span class="token punctuation">,</span> wxcardService<span class="token punctuation">,</span> wxcardMemberService<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">lazy</span> <span class="token keyword">val</span> router<span class="token operator">:</span> Router <span class="token operator">=</span> <span class="token keyword">new</span> Routes<span class="token punctuation">(</span>httpErrorHandler<span class="token punctuation">,</span> wxcardController<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的代码，就完成了注入，可以看到我们定义的所有 xxxServiceComp 特质都被混入到了 MyComponents 中，这样，当 Play加载时，我们所定义的 service 就都在这里被实例化了，为什么呢？因为我们在定义 xxxServiceComp 时，都会有这么一行代码：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token keyword">val</span> xxxService <span class="token operator">=</span> <span class="token keyword">new</span> XxxService<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这就是为什么我们之前要在每个 service 中都定义一个 trait，因为 Scala 中的 class 可以混入多个 trait，在这里，我们可以将所有需要的依赖都混入到 MyComponents 中，然后实现注入。</p><p>至于为什么要叫“蛋糕模式”，我个人是这么理解的： 我们定义的 xxxServiceComp 比如 WxcardServiceComp 相当于蛋糕中的某一层，而那些需要被多次依赖的 xxxServiceComp，比如上面定义的 DatabaseAccessServiceComp 可以看作是蛋糕中的调味料（比如水果，巧克力啥的），将这些蛋糕一层一层地放在一起，然后再混入一些调味料，就组成了一个大的蛋糕—— MyComponents。</p><p>可以看到“蛋糕模式”中，我们需要写非常多的样板代码，要为每个 service 都定义一个 trait，感觉心很累，那么接下来我们就介绍一种比较轻巧而又简洁的的方式。</p><h2 id="macwire" tabindex="-1"><a class="header-anchor" href="#macwire"><span>macwire</span></a></h2><p><a href="https://github.com/adamw/macwire" target="_blank" rel="noopener noreferrer">macwire</a> 是基于 「Scala 宏」来实现的，我们使用她可以让依赖注入变得非常简单，并且使我们的代码量减少许多。接下来，我们就通过 macwire 来实现一下上面的例子。</p><p>首先在项目中引入 macwire，在 build.sbt 文件中增加一行依赖：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line">libraryDependencies <span class="token operator">++</span><span class="token operator">=</span> Seq<span class="token punctuation">(</span></span>
<span class="line">  <span class="token string">&quot;org.scalatestplus.play&quot;</span>   <span class="token operator">%</span><span class="token operator">%</span> <span class="token string">&quot;scalatestplus-play&quot;</span> <span class="token operator">%</span> <span class="token string">&quot;3.0.0-M3&quot;</span> <span class="token operator">%</span> Test<span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">//在这里添加 macwire 的依赖</span></span>
<span class="line">  <span class="token string">&quot;com.softwaremill.macwire&quot;</span> <span class="token operator">%</span><span class="token operator">%</span> <span class="token string">&quot;macros&quot;</span>             <span class="token operator">%</span> <span class="token string">&quot;2.3.0&quot;</span>    <span class="token operator">%</span> Provided<span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后定义 service：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token comment">//定义 DatabaseAccessService</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> DatabaseAccessService<span class="token punctuation">{</span></span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//定义 WxcardService</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> WxcardService<span class="token punctuation">(</span>databaseAccessService<span class="token operator">:</span> DatabaseAccessService<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//定义 WxcardMembrService</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> WxcardMemberService<span class="token punctuation">(</span>databaseAccessService<span class="token operator">:</span> DatabaseAccessService<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，我们现在就不需要定义 trait 了，接下来，定义 WxcardController：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token keyword">class</span> WxcardController <span class="token punctuation">(</span></span>
<span class="line">  cc<span class="token operator">:</span> ControllerComponents<span class="token punctuation">,</span></span>
<span class="line">  wxcardService<span class="token operator">:</span> WxcardService<span class="token punctuation">,</span></span>
<span class="line">  wxcardMemberService<span class="token operator">:</span> WxcardMemberService</span>
<span class="line"><span class="token punctuation">)</span> <span class="token keyword">extends</span> AbstractController<span class="token punctuation">(</span>cc<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>controller 的定义和上面的一样，接下来，我们就使用 macwire 来实现依赖注入，macwire 也是「编译时依赖注入」的一种，所以我们同样需要实现 ApplicationLoader：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token namespace">com<span class="token punctuation">.</span>softwaremill<span class="token punctuation">.</span>macwire<span class="token punctuation">.</span></span>_</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> MyComponents<span class="token punctuation">(</span>context<span class="token operator">:</span> ApplicationLoader<span class="token punctuation">.</span>Context<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">extends</span> BuiltInComponentsFromContext<span class="token punctuation">(</span>context<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">with</span> <span class="token namespace">play<span class="token punctuation">.</span>filters<span class="token punctuation">.</span></span>HttpFiltersComponents <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">lazy</span> <span class="token keyword">val</span> databaseAccessService <span class="token operator">=</span> wire<span class="token punctuation">[</span>DatabaseAccessService<span class="token punctuation">]</span></span>
<span class="line">  <span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardService <span class="token operator">=</span> wire<span class="token punctuation">[</span>WxcardService<span class="token punctuation">]</span></span>
<span class="line">  <span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardMemberService <span class="token operator">=</span> wire<span class="token punctuation">[</span>WxcardMemberService<span class="token punctuation">]</span></span>
<span class="line">  <span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardController <span class="token operator">=</span> wire<span class="token punctuation">[</span>WxcardController<span class="token punctuation">]</span></span>
<span class="line">  <span class="token keyword">lazy</span> <span class="token keyword">val</span> router<span class="token operator">:</span> Router <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">val</span> prefix <span class="token operator">=</span> <span class="token string">&quot;/&quot;</span></span>
<span class="line">    wire<span class="token punctuation">[</span>Routes<span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们只需要将相应的依赖通过下面的方式实例化就可以了：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardService <span class="token operator">=</span> wire<span class="token punctuation">[</span>WxcardService<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>就是在类型外面添加了一个 <code>wire</code>，这样就完成了实例化，并且也不需要指定依赖的参数，macwire 会自动帮我们完成实例化和注入：</p><p>比如上面的</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token keyword">lazy</span> <span class="token keyword">val</span> databaseAccessService <span class="token operator">=</span> wire<span class="token punctuation">[</span>DatabaseAccessService<span class="token punctuation">]</span></span>
<span class="line"><span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardService <span class="token operator">=</span> wire<span class="token punctuation">[</span>WxcardService<span class="token punctuation">]</span></span>
<span class="line"><span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardMemberService <span class="token operator">=</span> wire<span class="token punctuation">[</span>WxcardMemberService<span class="token punctuation">]</span></span>
<span class="line"><span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardController <span class="token operator">=</span> wire<span class="token punctuation">[</span>WxcardController<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>macwire 就帮我们转化成了：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token keyword">lazy</span> <span class="token keyword">val</span> databaseAccessService <span class="token operator">=</span> <span class="token keyword">new</span> DatabaseAccessService<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardService <span class="token operator">=</span> <span class="token keyword">new</span> WxcardService<span class="token punctuation">(</span>databaseAccessService<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardMemberService <span class="token operator">=</span> <span class="token keyword">new</span> WxcardMemberService<span class="token punctuation">(</span>databaseAccessService<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardController <span class="token operator">=</span> <span class="token keyword">new</span> WxcardController<span class="token punctuation">(</span>controllerComponents<span class="token punctuation">,</span> wxcardService<span class="token punctuation">,</span> wxcardMemberService<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们只需要在定义某个类的时候声明我们需要哪些依赖，实例化和注入 macwire 都会帮我们去完成，macwire 在实例化某个类的时候，会去当前文件或者与当前文件有关的代码中查找相关的依赖，找到了就完成注入，若没有找到说明该依赖没有被定义过，或者没有正确引入。</p><p>在日常开发中，我们会创建很多个 service，将所有的 service 放在 MyComponents 中实例化会使得代码显得很臃肿，而且也不便于维护。通常我们会专门定义一个 Module 来组织这些 service：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token keyword">package</span> <span class="token namespace">config</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token namespace">com<span class="token punctuation">.</span>softwaremill<span class="token punctuation">.</span>macwire<span class="token punctuation">.</span></span>_</span>
<span class="line"><span class="token keyword">import</span> <span class="token namespace">services<span class="token punctuation">.</span></span>_</span>
<span class="line"></span>
<span class="line"><span class="token keyword">trait</span> ServicesModule <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">lazy</span> <span class="token keyword">val</span> databaseAccessService <span class="token operator">=</span> wire<span class="token punctuation">[</span>DatabaseAccessService<span class="token punctuation">]</span></span>
<span class="line">  <span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardService <span class="token operator">=</span> wire<span class="token punctuation">[</span>WxcardService<span class="token punctuation">]</span></span>
<span class="line">  <span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardMemberService <span class="token operator">=</span> wire<span class="token punctuation">[</span>WxcardMemberService<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们新建了一个 ServiceModule.scala 文件来将组织这些 service。</p><p>那么上面的 ApplicationLoader 文件就可以这样去写：</p><div class="language-scala line-numbers-mode" data-highlighter="prismjs" data-ext="scala" data-title="scala"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token namespace">com<span class="token punctuation">.</span>softwaremill<span class="token punctuation">.</span>macwire<span class="token punctuation">.</span></span>_</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> MyComponents<span class="token punctuation">(</span>context<span class="token operator">:</span> ApplicationLoader<span class="token punctuation">.</span>Context<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">extends</span> BuiltInComponentsFromContext<span class="token punctuation">(</span>context<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">with</span> <span class="token namespace">play<span class="token punctuation">.</span>filters<span class="token punctuation">.</span></span>HttpFiltersComponents</span>
<span class="line">    <span class="token keyword">with</span> <span class="token namespace">config<span class="token punctuation">.</span></span>ServicesModule <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">lazy</span> <span class="token keyword">val</span> wxcardController <span class="token operator">=</span> wire<span class="token punctuation">[</span>WxcardController<span class="token punctuation">]</span></span>
<span class="line">  <span class="token keyword">lazy</span> <span class="token keyword">val</span> router<span class="token operator">:</span> Router <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">val</span> prefix <span class="token operator">=</span> <span class="token string">&quot;/&quot;</span></span>
<span class="line">    wire<span class="token punctuation">[</span>Routes<span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 macwire 使用起来非常简单，并且能够简化我们的依赖注入。在我们的项目中所采用的是 macwire，所以推荐大家使用 macwire。</p><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语"><span>结语</span></a></h2><p>关于 Play 中的「依赖注入」到这里就结束了，希望能够给大家一些帮助，本文的例子请戳<a href="https://github.com/Shonrain/Play-Demo/tree/master/play-demo-3" target="_blank" rel="noopener noreferrer">源码链接</a>。</p>`,54)]))}const o=n(c,[["render",l],["__file","dependency-injection2.html.vue"]]),r=JSON.parse('{"path":"/play/dependency-injection2.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Guice 和 手动注入","slug":"guice-和-手动注入","link":"#guice-和-手动注入","children":[]},{"level":2,"title":"cake pattern（蛋糕模式）","slug":"cake-pattern-蛋糕模式","link":"#cake-pattern-蛋糕模式","children":[]},{"level":2,"title":"macwire","slug":"macwire","link":"#macwire","children":[]},{"level":2,"title":"结语","slug":"结语","link":"#结语","children":[]}],"git":{},"filePathRelative":"play/dependency-injection2.md","excerpt":"<h2 class=\\"blog-title\\">Play! Framework 系列（四）：DI 模式比较</h2>\\n<p>在<a href=\\"http://shawdubie.com/notes/dependency-injection\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Play! Framework 系列（三）</a>中我们简单介绍了一下 Play 框架自身支持的两种依赖注入（运行时依赖注入、编译时依赖注入）。相信大家对 Play! 的依赖注入应该有所了解了。本文将详细地介绍一些在日常开发中所采用的依赖注入的方式，以供大家进行合理地选择。</p>"}');export{o as comp,r as data};
