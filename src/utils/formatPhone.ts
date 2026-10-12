export const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');

  // Remove 44 if already present
  const number = digits.startsWith('44') ? digits.slice(2) : digits;

  return `+44${number}`;
};
