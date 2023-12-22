import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AuthData } from 'src/app/module/authdata';
import { Film } from 'src/app/module/film';
import { FilmService } from 'src/app/service/film.service';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { Favorite } from 'src/app/module/favorite';
import { AuthService } from 'src/app/auth/auth-srv.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnChanges {
  allFilms!: Film[];
  urlCovers: string = 'https://image.tmdb.org/t/p/w500';
  user!: AuthData;
  likeBool!: boolean;
  allLikes!: Favorite[];
  allUsers!: AuthData[];
  constructor(private filmSrv: FilmService, private authSrv: AuthService) {}
  ngOnChanges(): void {
    this.getAllLikes();
    console.log('cambiamento');
  }
  ngOnInit(): void {
    this.getAllLikes();

    this.filmSrv.getFilms().subscribe((films) => {
      this.allFilms = films;
    });
    const user = localStorage.getItem('user');
    if (!user) {
      throw console.error('user non presente');
    } else this.user = JSON.parse(user);
  }

  liked(film: Film) {
    let count = 0;
    this.allLikes.forEach((like) => {
      if (like.movieId === film.id && this.user.user.id === like.userId) {
        count++;
      }
    });
    if (count > 0) {
      return true;
    } else return false;
  }

  removeLike(film: Film) {
    this.filmSrv.removeLike(film.id, this.user).add(() => this.getAllLikes());
  }
  addLike(film: Film) {
    this.filmSrv.addLike(film, this.user).add(() => this.getAllLikes());
  }
  getAllLikes() {
    this.filmSrv.getLikes().subscribe((likes) => {
      this.allLikes = likes;
    });
  }
  getAllUsers() {
    this.authSrv.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }
}
