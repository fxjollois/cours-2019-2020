# Restitution d'informations

Suite aux étapes précédentes (modélisation puis intégration des données), dans une situation professionnelle, nous devons mettre en place un ou plusieurs tableaux de bords. Nous allons continuer le travail sur le data mart créé la dernière fois, et qu vous pouvez récupérer [en cliquant ici](). Voici les étapes à suivre pour réaliser cette partie du travail :

1. Définir les besoins métiers en terme de tableaux de bords
1. Etablir la liste des données nécessaires, et des éventuels pré-calculs possibles
1. Créer l'interface utilisateur (et la faire valider par le métier)
1. Ecrire la partie serveur permettant la génération des graphiques, tableaux et autres informations nécessaires aux tableaux de bord

## Besoins métiers

Suite à diverses réunions, nous avons établi les besoins métiers suivants : un seul tableau de bord avec plusieurs parties

- **Global** : basée sur le chiffre d'affaires 
  - évolution du CA sur toute la période (avec indication 2003/2004)
  - pourcentage d'évolution sur la période
  - meilleur département sur la période (avec % du CA global)
  - meilleure provenance sur la période (idem)
- **Provenance** : 
  - Tableau des provenances, classées dans l'ordre décroissant du CA total sur la période
  - Un clic sur une provenance va afficher l'évolution de celle-ci sur la période (même base graphique que la partie Global)
  - Ce même clic doit afficher une information sur les départements (pour répondre à la question : *quels départements sont plus liés à cette provenance ?*)
- **Département** :
  - TOP5 et BOTTOM5
  - Un clic sur un des départements
  - 

## 
