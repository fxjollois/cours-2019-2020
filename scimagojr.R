library(readxl)

fichier = dir()

liste = lapply(fichier, function(f) {
  annee = str_split(str_split(f, " ")[[1]][2], "\\.")[[1]][1]
  test = cbind(Year = as.numeric(annee), read_excel(f))
  return(test)
})

res = Reduce(function(a, b) {
  return(rbind(a, b))
}, liste)

library(xlsx)
write.xlsx(res, "../scimagojr.xlsx", sheetName = "All",
           col.names = TRUE, row.names = FALSE, append = FALSE)
