import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialService } from '../../services/credential.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.css'],
})
export class CredentialComponent implements OnInit {
  form: any = {
    key: null,
    shared_secret: null,
  };

  constructor(
    private router: Router,
    private credentialService: CredentialService
  ) {}

  ngOnInit(): void {}

  createCredential() {
    const { key, shared_secret } = this.form;
    this.credentialService.create(key, shared_secret).subscribe(
      (res: any) => {
        Swal.fire({
          title: '¡Exitoso!',
          text: res.message,
          icon: 'success',
        }).then(() => {
          this.router.navigateByUrl('/credential/list');
        });
      },
      (err: any) => {
        Swal.fire({
          title: '¡Error!',
          text: err.error.message,
          icon: 'error',
        }).then(() => {
          this.router.navigateByUrl('/credential');
        });
      }
    );
  }
}
