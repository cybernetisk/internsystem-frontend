# CYBs internsystem (frontend)

| Master | Test |
| --- | --- |
| [![Build Status](https://travis-ci.org/cybrairai/internsystem-frontend.svg?branch=master)](https://travis-ci.org/cybrairai/internsystem-frontend) | [![Build Status](https://travis-ci.org/cybrairai/internsystem-frontend.svg?branch=test)](https://travis-ci.org/cybrairai/internsystem-frontend) |

Dette prosjektet er frontend-delen av https://github.com/cybrairai/internsystem. Utvidet informasjon er tilgjengelig i det prosjektet.

## Teknisk oversikt for frontend
* [ReactJS](http://facebook.github.io/react/) i kombinasjon med [react-router](https://github.com/rackt/react-router)
* [NuclearJS](https://optimizely.github.io/nuclear-js/) benyttes som [Flux](https://facebook.github.io/flux/)-arkitektur/rammeverk
* Kommunikasjon mellom backend og frontend er REST-basert
* Frontend bygges med Webpack og Gulp

## Sette opp utviklingsversjon
Som krav må NPM være installert på systemet. I tillegg må NPM-pakken `gulp` være installert globalt. Dette kan settes opp slik:

```bash
sudo apt-get install npm
npm install -g gulp # mulig dette må gjøres med sudo hvis kommandoen feiler
```

Deretter kan vi installere NPM-pakkene vi trenger lokalt:

```bash
npm install
```

Det er tre ulike måter å bygge applikasjonen på:

```bash
gulp # kjør server med automatisk kompilering av koden, med debugging og dev-versjon
# åpne http://localhost:3000/webpack-dev-server/ i nettleseren
```

```bash
# eller:
gulp build-dev # samme som over, men kompilerer ikke på nytt, og kjører ikke server
```

```bash
# eller:
gulp build # bygger produksjonsversjonen

```

API-adressen til backend kan overstyres via environment variabel slik:
```bash
BACKEND_URL="https://internt.cyb.no/" gulp
```

### Kobling mot backend
Som standard vil den bruke backend på samme hostname som devserveren men på port 8000. Når man lager produksjonsversjon brukes imidlertid samme hostname og port. Dette kan evt. endres i `webpack.config.js` og `webpack.dist.config.js`. Se også `gulpfile.js` for relevante adresser.

Når man tester denne frontend-delen må man husk å ha en fungere backend som tilbyr data. Ved å følge README i backend oppnår man det.

## Frontend i produksjon
Frontend er bare statiske filer. Se `.travis.yml` og `scripts/deploy.sh` for hvordan dette blir satt i produksjon. Frontend settes i produksjon automatisk ved push til master.

Se flere detaljer om produksjonsmiljøet i http://github.com/cybrairai/internsystem
