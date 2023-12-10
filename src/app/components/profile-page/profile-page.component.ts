import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/module/authdata';
import { Favorite } from 'src/app/module/favorite';
import { FilmService } from 'src/app/service/film.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user!: AuthData;
  allLikes!: Favorite[];
  constructor(private filmSrv: FilmService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      throw console.error('user non presente');
    } else this.user = JSON.parse(user);

    console.log(this.user);
  }
}
