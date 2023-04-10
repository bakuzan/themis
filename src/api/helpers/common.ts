export const isNullOrEmpty = (s: string) => !s || !s.trim();

export const getCurrentTimestamp = () => new Date().toISOString();
