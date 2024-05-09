export class Invitation
{
    constructor(public invitationId?:number,
        public invitationUserId?: number,
        public invitationDate?: Date,
        public invitationTime?: number,
        public invitationTripId?: number,
        public tripDuration?: number,
        public placeNumber?: number,
        public invitationUserName?: string,
        public invitationTripYhad?: string,
        public invitationTripDate?: Date ) {}
}
