import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

interface Blog{
    "content": string
    "title": string
    "id": Number
    "author": {
        "name": string
    }
}

export const useBlogs = ()=>{
    const [loading,setLoading] = useState(true);
    const [blogs,setblogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,({
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }))
            .then(response=>{
                setblogs(response.data.blogs);
                setLoading(false);
            })
    },[])

    return {
        loading,
        blogs
    }
}