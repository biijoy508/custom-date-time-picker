import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDateTimePickerComponent } from './custom-date-time-picker.component';
import { OnlyNumber } from '../onlyNumber';
import { FormsModule } from '@angular/forms';

describe('CustomDateTimePickerComponent', () => {
  let component: CustomDateTimePickerComponent;
  let fixture: ComponentFixture<CustomDateTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ CustomDateTimePickerComponent, OnlyNumber ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updateTimeInputs  to have been called', function() {
    const d = new Date();
    spyOn(component, 'updateTimeInputs').and.callThrough();
    component.updateTimeInputs(d);
    expect(component.updateTimeInputs).toHaveBeenCalled();
  });

});
