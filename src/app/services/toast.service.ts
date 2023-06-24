import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async successToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: 'success',
      position: 'bottom',
    });
    toast.present();
  }

  async failureToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }
}
