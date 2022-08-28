import cardsDataBlue from "./data/mythicCards/blue/index.js";
import cardsDataBrown from "./data/mythicCards/brown/index.js";
import cardsDataGreen from "./data/mythicCards/green/index.js";
import ancientsData from "./data/ancients.js";

const header = document.querySelector('header');
const h1 = document.querySelector('h1');
const level = document.querySelector('.level');
const mix_btn = document.querySelector('.mix_btn');
const footer = document.querySelector('footer');
const mythic_card = document.querySelector('.mythic_card');
const сard_deck = document.querySelector('.сard_deck');

/*Выбор древнего*/
header.addEventListener('click', (e) => {
    const className = e.target.className;
    let numberAncient = getNumberAncient(className);
    coloredAncient(numberAncient);
    if (h1.className.includes('h1_active')) {
        clearBackground();
        mix_btn.classList.remove('mix_btn_active');
        footer.classList.remove('footer_active');
    }
    h1.classList.add('h1_active');
    level.classList.add('level_active');
    level.addEventListener('click', (e) => {
        const levelClass = e.target.className;
        if (footer.className.includes('footer_active')) {
            footer.classList.remove('footer_active');
        }
        clearBackground();
        сard_deck.style.backgroundImage = 'none';
        paintBackground(levelClass, className);
        getNumberOfCards(numberAncient);
        let allCards = getAllCards(levelClass);
        mix_btn.classList.add('mix_btn_active');
        mix_btn.onclick = (e) => {
            let cards = getPlaingCards(numberAncient, allCards);
            footer.classList.add('footer_active');
            mythic_card.onclick = (e) => {
                enterCards(cards);
            };
        }; 
    });
})

function getNumberAncient(ancient) {
    let number; 
    for (let i=0; i<ancientsData.length; i++) {
        if (ancientsData[i].id == ancient) {number=i;} 
    }
    return number;
}
function coloredAncient(ancient) {
    let img = document.querySelectorAll('img');
    for (let i=0; i<img.length; i++) {
        if (img[i].className.includes('img_active')) {
            img[i].classList.remove('img_active');
        }
    }
    img[ancient].classList.add('img_active');
}
function getNumberOfCards(ancient) {      
    let arr = ['firstStage', 'secondStage', 'thirdStage'];
    for (let j=0; j<3; j++) {
        let stage = document.querySelectorAll(`.${arr[j]}`);
        stage[0].textContent = '';
        stage[1].textContent = '';
        stage[2].textContent = '';
    }
    for (let j=0; j<arr.length; j++) {
        let stage = document.querySelectorAll(`.${arr[j]}`);
        stage[0].textContent = `${ancientsData[ancient][arr[j]]['greenCards']}`;
        stage[1].textContent = `${ancientsData[ancient][arr[j]]['brownCards']}`;
        stage[2].textContent = `${ancientsData[ancient][arr[j]]['blueCards']}`;
    }
}    

/*Выбор уровня*/
function clearBackground() {
    let btnActive = document.querySelectorAll('button');
    for (let i=0; i<btnActive.length; i++) {
        if (btnActive[i].className.includes('btn_active')) {
            btnActive[i].classList.remove('btn_active');
        }
    }
}
function paintBackground(btn, head) {
    let headerClass = document.querySelector(`.${head}`);
    if (headerClass.className.includes('img_active')) {
    let active = document.querySelector(`.${btn}`);
    active.classList.add('btn_active');}
}

/*Отбор исходных карт средней сложности в зависимости от уровня*/
function getAllCards(difficulty){
    let greenCards = [];
    let brownCards = [];
    let blueCards = [];
    if (difficulty == 'easy'){
        for (let i=0; i<cardsDataGreen.length; i++) {
            if ((cardsDataGreen[i].difficulty=='normal')||(cardsDataGreen[i].difficulty=='easy')) {
            greenCards.push(cardsDataGreen[i].cardFace);
            }
        }  
        for (let i=0; i<cardsDataBrown.length; i++) {
            if ((cardsDataBrown[i].difficulty=='normal')||(cardsDataBrown[i].difficulty=='easy')) {
                brownCards.push(cardsDataBrown[i].cardFace);
             }
        }  
        for (let i=0; i<cardsDataBlue.length; i++) {
            if ((cardsDataBlue[i].difficulty=='normal')||(cardsDataBlue[i].difficulty=='easy')) {
                blueCards.push(cardsDataBlue[i].cardFace);
             }
        } 
    }
    if (difficulty == 'normal') {
        for (let i=0; i<cardsDataGreen.length; i++) {
            greenCards.push(cardsDataGreen[i].cardFace);
        }       
        for (let i=0; i<cardsDataBrown.length; i++) {
            brownCards.push(cardsDataBrown[i].cardFace);
        }       
        for (let i=0; i<cardsDataBlue.length; i++) {
            blueCards.push(cardsDataBlue[i].cardFace);
        } 
    }  
    if (difficulty == 'hard'){
        for (let i=0; i<cardsDataGreen.length; i++) {
            if ((cardsDataGreen[i].difficulty=='normal')||(cardsDataGreen[i].difficulty=='hard')) {
            greenCards.push(cardsDataGreen[i].cardFace);
            }
        }  
        for (let i=0; i<cardsDataBrown.length; i++) {
            if ((cardsDataBrown[i].difficulty=='normal')||(cardsDataBrown[i].difficulty=='hard')) {
                brownCards.push(cardsDataBrown[i].cardFace);
             }
        }  
        for (let i=0; i<cardsDataBlue.length; i++) {
            if ((cardsDataBlue[i].difficulty=='normal')||(cardsDataBlue[i].difficulty=='hard')) {
                blueCards.push(cardsDataBlue[i].cardFace);
             }
        } 
    }
    let allCards = [];
    allCards.push(greenCards);
    allCards.push(brownCards);
    allCards.push(blueCards);
    return allCards;
}

