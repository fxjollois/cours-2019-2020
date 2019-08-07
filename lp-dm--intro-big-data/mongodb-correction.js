//  1. Quels sont les sportifs (identifiant, nom et prénom) qui ont entre 20 et 30 ans ?
db.Sportifs.find(
  {
    Age: { $gte: 20, $lte: 30 }
  },
  {
    _id: 0, IdSportif: 1, Nom: 1, Prenom: 1
  }
)

//  2. Quels sont les gymnases de “Villetaneuse” ou de “Sarcelles” qui ont une surface de plus de 400 m2 ?
db.Gymnases.find(
    {
        "Ville": { "$in": [ "VILLETANEUSE", "SARCELLES"]},
        "Surface": { "$gte": 400 }
    },
    {
        "_id": 0,
        "NomGymnase": 1,
        "Ville": 1,
        "Surface": 1
    })

//  3. Quels sont les sportifs (identifiant et nom) qui pratiquent du hand ball ?
db.Sportifs.find(
    {
        "Sports.Jouer": "Hand ball"
    },
    {
        "_id": 0,
        "IdSportif": 1,
        "Nom": 1
    }
)

//  4. Dans quels gymnases et quels jours y a t-il des séances de hand ball ?
db.Gymnases.find(
    {
        "Seances.Libelle": "Hand ball"
    },
    {
        "_id": 0,
        "NomGymnase": 1,
        "Ville": 1,
        "Seances.Jour": 1,
        "Seances.Libelle": 1
    }
)

db.Gymnases.aggregate([
    { $unwind : "$Seances" },
    { $match: { "Seances.Libelle" : "Hand ball" }},
    { $project: { 
        "Gymnase" : "$NomGymnase", 
        "Ville" : "$Ville",
        "Jour" : { $toLower : "$Seances.Jour" }
    }},
    { $group: {
        "_id": { "Nom": "$Gymnase", "Ville": "$Ville", "Jour": "$Jour" }
    }}
])

//  5. Dans quels gymnases peut-on jouer au hockey le mercredi apres 15H ?
db.Gymnases.find(
    {
        "Seances.Libelle": "Hockey",
        "Seances.Jour" : { "$in": [ "mercredi", "Mercredi" ]},
        "Seances.Horaire": { "$gte" : 15 }
    },
    {
        "_id": 0,
        "NomGymnase": 1,
        "Ville": 1,
        "Seances.Jour": 1,
        "Seances.Libelle": 1,
        "Seances.Horaire": 1
    }
)

db.Gymnases.aggregate([
    { $unwind: "$Seances" },
    { $match: {
        "Seances.Libelle" : "Hockey",
        "Seances.Jour": { "$in": [ "mercredi", "Mercredi" ]},
        "Seances.Horaire": { "$gte": 15 }
    }},
    { $project: {
        "_id": 0,
        "Gymnase" : "$NomGymnase", 
        "Ville" : "$Ville"
    }},
    { $sort: {
        "Ville": 1,
        "Gymnase": 1
    }}
])

//  6. Quels sportifs (identifiant et nom) ne pratiquent aucun sport ?
db.Sportifs.find(
    {
        "Sports" : { "$exists" : false }
    },
    {
        "_id": 0,
        "Nom":  1
    }
)

//  7. Quels gymnases n’ont pas de séances le dimanche ?
db.Gymnases.find(
    {
        "Seances.Jour" : { "$nin" : [ "dimanche", "Dimanche" ]}
    },
    {
        "_id": 0,
        "NomGymnase": 1,
        "Ville": 1
    }
)

//  8. Quels gymnases ne proposent que des séances de basket ball ou de volley ball ?
db.Gymnases.find(
    {
        "$nor": [
            { "Seances.Libelle": { "$ne": "Basket ball" }},
            { "Seances.Libelle": { "$ne": "Volley ball" }}
        ]
    },
    {
        "_id": 0,
        "NomGymnase": 1,
        "Ville": 1,
        "Seances.Libelle": 1
    }
)

//  9. Quels sont les entraîneurs qui sont aussi joueurs ?
db.Sportifs.find(
    {
        "Sports.Jouer" : { "$exists" : true },
        "Sports.Entrainer" : { "$exists" : true }
    },
    {
        "_id": 0,
        "Nom":  1
    }
)

