import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Adminmaster {

      private baseUrl = 'https://localhost:7108/api';

        constructor(private http: HttpClient) {}

      // saveCurrency(data: any) {
      //   return this.http.post(`${this.baseUrl}/Currency`,data);
      //   }

       saveCurrency(data: any) {

            // UPDATE
            if (data.id && data.id > 0) {

              return this.http.put(
                `${this.baseUrl}/Currency/${data.id}`,
                JSON.stringify(data),
                {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              );
            }

            // CREATE
            return this.http.post(
              `${this.baseUrl}/Currency`,
              JSON.stringify(data),
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            );
          }


  savediscount(data: any) {

            // UPDATE
            if (data.id && data.id > 0) {

              return this.http.put(
                `${this.baseUrl}/discount/${data.id}`,
                JSON.stringify(data),
                {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              );
            }

            // CREATE
            return this.http.post(
              `${this.baseUrl}/discount`,
              JSON.stringify(data),
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            );
          }

       getcurrencylist() {
        return this.http.get(`${this.baseUrl}/currency`);
      }

      saveTax(data:any){
                return this.http.post(`${this.baseUrl}/Tax`,data);
      }

      gettaxlist() {
        return this.http.get(`${this.baseUrl}/Tax`);
      }

      
      // savediscount(data:any){
      //           return this.http.post(`${this.baseUrl}/discount`,data);
      // }

      getdiscountlist() {
        return this.http.get(`${this.baseUrl}/discount`);
      }

      getDiscountById(id: number) {

            return this.http.get(
              `${this.baseUrl}/discount/${id}`
            );

          }
          discountdelete(id: number): Observable<any>{
            return this.http.delete(`${this.baseUrl}/discount/${id}`)
          }

            getcurrecnyById(id: number) {

            return this.http.get(
              `${this.baseUrl}/currency/${id}`
            );
                }

                  gettaxById(id: number) {

            return this.http.get(
              `${this.baseUrl}/tax/${id}`
            );
                }

              deleteItem(id: number) {

          return this.http.delete(
            `${this.baseUrl}/tax/${id}`
          );

        }

              deletecurrency(id: number) {
                return this.http.delete(
                  `${this.baseUrl}/currency/${id}`
                );

              }

              createCompany(data:any){
                return this.http.post(`${this.baseUrl}/company`, data)
              }

              companylist(){
                return this.http.get(`${this.baseUrl}/company`)
              }

               deletecompany(id:number){
                return this.http.delete(`${this.baseUrl}/company/${id}`)
              }

              createUserDetail(data: any) {
                return this.http.post(`${this.baseUrl}/UserDetail/register`, data);
              }

              userdetailslist(){
                return this.http.get(`${this.baseUrl}/UserDetail`)
              }

              deleteuserlistItem(id:number){
                return this.http.delete(`${this.baseUrl}/userdetail/${id}`)
              }

              createRole(data:any){
                return this.http.post(`${this.baseUrl}/role/create`, data)
              }

              getRoles() {
                return this.http.get(`${this.baseUrl}/role`);
              }

              getUserById(id: number) {
                return this.http.get(`${this.baseUrl}/userdetail/${id}`);
              }

              updateUser(id: number, data: any) {
                return this.http.put(`${this.baseUrl}/userdetail/${id}`, data);
              }



              getCompany(id:number){
                return this.http.get(`${this.baseUrl}/Company/${id}`)
              }

              updateCompany(id: number, data: any){
                return this.http.put(`${this.baseUrl}/Company/${id}`, data);

              }

              saveCostCode(data: any) {
                  return this.http.post(`${this.baseUrl}/CostCode`, data);
                }

                 updateCostCode(id: number, data: any) {
                return this.http.put(`${this.baseUrl}/CostCode/${id}`, data);
              }

                getCostCodeById(id: number) {
                  return this.http.get(`${this.baseUrl}/CostCode/${id}`);
                }
                
                getitemlastId():Observable<any>{
                  return this.http.get(`${this.baseUrl}/serviceitem/lastid`)
                }

                getServiceItemById(id: number):Observable<any>  {
                  return this.http.get<any>(`${this.baseUrl}/serviceitem/${id}`);
                }

                saveTab(data: any):Observable<any> {
                  return this.http.post(`${this.baseUrl}/serviceitem`,data)
                }

                  updateItem(id: number, payload: any) {
                    console.log(payload)
                  return this.http.put(`${this.baseUrl}/serviceitem/${id}`, payload);
                }
                getServiceitemList():Observable<any> {
                  return this.http.get(`${this.baseUrl}/serviceitem`)
                }

                servicedeleteItem(id: number) {
                    return this.http.delete(`${this.baseUrl}/serviceitem/${id}`);

                  }

                  exportItems(fromDate:any, toDate:any) {

              console.log(fromDate +"---"+toDate)


              const params:any = {};

              if (fromDate) {
                params.fromDate = fromDate;
              }

              if (toDate) {
                params.toDate = toDate;
              }

              return this.http.get(`${this.baseUrl}/serviceitem/export-serviceitems`,
                {
                  params,
                  responseType: 'blob'
                }
              );

            }

             getcostcodelist() {
        return this.http.get(`${this.baseUrl}/costcode`);
      }

      costcodedelete(id:number){
                return this.http.delete(`${this.baseUrl}/costcode/${id}`);
      }

      saveCommodityGroup(data:any){
        return this.http.post(`${this.baseUrl}/CommodityGroup`,data)
      }

      getCommodityGroups() {
        return this.http.get<any[]>(`${this.baseUrl}/CommodityGroup`
         );
        }

         getCommodityGroupById(id: number) {

  return this.http.get(
    `${this.baseUrl}/CommodityGroup/${id}`
  );

}

 deletecommoditygroup(id: number) {

          return this.http.delete(
            `${this.baseUrl}/commoditygroup/${id}`
          );

        }

 // adminmaster.ts

createStoreroom(data: any) {
  return this.http.post(
    `${this.baseUrl}/StoreroomCreate`,
    data
  );
}

updateStoreroom(id: number, data: any) {
  return this.http.put(
    `${this.baseUrl}/StoreroomCreate/${id}`,
    data
  );
}

getStoreroom(id: number) {
  return this.http.get(
    `${this.baseUrl}/StoreroomCreate/${id}`
  );
}

getAllStoreroom() {
  return this.http.get(
    `${this.baseUrl}/StoreroomCreate`
  );
}

deleteStoreroom(id: number) {
  return this.http.delete(
    `${this.baseUrl}/StoreroomCreate/${id}`
  );
}

storeroomList() {
  return this.http.get(
    `${this.baseUrl}/StoreroomCreate`
  );
}

                
}
