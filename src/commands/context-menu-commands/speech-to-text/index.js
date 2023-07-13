import {ContextMenuCommandBuilder, ApplicationCommandType} from "discord.js"
import {recognize} from "../../../utils/recognize.js";

export const showMeTextBuilder = {
    data: new ContextMenuCommandBuilder()
        .setName('Show me text')
        .setType(ApplicationCommandType.Message),

    async execute(interaction) {
        const message = interaction.targetMessage
        await recognize({ interaction, message, isVisibleOnlyForMe: true })
    }
}
export const showEveryoneTextBuilder = {
    data: new ContextMenuCommandBuilder()
        .setName('Show everyone text')
        .setType(ApplicationCommandType.Message),

    async execute(interaction) {
        const message = interaction.targetMessage
        await recognize({ interaction, message, isVisibleOnlyForMe: false })
    }
}