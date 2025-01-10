---
title: 谈谈 Redux
---

写了快两个月的 React，也接触了好几个项目，基本上每个项目都有采用 Redux。本文谈谈在 Redux 使用上的一些心得吧。

## Redux 是个啥玩意？

简单地说 Redux 就是一个状态管理的容器，我们把需要共用的状态抽离出来，然后交给 Redux 统一去管理。我们都知道由 React 开发出的应用都是由一个一个组件而构成的，当组件足够多，且组件之间需要相互通信的时候，我们实现相互通信的一般方法就是：转态提升。所谓状态提升就是就就是将共用的状态放到一个父组件中，然后通过 props 向下分发。这种模式能够解决大部分组件之间互相通信的需求，但是当系统变得庞大且组件之间的通信错综复杂的时候，这样去管理就显得力不从心了，于是就有了 Redux，她将共用的状态进行集中化的管理，我们可以很方便地追踪数据的流向以及变化。

## 工作流程

首先思考一下没有 Redux 的时候，我们是怎么通过状态提升来实现组件之间通信的：

1. 将 state 定义在父组件内
2. 通过 props 将 state 和修改 state 的方法分发给子组件
3. 子组件通过分发的方法来修改 state

在没有 Redux 的情况下，我们通常都是这么去做的，具体的可以参考 [React 官网的例子](https://zh-hans.reactjs.org/docs/lifting-state-up.html)。

那我们用 Redux 进行状态管理的时候其实也可以依照上面的流程来进行理解：

1. 将 state 定义在父组件内 => store
2. 通过 props 将 state 和修改 state 的方法分发给子组件 => connect（React-Redux 中的方法）
3. 子组件通过分发的方法来修改 state => (action: 回调函数的参数，reducer: 回调函数)

可以看到 Redux 和我们通过状态提升的效果差不多，其实 Redux 也是状态提升，只不过这个转态被提升到了顶级，这样所有的组件都能进行通信。

Redux 中其实就那么几个东西：Action、Reducer、Store 以及 connect，没有其他的魔法，那么接下来就具体看看这几个概念。

## Store

Store 就类似于我们上面说的 state，只不过她的功能更加强大，在某个 React 应用中，store 是唯一的。可以把 store 看成是一个大的「容器」，她不仅存储 state，也提供了一系列操作 state 的方法。

```javascript
import { createStore } from 'redux'
// 创建 store
let store = createStore(reducers, initState);
```

上面我们就通过 createStore 创建了一个 store，可以看到 createStore 方法接收两个参数，第一个参数是 reducers，可以将她看作是一些回调方法的集合，第二个参数是 initState，就是我们上面说过的 state。

## Reducer

创建的 store 的时候需要传入 reducers，先看一下 reducer 是什么：

```javascript
const reducer = (previousState, action) => newState
```

可以看到 reducer 就是一个函数，就是我们上面说过的回调函数，它也有两个参数，第一个参数是 previousState，表示旧的 state，第二个参数是 action，就是上面说的「回调函数的参数」，reducer 的作用就是修改 state。她根据传过来的 action 来进行匹配，然后返回相应的 state。

## Action

前面说过 action 是 reducer 的参数

```javascript
const action = {
  type: 'FOO',
  payload: 'bar'
}
```

上面就是一个 action，说白了就是一个对象，store 通过 dispatch 将他分发给相应的 reducer，然后对 state 进行修改：

```javascript
store.dispatch(action);
```

Store、Reducer、Action 就是 Redux 的核心，当我们需要修改某个 state 的时候：

1. store.dispatch(action)，将 action 分发出去
2. reducer 根据 action 中的值进行处理，进而对 state 进行修改

## connect

connect 是 React-Redux 中的方法，我们通过这个方法来将 state 中的数据以及一些回调函数传入到相应的组件中：

```jsx
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

上面就是一个使用 connect 的例子，她是一个科里化函数，先接收两个参数：mapStateToProps（state 中的一些数据） 和 mapDispatchToProps（回调函数）。然后再接收一个参数，该参数就是一个组件，这个组件的 props 就是前面传入的两个参数。通过connect 我们就可以在 TodoList 组件中使用传入的数据以及方法了，通过这些方法我们也可去修改 state 的值，因为 state 是顶级状态且是共享的，这样我们就实现了组件之间的通信。

## 别滥用

> 只有遇到 React 实在解决不了的问题，你才需要 Redux。

在我接触的几个项目中，并不是每一个模块都需要用到 Redux，很多时候我们使用 state 就能做的很好。在使用 Redux 之前可以思考一下某个状态是否是大面积共享的，组件之间的通信是否是错综复杂的，如果满足上面的条件就可以考虑使用 Redux。在使用 Redux 的时候可以好好阅读一下官方文档以及文档中的[例子](https://www.redux.org.cn/docs/basics/ExampleTodoList.html)，不然很多时候状态管理可能会比不使用 Redux 还要糟糕。

Redux 的优点我就不说了，到处都是关于她的彩虹屁，我在使用她的时候，发现真的非常啰嗦，我要实现一个更改 state 的逻辑，需要定义 action、actionType、reducer，会写很多的样板代码，这是我不太喜欢的一点（当然不影响我使用），当然她之所以这么做，跟她推崇函数式、数据不可变有很大的关系。
