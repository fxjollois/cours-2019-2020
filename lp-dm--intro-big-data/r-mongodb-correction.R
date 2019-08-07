library(mongolite)
conSportifs = mongo(collection = "Sportifs", db = "gym", url = "mongodb://193.51.82.104:2343")
conGymnases = mongo(collection = "Gymnases", db = "gym", url = "mongodb://193.51.82.104:2343")

# 12. Quels entraîneurs entraînent du hand ball et du basket ball ?
conSportifs$find(
  query = '{
    "Sports.Entrainer": "Hand ball", 
    "Sports.Entrainer": "Basket ball" 
  }',
  fields = '{
    "_id": 0,
    "Nom": 1,
    "Sports.Entrainer": 1
  }'
)

# 13. Quelle est la moyenne d’âge des sportives qui pratiquent du basket ball ?
conSportifs$aggregate('[
  { "$match": { "Sports.Jouer": "Basket ball", "Sexe": { "$in": [ "f", "F" ]} }},
  { "$group": { "_id": "null", "AgeMoyen": { "$avg": "$Age" }}}
]')

# 14. Quels sont les sportifs les plus jeunes ?
agemin = conSportifs$aggregate('[ 
  { "$group": { "_id": "null", "agemin": { "$min": "$Age" } } } 
]')

# On cherche les sportifs avec Age = agemin$agemin.
conSportifs$find(
  query = paste('{ "Age": ', agemin$agemin,'}'),
  fields = '{
    "_id": 0,
    "Nom": 1,
    "Age": 1
  }'
)


# 17. Quels sportifs n’ont pas de conseillers ?
conSportifs$find(
  query = '{
    "IdSportifConseiller": { "$exists": false }
  }',
  fields = '{
    "_id": 0,
    "Nom": 1,
    "IdSportifConseiller": 1
  }'
)

# 18. Pour chaque sportif donner le nombre de sports qu’il arbitre
conSportifs$aggregate('[
  { "$match": { "Sports.Arbitrer": { "$exists": true }}},
  { "$unwind": "$Sports.Arbitrer"},
  { "$group": { "_id": "$Nom", "nbArbitrer": { "$sum": 1 }}}
  ]')
conSportifs$aggregate('[
  { "$unwind": "$Sports.Arbitrer"},
  { "$group": { "_id": "$Nom", "nbArbitrer": { "$sum": 1 }}}
]')

conSportifs$aggregate(
'[
  { "$match": { "Sports.Arbitrer": { "$exists": true }}},
  { "$project": { 
    "_id": 0,
    "Nom": 1, 
    "nbArbitrer": { "$cond": {
      "if": { "$isArray": "$Sports.Arbitrer" },
      "then": { "$size": "$Sports.Arbitrer" },
      "else": 1
    } }
  }
]')

# 19. Pour chaque gymnase de Stains donner par jour d’ouverture les horaires des premières et dernières séances
conGymnases$aggregate(
'[
  { "$match": { "Ville": "STAINS" } },
  { "$unwind": "$Seances" },
  { "$project": { 
		"nom": "$NomGymnase", 
		"jour": { "$toLower": "$Seances.Jour" }, 
		"h": "$Seances.Horaire"
	}},
  { "$group": { 
		"_id": { "nom": "$nom", "jour": "$jour" }, 
		"debut": { "$min": "$h"}, 
		"fin": { "$max": "$h" }}},
  { "$sort": { "_id.nom": 1, "_id.jour": 1, "debut": 1 }}
]')


# 24. Combien de séances assurent chaque entraineur ?
conGymnases$aggregate(
'[
  { "$unwind": "$Seances" },
  { "$group": { "_id": "$Seances.IdSportifEntraineur", "nb": { "$sum": 1 }}},
  { "$lookup": {
    "from": "Sportifs",
    "localField": "_id",
    "foreignField": "IdSportif",
    "as": "Entraineur"
  }},
  { "$project": { "_id": 0, "nb": 1, "Nom": "$Entraineur.Nom" }}
]')

#ou par Sportifs
conSportifs$aggregate(
'[
  { "$project": { "IdSportif": 1, "Nom": 1, "_id": 0 }},
  { "$lookup": {
    "from": "Gymnases",
    "localField": "IdSportif",
    "foreignField": "Seances.IdSportifEntraineur",
    "as": "Gymnases"
  }},
  { "$match": { "Gymnases": { "$ne": [] }} },
  { "$unwind": "$Gymnases" },
  { "$unwind": "$Gymnases.Seances" },
  { "$match": { "$expr": { "$eq": [ "$IdSportif", "$Gymnases.Seances.IdSportifEntraineur" ]}}},
  { "$group": { "_id": "$Nom", "nb": { "$sum": 1 }}}
]')

# 25. Donner, pour chaque gymnase, la liste des entraîneurs (nom uniquement) qui y ont des séances
conGymnases$aggregate('[
  { "$unwind": "$Seances" },
  { "$lookup": {
    "from": "Sportifs",
    "localField": "Seances.IdSportifEntraineur",
    "foreignField": "IdSportif",
    "as": "Entraineur"
  }},
  { "$group": { 
    "_id": { "Nom": "$NomGymnase", "Ville": "$Ville" }, 
    "Entraineur": { "$addToSet": "$Entraineur.Nom" }
  }}
]')
