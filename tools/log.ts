export function debugLog(...args: any[]) {
  console.log(`%c Themis Tools`, `font-size: 16px; color: #4169e1;`, ...args);
}

export function logError(...args: any[]) {
  console.log(`%c Themis Tools`, `font-size: 16px; color: #b22222;`, ...args);
}
