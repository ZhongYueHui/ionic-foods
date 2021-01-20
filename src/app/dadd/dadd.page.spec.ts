import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DaddPage } from './dadd.page';

describe('DaddPage', () => {
  let component: DaddPage;
  let fixture: ComponentFixture<DaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
