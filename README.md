**Gestión de Empleados y Departamentos**

🖥️ **Tecnologías utilizadas:** ☕ Java 17, 🚀 Spring Boot, ⚛️ Angular 19, 🐳 Docker, 🗄️ H2 Database, 🦑 Nginx

Este repositorio contiene la solución completa al ejercicio técnico de gestión de empleados y departamentos, con backend en Spring Boot (Java 17) y frontend en Angular 19. Todo puede levantarse con un solo comando Docker Compose, sin necesidad de instalar Java, Maven ni Node.js.

---

## 📥 Clonar o descargar los repositorios

Primero, clona ambos proyectos (o descárgalos como ZIP) en un mismo directorio:

```bash
git clone https://github.com/Atch2/hiberus-company-emps-backend.git
git clone https://github.com/Atch2/hiberus-company-emps-frontend.git
```

O bien descarga ambos como ZIP y descomprímelos en la misma carpeta raíz.

---

## 🚂 Levantar la aplicación

1. Abre una terminal y navega al directorio del **frontend** (donde está el `docker-compose.yml`):

   ```bash
   cd hiberus-company-emps-frontend
   ```

2. Ejecuta:

   ```bash
   docker compose up --build -d
   ```

   - `--build`: recompila las imágenes.
   - `-d`: ejecuta en segundo plano.

3. Verifica que ambos contenedores estén **Up** y **healthy**:

   ```bash
   docker compose ps
   ```

---

## 🌐 Acceder a los servicios

### Backend (Spring Boot)

- **Base URL:** `http://localhost:8080`
- **Healthcheck (Actuator):** `http://localhost:8080/actuator/health` → `{ "status":"UP" }`
- **Consola H2:** `http://localhost:8080/h2-console`  
  - **JDBC URL:** `jdbc:h2:mem:testdb`  
  - **User:** `sa`  
  - **Password:** *(vacío)*

### Frontend (Angular 19)

- **App Angular:** `http://localhost` (puerto 80)

---

## 📁 Estructura del Proyecto Frontend

hiberus-company-emps-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   ├── department-form/
│   │   │   ├── department-list/
│   │   │   ├── employee-form/
│   │   │   └── employee-list/
│   │   ├── services/
│   │   │   ├── employee.service.ts
│   │   │   └── department.service.ts
│   │   └── models/
│   ├── environments/
│   └── assets/
├── Dockerfile
├── nginx.conf
└── docker-compose.yml

---

### Arquitectura Frontend

Para el frontend utilizamos **Standalone Components** de Angular 19:

- **Componentes desacoplados** (`components/`), cada uno con su propia responsabilidad.
- **Servicios** (`services/`) que centralizan las llamadas HTTP a la API.
- **Modelos tipados** (`models/`) para garantizar consistencia de datos.
- **Formularios Reactivos** con validaciones en cliente.
- **Deploy optimizado** con Docker + Nginx para servir la app estática.

---

## 📁 Estructura del Proyecto Backend

management-employees-company/
├── .gitattributes
├── .gitignore
├── Dockerfile
├── HELP.md
├── mvnw
├── mvnw.cmd
├── pom.xml
├── .idea/
├── .mvn/
│   └── wrapper/
├── .vscode/
├── src/
│   ├── main/
│   │   ├── java/com/hiberus/management_employees_company/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── exception/
│   │   │   ├── repository/
│   │   │   ├── service/
│   │   │   └── ManagementEmployeesCompanyApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
│   └── test/
├── target/

---

### Arquitectura Backend

Se adopta una **arquitectura en capas** (Clean Architecture/Hexagonal):

- **Controller**: expone endpoints REST, maneja DTOs.
- **Service**: lógica de negocio y validaciones.
- **Repository**: acceso a datos con Spring Data JPA.
- **DTOs**: desacoplan capa de presentación de entidades.
- **GlobalExceptionHandler**: manejo centralizado de errores.
- **H2 en memoria**: para desarrollo rápido y tests.
- **Docker multi-stage**: compila con Maven y crea una imagen ligera.

---

## 🚀 Requisitos previos

- **Docker** v20+
- **Docker Compose** (CLI `docker compose`)

No se necesita Java, Maven ni Node instalados localmente.

---

## 📋 Endpoints de la API

| Operación                              | Método | Ruta                                |
| -------------------------------------- | ------ | ----------------------------------- |
| Crear departamento                     | POST   | `/department/create`                |
| Eliminar departamento (lógico)         | POST   | `/department/delete/{departmentId}` |
| Crear empleado                         | POST   | `/employee/create/{departmentId}`   |
| Eliminar empleado (lógico)             | POST   | `/employee/delete/{employeeId}`     |
| Empleado con salario más alto          | GET    | `/employee/highestSalary`           |
| Empleado con edad más baja             | GET    | `/employee/lowerAge`                |
| Conteo empleados ingresados último mes | GET    | `/employee/countLastMonth`          |

### Ejemplo cURL

```bash
curl -X POST http://localhost:8080/department/create   -H "Content-Type: application/json"   -d '{ "id": 5, "name": "Marketing", "status":"A" }'
```

---

## 🛠 Parar y limpiar

```bash
docker compose down --rmi all
```