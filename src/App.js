import React, { useState, useEffect } from 'react';
import { Grid, responsiveFontSizes, Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import aiv from './images/aiv.jpg'
import {IconContext} from "react-icons"
import { FaTwitter } from "react-icons/fa";
import { NewsCards, Modal } from './components';
import useStyles from './styles';


const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: '28c2e79af7f1bda379ec37122d9065e12e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    
    
    <><div>
      <Grid xs={6} md={8}>

        <center><Typography variant="h2" color="white">AI News App</Typography> </center>

        <div className={classes.logoContainer}/>
        </Grid>
      {newsArticles.length ? (
        <div className={classes.infoContainer}>

          <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid xs={4}>

            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </Grid>
        </div>
      ) : null}
      <img src={aiv} className={classes.alanLogo} />
    </div><div><NewsCards articles={newsArticles} activeArticle={activeArticle} /><Modal isOpen={isOpen} setIsOpen={setIsOpen} /></div>
      {!newsArticles.length ? (
        
        <div className={classes.footer}> 
          
          <Typography variant="h6" component="h2" ><br/><br/><br/>
                Created by 
               <a className={classes.link} href="#"> Rohith</a> - &nbsp;&nbsp;
               
          </Typography>
          
          
        </div>
      ) : null}
    
    </>
  );
}

export default App;