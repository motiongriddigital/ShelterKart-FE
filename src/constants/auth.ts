// Copy of the sign-in page. English text is also the i18n key, so each string goes through t().
export const LOGIN_COPY = {
  badge: 'Secure sign-in',
  title: 'Sign in',
  sub: 'Sign in to see the reports you have unlocked and the properties you are following.',
  email: { label: 'Email address', placeholder: 'you@example.com' },
  password: { label: 'Password', placeholder: 'Your password' },
  terms: { before: 'I accept the', link: 'Terms and conditions' },
  submit: 'Sign in',
  submitting: 'Signing in…',
  note: 'We never share your details. Nothing is sold.',
} as const;

/** Where signing in goes next: the page that asks for the code. */
export const VERIFY_PATH = '/login/verify';
/** Where a signed-in reader lands. */
export const AFTER_SIGN_IN_PATH = '/';

export const LOGIN_ERRORS = {
  email: 'Enter a valid email address, such as you@example.com.',
  password: 'Enter your password.',
  acceptedTerms: 'Please accept the Terms and conditions to continue.',
} as const;
