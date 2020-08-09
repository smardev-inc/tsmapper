import { ObjectMapper } from '../index';
import { describe, it, expect } from 'jest-without-globals';

class Foo {
    public id: string | undefined;
    public name: string | undefined;
}

class Bar {
    public id: string | undefined;
    public name: string | undefined;
}

describe('ObjectMapper', () => {
    it('Simple object mappint', () => {
        const f: Foo = { id: 'This is the id', name: 'This is the name' };
        const b: Bar = ObjectMapper.map<Foo, Bar>(f);

        expect(b.id).toBe('This is the id');
        expect(b.name).toBe('This is the name');
    });
});
