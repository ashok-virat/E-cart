import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare var $;
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productId: any;
  datas: any;
  authToken: any;

  constructor(private router:Router,private service:ServiceService,private _route:ActivatedRoute,public toastr: ToastrService) {
    this.productId=this._route.snapshot.paramMap.get('productId')
    this.authToken=Cookie.get('authToken');
    this.getsingleproduct();
   }

  ngOnInit() {
    $(window).scroll(function(){
      if($(window).scrollTop()>50){
     
        $('.menu').addClass('sticky')
      
      }
      else {
       $('.stic').removeClass('sticky')
       
      }
 })

 $('.click').click(function(){
   $('.click').addClass('new')
   $('.side-nav').css('width','250px');
   $('.side-nav').css('z-index','700');
  
 })

$('.btn-close').click(function(){
     $('.side-nav').css('width','0');
     $('.click').removeClass('new')
 })

  }

  
  public toys=()=>{
    this.router.navigate(['/toys']);
  }

  public dresses=()=>{
    this.router.navigate(['/dress']);
  }
  public baby=()=>{
    this.router.navigate(['/baby']);
  }
  public shoes=()=>{
    this.router.navigate(['/shoes']);
  }

  public getsingleproduct=()=>{
    let data={
      productId:this.productId
    }
    this.service.getsingleproduct(data,this.authToken).subscribe(
      data=>{
       
        this.datas=data.data;
      }
    )
  }
 
  public deleteproduct=()=>{
    let data={
      productId:this.productId
    }
    this.service.deleteproduct(data,this.authToken).subscribe(
      data=>{
      if(data.error==false){
        this.toastr.success(data.message)
        this.router.navigate(['/home']);
      }
       else {
         this.toastr.error(data.message)
       }
      }
    )
  }

 public back=()=>{
   this.router.navigate(['/home'])
 }

}
