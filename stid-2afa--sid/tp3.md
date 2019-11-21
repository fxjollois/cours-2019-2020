# Intégration de données

Nous allons reprendre une partie du travail fait dans le TP2, cette fois-ci sous R. Vous devez d'abord télécharger la base [`Comptoir2000`](https://fxjollois.github.io/donnees/Comptoir2000/Comptoir2000.sqlite) au format `SQLite`.

## Connexion à un SI dans R

### Etablir la connexion

Il est possible de se connecter à un SI sous R, en grande partie grâce au package `DBI`, et à d'autres packages spécifiques pour chaque moteur (`SQLite`, `Oracle`, `SQL Server`, ...). Par exemple, pour se connecter à la base `Comptoir2000` au format `SQLite`, il est possible de procéder ainsi :

```r
library(DBI)
cpt = dbConnect(RSQLite::SQLite(), "Comptoir2000.sqlite")
dbListTables(con)
dbDisconnect(cpt)
```

Pour information, lorsqu'on se connecte à un fichier inexistant, celui-ci est créée automatiquement. De plus, cette connexion est en mode écriture, ce qui fait que toute modification de la base est sauvegardée.

L'avant-dernière fonction de l'exemple ci-dessus, comme son nom l'indique, permet de lister les tables d'une base de données. Il existe aussi des fonctions de lecture de tables (`dbReadTable()`), d'écriture de tables à partir d'un data-frame (`dbWriteTable()`), de création de table (`dbCreateTable()` et `sqlCreateTable()`), de suppression de table (`dbRemoveTable()`), et bien d'autres encore.

### Requêtage DQL (`SELECT`)

On doit exécuter les requêtes  `SELECT` avec 2 fonctions : `dbGetQuery()` pour une exécution directe (renvoie un data-frame) et `dbSendQuery()` pour une exécution sur le moteur mais sans retour de résultat immédiat (il faut ensuite utiliser `dbFetch()` pour les obtenir et `dbClearResult()` pour finaliser le traitement par le moteur). L'intérêt de la deuxième est dans le cas de requêtes retournant des tables très grandes. Nous allons privilégier la première ici.

```r
dbGetQuery(cpt, "SELECT * FROM Client;")
```

### Requêtage DDL et DML

