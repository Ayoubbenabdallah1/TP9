import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game'; 

const URL = 'http://localhost:3000/games';

@Injectable({ providedIn: 'root' })
export class GameService {
  private http = inject(HttpClient);

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(URL);
  }

  addGame(game: Omit<Game, 'id'>): Observable<Game> {
    return this.http.post<Game>(URL, game);
  }
}