import { Injectable } from '@angular/core';

@Injectable()
export class TimestampConversionService {
	constructor() {}

  	toFormattedDate(timestamp: number): string {
 		let monthName = [
			"Jan", "Feb", "Mar",
			"Apr", "May", "Jun", "Jul",
			"Aug", "Sep", "Oct",
			"Nov", "Dec"
		];

		let date = new Date(timestamp)

		return date.getDate() + ". " + monthName[date.getMonth()];  		
  	}
}