import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taskbanner } from './taskbanner';

describe('Taskbanner', () => {
  let component: Taskbanner;
  let fixture: ComponentFixture<Taskbanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taskbanner],
    }).compileComponents();

    fixture = TestBed.createComponent(Taskbanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
