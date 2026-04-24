import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale || 'es';
  const messages = (await import(`./messages/${safeLocale}.json`)).default;
  return {
    locale: safeLocale,
    messages,
  };
});
