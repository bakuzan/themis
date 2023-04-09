interface BaseResponse {
  success: boolean;
  errorMessages: string[];
}

export interface TitleResponse extends BaseResponse {
  id?: number;
}
