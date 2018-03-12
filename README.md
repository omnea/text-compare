# Text compare

<!-- MarkdownTOC autolink=true autoanchor=true bracket=round depth=0 -->

- [Dependencies](#dependencies)
- [Instalation](#instalation)
- [Usage](#usage)
    - [Street](#street)
    - [Address](#address)
    - [Chaining](#chaining)
- [Architecture](#architecture)
    - [Facade](#facade)
    - [Core](#core)
    - [Plugins](#plugins)
    - [Languages](#languages)
    - [Comparators](#comparators)
- [Languages API](#languages-api)
    - [getWordWeights](#getwordweights)
    - [filterWords](#filterwords)
    - [splitWords](#splitwords)

<!-- /MarkdownTOC -->

<a name="dependencies"></a>
## Dependencies

None

<a name="instalation"></a>
## Instalation

npm install git@gitlab.com:omnea/text-compare.git

<a name="usage"></a>
## Usage

<a name="street"></a>
### Street

``` javascript
var Compare = require('text-compare');

var stringA = 'Company name A';
var stringB = 'company b';

var similitude = compare.inLang('de_DE').street(stringA, stringB);
```

`similitude` is an Number between 0 and 1:

<a name="address"></a>
### Address

``` javascript
var Compare = require('text-compare');

var similar = Compare.address({
    street: "meyersbeerstrasse 113",
    city: "Berlin",
    zip: "13088",
    country: "Germany"
},{
    street: "meyersbeerstrasse 113",
    city: "Berlin",
    zip: "13088",
    country: "Germany"
});
```

similar is an true or false:

<a name="chaining"></a>
### Chaining
If you can pass a preconfigures comparator yo can pass the result of `inLang()`

``` javascript
var compare = compare.inlang('de_DE');

someFunction(compare);

function someFunction (compare) {
    compare.street(); //Forzing to use English
}
```

You can change the language several times.

``` javascript
var compare = compare.inlang('de_DE');

someFunction(compare);

function someFunction (compare) {
    compare.inLang('en_GB').street(); //Forzing to use English
}
```

<a name="architecture"></a>
## Architecture

```
+-----------+                                     +------------------------+
|           |                                     |                        |
|           |                                     |                        |
|           |          +----------------+         |       LANGUAGES        |
|           |          |                |    +---->                        |
|           |          |                |    |    |                        |
|           |          |      CORE      +----+    +------------------------+
|  FACADE   +---------->                |
|           |          |                +-----+   +------------------------+
|           |          +----^-----------+     |   |                        |
|           |               ||                +--->                        |
|           |               ||                    |      COMPARATORS       |
|           |      +---------v--------+           |                        |
|           |      |                  |           |                        |
|           |      |                  |           +------------------------+
|           |      |     PLUGINS      |
+-----------+      |                  |
                   |                  |
                   +------------------+

```

<a name="facade"></a>
### Facade

Exposes the lib API (the `COMPARATORS` API and the `isLang` method). 
Mantain the selectec language and expose.

<a name="core"></a>
### Core

Load Languages, plugins and comparators and provide a object for her intercomunication.

<a name="plugins"></a>
### Plugins

Provide utilities for the comparators. Can use the language API.
Need to register all public methods in the contructor with the core method: `addMethod(name, callback)`. The callback need to be `.bind(this)`ed.

<a name="languages"></a>
### Languages

Has to implement the [Languages API](#languages-api). Provide utilities for parsing and transform every language. Every language needs a new module.

<a name="comparators"></a>
### Comparators

Implement two methods: 
 - `compare(lang:String, stringA:String, stringB:String)`. Computes 
 - `getName()` return the comparator name. The user will call a method equal as the name for using the comparator.

Comparators can access to lang API and plugins.

<a name="languages-api"></a>
## Languages API

<a name="getwordweights"></a>
### getWordWeights

`getWordWeights(words:array)`

return:

``` javascript
{
    wordsCount: {
        higth: Number,
        low: Number,
        total: Number
    },
    words: [
        {
            text: String,
            length: Number,
            weigth: Number("0 to 1"),
            type: String("unknow, pronoum, etc"),
            important: Bool
        },
        ...
    ]
}
```

<a name="filterwords"></a>
### filterWords

Remove words without sintaxis weigth.
Return an array only with relevant words

`filterWords(words:array)`

return:

``` javascript
[
    String,
    ...
]
```

<a name="splitwords"></a>
### splitWords

Return an array with the words of the string

`splitWords(string)`

return:

``` javascript
[
    String,
    ...
]