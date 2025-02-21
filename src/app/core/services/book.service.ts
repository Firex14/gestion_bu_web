import {Injectable, Signal} from '@angular/core';
import {BaseApiService} from "./base_api.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomApiResponse} from "../interface/custom_api_response";

@Injectable({
  providedIn: 'root'
})
export class BookService extends BaseApiService{

  constructor(http: HttpClient) {
    super(http, "books");
  }

  findAll(page: number, size: number): Observable<CustomApiResponse<any>> {
    return this.get<any>(this.query, page, size);
  }

}
