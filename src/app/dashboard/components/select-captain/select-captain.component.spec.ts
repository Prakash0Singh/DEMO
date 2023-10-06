import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCaptainComponent } from './select-captain.component';

describe('SelectCaptainComponent', () => {
  let component: SelectCaptainComponent;
  let fixture: ComponentFixture<SelectCaptainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCaptainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCaptainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
