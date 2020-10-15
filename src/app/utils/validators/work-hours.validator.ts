import { FormGroup, ValidatorFn } from '@angular/forms';
import { eventDate } from '../log-to-calendar-event';

import { differenceInHours } from 'date-fns';

export function workHoursValidator(start: string, end: string): ValidatorFn {
  return (fg: FormGroup) => {

    const v1 = fg.get(start).value;
    const v2 = fg.get(end).value;

    if (!v1 || !v2) {
      return null;
    }

    const startDate = eventDate(v1);
    const endDate = eventDate(v2);

    const d = differenceInHours(endDate, startDate);

    if (d < 0) {
      return {
        invalidWorkHours: true
      };
    }

    return null;
  };
}
