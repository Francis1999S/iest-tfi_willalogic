# Tareas 002 · Planes y precios

- [x] **T1 · Funciones de precio (test primero).** `precioEnPesos`, `formatoPesos`, `formatoUsd`.
  *Listo cuando:* 25 × 1565 → «$39.125»; 13 → «USD 13»; cotización 0 → sin precio en pesos.
  *Commit:* `agrega(planes): cálculo y formato de precios`

- [x] **T2 · Apps de cada plan (test primero).** `appsDePlan(uuids, apps)`.
  *Listo cuando:* devuelve las apps en orden y omite uuids inexistentes.
  *Commit:* `agrega(planes): cruce de apps incluidas por plan`

- [x] **T3 · Servicio de planes.** Lee `planes.json`, convierte precios a número, expone cotización y fecha.
  *Listo cuando:* tests de conversión y de error en verde.
  *Commit:* `agrega(planes): servicio que lee la instantánea de planes`

- [x] **T4 · Tarjeta de plan.** Nombre, «Recomendado» en Plan Escala, USD, ≈ pesos, límites, íconos de apps, botón «Quiero este plan».
  *Listo cuando:* test que verifica «USD 25 / mes» y «≈ $39.125 / mes» en Plan Escala; no muestra `chatbot`.
  *Commit:* `agrega(planes): tarjeta de plan`

- [ ] **T5 · Página `/planes`.** Título, aviso de cotización con fecha, grilla 1 / 3 columnas, estado de error.
  *Listo cuando:* test que muestra 3 planes; se ve bien a 360 px.
  *Commit:* `agrega(planes): página de planes`

- [ ] **T6 · Verificación.** `/verificar 002-planes`.
  *Commit:* `docs(002): verificación de planes`
