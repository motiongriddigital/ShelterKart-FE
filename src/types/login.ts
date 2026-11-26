/** What the sign-in form holds. */
export type LoginValues = {
  email: string;
  acceptedTerms: boolean;
};

/** One message per field that is not valid yet; a field that is fine is absent. */
export type LoginErrors = Partial<Record<keyof LoginValues, string>>;
