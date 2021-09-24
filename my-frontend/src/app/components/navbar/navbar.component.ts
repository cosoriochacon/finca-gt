import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements DoCheck {
  isLogin = false;
  constructor(private router: Router, private storageService: StorageService) {}

  ngDoCheck() {
    const user = this.storageService.getUser();
    if (Object.keys(user).length !== 0) {
      this.isLogin = true;
    }
  }

  goTo(url: string) {
    this.router.navigateByUrl('/' + url);
  }

  logout() {
    this.storageService.signOut();
    Swal.fire({
      title: '¡Hasta luego!',
      text: '',
      icon: 'success',
    }).then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
