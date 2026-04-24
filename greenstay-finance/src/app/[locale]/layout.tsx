import { Navbar } from "@/components/navbar";
import { I18nProvider } from "@/components/i18n-provider";
import messagesES from "../../../messages/es.json";
import messagesEN from "../../../messages/en.json";

type Locale = "es" | "en";

const messages: Record<Locale, typeof messagesES> = {
  es: messagesES,
  en: messagesEN,
};

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeMessages = messages[locale as Locale] || messages.es;

  return (
    <I18nProvider locale={locale} messages={localeMessages}>
      <div>
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
    </I18nProvider>
  );
}
