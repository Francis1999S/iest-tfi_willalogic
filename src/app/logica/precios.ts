/** Precio aproximado en pesos, redondeado al peso. Sin cotización válida devuelve null. */
export function precioEnPesos(usd: number, cotizacion: number | null | undefined): number | null {
  if (!cotizacion || cotizacion <= 0) {
    return null;
  }
  return Math.round(usd * cotizacion);
}

/** 39125 → "$39.125" (punto para miles, como en es-AR). */
export function formatoPesos(pesos: number): string {
  return `$${pesos.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`;
}

/** 13 → "USD 13"; 13.5 → "USD 13,5". */
export function formatoUsd(usd: number): string {
  return `USD ${usd.toLocaleString('es-AR', { maximumFractionDigits: 2 })}`;
}
