import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    const { username, password } = this.form;
    this.userService.login(username, password).subscribe(
      (res: any) => {
        if (res.status === 1) {
          this.storageService.seveUser(res.user);
          Swal.fire({
            title: '¡Bievenido!',
            text: res.message,
            icon: 'success',
          }).then(() => {
            this.router.navigateByUrl('/credential/list');
          });
        } else if (res.status === 0) {
          Swal.fire({
            title: '¡Error!',
            text: res.message,
            icon: 'error',
          }).then(() => {
            this.router.navigateByUrl('/login');
          });
        }
      },
      (err) => {
        alert(err);
      }
    );
  }
}
