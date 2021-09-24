import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.css'],
})
export class ListMessageComponent implements OnInit {
  messages: any = [];
  notMessages = false;
  tagSearch = null;
  form: any = {
    idMessage: 0,
    msg: null,
    tag: null,
  };
  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getMessages();
  }

  goTo(url: string) {
    this.router.navigateByUrl('/' + url);
  }

  getMessages() {
    this.messageService.getMessages().subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.messages = res;
        } else {
          this.notMessages = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getMessageId(id: any) {
    this.messageService.getMessageId(id).subscribe(
      (res: any) => {
        this.form = {
          idMessage: res.data.id,
          msg: res.data.msg,
          tag: res.data.tags,
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }

  searchByTag() {
    if (this.tagSearch === '') {
      this.tagSearch = null;
      this.notMessages = false;
    }

    this.messageService.getMessageTag(this.tagSearch).subscribe(
      (res: any) => {
        this.messages = res.data;
        this.notMessages = false;
      },
      (err) => {
        if (err.error.status === 0) {
          this.getMessages();
        } else {
          this.messages = [];
          this.notMessages = true;
        }
      }
    );
  }
}
