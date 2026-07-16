import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import {
  LayoutDashboard,
  Menu,
  Search,
  Boxes,
  ChevronDown,
  ChevronUp,
  List,
  Folder,
  Warehouse,
  PackageOpen,
  PlusCircle,
  ArrowUpCircle,
  Undo2,
  ArrowRightLeft,
  RefreshCcw,
  Truck,
  Wrench,
  Settings,
  Building2,
  Users,
  ShieldCheck,
  BadgeDollarSign,
  LogOut
} from 'lucide-angular';


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule,LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
   openMenu: string | null = null;

  toggle(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  // openMenu = '';

  // toggle(menu: string) {

  //   this.openMenu =
  //     this.openMenu === menu
  //       ? ''
  //       : menu;

  // }

  readonly LayoutDashboard = LayoutDashboard;
  readonly Menu = Menu;
  readonly Search = Search;
  readonly Boxes = Boxes;
  readonly ChevronDown = ChevronDown;
  readonly ChevronUp = ChevronUp;
  readonly List = List;
  readonly Folder = Folder;
  readonly Warehouse = Warehouse;
  readonly PackageOpen = PackageOpen;
  readonly PlusCircle = PlusCircle;
  readonly ArrowUpCircle = ArrowUpCircle;
  readonly Undo2 = Undo2;
  readonly ArrowRightLeft = ArrowRightLeft;
  readonly RefreshCcw = RefreshCcw;
  readonly Truck = Truck;
  readonly Wrench = Wrench;
  readonly Settings = Settings;
  readonly Building2 = Building2;
  readonly Users = Users;
  readonly ShieldCheck = ShieldCheck;
  readonly BadgeDollarSign = BadgeDollarSign;
  readonly LogOut = LogOut;
}
