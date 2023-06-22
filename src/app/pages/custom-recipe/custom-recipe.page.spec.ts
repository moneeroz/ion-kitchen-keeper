import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomRecipePage } from './custom-recipe.page';

describe('CustomRecipePage', () => {
  let component: CustomRecipePage;
  let fixture: ComponentFixture<CustomRecipePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
