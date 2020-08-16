export class PropertyDescriptor {
    public name: string;
    public hasGetter: boolean;
    public hasSetter: boolean;

    public constructor(name: string, hasGetter: boolean, hasSetter: boolean) {
        this.name = name;
        this.hasGetter = hasGetter;
        this.hasSetter = hasSetter;
    }
}
