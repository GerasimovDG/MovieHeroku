import { FormGroup, ValidatorFn } from "@angular/forms";

export class ChoicePlaceValidator {

  static restrictedPlace(countPlacesInRow: number[]): ValidatorFn {
    return (group: FormGroup): { [key: string]: boolean } | null => {
      const row = group.get("row").value - 1;
      const place = group.get("place").value;

      if ( place > countPlacesInRow[row]) {
        return {"incorrectPlace": true};
      }
      return null;
    };
  }
}
