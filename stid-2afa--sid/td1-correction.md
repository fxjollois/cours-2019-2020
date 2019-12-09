# Modélisation d'un SID

(cf [sujet](td1))

## Rétro-Conception

#### Quelle est la table de fait dans cet entrepôt ? Justifiez !

C'est la table **`Acte`** : seule table avec clés externes pointant sur les autres tables + présence d'attributs numériques correspondant à des indicateurs (par exemple des montants).

#### Dessiner le modèle de données en expliquant le ou le(s) tables de faits et de dimensions.

<img src="https://docs.google.com/drawings/d/e/2PACX-1vSaHxbVPyAJQbM7AJ1Y6rFOIQZbfREgXgnPR24n9b5L6Ux0WIvMEV6EUxHSHQ2MvEE13T934EBuGY2s/pub?w=480&amp;h=360">

#### A votre avis, y a t'il des dimensions dégénérées dans cet entrepôt ? Rappelez la définition et justifiez.

Pas de dimension dégénérée ici.

#### Donnez les nouvelles tables si on décide de diminuer la taille de la table **Assurée** par une mini-dimension démographique.

<img src="https://docs.google.com/drawings/d/e/2PACX-1vSBFE2kKOOJNhXyGnz7vcrlFwLlBMM2PINsQT6o2kj1vudC0tenPXiCSpid8mHcxSzSZIEy15HAxWrG/pub?w=658&amp;h=360">

#### Donner le script SQL de création des tables (ne pas oublier les clés primaires).

##### Dimension date

```sql
CREATE TABLE DATE (
    CléDate         INT NOT NULL PRIMARY KEY,
    Annee           INT,
    Mois            VARCHAR2(30),
    JourDeMois      INT,
    JourDeSemaine   INT,
    TrancheHoraire  VARCHAR2(10),
    DrapeauVacances BOOLEAN
);
```

##### Dimension Assure

```sql
CREATE TABLE ASSURE (
    CléAssuré                       INT NOT NULL PRIMARY KEY, 
    MoisNaissance                   INT, 
    AnnéeNaissance                  INT, 
    MoisDécès                       INT, 
    AnnéeDécès                      INT, 
    Région                          VARCHAR2(50), 
    Département                     VARCHAR2(50), 
    District                        VARCHAR2(50), 
    Ville                           VARCHAR2(50), 
    Quartier                        VARCHAR2(50), 
    RevenuAssuré                    NUMBER, 
    RevenuFoyer                     NUMBER, 
    CatégorieSocioProfessionnel     VARCHAR2(100), 
    SousCatégorieSocioProfessionnel VARCHAR2(100),
    DomaineActivité                 VARCHAR2(100), 
    CaissePrimaire                  VARCHAR2(50), 
    CaisseComplémentaire            VARCHAR2(50), 
    DrapeauAssuréPrincipal          BOOLEAN
);
```

##### Dimension Praticien

```sql
CREATE TABLE PRATICIEN (
    CléPraticien   INT NOT NULL PRIMARY KEY, 
    Spécialité     VARCHAR2(100), 
    SousSpécialité VARCHAR2(100), 
    Région         VARCHAR2(50), 
    Département    VARCHAR2(50), 
    District       VARCHAR2(50), 
    Ville          VARCHAR2(50), 
    Quartier       VARCHAR2(50), 
    MoisNaissance  INT, 
    AnnéeNaissance INT, 
    DrapeauConventionné BOOLEAN
);
```

##### Dimension Pathologie

```sql
CREATE TABLE PATHOLOGIE (
    CléPathologie                 INT NOT NULL PRIMARY KEY, 
    DesignationNormalisé          VARCHAR2(200), 
    Spécialité                    VARCHAR2(100), 
    SousSpécialité                VARCHAR2(100), 
    TauxDIncapacité               INT,
    DuréeTraitement               INT, 
    Chronicité                    VARCHAR2(20), 
    DrapeauMaladieProfessionnelle BOOLEAN
);
```

##### Fait Acte

```sql
CREATE TABLE ACTE (
    CléDate                                   INT NOT NULL, 
    CléAssuré                                 INT NOT NULL, 
    CléPraticien                              INT NOT NULL, 
    CléPathologie                             INT NOT NULL, 
    MontantActes                              NUMBER, 
    MontantDesActesComplémentaires            NUMBER, 
    MontantPriseEnChargeCaissePrimaire        NUMBER, 
    MontantPriseEnChargeCaisseComplémentaire  NUMBER, 
    NombreMedicamentsPrescrits                INT, 
    MontantPharmacologieGénérique             NUMBER,
    MontantPharmacologieNonGenerique          NUMBER, 
    DrapeauActesComplémentairesBiologie       BOOLEAN, 
    DrapeauActesComplémentairesChirurgie      BOOLEAN, 
    DrapeauActesComplémentairesRadiologie     BOOLEAN, 
    DrapeauActesComplémentairesKinésithérapie BOOLEAN, 
    DrapeauActesComplémentairesRadiologie     BOOLEAN, 
    NombreDeJoursDArrêtDeTravail              INT, 
    CoutJoursDArret                           NUMBER
);
```

