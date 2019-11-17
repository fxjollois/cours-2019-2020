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

## Travail à faire

Dans une démarche d'intégration de données (**ETL**), le process classique est le suivant :

1. **Extract** : extraire les données du (ou des) SI opérationnel
1. **Transform** : transformation nécessaire (nettoyage, agrégats, ...)
1. **Load** : chargement dans le SI décisionnel

Ici, notre SI opérationnel est la base `Comptoir2000`, et au format `SQLite` donc. Pour le SI décisionnel, nous allons aussi utiliser un fichier au format `SQLite`, que l'on nommera `datamart.sqlite` par exemple. La partie *Extract* sera l'importation des tables du SI utilisées dans des data-frames R. Ensuite, pour la partie *Transform*, nous devons créer les data-frames tels qu'ils devront être dans le SID. Enfin, la partie *Load* se fera à base d'ajout de valeur dans les tables du SID, par exemple avec la commande `dbExecute()` et des `INSERT INTO` (avec des boucles). Mais il existe aussi la fonction `dbAppendTable()` qui peut être utile dans ce cas.

Vous devez donc faire les étapes suivantes :

1. Créer les tables dans le SID
1. Impporter les tables dans R
1. Calculer les nouvelles tables
1. Charger les données dans le SID




