/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */

import { ObjectMapper } from '../index';
import { describe, it, expect } from 'jest-without-globals';
import { ObjectMapConfigurationBuilder } from '../lib/objectmapconfiguration';

const data = [
    {
        id: 1,
        profilePicture: 'https://robohash.org/sitdoloremquecumque.png?size=50x50&set=set1',
        userName: 'vmcharg0',
        first_name: 'Virgina',
        last_name: 'Mc Harg',
        gender: 'Female',
        email: 'vmcharg0@cam.ac.uk',
        phone: '602-877-7674',
        birthDate: '1992-03-14T14:40:14Z',
        country: 'Sweden'
    },
    {
        id: 2,
        profilePicture: null,
        userName: 'pharcombe1',
        first_name: 'Philly',
        last_name: 'Harcombe',
        gender: 'Female',
        email: 'pharcombe1@usa.gov',
        phone: '869-788-3634',
        birthDate: '1986-04-21T23:03:36Z',
        country: 'China'
    },
    {
        id: 3,
        profilePicture: null,
        userName: 'ccotte2',
        first_name: 'Casey',
        last_name: 'Cotte',
        gender: 'Male',
        email: 'ccotte2@domainmarket.com',
        phone: '388-256-4344',
        birthDate: '1964-06-09T18:14:04Z',
        country: 'Indonesia'
    },
    {
        id: 4,
        profilePicture: 'https://robohash.org/atquepraesentiumut.png?size=50x50&set=set1',
        userName: 'mkemitt3',
        first_name: 'Mahmoud',
        last_name: 'Kemitt',
        gender: 'Male',
        email: 'mkemitt3@hc360.com',
        phone: '167-423-6408',
        birthDate: '1965-10-06T06:26:55Z',
        country: 'Croatia'
    }
];

class User {
    private _id: string | undefined;
    private _profilePicture: string | undefined;
    private _userName: string | undefined;
    private _displayName: string | undefined;
    private _email: string | undefined;
    private _birthDate: Date | undefined;
    private _phone: string | undefined;

    public get id(): string | undefined {
        return this._id;
    }

    public set id(value: string | undefined) {
        this._id = value;
    }

    public get profilePicture(): string | undefined {
        return this._profilePicture;
    }

    public set profilePicture(value: string | undefined) {
        this._profilePicture = value;
    }

    public get userName(): string | undefined {
        return this._userName;
    }

    public set userName(value: string | undefined) {
        this._userName = value;
    }

    public get displayName(): string | undefined {
        return this._displayName;
    }

    public set displayName(value: string | undefined) {
        this._displayName = value;
    }

    public get email(): string | undefined {
        return this._email;
    }

    public set email(value: string | undefined) {
        this._email = value;
    }

    public get birthDate(): Date | undefined {
        return this._birthDate;
    }

    public set birthDate(value: Date | undefined) {
        this._birthDate = value;
    }

    public get phone(): string | undefined {
        return this._phone;
    }

    public set phone(value: string | undefined) {
        this._phone = value;
    }
}

describe('ObjectMapper Tests', () => {
    it('Automatic mapping from Json to Class', () => {
        const users: User[] = <User[]>ObjectMapper.autoMap<any, User>(data, () => new User());

        expect(users.length).toBe(4);
        for (let i = 0; i < users.length; i++) {
            expect(users[i].id).toBe(data[i].id);
            expect(users[i].birthDate).toBe(data[i].birthDate);
            expect(users[i].email).toBe(data[i].email);
            expect(users[i].phone).toBe(data[i].phone);
            expect(users[i].profilePicture).toBe(data[i].profilePicture);
            expect(users[i].userName).toBe(data[i].userName);

            expect(users[i].displayName).toBe(undefined);
            expect((<any>users[i]).first_name).toBe(data[i].first_name);
            expect((<any>users[i]).last_name).toBe(data[i].last_name);
        }
    });

    it('Custom mapping from Json to Class', () => {
        const config = new ObjectMapConfigurationBuilder();

        config
            .map('id')
            .from('id')
            .custom((propValue: any) => 'CUSTOM:' + propValue);
        config.map('birthDate').from('birthDate');
        config.map('email').from('email');
        config.map('phone').from('phone');
        config.map('profilePicture').from('profilePicture');
        config.map('userName').from('userName');
        config.map('displayName').custom((source: any) => source.first_name + ' ' + source.last_name);

        const users: User[] = <User[]>ObjectMapper.map<any, User>(config.build(), data, () => new User());

        expect(users.length).toBe(4);
        for (let i = 0; i < users.length; i++) {
            expect(users[i].id).toBe('CUSTOM:' + data[i].id);
            expect(users[i].birthDate).toBe(data[i].birthDate);
            expect(users[i].email).toBe(data[i].email);
            expect(users[i].phone).toBe(data[i].phone);
            expect(users[i].profilePicture).toBe(data[i].profilePicture);
            expect(users[i].displayName).toBe(data[i].first_name + ' ' + data[i].last_name);

            expect((<any>users[i]).first_name).toBe(undefined);
            expect((<any>users[i]).last_name).toBe(undefined);
        }
    });
});
