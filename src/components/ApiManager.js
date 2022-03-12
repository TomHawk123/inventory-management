// store API url
const API = "http://localhost:8088"

// export a fetch call for each data type?
// A:
export const fetchInventory = () =>
    fetch(`${API}/inventory`)
        .then(r => r.json())

export const fetchUsers = () =>
    fetch(`${API}/users`)
        .then(r => r.json())

export const fetchUserInventory = () =>
    fetch(`${API}/inventory?_expand=user&_expand=type`)
        .then(r => r.json())

export const sendItem = (newItem) => {
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newItem)
    }
    return fetch("http://localhost:8088/inventory", fetchOption)
        .then(res => res.json())
}