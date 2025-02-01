# PokePeek
Project developed by Luis Mejia (Luigi), where the Pokemon API is consumed, and a React Native app is made.

Este proyecto consiste en una aplicación de Pokedex que consume la API pública de Pokémon. La app tiene una interfaz sencilla que muestra información sobre los Pokémon y permite realizar búsquedas. Fue desarrollada en React Native, utilizando React Query para el manejo de las peticiones y Jest junto con React Native Testing Library para las pruebas.

## Instalación de dependencias

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
  1.1. **Accede a la carpeta del proyecto:**
    ```bash
    
    cd nombre-del-proyecto
  1.2. **Instala las dependencias:**
    ```bash 
    
    npm install
    o si prefieres yarn install

2. **Ejecución de la app**
  2.1. **En Android**
   2.1.1. Asegúrate de tener un emulador de Android configurado y corriendo.
   2.1.2. Para iniciar el proyecto, usa el siguiente comando:
      ```bash
           npm start
  2.2 **En iOS**
  Si tienes un equipo macOS con Xcode, podrás emular la app en iOS.
  Para ejecutar en iOS, usa el siguiente comando:       
     ```bash
       npm run ios.

## 3. **Enfoque tomado**
   La aplicación tiene las siguientes características:

   **Diseño en Figma**
   El diseño de la interfaz de usuario (UI) fue creado en Figma y sirve como guía para el desarrollo. El diseño incluye
   pantallas principales como:
  
  Home: Con un logo diseñado por mí, dos textos de bienvenida y tarjetas con información básica de cada Pokémon (nombre e
  imagen). Al hacer clic en una tarjeta, se muestra un modal con más detalles del Pokémon.
  Details: Se muestra la información detallada de un Pokémon cuando se selecciona desde la pantalla Home o Search.
  Search: Un campo de búsqueda que permite al usuario buscar un Pokémon específico. Al realizar una búsqueda, si la petición
  es válida, se muestra el modal de detalles; en caso contrario, se muestra un mensaje de error.

  **Consumo de la API**
  La app consume la API pública de Pokémon utilizando fetch con await y también se implementó React Query para manejar el
  estado de las peticiones de datos y mejorar el rendimiento de la app.

  **Navegación**
  Se utilizó React Navigation con un stack para la navegación entre las pantallas. La configuración del stack incluye un
  Stack.Group para agrupar pantallas relacionadas.

  **Manejo de Errores**
  Si la búsqueda no es válida o el request a la API falla, la app muestra un mensaje de error en la parte inferior de la
  pantalla.

  **Pruebas**
  Las pruebas fueron implementadas utilizando Jest y React Native Testing Library para garantizar el correcto funcionamiento   de la app.
