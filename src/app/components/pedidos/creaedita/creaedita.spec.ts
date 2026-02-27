import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Creaedita } from './creaedita';

describe('Creaedita', () => {
  let component: Creaedita;
  let fixture: ComponentFixture<Creaedita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Creaedita]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Creaedita);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
