import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  @ViewChild('name') namekey!: ElementRef;

  username = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}
  startquiz() {
    let username = this.namekey.nativeElement.value;
    this.router.navigate(['/Question'], {
      queryParams: {
        name: username,
      },
    });
  }
}
