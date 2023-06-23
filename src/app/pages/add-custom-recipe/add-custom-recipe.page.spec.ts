import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCustomRecipePage } from './add-custom-recipe.page';

describe('AddCustomRecipePage', () => {
  let component: AddCustomRecipePage;
  let fixture: ComponentFixture<AddCustomRecipePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddCustomRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
