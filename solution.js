function solve() {

    const redPlayerWinMessage = "The winnder is The Red Player!!! Bow down to the Empire of the Sits!";
    const bluePlayerWinMessage = "The winner is The Blue Player!!! Congrats, you saved the galaxy!";
    const noWinnerMessage = "No winner... The war has just begun!";
    const cardsNumber = 8;

    createHtmlCards();

    let playerOneCards = document.querySelectorAll('#player1Div img');
    let playerTwoCards = document.querySelectorAll('#player2Div img');
    let spanElements = document.querySelectorAll('span');
    let tempCounterForResult = 0;
    let twoCardsArr = [];
    let resultsArray =[];

    addEventListenerForCard(playerOneCards);
    addEventListenerForCard(playerTwoCards);

    function createHtmlCards() {

        let player = document.querySelector('#player1Div');
        let cardColor = 'images/starWarsRed.png';

        for (let inx = 0; inx < cardsNumber * 2; inx++) {
            if (inx == cardsNumber) {
                player = document.querySelector('#player2Div');
                cardColor = 'images/starWarsBlue.png';
            }
            let randNumber = Math.floor(Math.random() * 10);
            let createCard = document.createElement('div');

            createCard.className = "scene scene--card";
            createCard.innerHTML =
                `
                    <div class="card">
                        <div class="card__face card__face--front">
                            <img width="140" height="220" src="${cardColor}" id="${randNumber}">
                        </div>
                        <div class="card__face card__face--back">
                            <img  width="140" height="220" src="${"images/" + randNumber + ".png"}">
                        </div>
                    </div>
                `;
            player.appendChild(createCard);
        }
    }

    function closeEventListenerForCard(cards) {
        for (let i = 0; i < cardsNumber * 2; i++) {
            cards[i].removeEventListener('click', eventListenerWork);
        }
    }

    function eventListenerWork(e) {

        let playerCardWork = e.target;
        let port = window.location.href.slice(0, 22);
        let cardWorkParentNode = playerCardWork.parentNode.parentNode.parentNode.parentNode;

        if (playerCardWork.src == `${port}images/starWarsRed.png` ||
            playerCardWork.src == `${port}images/starWarsBlue.png`) {

            if (cardWorkParentNode.id == "player1Div") {
                switchClicableCard(0, playerOneCards, playerTwoCards, playerCardWork);
            } else {
                switchClicableCard(2, playerTwoCards, playerOneCards, playerCardWork);
            }

            playerCardWork.parentNode.parentNode.classList.toggle('is-flipped');
            tempCounterForResult++;
            twoCardsArr.push(playerCardWork);
            showResult();
        }
    }

    function switchClicableCard(num, oldCard, newCard, currentCard){
        spanElements[`${num}`].innerText = currentCard.id;
                closeEventListenerForCard(oldCard);
                addEventListenerForCard(newCard);
    }

    function showResult() {
            
        if (tempCounterForResult % 2 == 0 && tempCounterForResult !== 0) {
            
            let firstCard = twoCardsArr[0];
            let secondCard = twoCardsArr[1];
            resultsArray.push(firstCard.id,secondCard.id);
            document.querySelector('#history').innerText += `[${firstCard.id} vs ${secondCard.id}]`;
            twoCardsArr = [];

            setTimeout(() => clearSpanResult(), 500);
        }
        if (tempCounterForResult == cardsNumber * 2) {

            let winner = calculateWinner();
            setWinnerMessage(winner);
            closeEventListenerForCard(playerOneCards);
            closeEventListenerForCard(playerTwoCards);
        }
    }

    function clearSpanResult(){
        spanElements[0].innerText = ''; 
        spanElements[2].innerText = '';
    }

    function setWinnerMessage(val){
        switch (val) {
            case 0:
                spanElements[1].innerText = bluePlayerWinMessage;
                break;
            case 1:
                spanElements[1].innerText = redPlayerWinMessage;
                break;
        
            default:
                spanElements[1].innerText = noWinnerMessage;
                break;
        }
    }

    function calculateWinner() {

        let firstPlayerWins = 0, secondPlayerWins = 0;

        for (let l = 0; l < cardsNumber * 2; l += 2) {
            if (Number(resultsArray[l]) > Number(resultsArray[l + 1])) {
                firstPlayerWins++;
            } else if (Number(resultsArray[l + 1]) > Number(resultsArray[l])) {
                secondPlayerWins++;
            }
        }
        clearSpanResult();
        return compare(firstPlayerWins, secondPlayerWins);
    }

    function compare(a, b) {
        if (a - b > 0) {
            return 1;
        }
        if (a - b < 0) {
            return 0;
        }
        return -1;
    }

    function addEventListenerForCard(playerCards) {

        for (let inx = 0; inx < playerCards.length; inx++) {

            let playerCard = playerCards[inx];

            playerCard.addEventListener('click', eventListenerWork);
        }
    }

}