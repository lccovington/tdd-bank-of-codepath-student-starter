import * as React from "react"
import { Link } from "react-router-dom"
import FilterInput from "../FilterInput/FilterInput"
import codepath from "../../assets/codepath.svg"
import avatar from "../../assets/avatar.png"
import "./Navbar.css"

export default function Navbar(props) {

  const handleOnInputChange = (event) => {
    props.setFilterInputValue(event.target.value)
  }

  return (
    <nav className="navbar">
      <Logo path={'/'}/>

      <div className="search">
        <FilterInput inputValue={props.filterInputValue} handleOnChange={handleOnInputChange} />
      </div>

      <div className="user">
        <div className="notifications">
          <i className="material-icons md-36">notifications</i>
          <div className="green-dot" />
        </div>
        <div className="avatar">
          <img src={avatar} alt="avatar" />
          <div className="info">
            <p>Person McPerson</p>
            <span>ID: 12345567</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export function Logo({path}) {
  return (
      <Link className="logo" to={path}><img src={codepath} alt="logo" /></Link>
  )
}
