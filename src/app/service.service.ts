import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseurl: string;

  constructor(private http:HttpClient) { 
    this.baseurl='/api/v1/users';
  }
  public signup=(data):any=>{
    let params=new HttpParams()
    .set("firstName",data.firstName)
    .set("lastName",data.lastName)
    .set("email",data.email)
    .set("password",data.password)
    let datas=this.http.post(`${this.baseurl}/signup`,params);
    return datas;
  }

  public signin=(data):any=>{
    let params=new HttpParams()
    .set("email",data.email)
    .set("password",data.password)
    let datas=this.http.post(`${this.baseurl}/signin`,params);
    return datas;
  }

  public addproduct=(data,authToken):any=>{
    console.log(authToken)
     let productdata=new FormData()
     productdata.append('productName',data.productName)
     productdata.append('prize',data.prize)
     productdata.append('userId',data.userId)
     productdata.append('category',data.category)
     productdata.append('discription',data.discription)
     productdata.append('adminName',data.adminName)
     productdata.append('product',data.product,data.name)
     let datas=this.http.post(`${this.baseurl}/addproduct/${authToken}`,productdata);
     return datas;
  }

  public getallproduct=(authToken):any=>{
    let datas=this.http.get(`${this.baseurl}/getallproducts/${authToken}`);
    return datas;
  }

  public updateproduct=(data,authToken):any=>{
    console.log(data)
    let productdata=new FormData()
    if(data.file){
      productdata.append('productName',data.productName)
      productdata.append('prize',data.prize)
      productdata.append('productId',data.productId)
      productdata.append('discription',data.discription)
      productdata.append('category',data.category)
      productdata.append('product',data.file,data.name)
    }
    else if(!data.file){
      productdata.append('productName',data.productName)
      productdata.append('prize',data.prize)
      productdata.append('discription',data.discription)
      productdata.append('productId',data.productId)
      productdata.append('category',data.category)
      productdata.append('product',data.product)
    }

    let datas=this.http.post(`${this.baseurl}/updateproduct/${authToken}`,productdata || productdata);
    return datas;
  }
    
  public deleteproduct=(data,authToken):any=>{
       let params=new HttpParams()
       .set('productId',data.productId)
       let datas=this.http.post(`${this.baseurl}/deleteproduct/${authToken}`,params);
       return datas;
  }
 
  public getsingleproduct=(data,authToken):any=>{
    
    let params=new HttpParams()
    .set('productId',data.productId)
    let datas=this.http.post(`${this.baseurl}/getsingleproduct/${authToken}`,params);
    return datas;
  }

  public gettoys=(data):any=>{
    
    let params=new HttpParams()
    .set('category',data.category)
    let datas=this.http.post(`${this.baseurl}/gettoys`,params);
    return datas;
  }

  public getshoes=(data):any=>{
    
    let params=new HttpParams()
    .set('category',data.category)
    let datas=this.http.post(`${this.baseurl}/getshoes`,params);
    return datas;
  }
   
  public getdress=(data):any=>{
    
    let params=new HttpParams()
    .set('category',data.category)
    let datas=this.http.post(`${this.baseurl}/getdress`,params);
    return datas;
  }
   
   

}
