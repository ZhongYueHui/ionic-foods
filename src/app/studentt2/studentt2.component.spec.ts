import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Studentt2Component } from './studentt2.component';

describe('Studentt2Component', () => {
  let component: Studentt2Component;
  let fixture: ComponentFixture<Studentt2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Studentt2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Studentt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
