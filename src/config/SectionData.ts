

export interface SectionTabData {
    id: string;
    heading: string;
    orderNumber: number;
    summury: string;
}

export const DATA: SectionTabData[] = [
  {
    id: '1',
    heading: 'Deposits',
    orderNumber: 1,
    summury:
      'To proceed, a deposit of $200 is required. Once the deposit is received, I’ll schedule the work at your convenience.',
  },
  {
    id: '2',
    heading: 'Quote Summary',
    orderNumber: 2,
    summury:
      '1. Emergency Leak Repair. Located under the kitchen sink — replaced damaged T-joint and resealed all fittings. Materials Use...',
  },
  {
    id: '3',
    heading: 'About Us',
    orderNumber: 3,
    summury:
      'Alpha Renovates Pvt. Ltd. has been providing reliable, professional plumbing solutions across Brighton and surrounding areas since 2015. Our team of certified...',
  },
  
];