# Spec 002 · Planes y precios

> Fase 1 · Cubre **RF23** · Estado: aprobada tras clarificación (2026-11-03)

## Contexto

Los planes de WillaLogic están dolarizados, pero el comerciante piensa en pesos. La página de planes muestra cada plan con su precio en dólares, el equivalente aproximado en pesos según la cotización guardada en la instantánea, sus límites (sucursales, usuarios, soporte) y las apps que incluye. Datos: `public/data/planes.json` y `public/data/apps.json`.

## Historias de usuario

- **HU-002-1.** Como dueño de un comercio, quiero ver cuánto cuesta cada plan en pesos, para saber si me entra en el presupuesto.
- **HU-002-2.** Como responsable de un municipio, quiero comparar límites de sucursales y usuarios, para elegir el plan que alcanza a toda la organización.
- **HU-002-3.** Como interesado, quiero ver qué apps incluye cada plan, para no pagar por algo que no uso.

## Requisitos (EARS)

| ID | Requisito |
| --- | --- |
| RF-002-01 | El sistema deberá mostrar, en la ruta `/planes`, una tarjeta por cada plan de `planes.json`, con nombre, descripción y tipo. |
| RF-002-02 | El sistema deberá mostrar el precio mensual en dólares con el formato «USD 25 / mes». |
| RF-002-03 | El sistema deberá mostrar el precio aproximado en pesos, calculado como precio en dólares × cotización y redondeado al peso, con punto como separador de miles (por ejemplo, «≈ $39.125 / mes»). |
| RF-002-04 | El sistema deberá indicar la fecha de la cotización usada, con el texto «Cotización del [fecha]. El precio final se calcula el día del pago.». |
| RF-002-05 | El sistema deberá mostrar, por plan, la cantidad máxima de sucursales, de usuarios y el tipo de soporte. |
| RF-002-06 | El sistema deberá mostrar los íconos y nombres de las apps incluidas en cada plan, tomando los datos de `apps.json` por su uuid. |
| RF-002-07 | Si el uuid de una app incluida no existe en `apps.json`, entonces el sistema deberá omitirla sin romper la tarjeta. |
| RF-002-08 | El sistema deberá destacar visualmente el plan marcado como recomendado (Plan Escala) con la etiqueta «Recomendado». |
| RF-002-09 | Cuando el usuario elige «Quiero este plan», el sistema deberá llevarlo a la consulta (`/consulta`) con el plan ya elegido. |
| RF-002-10 | Si los datos no se pueden cargar, entonces el sistema deberá mostrar «No pudimos cargar los planes. Recargá la página.». |

## Casos límite

- Precio con decimales en la API ("13.00") → se muestra "USD 13".
- Plan con 40 sucursales y 200 usuarios (E-Gov) → los números no rompen la tarjeta.
- Cotización ausente o cero → no se muestra el precio en pesos, solo en dólares.
- En 360 px las tarjetas se apilan; en escritorio, 3 columnas.

## Fuera de alcance

- Contratar o pagar un plan (es del panel privado).
- Complementos y precio por app individual.
- Cotización en vivo.

## Criterios de finalización

- [ ] Los 10 requisitos ✅ o 🖐 verificada.
- [ ] Tests de `precioEnPesos()` y de formato en verde.
- [ ] El precio en pesos de cada plan coincide con la cuenta manual.
- [ ] Build sin errores; sin colores a mano.
