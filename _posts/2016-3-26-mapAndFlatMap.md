---
title: Scala中的Map、flatMap
date: 2016-03-26 18:18:34
tags: Scala
---

“如果只能有一种数据结构，那就用哈希表吧。”
Scala中的map和flatMap在开发中用处很多，功能也十分强大，本文将详细介绍Scala中map和flatMap的常见用法以及map和flatMap的区别。

* ## 在某一个列表（List）调用map时，map可以接受一个函数或者一个表达式为参数，这个函数或者表达式将作用于列表中的每一个元素，最终返回一个新的列表（List）

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

* ## flatMap也可以传入一个函数，但是这个函数的返回值类型必须是List、Seq或者Option，否则会出错

*f(x)的返回值是Int，不是List也不是Option，所以会报错*
```scala
scala> list.flatMap( x => f(x))
<console>:13: error: type mismatch;
 found   : Int
 required: scala.collection.GenTraversableOnce[?]
       list.flatMap( x => f(x))
                           ^
```

*f(x)的返回值类型是Option*
```scala
scala> list.flatMap(x => Some(x * 1))
res5: List[Int] = List(1, 2, 3, 4, 5, 6)
```

*f2(x)的返回值类型是List*
```scala
scala> def f2(x: Int) = List(x+1,x,x-1)
f2: (x: Int)List[Int]

scala> list.flatMap(f2(_))
res7: List[Int] = List(2, 1, 0, 3, 2, 1, 4, 3, 2, 5, 4, 3, 6, 5, 4, 7, 6, 5)
```

* ## map和flapMap在操作返回值为List或者Option时的区别
*map方法返回的是一个列表元素为列表的列表*
```scala
scala> val list2 = list.map(f2(_))
list2: List[List[Int]] = List(List(2, 1, 0), List(3, 2, 1), List(4, 3, 2), List(5, 4, 3), List(6, 5, 4), List(7, 6, 5))
```
*flatMap方法返回的只是一个列表（List）*
```scala
scala> list.flatMap(f2(_))
res7: List[Int] = List(2, 1, 0, 3, 2, 1, 4, 3, 2, 5, 4, 3, 6, 5, 4, 7, 6, 5)
```
或者
```scala
scala> list2.flatMap(x => x)
res31: List[Int] = List(2, 1, 0, 3, 2, 1, 4, 3, 2, 5, 4, 3, 6, 5, 4, 7, 6, 5)
```
*可以看到flatMap将列表内元素的“外壳（List）”去掉了，得到的是List中的元素，这个属性在Option中很有用，我们可以将Option看作是一个List，只是其中要么只有一个元素，要么没有元素 *
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
* ## map也可以操作单个数据类型为Option的值，返回的值类型也是Option，若flatMap也想操作，传入的表达式和函数的返回值类型必须是Option

```scala
scala> val a = Some(1)
a: Some[Int] = Some(1)

scala> a.map(_ * 2)
res12: Option[Int] = Some(2)
```
*flatMap传入的表达式或者函数的返回值类型必须是Option，否则会出错*
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
* ## map和flatMap也可以操作列表元素为元组(k -> v)的列表，方法与上文提到的类似

*用map将函数或者表达式应用到元组中*
```scala
scala> val list3 = List((1 -> 3),(2 -> 4),(3 -> 6),(4 -> 8))
list3: List[(Int, Int)] = List((1,3), (2,4), (3,6), (4,8))

scala> list3.map(x => (x._1 -> x._2*2))
res23: List[(Int, Int)] = List((1,6), (2,8), (3,12), (4,16))
```

*用flatMap将函数或者表达式应用到元组中去的时候，返回值类型必须是List、Seq或者Option否则会出错*
```scala
scala> list3.flatMap(x => (x._1 -> x._2*2))
<console>:12: error: type mismatch;
 found   : (Int, Int)
 required: scala.collection.GenTraversableOnce[?]
       list3.flatMap(x => (x._1 -> x._2*2))
                                ^
```
*函数的返回值类型是List*
```scala
scala> def f4(k: Int,v: Int) = List((k-1,v-1),(k,v),(k+1,v+1))
f4: (k: Int, v: Int)List[(Int, Int)]

scala> list3.flatMap(x => f4(x._1,x._2))
res25: List[(Int, Int)] = List((0,2), (1,3), (2,4), (1,3), (2,4), (3,5), (2,5), (3,6), (4,7), (3,7), (4,8), (5,9))
```
*表达式的返回值类型是Option*
```scala
scala> val list4 = List((0 -> 1),(0 -> 2),(0 -> 3),(1 -> 4),(2 -> 5),(3 -> 6))
list4: List[(Int, Int)] = List((0,1), (0,2), (0,3), (1,4), (2,5), (3,6))

scala> list4.flatMap(x => if(x._1 == 0) None else Some((x._1,x._2 * 2)))
res26: List[(Int, Int)] = List((1,8), (2,10), (3,12))
```
