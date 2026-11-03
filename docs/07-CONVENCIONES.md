# 07 · Convenciones

> ¿Cómo escribimos el código?

## Idioma

- **Dominio del negocio en español:** `empresa`, `sucursal`, `plan`, `complemento`.
- **Términos técnicos en inglés**, como los nombra cada framework: `Controller`, `Service`, `Component`, `Guard`.
- **Comentarios y mensajes de commit:** en español.
- **Textos de la interfaz:** en español rioplatense, con el tono de `IDENTIDAD-MARCA.md`.

## Nombres en el frontend (Angular)

| Elemento | Formato | Ejemplo |
| --- | --- | --- |
| Archivo | kebab-case con sufijo | `tarjeta-empresa.component.ts` |
| Clase de componente | PascalCase | `TarjetaEmpresaComponent` |
| Selector | prefijo `wl-` | `<wl-tarjeta-empresa>` |
| Servicio | PascalCase + `Service` | `EmpresasService` |
| Variable y función | camelCase | `empresaActiva`, `abrirApp()` |
| Constante | MAYÚSCULAS_CON_GUION | `TIEMPO_MAXIMO_ESPERA` |
| Clase CSS | kebab-case | `.boton-primario` |

## Nombres en el backend (Laravel)

| Elemento | Formato | Ejemplo |
| --- | --- | --- |
| Modelo | PascalCase singular | `Empresa` |
| Controlador | PascalCase + `Controller` | `EmpresaController` |
| Validación | PascalCase + `Request` | `CrearEmpresaRequest` |
| Tabla | snake_case plural | `accesos_compartidos` |
| Columna | snake_case | `empresa_id`, `vence_el` |
| Ruta de la API | kebab-case plural | `/api/empresas/{id}/sucursales` |

## Reglas de código

- Un componente, una responsabilidad. Si supera las 200 líneas, se divide.
- Los componentes no llaman a la API: lo hacen los servicios.
- Los controladores no tienen lógica de negocio: la delegan en `Services/`.
- TypeScript en modo estricto; no se usa `any`.
- Ningún color ni tamaño se escribe a mano: se usan las variables CSS.

```ts
// Bien: el componente pide los datos a un servicio
export class MisEmpresasComponent {
  private empresasService = inject(EmpresasService);
  empresas = this.empresasService.listar();
}
```

```php
// Bien: el controlador valida, delega y responde
public function store(CrearEmpresaRequest $request, EmpresaService $servicio)
{
    $empresa = $servicio->crear($request->user(), $request->validated());

    return response()->json($empresa, 201);
}
```

## Formato

- Sangría de 2 espacios en TypeScript, HTML y CSS; de 4 en PHP.
- Comillas simples en TypeScript.
- Punto y coma al final de cada sentencia.
- Línea de 100 caracteres como máximo.

## Commits

Formato: `tipo(alcance): descripción en minúsculas y en presente`

| Tipo | Cuándo se usa | Ejemplo |
| --- | --- | --- |
| `agrega` | Funcionalidad nueva | `agrega(cliente): alta de sucursales` |
| `corrige` | Arreglo de un error | `corrige(api): filtro por sucursal en listado` |
| `mejora` | Cambio que no agrega funciones | `mejora(wcc): vista previa de colores` |
| `docs` | Cambios en la documentación | `docs: actualiza 08-TAREAS` |

- Un commit, un cambio. No se mezclan arreglos con funciones nuevas.
- Nunca se incluye el archivo `.env` ni ningún dato real de clientes.

## Ramas

- `principal`: lo que está publicado.
- `desarrollo`: lo que se está probando.
- `tarea/nombre-corto`: una rama por cada tarea de `08-TAREAS.md`.