// 10. Quels sont les sportifs qui sont des conseillers ?
db.Sportifs.find(
    {
        "IdSportif": { "$in": db.Sportifs.distinct("IdSportifConseiller")}
    },
    {
        "_id": 0,
        "Nom":  1
    }
)

// 11. Pour le sportif “Kervadec” quel est le nom de son conseiller ?
db.Sportifs.find(
    {
        "IdSportif": db.Sportifs.find({ "Nom": "KERVADEC" })[0].IdSportifConseiller
    },
    {
        "_id": 0,
        "Sports": 0
    }
)

// 12. Quels entraîneurs entraînent du hand ball et du basket ball ?
db.Sportifs.find(
    {
        "Sports.Entrainer": "Hand ball", 
        "Sports.Entrainer": "Basket ball" 
    },
    {
        "_id": 0,
        "Nom": 1,
        "Sports.Entrainer": 1
    }
)

db.Sportifs.find(
    {
        $and: [
            { "Sports.Entrainer": "Hand ball" }, 
            { "Sports.Entrainer": "Basket ball" }
        ]        
    },
    {
        "_id": 0,
        "Nom": 1,
        "Sports.Entrainer": 1
    }
)

// 13. Quelle est la moyenne d’âge des sportives qui pratiquent du basket ball ?
db.Sportifs.aggregate([
    { $match: { "Sports.Jouer": "Basket ball", "Sexe": { $in: [ "f", "F" ]} }},
    { $group: { "_id": null, "AgeMoyen": { $avg: "$Age" }}}
])

// 14. Quels sont les sportifs les plus jeunes ?
On stocke le résultat de l’aggrégation dans une variable.

var agemin = db.Sportifs.aggregate([ 
    { $group: { _id: null, "agemin": { $min: "$Age" } } } 
]).next();

On cherche les sportifs avec Age = agemin.agemin.

db.Sportifs.find(
    {
        "Age": agemin.agemin
    },
    {
        "_id": 0,
        "Nom": 1,
        "Age": 1
    }
)

// 15. Quels sont les gymnases de “Stains” ou de “Montmorency” qui ont la plus grande surface ?
var grandStains = db.Gymnases.aggregate([
	{ "$match": { "Ville": "STAINS" } },
    { "$group": { "_id": "$Ville", "surfmax": { "$max": "$Surface" }} }
]).next();
var grandMontmorency = db.Gymnases.aggregate([
	{ "$match": { "Ville": "MONTMORENCY" } },
    { "$group": { "_id": "$Ville", "surfmax": { "$max": "$Surface" }} }
]).next();

db.Gymnases.find(
	{ $or: [
		{ Ville: "STAINS", Surface: grandStains["surfmax"] },
		{ Ville: "MONTMORENCY", Surface: grandMontmorency["surfmax"] }
	]},
	{ _id: 0, NomGymnase: 1, Ville: 1, Surface: 1}
)

// 16. Quels entraîneurs n’entraînent que du hand ball ou du basket ball ?
On récupère la liste des sports entraînés.

var sports = db.Sportifs.distinct("Sports.Entrainer");
On fait un filtre pour supprimer le hand et le basket.

var autres = sports.filter(function(s) { return (s != "Hand ball" & s != "Basket ball") });
On cherche ceux qui entraîne l’un ou l’autre, mais pas d’autres sports.

db.Sportifs.find(
    {
        $and: [
            { $or: [
                { "Sports.Entrainer": "Hand ball" },
                { "Sports.Entrainer": "Basket ball" }
            ] },
            { "Sports.Entrainer" : { $nin : autres }}
        ]
    },
    {
        "_id": 0,
        "Nom": 1,
        "Sports.Entrainer": 1
    }
)

// 17. Quels sportifs n’ont pas de conseillers ?
db.Sportifs.find(
    {
        "IdSportifConseiller": { $exists: false }
    },
    {
        "_id": 0,
        "Nom": 1
    }
)

// 18. Pour chaque sportif donner le nombre de sports qu’il arbitre
db.Sportifs.aggregate([
    { $match: { "Sports.Arbitrer": { $exists: true }}},
    { $unwind: "$Sports.Arbitrer"},
    { $group: { _id: "$Nom", "nbArbitrer": { $sum: 1 }}}
])

