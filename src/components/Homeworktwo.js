import Paper from "@material-ui/core/Paper";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import unsuccesffullLog from "../img/unsuccessfull-log.png";
import successfullLog from "../img/successfull-log.png";
import ack from "../img/ack.png";
import pydf from "../img/pydf.png";
import youtubeDl from "../img/youtube-dl.png";
import Typography from "@material-ui/core/Typography";
import Textandpicturegrid from "./Textandpicturegrid";
import Sources from "./Sources";
import Text from "./Text";
import Grid from "@material-ui/core/Grid";
import Imgcard from "./Imgcard";

const useStyles = makeStyles(theme => ({
  homeworkone: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6)
    }
  },
  mainContainer: {
    padding: theme.spacing(3),
    flexGrow: 1
  },
  root: {
    flexGrow: 1
  }
}));

const sourcesList = [
  "http://terokarvinen.com/2020/aikataulu-linux-palvelimet-ict4tn021-3010-torstai-aamu-alkukevat-2020-5-op",
  "http://www.hypexr.org/linux_scp_help.php",
  "https://askubuntu.com/questions/938700/how-do-i-install-docker-on-ubuntu-16-04-lts",
  "https://itnext.io/10-cli-tools-that-you-will-love-d214bc73d856",
  "https://www.addictivetips.com/ubuntu-linux-tips/useful-linux-command-line-apps/",
  "https://itsfoss.com/best-ubuntu-apps/"
];

const sectionA = {
  title:
    "a) Aiheuta lokiin kaksi eri tapahtumaa: yksi esimerkki onnistuneesta ja yksi esimerkki epäonnistuneesta tai kielletystä toimenpiteestä. Analysoi rivit yksityiskohtaisesti.",
  imgs: [
    {
      src: successfullLog,
      title: " Onnistunut viesti logissa"
    },
    {
      src: unsuccesffullLog,
      title: "Epäonnistunut viesti logissa"
    }
  ],
  text: `Tiesin, että onnistuneen ja epäonnistuneen tapahtuman saa syslogiin helposti wlan:in avulla. Ensimmäiseki menin seuraamaan logeja terminaalissa komennolla tail -F var/log/syslog. Tämän jälkeen yhdistin kodin wlan:iin josta logiin aiheutui onnistunut tapahtuma. Logikuvaus kertoo, että yhdistäminen kodin langattomaan verkkoon onnistui. 
  Seuraavaksi oli epäonnistuneen tapahtuman luominen logiin. Edellisestä esimerkistä innoittamana koetin yhdistää naapurin wlaniin, joka ei onnistunut. Tästä aiheutui epäonnistunut viesti logiin (, jossa kerrotaan että ei voinut aktivoida yhteyttä naapurin verkon kanssa. `
};

const sectionB = {
  title:
    "b) Vapaaehtoinen kohta, ei ole opetettu vielä: Asenna SSH-demoni. Kokeile omalla ssh-palvelimellasi jotain seuraavista: ssh-copy-id, sshfs, scp tai git. (Helpoin lienee scp: ‘scp foo.txt tero@example.com:’)",
  text: `Ensimmäisenä päivitin apt ympäristön komennolla sudo apt update, tämän jälkeen asensin ssh demonin komennolla sudo apt install -y ssh. Loin ssh yhteyden palvelimeni kanssa, jossa tämä nettisivu pyörii komennolla ssh <käyttäjä>@kukkto.com. Yhteyden luonti onnistui ja olin palvelimeni sisällä. Seuraavaksi kopioin shellscript tiedostoni tero käyttäjälle example.com palvelimella. Tämä onnistui komennolla scp pull-and-run.sh tero@example.com. Kyseinen scripti hoitaa versionhallinnasta uusimman version haun ja vanhan docker kontin poistamisen sekä uuden pyöräyttämisen käyntiin, jossa tämä verkkosivusto pyörii.`
};

const sectionC = {
  title:
    "c) Tee unelmien apt-get -komento: yksi komentorivi, joka asentaa suosikkiohjelmasi.",
  text: `sudo apt install -y docker.io htop shutter steam. Tämä asentaa suosituimmat ohjelmani. Steam on pelikirjasto, shutter kuvankaappauksia varten, htop seuratakseni tietokoneeni suoritusta ja docker helpottaa elämää koodatessa. Dockerilla ei tarvitse esim. asentaa ohjelman riippuvuuksia suoraan tietokoneelle. `
};

const sectionD = {
  title:
    "d) Asenna komentokehotteen paketinhallinnasta kolme itsellesi uutta komentorivillä toimivaa ohjelmaa. Kokeile kutakin ohjelmaa sen pääasiallisessa käyttötarkoituksessa.",
  imgs: [
    {
      src: ack,
      title: "ack ohjelman toiminta"
    },
    {
      src: pydf,
      title: "pydf ohjelman toiminta"
    },
    {
      src: youtubeDl,
      title: "youtube-dl ohjelman toimintaongelmat"
    }
  ],
  text: `Ensimmäisenä siirryin googlailemaan hyödyllisiä työkaluja, jotka ovat saatavilla paketinhallinnasta. Ack herätti huomioni, sillä voi nähtävästi hakea tiettyjä osia tiedostoista kuten grep komennolla. Asensin ack:in komennolla sudo apt install -y ack. Ohjelma näyttäisi toimivan halutusti (kuva). Seuaavaksi latasin ohjelman pydf joka toimii kuten df komento, eli kertoo tietokoneen muistinhallinasta. Tämäkin ohjelma näyttäisi toimivan halutusti (kuva). Viimeisenä latasin ohjelman youtube-dl, jolla voi ladata youtube videoita terminaalista. Tämä tapahtui komennolla sudo apt install -y youtube-dl. Tämä ohjelma ei taas toiminut halutusti vaikka koitin monia eri videoita(kuva).`
};

const sectionE = {
  title: `e) Opettele ulkoa ja harjoittele tärkeimmät komennot`,
  text:
    "Tämä on jo aika hyvin hallussa sillä olen aikaisemmin opiskellut komentoja linux-kirjasta."
};
export default function Homeworkone() {
  const classes = useStyles();
  return (
    <Paper className={classes.homeworkone}>
      <div className={classes.root}>
        <Textandpicturegrid
          size={6}
          title={sectionA.title}
          imgs={sectionA.imgs}
          text={sectionA.text}
        />{" "}
        <Text title={sectionB.title} text={sectionB.text}></Text>
        <Text title={sectionC.title} text={sectionC.text}></Text>
        <Textandpicturegrid
          size={4}
          title={sectionD.title}
          imgs={sectionD.imgs}
          text={sectionD.text}
        />{" "}
        <Text title={sectionE.title} text={sectionE.text}></Text>
      </div>

      <Sources sourcesList={sourcesList}></Sources>
    </Paper>
  );
}
