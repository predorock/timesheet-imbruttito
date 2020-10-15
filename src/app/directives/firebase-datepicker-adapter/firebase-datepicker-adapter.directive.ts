import { Directive, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as firebase from 'firebase';

@Directive({
  selector: '[appFirebaseDatepickerAdapter]',
  providers: [NgModel],
})
export class FirebaseDatepickerAdapterDirective {

  constructor(
    private model: NgModel
  ) { }

  @HostListener('ngModelChange', ['$event'])
  parse(ev): void {
    if (ev instanceof firebase.firestore.Timestamp) {
      this.model.valueAccessor.writeValue(ev.toDate());
    }
  }

}
