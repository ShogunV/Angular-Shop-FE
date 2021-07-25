import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export interface UserResponse {
  complete: boolean;
  users: User[];
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = false;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loading = true;
    this.adminService.getUsers().subscribe((data: UserResponse) => {
      this.loading = false;
      this.users = data['users'];
    });
  }
}
