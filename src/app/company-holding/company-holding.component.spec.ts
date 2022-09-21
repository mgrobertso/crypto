import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHoldingComponent } from './company-holding.component';

describe('CompanyHoldingComponent', () => {
  let component: CompanyHoldingComponent;
  let fixture: ComponentFixture<CompanyHoldingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyHoldingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyHoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
