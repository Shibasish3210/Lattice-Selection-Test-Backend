//class to create similar api response each time
class ApiResponse{

    constructor( statusCode, message, data ){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = true;
    }

}

export default ApiResponse;