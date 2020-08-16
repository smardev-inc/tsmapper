import { ObjectMapper, ObjectMapConfiguration } from '../index';
import { describe, it, expect } from 'jest-without-globals';

class Foo {
    private _id = '';
    private _name = '';

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public toSgtring(): string {
        return this._name;
    }
}

class Bar {
    private _id = '';
    private _name = '';

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public toSgtring(): string {
        return this._name;
    }
}

class IdOnly {
    private _id = '';
    private _name = 'This should not be changed if field mapping is off';

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public toSgtring(): string {
        return this._name;
    }
}

const f: Foo = new Foo();
f.id = 'This is the id';
f.name = 'This is the name';

describe('ObjectMapper', () => {
    it('Automatic object mapping', () => {
        const b: Bar = ObjectMapper.autoMap<Foo, Bar>(f, new Bar());

        expect(b.id).toBe('This is the id');
        expect(b.name).toBe('This is the name');
    });

    it('Ensure reuse of type descriptors', () => {
        ObjectMapper.autoMap<Foo, Bar>(f, new Bar());
    });

    it('Simple object mapping', () => {
        const config = new ObjectMapConfiguration();
        config.mapProperty('id').to('id');
        config.mapProperty('name').to('name');
        const b: Bar = ObjectMapper.map<Foo, Bar>(config, f, new Bar());

        expect(b.id).toBe('This is the id');
        expect(b.name).toBe('This is the name');
    });

    it('No error if destination does not have all the properties', () => {
        const config = new ObjectMapConfiguration();
        config.mapProperty('id');
        config.mapProperty('name').to('name');
        const b: IdOnly = ObjectMapper.map<Foo, IdOnly>(config, f, new IdOnly());

        expect(b.id).toBe('');
    });
});
