import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  users = [];
  loading = false;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loading = true;
    this.adminService.getUsers().subscribe(data => {
      this.loading = false;
      this.users = data['users'];
    });
  }

}
