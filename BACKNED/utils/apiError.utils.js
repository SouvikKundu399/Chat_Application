class apiError extends Error(){
    constructor(
        stautsCode,
        message = "Something went wrong",
        errors= [],
        stack=""
    ){
        this.stautsCode = stautsCode
        this.errors = errors
        this.data = nyll
        this.success = false
        super(message)

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }

}

export default apiError