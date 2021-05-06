




// const inquirer = require('inquirer')
// inquirer.prompt([
//     {
//         type: 'input',
//         name: 'answer',
//         message: '获取用户输入字符串',
//         default: "没用的默认值"
//     }
// ]).then((data) => {
//     console.log('结果为:')
//     console.log(data)
// })



// 引入依赖
var program = require('commander');

// 定义版本和参数选项
program
    .version('0.1.0', '-v, --version', '版本')
    .option('-i, --init', '初始化')
    .option('-g, --generate', '构建')
    .option('-r, --remove', '删除');
program.parse(process.argv);

if(program.init) {
    console.log('init something')
}

if(program.generate) {
    console.log('generate something')
}

if(program.remove) {
    console.log('remove something')
}

const ora = require('ora');
const spinner = ora('Loading unicorns').start();

setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows';
}, 1000);


const chalk = require('chalk');
console.log(chalk.red.bold.bgWhite('Hello World'));
console.log(chalk.rgb(255,0,0).bold.bgRgb(255,255,255)('Hello World'));

console.log(chalk`{red.bold.bgWhite Hello World}`);

console.log(chalk`{rgb(255,0,0).bold.bgRgb(255,255,255) Hello World}`);

