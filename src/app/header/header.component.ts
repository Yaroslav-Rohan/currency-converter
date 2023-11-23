import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  uahEquivalentForUsd: number = 0;
  uahEquivalentForEur: number = 0;

  apiEndpoint = 'https://api.exchangerate-api.com/v4/latest';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.http.get(`${this.apiEndpoint}/UAH`).subscribe((data: any) => {
      this.uahEquivalentForUsd = +(1 / data.rates.USD).toFixed(2);
      this.uahEquivalentForEur = +(1 / data.rates.EUR).toFixed(2);
    });
  }
}
