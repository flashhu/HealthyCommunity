// 根据打卡数据 得出每日健康状态
export let cardStatusCal = (data) => {
    // 1 正常；0 低烧；2 高烧；3 心率过高；4：低血压; 5 高血压
    let status = '';
    if (data.temp <= 35.5) {
        status += '0';
    }else if(data.temp >= 37.3) {
        status += '2';
    }else{
        status += '1';
    }
    if (data.heartrat && data.heartrat > 150) {
        status += '|3';
    }
    if (data.blodpres_shrink && data.blodpres_relax && data.blodpres_shrink <= 90 && data.blodpres_relax <= 60) {
        status += '|4';
    }
    if (data.blodpres_shrink && data.blodpres_relax && data.blodpres_shrink >= 140 && data.blodpres_relax >= 90) {
        status += '|5';
    }
    if (status.length < 3) {
        status += '|6';
    }
    return status;
}

// 根据打卡数据 得出每日健康分数
export let cardScoreCal = (data) => {
    let list = data.status.split('|');
    let score = 100;
    list.forEach(function (item) {
        switch (item){
            case '0': case '2':
                score -= 30;
                break;
            case '3': case '4':case '5':
                score -= 5;
                break;
            default:
                break;
        }
    })
    return score;
}

// 计算BMI
export let getBMI = (data) => {
    return (data.weight * 10000 / (data.height ** 2));
}

// 计算体脂率
export let getBFP = (data) => {
    return 1.2 * (getBMI(data)) + 0.23 * data.age - 5.4 - 10.8 * data.sex;
}

// 得到推算基础代谢率的系数
export let getF = (data) => {
    let bfp = getBFP(data)
    let f = 1;
    if (data.sex) { //男
        if(bfp >= 15 && bfp < 21) {
            f = 0.95;
        }
        if (bfp >= 21 && bfp < 27) {
            f = 0.9;
        }
        if (bfp >= 27) {
            f = 0.85;
        }
    }else { //女
        if (bfp >= 18 && bfp < 26) {
            f = 0.95;
        }
        if (bfp >= 26 && bfp < 36) {
            f = 0.9;
        }
        if (bfp >= 36) {
            f = 0.85;
        }
    }
    return f;
}

//计算基础代谢率
export let getBMR = (data) => {
    let p = 0;
    if (data.sex) { //男
        p = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
    } else { //女
        p = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
    }
    return p * getF(data);
}

//计算每日摄入量  默认 21天 目标 1公斤
export let getIngest = (data) => {
    let avg = 7700 / 21; //每公斤 7700大卡
    let res = 0;
    if (data.target) { //增肌
        res = (avg + (1 + data.level) * getBMR(data)) / 0.9;
    }else { //减肥
        res = ((1 + data.level) * getBMR(data) - avg) / 0.9;
    }
    return res;
}

// 根据习惯养成计划中数据 得出目前身体健康分数
export let habitScoreCal = (data) => {
    let score = 100;
    let bmi = getBMI(data);
    if (bmi < 18.5 || (bmi >= 25 && bmi < 30)) { //偏瘦 超重
        score -= 10;
    }
    if (bmi > 30) {
        score -= 20; //肥胖
    }
    if (data.target < 0.5) { //久坐不动
        score -= 5;
    }
    return score;
}

//计算综合健康指数
export let healthScoreCal = (params) => {
    let cardScore = params.cardScore;
    let habitScore = params.habitScore;
    if (!cardScore) {
        cardScore = 100;
    }
    if (!habitScore) {
        habitScore = 100;
    }
    return parseInt(cardScore * 0.6 + habitScore * 0.4);
}