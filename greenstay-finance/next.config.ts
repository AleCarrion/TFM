import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  redirects: async () => [
    { source: '/', destination: '/es', permanent: false }
  ]
};

export default withNextIntl(nextConfig);
