import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';


declare var $;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  firstName: any;
  lastName: any;
  email: any;
  password: any;
  loader: boolean;

  constructor(private router:Router,private service:ServiceService,public toastr: ToastrService) { }

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
  
 public signin=()=>{
  this.router.navigate(['/signin'])
}

public signup=()=>{
  if(!this.firstName) {
    this.toastr.warning('Please Enter firstName')
  }
    else if(!this.lastName){
      this.toastr.warning('Please Enter lastName')
    }
    else if(!this.email){
      this.toastr.warning('Please Enter email')
    }
    else if(!this.password){
      this.toastr.warning('Please Enter password')
    }
  else{
    this.loader=true;
  let data={
    firstName:this.firstName,
    lastName:this.lastName,
    email:this.email,
    password:this.password
  }
  this.service.signup(data).subscribe(
    data=>{
      this.loader=false;
     if(data.error==false){
       this.toastr.success(data.message)
       setTimeout(() => {
        this.router.navigate(['/signin'])
     }, 2000);
     }
     else {
       this.toastr.error(data.message)
     }
    
    },
    err=>{
      this.toastr.error('some error occured');
      this.loader=false;
    }
  )
  }
}



}
