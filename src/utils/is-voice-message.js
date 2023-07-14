

export function isVoiceMessage(interaction) {
    let isAudio = null;
    if (!(interaction.attachments.size === 1)) return isAudio
    for (const [, currentAttachment] of interaction.attachments) {
        isAudio = currentAttachment.contentType === 'audio/ogg' ? currentAttachment.url : null
    }
    return isAudio;
}