# Excel Applications

Colección de aplicaciones desarrolladas en Microsoft Excel para resolver necesidades reales de negocio: captura de datos, reporteo y análisis. Cada aplicación es un archivo `.xlsm` autocontenido con macros VBA, listo para usar sin instalación adicional.

---

## Catálogo de aplicaciones

> El catálogo se irá completando conforme se publiquen nuevas aplicaciones.

| # | Aplicación | Categoría | Descripción |
|---|-----------|-----------|-------------|
| 1 | [Gimnasio & Escuela de Danza](./gimnasio-escuela-danza/) | Ingreso de datos · Reporteo | Gestión de clientes, membresías, pagos y asistencia a clases. 7 módulos + 11 reportes Power Query. |
| 2 | [Inventarios de Llantera + Conteo de Aceites](./inventarios-llantera/) | Ingreso de datos · Análisis | Control de inventario de llantas y aceites. Entradas, salidas, transferencias, conteos físicos, órdenes de compra y servicio. FIFO y trazabilidad DOT. |
| 3 | [Rotación de Personal](./rotacion-de-personal/) | Recursos Humanos | Aplicación Excel para registrar y controlar la rotación de empleados en una organización. |

---

## Estructura del repositorio

Cada aplicación vive en su propio directorio con la siguiente convención:

```
excel/
└── nombre-aplicacion/
    ├── README.md            # Portada: descripción, capturas, descarga rápida
    ├── GUIA-USUARIO.md      # Manual completo: casos de uso, troubleshooting
    ├── nombre-app.xlsm      # Archivo Excel con macros habilitadas
    └── screenshots/         # Capturas de pantalla de la aplicación
```

Los directorios pueden incluir archivos auxiliares (datos de ejemplo, scripts de generación, assets) que no forman parte de la distribución final pero sirven para instrumentar la documentación o reproducir el archivo publicado.

---

## Cómo usar una aplicación

1. Descarga el archivo `.xlsm` de la carpeta correspondiente.
2. Ábrelo en Microsoft Excel (se requiere Excel 2016 o superior).
3. Habilita las macros cuando Excel lo solicite.
4. Consulta el `README.md` de la aplicación para instrucciones específicas.

---

## Categorías

- **Ingreso de datos** — formularios y validaciones para captura estructurada
- **Reporteo** — generación automatizada de reportes y exportaciones
- **Análisis** — dashboards, tablas dinámicas y herramientas de análisis

---

## Contribuir

Si quieres proponer una nueva aplicación o reportar un problema, abre un [issue](../../issues) con la descripción del requerimiento.
