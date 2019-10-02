# Rappels de SQL

## Répondez aux demandes suivantes en utilisant exclusivement la PROC SQL

### 1. Ecrire le programme permettant d'importer les 4 tables dans une librairie (nommé idéalement `"CA"`) dédié au data-mart (qui se situera sur votre espace personnel)

```sql
libname ca "/home/francoisxavierjolloi/my_content/CA";

%MACRO Importation (file = ) ;
	proc import datafile="/home/francoisxavierjolloi/my_content/CA/&file..csv"
			out=ca.&file
			dbms=csv
			replace;
		delimiter = ";" ;
		getnames=yes;
	run;
%MEND;

%Importation(file = ca);
%Importation(file = groupe);
%Importation(file = mois);
%Importation(file = provenance);
```

### 2. Créer une vue comprenant l'ensemble des informations contenus dans les 4 tables, que vous nommerez `CA_ALL`

```sql
PROC SQL;
	CREATE VIEW CA.CA_ALL AS
		SELECT Mois.Mois, Mois.Mois_numero, Mois.Annee, 
				Provenance.Provenance,
				Groupe.Departement, Groupe.Groupe, Groupe.Sous_groupe,
				CA.CA
			FROM CA.CA, CA.Mois, CA.Provenance, CA.Groupe
			WHERE 	CA.mois_no = Mois.no
			AND 	CA.prov_no = Provenance.no
			AND		CA.groupe_no = Groupe.no;
QUIT;
```

### 3. Lister les groupes du département `"Ménage"`

```sql
PROC SQL;
	SELECT DISTINCT Groupe
		FROM CA.Groupe
		WHERE Departement = "Ménage";
QUIT;
```

### 4. Combien de département ont un sous-groupe nommé "Divers" ? idem mais avec le mot "divers" dedans ?

```sql
PROC SQL;
	SELECT COUNT(DISTINCT Departement)
		FROM CA.Groupe
		WHERE Sous_groupe = "Divers";
	SELECT COUNT(DISTINCT Departement)
		FROM CA.Groupe
		WHERE LOWER(Sous_groupe) LIKE "%divers%";
QUIT;
```

### 5. Lister les provenances contenant la chaîne de caractères "Studio"

```sql
PROC SQL;
	SELECT Provenance
		FROM CA.Provenance
		WHERE LOWER(Provenance) LIKE "%studio%";
QUIT;
```

### 6. Calculer le chiffre d'affaires total pour chaque mois des deux années

le résulat doit intégrer les noms des mois (attention à l'ordre naturel de ceux-ci)

```sql
PROC SQL;
	CREATE VIEW CA.CA_mois AS
		SELECT Annee, Mois_numero, Mois, SUM(CA) AS CA
			FROM CA.CA_ALL
			GROUP BY Annee, Mois_numero, Mois
			ORDER BY Annee, Mois_numero;
	SELECT Annee, Mois, CA
		FROM CA.CA_mois;
QUIT;
```

### 7. Puis, convertir ces résultats en base 100 en janvier 2003

```sql
PROC SQL;
	SELECT Annee, Mois, ROUND(CA / CAjan2003 * 10000) / 100 AS base100 "CA Base 100"
		FROM CA.CA_mois, (SELECT CA AS CAjan2003
							FROM CA.CA_mois
							WHERE Annee = 2003 AND Mois_numero = 1);
QUIT;
```

### 8. Calculer, pour chaque mois, le taux d'augmentation du chiffre d'affaires total par rapport au mois précédent

```sql
PROC SQL;
	SELECT Suiv.Annee, Suiv.Mois, ROUND((1 - Suiv.CA / Prec.CA) * 10000) / 100 AS Taux "Evolution (%)"
		FROM CA.CA_Mois Suiv LEFT JOIN CA.CA_Mois Prec
			ON (Suiv.Annee = Prec.Annee AND Suiv.Mois_numero = Prec.Mois_numero + 1)
			OR (Suiv.Annee = Prec.Annee + 1 AND Suiv.Mois_numero = Prec.Mois_numero - 11)
		ORDER BY Suiv.Annee, Suiv.Mois_numero;
QUIT;
```

En SAS classique, on fera comme cela :

```sas
DATA Evol;
	SET CA.CA_Mois;
	RETAIN CAPRec;
	Taux = ROUND((1 - CA / CAPrec) * 10000) / 100;
	CAPrec = CA;
	KEEP Annee Mois Taux;
PROC PRINT;
RUN;
```

### 9. Calculer pour chaque provenance son chiffre d'affaires total, en les classant dans l'ordre décroissant par rapport au CA total

```sql
PROC SQL;
	SELECT Provenance, SUM(CA) AS CA
		FROM CA.CA_ALL
		GROUP BY Provenance
		ORDER BY CA DESC;
QUIT;
```

### 10. Donner le TOP 5 des sous-groupes (en indiquant aussi leur groupe et leur département)

```sql
PROC SQL outobs = 5;
	SELECT Departement, Groupe, Sous_groupe, SUM(CA) AS CA
		FROM CA.CA_ALL
		GROUP BY Departement, Groupe, Sous_groupe
		ORDER BY CA DESC;
QUIT;
```

### 11. Pour tous les départements ayant plus de 2 groupes, donner le nombre de sous-groupes pour chacun de leur groupe

le tri doit se faire sur les départements puis par ordre décroissant du nombre de sous-groupes

```sql
PROC SQL;
	SELECT Departement, Groupe, COUNT(*) AS Nb "Nb sous_groupes"
		FROM CA.Groupe
		WHERE Departement IN (SELECT Departement
								FROM CA.Groupe
								GROUP BY Departement
								HAVING COUNT(DISTINCT Groupe) >= 2)
		GROUP BY Departement, Groupe		
		ORDER BY Departement, Nb DESC;
QUIT;
```

### 12. On souhaite tester le lien entre la provenance et le département. Que doit-on préparer comme tableau ?

l'utilisation d'une autre procédure SAS est possible ici

```sql
PROC SQL;
CREATE TABLE CA.CA_DepProv AS
	SELECT Departement, Provenance, SUM(CA) AS CA
		FROM CA.CA_ALL
		GROUP BY Departement, Provenance;
QUIT;

PROC TRANSPOSE DATA=CA.CA_DepProv OUT=CA.CA_DepProv_wide (drop= _NAME_);
	BY Departement;
	ID Provenance;
	VAR CA;
PROC PRINT;
RUN;
```

On pourrait ensuite faire un AFC sur la table `CA_DepPrv_wide`, par exemple.
