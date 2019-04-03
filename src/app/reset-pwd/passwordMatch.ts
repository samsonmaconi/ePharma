import { AbstractControl } from '@angular/forms';
export class PasswordMatch {

    static pwdmatch(cnfpwd: AbstractControl) {
        const pwd = cnfpwd.get('password').value;
        const cfpwd = cnfpwd.get('confirmPassword').value;
        if (pwd !== cfpwd) {
            cnfpwd.get('confirmPassword').setErrors({ pwdmatch: true });
        } else {
            return null;
        }
    }
}
