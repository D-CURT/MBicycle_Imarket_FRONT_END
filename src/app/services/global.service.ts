import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  role = 'test';
  host = 'http://localhost:8080';
    constructor() { }
}
