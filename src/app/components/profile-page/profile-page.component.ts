import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthData } from 'src/app/module/authdata';
import { Favorite } from 'src/app/module/favorite';
import { Film } from 'src/app/module/film';
import { FilmService } from 'src/app/service/film.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user!: AuthData;
  allLikes!: Favorite[];
  likedFilmIds: number[] = [];
  allLikedFilms: Film[] = [];
  allFilms!: Film[];
  urlCovers: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private filmSrv: FilmService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      throw console.error('user non presente');
    } else this.user = JSON.parse(user);

    this.filmSrv.getFilms().subscribe((films) => {
      this.allFilms = films;
      this.getAllLikes();
    });
  }

  removeLike(film: Film) {
    this.filmSrv.removeLike(film.id, this.user).add(() => this.getAllLikes());
  }

  getAllLikes() {
    this.filmSrv.getLikes().subscribe((likes) => {
      this.allLikes = likes;
      this.likedFilmIds = [];

      this.allLikes.forEach((like) => {
        if (this.user.user.id === like.userId) {
          this.likedFilmIds.push(like.movieId);
        }
      });
      this.allLikedFilms = [];

      this.allFilms.forEach((film) => {
        if (this.likedFilmIds.includes(film.id)) {
          this.allLikedFilms.push(film);
        }
      });
    });
  }
}
