export class addPassengerDB {
    fId: {
        type: String,
    }
    pName: {
        type: String,
        required: true
    }
    PNR: {
        type: String,
        required: true
    }
    Infant: {
        type: Boolean
    }
    Check_In_Status: {
        type: String,
        required: true
    }
    WheelChair: {
        type: Boolean,

    }
    Services: {
        type: [],

    }
    SeatNo: {
        type: String,
        required: true
    }
    Passport: {
        type: String
    }
    Address: {
        type: String
    }
    DOB: {
        type: String
    }
    ShopRequests: {
        type: []
    }

    constructor(){
            
    }
}