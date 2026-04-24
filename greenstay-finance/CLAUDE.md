@AGENTS.md

# GreenStay Finance — Contexto del proyecto

## Reglas de comportamiento (token-efficient)
- NUNCA uses aperturas como "¡Claro!", "¡Por supuesto!", "¡Genial!"
- NUNCA reescribas un fichero entero para hacer un cambio pequeño — usa ediciones quirúrgicas
- NUNCA añadas sugerencias no solicitadas al final de tu respuesta
- NUNCA hagas resúmenes de lo que acabas de hacer
- LEE siempre los ficheros existentes antes de escribir código nuevo
- PIENSA antes de actuar — si hay dudas, pregunta una sola cosa concreta
- Commits en inglés, mensajes descriptivos

## Qué es este proyecto
App web para gestores de hoteles 3-5 estrellas que simula el impacto financiero de obtener múltiples certificaciones de sostenibilidad turística simultáneas.

## Stack
- Next.js 15 + TypeScript
- Tailwind CSS + shadcn/ui
- Chart.js + react-chartjs-2
- next-intl (i18n: español + inglés)
- Ruflo (claude-flow) para orquestación multi-agente
- Magic UI MCP para componentes visuales
- Sin base de datos ni autenticación — toda la lógica en cliente

## Diseño visual
- Estilo: natural y sostenible
- Color primario: verde #2D6A4F
- Color secundario: verde claro #74C69D
- Fondo claro: beige #F8F5F0
- Fondo oscuro: #0F1A14
- Texto claro: #1B2E22 | Texto oscuro: #E8F5E9
- Alerta: #F4A261 | Peligro: #E63946
- Tipografía: Inter
- Toggle claro/oscuro persistente en localStorage
- Idiomas: ES / EN con selector en navbar

## Estructura de navegación
1. Pantalla de entrada → formulario datos del hotel
2. Panel principal con sidebar:
   - Certificaciones (selector cards + gestión fechas + estado renovación)
   - Dashboard financiero (KPIs + gráficas)
   - Navbar: toggle tema + selector idioma

## Inputs del formulario (Paso 1)
- Nombre del hotel, nº habitaciones, ADR actual (€)
- Tasa de ocupación (%), superficie (m²)
- Consumo energía (kWh/año), consumo agua (m³/año)
- Precio kWh (defecto 0,18€), precio m³ agua (defecto 2,00€)

## Certificaciones (Paso 2)
8 certificaciones con cards interactivas multi-selección.
Al activar una → modal para introducir fecha de obtención.
Vigencia: 3 años. Badge estado: verde >12m | amarillo 3-12m | rojo <3m.

| Certificación | Energía | Agua | Prima ADR | Coste |
|---|---|---|---|---|
| Biosphere | 15-20% | 15-20% | +5% | 2.000-5.000€ |
| Green Key | 20-25% | 20-30% | +3-5% | 500-1.500€ |
| Travelife Gold | 10-15% | 10-15% | +3% | 800-2.000€ |
| GSTC Certified | 10-20% | 10-20% | +5% | 3.000-8.000€ |
| Green Globe | 15-25% | 15-25% | +4% | 1.500-4.000€ |
| EarthCheck | 20-30% | 20-30% | +5% | 5.000-15.000€ |
| EU Ecolabel | 20-30% | 25-35% | +4% | 1.000-3.000€ |
| GreenSign | 15-20% | 10-15% | +3% | 1.000-2.500€ |

## Motor de cálculo (Paso 3)
- Ahorro energía (€/año) = consumo_kwh × precio_kwh × MAX(% ahorro energía certificaciones activas)
- Ahorro agua (€/año) = consumo_m3 × precio_m3 × MAX(% ahorro agua certificaciones activas)
- NUNCA sumar porcentajes entre certificaciones — aplicar siempre el MÁXIMO
- Prima ADR: usar el valor medio del rango de cada certificación, aplicar el máximo entre las activas
- Ingresos base = habitaciones × ADR × ocupación × 365
- Ingresos nuevos = habitaciones × (ADR × (1 + prima_ADR)) × (ocupación + 0.025) × 365
- Incremento ingresos = ingresos nuevos - ingresos base
- Coste certificación = suma de valores medios de todas las certificaciones activas
- Payback (años) = coste_total / (ahorro_anual + incremento_ingresos)
- VAN 10 años = Σ (flujo_año_n / (1+r)^n) - inversión_inicial | r defecto 5% ajustable
- ROI global (%) = ((VAN + inversión) / inversión - 1) × 100
- Financiación verde: si activa Green Key, EU Ecolabel o Biosphere → elegible ICO Sostenible (-0,25% a -0,50% tipo interés)

## Dashboard (Paso 4)
- KPIs: payback, VAN, ROI, ahorro anual total
- Gráfica línea: inversión acumulada vs retorno acumulado año a año (10 años)
- Gráfica barras: desglose ahorro por categoría (energía, agua, ingresos)
- Comparativa ADR y RevPAR antes/después
- RevPAR = ADR × ocupación

## Fases de desarrollo
1. ✅ Setup + CLAUDE.md + estructura proyecto + git
2. Formulario entrada datos del hotel
3. Selector certificaciones (cards interactivas)
4. Motor de cálculo (TypeScript puro, testeable)
5. Dashboard resultados (Chart.js)
6. (Opcional) Exportación PDF
