import makeWASocket from './Socket/index.js';
const colors = [
    chalk.red,
    chalk.green,
    chalk.yellow,
    chalk.blue,
    chalk.magenta,
    chalk.cyan,
    chalk.white
];

// Ambil warna secara acak
const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

console.log(chalk.gray('────────────────────────────────────'));

console.log(
    randomColor().bold('   ✦ N O V E R O ✦ ') +
    randomColor().bold('B A I L E Y S')
);

console.log('');

console.log(
    chalk.green('  ✓ ') +
    randomColor()('Status: Ready')
);

console.log(
    chalk.yellow('  ⚡ ') +
    randomColor()('Developer: @ItsNovero')
);

console.log(
    chalk.blue('  ◆ ') +
    randomColor()('Version: 1.0')
);

console.log(
    chalk.red('  📅 ') +
    randomColor()('Updated: 03/09/2026')
);

console.log('');

console.log(
    randomColor().bold('  ✦ Novero Baileys berhasil dimuat!')
);

console.log(chalk.gray('────────────────────────────────────\n'));
console.log(chalk.bold.cyan("Follow Our Telegram Channel To See Update Information: t.me/mekslosu\n"));
export * from '../WAProto/index.js';
export * from './Utils/index.js';
export * from './Types/index.js';
export * from './Defaults/index.js';
export * from './WABinary/index.js';
export * from './WAM/index.js';
export * from './WAUSync/index.js';
export * from './Store/index.js';
export * from './Socket/ban-checker.js';
export { makeWASocket };
export default makeWASocket;
//# sourceMappingURL=index.js.map
