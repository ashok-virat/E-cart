import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare var $;

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent implements OnInit {
  userId: any;
  userName: any;
  authToken: any;
  datas: any;
  public p: Number = 1;
  public count: Number = 6;

  constructor(private router:Router,private service:ServiceService,public toastr: ToastrService) {
    this.userId=Cookie.get('userId');
    this.userName=Cookie.get('userName');
    this.authToken=Cookie.get('authToken');
    this.getshoes()
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



public getshoes=()=>{
  let data={
    category:'shoes'
  }
  this.service.getshoes(data).subscribe(
    data=>{
      console.log(data)
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
