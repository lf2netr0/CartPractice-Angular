import { Component, OnInit } from '@angular/core';
import { Product } from './Product'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  constructor() { }
  ngOnInit() {}
  model = new Product('', 0, 0, true)
  products = [new Product('Test1', 15234, 2, true), new Product('Test2', 1224, 2, true), new Product('Test3', 55234, 1, true)]
  historyProd = []

  onSubmit() {
    // this.historyProd.push({ i: this.products.length, type: "new", data: "" })
    this.historyProd.push(JSON.stringify(this.products))
    this.products.push(new Product(this.model.name, this.model.price, this.model.amount, true))
  }

  rmItem(i: number) {
    this.historyProd.push(JSON.stringify(this.products))
    this.products.splice(i, 1)
  }

  edAllow(i: number) {
    this.products[i].ed = !this.products[i].ed;
  }

  edItem(i: number, amount: number) {
    this.historyProd.push(JSON.stringify(this.products))
    if (this.products[i].amount != amount) { this.products[i].amount = +amount; }
    this.edAllow(i)
  }

  resetCart() {
    this.historyProd.push(JSON.stringify(this.products))
    this.products = []
  }

  recover() {
    if (this.historyProd.length < 1) return
    this.products = JSON.parse(this.historyProd.pop())
  }
  
  sumOfProd(){
    let tmp = 0
    for(let p of this.products){
      tmp += p.price*p.amount
    }
    return tmp
  }
}
