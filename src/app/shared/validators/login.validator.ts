import { FormControl } from "@angular/forms";

export class LoginValidator {

  static restrictedPassword(control: FormControl): { [key: string ]: boolean} {
    const password = control.value;

    if (password) {
      const passwordValid = /^[A-z0-9]*$/.test(password);
      if (!passwordValid) {
        return {"incorrectPas": true};
      }
    }
    return null;
  }
}
