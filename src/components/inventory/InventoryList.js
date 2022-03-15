import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { fetchInventory, sendUserItem } from "../ApiManager"

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
        [] // DON'T ADD STATE VARIABLES BEING LISTENED FOR TO BASIC FETCHES (INFINITE LOOP)
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
        }).then(fetchInventory)
            .then(inventoryArray => {
                setInventoryList(inventoryArray)
            })
    }

    // if (inventoryObject.id !== userInventory.user.id)
    // Make a timestamp property on the inventoryObject on the inventoryList


    // if inventory.quantity <= 0, remove the checkout button
    // else have the checkout button

    if (inventoryObject.quantity <= 0) {
        return <button className="inventoryButton"
        onClick={
            () => sendUserItem(inventoryObject)
        }>Checkout
    </button>
    }
    return (
        <>

            <div>{totalItemsMessage}</div>


            <div>
                {
                    inventoryList.map(
                        inventoryObject => <div className="inventory__List" key={`deleteItem--${inventoryObject.id}`}>



                            <p>
                                
                                <button className="inventoryButton"
                                    onClick={
                                        () => sendUserItem(inventoryObject)
                                    }>Checkout
                                </button>

                                {inventoryObject.type.nameOfType} {inventoryObject.name}

                                <button className="inventoryButton"
                                    onClick={() => {
                                        deleteItem(inventoryObject.id)
                                    }}>
                                    Delete
                                </button>
                            </p>

                        </div>
                    )
                }
            </div>
            <button
                onClick={
                    () => history.push("/inventory/create")}>Create New Item
            </button>
        </>
    )
}

// add a checkout button that will push the item checked out into the userInventory array in the json database





// Use assign method to add inventory object to user?
// A:

// const target = { a: 1, b: 2 };
// const source = { b: 4, c: 5 };

// const returnedTarget = Object.assign(target, source);

// console.log(target);
// // expected output: Object { a: 1, b: 4, c: 5 }

// console.log(returnedTarget);
// // expected output: Object { a: 1, b: 4, c: 5 }