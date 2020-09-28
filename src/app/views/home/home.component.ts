import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.user$.pipe(
      map(u => !!u)
    );
  }

}
