'use strict';

describe('Service: requestfactory', function () {

  // load the service's module
  beforeEach(module('heroesApp'));

  // instantiate service
  var requestfactory;
  beforeEach(inject(function (_requestfactory_) {
    requestfactory = _requestfactory_;
  }));

  it('should do something', function () {
    expect(!!requestfactory).toBe(true);
  });

});
