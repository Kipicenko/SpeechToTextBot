import 'dotenv/config'
import {getBuffer} from "./get-buffer.js";
import {failedEmbed, successEmbed} from "../embeds.js";
import {isVoiceMessage} from "./is-voice-message.js";
import prettyMs from 'pretty-ms';
import {cooldownsCollection} from "../collections.js"


export async function recognize({interaction, message}) {
    const url = isVoiceMessage(message)

    if (url) {
        try {
            const cooldown = cooldownsCollection.get(`${interaction.commandName}_${interaction.user.id}`) || 0

            if (Date.now() - cooldown < 0) {
                const locales = {
                    ru: `Тайм-аут команды - ${prettyMs(cooldown - Date.now())}`
                }

                console.log(interaction.user.username, locales.ru)
                failedEmbed.setDescription(locales[interaction.locale] ?? `Command timeout - ${prettyMs(cooldown - Date.now())}`)
                return interaction.reply({ ephemeral: true, embeds: [failedEmbed] });
            }

            const stream = await fetch(url)
            const buffer = await getBuffer(stream)

            const data = await fetch('https://stt.api.cloud.yandex.net/speech/v1/stt:recognize', {
                method: 'POST',
                headers: {
                    'Authorization': 'Api-Key ' + process.env.YA_API_KEY
                },
                body: buffer
            })
            const {result} = await data.json();

            const locales = {
                ru: "В голосовом сообщении отсутствует речь"
            }

            console.log(interaction.user.username, result || locales.ru)
            successEmbed.setDescription(result || (locales[interaction.locale] ?? "There is no speech in the voice message"))

            cooldownsCollection.set(`${interaction.commandName}_${interaction.user.id}`, Date.now() + 15000)
            setTimeout(() => cooldownsCollection.delete(`${interaction.commandName}_${interaction.user.id}`),15000)

            await interaction.reply({ ephemeral: false, embeds: [successEmbed] })
        } catch (err) {
            const locales = {
                ru: "Ошибка распознования"
            }

            console.log(interaction.user.username, locales.ru)
            failedEmbed.setDescription(locales[interaction.locale] ?? 'Recognition error')
            await interaction.reply({ephemeral: true, embeds: [failedEmbed] })
        }
    } else {

        const locales = {
            ru: 'Не является голосовым сообщением'
        }

        console.log(interaction.user.username, locales.ru)
        failedEmbed.setDescription(locales[interaction.locale] ?? 'Is not a voice message')
        await interaction.reply({ephemeral: true, embeds: [failedEmbed] })
    }
}