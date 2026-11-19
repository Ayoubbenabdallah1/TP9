import { HttpClient } from '@angular/common/http';
import { inject, Injectable,signal } from '@angular/core';
import { Observable ,tap} from 'rxjs';
import { Game } from '../models/game'; 
import { environment } from '../../../environments/environment.development';

const URL = `${environment.apiUrl}/games`;
@Injectable({ providedIn: 'root' })
export class GameService {
  private http = inject(HttpClient);
  private _games = signal<Game[]>([]);
  readonly games = this._games.asReadonly();



  getGames(): Observable<Game[]> {
  return this.http.get<Game[]>(URL).pipe(
    tap(list => this._games.set(list))
  );
}

  addGame(game: Omit<Game, 'id'>): Observable<Game> {
    return this.http.post<Game>(URL, game).pipe(
      tap(created => this._games.update(list => [...list, created]))
    );
  }
}