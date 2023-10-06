import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetOtpVerifyComponent } from './reset-otp-verify.component';

describe('ResetOtpVerifyComponent', () => {
  let component: ResetOtpVerifyComponent;
  let fixture: ComponentFixture<ResetOtpVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetOtpVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetOtpVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
