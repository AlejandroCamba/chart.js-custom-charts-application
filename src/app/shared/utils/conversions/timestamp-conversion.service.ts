import { Injectable } from '@angular/core';

const MONTH_NAME = [
	"January", "February", "March",
	"April", "May", "June", "July",
	"August", "September", "October",
	"November", "December"
];

const SHORT_MONTH_NAME = [
	"Jan", "Feb", "Mar",
	"Apr", "May", "Jun", "Jul",
	"Aug", "Sep", "Oct",
	"Nov", "Dec"
];

const WEEK_DAY = [
	"Monday", "Tuesday", "Wednesday",
	"Thursday", "Friday", "Saturday", "Sunday"
];

@Injectable()
export class TimestampConversionService {
	constructor() {}

  	toShortDate(timestamp: number): string {
		let date = new Date(timestamp);

		return date.getDate() + ". " + SHORT_MONTH_NAME[date.getMonth()];  		
  	}

  	toFulltDate(timestamp: number): string {
		let date = new Date(timestamp);

		return date.getDate() + " " + MONTH_NAME[date.getMonth()] + " " +  date.getFullYear();  		
  	}

  	toFullDateAndTime(timestamp: number): string {
  		let date = new Date(timestamp);
		let amOrPm = (date.getHours() < 12) ? "AM" : "PM";
		let minutes =  date.getMinutes().toString() == "0" ? date.getMinutes() + "0" : date.getMinutes();
  		
  		return  WEEK_DAY[date.getDay()] + ", " + 
  			MONTH_NAME[date.getMonth()] + " " + 
  			date.getDate() + ", " + 
  			date.getFullYear() + " " + 
  			date.getHours() + ":" + 
  			minutes + " " +amOrPm
  	}
}