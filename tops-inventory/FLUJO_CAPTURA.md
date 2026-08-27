# 📸 FLUJO DE CAPTURA - CapturaTops

## 🎯 Cómo funciona ahora

### Una foto = Múltiples cajas capturadas

```
┌─────────────────────────────────────┐
│  FOTO DEL TOP (1 captura)           │
│                                     │
│  ┌──────────┐  ┌──────────┐         │
│  │Etiqueta 1│  │Etiqueta 2│  ...    │
│  │  SKU 123 │  │  SKU 456 │         │
│  │ 2    10  │  │ 1    15  │         │
│  └──────────┘  └──────────┘         │
└─────────────────────────────────────┘
           ↓ OCR automático
┌─────────────────────────────────────┐
│  LISTADO DE CAJAS (editable)        │
│                                     │
│ ☐ Caja 1: 1301000123               │
│   Fondo: 2 | Cantidad: 10           │
│   Total: 2×10 = 20 unidades         │
│   [Editar] [Eliminar]               │
│                                     │
│ ☐ Caja 2: 1301000456               │
│   Fondo: 1 | Cantidad: 15           │
│   Total: 1×15 = 15 unidades         │
│   [Editar] [Eliminar]               │
│                                     │
│ ☐ Caja 3: ...                       │
└─────────────────────────────────────┘
      ↓ Revisar/Corregir
┌─────────────────────────────────────┐
│ [❌ Cancelar] [✅ Guardar 3 cajas]  │
└─────────────────────────────────────┘
```

---

## 📋 Paso a paso de captura

### 1. Seleccionar Rack
```
App abre en: "Captura de Tops"
Muestra: "Rack Actual: —"
Usuario: Toca botón "Cambiar Rack"
Selecciona: TOP, TOP MEDIO, PISO, etc.
Result: "Rack Actual: TOP"
```

### 2. Tomar Foto
```
Usuario: Toca botón grande 📷 FOTO
Abre: Cámara del dispositivo
Usuario: Apunta al top con VARIAS etiquetas verdes
Toca: Botón "Capturar"
```

### 3. OCR automático detecta múltiples etiquetas
```
App lee TODAS las etiquetas verdes:
  1301000123  ← SKU línea 1
  2    10     ← Fondo línea 2 + Cantidad línea 3

  1301000456  ← SKU siguiente
  1    15     ← Fondo + Cantidad

  1301000789  ← SKU siguiente
  3    10     ← Fondo + Cantidad
  ... (cuantas tenga la foto)
```

### 4. Mostrar listado editable
```
Pantalla: "Verificación de Etiquetas"
Muestra: "Se detectaron 3 cajas"

Listado:
┌──────────────────────────────┐
│ Caja 1: 1301000123           │
│ Descripción (BD): Artículo X │
│ ┌──────────────────────────┐ │
│ │ SKU: 1301000123          │ │
│ │ Fondo: 2  Cantidad: 10   │ │
│ │ Total: 2 × 10 = 20 unid  │ │
│ │ [Editar] [Eliminar]      │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
┌──────────────────────────────┐
│ Caja 2: 1301000456           │
│ [... similar ...]            │
└──────────────────────────────┘
```

### 5. Revisar y corregir (si es necesario)
```
Si OCR leyó mal:
- Toca campo SKU → edita manualmente
- Toca campo Fondo → cambia número
- Toca campo Cantidad → cambia número
- Total se recalcula automáticamente

Si una caja no corresponde:
- Toca botón "Eliminar" (🗑️)
- Se quita del listado
```

### 6. Guardar batch completo
```
Usuario: Revisa que todo esté correcto
Usuario: Toca botón grande "✅ Guardar 3 cajas"
App: Guarda TODAS en memoria
Display: Vuelve a pantalla "Captura de Tops"
Muestra: Listado del TOP con las 3 nuevas cajas
```

### 7. Repetir para siguientes fotos
```
Usuario: Toma OTRA foto del mismo TOP
OCR: Lee nuevas etiquetas
Muestra: Nuevo listado para verificar
Usuario: Guarda
... (repite hasta terminar el TOP)
```

### 8. Ver resumen del Rack
```
Pantalla: "Captura de Tops"
Muestra: Todas las cajas guardadas del TOP
Listado:
  ☐ 1301000123 | 2 fondo × 10 = 20 unid
  ☐ 1301000456 | 1 fondo × 15 = 15 unid
  ☐ 1301000789 | 3 fondo × 10 = 30 unid
  ☐ 1301000321 | 2 fondo × 20 = 40 unid
  (... más cajas)

Total en el TOP: 105 unidades
```

