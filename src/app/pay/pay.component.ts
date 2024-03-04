import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(private _ActivatedRoute: ActivatedRoute, private _OrdersService: OrdersService) { }
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((p) => {
      this.cartId = p['cartId'];
    })
  }

  cartId!: string;

  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
    city: new FormControl(null, [Validators.required])
  })


  addressForm(shippingAddress: FormGroup): void {
    this._OrdersService.creditCardCheckOut(this.cartId, shippingAddress.value).subscribe({
      next: (res) => {
        window.location.href = res.session.url;
      }
    })

  }
}
