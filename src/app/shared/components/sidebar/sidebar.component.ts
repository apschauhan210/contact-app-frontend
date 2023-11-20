import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent 
  // implements AfterViewInit 
{

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  // ngAfterViewInit(): void {
  //   this.updateNavigation();
  // }

  // updateNavigation(): void {
  //   this.route.url.subscribe(
  //     (res) => {
  //       const contactsNavigation = document.getElementById('all-contacts');
  //       const labelsNavigation = document.getElementById('labels');
  //       if (res[0].path === 'contacts') {
  //         contactsNavigation?.classList.add('text-gray-100');
  //         contactsNavigation?.classList.add('bg-gray-700');
  //         contactsNavigation?.classList.add('bg-opacity-25');

  //         contactsNavigation?.classList.remove('text-gray-500');
  //         contactsNavigation?.classList.remove('hover:bg-gray-700');
  //         contactsNavigation?.classList.remove('hover:bg-opacity-25');
  //         contactsNavigation?.classList.remove('hover:text-gray-100');

  //         labelsNavigation?.classList.add('text-gray-100');
  //         labelsNavigation?.classList.add('bg-gray-700');
  //         labelsNavigation?.classList.add('bg-opacity-25');
  //       } else if (res[0].path === 'labels') {
  //         labelsNavigation?.classList.add('text-gray-100');
  //         labelsNavigation?.classList.add('bg-gray-700');
  //         labelsNavigation?.classList.add('bg-opacity-25'); labelsNavigation
  //         labelsNavigation?.classList.remove('text-gray-500');
  //         labelsNavigation?.classList.remove('hover:bg-gray-700');
  //         labelsNavigation?.classList.remove('hover:bg-opacity-25');
  //         labelsNavigation?.classList.remove('hover:text-gray-100');

  //         contactsNavigation?.classList.add('text-gray-100');
  //         contactsNavigation?.classList.add('bg-gray-700');
  //         contactsNavigation?.classList.add('bg-opacity-25');
  //       }
  //     }
  //   )
  // }

  // change(event: any, path: string) {
  //   this.router.navigateByUrl(path).then(
  //     () => this.updateNavigation()
  //   )
  // }
}
