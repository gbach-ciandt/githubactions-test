test('Hello World test', () => {
    expect('Hello World').toBe('Hello World');
});

function countTo100() {
    return Array.from({ length: 100 }, (_, i) => i + 1);
}

describe('Count to 100', () => {
    test('should generate an array counting from 1 to 100', () => {
        const result = countTo100();
        expect(result).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
    });
});