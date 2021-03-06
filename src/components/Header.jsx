import React, {useState, useContext} from "react";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {SearchContext} from "../context/searchContext";

const Header = (props) => {
  const searchContext = useContext(SearchContext);

  const [searchTerm, setsearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    setsearchTerm(e.target.value);
  }
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(searchTerm !== "") {
      searchContext.setSearchTerm(searchTerm);
      setIsLoading(true);
      await searchContext.search(searchTerm);
      setIsLoading(false);
      props.history.push(`/search`)
    }
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">Gallery Theme</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline ml-auto my-2 my-lg-0" onSubmit={onSubmitHandler}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={onChangeHandler}
              disabled={isLoading}
            />
            <button className="btn btn-outline-light my-2 my-sm-0" type="submit" disabled={isLoading}>
              {isLoading &&
                <span
                  className="spinner-border spinner-border-sm mr-2"
                  role="status" aria-hidden="true"
                />
              }
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Header);
