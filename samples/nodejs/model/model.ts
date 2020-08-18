export class User {
    private m_id: string | undefined;
    private m_userName: string | undefined;
    private m_fullName: string | undefined;
    private m_email: string | undefined;
    private m_birthDate: Date | undefined;

    public get id(): string | undefined {
        return this.m_id;
    }

    public set id(value: string | undefined) {
        this.m_id = value;
    }

    public get userName(): string | undefined {
        return this.m_userName;
    }

    public set userName(value: string | undefined) {
        this.m_userName = value;
    }

    public get fullNamed(): string | undefined {
        return this.m_fullName;
    }

    public set fullNamed(value: string | undefined) {
        this.m_fullName = value;
    }

    public get email(): string | undefined {
        return this.m_email;
    }

    public set email(value: string | undefined) {
        this.m_email = value;
    }

    public get birthDate(): Date | undefined {
        return this.m_birthDate;
    }

    public set birthDate(value: Date | undefined) {
        this.m_birthDate = value;
    }
}
