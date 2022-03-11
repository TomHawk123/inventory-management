import React from "react"
import { InventoryList } from "./inventory/InventoryList"
import { UserInventoryList } from "./userInventory/UserInventoryList"
import { UsersList } from "./users/Users"

// export a function that will return the HTML
export const Master = () => {
    // set up variables for application state with useState hook



    return (
        <>
            <h1>Inventory Management</h1>

            <h2>Inventory List</h2>
            <InventoryList />

            <h2>Users</h2>
            <UsersList />

            <h2>User's Inventory List</h2>
            <UserInventoryList />
        </>
    )
}