import { Component, inject, OnInit, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form, FormField, FormRoot, required, pattern, min } from '@angular/forms/signals';
import { Category } from '../../models/category'; 
import { Game } from '../../models/game';
import { GameService } from '../../services/game-service'; 

@Component({
  selector: 'app-game-add',
  imports: [FormField, FormRoot,JsonPipe],
  templateUrl: './game-add.html',
  styleUrl: './game-add.css',
})
export class GameAdd implements OnInit  {

   private gameService = inject(GameService);
  categories = Object.values(Category);
     games = this.gameService.games; 

  readonly gameModel = signal<Game>({
    id: '',
    name: '',
    price: 0,
    madeIn: 'Tunisie',
    category: Category.Puzzle,
    isNew: true,
    shops: [],
  });

  readonly gameForm = form(this.gameModel, path => {
  required(path.name, { message: 'Nom obligatoire' });
  pattern(path.name, /^[A-Z].+$/, { message: 'Le nom doit commencer par une majuscule' });
  required(path.price, { message: 'Le prix est obligatoire' });
  min(path.price, 0.1, { message: 'Le prix doit être supérieur à 0.1 DT' });
});
   ngOnInit() {
    this.gameService.getGames().subscribe(); 
  }
  onSubmit() {
    this.gameService.addGame(this.gameModel()).subscribe(() => this.resetForm());
  }
  resetForm() {
    this.gameForm().reset();
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