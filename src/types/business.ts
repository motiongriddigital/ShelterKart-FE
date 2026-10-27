export type BusinessProfile = {
  tradingName: string;
  legalName: string;
  registeredAddress: string;
  phone: string;
  supportEmail: string;
  correctionsEmail: string;
  grievanceOfficer: { name: string; designation: string; email: string };
  replyWithinBusinessDays: number;
  refundWithinBusinessDays: number;
};

/** Fields a reader sees as a placeholder until they are filled in. */
export type BusinessField =
  | 'legalName'
  | 'registeredAddress'
  | 'phone'
  | 'supportEmail'
  | 'grievanceOfficerName'
  | 'grievanceOfficerEmail';
