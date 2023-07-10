import 'dotenv/config'
import {SlashCommandBuilder} from "discord.js"
import {isVoiceMessage} from "../../utils/is-voice-message.js"
import {getBuffer} from "../../utils/get-buffer.js"
import {successEmbed, failedEmbed} from "../../embeds.js"

export const speechToTextCommandBuilder = {
    data: new SlashCommandBuilder()
        .setName('stt')
        .setDescriptionLocalizations({
            ru: 'преобразование речи в текст',
        })
        .setDescription('speech to text')
        .addStringOption(option =>
            option.setName('message-id')
                .setDescriptionLocalizations({
                    ru: 'Введите id сообщения, в котором находится голосовое сообщение',
                })
                .setDescription('Enter the id of the message where the voice message is located')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addBooleanOption(option =>
            option.setName('visible-only-for-me')
                .setDescriptionLocalizations({
                    ru: 'Определяет, будет ли расшифровка голосового сообщения отображаться только для вас',
                })
                .setDescription('Determines whether the transcript of the voice message will be displayed only for you')
                .setRequired(true)
        ),
    async execute(interaction) {
        const messageId = interaction.options.get('message-id').value;
        const isVisibleOnlyForMe = interaction.options.get('visible-only-for-me').value;

        try {
            const findMessage = await interaction.channel.messages.fetch(messageId)
            const url = isVoiceMessage(findMessage)
            if (url) {
               try {
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

                   successEmbed.setDescription(result || (locales[interaction.locale] ?? "There is no speech in the voice message"))
                   interaction.reply({ ephemeral: isVisibleOnlyForMe, embeds: [successEmbed] })
               } catch (err) {
                   const locales = {
                       ru: "Ошибка распознования"
                   }

                   failedEmbed.setDescription(locales[interaction.locale] ?? 'Recognition error')
                   interaction.reply({ephemeral: true, embeds: [failedEmbed] })
               }
            } else {

                const locales = {
                    ru: 'Не является голосовым сообщением'
                }

                failedEmbed.setDescription(locales[interaction.locale] ?? 'Is not a voice message')
                interaction.reply({ephemeral: true, embeds: [failedEmbed] })
            }
        } catch (err) {
            console.log(err)

            const locales = {
                ru: 'Сообщение не найдено'
            }

            failedEmbed.setDescription(locales[interaction.locale] ?? 'Message not found')
            interaction.reply({ ephemeral: true, embeds: [failedEmbed] });
        }
    }
}