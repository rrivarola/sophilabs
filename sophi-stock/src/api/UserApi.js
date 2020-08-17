import { handleResponse, handleError } from "./ApiUtils";
import { baseUrl } from "../shared/baseUrl";

export function login(creds) {
  //   try {
  //     const handleResponse = await fetch(baseUrlUsers + "/login");
  //     return handleResponse(handleResponse);
  //   } catch (handleError) {
  //     return handleError(handleError);
  //   }

  return fetch(baseUrl + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          //alert("Error");
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify(creds));
      } else {
        // var error = new Error("Error " + response.status);
        // error.response = response;
        // throw error;
        alert("Error");
      }
    })
    .catch((error) =>  Promise.reject(error.response || error.message));
}

export async function Logout() {
  try {
    const handleResponse = await fetch(baseUrl + "users/logout");
    return handleResponse(handleResponse);
  } catch (handleError) {
    return handleError(handleError);
  }
}
