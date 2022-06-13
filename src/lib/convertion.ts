

export const convertNumberToDecimal = (value: number) => {
    let inputValue = value.toString();
    let last = inputValue.slice(-2)
    let removeLast = inputValue.slice(0, -2);
    let result = `${removeLast}.${last}`
    return result
}