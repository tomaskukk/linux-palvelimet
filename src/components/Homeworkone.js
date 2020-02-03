import Paper from "@material-ui/core/Paper";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import image01a from "../img/01a.png";
import image01b from "../img/01b.png";
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
  "https://git-scm.com/about/free-and-open-source",
  "https://github.com/microsoft/vscode/blob/master/LICENSE.txt",
  "https://github.com/hishamhm/htop",
  "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html",
  "http://www.clamav.net/"
];

const sectionA = {
  title:
    "a) Tee oma Linux-livetikku. Kokeile sitä jossain muussa kuin koulun koneessa.",
  imgs: [
    {
      src: image01a,
      title: "Rufus"
    }
  ],
  text: `Kävin aluksi ostamassa muistitikun (Kingston usb 3.0)
  saiturinpörssistä josta teen livetikun. Kytkin usb-tikun koneeseen
  ja ryhdyin hommiin. Aluksi menin lataamaan rufus ohjelman jolla
  saa tehtyä ISO tiedostosta bootattavan tikun (https://rufus.ie/).
  Sen jälkeen kävin asentamassa Ubuntu 18.04.3 LTS ISO tiedoston
  https://ubuntu.com/download/desktop sivustolta. Tiedoston ladattua
  käytin rufus.exe ohjelmaa saadakseni ISO tiedostosta bootattavan
  livetikun.
  Aloitin tämän jälkeen ohjelman suorituksen ja odottelin hetken sen
  kulkua. Ohjelman valmistuessa käynnistin koneeni uudelleen monta
  kertaa ennen kuin pääsin boottiasetuksiin rämppäämällä f9
  näppäintä. Lopulta sinne päästyä sain bootattua usb-tikun kautta
  koneeni ja ubuntu tuli esiin. Ensimmäisenä kokeilin 'sudo lshw
  -short -sanitize' komentoa joka jumitti kohtaan PCI (sysfs).
  Koitin googlailla ongelmaan ratkaisun joten hiiri, näppäimistö ja
  internet-yhteys toimi.`
};

const sectionB = {
  title: "b) Listaa testaamasi koneen rauta (‘sudo lshw -short -sanitize’).",
  imgs: [
    {
      src: image01b,
      title: "lshw -short -sanitize"
    }
  ],
  text: `Aluksi terminaali vastasi annetuun komentoon PCI (sysfs) ja jäi
  siihen jumiin. Huomasin samalla että näppäimistön kieli oli väärä,
  joten koitin mennä asetuksiin. Kun avasin asetukset, näyttö jäätyi
  ja mitään en voinut enää tehdä. Ratkaisu oli käynnistäessä konetta
  painaa e näppäintä ja lisätä 'nomodeset' ennen 'quiet splash'
  sanoja. Tein saman konfiguraation myös tiedostoon /etc/default/grup.
  Tämä Korjasi ongelmani ja komento toimi odotetusti.`
};

const sectionC = {
  title:
    "c) Asenna kolme itsellesi uutta ohjelmaa. Kokeile kutakin ohjelmaa senpääasiallisessa käyttötarkoituksessa.",
  text: `Aluksi avasin terminaalin painamalla ctrl+alt+t. Terminaalissa ajoin
  'sudo apt-get update && sudo apt-get upgrade'. Tämän jälkeen asensin
  htop ohjelman ajamalla komennon sudo apt-get install -y htop. Seuraavana
  oli gitin vuoro ajamalla komento 'sudo apt-get install -y git'.
  Viimeisenä latasin visual studio coden käymällä sivustolla
  'https://code.visualstudio.com/Download' ja lataamalla 64 bit version
  ubuntu/debian käyttöjärjestelmille. Terminaalissa menin kohtaan
  Downloads ajamalla komennon 'cd Downloads'. Viimeisenä ajoin komennon
  'sudo dpkg -i code_1.26.0-1534177765_amd64.deb', jonka jälkeen minulla
  oli visual studio code koneellani. Ajoin komennon htop, josta näin
  tietokoneeni suoritustietoja ja muistin tilanteen käyttöjärjestelmässä.
  Visual studiota ja gittiä kokeilin avaamalla vs coden ja luomalla uuden
  projektin. Alustin uuden react projektin (tämä kyseinen verkkosivusto)
  ja puskin sen github repositoryyn käyttämällä git cli:tä.`
};

const sectionD = {
  title:
    "d) Mitä lisenssiä kukin näistä ohjelmista käyttää? Selitä lyhyesti, mitä oikeuksia ja velvolisuuksia tuosta lisenssistä seuraa.",
  text: `Git ja htop ovat julkaistu lisenssillä GNU2(General Public License
    version 2.0), joka on yksi avoimista lisensseistä.
    Jos ohjelma käyttää GNU2 lisenssiä sitä saa käyttää, jakaa, kopioida,
    muokata ja käyttää opiskeluun vapaasti. Jos kuitenkin tekee muutoksia
    tällaiseen ohjelmaan, lisenssiä ei saa vaihtaa. Muutoksia tehdessä on
    myös tehtävä selväksi, että tuotetta on muokattu. Visual studio
    code on taas julkaistu MIT lisenssillä, joka on myös avoimien lisessien
    joukossa. MIT lisenssillä julkaistuja ohjelmia saa kuitenkin myydä
    eteenpäin toisella lisenssillä. Se on siis vielä vapaampi kuin GNU2
    lisenssi.`
};

const sectionE = {
  title: `e) Listaa käyttämäsi ohjelmat (esim. MS Word), kunkin ohjelmankäyttötarkoitus 
  (esim. Tekstinkäsittely) ja vastaava vapaa Linux-ohjelma (esim. LibreOffice Writer). 
  Jos johonkin tarkoitukseen ei löydy vapaataLinux-ohjelmaa, listaa sekin.`,
  answerList: [
    "Avast antivirus - ClamAV",
    "Microsoft Powerpoint - LibreOffice Impress",
    "Docker for Windows - Docker"
  ]
};
export default function Homeworkone() {
  const classes = useStyles();
  return (
    <Paper className={classes.homeworkone}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Textandpicturegrid
              size={12}
              title={sectionA.title}
              imgs={sectionA.imgs}
              text={sectionA.text}
            />{" "}
          </Grid>
          <Grid item xs={6}>
            <Textandpicturegrid
              size={12}
              title={sectionB.title}
              imgs={sectionB.imgs}
              text={sectionB.text}
            />{" "}
          </Grid>
          <Grid item xs={6}>
            <Text title={sectionC.title} text={sectionC.text}></Text>
          </Grid>
          <Grid item xs={6}>
            <Text title={sectionD.title} text={sectionD.text}></Text>
          </Grid>
          <Grid item xs={6}>
            <Text title={sectionE.title}></Text>
            {sectionE.answerList.map(item => (
              <p key={item}>{item}</p>
            ))}{" "}
          </Grid>
        </Grid>
      </div>

      <Sources sourcesList={sourcesList}></Sources>
    </Paper>
  );
}
