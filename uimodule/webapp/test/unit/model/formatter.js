sap.ui.define(['eligolam/boldbase/model/formatter', 'sap/ui/model/resource/ResourceModel'], function (formatter, ResourceModel) {
  'use strict'

  // QTY FORMAT
  QUnit.module('BxPro Qty format')
  function floatQtyFormatTestCase(oOptions) {
    // Act
    var sState = formatter.floatQtyFormat(oOptions.input, oOptions.bxFormat)

    // Assert
    oOptions.assert.strictEqual(sState, oOptions.expected, 'Quantità nel formato corretto')
  }

  QUnit.test("Format l'intero aggiungendo 2 decimali", function (assert) {
    floatQtyFormatTestCase.call(this, {
      assert: assert,
      input: 42,
      bxFormat: false,
      expected: '42.00'
    })
  })

  QUnit.test('Format double portandolo a 2 decimali', function (assert) {
    floatQtyFormatTestCase.call(this, {
      assert: assert,
      input: 42.456,
      bxFormat: false,
      expected: '42.46'
    })
  })

  QUnit.test('Format double > 1000 portandolo a 2 decimali senza group', function (assert) {
    floatQtyFormatTestCase.call(this, {
      assert: assert,
      input: 4200.456,
      bxFormat: false,
      expected: '4200.46'
    })
  })

  QUnit.test('Format blank portandolo a 0 con 2 decimali', function (assert) {
    floatQtyFormatTestCase.call(this, {
      assert: assert,
      input: '',
      bxFormat: false,
      expected: '0.00'
    })
  })

  QUnit.test('Format null restituisce blank', function (assert) {
    floatQtyFormatTestCase.call(this, {
      assert: assert,
      input: null,
      bxFormat: false,
      expected: '0.00'
    })
  })

  QUnit.test('Format BxPro valore/1000 portandolo a 2 decimali', function (assert) {
    floatQtyFormatTestCase.call(this, {
      assert: assert,
      input: 4200,
      bxFormat: true,
      expected: '4,20'
    })
  })

  QUnit.test('Format BxPro valore/1000 (null) portandolo a 0 con 2 decimali', function (assert) {
    floatQtyFormatTestCase.call(this, {
      assert: assert,
      input: null,
      bxFormat: true,
      expected: '0,00'
    })
  })

  // PRICE FORMAT
  QUnit.module('BxPro Price format')
  function floatPriceFormatTestCase(oOptions) {
    // Act
    var sState = formatter.floatPriceFormat(oOptions.input, oOptions.bxFormat)

    // Assert
    oOptions.assert.strictEqual(sState, oOptions.expected, 'Prezzo nel formato corretto')
  }

  QUnit.test("Format l'intero aggiungendo 3 decimali", function (assert) {
    floatPriceFormatTestCase.call(this, {
      assert: assert,
      input: 42,
      bxFormat: false,
      expected: '42.000'
    })
  })

  QUnit.test('Format double portandolo a 3 decimali', function (assert) {
    floatPriceFormatTestCase.call(this, {
      assert: assert,
      input: 42.456,
      bxFormat: false,
      expected: '42.456'
    })
  })

  QUnit.test('Format double > 1000 portandolo a 3 decimali senza group', function (assert) {
    floatPriceFormatTestCase.call(this, {
      assert: assert,
      input: 4200.456,
      bxFormat: false,
      expected: '4200.456'
    })
  })

  QUnit.test('Format blank portandolo a 0 con 3 decimali', function (assert) {
    floatPriceFormatTestCase.call(this, {
      assert: assert,
      input: '',
      bxFormat: false,
      expected: '0.000'
    })
  })

  QUnit.test('Format null restituisce blank', function (assert) {
    floatPriceFormatTestCase.call(this, {
      assert: assert,
      input: null,
      bxFormat: false,
      expected: '0.000'
    })
  })

  QUnit.test('Format BxPro valore/1000 portandolo a 2 decimali', function (assert) {
    floatPriceFormatTestCase.call(this, {
      assert: assert,
      input: 4200,
      bxFormat: true,
      expected: '4,200'
    })
  })

  QUnit.test('Format BxPro valore/1000 (null) portandolo a 0 con 3 decimali', function (assert) {
    floatPriceFormatTestCase.call(this, {
      assert: assert,
      input: null,
      bxFormat: true,
      expected: '0,000'
    })
  })

  // DATE FORMAT
  QUnit.module('BxPro Date format')
  function dateTS2DateTestCase(oOptions) {
    // Act
    var sState = formatter.dateTS2Date(oOptions.input)

    // Assert
    oOptions.assert.strictEqual(sState, oOptions.expected, 'Data nel formato corretto')
  }

  function dateTS2TSTestCase(oOptions) {
    // Act
    var sState = formatter.dateTS2TS(oOptions.input)

    // Assert
    oOptions.assert.strictEqual(sState, oOptions.expected, 'DataTS nel formato corretto')
  }

  QUnit.test("Format data yyyy-MM-dd'T'HH:mm:ss to dd/MM/yyyy", function (assert) {
    dateTS2DateTestCase.call(this, {
      assert: assert,
      input: '2022-12-23T14:30:00',
      expected: '23/12/2022'
    })
  })

  QUnit.test('Format data null to blank', function (assert) {
    dateTS2DateTestCase.call(this, {
      assert: assert,
      input: null,
      expected: ''
    })
  })

  QUnit.test('Format data invalid to blank', function (assert) {
    dateTS2DateTestCase.call(this, {
      assert: assert,
      input: '2022a-13-23T14:30:45',
      expected: ''
    })
  })

  QUnit.test("Format TS data yyyy-MM-dd'T'HH:mm:ss to dd/MM/yyyy HH:mm:ss", function (assert) {
    dateTS2TSTestCase.call(this, {
      assert: assert,
      input: '2022-12-23T14:30:00',
      expected: '23/12/2022 14:30:00'
    })
  })

  QUnit.test('Format TS data null to blank', function (assert) {
    dateTS2TSTestCase.call(this, {
      assert: assert,
      input: null,
      expected: ''
    })
  })

  QUnit.test('Format TS data invalid to blank', function (assert) {
    dateTS2TSTestCase.call(this, {
      assert: assert,
      input: '2022a-13-23T14:30:45',
      expected: ''
    })
  })
})
