import React, { useEffect, useState } from "react"
import { fetchInventory } from "./ApiManager"

// export a function that will return the HTML
export const Master = () => {
    // set up variables for application state with useState hook
    const [inventoryList, setInventoryList] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/inventory")
                .then(r => r.json())
                .then(inventoryArray => {
                    setInventoryList(inventoryArray)
                })
        },
        []
    )

    return (
        <>
            <h1>Inventory Management</h1>

            {
                inventoryList.map(
                    inventoryObject => <h4>{inventoryObject.name}</h4>
                )
            }
        </>
    )
}