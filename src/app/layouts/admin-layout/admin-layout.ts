import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { LucideAngularModule  } from 'lucide-angular';
import { ChevronLeft,LogOut   } from 'lucide-angular';
import { AuthService } from '../../core/services/auth';


@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule,RouterOutlet, SidebarComponent,LucideAngularModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {

  @ViewChild('scrollContainer')scrollContainer!: ElementRef;

   chevronleft = ChevronLeft;
   lgout = LogOut;
   itemSetValue: string | null = null;   

   constructor(@Inject(PLATFORM_ID) private platformId: Object,private router:Router, private authService: AuthService) {}
   ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.itemSetValue = localStorage.getItem('ItemSetValue');
    }
  }
isSidebarOpen = true;

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

goBack() {
  this.router.navigate(['/admin/item-master']); // change path if needed
}

showTopButton = false;

onScroll(event: any) {
  const el = event.target;
  this.showTopButton = el.scrollTop > 200;
}

scrollToTop(): void {
  this.scrollContainer.nativeElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

logout() {

  // clear token
  this.authService.logout();

  // redirect login
  this.router.navigate(['/login']);

}

}
