import { BUSINESS } from '@/constants/business';

export function PrivacyContent() {
  return (
    <>
      <h4>What we collect</h4>
      <p>
        <strong>Your searches.</strong> The property or developer name, city and market you search.
        Searches are not linked to your identity. Before a search leaves our servers, anything that
        looks like a phone number or email address is removed from it.
      </p>
      <p>
        <strong>Documents you choose to check.</strong> If you upload an allotment letter, agreement
        or certificate, it is read once to extract six property details: the project name,
        registration numbers, selling company, possession date, payment bank and document type. Your
        personal details are not extracted. The file is not stored, logged or cached.
      </p>
      <p>
        <strong>Payments.</strong> Payments are handled by Razorpay. We never see or store your
        card, UPI or bank details. We keep a purchase record: the report reference, amount,
        currency, status, and Razorpay’s order and payment references.
      </p>
      <p>
        <strong>Access to a report you bought.</strong> A signed access code for that report is kept
        in your browser on this device, so the report opens again when you return. On another
        device, you can restore it with the payment ID from your Razorpay receipt.
      </p>
      <p>
        <strong>Contact details.</strong> If you choose to give us a phone number or email address,
        it is used only for the purpose you gave it for, and only after your explicit consent.
      </p>
      <h4>Who processes it for us</h4>
      <p>
        Anthropic, which provides the AI model that runs the research and reads uploaded documents.
        Razorpay, which processes payments. Public websites and official registers receive requests
        from our servers when research runs; they never receive your identity.
      </p>
      <p>
        <strong>Visit statistics.</strong> We count visits to understand how people find
        ShelterKart: the page, the website or campaign link that brought you, the country your
        connection comes from, whether you use a phone or a computer, and actions such as searching,
        unlocking a report, saving a PDF or sharing one. We use no cookies for this and store no IP
        address. To count unique visitors, we use a code that changes every day, so it cannot
        identify you or connect your visits on different days. The names of projects searched are
        recorded, with phone numbers and email addresses removed.
      </p>
      <h4>What we do not do</h4>
      <p>
        We do not sell personal data. We do not use your details for marketing you did not ask for.
        No developer can pay to see who searched for their projects.
      </p>
      <h4>How long we keep it</h4>
      <p>
        Reports are kept for up to 30 days, so a shared link or a report you bought keeps working.
        They contain no personal details: phone numbers and email addresses are removed from
        searches, and no report records who searched. After 30 days they are deleted. Uploaded
        documents are not kept at all. Visit statistics are kept for 400 days. Purchase records are
        kept as long as tax and payment law requires.
      </p>
      <h4>Your rights</h4>
      <p>
        You can ask what we hold about you, and ask us to correct or delete it, by writing to{' '}
        {BUSINESS.correctionsEmail}.
      </p>
    </>
  );
}
