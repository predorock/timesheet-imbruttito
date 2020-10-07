import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mergeMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserRepository } from 'src/app/model/model-repository/user-repository.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  state: string;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private userService: UserRepository
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      displayName: [''],
      birthDate: ['', Validators.required],
      hiringDate: ['', Validators.required],
      livingAddress: [''],
      workCity: [''],
      jobTitle: [''],
    });
  }

  onChangeState(state: string): void {
    console.log(state);
    this.state = state;
  }

  onFormSubmit(form: FormGroup): void {
    if (form.status === 'INVALID') {
      return;
    }
    this.auth.user$
      .pipe(
        take(1),
        tap(u => console.log(u)),
        mergeMap(({ id }) => this.userService.update$(id, form.value))
      )
      .subscribe((ev) => {
        //console.log(ev);
      });
  }
}
