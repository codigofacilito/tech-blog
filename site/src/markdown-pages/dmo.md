---
title: "Generar SEO URLs con Rails"
cover_url: "https://i.imgur.com/NIY1LUH.jpg"
tags: ["rails","ruby"]
date: 2019-07-24
author: 
  name: Uriel
  email: uriel@codigofacilito.com
---

Entendemos por una URL SEO o una URL amigable, aquellas en las que humanamente se pueden leer, y que normalmente son fáciles de recordar.

Una URL puede verse así `codigofacilito.com/cursos/250` o así `codigofacilito.com/cursos/introduccion-rails`, por defecto, la mayoría de los frameworks usan URLs como en el primer ejemplo (codigofacilito.com/cursos/250), donde la parte final representa un identificador único en la base de datos, normalmente un número. Una SEO URL, por su parte, no usa números ni combinaciones de caracteres, en cambio, utiliza palabras como `introduccion-rails` para identificar el recurso.

Las SEO URLs son de suma importancia en un proyecto web porque:

* Son fáciles de recordar, en comparación con números o combinaciones de caracteres
* Se sabe que tienen un impacto positivo en la optimización de tu contenido para motorees de búsqueda como Google, Bing, entre otros

![Imagen portada que muestra el título del artículo y el logo de Ruby on Rails](https://i.imgur.com/1vBgfSJ.jpg)

En este tutorial, aprenderás cómo usar SEO URLs en tu aplicación de Ruby on Rails, usando la gema [friendly_id](https://github.com/norman/friendly_id).

Si quieres aprender cómo usar SEO URLs en Django o Laravel, tenemos otros tutoriales que puedes ver haciendo clic [aquí](https://codigofacilito.com/bytes?keyword=SEO+URLS)

## Conocimientos previos

### Slugs
Slug es el concepto con el que identificamos a la combinación de palabras que identifican a un registro de manera única, en el caso de la URL `codigofacilito.com/cursos/introduccion-rails`, el slug es **introduccion-rails**, si tomamos otro ejemplo como `codigofacilito.com/articulos/seo-urls-rails`, el slug sería **seo-urls-rails**.

El slug normalmente, se genera de manera dinámica a partir de alguna propiedad del registro como el título o el nombre, de manera que del registro con título `Curso de Ruby on Rails` podríamos definir un script de código que obtenga el slug `curso-de-ruby-on-rails`.

El slug, es una cadena con palabras compatible con el esquema URI, eso significa que:
* No contienen espacios
* No contienen caracteres especiales
* No contienen signos
* Es indiferente a mayúsculas y minúsculas, por lo que ruby-on-rails es igual que Ruby-ON-rails.

### Arquitectura REST
La web está basada en el protocolo HTTP, y una de las arquitecturas más comunes y populares para la organización de las rutas de una aplicación web también está basada en este protocolo, hablamos de la arquitectura REST.

No voy a profundizar en el tema, pero en el [Curso Profesional de Backend](https://codigofacilito.com/cursos/backend-profesional) hablamos a detalle del tema.

Para propósitos de este artículo, cabe destacar que en REST, las URLs representan recursos, nunca acciones.

Si las URLs de tu aplicación web se ven así, estás representando acciones en tus URLs:
```
miadmin.com/ver?id=12318923
```

En REST, lo mismo se vería así:
```
miadmin.com/12318923
```

Si quieres diferenciar entre las URLs para guardar, crear, actualizar o eliminar, debes usar verbos HTTP, en lugar de colocar la acción en la URL:
```
GET miadmin.com/12318923 // Mostrar o Ver
PUT miadmin.com/12318923 // Actualizar
DELETE miadmin.com/12318923 // Eliminar
```

La ventaja de usar URLs que representan recursos en lugar de acciones son las siguientes:
* Reduce la ambiguedad, ya que en lugar de arbitrariamente elegir el verbo (ver,mostrar,obtener, leer), usas un verbo estándar, en este caso GET.
* Evitas problemas con los algoritmos de indexamiento que siempre siguen links y nunca harán peticiones que no sean vía el verbo GET. Asumiento que usas una petición como `GET /eliminar?ID=123123`, podría un algoritmo accidentalmente seguir dicho link automáticamente y eliminar el recurso.
* Te permite usar URLs amigables, como las que enseñamos en este tutorial

## Conoce friendly_id
friendly_id es una gema para el manejo de URLs amigables o URLs SEO en una aplicación de Ruby on Rails, lo que te permite ir de URLs como esta:
```
codigofacilito.com/cursos/250
```
A URLs como esta:
```
codigofacilito.com/cursos/introduccion-rails
```

Además, [friendly_id](https://github.com/norman/friendly_id) ofrece características de uso avanzado como:
1. Historial de slugs y versionamiento
2. Slugs con alcance delimitado
3. Palabras reservadas
4. Internacionalización (i18n), es decir, manejo de slugs en distintos idiomas
5. Palabras reservadas
6. Generadores personalizados de slugs

### Configurar friendly_id en un proyecto de Ruby on Rails
Para comenzar con la configuración de [friendly_id](https://github.com/norman/friendly_id), vamos a definir la gema en nuestro Gemfile:

```
gem 'friendly_id', '~> 5.2.4'
```

Posteriormente la instalamos con Bundler:

```
bundle install
```

Una vez que la gema está instalada, necesitamos agregar un campo `slug` a la tabla para la que definiremos las SEO URLs, así que si tuvieras un modelo `Article`, la nueva migración se generaría de la siguiente manera:

```
rails generate migration add_column_slug_to_articles slug:uniq`
```

Asegúrate de sustituir la parte de `articles`, si la tabla es distinta en tu proyecto de Rails.

A continuación vamos a ejecutar el archivo de iniciación que la gema contiene, este comando procederá a generar archivos de configuración y una migración a partir de la cuál se generá una tabla para manejar un historial de cambios en los slugs de cada registro:

```
rails generate friendly_id
```

Hasta este punto, tendremos dos migraciones nuevas, la que agrega la columna `slug` a la tabla correspondiente, y una que generará una nueva tabla para el manejo de cambios, como mencioné en el párrafo anterior. En caso de que no quieras llevar un control de cambios sobre el slug, deberás eliminar la migración `CreateFriendlyIdSlugs` que generó ele comando de iniciación de friendly_id, sin embargo, te recomiendo ampliamenete conservar la tabla y llevar un control de cambios, la gema lo hará por ti y esto evitará que eventualmente queden links rotos en tu aplicación, más detalles en un punto posterior del tutorial.

Una vez listo, deberás ejecutar las migraciones:

```
rails db:migrate
```

Por último, deberás agregar un par de líneas de configuración de friendly_id sobre el modelo que quieras que use URLs SEO:

```ruby
class Article < ApplicationRecord
  extend FriendlyId #Importa los métodos necesarios
  friendly_id :title, use: :slugged # Generará un slug a partir del campo title y lo guardará en slug
end
```

## Cómo usar friendly_id
Una vez que has configurado la gema, deberás modificar la forma en que se buscan registros individuales dentro de tus controladores.

Asumiendo que en este ejemplo estamos trabajando sobre un modelo `Article`, iremos al archivo `articles_controller` y modificaremos las líneas que buscan un artículo individual, para que en lugar de usar el ID, usen el slug, por ejemplo:

```ruby
def set_article
  @article = Article.friendly.find(params[:id])
end
```

## Historial de cambios en el slug
Considera que tienes un recurso con título `Curso de Ruby on Rails`, por defecto friendly_id producirá un slug para esa cadena como: `curso-de-ruby-on-rails`, lo que eventualmente produciría un path como: `cursos/curso-de-ruby-on-rails`, donde quizás sería mejor tener algo como `cursos/ruby-on-rails`.

Además, cuando dos registros comparten el mismo campo base para producir un slug, uno de ellos terminará producienedo un slug como este: `presentacion-12389huasidashduy1b2yu3`, donde la segunda parte de la cadena es un identificador único para diferenciarlo de otros registros que pudieran tener el mismo slug, haciendo que el propósito de usar SEO URLs se pierda.

En casos como estos puede ser conveniente cambiar manualmente el valor del slug, algo que puedes hacer como con cualquier otro campo:

```ruby
Article.update(slug:"nuevo-slug")
```

El problema de cambiar este slug, es que cualquier URL que hayas compartido antes de la modificación ahora apunta a un link roto, o a un link que muestra contenido distinto al original. Por ejemplo, si compartimos en redes sociales el link `codigofacilito.com/cursos/curso-de-ruby-on-rails`, y luego modificamos el slug para producir la siguiente URL `codigofacilito.com/cursos/ruby-on-rails`, la anterior que hemos compartido ahora arrojará un error 404.

Para evitar este problema, friendly_id viene equipada con un módulo que guarda los cambios realizados sobre el slug, evitando que una modificación a este campo produzca links rotos, en el caso del uso de friendly_id, ahora ambas rutas `/cursos/curso-de-ruby-on-rails` y `/cursos/ruby-on-rails` apuntan al mismo recurso.

Es importante que consideres esto para, en primer lugar, conservar esta funcionalidad de frineldy_id, y en caso de que no lo hagas, procurar no cambiar slugs una vez que la URL ha sido compartida o indexada por un buscador.

## Conclusión
Las SEO URLs o URLs amigables como también las conocemos, apuntan a recursos y son direcciones que:
* Son fáciles de recordar
* Contribuyen a la optimización para buscadores

Para poder producir estas URLs debes generar un slug, una cadena compatible con el esquema URI, única entre todos los registros, que identifica al recurso. Este campo debe modificarse con precaución ya que, sin el cuidado adecuado, puede producir links rotos y respuestas 404 que, en lugar de contribuir a mejorar tu ranking en búsquedas, lo dañe o afecte.
