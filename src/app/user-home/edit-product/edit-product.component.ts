import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare var $;

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: string;
  datas: any;
  currendata: any;
  productName: any;
  prize: any;
  product: any;
  file: any;
  imagePreview: string;
  category: any;
  loader: boolean;
  discription: any;
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
    this.router.navigate(['/admintoys']);
  }

  public dresses=()=>{
    this.router.navigate(['/admindress']);
  }

  public shoes=()=>{
    this.router.navigate(['/adminshoes']);
  }

  public back=()=>{
    this.router.navigate(['/view',this.productId])
  }
  public getsingleproduct=()=>{
    let data={
      productId:this.productId
    }
    this.service.getsingleproduct(data,this.authToken).subscribe(
      data=>{
        
        this.datas=data.data;
        this.currendata=data["data"];    
        this.productName=this.currendata.productName;
        this.prize=this.currendata.prize;
        this.product=this.currendata.product;
        this.discription=this.currendata.discription;
       this.category=this.currendata.category
      }
    )
  }
 
   //image selection code end
 public imageselect(event){
  this.file=event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result.toString();
}
reader.readAsDataURL(this.file)
}
//image selection code end

public updateproduct=()=>{
 this.loader=true;
  if (this.file) {
    this.currendata.file = this.file;
    this.currendata.name = this.file.name;
  }
  this.currendata.productName=this.productName;
  this.currendata.prize=this.prize;
  this.currendata.category=this.category;
  this.currendata.discription=this.discription;
  this.currendata.productId=this.productId;
 
  this.service.updateproduct(this.currendata,this.authToken).subscribe(
    data=>{
     this.loader=false;
      if(data.error==false){
      this.toastr.success(data.message)
      this.router.navigate(['/view',this.productId])
      }
      else {
        this.toastr.error(data.message)
      }
    },
    err =>{
      this.toastr.error('some error occured');
      this.loader=false;
    }
  )
}

}
