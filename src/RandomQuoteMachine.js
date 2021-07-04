import './RandomQuoteMachine.css';
import Card from './component/ui/Card'
import { useState, useEffect } from 'react';
const urlQuotes ="https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const urlTweet="https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="

function RandomQuoteMachine() {
  const [isLoading, setIsloading] = useState(true);
  const [loadedQuotes,setLoadedQuotes]=useState([]);
  const [loadedQuotesAutor,setLoadedQuotesAutor]=useState([]);
  const [randomQuote,setRandomQuote]=useState(0);

 function randomQuotesHandle(){
    setRandomQuote(Math.floor(Math.random() * loadedQuotes.length));
 }

  useEffect(() => {// Actualiza el título del documento usando la API del navegador 
    setIsloading(true);
    fetch(urlQuotes,{})
    .then(res=>{
        return res.json();
        
    }).then(data=>{
        setIsloading(false);
        
        let arrQuotas=[];
        let arrAuthor=[];
        data.quotes.forEach(element => {
          
          const {quote,author}=element;
          arrQuotas.push(quote);
          arrAuthor.push(author);
        });
        setLoadedQuotes(arrQuotas);
        
        setLoadedQuotesAutor(arrAuthor);
        setRandomQuote(Math.floor(Math.random() * data.quotes.length));
    })
    },[]);

    if (isLoading)
    {
        return <section>
            <h1>Loading ...</h1>   
        </section>
    }

  return (
    <div id="quote-box">
      <Card>
        <div id= "text">
          
          <p><i className="fa fa-quote-left"> </i>{loadedQuotes[randomQuote]}</p>
        </div>
        <div id="author">
          <p>-{loadedQuotesAutor[randomQuote]}</p>
        </div>
        <div id="action">
          <div>
            <a id="tweet-quote" target="_blank" href={urlTweet+encodeURIComponent('"' + loadedQuotes[randomQuote] + '" ' + loadedQuotesAutor[randomQuote])}>
            <i className="fa fa-twitter"></i>
            </a>
          </div>
          <div id="action-right">
            <button id="new-quote" onClick={randomQuotesHandle}>New Quote</button>
          </div>
        </div>
        
      </Card>
     </div>
  );
}

export default RandomQuoteMachine;
