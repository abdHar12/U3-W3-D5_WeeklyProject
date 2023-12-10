import { Component } from '@angular/core';
import { AuthService } from './auth/auth-srv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'U3-W3-D5_WeeklyProject';
  constructor(private authSrv: AuthService) {
    this.authSrv.restore();
  }
}
