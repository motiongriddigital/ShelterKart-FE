/** Where the verify-code form is: the code is typed, and one message says what is wrong with it. */
export type VerifyState = { code: string; error?: string };
