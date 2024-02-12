export function getRandomString(length: number): string {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  const charLength = chars.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

export function getRandomNumber(length: number): number {
  let digits = '0123456789';
  const digitsLength = digits.length;
  let result = '';
  for (let i = 0; i < length; ++i) {
    result += digits.charAt(Math.floor(Math.random() * digitsLength));
  }
  return +result;
}
