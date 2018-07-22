import CurrencyExchange from './CurrencyExchange';

let exchanger;

beforeEach(() => {
  exchanger = new CurrencyExchange([
    {
      code: 'USD',
      buy: 4,
      sell: 3
    },
    {
      code: 'EUR',
      buy: 4,
      sell: 5
    }
  ]);
});

describe('getCurrencyList', () => {
  test('is a function', () => {
    expect(typeof exchanger.getCurrencyList).toEqual('function');
  });

  test('returns currencies list', () => {
    expect(exchanger.getCurrencyList()).toEqual(['USD', 'EUR']);
  });
});

describe('getCurrentRate', () => {
  test('is a function', () => {
    expect(typeof exchanger.getCurrentRate).toEqual('function');
  });

  test('return current exchange rate for currency', () => {
    expect(exchanger.getCurrentRate('USD')).toEqual({ buy: 4, sell: 3 });
  });
});

describe('Currency Exchange constructor', () => {
  test.each([
    [{}],
    [[{ code: undefined, buy: undefined, sell: undefined }]],
    [[{ code: 'EUR', buy: -1, sell: 10 }]],
    [[{ code: 'USD', buy: 1, sell: 1 }, { code: 'USD', buy: 1, sell: 1 }]]
  ])('should throw new error if incorrect format', args => {
    expect(() => {
      new CurrencyExchange(args);
    }).toThrow();
  });
});

describe('exchnage', () => {
  test('should be a function', () => {
    expect(typeof exchanger.exchange).toEqual('function');
  });

  test('should return exchanged value', () => {
    expect(exchanger.exchange('EUR', 100, 'USD')).toBeCloseTo(132.67, 2);
  });

  test.each([
    [undefined, undefined, null],
    ['PLN', 100, 'EUR'],
    ['EUR', 100, 'EUR'],
    ['EUR', -10, 'USD']
  ])('should throw error on invalid argumnets (%p %p -> %p)', (...args) => {
    expect(() => exchanger.exchange(...args)).toThrow();
  });
});

describe('buy', () => {
  test('should be a function', () => {
    expect(typeof exchanger.buy).toEqual('function');
  });

  test.each([[undefined, undefined], ['PLN', 10], ['EUR', -11]])(
    'should throw error on invalid argumnets (%p %p)',
    (...args) => {
      expect(() => exchanger.buy(...args)).toThrow();
    }
  );

  test('should return bought currency value', () => {
    expect(exchanger.buy('EUR', 20)).toBeCloseTo(81, 2);
  });

  test('should return bought currency value for given params', () => {
    const anotherExchanger = new CurrencyExchange(
      [{ code: 'USD', buy: 3, sell: 4 }],
      { buyFee: 10, sellFee: 5 }
    );

    expect(anotherExchanger.buy('USD', 30)).toBeCloseTo(100, 2);
  });
});

describe('sell', () => {
  test('should be a function', () => {
    expect(typeof exchanger.sell).toEqual('function');
  });

  test.each([[undefined, undefined], ['PLN', 10], ['EUR', -11]])(
    'should throw error on invalid argumnets (%p %p)',
    (...args) => {
      expect(() => exchanger.sell(...args)).toThrow();
    }
  );

  test('should return sold currency value', () => {
    expect(exchanger.sell('EUR', 20)).toBeCloseTo(99, 2);
  });
});