## Dimensionnement de l'entrepôt

##### Donnez le nombre de faits présents dans la table de fait.

Pour faire ce calcul, on utilise la formule qui suit, avec les valeurs suivantes :

- `Nb_actes` : nombre d'actes par jour de travail, et par praticien (20)
- `Nb_praticiens` : nombre de praticiens (300000)
- `Nb_jours` : nombre de jours de travail d'un praticien au cours d'une année (300)
- `Nb_années` : nombre d'années de suivi du data-mart (6)


```
Taille = Nb_actes * Nb_praticiens * Nb_jours * Nb_années
       = 20 * 300000 * 300 * 6
       = 10.8 milliards de lignes
```



La table finale fera donc normalement **10.8** milliards de lignes.

##### Estimez la taille (en octet) de celle-ci.

Dans la table de faits, il y a donc en tout :

- 4 clés de 4 octets chacune
- 9 attributs numériques de 4 octets chacun
- 5 attributs booléens de 1 octet chacun

Une ligne fait donc `4 * 4 + 9 * 4 + 5 * 1 = 57` octets en tout. La table fera donc **615.6** Go (selon la nouvelle norme : 1 Go = 1000 Mo, 1 Mo = 1000 Ko, 1 Ko = 1000 o - cf [cette page](https://fr.wikipedia.org/wiki/Unit%C3%A9_de_mesure_en_informatique) pour plus d'informations).

## Rapports d'analyse (SQL)

##### Donnez la requête SQL qui donne le top 10 des sous-spécialités des pathologies qui ont entraîné le plus de dépenses (montant des actes + montant pharmacologies) ?

```sql
SELECT P.Spécialité, P.SousSpécialité, 
        SUM(MontantActes + MontantDesActesComplémentaires + 
            MontantPharmacologieGenerique + 
            MontantPharmacologieNonGenerique) AS MontantTotalActes
    FROM Pathologie P
        INNER JOIN Acte A ON P.CléPathologie = A.CléPathologie
    GROUP BY P.Spécialité, P.SousSpécialité
    ORDER BY MontantTotalActes DESC
    LIMIT 10;
```

##### Donnez le rapport mensuel de progression du ratio des montants des médicament génériques par rapport aux médicaments non génériques.

```sql
SELECT D.Année, D.Mois, 
        SUM(MontantPharmacologieGenerique) / SUM(MontantPharmacologieNonGenerique) AS Ratio
    FROM Acte A 
        INNER JOIN Date D ON A.CléDate = D.CléDate
    GROUP BY D.Année, D.Mois
    ORDER BY D.Année, D.Mois;
```

##### Donnez le rapport précédent mais avec une moyenne glissante sur les 3 mois précédents.

Le plus simple ici est probablement de créer une vue, à partir de la requête précédente mais en gardant le numérateur et le dénominateur du ratio. On va utiliser ensuite cette vue 2 fois dans la requête pour avoir ce qu'on cherche.

```sql
CREATE VIEW RATIOMOIS AS 
    SELECT D.Année, D.Mois, 
            SUM(MontantPharmacologieGenerique) AS MontantGenerique,
            SUM(MontantPharmacologieNonGenerique) AS MontantNonGenerique
        FROM Acte A 
            INNER JOIN Date D ON A.CléDate = D.CléDate
        GROUP BY D.Année, D.Mois
        ORDER BY D.Année, D.Mois;
```

Ensuite, pour faire la jointure entre la vue (nommée `R1`) et elle-même (`R2`), et pour faire correspondre un mois de `R1` aux trois mois de `R2` (le même et les 2 précédents), on calcule le nombre de mois depuis l'an 0 (simple à faire : `Nb_années * 12 + Nb_mois`). Ensuite, il faut que la différence entre les 2 soit comprise entre 0 (même mois) et 2 (deux mois avant). 

```sql
SELECT R1.Année, R1.Mois,
        SUM(R2.MontantGenerique) / SUM(R2.MontantNonGenerique) AS Ratio
    FROM RatioMois R1
        INNER JOIN RatioMois R2 ON ((R1.Année * 12 + R1.Mois) - (R2.Année * 12 + R2.Mois)) BETWEEN 0 AND 2
    GROUP BY R1.Année, R1.Mois
    ORDER BY R1.Année, R1.Mois;
```


