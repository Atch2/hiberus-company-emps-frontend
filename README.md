# Gestión de Empleados y Departamentos - Frontend

## Descripción
Aplicación frontend desarrollada en Angular para la gestión de empleados y departamentos de una empresa. Permite realizar operaciones CRUD sobre empleados y departamentos, así como visualizar estadísticas relevantes.

## Tecnologías Utilizadas
- Angular 17
- TypeScript
- Bootstrap 5
- RxJS
- Docker
- Nginx

## Requisitos Previos
- Docker y Docker Compose instalados
- Git

## Estructura del Proyecto
```
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
```

## Características Implementadas
1. **Gestión de Empleados**
   - Creación de empleados
   - Listado de empleados
   - Eliminación de empleados
   - Visualización de detalles

2. **Gestión de Departamentos**
   - Creación de departamentos
   - Listado de departamentos
   - Eliminación de departamentos

3. **Dashboard**
   - Empleado con mayor salario
   - Empleado más joven
   - Conteo de empleados del último mes

## Instalación y Ejecución

### Opción 1: Ejecución con Docker Compose (Recomendada)
1. Clonar los repositorios:
```bash
# Clonar el repositorio del backend
git clone <url-repositorio-backend>
cd management-employees-company
cd ..

# Clonar el repositorio del frontend (que contiene el docker-compose.yml)
git clone <url-repositorio-frontend>
cd hiberus-company-emps-frontend
```

2. Levantar el entorno completo desde el directorio del frontend:
```bash
docker-compose up --build
```

3. Acceder a la aplicación:
- Frontend: http://localhost
- Backend: http://localhost:8080
- Consola H2: http://localhost:8080/h2-console

### Opción 2: Desarrollo Local
Si prefieres ejecutar el proyecto en modo desarrollo:

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd hiberus-company-emps-frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
ng serve
```

4. Acceder a la aplicación:
```
http://localhost:4200
```

## Arquitectura y Diseño

### Componentes
- **DashboardComponent**: Muestra estadísticas y métricas clave
- **EmployeeFormComponent**: Formulario para crear/editar empleados
- **EmployeeListComponent**: Lista y gestión de empleados
- **DepartmentFormComponent**: Formulario para crear/editar departamentos
- **DepartmentListComponent**: Lista y gestión de departamentos

### Servicios
- **EmployeeService**: Maneja todas las operaciones relacionadas con empleados
- **DepartmentService**: Maneja todas las operaciones relacionadas con departamentos

### Modelos de Datos
```typescript
interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  role?: string;
  salary: number;
  startDate: string;
  endDate: string | null;
  status: string;
  departmentId: string;
}

interface Department {
  id?: string;
  name: string;
  status: string;
}
```

## Configuración de Nginx
El proyecto incluye una configuración de Nginx para servir la aplicación y manejar el proxy inverso hacia el backend:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /employee {
        proxy_pass http://backend:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /department {
        proxy_pass http://backend:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Contribución
1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT.
