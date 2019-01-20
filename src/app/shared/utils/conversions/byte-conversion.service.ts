import { Injectable } from '@angular/core';

const BYTES_PER_GB = 1000000000;

@Injectable()
export class ByteConversionService {
  constructor() {}

  toGb(bytesArray?: Array<number>, bytes?: number): Array<number> | string {
    const convertBytesToGB = bytes => bytes / BYTES_PER_GB;

    return bytesArray != undefined ? bytesArray.map(convertBytesToGB) : (bytes/BYTES_PER_GB).toFixed(2);
  }
}