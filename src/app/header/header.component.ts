import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  exchangeRates?: { [currency: string]: number };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getExchangeRates();
  }

  getExchangeRates() {
    const apiEndpoint = 'https://api.exchangerate-api.com/v4/latest/UAH';

    this.http.get(apiEndpoint).subscribe((data: any) => {
      this.exchangeRates = data.rates;
    });
  }
}