// 19. Pour chaque gymnase de Stains donner par jour d’ouverture les horaires des premières et dernières séances
db.Gymnases.aggregate([
    { $match: { "Ville": "STAINS" } },
    { $unwind: "$Seances" },
    { $project: { "nom": "$NomGymnase", "jour": { $toLower: "$Seances.Jour" }, "h": "$Seances.Horaire"}},
    { $group: { _id: { "nom": "$nom", "jour": "$jour" }, "debut": { $min: "$h"}, "fin": { $max: "$h" }}}
])

// 20. Pour chaque entraîneurs de hand ball quel est le nombre de séances journalières qu’il assure ?
On récupère la liste des identifiants des entraîneurs de Hand.

var entraineursHand = db.Sportifs.find({ "Sports.Entrainer" : "Hand ball" }, { _id: 0, IdSportif: 1 }).toArray().map(function(e) { return e.IdSportif });

On les utilise pour faire la restriction (avec le $match) dans l’aggrégation.

db.Gymnases.aggregate([
    { $unwind: "$Seances" },
    { $match: { "Seances.IdSportifEntraineur": { $in: entraineursHand }}},
    { $project : { "ent": "$Seances.IdSportifEntraineur", "jour": { $toLower: "$Seances.Jour"}}},
    { $group: { _id: { "entraineur": "$ent", "jour": "$jour"}, nbSeances: { $sum: 1}}}
])

// 21. Quels sont les gymnases ayant plus de 15 séances le mercredi ?
A priori, il n’y en a aucun.

db.Gymnases.aggregate([
    { $unwind: "$Seances" },
    { $match: { "Seances.Jour": { $in: [ "mercredi", "Mercredi" ] }}},
    { $group: { _id: { "nom": "$NomGymnase", "ville": "$Ville" }, "nbMercredi": { $sum: 1 }}},
    { $match: { "nbMercredi": { $gte: 15 }}}
])

// 22. Pour chaque gymnase de Montmorency : quel est le nombre de séances journalières de chaque sport propose ?
A faire pour vous entraîner…

// 23. Dans quels gymnases et quels jours y a t-il au moins 4 séances de volley ball dans la journée ?
A faire pour vous entraîner…

// 24. Combien de séances assurent chaque entraineur ?
db.Gymnases.aggregate([
	{ $unwind: "$Seances" },
	{ $group: { _id: "$Seances.IdSportifEntraineur", nb: { $sum: 1 }}},
	{ $lookup: {
		from: "Sportifs",
		localField: "_id",
		foreignField: "IdSportif",
		as: "Entraineur"
	}},
	{ $project: { _id: 0, nb: 1, Nom: "$Entraineur.Nom" }}
])

ou par Sportifs
db.Sportifs.aggregate([
	{ $project: { "IdSportif": 1, "Nom": 1, _id: 0 }},
	{ $lookup: {
		from: "Gymnases",
		localField: "IdSportif",
		foreignField: "Seances.IdSportifEntraineur",
		as: "Gymnases"
	}},
	{ $match: { "Gymnases": { "$ne": [] }} },
	{ $unwind: "$Gymnases" },
	{ $unwind: "$Gymnases.Seances" },
	{ $match: { "$expr": { "$eq": [ "$IdSportif", "$Gymnases.Seances.IdSportifEntraineur" ]}}},
	{ $group: { _id: "$Nom", nb: { $sum: 1 }}}
])

db.Gymnases.aggregate([
	{ $unwind: "$Seances" },
	{ $lookup: {
		from: "Sportifs",
		localField: "Seances.Libelle",
		foreignField: "Sports.Jouer",
		as: "Entraineur"
	}}
])


// 25. Donner, pour chaque gymnase, la liste des entraîneurs (nom uniquement) qui y ont des séances
db.Gymnases.aggregate([
	{ $unwind: "$Seances" },
	{ $lookup: {
		from: "Sportifs",
		localField: "Seances.IdSportifEntraineur",
		foreignField: "IdSportif",
		as: "Entraineur"
	}},
	{ $group: { 
		_id: { "Nom": "$NomGymnase", "Ville": "$Ville" }, 
		Entraineur: { "$addToSet": "$Entraineur.Nom" }
	}}
])



