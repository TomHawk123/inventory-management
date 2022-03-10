import React from "react"
import { InventoryList } from "./inventory/InventoryList"
import { UserList } from "./users/Users"

// export a function that will return the HTML
export const Master = () => {
    // set up variables for application state with useState hook



    return (
        <>
            <h1>Inventory Management</h1>
            <InventoryList />
            <UserList />
        </>
    )
}