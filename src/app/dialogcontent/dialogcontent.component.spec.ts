import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcontentComponent } from './dialogcontent.component';

describe('DialogcontentComponent', () => {
  let component: DialogcontentComponent;
  let fixture: ComponentFixture<DialogcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
