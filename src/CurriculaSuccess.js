import React, { Component } from 'react';
import { navigate } from '@reach/router';


class CurriculaSuccess extends Component {
    render() {
        return (

            <div className="modal fade" id="CurriculaAdded" tabIndex="-1" role="dialog" aria-labelledby="curriculaModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="curriculaModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" id="addNewCurricula">Add New Curricula</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CurriculaSuccess;