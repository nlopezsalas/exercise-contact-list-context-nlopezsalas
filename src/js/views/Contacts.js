import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		contact: {},
		modalId: ""
	});

	const { store, actions } = useContext(Context);
	const [selectedAgenda, setSelectedAgenda] = useState("");

	const handleSelectChange = e => {
		setSelectedAgenda(e.target.value);
	};

	useEffect(() => {
		actions.getAgenda();
	}, []);

	useEffect(() => {
		actions.getAgenda();
		if (selectedAgenda !== "") {
			actions.getAgendaContacts(selectedAgenda);
		}
	}, [selectedAgenda]);

	return (
		<div className="container">
			<div>
				<div>
					<label className="p-2" htmlFor="user-select">
						Choose an agenda:{" "}
					</label>
					<select
						className="form-select form-select-lg"
						name="users"
						id="user-select"
						onChange={handleSelectChange}
						value={selectedAgenda}>
						<option value="">--Please choose an option--</option>
						{store.users.map((user, index) => (
							<option key={index} value={user}>
								{user}
							</option>
						))}
					</select>
					<p className="p-2">
						Agenda de: <b>{store.currentUser} </b>
					</p>
				</div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>

					{/* <Link
						className="btn btn-success"
						to={{
							pathname: "/add",
							state: { isCreatingAgenda: false } // Pasar el estado indicando que se está creando una agenda
						}}>
						Add new contact
					</Link>
					<Link
						className="btn btn-success"
						to={{
							pathname: "/add",
							state: { isCreatingAgenda: true } // Pasar el estado indicando que se está creando una agenda
						}}>
						Add new agenda
					</Link> */}
				</p>

				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.agenda.map(contact => (
							<ContactCard
								key={contact.id}
								contact={contact}
								onDelete={() => {
									console.log("deleting...");
									setState(prevState => ({
										...prevState,
										showModal: true,
										contact: contact,
										modalId: "delete"
									}));
								}}
								onUpdate={() => {
									console.log("updating...");
									setState(prevState => ({
										...prevState,
										showModal: true,
										contact: contact,
										modalId: "update"
									}));
								}}
							/>
						))}
					</ul>
				</div>
			</div>

			<Modal
				show={state.showModal}
				onClose={() => setState({ showModal: false })}
				contact={state.contact}
				modalId={state.modalId}
			/>
		</div>
	);
};
