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

export { isUserExist, addUser, getUserDataThroughFirebaseUid, updateActiveForDonation }