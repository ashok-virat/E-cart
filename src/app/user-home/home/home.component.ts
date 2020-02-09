import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId: string;
  userName: string;
  file: any;
  productName: any;
  prize: any;
  category: any;
  imagePreview: string;
  data: any;
  datas: any;
  products: any;
  items: any;
  public p: Number = 1;
  public count: Number = 6;
  loader: boolean;
  description: any;
  discription: any;
  authToken: string;

  constructor(private router:Router,private service:ServiceService,public toastr: ToastrService) { 
    this.userId=Cookie.get('userId');
    this.userName=Cookie.get('userName');
    this.authToken=Cookie.get('authToken');
    this.getmyproducts();
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
  
 public signin=()=>{
  this.router.navigate(['/signin'])
}

  //image selection code start
  public imageselect(event){
    this.file=event.target.files[0];
  
    const reader = new FileReader();
  reader.onload = () => {

}
  reader.readAsDataURL(this.file)
  }
   //image selection code end
  

   public postproduct=()=>{
     
     if(!this.file){
       this.toastr.warning('Please choose some Image')
     }
     else if(!this.productName){
      this.toastr.warning('Please Enter productName')
     }
     else if(!this.prize){
      this.toastr.warning('Please Enter prize')
     }
     else if(!this.category){
      this.toastr.warning('Please Enter category')
     }
    
     else {
     let data={
      product:this.file,
      name:this.file.name,
      productName:this.productName,
      prize:this.prize,
      discription:this.discription,
      adminName:this.userName,
      category:this.category,
      userId:this.userId
     }
     
     this.loader=true;
     this.service.addproduct(data,this.authToken).subscribe(
       data=>{
        this.loader=false;
        if(data.error==false){
      this.file='';
      this.productName='';
      this.prize='';
      this.discription='';
      this.category='';
          this.toastr.success(data.message)
          this.getmyproducts();
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


   public getmyproducts=()=>{
     this.service.getallproduct(this.authToken).subscribe(
       data=>{
        
     this.datas=data.data.reverse();
     
       }
     )
   }

   public logout=()=>{
     this.toastr.success('Logout Successfully');
     this.router.navigate(['signin']);
     Cookie.delete('authToken');
     Cookie.delete('userName');
     Cookie.delete('userId')
   }

}
