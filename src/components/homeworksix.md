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

### b) Laita tietokantaohjelmasi toimimaan mod_wsgi:n kanssa.

Päivitetään ohjelmaa mod_wsgin pariin. Suoritetaan sama komento kuten viime kotitehtävässä ja kopioidaan päivitetyt tiedostot palvelimelle. Tämä onnistuu seuraavasti

```shell
$ scp -r frisbee-kierrokset/ tomas@178.62.58.26:/home/tomaswsgi/public_wsgi
tomas@178.62.58.26s password:
index.py                                                                                                                                                100% 1149    20.5KB/s   00:00
db.cpython-36.pyc                                                                                                                                       100%  328     6.3KB/s   00:00
models.cpython-36.pyc                                                                                                                                   100%  452     9.6KB/s   00:00
db.py                                                                                                                                                   100%  108     2.0KB/s   00:00
models.py                                                                                                                                               100%  214     4.0KB/s   00:00
index.html                                                                                                                                              100% 1937    37.9KB/s   00:00
homeworkfive.md                                                                                                                                         100% 6799
```

Tämän jälkeen ohjelma näytti internal server erroria osoitteessa frisbee.kukkto.com/rounds. Menin lukemaan apachen error logeja ja näin seuraavan ongelman:

```apache
[Tue Mar 10 06:48:34.638539 2020] [wsgi:error] [pid 14762:tid 139983967155968] [remote 84.248.213.138:36612] mongoengine.errors.FieldDoesNotExist: The fields "{'course'}" do not exist on the document "Round"
```

Ymmärsin heti ongelman johtuvan siitä, että ohjelma pyörii vielä vanhalla koodilla, mutta data on muuttunut tietokannassa. Päivitin ohjelman toiminnan komennolla

```shell
$ touch tomas.wsgi
```

Tämän jälkeen sain edelleen internal server erroria joten meni lukemaan logeja vielä uudelleen. Huomasin muutaman häiritsevän kohdan:

```apache
[Tue Mar 10 06:50:08.249319 2020] [wsgi:error] [pid 15672:tid 139983933585152] [remote 84.248.213.138:36642]     from index import app as application
[Tue Mar 10 06:50:08.249328 2020] [wsgi:error] [pid 15672:tid 139983933585152] [remote 84.248.213.138:36642]   File "/home/tomaswsgi/public_wsgi/index.py", line 47, in <module>
[Tue Mar 10 06:50:08.249346 2020] [wsgi:error] [pid 15672:tid 139983933585152] [remote 84.248.213.138:36642]     app.run(debug=True)
```

Olin unohtanut poistaa app.run komennon koodin lopusta. Poistin tämän ja kokeilin vielä kerran käynnistää ohjelman uudelleen aiemmalla komennolla. Tämän jälkeen sivusto toimi halutusti.
