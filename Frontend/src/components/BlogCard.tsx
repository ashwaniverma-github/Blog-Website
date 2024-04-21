import axios from "axios";
import { BACKEND_URL } from "../config";
interface BlogCardProps{
    authorName:string;
    publishedDate:string;
    title:string;
    content:string;
}

async function getTitle(){
    const response = await axios.post(`${BACKEND_URL}`)
}

export const BlogCard = ({
    authorName,
    publishedDate,
    title,
    content
}:BlogCardProps)=>{
    return <div>
        <div className="flex p-2 ">
            <Avatar name= {authorName}/>
            <div className="p-2">
                {authorName}
            </div>
            <div className="py-2 text-gray-500">
                {publishedDate}
            </div>
        </div>
       
        <div className="">
            {title}
        </div>
        <div>
            {content.slice(0,100)+"..."}
        </div>
        <div>
            {`${Math.ceil(content.length/100)} minutes`}
        </div>
        <div className="bg-grey-200 h-1 w-full">

        </div>
    </div>
}

function Avatar({name}:{name:string}){
    return <div className="">      
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    </div>
}