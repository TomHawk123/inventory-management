import React, { useEffect, useState } from "react"

// export a function that will return the HTML
export const UsersList = () => {
    // set up variables for application state with useState hook
    const [usersArray, setUsersArray] = useState([])

    // fetch user list when user state changes
    useEffect(
        () => {
            fetch("http://localhost:8088/users")
                .then(r => r.json())
                .then(usersArray => {
                    setUsersArray(usersArray)
                })
        },
        [] // DON'T FORGET to add userList when state change monitoring is necessary
    )


    return (
        <>

            {
                usersArray.map(
                    userObject => <p key={`userItem--${userObject.id}`}>{userObject.name}</p>
                )
            }
        </>
    )
}