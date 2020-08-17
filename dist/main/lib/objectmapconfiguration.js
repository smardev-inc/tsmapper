"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectMapConfiguration = exports.ObjectMapInstruction = void 0;
class ObjectMapInstruction {
    constructor(name) {
        this.name = name;
    }
    to(name) {
        this.target = name;
    }
}
exports.ObjectMapInstruction = ObjectMapInstruction;
class ObjectMapConfiguration {
    constructor() {
        this.instructions = new Set();
    }
    mapProperty(name) {
        const instruction = new ObjectMapInstruction(name);
        this.instructions.add(instruction);
        return instruction;
    }
    get mappingInstructions() {
        return Array.from(this.instructions.values());
    }
}
exports.ObjectMapConfiguration = ObjectMapConfiguration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0bWFwY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvb2JqZWN0bWFwY29uZmlndXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLG9CQUFvQjtJQUk3QixZQUFtQixJQUFZO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxFQUFFLENBQUMsSUFBWTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUFYRCxvREFXQztBQUVELE1BQWEsc0JBQXNCO0lBQW5DO1FBQ1ksaUJBQVksR0FBOEIsSUFBSSxHQUFHLEVBQXdCLENBQUM7SUFXdEYsQ0FBQztJQVRVLFdBQVcsQ0FBQyxJQUFZO1FBQzNCLE1BQU0sV0FBVyxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkMsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQVcsbUJBQW1CO1FBQzFCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUNKO0FBWkQsd0RBWUMifQ==