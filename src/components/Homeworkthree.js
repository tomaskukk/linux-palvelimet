import Paper from "@material-ui/core/Paper";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import helloGBImg from "../img/hello-gb.png";

import templateImg from "../img/flask-templates.png";
import apacheImg from "../img/apache-download.png";
import flaskImg from "../img/flask.png";
import errorFlaskImg from "../img/errorlogflask.png";
import getLogImg from "../img/getlog.png";
import part1Img from "../img/part1.png";
import part2Img from "../img/part2.png";
import part3Img from "../img/part3.png";
import part4Img from "../img/part4.png";
import Textandpicturegrid from "./Textandpicturegrid";
import templateTiedostotImg from "../img/template-tiedostot.png";
import Sources from "./Sources";
import Text from "./Text";

const useStyles = makeStyles(theme => ({
  homeworkone: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6)
    }
  },

  root: {
    flexGrow: 1,
    textAlign: "left"
  }
}));

const sourcesList = [
  "https://linuxize.com/post/how-to-install-flask-on-ubuntu-18-04/",
  "https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04",
  "https://devops.ionos.com/tutorials/install-and-configure-mod_wsgi-on-ubuntu-1604-1/",

  "https://www.codementor.io/@abhishake/minimal-apache-configuration-for-deploying-a-flask-app-ubuntu-18-04-phu50a7ft ",

  "https://serverfault.com/questions/869066/django-with-apache-and-mod-wsgi-no-system-log-unless-setting-debug-true",

  "https://medium.com/@dushan14/create-a-web-application-with-python-flask-postgresql-and-deploy-on-heroku-243d548335cc",
  "https://kristerholmstrom.wordpress.com/2017/10/03/python-flask-and-postgresql/",
  "https://realpython.com/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/",
  "https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-ii-templates",
  "https://blog.theodo.com/2017/03/developping-a-flask-web-app-with-a-postresql-database-making-all-the-possible-errors/"
];

const sectionA = {
  title:
    "a) Asenna Apache, laita käyttäjien kotisivut (http://example.com/~tero) toimimaan. Testaa esimerkkikotisivulla.",
  imgs: [
    {
      src: apacheImg,
      title: "Apachen asennus komennot"
    },
    {
      src: helloGBImg,
      title: "Testikotisivu"
    }
  ],
  text: `Seurasin sivuston http://terokarvinen.com/2008/install-apache-web-server-on-ubuntu-4 ohjeita tässä,
  Seuraavassa komennot jolla sain kaiken toimimaan ja alla kuva joka näyttää tuloksen:
  `
};

const sectionB = {
  title: `b) Surffaa oman palvelimesi weppisivuja. Etsi Apachen lokista esimerkki
    onnistuneesta (200 ok) sivulatauksesta ja epäonnistuneesta (esim 404 not
    found) sivulatauksesta. Analysoi rivit.
    `,
  imgs: [
    {
      src: getLogImg,
      title: "Logs for http requests"
    }
  ],
  text: `Aluksi menin palvelimen käyttäjän hakemistoon URI:lla
  (http://178.62.58.26/~tomas) jonka kautta ja sain näkyviini käyttäjän
  kotisivun. Tämän jälkeen kokeilin mennä jollekkin muulle URI päätteelle,
  tässä tapauksessa http://178.62.58.26/404shouldntwork. Sitten siirsin
  logista 10 viimeistä riviä kotikoneelleni ajamalla komennon scp
  tomas@<IP>:/home/tomas/access-apache.log ./Desktop/linuxpalvelimet/src/random. Logista löytyy http GET pyyntö osoitteeseen
  /~tomas (kuva) Lisäksi logista näkee mistä ip-osoitteesta pyyntö
  lähetettiin, milloin ja millä selaimella.
  Logista löytyy myös pyyntö, joka palautti 404 errorin (kuva) Tällä kertaa pyyntöön http GET pyyntöön vastattiin
  statuskoodilla 404, sillä ei löytynyt mitään sivua joka olisi tuon URI
  päätteen takana. `
};

