import { Component, OnInit } from '@angular/core';
import { Ifavourite } from 'src/app/interfaces/ifavourite';
import { FavouriteService } from 'src/app/services/favourite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  user: any;
  userFavourites: Ifavourite[] = [];
  constructor(
    private userService: UserService,
    private favouriteService: FavouriteService,
  ) {}

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
  ngOnInit() {}
}