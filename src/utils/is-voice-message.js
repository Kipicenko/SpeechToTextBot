

export function isVoiceMessage(interaction) {
    let isAudio = null;
    if (!(interaction.attachments.size === 1)) return isAudio
    for (const el of interaction.attachments) {
        const [, currentAttachment] = el
        isAudio = currentAttachment.contentType === 'audio/ogg' ? currentAttachment.url : null
    }
    return isAudio;
}