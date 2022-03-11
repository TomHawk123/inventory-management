import React, { useEffect, useState } from "react"

// export a function that will return the HTML
export const UserInventoryList = () => {
    // set up variables for application state with useState hook
    const [userInventoryArray, setUserInventoryList] = useState([])
    const [totalItemsMessage, updateMessage] = useState('')

    // fetch inventory list when inventory state changes
    useEffect(
        () => {
            // use expand to get access to user properties  
            fetch("http://localhost:8088/inventory?_expand=user&_expand=type")
                .then(r => r.json())
                .then(inventoryArray => {
                    setUserInventoryList(inventoryArray)
                })
        },
        [] // DON'T FORGET to add userInventoryArray when state change monitoring is necessary
    )

    useEffect(
        () => {
            if (userInventoryArray.length === 1) {
                updateMessage("You have 1 inventory item")
            } else {
                updateMessage(`You have ${userInventoryArray.length} inventory items`)
            }
        },
        [userInventoryArray]
    )
    return (
        <>

            <div>{totalItemsMessage}</div>
            
            {
                userInventoryArray.map(
                    inventoryObject => <p key={`inventoryItem--${inventoryObject.id}`}>{inventoryObject.name}: {inventoryObject.user.name}</p>
                )
            }
        </>
    )
}


// import React, { useEffect, useState } from "react"
// import { Link, useHistory } from "react-router-dom/"

// export const TicketList = () => {
//     // create a New state variable
//     const [serviceTickets, setServiceTicket] = useState([])
//     const history = useHistory()
//     useEffect(
//         () => {
//             fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
//                 .then(res => res.json())
//                 .then((serviceTicketsArray) => {
//                     setServiceTicket(serviceTicketsArray)
//                 })
//         }, [serviceTickets]
//     )

//     const deleteTicket = (id) => {
//         fetch(`http://localhost:8088/serviceTickets/${id}`, {
//             method: "DELETE"
//         })
//     }


//     // useEffect(() => {
//     //     const activeTicketCount = serviceTickets.filter(t => t.dateCompleted === "").length
//     //     setServiceTicket(`There are ${activeTicketCount} open tickets`)
//     // }, [serviceTickets])

//     return (
//         <>
//             <h2> Service Tickets</h2>
//             <div>
//                 <button onClick={() => history.push("/tickets/create")}>Create Ticket</button>
//             </div>
//             {
//                 serviceTickets.map(
//                     (serviceTicket) => {
//                         return <div key={`serviceTicket--${serviceTicket.id}`}>
//                             <p className={serviceTicket.emergency ? `emergency` : `serviceTicket`}>
//                                 {serviceTicket.emergency ? "🚑" : ""} <Link to={`/tickets/${serviceTicket.id}`}>{serviceTicket.description}</Link> submitted by {serviceTicket.customer.name} and worked on by {serviceTicket.employee.name}
//                                 <button onClick={() => {
//                                     deleteTicket(serviceTicket.id)
//                                 }}>Delete</button>
//                             </p>
//                         </div>
//                     }
//                 )
//             }
//         </>
//     )
// }