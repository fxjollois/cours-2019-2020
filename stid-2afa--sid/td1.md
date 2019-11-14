# Modélisation d'un SID

(A réaliser en groupe de 2)

Le Ministère de la Santé et du Bien-Etre vous sous-traite la réalisation d'un entrepôt de données pour réaliser des études sur les dépenses de santé dans son pays. Les bases de production de cet entrepôt sont les systèmes d'information des centres de sécurité sociale et des assurances santé complémentaire qui gèrent les dossiers (électroniques) des assurés.

Le schéma de l'entrepôt est constitué des tables suivantes (les clés primaires sont en italiques)

- **Date** (*CléDate*, Année, Mois, JourDeMois, JourDeSemaine, TrancheHoraire, DrapeauVacances)
- **Acte** (*CléDate, CléAssuré, CléPraticien, CléPathologie*, MontantActes, MontantDesActesComplémentaires, MontantPriseEnChargeCaissePrimaire, MontantPriseEnChargeCaisseComplémentaire, NombreMedicamentsPrescrits, MontantPharmacologieGénérique,MontantPharmacologieNonGenerique, DrapeauActesComplémentairesBiologie, DrapeauActesComplémentairesChirurgie, DrapeauActesComplémentairesRadiologie, DrapeauActesComplémentairesKinésithérapie, DrapeauActesComplémentairesRadiologie, NombreDeJoursDArrêtDeTravail, CoutJoursDArret)
- **Assuré** (*CléAssuré*, MoisNaissance, AnnéeNaissance, MoisDécès, AnnéeDécès, Région, Département, District, Ville, Quartier, RevenuAssuré, RevenuFoyer, CatégorieSocioProfessionnel, SousCatégorieSocioProfessionnel, DomaineActivité, CaissePrimaire, CaisseComplémentaire, DrapeauAssuréPrincipal)
- **Pratitien** (*CléPraticien*, Spécialité, SousSpécialité, Région, Département, District, Ville, Quartier, MoisNaissance, AnnéeNaissance, DrapeauConventionné)
- **Pathologie** (*CléPathologie*, DesignationNormalisé, Spécialité, SousSpécialité, TauxDIncapacité, DuréeTraitement, Chronicité, DrapeauMaladieProfessionnelle)

## Rétro-Conception

1. Quelle est la table de fait dans cet entrepôt ? Justifiez !
2. Dessiner le modèle de données en expliquant le ou le(s) tables de faits et de dimensions.
3. A votre avis, il y a t'il des dimensions dégénérées dans cet entrepôt ? Rappelez la définition et justifiez.
4. Donnez les nouvelles tables si on décide de diminuer la taille de la table **Assurée** par une mini-dimension démographique.
5. Donner le script SQL de création des tables (ne pas oublier les clés primaires).

## Dimensionnement de l'entrepôt

| Information | Valeur |
| - | -: |
| Nombre dhassurés                                     | 60 Millions |
| Nombre de actes par praticien et par jour            | 20 |
| Nombre de jours de travail d'un praticien            | 300 jours par an |
| Nombre de praticiens                                 | 300 000 |
| Montant total moyen d'un acte                        | 100 € |
| Nombre d'actes supplémentaires prescrit par acte     | 0.1 |
| Nombre d'années                                      | 6 |
| Coûts annuel des actes                               | 180 Milliard € |
| Taille des clés                                      | 4 octets |
| Taille des attributs numériques                      | 4 octets |
| Taille des attributs booléens (comme les drapeaux !) | 1 octet |

1. Donnez le nombre de faits présents dans la table de fait.
1. Estimez la taille (en octet) de celle-ci.

## Rapports dhanalyse (SQL)

1. Donnez la requête SQL qui donne le top 10 des sous-spécialités des pathologies qui ont entraîné le plus de dépenses (montant des actes + montant pharmacologies)?
1. Donnez le rapport mensuel de progression du ratio des montants des médicament génériques par rapport aux médicaments non génériques.
1. Donnez le rapport précédent mais avec une moyenne glissante sur les 3 mois précédents.