### 9. Exportar Excel
```
Usuario: Toca botón 📥 DESCARGAR (en FAB)
App: Genera Excel con todas las cajas
Descarga: "Tops_TOP_2026-08-26.xlsx"

Contenido del Excel:
┌─────────────────────────────────────────────┐
│ ITEM │ RACK │ SKU│ DESCRIPCION │ FONDO │ ... │
├─────────────────────────────────────────────┤
│ 1    │ TOP  │ 1301000123 │ Artículo X │ 2   │
│ 2    │ TOP  │ 1301000456 │ Artículo Y │ 1   │
│ 3    │ TOP  │ 1301000789 │ Artículo Z │ 3   │
│ 4    │ TOP  │ 1301000321 │ Artículo W │ 2   │
└─────────────────────────────────────────────┘
```

### 10. Cambiar de Rack
```
Usuario: Toca "Cambiar Rack"
Selecciona: TOP MEDIO
Repite: Todo el proceso (fotos → OCR → verificar → guardar)
```

---

## 🔤 Formato de etiqueta esperado

```
ESTÁNDAR:
┌─────────────┐
│ 1301000123  │  ← Línea 1: SKU (10 dígitos)
│ 2      10   │  ← Línea 2: Fondo (izq) + Cantidad (der)
└─────────────┘

VARIACIONES ACEPTADAS (OCR entiende):
  1301000123      1301000123 2x10    1301000123
  2 x10                              2  10

  1301000456 2 10 / 1301000456  2x10 / etc.
```

---

## ✅ Checklist de cada captura

- [ ] Foto clara (etiquetas visibles)
- [ ] Todas las etiquetas verdes en el frame
- [ ] OCR lee correctamente cada SKU
- [ ] Revisar que Fondo y Cantidad sean correctos
- [ ] Editar si hay error
- [ ] Guardar batch
- [ ] Verificar en listado del rack

---

## 🎓 Tips de captura

### Para mejor OCR:
✅ Luz adecuada (natural si es posible)  
✅ Enfoque en las etiquetas  
✅ Etiquetas limpias (sin suciedad)  
✅ Ángulo frontal (no sesgado)  
✅ Zoom moderado (ver múltiples etiquetas)

### Qué pasa si OCR falla:
❌ Foto borrosa → toma otra  
❌ Luz muy poca → ilumina mejor  
❌ OCR lee mal → edita manualmente  
❌ Falta una etiqueta → toma otra foto  
❌ Hay etiqueta blanca → OCR ignora (solo verdes)  

---

## 📊 Ejemplo real de captura

### Foto 1 del TOP
```
OCR detecta 5 etiquetas:
  1301000001 → 2×15 = 30
  1301000002 → 1×20 = 20
  1301000003 → 3×10 = 30
  1301000004 → 2×12 = 24
  1301000005 → 1×25 = 25
```

### Foto 2 del TOP (continuación)
```
OCR detecta 3 etiquetas más:
  1301000006 → 2×10 = 20
  1301000007 → 1×15 = 15
  1301000008 → 4×8 = 32
```

### Total después de 2 fotos:
```
TOP: 8 cajas capturadas = 196 unidades
```

### Excel generado:
```
TOP_2026-08-26.xlsx
ITEM | SKU | FONDO | CANTIDAD | TOTAL
 1   | 1301000001 | 2 | 15 | 30
 2   | 1301000002 | 1 | 20 | 20
 3   | 1301000003 | 3 | 10 | 30
 4   | 1301000004 | 2 | 12 | 24
 5   | 1301000005 | 1 | 25 | 25
 6   | 1301000006 | 2 | 10 | 20
 7   | 1301000007 | 1 | 15 | 15
 8   | 1301000008 | 4 | 8  | 32
                    TOTAL: 196 unidades
```

---

## 🎯 Ventajas del flujo Batch

✅ **Captura rápida:** 1 foto = múltiples cajas  
✅ **Menos clicks:** Todo en 1 guardar  
✅ **Menos errores:** Revisa todo junto  
✅ **Flexible:** Edita individual o elimina  
✅ **Eficiente:** Máximo 1-2 fotos por rack  

---

**¡Listo para capturar! 📸**
