import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  form: any = {
    msg: null,
    tags: null,
  };

  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {}

  createMessage() {
    const { msg, tags } = this.form;
    this.messageService.create(msg, tags).subscribe(
      (res: any) => {
        Swal.fire({
          title: '¡Exitoso!',
          text: res.message,
          icon: 'success',
        }).then(() => {
          this.router.navigateByUrl('/message/list');
        });
      },
      (err: any) => {
        Swal.fire({
          title: '¡Eror!',
          text: err.error.message,
          icon: 'error',
        }).then(() => {
          window.location.reload();
        });
      }
    );
  }
}
