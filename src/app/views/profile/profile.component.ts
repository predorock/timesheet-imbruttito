import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounce } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  state: string;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      displayName: [''],
      birthDate: ['', Validators.required],
      hiringDate: ['', Validators.required],
      livingAddress: [''],
      workCity: [''],
      jobTitle: ['']
    });
  }

  onChangeState(state: string): void {
    console.log(state);
    this.state = state;
  }

}
