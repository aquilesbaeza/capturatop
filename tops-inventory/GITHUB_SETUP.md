# GitHub Setup - CapturaTops

## 📋 Pasos para deploy en GitHub Pages

### 1️⃣ Crear repositorio en GitHub

1. Ve a https://github.com/new
2. **Repository name:** `capturatop`
3. **Description:** "Captura de inventario de tops de estanterías con OCR"
4. **Public** (para que funcione en GitHub Pages)
5. Click: **Create repository**

### 2️⃣ Inicializar Git localmente

```bash
cd tops-inventory

# Inicializar
git init

# Configurar usuario (si no está configurado)
git config user.name "Tu Nombre"
git config user.email "tu-email@example.com"

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit: CapturaTops app"

# Renombrar rama a main (GitHub Pages requiere main o gh-pages)
git branch -M main

# Agregar remote
git remote add origin https://github.com/tu-usuario/capturatop.git

# Push inicial
git push -u origin main
```

### 3️⃣ Configurar GitHub Pages

1. Ve a tu repo: https://github.com/tu-usuario/capturatop
2. Click en **Settings** (⚙️)
3. En la barra izquierda, click en **Pages**
4. **Source:** Deploy from a branch
5. **Branch:** `main` / `(root)`
6. Click **Save**

Verás un mensaje: _"Your site is live at https://tu-usuario.github.io/capturatop/"_

### 4️⃣ Verificar que funciona

- Abre: `https://tu-usuario.github.io/capturatop/`
- Debería cargar sin errores
- Haz un test: Carga BD Excel

## 📱 Instalar como app en Samsung S23 Ultra

1. Abre Chrome
2. Ve a: `https://tu-usuario.github.io/capturatop/`
3. Espera 5 segundos a que cargue
4. Toca el menú (3 puntos) → **"Instalar aplicación"**
5. Confirma
6. Aparecerá en tu pantalla de inicio

## 🔄 Actualizar BD diariamente

### Opción A: Desde la app (más fácil)
1. Abre CapturaTops
2. Toca 📥 (cargar BD)
3. Selecciona Excel actualizado
4. ✅ Se guarda automáticamente en el dispositivo

### Opción B: Actualizar en GitHub (persiste en todos los dispositivos)

1. **Preparar el Excel actualizado**
```bash
node scripts/excel-to-db.js ./datos-tienda-NUEVA.xlsx
```

2. **Subir a GitHub**
```bash
git add db-preload.js
git commit -m "Update database: $(date +%Y-%m-%d)"
git push
```

3. **En el S23**, recarga la app:
   - Toca el refresh del navegador
   - O cierra y abre nuevamente

## 🚀 URL final para tu equipo

Comparte esta URL:
```
https://tu-usuario.github.io/capturatop/
```

## 💡 Consejos

- **Primer acceso:** Tarda un poco en descargar Tesseract.js (~100MB), pero solo la primera vez
- **Offline:** Después de la primera visita funciona sin conexión
- **BD grande:** Si tu Excel es muy grande (>10.000 registros), considera dividirlo

## 🔐 Privacidad

- ⚠️ GitHub Pages es **público**
- Los datos NO se envían a servidores externos (todo es local)
- Todos los datos se guardan en el dispositivo del usuario

## ❌ Troubleshooting

| Problema | Solución |
|----------|----------|
| Página en blanco | Presiona F12 (Consola), busca errores de JavaScript |
| 404 Not Found | Verifica que Pages está habilitado y rama es `main` |
| Botón "Instalar" no aparece | Asegúrate de usar HTTPS (GitHub Pages lo hace automáticamente) |
| OCR lento | Normal, Tesseract tarda ~5-10 segundos la primera vez |

## 📞 Contacto

Para reportar problemas:
- Abre un Issue en GitHub
- O contacta directamente

---

**Listo para ir en vivo! 🚀**
