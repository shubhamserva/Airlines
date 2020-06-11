// tslint:disable-next-line:class-name
export class addPassengerDB {
    fId: {
        type: string,
    };
    pName: {
        type: string,
        required: true
    };
    PNR: {
        type: string,
        required: true
    };
    Infant: {
        type: boolean
    };
    // tslint:disable-next-line:variable-name
    Check_In_Status: {
        type: string,
        required: true
    };
    WheelChair: {
        type: boolean,

    };
    Services: {
        type: [],

    };
    SeatNo: {
        type: string,
        required: true
    };
    Passport: {
        type: string
    };
    Address: {
        type: string
    };
    DOB: {
        type: string
    };
    ShopRequests: {
        type: []
    };

    constructor() {

    }
}
