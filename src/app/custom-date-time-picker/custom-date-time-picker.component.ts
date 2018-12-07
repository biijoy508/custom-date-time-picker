/**
* Title: CustomDateTimePicker component
* Description: CustomDateTimePicker component functionalities
* Copyright: Copyright (c) 2018 Unisys
*/

import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-custom-date-time-picker',
  templateUrl: './custom-date-time-picker.component.html',
  styleUrls: ['./custom-date-time-picker.component.css']
})
export class CustomDateTimePickerComponent {
  fromSearchDay; fromSearchMonth; fromSearchYear; fromSearchHours; fromSearchMinutes;

  @Output()
  customDateTimeEmitter: EventEmitter<any> = new EventEmitter();

  @Input() showCustomTimePicker: boolean;
  @Input() showCustomDate: boolean;

  disableDayDecreaseBtn: boolean = false;
  disableMonthDecreaseBtn: boolean = false;
  disableYearDecreaseBtn: boolean = false;
  disableHourDecreaseBtn: boolean = false;
  disableMinDecreaseBtn: boolean = false;

  constructor() {
    this.updateCurrentDatetimeToInputs(false);
  }

  updateCurrentDatetimeToInputs(disableButtons) {
    this.fromSearchDay = this.zeroPad(new Date().getDate(), 2);
    this.fromSearchMonth = this.zeroPad(new Date().getMonth() + 1, 2);
    this.fromSearchYear = new Date().getFullYear();
    this.fromSearchHours = this.zeroPad(new Date().getHours(), 2);
    this.fromSearchMinutes = this.zeroPad(new Date().getMinutes(), 2);

    this.disableDayDecreaseBtn = disableButtons;
    this.disableMonthDecreaseBtn = disableButtons;
    this.disableYearDecreaseBtn = disableButtons;
    this.disableHourDecreaseBtn = disableButtons;
    this.disableMinDecreaseBtn = disableButtons;
  }

  updatePickerDatetimeInputs(selectedDate, isTimePicker, disableButtons) {
    if (isTimePicker) {
      const dateTimeFormat = 'DD-MM-YYYY HH:mm';
      const d = moment(selectedDate, dateTimeFormat);
      this.fromSearchDay = d.date();
      this.fromSearchMonth = d.month() + 1;
      this.fromSearchYear = d.year();
      this.fromSearchHours = d.hours();
      this.fromSearchMinutes = d.minutes();
    } else {
      const dateFormat = 'DD-MM-YYYY';
      const d = moment(selectedDate, dateFormat);
      this.fromSearchDay = d.date();
      this.fromSearchMonth = d.month() + 1;
      this.fromSearchYear = d.year();
    }

    this.addZeroPad();
    this.emitDateToPickerInput();

    this.disableDayDecreaseBtn = disableButtons;
    this.disableMonthDecreaseBtn = disableButtons;
    this.disableYearDecreaseBtn = disableButtons;
    this.disableHourDecreaseBtn = disableButtons;
    this.disableMinDecreaseBtn = disableButtons;
  }

  updateTimeInputs(selectedTime) {
    const timeFormat = 'HH:mm';
    const t = moment(selectedTime, timeFormat);
    this.fromSearchHours = t.hours();
    this.fromSearchMinutes = t.minutes();
    this.addZeroPad();
    this.emitDateToPickerInput();
  }

  focusOutFunction() {
    this.addZeroPad();
    this.emitDateToPickerInput();
  }

  //#region Day increase decrease button events
  increaseDay() {
    this.showDateMessage(this.isDayInputValidBtn(parseInt(this.fromSearchDay) + 1));
  }

  decreaseDay() {
    this.showDateMessage(this.isDayInputValidBtn(parseInt(this.fromSearchDay) - 1));
  }

  isDayInputValidBtn(valueToValidate): boolean {
    valueToValidate = parseInt(valueToValidate);
    if (valueToValidate < 1) {
      this.fromSearchDay = 1;
      this.addZeroPad();
      this.emitDateToPickerInput();
      return true;
    } else if (valueToValidate > 31) {
      this.fromSearchDay = 31;
      this.emitDateToPickerInput();
      return true;
    } else {
      const dateFormat = 'DD-MM-YYYY';
      const selectedDate = this.fromSearchDay + '-' + this.fromSearchMonth + "-" + this.fromSearchYear;
      const d = moment(selectedDate, dateFormat);
      if (d.isValid()) {
        this.fromSearchDay = valueToValidate;
        this.addZeroPad();
        this.emitDateToPickerInput();
        return true;
      } else {
        this.fromSearchDay = '';
        return false;
      }
    }
  }
  //#endregion Day increase decrease button events

