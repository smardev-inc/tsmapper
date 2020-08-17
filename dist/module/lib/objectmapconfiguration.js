export class ObjectMapInstruction {
    constructor(name) {
        this.name = name;
    }
    to(name) {
        this.target = name;
    }
}
export class ObjectMapConfiguration {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0bWFwY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvb2JqZWN0bWFwY29uZmlndXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sb0JBQW9CO0lBSTdCLFlBQW1CLElBQVk7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVNLEVBQUUsQ0FBQyxJQUFZO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7Q0FDSjtBQUVELE1BQU0sT0FBTyxzQkFBc0I7SUFBbkM7UUFDWSxpQkFBWSxHQUE4QixJQUFJLEdBQUcsRUFBd0IsQ0FBQztJQVd0RixDQUFDO0lBVFUsV0FBVyxDQUFDLElBQVk7UUFDM0IsTUFBTSxXQUFXLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuQyxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBVyxtQkFBbUI7UUFDMUIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0oifQ==