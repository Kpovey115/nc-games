

exports.handleBadPath = (req, res) => {
    res.status(404).send({msg : 'Invalid path'});
}

exports.invalidInputType = (err, req, res, next) => {
    const {code} = err;
    if(code === "22P02"){
        res.status(400).send({msg: 'Invalid request'})
    }
    next(err);
}

exports.handlesCustomErrors = (err, req, res, next) => {
    const {status, msg} = err;

    res.status(status).send({msg})
}

exports.handleServerError = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: 'Internal Server Error'});
}