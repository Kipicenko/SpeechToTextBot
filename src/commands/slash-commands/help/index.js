import {SlashCommandBuilder} from "discord.js";
import {helpEmbed} from "../../../embeds.js"

export const helpCommandBuilder = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescriptionLocalizations({
            ru: 'Инструкция о том, как начать пользоваться ботом',
        })
        .setDescription('Instruction on how to start using the bot'),
    async execute(interaction) {
        const localesTitle = {
            ru: 'Инструкция'
        }
        const localesDescription = {
            ru: `Чтобы расшифровать речь из голосового сообщения, вам необходимо:

1. Щелкнуть правой кнопкой мыши по голосовому сообщению. Если вы используете телефон, зажмите палец на голосовом сообщении, пока не откроется контекстное меню.
2. В открывшемся контекстном меню выберите опцию **"Приложение"**.
3. Далее запускаем команду **\`convert-to-text\`** и получаем расшифрованную речь в виде текста с голосового сообщения.`
        }
        helpEmbed.setTitle(localesTitle[interaction.locale] ?? 'Instruction')
        helpEmbed.setDescription(localesDescription[interaction.locale] ?? `To transcribe speech from a voice message, you need to:

1. Right-click on the voice message. If you are using a phone, long-press the voice message until the context menu appears.
2. In the opened context menu, select the **"Application"** option.
3. Next, execute the command **\`convert-to-text\`** and obtain the transcribed speech as text from the voice message.`)
        console.log(interaction.user.username, "using help")
        interaction.reply({ ephemeral: true, embeds: [helpEmbed] })
    }
}