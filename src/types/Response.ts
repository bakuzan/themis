interface BaseResponse {
  success: boolean;
  errorMessages: string[];
}

export interface TitleResponse extends BaseResponse {
  id?: number;
}

export interface IssueResponse extends BaseResponse {
  id?: number;
}
