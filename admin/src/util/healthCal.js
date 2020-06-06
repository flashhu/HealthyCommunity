export let cardStatusCountCal = (data, date) => {
    let finishNum = 0, unfinishNum = 0;;
    let startIndex = 0;
    if (data.length !== 0) {
        if (data[0].latestCard === date) {
            finishNum = data[0].num;
            startIndex = 1;
        }
        
        data.forEach(function (item, i) {
            if (i >= startIndex) {
                unfinishNum += item.num;
            }
        })
    }
    return {finish: finishNum, unfinish: unfinishNum};
}

export let healthStatusCountCal = (data) => {
    let len = data.length;
    let normalNum = 0, unnormalNum = 0;
    if(len === 1) {
        normalNum = data[0].tempStatus === 1 ? data[0].num : 0;
        unnormalNum = data[0].tempStatus === 0 ? data[0].num : 0;
    }else if (len !== 0){
        normalNum = data[1].num;
        unnormalNum = data[0].num;
    }
    return {normal: normalNum, unnormal:unnormalNum}
}