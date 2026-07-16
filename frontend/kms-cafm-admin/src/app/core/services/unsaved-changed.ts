import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesService {

  private dirty = false;

  showLeavePopup = false;

  private leaveSubject = new Subject<boolean>();

  setDirty(value: boolean) {
     console.trace();
    this.dirty = value;
  }

  isDirty(): boolean {
    return this.dirty;
  }

  clear() {
    this.dirty = false;
  }

   private subject = new Subject<any>();

  dialog$ = this.subject.asObservable();

  open(config: any) {
    this.subject.next(config);
  }

  close() {
    this.subject.next(null);
  }

  // unsaved-changes.service.ts
confirmLeave(): Observable<boolean> {

  return new Observable(observer => {

    this.open({
      title: 'Unsaved Changes',
      message: 'Do you want to leave this page?',
      onConfirm: () => {
        this.clear();
        this.close();             

        observer.next(true);
        observer.complete();
      },
      onCancel: () => {
        this.close();            

        observer.next(false);
        observer.complete();
      }
    });

  });

}

  
  // confirmLeave() {

  //   this.showLeavePopup = true;

  //   this.leaveSubject = new Subject<boolean>();

  //   return this.leaveSubject.asObservable();
  // }

  // save() {

  //   this.showLeavePopup = false;

  //   this.clear();

  //   this.leaveSubject.next(true);

  //   this.leaveSubject.complete();

  // }

  // discard() {

  //   this.showLeavePopup = false;

  //   this.clear();

  //   this.leaveSubject.next(true);

  //   this.leaveSubject.complete();

  // }

  // cancel() {

  //   this.showLeavePopup = false;

  //   this.leaveSubject.next(false);

  //   this.leaveSubject.complete();

  // }
}