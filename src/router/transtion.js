let treeToFlat = (flat)=>{
    let newArr = []
    function toFlat(flat){
        flat.forEach(item=>{
            if(item.children){
                toFlat(item.children)
            }
            newArr.push({
                id:item.id,
                name:item.name,
                title:item.title??""               
            })
        })
    }
    toFlat(flat)
    return newArr
}

let flatToTree = (target) =>{
    let newArr = []
    target.forEach(item=>{
       let parent = target.find(fat=>item.pid===fat.id)
       if(parent){
        if(!parent.children){
            parent.children = []
        }
        parent.children.push(item)
       }else{
        newArr.push(item)
       }
    })
    return newArr
 }

export {
    treeToFlat,
    flatToTree
}