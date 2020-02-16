import testikayttajaImg from "../img/testikayttaja.png";
import scpPageImg from "../img/scp-sivusto.png";
import reactPageGif from "../img/react-page.gif";

const a = `

## Huom! a ja b kohdat tehtiin heti tunnin jälkeen joten ne eivät ole enää relevantteja, jätän ne kuitenkin nyt tänne. Nämä olivat siis näkyvillä kotitehtävinä ennen kuin tehtävät päivittyi uusiin.


### a) Laita hankkimallesi virtuaalipalvelimelle mahdollisuus tehdä kotisivuja normaalin käyttäjän oikeuksin

Jotta tämän tehtävän voi tehdä, pitää aluksi hankkia uusi virtuaalipalvelin. Menin (<https://cloud.digitalocean.com/)> sivulle ja kirjauduin sisään. Valitsin create new droplet ja otin halvimman ubuntu 18.04 LTS virtuaalipalvelimen.  
Otin ssh-yhteyden palvelimeen Puttyn avulla, tein updatet komennolla ja latasin apache2 demonin.

\`\`\`shell
$ sudo apt update -y
$ sudo apt install apache2 -y
\`\`\`

Halusin laittaa palomuurin heti kuntoon, jotta yhteydet toimivat myös omalta tietokoneeltani

\`\`\`shell
$ sudo ufw enable
$ sudo ufw status
$ sudo ufw allow 80/tcp
$ sudo ufw status
$ sudo ufw reload
\`\`\`

Loin uuden käyttäjän ja poistin root käyttäjän komennoilla

\`\`\`shell
$ adduser tomas
$ usermod -aG sudo tomas
$ su - tomas
$ sudo userdel root
\`\`\`

Seuraavaksi anoin kaikille käyttäjille oikeudet tehdä nettisivuja omaan kansioon normaalin käyttäjän oikeuksin. Tämä onnistui komennoilla

\`\`\`shell
$ sudo a2enmod userdir
$ sudo service apache2 restart

\`\`\`

Seuraavaksi halusin testata toimiiko konfiguraationi joten loin uuden käyttäjän jolla on normaalit oikeudet ja loin hänelle uuden sivuston

\`\`\`shell
$ sudo adduser testikayttaja
$ su - testikayttaja
$ cd /home/
$ cd testikayttaja/
$ mkdir public_html
$ cat > public_html/index.html << s
Tämä sisältö on tehty normaalin käyttäjän oikeuksin
:)
\`\`\`

Testasin nyt toimiiko kaikki halutusti menemällä selaimellani oikeaan osoitteeseen ja tulos oli odotettu.
![Testikayttajan nettisivu](${testikayttajaImg} "Nettisivu normaalin käyttäjän oikeuksin")



https://www.digitalocean.com/community/tutorials/how-to-create-a-sudo-user-on-ubuntu-quickstart

### b) Tee weppisivuja paikallisella koneellasi ja kopioi ne palvelimelle scp-komennolla

Avasin komentorivin ja tein aluksi yksinkertaisen sivuston. 

\`\`\`shell
$ cat > index.html << stop
This is a amazing website that will be transported to my server with scp command
isn't it incredible how internet works?
stop
\`\`\`

Tämän jälkeen kokeilin siirtää sen scp komennon avulla virtuaalipalvelimen testikayttaja public_html hakemistoon. Tämä ei kuitenkaan onnistunut koska unohdin lisätä ssh yhteyden ufw allow asetuksiin. Onneksi pääsin digitalocean consolilla käyttäjälleni ja siellä ajoin komennon

\`\`\`shell
$ sudo ufw allow ssh
\`\`\`

Nyt oli tiedoston siirron aika. Tämä onnistui seuraavasti

\`\`\`shell
$ scp index.html testikayttaja@64.225.65.180:/home/testikayttaja/public_html
\`\`\`

Kuten seuraavasta kuvasta näkyy, kaikki onnistui halutusti. 

![Sivusto scp komennolla](${scpPageImg} "scp komennolla siirretty sivusto")


### x) Vaikea, vapaaehtoinen vaihtoehtotehtävä Tämä on vain niille parille propellihatulle, jotka halusivat vaikeamman tehtävän. Korvaa muut h4 koti- ja tuntitehtävät. Koodaa ja julkaise uusi tietokantaa hyödyntävä weppipalvelu. Palvelun pitää ratkaista jokin käytännön ongelma, esimerkiksi ilmoittautuminen tapahtumaan, pisteytä tunti, äänestä suosikkia tms. Voit hyödyntää vanhoja koodejasi, kunhan lopputulos on uusi. Voit käyttää mitä vain kehitysalustaa (framework), esimerkiksi LAMP, Flask, Django, Postgre, Mariadb... Muista lisätä raporttiin ruutukaappaukset keskeisestä toiminnallisuudesta.

#### Kurssipisteytys

Lähdin tekemään tunnilla sovellusta kurssin arviointiin liittyen opettajan innoittamana. Sain sovelluksen melkein toimintavalmiiksi ja ainoa mikä puuttui oli jo olemassa olevien kurssien pisteiden lisäys. Sovelluksessa on mahdollista luoda kurssi ja antaa sille pisteitä. Kursseja voi poistella ja olemassa olevalle kurssille voi antaa arvioita.

#### Stack

Tein tämän sovelluksen itselle tutuimmalla stackilla: React, Node ja MongoDB. Kurssien tiedot tallennetaan MongoDB pilveen osoitteessa (<https://www.mongodb.com/)>

#### Toiminta

![React sivu gif](${reactPageGif} "Sivuston toiminta")

### Sources

- http://terokarvinen.com/2020/linux-palvelimet-2020-alkukevat-kurssi-ict4tn021-3010/
- https://www.digitalocean.com/community/tutorials/how-to-create-a-sudo-user-on-ubuntu-quickstart

#### Tomas Kukk 
`;

export default a;
