import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data:any,library: FaIconLibrary) {
    library.addIconPacks(fab,far);
   }
  
  ngOnInit() {
    
  }
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }


}
