/* eslint @typescript-eslint/no-explicit-any: 0 */

export class MapBuilder {
    private sourcePropertyName: string;
    private mapper: ((obj: any) => any) | undefined;

    public constructor(sourcePropertyName: string) {
        this.sourcePropertyName = sourcePropertyName;
    }

    public custom(mapper: (propertyValue: any) => any): void {
        this.mapper = mapper;
    }

    public build(): (obj: any) => any {
        const propName = this.sourcePropertyName;
        if (this.mapper) {
            const mapper = this.mapper;
            return function (obj: any): any {
                const sourceValue = obj[propName];
                return mapper(sourceValue);
            };
        } else {
            return function (obj: any): any {
                return obj[propName];
            };
        }
    }
}
