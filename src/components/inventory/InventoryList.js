import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { fetchInventory } from "../ApiManager"

// export a function that will return the HTML
export const InventoryList = () => {
    const history = useHistory()
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

        },
        [inventoryList])

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

    const deleteItem = (id) => {
        fetch(`http://localhost:8088/inventory/${id}`, {
            method: "DELETE"
        })
    }

    return (
        <>

            <div>{totalItemsMessage}</div>


            <div className="inventory__List">
                {
                    inventoryList.map(
                        inventoryObject => <div>
                            <p key={`inventoryItem--${inventoryObject.id}`}>{inventoryObject.name}</p>
                            <button
                                key={`deleteItem--${inventoryObject.id}`}
                                onClick={() => {
                                    deleteItem(inventoryObject.id)
                                }}>
                                Delete
                            </button>
                        </div>
                    )
                }
            </div>
            <button
                onClick={
                    () => history.push("/inventory/create")}>Create New Item
            </button>

            <div></div>
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