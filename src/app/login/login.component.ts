import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthenticationService, private router:Router, private toastr:ToastrService) { }

  ngOnInit() {
  }

  onLogin(dataForm: any) {
    this.authService.login(dataForm.username, dataForm.password);
    if (this.authService.isAuthenticated) {
      this.toastr.success('Authentification réussie', 'Succès!');
      this.router.navigateByUrl('');
    } else {
      this.toastr.error('Login ou mot de passe incorrect', 'Erreur!');
    }
  }
}
