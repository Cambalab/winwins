(function() {
  'use strict';

  describe('controllers', function(){
    var vm;
    var $timeout;
    var toastr;
    var scope;

    beforeEach(module('winwins'));
    beforeEach(inject(function(_$controller_, _$timeout_, _webDevTec_, _toastr_, _$q_, _$rootScope_ ) {
      scope = _$rootScope_.$new();

      spyOn(_webDevTec_, 'getTec').and.returnValue([{}, {}, {}, {}, {}]);
      spyOn(_toastr_, 'info').and.callThrough();

      var mockData = {
        sponsors: [{datos: 'prueba'}],
        winwins:  [{datos: 'prueba'}],
        miembros: [{datos: 'prueba'}],
        partners: [{datos: 'prueba'}]
      };
      vm = _$controller_('MainController', mockData );
      scope.$apply();
      $timeout = _$timeout_;
      toastr = _toastr_;
    }));

    it('should have a timestamp creation date', function() {
      expect(vm.creationDate).toEqual(jasmine.any(Number));
    });

    it('should define animate class after delaying timeout ', function() {
      $timeout.flush();
      expect(vm.classAnimation).toEqual('rubberBand');
    });

    it('should show a Toastr info and stop animation when invoke showToastr()', function() {
      vm.showToastr();
      expect(toastr.info).toHaveBeenCalled();
      expect(vm.classAnimation).toEqual('');
    });

    it('should define more than 5 awesome things', function() {
      expect(angular.isArray(vm.awesomeThings)).toBeTruthy();
      expect(vm.awesomeThings.length === 5).toBeTruthy();
    });

    it('should define at least 1 sponsor', function() {
      expect(angular.isArray(vm.sponsors)).toBeTruthy();
      expect(vm.sponsors.length >= 1).toBeTruthy();
    });

    it('should define at least 1 winwins', function() {
      expect(angular.isArray(vm.winwins)).toBeTruthy();
      expect(vm.winwins.length >= 1).toBeTruthy();
    });
    it('should define at least 1 miembros', function() {
      expect(angular.isArray(vm.miembros)).toBeTruthy();
      expect(vm.miembros.length >= 1).toBeTruthy();
    });
    it('should define at least 1 partners', function() {
      expect(angular.isArray(vm.partners)).toBeTruthy();
      expect(vm.partners.length >= 1).toBeTruthy();
    });
  });
})();
