import stressImg from "../img/stress.png";
import iotopImg from "../img/iotop.png";
import iotopOaImg from "../img/iotop-oa.png";

const a = `
## Ubuntulla kuormitusten seuraaminen

### a) Kuormitusta yli ajan. Tietysti palvelin hidastelee juuri silloin, kun olet nukkumassa. Seuraisipa joku kuormitusta tuolloin. Asenna heti aluksi jokin ohjelma seuraamaan kuormitusta, jotta voit tarkastella sitä koko tehtävän ajalta. Sopivia ohjelmia ovat esimerkiksi 'munin' ja sysstat ('sar'). b) Kuormita järjestelmän eri osa-alueita. Esim. 'stress'. Etsi prosessi toisesta ikkunasta 'top' tai 'htop', järjestystä voi vaihtaa "P" ja "M".

#### Sysstat

Asennetaan ensimmäisenä ohjeissa mainittu sysstat.

\`\`\`shell
$ sudo apt update -y
$ sudo apt install sysstat -y
\`\`\`

Tämän jälkeen kokeilin toimiiko ohjelma halutusti seuraavalla komennolla

\`\`\`shell
\$ sar
Cannot open /var/log/sysstat/sa19: No such file or directory
Please check if data collecting is enabled
\`\`\`

Minun piti siis ensimmäisenä muokata ohjelman asetuksia siten, että tietojen kerääminen on mahdollista. Tämä onnistui seuraavasti:

\`\`\`shell
$ sudoedit /etc/default/sysstat
$ sudo systemctl restart sysstat
\$ sar
Linux 5.3.0-42-generic (pavilion) 19.03.2020 _x86_64_ (4 CPU)

11:21:15 LINUX RESTART (4 CPU)
\`\`\`

Muokkasin viimeiseltä riviltä kohdan "false" vastaamaan "true". Käynnistin tämän jälkeen ohjelman uudelleen ja ajoin komennon sar uudestaan. Nyt ohjelma toimi halutusti.

#### b) Kuormita järjestelmän eri osa-alueita. Esim. 'stress'. Etsi prosessi toisesta ikkunasta 'top' tai 'htop', järjestystä voi vaihtaa "P" ja "M"

Asensin ohjelman stress komennolla. Kokeilin myös sen olemassaolon kirjoittamalla stress --help, joka tulosti halutun manuaalinn

\`\`\`shell
$ sudo apt install stress -y
$ stress --help
'stress' imposes certain types of compute stress on your system

Usage: stress [OPTION [ARG]] ...
\`\`\`

Kokeilin ohjelman toimintaa seuraavalla komennolla:

\`\`\`shell
\$ stress --cpu 8 --io 4 --vm 2 --vm-bytes 128M --timeout 10s
\`\`\`

Tämä kuormitti tietokoneeni eri osa-alueita, mutta lähinnä prosessoria htop:in mukaan.

Seuraavasta kuvasta nähdään kuinka se vaikutti koneeni toimintaan.

![Htop on stress](${stressImg} "Htop ikkuna stress komennon aikana")

Kuten kuvasta nähdään, kaikki prosessorin ytimet olivat 100% kuormituksessa. Yläreunan load average oli myös kasvanut noin kahdella.

### Kokeile käytännössä, selitä ja analysoi. Muista selittää, mitä komennolla halutaan selvittää ja tulkitse kokeilusi tulokset. Aiheuta tarvittaessa kuormaa tai muuta työkalulla näkyvää tulkittavaa

### iotop; iotop -oa

iotop komennolla voidaan tarkastella fyysisen levyn kirjoitus ja lukutilastoja. iotop -oa komennossa annetaan --only ja --accumulated parametrit. Man sivvun mukaan (iotop --help) --only näyttää vain ohjelmat jotka oikeasti suorittavat levyllä kirjoitusta tai lukemista. --accumulated sen sijaan kerää i/o prosentteja yhteen, eikä näytä hetkellisesti.

Normaalioloissa i/o on hyvin pientä. Kokeilin komentoja siten, että avasin wine:n kautta League of Legends pelin ja katsoin tietoja tämän jälkeen.

Ensimmäisessä kuvassa näkyy normaalin iotop komennon näkymä:

![IotopOa](${iotopOaImg} "iotop -oa komennon näkymä")

Seuraavassa kuvassa iotop -oa komennon näkymä:

![Iotop](${iotopImg} "Normaalin iotop komennon näkymä")

### d) dstat

dstat-komennolla nähdään prosessorin käyttöä, i/o_ta, network:in käyttöä, pagin:gia eli muistista hakua sekä system tietoja (en ymmärtänyt mitä tämä on vaikka koitin selvittää). Katsotaan mitä vaikutuksia on noin viiden sekunnin kestävän loopin ajamisessa tähän. Kirjoitin python-loopin joka tulostaa 1 - 999 999.

\`\`\`python
for x in range (1000000):
  print(x)
\`\`\`

Seurataan aluksi normaalia näkymää dstat komennolla.

\`\`\`
--total-cpu-usage-- -dsk/total- -net/total- ---paging-- ---system--
usr sys idl wai stl| read  writ| recv  send|  in   out | int   csw 
  7   0  93   0   0|   0    44k|   0     0 |   0     0 | 783  1162 
  1   0  99   0   0|   0     0 |   0     0 |   0     0 | 732  1069 
  2   1  98   0   0|   0     0 |   0     0 |   0     0 | 804  1346 
  1   1  98   0   0|   0     0 | 164B  164B|   0     0 | 809  1277
\`\`\`

Prosessori näyttäisi olevan vähäisessä käytössä, kuten kaikki muutkin osa-alueet. Katsotaan nyt näkymää, jolloin python-looppia ajetaan.

\`\`\`
--total-cpu-usage-- -dsk/total- -net/total- ---paging-- ---system--
usr sys idl wai stl| read  writ| recv  send|  in   out | int   csw 
 24  17  59   0   0|   0    24k|   0     0 |   0     0 |8476   361k
 34  27  39   0   0|   0   176k|   0     0 |   0     0 |  14k  567k
 33  27  40   0   0|4096B   64k|  86B   78B|   0     0 |  12k  563k
 34  27  39   0   0|   0    80k|   0     0 |   0     0 |  14k  556k
\`\`\`

Kuten nähdään, prosessori on kovemmassa käytössä kuin aikaisemmin. System osio näyttäisi olevan myös kovemmassa käytössä. i/o osiosta en voi olla varma johtuiko piikki loopin ajamisesta vai ei. Network osioon se myös tuskin vaikutti.

### e) ss --listening --tcp --numeric; ss --listening --tcp; ss --tcp; ss --listening --udp; ss --listening --udp

Ss työkalu näyttää socket:eja eli prosesseja jotka käyttävät verkkoa. Ensimmäisen komennon argumentit --listening kertoo ohjelmalle, että se näyttäisi vaan prosessit jotka kuuntelevat jotain porttia. --tcp argumentti näyttää vain TCP-protokollaa käyttävät prosessit. --numeric kertoo, että ohjelma ei näyttäisi nimiä, vaan numeerisia tietoja.

#### ss --listening --tcp --numeric

Ajetaan komento ss -ltn joka vastaa tehtävänannon ensimmäistä komentoa. Tulosteeksi tuli seuraavaa:

\`\`\`
State    Recv-Q    Send-Q        Local Address:Port        Peer Address:Port    
LISTEN   0         10                  0.0.0.0:57621            0.0.0.0:*       
LISTEN   0         128           127.0.0.53%lo:53               0.0.0.0:*       
LISTEN   0         5                 127.0.0.1:631              0.0.0.0:*       
LISTEN   0         128                 0.0.0.0:3000             0.0.0.0:*       
LISTEN   0         128                 0.0.0.0:33243            0.0.0.0:*       
LISTEN   0         5                     [::1]:631                 [::]:*  
\`\`\`

Nopean silmäilyn jälkeen tiesin että ainakin local portilla 3000 on nettisivuni johon kirjoitan tätä dokumentaatiota. 57621 muistuttia minua joistain tietokanta-porteista. Lopuista porteista minulla ei ollut silmäilyn jälkeen tietoa.

Lyhyen tutkimisen jälkeen huomasin olevani väärässä tietokannoista. Portti 0.0.0.0:57621 on varattu spotify-clientilleni joka on käynnissä taustalla.

[::1]:631 ja 127.0.0.1:631 nettisivulle mennessä minulle paljastui, että tämän portin prosessi on:
''CUPS 2.2.7 CUPS is the standards-based, open source printing system developed by Apple Inc. for macOS® and other UNIX®-like operating systems.''
Viimeinen epäselvä portti oli 127.0.0.53%lo:53, joka on ilmeisesti systemd:n käytössä.

#### ss --listening --tcp

Tämä komento on muuten sama, mutta numeerisien tietuiden sijaan näytetään nimiä. Tulosteeksi tuli:

\`\`\`
State    Recv-Q    Send-Q        Local Address:Port         Peer Address:Port   
LISTEN   0         10                  0.0.0.0:57621             0.0.0.0:*      
LISTEN   0         128           127.0.0.53%lo:domain            0.0.0.0:*      
LISTEN   0         128                 0.0.0.0:47191             0.0.0.0:*      
LISTEN   0         5                 127.0.0.1:ipp               0.0.0.0:*      
LISTEN   0         128                 0.0.0.0:3000              0.0.0.0:*      
LISTEN   0         5                     [::1]:ipp                  [::]:*
\`\`\`

#### ss --tcp

Tämä komento näyttää myös tcp-protokollaa käyttävät ohjelmat, jotka eivät kuuntele jotain porttia. Tulosteesta päätellen nämä ovat lähinnä selaimella olevat sivustot, jotka minulla oli auki. Riisuttu versio:

\`\`\`
State      Recv-Q  Send-Q      Local Address:Port     Peer Address:Port                         
CLOSE-WAIT 32      0           192.168.1.129:45584    23.214.193.107:https                        
ESTAB      0       0           192.168.1.129:56006    80.239.178.41:https                        
ESTAB      0       0           192.168.1.129:34028    35.186.224.53:https 
\`\`\`

Tulosteesta näkee, että omalla koneella on joitain portteja varattu näille sivustoille (selaimella näiden näyttäminen). Sitten näkyy ulkoisen portin ipv4-osoite ja protokolla https. 

#### ss --listening --udp

Viimeisenä on portit joita kuunellaan, jotka käyttävät udp protokollaa. Ajettaessa komento tulostus on seuraava:

\`\`\`
State   Recv-Q   Send-Q   Local Address:Port     Peer Address:Port             
UNCONN  0        0              0.0.0.0:44302         0.0.0.0:*                
UNCONN  0        0              0.0.0.0:36720         0.0.0.0:*                
UNCONN  0        0        127.0.0.53%lo:domain        0.0.0.0:*                
UNCONN  0        0              0.0.0.0:bootpc        0.0.0.0:*                
UNCONN  0        0              0.0.0.0:57621         0.0.0.0:*                
UNCONN  0        0              0.0.0.0:ipp           0.0.0.0:*                
UNCONN  0        0              0.0.0.0:mdns          0.0.0.0:*                
UNCONN  0        0              0.0.0.0:1900          0.0.0.0:*                
UNCONN  0        0              0.0.0.0:35352         0.0.0.0:*                
UNCONN  0        0                 [::]:35798            [::]:*                
UNCONN  0        0                 [::]:mdns             [::]:* 
\`\`\`

Jokaisen prosessin tila on unnconnected joka on hieman hämmentävää. Systemd prosessin portti on taas näkyvissä. Muista porteista ei silmäilyllä ollut syvempää tietoa. 

### f) grep -i error /var/log/syslog; grep -ir error /var/log/

#### grep -i error /var/log/syslog

Tämä komento tulostaa syslogista sanan error sisältävät tietueet, ottamalla isot ja pienetkirjaimet mukaan. Komennon ajaessa tulostusta näkyy omalla koneellani hyvin paljon. Otin yhden rivin mukaan tulosteesta:

\`\`\`
Mar 20 10:58:22 pavilion shutter.desktop[8225]: 
ERROR: upload-plugin exists but does not work properly - 
/usr/share/shutter/resources/system/upload_plugins/upload/vgyme
\`\`\`

Syslogiin on tulostunut viesti siitä, että shutter ohjelman upload plugin on olemassa, muttei toimi halutusti. Viestissä näkyy päivämäärä, ohjelma ja virheviesti.

#### grep -ir error /var/log/

Tämä komento tulostaa /var/log kansiosta kaikkien tiedostojen tietueet joissa on error hakusana. Ajetaan komento ja katsotaan mitä paljastuu. Suurin osa tulostuksesta tuli syslogeista. Joitain tietueita tuli myös kernelin logist kern.log, sekä dpkg.log:ista. Löysin yhden kohdan, joka on tapahtunut aikaisemmin tätä tehtävää tehdessä, joten otin sen esille:

\`\`\`
/var/log/kern.log:Mar 19 12:20:14 pavilion kernel: [ 4946.290406] 
audit: type=1400 audit(1584613214.444:232201): apparmor="ALLOWED" operation="exec" info="no new privs" error=-1 profile="snap.leagueoflegends.leagueoflegends" name="/bin/ping" pid=24332 comm=4C6561677565206F66204C6567656E requested_mask="x" denied_mask="x" fsuid=1000 ouid=0 target="snap.leagueoflegends.leagueoflegends//null-/bin/ping"
\`\`\`

Tämä viesti on tulostunut ilmeisesti kun olen koittanut käynnistää League of Legends peliä, sillä operation="exec" viittaisi siihen. Koska virheviesti on tulostunut kern.log:iin on tämä operaatio kuitenkin luultavasti epäonnistunut. 

### g) Load average näkyy esim 'uptime', 'top', 'htop'. Prosessoriydinten määrä näkyy 'nproc'. Miten load average tulkitaan? Miksi prosessoriydinten määrä on tässä kiinnostava? Vapaaehtoisena bonuksena voit miettiä, mitä hyötyä on kuormituslukemasta, joka voi mennä yli yhden eli yli 100%

Nproc komennolla näen, että minulla on neljä prosessoriydintä. Uptime komento antoi seuraavaa:

\`\`\`
uptime
 12:17:55 up  1:40,  1 user,  load average: 1,14, 0,89, 0,83
\`\`\`

Näiden lukujen tulkinta riippuu täysin siitä montako prosessorinydintä tietokoneessa on. Ensimmäinen luku osoittaa edellistä minuuttia, toinen 5 minuuttia ja kolmas 15 minuuttia. Jos minulla olisi vain yksi prosessorinydin luku 1,14 kertoisi siitä, että prosessori on ollut ylikuormituksessa ja 0,14 prosessia on odottanut suoritusta keskimäärin. Koska minulla on kuitenkin neljä prosessorinydintä on tulkinta eri. Nyt ytimiä jotka suorittavat ohjelmia on neljä, joten prosessorille olisi vielä voinut antaa lisää suoritettaavaa. Jos ensimmäinen luku olisi ollut yli neljä, olisi prosessorin pitänyt odottaa ohjelmien suoritusta. Tulkintani perustuu (https://community.tenable.com/s/article/What-is-CPU-Load-Average) artikkeliin aiheesta. 

### h) Analysoi lopuksi koko ajalta keräämäsi kuormitustiedot. Löydätkö esimerkiksi aiheuttamasi kuormituspiikin?

Katsotaan nyt kuormitustietoja komennolla sar:

\`\`\`
Linux 5.3.0-42-generic (pavilion) 	20.03.2020 	_x86_64_	(4 CPU)

11:05:07     LINUX RESTART	(4 CPU)

11.15.02        CPU     %user     %nice   %system   %iowait    %steal     %idle
11.25.01        all     11,91      0,00      2,20      0,26      0,00     85,64
11.35.01        all     13,05      0,00      2,02      0,27      0,00     84,65
11.45.01        all     12,31      0,00      2,07      0,38      0,00     85,24
11.55.01        all     12,76      0,00      2,31      0,25      0,00     84,68
12.05.01        all     13,75      0,00      2,33      0,27      0,00     83,65
12.15.01        all     12,33      0,00      2,35      2,57      0,00     82,75
12.25.01        all     12,86      0,00      2,13      0,34      0,00     84,66
Average:        all     12,71      0,00      2,20      0,62      0,00     84,47
\`\`\`

Kuormitus näyttäisi siltä, että se on melko tasaista koko projektin aikana. Kuormituspiikkiä ei ole näkyvissä. Prosessori on ollut suurimmaksi osaksi odottamassa, että sille syötetään lisää prosesseja ajettavaksi. 

#### Sources

- http://terokarvinen.com/2020/linux-palvelimet-2020-alkukevat-kurssi-ict4tn021-3010/#laksyt

`;

export default a;
