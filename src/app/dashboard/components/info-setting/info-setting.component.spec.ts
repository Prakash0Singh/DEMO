import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSettingComponent } from './info-setting.component';

describe('InfoSettingComponent', () => {
  let component: InfoSettingComponent;
  let fixture: ComponentFixture<InfoSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
