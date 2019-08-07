---
title: Sujet de rattrapage
subtitle: Analyse de Données Massives
---

## Partie 1 : MongoDB (8 points)

Nous allons utiliser la base de données `world`.

**Rappel de connexion** : (mot de passe identique au login : `master100`)

```
$ ssh master100@193.51.82.104 -p2342
```

**Rappel de lancement de `mongo`** : 
```
$ mongo
```

1. Lister les collections de la base de données (1 point)
1. Donner le nombre de documents de la collection `country` (1 point)
1. Afficher le premier document de cette collection (1 point)
1. Afficher les pays du continent `"Asia"` (uniquement les noms des pays - 2 points)
1. Calculer, pour chaque continent, le nombre de pays et la superficie totale de ceux-ci (3 points)

## Partie 2 : Python (12 points)

1. Se connecter à la base de données `world` sur le serveur *MongoDB* dans `python` (1 point)
1. Refaire les mêmes opérations que précédemment (8 points)
1. Transformer le dernier résultat en un `DataFrame` (1 point)
1. Représenter graphiquement la répartition du nombre de pays par continent avec un diagramme en barres (2 points)
