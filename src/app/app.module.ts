import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatButtonModule, MatIconModule, MatTableModule, 
          MatFormFieldModule, MatInputModule, 
          MatPaginatorModule, MatSortModule } from '@angular/material';
import { PopupComponent } from './popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DialogcontentComponent } from './dialogcontent/dialogcontent.component';

import{ CustomDateTimePickerComponent } from './custom-date-time-picker/custom-date-time-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PopupComponent,
    DialogcontentComponent
  ],
  entryComponents: [DialogcontentComponent],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatButtonModule, MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatDialogModule, FormsModule, CustomDateTimePickerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
