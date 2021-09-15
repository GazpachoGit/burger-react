import moment from 'moment';

export function getDate(dateString) {
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