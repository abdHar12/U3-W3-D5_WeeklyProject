import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Film } from '../module/film';
import { Favorite } from '../module/favorite';
import { AuthData } from '../module/authdata';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  allLikes!: Favorite[];
  constructor(private http: HttpClient) {}
  setAllLikes(likes: Favorite[]) {
    this.allLikes = likes;
  }
  getallLikes() {
    return this.allLikes;
  }
  getFilms() {
    return this.http.get<Film[]>(`${environment.apiURL}/movies-popular`);
  }

  getLikes() {
    return this.http.get<Favorite[]>(`${environment.apiURL}/favorites`);
  }
  deleteLikeInDB(id: number) {
    return this.http.delete(`${environment.apiURL}/favorites/${id}`);
  }
  addLikeInDB(data: { userId: number; movieId: number }) {
    return this.http.post(`${environment.apiURL}/favorites`, data);
  }

  removeLike(id: number, user: AuthData) {
    this.getLikes().subscribe((likes) => {
      likes.forEach((like) => {
        if (id === like.movieId && user.user.id === like.userId) {
          console.log(like.userId, like.movieId);
          this.deleteLikeInDB(like.id).subscribe(
            () => 'like eliminato con successo'
          );
        }
      });
    });
  }

  addLike(film: Film, user: AuthData) {
    const like = {
      userId: user.user.id,
      movieId: film.id,
    };
    let count = 0;
    this.getLikes().subscribe((likes) => {
      likes.forEach((like) => {
        if (like.movieId === film.id && user.user.id === like.userId) {
          count++;
        }
      });
    });
    if (count === 0) {
      this.addLikeInDB(like).subscribe(() => {
        'like aggiunto con successo';
      });
    }
  }
}
