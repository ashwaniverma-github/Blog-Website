import { Avatar } from "./BlogCard"

export const Appbar = ()=>{
    return <div className="flex justify-between px-10 py-4 border-b ">
        <div className="font-semibold">
            Medium
        </div>
        <div>
            <Avatar name="Ashwani"/>
        </div>
    </div>
}