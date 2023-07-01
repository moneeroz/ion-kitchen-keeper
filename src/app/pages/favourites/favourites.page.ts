import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { FavouriteApiActions } from 'src/store/favourites/favourites.actions';
import { selectFavouriteItems } from 'src/store/favourites/favourites.selectors';
import { IappState } from 'src/store/iapp-state';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  pageTitle: string = 'favourites';

  items$ = this.store.select(selectFavouriteItems);
  constructor(
    private router: Router,
    private store: Store<IappState>,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.store.dispatch(FavouriteApiActions.getFavouritesRequest());
  }

  onView(recipe_id: string) {
    console.log(recipe_id);
    this.router.navigate(['recipe', recipe_id]);
  }

  deleteFromFavourites(recipeId: string) {
    this.store.dispatch(
      FavouriteApiActions.removeFromFavouritesRequest({ recipeId }),
    );
  }

  async onDelete(recipeId: string) {
    const deleteAlert = await this.alertController.create({
      header: 'Remove',

      message: 'Are you sure you want to remove this recipe from favourites',
      buttons: [
        {
          text: 'NO',
        },
        {
          text: 'YES',
          handler: () => {
            this.deleteFromFavourites(recipeId);
          },
        },
      ],
    });
    await deleteAlert.present();
  }
}
