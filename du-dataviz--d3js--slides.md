
class: middle, center, inverse, title

# Visualisation de données - d3.js
## Data-Driven Documents

---

# `d3.js` : Data-Driven Documents

[d3.js](http://www.d3js.org) :

- Librairie `javascript` très complète 
- Beaucoup d'exemples à disposition
- Personnalisation totale possible
- Accès à des primitives `SVG` permettant toute innovation
- Peu accessible directement et assez technique.

Exemples présentés disponibles [sur cette page](http://codepen.io/collection/DojQMG/).

---

# Fonctionnement typique

*Idée principale* : 

- Lier les **données** au **DOM** (*Document Object Model*)
- Appliquer des transformations, basées sur les données, au document

--

Plusieurs concepts spécifiques :

- Sélection, modification, ajout d'éléments
- Ajout de données au DOM
- Propriété dynamique, et Transformation
- Chaînage des fonctions

---
class: inverse

# Base de la librairie

Dans cette partie, nous allons voir les premiers éléments :

> **Sélection** : comment pointer sur les éléments de la page ?

> **Modification** : comment modifier ces éléments ?

> **Ajout** : comment ajouter des éléments ?

---

## Sélection

- Un seul élément : `select()`
    - Premier s'il y en a plusieurs
- Plusieurs éléments similaires : `selectAll()`

--

Sélection identique à celle du CSS :

| Sélecteur | Quoi ? | Comment dans le html ? |
|-|-|
| `"balise"` | Objet(s) de type balise html | `<div>`, `<h1>`, `<body>`, ... |
| `".maclasse"` | Objet(s) de la classe indiquée | `<balise class='maclasse'>` |
| `"#identifiant"` | Objet avec cet identifiant | `<balise id='identifiant'>` |
| | unique normalement |

---

## Modification

Plusieurs fonctions pour :

- Avoir des informations sur la sélection
    - `size()` : taille de la sélection
    - `empty()` : sélection vide ou non
- Modifier les éléments sélectionnés
    - `style()` : appliquer des règles `CSS` 
    - `html()` : modifier le contenu de la balise

--

Ex : mettre le texte en rouge pour tout le corps de la page

```js
var corps = d3.select("body");
corps.style("color", "red");
```

---

## Ajout

Deux fonctions :

- Ajouter un élément `HTML` à la fin : `append()`
- Insérer au début `insert()`

**Attention** : Stocker le résultat si on veut pouvoir modifier les éléments ajoutés.

Ex : 

```js
selection = d3.select("selecteur");
nouveau1 = selection.append("balise");
selection.insert("balise");
```

---

## Exemple 

1. Selection de la balise `body` (vide au départ)
1. Dans cette sélection, ajoute de deux `div`, puis définition de leur contenu :
    1. taille de la sélection (`1` normalement)
    1. test si elle est vide ou non (normalement `false`)
1. Modification de la couleur du t
    1. sélection (donc `body`) en rouge (donc tout)
    1. deuxième `div` en bleu

<iframe height="265" style="width: 100%;" scrolling="no" title="d3.js : base de la librairie" src="https://codepen.io/fxjollois/embed/bVMMjZ?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fxjollois/pen/bVMMjZ'>d3.js : base de la librairie</a> by FX Jollois
  (<a href='https://codepen.io/fxjollois'>@fxjollois</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---
class: inverse

# Lier les données au document

**Coeur** de la librairie `d3.js`

> Faire **correspondre** une balise à un objet (valeur simple ou composée de plusieurs valeurs)

> **Modifier** les balises en fonction des données associées

---

## Ajout de données au DOM

- Fonction `data()` sur une sélection :
- Lier les données au DOM :
    - Données passées en paramètres
    - Doit être un **tableau**
    
Ex : affecte chaque élément du tableau à chaque élément renvoyé par le sélecteur précédent

```js
var selection = d3.selectAll("selecteur");
selection.data(tableau);
```
--

Si différence entre la taille de la sélection et la taille du tableau passé en paramètre :

- `enter()` : pour gérer les éléments du tableau en plus
- `exit()` : pour gérer les éléments de la sélection en plus

---

### Propriété dynamique

Sur chaque sélection, modifications de style ou de contenu (voire autre), en fonction des données sont liées au DOM

Utilisation d'une fonction anonyme, dont les paramètres peuvent être, dans cet ordre :

- Valeur de l'élément du tableau affectée à l'élément
- Position de la valeur dans le tableau

Il est possible de n'utiliser que la valeur, voire aucun paramètre si besoin

--

```js
var selection = d3.selectAll("selecteur");
selection.data(tableau);
selection.html(function(d, i) {
    return "position = " + i + ", valeur = " + d;
})
```

---

## Exemples

> Simple : autant d'objets sélectionnés que d'éléments du tableau

> Plus d'éléments dans le tableau que dans la sélection

> Plus d'objets sélectionnés que dans le tableau

---

### Ajout de données + propriété dynamique

Données du tableau (des noms de couleurs ici) associées à chaque `div` du `body`

- Couleur `CSS` prenant comme valeur celle contenue dans le tableau

<iframe height="265" style="width: 100%;" scrolling="no" title="d3.js : base de la librairie" src="https://codepen.io/fxjollois/embed/eprrjJ?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fxjollois/pen/eprrjJ'>d3.js : base de la librairie</a> by FX Jollois
  (<a href='https://codepen.io/fxjollois'>@fxjollois</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

### Fonction `enter()`

Tableau passé en paramètre de `data()` plus long que la sélection

- Sélection des valeurs supplémentaires avec `enter()`
- Ajout de `div` (avec `append()`) pour celles-ci
- Modification de la couleur à faire (idem précédemment)

<iframe height="265" style="width: 100%;" scrolling="no" title="d3.js : base de la librairie" src="https://codepen.io/fxjollois/embed/wKjjXN?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fxjollois/pen/wKjjXN'>d3.js : base de la librairie</a> by FX Jollois
  (<a href='https://codepen.io/fxjollois'>@fxjollois</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

### Fonction `exit()`

Tableau est plus petit que la sélection

- Sélection des éléments en trop `exit()`
- Suppression avec `remove()`

<iframe height="265" style="width: 100%;" scrolling="no" title="d3.js : base de la librairie" src="https://codepen.io/fxjollois/embed/LpmmmL?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fxjollois/pen/LpmmmL'>d3.js : base de la librairie</a> by FX Jollois
  (<a href='https://codepen.io/fxjollois'>@fxjollois</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---
## Chaînage des fonctions

Il faut absolument comprendre le principe généralement appliqué en `JS` orienté objet : 

> **Toute fonction d'un objet renvoie cet objet** 

Ceci est vrai sauf si la fonction a pour but de renvoyer un résultat spécifique. Et cela ne concerne donc que les procédures (qui sont aussi des fonctions en JS).

Le corollaire de ce principe est intéressant : 

> Il est possible d'enchaîner un grand nombre de fonctions directement 

---
## Exemple

Idem exemple avec `enter()` (tableau plus grand que la sélection), avec le chaînage

<iframe height="265" style="width: 100%;" scrolling="no" title="d3.js : base de la librairie" src="https://codepen.io/fxjollois/embed/MaGGxK?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fxjollois/pen/MaGGxK'>d3.js : base de la librairie</a> by FX Jollois
  (<a href='https://codepen.io/fxjollois'>@fxjollois</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---
class: inverse

# Eléments complémentaires

> Lecture de données

> Interactivité

> Graphique SVG

> Echelles

---
## Lecture de données

Plusieurs fonctions pour différents types (`JSON`, `CSV`, `TSV`, `XML`, ...)

- Noms des fonctions de type `d3.xxx()` 
    - `xxx` étant remplacé par le format approprié 
    - `d3.json()` pour du `JSON` par exemple
    
Ex : chargement du fichier [`mpg.csv`](https://fxjollois.github.io/donnees/mpg.csv) (voitures avec plusieurs caractéristiques)

<iframe height="265" style="width: 100%;" scrolling="no" title="d3.js : base de la librairie" src="https://codepen.io/fxjollois/embed/PNxVoY?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fxjollois/pen/PNxVoY'>d3.js : base de la librairie</a> by FX Jollois
  (<a href='https://codepen.io/fxjollois'>@fxjollois</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---
## Ajout d'interactivité

Gestions d'événements sur objets créés via fonction `on()` :

- Premier paramètre : événement 
    - `mouseover` : souris sur l'objet
    - `mouseout` : souris qui "sort" de l'objet
    - `mousemove` : souris déplacée quand elle au-dessus de l'objet
    - ...
- Deuxième paramètre : fonction à appliquer lors de la survenue de cet évènement
    - Aucun paramètre possible
    - Accès à l'objet avec l'opérateur `this`
    - Si l'objet a des propriétés : accès avec `this.propriete`
        - Propriété pouvant être définie avec `property("nom", valeur)`

---
## Exemple 

Sestion du passage de la souris sur chaque `div` (entrée et sortie)

- Ajout de la propriété `couleur`
- Souris dessus : changement de la couleur de la police
- Souris dehors : changement pour retour 
    - Si pas gérer : couleur jamais modifiée
    
<iframe height="265" style="width: 100%;" scrolling="no" title="d3.js : base de la librairie" src="https://codepen.io/fxjollois/embed/xVMjxG?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fxjollois/pen/xVMjxG'>d3.js : base de la librairie</a> by FX Jollois
  (<a href='https://codepen.io/fxjollois'>@fxjollois</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---
## Position de la souris

Objet `d3.event` : informations de la souris (position principalement),

- `clientX` et `clientY` : position relative à la partie visible du navigateur
- `screenX` et `screenY` : position relative au moniteur
- `pageX` et `pageY` : position relative au document `HTML`
- `offsetX` et `offsetY` : position relative à l'objet sur lequel la souris est 
    - implémentation variable entres les navigateurs

<iframe height="265" style="width: 100%;" scrolling="no" title="d3.js : base de la librairie" src="https://codepen.io/fxjollois/embed/zqejqx?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fxjollois/pen/zqejqx'>d3.js : base de la librairie</a> by FX Jollois
  (<a href='https://codepen.io/fxjollois'>@fxjollois</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---
## Graphique `SVG`

Création de graphiques au format `SVG` (*Scalable Vector Graphics*)

- Intérêt principal de la librairie 

- Graphiques définis dans un langage de type `XML`
    - similaire à `HTML`
- Basé sur des primitives de dessin (rectangle, cercle, ligne, texte, ...)
- *Zoomable* sans perte de définition

Vous pouvez trouver dans les liens qui suivent un certain nombre d'informations sur ces graphiques :

- [Section `SVG` sur W3Schools](http://www.w3schools.com/svg/)
- [Recommandation W3C traduite](http://www.yoyodesign.org/doc/w3c/svg1/)
- [Section SVG sur Mozilla](https://developer.mozilla.org/fr/docs/Web/SVG)

---
## Exemple

- Graphique de largeur 200 pixels et de hauteur 100 pixels
- Ajout d'une transformation (via la balise `g` ajoutée)
    - Translation de 10 pixels en *x* et de 10 pixels en *y*
    - Résultat de la translation qui est renvoyé
        - tout ce qu'on ajoute intégrera donc cette première translation.
- Ajoute ensuite d'un rectangle 
    - Point haut gauche est situé en *(0,0)*
        - A noter : point origine situé **en haut à gauche** sur un écran
    - Carré de 50 pixels de côté, rempli en rouge
- Ajout finalement d'un texte.

---
## Exemple

<iframe height="500" style="width: 100%;" scrolling="no" title="d3.js : base de la librairie" src="https://codepen.io/fxjollois/embed/EKGPXZ?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fxjollois/pen/EKGPXZ'>d3.js : base de la librairie</a> by FX Jollois
  (<a href='https://codepen.io/fxjollois'>@fxjollois</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---
## Echelles

Correspondance entre les valeurs représentées et la zone graphique

Exemple :

- Variable *X* entre -1000 et 1000
- Graphique d'une largeur de 200 pixels
- Echelle : [-1000, 1000] `->` [0, 200]

Fonctions de type `d3.scaleXXX()`

- `XXX` : type de changement d'échelle 
- Renvoient une fonction de changement d'échelle
- Eléments importants :
    - Le **domaine** (ou *domain*) : plage des données d'origine ([-1000, 1000])
    - L'**étendu** (ou *range*) : plage de ce qu'on doit obtenir au final ([0, 200])

---
### Quantitatif

- Passage vers du numérique : 
    - Changement d'échelle linéaire basique (cf exemple précédent)
- Passage vers des couleurs : 
    - Création d'un dégradé de couleurs (cf carte météo par exemple)
    - Définition des couleurs de début et de fin 
    - Couleurs intermédiaires possible
    
### Qualitatif

- Passage vers du numérique : 
    - Permet de créer d'associer une "bande" à une modalité
- Passage vers des couleurs : 
    - Association d'une couleur à chaque modalité
    - Ils existent des ensembles de couleurs prédéfinies (cf [Color Brewer](https://colorbrewer2.org/))

---
### Quantitatif

**Vers du numérique** : 

```js
var echelle = d3.scaleLinear()
        .domain([-1000, 1000])
        .range([0, 100]);
console.log(echelle(-1000)) // renvoie 0
console.log(echelle(0))     // renvoie 50
console.log(echelle(1000))  // renvoie 100
```

**Vers des couleurs** : Dégradé de couleurs défini automatique

```js
var echelle = d3.scaleLinear()
        .domain([-1000, 1000])
        .range(["red", "green"]);
console.log(echelle(-1000)) // renvoie "#ff0000"
console.log(echelle(0))     // renvoie "#804000"
console.log(echelle(1000))  // renvoie "#008000"
```

---
### Qualitatif 

**Vers du numérique**

```js
var echelle = d3.scaleBand()
        .domain(["A", "B", "Z"])
        .range([0, 90]);
console.log(echelle("A")) // renvoie 0
console.log(echelle("B")) // renvoie 30
console.log(echelle("Z")) // renvoie 60
console.log(echelle.bandwidth()) // renvoie 30
```

**Vers des couleurs** (ici on utilise [Set1](https://colorbrewer2.org/#type=qualitative&scheme=Set1&n=9))

```js
var echelle = d3.scaleOrdinal(d3["schemeSet1"])
    .domain(["A", "B", "Z"]);
console.log(echelle("A")) // renvoie "#1f77b4"
console.log(echelle("B")) // renvoie "#ff7f0e"
console.log(echelle("Z")) // renvoie "#2ca02c"
```

---

### Exemple 

Répartition des logements en location par **AirBnB** sur Paris le 2 septembre 2015 (voir [les données ici](http://insideairbnb.com/get-the-data.html))

- Type (logement complet, chambre privée, chambre partagée)
- Décompte et prix moyen 

<iframe height="350" style="width: 100%;" scrolling="no" title="d3.js : base de la librairie" src="https://codepen.io/fxjollois/embed/grQJgb?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fxjollois/pen/grQJgb'>d3.js : base de la librairie</a> by FX Jollois
  (<a href='https://codepen.io/fxjollois'>@fxjollois</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---
class: inverse

## Création d'un graphique

Dans l'exemple ci-après, création d'un diagramme en barres représentant le prix moyen de chaque type de logement

| Type            | Nombre | Prix moyen |
|:----------------|-------:|-----------:|
| Entire home/apt |  35185 |        106 |
| Private room    |   5827 |         56 |
| Shared room     |    464 |         40 |

---
<iframe style="width: 100%; height: 600px" src="https://embed.plnkr.co/dAITTEWo4EJmYZnQjGVv" frameborder="0"></iframe>