  //#region Month increase decrease button events
  increaseMonth() {
    this.showDateMessage(this.isMonthInputValidBtn(parseInt(this.fromSearchMonth) + 1));
  }

  decreaseMonth() {
    this.showDateMessage(this.isMonthInputValidBtn(parseInt(this.fromSearchMonth) - 1));
  }

  isMonthInputValidBtn(valueToValidate): boolean {
    valueToValidate = parseInt(valueToValidate);
    if (valueToValidate < 1) {
      this.fromSearchMonth = 1;
      this.addZeroPad();
      this.emitDateToPickerInput();
      return true;
    } else if (valueToValidate > 12) {
      this.fromSearchMonth = 12;
      this.emitDateToPickerInput();
      return true;
    } else {
      const dateFormat = 'DD-MM-YYYY';
      const selectedDate = this.fromSearchDay + '-' + this.fromSearchMonth + "-" + this.fromSearchYear;
      const d = moment(selectedDate, dateFormat);
      if (d.isValid()) {
        this.fromSearchMonth = valueToValidate;
        this.addZeroPad();
        this.emitDateToPickerInput();
        return true;
      } else {
        this.fromSearchMonth = '';
        return false;
      }
    }
  }
  //#endregion Month increase decrease button events

  //#region Year increase decrease button events
  increaseYear() {
    this.showDateMessage(this.isYearInputValidBtn(parseInt(this.fromSearchYear) + 1));
  }

  decreaseYear() {
    this.showDateMessage(this.isYearInputValidBtn(parseInt(this.fromSearchYear) - 1));
  }

  isYearInputValidBtn(valueToValidate): boolean {
    valueToValidate = parseInt(valueToValidate);
    if (valueToValidate < 1000) {
      this.fromSearchYear = 1000;
      this.emitDateToPickerInput();
      return true;
    } else if (valueToValidate > 9999) {
      this.fromSearchYear = 9999;
      this.emitDateToPickerInput();
      return true;
    } else {
      const dateFormat = 'DD-MM-YYYY';
      const selectedDate = this.fromSearchDay + '-' + this.fromSearchMonth + "-" + this.fromSearchYear;
      const d = moment(selectedDate, dateFormat);
      if (d.isValid()) {
        this.fromSearchYear = valueToValidate;
        this.emitDateToPickerInput();
        return true;
      } else {
        this.fromSearchYear = '';
        return false;
      }
    }
  }
  //#endregion Year increase decrease button events

  //#region Hour increase decrease button events
  increaseHour() {
    if (this.fromSearchHours >= 23) {
      this.fromSearchHours = 0;
    } else {
      this.fromSearchHours = parseInt(this.fromSearchHours) + 1;
    }
    this.showTimeMessage(this.isHourInputValidBtn(this.fromSearchHours));
  }

  decreaseHour() {
    if (this.fromSearchHours <= 0) {
      this.fromSearchHours = 23;
    } else {
      this.fromSearchHours = parseInt(this.fromSearchHours) - 1;
    }
    this.showTimeMessage(this.isHourInputValidBtn(this.fromSearchHours));
  }
  isHourInputValidBtn(valueToValidate): boolean {
    valueToValidate = parseInt(valueToValidate);
    if (valueToValidate < 0) {
        this.fromSearchHours = 0;
        this.addZeroPad();
        this.emitDateToPickerInput();
        return true;
    } else if (valueToValidate > 23) {
        this.fromSearchHours = 23;
        this.emitDateToPickerInput();
        return true;
    } else {
        const dateFormat = 'DD-MM-YYYY';
        const selectedDate = this.fromSearchDay + '-' + this.fromSearchMonth + "-" + this.fromSearchYear;
        const d = moment(selectedDate, dateFormat);
      if (d.isValid()) {
        this.fromSearchHours = valueToValidate;
        this.addZeroPad();
        this.emitDateToPickerInput();
        return true;
      } else {
        this.fromSearchHours = '';
        return false;
      }
    }
  }
  //#endregion Hour increase decrease button events

  //#region Minute increase decrease button events
  increaseMinute() {
    this.showTimeMessage(this.isMinuteInputValidBtn(parseInt(this.fromSearchMinutes) + 1));
  }
  decreaseMinute() {
    this.showTimeMessage(this.isMinuteInputValidBtn(parseInt(this.fromSearchMinutes) - 1));
  }

