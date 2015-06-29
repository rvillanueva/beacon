'use strict';

describe('Controller: MatchHeroCtrl', function () {

  // load the controller's module
  beforeEach(module('heroesApp'));

  var MatchHeroCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MatchHeroCtrl = $controller('MatchHeroCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
