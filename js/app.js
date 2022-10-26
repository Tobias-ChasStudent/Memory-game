//Clear local storage
localStorage.clear()
//Get the play area
const playArea = document.querySelector("#game-area");

//Get the score and tries
const score = document.querySelector("#score");
const tries = document.querySelector("#tries");

//Create array of objects for each framework
const originalCards = [{
        name: "Angular",
        icon: "angular-icon.png"
    },
    {
        name: "Ember",
        icon: "ember-icon.webp"
    },
    {
        name: "Express",
        icon: "Express-icon.png"
    },
    {
        name: "Next",
        icon: "next-icon.png"
    },
    {
        name: "Nodejs",
        icon: "nodejs-icon.png"
    },
    {
        name: "React",
        icon: "React-icon.webp"
    },
    {
        name: "Svelte",
        icon: "svelte-icon.webp"
    },
    {
        name: "Vue",
        icon: "vue-icon.webp"
    },
]
//Create an empty array to make pairs of every card
const cardsArray = []
//Duplicate the array and push it into the empty one
originalCards.forEach(element => {
    cardsArray.push(element);
    cardsArray.push(element);
});


//Shuffle the array function
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}
// Shuffle cards array
shuffle(cardsArray);
//console.log(cardsArray);

//create index
let count = 0;
//Create the cards on the play area
cardsArray.forEach(element => {
    //Create the card "box"
    let cardBox = playArea.appendChild(document.createElement("section"))
    cardBox.classList.add("card", "is-unpaired")
    cardBox.setAttribute("data-count", count)
    cardBox.setAttribute("id", element.name)

    //Create the card front
    let cardFront = cardBox.appendChild(document.createElement("div"))
    cardFront.classList.add("card-front", "card-face")
    let imageFront = cardFront.appendChild(document.createElement("img"))
    imageFront.setAttribute("src", "./img/js-icon.png")

    //Create the card back
    let cardBack = cardBox.appendChild(document.createElement("div"))
    cardBack.classList.add("card-back", "card-face")
    let imageBack = cardBack.appendChild(document.createElement("img"))
    imageBack.setAttribute("src", "./img/" + element.icon)

    //Increase the count
    count++;
});

function cardFlip() {
    
    //Find all unpaired cards
    let playAreaChildren = document.querySelectorAll(".is-unpaired")
    console.log(playAreaChildren);
    
    //Loop through all cards and give them an eventListener
    playAreaChildren.forEach((card) => {
        card.addEventListener('click', (e) => {
            //Get all flipped cards
            let flippedCards = document.querySelectorAll(".is-flipped")
            if (flippedCards.length == 0) {
                if (card.id == localStorage.getItem(card.id)) {
                    alert("Ain't no way")
                } else {
                    console.log(card.id);
                    //Flip the first card
                    card.classList.toggle('is-flipped');
                    document.querySelector("#currentCard").textContent = card.id;
                    localStorage.setItem('firstCard', card.getAttribute("data-count"))      
                }
                
            } else if (flippedCards.length == 1) {
                
                if (card.id == localStorage.getItem(card.id)) {
                    alert("Ain't no way, part 2")
                } else {
                    
                    console.log(localStorage.getItem('firstCard'));
                    
                    //Flip the second card
                    card.classList.toggle('is-flipped');
                    console.log(card.id);
                    flippedCards = document.querySelectorAll(".is-flipped")
                    
                    
                    //Check if the two cards are the same
                    setTimeout(() => {
                        if (card.id == document.querySelector("#currentCard").textContent) {
                            if (card.getAttribute("data-count") == localStorage.getItem("firstCard")) {
                                
                            } else {
                                console.log("Gaming");
                                
                                //Add 1 to score
                                let scoreValue = parseInt(score.textContent)
                                scoreValue++;
                                score.textContent = scoreValue
    
                                //Keep the cards flipped
                                flippedCards.forEach(element => {
                                    element.classList.remove('is-flipped')
                                    element.classList.add('is-paired')
                                    element.classList.remove('is-unpaired')
                                    playAreaChildren = document.querySelectorAll(".is-unpaired")
                                    cardFlip()
                                    localStorage.setItem(element.id, element.id)
                                    
                                });
                                document.querySelector("#currentCard").textContent = ""
                                if (scoreValue == 8) {
                                    setTimeout(() => {
                                        if (confirm("Well done! Would you like to play again?")) {
                                            window.reload()
                                        } 
                                    }, 1000);
                                }
                            }
                        } else {
                            console.log("Not gaming");
                            
                            //Add 1 to tries
                            let triesValue = parseInt(tries.textContent)
                            triesValue++;
                            tries.textContent = triesValue
                            
                            //Re-flip the cards
                            flippedCards.forEach(element => {
                                element.classList.toggle('is-flipped')
                            });
                            document.querySelector("#currentCard").textContent = ""
                        }
                    }, 1000);
                }
                
            }
            
            
        });
    });
}

cardFlip()