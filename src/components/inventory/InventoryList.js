import React, { useEffect, useState } from "react"
import { fetchInventory } from "../ApiManager"

// export a function that will return the HTML
export const InventoryList = () => {
    // set up variables for application state with useState hook
    const [inventoryList, setInventoryList] = useState([])
    const [totalItemsMessage, updateMessage] = useState('')

    // fetch inventory list when inventory state changes
    useEffect(
        () => {
            fetchInventory()
                .then(inventoryArray => {
                    setInventoryList(inventoryArray)
                })
        },
        [] // DON'T FORGET to add inventoryList when state change monitoring is necessary
    )

    useEffect(
        () => {
            if (inventoryList.length === 1) {
                updateMessage("You have 1 inventory item")
            } else {
                updateMessage(`You have ${inventoryList.length} inventory items`)
            }
        },
        [inventoryList]
    )

    return (
        <>

            <div>{totalItemsMessage}</div>
            {
                inventoryList.map(
                    inventoryObject => <p key={`inventoryItem--${inventoryObject.id}`}>{inventoryObject.name}</p>
                )
            }
        </>
    )
}




// Use assign method to add inventory object to user?
// A:

// const target = { a: 1, b: 2 };
// const source = { b: 4, c: 5 };

// const returnedTarget = Object.assign(target, source);

// console.log(target);
// // expected output: Object { a: 1, b: 4, c: 5 }

// console.log(returnedTarget);
// // expected output: Object { a: 1, b: 4, c: 5 }