export interface Activities {
  id: string;
  title: string;
  paymentStatus: string;
  company: string;
  type: string;
  typeValue: string;
  price: string;
  date: string;
  viewColor: string;
  textcolor: string;
}

export const DATA: Activities[] = [
  {
    id: '1',
    title: 'Kitchen Renovation',
    paymentStatus: 'Overdue',
    company: 'Smith & Co Builders',
    type: 'Invoice: ',
    typeValue: 'INV-2025-001',
    price: '£549.50',
    date: '01/04/2026',
    viewColor: '#F0535312',
    textcolor: '#F05353',
  },
  {
    id: '2',
    title: 'Bathroom Plumbing',
    paymentStatus: 'Sent',
    company: 'Ryan & Peter Holders',
    type: 'Quote: ',
    typeValue: 'QT-2025-001',
    price: '£399.00',
    date: '05/04/2026',
    viewColor: '#FFC81412',
    textcolor: '#FFC814',
  },
  {
    id: '3',
    title: 'Floor Work',
    paymentStatus: 'Paid',
    company: 'GreenTech Ltd.',
    type: 'Invoice: ',
    typeValue: 'INV-2025-001',
    price: '£649.50',
    date: '10/04/2026',
    viewColor: '#3AB48912',
    textcolor: '#3AB489',
  },
  {
    id: '4',
    title: 'Solar Installation',
    paymentStatus: 'Paid',
    company: 'GreenTech Ltd.',
    type: 'Invoice: ',
    typeValue: 'INV-2025-001',
    price: '£849.50',
    date: '13/04/2026',
    viewColor: '#3AB48912',
    textcolor: '#3AB489',
  },
  {
    id: '5',
    title: 'Electrical Wiring',
    paymentStatus: 'Cancelled',
    company: 'GreenTech Ltd.',
    type: 'Invoice: ',
    typeValue: 'INV-2025-001',
    price: '£540.10',
    date: '23/04/2026',
    viewColor: '#F0535312',
    textcolor: '#F05353',
  },
  {
    id: '6',
    title: 'Tiles Work',
    paymentStatus: 'Draft',
    company: 'GreenTech Ltd.',
    type: 'Invoice: ',
    typeValue: 'INV-2025-001',
    price: '£448.50',
    date: '23/03/2026',
    viewColor: '#FFC81412',
    textcolor: '#FFC814',
  },
  {
    id: '7',
    title: 'Kitchen Work',
    paymentStatus: 'Completed',
    company: 'GreenTech Ltd.',
    type: 'Invoice: ',
    typeValue: 'INV-2025-001',
    price: '£534.20',
    date: '23/04/2026',
    viewColor: '#3AB48912',
    textcolor: '#3AB489',
  },
  {
    id: '8',
    title: 'Pump Installation',
    paymentStatus: 'Rejected',
    company: 'GreenTech Ltd.',
    type: 'Invoice: ',
    typeValue: 'INV-2025-001',
    price: '£123.70',
    date: '07/04/2026',
    viewColor: '#F0535312',
    textcolor: '#F05353',
  },
  {
    id: '9',
    title: 'Electrical Wiring',
    paymentStatus: 'Draft',
    company: 'GreenTech Ltd.',
    type: 'Invoice: ',
    typeValue: 'INV-2025-001',
    price: '£649.80',
    date: '23/04/2026',
    viewColor: '#FFC81412',
    textcolor: '#FFC814',
  },
];