  isMinuteInputValidBtn(valueToValidate): boolean {
    valueToValidate = parseInt(valueToValidate);
    if (valueToValidate < 0) {
        this.fromSearchMinutes = 0;
        this.emitDateToPickerInput();
        return true;
    } else if (valueToValidate > 59) {
        this.fromSearchMinutes = 59;
        this.emitDateToPickerInput();
        return true;
    } else {
        const dateFormat = 'DD-MM-YYYY';
        const selectedDate = this.fromSearchDay + '-' + this.fromSearchMonth + "-" + this.fromSearchYear;
        const d = moment(selectedDate, dateFormat);
      if (d.isValid()) {
          this.fromSearchMinutes = valueToValidate;
          this.addZeroPad();
          this.emitDateToPickerInput();
          return true;
      } else {
          this.fromSearchMinutes = '';
          return false;
      }
    }
  }
  //#endregion Minute increase decrease button events

  checkDay(event) {
    this.fromSearchDay = parseInt(this.fromSearchDay);
    let isValid: boolean = false;
    if (event.keyCode === 38) {
      isValid = this.isDayInputValid(this.fromSearchDay + 1);
    } else if (event.keyCode === 40) {
      isValid = this.isDayInputValid(this.fromSearchDay - 1);
    }
    isValid = this.isDayInputValid(this.fromSearchDay);
    this.showDateMessage(isValid);
  }

  checkMonth(event) {
    this.fromSearchMonth = parseInt(this.fromSearchMonth);
    let isValid: boolean = false;
    if (event.keyCode === 38) {
      isValid = this.isMonthInputValid(this.fromSearchMonth + 1);
    } else if (event.keyCode === 40) {
      isValid = this.isMonthInputValid(this.fromSearchMonth - 1);
    }
    isValid = this.isMonthInputValid(this.fromSearchMonth);
    this.showDateMessage(isValid);
  }

  checkYear(event) {
    this.fromSearchYear = parseInt(this.fromSearchYear);
    let isValid: boolean = false;
    if (event.keyCode === 38) {
      isValid = this.isYearInputValid(this.fromSearchYear + 1);
    } else if (event.keyCode === 40) {
      isValid = this.isYearInputValid(this.fromSearchYear - 1);
    }
    isValid = this.isYearInputValid(this.fromSearchYear);
    this.showDateMessage(isValid);
  }

  checkHour(event) {
    this.fromSearchHours = parseInt(this.fromSearchHours);
    let isValid: boolean = false;
    if (event.keyCode === 38) {
      isValid = this.isHourInputValid(this.fromSearchHours + 1);
    } else if (event.keyCode === 40) {
      isValid = this.isHourInputValid(this.fromSearchHours - 1);
    }
    isValid = this.isHourInputValid(this.fromSearchHours);
    this.showTimeMessage(isValid);
  }

  checkMinute(event) {
    this.fromSearchMinutes = parseInt(this.fromSearchMinutes);
    let isValid: boolean = false;
    if (event.keyCode === 38) {
      isValid = this.isMinuteInputValid(this.fromSearchMinutes + 1);
    } else if (event.keyCode === 40) {
      isValid = this.isMinuteInputValid(this.fromSearchMinutes - 1);
    }
    isValid = this.isMinuteInputValid(this.fromSearchMinutes);
    this.showTimeMessage(isValid);
  }

  isDayInputValid(valueToValidate): boolean {
    valueToValidate = parseInt(valueToValidate);
    if (isNaN(valueToValidate)) {
      this.fromSearchDay = '';
      return false;
    } else if (valueToValidate === 0 && valueToValidate.toString().length == 1) {
      this.fromSearchDay = 0;
      return true;
    } else if (valueToValidate < 1) {
      this.fromSearchDay = 1;
      this.addZeroPad();
      this.emitDateToPickerInput();
      return true;
    } else if (valueToValidate > 31) {
      this.fromSearchDay = 31;
      this.emitDateToPickerInput();
      return true;
    } else {
      const dateFormat = 'DD-MM-YYYY';
      const selectedDate = this.fromSearchDay + '-' + this.fromSearchMonth + "-" + this.fromSearchYear;
      const d = moment(selectedDate, dateFormat);
      if (d.isValid()) {
        this.fromSearchDay = valueToValidate;
        this.emitDateToPickerInput();
        return true;
      } else {
        this.fromSearchDay = '';
        return false;
      }
    }
  }

  isMonthInputValid(valueToValidate): boolean {
    valueToValidate = parseInt(valueToValidate);
    if (isNaN(valueToValidate)) {
      this.fromSearchMonth = '';
      return false;
    } else if (valueToValidate === 0 && valueToValidate.toString().length == 1) {
      this.fromSearchMonth = 0;
      return true;
    } else if (valueToValidate < 1) {
      this.fromSearchMonth = 1;
      this.emitDateToPickerInput();
      return true;
    } else if (valueToValidate > 12) {
      this.fromSearchMonth = 12;
      this.emitDateToPickerInput();
      return true;
    } else {
      const dateFormat = 'DD-MM-YYYY';
      const selectedDate = this.fromSearchDay + '-' + this.fromSearchMonth + "-" + this.fromSearchYear;
      const d = moment(selectedDate, dateFormat);
      if (d.isValid()) {
        this.fromSearchMonth = valueToValidate;
        this.emitDateToPickerInput();
        return true;
      } else {
        this.fromSearchMonth = '';
        return false;
      }
    }
  }

