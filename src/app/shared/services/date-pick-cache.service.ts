import { Injectable } from '@angular/core';

const DEFAULT_TO = 1510844400000;
const DEFAULT_FROM = 1509548400000;

@Injectable()
export class DatePickCacheService {
  private cachedFrom: number = DEFAULT_FROM;
  private cachedTo: number = DEFAULT_TO;

  constructor() { }

  getFrom(): number {
    return this.cachedFrom;
  }

  getTo(): number {
    return this.cachedTo;
  }

  setFrom(from: number) {
    this.cachedFrom = from;
  }

  setTo(to: number){
    this.cachedTo = to;
  }
}