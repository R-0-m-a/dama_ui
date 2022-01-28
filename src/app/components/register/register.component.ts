import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {FormBuilder, Validators} from "@angular/forms";
import {RegisterService} from "../../service/register.service";
import {NotificationType} from "../../notification-type";
import {NotificationService} from "../../notification.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  background = environment.background;
  registerForm = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  constructor(private fb: FormBuilder, private registerService: RegisterService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  register() {

    const password = this.registerForm.get(['password'])!.value;
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.notificationService.showNotification('top','center', "The password and its confirmation do not match!", NotificationType.DANGER);
    } else {
      const login = this.registerForm.get(['login'])!.value;
      const email = this.registerForm.get(['email'])!.value;
      this.registerService.save({ login, email, password}).subscribe(
        () => (this.onSaveSuccess()),
        response => this.processError(response)
      );
    }
  }
  private onSaveSuccess(): void {
    this.notificationService.showNotification('top','center', `New user ${this.registerForm.get(['login'])!.value} successfully saved`, NotificationType.SUCCESS);
    this.previousState();
  }

   previousState() {
    window.history.back();
  }

  private processError(response: HttpErrorResponse): void {
    this.notificationService.showNotification('top','center', response.error.title, NotificationType.DANGER);
    // if (response.status === 400) {
    // // if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
    //   this.notificationService.showNotification('top','center', "<strong>Login name already registered!</strong> Please choose another one.", NotificationType.DANGER);
    // } else if (response.status === 400) {
    // // } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
    //   this.notificationService.showNotification('top','center', "<strong>Email is already in use!</strong> Please choose another one.", NotificationType.DANGER);
    // } else {
    //
    // }
  }

}
