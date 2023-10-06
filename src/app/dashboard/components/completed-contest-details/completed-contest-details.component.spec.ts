import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedContestDetailsComponent } from './completed-contest-details.component';

describe('CompletedContestDetailsComponent', () => {
  let component: CompletedContestDetailsComponent;
  let fixture: ComponentFixture<CompletedContestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedContestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedContestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
