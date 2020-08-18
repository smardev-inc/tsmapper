"use strict";
/* eslint @typescript-eslint/no-explicit-any: 0 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectMapConfigurationBuilder = exports.ObjectMapConfiguration = exports.MapInstructionBuilder = exports.MapperBuilder = void 0;
const Utils = __importStar(require("./utils"));
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
class MapperBuilder {
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
exports.MapperBuilder = MapperBuilder;
class MapInstructionBuilder {
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
        var _a;
        if (Utils.isUndefined(this.mapper)) {
            const mapper = (_a = this.mapperBuilder) === null || _a === void 0 ? void 0 : _a.build();
            return new MapIntruction(this.propertyyName, mapper);
        }
        else {
            return new MapIntruction(this.propertyyName, this.mapper);
        }
    }
}
exports.MapInstructionBuilder = MapInstructionBuilder;
class ObjectMapConfiguration {
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
exports.ObjectMapConfiguration = ObjectMapConfiguration;
class ObjectMapConfigurationBuilder {
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
exports.ObjectMapConfigurationBuilder = ObjectMapConfigurationBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0bWFwY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvb2JqZWN0bWFwY29uZmlndXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsa0RBQWtEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxELCtDQUFpQztBQU9qQyxNQUFNLGFBQWE7SUFJZixZQUFtQixjQUFzQixFQUFFLE1BQXlCO1FBQ2hFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxjQUFjLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVELElBQVcsWUFBWTtRQUNuQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNuQyxDQUFDO0lBRU0sY0FBYyxDQUFDLEdBQVE7UUFDMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDSjtBQUVELE1BQWEsYUFBYTtJQUl0QixZQUFtQixrQkFBMEI7UUFDekMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0lBQ2pELENBQUM7SUFFTSxNQUFNLENBQUMsTUFBbUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVNLEtBQUs7UUFDUixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMzQixPQUFPLFVBQVUsR0FBUTtnQkFDckIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyxPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUM7U0FDTDthQUFNO1lBQ0gsT0FBTyxVQUFVLEdBQVE7Z0JBQ3JCLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQztTQUNMO0lBQ0wsQ0FBQztDQUNKO0FBMUJELHNDQTBCQztBQUVELE1BQWEscUJBQXFCO0lBSzlCLFlBQW1CLFFBQWdCO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxJQUFJLENBQUMsWUFBb0I7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUF5QjtRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRU0sS0FBSzs7UUFDUixJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sTUFBTSxHQUFHLE1BQW1CLElBQUksQ0FBQyxhQUFhLDBDQUFFLEtBQUssRUFBRSxDQUFDO1lBQzlELE9BQU8sSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN4RDthQUFNO1lBQ0gsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFxQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDaEY7SUFDTCxDQUFDO0NBQ0o7QUExQkQsc0RBMEJDO0FBRUQsTUFBYSxzQkFBc0I7SUFBbkM7UUFDWSxpQkFBWSxHQUErQixJQUFJLEdBQUcsRUFBeUIsQ0FBQztJQVN4RixDQUFDO0lBUFUsY0FBYyxDQUFDLEtBQTRCO1FBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFXLG1CQUFtQjtRQUMxQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDSjtBQVZELHdEQVVDO0FBRUQsTUFBYSw2QkFBNkI7SUFBMUM7UUFDWSxhQUFRLEdBQStCLElBQUksR0FBRyxFQUF5QixDQUFDO0lBYXBGLENBQUM7SUFYVSxHQUFHLENBQUMsSUFBWTtRQUNuQixNQUFNLE9BQU8sR0FBRyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTSxLQUFLO1FBQ1IsTUFBTSxNQUFNLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1FBQzVDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQWRELHNFQWNDIn0=