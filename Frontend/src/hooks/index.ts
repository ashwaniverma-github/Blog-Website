import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog{
    "id": number;
    "title": string;
    "content": string;
    "author": {
        "name": string;
    }
}

export const useBlog = ({id}:{id:string})=>{
    const [loading,setLoading] = useState(true);
    const [blog,setblog] = useState<Blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,({
            headers:{
                Authorization:localStorage.getItem('token') || ''
            }
        }))
            .then(response=>{
                setblog(response.data.blog);
                setLoading(false);
            })
            .catch((error)=>{
                console.error(error)
                setLoading(false)
            })
    },[id])


    return {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        loading,
        blog
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