Pour tout ce qui est manipulation de données (création, suppression, insertion, mise à jour, ...), il faut utiliser les fonctions `dbExecute()` et `dbSendStatement()`. La différence entre les 2 est la même que précédemment. `dbExecute()` permet de réaliser les requêtes directement et renvoie le nombre de lignes affectées par la commande. Alors que pour `dbSendStatement()`, la requête est exécuté sur le serveur, mais sans blocage dans R (vous pouvez faire d'autres commandes ensuite). Pour savoir si la commande envoyée est finie, il faut tester avec la fonction `dbHasCompleted()`. On peut connaître le nombre de lignes affectées avec `dbGetRowsAffected()`. Enfin, comme pour `dbSendQuery()`, on finit l'opération avec `dbClearResult()`. 

```r
dbExecute(cpt, "INSERT INTO Messager (NoMess, NomMess) VALUES (5, 'La Poste')")
dbReadTable(cpt, "Messager")
```

### Travail à faire

Dans une démarche d'intégration de données (**ETL**), le process classique est le suivant :

1. **Extract** : extraire les données du (ou des) SI opérationnel
1. **Transform** : transformation nécessaire (nettoyage, agrégats, ...)
1. **Load** : chargement dans le SI décisionnel

Ici, notre SI opérationnel est la base `Comptoir2000`, et au format `SQLite` donc. Pour le SI décisionnel, nous allons aussi utiliser un fichier au format `SQLite`, que l'on nommera `datamart.sqlite` par exemple. La partie *Extract* sera l'importation des tables du SI utilisées dans des data-frames R. Ensuite, pour la partie *Transform*, nous devons créer les data-frames tels qu'ils devront être dans le SID. Enfin, la partie *Load* se fera à base d'ajout de valeur dans les tables du SID, par exemple avec la commande `dbExecute()` et des `INSERT INTO` (avec des boucles). Mais il existe aussi la fonction `dbAppendTable()` qui peut être utile dans ce cas.

Pour créer le data-mart, contenant les 2 processus vus en cours, vous devez donc faire les étapes suivantes :

1. Créer les tables dans le SID
1. Impporter les tables dans R
1. Calculer les nouvelles tables
1. Charger les données dans le SID


## Création d'un cube et Manipulation sous R

A l'heure actuelle, il existe un package permettant la création et la manipulation de cube au sens OLAP dans R, c'est [`hypercube`](https://cran.r-project.org/package=hypercube). Il existe aussi le package [`data.cube`](https://gitlab.com/jangorecki/data.cube), mais qui ne semble plus maintenu. Et nous verrons d'autres outils intéressant sur [`shiny`](https://shiny.rstudio.com/) dans la suite du cours, en particulier [`rpivotTable`](https://github.com/jangorecki/rpivotTable).

R peut stocker des données dans des tableaux à $n$ dimensions, grâce au type `array` ce qui s'apparente à des hypercubes donc. La librairie `hypercube` surcharge ce type permettant quelques opérations OLAP classiques.

### Création d'un cube

Nous allons utiliser les données `CA`, du premier TP, mais au format R cette fois-ci. Elles sont disponibles sur [ce lien](https://fxjollois.github.io/donnees/ca/ca.RData) (fichier `.RData`). Une fois chargée dans l'espace de travail de R, vous devriez trouver la table `ca_tout`, résultat de la jointure entre toutes les tables du data-mart.

Il est donc possible de créer un cube dans la commande `generateCube()` :

- on se base donc sur un data-frame
- les colonnes sont la listes des dimensions, avec la possibilité de créer une hiérarchie (ici, `groupe`  et `mois`)
- les valeurs du cube sont prises à partir d'une variable

```r
library(hypercube)
cub = generateCube(
  ca_tout, 
  columns = list(
    groupe = c("departement", "groupe", "sous_groupe"),
    mois = c("annee", "mois_numero"),
    provenance = "provenance"
  ),
  valueColumn = "ca"
)
```

### Manipulation du cube

L'affichage du cube obtenu n'est pas très intéressant directement.

#### Sélection 

Pour ne sélectionner qu'une partie du cube, on utilise la fonction `agg.selection()` comme ci-dessous :

```r
add.selection(
  cub, 
  criteria = list(
    annee = 2004,
    departement = "Meubles",
    groupe = "Meubles intérieurs",
    sous_groupe = as.character(
      subset(groupe, departement == "Meubles" & groupe == "Meubles intérieurs")$sous_groupe
    )
  )
)
```

Ici, nous avons tous les CA pour 2004, pour le département "Meubles", et plus particulièrement le groupe "Meubles intérieurs", pour tous les sous-groupes et toutes les provenances. On voit ici que la notion de hiérarchie n'est pas correctement gérée, puisque nous devons spécifié les sous-groupes à garder (alors que cela devrait être automatique finalement).

Il faut noter qu'on peut ajouter des éléments dans notre sélection, sans avoir besoin de reprendre le cube initial. Toutes les données sont conservées dans le cube résultat. De plus, on peut supprimer une sélection avec la fonction `remove.selection()`.

#### Aggrégation

Il est aussi possible de résumer le cube selon un ou plusieurs dimensions, en utilisant une fonction d'aggrégat (généralement `sum()`, mais cela peut aussi être `min()`, `max()`, `mean()`, ...). Pour cela, nous utilisons la fonction `add.aggregation()` :


```r
add.aggregation(
  cub,
  dimensions = c("departement", "mois_numero"),
  fun = "sum"
)
```

Dans l'exemple ci-dessus, nous avons les CA par département et par mois (les deux années cumulées).

Comme pour la sélection, il est possible d'ajouter un agrégat sur le résultat, ou de "revenir en arrière" et donc retrouver les données initiales ou désagrégées, avec la fonction `remove.aggregation()`.

### Travail à faire

1. Créer un cube pour chaque processus, avec les dimensions suivantes (et comme valeur le montant de la vente)
    - Fait Vente d'un produit : 
        - Date : Mois, Année
        - Client : Ville, Pays
        - Produit : Fournisseur, Catégorie
        - Employé : Ville, Pays
    - Fait Commande d'un client :
        - Date de commande : Mois, Année
        - Client : Ville, Pays
        - Employe : Ville, Pays
1. Essayez de réaliser quelques sélections et aggrégations sur ces 2 cubes




