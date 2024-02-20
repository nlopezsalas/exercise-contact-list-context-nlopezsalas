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
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/msmargara", {
					method: "GET",
					redirect: "follow"
				})
					.then(response => response.json())
					.then(result => {
						setStore({ agenda: result });
					})
					.catch(error => console.error(error));
			}
		}
	};
};

export default getState;
