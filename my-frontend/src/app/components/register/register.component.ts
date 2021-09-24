import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    name: null,
    surname: null,
    username: null,
    password: null,
    birthday: null,
    sex: null,
  };
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    const { username, password } = this.form;
    this.userService.register(username, password).subscribe(
      (res: any) => {
        Swal.fire({
          title: '¡Exitoso!',
          text: res.message,
          icon: 'success',
        }).then(() => {
          this.router.navigateByUrl('/login');
        });
      },
      (err: any) => {
        Swal.fire({
          title: '¡Error!',
          text: err.error.message,
          icon: 'error',
        }).then(() => {
          this.router.navigateByUrl('/register');
        });
      }
    );
  }
}
