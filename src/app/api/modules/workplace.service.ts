import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../../shared/enums';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class WorkplaceService {
  constructor(private readonly httpService: HttpService) {}

  public getAll(): Observable<any[]> {
    return this.httpService.get<any[]>(ApiRoutes.Workplace);
  }

  public getById(id: number | string): Observable<any> {
    return this.httpService.get<any>(`${ApiRoutes.Workplace}/${id}`);
  }

  public createWorkplace(payload: any): Observable<any> {
    return this.httpService.post<any>(ApiRoutes.Workplace, payload);
  }

  public updateById(id: number | string, payload: any): Observable<any> {
    return this.httpService.put<any>(`${ApiRoutes.Workplace}/${id}`, payload);
  }

  public deleteById(id: number | string): Observable<any> {
    return this.httpService.delete<any>(`${ApiRoutes.Workplace}/${id}`);
  }
}
