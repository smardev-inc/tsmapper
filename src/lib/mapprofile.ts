export class MapProfile {
    private namePrefixes: string[] = [];

    public usePrefixes(...args: string[]): void {
        args.forEach((i) => this.namePrefixes.push(i));
    }
}
