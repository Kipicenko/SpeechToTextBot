import {ContextMenuCommandBuilder, ApplicationCommandType} from "discord.js"
import {recognize} from "../../../utils/recognize.js";

export const speechToTextContextMenuCommandBuilder = {
    data: new ContextMenuCommandBuilder()
        .setName('convert-to-text')
        .setType(ApplicationCommandType.Message),

    async execute(interaction) {
        const message = interaction.targetMessage
        await recognize({ interaction, message, isVisibleOnlyForMe: false })
    }
}