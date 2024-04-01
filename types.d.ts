export type User  = {
    id: string;
    firebaseUID: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    age: string;
    bloodType: string;
    activeForDonation: boolean;
    gender: string;
    coords?: Coords;
    address:{
        city: string;
        zip: string;
    },
    avatar: string;
    token: string;
}

export type Coords = {
    lat: string;
    lng: string;
}