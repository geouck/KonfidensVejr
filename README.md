# KonfidensVejr

Vejrudsigter med konfidensintervaller – en serverløs PWA uden backend. Al data hentes direkte i browseren fra [DMI Open Data](https://opendata.dmi.dk/) (harmonie_dini_eps_percentiles, ensemble-percentiler). Ingen API-nøgle kræves.

## Kør appen

Da appen bruger service worker og `fetch`, kræver den servering over HTTP(S):

```bash
python3 -m http.server 8080
# åbn http://localhost:8080
```

## Funktioner

- **Byvalg**: hardcoded liste over 26 danske byer med søgning/autofuldførelse.
- **Favoritter**: gemmes i `localStorage`; den primære favorit hentes automatisk ved opstart.
- **Temperatur (fan-chart)**: median (`temperature-2m-50percentile`) med skyggeområde mellem 10. og 90. percentil.
- **Nedbør**: søjler for medianen (`total-precipitation-1h-50percentile`) med linje for 90. percentil ("værste scenarie").
- **Vind**: median (`wind-speed-10m-50percentile`) med skygget område op til 90. percentil.
- **PWA**: manifest + service worker med offline-caching af statiske filer.

## Teknik

- Vanilla JavaScript (ES6+), HTML5, CSS3 – ingen build-step.
- Chart.js 4 via CDN (confidence bands via fill mellem to datasets).
- CoverageJSON: tider i `domain.axes.t.values`, værdier i `ranges["<parameter>"]`. Temperaturer i Kelvin konverteres til °C (−273.15); nedbør i mm (kg/m²); vind i m/s.

## API-eksempel

```
https://opendataapi.dmi.dk/v1/forecastedr/collections/harmonie_dini_eps_percentiles/position
  ?coords=POINT(12.568 55.676)&crs=crs84
  &parameter-name=temperature-2m-50percentile,total-precipitation-1h-50percentile,wind-speed-10m-50percentile
```
