# finca-gt

Creación de servidor HTTP con NodeJS y creación del cliente en Angular para consumir el servicio creado

# Clonación del repositorio

Es necesario contar con git previamente instalado para poder clonar el repositorio correspondiente

# Backend

    - Instalación de dependencias:
        1. Dirigirnos a la carpeta finca-gt/backend
        2. Desde la terminal ejecutar el comando: npm install
        3. Levantar el servidor ejecutando el comando: npm start

    - Probando las rutas: Para este paso es necesario contar con Postman o la herramienta de VSCode
        para realizar peticiones.

        -> La URL_API será: http://localhost:4000/<ruta>

        -> Rutas no autenticadas:
            # Credential
                -> PUT /credential Esta ruta recibe los parámetros por medio del body de la siguiente manera:
                    *   {
                            "key": <key>,
                            "shared_secret": <shared_secret>
                        }
                    * Si la key está almacenada en el servidor, lanzará una respuesta con el status code: 403
                    * Si la key es nueva en el servidor, lanzará una respuesta con el status code: 200

                -> GET /credential Esta ruta no recibe parámetros
                    * Me devolverá como respuesta los datos almacenados en memoria, estos datos se encuentran en la carpeta data/db.json
                        ¡Importante!: El primer registro del arreglo no se debe borrar, ya que se utiliza para la autenticación en los pasos siguientes.
            # User
                -> POST /login Esta ruta recibe los parámetros por medio del body de la siguiente manera:
                    *   {
                            "username": <username>,
                            "password": <password>
                        }
                    * Si el usuario existe en el archivo data/user.json devolverá un estado 200 y generará el token de autenticación
                    * Cada token tiene 4 horas de expiración

                -> POST /register Esta ruta recibe los parámetros por medio del body de la siguiente manera:
                    *   {
                            "username": <username>,
                            "password": <password>
                        }
                    * Si los datos son correctos, procederá a crear el usuario en el archivo data/user.json
                    * Si uno de los campos va vacío, se lanzará un error

        -> Rutas autenticadas:
                -> La autenticación se realiza por medio de los headers, los cuales debe recibir:
                    * Authorization: <token> Este token se genera a través de jsonwebtoken
                    * X-Key: "KEY_1"
                    * X-Route: <ruta de la solicitud>
                    * X-Signature: <signature> Este se genera por medio de la dependencia crypto-js y la encriptación es de tipo HMAC-SHA256

            # Messages
                -> POST /message: Esta ruta recibe los parámetros por medio del body de la siguiente manera:
                    *   {
                            "msg": <msg>,
                            "tags": <tag>
                        }

                - Si la respuestas es exitosa, me devuelve un estatus 200
                - Si no van los headers dentro de la solicitud, me denegará el acceso a la ruta

                -> GET /message/:id Esta ruta recibe el parámetro id por medio de la URL
                    - Si la respuestas es exitosa, me devuelve un estatus 200 y el registro correspondiente

                -> GET /messages/:tag Esta ruta recibe el parámetro tag por medio de la URL
                    - Si la respuestas es exitosa, me devuelve un estatus 200 y el registros con la etiqueta proporcionada

                -> GET /message Esta ruta no recibe ningún parámetro
                    - Si la respuestas es exitosa, me devuelve un estatus 200 y el arreglo de registros almacenados en data/messages.json

    ¡IMPORTANTE! Al momento de probar las rutas autenticadas, se debe revisar el archivo data/signatures.json. Ahí se agregó los valores X-Route y X-Signature
                que se deben agregar en los header. Este archivo se creo a manera de realizar pruebas y que sean más sencillas las mismas

# Frontend

    - Instalación de dependencias:
        1. Dirigirnos a la carpeta finca-gt/my-frontend
        2. Desde la terminal ejecutar el comando: npm install
        3. Levantar el cliente ejecutando el comando: ng serve --open

    - Pantalla de login:
        1. Se debe ingresar al sistema con credenciales válidas. Los usuarios creados se encuentran en el servidor data/user.json
        2. Al momento de iniciar sesión se genera un token, el cual es almacenado en el Local Storage para manejar la sesión del usuario

    - Patanlla de registro
        1. Se deben ingresar los campos correspondientes para crear un nuevo usuario, el cual se almacenará en el servidor data/user.json
        2. Al momento de completar el flujo, se redirije al usuario a al pantalla de login

    - Pantalla Credential
        1. Se desplegarán todos los registros almacenados en el servidor data/db.json
        2. Cuenta con un botón para agregar un nuevo registro
            - Si se desea agregar un nuevo registro se debe ingresar los datos correspondientes, si la key ya existe, le devolverá el error por medio del backend

    - Pantalla Messages
        1. Se desplegarán todos los registros almacenados en el servidor data/messages.json
        2. Cuenta con un botón para agregar un nuevo registro
            - Si se desea agregar un nuevo registro se debe ingresar los datos correspondientes
        3. Cuenta con un filtro de búsqueda por medio de tags
            - El usuario escribe el tag correspondiente y si existen registros que hagan match, se desplegará la información en pantalla
            - Si no exiten registros con el tag ingresado, se desplegará un error en pantalla
        4. Cada registro cuenta con un boton para ver su detalle

😀💻
