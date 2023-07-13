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
2. В открывшемся контекстном меню выберите опцию **"Приложения"**.
3. Далее запустите команду **\`Show me text\`** или **\`Show everyone text\`** и получите расшифрованную речь в виде текста из голосового сообщения.

- **\`Show me text\`** - Расшифровка голосового сообщения будет видна только вам.
- **\`Show everyone text\`** - Расшифровка голосового сообщения будет видна всем.`
        }
        helpEmbed.setTitle(localesTitle[interaction.locale] ?? 'Instruction')
        helpEmbed.setDescription(localesDescription[interaction.locale] ?? `To transcribe speech from a voice message, you need to:

1. Right-click on the voice message. If you are using a phone, long-press the voice message until the context menu appears.
2. In the opened context menu, select the **"Applications"** option.
3. Next, execute the command **\`Show me text\`** or **\`Show everyone text\`** and obtain the transcribed speech as text from the voice message.

- \`Show me text\` - The transcript of the voice message will be visible only to you.
- \`Show everyone text\` - The transcript of the voice message will be visible to everyone.`)
        console.log(interaction.user.username, "using help")
        interaction.reply({ ephemeral: true, embeds: [helpEmbed] })
    }
}