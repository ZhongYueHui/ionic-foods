import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Student1Component } from './student1.component';

describe('Student1Component', () => {
  let component: Student1Component;
  let fixture: ComponentFixture<Student1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Student1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Student1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
