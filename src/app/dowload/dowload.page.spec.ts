import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DowloadPage } from './dowload.page';

describe('DowloadPage', () => {
  let component: DowloadPage;
  let fixture: ComponentFixture<DowloadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DowloadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DowloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
