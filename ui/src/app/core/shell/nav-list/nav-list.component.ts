import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenData, AuthenticationService } from '../../authentication/authentication.service';

interface NavListItem {
  icon: string;
  route: string;
  name: string;
}

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
})
export class NavListComponent implements OnInit {
  @Input()
  device!: String;

  tokenData: TokenData;
  role: string;

  commonItems: NavListItem[] = [];
  mobileItems: NavListItem[];
  normalItems: NavListItem[];

  constructor(private router: Router, private authService: AuthenticationService) {
    this.tokenData = this.authService.getTokenData();
    this.role = this.authService.getRole();
    if (this.role == '2') {
      const user_route = this.authService.getRoute();
      this.commonItems = [
        { icon: 'home', route: 'home', name: 'Home' },
        { icon: 'inventory_2', route: user_route, name: 'Preference' },
      ];
    } else {
      this.commonItems = [
        { icon: 'home', route: 'home', name: 'Home' },
        { icon: 'inventory_2', route: 'professors', name: 'Instructors' },
      ];
    }

    this.mobileItems = [...this.commonItems];

    this.normalItems = [...this.commonItems];
  }
  ngOnInit(): void {}

  logout() {
    localStorage.setItem('token', '');
    localStorage.setItem('tokenData', '');
    localStorage.setItem('role', '');
    this.router.navigate(['login']);
  }
}
