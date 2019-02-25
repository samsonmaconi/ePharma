import { AbstractControl } from '@angular/forms';
export class PasswordMatchValidation {

    static pwdmatch(cnfpwd: AbstractControl) {
        const password = cnfpwd.get('password').value;
        const confirmPassword = cnfpwd.get('confirmPassword').value;
        if (password !== confirmPassword) {
            cnfpwd.get('confirmPassword').setErrors({ pwdmatch: true });
        } else {
            return null;
        }
    }
}
