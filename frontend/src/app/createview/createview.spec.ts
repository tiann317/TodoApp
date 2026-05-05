import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createview } from './createview';

describe('Createview', () => {
  let component: Createview;
  let fixture: ComponentFixture<Createview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createview],
    }).compileComponents();

    fixture = TestBed.createComponent(Createview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
