import helloFrisbee from "../img/hello-frisbee.png";
import apacheCurl from "../img/curl-apache.png";
import frisbeeKukkto from "../img/frisbee-working.png";

const a = `
## x) Propellivaihtoehto, vapaaehtoinen, korvaa muut kohdat. Julkaise hyödyllinen Flask-ohjelma, joka käyttää tietokantaa ja lomakkeita. Hyöty voi olla pienikin, mutta ohjelman tulee tehdä jotain järkevää. (OK: äänestä paras kissankuva, ilmoittaudu arpajaisiin, nallekarhujen lainausjärjestelmä. Ei käy: lue esimerkkitietueita foo ja bar tietokannasta.) Hauskaa koodailua!

Sain idean tallettaa frisbeegolf-kierroksiani tietokantaan ja näyttämään ne sivulla. Aloitin tämän projektin ja sen dokumentaation kirjoittamisen klo 10.00

### Stack

Halusin rakentaa tämän sovelluksen Flaskilla, MongoDB:llä ja flask templateilla.

### Alkuhetket

Aluksi latasin omalle ubuntulleni Flaskin apt-get:in avulla seuraavilla komennoilla:

\`\`\`shell
$ sudo apt update -y
$ sudo apt install -y python3-flask
\`\`\`

Tämän jälkeen testasin Flaskin toimintaa yksinkertaisella hello world tyyppisellä tiedostolla.

\`\`\`python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
	return "Frisbee hello\n"

app.run(debug=True)
\`\`\`

Sovellus toimi halutusti kuten seuraavasta kuvasta nähdään.

![Hello world with Flask](${helloFrisbee} "Flaskilla tehty hello world")

## Sovelluksen julkaisu

Yllätyksenä itselle sovelluksen tekemisessä ei tullut paljoa mutkia matkaan ja sain sen 1.5h aikana kasaan.
Seuraavana halusin julkaista sen internetiin.

### Apachen asennus

Ensimmäisenä minun piti asentaa apache2 webbi-palvelin joka tarjoaa nettisivuni. Asensin apachen seuraavilla komennoilla:

\`\`\`shell
$ sudo apt update -y
$ sudo apt-get -y install apache2
\`\`\`

Kokeilin toimiiko apache curlaamalla localhostia terminaalissa palvelimen sisällä ja vastaus oli odotettu:

![Apache installing complete](${apacheCurl} "Apache asennus onnistui")

### Käyttäjäoikeudet kuntoon

Seuraavaksi laitoin ḱuntoon käyttäjien oikeudet. Tehdään siis uusi käyttäjä joka toimii sovelluksen omistajana.
Loin uuden käyttäjän ja lukitsin sen, lisäsin myös itseni tämän uuden käyttäjän ryhmään.

\`\`\`shell
$ sudo adduser tomaswsgi
$ sudo usermod --lock tomaswsgi
$ sudo adduser tomas tomaswsgi
Adding user 'tomas' to group 'tomaswsgi' ...
Adding user tomas to group tomaswsgi
Done.
\`\`\`

### Virtualhostin määrittely

Seuraavana oli vuorossa uuden virtualhostin luominen uudelle sovellukselleni. Loin uuden .conf tiedoston apachen sites-available kansioon ja otin sen käyttöön. Otin myös default .conf tiedoston pois käytöstä.

\`\`\`apache
<VirtualHost *:80>
	ServerName frisbee.kukkto.com
	WSGIDaemonProcess tomaswsgi user=tomaswsgi group=tomaswsgi threads=5
	WSGIScriptAlias / /home/tomaswsgi/public_wsgi/tomas.wsgi
	<Directory /home/tomaswsgi/public_wsgi_tomas.wsgi>
		WSGIScriptReloading On
		WSGIProcessGroup tomaswsgi
		WSGIApplicationGroup %{GLOBAL}
		Require all granted
	</Directory>
</VirtualHost>
\`\`\`

\`\`\`shell
$ sudo a2ensite tomaswsgi.conf
$ sudo a2dissite 000-default.conf
$ sudo a2dissite helloFlask.conf
$ sudo apt install -y libapache2-mod-wsgi-py3
$ sudo service apache2 restart
$ apache2ctl configtest
AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 127.0.1.1. Set the 'ServerName' directive globally to suppress this message
Syntax OK
\`\`\`

Kaikki toimi halutusti kuten yllä olevasta viestistä näkee. Jouduin poistamaan kaksi symlinkiä, sillä olin luonut aiemmin helloFlask .conf tiedoston ja käyttänyt sitä myös.

### Sovelluksen luominen kirjastoon

Lisäsin aiemmin itseni tomaswsgi ryhmään, mutta se tulee käyttöön vasta uudelleenkirjautuessa. Tästä syystä kirjauduin ssh:lla käyttäjälleni uudelleen.

Nyt komennolla groups näen odotetun näkymän

\`\`\`shell
$ groups
tomas sudo tomaswsgi
\`\`\`

Seuraavaksi loin kansiot joita tarvitsen ja asetin niiden käyttöoikeudet tomaswsgi ryhmään. Ajoin komennon jolla myös uusien tiedostojen ja kansioiden luonti tulee tomaswsgi ryhmän käyttöoikeuksiin.

\`\`\`shell
$ mkdir public_wsgi
mkdir: cannot create directory ‘public_wsgi’: Permission denied
$ sudo !!
$ sudo chown tomaswsgi:tomaswsgi /home/tomaswsgi/public_wsgi/
$ sudo chmod g=rwxs /home/tomaswsgi/public_wsgi/
$ cd public_wsgi/
$ ls -ld
drwxrwsr-x 2 tomaswsgi tomaswsgi 4096 Feb 28 09:54 .
$ nano tomas.wsgi
\`\`\`

#### Ohjelma toimintaan

Loin tomas.wsgi tiedoston joka toimii apachen ja python ohjelman välissä. 

\`\`\`python
import sys
assert sys.version_info.major >= 3, "Python version too old in tero.wsgi!"

sys.path.insert(0, '/home/tomaswsgi/public_wsgi/')
from hello import app as application
\`\`\`

Kopioin seuraavaksi tiedostot palvelimelleni scp komennolla:

\`\`\`shell
$ scp -r frisbee-kierrokset/ tomas@178.62.58.26:/home/tomaswsgi/public_wsgi
tomas@178.62.58.26's password:
index.py                                              100% 1066    25.8KB/s   00:00
db.cpython-36.pyc                                     100%  328     8.1KB/s   00:00
models.cpython-36.pyc                                 100%  430    10.7KB/s   00:00
db.py                                                 100%  108     2.7KB/s   00:00
models.py                                             100%  171     4.2KB/s   00:00
index.html                                            100% 1139    27.6KB/s   00:00
addround.html                                         100%  299     7.4KB/s   00:00
\`\`\`

Päivitin tiedostoa tomas.wsgi jotta ohjelma päivittyisi ja koitin curlata localhostia. Tämän jälkeen sain kuitenkin error coden 500 internal server error. Menin lukemaan apachen error logeja ja näin seuraavan ilmoituksen

\`\`\`shell
$ tail /var/log/apache2/error.log
[Fri Feb 28 10:22:07.246041 2020] [wsgi:error] [pid 31801:tid 140341661300480] [remote 185.161.209.208:35758] ModuleNotFoundError: No module named 'flask_mongoengine'
\`\`\`

Asensin tarvittavat riippuvuudet pip:illä ja kokeilin uudelleen. Sain tämänkin jälkeen vielä saman ilmoituksen. Koitin ajaa ohjelmaa lokaalisti ja se toimi. Päättelin ongelman johtuvan siitä, apachen ajaessa ohjelma se ei saa käyttöön samoja moduuleita kun itse ajaessa. En halunnut alkaa taistelemaan tämän ongelman kanssa sen enempää, joten menin public_wsgi kansioon ja loin python virtuaaliympärsitön ja asensin siellä riippuvuudet:

\`\`\`shell
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install Flask
$ pip install flask-mongoengine
$ pip install pymongo[srv]
\`\`\`

Jouduin myös lisäämään .conf tiedostoon yhden kohdan joka kertoo mistä python path löytyy. Tämä näkyy seuraavan blockin alimmassa rivissä:

\`\`\`apache
WSGIDaemonProcess 
tomaswsgi 
user=tomaswsgi 
group=tomaswsgi 
threads=5 
+++ python-home=/home/tomaswsgi/public_wsgi/venv +++
\`\`\`

Käynnistin kaiken varalta apachen uudelleen ja ohjelma alkoi toimimaan halutusti. Kävin sivustolla http://frisbee.kukkto.com/rounds ja sain seuraavan näkymän:

![Website complete](${frisbeeKukkto} "Sivuston frisbee.kukkto.com näkymä")

Projekti ja dokumentaatio oli nyt valmis klo 12.33.

### Tomas Kukk

Sources:
http://terokarvinen.com/2020/deploy-python-flask-to-production/
http://docs.mongoengine.org/projects/flask-mongoengine/en/latest/
http://docs.mongoengine.org/guide/connecting.html
https://dev.to/paurakhsharma/flask-rest-api-part-1-using-mongodb-with-flask-3g7d
`;

export default a;
