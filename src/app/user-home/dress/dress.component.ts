import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare var $;

@Component({
  selector: 'app-dress',
  templateUrl: './dress.component.html',
  styleUrls: ['./dress.component.css']
})
export class DressComponent implements OnInit {
  userId: any;
  userName: any;
  authToken: any;
  public p: Number = 1;
  public count: Number = 6;
  datas: any;

  constructor(private router:Router,private service:ServiceService,public toastr: ToastrService) {
    this.userId=Cookie.get('userId');
    this.userName=Cookie.get('userName');
    this.authToken=Cookie.get('authToken');
    this.getdress();
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
  
 public home=()=>{
  this.router.navigate(['/home'])
}



public getdress=()=>{
  let data={
    category:'Dress'
  }

  this.service.getdress(data).subscribe(
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
