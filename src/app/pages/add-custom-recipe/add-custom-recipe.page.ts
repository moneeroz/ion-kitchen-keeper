import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CustomRecipeActions } from 'src/store/custom-recipe/custom-recipe.actions';
import { customRecipeFeature } from 'src/store/custom-recipe/custom-recipe.selectors';
import { IcustomRecipeState } from 'src/store/custom-recipe/icustom-recipe-state';
import { IappState } from 'src/store/iapp-state';
import { hide, show } from 'src/store/loading/loading.actions';

@Component({
  selector: 'app-add-custom-recipe',
  templateUrl: './add-custom-recipe.page.html',
  styleUrls: ['./add-custom-recipe.page.scss'],
})
export class AddCustomRecipePage implements OnInit {
  promptForm: FormGroup = this.fb.group({
    ingredients: ['', [Validators.required]],
  });

  customRecipeStateSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<IappState>,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.watchCustomRecipeState();
  }

  ngOnDestroy(): void {
    if (this.customRecipeStateSubscription) {
      this.customRecipeStateSubscription.unsubscribe();
    }
  }

  generate() {
    const prompt = this.promptForm.get('ingredients')!.value;

    this.store.dispatch(CustomRecipeActions.generateRecipeRequest({ prompt }));
  }

  private toggleLoading(customRecipeState: IcustomRecipeState) {
    if (customRecipeState.isLoading) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private watchCustomRecipeState() {
    this.customRecipeStateSubscription = this.store
      .select(customRecipeFeature)
      .subscribe({
        next: (state) => {
          this.toggleLoading(state);
          this.onError(state);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  private async onError(customRecipeState: IcustomRecipeState) {
    if (customRecipeState.error) {
      const toast = await this.toastController.create({
        message: customRecipeState.error,
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
    }
  }
}
