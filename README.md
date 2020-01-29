# CYBs internsystem (frontend)

| Master | Test |
| --- | --- |
| [![Build Status](https://travis-ci.org/cybernetisk/internsystem-frontend.svg?branch=master)](https://travis-ci.org/cybernetisk/internsystem-frontend) | [![Build Status](https://travis-ci.org/cybernetisk/internsystem-frontend.svg?branch=test)](https://travis-ci.org/cybernetisk/internsystem-frontend) |

Dette prosjektet er frontend-delen av
https://github.com/cybernetisk/internsystem. Utvidet informasjon er
tilgjengelig i det prosjektet.

## Teknisk oversikt for frontend

* [ReactJS](http://facebook.github.io/react/) i kombinasjon med [react-router](
  https://github.com/ReactTraining/react-router)
* [NuclearJS](https://optimizely.github.io/nuclear-js/) benyttes som [Flux](
  https://facebook.github.io/flux/)-arkitektur/rammeverk
* Kommunikasjon mellom backend og frontend er REST-basert
* Frontend bygges med Webpack

## Sette opp utviklingsversjon

```bash
npm install
npm run dev
```

http://localhost:3000/

API-adressen til backend kan overstyres ved å kopiere `env.template.js` til
`env.override.js` og redigere innholdet.

### Kobling mot backend

Som standard vil den bruke backend på samme hostname som devserveren
men på port 8000. Når man lager produksjonsversjon brukes imidlertid
samme hostname og port. Dette kan evt. endres i `webpack.config.js`.

Når man tester denne frontend-delen må man husk å ha en fungere
backend som tilbyr data. Ved å følge README i backend oppnår man det.

## Frontend i produksjon

Frontend er bare statiske filer. Se `.travis.yml` og `scripts/deploy.sh`
for hvordan dette blir satt i produksjon. Frontend settes i produksjon
automatisk ved push til master.

Se flere detaljer om produksjonsmiljøet i
http://github.com/cybernetisk/internsystem

# Anbefalt lesing for frontendutvikling i X-gruppa

## [MDN Developer Network (Intro til Webutvikling)](https://developer.mozilla.org/en-US/docs/Learn)

Dette er et introduksjonskurs inn i generell webutvikling.
De har gode introduksjoner til HTML, CSS og Javascript.

I tillegg til å være en god ressurs for å komme seg i gang med å lage eller jobbe på nettapplikasjoner, er dette DEN BESTE ressursen for dokumentasjon på hvordan nettlesere og JS funker.

## [Web Demystified (Forklaring om grunnleggende web-konsepter)](https://www.youtube.com/watch?v=uE3UPEK26U0&list=PLo3w8EB99pqLEopnunz-dOOBJ8t-Wgt2g&index=6)

Denne Youtube-serien produsert av Mozilla gir en grunnleggende forståelse rundt konseptene for hvordan en nettleser funker. Det kan være en svært hjelpsom baseline for hvem som helst som skal utvikle i det miljøet.

## [Intro til HTTP (MDN Guide)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) 

Et overblikk av HTTP (HyperText Transfer Protocol). Det er ikke nødvendig å vite alt om protokollen, bare hvordan datamaskiner spør om og mottar informasjon, så vel som forskjellen mellom en **GET**- og en **POST**-request.

## [Fetching data from the server (MDN Guide)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)

En forklaring av hvordan man kan hente data fra en backend i bakgrunnen.
I effekt er det flere måter man kan gjøre dette, men dette er en god forklaring på hvordan man henter data generelt. 

## [Working with JSON (MDN Guide)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

Når vi henter data fra et API, pleier vi både å sende og motta data i et JSON-format. Denne guiden gir litt bakgrunn i hvordan man behandler JSON data og hvordan det funker.

## [React](https://reactjs.org/)

Reacts egen nettside har noen gode forklaringer på hvordan React funker og hvorfor det funker slik det gjør. Hovedpoenget er at at man kan lett gjenbruke all koden man har skrivet overalt på siden, fordi alt er delt opp i **komponenter**.

## [NuclearJS](https://optimizely.github.io/nuclear-js/)

I CYBs internsystem bruker vil NuclearJS til å håndtere tilstand.
Å holde klar oversikt over når vi endrer på tilstanden av en webapplikasjon er noe som har blitt vanlig av nødvendighet etter som webutviklere har opplevd igjen og igjen at det er umulig vanskelig å holde kontinuitet over hele siden når man endrer på tilstandsvariabler på måfå.

Det er viktig å nevne at React har sin egen måte å håndtere tilstand.
Denne erstatter vi med NuclearJS sine metoder.

## [Intro til funkjonell programmering i Javascript](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)

Mye av den underliggende teorien bak NuclearJS, React og Javascript selv kommer fra konsepter i funksjonell programmering. Det er en annen måte å kode på som blant annet sier at:

* man **ikke** endrer på variabler etter at de er skapt
* funksjoner gjør ingenting bortsett fra å ta inn en input og returnere samsvarende output.
* funksjoner brukes som argumenter i andre funksjoner (høyere ordens funksjoner)

Det tar litt tid å bli vant til, men det løser veldig mange problemer og kan lære deg å skrive bedre kode.

## [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

Typescript er en utvidelse av språket Javascript. Det man skriver i TS blir kompilert ned til JS før det blir kjørt. Det gir Javascript typesikkerhet, slik som Java har.

I CYB bruker vi dette for å holde koden mer oversiktlig. Typescript har også veldig god integrasjon mot React.
