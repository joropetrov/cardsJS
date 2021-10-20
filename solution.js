function solve() {

    let playerOneCards = document.querySelectorAll('#player1Div img');
    let playerTwoCards = document.querySelectorAll('#player2Div img');
    let result = document.querySelector('#result');
    let spanElements = document.querySelectorAll('span');
    let firstElClicked = false;
    let secondElClicked = false;
    

    
    greaterCard();

    function greaterCard(){

        let firstCard = addEventListener(playerOneCards, firstElClicked);
        let secondCard = addEventListener(playerTwoCards,secondElClicked);
        cardBorder(firstCard, secondCard); 


        // make firstClicked and secondClicked false at the end, also span ''
    }
    
    function cardBorder(cardOne, cardTwo){

        if (Number(cardOne.name) > Number(cardTwo.name)) {
            cardOne.border="2px solid green";
            cardTwo.border="2px solid red";
            return;
        } 
        cardOne.border="2px solid red";
        cardTwo.border="2px solid green";
        return;
    }


    function addEventListener(playerCards, elementClicked){
        
        for (let index = 0; index < playerCards.length; index++) {
            
            let playerCard = playerCards[index];
            if (elementClicked == false) {
                playerCard.addEventListener('click', () => {

                    playerCard.src="images/whiteCard.jpg";
                        //Error, must select only one el, debug pls
                    if (playerCard.parentNode.id == "player1Div") {
                        spanElements[0].innerText = playerCard.name;
                        firstElClicked = true;
                    }else{
                        spanElements[2].innerText = playerCard.name;
                        secondElClicked = true;
                    }   

                    return playerCard;
                });
            }
            else{
                return;
            }
         }
   
        
  
        // After every hand, push the current card names in the history div in the following format:
        // [{top side card name} vs {bottom side card name} ]
    }
}