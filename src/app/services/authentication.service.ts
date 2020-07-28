import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // JDD utilisateurs sans back end
  private users = [
    {username: 'admin', passsorwd: '1234', roles: ['ADMIN', 'USER']},
    {username: 'user1', passsorwd: '1234', roles: ['USER']},
    {username: 'user2', passsorwd: '1234', roles: ['USER']}
  ];

  public isAuthenticated : boolean;
  public userAuthenticated;

  constructor() { }

  public login(username:string, password:string) {
    let user;
    this.users.forEach(u=>{
      if (u.username == username && u.passsorwd== password) {
        user=u;
      }
    });
    if (user) {
      this.isAuthenticated = true;
      this.userAuthenticated=user;
    } else {
      this.isAuthenticated = false;
      this.userAuthenticated=undefined;
    }
  }
}
