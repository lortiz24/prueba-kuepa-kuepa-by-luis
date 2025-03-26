# Documentación de Cambios en el Proyecto

## Backend


### Gestión de Programas

- Se creó un listado de programas para poblar la colección correspondiente en la base de datos.
- Se desarrollaron las siguientes funcionalidades:
  - **ProgramController**: Controlador para manejar las operaciones relacionadas con los programas.
  - **ProgramRoutes**: Rutas asociadas a las operaciones de programas.
  - **ProgramService**: Servicio que contiene la lógica de negocio para los programas.
  - Métodos `get` y `list` para obtener información de los programas.

### Validaciones y Middleware

- Se instaló la librería `zod` para realizar validaciones de datos.
- Se creó un middleware para validar que un ID sea válido según el formato de MongoDB.

### Tipos y Modelos

- Se instalaron los tipos de `express` para mejorar la tipificación en el proyecto.
- Se comentó la asignación de terceros en el modelo `Lead` debido a:
  - Inexistencia de un tercero para el usuario de la semilla.
  - Falta de modelado adecuado para esta relación.

### Validaciones Adicionales

- Se hicieron obligatorios los campos `full_name`, `first_name`, `last_name` y `email` en el modelo `Lead`.
- Se eliminó el `populate` de `contact` en el listado de leads para optimizar las consultas.
- Se agregó paginación en el listado de leads.
- Se implementó una validación en el middleware para evitar la creación de un lead con un email ya existente para un programa específico.

## Frontend

### Formulario y Tabla de Leads

- Se desarrolló un formulario para la creación de leads y una tabla para listar los leads existentes.
- La lógica de guardado de un lead se implementó en el componente padre `Lead`, el cual:
  - Llama al formulario y a la tabla.
  - Maneja la creación de un nuevo lead.
  - Refresca el listado de leads al finalizar la creación.

### Optimización de Renderizado

- Se memorizó (`memo`) los componentes hijos para prevenir renderizados innecesarios y mejorar el rendimiento de la aplicación.

## Aspectos a Mejorar

- Implementar la paginación en el frontend para manejar eficientemente grandes volúmenes de leads en la interfaz de usuario.
