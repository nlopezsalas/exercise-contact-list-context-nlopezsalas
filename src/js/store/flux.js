const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			user: "",
			agenda: []
		},
		actions: {
			// (Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			getUser: () => {
				const requestOptions = { method: "GET", redirect: "follow" };
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/", requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.catch(error => console.error(error));
			},
			createUser: contactData => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify(contactData);

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch("https://playground.4geeks.com/apis/fake/contact/", requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.catch(error => console.error(error));
			},
			getAgenda: () => {
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/natalial.salas", {
					method: "GET",
					redirect: "follow"
				})
					.then(response => response.json())
					.then(result => {
						setStore({ agenda: result });
					})
					.catch(error => console.error(error));
			},
			deleteContact: (contactId, contact) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify(contact);

				const requestOptions = {
					method: "DELETE",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, requestOptions)
					.then(response => {
						response.json();
						if (response.status == 201) {
							getActions().getAgenda();
						}
					})
					.then(result => {
						console.log(result);
					})
					.catch(error => console.error(error));
			},
			updateContact: (contactId, contact) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify(contact);

				const requestOptions = {
					method: "PUT",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, requestOptions)
					.then(response => {
						console.log(response);
						response.json();
						if (response.status == 201) {
							getActions().getAgenda();
						}
					})
					.then(result => {
						console.log(result);
						console.log("hola hola...");
					})
					.catch(error => console.error(error));
			}
		}
	};
};

export default getState;
