import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialogcontent',
  templateUrl: './dialogcontent.component.html',
  styleUrls: ['./dialogcontent.component.css']
})
export class DialogcontentComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogcontentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
