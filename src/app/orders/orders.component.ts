import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Order } from '../interfaces/order'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  constructor(private _OrdersService: OrdersService) { }

  ngOnInit(): void {
    this._OrdersService.getUserOrdersReq().subscribe({
      next: (res) => {
        this.orders = res
      }
    })
  }

  orders!: Order[];
}
