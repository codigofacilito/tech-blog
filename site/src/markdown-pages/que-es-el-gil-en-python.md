---
title: "Qué es el GIL en Python"
cover_url: "https://i.imgur.com/NIY1LUH.jpg"
tags: ["python"]
date: 2019-07-24
author: 
  name: Eduardo
  email: eduardo@codigofacilito.com
---


En la actualidad la mayoría de los lenguajes de programación soportan la programación concurrente y la programación en paralelo, pudiendo así ejecutar diferentes tareas en diferentes procesadores, sin embargo, con Python esto no es así. 😰 Sí, lo sé, cuesta creer, pero es la verdad. Con Python al utilizar Threads nunca seremos capaces de lograr un verdadero paralelismo, ya que el lenguaje está diseñado para que un thread y solo un thread pueda ejecutarse a la vez. 

No me crees 😓, veamos un ejemplo.  En este caso he definido una función que lo unico que hace es decrecer su parametro(number) hasta llegas a 0.

```python
import time

def countdown(number):
    while number > 0:
        number -=1

if __name__ == '__main__':
    start = time.time()

    count = 100000000
    countdown(count)

    print(f'Tiempo transcurrido {time.time() - start }')
```

Si ejecuto mi script, tal y como se encuentra ahora, con un solo thread y de forma secuencial, le tomará un apróximado de 6 segundos finalizar. Todo bien, nada nuevo.

<a href="https://imgur.com/0nvc6Uf"><img src="https://i.imgur.com/0nvc6Uf.png" title="source: imgur.com" /></a>

Ahora, hagamos los mismo pero con dos threads. En teoria, al los threads ejecutarse de forma concurrente al script le debería  tomar poco más de 6 segundos finalizar, quizás, unos milisegundos más, en teoria. 😳

```python
import time
import threading

def countdown(number):
    while number > 0:
        number -=1

if __name__ == '__main__':
    start = time.time()

    count = 100000000

    t1 = threading.Thread(target=countdown, args=(count,))
    t2 = threading.Thread(target=countdown, args=(count,))

    t1.start()
    t2.start()

    t1.join()
    t2.join()

    print(f'Tiempo transcurrido {time.time() - start }')
```

A mi escript, de forma concurrente le toma 12 segundos finalizar, sí, el doble de tiempo apesar de utilizar threads. 😲 Esto gracias al __GIL__.

<a href="https://imgur.com/YdZV3TM"><img src="https://i.imgur.com/YdZV3TM.png" title="source: imgur.com" /></a>

Seguro no te lo esperabas, de hecho yo tampoco, siendo Python uno de los lenguajes más populares y utilizados en todos el mundo como es posible que el mismo lenguaje limite su potencial, pues bien esto se debe a gracias a __GIL__ Global interepter Lock, el villano en todo esto, o quizás no, veamos, por que es tan importante __GIL__ en Python.

### GIL

Verás, el __GIL__ ,Global interepter Lock de Python, permite que sólo un thread tome el control del intérprete, es decir, que solo un thread puede estar en ejecución a la vez. Esto rara vez tiene repercusiones para quienes desarrollamos programas utilizando solo el thread principal, es más, es probable que nunca nos hayamos dado cuenta, pero, para aquellas personas que desarrollan de forma concurrente este si puede llegar a ser un dolor de cabeza.

<a href="https://imgur.com/Vtqclbq"><img src="https://i.imgur.com/Vtqclbq.png" title="source: imgur.com" /></a>

Pero, ¿Si __GIL__ genera cuellos de botella, por qué se introdujo en primera instancia  y por qué simplemente no se quita? Muy buenas preguntas, y para responderlas es necesario comprender como funciona Python internamente.

En términos simples Python posee un concepto llamado __conteo de referencias__, el cual le permite conocer al intérprete cuando un objeto está siendo utilizando y cuando no. Es algo bastante simple. 

Por ejemplo, si mi variable _A_, posee referencias, por lo menos una o más, entonces, se concluye que la variable está siendo utilizada en alguna parte del programa. Por otro lado, si la variable no posee referencia, se concluye que no se está utilizando, y es allí donde entra el recolector de basura y libera la memoria.

```python
import sys

A = 'Hola, soy una referencia'

sys.getrefcount(a)
>>> 2
```

En este casa obtenemos como resultado dos, ya que la variable A cuenta con dos referencias, la asignación y en el llamado a la función.

Bastante sencillo ¿no?

Pues bien, el trabajo de __GIL__ es impedir que múltiples threads decrementa la referencia de algún objeto  mientras otros están haciendo uso de ella. Como la naturaleza de un thread es trabajar de forma concurrente, en teoría, es posible que un thread le indique al intérprete que una variable se ha dejado de utilizar, cuando realmente otro thread aun sigue trabajando con ella. 

Para evitar este problema se implementó __GIL__, permitiendo que sólo un thread tome el control del intérprete.

__GIL__ no solo se resolvio el problema del __conteo de referencias__, también hizo que la implementación de Python sea mucho más sencilla, a la vez que incrementa la velocidad de ejecución cuando trabajamos con un único thread.

En palabras de Larry Hastings: _la decisión del diseño de GIL es una de las cosas que hizo que Python fuera tan popular como lo es hoy._

Ahora, ya sabemos que __GIL__ previene que espacios en memoria sean liberados cuando aún están siendo utilizados, ok, pero, ¿no hay forma en crear algún otro mecanismo en el recolector de basura para evitar el problema? pues, dejame decirte que __Guido van Rossum__ ,creador de Python dice que __GIL__ esta aquí para quedarse, esto lo explica muy bien en un <a href="https://mail.python.org/pipermail/python-3000/2007-May/007414.html" target="_blank">post </a> al cual te invito le heches un ojo.

Pero en esencia, eliminar __GIL__ traería muchos más problemas que ventajas. Programas que ya se encuentran en producción podrían dejar de comportarse como lo hacen ahora para simplemente fallar. Así que, mejor no. (Yo puedo vivir con __GIL__)

### Multiprocesamientos

Pero no te preocupes, no todo está perdido. Si realmente queremos que las tareas se ejecuten de forma paralela debemos optar por  el multiprocesamiento sobre el multithreading; de esta forma cada proceso tendrá su propio intérprete y podrá ejecutarse de manera independiente, logrando así evitar el cuello de botella de __GIL__ y aprovechando todo el potencial de nuestros equipos.

La mejor forma de trabajar procesos en Python es sin duda con la librería __multiprocessing__.

Aquí un pequeño ejemplo de como crear nuestros propios Procesos. Haz la prueba por ti mismo y verás el resultado.

```python
import time
import threading
import multiprocessing

def countdown(number):
    while number > 0:
        number -=1

if __name__ == '__main__':
    start = time.time()

    count = 100000000

    t1 = multiprocessing.Process(target=countdown, args=(count,))
    t2 = multiprocessing.Process(target=countdown, args=(count,))

    t1.start()
    t2.start()

    t1.join()
    t2.join()

    print(f'Tiempo transcurrido {time.time() - start }')

```

Si quieres conocer más acerca de __GIL__, tambíen conocido por la comunidad  como: an an “infamous” feature of Python, te comparto una <a href="https://www.youtube.com/watch?v=KVKufdTphKs&" target="_blank">conferencia </a> de Larry Hastings.