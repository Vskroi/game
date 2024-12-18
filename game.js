const gameContainer = document.getElementById('gameContainer')
const emoji =  [
    '🍎',
    '🍎',
    '🍏',
    '🍏',
    '🍌',
    '🍌',
    '🍉',
    '🍉',
    '🍒',
    '🍒',
    '🍓',
    '🍓',
    '🥝',
    '🥝',
    '🍅',
    '🍅',
]
function rendom(array){
    
    for(let i = array.length -1; i > 0; i--){
        const j = Math.floor(Math.random()*(1 + 10));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
rendom(emoji)

//====================================================================================================================

emoji.forEach(num => {
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    cardDiv.dataset.value = num
    cardDiv.innerHTML = '<span style = "position: absolute;" class="hidden">'+num+'</span>'

    gameContainer.appendChild(cardDiv)
});
let cardOne = null;
let cardTwo = null;
let lockBoard = false;
//==================================================================================================

//==================================================================================================

function closeCard (event){
    if (lockBoard)return ;
    const clickedCard = event.target;
    if(clickedCard === cardOne) return;
    clickedCard.classList.add('flip')
    clickedCard.querySelector('span').classList.remove('hidden')
    clickedCard.classList.remove('card')
clickedCard.classList.add('card2')
    if(!cardOne){
        cardOne = clickedCard
    }
    else{
        cardTwo = clickedCard;
        checkMath();
    }
}
function checkMath(){
  
    const match = cardOne.dataset.value == cardTwo.dataset.value;
    match ? hidcard() : unflip()
}
function hidcard(){
cardOne.removeEventListener('click',closeCard);
cardTwo.removeEventListener('click',closeCard);

reset();
}
function unflip(){
    lockBoard = true;
    setTimeout(()=>{
        cardOne.classList.remove('flip')
        cardOne.classList.add('card')
        cardOne.classList.remove('card2')
        cardOne.querySelector('span').classList.add('hidden')
        cardTwo.classList.remove('flip')
        cardTwo.classList.add('card')
        cardTwo.classList.remove('card2')
        cardTwo.querySelector('span').classList.add('hidden')
        reset();    
    },1000)
    }
function reset(){
    [cardOne,cardTwo,lockBoard] = [null,null,false]
    

}
document.querySelectorAll('.card').forEach((num)=>{
num.addEventListener('click',closeCard)})
