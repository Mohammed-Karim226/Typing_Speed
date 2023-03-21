// array of words
let arr=[
"funny",
"working",
"hello",
"nice",
"fcai",
"cairo",
"helwan",
"memes",
"ahmed",
"khaled",
"rewan",
"amina",
"runner",
"trainee",
"available"
];

// setting levels
const lvls={
    "easy":5,
    "normal":3,
    "hard":2,
};

// default level
let DefaultLevelName="normal"; //change level from here "select chain or nodes to choose from varies levels"
let DefaultLevelSeconds=lvls[DefaultLevelName];

// catch selectors
let startButton=document.querySelector(".start");
let LevelNameSpan=document.querySelector(".message .lvl");
let LevelSecondsSpan=document.querySelector(".message .seconds");

let TheWord=document.querySelector(".the_word");

let UpCommingWords=document.querySelector(".upcomming_words");
let input=document.querySelector(".input");

let TimeLeftSpan=document.querySelector(".time span");
let ScoreGot=document.querySelector(".score .got");
let ScoreTotal=document.querySelector(".score .total");

let FinishMessage=document.querySelector(".finish");

// setting level Name + Seconds +Score
LevelNameSpan.innerHTML=DefaultLevelName;
LevelSecondsSpan.innerHTML=DefaultLevelSeconds;
TimeLeftSpan.innerHTML=DefaultLevelSeconds;
ScoreTotal.innerHTML=arr.length;

// disable paste event
input.onpaste=function(){
return false;
}

// start game 
startButton.onclick=function(){
this.remove();
input.focus();
// generate word function
genWords();
}

function genWords(){
    // get random word from array
    let randomWord=arr[Math.floor(Math.random() * arr.length)];
    // get word index
    let wordIndex=arr.indexOf(randomWord);
    // remove word from array
    arr.splice(wordIndex,1);
    // show the random word
    TheWord.innerHTML=randomWord;
    // empty upcomming words
    UpCommingWords.innerHTML='';
    // genertae upcomming words
    for(let i=0; i<arr.length; i++){
        // crate words div
        let div =document.createElement("div");
        let txt =document.createTextNode(arr[i]);
        div.appendChild(txt);
        UpCommingWords.appendChild(div);
    }

    //Call strat play function
    startPlay();
}

function startPlay(){
    TimeLeftSpan.innerHTML=DefaultLevelSeconds;
    let start=setInterval(() => {
        TimeLeftSpan.innerHTML--;
        if(TimeLeftSpan.innerHTML === "0"){
            // stop timer
            clearInterval(start);
            // compare words
            if(TheWord.innerHTML.toLowerCase() === input.value.toLowerCase()){
                // empty input field
                input.value='';
                // increase score
                ScoreGot.innerHTML++;
                 // calling generate words
                 if(arr.length>0){
                    genWords();
                }else{
                    let span=document.createElement("span");
                    span.className='good';
                    let spanTxt=document.createTextNode("Greate Work, Move To Next Level");
                    span.appendChild(spanTxt);
                    FinishMessage.appendChild(span);
                    // remove upcomming div
                    UpCommingWords.remove();
                }

            }else{
                let span=document.createElement("span");
                span.className='bad';
                let spanTxt=document.createTextNode("Game Over");
                span.appendChild(spanTxt);
                FinishMessage.appendChild(span);
                input.value='';
            }
                           
        }
    }, 1000);
}