import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _AuthenticationService:AuthenticationService, private _Router:Router){}

  ngOnInit(): void {
    
    this._AuthenticationService.userInfo.subscribe(()=>{
      if(this._AuthenticationService.userInfo.getValue() == null){
        this.isLoggedIn = false;
      } else{
        this.isLoggedIn = true;
      }
    })

  }

  logout(){
    localStorage.removeItem('userToken');
    this._AuthenticationService.handleUserInfo();
    this._Router.navigate(['/login'])
  }

  isLoggedIn:boolean = false;

}
