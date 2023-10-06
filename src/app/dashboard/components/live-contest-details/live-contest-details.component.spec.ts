import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveContestDetailsComponent } from './live-contest-details.component';

describe('LiveContestDetailsComponent', () => {
  let component: LiveContestDetailsComponent;
  let fixture: ComponentFixture<LiveContestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveContestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveContestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
