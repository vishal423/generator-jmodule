'use strict';

const chalk = require('chalk');
const Generator = require('yeoman-generator');
const packageJson = require('../../package.json');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', { type: String, required: false });
  }

  initializing() {
    this.log(
      `${chalk.green(`
     ███████  ████████  █████     ████████        ████████  ████████  ███    ██
    ██        ██    ██  ██   ██   ██              ██        ██        █████  ██
    ██        ██    ██  ██    ██  ██████    ████  ██   ███  ██████    ██  ██ ██
    ██        ██    ██  ██   ██   ██              ██    ██  ██        ██   ████
     ███████  ████████  █████     ████████        ████████  ████████  ██    ███    
`)}`
    );
    this.log(
      `Welcome to the Yeoman ${chalk.bold.green('<%=generatorName%>')} ${chalk.yellow(
        `v${packageJson.version}`
      )} generator!`
    );

    this.contextOptions = {
      name: this.options.name || this.config.get('name')
    };
  }

  async prompting() {
    if (!this.contextOptions.name) {
      const answer = await this.prompt({
        type: 'input',
        name: 'name',
        message: 'Specify your full name > '
      });
      this.contextOptions.name = answer.name;
    }
  }

  configuring() {
    this.config.set({
      version: packageJson.version,
      name: this.contextOptions.name
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('sample.txt'),
      this.destinationPath(`./sample.txt`),
      this.contextOptions
    );
  }

  install() {
    this.log(`Installing dependencies`);
    this.yarnInstall();
  }

  end() {
    this.log('Execution completed successfully.');
  }
};