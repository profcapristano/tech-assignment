import { Injectable } from '@angular/core'; 

export class Product {
    id: number | undefined
    name: string
    price: number
  
    constructor(name: string, price: number){
        this.name = name;
        this.price = price;
    }
}

export type ListProduct = Array<Product>;