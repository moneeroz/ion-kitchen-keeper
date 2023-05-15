import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Irecipe } from 'src/app/interfaces/irecipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  @Input() recipe!: Irecipe;

  @Output() viewEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onView(recipe_id: string) {
    this.viewEvent.emit(recipe_id);
  }
}
