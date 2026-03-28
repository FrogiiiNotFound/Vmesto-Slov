export const lengthLimit = (text: string, maxLength = 50) => {
    if (!text || text.length <= maxLength) return text;

    const truncated = text.slice(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(" ");

    return truncated.slice(0, lastSpaceIndex) + "...";
};
