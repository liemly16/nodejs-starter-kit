class BaseError extends Error {

    constructor(code, type, message, data) {
        super()
        this.code = code
        this.type = type
        this.message = message
        this.data = data
    }

    toJSON() {
        return {
            code: this.code,
            type: this.type,
            message: this.message,
            data: this.data
        }
    }
}

export default class ErrorService {
    constructor(){

    }

    somethingWentWrong(){
        return new BaseError(500, "something_went_wrong", "Đã có lỗi xảy ra");
    }

    error(message){
        return new BaseError(500, "error", message);
    }

}