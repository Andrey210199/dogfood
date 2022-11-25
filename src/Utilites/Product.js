export function createMarkup(htmlText){
    return{__html: htmlText};
}

export function productLike(cards, newCard, setCards){
    const updateCard = cards.map(card => card._id === newCard._id ? newCard : card);
    setCards(updateCard);
}

export function scrollClear(){
    window.scrollTo(0,0);
}