import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTeamComponent } from './choose-team.component';

describe('ChooseTeamComponent', () => {
  let component: ChooseTeamComponent;
  let fixture: ComponentFixture<ChooseTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
