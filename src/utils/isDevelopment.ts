export default function isDevelopment() {
  const nodeEnv = process.env.NODE_ENV;
  const isDev = nodeEnv && nodeEnv.toUpperCase() === 'DEVELOPMENT';
  console.log('isDevelopment = ', isDev);
  return isDev;
}
