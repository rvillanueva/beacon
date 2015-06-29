'use strict';

describe('Controller: MatchMissionCtrl', function () {

  // load the controller's module
  beforeEach(module('heroesApp'));

  var MatchMissionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MatchMissionCtrl = $controller('MatchMissionCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
