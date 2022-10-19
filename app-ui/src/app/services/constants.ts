import { Injectable } from '@angular/core'; 
@Injectable() 
export class Constants {
    public static API_ENDPOINT: string = 'http://localhost:3000';
    public static WS_ENDPOINT: string = 'ws://localhost:8080/';
}
