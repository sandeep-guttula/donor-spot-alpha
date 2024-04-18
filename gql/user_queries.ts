export const GQL_ENDPOINT = "https://donorspot-backend.onrender.com/graphql"


const findByFirebaseUidQuery = `
query Users($firebaseUid: String) {
  findUserByFirebaseUID(firebaseUID: $firebaseUid) {
    id
    fullName
  }
}
`;

const getUserByFirebaseUid = `
query FindUserByFirebaseUID($firebaseUid: String) {
  findUserByFirebaseUID(firebaseUID: $firebaseUid) {
    activeForDonation
    phone
    address {
      city
      pincode
    }
    age
    avatar
    bloodType
    email
    id
    fullName
    gender
    coords {
      lat
      lng
    }
  }
}
`

const addUserMutation = `
mutation Register($firebaseUid: String!, $fullName: String!, $email: String!, $phone: String!, $age: String!, $gender: String!, $bloodType: String!, $city: String!, $pincode: String!) {
  register(firebaseUID: $firebaseUid, fullName: $fullName, email: $email, phone: $phone, age: $age, gender: $gender, bloodType: $bloodType, city: $city, pincode: $pincode) {
    id
    fullName
    age
    gender
    address {
      city
      pincode
    }
    activeForDonation
  }
}
`

const updateActiveForDonationQuery = `
  mutation UpdateActiveForDonation($updateActiveForDonationId: ID!, $activeForDonation: Boolean!) {
  updateActiveForDonation(id: $updateActiveForDonationId, activeForDonation: $activeForDonation) {
    activeForDonation
  }
}
`

const updateUserCoordsQuery = `
mutation AddUserCoords($id: ID!, $lat: String!, $lng: String!) {
  addUserCoords(id: $id, lat: $lat, lng: $lng) {
    id
    fullName
    coords {
      lat
      lng
    }
  }
}
`

const getALlUsersCoordsQuery = `
  query RootQueryType {
    users {
      id
      firebaseUID
      fullName
      bloodType
      activeForDonation
      coords {
        lat
        lng
      }
    }
  }
`

const addDonationInYourAreaMutation = `
mutation AddDonation($userId: ID!, $donationDate: String!, $donationType: String!, $bloodType: String!, $city: String) {
  addDonation(userId: $userId, donationDate: $donationDate, donationType: $donationType, bloodType: $bloodType, city: $city) {
    id
  }
}
`

const getRequestInYourAreaQuery = `
query Donations($city: String!) {
  donationsInYourArea(city: $city) {
    id
    userId
    bloodType
    city
    donationDate
    donationType  
  }
  users {
    avatar
    id
    fullName
  }
}
`

const getRequestsForYouQuery = `
query Donations($receiverId: ID!) {
  donationRequestsForYou(receiverId: $receiverId) {
    userId
    receiverId
    id
    donationType
    donationDate
    bloodType
    status
  }
  users {
    id
    avatar
    fullName
  }
}
`

const addDonationThroughMapsMutation = `
mutation AddDonation($userId: ID!, $donationDate: String!, $donationType: String!, $bloodType: String!, $receiverId: String) {
  addDonation(userId: $userId, donationDate: $donationDate, donationType: $donationType, bloodType: $bloodType, receiverId: $receiverId) {
    id   
  }
}
`

const getUsersName = `
  query Users {
    users {
      fullName    
    }
  }
`



async function getUserDataThroughFirebaseUid(firebaseUid: string) {
  const response = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: getUserByFirebaseUid,
      variables: {
        firebaseUid: firebaseUid
      }
    })
  })
  let { data } = await response.json();

  return data.findUserByFirebaseUID
}

async function isUserExist(firebaseUid: string) {
  const response = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: findByFirebaseUidQuery,
      variables: {
        firebaseUid: firebaseUid,
      },
    }),
  })

  const { data } = await response.json()
  if (data?.findUserByFirebaseUID?.id) {
    return true
  }
  return false
}

async function addUser(
  firebaseUid: string,
  fullName: string,
  email: string,
  phoneNumber: string,
  age: string,
  gender: string,
  bloodType: string,
  city: string,
  pincode: string,
) {

  try {

    console.log("Adding user to the database");
    const response = await fetch(GQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: addUserMutation,
        variables: {
          firebaseUid: firebaseUid,
          fullName: fullName,
          email: email,
          phone: phoneNumber,
          age: age,
          gender: gender,
          bloodType: bloodType,
          city: city,
          pincode: pincode,
        },
      })
    })


    const { data } = await response.json()
    console.log("Response from addUser", data);
    if (data?.register?.id) {
      console.log("User added successfully! ", data.register.id);
      return data.register
    }
  } catch (error) {
    console.log("Error in addUser", error);
  }
}

async function updateActiveForDonation(id: string, activeForDonation: boolean) {

  const response = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: updateActiveForDonationQuery,
      variables: {
        updateActiveForDonationId: id,
        activeForDonation: activeForDonation
      }
    })
  })
  let { data } = await response.json();
  return data.updateActiveForDonation
}

async function updateUserCoords(id: string, lat: string, lng: string) {
  const response = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: updateUserCoordsQuery,
      variables: {
        id: id,
        lat: lat,
        lng: lng,
      }
    })
  })
  let { data } = await response.json();
  console.log("Data from updateUserCoords", data);

  return data.addUserCoords
}

async function getAllUsersCoords() {
  const response = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: getALlUsersCoordsQuery
    })
  })
  let { data } = await response.json();
  return data.users
}

async function addDonationInYourArea(userId: string, donationDate: string, donationType: string, bloodType: string, city: string) {
  const response = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: addDonationInYourAreaMutation,
      variables: {
        userId: userId,
        donationDate: donationDate,
        donationType: donationType,
        bloodType: bloodType,
        city: city
      }
    })
  })
  let { data } = await response.json();
  return data.addDonation
}

async function getRequestInYourArea(city: string) {

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getRequestInYourAreaQuery,
      variables: {
        city: city,
      },
    }),
  };

  try {
    const response = await fetch(GQL_ENDPOINT, requestOptions);
    const { data } = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling elsewhere
  }
}

async function getRequestsForYou(receiverId: string) {

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getRequestsForYouQuery,
      variables: {
        receiverId: receiverId,
      },
    }),
  };

  try {
    const response = await fetch(GQL_ENDPOINT, requestOptions);
    const { data } = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }
    console.log("Data from getRequestsForYou", data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling elsewhere
  }

}

async function addDonationThroughMaps(userId: string, donationDate: string, donationType: string, bloodType: string, receiverId: string) {
  const response = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: addDonationThroughMapsMutation,
      variables: {
        userId: userId,
        donationDate: donationDate,
        donationType: donationType,
        bloodType: bloodType,
        receiverId: receiverId
      }
    })
  })
  let { data } = await response.json();
  return data.addDonation
}


export {
  isUserExist,
  addUser,
  getUserDataThroughFirebaseUid,
  updateActiveForDonation,
  updateUserCoords,
  getAllUsersCoords,
  addDonationInYourArea,
  getRequestInYourArea,
  getRequestsForYou,
  addDonationThroughMaps
}