'use strict';

describe('Service: ProjectService', function () {

  // load the service's module
  beforeEach(module('gitcheeseApp'));

  // instantiate service
  var ProjectService;
  beforeEach(inject(function (_ProjectService_) {
    ProjectService = _ProjectService_;
  }));

  it('should do something', function () {
    expect(!!ProjectService).toBe(true);
  });

});
