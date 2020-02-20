# Restitution d'informations

Suite aux étapes précédentes (modélisation puis intégration des données), dans une situation professionnelle, nous devons mettre en place un ou plusieurs tableaux de bords. Nous allons continuer le travail sur le data mart créé la dernière fois, et qu vous pouvez récupérer [en cliquant ici](datamart.sqlite) (format SQLite). Voici les étapes à suivre pour réaliser cette partie du travail :

1. Définir les besoins métiers en terme de tableaux de bords
1. Etablir la liste des données nécessaires, et des éventuels pré-calculs possibles
1. Créer l'interface utilisateur (et la faire valider par le métier)
1. Ecrire la partie serveur permettant la génération des graphiques, tableaux et autres informations nécessaires aux tableaux de bord

## Besoins métiers

Suite à diverses réunions, nous avons établi les besoins métiers suivants : un seul tableau de bord avec plusieurs parties

- **Global** : basée sur le chiffre d'affaires 
  - Graphique : évolution du CA sur toute la période (avec indication 2003/2004)
  - Boîte d'info :
    - Pourcentage d'évolution sur la période
    - Meilleur département sur la période (avec % du CA global)
    - Meilleure provenance sur la période (idem)
- **Provenance** : 
  - Tableau des provenances, classées dans l'ordre décroissant du CA total sur la période
  - Un clic sur une provenance va afficher l'évolution de celle-ci sur la période (même base graphique que la partie Global)
  - Ce même clic doit afficher une information sur les départements (pour répondre à la question : *quels départements sont plus liés à cette provenance ?* - format à réfléchir)
- **Département** :
  - Tableau des départements, classés comme la partie précédent
  - Un clic sur un des départements permet la aussi d'avoir l'évolution
  - On doit aussi pouvoir avoir le détail par groupe (CA total et évolution - format aussi à réfléchir)

## Travail à faire

Réaliser par groupe de 2/3 donc un tableau de bord répondant aux besoins précédemment décrits.

1. Première réflexion sur papier (ou la version moderne de celui-ci - mais pas de programmation)
    - A faire valider
1. Création des dataframes qui vont servir ensuite
1. Création de l'application shiny répondant aux besoins
1. Réfléchir à compléter ce tableau de bord, par exemple avec des informations sur les sous-groupes, ou bien les liens entre départements et provenance

