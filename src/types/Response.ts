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

export interface ReadOrderResponse extends BaseResponse {
  id?: number;
}

export interface ReadOrderIssueResponse extends BaseResponse {}

export interface ReadOrderIssueReOrderResponse extends BaseResponse {}
export interface CollectionIssueReOrderResponse extends BaseResponse {}

/*  Read History Responses */
export interface ReadHistoryResponse extends BaseResponse {
  id?: number;
}

export interface ToggleReadHistoryIssueResponse extends BaseResponse {}

export interface CompleteReadHistoryResponse extends BaseResponse {}
