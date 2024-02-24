const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			users: [],
			agenda: [],
			currentUser: null
		},
		actions: {
			// (Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			getUsers: () => {
				const requestOptions = { method: "GET", redirect: "follow" };
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/", requestOptions)
					.then(response => response.json())
					.then(result => {
						setStore({ users: result });
						console.log(getStore().users);
					})
					.catch(error => console.error(error));
			},
			createUser: contactData => {
				return new Promise((resolve, reject) => {
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
						.then(result => {
							console.log(result);
							setStore({ currentUser: contactData.agenda_slug });
							resolve(result); // Resuelve la promesa con el resultado
						})
						.catch(error => {
							console.error(error);
							reject(error); // Rechaza la promesa con el error
						});
				});
			},
			getAgenda: agendaSlug => {
				fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${agendaSlug}`, {
					method: "GET",
					redirect: "follow"
				})
					.then(response => response.json())
					.then(result => {
						console.log("Agenda result:", result);
						setStore({ agenda: result, currentUser: agendaSlug });
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
						if (response.status == 201) {
							getActions().getAgenda(getStore().currentUser);
						}
						return response.json();
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
						if (response.status == 201) {
							getActions().getAgenda(getStore().currentUser);
						}
						return response.json();
					})
					.then(result => {
						console.log(result);
					})
					.catch(error => console.error(error));
			}
		}
	};
};

export default getState;
