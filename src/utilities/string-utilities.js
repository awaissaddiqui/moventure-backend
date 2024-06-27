// I have given some string utilities that are used mostly in many projects:

// Convert a string to title case (capitalize first letter of each word)
export const toTitleCase = (string_, separator) =>
    string_
        .split(separator)
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join(' ');


// Converts a string into a slug format for use in URLs.
export const slugify = string_ =>
    string_
        .toLowerCase()
        .replaceAll(/\s+/g, '-')
        .replaceAll(/[^\w-]+/g, '');


// Remove non-alphanumeric characters from a string
export const removeNonAlphanumeric = string_ =>
    string_.replaceAll(/[^\dA-Za-z]/g, '');

// Remove extra whitespace and collapse multiple spaces into one
export const normalizeWhitespace = string_ =>
    string_
        .replaceAll(/\s+/g, ' ')
        .trim();

// Convert a string to sentence case (capitalize first letter of first word)
export const toSentenceCase = string_ =>
    string_.replaceAll(/(^\w|\.\s*\w)/g, char => char.toUpperCase());

