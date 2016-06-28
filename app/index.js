const generator = require('yeoman-generator');
const _s = require('underscore.string');
const rimraf = require('rimraf');

module.exports = generator.Base.extend({
  init: function () {
    const cb = this.async();

    this.prompt([{
      name: 'appName',
      message: 'What do you want to name your app?',
      default: this.appname.replace(/\s/g, '-'),
    }]).then(props => {
      this.appName = _s.camelize(props.appName);
      this.appname = this.appName.toLowerCase();
      this.name = this.user.git.name();
      this.email = this.user.git.email();

      this.template('watchmanconfig', '.watchmanconfig');
      this.template('flowconfig', '.flowconfig');
      this.template('buckconfig', '.buckconfig');
      this.template('gitignore', '.gitignore');
      this.template('eslintrc', '.eslintrc');
      this.template('_package.json', 'package.json');
      this.template('LICENSE.md');
      this.template('README.md');
      this.template('babelrc', '.babelrc');
      this.template('index.android.js');
      this.template('index.ios.js');

      this.directory('src', 'src');
      this.directory('test', 'test');

      // ios
      this.template(
        'ios/RNBoilerplate.xcodeproj/project.pbxproj',
        `ios/${this.appName}.xcodeproj/project.pbxproj`
      );
      this.template(
        'ios/RNBoilerplate.xcodeproj/xcshareddata/xcschemes/RNBoilerplate.xcscheme',
        `ios/${this.appName}.xcodeproj/xcshareddata/xcschemes/${this.appName}.xcscheme`
      );
      this.directory('ios/RNBoilerplate', 'ios/' + this.appName);
      this.template(
        'ios/RNBoilerplateTests/RNBoilerplateTests.m',
        'ios/' + this.appName + 'Tests/' + this.appName + 'Tests.m'
      );
      this.template(
        'ios/RNBoilerplateTests/Info.plist',
        'ios/' + this.appName + 'Tests/Info.plist'
      );

      // android
      this.directory(
        'android/app/src/main/java/com/rnboilerplate',
        `android/app/src/main/java/com/${this.appname}`
      );
      this.directory('android');

      cb();
    });
  },
  end: function () {
    const cb = this.async();
    rimraf(
      this.destinationPath('android/app/src/main/java/com/rnboilerplate'),
      cb
    );
  },
  install: function () {
    this.installDependencies({ bower: false });
  },
});
