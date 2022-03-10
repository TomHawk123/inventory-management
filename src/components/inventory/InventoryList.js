import React, { useEffect, useState } from "react"

// export a function that will return the HTML
export const InventoryList = () => {
    // set up variables for application state with useState hook
    const [inventoryList, setInventoryList] = useState([])

    // fetch inventory list when inventory state changes
    useEffect(
        () => {
            fetch("http://localhost:8088/inventory")
                .then(r => r.json())
                .then(inventoryArray => {
                    setInventoryList(inventoryArray)
                })
        },
        [] // DON'T FORGET to add inventoryList when state change monitoring is necessary
    )

    return (
        <>
            {
                inventoryList.map(
                    inventoryObject => <h4 key={`inventoryItem--${inventoryObject.id}`}>{inventoryObject.name}</h4>
                )
            }
        </>
    )
}