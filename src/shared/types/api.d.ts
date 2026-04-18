// API response types
export interface ISuccessResponse<T> {
  status: true;
  message: string;
  payload?: T;
}

export interface IErrorResponse {
  status: false;
  message: string;
  code: number;
}

export type ApiResponse<T> = ISuccessResponse<T> | IErrorResponse;
