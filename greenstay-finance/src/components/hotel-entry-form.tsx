"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  hotelName: string;
  rooms: number;
  area: number;
  adr: number;
  occupancy: number;
  energyKwh: number;
  waterM3: number;
  priceKwh: number;
  priceWater: number;
}

interface FormErrors {
  hotelName?: string;
  rooms?: string;
  area?: string;
  adr?: string;
  occupancy?: string;
  energyKwh?: string;
  waterM3?: string;
}

export function HotelEntryForm() {
  const t = useTranslations();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    hotelName: "",
    rooms: 0,
    area: 0,
    adr: 120,
    occupancy: 65,
    energyKwh: 0,
    waterM3: 0,
    priceKwh: 0.18,
    priceWater: 2.0,
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.hotelName.trim()) {
      newErrors.hotelName = t("errors.hotelName");
    }

    if (!formData.rooms || formData.rooms <= 0) {
      newErrors.rooms = t("errors.rooms");
    }

    if (!formData.area || formData.area <= 0) {
      newErrors.area = t("errors.area");
    }

    if (!formData.adr || formData.adr <= 0) {
      newErrors.adr = t("errors.adr");
    }

    if (formData.occupancy < 0 || formData.occupancy > 100) {
      newErrors.occupancy = t("errors.occupancyRange");
    } else if (!formData.occupancy) {
      newErrors.occupancy = t("errors.occupancy");
    }

    if (!formData.energyKwh || formData.energyKwh <= 0) {
      newErrors.energyKwh = t("errors.energyKwh");
    }

    if (!formData.waterM3 || formData.waterM3 <= 0) {
      newErrors.waterM3 = t("errors.waterM3");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const numValue = type === "number" ? parseFloat(value) || 0 : value;

    setFormData((prev) => ({
      ...prev,
      [name]: numValue,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      localStorage.setItem("hotelData", JSON.stringify(formData));
      router.push("/panel");
    } catch (error) {
      console.error("Error saving data:", error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">{t("form.yourHotel")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tu hotel */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              {t("form.yourHotel")}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hotelName">{t("form.hotelName")}</Label>
                <Input
                  id="hotelName"
                  name="hotelName"
                  type="text"
                  placeholder={t("form.hotelNamePlaceholder")}
                  value={formData.hotelName}
                  onChange={handleChange}
                  className={errors.hotelName ? "border-destructive" : ""}
                />
                {errors.hotelName && (
                  <p className="text-sm text-destructive">{errors.hotelName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rooms">{t("form.rooms")}</Label>
                <Input
                  id="rooms"
                  name="rooms"
                  type="number"
                  placeholder={t("form.roomsPlaceholder")}
                  value={formData.rooms || ""}
                  onChange={handleChange}
                  className={errors.rooms ? "border-destructive" : ""}
                  min="0"
                />
                {errors.rooms && (
                  <p className="text-sm text-destructive">{errors.rooms}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">{t("form.area")}</Label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  placeholder={t("form.areaPlaceholder")}
                  value={formData.area || ""}
                  onChange={handleChange}
                  className={errors.area ? "border-destructive" : ""}
                  min="0"
                />
                {errors.area && (
                  <p className="text-sm text-destructive">{errors.area}</p>
                )}
              </div>
            </div>
          </div>

          {/* Métricas actuales */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              {t("form.currentMetrics")}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adr">{t("form.adr")}</Label>
                <Input
                  id="adr"
                  name="adr"
                  type="number"
                  placeholder={t("form.adrPlaceholder")}
                  value={formData.adr || ""}
                  onChange={handleChange}
                  className={errors.adr ? "border-destructive" : ""}
                  min="0"
                  step="0.01"
                />
                {errors.adr && (
                  <p className="text-sm text-destructive">{errors.adr}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupancy">{t("form.occupancy")}</Label>
                <Input
                  id="occupancy"
                  name="occupancy"
                  type="number"
                  placeholder={t("form.occupancyPlaceholder")}
                  value={formData.occupancy || ""}
                  onChange={handleChange}
                  className={errors.occupancy ? "border-destructive" : ""}
                  min="0"
                  max="100"
                  step="0.1"
                />
                {errors.occupancy && (
                  <p className="text-sm text-destructive">{errors.occupancy}</p>
                )}
              </div>
            </div>
          </div>

          {/* Consumos energéticos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              {t("form.energyConsumption")}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="energyKwh">{t("form.energyKwh")}</Label>
                <Input
                  id="energyKwh"
                  name="energyKwh"
                  type="number"
                  placeholder={t("form.energyKwhPlaceholder")}
                  value={formData.energyKwh || ""}
                  onChange={handleChange}
                  className={errors.energyKwh ? "border-destructive" : ""}
                  min="0"
                />
                {errors.energyKwh && (
                  <p className="text-sm text-destructive">{errors.energyKwh}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="waterM3">{t("form.waterM3")}</Label>
                <Input
                  id="waterM3"
                  name="waterM3"
                  type="number"
                  placeholder={t("form.waterM3Placeholder")}
                  value={formData.waterM3 || ""}
                  onChange={handleChange}
                  className={errors.waterM3 ? "border-destructive" : ""}
                  min="0"
                />
                {errors.waterM3 && (
                  <p className="text-sm text-destructive">{errors.waterM3}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceKwh">{t("form.priceKwh")}</Label>
                <Input
                  id="priceKwh"
                  name="priceKwh"
                  type="number"
                  placeholder={t("form.priceKwhPlaceholder")}
                  value={formData.priceKwh || ""}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceWater">{t("form.priceWater")}</Label>
                <Input
                  id="priceWater"
                  name="priceWater"
                  type="number"
                  placeholder={t("form.priceWaterPlaceholder")}
                  value={formData.priceWater || ""}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 h-auto text-base"
              disabled={isLoading}
            >
              {isLoading ? "..." : t("form.startSimulation")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
