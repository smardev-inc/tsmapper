/* eslint @typescript-eslint/no-explicit-any: 0 */
import * as Utils from './utils';
class MapIntruction {
    constructor(targetProperty, mapper) {
        this.targetpropertyName = targetProperty;
        this.mapper = mapper;
    }
    get propertyName() {
        return this.targetpropertyName;
    }
    getMappedValue(obj) {
        return this.mapper(obj);
    }
}
export class MapperBuilder {
    constructor(sourcePropertyName) {
        this.sourcePropertyName = sourcePropertyName;
    }
    custom(mapper) {
        this.mapper = mapper;
    }
    build() {
        const propName = this.sourcePropertyName;
        if (this.mapper) {
            const mapper = this.mapper;
            return function (obj) {
                const sourceValue = obj[propName];
                return mapper(sourceValue);
            };
        }
        else {
            return function (obj) {
                return obj[propName];
            };
        }
    }
}
export class MapInstructionBuilder {
    constructor(property) {
        this.propertyyName = property;
    }
    from(propertyName) {
        this.mapperBuilder = new MapperBuilder(propertyName);
        return this.mapperBuilder;
    }
    custom(mapper) {
        this.mapper = mapper;
    }
    build() {
        if (Utils.isUndefined(this.mapper)) {
            const mapper = this.mapperBuilder?.build();
            return new MapIntruction(this.propertyyName, mapper);
        }
        else {
            return new MapIntruction(this.propertyyName, this.mapper);
        }
    }
}
export class ObjectMapConfiguration {
    constructor() {
        this.instructions = new Set();
    }
    addInstruction(value) {
        this.instructions.add(value);
    }
    get mappingInstructions() {
        return Array.from(this.instructions.values());
    }
}
export class ObjectMapConfigurationBuilder {
    constructor() {
        this.builders = new Set();
    }
    map(name) {
        const builder = new MapInstructionBuilder(name);
        this.builders.add(builder);
        return builder;
    }
    build() {
        const result = new ObjectMapConfiguration();
        Array.from(this.builders.values()).forEach((p) => result.addInstruction(p.build()));
        return result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0bWFwY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvb2JqZWN0bWFwY29uZmlndXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxrREFBa0Q7QUFFbEQsT0FBTyxLQUFLLEtBQUssTUFBTSxTQUFTLENBQUM7QUFPakMsTUFBTSxhQUFhO0lBSWYsWUFBbUIsY0FBc0IsRUFBRSxNQUF5QjtRQUNoRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsY0FBYyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFXLFlBQVk7UUFDbkIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDbkMsQ0FBQztJQUVNLGNBQWMsQ0FBQyxHQUFRO1FBQzFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8sYUFBYTtJQUl0QixZQUFtQixrQkFBMEI7UUFDekMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0lBQ2pELENBQUM7SUFFTSxNQUFNLENBQUMsTUFBbUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVNLEtBQUs7UUFDUixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMzQixPQUFPLFVBQVUsR0FBUTtnQkFDckIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyxPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUM7U0FDTDthQUFNO1lBQ0gsT0FBTyxVQUFVLEdBQVE7Z0JBQ3JCLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQztTQUNMO0lBQ0wsQ0FBQztDQUNKO0FBRUQsTUFBTSxPQUFPLHFCQUFxQjtJQUs5QixZQUFtQixRQUFnQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0lBRU0sSUFBSSxDQUFDLFlBQW9CO1FBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBeUI7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVNLEtBQUs7UUFDUixJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sTUFBTSxHQUFzQixJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQzlELE9BQU8sSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN4RDthQUFNO1lBQ0gsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFxQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDaEY7SUFDTCxDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8sc0JBQXNCO0lBQW5DO1FBQ1ksaUJBQVksR0FBK0IsSUFBSSxHQUFHLEVBQXlCLENBQUM7SUFTeEYsQ0FBQztJQVBVLGNBQWMsQ0FBQyxLQUE0QjtRQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBVyxtQkFBbUI7UUFDMUIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8sNkJBQTZCO0lBQTFDO1FBQ1ksYUFBUSxHQUErQixJQUFJLEdBQUcsRUFBeUIsQ0FBQztJQWFwRixDQUFDO0lBWFUsR0FBRyxDQUFDLElBQVk7UUFDbkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRU0sS0FBSztRQUNSLE1BQU0sTUFBTSxHQUFHLElBQUksc0JBQXNCLEVBQUUsQ0FBQztRQUM1QyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0oifQ==