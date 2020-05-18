import moment from 'moment'

export let getCurrDate = () => {
    return moment(new Date()).format('YYYY/MM/DD')
}

// 24小时制
export let getCurrTime = () => {
    return moment(new Date()).format('HH:mm:ss')
}

//'20200512131516'
export let getDateTime = (date) => {
    return moment(new Date()).format('YYYYMMDDHHmmss')
}

//'20200512131516' || '20200512' => '2020/05/12'
export let convertI2D = (date) => {
    let _date = date + ''
    let year = _date.substring(0, 4)
    let month = _date.substring(4, 6)
    let day = _date.substring(6, 8)
    return `${year}/${month}/${day}`
}

//'20200512131516' => '13:15:16'
export let convertI2T = (date) => {
    let _date = date.substring(8) + ' '
    let hour = _date.substring(0, 2)
    let moment = _date.substring(2, 4)
    let second = _date.substring(4, 6)
    return `${hour}:${moment}:${second}`
}
