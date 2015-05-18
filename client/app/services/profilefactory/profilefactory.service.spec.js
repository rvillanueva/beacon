'use strict';

describe('Service: profilefactory', function () {

  // load the service's module
  beforeEach(module('heroesApp'));

  // instantiate service
  var profilefactory;
  beforeEach(inject(function (_profilefactory_) {
    profilefactory = _profilefactory_;
  }));

  it('should do something', function () {
    expect(!!profilefactory).toBe(true);
  });

});
