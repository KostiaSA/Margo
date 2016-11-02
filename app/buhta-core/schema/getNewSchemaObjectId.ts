export function getNewSchemaObjectId(): string {
    return "so" + Math.random().toString(36).slice(2, 20 + 2);  // общая длина 22
}