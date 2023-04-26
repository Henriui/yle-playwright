**Omalla koneella testejä ajaaksesi:**

- Cloonaa repositorio omalle koneellesi
- "npm install" terminalaaliin ollessasi kansion "yle-playwright" juuressa
- "npx playwright install" terminaaliin asentaaksesi Playwrightin
- "npm install @axe-core/playwright" terminaaliin asentaaksesi Axe-coren Playwright tuella
- "npx playwright test" terminaaliin ajaaksesi testit
- Testien suorittamisen jälkeen avautuu raportti testeistä oletusselaimeesi uuteen ikkunaan

- Testit vaativat kaksi ajokertaa, jotta kuvakaappauksien tarkistus toimii(ensimmäinen ottaa verrattavat kuvat)
- Tämänkin jälkeen kuvan vertaus saattaa epäonnistua, jos sivun sisältö(mainostettavat ohjelmat, esitettävä ohjelmisto) on päässyt muuttumaan
