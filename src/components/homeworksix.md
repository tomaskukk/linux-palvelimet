### a) Tietokanta wepissä. Tee oma yksinkertainen, tietokantaa käyttävä ohjelma. Ohjelmalla tulee olla jokin käyttötarkoitus. Voit tehdä ohjelman muokkaamalla Teron koodia (muista lähdeviite).

Koska olen jo tehnyt kaksi tietokantaa käyttävää Flask ohjelmaa aiemmin tällä kurssilla, teen mielummin uusia ominaisuuksia vanhaan ohjelmaan uuden tekemisen sijaan (http://frisbee.kukkto.com/rounds).

## Kentän valinta

Ensimmäisenä lisäyksenä halusin tehdä toiminnon, jonka avulla voi valita millä kentällä on pelannut. Toteutin tämän select tagilla ja option vaihtoehdoilla. Nyt käyttäjä voi valita radan jossa hän pelasi.

```html
<label>Course: </label>
<select name="course">
  <option value="">Select a course</option>
  <option value="Kivikko">Kivikko (18)</option>
  <option value="Siltamäki">Siltamäki (18)</option>
  <option value="Tali">Tali (18)</option>
  <option value="Käinä">Käina (12)</option>
</select>
```

Jos käyttäjä valitsee kurssin ja tallentaa uuden kierroksen se näyttäytyy sivustolla halutusti:

![Course saving in frisbee site](${saveCourse} "Sivustolle lisättiin radan tallennus")
