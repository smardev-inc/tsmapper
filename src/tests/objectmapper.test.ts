/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */

import { ObjectMapper } from '../index';
import { describe, it, expect } from 'jest-without-globals';
import { MapConfigurationBuilder, MapConfiguration, TypeRef } from '../index';
import { usersData } from './data';
import { User } from './models';

describe('ObjectMapper Tests', () => {
    it('Automatic mapping from Json to Class', () => {
        const users: User[] = <User[]>ObjectMapper.autoMap<any, User>(usersData, () => new User());

        expect(users.length).toBe(4);
        for (let i = 0; i < users.length; i++) {
            expect(users[i].id).toBe(usersData[i].id);
            expect(users[i].birthDate).toBe(usersData[i].birthDate);
            expect(users[i].email).toBe(usersData[i].email);
            expect(users[i].phone).toBe(usersData[i].phone);
            expect(users[i].profilePicture).toBe(usersData[i].profilePicture);
            expect(users[i].userName).toBe(usersData[i].userName);

            expect(users[i].displayName).toBe(undefined);
            expect((<any>users[i]).first_name).toBe(undefined);
            expect((<any>users[i]).last_name).toBe(undefined);
        }
    });

    it('Custom mapping from Json to Class', () => {
        const config = new MapConfigurationBuilder();

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

        const users: User[] = <User[]>ObjectMapper.map<any, User>(config.build(), usersData, () => new User());

        expect(users.length).toBe(4);
        for (let i = 0; i < users.length; i++) {
            expect(users[i].id).toBe('CUSTOM:' + usersData[i].id);
            expect(users[i].birthDate).toBe(usersData[i].birthDate);
            expect(users[i].email).toBe(usersData[i].email);
            expect(users[i].phone).toBe(usersData[i].phone);
            expect(users[i].profilePicture).toBe(usersData[i].profilePicture);
            expect(users[i].displayName).toBe(usersData[i].first_name + ' ' + usersData[i].last_name);

            expect((<any>users[i]).first_name).toBe(undefined);
            expect((<any>users[i]).last_name).toBe(undefined);
        }
    });

    it('Configure using implicit builder', () => {
        const config = MapConfiguration.create((builder: MapConfigurationBuilder) => {
            builder
                .map('id')
                .from('id')
                .custom((propValue: any) => 'CUSTOM:' + propValue);
            builder.map('birthDate').from('birthDate');
            builder.map('email').from('email');
            builder.map('phone').from('phone');
            builder.map('profilePicture').from('profilePicture');
            builder.map('userName').from('userName');
            builder.map('displayName').custom((source: any) => source.first_name + ' ' + source.last_name);
        });

        expect(config.mappingInstructions.length).toBe(7);
        expect(config.mappingInstructions[0].propertyName).toBe('id');
        expect(config.mappingInstructions[1].propertyName).toBe('birthDate');
        expect(config.mappingInstructions[2].propertyName).toBe('email');
        expect(config.mappingInstructions[3].propertyName).toBe('phone');
        expect(config.mappingInstructions[4].propertyName).toBe('profilePicture');
        expect(config.mappingInstructions[5].propertyName).toBe('userName');
        expect(config.mappingInstructions[6].propertyName).toBe('displayName');
    });

    it('Default builder with undefined target is not supported', () => {
        const config = MapConfiguration.create((builder: MapConfigurationBuilder) => {
            expect(() => builder.default<any, User>(undefined, <TypeRef<User>>(<unknown>null))).toThrow('Argument null exception (target)');
            expect(() => builder.default<any, User>(undefined, <TypeRef<User>>(<unknown>undefined))).toThrow('Argument null exception (target)');
        });

        expect(config.mappingInstructions.length).toBe(0);
    });

    it('Configure using default builder', () => {
        const config = MapConfiguration.create((builder: MapConfigurationBuilder) => {
            builder.default<any, User>(undefined, User);
        });

        expect(config.mappingInstructions.length).toBe(1);
    });
});
