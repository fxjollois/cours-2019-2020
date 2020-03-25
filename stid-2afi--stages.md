# Sujet de stages - STID 2ème année en FI

## AirBnb (plutôt stat)

### Demande globale

A partir des données collectées sur le site [AirBnB](http://www.airbnb.com/) et disponibles via [Inside AirBnB](http://insideairbnb.com/get-the-data.html), vous devez analyser et comparer les villes d'un même pays / d'une même région. Voici le plan de travail à suivre :

- Importation et nettoyage des données (choix d'un logiciel, suppression des avis automatiques, recherche de données aberrantes, ...)
- Parc locatif à disposition (description, cartographie, avis donnés, ...)
- Similitudes et différences entre les villes (coût, parc, équipement, nombre d'avis, ...)
- Modélisation du coût d'une location : **qu'est-ce qui influent sur le prix d'une location ?**
    - globale sur le pays/la région
    - par ville
    - analyser les résultats (modèles identiques ? différents ? pourquoi ? comment ?)
- Segmentation des locations : **existe-t'il des classes de locations ?**
    - globale
    - distinction entre les classes, s'il y en a 

### Possibilités

- **France** : Paris, Lyon, Bordeaux
- **Royaume-Uni** : Londres, Manchester, Bristol
- **Espagne** : Barcelone, Madrid, Séville
- **Italie** : Milan, Naples, Rome
- **Belgique** : Bruxelles, Ghent (Gand), Antwerp (Anvers)

- **Europe** : 3 parmi les villes précédentes

Vous pouvez aussi proposer d'autres choix (Australie, Etats-Unis, Canada entre autres - 3 villes dans le monde - ...).

## Données climatiques (plutôt info)

A l'aide des [données climatiques](http://www.cru.uea.ac.uk/data/) fournies par le [Climatic Research Unit](http://www.cru.uea.ac.uk/), vous devez créer un portail dédié à l'évolution de la température sur la France (métropolitaine et d'outre-mer). Idéalement, celui-ci sera créé en pur javascript avec les librairies [d3js](https://d3js.org/) et [leaflet](https://leafletjs.com/), mais pourra être fait en R avec [shiny](https://shiny.rstudio.com/) (et le package [leaflet](https://rstudio.github.io/leaflet/)).

Ces données présentent les *anomalies de températures* mensuelles et annuelles relevées depuis 1850, avec un quadrillage plus ou moins fin selon les cas. La référence est la période 1961-1990. Cela veut dire qu'une valeur de +0.5 indique que la température a été plus élevée de 0.5 °C par rapport à cette période. Il y a bien évidemment de nombreuses données manquantes (en particulier sur les premières années).

Ce portail devra présenter la courbe d'évolution globale de la température pour **la France**. On pourra appliquer sur cette série les méthodes adaptées de lissage (idéalement en ayant le choix de la fenêtre), et de prévision pour les prochaines années. De plus, on présentera la situation sur le quadrillage, à la dernière date possible. Idéalement, lorsque l'utilisateur pointera la souris sur un carré, il faurait lui afficher l'évolution de la température à cet endroit.

Voici le plan de travail à suivre :

- Réflexion (*sur papier*) sur l'interface finale : choix des tableaux et graphiques à produire, choix des interactions possibles de l'utilisateur
- Importation des données et transformation (sélection des données pour la France - il faudra donc déterminer en amont les coordonnées géographiques de l'ensemble de la France)
    - création d'un code automatique permettant l'ensemble des opérations
- Création de l'interface utilisateur
- Ecriture du code permettant la création des tableaux et graphiques, ainsi que l'interactivité (choix utilisateur prévu en amont)

On pourra s'inspirer de [cette page](http://www.columbia.edu/~mhs119/Temperature/) pour certains graphiques, par exemple.


