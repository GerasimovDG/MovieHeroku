import { FormControl, FormGroup } from "@angular/forms";

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

  static passwordMatch(group: FormGroup): { [key: string ]: boolean} {
    const pass = group.get("password").value;
    const pass2 = group.get("password2").value;

    if (pass && pass2) {
      if (pass.toString() !== pass2.toString()) {
        return {"noMatchPassword": true};
      }
    }

    return null;
  }
}
