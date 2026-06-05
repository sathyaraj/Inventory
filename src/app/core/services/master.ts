import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Master {

    private apiUrl = 'https://localhost:7108/api/Masterdetail';
    private baseUrl = 'https://localhost:7108/api';

  constructor(private http: HttpClient) {}

  createMaster(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getMasters() {
    return this.http.get(this.apiUrl);
  }


 getMastersById(id: number) {
   return this.http.get(`${this.apiUrl}/${id}`);
  //return this.http.get(`${this.apiUrl}?masterId=${id}`);
}

 getItemList() {
   return this.http.get(`${this.baseUrl}/ItemList`);
  //return this.http.get(`${this.apiUrl}?masterId=${id}`);
}

saveTab(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Item`, data);
  }

  //  storeroomTab(itemid: number,data: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/Storeroom/${itemid}`, data);
  // }

  storeroomTab(itemId: number,status: boolean): Observable<any> {
  return this.http.put(`${this.baseUrl}/Storeroom/update-status/${itemId}`,JSON.stringify(status),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

}
  storeroomdetaildelete(id: number):Observable<any> {
  return this.http.delete(`${this.baseUrl}/Storeroom/${id}`);
  }


 storeroomDetails(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Storeroom`, data);
  }

  // vendoritemTab(tabName: string, data: any): Observable<any> {
  //   const payload = Array.isArray(data) ? data[0] : data;
  //   return this.http.post(`${this.baseUrl}/Vendor`, payload);
  // }


  assemblydetailTab(tabName: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ItemAssembly`, data);
  }

   getItemlist() {
    return this.http.get(`${this.baseUrl}/Item`);
  }

  getItemlistlastid() {
    return this.http.get(`${this.baseUrl}/Item/group-items`);
  }

  getmasterDetailList(id:number) {
    return this.http.get(`${this.baseUrl}/Masterdetails/${id}`);
  }
 
  getItempost(data:any) {
    return this.http.post(`${this.baseUrl}/Itemlist`, data);
  }
 

  getitemlastId():Observable<any>{
    return this.http.get(`${this.baseUrl}/item/lastid`)
  }

  deleteItem(id: number):Observable<any> {
  return this.http.delete(`${this.baseUrl}/Item/${id}`);
  }

   getItemById(id: number):Observable<any>  {
    return this.http.get<any>(`${this.baseUrl}/Item/${id}`);
  }

  updateItem(id: number, payload: any) {
    console.log(payload)
  return this.http.put(`${this.baseUrl}/Item/${id}`, payload);
}

getstoreroomItem(id:number){
      return this.http.get(`${this.baseUrl}/Storeroom/${id}`);
}

getvendorsItem(id:number){
      return this.http.get(`${this.baseUrl}/Vendor/${id}`);
}

  specificationitemTab(tabName: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ItemSpecification`, data);
  }

getspecificationItem(id:number){
      return this.http.get(`${this.baseUrl}/ItemSpecification/${id}`);
}

  ItemAssemblyTab(tabName: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ItemAssembly`, data);
  }


getorganizationItem(id:number){
      return this.http.get(`${this.baseUrl}/ItemAssembly/${id}`);
}

importcsvfile(data:any){
  return this.http.post(`${this.baseUrl}/item/import`,data);
}

// exportItems(fromDate:any, toDate:any) {
//   const params = {
//     fromDate: fromDate,
//     toDate: toDate
//   };
//   return this.http.get(`${this.baseUrl}/Item/export-items`, {
//     responseType: 'blob'
//   });
// }
exportItems(fromDate:any, toDate:any) {

  console.log(fromDate +"---"+toDate)


  const params:any = {};

  if (fromDate) {
    params.fromDate = fromDate;
  }

  if (toDate) {
    params.toDate = toDate;
  }

  return this.http.get(`${this.baseUrl}/Item/export-items`,
    {
      params,
      responseType: 'blob'
    }
  );

}

documentsTab(itemId: number,status: boolean): Observable<any> {
    return this.http.put(`${this.baseUrl}/ItemDocument/update-status/${itemId}`, status );
    
  }

 documentsdetails(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/ItemDocument/save`, formData);
}

 vendordetails(Data:any): Observable<any> {
  return this.http.post(`${this.baseUrl}/vendor`, Data);
}

// vendoritemTab(itemId: number,status: boolean): Observable<any> {
//     return this.http.put(`${this.baseUrl}/vendor/update-status/${itemId}`, status );
    
//   }

vendoritemTab(itemId: number,status: boolean): Observable<any> {
  return this.http.put(`${this.baseUrl}/vendor/update-status/${itemId}`,JSON.stringify(status),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

}

  vendordetaildelete(id: number):Observable<any> {
  return this.http.delete(`${this.baseUrl}/vendor/${id}`);
  }


getDocuments(itemId: number) {
  return this.http.get<any[]>(`${this.baseUrl}/ItemDocument/by-item/${itemId}`);
}

  documentDetailsdelete(id: number):Observable<any> {
  return this.http.delete(`${this.baseUrl}/ItemDocument/delete/${id}`);
  }


 stockcancel(Data:any): Observable<any> {
  return this.http.post(`${this.baseUrl}/vendor`, Data);
}

getDashboard(): Observable<any> {
  return this.http.get(`${this.baseUrl}/dashboard`);
}

getOverviewChart(type:any):Observable<any> {
  return this.http.get(`${this.baseUrl}/dashboard/overview-chart?type=${type}`);
}

getBarChart(type:any) {

  return this.http.get(
    `${this.baseUrl}/dashboard/bar-chart?type=${type}`
  );

}



}
