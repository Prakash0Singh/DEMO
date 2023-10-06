import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverFantasyPointsComponent } from './over-fantasy-points.component';

describe('OverFantasyPointsComponent', () => {
  let component: OverFantasyPointsComponent;
  let fixture: ComponentFixture<OverFantasyPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverFantasyPointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverFantasyPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
