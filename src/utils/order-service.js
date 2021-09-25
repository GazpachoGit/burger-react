import moment from 'moment';

export function getFormatedDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth();
    const day = date.getDate();
    if(month < (new Date()).getMonth() || (new Date()).getDate() - day > 7) {
        return moment(date).format("DD/MM/YYYY HH:mm [i-GMT]Z")
    }
    const weekDay = date.getDay();
    let delta = (new Date()).getDay() - weekDay;
    delta = delta >= 0 ? delta : delta + 7;
    let relativeDay = ""
    switch(true) {
        case delta === 1: 
            relativeDay = 'Вчера';
            break;
        case delta === 0:
            relativeDay =  'Сегодня'
            break;
        case delta> 1 && delta < 5:
            relativeDay =  delta + ' дня назад'
            break;
        default: 
            relativeDay =  delta + ' дней назад'
            break;
    }
    return relativeDay + moment(date).format(", HH:mm [i-GMT]Z")
}

export function formatIngredientsList(ids, ingredients) {
    const res = [];
    ids.forEach(ing => {
        let ingIndex = res.findIndex(item => item._id === ing);
        if(ingIndex === -1) {
            res.push({...ingredients.find(item => item._id === ing), qty: 1});
        } else {
            res[ingIndex].qty++
        }
    });
    return res;
}

export function getTotal(ingredients){
    return ingredients.reduce((total, item) => item.qty ? total + item.price * item.qty : total, 0);
}

