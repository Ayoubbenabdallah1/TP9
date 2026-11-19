import { Component, inject, OnInit, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { Category } from '../../models/category'; 
import { Game } from '../../models/game';
import { GameService } from '../../services/game-service'; 

@Component({
  selector: 'app-game-add',
  imports: [FormField, FormRoot,JsonPipe],
  templateUrl: './game-add.html',
  styleUrl: './game-add.css',
})
export class GameAdd {
   private gameService = inject(GameService);
  categories = Object.values(Category);
   games = signal<Game[]>([]);

  readonly gameModel = signal<Game>({
    id: '',
    name: '',
    price: 0,
    madeIn: 'Tunisie',
    category: Category.Puzzle,
    isNew: true,
    shops: [],
  });

  readonly gameForm = form(this.gameModel);
  
  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.gameService.getGames().subscribe(list => this.games.set(list));
  }

  onSubmit() {
    const { id, ...newGame } = this.gameModel(); 
    this.gameService.addGame(newGame).subscribe(() => this.loadGames());
    this.resetForm();
  }
  resetForm() {
    this.gameModel.set({
      id: '',
      name: '',
      price: 0,
      madeIn: 'Tunisie',
      category: Category.Puzzle,
      isNew: true,
      shops: [],
    });
  }
}