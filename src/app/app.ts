import { Component, signal, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UnsavedChangesService } from './core/services/unsaved-changed';
import { MessageBox } from './shared/message-box/message-box';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessageBox],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {

  protected readonly appTitle = signal('kms-cafm-admin');

  visible = false;
  title = '';
  message = '';
  onConfirm!: Function;
  onCancel!: Function;

  private destroy$ = new Subject<void>();

  constructor(private dialogService: UnsavedChangesService) {

    this.dialogService.dialog$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {

        if (!data) {
          this.visible = false;
          return;
        }

        this.visible = true;
        this.title = data.title;
        this.message = data.message;
        this.onConfirm = data.onConfirm;
        this.onCancel = data.onCancel;

      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}