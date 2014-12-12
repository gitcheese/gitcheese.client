'use strict';

describe('Service: notConfiguredProjects', function () {

  // load the service's module
  beforeEach(module('gitcheeseApp'));

  // instantiate service
  var notConfiguredProjects;
  beforeEach(inject(function (_notConfiguredProjects_) {
    notConfiguredProjects = _notConfiguredProjects_;
  }));

  it('should do something', function () {
    expect(!!notConfiguredProjects).toBe(true);
  });

});
