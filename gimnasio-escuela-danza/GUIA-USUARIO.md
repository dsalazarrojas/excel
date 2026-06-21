# Guía de Usuario — Gimnasio & Escuela de Danza

**Versión:** 1.0 · **Archivo:** `gimnasio-danza.xlsm`
**Requisito:** Microsoft Excel 2016 o superior con macros habilitadas

> Esta guía está escrita para el **operador del sistema**: la persona que registra
> clientes, cobros y asistencias todos los días. No necesitas saber nada de macros
> ni de programación.

---

## Tabla de contenidos

1. [Cómo abrir el sistema por primera vez](#1-cómo-abrir-el-sistema-por-primera-vez)
2. [Mapa de hojas](#2-mapa-de-hojas)
3. [Operaciones del día a día](#3-operaciones-del-día-a-día)
   - [3.1 Registrar un cliente nuevo](#31-registrar-un-cliente-nuevo)
   - [3.2 Crear un plan / membresía](#32-crear-un-plan--membresía)
   - [3.3 Inscribir a un cliente en un plan](#33-inscribir-a-un-cliente-en-un-plan)
   - [3.4 Registrar un pago](#34-registrar-un-pago)
   - [3.5 Agregar una clase al catálogo](#35-agregar-una-clase-al-catálogo)
   - [3.6 Registrar asistencia a una clase](#36-registrar-asistencia-a-una-clase)
   - [3.7 Editar o eliminar un registro](#37-editar-o-eliminar-un-registro)
4. [Reportes](#4-reportes)
5. [Buenas prácticas](#5-buenas-prácticas)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Cómo abrir el sistema por primera vez

### Windows

1. Descarga y abre `gimnasio-danza.xlsm` (doble click).
2. Si aparece la **barra amarilla**: *"Advertencia de seguridad: las macros se han deshabilitado"* → click en **Habilitar contenido**.
3. Si la barra no aparece: click derecho sobre el archivo → **Propiedades** → marca **Desbloquear** → **Aceptar** → vuelve a abrir.

### macOS

1. Abre `gimnasio-danza.xlsm` desde Finder.
2. Aparece el diálogo *"¿Habilitar macros?"* → click en **Habilitar macros**.

### Verificar que todo funciona

1. Debes ver la hoja **Home** con el título "GimnasioDanza" y conteos por módulo.
2. Si los conteos muestran números (aunque sean 0), el sistema está listo.

---

## 2. Mapa de hojas

### Hojas de datos (las que usas todos los días)

| Hoja | Qué hace |
|------|----------|
| `Home` | Índice: links a todos los módulos y reportes con conteos vivos |
| `Dashboard` | Resumen de registros por entidad con gráfico |
| `Clientes` | Catálogo de clientes con datos de contacto |
| `Planes` | Tipos de membresía disponibles (Gym, Danza, Combo, etc.) |
| `Inscripciones` | Membresías activas e históricas por cliente |
| `Pagos` | Historial de todos los cobros |
| `Clases` | Catálogo de clases con horario, instructor y capacidad |
| `Asistencias` | Registro de asistencia por clase y fecha |
| `Profesores` | Datos de instructores |

### Hojas de reportes (Power Query — actualizables)

| Hoja | Qué muestra |
|------|-------------|
| Asistencias por Clase | Asistencias con datos de clase, profesor y cliente |
| Clases (Activas Inactivas) | Todas las clases con estado calculado |
| Clases por Profesor | Agrupación de clases por instructor |
| Clientes por Estado | Clientes con conteo de inscripciones activas |
| Clientes — Retención | Clientes con inscripciones y asistencias para análisis de retención |
| Ingresos por Concepto | Pagos con cliente, plan y concepto |
| Ingresos por Mes | Pagos agrupados por mes |
| Inscripciones por Plan | Inscripciones con cliente y plan |
| Membresías con Saldo Pendiente | Inscripciones activas con saldo = precio - pagado |
| Membresías Vencidas y Por Vencer | Membresías vencidas o que vencen en los próximos 3 días |
| Pagos por Método | Pagos agrupados por método de pago |

> Los reportes se actualizan con el botón **↻ Refresh** en cada hoja, o con
> **Refresh All** en el panel flotante del Home.

---

## 3. Operaciones del día a día

> **Regla general:** usa siempre los botones **New / Edit / Delete** del panel
> CRUD (esquina superior derecha de cada hoja de datos). Evita editar celdas
> directamente para no romper las fórmulas de lookup.

### 3.1 Registrar un cliente nuevo

1. Ve a la hoja **`Clientes`**.
2. Click en **New** (panel superior derecho).
3. Llena el formulario:
   - **Código:** identificador único, ej. `CLI-007`.
   - **Nombre completo.**
   - **Teléfono / Email.**
   - **Fecha de nacimiento** (formato `dd/mm/yyyy`).
   - **Estado:** `Activo`.
4. Click en **Save**.

> El cliente ahora aparece disponible en los dropdowns de Inscripciones y Pagos.

### 3.2 Crear un plan / membresía

1. Ve a la hoja **`Planes`**.
2. Click en **New**.
3. Llena:
   - **Código:** ej. `PLAN-GYM-MES`.
   - **Nombre:** ej. "Gimnasio mensual".
   - **Tipo:** Gym / Danza / Combo.
   - **Precio.**
   - **Duración en días:** 30 para mensual, 90 para trimestral.
4. Click en **Save**.

### 3.3 Inscribir a un cliente en un plan

1. Ve a **`Inscripciones`**.
2. Click en **New**.
3. Llena:
   - **Cliente:** selecciona del dropdown.
   - **Plan:** selecciona del dropdown.
   - **Fecha inicio** (hoy, formato `dd/mm/yyyy`).
   - **Fecha fin:** fecha inicio + duración del plan.
   - **Estado:** `Activa`.
   - **Precio:** se pre-llena del plan seleccionado.
   - **Pagado:** el monto ya cobrado (puede ser parcial).
4. Click en **Save**.

> Revisa el reporte **Membresías con Saldo Pendiente** para identificar clientes
> con pagos incompletos.

### 3.4 Registrar un pago

1. Ve a **`Pagos`**.
2. Click en **New**.
3. Llena:
   - **Cliente:** dropdown.
   - **Plan / Inscripción:** dropdown (vincula el pago a la membresía).
   - **Fecha** (formato `dd/mm/yyyy`).
   - **Monto.**
   - **Método:** Efectivo / Transferencia / Tarjeta / Otro.
   - **Concepto:** ej. "Mensualidad junio 2026".
4. Click en **Save**.

### 3.5 Agregar una clase al catálogo

1. Ve a **`Clases`**.
2. Click en **New**.
3. Llena:
   - **Nombre:** ej. "Yoga Matutino".
   - **Profesor:** dropdown (debe existir en `Profesores` primero).
   - **Especialidad / Tipo:** Gimnasio / Danza / Pilates / Yoga / etc.
   - **Horario:** ej. "Lun-Mié-Vie 07:00".
   - **Capacidad máxima:** número de personas.
   - **Estado:** `Activa`.
4. Click en **Save**.

### 3.6 Registrar asistencia a una clase

1. Ve a **`Asistencias`**.
2. Click en **New** por cada asistente.
3. Llena:
   - **Fecha** (formato `dd/mm/yyyy`).
   - **Clase:** dropdown.
   - **Cliente:** dropdown.
4. Click en **Save**.

### 3.7 Editar o eliminar un registro

- **Editar:** selecciona la fila en la tabla → click en **Edit** → modifica → **Save**.
- **Eliminar:** selecciona la fila → click en **Delete** → confirma.

> **Precaución:** no elimines clientes o planes que tengan inscripciones o pagos
> relacionados — el sistema no elimina en cascada y quedarán referencias huérfanas.

---

## 4. Reportes

### Actualizar un reporte

Cada hoja de reporte tiene un botón **↻ Refresh** visible en la parte superior. Click en él para recalcular con los datos actuales.

### Reportes clave para el día a día

| Reporte | Cuándo usarlo |
|---------|---------------|
| **Membresías por Vencer** | Cada semana — contactar clientes antes del vencimiento |
| **Membresías con Saldo Pendiente** | Inicio de mes — gestionar cobranza |
| **Ingresos por Mes** | Cierre mensual — comparar períodos |
| **Clientes — Retención** | Mensual — identificar clientes que no han asistido |
| **Clases (Activas/Inactivas)** | Verificar catálogo vigente |

### Filtros y exportación

- Todos los reportes tienen **autofiltros** en los encabezados.
- Para exportar a PDF: `Archivo → Imprimir → Guardar como PDF`.
- Para copiar datos a otro sistema: selecciona la tabla y pega como valores.

---

## 5. Buenas prácticas

### Respaldo diario

Antes de empezar a trabajar, haz una copia:
- Nombre sugerido: `gimnasio-danza_YYYY-MM-DD.xlsm`
- Guárdala en Google Drive, OneDrive o carpeta de red

### Convención de códigos

| Entidad | Prefijo | Ejemplo |
|---------|---------|---------|
| Clientes | `CLI-` | `CLI-007` |
| Planes | `PLAN-` | `PLAN-GYM-MES` |
| Clases | `CLS-` | `CLS-003` |
| Profesores | `PROF-` | `PROF-002` |

### Cierre mensual

1. Actualiza todos los reportes (Refresh en cada hoja).
2. Revisa **Membresías con Saldo Pendiente** y gestiona cobranzas.
3. Revisa **Membresías por Vencer** (próximas y vencidas).
4. Revisa **Ingresos por Mes** para el mes que cierra.
5. Haz respaldo del archivo con la fecha del cierre.

---

## 6. Troubleshooting

### "Los botones New/Edit/Delete no aparecen"

**Causa:** macros no habilitadas o archivo bloqueado.

**Solución:**
1. Cierra el archivo.
2. En Windows: click derecho → Propiedades → marca **Desbloquear** → Aceptar.
3. Vuelve a abrir y habilita macros.

### "El dropdown de un campo está vacío"

**Causa:** la tabla de referencia no tiene registros aún.

**Solución:** crea primero el registro en la tabla de referencia (ej. da de alta al profesor antes de crear la clase).

### "El reporte no se actualiza con Refresh"

**Causa:** Power Query puede requerir permiso de privacidad.

**Solución:**
1. Ve a `Datos → Consultas y conexiones`.
2. Si aparece advertencia de privacidad → selecciona **Ignorar niveles de privacidad**.
3. Vuelve a intentar el Refresh.

### "Excel muestra #REF! o #N/A en celdas"

**Causa:** se eliminó o renombró una tabla que otras celdas referenciaban.

**Solución:** restaura desde el último respaldo. Identifica la celda con error y verifica que la tabla referenciada exista con el nombre original.

---

**¿Dudas o errores?** Proporciona:
1. Captura de pantalla del error.
2. Pasos para reproducirlo.
3. Versión de Excel (`Archivo → Cuenta → Acerca de Excel`).