/*Отбор колоды карт для игры*/
function getPlaingCards(ancient, all) {
    /*перетасовка исходных карт разных цветов*/
    const greenCards = all[0];
    const brownCards = all[1];
    const blueCards = all[2];
    const allGreenCards = greenCards.sort(()=>Math.random()-0.5);
    const allBrownCards = brownCards.sort(()=>Math.random()-0.5);
    const allBlueCards = blueCards.sort(()=>Math.random()-0.5);
    let arrayFirstStage = ancientsData[ancient]['firstStage']['arrayFirstStage'];
    let arraySecondStage = ancientsData[ancient]['secondStage']['arraySecondStage'];
    let arrayThirdStage = ancientsData[ancient]['thirdStage']['arrayThirdStage'];
    let littleFirstStageCards = [];
    let littleSecondStageCards = [];
    let littleThirdStageCards = [];
    /*1=green; 2= brown; 3=blue*/ 
    /*отбор для первой стадии*/
    for (let i=0; i<arrayFirstStage.length; i++) {
        let elem;
        if (arrayFirstStage[i]==1) {
            elem = allGreenCards.pop();
        } 
        if (arrayFirstStage[i]==2) {
            elem = allBrownCards.pop();
        } 
        if (arrayFirstStage[i]==3) {
            elem = allBlueCards.pop();
        } 
        littleFirstStageCards.push(elem);
    }
    /*отбор для второй стадии*/
    for (let i=0; i<arraySecondStage.length; i++) {
        let elem;
        if (arraySecondStage[i]==1) {
            elem = allGreenCards.pop();
        } 
        if (arraySecondStage[i]==2) {
            elem = allBrownCards.pop();
        } 
        if (arraySecondStage[i]==3) { 
            elem = allBlueCards.pop();
        } 
        littleSecondStageCards.push(elem);
    }
    /*отбор для третьей стадии*/
    for (let i=0; i<arrayThirdStage.length; i++) {
        let elem;
        if (arrayThirdStage[i]==1) {
            elem = allGreenCards.pop();
        } 
        if (arrayThirdStage[i]==2) {
            elem = allBrownCards.pop();
        } 
        if (arrayThirdStage[i]==3) {
            elem = allBlueCards.pop();
        }
        littleThirdStageCards.push(elem);     
    }
    /*перетасовка полученных малых колод*/
    let getFirst = littleFirstStageCards.sort(()=>Math.random()-0.5);
    let getSecond = littleSecondStageCards.sort(()=>Math.random()-0.5);
    let getThird = littleThirdStageCards.sort(()=>Math.random()-0.5);
    /*объединение малых колод: третья стадия, вторая, первая*/
    let plaingCards = [];
    plaingCards.push(getThird);
    plaingCards.push(getSecond);
    plaingCards.push(getFirst);
    return plaingCards;
}

/*ввод игральных карт в игру при клике на рубашку*/
function enterCards(cards) {
    const сard_deck = document.querySelector('.сard_deck');
    console.log (cards);
    const st1 = document.querySelectorAll('.firstStage');
    const st2 = document.querySelectorAll('.secondStage');
    const st3 = document.querySelectorAll('.thirdStage');
    let lastElem;
    let string = '';
    /*ввод первой стадии*/
    if (cards[2].length>0) {
        lastElem = cards[2].pop();
        string = lastElem;
        /*трекер карт первой стадии*/
        if (string.includes('green')) {
            st1[0].textContent=st1[0].textContent-1;
        } else {
            if (string.includes('brown')) {
                st1[1].textContent=st1[1].textContent-1;
            } else {
                st1[2].textContent=st1[2].textContent-1;
            }
        }
    } else {
        /*ввод второй стадии*/
        if (cards[1].length>0) {
            lastElem = cards[1].pop();
            string = lastElem;
            /*трекер карт второй стадии*/
            if (string.includes('green')) {
                st2[0].textContent=st2[0].textContent-1;
            } else {
                if (string.includes('brown')) {
                    st2[1].textContent=st2[1].textContent-1;
                } else {
                    st2[2].textContent=st2[2].textContent-1;
                }
            }
        } else {
            /*ввод третьей стадии*/
            if (cards[0].length>0) {
                lastElem = cards[0].pop();
                string = lastElem;
                /*трекер карт третьей стадии*/
                if (string.includes('green')) {
                    st3[0].textContent=st3[0].textContent-1;
                } else {
                    if (string.includes('brown')) {
                        st3[1].textContent=st3[1].textContent-1;
                    } else {
                        st3[2].textContent=st3[2].textContent-1;
                    }
                }
            } else {
                lastElem ='none';
            }
        }
    } 
    console.log (lastElem);
    сard_deck.style.backgroundImage =`url(${lastElem})`;
}

