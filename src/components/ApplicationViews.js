import React from "react";
import { Route } from "react-router-dom"
import { InventoryForm } from "./inventory/AddInventoryForm";
import { InventoryList } from "./inventory/InventoryList";
import { UserInventoryList } from "./userInventory/UserInventoryList";
import { UsersList } from "./users/Users";





export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/inventory">
                <InventoryList />
            </Route>

            <Route exact path="/users">
                <UsersList />
            </Route>

            <Route exact path="/userInventory">
                <UserInventoryList />
            </Route>

            <Route path="/inventory/create">
                <InventoryForm />
            </Route>
        </>
    )
}