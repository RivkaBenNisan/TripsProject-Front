export class OurTrips
{
    constructor(public tripId?:number,
        public yhad?: string,
        public tripTypeId: number=0,
        public tripDate?: Date,
        public tripTime?: number,
        public tripDuration?: number,
        public tripEmptyPlace?: number,
        public price?: number,
        public picture?: string,
        public tripTypeName?: string,
        public isFirstAid?: boolean
        
        ) {}
}