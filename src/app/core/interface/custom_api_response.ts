export interface CustomApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  status: number;
  errors: Map<string, string>;
}
