import * as LoginAs from '../Actions/userType.action';

export class User {
    type: string;
}

export const initialState: User = {
    type: 'Select Your Role'
};

export function userTypeReducer(
    state = initialState,
    action: any) {
    switch (action.type) {
        case LoginAs.ADMIN: {
            return {
                ...state,
                type: 'admin',
            };
        }
        case LoginAs.STAFF: {
            return {
                ...state,
                type: 'staff'
            };
        }
        default: {
            return state;
        }
    }
}
