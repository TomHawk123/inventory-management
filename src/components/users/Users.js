import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchUsers } from "../ApiManager"

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

    const deleteItem = (id) => {
        fetch(`http://localhost:8088/users/${id}`, {
            method: "DELETE"
        }).then(fetchUsers)
            .then(usersArray => {
                setUsersArray(usersArray)
            })
    }

    return (
        <>

            {
                usersArray.map(
                    userObject => {
                        if (userObject.id !== parseInt(localStorage.getItem("inventory__admin"))) {
                            return <p key={`userItem--${userObject.id}`}>{userObject.name}

                                <button className="usersButton"
                                    onClick={() => {
                                        deleteItem(userObject.id)
                                    }}>
                                    Terminate Employment
                                </button>
                            </p>
                        }

                    }
                )
            }

            <section className="link--register">
                <Link to="/register">Add New Employee</Link>
            </section>

        </>
    )
}


