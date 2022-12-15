export function createMarkup(htmlText){
    return{__html: htmlText};
}

export function productLike(cards, newCard, setCards){
    const updateCard = cards.map(card => card._id === newCard._id ? newCard : card);
    setCards(updateCard);
}

export function productFilter(data, user, filterCondition){
    return data.filter(item=> filterCondition(item, user));

}

export function scrollClear(){
    window.scrollTo(0,0);
}