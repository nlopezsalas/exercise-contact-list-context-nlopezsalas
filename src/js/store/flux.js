const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			agenda: []
		},
		actions: {
			// (Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			getAgenda: () => {
				console.log("agenda");
				const requestOptions = {
					method: "GET",
					redirect: "follow"
				};
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/msmargara", requestOptions)
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
