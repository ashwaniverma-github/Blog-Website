import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'

const userRouter = new Hono<{
	Bindings:{
		DATABASE_URL:string,
		JWT_SECRET:string
	}
}>();

userRouter.post('/api/v1/signup', async (c) => {

	const prisma = new PrismaClient({ 
		datasourceUrl:c.env.DATABASE_URL
	}).$extends(withAccelerate());
	const body = await c.req.json();
	try {`	`
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch(e) {
		c.status(403);
		console.log(e)
		return c.json({e});
	}
})


userRouter.post('api/v1/signin', async (c)=>{
	const prisma = new PrismaClient({
		datasourceUrl:c.env.DATABASE_URL
	}).$extends(withAccelerate());

	const body = await c.req.json()
	const user = await prisma.user.findUnique({
		where:{
			email:body.email,
		}
	})

	if(!user){
		c.status(403)
		return c.json({
			msg:"error sigining up"
		})
	}
	const jwt = await sign({id:user.id},c.env.JWT_SECRET)
	return c.json({jwt})
})





export default userRouter
