"use client";

import { useTranslations } from "next-intl";
import { HotelEntryForm } from "@/components/hotel-entry-form";

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] px-4 py-8 bg-background">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Form */}
        <div>
          <HotelEntryForm />
        </div>
      </div>
    </div>
  );
}
