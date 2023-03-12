const {checkCORS} = require("./apiSecurity");


const isAuthPasscode = (passcodeName) => {

    return (req, res, next) => {
        checkCORS(req,res,()=>{
            if(req.headers.authorization === process.env[`PASSCODES_${passcodeName}`])
                next();
            else
                res.sendStatus(401);
        })
    };
}

module.exports = {isAuthPasscode};