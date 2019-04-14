# Autojen tietokanta 

Backend on tehty ```Node.js``` ja ```Express``` -kombinaatiolla.
Tietokantana toimii ```MongoDB``` -tietokanta ja ```Node.js``` käyttää siihen hyväkseen Javascriptin kirjastoa **```mongoose```**.


# Käyttö

Tarvitset MongoDB -tietokannan pyörimään päälle.

Kun lataat backend -hakemiston, aloita komennolla ```npm install```, joka lataa sinulle tarvittavat kirjastot backendin pyörittämisen.

Tämän jälkeen voit laittaa backendin käyntiin komennolla ```npm start```.

# Postman

Käytämme Postman -sovellusta HTTP-kyselyiden lähettämiseen. Aloita ```POST``` -komennolla ```http://localhost:3000/car/insertcars```, joka luo muutaman auton tietokantaan.

## Lisää uusi auto

Route: ```http://localhost:3000/car/addcar```

Anna POST-kyselyssä bodyyn auton kaikki tiedot (JSON-muodossa) esim.

```JSON
{
    "name" : "Alfa Romeo",
    "model" : "156",
    "plateNumber" : "EFF-F3F",
    "releaseYear" : 2002,
    "checkupDate" : "2019-12-09",
    "engineSize" : "2.0",
    "enginePower" : "16V (180Hp)",
}
```

## Poista auto

Route: ```http://localhost:3000/car/deletecar```

Anna DELETE-kyselyssä bodyyn auton rekisterinumero (JSON-muodossa) esim.

```JSON
{
    "plateNumber": "EFF-F3F
}
```
  
## Muokkaa autoa

Route: ```http://localhost:3000/car/modifycar/:platenumber```

Anna PUT-kyselyssä parameterina auton rekisterinumero. Anna bodyssa kaikki auton tiedot ja muokkaa niitä kohtia mitä haluat tietokannan päivittävän. 


```JSON
{
    "name" : "Alfa Romeo Päivitys",
    "model" : "156651",
    "plateNumber" : "BFF-F3F",
    "releaseYear" : 2008,
    "checkupDate" : "2020-01-09",
    "engineSize" : "2.0",
    "enginePower" : "16V (180Hp)",
}
```

## Hae auto rekisterinumeron mukaan

Route: ```http://localhost:3000/car/getcar/:platenumber```

Anna GET-kyselyssä parametriin auton rekisterinumero, esim. ```http://localhost:3000/car/getcar/:GTF-29F``` 


## Hae autoja filtteröinnin mukaan

Route: ```http://localhost:3000/car/carlist/:min?/:max?/:name?/:model?```

GET-kysely. Jos haluat hakea kaikki autot, älä anna parametreja ollenkaan. 

**Parametrit:**

```name``` : Auton nimi

```model``` : Auton malli

```min``` : Auton vuosimalli minimi

```max``` : Auton vuosimalli maksimi

Esimerkki. ```http://localhost:3000/car/carlist/alfa Romeo/null/1990/1995```, joka palauttaa:

```JSON
[
    {
        "_id": "5cb2fe756dd858388038fe1b",
        "name": "Alfa Romeo",
        "model": "Alfa Romeo",
        "plateNumber": "EFQ-83F",
        "releaseYear": 1994,
        "checkupDate": "2019-12-09T00:00:00.000Z",
        "engineSize": "2.5",
        "enginePower": "24V (320Hp)",
        "__v": 0
    },
    {
        "_id": "5cb2fe756dd858388038fe1c",
        "name": "Alfa Romeo",
        "model": "158",
        "plateNumber": "EFG-83F",
        "releaseYear": 1994,
        "checkupDate": "2019-12-09T00:00:00.000Z",
        "engineSize": "2.1",
        "enginePower": "24V (320Hp)",
        "__v": 0
    }
]
```