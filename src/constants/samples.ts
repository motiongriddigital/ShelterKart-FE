import type { SampleDossier } from '@/types/report';

// Index of the reference reports. The reports themselves (public/samples/<id>.json) load only when one is opened.
export const SAMPLE_DOSSIERS: SampleDossier[] = [
  {
    id: 'celeste',
    title: 'Hubtown Celeste',
    place: 'Mumbai, India',
    city: 'Mumbai',
    country: 'India',
    home: 'IN',
    ids: ['P51900008925'],
    pdf: 'ShelterKart-Report-Hubtown-Celeste.pdf',
    reportSlug: 'hubtown-celeste',
  },
  {
    id: 'london',
    title: 'The Kensington, Sutton Garden Square',
    place: 'London, United Kingdom',
    city: 'London',
    country: 'United Kingdom',
    home: 'GB',
    ids: [],
    pdf: 'ShelterKart-Report-The-Kensington-Sutton-Garden-Square.pdf',
  },
  {
    id: 'dubai',
    title: 'Creek Bay Tower B',
    place: 'Dubai, United Arab Emirates',
    city: 'Dubai',
    country: 'United Arab Emirates',
    home: 'AE',
    ids: ['DLD project 4198'],
    pdf: 'ShelterKart-Report-Creek-Bay-Tower-B.pdf',
  },
];
