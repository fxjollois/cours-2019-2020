# Restitution d'informations

Suite aux étapes précédentes (modélisation puis intégration des données), dans une situation professionnelle, nous devons mettre en place un ou plusieurs tableaux de bords. Nous allons continuer le travail sur le data mart créé la dernière fois, et que vous pouvez récupérer [en cliquant ici](datamart.sqlite) (format SQLite). Voici les étapes à suivre pour réaliser cette partie du travail :

1. Définir les besoins métiers en terme de tableaux de bords
1. Etablir la liste des données nécessaires, et des éventuels pré-calculs possibles
1. Créer l'interface utilisateur (et la faire valider par le métier)
1. Ecrire la partie serveur permettant la génération des graphiques, tableaux et autres informations nécessaires aux tableaux de bord

## Besoins métiers

Suite à diverses réunions, nous avons établi les besoins métiers suivants : un seul tableau de bord avec plusieurs parties

- **Global** : basée sur le chiffre d'affaires 
  - Graphique : évolution du CA sur toute la période (avec indication des années)
  - Boîte d'info :
    - Pourcentage d'évolution sur la période
    - Meilleur produit sur la période (avec % du CA global)
    - Meilleure catégorie sur la période (idem)
- **Catégorie** : 
  - Tableau des catégories, classées dans l'ordre décroissant du CA total sur la période
  - Un clic sur une catégorie va afficher l'évolution de celle-ci sur la période (même base graphique que la partie Global)
  - Ce même clic doit afficher une information sur les fournisseurs (pour répondre à la question : quels fournisseurs sont plus liés à cette catégorie ? - format à réfléchir)
- **Fournisseur** :
  - TOP 10 et BOTTOM 10 des fournisseurs, classés comme la partie précédent
  - Un clic sur un des fournisseurs permet la aussi d'avoir l'évolution
  - On doit aussi pouvoir avoir le détail par produit (CA total et évolution - format aussi à réfléchir)

## Travail à faire

Réaliser par groupe de 2/3 donc un tableau de bord répondant aux besoins précédemment décrits.

1. Première réflexion sur papier (ou la version moderne de celui-ci - mais pas de programmation)
    - A faire valider
1. Création des dataframes qui vont servir ensuite
1. Création de l'application shiny répondant aux besoins
1. Réfléchir à compléter ce tableau de bord, par exemple avec les liens entre fournisseurs et catégories

