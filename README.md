# Reservas MeTransfers - Complete Booking Plugin v6

Sistema avanzado de reservas de traslados y gestión de hoteles para WordPress.

## Características Principales

### 1. Sistema de Reservas de Traslados (Core)
- **Calculadora de Tarifas**: Cálculo automático de precios basado en distancia (Google Maps API) y tipo de vehículo.
- **Flujo de Reserva**: Paso a paso (Ruta -> Vehículo -> Datos -> Pago).
- **Vehículos**: Gestión de flota con precios personalizados, capacidad de equipaje y pasajeros.
- **Pagos**: Integración flexible con Stripe y WooCommerce.
- **Panel de Administración**: Gestión completa de reservas, estados, notificaciones por email y WhatsApp.

### 2. Módulo de Hoteles QR (Nuevo ⭐)
Una interfaz especializada diseñada para la recepción de hoteles y escaneo de códigos QR.

- **Diseño Premium**: Interfaz moderna en modo oscuro (Azul/Naranja) para una experiencia de usuario superior.
- **Flujo Simplificado**:
    - Selección rápida de vehículo: **Sedan (hasta 4 pax)** o **Minivan (hasta 7-8 pax)**.
    - **Geolocalización Inteligente**: Restricción de direcciones a Cataluña, con autocompletado de Google Maps optimizado.
    - **Cálculo de Rutas**: Detección automática de "Desde el Hotel" o "Hacia el Hotel".
- **Integración de Pagos Directa**: Conexión directa con la pasarela **Redsys (Getnet/Santander)** sin pasar por WooCommerce, agilizando el proceso en recepción.
- **Dashboard Específico**: Panel de administración separado ("Hoteles QR") con diseño limpio, sin emojis y estados claros.

## Instalación

1.  Subir la carpeta del plugin al directorio `/wp-content/plugins/` de WordPress.
2.  Activar el plugin "MeTransfers Booking" desde el panel de administración.
3.  Configurar las claves de API:
    - **Google Maps**: Places, Directions, Distance Matrix APIs.
    - **Stripe / Redsys**: Claves de entorno de pruebas o producción.

## Uso

### Shortcodes

- **Formulario General (Traslados)**:
  ```
  [wptb_booking_form]
  ```

- **Formulario Hotel QR (Especializado)**:
  ```
  [hqp_booking_form]
  ```
  *Este formulario detecta automáticamente el token del hotel si se pasa por URL (ej: `?promo=TOKEN_HOTEL`).*

## Estructura del Proyecto

- `/modules/booking/`: Núcleo del sistema de reservas general.
- `/modules/hotel/`: Módulo independiente para la funcionalidad de Hoteles QR.
- `/assets/`: Recursos estáticos (CSS, JS, Imágenes).
- `/includes/`: Clases PHP auxiliares e integraciones de terceros.

## Créditos

Desarrollado para **MeTransfers**.
