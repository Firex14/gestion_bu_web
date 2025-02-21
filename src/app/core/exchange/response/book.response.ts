export interface BookResponse{
  id: string ;
  title: string;
  author: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
}

export interface BookState {
  books: BookResponse[];
  loading: boolean;
  error: string | null;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
export const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
  pageNumber: 0,
  pageSize: 20,
  totalElements: 0,
  totalPages: 0,
};
