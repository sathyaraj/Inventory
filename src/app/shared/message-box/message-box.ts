import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type ModalType = 'success' | 'error' | 'warning' | 'info';
type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-box.html',
  styleUrl: './message-box.css',
})
export class MessageBox {

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() visible: boolean = false;

  @Input() type: ModalType = 'info';
  @Input() size: ModalSize = 'md';

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }

  // 🎯 Icon + color based on type
  get icon() {
    switch (this.type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  }

  get headerColor() {
    switch (this.type) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-blue-600';
    }
  }

  get sizeClass() {
  switch (this.size) {
    case 'sm': return 'w-72';
    case 'md': return 'w-96';
    case 'lg': return 'w-[500px]';
    case 'xl': return 'w-[650px]';
    default: return 'w-96';
  }
}

// ngOnChanges() {
//   if (this.visible) {
//     setTimeout(() => this.cancel(), 3000);
//   }
// }
}