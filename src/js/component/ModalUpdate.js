import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ModalUpdate = props => {
	const [state, setState] = useState({
		//initialize state here
	});

	const { store, actions } = useContext(Context);

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Update contact data</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						<form>
							<div className="form-group">
								<label>Full Name</label>
								<input type="text" className="form-control" placeholder="Full Name" name="full_name" />
							</div>
							<div className="form-group">
								<label>Email</label>
								<input type="email" className="form-control" placeholder="Enter email" name="email" />
							</div>
							<div className="form-group">
								<label>Phone</label>
								<input type="phone" className="form-control" placeholder="Enter phone" name="phone" />
							</div>
							<div className="form-group">
								<label>Address</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter address"
									name="address"
								/>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal"
							onClick={() => {
								actions.deleteContact(props.contactToUpdate.id, props.contactToUpdate);
							}}>
							Save!
						</button>
						<Link className="mt-3 w-100 text-center" to="/">
							or get back to contacts
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
ModalUpdate.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	contactToUpdate: PropTypes.object
};

/**
 * Define the default values for
 * your component's properties
 **/
ModalUpdate.defaultProps = {
	show: false,
	onClose: null
};