const sectionC = {
  title: `c) Tee virhe weppipalvelimella ajettavaan koodiin (esim PHP tai Python), etsi
    se lokista ja analysoi tuo lokirivi`,
  imgs: [
    {
      src: errorFlaskImg,
      title: "Error log"
    }
  ],
  text: `L kohtaa tehdessä tein myös tämän ikään kuin vahingossa. Python
  koodissani kirjoitin return:in sijaan retur yhteen kohtaa, kun editoin sitä
  nanolla, joten python-ohjelma ei compilannut halutusti. Tämä aiheutti
  apachen error.logiin virheviestin joka näyttää seuraavalta. Tämä tapahtuu
  vasta siinä vaiheessa kuin koitan mennä URI:iin jossa python ohjelmani
  sijaitsee: 
  Alimmalta tasolta näämme mistä errori tuli ja SyntaxErroriahan se näyttää.
  Korjasin syntaksivirheen ja kaikki toimi tämän jälkeen halutusti. `
};

const sectionD = {
  title: `k) Kokeile jotain Flaskin uutta ominaisuutta flask-testipalvelimessa. Voit
    kokeilla esim. muotteja (templates), tietokantaa tai syötteiden ottamista
    lomakkeilta (forms).`,
  imgs: [
    {
      src: templateImg,
      title: "Template testisivusto"
    },
    {
      src: templateTiedostotImg,
      title: "Tiedostojen sisällöt"
    }
  ],
  text: `Halusin kokeilla Flaskin templateja käytännössä. Seurasin tässä tehtävässä
  (https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-ii-templates)
  ohjetta pitkälti. Aluksi loin uuden virtuaaliympäristön jossa ajan Pythonia komennolla python -m venv venv.
  Sitten loin tarvittavat hakemistot ja latasin flaskin komennolla pip install Flask. Ennen tätä olin mennyt
  virtuaaliympäristöön komennolla source venv/bin/activate. Tämän jälkeen loin tarvittavat tiedostot ja
  asetin ympäristömuuttujan FLASK_APP=app.py,
  jonka jälkeen voin ajaa ohjelmaa komennolla flask run. Ajoin ohjelman ja ajoin
  komennon curl localhost:5000 joka palautti seuraavan kuvan (kuva)`
};

const sectionE = {
  title: `l) Asenna Python Flask + PostgreSQL + Apache mod WSGI. Testaa kunkin
  komponentin toiminta. Testaa lopuksi kokonaisuus. (vaikea)`,
  imgs: [
    {
      src: part1Img,
      title: "Osa 1"
    },

    {
      src: part2Img,
      title: "Osa 2"
    },

    {
      src: part3Img,
      title: "Osa 3"
    },
    {
      src: part4Img,
      title: "Osa 4"
    },

    {
      src: flaskImg,
      title: "Kuva 1"
    }
  ],
  text: ``
};
export default function Homeworkone() {
  const classes = useStyles();
  return (
    <Paper align="center" className={classes.homeworkone}>
      <div className={classes.root}>
        <Textandpicturegrid
          size={6}
          title={sectionA.title}
          imgs={sectionA.imgs}
          text={sectionA.text}
        />{" "}
        <Textandpicturegrid
          size={12}
          title={sectionB.title}
          imgs={sectionB.imgs}
          text={sectionB.text}
        />{" "}
        <Textandpicturegrid
          size={12}
          title={sectionC.title}
          imgs={sectionC.imgs}
          text={sectionC.text}
        />{" "}
        <Textandpicturegrid
          size={6}
          title={sectionD.title}
          imgs={sectionD.imgs}
          text={sectionD.text}
        />{" "}
        <Textandpicturegrid
          size={6}
          title={sectionE.title}
          imgs={sectionE.imgs}
          text={sectionE.text}
        />{" "}
      </div>

      <Sources sourcesList={sourcesList}></Sources>
    </Paper>
  );
}
