function solve() {

    let playerOneCards = document.querySelectorAll('#player1Div img');
    let playerTwoCards = document.querySelectorAll('#player2Div img');
    let result = document.querySelector('#result');
    let spanElements = document.querySelectorAll('span');
    let firstElClicked = false;
    let secondElClicked = false;



    greaterCard();

    
    function greaterCard() {

        let firstCard = addEventListenerToCard(playerOneCards, firstElClicked);
        let secondCard = addEventListenerToCard(playerTwoCards, secondElClicked);
        console.log(firstCard)
        cardBorder(firstCard, secondCard);


        // make firstClicked and secondClicked false at the end, also span ''
    }

    function cardBorder(cardOne, cardTwo) {
        if (cardOne !== undefined && cardTwo !== undefined) {
            console.log(cardOne, cardTwo)
            console.log(cardOne.name)
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
        //Error, must select only one el, debug pls
        if (playerCardWork.parentNode.id == "player1Div") {
            spanElements[0].innerText = playerCardWork.name;
            firstElClicked = true;
            
        } else {
            spanElements[2].innerText = playerCardWork.name;
            secondElClicked = true;
        }
        playerCardWork.src = "images/whiteCard.jpg";
        closeEventListener(playerCardWork.parentNode);
    }


    function addEventListenerToCard(playerCards) {

        for (let index = 0; index < playerCards.length; index++) {
            
            let playerCard = playerCards[index];
            
                playerCard.addEventListener('click', eventListenerWork);
            }
        }

        // After every hand, push the current card names in the history div in the following format:
        // [{top side card name} vs {bottom side card name} ]
    
}