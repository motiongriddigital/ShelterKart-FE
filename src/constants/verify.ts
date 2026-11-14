// Copy and limits of the verify-code page. English text is also the i18n key, so each string goes through t().
export const CODE_LENGTH = 6;
/** How long a reader waits before they can ask for a new code. */
export const RESEND_SECONDS = 45;

export const VERIFY_COPY = {
  badge: 'Check your email',
  title: 'Enter your code',
  sub: 'We sent a 6-digit code to',
  noEmail: 'your email address',
  change: 'Change',
  codeLabel: 'Your 6-digit code',
  once: 'The code works only once.',
  resendQuestion: 'Did not get the code?',
  resendWait: 'Send a new code in',
  resendNow: 'Send a new code',
  submit: 'Verify code',
  back: 'Back to sign in',
} as const;

export const VERIFY_ERRORS = {
  code: 'Enter all 6 digits of the code.',
} as const;
