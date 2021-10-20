function solve() {

    let playerOneCards = document.querySelectorAll('#player1Div img');
    let playerTwoCards = document.querySelectorAll('#player2Div img');
    let spanElements = document.querySelectorAll('span');
    let divHistory = document.querySelector('#history');
    let tempCounterForResult = 0;
    let twoCardsArr = [];

        addEventListenerToCard(playerOneCards);
        addEventListenerToCard(playerTwoCards);
   
    function cardBorder(cardOne, cardTwo) {
        if (cardOne !== undefined && cardTwo !== undefined) {
            
            if (Number(cardOne.name) > Number(cardTwo.name)) {
                cardOne.border ="2px solid green";
                cardTwo.border ="2px solid red";
                return;
            }
            cardOne.border = "2px solid red";
            cardTwo.border = "2px solid green";
            return;
        }
    }

    function closeEventListener(cards) {
        for (let i = 0; i < cards.children.length; i++) {
            cards.children[i].removeEventListener('click', eventListenerWork);
        }
    }

    function eventListenerWork(e) {
        let playerCardWork = e.target;
        if (playerCardWork.src == "http://127.0.0.1:5500/images/card.jpg") {
            if (playerCardWork.parentNode.id == "player1Div") {
                spanElements[0].innerText = playerCardWork.name;
                closeEventListener(playerCardWork.parentNode);
                addEventListenerToCard(playerTwoCards);
            } else {
                spanElements[2].innerText = playerCardWork.name;
                closeEventListener(playerCardWork.parentNode);
                addEventListenerToCard(playerOneCards);
            }

            tempCounterForResult++;
            playerCardWork.src = "images/whiteCard.jpg";
            twoCardsArr.push(playerCardWork);

            timeForResult();
            
        }
    }

    function timeForResult(){
        
        if (tempCounterForResult % 2 == 0 && tempCounterForResult !== 0) {
            
            let firstCard = twoCardsArr[0];
            let secondCard = twoCardsArr[1];
            //fix border colour for image
            cardBorder(firstCard, secondCard);
            divHistory.innerText += `${firstCard.name} vs ${secondCard.name}\n`;
            twoCardsArr=[];

            setTimeout(()=> {
            spanElements[0].innerText = '';
            spanElements[2].innerText = '';}, 2000);
        }
    }

    function addEventListenerToCard(playerCards) {

        for (let index = 0; index < playerCards.length; index++) {
            
            let playerCard = playerCards[index];
            
                playerCard.addEventListener('click', eventListenerWork);
            }
        }
    
}