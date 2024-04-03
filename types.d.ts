export type User = {
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
    address: {
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


export type RequestInArea = {
    id: string;
    userId: string;
    bloodType: string;
    city: string;
    donationDate: string;
    donationType: string;
}

export type RequestInAreaUserType = {
    avatar: string;
    fullName: string;
    id: string;
}

export type RequestForYouType = {
    userId: string;
    receiverId: string;
    id: string;
    donationType: string;
    donationDate: string;
    bloodType: string;
    status: string;
}

export type RequestForYouUserType = {
    id: string;
    avatar: string;
    fullName: string;
}