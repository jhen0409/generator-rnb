const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const pwd = path.resolve('./');

describe('generator', function () {
  this.timeout(60000);

  beforeEach(cb => {
    const deps = ['../app'];

    helpers.testDirectory(path.join(__dirname, 'temp'), err => {
      if (err) return cb(err);
      this.generator = helpers.createGenerator('rnb:app', deps, null, { skipInstall: true });
      cb();
    });
  });

  afterEach(() => {
    process.chdir(pwd);
  });

  it('generates expected files', done => {
    const expected = [
      '.watchmanconfig',
      '.buckconfig',
      '.flowconfig',
      '.gitignore',
      '.eslintrc',
      '.babelrc',
      'package.json',
      'README.md',
      'LICENSE.md',
      'index.ios.js',
      'index.android.js',

      path.join('src', 'actions', 'counter.js'),
      path.join('src', 'components', 'Counter.js'),
      path.join('src', 'containers', 'Home.js'),
      path.join('src', 'containers', 'Counter.js'),
      path.join('src', 'containers', 'Router.js'),
      path.join('src', 'reducers', 'counter.js'),
      path.join('src', 'reducers', 'index.js'),
      path.join('src', 'configureStore.js'),
      path.join('src', 'index.js'),

      path.join('test', 'actions', 'counter.spec.js'),
      path.join('test', 'components', 'Counter.spec.js'),
      path.join('test', 'reducers', 'counter.spec.js'),
      path.join('test', '.eslintrc'),

      path.join('ios', 'TestApp', 'main.m'),
      path.join('ios', 'TestApp', 'Info.plist'),
      path.join('ios', 'TestApp', 'AppDelegate.h'),
      path.join('ios', 'TestApp', 'AppDelegate.m'),
      path.join('ios', 'TestApp', 'Base.lproj', 'LaunchScreen.xib'),
      path.join('ios', 'TestApp', 'Assets.xcassets', 'AppIcon.appiconset', 'Contents.json'),
      path.join('ios', 'TestApp.xcodeproj', 'project.pbxproj'),
      path.join('ios', 'TestApp.xcodeproj', 'xcshareddata', 'xcschemes', 'TestApp.xcscheme'),
      path.join('ios', 'TestAppTests', 'Info.plist'),
      path.join('ios', 'TestAppTests', 'TestAppTests.m'),

      path.join('android', 'app', 'build.gradle'),
      path.join('android', 'app', 'proguard-rules.pro'),
      path.join('android', 'app', 'BUCK'),
      path.join('android', 'app', 'src', 'main', 'AndroidManifest.xml'),
      path.join('android', 'app', 'src', 'main', 'java', 'com', 'testapp', 'MainActivity.java'),
      path.join('android', 'app', 'src', 'main', 'java', 'com', 'testapp', 'MainApplication.java'),
      path.join('android', 'app', 'src', 'main', 'res', 'mipmap-hdpi', 'ic_launcher.png'),
      path.join('android', 'app', 'src', 'main', 'res', 'mipmap-mdpi', 'ic_launcher.png'),
      path.join('android', 'app', 'src', 'main', 'res', 'mipmap-xhdpi', 'ic_launcher.png'),
      path.join('android', 'app', 'src', 'main', 'res', 'mipmap-xxhdpi', 'ic_launcher.png'),
      path.join('android', 'app', 'src', 'main', 'res', 'values', 'strings.xml'),
      path.join('android', 'app', 'src', 'main', 'res', 'values', 'styles.xml'),
      path.join('android', 'build.gradle'),
      path.join('android', 'gradle.properties'),
      path.join('android', 'gradle', 'wrapper', 'gradle-wrapper.jar'),
      path.join('android', 'gradle', 'wrapper', 'gradle-wrapper.properties'),
      path.join('android', 'gradlew'),
      path.join('android', 'gradlew.bat'),
      path.join('android', 'settings.gradle'),
    ];

    helpers.mockPrompt(this.generator, {
      appName: 'Test-app',
    });

    this.generator.run(() => {
      assert.file(expected);
      done();
    });
  });
});
