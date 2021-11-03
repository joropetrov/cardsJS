function solve() {

    const redPlayerWinMessage = "The winnder is The Red Player!!!\nBow down to the Empire of the Sits";
    const bluePlayerWinMessage = "The winner is The Blue Player!!!\nCongrats, you saved the galaxy";
    const noWinnerMessage = "No winner... The war has just begun!";
    let playerOneDiv = document.querySelector('#player1Div');
    let playerTwoDiv = document.querySelector('#player2Div');
    let cardsNumber = 8;

    createHtmlCards(playerOneDiv);
    createHtmlCards(playerTwoDiv);

    let playerOneCards = document.querySelectorAll('#player1Div img');
    let playerTwoCards = document.querySelectorAll('#player2Div img');
    let spanElements = document.querySelectorAll('span');
    let divHistory = document.querySelector('#history');
    let tempCounterForResult = 0;
    let twoCardsArr = [];
    let resultsArray =[];


    addEventListenerToCard(playerOneCards);
    addEventListenerToCard(playerTwoCards);

    function createHtmlCards(chosePlayer) {

        let cardImg = 'images/starWarsBlue.png';

        if (chosePlayer.id == 'player1Div') {
            cardImg = 'images/starWarsRed.png';
        };

        for (let inx = 0; inx < cardsNumber; inx++) {

            let randNumber = Math.floor(Math.random() * 10);
            
            let secondCardPath = "images/" + randNumber +".png";
            let createCard = document.createElement('div');
            createCard.className ="scene scene--card";
            createCard.innerHTML =
            `
                <div class="card">
                    <div class="card__face card__face--front">
                        <img width="140" height="220" src="${cardImg}" id="${randNumber}">
                    </div>
                    <div class="card__face card__face--back">
                        <img  width="140" height="220" src="${secondCardPath}">
                    </div>
                </div>
            `;
            chosePlayer.appendChild(createCard);
        }
    }

    function closeEventListener(cards) {
        for (let i = 0; i < cardsNumber * 2; i++) {
            cards[i].removeEventListener('click', eventListenerWork);
        }
    }

    function eventListenerWork(e) {
        
        let playerCardWork = e.target;
        let currentLiveServerPath = window.location.href.slice(0,22);
        let cardWorkParentNode = playerCardWork.parentNode.parentNode.parentNode.parentNode;
        if (playerCardWork.src == `${currentLiveServerPath}images/starWarsRed.png` ||
        playerCardWork.src ==`${currentLiveServerPath}images/starWarsBlue.png`) {

            if (cardWorkParentNode.id == "player1Div") {
                spanElements[0].innerText = playerCardWork.id;
                closeEventListener(playerOneCards);
                addEventListenerToCard(playerTwoCards);
            } else {
                spanElements[2].innerText = playerCardWork.id;
                closeEventListener(playerTwoCards);
                addEventListenerToCard(playerOneCards);
            }

            playerCardWork.parentNode.parentNode.classList.toggle('is-flipped');
           
            tempCounterForResult++;
            twoCardsArr.push(playerCardWork);
            timeForResult();
        }
    }
       

    function timeForResult() {

        if (tempCounterForResult % 2 == 0 && tempCounterForResult !== 0) {
            
            let firstCard = twoCardsArr[0];
            let secondCard = twoCardsArr[1];
            resultsArray.push(firstCard.id,secondCard.id);
            divHistory.innerText += `${firstCard.id} vs ${secondCard.id}\n`;
            twoCardsArr = [];

            setTimeout(() => {
                spanElements[0].innerText = '';
                spanElements[2].innerText = '';
            }, 500);
        }

        if (tempCounterForResult == cardsNumber * 2) {
            
            let firstPlayerWins = 0;
            let secondPlayerWins = 0;
            for (let l = 0; l < cardsNumber * 2; l+=2) {
                const firstElement = Number(resultsArray[l]);
                const secondElement = Number(resultsArray[l + 1]);
                if (firstElement > secondElement) {
                    firstPlayerWins++;
                }else if (secondElement > firstElement) {
                    secondPlayerWins++;
                }
            }
            let result = firstPlayerWins - secondPlayerWins;
                spanElements[0].innerText = '';
                spanElements[2].innerText = '';
            if (result > 0) {
                spanElements[1].innerText = redPlayerWinMessage;
            } else if(result < 0){
                spanElements[1].innerText = bluePlayerWinMessage;
            } else{
                spanElements[1].innerText = noWinnerMessage;
            }
        }
    }

    function addEventListenerToCard(playerCards) {

        for (let inx = 0; inx < playerCards.length; inx++) {

            let playerCard = playerCards[inx];

            playerCard.addEventListener('click', eventListenerWork);
        }
    }

}