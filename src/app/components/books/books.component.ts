import {Component, inject, OnInit, Signal} from '@angular/core';
import {BookService} from "../../core/services/book.service";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Store} from "@ngrx/store";
import {BookResponse, BookState} from "../../core/exchange/response/book.response";
import {Observable} from "rxjs";
import {BookStore} from "../../states/book/book.store";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    NgIf,
    MatCard,
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    DatePipe,
    MatButton,
    NgForOf,
    AsyncPipe,
    MatIcon
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit{
  page: number = 0;
  size: number = 10;
  totalBooks: number = 0;
  error?: Signal<string | null>

  private readonly bookStore = inject(BookStore);
  books= this.bookStore.books;
  loading = this.bookStore.loading;

  ngOnInit(): void {
    this.loadBooks()

  }

  loadBooks(): void {
    this.bookStore.loadBooks({page:this.page, size:this.size});  // Charge les livres via le store
    this.error = this.bookStore.error;

  }
}
