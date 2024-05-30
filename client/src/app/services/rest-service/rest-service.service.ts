import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class RestService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}


  getData(id: any, endpoint:string='', auth:string=''){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization":`Bearer ${auth}`,
      'Access-Control-Allow-Origin': '*',
      "Accept": "aplication/json",
    });

    return this.http.get<any>(`${this.apiUrl}/${endpoint}/${id}`, {headers, withCredentials:false} );

  }

  postData(data: any, endpoint:string='', auth:string=''){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization":`Bearer ${auth}`,
      "Accept": "aplication/json",
    });


    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data, {headers, withCredentials:false} );

  }

  putData(data: any, endpoint:string='', auth:string=''){



    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization":`Bearer ${auth}`,
      "Accept": "aplication/json",
    });


    return this.http.put<any>(`${this.apiUrl}/${endpoint}`, data, {headers, withCredentials:false} );

  }

  deleteData(endpoint:string='', auth:string=''){


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization":`Bearer ${auth}`,
      "Accept": "aplication/json",
    });

    return this.http.delete<any>(`${this.apiUrl}/${endpoint}`, {headers, withCredentials:false} );

  }

}
