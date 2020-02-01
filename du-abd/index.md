# Introduction à MongoDB (avec R)

<!-- <a href="https://rendez-vous.renater.fr/du-abd--jollois" target="_blank">https://rendez-vous.renater.fr/du-abd--jollois</a> | -->

<!-- <a href="https://rendez-vous.renater.fr/du-abd%E2%80%93jollois" target="_blank">https://rendez-vous.renater.fr/du-abd%E2%80%93jollois</a> | -->

| Outil | Lien |
|-|-|
| Visio | |
| Partage de code | <a href="https://codeshare.io/anpJ4v" target="_blank">https://codeshare.io/anpJ4v</a> |
| Liste de diffusion pour discussion | <a href="https://framalistes.org/sympa/info/du-abd--jollois" target="_blank">du-abd--jollois@framalistes.org</a> |

- [Présentation de MongoDB](du-abd--slides.html)
- [Introduction à R et **MongoDB**](du-abd--r-mongodb)

- [Introduction à R et **Hadoop**](du-abd--r-hadoop.html) (avec **SparkR**)



## Pour travail à la maison

1. Installer [MongoDB Community Edition](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
    - Format à prendre (selon votre ordinateur) : Windows x64 en MSI
    - L'outil [Compass](https://www.mongodb.com/products/compass) est installé en même temps, il permet d'interragir plus facilement avec le moteur de base de données
    - Accepter toutes les options par défaut de l'installeur
1. Télécharger les fichiers de données au format zip sur [cette page](https://parisdescartesfr-my.sharepoint.com/:f:/g/personal/francois-xavier_jollois_parisdescartes_fr/EtEHkEayfmBOmLfg9-UVfAwBc4i6pel2AbyyhbyhDFYsxA?e=yQbI10)
    - **Base test** : avec donc les restaurants - 1,95 Mo
    - **Base horodateurs** : 470 Mo  - *Attention* plus de 5 Go décompressé
    - Une fois télécharger, dézipper le : clic droit sur le fichier puis "Extraire tout...", puis "OK"
1. Ajouter `C:\Program Files\MongoDB\Server\4.2\bin\` à la variable d'environnement `PATH`
    - Procédure pas à pas
        1. Aller dans les paramètres
        1. Taper "Variables" dans la barre de recherche et cliquer sur "Modifier les variables d'environnement pour votre compte"
        1. Sélectionner "Path" et cliquer sur "Modifier..."
        1. Cliquer sur "Nouveau", copier le chemin indiqué ci-dessus et puis sur "Entrée"
        1. Cliquer sur "OK"
    - Vous pourrez trouver de l'aide sur le net, comme par exemple ici <https://www.java.com/fr/download/help/path.xml>
1. Lancer une invite de commande Windows et placer vous dans le répertoire où vous avez dézippé le fichier
    - Il est normal (et obligatoire) d'avoir un répertoire et sous-répertoire ayant le même nom
1. Taper la commande `mongorestore horodateurs/`

Pour vérifier que la base est bien installé, vous pouvez lancez Compass

1. Créer une connection à `mongodb://localhost:27017`
1. Cliquer sur la flèche à côté de "horodateurs" (qui permet de voir les collections) et cliquer sur "mobiliers" (par exemple)
1. Vous pouvez voir les documents

Pour accéder à la base à partir de R (via RStudio ou autre GUI), voici comment accéder aux collections. Vous remarquerez qu'on supprime juste l'url (par défaut, il cherche à se connecter à `localhost:27017`).

```
mobiliers = mongo(db = "horodateurs",
                  collection = "mobiliers")
mobiliers$count()

transactions = mongo(db = "horodateurs",
                     collection = "transactions")
transactions$count()

trans_small = mongo(db = "horodateurs",
                    collection = "transactions_small")
trans_small$count()
```