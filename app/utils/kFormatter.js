export function kFormatter(num) {
    return num > 999 ? (num/1000).toFixed(1) + 'k' : num;
}

module.exports = { kFormatter };
