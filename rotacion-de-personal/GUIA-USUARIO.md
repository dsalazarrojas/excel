# Guía de Usuario — Rotación de Personal

Esta guía explica cómo operar la aplicación paso a paso.

---

## Flujo de trabajo básico

```
1. Agregar empleado → hoja Empleados
2. Registrar baja → misma fila, completar fecha y motivo
3. Ver indicadores → hoja Dashboard
4. Analizar rotación → hojas de reportes
```

---

## 1. Registrar un empleado nuevo

1. Ir a la hoja **Empleados**.
2. En la primera fila vacía, completar:

| Campo | Descripción |
|-------|-------------|
| **Nombre Completo** | Nombre y apellidos del empleado |
| **Departamento** | Área a la que pertenece (Administración, Operaciones, Tecnología, Marketing, Ventas, RRHH, Logística, Finanzas) |
| **Puesto / Cargo** | Título del puesto |
| **Fecha de Ingreso** | Fecha de inicio en formato dd/mm/aaaa |
| **Estado** | Se calcula automáticamente: **Activo** si no hay fecha de salida, **Baja** si la hay |
| **Observaciones** | Notas opcionales |

> Los campos **Antigüedad (meses)**, **Antigüedad (años)**, **Rango de Antigüedad** y **Mes de Salida** se calculan automáticamente — no editarlos manualmente.

---

## 2. Registrar una baja

Cuando un empleado se desvincula, localiza su fila en **Empleados** y completa:

| Campo | Descripción |
|-------|-------------|
| **Fecha de Salida** | Fecha efectiva de la baja |
| **Tipo de Salida** | Elegir entre: Voluntaria / Involuntaria / Jubilación / Fin de contrato / Otro |
| **Motivo de Salida** | Descripción específica del motivo (ej. "Mejor oferta laboral", "Reestructuración organizacional") |

El campo **Estado** cambiará automáticamente a **Baja** al registrar la fecha de salida.

---

## 3. Dashboard — indicadores en tiempo real

La hoja **Dashboard** muestra:

| Indicador | Descripción |
|-----------|-------------|
| **Total Empleados** | Todos los registros en la hoja Empleados |
| **Empleados Activos** | Sin fecha de salida registrada |
| **Total Bajas** | Con fecha de salida registrada |
| **Tasa de Rotación (%)** | Bajas ÷ Total × 100 |
| **Promedio Antigüedad Salidas** | Promedio en meses de los empleados dados de baja |

También incluye tablas de distribución por **rango de antigüedad** y por **departamento**.

> El Dashboard se actualiza automáticamente al modificar datos en la hoja Empleados.

---

## 4. Reportes de rotación

Cada reporte es una tabla dinámica vinculada a la hoja **Empleados**. Si los datos no reflejan los últimos cambios, hacer click derecho sobre la tabla → **Actualizar**.

| Reporte | Qué muestra |
|---------|-------------|
| **Rotación por Departamento** | Conteo de movimientos por área |
| **Rotación por Tipo de Salida** | Distribución por categoría de baja |
| **Rotación por Motivo de Salida** | Detalle por motivo específico |
| **Rotación por Puesto** | Bajas agrupadas por cargo |
| **Rotación por Rango de Antigüedad** | Salidas según tiempo de permanencia (1-2 años, 3-5 años, 5+ años) |

---

## 5. Solución de problemas

| Problema | Solución |
|----------|----------|
| Los botones o formularios no aparecen | Cerrar el archivo → clic derecho → Propiedades → marcar **Desbloquear** → reabrir y habilitar macros |
| En Windows aparece barra amarilla de seguridad | Clic en **Habilitar contenido** |
| En macOS aparece diálogo de macros | Clic en **Habilitar macros** |
| Las tablas dinámicas no actualizan | Clic derecho sobre la tabla → **Actualizar** |
| El campo Estado no cambia a "Baja" | Verificar que la **Fecha de Salida** esté en formato fecha (no texto) |
