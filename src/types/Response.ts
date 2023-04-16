interface BaseResponse {
  success: boolean;
  errorMessages: string[];
}

export interface DeleteResponse extends BaseResponse {}

export interface TitleResponse extends BaseResponse {
  id?: number;
}

export interface IssueResponse extends BaseResponse {
  id?: number;
}

export interface CollectionResponse extends BaseResponse {
  id?: number;
}

export interface CollectionIssueResponse extends BaseResponse {}
