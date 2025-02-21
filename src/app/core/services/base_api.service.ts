import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, throwError, tap } from 'rxjs';
import { CustomApiResponse } from "../interface/custom_api_response";
import { environment } from "../../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  protected loading = new Subject<boolean>(); // État de chargement global
  protected error = new Subject<string | null>(); // Gestion d'erreur
  protected data = new Subject<any | null>(); // Stocker la réponse (générique)

  constructor(protected readonly http: HttpClient, @Inject('API_ENDPOINT') protected readonly endpoint: string) {}

  protected get url(): string {
    return `/api/${this.endpoint}`;
  }

  protected get query(): string {
    return `${API_URL}/query/${this.endpoint}`;
  }

  // Méthode générique pour récupérer des données avec ou sans pagination
  protected fetch<T>(method: 'GET' | 'POST' | 'PATCH' | 'DELETE', url: string, body?: any, params?: HttpParams): Observable<CustomApiResponse<T>> {
    this.loading.next(true); // Déclenche l'état de chargement
    this.error.next(null); // Réinitialise l'erreur

    let request: Observable<CustomApiResponse<T>>; // Directement avec le bon type
    switch (method) {
      case 'POST':
        request = this.http.post<CustomApiResponse<T>>(url, body, { params });
        break;
      case 'PATCH':
        request = this.http.patch<CustomApiResponse<T>>(url, body, { params });
        break;
      case 'DELETE':
        request = this.http.delete<CustomApiResponse<T>>(url, { params });
        break;
      default:
        request = this.http.get<CustomApiResponse<T>>(url, { params });
    }

    return request.pipe(
      tap(() => this.loading.next(false)), // Mets à jour l'état de chargement
      catchError((err) => {
        this.handleError(err);
        this.loading.next(false); // Mets à jour l'état de chargement en cas d'erreur
        return throwError(() => err);
      })
    );
  }

  // Méthode GET avec ou sans pagination
  get<T>(url: string, page?: number, size?: number): Observable<CustomApiResponse<T>> {
    let params = new HttpParams();
    if (page !== undefined && size !== undefined) {
      params = params.set('page', page.toString()).set('size', size.toString());
    }

    return this.fetch<T>('GET', url, undefined, params); // Utilise la méthode fetch
  }

  // Méthodes pour POST, PATCH, DELETE restent les mêmes
  // ...

  private handleError(error: any) {
    console.error('API Error:', error);
    this.error.next(error.message || 'Une erreur est survenue');
  }
}
