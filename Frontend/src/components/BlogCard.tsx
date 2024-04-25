import axios from "axios";
import { BACKEND_URL } from "../config";
interface BlogCardProps{
    authorName:string;
    publishedDate:string;
    title:string;
    content:string;
}

export const BlogCard = ({
    authorName,
    publishedDate,
    title,
    content
}:BlogCardProps)=>{
    return <div className="p-4 border-b border-slate-200 cursor-pointer">
        <div className=" flex p-2 ">
            <Avatar name= {authorName}/>
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                {authorName}
            </div>
            <Dot/>
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                {publishedDate}
            </div>
        </div>

        <div className="flex flex-col px-2 ">
            <div className=" font-semibold text-xl">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0,100)+"..."}
            </div>
        </div>
        
        <div className=" pl-2 text-sm font-thin text-slate-500"> 
            {`${Math.ceil(content.length/100)} minutes read`}
        </div>
        <div className="bg-grey-200 h-1 w-full">

        </div>
    </div>
}

export function Avatar({name}:{name:string}){
    return <div className="">      
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    </div>
}

function Dot() {
    return (
        <div className="flex items-center justify-center pl-1">
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
        </div>
    );
}
