// API response types
export interface ISuccessResponse<T> {
  status: true;
  code: number;
  message: string;
  payload?: T;
}

export interface IErrorResponse {
  status: false;
  message: string;
  code: number;
}

export type IApiResponse<T> = ISuccessResponse<T> | IErrorResponse;

export interface IPaginatedResponse<T> {
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: T[];
}

export interface IDocumentsFields {
  createdAt: string;
  updatedAt: string;
}
