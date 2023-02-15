let modules = import.meta.glob("../pages/home/**/*.vue")
let defaults = import.meta.globEager("../pages/home/**/*.vue")
import {flatToTree,treeToFlat} from "./transtion"

let flatRouter = []

for(let path in modules){
    let component = modules[path]
    let reg = /\.{2}\/pages\/home\/(.+)\/index\.vue$/
    let match = path.match(reg)
    let meta = defaults[path].default.meta
    if(match){
        let obj = {
            path:match[1],
            component,
            meta:meta??{},
            name:meta?.routename
        }
        flatRouter.push(obj)
    }
}

flatRouter.forEach(item=>{
   let res = item.path.split("/")
    if(res.length===1){
        item.id = res.join("")
        item.path = `/${item.path}`
    }else{
        let arr = [...res]
        item.id = arr.join("-")
        item.path = arr.pop()
        item.pid = arr.join("-")
    }
})

let routers = flatToTree(flatRouter)

export default [...routers]

