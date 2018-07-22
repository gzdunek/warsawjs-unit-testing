import { isPositiveNumber } from './TestUtils';

export default class CurrencyExchange {
  constructor(currencies, options) {
    this.checkArrayFormat(currencies);
    this.currencies = currencies;

    const { buyFee, sellFee } = Object.assign(
      { buyFee: 1, sellFee: 1 },
      options
    );
    if (buyFee < 1 || sellFee < 1) {
      throw new Error('Invalid service fees');
    }
    this.buyFee = buyFee;
    this.sellFee = sellFee;
  }

  checkArrayFormat(currencies) {
    if (!Array.isArray(currencies)) {
      throw new Error('Currencies list has to be array');
    }
    currencies.forEach(currency => {
      if (
        currency.code === undefined ||
        currency.buy === undefined ||
        currency.sell === undefined
      ) {
        throw new Error('Inccorect currency format');
      }
      if (!isPositiveNumber(currency.buy)) {
        throw new Error('Currency buy value cannot be negative');
      }
      if (!isPositiveNumber(currency.sell)) {
        throw new Error('Currency sell value cannot be negative');
      }
      if (currencies.filter(curr => curr.code === currency.code).length > 1) {
        throw new Error(`Currency code ${currency.code} is not unique`);
      }
    });
  }

  getCurrencyList() {
    return this.currencies.map(currency => currency.code);
  }

  getCurrentRate(currencyCode) {
    const found = this.currencies.find(curr => curr.code === currencyCode);
    return { buy: found.buy, sell: found.sell };
  }

  exchange(fromCurrency, fromAmount, toCurrency) {
    const fromCurrencyObject = this.currencies.find(
      curr => curr.code === fromCurrency
    );
    const toCurrencyObject = this.currencies.find(
      curr => curr.code === toCurrency
    );
    if (
      fromCurrency === toCurrency ||
      !fromCurrencyObject ||
      !toCurrencyObject ||
      !isPositiveNumber(fromAmount)
    ) {
      throw new Error('Invalid arguments');
    }

    const plnAmount = fromCurrencyObject.buy * fromAmount - this.sellFee;
    return (plnAmount - this.buyFee) / toCurrencyObject.sell;
  }

  buy(currency, amount) {
    const currencyObject = this.currencies.find(curr => curr.code === currency);
    if (!currencyObject || !isPositiveNumber(amount)) {
      throw new Error('Invalid argumnets');
    }

    return currencyObject.buy * amount + this.buyFee;
  }

  sell(currency, amount) {
    const currencyObject = this.currencies.find(curr => curr.code === currency);
    if (!currencyObject || !isPositiveNumber(amount)) {
      throw new Error('Invalid argumnets');
    }
    return currencyObject.sell * amount - this.sellFee;
  }
}
