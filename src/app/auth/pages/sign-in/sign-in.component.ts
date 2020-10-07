import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { CORE_ROUTES } from '../../../core/routes';
import { SignInWithPasswordArgsType, SignInWithPasswordResponseType } from '../../interfaces';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public readonly fields: FormlyFieldConfig[];
  public readonly form: FormGroup;
  public readonly model: unknown;
  public readonly options: FormlyFormOptions;

  constructor(private readonly _router: Router, private readonly _authService: AuthService) {
    this.fields = this.getFormlyFields();
    this.form = this.getForm();
    this.options = this.getOptions();
    this.model = {};
  }

  private getFormlyFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email',
          placeholder: 'Write email...',
          required: true,
        },
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          label: 'Password',
          placeholder: 'Write password...',
          type: 'password',
          required: true,
          asdsadass: 'asdasdsad',
        },
      },
    ];
  }

  private getForm(): FormGroup {
    return new FormGroup({});
  }

  private getOptions(): FormlyFormOptions {
    return {};
  }

  async signIn(): Promise<void> {
    try {
      if (!this.form.valid) {
        return;
      }
      await this.signInWithPassword(this.form.value);
      await this._router.navigateByUrl(CORE_ROUTES.ADMIN.fullPath);
    } catch (er) {}
  }

  signInWithPassword(args: SignInWithPasswordArgsType): SignInWithPasswordResponseType {
    return this._authService.signIn(args);
  }
}
