// Copy and limits of the verify-code page. English text is also the i18n key, so each string goes through t().
export const CODE_LENGTH = 6;
/** How long a reader waits before they can ask for a new code. */
export const RESEND_SECONDS = 45;

export const VERIFY_COPY = {
  badge: 'Check your email',
  title: 'Enter your code',
  sub: 'We sent a {n}-digit code to',
  noEmail: 'your email address',
  change: 'Change',
  codeLabel: 'Your {n}-digit code',
  once: 'The code works only once.',
  resendQuestion: 'Did not get the code?',
  resendWait: 'Send a new code in',
  resendNow: 'Send a new code',
  submit: 'Verify code',
  verifying: 'Checking…',
  back: 'Back to sign in',
} as const;

export const VERIFY_ERRORS = {
  code: 'Enter all {n} digits of the code.',
  noEmail: 'Start again from the sign-in page: we do not know which email to check.',
} as const;
