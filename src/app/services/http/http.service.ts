import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  cachedResponses: { [key: string]: any } = {};

  constructor(private http: HttpClient, private router: Router) {}

  private handlerError(
    error: HttpErrorResponse,
    ignoredErrors?: Array<number> | undefined
  ): Observable<never> {
    const errorHandler = new ErrorHandlerService(this.router);
    errorHandler.handle(error, ignoredErrors);

    return throwError(() => ({
      ...error.error,
      message: error.message,
      status: error.status,
    }));
  }

  public get<T>(url: string, params?: any, config?: any): Observable<T> {
    const checkForCachedResponse = <T>(config: any, url: string): T | null => {
      if (config.cache && this.cachedResponses[url]) {
        return this.cachedResponses[url];
      }
      return null;
    };
    return this.http
      .get<T>(`${environment.apiUrl}${url}`, {
        params,
      })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handlerError(error, config?.ignoredErrors)
        )
      );
  }

  public post<T>(url: string, payload?: any, config?: any): Observable<T> {
    return this.http
      .post<T>(`${environment.apiUrl}${url}`, payload)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handlerError(error, config?.ignoredErrors)
        )
      );
  }

  public put<T>(url: string, payload?: any, config?: any): Observable<T> {
    return this.http
      .put<T>(`${environment.apiUrl}${url}`, payload)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handlerError(error, config?.ignoredErrors)
        )
      );
  }

  public patch<T>(url: string, payload?: any, config?: any): Observable<T> {
    return this.http
      .patch<T>(`${environment.apiUrl}${url}`, payload)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handlerError(error, config?.ignoredErrors)
        )
      );
  }

  public delete<T>(url: string, config?: any): Observable<T> {
    return this.http
      .delete<T>(`${environment.apiUrl}${url}`)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handlerError(error, config?.ignoredErrors)
        )
      );
  }
}
