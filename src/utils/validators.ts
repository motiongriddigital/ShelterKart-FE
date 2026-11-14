export const isEmail = (v: string) => /^[^\s@<>()]{1,64}@[^\s@<>()]{1,190}\.[a-z]{2,24}$/i.test(v);
/** International format with the country code, spaces and brackets already stripped. */
export const isPhone = (v: string) => /^\+[1-9]\d{7,14}$/.test(v);
export const stripPhone = (v: string) => v.replace(/[\s()-]/g, '');
export const isPaymentId = (v: string) => /^pay_[A-Za-z0-9]{8,30}$/.test(v);
/** A one-time code: exactly `length` digits. */
export const isOneTimeCode = (v: string, length: number) => new RegExp(`^\\d{${length}}$`).test(v);
