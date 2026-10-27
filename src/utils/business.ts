import { BUSINESS } from '@/constants/business';
import type { BusinessField } from '@/types/business';

export const BUSINESS_FIELD_LABELS: Record<BusinessField, string> = {
  legalName: 'registered legal name',
  registeredAddress: 'registered address',
  phone: 'phone number',
  supportEmail: 'support email',
  grievanceOfficerName: "grievance officer's name",
  grievanceOfficerEmail: "grievance officer's email",
};

export function getBusinessField(field: BusinessField): string {
  switch (field) {
    case 'legalName':
      return BUSINESS.legalName;
    case 'registeredAddress':
      return BUSINESS.registeredAddress;
    case 'phone':
      return BUSINESS.phone;
    case 'supportEmail':
      return BUSINESS.supportEmail;
    case 'grievanceOfficerName':
      return BUSINESS.grievanceOfficer.name;
    case 'grievanceOfficerEmail':
      return BUSINESS.grievanceOfficer.email;
  }
}

export function getMissingBusinessFields(): BusinessField[] {
  return (Object.keys(BUSINESS_FIELD_LABELS) as BusinessField[]).filter(
    (f) => !getBusinessField(f).trim(),
  );
}
