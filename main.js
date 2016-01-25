'use strict';

require('../index');

var Path = require('fire-path');

Editor.App.extend({
  init ( opts, cb ) {
    var settingsPath = Path.join(Editor.App.path, '.settings');

    Editor.init({
      'profile': {
        local: settingsPath,
      },
      'package-search-path': [
        Editor.url('app://package-examples/'),
        Editor.url('app://benchmark/'),
        Path.join(Editor.App.home, 'packages'),
      ]
    });

    if ( cb ) cb ();
  },

  run () {
    // create main window
    var mainWin = new Editor.Window('main', {
      title: 'Editor Framework',
      width: 900,
      height: 700,
      minWidth: 900,
      minHeight: 700,
      show: false,
      resizable: true,
    });
    Editor.mainWindow = mainWin;

    // restore window size and position
    mainWin.restorePositionAndSize();

    // load and show main window
    mainWin.show();

    // page-level test case
    mainWin.load( 'app://package-examples/index.html' );

    // open dev tools if needed
    if ( Editor.showDevtools ) {
      // NOTE: open dev-tools before did-finish-load will make it insert an unused <style> in page-level
      mainWin.nativeWin.webContents.once('did-finish-load', function () {
        mainWin.openDevTools({
          detach: true
        });
      });
    }
    mainWin.focus();
  },
});
