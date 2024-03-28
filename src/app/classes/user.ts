export class User
{
    constructor(public userId?:number,
        public firstName?: string,
        public lastName?: string,
        public phone?: string,
        public email?: string,
        public password?: string,
        public isFirstAid?: boolean) {}
}