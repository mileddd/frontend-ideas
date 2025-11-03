import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaListViewComponent } from './idea-list-view.component';

describe('IdeaListViewComponent', () => {
  let component: IdeaListViewComponent;
  let fixture: ComponentFixture<IdeaListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
