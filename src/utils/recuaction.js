
 let recucation = (menuList=[],allRoutes=[]) =>{
    let newRouter = []
        menuList.forEach(menu=>{
            allRoutes.forEach(item=>{
                if(menu.title===item.meta.title){
                    if(item.children&&item.children.length>1){
                       item.children = recucation(menu.children,item.children)
                    }
                    newRouter.push(item)
                }
            })
        })
        return newRouter
 }

 export default recucation