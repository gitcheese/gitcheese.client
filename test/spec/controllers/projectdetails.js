'use strict';

describe('Controller: ProjectdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('gitcheeseApp'));

  var ProjectdetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectdetailsCtrl = $controller('ProjectdetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
