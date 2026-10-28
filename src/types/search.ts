export type DemoRecord = {
  name: string;
  developer: string;
  locality: string;
  city: string;
  country: string;
  flag: string;
  reg: string;
  status: string;
};

export type DemoHit = { r: DemoRecord; points: number; typoOnly: boolean; typo: boolean };
