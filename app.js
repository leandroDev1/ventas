const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowMedia = addKeyword(EVENTS.MEDIA)
 .addAnswer(['Gracias por adquirir o renovar su cuenta', 'Digame que cuentas esta renovando o que cuentas esta adquiriendo y en unos minutos un asesor le pasara la cuenta', '*Importante* : el horario de atencion es desde las 9am hasta las 11pm' , 
    '*Si esta comprando fuera de ese horario tendra que esperar estar en ese horario para obtener sus cuentas*'
 ]);

const flowSoporte = addKeyword(EVENTS.ACTION) .addAnswer('Por favor si quiere contactarse con un encargado envie mensaje por Whatsapp al numero *940847242*') .addAnswer('Porfavor escriba *Inicio* para volver al menu principal');

const flowFaq = addKeyword(EVENTS.ACTION) .addAnswer(['Estos son las preguntas frecuentes', 'PDF : https://drive.google.com/file/d/15IImzBCwi4eBQEMDMqnJNGBHQJulBTdy/view?usp=sharing']) .addAnswer('Porfavor escriba *Inicio* para volver al menu principal');

const flowRenovar = addKeyword(EVENTS.ACTION) .addAnswer(['Para renovar su cuenta o cuentas realice el pago correspondiente', 'Al finalizar me dice que cuentas esta renovando'])
    .addAnswer(['Los métodos de pagos disponibles son los siguientes:','Titular: Nahin Meza Egoavil', 
    'Plin: 940847242',
    'Transferencio bancaria',
    'CCI : 003-898-013352497101-46',
    'Numero de cuenta: 898 3352497101',
    'Tipo de cuenta: Ahorros Soles'
]
) 
.addAnswer(
[
    '1️⃣ Regresar al menu princial',
    '2️⃣ Pago realizado',
],
{ capture: true },
async (ctx, { gotoFlow, fallBack, flowDynamic}) => {
if (!["1", "2",].includes(ctx.body)) {
    return fallBack(
        "Por favor selecciona una de las opciones."
    );
}
switch (ctx.body) {
    case "1":
        return gotoFlow(flowPrincipal2);
    case "2":
        return await flowDynamic('Por favor envie comprobante para enviarle la cuenta o actualizar y digame su nombre si no esta registrado en el sistema') ;
}
}
);

const flowPagos = addKeyword(EVENTS.ACTION) .addAnswer(['Los métodos de pagos disponibles son los siguientes:','Titular: Nahin Meza Egoavil', 
        'Plin: 940847242',
        'Transferencio bancaria',
        'CCI : 003-898-013352497101-46',
        'Numero de cuenta: 898 3352497101',
        'Tipo de cuenta: Ahorros Soles'
    ]
) 
    .addAnswer(
    [
        '1️⃣ Regresar al menu princial',
        '2️⃣ Pago realizado',
    ],
{ capture: true },
async (ctx, { gotoFlow, fallBack, flowDynamic}) => {
    if (!["1", "2",].includes(ctx.body)) {
        return fallBack(
            "Por favor selecciona una de las opciones."
        );
    }
    switch (ctx.body) {
        case "1":
            return gotoFlow(flowPrincipal2);
        case "2":
            return await flowDynamic('Por favor envie comprobante para enviarle la cuenta o actualizar y digame su nombre si no esta registrado en el sistema') ;
    }
}
);

const flowSeguidores = addKeyword(EVENTS.ACTION) .addAnswer('La venta de seguidores en redes aun no esta disponible, proximamente...') 
    .addAnswer( 'Porfavor escriba *Inicio* para volver al menu principal'
);

const flowPrecios = addKeyword(EVENTS.ACTION) .addAnswer('Precio de cuenta por 1 perfil',{ media: "https://i.imgur.com/ULJkPxV.png"}) 
    .addAnswer('Precio por cuenta completa', { media: "https://i.imgur.com/kRmhpxu.png" }) 
    .addAnswer(
    [
        'Elija una opcion para continuar',
        '1️⃣ Metodos de pago',
        '2️⃣ Regresar al menu princial',
        '3️⃣ Preguntas frecuentes ❓',
    ],
{ capture: true },
async (ctx, { gotoFlow, fallBack, flowDynamic}) => {
    if (!["1", "2", "3", ].includes(ctx.body)) {
        return fallBack(
            "Por favor selecciona una de las opciones."
        );
    }
    switch (ctx.body) {
        case "1":
            return gotoFlow(flowPagos);
        case "2":
            return gotoFlow(flowPrincipal2);
        case "3":
            return gotoFlow(flowFaq);
    }
}
);


const flowPrincipal2 = addKeyword([EVENTS.ACTION])
    .addAnswer(
        [
            '✨ Por favor, elige una de estas opciones para continuar:',
            '1️⃣ Cuentas de Streaming 📺',
            '2️⃣ Seguidores , likes y comentarios en Redes Sociales 📈',
            '3️⃣ Ayuda con mi cuenta 🔧',
            '4️⃣ Preguntas frecuentes ❓',
            '5️⃣ Renovar Plan 🔄',
            '6️⃣ Métodos de Pago 💳',            
        ],
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic}) => {
        if (!["1", "2", "3", "4", "5","6", ].includes(ctx.body)) {
            return fallBack(
                "Por favor selecciona una de las opciones."
            );
        }
        switch (ctx.body) {
            case "1":
                return  gotoFlow(flowPrecios);
            case "2":
                return  gotoFlow(flowSeguidores);
            case "3":
                return  gotoFlow(flowSoporte);
            case "4":
                return  gotoFlow(flowFaq);
            case "5":
                return  gotoFlow(flowRenovar);
            case "6":
                return  gotoFlow(flowPagos);
        }
    }
 );

const flowPrincipal = addKeyword(['hola', 'ole','buenas','info','inicio'])
    .addAnswer('👋 ¡Hola! Soy tu asistente virtual de *VivaBuy*. Estoy aquí para ayudarte a conseguir la membresía que más te guste. 😊')
    .addAnswer(
        [
            '✨ Por favor, elige una de estas opciones para continuar:',
            '1️⃣ Cuentas de Streaming 📺',
            '2️⃣ Seguidores , likes y comentarios en Redes Sociales 📈',
            '3️⃣ Ayuda con mi cuenta 🔧',
            '4️⃣ Preguntas frecuentes ❓',
            '5️⃣ Renovar Plan 🔄',
            '6️⃣ Métodos de Pago 💳',   
        ],
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic}) => {
        if (!["1", "2", "3", "4","5", "6", ].includes(ctx.body)) {
            return fallBack(
                "Respuesta no válida, por favor selecciona una de las opciones."
            );
        }
        switch (ctx.body) {
            case "1":
                return  gotoFlow(flowPrecios);
            case "2":
                return  gotoFlow(flowSeguidores);
            case "3":
                return  gotoFlow(flowSoporte);
            case "4":
                return  gotoFlow(flowFaq);
            case "5":
                return  gotoFlow(flowRenovar);
            case "6":
                return  gotoFlow(flowPagos);
        }
    } 
 );

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowPrincipal2,flowPrecios,flowPagos,flowFaq, flowSoporte,flowSeguidores,flowMedia,flowRenovar])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
