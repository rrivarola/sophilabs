import { handleResponse, handleError } from "./ApiUtils";
import { baseUrl } from "../shared/baseUrl";

export function products() {

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + "products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    },
    body: JSON.stringify(),
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
