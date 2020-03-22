async function decrementProductStock (productsArray) {
    const edits = await productsArray.reduce( async (previousPromise, originalProduct) => {
      await previousPromise;
      var find = await products.query().findOne({
        id:originalProduct.id,
      })
      console.log("find",originalProduct.id,find.stock)
      var decrement = await find.$query().updateAndFetch({
        stock:find.stock-originalProduct.count
      })
      return decrement
    }, Promise.resolve());
    return edits
    /////////////
    // var edits = await Promise.all([productsArray.map(async originalProduct=>{
    //   var find = await products.query().findOne({
    //     id:originalProduct.id,
    //     name:originalProduct.name
    //   })
    //   console.log("find",originalProduct.id,find.stock)
    //   var decrement = await find.$query().updateAndFetch({
    //     stock:find.stock-1
    //   })
    //   return decrement
    // })])
    // return edits
    
  }