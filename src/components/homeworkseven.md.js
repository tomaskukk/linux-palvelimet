const a = `

### a) Ratkaise valitsemasi vanha arvioitava laboratorioharjoitus tältä kurssilta. (Löytyy DuckDuckGolla tai Googlella sekä linkeistä tältä sivulta)

Alan työstämään ensimmäistä laboratorioharjoitusta joka googlen avulla löytyi. (http://terokarvinen.com/2018/arvioitava-laboratorioharjoitus-linux-palvelimet-ict4tn021-6-torstai-alkukevat-2018-5-op). Ensimmäisenä ohjeena on asentaa linux koneelle. Omalla tietokoneellani on jo linux, mutta en tahdo käyttää sitä sillä minulla saattaa olla jo joitain osia mitä harjoituksessa pitää ladata. Teen siis tämän tehtävän uudelle palvelimelle, jonka vuokrasin digitaloceanista. 

#### Valmistaudu etähallitsemaan konetta

Paras tietämäni tapa on hallita konetta ssh-yhteyden avulla. Koska tämä linux-pohja on digitaloceanista vuokrattu palvelin, on ssh demoni jo oletuksena asennettuna. Testasin sen toimintaa menemälle toiselle palvelimelleni ssh-yhteydellä. Testasin vielä yhteyden toiminnan ls-komennolla joka toimi halutusti.

\`\`\`shell
$ ssh tomas@kukkto.com
tomas@kukkto.coms password:
Welcome to Ubuntu 18.04.4 LTS (GNU/Linux 4.15.0-66-generic x86_64)
tomas@ubuntu-s-1vcpu-1gb-ams3-01:~$
$ ls /home/
Dockerfile  conf   linux-course      linux-palvelimet-backend
bin         flask  linux-palvelimet  tomas
\`\`\`
#### Suojaa kone tulimuurilla

Otin tulimuurin käyttöön ja sallin ssh-yhteyden seuraavasti:

\`\`\`shell
$ sudo ufw enable
[sudo] password for tomas:
Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
Firewall is active and enabled on system startup
tomas@ubuntu-s-1vcpu-1gb-lon1-01:~$ sudo ufw status
Status: active
tomas@ubuntu-s-1vcpu-1gb-lon1-01:~$ sudo ufw allow ssh
Rule added
Rule added (v6)
tomas@ubuntu-s-1vcpu-1gb-lon1-01:~$ sudo ufw status
Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
22/tcp (v6)                ALLOW       Anywhere (v6)
\`\`\`

Kaikki toimi taas halutusti, joten siirryin seuraavaan kohtaan.

#### Asenna LAMP (Linux, Apache, MySQL, PHP) ja testaa sen toiminta

LAMP-stackista linux löytyy jo, joten seuraavaksi olisi Apachen vuoro.

##### Apache2

Lähdin apachen asennukseen päivittämällä aluksi apt paketit ja sitten asensin apachen.

\`\`\`shell
$ sudo apt update -y
$ sudo apt install apache2 -y
\`\`\`
Seuraavaksi kokeilin onnistuiko apachen asennus halutuksi, joten kokeilin curlata localhostia ja katsoin tuloksen.

\`\`\`shell
$ sudo apt install curl -y
$ curl localhost | grep -i title
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
    <title>Apache2 Ubuntu Default Page: It works</title>
100 10918  100 10918    0     0  1066k      0 --:--:-- --:--:-- --:--:-- 1184k
\`\`\`
Oletin asennuksen onnistuneen halutusti, sillä titlessä luki että It works.
#### MySQL

Seuraavaksi oli SQL:n vuoro. Aloitin postgreSQL asennuksella:

\`\`\`shell
$ sudo apt-get install wget ca-certificates
$ wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
$ sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ \`lsb_release -cs\`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
$ sudo apt update -y
$ sudo apt install postgresql postgresql-contrib -y
\`\`\`
Asennus onnistui ja nyt oli sen testauksen aika. Aluksi kirjauduin postgres käyttäjälle ja ajoin psql komennon, jolla pääsen postgres käyttöympäristöön. 

\`\`\`shell
$ sudo su - postgres
$ psql
postgres=#
\`\`\`
Tämä onnistui ja olin nyt postgresin käyttöliittymässä. Seuraavaksi annoin oman käyttäjäni tomas oikeudet käyttää postgresiä:

\`\`\`shell
postgres=# CREATE ROLE tomas WITH LOGIN CREATEDB ENCRYPTED PASSWORD '(Password)';
\`\`\`

Hyppäsin nyt takaisin omalle käyttäjälleni ja testasin postgresin toimintaa:

\`\`\`shell
$ su tomas
$ createdb testdb
$ psql testdb
testdb=> \list
                              List of databases
   Name    |  Owner   | Encoding | Collate |  Ctype  |   Access privileges
-----------+----------+----------+---------+---------+-----------------------
 postgres  | postgres | UTF8     | C.UTF-8 | C.UTF-8 |
 template0 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
 template1 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +
           |          |          |         |         | postgres=CTc/postgres
 testdb    | tomas    | UTF8     | C.UTF-8 | C.UTF-8 |
\`\`\`

Jälleen kerran toiminta oli haluttua. Viimeisenä testinä kokeilin luoda kentän ja hakea kaikki tiedot.

\`\`\`sql
testdb=> CREATE TABLE coffee_brands (
code char(5) CONSTRAINT firstkey PRIMARY KEY,
title varchar(40) NOT NULL,
owner varchar(40) NOT NULL);

testdb=> INSERT INTO coffee_brands VALUES('UA502', 'JuhlaMokka', 'Paulig');
INSERT 0 1
testdb=> INSERT INTO coffee_brands VALUES('AB502', 'Lempä paahto', 'Coffeeroastery');
INSERT 0 1

testdb=> SELECT * FROM coffee_brands;
 code  |    title     |     owner
-------+--------------+----------------
 UA502 | JuhlaMokka   | Paulig
 AB502 | Lempä paahto | Coffeeroastery
(2 rows)
\`\`\`

Loin muutaman testikentän ja hain kaikki tulokset kyseisestä taulusta. Tulos oli haluttu ja näin asettamani tuotteet taulukossa. 

#### PHP

Asensin aluksi PHP:n seuraavalla komennolla:

\`\`\`shell
$ sudo apt install php libapache2-mod-php -y
\`\`\`

Asennus näytti onnistuvan ja seuraavaksi oli sen testaamisen vuoro. Ajattelin testata sen toimintaa luomalla uuden apache virtualhostin ja tekemällä sinne yksinkertaisen php ohjelman. Aloitetaan siis aluksi uuden configuraatiotiedoston tekemisellä, sen käyttöönotolla ja oletusconftiedoston käytöstä poisottamisella.

\`\`\`shell
$ sudo nano /etc/apache2/sites-available/phptest.conf
\`\`\`

Tiedoston sisällöksi tuli:

\`\`\`apache
<VirtualHost *:80
  ServerName phptest.example.com
  ServerAlias www.phptest.example.com
  DocumentRoot /home/tomas/phpTest/example.com/
  <Directory /home/tomas/phpTest/example.com>
    Require all granted
  </Directory>
</VirtualHost>
\`\`\`

Nyt oli konfiguraation käyttöönoton aika ja defaultin poisto käytöstä.

\`\`\`shell
$ sudo nano /etc/apache2/sites-available/phptest.conf
$ sudo a2ensite phptest.conf
Enabling site phptest.
To activate the new configuration, you need to run:
  systemctl reload apache2
tomas@ubuntu-s-1vcpu-1gb-lon1-01:~$ sudo a2dissite 000-default.conf
Site 000-default disabled.
\`\`\`

Kokeilin oliko tiedostossa syntaksivirheitä seuraavalla komennolla:

\`\`\`shell
$ sudo apachectl configtest
AH00526: Syntax error on line 1 of /etc/apache2/sites-enabled/phptest.conf:
<VirtualHost> directive missing closing '>'
\`\`\`

Sieltä puuttui yksi sulkeva kulmasulku, lisäsin sen ja käynnistin apachen uudelleen.

\`\`\`shell
$ sudo systemctl restart apache2
\`\`\`

Loin seuraavaksi index.php tiedoston siihen kansioon jonka äsken määrittelin apachen configuraatiotiedostoon. Tämän tiedoston sisällöksi tuli:

\`\`\`php
<?php
print("5 * 100 = " . (5 * 100))
?>
\`\`\`

Seuraavana curlasin localhostia ja katsoin minkä vastauksen saan:

\`\`\`shell
$ curl localhost
5 * 100 = 500
\`\`\`

PHP toimii! LAMP on nyt käytössä ja kaikki osaset näyttivät toimivan oikein.

### Kuormitustietojen seuraaminen

Tehtävänä on kerätä kuormitustietoja tehtävän ajalta. Ladataan sysstat ohjelma joa seuraa kuormitusta. 

\`\`\`shell
$ sudo apt install sysstat -y
\`\`\`

Muokkasin tiedostoa github documentaation mukaan siten, että tietojen kerääminen on mahdollista. 

\`\`\`shell
$ sudoedit /etc/default/sysstat
\`\`\`

Vaihdoin tiedostossa kohdan "false" --> "true", jolloin se seuraa tietojani. Käynnistin vielä ohjelman uudelleen komennolla:

\`\`\`shell
$ sudo systemctl restart sysstat
\`\`\`

Kaikki tehtävät oli tehty ja nyt oli kuormitustietojen katsomis vuoro!

Kuormitustietojen katsominen onnistui komennolla:

\`\`\`shell
$ sar
Linux 4.15.0-66-generic (ubuntu-s-1vcpu-1gb-lon1-01)    03/15/20        _x86_64_        (1 CPU)

13:26:55     LINUX RESTART      (1 CPU)

13:35:01        CPU     %user     %nice   %system   %iowait    %steal     %idle
13:45:01        all      0.15      0.00      0.14      0.04      0.00     99.67
13:55:01        all      0.11      0.00      0.10      0.03      0.00     99.76
14:05:01        all      0.18      0.00      0.13      0.04      0.00     99.65
14:15:01        all      0.70      0.15      0.39      0.08      0.00     98.68
14:25:01        all      0.32      0.00      0.30      0.03      0.00     99.35
14:35:01        all      0.31      0.00      0.22      0.04      0.00     99.43
14:45:01        all      0.51      0.16      0.34      0.14      0.00     98.84
14:55:01        all      0.42      0.16      0.21      0.06      0.00     99.15
15:05:01        all      0.30      0.16      0.16      0.09      0.00     99.29
15:15:01        all      0.15      0.00      0.14      0.05      0.00     99.65
15:25:01        all      0.11      0.00      0.12      0.04      0.00     99.73
Average:        all      0.30      0.06      0.20      0.06      0.00     99.38
\`\`\`

Tietojen keräys kesti noin kaksi tuntia tarkalleen ja näyttää siltä että suurin osa ajasta meni idlellä. 

### Sorkka ja Rauta Oy:n CRM

#### Tarvitsemme asiakastietokannan. Tee tietokanta, jossa on seuraavat asiakkaat:
- Kulta ja Kaivos ky
- Piilosana ry
- MetalliMake
Tee PHP-ohjelma, joka lukee nämä tietueet. Laita tämä sivu näkyviin osoitteessa
http://sorkkacrm.example.com
Voit simuloida nimipalvelun toimintaa hosts-tiedoston avulla. Tässä harjoituksessa sivulle
pääsyä ei tarvitse rajoittaa salasanalla, vaan sen tule näkyä kaikkialle nettiin.

#### Tietokannan luominen

Loin aluksi tietokannan yhtiokanta ja lisäsin sinne taulun yhtiot:

\`\`\`sql
$ createdb yhtiokanta
tomas@ubuntu-s-1vcpu-1gb-lon1-01:~/phpTest/example.com$ psql yhtiokanta
yhtiokanta=> CREATE TABLE yhtiot (id INTEGER PRIMARY KEY,
yhtiokanta(> title varchar(50) NOT NULL);
\`\`\`

Syötin seuraavaksi tarvittavat yhtiöt ja kokeilin select lauseella onnistuiko tämä halutusti:

\`\`\`sql
yhtiokanta=> SELECT * FROM yhtiot;
 id |       title
----+--------------------
  1 | Kulta ja Kaivos ky
  2 | Piilosana ry
  3 | MetalliMake
(3 rows)
\`\`\`

Tietuidein luonti on onnistunut ja seuraavaksi on itse php ohjelman teko. 

#### Php ohjelman teko

Aloitetaan tämäkin osuus virtualhostin luomisella. Loin uuden configuraatiotiedoston, jonka sisällöksi tuli:

\`\`\`apache
<VirtualHost *:80>
  ServerName sorkkacrm.example.com
  ServerAlias www.sorkkacrm.example.com
  DocumentRoot /home/tomas/sorkkacrm/example.com
  <Directory /home/tomas/sorkkacrm/example.com>
    Require all granted
  </Directory>
</VirtualHost>
\`\`\`

Sallin virtualhostin käytön a2ensite komennolla:

\`\`\`shell
$ sudo a2ensite yhtiot.conf
\`\`\`

Loin tarvittavat tiedostohakemistot ja muokkasin /etc/hosts tiedostoa seuraavasti:

\`\`\`
++ 127.0.0.1 sorkkacrm.example.com
++ 127.0.0.1 www.sorkkacrm.example.com
\`\`\`

Nyt minun piti enää toteuttaa php-tiedosto, joka hakee tarvittavat kentät ja näyttää ne sivustolla. Loin tarvittavaan tiedostohakemistoon index.php tiedoston jonka sisältö näytti seuraavalta:

\`\`\`php
<?php

$db_connect = pg_connect("host=localhost dbname=yhtiokanta user=tomas password=NFDIflZ3hfdE3mR7ekZ3");

$result = pg_query($db_connect, "SELECT * FROM yhtiot;");

while ($row = pg_fetch_row($result)) {
  echo "Yhtio: $row[1]\n";
}

?>
\`\`\`

Seuraavaksi oli vuoro testata sivuston toimintaa, curlasin sorkkacrm.example.com ja sain vastaukseksi:

\`\`\`
$ curl sorkkacrm.example.com
Yhtio: Kulta ja Kaivos ky
Yhtio: Piilosana ry
Yhtio: MetalliMake
\`\`\`

Toimii!

### Rosvoja porteilla

#### Onko koneellemme yritetty murtautua? (Kyllä). Etsi omalta paikalliselta koneeltasi todisteet tapauksesta, jossa koneellesi on yritetty murtatua. Analysoi tiiviisti tähän liittyvät tiedot.

Kokeilin etsiä murtautumisyrityksiä apachen access.log:ista, mutta en harmiksi löytänyt yhtään murtautumisyritystä. Sen sijaan auth.log:ista löytyi murtautumisyrityksiä oman tulkinnan mukaan. Seuraava kohta on kopioitu /var/log/auth.log tiedostosta:

\`\`\`
Mar 15 14:42:49 ubuntu-s-1vcpu-1gb-lon1-01 sshd[28884]:
pam_unix(sshd:auth): authentication failure; 
logname= uid=0 euid=0 tty=ssh ruser= rhost=222.186.42.75  user=root
\`\`\`

Näyttää siltä, että koneelle on yritetty kirjautua ip-osoitteesta 222.186.42.75. Yhteystyyppinä on käytetty ssh-yhteyttä ja yritetty kirjautua käyttäjällä root.

Halusin vielä selvittää missä kyseinen ip sijaitsee, joten latasin ohjelman whois:

\`\`\`shell
$ sudo apt install whois -y
\`\`\`

Ajoin whois-komennon kyseiselle ip-osoitteelle ja sain kattavasti tietoa tästä osoitteesta. Tietojen mukaan tämä ip on kiinassa China Telecom operaattorin alla. Kuorittu tulos: 

\`\`\`shell
$ whois 222.186.175.23

inetnum:        222.184.0.0 - 222.191.255.255
descr:          China Telecom
descr:          Beijing 100088
country:        CN
\`\`\`

### Sorkan sivut

#### Tee staattinen HTML5 weppisivu, jonka otsikkona (molemmat title ja h1) on "Sorkka ja Rauta Oy". Laita sivu näkyviin osoitteeseen http://rauta.example.com/ . Voit simuloida nimipalvelun toimintaa hosts-tiedoston avulla

#### Virtualhost

Lähdetään taas liikkeelle virtualhostin luomisella. Luodaan uusi configuraatiotiedosto:

\`\`\`apache
<VirtualHost *:80>
  ServerName rauta.example.com
  ServerAlias www.rauta.example.com
  DocumentRoot /home/tomas/rauta/example.com
  <Directory /home/tomas/rauta/example.com>
    Require all granted
  </Directory>
</VirtualHost>
\`\`\`

Otin configuraation käyttöön seuraavasti:

\`\`\`shell
$ sudo a2ensite html5.conf
\`\`\`

Nyt oli aika luoda html sivusto, joka täyttää määritelmät. Loin index.html tiedoston configuraatiossa määriteltyyn hakemistoon:

\`\`\`html
$ cat > index.html << stop
> <!DOCTYPE html>
> <html>
> <head>
> <title>Sorkka ja Rauta Oy</title>
> </head>
> <body>
> <h1>Sorkka ja Rauta Oy</h1>
> </body>
> </html>
> stop
\`\`\`

Seuraavaksi muokkasin hosts tiedosta ja lisäsin sinne seuraavat kohdat:

\`\`\`
++ 127.0.0.1 rauta.example.com
++ 127.0.0.1 www.rauta.example.com
\`\`\`

Nyt oli aika curlata rauta.example.com ja katsoa mitä sain vastaukseksi. Ennen tätä käynnistin apachen uudelleen monesti näytetyn komennon avulla:

\`\`\`html
$ sudo systemctl restart apache2
$ curl rauta.example.com
<!DOCTYPE html>
<html>
<head>
<title>Sorkka ja Rauta Oy</title>
</head>
<body>
<h1>Sorkka ja Rauta Oy</h1>
</body>
</html>
\`\`\`

Toimii!

### Einarin esimerkki

#### Einari Vähä-aho ryhtyy koodaamaan. Tee einarille käyttäjä 'einari'. Tee einarille esimerkkikotisivu PHP:lla ja laita se näkymään osoitteessa http://localhost/~einari/ . Esimerkkisivun pitää tulostaa "Einari" käyttäen PHP:n print-funktiota

Aloitetaan tämä tehtävä tekemällä käyttäjä einari:

\`\`\`shell
$ sudo adduser einari
\`\`\`

Komennon jälkeen syötin pwgenillä generoidun salasanan ja käyttäjä oli luotu. 

#### Php sivuston luonti:

Menin aluksi käyttäjälle einari ja loin hänen kotihakemistoonsa public_html kansion ja sinne index.php tiedoston:

\`\`\`shell
$ su einari
einari@ubuntu-s-1vcpu-1gb-lon1-01:/home/tomas/rauta/example.com$ cd
einari@ubuntu-s-1vcpu-1gb-lon1-01:~$ ls
einari@ubuntu-s-1vcpu-1gb-lon1-01:~$ mkdir public_html
einari@ubuntu-s-1vcpu-1gb-lon1-01:~$ cd public_html/
einari@ubuntu-s-1vcpu-1gb-lon1-01:~/public_html$ nano index.php
\`\`\`

Tiedoston sisällöksi tuli:

\`\`\`php
<?php
print ("Einari")
?>
\`\`\`

Nyt piti vain sallia php-tiedostojen toiminta käyttäjien public_html kansioiden sisällä. Tämä onnistui avaamalla tiedosto /etc/apache2/mods-available/php7.2.conf ja kommentoimalla sieltä seuraavat kohdat: 

\`\`\`apache
<IfModule mod_userdir.c>
    <Directory /home/*/public_html>
       php_admin_flag engine Off
    </Directory>
</IfModule>
\`\`\`

Nyt sallin userdir käytön a2endir komennolla, käynnistin apachen uudelleen ja curlasin haluttua osoitetta:

\`\`\`shell
$ curl localhost/~einari
Einari
\`\`\`

Kaikki toimii taas kerran!

### Tomas Kukk

#### Sources

http://terokarvinen.com/2018/arvioitava-laboratorioharjoitus-linux-palvelimet-ict4tn021-6-torstai-alkukevat-2018-5-op
http://terokarvinen.com/2008/install-apache-web-server-on-ubuntu-4
https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-16-04
https://tecadmin.net/install-postgresql-server-on-ubuntu/
https://www.postgresql.org/docs/9.1/sql-createtable.html
https://www.postgresql.org/docs/9.5/sql-insert.html
https://serverfault.com/questions/232145/command-for-checking-apache-configuration
https://github.com/sysstat/sysstat
https://wiki.ubuntu.com/UserDirectoryPHP
`

export default a