  isYearInputValid(valueToValidate): boolean {
    valueToValidate = parseInt(valueToValidate);
    if (isNaN(valueToValidate)) {
      this.fromSearchYear = '';
      return false;
    } else if (valueToValidate > 9999) {
      this.fromSearchYear = 9999;
      this.emitDateToPickerInput();
      return true;
    } else {
      const dateFormat = 'DD-MM-YYYY';
      const selectedDate = this.fromSearchDay + '-' + this.fromSearchMonth + "-" + this.fromSearchYear;
      const d = moment(selectedDate, dateFormat);
      if (d.isValid()) {
        this.fromSearchYear = valueToValidate;
        this.emitDateToPickerInput();
        return true;
      } else {
        this.fromSearchYear = '';
        return false;
      }
    }
  }

  isHourInputValid(valueToValidate): boolean {
    valueToValidate = parseInt(valueToValidate);
    if (isNaN(valueToValidate)) {
      this.fromSearchHours = '';
      return false;
    } else if (valueToValidate === 0 && valueToValidate.toString().length == 1) {
      this.fromSearchHours = 0;
      this.emitDateToPickerInput();
      return true;
    } else if (valueToValidate < 0) {
      this.fromSearchHours = 0;
      this.emitDateToPickerInput();
      return true;
    } else if (valueToValidate > 23) {
      this.fromSearchHours = 23;
      this.emitDateToPickerInput();
      return true;
    } else {
      const dateFormat = 'DD-MM-YYYY';
      const selectedDate = this.fromSearchDay + '-' + this.fromSearchMonth + "-" + this.fromSearchYear;
      const d = moment(selectedDate, dateFormat);
      if (d.isValid()) {
        this.fromSearchHours = valueToValidate;
        this.emitDateToPickerInput();
        return true;
      } else {
        this.fromSearchHours = '';
        return false;
      }
    }
  }

  isMinuteInputValid(valueToValidate): boolean {
    valueToValidate = parseInt(valueToValidate);
    if (isNaN(valueToValidate)) {
      this.fromSearchMinutes = '';
      return false;
    } else if (valueToValidate === 0 && valueToValidate.toString().length == 1) {
      this.fromSearchMinutes = 0;
      this.emitDateToPickerInput();
      return true;
    } else if (valueToValidate < 0) {
      this.fromSearchMinutes = 0;
      this.emitDateToPickerInput();
      return true;
    } else if (valueToValidate > 59) {
      this.fromSearchMinutes = 59;
      this.emitDateToPickerInput();
      return true;
    } else {
      const dateFormat = 'DD-MM-YYYY';
      const selectedDate = this.fromSearchDay + '-' + this.fromSearchMonth + "-" + this.fromSearchYear;
      const d = moment(selectedDate, dateFormat);
      if (d.isValid()) {
        this.fromSearchMinutes = valueToValidate;
        this.emitDateToPickerInput();
        return true;
      } else {
        this.fromSearchMinutes = '';
        return false;
      }
    }
  }

  emitDateToPickerInput() {
    this.customDateTimeEmitter.emit({
      Dayvalue: this.fromSearchDay,
      Monthvalue: this.fromSearchMonth,
      Yearvalue: this.fromSearchYear,
      Hourvalue: this.fromSearchHours,
      Minutevalue: this.fromSearchMinutes
    });
  }

  addZeroPad() {
    this.fromSearchDay = this.zeroPad(this.fromSearchDay, 2);
    this.fromSearchMonth = this.zeroPad(this.fromSearchMonth, 2);
    this.fromSearchYear = this.zeroPad(this.fromSearchYear, 2);
    this.fromSearchHours = this.zeroPad(this.fromSearchHours, 2);
    this.fromSearchMinutes = this.zeroPad(this.fromSearchMinutes, 2);
  }

  zeroPad(num, numZeros) {
    const n = Math.abs(num);
    const zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
    let zeroString = Math.pow(10, zeros).toString().substr(1);
    if (num < 0) {
      zeroString = '-' + zeroString;
    }
    return zeroString + n;
  }

  showDateMessage(isvalidDate) {
    if (isvalidDate) {
      $('.validation-date-error').hide();
    } else {
      $('.validation-date-error').show();
    }
  }

  showTimeMessage(isvalidDate) {
    if (isvalidDate) {
      $('.validation-time-error').hide();
    } else {
      $('.validation-time-error').show();
    }
  }
}
