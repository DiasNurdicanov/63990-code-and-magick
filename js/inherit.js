'use strict';

(function() {

  window.inherit = function(child, parent) {

    function EmpteCtor() {} //Тут должно быть или не нужно каждый раз обьявлять и вынести за метод?

    EmpteCtor.prototype = parent.prototype;

    child.prototype = new EmpteCtor();
  };

})();
