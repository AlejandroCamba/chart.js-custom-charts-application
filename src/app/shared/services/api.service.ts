import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.headers()}
    ).pipe(catchError(this.formatErrors));
  }

  headers(): HttpHeaders {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    return new HttpHeaders(headers)
  }

  private formatErrors(error: any) {
    if (error.status == 403) {
      localStorage.clear();
    }
    return  throwError(error.error);
  }
}