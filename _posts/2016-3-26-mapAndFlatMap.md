---
title: Scala中的map、flatMap
---

`Scala` 中的 `map` 和 `flatMap` 在开发中用处很多，功能也十分强大，本文将详细介绍 `Scala`中 `map` 和 `flatMap` 的常见用法以及 `map` 和 `flatMap` 的区别。

## map

在某一个`列表（List）`调用 `map` 时，`map` 可以接受一个`函数`或者一个`表达式`为参数，这个`函数`或者`表达式`将作用于`列表`中的每一个元素，最终返回一个新的`列表（List）`。

```scala
scala> val list = List(1,2,3,4,5,6)

scala> list.map(_ * 3)
res0: List[Int] = List(3, 6, 9, 12, 15, 18)
```
或者

```scala
scala> def f(x: Int) = x * 2

scala> list.map(x => f(x))
res1: List[Int] = List(2, 4, 6, 8, 10, 12)
```

## flatMap

`flatMap` 也可以传入一个`函数`，但是这个`函数`的返回值类型必须是 `List`、`Seq` 或者 `Option`，否则会出错。

`f(x)` 的返回值是 `Int`，不是 `List` 也不是 `Option`，所以会报错。

```scala
scala> list.flatMap( x => f(x))
<console>:13: error: type mismatch;
 found   : Int
 required: scala.collection.GenTraversableOnce[?]
       list.flatMap( x => f(x))
                           ^
```

`f(x)` 的返回值类型是 `Option`

```scala
scala> list.flatMap(x => Some(x * 1))
res5: List[Int] = List(1, 2, 3, 4, 5, 6)
```

`f2(x)` 的返回值类型是 `List`

```scala
scala> def f2(x: Int) = List(x+1,x,x-1)
f2: (x: Int)List[Int]

scala> list.flatMap(f2(_))
res7: List[Int] = List(2, 1, 0, 3, 2, 1, 4, 3, 2, 5, 4, 3, 6, 5, 4, 7, 6, 5)
```

## 区别

`map` 方法返回的是一个列表元素为列表的列表

```scala
scala> val list2 = list.map(f2(_))
list2: List[List[Int]] = List(List(2, 1, 0), List(3, 2, 1), List(4, 3, 2), List(5, 4, 3), List(6, 5, 4), List(7, 6, 5))
```
`flatMap` 方法返回的只是一个`列表（List）`。

```scala
scala> list.flatMap(f2(_))
res7: List[Int] = List(2, 1, 0, 3, 2, 1, 4, 3, 2, 5, 4, 3, 6, 5, 4, 7, 6, 5)
```
或者

```scala
scala> list2.flatMap(x => x)
res31: List[Int] = List(2, 1, 0, 3, 2, 1, 4, 3, 2, 5, 4, 3, 6, 5, 4, 7, 6, 5)
```
可以看到 `flatMap` 将列表内元素的 `外壳（List）` 去掉了，得到的是 `List` 中的元素，这个属性在 `Option` 中很有用，我们可以将 `Option` 看作是一个 `List`，只是其中要么只有一个元素，要么没有元素。

```scala
scala> def f3(x: Int) = if(x == 0) None else Some(x)
f3: (x: Int)Option[Int]

scala> val list2 = List(0,2,4,0,5,0,6,0)
list2: List[Int] = List(0, 2, 4, 0, 5, 0, 6, 0)

scala> list2.map(x => f3(x))
res10: List[Option[Int]] = List(None, Some(2), Some(4), None, Some(5), None, Some(6), None)

//flatMap将None过滤掉了，将类型为Option的列表元素变成了Int类型，得到一个列表元素类型为Int的列表
scala> list2.flatMap(x => f3(x))
res11: List[Int] = List(2, 4, 5, 6)

//map返回的List可能含有None，而flatMap返回的列表是不可能含有None的
```

`map` 也可以操作单个数据类型为 `Option` 的值，返回的值类型也是 `Option`，若 `flatMap` 也想操作，传入的表达式和函数的返回值类型必须是 `Option`。

```scala
scala> val a = Some(1)
a: Some[Int] = Some(1)

scala> a.map(_ * 2)
res12: Option[Int] = Some(2)
```
`flatMap` 传入的表达式或者函数的返回值类型必须是 `Option`，否则会出错。

```scala
scala> a.flatMap(_ * 2)
<console>:12: error: type mismatch;
 found   : Int
 required: Option[?]
       a.flatMap(_ * 2)
                   ^

scala> a.flatMap(x => Some(x*2))
res16: Option[Int] = Some(2)
```
`map` 和 `flatMap` 也可以操作列表元素为 `元组(k -> v)` 的列表，方法与上文提到的类似

用 `map` 将`函数`或者`表达式`应用到`元组`中

```scala
scala> val list3 = List((1 -> 3),(2 -> 4),(3 -> 6),(4 -> 8))
list3: List[(Int, Int)] = List((1,3), (2,4), (3,6), (4,8))

scala> list3.map(x => (x._1 -> x._2*2))
res23: List[(Int, Int)] = List((1,6), (2,8), (3,12), (4,16))
```

用 `flatMap` 将`函数`或者`表达式`应用到`元组`中去的时候，返回值类型必须是 `List`、`Seq` 或者 `Option` 否则会出错

```scala
scala> list3.flatMap(x => (x._1 -> x._2*2))
<console>:12: error: type mismatch;
 found   : (Int, Int)
 required: scala.collection.GenTraversableOnce[?]
       list3.flatMap(x => (x._1 -> x._2*2))
                                ^
```
函数的返回值类型是 `List`

```scala
scala> def f4(k: Int,v: Int) = List((k-1,v-1),(k,v),(k+1,v+1))
f4: (k: Int, v: Int)List[(Int, Int)]

scala> list3.flatMap(x => f4(x._1,x._2))
res25: List[(Int, Int)] = List((0,2), (1,3), (2,4), (1,3), (2,4), (3,5), (2,5), (3,6), (4,7), (3,7), (4,8), (5,9))
```
表达式的返回值类型是 `Option`

```scala
scala> val list4 = List((0 -> 1),(0 -> 2),(0 -> 3),(1 -> 4),(2 -> 5),(3 -> 6))
list4: List[(Int, Int)] = List((0,1), (0,2), (0,3), (1,4), (2,5), (3,6))

scala> list4.flatMap(x => if(x._1 == 0) None else Some((x._1,x._2 * 2)))
res26: List[(Int, Int)] = List((1,8), (2,10), (3,12))
```
