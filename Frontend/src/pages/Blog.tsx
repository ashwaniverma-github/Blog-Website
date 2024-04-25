import { useBlogs } from "../hooks"

export const Blog = ()=>{
    const {loading,blogs} = useBlogs()

    if(loading){
        return <div>
            loading..
        </div>
    }
}