import type { BusinessProfile } from '@/types/business';

// Mirrors tools/business.json. Empty strings render as a visible placeholder (and trigger the
// draft banner) until the registered details are supplied.
export const BUSINESS: BusinessProfile = {
  tradingName: 'ShelterKart',
  legalName: '',
  registeredAddress: '',
  phone: '',
  supportEmail: '',
  correctionsEmail: 'corrections@shelterkart.com',
  grievanceOfficer: { name: '', designation: 'Grievance Officer', email: '' },
  replyWithinBusinessDays: 2,
  refundWithinBusinessDays: 7,
};
