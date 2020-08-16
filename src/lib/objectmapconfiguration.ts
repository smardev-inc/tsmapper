export class ObjectMapInstruction {
    public name: string;
    public target: string | undefined;

    public constructor(name: string) {
        this.name = name;
    }

    public to(name: string): void {
        this.target = name;
    }
}

export class ObjectMapConfiguration {
    private instructions: Set<ObjectMapInstruction> = new Set<ObjectMapInstruction>();

    public mapProperty(name: string): ObjectMapInstruction {
        const instruction = new ObjectMapInstruction(name);
        this.instructions.add(instruction);
        return instruction;
    }

    public get mappingInstructions(): ObjectMapInstruction[] {
        return Array.from(this.instructions.values());
    }
}
