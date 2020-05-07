# DU Dataviz | d3.js 

## Base 

### Sélection et modification

Il existe deux fonctions de sélection respectivement d'un élément (`select()`) et de l'ensemble des éléments (`selectAll()`) correspondant à la définition passée en paramètre (sélecteur idem que pour le CSS) :

```js
var selection1 = d3.select("selecteur");
var selection2 = d3.selectAll("selecteur");
```

On a de plus deux fonctions sur l'objet renvoyé par ces sélecteurs pour connaître la taille de la sélection :

- `size()` : taille de la sélection
- `empty()` : sélection vide ou non


<script>
var H1 = d3.select("h1");
console.log(H1);
    
var mesLI = d3.selectAll("li");
console.log(mesLI);
</script>