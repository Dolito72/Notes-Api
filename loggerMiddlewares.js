const logger = (request, response, next) => {
    console.log(request.method)
    console.log(request.path)
    console.log(request.body)
    console.log("________________")
    next()
}

module.exports = logger 