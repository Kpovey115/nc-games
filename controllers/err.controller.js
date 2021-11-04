

exports.handleBadPath = (req, res) => {
    res.status(404).send({msg : 'Invalid path'});
}

exports.invalidInputType = (err, req, res, next) => {
    const {code} = err;
    if(code === "22P02"){
        res.status(400).send({msg: 'Invalid request'})
    } else {
        next(err);
    }
    
}

exports.handlesCustomErrors = (err, req, res, next) => {
    const {status, msg} = err;
if(status !== undefined && msg !== undefined){
    res.status(status).send({msg})
} else next(err);
    
}

exports.handleServerError = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: 'Internal Server Error'});
}