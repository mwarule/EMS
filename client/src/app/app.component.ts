import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { appConfig } from './app-config';
import { WindowRef } from './core/services/window-ref';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private winRef: WindowRef) {
  }

  ngOnInit() {
      // appConfig.apiUrl = this.winRef.nativeWindow.location.origin;
      appConfig.apiUrl = 'http://localhost:3000';
  }
}
