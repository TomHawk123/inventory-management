import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { fetchInventory, fetchUserInventory, sendUserItem } from "../ApiManager"

// export a function that will return the HTML
export const InventoryList = () => {
    const history = useHistory()
    // set up variables for application state with useState hook
    const [inventoryList, setInventoryList] = useState([])
    const [userInventory, setUserInventory] = useState([])
    const [totalItemsMessage, updateMessage] = useState('')

    // fetch inventory list when inventory state changes
    useEffect(
        () => {
            fetchInventory()
                .then(inventoryArray => {
                    setInventoryList(inventoryArray)
                })
            fetchUserInventory()
                .then(userInventoryArray => {
                    setUserInventory(userInventoryArray)
                })
        },
        [] // Only run when initial JSX rendering is complete.
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

    const deleteItem = (id) => {
        fetch(`http://localhost:8088/inventories/${id}`, {
            method: "DELETE"
        }).then(fetchInventory)
            .then(inventoryArray => {
                setInventoryList(inventoryArray)
            })
    }


    return (
        <>

            <div>{totalItemsMessage}</div>


            <div>
                {
                    inventoryList.map(
                        inventoryObject => <div className="inventory__List" key={`deleteItem--${inventoryObject.id}`}>



                            <p>
                                {inventoryObject.quantity > 0 ?
                                    <button className="inventoryButton"
                                        onClick={
                                            () => {
                                                sendUserItem(inventoryObject)
                                                    .then(() => {
                                                        return fetchInventory()
                                                    })
                                                    .then(inventoryArray => {
                                                        setInventoryList(inventoryArray)
                                                    })
                                            }
                                        }>Checkout
                                    </button> :
                                    null
                                }

                                {inventoryObject.quantity}X: {inventoryObject.type.nameOfType}; {inventoryObject.name}

                                <button
                                    onClick={
                                        () => history.push(`/inventories/${inventoryObject.id}`)}>Edit
                                </button>

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

// if inventory item quantity value is >= 1
    // display the checkout button
// else don't display the checkout button






// Use assign method to add inventory object to user?
// A:

// const target = { a: 1, b: 2 };
// const source = { b: 4, c: 5 };

// const returnedTarget = Object.assign(target, source);

// console.log(target);
// // expected output: Object { a: 1, b: 4, c: 5 }

// console.log(returnedTarget);
// // expected output: Object { a: 1, b: 4, c: 5 }