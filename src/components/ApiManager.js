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

