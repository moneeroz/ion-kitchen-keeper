import { Component, OnInit } from '@angular/core';
import { IcartItem } from 'src/app/interfaces/icart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: IcartItem[] = [];
  constructor() {}

  ngOnInit() {}
}
