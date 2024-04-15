import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

import { Hono } from "hono";
import { verify } from 'hono/jwt';


export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    },
    Variables:{
      userId:string
    }
}>();

blogRouter.use('/*',async (c)=>{
  const authHeader = c.req.header('authorization') || ""
  const user = await verify(authHeader,c.env.JWT_SECRET)
  if(user){
    c.set("userId",user.id)
  }else{
    c.status(403)
    return c.json({
      message:"Not logged in please try again"
    })
  }
})


blogRouter.post('/',async (c)=>{
  const prisma = new PrismaClient({ 
		datasourceUrl:c.env.DATABASE_URL
	}).$extends(withAccelerate());

  try{
    const body = await c.req.json();

    const blog = await prisma.post.create({
      data:{
        title:body.title,
        content:body.content,
        authorId:"1"
      }
    })
    return c.json({
      id:blog.id
    })

  }
  catch(e){
    c.status(411)
    c.json({
      msg:"Error"
    })
  }


  })
  
blogRouter.put('/blog',(c)=>{
    return c.text("BLog")
  })
  
blogRouter.get('/blog:id',(c)=>{
    return c.text("get blog route")
  })
  
  blogRouter.get('/bulk',(c)=>{
    return c.text("get blog")
  })
  

