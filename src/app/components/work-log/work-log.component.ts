import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {WorkLogService} from '../../services/work-log.service';

@Component({
  selector: 'app-work-log',
  templateUrl: './work-log.component.html',
  styleUrls: ['./work-log.component.scss']
})
export class WorkLogComponent implements OnInit {

  workLogForm: FormGroup;
  state: string;

  entries = [
    {
      id: 0,
      type: 'ordinary',
      name: 'Lavoro Ordinario'
    },
    {
      id: 1,
      type: 'medic',
      name: 'Malattia'
    },
    {
      id: 2,
      type: 'permssion',
      name: 'Permessi'
    }
  ];

  events = [
    {
      id: 0,
      type: 'ordinary',
      name: 'Lavoro Ordinario'
    },
    {
      id: 1,
      type: 'medic',
      name: 'Malattia'
    },
    {
      id: 2,
      type: 'permssion',
      name: 'Permessi'
    }
  ];

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private userService: UserService,
    private workLogService: WorkLogService
  ) {}

  ngOnInit(): void {
    this.workLogForm = this.fb.group({
      type: ['', Validators.required]
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
    // TODO: send worklog
  }

}
