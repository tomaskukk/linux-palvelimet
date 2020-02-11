import apacheImg from "../img/hello-gb.png";
import logImg from "../img/getlog.png";
import apacheErrorLogImg from "../img/errorlogflask.png";
import curlWebpageImg from "../img/flask-templates.png";
import helloWorldImg from "../img/flask.png";
import sqlImg from "../img/sql-test.png";
import modWsgiHelloWorldImg from "../img/hello-wsgi.png";
import wsgiPostgresFlaskImg from "../img/wsgi-flask-postgres.png";

const t = `
# Deploying Flask application using postgres with mod_wsgi

## a) Asenna Apache, laita käyttäjien kotisivut (http://example.com/~tero) toimimaan. Testaa esimerkkikotisivulla

Seurasin sivuston (<http://terokarvinen.com/2008/install-apache-web-server-on-ubuntu-4)> ohjeita apache2 asennuksessa.
Seuraavassa komennot jolla sain kaiken toimimaan ja kuva joka näyttää tuloksen:

\`\`\`shell
$ sudo apt update -y
$ sudo apt install -y apache2
$ sudo a2enmod userdir
$ sudo service apache2 restart
$ cd /home/tomas
$ mkdir public_html
$ cat > index.html << stop
Hello from GB!  
stop
\`\`\`




![Image of website](${apacheImg} "Hello from GB")

## b) Surffaa oman palvelimesi weppisivuja. Etsi Apachen lokista esimerkkionnistuneesta (200 ok) sivulatauksesta ja epäonnistuneesta (esim 404 not found) sivulatauksesta. Analysoi rivit

Aluksi menin palvelimen käyttäjän hakemistoon URI:lla (<http://178.62.58.26/~tomas)> jonka kautta ja sain näkyviini käyttäjän kotisivun. Tämän jälkeen kokeilin mennä jollekkin muulle URI päätteelle, tässä tapauksessa (<http://178.62.58.26/404shouldntwork>)  
Sitten siirsin logista 10 viimeistä riviä kotikoneelleni ajamalla komennon  

\`\`\`
scp tomas@</ip\>:/home/tomas/access-apache.log ./Desktop/linuxpalvelimet/src/random. 
\`\`\`

Logista löytyy http GET pyyntö osoitteeseen /~tomas (kuva) Lisäksi logista näkee mistä ip-osoitteesta pyyntö lähetettiin, milloin ja millä selaimella. Logista löytyy myös pyyntö, joka palautti 404 errorin (kuva) Tällä kertaa pyyntöön http GET pyyntöön vastattiin statuskoodilla 404, sillä ei löytynyt mitään sivua joka olisi tuon URI päätteen takana.

![Logs](${logImg} "HTTP Logs")

## c) Tee virhe weppipalvelimella ajettavaan koodiin (esim PHP tai Python), etsi se lokista ja analysoi tuo lokirivi

L kohtaa tehdessä tein myös tämän ikään kuin vahingossa. Python koodissani kirjoitin return:in sijaan retur yhteen kohtaa, kun editoin sitä nanolla, joten python-ohjelma ei compilannut halutusti. Tämä aiheutti apachen error.logiin virheviestin joka näyttää seuraavalta. 

![Error logs](${apacheErrorLogImg} "Error in source code")

Tämä tapahtuu vasta siinä vaiheessa kuin koitan mennä URI:iin jossa python ohjelmani sijaitsee: Alimmalta tasolta näämme mistä errori tuli ja SyntaxErroriahan se näyttää. Korjasin syntaksivirheen ja kaikki toimi tämän jälkeen halutusti.

## k) Kokeile jotain Flaskin uutta ominaisuutta flask-testipalvelimessa. Voit kokeilla esim. muotteja (templates), tietokantaa tai syötteiden ottamista lomakkeilta (forms)

Halusin kokeilla Flaskin templateja käytännössä. Seurasin tässä tehtävässä (<https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-ii-templates)> ohjetta pitkälti.  
Aluksi loin uuden virtuaaliympäristön jossa ajan Pythonia komennolla python -m venv venv. Sitten loin tarvittavat hakemistot ja latasin flaskin komennolla pip install Flask.  
Ennen tätä olin mennyt virtuaaliympäristöön komennolla source venv/bin/activate. Tämän jälkeen loin tarvittavat tiedostot ja asetin ympäristömuuttujan FLASK_APP=app.py, jonka jälkeen voin ajaa ohjelmaa komennolla flask run.  

#### routes.py

\`\`\`python
from flask import render_template
from app import app

@app.route('/')
@app.route('/index')
def index():
    user = {'username': 'Tomas'}
    return render_template('index.html', title='Home for', user=user)
\`\`\`

#### index.html

\`\`\`html
<html>
    <head>
        <title>{{ title }} - mod_wsgi flask app</title>
    </head>
    <body>
        <h1>Hello, {{ user.username }}!</h1>
    </body>
</html>
\`\`\`

Ajoin ohjelman ja ajoin komennon curl localhost:5000 joka palautti seuraavan kuvan 

![Curl webpage](${curlWebpageImg} "Result of curling the webpage")

## l) Asenna Python Flask + PostgreSQL + Apache mod WSGI. Testaa kunkin komponentin toiminta. Testaa lopuksi kokonaisuus. (vaikea)

Tämän tehtävän dokumentaatiosta tulisi hyvin pitkä, jos näyttäisin jokaisen
asennusohjeen erikseen. Tämän takia laitan linkit näkyviin mitä ohjeita
seurasin itse asentaessa näitä ohjelmia:

- [Flask](https://linuxize.com/post/how-to-install-flask-on-ubuntu-18-04/)
- [Postgres](https://www.digitalocean.com/community/tutorialshow-to-install-anduse-postgresql-on-ubuntu-18-04)
- [Mod_wsgi](https://devops.ionos.com/tutorials/install-and-configure-mod_wsgion-ubuntu-1604-1/)

Asentamisien jälkeen oli aika testata jokaista ohjelmaa yksitellen, ennen
kokonaisuuden testaamista.

### Flask

Tein Flaskille virtuaaliympäristön komennolla python -m venv venv ja hyppäsin
virtuaaliympäristöön source venv/bin/activate. Tämän jälkeen asensin Flaskin
pip install Flask. Sitten tein yksinkertaisin hello world sovelluksen Flaskilla

#### hello.py

\`\`\`python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
  return 'Hello world!'
\`\`\`

Asetin ympäristömuuttujan FLASK_APP=hello.py ja ajoin komennolla flask run.
Toisessa terminaalissa tein curl localhost:5000 ja sain vastauksen (kuva):

![Hello world](${helloWorldImg} "Hello world webpage")

### Postgres

Asennuksen jälkeen loin uuden
käyttäjän ubuntussa komennolla adduser tomas. Sitten menin käyttäjälleni sudo
su tomas ja menin postgresiin psql. Postgresissa tein taulun ja asetin sinne
tietoa seuraavilla komennoilla

\`\`\`sql
CREATE TABLE linuxKurssi (
equip_id serial PRIMARY KEY,
type varchar (50) NOT NULL);

INSERT INTO linuxkurssi (type, install_date) VALUES ('Kotitehtava 1');
\`\`\`

Sitten katsoin toimiko yllä olevat komennot ja ajoin SELECT * FROM linuxkurssi
ja sain vastaukseksi kuvassa näkyvät tulokset. (Huom otin kuvakaappauksen myöhemmin jolloin tietokannassa oli jo muutakin sisältöä):

![SQL](${sqlImg} "Result from sql query")

### Mod_wsgi

Menin kansioon /var/www ja loin uuden
kansion flask. Kansiossa flask tein uuden virtuaaliympäristön samalla tavalla kun
ensimmäisessä kohdassa. Sitten loin tiedostot hello.py, --init--.py, manage.py,
models.py ja hello.wsgi. Hello.py:ssa oli melkein samat sisällöt kuin ensimmäisessä
osiossa:

#### hello.py

\`\`\`python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
  return "Hello modwsgi"

if __name__ == "__main__":
  app.run()
  \`\`\`

--init--.py on tyhjä tiedosto joka tarvitaan, jotta ohjelma toimii
mod-wsgi:n kanssa. hello.wsgi on konfigurointitiedosto mod-wsgille ja sen
sisältö on:

#### hello.wsgi

\`\`\`shell
#! /usr/bin/python3.6
import logging
import sys
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, '/var/www/flask/')
from hello import app as application
\`\`\`

Ylhäällä on shebang jossa määriteltynä mitä cli:tä pitää käyttää. Sitten on
mod_wsgi:n asetukset jotka sain osoitteesta (<https://blog.ekbana.com/deployingflask-application-using-mod-wsgi-bdf59174a389)>

Sitten oli aika luoda apacheen .conf tiedosto, joka kertoo, miten sivustoa kuuluu
näyttää ja käyttää. Tämä tehtiin komennolla nano /etc/apache2/sitesavailaible/helloFlask.conf ja sisällöksi tuli:

#### helloFlask.conf

\`\`\`apache
<VirtualHost *:80>
  # Add machine's IP address (use ifconfig command)
  ServerName 178.62.58.26
  # Give an alias to to start your website url with
  WSGIDaemonProcess flaskApp python-home=/var/www/flask/venv
  WSGIProcessGroup flaskApp
  WSGIScriptAlias /testFlask /var/www/flask/hello.wsgi
  <Directory /var/www/flask/>
    Options FollowSymLinks
    AllowOverride None
    Require all granted
  </Directory>
  ErrorLog \${APACHE_LOG_DIR}/error.log
  LogLevel warn
  CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
\`\`\`

Sisällössä on määritelty ServerNameksi oman palvelimeni ip-osoite. Tämän
lisäksi Daemonprocess python-home, joka kertoo mistä löytyy python-moduulit kun
käyttää virtuaaliympäristöä. ScriptAlias kertoo minkä URI:n takaa sivusto löytyy
ja Directoryssa on määritelty säännöt, ketkä pääsevät sivustolle. Tässä
tapauksessa kaikilla on pääsy sivustolle. Sitten piti vielä kertoa apachelle, että
se saa näyttää tätä sivustoa komennolla sudo a2ensite /etc/apache2/sitesavailable/helloFlask.conf. Vielä piti käynnistää apache2 uudelleen ja voila!
Osoitteesta 178.62.58.26/testFlask löytyi nyt (kuva).

![Hello world mod_wsgi](${modWsgiHelloWorldImg} "Result from mod_wsgi app")

### Kokonaisuus

Kokonaisuuden testaamisessa toimii yllä tehdyt konfiguraatiot pienillä lisäyksillä.
Vielä piti saada aikaiseksi Flaskin avulla postgresista tiedon haku ja sen
näyttäminen nettisivulla. Tämän tein seuraten netistä monia eri lähteitä ja
hyödyntämällä Flask templateja.
Latasin tarvittavat riippuvuudet virtuaaliympäristössä komennolla pip install
psycopg2 Flask-SQLAlchemy Flask-Migrate. Loin tarvittavat tiedostot ja niiden
tiedostosisällöt, jotta postgresin käyttö onnistui. Tein myös templaten joka hoiti
postgres sisällön renderöinnin nettisivulle. Lopuksi ajoin vielä service apache2
restart ja ohjelma toimi halutusti.

![Wsgi Flask Postgres](${wsgiPostgresFlaskImg} "Working Flask app with postgres and mod_wsgi")


[Lopulliset tiedostot](http://178.62.58.26/~tomas/flask)

### Sources

- https://linuxize.com/post/how-to-install-flask-on-ubuntu-18-04/
- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04
- https://devops.ionos.com/tutorials/install-and-configure-mod_wsgi-on-ubuntu-1604-1/
- https://www.codementor.io/@abhishake/minimal-apache-configuration-for-deploying-a-flask-app-ubuntu-18-04-phu50a7ft
- https://serverfault.com/questions/869066/django-with-apache-and-mod-wsgi-no-system-log-unless-setting-debug-true
- https://medium.com/@dushan14/create-a-web-application-with-python-flask-postgresql-and-deploy-on-heroku-243d548335cc
- https://kristerholmstrom.wordpress.com/2017/10/03/python-flask-and-postgresql/
- https://realpython.com/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/
- https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-ii-templates
- https://blog.theodo.com/2017/03/developping-a-flask-web-app-with-a-postresql-database-making-all-the-possible-errors/

#### Tomas Kukk 
`;
export default t;
