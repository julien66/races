/**
 * Requirejs Main entry point.
 */
requirejs.myPrefix = 'js/task-creator';
var path = window.location.pathname;


define(['task-creator/js/app'], function (tc) { 
  
  if (path == '/' || path == '' || path.indexOf('/race/view') > -1) {
    tc.init({
      allowCustomWaypoints : false,
      jGrowlPosition : 'bottom-left',
      mode : 'viewAll',
      silent : true,
    });
    tc.taskFromJSON();
    tc.sumTaskFromJSON();
  }
  else {
    tc.init({
      jGrowlPosition : 'bottom-left',
      mode : 'full',
      saveRace : true,
    });
  }
});
