import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredContestComponent } from './filtered-contest.component';

describe('FilteredContestComponent', () => {
  let component: FilteredContestComponent;
  let fixture: ComponentFixture<FilteredContestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredContestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
