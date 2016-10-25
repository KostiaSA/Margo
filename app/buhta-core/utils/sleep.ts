
export async function sleep(ms: number) {
    return new Promise<void>(
        (resolve: () => void, reject: (error: string) => void) => {
            setTimeout(resolve, ms);
        });
}