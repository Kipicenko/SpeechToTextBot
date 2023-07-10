export async function getBuffer(stream) {
    const reader = stream.body.getReader();
    let chunks = [];

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        chunks.push(value);
    }

    return Buffer.concat(chunks)
}