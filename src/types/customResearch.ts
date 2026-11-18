/** What a research search sends. */
export type CustomResearchInput = {
  query: string;
  location: string;
  tier: 'free';
};

export type SourceLink = { sourceUrl: string };

export type KeyFact = { label: string; value: string } & SourceLink;

/** One side of a difference: what was said, and where. */
export type Claim = { value: string; detail: string } & SourceLink;

export type Difference = {
  title: string;
  category: string;
  sellerClaim: Claim;
  officialRecord: Claim;
  impact: string;
};

export type ResearchQuestion = {
  category: string;
  question: string;
  whyItMatters: string;
  goodAnswer: string;
  redFlag: string;
  priority: 'top' | 'standard';
};

export type PricingRow = {
  label: string;
  size: string;
  quotedPrice: string;
  benchmarkPrice: string;
  differenceNote: string;
} & SourceLink;

export type ResearchCounts = {
  sourcesChecked: number;
  confirmedFacts: number;
  differencesFound: number;
  questionsToAsk: number;
};

/** The answer to a research search: everything the report page shows. */
export type CustomResearchResult = {
  ok: boolean;
  ref: string;
  tier: string;
  query: string;
  summary: string;
  highlights: string[];
  keyFacts: KeyFact[];
  differences: Difference[];
  questions: ResearchQuestion[];
  pricing: PricingRow[];
  sources: unknown[];
  counts: ResearchCounts;
  searchedResultCount: number;
  generatedAt: string;
};
