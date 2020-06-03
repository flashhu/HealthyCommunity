 /**
* 正则匹配模糊查询
* @param {Object} lists 所有数据
* @param {Object} keyWord 查询的关键词
*/
export let selectMatchItem = (lists, keyWord) => {
    let resArr = lists.filter(item => {
        return item.name.toUpperCase().includes(keyWord.toUpperCase())
    })
    return resArr;
}