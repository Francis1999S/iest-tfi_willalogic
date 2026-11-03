# 10 · Seguridad

> ¿Cómo protegemos datos y sistema?

> Este archivo describe **criterios**, no la configuración real del servidor. No incluye direcciones, puertos, claves ni valores de producción.

## Datos sensibles

| Dato | Dónde vive | Cómo se protege |
| --- | --- | --- |
| Contraseñas | Base de datos | Cifradas con un algoritmo de una sola vía; nunca en texto plano |
| Sesión | Cookie del navegador | Marcada como `HttpOnly`, `Secure` y `SameSite`; vence a los 2 días |
| Códigos de verificación | Base de datos | Un solo uso y vencimiento a los pocos minutos |
| Datos de cada empresa | Base de datos | Filtro obligatorio por empresa y sucursal |
| Claves de servicios externos | Archivo `.env` del servidor | Nunca en el código ni en el repositorio |
| Código fuente | Repositorio privado propio | No se aloja en plataformas públicas |

## Capas de protección

### 1. Ingreso

- **Verificación por email:** una cuenta no se activa hasta ingresar el código recibido.
- **Verificación anti-robots:** reCAPTCHA en el inicio de sesión y en el registro.
- **Mensajes genéricos:** ante un error se responde "email o contraseña incorrectos", sin aclarar cuál de los dos falló.

### 2. Sesión

- **Laravel Sanctum con cookies:** la sesión viaja en una cookie que JavaScript no puede leer.
- **Mismo dominio:** frontends y API comparten dominio, así que la cookie no se expone a otros sitios.
- **Token XSRF:** cada petición que modifica datos lleva un token que el backend verifica, para frenar pedidos falsificados desde otra página.
- **Vencimiento:** la sesión se cierra sola a los 2 días.

### 3. Acceso a las aplicaciones

- La app cliente pide un **pase de acceso** para una empresa, sucursal y aplicación concretas.
- El pase es de **un solo uso** y vence en **10 segundos**.
- Si alguien copia el enlace, cuando lo quiera usar ya no sirve.

### 4. Aislamiento de datos

- El backend agrega el filtro de empresa y sucursal a **todas** las consultas.
- El frontend nunca envía "mostrame los datos de la empresa 7": el backend deduce el contexto de la sesión.
- Antes de responder, se verifica que la persona sea dueña o tenga un acceso compartido vigente.

### 5. Límite de peticiones

- **Todas** las rutas de la API tienen un máximo de peticiones por minuto.
- Las rutas de ingreso, registro y envío de códigos tienen un límite más estricto.
- Al superarlo, el backend responde con el código `429` y pide esperar.

### 6. Identificadores

- Cada registro tiene un `id` numérico y un `uuid`.
- El `id` se usa **solo dentro del backend** y nunca aparece en una respuesta ni en una dirección web.
- Al navegador solo llega el `uuid`, que no permite adivinar cuántos registros hay ni cuál es el siguiente.

### 7. Servidor

- Copias de seguridad automáticas de la base de datos.
- Escáner de software malicioso en funcionamiento permanente.
- Se prevé sumar una capa de protección integral del servidor.

### 8. Detección de uso indebido

- El sistema registra los intentos fallidos y los accesos fuera de lo habitual.
- Existen mecanismos de detección que no se documentan en este archivo.

## Variables de entorno

Ejemplo de `backend/.env.example`. Este archivo **sí** se versiona, sin valores reales:

```bash
APP_ENV=production
APP_DEBUG=false
APP_KEY=

DB_CONNECTION=mysql
DB_HOST=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

SESSION_DRIVER=cookie
SESSION_LIFETIME=2880        # minutos = 2 días
SANCTUM_STATEFUL_DOMAINS=

RECAPTCHA_SECRET=
MAIL_PASSWORD=
```

El archivo `.env` con los valores reales figura en `.gitignore` y nunca sale del servidor.

## Validaciones

Todo dato se valida **en el backend**, aunque el formulario ya lo haya validado: el navegador se puede manipular.

```php
// CrearEmpresaRequest.php
public function rules(): array
{
    return [
        'nombre'  => ['required', 'string', 'min:3', 'max:120'],
        'tipo'    => ['required', 'in:privada,publica'],
        'plan_id' => ['required', 'integer', 'exists:planes,id'],
    ];
}
```

Consultas siempre con parámetros, nunca armando el texto a mano:

```php
// ✕ MAL: pega el texto en la consulta
DB::select("SELECT * FROM empresas WHERE nombre = '" . $nombre . "'");

// ✓ BIEN: el valor viaja como parámetro
Empresa::where('nombre', $nombre)->get();
```

En el frontend, Angular escapa el contenido por defecto. No se usa `innerHTML` ni `bypassSecurityTrustHtml` con datos escritos por usuarios.

## Qué nunca debe llegar al navegador

- Contraseñas, ni siquiera cifradas.
- Claves secretas de reCAPTCHA, del correo o de la base de datos.
- El contenido del archivo `.env`.
- Datos de empresas o sucursales distintas de la activa.
- Mensajes de error técnicos (consultas, rutas de archivos, trazas): `APP_DEBUG` siempre en `false`.
- Identificadores numéricos internos (`id`): hacia afuera solo viaja el `uuid`.

Lo que **sí** puede estar en el navegador: la clave pública de reCAPTCHA y el identificador público de cada aplicación. Son datos pensados para ser visibles y no dan acceso a nada por sí solos.

## Lista de control antes de publicar

- [ ] HTTPS activo y redirección desde HTTP
- [ ] `APP_DEBUG=false` en producción
- [ ] Archivo `.env` fuera del repositorio
- [ ] Cookies con `HttpOnly`, `Secure` y `SameSite`
- [ ] Límite de peticiones en todas las rutas
- [ ] Probado: una empresa no puede ver datos de otra
- [ ] Probado: un operador no puede cambiar el plan
- [ ] Probado: un pase de acceso vencido se rechaza
- [ ] Probado: ninguna respuesta de la API incluye un `id` interno
- [ ] Copia de seguridad de la base de datos programada y restauración probada
- [ ] Escáner de software malicioso activo
