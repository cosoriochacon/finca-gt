import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialService } from '../../../services/credential.service';

@Component({
  selector: 'app-list-credential',
  templateUrl: './list-credential.component.html',
  styleUrls: ['./list-credential.component.css'],
})
export class ListCredentialComponent implements OnInit {
  credentials: any = [];
  notCredentials = false;

  constructor(
    private router: Router,
    private credentialService: CredentialService
  ) {}

  ngOnInit(): void {
    this.getCredentials();
  }

  goTo(url: string) {
    this.router.navigateByUrl('/' + url);
  }

  getCredentials() {
    this.credentialService.getCredentials().subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.credentials = res;
        } else {
          this.notCredentials = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
