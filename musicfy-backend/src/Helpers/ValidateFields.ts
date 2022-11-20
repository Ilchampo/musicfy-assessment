import validator from 'validator';

export const IsAlpha = (value: any): boolean => {
    if (value) {
        const trimmed = value.trim();
        const words = trimmed.split(' ');
        let isValid = true;
        for (let i = 0; i < words.length; i++) {
            isValid = isValid && validator.isAlpha(words[i]);
        }
        return isValid;
    }
    return false;
};

export const IsAlphanumeric = (value: any): boolean => {
    if (value) {
        const trimmed = value.trim();
        const words = trimmed.split(' ');
        let isValid = true;
        for (let i = 0; i < words.length; i++) {
            isValid = isValid && validator.isAlphanumeric(words[i]);
        }
        return isValid;
    }
    return false;
};

export const IsNumeric = (value: any): boolean => {
    return value ? validator.isNumeric(value) : false;
};

export const IsBetweenDates = (value: any): boolean => {
    const startDate = new Date('2009-12-31');
    const endDate = new Date('2022-01-01');
    return value ? new Date(`${value}-01-01`) < endDate && new Date(`${value}-01-01`) > startDate : false;
};
