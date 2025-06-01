# 🛠️ notas_dev.md — Chuleta Git para el día a día


------


### mod2

----------

## 🌿 Estructura de ramas del monorepo

```plaintext

`main ← Rama principal (producción)(aun en desarrollo)
↑
|
dev ← Rama de integración (testing / QA)(pruebas)
├── frontend-dev ← Desarrollo activo del frontend
└── backend-dev ← Desarrollo activo del backend`

```

### 🔁 Flujo de trabajo:

1. Trabajás en `frontend-dev` o `backend-dev`.

2. Hacés Pull Request (PR) hacia `dev`.

3. Cuando `dev` está probado → PR hacia `main`.

----------

### 💡 Notas:

-  **`frontend-dev`** y **`backend-dev`** son ramas de trabajo diario.

-  **`dev`** se usa para integrar ambos antes de subir a producción.

-  **`main`** siempre debe estar limpio y funcional.

----------

# ✅ ORDEN CORRECTO PARA CREAR Y TRABAJAR CON RAMAS EN MONOREPO

## 🧱 Paso 1: Crear las ramas base (en orden)

**`(Importante omitir este paso, porque ya estan creados , pasar al PASO 2)`**

Desde la rama `main` (que ya hay):

```bash
# Crear rama de desarrollo general
git  checkout  -b  dev
git  push  -u  origin  dev 

# Crear rama de desarrollo del frontend
git  checkout  -b  frontend-dev
git  push  -u  origin  frontend-dev

# Crear rama de desarrollo del backend
git  checkout  -b  backend-dev
git  push  -u  origin  backend-dev
```
----------
## 🔁 Paso 2: Cambiar entre ramas

```bash

# Cambiar a rama dev
git  checkout  dev

# Cambiar a frontend
git  checkout  frontend-dev

# Cambiar a backend
git  checkout  backend-dev
```

Podés ver todas tus ramas locales con:

```bash
git  branch

# o listar todas ramas remotas y locales con
git  branch  -a
```
----------

## 💾 Paso 3: Hacer cambios y guardar (commit + push)

> 🔁 Esto se repite **cada vez que avances** algo en alguna rama.

```bash
# Ver qué archivos cambiaron
git  status

# Agregar todos los archivos cambiados
git  add  .

# Crear un commit con mensaje claro
git  commit  -m  "🔧 Ajuste en el componente Login.jsx"

# Subir los cambios a GitHub (a la rama en la que estés)
git  push  origin  frontend-dev  # O backend-dev, o dev

```

----------

## 🔀 Paso 4: Fusionar ramas (pull request)

>  **Ojo , solo si ya esta terminado ciertos modulos y/o funcionalidades**

Desde GitHub (no en terminal):


1. Hacés un **Pull Request** de `frontend-dev` → `dev`, o `backend-dev` → `dev`.

2. Una vez probado todo en `dev`, hacés otro PR de `dev` → `main`.

----------

## 🧼 Extra: Traer cambios de otra rama a la tuya

Esto es para mantener tu rama actualizada con lo más nuevo de `dev`:

```bash

#Estás en tu rama(ej. frontend-dev)
#y querés actualizarla con cambios de dev

git  checkout  frontend-dev

git  pull  origin  dev

```

----------

### ....

---

## 💾 Guardar cambios

```bash

git  status

git  add  .

git  commit  -m  "💬 Mensaje claro del cambio"

git  push  origin  nombre-rama

```

## 🔀 Fusionar ramas (desde GitHub)

- PR de frontend-dev/backend-dev → dev

- Luego PR de dev → main
  
## ⬇️ Traer cambios de dev a tu rama

```bash

git  checkout  frontend-dev

git  pull  origin  dev

```

----------

### mod 1.1


# 💾 Guardar cambios

```bash

git  status  # Ver cambios

git  add  .  # Agregar todos los archivos

git  commit  -m  "Mensaje claro"  # Confirmar los cambios

git  push  origin  nombre-rama  # Subir a GitHub

```

# ⬇️ Obtener cambios

```bash

git  fetch  # Traer cambios sin aplicarlos

git  pull  origin  nombre-rama  # Traer y aplicar cambios

```

# 🔙 Volver atrás

```bash
git  log  --oneline  # Ver historial

git  reset  --hard  HEAD~1  # Eliminar último commit (cuidado)

git  revert  HEAD  # Revertir último commit (forma segura)

```
# 🧹 Extras útiles


```bash
git  diff  # Ver diferencias sin confirmar

git  log  --oneline  --graph  --all  --decorate  # Historial visual

git  help <comando> # Ayuda sobre un comando

```

# ✅ Recomendaciones

Hacé commit después de cada avance lógico.

Hacé push seguido para respaldo.

Mantené ramas separadas para cada área (frontend/backend).

Usá mensajes de commit descriptivos y breves.
