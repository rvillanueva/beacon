'use strict';

describe('Controller: FlashSuccessCtrl', function () {

  // load the controller's module
  beforeEach(module('heroesApp'));

  var RequestCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequestCtrl = $controller('RequestCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
