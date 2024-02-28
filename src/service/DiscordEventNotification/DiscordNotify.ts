const webhookULR = "https://discord.com/api/webhooks/1204823528101249074/sFZ2df3K6Ha8-hpfAIYg8myKI8aaLjnkxXSVAJ0jcFHmZrlDpVyZMQJqM4XmoS_HRUl4";
export const notifyDiscord = async (message: string) => {
    const body = {
        content: message
    }
    const response = await fetch(webhookULR, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body)
    })
    if (!response.ok) {
        console.log("Error al enviar el mensaje")
        return false;
    }
    return true;
}