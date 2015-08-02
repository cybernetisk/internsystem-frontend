# CYBs internsystem (frontend)
Dette prosjektet er frontend-delen av https://github.com/cybrairai/internsystem. Utvidet informasjon er tilgjengelig i det prosjektet.

## Teknisk oversikt for frontend
* AngularJS i kombinasjon med ReactJS brukes i frontend
* Faser ut AngularJS - tester ut NuclearJS
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

### Kobling mot backend
TODO

## Frontend i produksjon
Frontend er bare statiske filer. Se `.travis.yml` og `scripts/deploy.sh` for hvordan dette blir satt i produksjon. Frontend settes i produksjon automatisk ved push til master.

Se flere detaljer i http://github.com/cybrairai/internsystem