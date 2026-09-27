const EMAIL_PATTERN = /@/;

export function validateCredentials(
  email: string,
  password: string,
): string | null {
  if (!email.trim() || !EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  return null;
}

export function validateSignup(
  name: string,
  email: string,
  password: string,
): string | null {
  if (!name.trim()) return "Enter your name.";
  return validateCredentials(email, password);
}
