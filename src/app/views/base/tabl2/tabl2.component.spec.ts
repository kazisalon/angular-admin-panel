import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabl2Component } from './tabl2.component';

describe('Tabl2Component', () => {
  let component: Tabl2Component;
  let fixture: ComponentFixture<Tabl2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tabl2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tabl2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
