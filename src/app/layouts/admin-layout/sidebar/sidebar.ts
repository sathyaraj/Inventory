import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionService } from '../../../core/services/permission';

import {
  LucideAngularModule,
  Menu,
  LayoutDashboard,
  Package,
  ChevronDown,
  ChevronUp,
  Wrench,
  ClipboardList,
  Settings,
  Building2,
  Users,
  DollarSign,
  BadgePercent,
  Receipt,
  User,
  Handshake,
  Landmark,
  BadgeDollarSign
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {

  constructor(
    public permissionService: PermissionService
  ) {}

  @Input() isOpen: boolean = true;

  @Output() sidebarToggle = new EventEmitter<void>();

  onToggleClick() {
    this.sidebarToggle.emit();
  }

  openMenu: string | null = null;

  toggle(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  icons = {
    Menu,
    LayoutDashboard,
    Package,
    ChevronDown,
    ChevronUp,
    Wrench,
    ClipboardList,
    Settings,
    Building2,
    Users,
    DollarSign,
    BadgePercent,
    Receipt,
    User,
    Handshake,
    Landmark,
    BadgeDollarSign
  };

  

}