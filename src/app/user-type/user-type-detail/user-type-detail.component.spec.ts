import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeDetailComponent } from './user-type-detail.component';

describe('UserTypeDetailComponent', () => {
  let component: UserTypeDetailComponent;
  let fixture: ComponentFixture<UserTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
