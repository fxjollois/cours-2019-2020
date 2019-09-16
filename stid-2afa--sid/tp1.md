# Rappels de SQL

Nous utiliserons SAS pour réaliser les requêtes SQL sur le data-mart [ca.mdb](https://fxjollois.github.io/donnees/ca/ca.mdb) (à télécharger donc). Celui-ci représente le chiffre d'affaires (CA) d'une entreprise en fonction de 3 dimenions (provenance, mois et département - ces deux dernières comprenant une hiérarchie).

Pour lancer une requête sur cette base dans SAS, vous devez d'abord charger la BD comme étant une nouvelle librairie.

```sas
libname ca  access '/chemin/vers/fichier/ca.mdb';
```

Puis, pour exécuter une requête, vous devez utiliser donc la procédure `SQL`, comme dans l'exemple ci-dessous. Attention, cette procédure est dite interactive, il faut donc la quitter (avec `QUIT;`) pour la terminer.

```sas
PROC SQL outobs = 10;
	SELECT *
		FROM ca.CA;
QUIT;
```

## Répondez aux demandes suivantes en utilisant exclusivement la PROC SQL

1. Créer une vue comprenant l'ensemble des informations contenus dans les 4 tables, que vous nommerez `CA_ALL`
1. Lister les groupes du département `"Ménage"`
1. Combien de département ont un sous-groupe nommé "Divers" ? idem mais avec le mot "divers" dedans ?
1. Lister les provenances contenant la chaîne de caractères "Studio"
1. Calculer le chiffre d'affaires total pour chaque mois des deux années
    - le résulat doit intégrer les noms des mois (attention à l'ordre naturel de ceux-ci)
1. Puis, convertir ces résultats en base 100 en janvier 2003
1. Calculer, pour chaque mois, le taux d'augmentation du chiffre d'affaires total par rapport au mois précédent
1. Calculer pour chaque provenance son chiffre d'affaires total, en les classant dans l'ordre décroissant par rapport au CA total
1. Donner le TOP 5 des sous-groupes (en indiquant aussi leur groupe et leur département)
1. Pour tous les départements ayant plus de 2 groupes, donner le nombre de sous-groupes pour chacun de leur groupe
    - le tri doit se faire sur les départements puis par ordre décroissant du nombre de sous-groupes
1. On souhaite tester le lien entre la provenance et le département. Que doit-on préparer comme tableau ?
    - l'utilisation d'une autre procédure SAS est possible ici


