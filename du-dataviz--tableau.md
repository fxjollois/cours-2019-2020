# Visualisation de données - Tableau

Dans ce cours, nous allons aborder l'utilisation du logiciel [**Tableau Public**](https://public.tableau.com/s/),
version gratuite de **Tableau Software**, outil phare dans le domaine de la **BI** et de
la **Visualisation de données**.

Dans ce présentation de l'outil, nous allons utiliser les données synthétiques de la production scientifique mondiale de 1996 à 2014 ([lien vers le fichier Excel](scimagojr%20all.xlsx) - source : [SCImago Journal & Country Rank](http://www.scimagojr.com/help.php))

Ce fichier comporte les variables suivantes :

- `Year` : année
- `Rank` : rang du pays en terme de production (par rapport au nombre de documents) pour l'année indiquée
- `Country` : pays
- `Documents` : nombre de documents produits
- `Citable.documents` : nombre de documents citables (articles, reviews et conférences)
- `Citations` : nombre de citations de documents produits
- `Self.Citations` : nombre de citations dans un document du même pays
- `Citations.per.Document` : nombre moyen de citations
- `H.index` : nombre $h$ d'articles ayant eu au moins $h$ citations (pour plus d'information : [h-index sur Wikipedia](https://fr.wikipedia.org/wiki/Indice_h))

Nous allons aborder les points suivants :

1. Importation des données dans **Tableau**
	- Fichier Excel puis choisir le fichier
1. Vérification des données (type particulièrement)
	- Toutes sont des numériques (symbole `#` au dessus du nom des variables)
	- Sauf `Country`, avec un symbole représentant une terre, qui indique que c'est une variable géographique
1. Première **Feuille** et premier tableau : *Production scientifique*
	- Cliquer sur *Feuille 1* en bas à gauche
	- Double-cliquer sur `Documents`, dans les **Mesures**
	- Cliquer sur le tableau dans la partie **Montre moi** (en haut à droite)
	- Glisser et Déplacer `Country` (dans les **Dimensions**) dans la partie pour les lignes
	- Faire un clic droit dans la zone au-dessus des valeurs obtenues puis choisir le tri dans l'ordre décroissant
	- Faire un clic droit sur `Country` dans le tableau et choisir *Filtrer*
		- Cliquer sur *Premiers*, choisir *Par champs* puis *OK*
	- Double-cliquer sur le titre *"Feuille 1"* en haut pour le changer
	- Double-cliquer sur l'onglet *Feuille 1* en bas pour changer le titre de la feuille
	- On a un TOP 10 des pays sur leur production scientifique
1. Deuxième feuille et premier graphique : *Evolution de la production scientifique*
	- Cliquer, dans le menu, sur *Feuille de calcul* puis *Nouvelle feuille de calcul*, ou cliquer en bas de la fenêtre sur le `+` avec l'icône d'un graphique
	- Double-cliquer sur `Documents`, puis sur `Year`
	- Changer le titre (idem que précédement)
	- Dans la partie à gauche, cliquer sur **Analyse**
		- Faire un Glisser/Déplacer de *Ligne de constante* dans le graphique
		- Choisir la case pour `Year` et indiquer l'année 2002
		- Avec un clic droit sur la ligne, il est possible de la modifier (type de ligne, couleur, étiquette, ...)
	- Faire de même pour 2013
	- Toujours dans **Analyse**
		- Faire un Glisser/Déplacer de *Ligne de moyenne* maintenant
		- Sélectionner le croisement `SOMME ...` et *Table*
		- Nous avons maintenant une ligne représentant la production scientifique annuelle moyenne (toujours autant modifiable)
	- Changer aussi le titre de la feuille
	- On a l'évolution de la production scientifique mondiale sur la période analysée
1. Premier **Tableau de bord** : *Synthèse de la production scientifique mondiale*
	- Cliquer *Tableau de bord* puis *Nouveau Tableau de Bord* dans le menu, ou sur l'icône en bas avec un `+` et un quadrillage
	- Glisser/Déplacer chacune des feuilles précédemment créées en les sélectionnant dans la partie gauche
	- Le jeu est ici de faire des Glisser/Déplacer pour avoir l'organisation que l'on souhaite
	- Il est possible d'ajouter des images, des pages web ou du texte (cf *Objets* dans le menu à gauche)
		- Ajouter un petit texte explicatif du résultats éventuellement
	- Il est aussi possible de modifier la taille du tableau de bord
	- Nous avons notre premier tableau de bord
		- Revenir sur le TOP pour avoir les 20 premiers pays
1. Troisième feuille et première carte : *Cartographie de la production scientifique*
	- Créer une nouvelle feuille
	- Double-cliquer sur `Country`
		- une carte doit apparaître avec des points
	- Dans le menu **Montre-moi**, choisir la carte avec les continents en couleurs
		- nous avons une carte *choroplèthe*
	- Double-cliquer sur `Documents`
		- les pays sont maintenant avec une couleur en fonction de leur production scientifique
	- Nous avons une carte choroplèthe indiquant la production scientifique des pays
	- Glisser/Déplacer `Citations` dans l'icône **infobulle** dans **Repères**
	- Faire de même avec `H.index`
		- Faire un clic droit sur la zone `SOMME(H.index)`, et choisir `Mesure (somme)` puis `Moyenne`
	- En pointant la souris sur un pays, nous avons aussi le nombre total de citations et le *H index* moyen annuel
		- Cliquer sur *Infobulle* pour personnaliser l'affichage
	- Changer le titre aussi du graphique et de la feuille
1. Quatrième feuille : *Evolution de la contribution des plus importants pays*
	- Créer une nouvelle feuille
	- Glisser/Déplacer `Country` sur les lignes
	- Idem sur *Filtres*
		- Choisir les 10 premiers sur la production totale de documents
	- Glisser/Déplacer `Year` dans les colonnes
		- Clic sur la flèche à droite de *Year* dans les colonnes et choisir *Discret*
		- On a maintenant un tableau
	- Double-cliquer sur `Documents`
	- Dans *Analyse* (dans le menu), choisir  *Pourcentage de* puis *colonnes*
	- Dans **Montrez-moi**, choisir les diagrammes en barres empilées
	- Changer le titre et le nom de la feuille
	- Nous avons l'évolution de la contribution des 10 pus gros pays producteurs scientifiques (un peu biaisé ici, car c'est la répartition entre les 10, mais c'est révélateur tout de même)
1. Cinquième feuille : *Evolution par pays, en base 100*
	- Faire un clic-droit sur la deuxième feuille créée (celle avec l'évolution de la production scientifique), puis choisir *Dupliquer*
	- Glisser/Déplacer la feuille (nommée *Feuille 5* normalement), après les autres
	- Supprimer la ligne horizontale indiquant la moyenne
	- Glisser/Déplacer `Country` sur *Couleurs* (dans *Repères*)
		- Il y a trop de pays pour tous les afficher
		- Choisir *Filtrer puis ajouter*
		- Chercher et ajouter les pays suivants : 
			- `United States`
			- `France`
			- `China`
			- `Germany`
			- `United Kingdom`
	- Cliquer sur la fenêtre à droite de `SOMME(Documents)` dans *Lignes*
		- Choisir *Ajouter un calcul de table rapide*
		- Dans le *Type de calcul*, sélectionner *Pourcentage de*
		- Dans la partie *En rapport avec*, choisir *Premier*, puis fermer la fenêtre
	- Nous avons les évolutions en base 100 des 5 pays sur la période analysée
	- Cliquer sur la flèche à droite de `Country` dans *Filtres*
		- Choisir *Afficher le filtre*
	- Il est maintenant possible de choisir les pays à afficher dans le graphique
		- Regarder l'évolution impressionnante de certains pays tels que :
			- `Serbia`
			- `Macao`
			- `Montenegro`
			- `Afghanistan`
			- `Iran`
			- `Qatar`
			- ...
1. Sixième feuille : *TOP par année, à taille variable*
	- Dupliquer le premier tableau et placer le à la fin
	- Faire un clic-droit dans le vide du panneau de gauche et choisir *Créer un paramètre...*
		- Donner lui un nom (par exemple `pChoixTaille`)
		- Choisir *Entier* comme type et cliquer sur *Liste* pour définir les valeurs possibles 
		- Cliquer pour ajouter les valeurs (ici 3, 5, 10 et 50 par exemple)
			- Noter que la valeur par défaut est la première indiquée mais que c'est modifiable si besoin
		- Cliquer sur *OK*
	- Cliquer sur la flèche à droite de `Country` dans le panneau *Filtres* et cliquer sur *Modifier le filtre...* 
	- Retourner dans la partie *Premiers* 
		- Si vous cliquer sur la flèche à droite du 10, vous pouvez sélectionner votre paramètre (`pChoixTaille` donc normalement)
		- Vous avez maintenant un TOP 3
	- Pour afficher le contrôle du paramètre, cliquer sur la flèche à droite du paramètre dans le panneau de gauche et choisir *Afficher le contrôle de paramètre*
	- Vous pouvez maintenant sélectionner le nombre de pays affichés dans votre TOP
	- Recréer un paramètre comme précédemment
		- Nommer le `pChoixAnnee`
		- Choisir *Entier* pour le type et *Plage* pour les valeurs
		- Plutôt que de chercher les années min et max, nous pouvons les récupérer directement. Cliquer sur *Définir à partir du champ...* et sélectionner `Year`
		- Choisir `2014` comme valeur actuelle puis cliquer sur *OK*
	- Faire un clic-droit dans le vide du panneau de gauche et choisir *Créer un champs calculé...* et nommer-le `cChoixAnnee`
		- Entrer la formule suivante dans le cadre dédié 
```
IF ([Year] = [pChoixAnnee]) THEN 1 ELSE 0 END
```
		- Faire un clic sur la flèche à droite du champ `Choix année` et cliquer sur *Convertir en dimension*
		- Glisser-déplacer cette dimension dans le panneau *Filtres*
			- Sélectionner la valeur 1 et cliquer sur *OK*
		- Afficher le contrôle du paramètre `pChoixAnnee` pour pouvoir choisir l'année présentée
	- Nous avons un TOP à taille variable et sur une année choisie
		- Il est possible de modifier les titres des contrôles de paramètres éventuellement 
1. Première **Histoire** : *Analyse de la production scientifique*
	- Cliquer sur *Histoire*, puis *Nouvelle Histoire* dans le menu, ou sur l'icône avec un `+` sur un livre en bas
	- Changer le titre et le nom de l'histoire
	- Glisser/Déplacer le tableau de bord dans le cadre prévu
	- Double-cliquer sur *Ajouter une légende* pour ajouter un texte présentant le tableau de bord
	- Cliquer sur *Nouveau plan du reportage* > **Vide** (à gauche)
		- Glisser la carte
		- Ajouter une légende
		- Si on souhaite cacher la légende, qui n'a que peu d'intérêt ici, retourner sur la feuille correspondant à la carte
			- Cliquer dans le menu sur *Analyse*, puis *Légendes* et décocher *Légende des couleurs*
			- retourner sur l'histoire pour voir que la légende a bien été enlevée
		- Idem, on peut recadrer la carte si on le souhaite (toujours dans la feuille)
	- Ajouter la répartition de la production scientifique des 10 pays les plus productifs
	- Idem pour l'évolution en base 100 et pour le TOP par année (dans deux plans différents)
1. Vous devriez avoir à la fin ce [tableau](https://public.tableau.com/profile/fx.jollois#!/vizhome/visualisation-donnees-tableau/Analyse)

## A FAIRE

Réaliser les *feuilles* suivantes :

- Le nuage de points entre le nombre moyen de documents produits par an et le nombre moyen de citations par an, pour chaque pays, avec
    - le nom de chaque pays indiqué sur le graphique
    - une couleur (entre du vert pour le 1er et du rouge pour le dernier) par pays en fonction de son rang médian
    - une taille en fonction du *H-index* moyen
    - deux lignes de références au niveau des moyennes de chaque variable
    - des axes logarithmiques
- Une représentation graphique de l'évolution des rangs des pays, uniquement sur les 10 premiers rangs, avec le pays en 1er en haut, avec
    - une couleur par pays
    - le nom de chaque pays sur le graphique
- Une carte des pays dont le *H-index* moyen est supérieur à une valeur choisie par l'utilisateur, avec
    - valeurs dans le domaine des valeurs possibles pour cet indice,
    - la couleur des pays dépendante de la valeur de l'indice, avec une échelle de couleur fixe
- Une carte des pays représentant le TOP réalisé plus haut avec
    - une sélection des pays identique à celle du TOP
    - idem pour l'année
    - une couleur dépendante du nombre de documents produits

De plus, réaliser :

- Un *dashboard* intégrant le TOP et la dernière carte, avec
    - le contrôle du nombre de pays, sous forme de *radio button* (bouton rond avec sélection unique)
    - le contrôle de l'année, sous forme de *slider*
- Une *story* regroupant tous ces éléments de manière cohérente

