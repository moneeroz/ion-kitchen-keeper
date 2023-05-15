import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ifavourite } from 'src/app/interfaces/ifavourite';
import { Iuser } from 'src/app/interfaces/iuser';
import { FavouriteService } from 'src/app/services/favourite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  user!: Iuser;
  userFavourites: Ifavourite[] = [];
  constructor(
    private userService: UserService,
    private favouriteService: FavouriteService,
    private router: Router,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.user = this.userService.getUserData();

    this.favouriteService.getFavourites(this.user.id).subscribe({
      next: (userFavourites) => {
        this.userFavourites = userFavourites;
        console.log(this.userFavourites);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onView(recipe_id: string) {
    console.log(recipe_id);
    this.router.navigate(['recipe', recipe_id]);
  }

  onDelete(recipe_id: string) {
    const index = this.userFavourites.findIndex((favourite) => {
      return favourite.recipe.id === recipe_id;
    });

    // Delete Recipe from the DB
    this.favouriteService
      .deleteFromFavourites(this.user.id, recipe_id)
      .subscribe({
        next: (result) => {
          console.log(result);
          alert('removed from favourites successfully');
        },
        error: (err) => {
          console.log(err);
        },
      });

    // Remove Recipe from UI
    this.userFavourites.splice(index, 1);
  }
}
