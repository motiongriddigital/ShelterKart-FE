import type { PropertyReport } from '@/types/propertyReport';

// Illustrative sample report, shaped like the real audit record. Replace with the report API when it exists.
const HUBTOWN_CELESTE: PropertyReport = {
  slug: 'hubtown-celeste',
  ref: 'SK-PS1900008925-20261013',
  researchedTo: '13 October 2026',
  registration: {
    id: 'PS1900008925',
    registeredOn: '19 Aug 2017',
    jurisdiction: 'Mumbai, Maharashtra',
  },
  name: 'Hubtown Celeste',
  address: 'B G Kher Marg, Worli, Mumbai 400018 · India, Maharashtra',
  headline:
    'Who you are really paying, what the record shows, and 30 questions to ask before you pay.',
  summary:
    '43 findings from 28 sources. 2 disagreements between sources and 8 conclusions drawn by reasoning. Research, not advice. Inputs shown as what public sources show and it does not tell you whether to buy.',
  ledger: [
    { label: 'Official Filing Entity', value: 'Nayan Real Estate Pvt Ltd' },
    { label: 'Public Marketed Brand', value: 'Hubtown Limited' },
    { label: 'RERA Revised End Date', value: '31 Jul 2028', highlight: true },
    { label: 'Marketed Possession', value: 'Dec 2027 / Mar 2027' },
    { label: 'Total Sanctioned Units', value: '211 Flats / Units' },
  ],
  stats: [
    { label: 'Total Findings', value: 43, tone: 'slate' },
    { label: 'Official Confirmed', value: 6, tone: 'green' },
    { label: 'Reported Sources', value: 37, tone: 'blue' },
    { label: 'Source Disagreements', value: 2, tone: 'amber' },
    { label: 'Reasoned Findings', value: 8, tone: 'violet' },
    { label: 'Action Questions', value: 30, tone: 'slate' },
  ],
  discrepancies: [
    {
      tag: 'Contractual Entity',
      code: 'ASD 30 · 01',
      title: 'Who Sells Vs Who Contracts',
      claimed: {
        label: 'Promoted marketing',
        title: '"Hubtown Limited"',
        note: 'Listed developer brand highlighted on all brochures and sales portals.',
      },
      official: {
        label: 'MahaRERA official filing',
        title: 'Nayan Real Estate Private Limited',
        note: 'SPV entity holding title and registered obligations.',
      },
      footer: {
        label: 'Legal Reality',
        text: 'You can only enforce rights, claim delay compensation, and register agreements against the registered legal entity. Verify the parental guarantee terms.',
      },
    },
    {
      tag: 'Timeline Gap',
      code: 'ASD 30 · 02',
      title: 'Completion Timeline Disparity',
      claimed: {
        label: 'Brochure / sales pitch',
        title: 'Dec 2027 / March 2027',
        note: 'Aggressive verbal targets pitched to home buyers.',
      },
      official: {
        label: 'Statutory MahaRERA end date',
        title: '31 July 2028',
        note: 'Legally bound end date (revised under official record).',
      },
      footer: {
        label: 'Financial Exposure',
        text: 'Represents an uncommitted variance of 19 to 28 months. Under RERA, delay interest cannot be claimed until the registered July 2028 deadline passes.',
      },
    },
    {
      tag: 'FSI / Plan Approval',
      code: 'ASD 30 · 03',
      title: 'Carpet Area vs Sanctioned Built-Up',
      claimed: {
        label: 'Proposed carpet (211 units)',
        title: '6,481.25 sq m',
        note: 'Marketed inventory against the layout schedule.',
      },
      official: {
        label: 'Sanctioned built-up area',
        title: '2,623.62 sq m',
        note: 'Municipal corporation sanction on record.',
      },
      footer: {
        label: 'Approval Flag',
        text: 'Proposed carpet area exceeds current sanctioned built-up area by 2.47x. Indicates upper floors and amenities still pending approval.',
      },
    },
  ],
  questions: [
    {
      category: 'Legal & Contracts',
      question:
        'Which entity executes the Sale Agreement, and is Hubtown Limited acting as guarantor?',
      why: 'Nayan Real Estate Pvt Ltd is the SPV. If Hubtown is not guaranteeing obligations, buyer recourse is limited to the SPV balance sheet.',
      good: 'A tripartite agreement with Hubtown Ltd as continuing party or guarantor, or a registered undertaking.',
      notClose: '"It is the same group, Hubtown is on the billboard."',
    },
    {
      category: 'Promoters',
      question: 'What is the sanctioned Commencement Certificate (CC) up to for my specific floor?',
      why: 'Sanctioned built-up is 2,623 sq m. Upper floors may not yet hold municipal CC approval.',
      good: 'Copy of the latest IOD & CC from MCGM showing approvals explicitly covering your floor.',
      notClose: '"CC for the entire tower is in process and routine."',
    },
    {
      category: 'Accounts',
      question:
        'Will the agreement stipulate Dec 2027 or July 2029 as the statutory possession date?',
      why: 'If the agreement writes July 2029, you forfeit 19 months of delay interest (SBI MCLR + 2%) under MahaRERA Rule 18.',
      good: 'Possession date stated explicitly as December 2027 in Clause 8, with enforceable penalty clauses.',
      notClose: '"We will deliver early, but RERA allows buffer until 2029."',
    },
    {
      category: 'Legal',
      question:
        'Are there any active mortgages, encumbrances, or bank charges on this specific plot?',
      why: 'If the land or project is pledged to lenders/NBFCs, a bank NOC must be issued prior to registering your flat.',
      good: 'Encumbrance certificate and bank NOC with 30 days & landed security release letters.',
      notClose: '"Standard title clearance is with our parent bank."',
    },
    {
      category: 'Sales',
      question: 'Why are actual registered prices ₹1.50 Cr while current asking rate is ₹1.99 Cr?',
      why: '25% discrepancy between registered index II filings and public marketing sheets. Flags pricing negotiation buffer.',
      good: 'Breakdown showing floor-rise, preferred-view charges, or special premium for identical higher floors.',
      notClose: '"Those earlier transactions were investor tranches from 2021."',
    },
    {
      category: 'Engineering',
      question:
        'What is the sanctioned car parking allocation mechanism for specific 1 BHK configurations?',
      why: 'Well-system valuations signalling stilt, mechanical parking systems and automated structures that are allocated ad hoc.',
      good: 'Dedicated lot or puzzle parking unit number explicitly designated in allotment letter.',
      notClose: '"Common parking is open on first-come basis."',
    },
    {
      category: 'Accounts',
      question: 'What is the exact RERA Separate Account number for deposit remittance?',
      why: 'Section 4(2)(l)(D) mandates 70% of collections go to the designated RERA escrow to prevent fund diversion.',
      good: 'Cheque / RTGS payable solely to the verified designated RERA Bank Account matching registration.',
      notClose: 'Remittance instructions pointing to an unrelated operational firm account.',
    },
    {
      category: 'Lawyer Review',
      question:
        'Has an independent title search been conducted for 30 preceding years in Sub-Registrar records?',
      why: 'Well-properties frequently sit on historic fiefs, leasehold land, or corporate transfers.',
      good: 'A formal search report by an independent advocate not representing the developer.',
      notClose: '"The project has approvals from tier-1 housing finance companies."',
    },
  ],
  numbers: {
    title: 'Quoted Asking vs Registered Transaction Data',
    badge: 'Registry Verified Comps',
    rows: [
      {
        typology: '1 BHK Compact',
        area: '330 sq ft (30.66 m²)',
        quoted: '₹1.99 Cr',
        effective: '₹60,303 / sq ft',
        benchmark: '₹1.52 Cr avg',
        variance: '+24.5% Gap',
      },
      {
        typology: '2 BHK Standard',
        area: '660 sq ft (61.31 m²)',
        quoted: '₹4.10 Cr',
        effective: '₹62,121 / sq ft',
        benchmark: '₹3.25 Cr avg',
        variance: '+26.1% Gap',
      },
      {
        typology: 'Jodi Unit (Combined)',
        area: '990 sq ft (92.00 m²)',
        quoted: '₹6.20 Cr',
        effective: '₹62,626 / sq ft',
        benchmark: '₹4.90 Cr avg',
        variance: '+26.5% Gap',
      },
    ],
    footnote:
      '* Transaction benchmark sourced from documented Sub-Registrar / IGR filings for Hubtown Celeste pin code cluster.',
    statutory: {
      rule: 'MahaRERA Rule 18',
      title: 'Delay Interest Exposure',
      intro:
        'If the builder misses the informal target (Dec 2027) but stays within their MahaRERA registration (July 2028), you bear the carrying cost without statutory penalty entitlement.',
      rows: [
        { label: 'Prescribed Rate', value: 'SBI MCLR + 2.0% (11.10% p.a.)' },
        { label: 'Monthly Carrying (Post-Reg)', value: '₹ 92,500 / month' },
        { label: '19-Month Latency Total', value: '₹ 17,57,500 / Cr', strong: true },
      ],
      outro:
        'This demonstrates why binding the contractual possession date to Dec 2027 in the agreement is financially crucial.',
    },
  },
  checklist: {
    groupCounts: { Legal: 12, Accounts: 7, Promoters: 5, Sales: 3, Engineering: 2, Lawyer: 1 },
    more: 25,
    items: [
      {
        no: 9,
        group: 'Legal',
        question:
          'Is there any litigation filed before the MahaRERA Appellate Tribunal or Bombay High Court regarding plot boundaries?',
        direction: 'Direct to Legal Department. Document required: Litigation affidavit.',
        status: 'Pending Response',
      },
      {
        no: 10,
        group: 'Accounts',
        question:
          'What is the exact percentage of project funds drawn down against construction milestone progress?',
        direction: 'Direct to Accounts / Finance Head. Document required: CA Certificate.',
        status: 'Pending Response',
      },
      {
        no: 11,
        group: 'Engineering',
        question: 'Has the aviation clearance (AAI NOC) been granted for the full proposed height?',
        direction: 'Direct to Site Engineering / Architect. Document required: Height NOC.',
        status: 'Document in Hand',
      },
      {
        no: 12,
        group: 'Accounts',
        question:
          'Are GST input tax credit (ITC) benefits computed and credited against the quoted agreement price?',
        direction: 'Direct to Accounts. Document required: Tax Structure Schedule.',
        status: 'Pending Response',
      },
      {
        no: 13,
        group: 'Legal',
        question:
          'Has the Environment Clearance (EC) from State Level Environment Impact Assessment Authority been revoked?',
        direction: 'Direct to Legal / Regulatory Head. Document required: EC Certificate.',
        status: 'Pending Response',
      },
    ],
  },
  sources: [
    {
      authority: 'MahaRERA Public Portal',
      document: 'PS1900008925 Certificate',
      status: { label: 'Verified Official Source', tone: 'green' },
      note: 'Registration valid up to 31/07/2028. Promoter: Nayan Real Estate Pvt Ltd.',
    },
    {
      authority: 'MCGM / BMC Building Proposal',
      document: 'IOD & CC Ledger 2024',
      status: { label: 'Verified Official Source', tone: 'green' },
      note: 'Sanctioned built-up area approved at 2,623.62 sq m.',
    },
    {
      authority: 'IGR Maharashtra',
      document: 'Index-II Sub-Registrar Filings',
      status: { label: 'Verified Official Source', tone: 'green' },
      note: 'Historical registrations average ₹1.50 Cr for standard units.',
    },
    {
      authority: 'Promoter Marketing Portal',
      document: 'celeste.hubtown.com / Collaterals',
      status: { label: 'Sources Disagree', tone: 'amber' },
      note: 'Projects possession for Dec 2027, which identifies Hubtown directly.',
    },
    {
      authority: 'Ministry of Corporate Affairs (MCA)',
      document: 'CIN: U70109MH2007PTC174823',
      status: { label: 'Reported in Review', tone: 'blue' },
      note: 'Entity financials and director status cross-verified.',
    },
  ],
};

export const PROPERTY_REPORTS: Record<string, PropertyReport> = {
  [HUBTOWN_CELESTE.slug]: HUBTOWN_CELESTE,
};

export const propertyReportBySlug = (slug: string) => PROPERTY_REPORTS[slug];
