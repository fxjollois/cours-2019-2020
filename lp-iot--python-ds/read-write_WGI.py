# Lecture des données
WGI_raw = pandas.read_csv("WGI_Data.csv", sep=",")
# Tranformation en réel des valeurs 
WGI_raw["Value"] = [None if v == ".." else float(v) for v in WGI_raw["Value"]]
# Création d'un autre data frame avec noms de variables sans espace (et plus courts)
defcols = pandas.DataFrame(data = {
    "Code" : ['CC.EST', 'GE.EST', 'PV.EST', 'RQ.EST', 'RL.EST', 'VA.EST'],
    "Serie": ['CorruptionControl', 'GovEffectiveness', 'PoliticalStability', 'RegulatoryQuality', 'RuleLaw',  'VoiceAccountability']
})
# Jointure des 2 tables
WGI_raw = WGI_raw.merge(defcols, left_on = "Series Code", right_on = "Code")
# récupération des continents
Continent = pandas.read_csv("country-and-continent-codes-list.csv", sep = ",")
Continent = Continent.drop(columns = ["Continent_Code", "Two_Letter_Country_Code", "Country_Number"])
# Filtres sur des pays à cheval entre Europe et Asie
Continent = Continent.query("not(Three_Letter_Country_Code.isin(['ARM', 'CYP', 'AZE', 'TUR', 'KAZ', 'GEO', 'RUS']) & Continent_Name == 'Asia')")
WGI_raw = WGI_raw.merge(Continent, how = 'left', left_on = "Country Code", right_on = "Three_Letter_Country_Code")
# Modification de la forme de la table
WGI = pandas.pivot_table(WGI_raw.reset_index(), index = ['Country Name', "Continent_Name"], columns = "Serie", values = "Value")

WGI = WGI.reset_index()
print(WGI)