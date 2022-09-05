export interface IResponse {
    status: number;
    errors: string[];
    data: any;
}

export interface IPayload {
  id: number;
  title: string;
}
  