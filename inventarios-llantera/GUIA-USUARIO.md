# Guía de Usuario — Sistema de Inventarios de Llantera + Conteo de Aceites

**Versión:** 1.0 · **Archivo:** `llantera-aceites-inventario.xlsm`
**Requisito:** Microsoft Excel 2016 o superior con macros habilitadas · Fechas en formato `dd/mm/yyyy`

> Esta guía está escrita para el **operador del sistema**: la persona que usa el
> Excel todos los días. No necesitas saber nada de SQL, macros ni programación.

---

## Tabla de contenidos

1. [Cómo abrir el sistema por primera vez](#1-cómo-abrir-el-sistema-por-primera-vez)
2. [Mapa de hojas](#2-mapa-de-hojas)
3. [Operaciones del día a día](#3-operaciones-del-día-a-día)
   - [3.1 Recepción de mercancía (entrada)](#31-recepción-de-mercancía-entrada)
   - [3.2 Venta o servicio (salida)](#32-venta-o-servicio-salida)
   - [3.3 Conteo físico](#33-conteo-físico)
   - [3.4 Transferencia entre ubicaciones](#34-transferencia-entre-ubicaciones)
   - [3.5 Ajuste manual](#35-ajuste-manual)
   - [3.6 Orden de compra](#36-orden-de-compra)
   - [3.7 Orden de servicio](#37-orden-de-servicio)
   - [3.8 Alta de cliente y vehículo](#38-alta-de-cliente-y-vehículo)
   - [3.9 Alta de proveedor](#39-alta-de-proveedor)
   - [3.10 Alta de producto](#310-alta-de-producto)
4. [Reportes y análisis](#4-reportes-y-análisis)
5. [Buenas prácticas](#5-buenas-prácticas)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Cómo abrir el sistema por primera vez

### Windows

1. Abre `llantera-aceites-inventario.xlsm` (doble click).
2. Si aparece **barra amarilla** de seguridad → click en **Habilitar contenido**.
3. Si no aparece barra: click derecho → **Propiedades** → marca **Desbloquear** → **Aceptar** → vuelve a abrir.

### macOS

1. Abre el archivo desde Finder.
2. En el diálogo *"¿Habilitar macros?"* → click en **Habilitar macros**.

### Verificar que el motor está sano

1. Ve a la hoja **Home** — debes ver conteos numéricos en todas las entidades.
2. Verificación formal: `Alt+F8` → selecciona `modEngine.RunSelfTest` → **Ejecutar**.
   - Debe mostrar: **`OK entities=16 engine=1.2.2`**.

---

## 2. Mapa de hojas

### Hojas de operación

| Hoja | Qué hace | Quién la usa |
|------|----------|--------------|
| `Home` | Índice con conteos vivos y links a todas las hojas | Todos |
| `Dashboard` | KPIs: valor del inventario, SKUs activos, alertas de stock bajo | Gerencia |
| `productos` | Catálogo unificado de llantas y aceites (SKU, precios, stock mínimo) | Todos |
| `transacciones` | **Tabla crítica.** Cada entrada, salida, ajuste y transferencia | Almacén |
| `stock_por_ubicacion` | Stock proyectado por (producto, ubicación) | Almacén |
| `ordenes_compras` | Cabecera de órdenes de compra (POs) | Compras |
| `detalle_orden_compras` | Líneas de cada PO | Compras |
| `ordenes_servicios` | Órdenes de servicio por cliente/vehículo | Ventas |
| `detalle_orden_servicios` | Productos consumidos en cada servicio | Ventas |
| `conteos_fisicos` | Cabecera de cada conteo con folio y responsable | Almacén |
| `detalle_conteo_fisicos` | Cantidad contada vs. sistema por producto/ubicación | Almacén |
| `clientes` | Clientes finales y flotillas | Ventas |
| `vehiculos` | Vehículos vinculados a clientes | Ventas |
| `proveedores` | Proveedores con contacto y condiciones de pago | Compras |
| `ubicaciones` | Racks, estantes, bodega, mostrador | Almacén |
| `categorias_productos` | Llantas / Aceites / Filtros / Accesorios | Al dar de alta producto |
| `marcas` | Catálogo de marcas | Al dar de alta producto |
| `unidades` | Pieza, Litro, Galón, Par, Servicio | Al dar de alta producto |

### Hojas técnicas (no tocar)

Las hojas con prefijo `_meta_` y `_audit_log` son usadas por el motor VBA.
**No las borres, muevas ni renombres.**

### Hojas de reportes y análisis

| Prefijo | Tipo | Descripción |
|---------|------|-------------|
| `Rpt_*` | Reporte snapshot | Resúmenes de inventario, movimientos, compras, valor |
| `Ana_*` | PivotTable nativa | Movimientos, inventario, compras, servicios — filtrables |

---

## 3. Operaciones del día a día

> **Regla general:** todas las operaciones se hacen a través de los botones
> **New / Edit / Delete** junto a cada tabla. NO edites celdas directamente
> para datos críticos (transacciones, PKs, FKs).

### 3.1 Recepción de mercancía (entrada)

1. Verifica que el producto ya existe en `productos`. Si no, créalo primero (ver 3.10).
2. Ve a **`transacciones`** → click en **New**.
3. En el formulario:
   - **Tipo Movimiento:** `Entrada`
   - **Producto:** dropdown
   - **Cantidad:** unidades que llegaron
   - **Ubicación:** rack o estante de destino
   - **Costo Unitario:** precio del proveedor
   - **Lote Batch / DOT:** lote para aceites, DOT para llantas
   - **Referencia:** número de PO o factura, ej. `PO-0003`
   - **Usuario:** tu nombre o iniciales
4. Click en **Save**.

### 3.2 Venta o servicio (salida)

1. Ve a **`transacciones`** → click en **New**.
2. En el formulario:
   - **Tipo Movimiento:** `Salida`
   - **Producto / Cantidad / Ubicación** de donde sale
   - **DOT Number:** el DOT de la llanta (para trazabilidad)
   - **Referencia:** folio de la OS o número de venta
3. Click en **Save**.

### 3.3 Conteo físico

1. Ve a **`conteos_fisicos`** → **New**.
   - **Folio:** ej. `CONT-2026-07`
   - **Responsable / Fecha / Estado:** `En Proceso`
2. Ve a **`detalle_conteo_fisicos`** → **New** por cada producto contado.
   - Llena **Producto, Ubicación, Cantidad Contada**.
3. Cuando termines → edita el conteo y cambia estado a `Aplicado`.
4. Por cada diferencia, registra un `Ajuste (+)` o `Ajuste (-)` en `transacciones`.

### 3.4 Transferencia entre ubicaciones

1. Ve a **`transacciones`** → **New**.
2. **Tipo Movimiento:** `Transferencia`
3. Llena Producto, Cantidad, **Ubicación** (origen) y **Ubicación Destino**.
4. Click en **Save**.

> El motor registra la transferencia como dos movimientos atómicos (salida + entrada).

### 3.5 Ajuste manual

1. Ve a **`transacciones`** → **New**.
2. **Tipo Movimiento:** `Ajuste (+)` o `Ajuste (-)`.
3. Llena Producto, Cantidad, Ubicación y Notas (motivo del ajuste).

> La cantidad siempre es positiva. El tipo de movimiento determina el signo.

### 3.6 Orden de compra

1. **`ordenes_compras`** → **New**: Folio (`PO-0003`), Proveedor, Fechas, Estado `Borrador`.
2. **`detalle_orden_compras`** → **New**: agrega líneas por producto con cantidad y precio.
3. Al enviar al proveedor: edita la cabecera → Estado `Enviada`.
4. Al recibir la mercancía: cambia a `Recibida` y registra entradas en `transacciones` con el folio de la PO como referencia.

### 3.7 Orden de servicio

1. **`ordenes_servicios`** → **New**: Folio (`OS-0006`), Cliente, Vehículo, Técnico, Kilometraje, Estado `Abierta`.
2. **`detalle_orden_servicios`** → **New**: productos consumidos en el servicio.
3. Al cerrar: cambia la OS a `Cerrada` y registra las salidas en `transacciones` con el folio de la OS como referencia.

### 3.8 Alta de cliente y vehículo

**Cliente:** `clientes` → **New** → Código (`CLI-004`), Nombre, Teléfono, Email.

**Vehículo:** `vehiculos` → **New** → selecciona el Cliente, llena Placa, Marca, Modelo, Año.

> La placa debe ser única.

### 3.9 Alta de proveedor

`proveedores` → **New** → Código, Nombre, Contacto, Condiciones de pago, Lead time.

### 3.10 Alta de producto

`productos` → **New**:

**Para una llanta:**
- Categoría: `Llantas` · Unidad: `Pieza`
- Campos específicos: Ancho, Perfil, Diámetro, Tipo llanta, Condición, DOT, Tread depth

**Para un aceite:**
- Categoría: `Aceites` · Unidad: `Litro`
- Campos específicos: Viscosidad, Tipo aceite, Volumen litros, Aplicación, Lote batch, Fecha caducidad

**Ambos:** SKU, Código de barras, Precio costo, Precio venta, Stock mínimo, Stock máximo, Punto de reorden.

---

## 4. Reportes y análisis

### Dashboard

La hoja `Dashboard` tiene KPIs en tiempo real (fórmulas vivas, no snapshots):
- Valor total del inventario
- Número de SKUs activos
- Alertas de stock bajo

### Reportes Rpt_ (snapshots)

Hojas `Rpt_*` muestran datos al momento de la última regeneración del archivo. Para análisis con datos del día actual usa el Dashboard o las PivotTables.

### Análisis Ana_ (PivotTables nativas)

Las hojas `Ana_*` contienen PivotTables que puedes filtrar, expandir y reorganizar:

| Hoja | Qué analiza |
|------|-------------|
| `Ana_Movimientos` | Movimientos de inventario por tipo, producto, período |
| `Ana_Inventario` | Stock actual por producto y ubicación |
| `Ana_Compras` | Órdenes de compra por proveedor y período |
| `Ana_Servicios` | Órdenes de servicio por cliente y técnico |

Para actualizar: click derecho en la PivotTable → **Actualizar**.

### Audit log

La hoja `_audit_log` registra cada cambio: timestamp, entidad, operación, valores anteriores/nuevos y usuario. Usa los autofiltros para buscar por fecha o usuario.

---

## 5. Buenas prácticas

### Respaldo diario

Haz una copia antes de empezar a trabajar:
- Nombre sugerido: `llantera-aceites-inventario_YYYY-MM-DD.xlsm`

### Convención de folios

| Entidad | Prefijo | Ejemplo |
|---------|---------|---------|
| Llantas | `LL-` | `LL-2055516-MIC` |
| Aceites | `AC-` | `AC-MOB1-5W30` |
| Proveedores | `PROV-` | `PROV-005` |
| Clientes | `CLI-` | `CLI-010` |
| Órdenes de compra | `PO-` | `PO-0003` |
| Órdenes de servicio | `OS-` | `OS-0010` |
| Conteos físicos | `CONT-YYYY-MM` | `CONT-2026-07` |

### FIFO en aceites

- **Alta:** registra cada lote por separado con `lote_batch` y `fecha_caducidad`.
- **Salida:** el motor prioriza el lote más antiguo. Verifica en `_audit_log`.
- **Lote vencido:** registra `Ajuste (-)` antes de desechar físicamente.

### Trazabilidad DOT en llantas

- Al dar **entrada**: registra el `dot_number` en `transacciones`.
- Al **vender/servir**: registra la salida con el mismo `dot_number`.
- Esto permite localizar a qué cliente fue cada llanta ante un recall.

### Cierre de mes

1. Corre un conteo físico completo (al menos de los productos de alta rotación).
2. Aplica los ajustes resultantes en `transacciones`.
3. Verifica que el Dashboard refleja los valores correctos.
4. Haz respaldo con nombre `llantera-aceites-YYYY-MM.xlsm`.

---

## 6. Troubleshooting

### "Las macros están deshabilitadas"

**Windows:** click derecho sobre el archivo → Propiedades → marca **Desbloquear** → Aceptar.
**macOS:** `Herramientas → Preferencias de Excel → Seguridad` → selecciona "Advertencia de todas las macros".

### "Los botones New/Edit/Delete no aparecen"

Causa: macros no habilitadas. Aplica la solución anterior y vuelve a abrir el archivo.

### "El sistema dice que tengo stock 0 pero hay producto en el rack"

Causa: no se registró una entrada o se registró una salida de más.

Solución: corre un conteo físico para ese producto y registra el ajuste correspondiente.

### "Run-time error '51' al hacer click en New"

Causa: bug en seeds VBA anteriores.

Solución: regenera el archivo desde el proyecto fuente con `bash scripts/bootstrap.sh`. Si no tienes acceso, contacta al equipo que generó el sistema.

### "Las fechas se ven como texto"

Solución: selecciona la columna → click derecho → **Formato de celdas** → Fecha → Tipo: `dd/mm/yyyy`.

### "Los dropdowns no aparecen"

Causa: la columna FK perdió su validación de datos. Regenera el archivo desde la fuente.

### "Excel encontró un problema con el contenido..."

Solución: click en **Sí** a la reparación. Si persiste, restaura desde el último respaldo.

---

**¿Dudas o errores?** Proporciona:
1. Captura de pantalla del error.
2. Pasos exactos para reproducirlo.
3. Versión de Excel (`Archivo → Cuenta → Acerca de Excel`).
4. Resultado de `modEngine.RunSelfTest` (`Alt+F8`).
