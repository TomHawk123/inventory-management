import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/inventory">Inventory</Link>
            </li>
            {localStorage.getItem("inventory__admin") ?
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/users">Employees</Link>
                </li>
                : null
            }
            <li className="navbar__item active">
                <Link className="navbar__link" to="/userInventory">Employee Inventory</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="#"

                    onClick={
                        () => {
                            localStorage.removeItem("inventory__user")
                            localStorage.removeItem("inventory__admin")
                        }
                    }
                >Logout</Link>
            </li>
        </ul>

    )
}