import { useEffect, useState } from "react";
import "./App.css";
import data from "./contacts.json";
function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const result = data.filter((val) => {
      let returnVal = true;
      let fullName = (val.first_name + val.last_name).split("");
      for (let i = 0; i < searchText.length; i++) {
        const index = fullName.indexOf(searchText[i]);
        if (index == -1) {
          returnVal = false;
          break;
        } else {
          fullName.splice(i, 1);
        }
      }
      if (returnVal) return val;
    });
    setSearchResult(result);
  }, [searchText]);

  return (
    <div className="contact-list">
      <h1>My Contact</h1>
      <br />
      <input
        type="text"
        placeholder="Search"
        class="search-input"
        value={searchText}
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
      />
      <br />
      <br />
      <div className="contact-list-container">
        {searchResult.length > 1 ? (
          searchResult.map((contact) => (
            <>
              <div className="contact-card" key={contact.id}>
                <img
                  src={contact.avatar}
                  alt="Contact Avatar"
                  class="contact-image"
                />
                <div className="contact-info">
                  <h4>
                    {contact.first_name.split("").map((val) => {
                      // let search =searchText
                      for (let i = 0; i < searchText.length; i++) {
                        const index = contact.first_name.indexOf(searchText[i]);
                        if (index == -1) return <span className="">{val}</span>;
                        else {
                          return <span className="highlight">{val}</span>;
                        }
                      }
                    })}
                    <span className=""> </span>
                    <span className="">{contact.last_name}</span>
                  </h4>
                  <p>{contact.mobile}</p>
                </div>
              </div>
            </>
          ))
        ) : (
          <div class="no-contacts">No contacts found</div>
        )}
      </div>
    </div>
  );
}

export default App;
