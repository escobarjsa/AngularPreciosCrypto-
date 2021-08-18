import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

/**
 * @deprecated esto es una interface coin
 *
 * @Param {String} id de la moneda.
 * @Param {String} name de la moneda.
 * @Param {String} symbol es el simbolo de la moneda
 * @Param {String} image valor de la imagen es una URL para
 * @Param {number} current_prince precio de la moneda.
 * @Param {number} price_change_percentage_24h porcentaje de precio en las ultimas 24 horas.
 * @Param {number} total_volume Total monedas en circulación del mercado.
 */
interface Coin {
  id: string; // id de la moneda
  name: string; // nombre de la moneda
  symbol: string; //simbolo de la moneda
  image: string; //Es string porque es una url para
  current_price: number;
  price_change_percentage_24h: number; //porcentaje de precio en las ultimas 24 horas
  total_volume: number; //Total monedas en circulación del mercado
}

/**
 * @ignore
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  coins: Coin[] = []
  filtered_coins: Coin[] = []
  titles: string[] = [
    '#',
    'Coin',
    'Prince',
    'Price Change',
    '24h Volume',
  ]
  searchText = '';

  constructor(private http: HttpClient) {

  }
  /**
   * Funcion SearchCoin
   */

  searchCoin() {
    this.filtered_coins = this.coins.filter((coins) =>
      coins.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      coins.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  ngOnInit() {
    this.http.get<Coin[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').
      subscribe(
        (res) => {
          console.log(res);
          this.coins = res;
          this.filtered_coins = res;
        },
        (err) => console.log(err)
      );
  }
}
