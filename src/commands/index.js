import {helpCommandBuilder} from "./slash-commands/help/index.js"
import {speechToTextContextMenuCommandBuilder} from "./context-menu-commands/speech-to-text/index.js";
import {commandsCollection} from "../collections.js"

export const privateCommands = ['convert-to-text']

const commands = [
    speechToTextContextMenuCommandBuilder,
    helpCommandBuilder
]

export function initializeCollectionsCommand() {
    commands.forEach(command => {
        commandsCollection.set(command.data.name, command)
    })
}

export function getDeployCommands() {
    return commands.map(command => command.data.toJSON())
}