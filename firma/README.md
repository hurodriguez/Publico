# Activación basada en eventos de Outlook para configurar la firma

## Se aplica a

- Outlook
  - Windows
  - web browser

## Prerequisites

- Microsoft 365


## Ejecutar la muestra

Puede ejecutar este ejemplo en Outlook en Windows o en un navegador. Los archivos web del complemento se sirven desde este repositorio en GitHub.

1. Descargue el archivo **manifest.xml** de esta muestra a una carpeta en su computadora.
1. Realice una transferencia local del manifiesto del complemento en Outlook en la web o en Windows siguiendo las instrucciones manuales del artículo [Transferencia local de complementos de Outlook para pruebas](https://docs.microsoft.com/office/dev/add- ins/outlook/sideload-outlook-add-ins-for-testing).

### Pruébalo

Una vez que se carga el complemento, utilice los siguientes pasos para probar la funcionalidad.

1. Abra Outlook en Windows o en un navegador.
1. Cree un nuevo mensaje o cita.

    > Debería ver una notificación en la parte superior del mensaje que dice: **Establezca su firma con el complemento de muestra PnP.**

1. Elija **Establecer firmas**. Esto abrirá el panel de tareas para el complemento.
1. En el panel de tareas, complete los campos para los datos de su firma. Luego elige **Guardar**.
1. El panel de tareas cargará una página de plantillas de muestra. Puede asignar las plantillas a una acción **Correo nuevo**, **Responder** o **Reenviar**. Una vez que haya asignado las plantillas que desea usar, seleccione **Guardar**.

La próxima vez que cree un mensaje o una cita, verá la firma que seleccionó aplicada por el complemento.

## Ejecute la muestra desde localhost

Si prefiere alojar el servidor web para la muestra en su computadora, siga estos pasos:

1. Instale una versión reciente de [npm](https://www.npmjs.com/get-npm) y [Node.js](https://nodejs.org/) en su computadora. Para verificar si ya instaló estas herramientas, ejecute los comandos `node -v` y `npm -v` en su terminal.
1. Necesita un servidor http para ejecutar el servidor web local. Si aún no lo ha instalado, ejecute el siguiente comando.

    ```consola
    npm install --servidor http global
    ```

1. Use una herramienta como openssl para generar un certificado autofirmado que pueda usar para el servidor web. Mueva los archivos cert.pem y key.pem a la carpeta raíz de esta muestra.
1. Desde un símbolo del sistema, vaya a la carpeta raíz y ejecute el siguiente comando.

    ```consola
    http-servidor-S --cors. -pag 3000
    ```

1. Para redirigir a localhost, ejecute office-addin-https-reverse-proxy. Si no ha instalado esto, ejecute el siguiente comando.

    ```consola
    npm install --global office-addin-https-reverse-proxy
    ```

    Para redirigir, ejecute lo siguiente en otro símbolo del sistema.

    ```consola
    Office-addin-https-reverse-proxy --url http://localhost:3000
    ```

1. Realice una instalación de prueba de `manifest-localhost.xml` en Outlook en la web o en Windows siguiendo las instrucciones del manual en el artículo [Instalación de prueba de complementos de Outlook](https://docs.microsoft.com/office/dev/ add-ins/outlook/sideload-outlook-add-ins-for-testing).
1. [¡Prueba la muestra!](#pruébalo)

## Partes clave de esta muestra

### Configure la activación basada en eventos en el manifiesto

El manifiesto configura un tiempo de ejecución que se carga específicamente para manejar la activación basada en eventos. El siguiente elemento `<Runtime>` especifica una identificación de recurso de página HTML que carga el tiempo de ejecución en Outlook en la web. El elemento `<Override>` especifica el archivo JavaScript en su lugar, para cargar el tiempo de ejecución de Outlook en Windows. Outlook en Windows no usa la página HTML para cargar el tiempo de ejecución.

```xml
<Tiempo de ejecución resid="Autorun">
  <Override type="javascript" resid="runtimeJs"/>
...
<bt:Url id="Autorun" DefaultValue="https://officedev.github.io/Office-Add-in-samples/Samples/outlook-set-signature/src/runtime/HTML/autorunweb.html">< /bt:URL>
<bt:Url id="runtimeJs" DefaultValue="https://officedev.github.io/Office-Add-in-samples/Samples/outlook-set-signature/src/runtime/Js/autorunshared.js">< /bt:URL>
```

El complemento maneja dos eventos que están asignados a la función `checkSignature()`.

```xml
<Eventos de lanzamiento>
  <LaunchEvent Type="OnNewMessageCompose" FunctionName="checkSignature" />
  <LaunchEvent Type="OnNewAppointmentOrganizer" FunctionName="checkSignature" />
</Eventos de lanzamiento>
```

### Manejo de eventos y uso de la API setSignatureAsync

Cuando el usuario crea un nuevo mensaje o cita, Outlook cargará los archivos especificados en el manifiesto para manejar los eventos `OnNewMessageCompose` y `OnNewAppointmentOrganizer`. Outlook en la web cargará la página `autorunweb.html`, que luego también cargará `autorunweb.js` y `autorunshared.js`.

El archivo `autorunweb.js` contiene una versión de la función `insert_auto_signature` que se usa específicamente cuando se ejecuta en Outlook en la web. La [API setSignatureAsync() no se puede usar en Outlook en la web para citas](https://docs.microsoft.com/javascript/api/outlook/office.body?view=outlook-js-preview#setSignatureAsync_data__options__callback_). Por lo tanto, `insert_auto_signature` inserta la firma en una nueva cita escribiendo directamente en el cuerpo del texto de la cita.

El archivo `autorunshared.js` contiene la función `checkSignature` que maneja los eventos de Outlook. También contiene código adicional que se comparte y se carga cuando se usa el complemento en Outlook en el
