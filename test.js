var goodsSku = [
    { "sku_id": 9, "sku_name": "小黑", "price": "12.00", "stock": 0, "parent_rate": "0.0100", "ancestor_rate": "0.0100", "specList": [{ color: "黑色" }, { size: "小号" }] },
    { "sku_id": 10, "sku_name": "小白", "price": "15.00", "stock": 0, "parent_rate": "0.0100", "ancestor_rate": "0.0200", "specList": [{ color: "白色" }, { size: "小号" }] }
  ]
  const test = (goodsSku) => {
    let temp1 = []
    goodsSku.forEach(item=> {
      temp1.push(...item.specList)
    })
  
    return goodsSku.map(item=>{
      let json = {...item}
      if (temp1 && temp1.length > 0) {
        json.color = []
        json.size = []
        temp1.forEach(i => {
          i.color && json.color.push(i.color)
          i.size && json.size.push(i.size)
        })
      }
    //   json.specList = JSON.stringify(json.specList)
      return {
        ...json,
        color: [...new Set(json.color)],
        size: [...new Set(json.size)]
      }
    })
   
  }
   console.log(test(goodsSku))