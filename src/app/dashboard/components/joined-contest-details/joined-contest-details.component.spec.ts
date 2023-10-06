import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedContestDetailsComponent } from './joined-contest-details.component';

describe('JoinedContestDetailsComponent', () => {
  let component: JoinedContestDetailsComponent;
  let fixture: ComponentFixture<JoinedContestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinedContestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinedContestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
