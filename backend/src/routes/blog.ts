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

/// any request comes at blog route it will go through this middleware first for authentication 
blogRouter.use('/*',async(c,next)=>{
  try{
    const authHeader = c.req.header('authorization') || ""
    const user = await verify(authHeader,c.env.JWT_SECRET)
    if(user){
      c.set("userId",user.id)
      await next()
    }else{
      c.status(403)
      return c.json({
        message:"Not logged in please try again"
      })
    }
  }
  catch(e){
    c.status(403)
    return c.json({
      "msg":"You are not logged in"
    })
  }
 
})

///  Blog writing
blogRouter.post('/',async (c)=>{
  const prisma = new PrismaClient({ 
		datasourceUrl:c.env.DATABASE_URL
	}).$extends(withAccelerate());

  try{
    const body = await c.req.json();
    const authorId = c.get('userId')
    const blog = await prisma.post.create({
      data:{
        title:body.title,
        content:body.content,
        authorId: authorId
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



  //// other fucking  .... routes 
blogRouter.put('/',async (c)=>{
  const prisma = new PrismaClient({ 
		datasourceUrl:c.env.DATABASE_URL
	}).$extends(withAccelerate());

  const body = await c.req.json()
  const blog = await prisma.post.update({
    where:{
      id:body.id
    },
    data:{
      title:body.title,
      content:body.content
    }, 
  })
  return c.json({
    id:blog.id
  })

  })

  blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({ 
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany()
    return c.json({
      blogs
    })

  })
  
blogRouter.get('/:id',async (c)=>{
  const id =  c.req.param("id")
  const prisma = new PrismaClient({ 
		datasourceUrl:c.env.DATABASE_URL
	}).$extends(withAccelerate());
  try{
    const blog = await prisma.post.findFirst({
      where:{
        id: Number(id)
      }
    })
    return c.json({
      blog
    })
  } 
  catch(e){
    c.status(403);
    return c.json({
      "msg":"error fetching the  blog for you",
      e
    })
  }
  })
  
 
  

