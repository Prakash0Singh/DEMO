import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalityComponent } from './legality.component';

describe('LegalityComponent', () => {
  let component: LegalityComponent;
  let fixture: ComponentFixture<LegalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
