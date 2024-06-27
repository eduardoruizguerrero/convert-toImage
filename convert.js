/*
*   "deshabilita" los botones download.
*/
document.getElementById("buttond1ID").setAttribute("disabled", "true");
document.getElementById("buttond2ID").setAttribute("disabled", "true");
document.getElementById("d1ID").setAttribute("hidden", "true");
document.getElementById("d2ID").setAttribute("hidden", "true");
/*
*   Deshabilita los formatos para no elegir nada por error.
*/
document.getElementById("pngID").setAttribute("disabled", "true");
document.getElementById("jpgID").setAttribute("disabled", "true");
document.getElementById("webpID").setAttribute("disabled", "true");
/*
*   Inicio de la carga de archivos, define los parámetros a tener en cuenta.
*/
document.querySelector("#uploadImageID").addEventListener('change', function(e) {
    const files = e.target.files;
    /*
    *   Definimos que el array de archivos no sea mayor a 2.
    */
    const filesToRead = Array.from(files).slice(0,2)
    /*
    *   i es la cantidad de imagenes, comienza siendo 1, debe ser igual o menor a 2 y va sumando de a una imagen.
    */
    for (let i = 1; i <= 2; i++) {
        /*
        *   Remueve las imagenes guardadas en el sessionStorage y elimina sus rutas de acceso.
        */
        sessionStorage.removeItem(`recent-image-${i}`);
        document.querySelector(`#imgRounded${i}`).removeAttribute("src");
    }
    /*
    *   Resetea el select y borra los href.
    */
    document.getElementById("selectTo").selectedIndex = 0;
    deshabilitar();
    /*
    *   Creamos un array con los archivos subidos.
    */
    for (let i = 0; i < filesToRead.length; i++) {
        /*
        *   Archivos a leer [i] = 0,1 en referencia a la primer y segunda imagen.
        */
        const file = filesToRead[i];
        const reader = new FileReader();

        reader.addEventListener("load", function() {
            document.querySelector(`#imgRounded${i + 1}`).setAttribute("src", reader.result);
        });
        /*
        *   Lee la url de cada imagen.
        */
        reader.readAsDataURL(file);
    }
    /*
    *   Habilita los formatos
    */
    document.getElementById("pngID").removeAttribute("disabled");
    document.getElementById("jpgID").removeAttribute("disabled");
    document.getElementById("webpID").removeAttribute("disabled");
});
/*
*   Creamos un evento para darle nombre a las imagenes, así podemos referirnos a ellas facilmente.
*/
document.addEventListener("DOMContentLoaded", () => {
    /*
    *   Identificamos las imagenes.
    */
    const ImageUrl1 = sessionStorage.getItem('recent-image-1');
    const ImageUrl2 = sessionStorage.getItem("recent-image-2");
    /*
    *   Creamos la ruta de acceso para las miniaturas.
    */
    document.querySelector("#imgRounded1").setAttribute("src", ImageUrl1);
    document.querySelector("#imgRounded2").setAttribute("src", ImageUrl2);
})
function convertirAPNG() {
    /*
    *   Capturamos los archivos subidos.
    */
    const inputFile = document.getElementById("uploadImageID");
    const archivos = inputFile.files;
    /*
    *   Creamos un array de archivos.
    */
    for (let i = 0; i < archivos.length; i++) {
        const ficheros = archivos[i];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        /*
        *   Creamos la imagen.
        */
        const imagenActual = URL.createObjectURL(ficheros);
        const imagenToFormat = new Image();
        /*
        *   Cargamos la imagen.
        */
        imagenToFormat.onload = () => {
            canvas.width = imagenToFormat.naturalWidth;
            canvas.height = imagenToFormat.naturalHeight;
            ctx.drawImage(imagenToFormat, 0, 0, canvas.width, canvas.height);
            const imagenConvertida = canvas.toDataURL("image/png", 1.0);
            /*
            *   Captura el nombre de la imagen a subir y elimina su extension original.
            */
            const imagewithoutext = ficheros.name.split('.').slice(0, -1).join('.');
            /*
            *   Le otorga un href a cada botón download.
            *   Le da el nombre del archivo junto con la nueva extensión a nuestro nuevo archivo.
            */
            if (i === 0) {
                const download1 = document.getElementById("d1ID");
                download1.href = imagenConvertida;
                download1.download = `${imagewithoutext}.png`;
                /*
                *   "habilita" los botones download.
                */
                document.getElementById("buttond1ID").removeAttribute("disabled");
                document.getElementById("d1ID").removeAttribute("hidden");
                document.getElementById("pd1ID").setAttribute("hidden", "true");
            }if (i === 1) {
                const download2 = document.getElementById("d2ID");
                download2.href = imagenConvertida;
                download2.download = `${imagewithoutext}.png`;
                /*
                *   "habilita" los botones download.
                */
                document.getElementById("buttond2ID").removeAttribute("disabled");
                document.getElementById("d2ID").removeAttribute("hidden");
                document.getElementById("pd2ID").setAttribute("hidden", "true");
            }
        };
        imagenToFormat.src = imagenActual;
    }
}
function convertirAJPG() {
    /*
    *   Capturamos los archivos subidos.
    */
    const inputFile = document.getElementById("uploadImageID");
    const archivos = inputFile.files;
    /*
    *   Creamos un array de archivos.
    */
    for (let i = 0; i < archivos.length; i++) {
        const ficheros = archivos[i];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        /*
        *   Creamos la imagen.
        */
        const imagenActual = URL.createObjectURL(ficheros);
        const imagenToFormat = new Image();
        /*
        *   Cargamos la imagen.
        */
        imagenToFormat.onload = () => {
            canvas.width = imagenToFormat.naturalWidth;
            canvas.height = imagenToFormat.naturalHeight;
            ctx.drawImage(imagenToFormat, 0, 0, canvas.width, canvas.height);
            const imagenConvertida = canvas.toDataURL("image/jpeg", 1.0);
            /*
            *   Captura el nombre de la imagen a subir y elimina su extension original.
            */
            const imagewithoutext = ficheros.name.split('.').slice(0, -1).join('.');
            /*
            *   Le otorga un href a cada botón download.
            *   Le da el nombre del archivo junto con la nueva extensión a nuestro nuevo archivo.
            */
            if (i === 0) {
                const download1 = document.getElementById("d1ID");
                download1.href = imagenConvertida;
                download1.download = `${imagewithoutext}.jpg`;
                /*
                *   "habilita" los botones download.
                */
                document.getElementById("buttond1ID").removeAttribute("disabled");
                document.getElementById("d1ID").removeAttribute("hidden");
                document.getElementById("pd1ID").setAttribute("hidden", "true");
            }if (i === 1) {
                const download2 = document.getElementById("d2ID");
                download2.href = imagenConvertida;
                download2.download = `${imagewithoutext}.jpg`;
                /*
                *   "habilita" los botones download.
                */
                document.getElementById("buttond2ID").removeAttribute("disabled");
                document.getElementById("d2ID").removeAttribute("hidden");
                document.getElementById("pd2ID").setAttribute("hidden", "true");
            }
        };
        imagenToFormat.src = imagenActual;
    }
}
function convertirAWEBP() {
    /*
    *   Capturamos los archivos subidos.
    */
    const inputFile = document.getElementById("uploadImageID");
    const archivos = inputFile.files;
    /*
    *   Creamos un array de archivos.
    */
    for (let i = 0; i < archivos.length; i++) {
        const ficheros = archivos[i];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        /*
        *   Cargamos la imagen.
        */
        const imagenActual = URL.createObjectURL(ficheros);
        const imagenToFormat = new Image();
        /*
        *   Cargamos la imagen.
        */
        imagenToFormat.onload = () => {
            canvas.width = imagenToFormat.naturalWidth;
            canvas.height = imagenToFormat.naturalHeight;
            ctx.drawImage(imagenToFormat, 0, 0, canvas.width, canvas.height);
            const imagenConvertida = canvas.toDataURL("image/webp", 1.0)
            /*
            *   Captura el nombre de la imagen a subir y elimina su extension original.
            */
            const imagewithoutext = ficheros.name.split('.').slice(0, -1).join('.');;
            /*
            *   Le otorga un href a cada botón download.
            *   Le da el nombre del archivo junto con la nueva extensión a nuestro nuevo archivo.
            */
            if (i === 0) {
                const download1 = document.getElementById("d1ID");
                download1.href = imagenConvertida;
                download1.download = `${imagewithoutext}.webp`;
                /*
                *   "habilita" los botones download.
                */
                document.getElementById("buttond1ID").removeAttribute("disabled");
                document.getElementById("d1ID").removeAttribute("hidden");
                document.getElementById("pd1ID").setAttribute("hidden", "true");
            }if (i === 1) {
                const download2 = document.getElementById("d2ID");
                download2.href = imagenConvertida;
                download2.download = `${imagewithoutext}.webp`;
                /*
                *   "habilita" los botones download.
                */
                document.getElementById("buttond2ID").removeAttribute("disabled");
                document.getElementById("d2ID").removeAttribute("hidden");
                document.getElementById("pd2ID").setAttribute("hidden", "true");
            }
        };
        imagenToFormat.src = imagenActual;
    }
}
/*
*   "deshabilita" los botones download.
*/
function deshabilitar(){
    const download1 = document.getElementById("d1ID");
    download1.href = "";
    download1.download = "";
    const download2 = document.getElementById("d2ID");
    download2.href = "";
    download2.download = "";
    document.getElementById("buttond1ID").setAttribute("disabled", "true");
    document.getElementById("buttond2ID").setAttribute("disabled", "true");
    document.getElementById("d1ID").setAttribute("hidden", "true");
    document.getElementById("d2ID").setAttribute("hidden", "true");
    document.getElementById("pd1ID").removeAttribute("hidden");
    document.getElementById("pd2ID").removeAttribute("hidden");
}
/*
*   Select.
*/
document.getElementById("selectTo").addEventListener('change', function(){
    const optionSelect = this.value;
    if (optionSelect === "disabled"){
        const download1 = document.getElementById("d1ID");
        download1.href = "";
        download1.download = "";
        const download2 = document.getElementById("d2ID");
        download2.href = "";
        download2.download = "";
        /*
        *   "deshabilita" los botones download.
        */
        document.getElementById("buttond1ID").setAttribute("disabled", "true");
        document.getElementById("buttond2ID").setAttribute("disabled", "true");
        document.getElementById("d1ID").setAttribute("hidden", "true");
        document.getElementById("d2ID").setAttribute("hidden", "true");
        document.getElementById("pd1ID").removeAttribute("hidden");
        document.getElementById("pd2ID").removeAttribute("hidden");
    }
    /*
    *   Según la opción que elijamos en select, este nos devuelve una función.
    */
    if (optionSelect === "png"){
        convertirAPNG();
    }
    if (optionSelect === "jpg"){
        convertirAJPG();
    }
    if (optionSelect === "webp"){
        convertirAWEBP();
    }
})