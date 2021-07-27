const quotecontainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterbtn=document.getElementById('twitter');
const new_Quotetbtn= document.getElementById('new-quote');
const loader= document.getElementById('loader');

let apiQuotes=[];

// Loader Function

function loading(){
    loader.hidden=false;

    quotecontainer.hidden=true;
    
}

// function Completing

function complete(){
    quotecontainer.hidden=false;
    loader.hidden=true;
}


// Show New Quote
function newQuote(){

    loading();

   const Quote= apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

   if(!Quote.author)
   {
    authorText.textContent = 'Unkown';
   }else{
   authorText.textContent = Quote.author;
   }

   if(Quote.text.length > 50)
   {
    quoteText.classList.add('long-quote');
   }
   else{
    quoteText.classList.remove('long-quote');
   }

//    Set Quote and hide loader...

   quoteText.textContent = Quote.text;
  complete();
}

async function getQuotes() {

    loading();
    const geturl= 'https://type.fit/api/quotes';

    try{
        const response= await fetch(geturl);

        apiQuotes= await response.json();

        // console.log(apiQuotes);

        newQuote();
    }
    catch(error){

    }
}

// TweetQuote--------------

function TweetQuote(){
    const twitterurl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterurl, '_blank');
}

new_Quotetbtn.addEventListener('click', newQuote);
twitterbtn.addEventListener('click', TweetQuote);
 getQuotes();

