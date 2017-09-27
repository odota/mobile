export function unpackPositionData(input) {
    if (typeof input === 'object' && !Array.isArray(input)) {
        const result = [];

        Object.keys(input).forEach((x) => {
            Object.keys(input[x]).forEach((y) => {
                result.push({
                    x: Number(x) - 64,
                    y: 128 - (Number(y) - 64),
                    value: input[x][y]
                });
            });
        });
        return result;
    }
    return input;
}
