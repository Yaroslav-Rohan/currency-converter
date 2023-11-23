import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  amountFrom: number = 100;
  amountTo: number = 0;
  selectedFromCurrency: string = 'USD';
  selectedToCurrency: string = 'UAH';
  exchangeRateFrom: number = 0;
  exchangeRateTo: number = 0;

  currencies: string[] = ['USD', 'EUR', 'UAH'];
  apiEndpoint = 'https://api.exchangerate-api.com/v4/latest';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.convertCurrency('from');
    this.convertCurrency('to');
  }

  convertCurrency(direction: 'from' | 'to') {
    const fromCurrency = direction === 'from' ? this.selectedFromCurrency : this.selectedToCurrency;
    const toCurrency = direction === 'from' ? this.selectedToCurrency : this.selectedFromCurrency;
    const amount = direction === 'from' ? this.amountFrom : this.amountTo;

    if (amount && fromCurrency && toCurrency) {
      this.http.get(`${this.apiEndpoint}/${fromCurrency}`).subscribe((data: any) => {
        const exchangeRate = data.rates[toCurrency];
        if (direction === 'from') {
          this.exchangeRateFrom = exchangeRate;
          this.amountTo = +(this.amountFrom * exchangeRate).toFixed(2);
        } else {
          this.exchangeRateTo = exchangeRate;
          this.amountFrom = +(this.amountTo / exchangeRate).toFixed(2)
        }
      });
    }
  }

  switchCurrencies() {
    const tempFromCurrency = this.selectedFromCurrency;
    const tempToCurrency = this.selectedToCurrency;

    this.selectedFromCurrency = tempToCurrency;
    this.selectedToCurrency = tempFromCurrency;

    this.convertCurrency('from');
    this.amountFrom = this.amountTo;
  }
}
