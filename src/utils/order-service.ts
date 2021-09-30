import moment from 'moment';
import { TIngredient } from '../services/types/data';

export function getFormatedDate(dateString: string) {
    const date = new Date(dateString);
    const month = date.getMonth();
    const day = date.getDate();
    if (month < (new Date()).getMonth() || (new Date()).getDate() - day > 7) {
        return moment(date).format("DD/MM/YYYY HH:mm [i-GMT]Z")
    }
    const weekDay = date.getDay();
    let delta = (new Date()).getDay() - weekDay;
    delta = delta >= 0 ? delta : delta + 7;
    let relativeDay = ""
    switch (true) {
        case delta === 1:
            relativeDay = 'Вчера';
            break;
        case delta === 0:
            relativeDay = 'Сегодня'
            break;
        case delta > 1 && delta < 5:
            relativeDay = delta + ' дня назад'
            break;
        default:
            relativeDay = delta + ' дней назад'
            break;
    }
    return relativeDay + moment(date).format(", HH:mm [i-GMT]Z")
}

export function formatIngredientsList(ids: string[], ingredients: Array<TIngredient>) {
    const res: Array<TIngredient> = [];
    ids.forEach(ing => {
        let ingIndex = res.findIndex(item => item._id === ing);
        if (ingIndex === -1) {
            const ing1 = ingredients.find(item => item._id === ing) as TIngredient;
            res.push({ ...ing1, qty: 1 });
        } else {
            const ing1 = res[ingIndex] as TIngredient;
            if (ing1.qty)
                ing1.qty++
        }
    });
    return res;
}

export function getTotal(ingredients: Array<TIngredient>) {
    return ingredients.reduce((total, item) => item.qty ? total + item.price * item.qty : total, 0);
}

