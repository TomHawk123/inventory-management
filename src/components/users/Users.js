import React, { useEffect, useState } from "react"

// export a function that will return the HTML
export const UserList = () => {
    // set up variables for application state with useState hook
    const [usersArray, setusersArray] = useState([])

    // fetch user list when user state changes
    useEffect(
        () => {
            fetch("http://localhost:8088/users")
                .then(r => r.json())
                .then(usersArray => {
                    setusersArray(usersArray)
                })
        },
        [] // DON'T FORGET to add userList when state change monitoring is necessary
    )

    return (
        <>
            <h1>Users</h1>
            
            {
                usersArray.map(
                    userObject => <h4 key={`userItem--${userObject.id}`}>{userObject.name}</h4>
                )
            }
        </>
    )
}