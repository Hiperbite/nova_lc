class ApiError {

    constructor(public code: number, public message: any = undefined) { }
  
    static badRequest = (message?: any) => new ApiError(400, message);
  
    static defaultError = ({ status, code, message }: any) =>
      new ApiError(code ?? status, message)
  
    static internal = (message?: any) => new ApiError(500, message);
    static unprocessable = (message?: any) => new ApiError(422, message);
  }
  
  
  
  export { ApiError };