#!/bin/bash
# Script para copiar fotos descargadas de Google Maps al proyecto HVO
# Ejecútalo desde Terminal: bash copiar-fotos.sh

DEST="$(dirname "$0")/src/assets"
DOWNLOADS=~/Downloads

echo "📁 Copiando fotos a $DEST ..."

for foto in hero-edificio.jpg habitacion-1.jpg estudio-escritorio.jpg zona-comun.jpg; do
  if [ -f "$DOWNLOADS/$foto" ]; then
    cp "$DOWNLOADS/$foto" "$DEST/$foto"
    echo "  ✅ $foto copiado"
  else
    echo "  ⚠️  $foto no encontrado en ~/Downloads"
  fi
done

echo ""
echo "Listo. Fotos que quedaron en src/assets:"
ls "$DEST"/*.jpg "$DEST"/*.png 2>/dev/null | xargs -I{} basename {}
