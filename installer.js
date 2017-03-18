var createInstaller = require('electron-installer-squirrel-windows');

createInstaller({
  name: 'LenterTestApp',
  path: './dist/LenterApp-win32-x64',
  authors: 'Lenter',
  exe: 'LenterApp.exe',
  out: './dist/LenterApp',
  overwrite:true,
}, function done(e) {
  console.log("build end");
});


// var electronWinstaller = require('electron-winstaller');
// resultPromise = electronWinstaller.createWindowsInstaller({
//   appDirectory: './lenterapp-win32-x64',
//   outputDirectory: './installer-win32-x64',
//   exe: 'LenterApp.exe',
//   setupExe: 'LenterAppSetup.exe'
// });
//
// resultPromise.then(function(){
//   console.log("성공");
// }, function(e){
//   console.log(e.message);
//   console.log("실패");
// });
