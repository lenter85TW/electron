module.exports = function(grunt){
  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),
    "create-windows-installer": { //따옴표 처리를 안했더니 하이픈(-) 때문에 syntax에러 났다. 하이픈 쓰려면 이렇게 문자열로 처리해라.
      x64: {
        appDirectory: './dist/LenterApp-win32-x64',
        outputDirectory: './dist/LenterGruntApp',
        authors: 'My App Inc.',  //setup.exe파일 우클릭 했을때 저작권 정보가 여기에 들어간다.
        exe: 'LenterApp.exe',  //setup.exe로 나오고 설치를 하면 실행 파일 이름이 이렇게 나온다.
        title:'LenterAppTitle',  //제어판에 등록되어 있는 이름이 이거다
        iconUrl: 'http://desktop.twinny.io/logo.ico',
        setupIcon: 'images/logo.ico',  //셋업이 된 후에 updat.exe파일에 이 이미지가 들어가네
        loadingGif: 'images/setup.gif'  //로딩할때 이미지
      },
      // ia32: {
      //   appDirectory: './dist/LenterApp-win32-x64',
      //   outputDirectory: './dist/LenterGruntApp',
      //   authors: 'My App Inc.',
      //   exe: 'LenterApp.exe'
      // }
    }
  });

  grunt.loadNpmTasks('grunt-electron-installer');
  grunt.registerTask('default', ['create-windows-installer']);

};



//package.json 의 name이(현재는 moigo) C:/user/lenter/appdata/local/moigo  이렇게 여기 폴더 이름이 된다. 그리고 그 폴더 안에 LenterApp.exe가 생성되어 있다.
