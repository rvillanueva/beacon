'use strict';

describe('Service: traitfactory', function () {

  // load the service's module
  beforeEach(module('heroesApp'));

  // instantiate service
  var traitfactory;
  beforeEach(inject(function (_traitfactory_) {
    traitfactory = _traitfactory_;
  }));

  it('should do something', function () {
    expect(!!traitfactory).toBe(true);
  });

});
