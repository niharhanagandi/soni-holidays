export function isIndianPhone(phone: string): boolean {
  return /^(\+?91[\s-]?)?\d{10}$/.test(phone);
}