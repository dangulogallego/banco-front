import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeAddComponent } from './user-type-add.component';

describe('UserTypeAddComponent', () => {
  let component: UserTypeAddComponent;
  let fixture: ComponentFixture<UserTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
