// Third-Party
import { NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

// Application imports
import { StorageUtil } from './storage.util';

// Class for common methods
export class CommonUtil {
    public static monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    public static getDate(): Date {
        return new Date();
    }
    public static copyDate(date: Date): Date {
        return new Date(date);
    }
    public static setDate(curr: Date, day: number) {
        return CommonUtil.getUpdatedDate(curr.getFullYear(),
            curr.getMonth() + 1, day, curr.getHours(), curr.getMinutes(), curr.getSeconds());
    }

    public static getUpdatedDate(
        year: number,
        month: number,
        day: number,
        hours?: number,
        minutes?: number,
        seconds?: number): Date {
        // const date = CommonUtil.getDate();
        // if (year !== undefined) { date.setFullYear(year); }
        // if (month !== undefined) { date.setMonth(month - 1); }
        // if (day !== undefined) { date.setDate(day); }
        const date = new Date(year, month - 1, day);
        if (hours !== undefined) { date.setHours(hours); }
        if (minutes !== undefined) { date.setMinutes(minutes); }
        if (seconds !== undefined) { date.setSeconds(seconds); }
        return date;
    }


    public static formatDate(d: Date): string {
        return CommonUtil.formatLocalDate(d);
    }

    /**
     * Returns date string in MM/DD/YYYY format
     * @param date
     */
    public static  getDateStringFromNgbDateStruct_MMDDYYYY(date: NgbDateStruct): string {
        let d:string;
        if (date) {
            d = date.month+'/'+date.day+'/'+date.year;
            return d;
        } else {
            return null;
        }
    }

      /**
     * Returns date string in YY/MM/DD format
     * @param date
     */
    public static  getDateStringFromNgbDateStruct_YYMMDD(date: NgbDateStruct): string {
        let d:string;
        if (date) {
            d = date.month+'/'+date.day+'/'+ date.year;
            return d;
        } else {
            return null;
        }
    }


    public static getDateFromString(d: string): Date {
        if (d && d !== '') {
            // let dd = new Date();
            const dateTime = d.split(' ');
            const dayPart = dateTime[0].split('-');
            // dd.setFullYear(parseInt(dayPart[0]));
            // dd.setMonth(parseInt(dayPart[1]) - 1);
            // dd.setDate(parseInt(dayPart[2]));
            let dd = new Date(parseInt(dayPart[0], 10), parseInt(dayPart[1], 10) - 1, parseInt(dayPart[2], 10));
            if (dateTime.length > 1) {
                dd = this.setDateTime(dd, dateTime[1]);
            }
            return dd;
        } else {
            return null;
        }
    }
    public static setDateTime(date: Date, time: String): Date {
        const timePart = time.split(':');
        date.setHours(parseInt(timePart[0]));
        date.setMinutes(parseInt(timePart[1]));
        date.setSeconds(parseInt(timePart[2]));
        return date;
    }

    public static formatLocalDateWithoutTime(date: Date): string {
        let month = '' + (date.getMonth() + 1),
            day = '' + date.getDate();

        const year = date.getFullYear(),
            hour = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        const formattedDate = [year, month, day].join('-');
        return formattedDate;
    }
    public static formatLocalDate(date: Date): string {
        let month = '' + (date.getMonth() + 1),
            day = '' + date.getDate();

        const year = date.getFullYear(),
            hour = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        const formattedDate = [year, month, day].join('-') + ' ' + [hour, minutes, seconds].join(':');
        return formattedDate;
    }

    /**
     * Returns if the difference between two dates is greater than the given limit(ms).
     *
     * @static
     * @param {Date} firstDate
     * @param {Date} secondDate
     * @param {number} limitInMs
     * @memberof CommonUtil
     */
    public static isDifferenceGreaterThanLimit(firstDate: Date, secondDate: Date, limitInMs: number): boolean {
        if (secondDate.getTime() < firstDate.getTime()) {
            return null;
        }
        return (secondDate.getTime() - firstDate.getTime()) > limitInMs;
    }

    public static isFirstTimeBeforeOrEqualsSecond(firstTime: NgbTimeStruct, secondTime: NgbTimeStruct): boolean {
        return '' + this.formatToTwoPlaces(firstTime.hour) + this.formatToTwoPlaces(firstTime.minute)
            <= '' + this.formatToTwoPlaces(secondTime.hour) + this.formatToTwoPlaces(secondTime.minute);
    }

    public static extractDatePart(date: Date): string {
        let month = '' + (date.getMonth() + 1),
            day = '' + date.getDate();
        const year = date.getFullYear();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        const shortDate = [year, month, day].join('-');
        return shortDate;
    }

    public static getUserId(): number {
        const user = StorageUtil.getUser();
        return user ? user['userId'] : null;
    }

    public static getUserEmpId(): number {
        const user = StorageUtil.getUser();
        return user ? user['employeeId'] : null;
    }

    public static getUserDisplayName(): number {
        const user = StorageUtil.getUser();
        return user ? user['displayName'] : null;
    }

    public static isUserHourlyBillable(): boolean {
        const user = StorageUtil.getUser();
        return user ? user['hourlyBillable'] : null;
    }

    public static getCurrentUserName(): string {
        const user = StorageUtil.getUser();
        return user ? user['userName'] : null;
    }

    public static getCurrentDisplayName(): string {
        const user = StorageUtil.getUser();
        return user ? user['displayName'] : null;
    }

    public static getPriorDaysEditable(): number {
        const user = StorageUtil.getUser();
        return user ? user['priorDaysEditable'] : null;
    }
    public static getSuperVisor(): number {
        const user = StorageUtil.getUser();
        return user ? user['isSupervisor'] : null;
    }

    public static getWeekMonday(date: Date) {
        let first = date.getDate() - date.getDay() + 1;
        if (date.getDay() === 0) {
            first -= 7;
        }
        return new Date((new Date(date)).setDate(first));
    }

    public static formatToTwoPlaces = (value) => ('0' + value).slice(-2);

    public static isSameDay(date1: Date, date2: Date): boolean {
        if (date1.getDate() !== date2.getDate()) {
            return false;
        }
        if (date1.getMonth() !== date2.getMonth()) {
            return false;
        }
        if (date1.getFullYear() !== date2.getFullYear()) {
            return false;
        }
        return true;
    }

    public static isToday(date: Date): boolean {
        return this.isSameDay(date, new Date);
    }

    public static minutesToHours(time: number) {
        let hours = parseInt((time / 60).toString());
        let minutes = parseInt((time % 60).toString());

        return parseFloat(hours + '.' + (minutes.toString().length > 1 ? minutes : '0' + minutes));
    }
    public static isSameDayAndTime(date1: Date, date2: Date): boolean {
        if (date1.getDate() !== date2.getDate()) {
            return false;
        }
        if (date1.getMonth() !== date2.getMonth()) {
            return false;
        }
        if (date1.getFullYear() !== date2.getFullYear()) {
            return false;
        }
        if (date1.getHours() !== date2.getHours()) {
            return false;
        }
        if (date1.getMinutes() !== date2.getMinutes()) {
            return false;
        }
        if (date1.getSeconds() !== date2.getSeconds()) {
            return false;
        }
        return true;
    }

    public static sortFilteredRowsByField(...fields: string[]) {
        return function (A, B) {
            var a, b, field, result;
            for (var i = 0; i < fields.length; i++) {
                result = 0;
                field = fields[i];
                a = A[field];
                b = B[field];
                if (typeof a === 'string' && typeof b === 'string' && a && b) {
                    a = a.trim().toUpperCase();
                    b = b.trim().toUpperCase();
                }

                //case for handling % used in Open PO
                if (field == 'POPercent') {
                    a = A['amountUsed'] / A['poAmount'];
                    b = B['amountUsed'] / B['poAmount'];
                }
                if (!a)
                    a = '';
                if (!b)
                    b = '';

                if (a < b) result = -1;
                if (a > b) result = 1;
                if (result !== 0) break;
            }
            return result;
        }
    }
    public static sortFilteredRowsByFieldDesc(...fields: string[]) {
        return function (A, B) {
            var a, b, field, result;
            for (var i = 0; i < fields.length; i++) {
                result = 0;
                field = fields[i];
                a = A[field];
                b = B[field];
                if (typeof a === 'string' && typeof b === 'string' && a && b) {
                    a = a.trim().toUpperCase();
                    b = b.trim().toUpperCase();
                }

                //case for handling % used in Open PO
                if (field == 'POPercent') {
                    a = A['amountUsed'] / A['poAmount'];
                    b = B['amountUsed'] / B['poAmount'];
                }
                if (!a)
                    a = '';
                if (!b)
                    b = '';

                if (a < b) result = 1;
                if (a > b) result = -1;
                if (result !== 0) break;
            }
            return result;
        }
    }
}

export enum DurationRange {
    current = 'current',
    previous = 'previous',
    next = 'next'
}

export class DurationFormat {
    public firstDayOfWeek: number;
    public lastDayOfWeek: number;
    public firstDayOfMonth: Date;
    public lastDayOfMonth: Date;
    public firstDay: Date;
    public lastDay: Date;
    public month: any;
    public year: any;

    constructor() {
        const date = new Date();
        this.month = date.getMonth();
        this.year = date.getFullYear();
    }

    public getWeek(state: string = 'current', date?: Date): void {
        let currDate, first, last;

        switch (state) {
            case DurationRange.current:
                currDate = new Date(); // get current date
                first = currDate.getDate() - currDate.getDay() + 1; // First day is the day of the month - the day of the week
                last = first + 6;
                this.firstDay = new Date(currDate.setDate(first));
                this.firstDayOfWeek = this.firstDay.getDate();

                this.lastDay = new Date(currDate.setDate(last));
                this.lastDayOfWeek = this.lastDay.getDate();
                this.month = this.lastDay.getMonth();
                this.year = this.lastDay.getFullYear();
                break;

            case DurationRange.next:
                this.setNextWeek();
                // currDate = new Date(this.year, this.month, this.lastDayOfWeek); // get current date
                // first = currDate.getDate() + 1;
                break;

            case DurationRange.previous:
                this.setPreviousWeek();
                // currDate = new Date(this.year, this.month, this.firstDayOfWeek); // get current date
                // first = currDate.getDate() - 7;
                break;

            case 'custom':
                currDate = date;
                first = currDate.getDate() - currDate.getDay() + 1;
                break;
        }

        // if (currDate.getDay() === 0) {
        //     first -= 7;
        // }

        // last = first + 6;
        // if (state === DurationRange.previous)
        //     this.setPreviousWeek();
        // else
        //     this.setNextWeek();
    }

    private setPreviousWeek() {
        const currDate = new Date(this.year, this.firstDay.getMonth(), this.firstDayOfWeek); // get current date
        const first = currDate.getDate() - 7;
        const last = first + 6;
        const lastDate = currDate;
        let firstDate = currDate;
        if (first < 0 && last === 0) {
            this.lastDay = new Date(lastDate.setDate(last));
            this.lastDayOfWeek = this.lastDay.getDate();

            firstDate = lastDate;
            this.firstDay = new Date(firstDate.setDate(lastDate.getDate() + first));
            this.firstDayOfWeek = this.firstDay.getDate();
            this.month = this.firstDay.getMonth();
            this.year = this.firstDay.getFullYear();
        }
        else {
            this.firstDay = new Date(currDate.setDate(first));
            this.lastDay = new Date(currDate.setDate(last));
            this.firstDayOfWeek = this.firstDay.getDate();
            this.lastDayOfWeek = this.lastDay.getDate();
            this.month = this.firstDay.getMonth();
            this.year = this.firstDay.getFullYear();
        }
    }

    private setNextWeek() {
        const currDate = new Date(this.year, this.lastDay.getMonth(), this.lastDayOfWeek); // get current date
        const first = currDate.getDate() + 1;
        const last = first + 6;
        const lastDate = new Date(this.year, this.lastDay.getMonth(), this.lastDayOfWeek);
        const firstDate = new Date(this.year, this.lastDay.getMonth(), this.firstDayOfWeek);

        this.firstDay = new Date(firstDate.setDate(first));
        this.firstDayOfWeek = this.firstDay.getDate();

        this.lastDay = new Date(lastDate.setDate(last));
        this.lastDayOfWeek = this.lastDay.getDate();
        this.month = this.lastDay.getMonth();
        this.year = this.lastDay.getFullYear();
    }

    public getMonth(state: string = 'current', inpDate?: Date) {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth();

        switch (state) {
            case 'current':
                this.firstDayOfMonth = new Date(y, m, 1);
                this.lastDayOfMonth = new Date(y, m + 1, 0);
                this.month = m;
                break;

            case 'next':
                this.firstDayOfMonth = new Date(this.year, this.month + 1, 1);
                this.lastDayOfMonth = new Date(this.year, this.month + 2, 0);
                this.month = m + 1;
                break;

            case 'previous':
                this.firstDayOfMonth = new Date(this.year, this.month - 1, 1);
                this.lastDayOfMonth = new Date(this.year, this.month, 0);
                this.month = m - 1;
                break;

            case 'custom':
                this.firstDayOfMonth = new Date(inpDate.getFullYear(), inpDate.getMonth(), 1);
                this.lastDayOfMonth = new Date(inpDate.getFullYear(), inpDate.getMonth() + 1, 1);
                this.lastDayOfMonth.setDate(0);
                break;
        }

        this.month = this.lastDayOfMonth.getMonth();
        this.year = this.lastDayOfMonth.getFullYear();
    }


    
}
