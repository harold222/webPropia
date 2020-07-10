/* =====================================*/
/* Puerto del servidor donde se desplegara */
/* =====================================*/
process.env.PORT = process.env.PORT || 3000;

/* =====================================*/
/* Entorno para el despliegue de la db */
/* =====================================*/
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/* =====================================*/
/* Basede datos */
/* =====================================*/

let urlDB;

if(process.env.NODE_ENV === 'development'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = 'mongodb+srv://harold222:Roci12345.@cluster0.znqlw.mongodb.net/cafe';
}

process.env.URLDB = urlDB;