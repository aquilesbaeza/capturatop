#!/usr/bin/env node

/**
 * Convertir Excel a db-preload.js
 * Uso: node scripts/excel-to-db.js ./datos-tienda.xlsx
 */

const fs = require('fs');
const path = require('path');

// Intenta cargar XLSX
let XLSX;
try {
    XLSX = require('xlsx');
} catch (e) {
    console.error('❌ Instala xlsx: npm install xlsx');
    process.exit(1);
}

const inputFile = process.argv[2];

if (!inputFile) {
    console.error('❌ Uso: node scripts/excel-to-db.js <archivo-excel>');
    console.error('Ejemplo: node scripts/excel-to-db.js ./datos-tienda.xlsx');
    process.exit(1);
}

if (!fs.existsSync(inputFile)) {
    console.error('❌ Archivo no encontrado:', inputFile);
    process.exit(1);
}

try {
    console.log('📖 Leyendo:', inputFile);
    const wb = XLSX.readFile(inputFile);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(ws, { defval: '' });

    // Mapear columnas
    const mapped = data.map(row => {
        // Ajustar según tus columnas reales
        return {
            sku: String(row['CODIGO SKU'] || row['SKU'] || '').trim(),
            descripcion: String(row['DESCRIPCION'] || row['DESCRIPCION PRODUCTO'] || '').trim(),
            // Agregar más campos si es necesario
        };
    }).filter(item => item.sku.length >= 5); // Filtrar registros válidos

    // Generar JavaScript
    const output = `/**
 * Database Preload - CapturaTops
 * AUTOGENERADO: $(date +%Y-%m-%d)
 * Fuente: ${inputFile}
 * Total de SKUs: ${mapped.length}
 */

window.DATABASE_PRELOAD = ${JSON.stringify(mapped, null, 4)};

console.log('✅ Base de datos precargada: ' + window.DATABASE_PRELOAD.length + ' SKUs');
`;

    // Guardar
    const outputFile = path.join(__dirname, '..', 'db-preload.js');
    fs.writeFileSync(outputFile, output);

    console.log('✅ Archivo guardado:', outputFile);
    console.log('📊 Total de SKUs:', mapped.length);
    console.log('\n💡 Próximo paso:');
    console.log('   git add db-preload.js');
    console.log('   git commit -m "Update database: ' + new Date().toISOString().split('T')[0] + '"');
    console.log('   git push');

} catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
}
