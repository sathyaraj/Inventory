import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UnsavedChangesService } from '../services/unsaved-changed';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnsavedChanged implements CanDeactivate<any> {

  constructor(
    private unsavedService: UnsavedChangesService
  ) {}

   canDeactivate(): boolean | Observable<boolean> {

  if (!this.unsavedService.isDirty()) {
    return true;
  }

  return this.unsavedService.confirmLeave();
}


}