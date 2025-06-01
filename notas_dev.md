# 🛠️ notas_dev.md — Chuleta Git para el día a día

  

## 🌿 Ramas

  

```bash

git  checkout  -b  nueva-rama  # Crear y cambiar a nueva rama

git  checkout  nombre-rama  # Cambiar de rama

git  branch  # Ver ramas locales

git  branch  -a  # Ver ramas locales + remotas

```

# 💾  Guardar  cambios

```bash


git  status  # Ver cambios

git  add  .  # Agregar todos los archivos

git  commit  -m  "Mensaje claro"  # Confirmar los cambios

git  push  origin  nombre-rama  # Subir a GitHub
```

# ⬇️  Obtener  cambios

```bash

git  fetch  # Traer cambios sin aplicarlos

git  pull  origin  nombre-rama  # Traer y aplicar cambios
```
# 🔙  Volver  atrás

```bash

git  log  --oneline  # Ver historial

git  reset  --hard  HEAD~1  # Eliminar último commit (cuidado)

git  revert  HEAD  # Revertir último commit (forma segura)
```
# 🔀  Fusionar  ramas

```bash

git  checkout  dev

git  merge  frontend-dev

git  add  . && git  commit  -m  "Merge"
```
# 🧹  Extras  útiles

```bash


git  diff  # Ver diferencias sin confirmar

git  log  --oneline  --graph  --all  --decorate  # Historial visual

git  help <comando> # Ayuda sobre un comando
```
# ✅  Recomendaciones

Hacé  commit  después  de  cada  avance  lógico.

Hacé  push  seguido  para  respaldo.


Mantené  ramas  separadas  para  cada  área (frontend/backend).

Usá  mensajes  de  commit  descriptivos  y  breves.