import { ObjectMapper, MapConfigurationBuilder } from '../index';
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

describe('ObjectMapper Simple Tests', () => {
    it('Automatic object mapping', () => {
        const b: Bar = ObjectMapper.autoMapSingle<Foo, Bar>(f, () => new Bar());

        expect(b.id).toBe('This is the id');
        expect(b.name).toBe('This is the name');
    });

    it('Ensure reuse of type descriptors', () => {
        ObjectMapper.autoMap<Foo, Bar>(f, () => new Bar());
    });

    it('Simple object mapping', () => {
        const config = new MapConfigurationBuilder();
        config.map('id').from('id');
        config.map('name').from('name');
        const b: Bar = ObjectMapper.mapSingle<Foo, Bar>(config.build(), f, () => new Bar());

        expect(b.id).toBe('This is the id');
        expect(b.name).toBe('This is the name');
    });

    it('No error if destination does not have all the properties', () => {
        const config = new MapConfigurationBuilder();
        config.map('name').from('name');
        const b: IdOnly = ObjectMapper.mapSingle<Foo, IdOnly>(config.build(), f, () => new IdOnly());

        expect(b.id).toBe('');
    });

    it('No error if destination does not have all the properties', () => {
        const config = new MapConfigurationBuilder();
        config.map('name').from('name');
        const b: IdOnly = ObjectMapper.mapSingle<Foo, IdOnly>(config.build(), f, () => new IdOnly());

        expect(b.id).toBe('');
    });

    it('mapSingle and map return are equivalent', () => {
        const config = new MapConfigurationBuilder();
        config.map('id').from('id');
        config.map('name').from('name');
        const b: Bar = ObjectMapper.mapSingle<Foo, Bar>(config.build(), f, () => new Bar());
        const b2: Bar = <Bar>ObjectMapper.map<Foo, Bar>(config.build(), f, () => new Bar());

        expect(b.id).toBe('This is the id');
        expect(b.name).toBe('This is the name');
        expect(b2.id).toBe('This is the id');
        expect(b2.name).toBe('This is the name');
    });

    it('autoMapSingle and autoMap return are equivalent', () => {
        const b: Bar = ObjectMapper.autoMapSingle<Foo, Bar>(f, () => new Bar());
        const b2: Bar = <Bar>ObjectMapper.autoMap<Foo, Bar>(f, () => new Bar());

        expect(b.id).toBe('This is the id');
        expect(b.name).toBe('This is the name');
        expect(b2.id).toBe('This is the id');
        expect(b2.name).toBe('This is the name');
    });

    it('map simple array', () => {
        const ar: Foo[] = [];
        ar.push(f);
        ar.push(f);
        ar.push(f);

        const b: Bar[] = <Bar[]>ObjectMapper.autoMap<Foo, Bar>(ar, () => new Bar());

        expect(b.length).toBe(3);

        b.forEach((itm) => {
            expect(itm.id).toBe('This is the id');
            expect(itm.name).toBe('This is the name');
        });
    });
});
