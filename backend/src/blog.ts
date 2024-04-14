import { Hono } from "hono";


export const blogRouter = new Hono<{
    Bindings:{
        
    }
}>();


blogRouter.post('api/v1/blog',(c)=>{
    return c.text("Blog")
  })
  
blogRouter.put('api/v1/blog',(c)=>{
    return c.text("BLog")
  })
  
blogRouter.get('api/v1/blog/:id',(c)=>{
    const id = c.req.param('id')
    console.log(id)
    return c.text("get blog route")
  })
  
  blogRouter.get('/api/v1/blog/bulk',(c)=>{
    return c.text("get blog")
  })
  

