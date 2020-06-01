export let cardStatusCountCal = (data, date) => {
    let finishNum = 0;
    let startIndex = 0;
    if(data[0].latestCard === date) {
        finishNum = data[0].num;
        startIndex = 1;
    }
    let unfinishNum = 0;
    data.forEach(function (item, i) {
        if (i >= startIndex) {
            unfinishNum += item.num;
        }
    })
    return {finish: finishNum, unfinish: unfinishNum};
}