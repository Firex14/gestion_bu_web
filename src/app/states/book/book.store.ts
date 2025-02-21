import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { BookResponse } from '../../core/exchange/response/book.response';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { inject } from '@angular/core';
import { BookService } from '../../core/services/book.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export interface BookState {
  books: BookResponse[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  books: [],
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  loading: false,
  error: null
};

export const BookStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, bookService = inject(BookService)) => ({
    loadBooks: rxMethod<{ page: number, size: number }>((params$) => {
      return params$.pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ page, size }) =>
          bookService.findAll(page, size).pipe(
            tap((response) => {
              patchState(store, {
                books: response.data.content,
                totalElements: response.data.totalElements,
                totalPages: response.data.totalPages,
                pageNumber: response.data.number,
                loading: false
              });
            }),
            catchError((error) => {
              patchState(store, { loading: false, error: error.message || 'Une erreur est survenue' });
              return of(null);
            })
          )
        )
      );
    }),
  }))
);
