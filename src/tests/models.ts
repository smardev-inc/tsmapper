export class User {
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
