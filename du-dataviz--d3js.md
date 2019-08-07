---
layout: default
title: Visualisation de données - d3.js
subtitle: Data-Driven Documents
---

[d3.js](http://www.d3js.org) est une librairie `javascript` très complète avec beaucoup d'exemples à disposition, avec une personnalisation totale possible. Elle permet l'accès à des primitives `SVG` permettant toute innovation. Malheureusement, elle est peu accessible directement et assez technique.

Les exemples présentés ci-dessous sont disponibles directement [sur cette page](http://codepen.io/collection/DojQMG/).

## Fonctionnement typique

L'idée principale est de lier les **données** au **DOM** (*Document Object Model*), et d'appliquer des transformations, basées sur les données, au document.

Il y a plusieurs concepts spécifiques à bien comprendre pour l'utiliser pleinement :

- Sélection, modification, ajout et insertion d'éléments
- Ajout de données au DOM
- Propriété dynamique, et Transformation
- Chaînage des fonctions

## Base 

### Sélection et modification

Il existe deux fonctions de sélection respectivement d'un élément (`select()`) et de l'ensemble des éléments (`selectAll()`) correspondant à la définition passée en paramètre (sélecteur idem que pour le CSS) :

```js
var selection1 = d3.select("selecteur");
var selection2 = d3.selectAll("selecteur");
```

On a de plus deux fonctions sur l'objet renvoyé par ces sélecteurs pour connaître la taille de la sélection :

- `size()` : taille de la sélection
- `empty()` : sélection vide ou non


### Modification, ajout et insertion d'éléments

Plusieurs fonctions permettent de modifier les éléments sélectionnés (comme par exemple `style()` pour appliquer des règles `CSS` ou `html()` pour modifier le contenu de la balise). Le code suivant permet de mettre le texte en rouge pour tout le corps de la page

```js
var corps = d3.select("body");
corps.style("color", "red");
```

Deux fonctions sont utiles pour respectivement insérer un élément `HTML` fils à la fin (`append()`) ou au début (`insert()`) d'un élément père, qui s'utilisent comme suit :

```js
selection.append("balise");
selection.insert("balise");
```

### Exemple 

Ici, on sélectionne la balise `<body>` (qui est vide au départ). Dans cette sélection, on ajoute deux balises `div`, pour mettre dans la première la taille de la sélection (`1` normalement) et dans la seconde le test si elle est vide ou non (normalement `false`). Enfin, on met le texte de la sélection en rouge (donc tout).

<p data-height="320" data-theme-id="0" data-slug-hash="bVMMjZ" data-default-tab="js,result" data-user="fxjollois" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/fxjollois/pen/bVMMjZ/">d3.js : base de la librairie</a> by FX Jollois (<a href="http://codepen.io/fxjollois">@fxjollois</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Ajout de données au DOM

Avec la fonction `data()` sur une sélection, il est possible de lier les données passées en paramètres (ce doit être un **tableau**) au DOM à la sélection en question. Le code suivant affecte chaque élément du tableau à chaque élément renvoyé par le sélecteur précédent

```js
var selection = d3.selectAll("selecteur");
selection.data(tableau);
```

S'il y a différence entre la taille de la sélection et la taille du tableau passé en paramètre de `data()`, il existe deux fonctions utiles pour gérer ces cas :

- `enter()` : pour gérer les éléments du tableau en plus
- `exit()` : pour gérer les éléments de la sélection en plus

### Propriété dynamique

Sur chaque sélection, on peut appliquer des modifications de style ou de contenu (voire autre), en fonction des données sont liées au DOM. On passe par l'utilisation d'une fonction anonyme, dont les paramètres peuvent être, dans cet ordre :

- la valeur de l'élément du tableau affectée à l'élément
- la position de la valeur dans le tableau
- il est possible de n'utiliser que la valeur, voire aucun paramètre si besoin

```js
var selection = d3.selectAll("selecteur");
selection.data(tableau);
selection.html(function(d, i) {
    return "position = " + i + ", valeur = " + d;
})
```

### Exemples

#### Ajout de données + propriété dynamique

Dans cet exemple, on affecte les données du tableau (qui contient des couleurs) à chaque `div` du `body`. Et on affecte un style `CSS` (la couleur), en prenant comme valeur celle contenu dans le tableau.

<p data-height="266" data-theme-id="0" data-slug-hash="eprrjJ" data-default-tab="html,result" data-user="fxjollois" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/fxjollois/pen/eprrjJ/">d3.js : data + style dynamique</a> by FX Jollois (<a href="http://codepen.io/fxjollois">@fxjollois</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

#### fonction `enter()`

Le tableau passé en paramètre de `data()` est ici plus long que la sélection. Pour les valeurs supplémentaires du tableau (sélectionnées avec le `enter()`), on ajoute des `div` (avec `append()`).

<p data-height="266" data-theme-id="0" data-slug-hash="wKjjXN" data-default-tab="html,result" data-user="fxjollois" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/fxjollois/pen/wKjjXN/">d3.js : data + enter()</a> by FX Jollois (<a href="http://codepen.io/fxjollois">@fxjollois</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

#### fonction `exit()`

C'est ici le contraire, le tableau est plus petit que la sélection. Pour les éléments de la sélection en trop (sélectionnés avec le `exit()`), on les supprime (avec `remove()`).

<p data-height="266" data-theme-id="0" data-slug-hash="LpmmmL" data-default-tab="html,result" data-user="fxjollois" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/fxjollois/pen/LpmmmL/">d3.js : data + exit()</a> by FX Jollois (<a href="http://codepen.io/fxjollois">@fxjollois</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Chaînage des fonctions

Il faut absolument comprendre le principe généralement appliqué en `JS` orienté objet : 

> **Toute fonction d'un objet renvoie cet objet** 

Ceci est vrai sauf si la fonction a pour but de renvoyer un résultat spécifique. Et cela ne concerne donc que les procédures (qui sont aussi des fonctions en JS).

Le corollaire de ce principe est intéressant : 

> Il est possible d'enchaîner un grand nombre de fonctions directement 

Dans l'exemple ci-dessous, on utilise ce principe pour créer autant de `div` qu'il y a de couleurs dans le tableau, en indiquant le contenu `HTML` de celles-ci, et en leur appliquant un style `CSS` spécifique. 

<p data-height="266" data-theme-id="0" data-slug-hash="MaGGxK" data-default-tab="js,result" data-user="fxjollois" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/fxjollois/pen/MaGGxK/">d3.js : chaînage des fonctions</a> by FX Jollois (<a href="http://codepen.io/fxjollois">@fxjollois</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Lecture de données

Il existe plusieurs fonctions dans la librairie D3 pour charger des données de tout type (`JSON`, `CSV`, `TSV`, `XML`, ...). Les fonctions pour le faire sont toutes de type `d3.xxx()` (`xxx` étant remplacé par le format approprié - `d3.json()` pour du `JSON` par exemple).

L'exemple ci-dessous charge les données contenues dans le fichier [`mpg.csv`](https://fxjollois.github.io/donnees/mpg.csv) (qui recense un ensemble de voitures, avec plusieurs caractéristiques).

<p data-height="372" data-theme-id="0" data-slug-hash="PNxVoY" data-default-tab="js,result" data-user="fxjollois" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/fxjollois/pen/PNxVoY/">d3.js : lecture de données JSON</a> by FX Jollois (<a href="http://codepen.io/fxjollois">@fxjollois</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Ajout d'interactivité

Il est possible d'ajouter des gestions d'événements sur les objets créés via la fonction `on()`. Celle-ci prend en premier paramètre l'événement (par exemple `mouseover` pour gérer le positionnement de la souris sur l'objet), et en deuxième paramètre la fonction à appliquer lors de la survenue de cet évènement. 

Dans cette fonction, il n'y aucun paramètre possible. Mais nous avons accès à l'objet via `this`. Si de plus, nous avons pris le soin d'ajouter des propriétés à cet objet (via la fonction `property("nom", valeur)`), nous pouvons y accéder à la valeur via `this.nom`.

Dans l'exemple ci-dessous, nous ajoutons à chaque `div` la gestion du passage de la souris sur celle-ci (ainsi que sa sortie). Pour cela, nous ajoutons une propriété `couleur` à chacune, qui prendra la valeur de la couleur dans le tableau. Ensuite, on indique que lorsque la souris passe sur la `div` (`on("mouseover", ...)`), on change la couleur de la police par celle spécifique à la `div`. 

Si nous ne gérons pas la sortie de la souris, la couleur ne sera jamais rechangé. Nous gérons donc ce cas (via `on("mouseout, ...)`) en indiquant que la couleur redevient noire.

<p data-height="265" data-theme-id="0" data-slug-hash="xVMjxG" data-default-tab="js,result" data-user="fxjollois" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/fxjollois/pen/xVMjxG/">d3.js : ajout d'interactivé</a> by FX Jollois (<a href="http://codepen.io/fxjollois">@fxjollois</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Pour récupérer les informations de la souris, il existe l'objet `d3.event` qui contient en particulier les informations suivantes :

- `clientX` et `clientY` : position relative à la partie visible du navigateur
- `screenX` et `screenY` : position relative au moniteur
- `offsetX` et `offsetY` : position relative à l'objet sur lequel la souris est (implémentation variable entres les navigateurs)
- `pageX` et `pageY` : position relative au document `HTML`

Voici un petit exemple de ce qu'on peut récupérer comme informations.

<p data-height="265" data-theme-id="0" data-slug-hash="zqejqx" data-default-tab="html,result" data-user="fxjollois" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/fxjollois/pen/zqejqx/">d3.js : infos sur la souris</a> by FX Jollois (<a href="http://codepen.io/fxjollois">@fxjollois</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Graphique `SVG`

La librairie d3 permet de créer des graphiques au format `SVG` (*Scalable Vector Graphics*), et c'est régulièrement dans ce cadre qu'on l'utilise. 

Ces graphiques sont définis dans un langage de type `XML` (et donc similaire à `HTML`). C'est un langage de définition basé sur des primitives de dessin (rectangle, cercle, ligne, texte, ...), qui permet de produire tout type de graphique. L'un des gros avantages est qu'ils sont *zoomable* sans perte de définition.

Vous pouvez trouver dans les liens qui suivent un certain nombre d'informations sur ces graphiques :

- [Section `SVG` sur W3Schools](http://www.w3schools.com/svg/)
- [Recommandation W3C traduite](http://www.yoyodesign.org/doc/w3c/svg1/)
- [Section SVG sur Mozilla](https://developer.mozilla.org/fr/docs/Web/SVG)

Dans l'exemple ci-dessous, nous créons un graphique de largeur 200 pixels et de hauteur 100 pixels. Une fois créé, on ajoute une transformation (via la balise `g` ajoutée). Celle-ci est une translation de 10 pixels en *x* et de 10 pixels en *y*. C'est le résultat de la translation qui est renvoyé, ce qui veut dire que tout ce qu'on ajoute intégrera donc cette première translation.

On ajoute ensuite un rectangle dont le point haut gauche est situé en *(0,0)*. Notez donc que le point origine est donc situé **en haut à gauche** sur un écran. Ce rectangle est un carré de 50 pixels, rempli en rouge. On ajoute finalement un texte.

<p data-height="325" data-theme-id="0" data-slug-hash="EKGPXZ" data-default-tab="js,result" data-user="fxjollois" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/fxjollois/pen/EKGPXZ/">d3.js : création de SVG</a> by FX Jollois (<a href="http://codepen.io/fxjollois">@fxjollois</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


## Echelles

Dans un graphique, nous devons faire un passage d'échelle entre les données et la zone graphique. Par exemple, si l'on doit afficher des valeurs entre -1000 et 1000 sur l'axe *x*, il nous faut une fonction pour les transformer dans l'intervalle *[0,largeur]* (où *largeur* représente la largeur du graphique `SVG` produit).

Les fonctions dans D3 pour réaliser cela ont toutes comme nom `d3.scaleXxx()`, où `Xxx` est à remplacer par le type de changement d'échelle qu'on souhaite. Il faut notre que ces fonctions renvoient elle-même une fonction de changement d'échelle. Il faut de plus déterminer deux éléments importants :

- Le **domaine** (ou *domain*) : la plage des données d'origine
- L'**étendu** (ou *range*) : la plage de ce qu'on doit obtenir au final

### Quantitatif

#### Vers du numérique

L'exemple proposé ci-dessus est typiquement un problème de changement d'échelle **linéaire**. Il existe pour cela la fonction `d3.scaleLinear()`.

```js
var echelle = d3.scaleLinear()
        .domain([-1000, 1000])
        .range([0, 100]);
console.log(echelle(-1000)) // renvoie 0
console.log(echelle(0))     // renvoie 50
console.log(echelle(1000))  // renvoie 100
```

#### Vers des couleurs

L'intérêt de ces échelles réside aussi dans la possibilité de passer de valeurs numériques à des couleurs par exemple. On doit juste définir dans l'étendu les couleurs de début et de fin (et éventuellement certaines intermédiaires).

```js
var echelle = d3.scaleLinear()
        .domain([-1000, 1000])
        .range(["red", "green"]);
console.log(echelle(-1000)) // renvoie "#ff0000"
console.log(echelle(0))     // renvoie "#804000"
console.log(echelle(1000))  // renvoie "#008000"
```

### Qualitatif 

#### Vers du numérique

Un autre changement d'échelle classique est le passage d'un ensemble de modalités à une plage de valeurs. Pour cela, on utilise la fonction `d3.scaleBand()`. Ici, nous définissons l'étendu par bandes (`"A"` sera sur la bande ainsi *[0, 33.33...]*)

```js
var echelle = d3.scaleBand()
        .domain(["A", "B", "Z"])
        .range([0, 90]);
console.log(echelle("A")) // renvoie 0
console.log(echelle("B")) // renvoie 30
console.log(echelle("Z")) // renvoie 60
console.log(echelle.bandwidth()) // renvoie 30
```

#### Vers des couleurs

Dans ce cas aussi, on peut affecter une couleur à chaque modalité, toujours en définissant des couleurs dans l'étendu. Il existe de plus des fonctions spécifiques pour cela dans d3, comme `d3.scaleOrdinal()`, dans lesquelles il n'y a pas d'étendu à définir.

```js
var echelle = d3.scaleOrdinal(d3["schemeSet1"])
    .domain(["A", "B", "Z"]);
console.log(echelle("A")) // renvoie "#1f77b4"
console.log(echelle("B")) // renvoie "#ff7f0e"
console.log(echelle("Z")) // renvoie "#2ca02c"
```

### Exemple 

Dans l'exemple ci-dessous, nous allons utiliser les fonctions de D3 pour faire tous les changements d'échelle vu ci-dessus. Ceux-ci sont classiques dans la création d'un graphique avec cette librairie.

Nos données concernent la répartition des logements en location par **AirBnB** sur Paris le 2 septembre 2015 (voir [les données ici](http://insideairbnb.com/get-the-data.html)), par type (logement complet, chambre privée, chambre partagée). Nous avons le décompte et le prix moyen comme information.

<p data-height="351" data-theme-id="0" data-slug-hash="grQJgb" data-default-tab="html,result" data-user="fxjollois" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/fxjollois/pen/grQJgb/">d3.js : échelles</a> by FX Jollois (<a href="http://codepen.io/fxjollois">@fxjollois</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Création d'un graphique

Dans l'exemple ci-dessous, nous utilisons l'ensemble des éléments vu ci-dessous pour créer un diagramme en barres, pour les données suivantes :

| Type            | Nombre | Prix moyen |
|:----------------|-------:|-----------:|
| Entire home/apt |  35185 |        106 |
| Private room    |   5827 |         56 |
| Shared room     |    464 |         40 |

Le code est commenté pour expliquer ce que chaque partie permet de réaliser dans le graphique.

<iframe style="width: 100%; height: 600px" src="https://embed.plnkr.co/dAITTEWo4EJmYZnQjGVv" frameborder="0"></iframe>

## A réaliser 

### Demande

Réaliser l'évolution des anomalies de température, par rapport à la période de référence 1961-1990 (donc de l'indice *HadCRUT4* - cf lien ci-dessous). Les données sont disponibles sur une grille mondiale, mais nous allons prendre ici la médiane globale de ces anomalies.

- *Heatmap* sur la période 1850-..., avec les médianes mensuelles
	- une colonne par année
	- une ligne par mois
	- couleur en fonction de la valeur de l'anomalie
- Courbe sur la même période, avec les médianes annuelles
	- Courbe de la période
        - **Attention**, ici, il faut utiliser [`datum()`](https://github.com/d3/d3-selection/blob/v1.4.0/README.md#selection_datum)
	- Ligne de référence à 0 à ajouter
    - Période de référence à ajouter
    - Indication de la position de la souris à ajouter
	- (*bonus*) Intervalles de confiance à ajouter, en laissant le choix à l'utilisateur de l'intervalle à utiliser

### Quelques liens intéressants

- [Données](http://www.metoffice.gov.uk/hadobs/hadcrut4/data/current/download.html) : disponibles sur le site du **Met Office** (institut météorologique anglais)
- [Explications](http://www.metoffice.gov.uk/hadobs/hadcrut4/data/current/series_format.html) : détail des colonnes présentes dans les fichiers