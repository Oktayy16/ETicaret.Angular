import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient, @Inject("baseUrl") private baseUrl:string) {}

  private url(requestParameters : Partial<RequestParameters>) : string{
    return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`; // requestParameters içerisindeki baseurl doluysa onu kullan değilse üstteki main baseurl kullan / action varsa "/" ve geri kalaı ekle yoksa boş bırak
  }

  get<T>(requestParameters : Partial<RequestParameters>, id?:string) : Observable<T> { // Partial tam olarak?
    let url: string = "";
    
    if(requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint
    else
      url = `${this.url(requestParameters)}/${id ? `/${id}` : ""}`;

    return this.httpClient.get<T>(url,{headers : requestParameters.headers});
  }
 
  post<T>(requestParameters : Partial<RequestParameters>, body:Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint
    else
      url = `${this.url(requestParameters)} `

    return this.httpClient.post<T>(url,body,{headers:requestParameters.headers});
  }

  put<T>(requestParameters : Partial<RequestParameters>,body:Partial<T>) { // id body den gelecek
    let url : string = "";
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint
    else
      url = `${this.url(requestParameters)}`

    return this.httpClient.put<T>(url,body, {headers:requestParameters.headers});
  }


  delete<T>(requestParameters : Partial<RequestParameters>, id : string): Observable<T>{
    let url : string = "";
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint
    else
      url = `${this.url(requestParameters)}/${id}` // kesin id gelecek o yüzden direk yazdık

      return this.httpClient.delete<T>(url, {headers:requestParameters.headers});
  }

}

export class RequestParameters{
  controller?: string;
  action?:string;

  headers?:HttpHeaders;
  baseUrl?: string;
  fullEndPoint?:string;
}

