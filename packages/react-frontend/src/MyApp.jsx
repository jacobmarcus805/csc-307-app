// src/MyApp.jsx
//import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );


  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          throw new Error("Error: " + res.status);
        }
      })
      .then((newUser) => {
        setCharacters([...characters, newUser]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  

  function removeOneCharacter(index) {
    const userToDelete = characters[index];
    fetch(`http://localhost:8000/users/${userToDelete.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          // Deletion was successful on the backend – update the state:
          const updated = characters.filter((_, i) => i !== index);
          setCharacters(updated);
        } else if (res.status === 404) {
          console.error("User not found on the backend.");
        } else {
          console.error("Delete failed with status: ", res.status);
        }
      })
      .catch((error) => {
        console.error("Error during deletion:", error);
      });
  }
  

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

}


export default MyApp;

