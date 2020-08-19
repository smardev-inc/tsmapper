/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */

import { ObjectMapper } from '../index';
import { describe, it, expect } from 'jest-without-globals';
import { usersDataPrivateFields, usersDataUperCase } from './data';
import { User } from './models';

describe('ObjectMapper Tests', () => {
    it('Automatic mapping with prefix', () => {
        const users: User[] = <User[]>ObjectMapper.autoMap<any, User>(usersDataPrivateFields, () => new User());

        expect(users.length).toBe(4);
        for (let i = 0; i < users.length; i++) {
            expect(users[i].id).toBe(usersDataPrivateFields[i].m_id);
            expect(users[i].birthDate).toBe(usersDataPrivateFields[i].m_birthDate);
            expect(users[i].email).toBe(usersDataPrivateFields[i].m_email);
            expect(users[i].phone).toBe(usersDataPrivateFields[i].m_phone);
            expect(users[i].profilePicture).toBe(usersDataPrivateFields[i].m_profilePicture);
            expect(users[i].userName).toBe(usersDataPrivateFields[i].m_userName);

            expect(users[i].displayName).toBe(undefined);
            expect((<any>users[i]).first_name).toBe(undefined);
            expect((<any>users[i]).last_name).toBe(undefined);
        }
    });

    it('Automatic mapping with case insensitive', () => {
        const users: User[] = <User[]>ObjectMapper.autoMap<any, User>(usersDataUperCase, () => new User());

        expect(users.length).toBe(4);
        for (let i = 0; i < users.length; i++) {
            expect(users[i].id).toBe(usersDataUperCase[i].ID);
            expect(users[i].birthDate).toBe(usersDataUperCase[i].BIRTHDATE);
            expect(users[i].email).toBe(usersDataUperCase[i].EMAIL);
            expect(users[i].phone).toBe(usersDataUperCase[i].PHONE);
            expect(users[i].profilePicture).toBe(usersDataUperCase[i].PROFILEPICTURE);
            expect(users[i].userName).toBe(usersDataUperCase[i].USERNAME);

            expect(users[i].displayName).toBe(undefined);
            expect((<any>users[i]).first_name).toBe(undefined);
            expect((<any>users[i]).last_name).toBe(undefined);
        }
    });
});
