import jwt  from 'jsonwebtoken';

export const isAuthenticated = (req,res,next)=>{
    try {
        
        //cookie se token lena
        const token = req.cookie.accessToken;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Not authenticated"
            })
        }

        //verify token
        const decoded = jwt.verify(token,process.env.ACCESS_TOEKN  )

        //user id req me store kra do
        req.userId = decoded.id;
        next()
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        })
    }
}