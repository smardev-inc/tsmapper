export class MapProfile {
    private namePrefixes: string[] = [];
    public caseSensitive = false;

    public usePrefixes(...args: string[]): void {
        args.forEach((i) => this.namePrefixes.push(i));
    }

    public get prefixes(): ReadonlyArray<string> {
        const result: ReadonlyArray<string> = this.namePrefixes;
        return result;
    }
}
