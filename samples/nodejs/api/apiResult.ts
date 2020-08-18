export class ApiResult {
    responseCode: number;
    responseData: string;

    private constructor(code: number, data: string) {
        this.responseCode = code;
        this.responseData = data;
    }

    public static Ok(): ApiResult {
        return new ApiResult(200, '');
    }

    public static ObjectResult(data: any): ApiResult {
        return new ApiResult(200, JSON.stringify(data));
    }

    public static Error(code: number, reason: string): ApiResult {
        return new ApiResult(code, reason);
    }
}
