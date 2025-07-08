exports.isAuthenticated =  (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        return res.status(401).json({message: "กรุณาเข้าสู่ระบบกก่อน!"})
    }
}

