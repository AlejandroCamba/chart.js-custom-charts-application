import { Injectable } from '@angular/core';

@Injectable()
export class TimestampConversionService {
	constructor() {}

  	toShortDate(timestamp: number): string {
 		let monthName = [
			"Jan", "Feb", "Mar",
			"Apr", "May", "Jun", "Jul",
			"Aug", "Sep", "Oct",
			"Nov", "Dec"
		];

		let date = new Date(timestamp)

		return date.getDate() + ". " + monthName[date.getMonth()];  		
  	}

  	toFulltDate(timestamp: number): string {
 		let monthName = [
			"January", "February", "March",
			"April", "May", "June", "July",
			"August", "September", "October",
			"November", "December"
		];

		let date = new Date(timestamp)

		return date.getDate() + " " + monthName[date.getMonth()] + " " +  date.getFullYear();  		
  	}
}