import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { USER_ROLES, UserOptions } from '../../../auth/interfaces';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  public readonly form: FormGroup;
  public readonly model: any;
  public readonly options: FormlyFormOptions;
  public readonly fields: FormlyFieldConfig[];

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: UserOptions) {
    this.form = this.getForm();
    this.options = this.getOptions();
    this.model = this.getModel();
    this.fields = this.getFields();
  }

  private getForm(): FormGroup {
    return new FormGroup({});
  }

  private getOptions(): FormlyFormOptions {
    return {
      formState: {
        awesomeIsForced: false,
      },
    };
  }

  private getModel(): any {
    return {};
  }

  private getFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'firstName',
        type: 'input',
        templateOptions: {
          label: 'First Name',
          placeholder: 'Enter your first name',
          required: true,
        },
      },
      {
        key: 'phoneNumber',
        type: 'input',
        templateOptions: {
          label: 'Phone Number',
          placeholder: 'Enter your number',
          required: true,
        },
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email',
          placeholder: 'Enter your email',
          type: 'email',
          required: true,
        },
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          label: 'Password',
          placeholder: 'Enter your password',
          type: 'password',
          required: true,
        },
      },
      {
        key: 'birthday',
        type: 'datepicker',
        templateOptions: {
          label: 'Birthday date',
          placeholder: 'Choose your birthday',
          required: true,
        },
      },
      {
        key: 'role',
        type: 'select',
        templateOptions: {
          label: 'Role',
          options: USER_ROLES.map((role) => ({ value: role, label: role.toUpperCase() })),
          required: true,
        },
      },
    ];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.dialogRef.close(this.form.value);
    }
  }
}
