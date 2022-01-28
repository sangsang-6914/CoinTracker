export function inputNumberFormat(str: string): string {
    const result = comma(uncomma(str));
    return result
}

function comma(str: string) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str: string) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}