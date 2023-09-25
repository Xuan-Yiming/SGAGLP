const nodemailer = require('nodemailer');
exports.enviarCorreo = async (destino, asunto, texto) => {

    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'servicio.acredipucp@gmail.com',
            pass: process.env.ACREDIPUCP_PASSWORD
        }
    }
    //var cuerpo =   "Su codigo es " + codigo +".";
    var mensaje = {
        from: "servicio.acredipucp@gmail.com",
        to: destino,
        subject: asunto,
        text: texto
    }

    const transporte = nodemailer.createTransport(config);
    const info = await transporte.sendMail(mensaje);

}