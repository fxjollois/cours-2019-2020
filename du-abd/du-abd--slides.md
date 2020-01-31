
class: middle, center, inverse, title

# Introduction à MongoDB
## FX Jollois

---

# NoSQL

**MongoDB** est une base de données NoSQL distribué de type *Document Store* ([site web](http://www.mongodb.com/)) 

Objectifs :

- Gérer de gros volumes
- Facilité de déploiement et d'utilisation
- Possibilité de faire des choses complexes tout de même

---

# Modèle des données

Principe de base : les données sont des `documents`

- Stocké en *Binary JSON* (`BSON`)
- Documents similaires rassemblés dans des `collections`
    - plusieurs collections possibles dans une base de données
- Pas de schéma des documents définis en amont
	- contrairement à un BD relationnel ou NoSQL de type *Column Store*
- Les documents peuvent n'avoir aucun point commun entre eux
- Un document contient (généralement) l'ensemble des informations
	- pas (ou très peu) de jointure à faire idéalement
- BD respectant **CP** (dans le théorème *CAP*)
	- propriétés ACID au niveau d'un document

---

# Point sur `JSON`

- `JavaScript Object Notation`, créé en 2005
- Format léger d'échange de données structurées (**littéral**)
- Schéma des données non connu (contenu dans les données)
- Basé sur deux notions :
	- collection de couples clé/valeur
	- liste de valeurs ordonnées
- Structures possibles :
	- objet (couples clé/valeur) : `{ "nom": "jollois", "prenom": "fx" }`
	- tableau (collection de valeurs) : `[ 1, 5, 10]`
	- une valeur dans un objet ou dans un tableau peut être elle-même un littéral
- Deux types atomiques (`string` et `number`) et trois constantes (`true`, `false`, `null`)

Validation possible du JSON sur [jsonlint.com/](http://jsonlint.com/)

---

### Exemple

```json
{
    "address": {
        "building": "469",
        "coord": [
            -73.9617,
            40.6629
        ],
        "street": "Flatbush Avenue",
        "zipcode": "11225"
    },
    "borough": "Brooklyn",
    "cuisine": "Hamburgers",
    "grades": [
        {
            "date": "2014-12-30 01:00:00",
            "grade": "A",
            "score": 8
        },
        {
            "date": "2014-07-01 02:00:00",
            "grade": "B",
            "score": 23
        }
    ],
    "name": "Wendy'S",
    "restaurant_id": "30112340"
}
```
---

# Compléments

`BSON` : extension de `JSON`

- Quelques types supplémentaires (identifiant spécifique, binaire, date, ...)
- Distinction entier et réel

**Schéma dynamique**

- Documents variant très fortement entre eux, même dans une même collection
- On parle de **self-describing documents**
- Ajout très facile d'un nouvel élément pour un document, même si cet élément est inexistant pour les autres
- Pas de `ALTER TABLE` ou de redesign de la base

---

# Langage d'interrogation

- Pas de SQL (bien évidemment), ni de langage proche
- Définition d'un langage propre
    - `find()` : pour tout ce qui est restriction et projection
    - `aggregate()` : pour tout ce qui est calcul de variable, d'aggrégats et de manipulations diverses
    - ...
- Langage JavaScript dans la console, permettant plus que les accès aux données
	- définition de variables
	- boucles
	- ...

---

# Utilisation avec `R`

- Package [`mongolite`](https://jeroen.github.io/mongolite/) dans `R`. Dans la suite, nous allons nous connecter sur un serveur distant, et travailler pour l'exemple sur une base des restaurants New-Yorkais.

```{r}
library(mongolite)
m = mongo(db = "test",
          collection = "restaurants")
```