import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IappState } from 'src/store/iapp-state';
import { IloadingState } from 'src/store/loading/iloading-state';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  isLoading$?: Observable<IloadingState>;

  constructor(private store: Store<IappState>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select('loading');
  }
}
