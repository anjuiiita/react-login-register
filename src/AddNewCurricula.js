import React, { Component } from 'react';

class AddNewCurricula extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editContent: false,
            enableOrg: false,
            checks_limit: 3,
            categories: [
                { id: 1, value: "Food Systems", isChecked: false, sub_categories: [] },
                { id: 2, value: "Equity", isChecked: false, sub_categories: [] },
                { id: 3, value: "Community Capacity", isChecked: false, sub_categories: [] },
                { id: 4, value: "Economy and Business Analysis", isChecked: false, sub_categories: [] },
                { id: 5, value: "Governance and Policy", isChecked: false, sub_categories: [] },
                { id: 6, value: "Health and Wellness", isChecked: false, sub_categories: [] },
                { id: 7, value: "Environment", isChecked: false, sub_categories: [] },
                { id: 8, value: "Leadership", isChecked: false, sub_categories: [] },
                { id: 9, value: "Evaluation ", isChecked: false, sub_categories: [] }
            ],
            level: {
                "L1": {id: 1, isChecked: false},
                "L2": {id: 2, isChecked: false},
                "L3": {id: 3, isChecked: false}
            },
            newOrgs: null,
            c_ids: []
        }
        this.enableOrgText = this.enableOrgText.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChecks = this.handleChecks.bind(this);
        this.handleChecksSubCat = this.handleChecksSubCat.bind(this);
        this.handleChecksSSCat = this.handleChecksSSCat.bind(this);
        this.handleCheckLevel = this.handleCheckLevel.bind(this);
        this.updateorg = this.updateorg.bind(this);
        this.getCatDetails = this.getCatDetails.bind(this);
    }

    enableOrgText(e) {
        e.preventDefault();
        if (e.target.value === "Other") {
            this.setState({ enableOrg: !this.state.enableOrg });
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ editContent: !this.state.editContent });
        if (this.state.editContent) {

        }
    }

    populateSubCategory(e, category) {
        var sub_categories = [];
        (this.props.categories).filter(item =>
            item.category === category).map(filteredItem => sub_categories.push(filteredItem.sub_category));
        sub_categories = Array.from(new Set(sub_categories));
        return sub_categories;
    }

    handleChecks(event, checkedCat) {
        let categories = this.state.categories
        categories.forEach(item => {
            if (item.id === checkedCat.id)
                item.isChecked = event.target.checked
            if (item.isChecked) {
                var sub_categories = this.populateSubCategory(event, item.value);
                item.sub_categories = sub_categories;
            } else {
                sub_categories = this.props.sub_categories;
                Object.keys(sub_categories).forEach((key) => {
                    if (sub_categories[key].isChecked)
                        sub_categories[key].isChecked = false;
                });
                var ss_categories = this.props.ss_categories;
                Object.keys(ss_categories).forEach((key) => {
                    if (ss_categories[key].isChecked)
                        ss_categories[key].isChecked = false
                });
                var level = this.state.level;
                Object.keys(level).forEach(key => {
                    if (level[key].isChecked)
                        level[key].isChecked = false;
                });
                this.setState({sub_categories: sub_categories, ss_categories: ss_categories, level: level});
            }
        });
        this.setState({ categories: categories })
    }

    populateSSubCategory(category, checked_subcategory) {
        var ss_categories = [];
        (this.props.categories).filter(item =>
            item.category === category && item.sub_category === checked_subcategory).map(filteredItem => ss_categories.push(filteredItem.ss_category));
        ss_categories = Array.from(new Set(ss_categories));
        return ss_categories;
    }

    handleChecksSubCat(event, category, checkedSubCat) {
        let sub_categories = this.props.sub_categories;
        sub_categories[checkedSubCat].isChecked = event.target.checked;
        if (event.target.checked) {
            var ss_categories = this.populateSSubCategory(category, checkedSubCat);
            sub_categories[checkedSubCat].ss_categories = ss_categories;
        } else {
            ss_categories = this.props.ss_categories;
            Object.keys(ss_categories).forEach((key) => {
                if (ss_categories[key].isChecked)
                    ss_categories[key].isChecked = false
            });
            var level = this.state.level;
            Object.keys(level).forEach(key => {
                if (level[key].isChecked)
                    level[key].isChecked = false;
            });
            this.setState({ss_categories: ss_categories, level: level});
        }
        this.setState({ sub_categories: sub_categories })
    }

    handleChecksSSCat(e, checkedSSCat) {
        let ss_categories = this.props.ss_categories;
        ss_categories[checkedSSCat].isChecked = e.target.checked;
        if (!e.target.checked) {
            var level = this.state.level;
            Object.keys(level).forEach(key => {
                if (level[key].isChecked)
                    level[key].isChecked = false;
            });
            this.setState({level: level});
        }
        this.setState({ ss_categories: ss_categories });
    }

    handleCheckLevel(e, checkedLevel) {
        let level = this.state.level;
        level[checkedLevel].isChecked = e.target.checked;
        this.setState({level: level});
    }

    getCatDetails(e, category, sub_category, ss_category, level) {
        let c_ids = this.state.c_ids;
        if (e.target.checked) {
            this.props.categories.filter(item =>
                item.category === category && item.sub_category === sub_category
                && item.ss_category === ss_category && item.level === level).map(filteredItem => c_ids.push(filteredItem.category_id));
            this.setState({ c_ids: c_ids });
        }
        console.log(this.state.c_ids);
    }

    updateorg(e) {
        e.preventDefault();
        var org = e.target.value;
        if (org !== "Other") {
            this.setState({
                newOrgs: e.target.value
            });
        }
    }


    render() {
        return (<div className="container mt-4 bg-light border border-info" style={{ borderWidth: "thick" }}>
            <form className="p-4">
                <div className="form-row">
                    <div className="col-12 text-center">
                        <h3 className="mb-0">Fill Curricula Details</h3>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="form-group">
                    <label hmtlfor="input-curricula-title">Curricula Title</label>
                    <input
                        type="curricula"
                        id="input-curricula-title"
                        className="form-control form-control-alternative"
                    //defaultValue={this.props.user.email}
                    //onChange={(e)=>this.props.user.email = e.value}
                    //disabled={!this.state.editContent}
                    />
                </div>

                <div className="form-group">
                    <label hmtlfor="input-org">Organization Name</label>
                    <select id="inputState" className="form-control" onChange={(e) => { this.enableOrgText(e); this.updateorg(e) }}>
                        <option defaultValue="">Please select..</option>
                        {this.props.organizations && this.props.organizations.map((item, index) => {
                            return (<option key={index}>{item.org_name}</option>);
                        })}
                        <option key={"other"}>Other</option>
                    </select>
                </div>
                {this.state.enableOrg && <div className="form-group">
                    <input
                        type="org"
                        id="input-org"
                        className="form-control form-control-alternative"
                        placeholder="Type your Organization name"
                        onChange={(e) => this.updateorg(e)}
                    />
                </div>}
                <label>Select Category</label>
                <br />
                <div className="form-group mx-4">
                    {this.state.categories.map((category, index) => {
                        return (<div key={index}>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value={category.value}
                                    onChange={(e) => this.handleChecks(e, category)} />
                                <label className="form-check-label" htmlFor="inlineCheckbox1">{category.value}</label>
                            </div>
                            {category.isChecked && <div className="mx-4">
                                {category.sub_categories.map((sub_category, index) => {
                                    return (<div key={index}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value={sub_category}
                                                onChange={(e) => this.handleChecksSubCat(e, category.value, sub_category)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">{sub_category}</label>
                                        </div>
                                        {this.props.sub_categories[sub_category].isChecked && <div className="mx-4">
                                            {this.props.sub_categories[sub_category].ss_categories.map((ss_category, index) => {
                                                return (<div key={index}>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value={ss_category}
                                                            onChange={(e) => this.handleChecksSSCat(e, ss_category)} />
                                                        <label className="form-check-label" htmlFor="inlineCheckbox2">{ss_category}</label>
                                                    </div>
                                                    {this.props.ss_categories[ss_category].isChecked && <div className="mx-4">
                                                        {this.props.ss_categories[ss_category].level.map((level, index) => {
                                                            return (<div className="form-check" key={index}>
                                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value={level}
                                                                    onChange={(e) => {this.handleCheckLevel(e, level); this.getCatDetails(e, category.value, sub_category, ss_category, level)}} />
                                                                <label className="form-check-label" htmlFor="inlineCheckbox3">{level}</label>
                                                            </div>
                                                            )
                                                        })}
                                                    </div>}
                                                </div>
                                                )
                                            })}
                                        </div>}
                                    </div>
                                    )
                                })}
                            </div>}

                        </div>
                        )
                    })}
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-3">
                        <button
                            className="btn btn-block btn-primary"
                            data-toggle="button"
                            onClick={this.handleChange}>
                            {this.state.editContent === true ? "Save" : "Add"}
                        </button>
                    </div>
                </div>
            </form>
        </div>)
    }
}

export default AddNewCurricula;