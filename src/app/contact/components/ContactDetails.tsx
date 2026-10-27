import { BUSINESS } from '@/constants/business';
import { Placeholder } from '@/components/ui/Placeholder';

export function ContactDetails() {
  return (
    <table>
      <tbody>
        <tr>
          <th scope="row">Business</th>
          <td>
            <Placeholder field="legalName" /> (trading as {BUSINESS.tradingName})
          </td>
        </tr>
        <tr>
          <th scope="row">Registered address</th>
          <td>
            <Placeholder field="registeredAddress" />
          </td>
        </tr>
        <tr>
          <th scope="row">Phone</th>
          <td>
            <Placeholder field="phone" />
          </td>
        </tr>
        <tr>
          <th scope="row">Support and refunds</th>
          <td>
            <Placeholder field="supportEmail" />
          </td>
        </tr>
        <tr>
          <th scope="row">Corrections to a report</th>
          <td>{BUSINESS.correctionsEmail}</td>
        </tr>
      </tbody>
    </table>
  );
}
