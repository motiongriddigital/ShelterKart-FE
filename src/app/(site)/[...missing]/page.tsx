import { notFound } from 'next/navigation';

// Any address no page answers: shows the site's own not-found page, inside the site layout (header and footer).
export default function Missing() {
  notFound();
}
