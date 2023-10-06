import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSettingComponent } from './group-setting.component';

describe('GroupSettingComponent', () => {
  let component: GroupSettingComponent;
  let fixture: ComponentFixture<GroupSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
