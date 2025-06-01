# 🏨 Hotel Las Nutrias — Monorepo (Frontend + Backend)

Proyecto de gestión hotelera con panel de administración, reservas y control de inventario.

## 📁 Estructura
```yaml
#recontra resumida jaja
/
├── backend/ # Servidor Node.js
├── hotel-nutrias-frontend/ # Cliente web en React + Vite
├── .gitignore
├── README.md
├── notas_dev.md # Chuleta para desarrolladores

```

---

## 🌿 Ramas de trabajo

| Rama | Propósito |
|------|-----------|
| `main` | Código listo para producción |
| `dev` | Desarrollo general |
| `frontend-dev` | Desarrollo frontend |
| `backend-dev` | Desarrollo backend |

---

## 🔁 Flujo de trabajo

1. Crear funcionalidad en la rama correspondiente.
2. Hacer `commit` con cambios funcionales.
3. Hacer `push` de forma regular.
4. Abrir un Pull Request hacia `dev`.
5. Probar en `dev`, luego hacer Pull Request a `main`.
//

---

## 🚀 Comandos útiles

Desde la raíz:

```bash
npm run dev           # Corre backend y frontend juntos
npm run dev:frontend  # Solo frontend
npm run dev:backend   # Solo backend
```

## 🔐 Archivos ignorados
.env

node_modules/

dist/ o build/

Archivos temporales de sistema

## 📌 Requisitos
Node.js v18+

Git

Navegador puej

## ✨ Créditos
Proyecto desarrollado por Jhon mayta, y su team. 
para las materias del 5to semestre en ingenieria Sistemas  — 2025.