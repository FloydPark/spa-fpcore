import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoIdModalComponent } from './auto-id-modal.component';
import { HttpClientModule } from '@angular/common/http';

describe('AutoIdModalComponent', () => {
  let component: AutoIdModalComponent;
  let fixture: ComponentFixture<AutoIdModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ AutoIdModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoIdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
