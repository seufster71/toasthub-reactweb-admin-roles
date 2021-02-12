import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputBuilder from '../../coreView/common/text-input-builder';
import Switch from '../../coreView/common/switch';
import DateBuilder from '../../coreView/common/date-input-builder';
import moment from 'moment';

export default function UserRolesModifyView({itemState, appPrefs, onSave, onCancel, inputChange, applicationSelectList}) {
    
    let adminUserRolesFormOrder = {};
    
    let adminUserRolesFormStartDate = {};
    let startDateDefault = "";
    
    let adminUserRolesFormEndDate = {};
    let endDateDefault = "";
    
    let adminUserRolesFormActive = {};
    let optionsBLN = [];
    let item = itemState.selected;
    
    if (itemState.prefForms != null && itemState.prefForms.ADMIN_USER_ROLE_FORM != null) {
    	let formItems = itemState.prefForms.ADMIN_USER_ROLE_FORM;
    	for (let i = 0; i < formItems.length; i++) {
    		switch (formItems[i].name) {
    		case "ADMIN_USER_ROLE_FORM_ORDER":
    			adminUserRolesFormOrder = formItems[i];
    			break;
    		case "ADMIN_USER_ROLE_FORM_STARTDATE":
    			adminUserRolesFormStartDate = formItems[i];
    			if (adminUserRolesFormStartDate.classModel != "") {
    				let startDateModel = JSON.parse(adminUserRolesFormStartDate.classModel);
    				if (item != null && item[startDateModel.field] != null) {
    					startDateDefault = item[startDateModel.field];
    				}
    			}
    			break;
    		case "ADMIN_USER_ROLE_FORM_ENDDATE":
    			adminUserRolesFormEndDate = formItems[i];
    			if (adminUserRolesFormEndDate.classModel != "") {
    				let endDateModel = JSON.parse(adminUserRolesFormEndDate.classModel);
    				if (item != null && item[endDateModel.field] != null) {
    					endDateDefault = item[endDateModel.field];
    				}
    			}
    			break;
    		case "ADMIN_USER_ROLE_FORM_ACTIVE":
    		   
    			if (formItems[i].value != "") {
    				let valueObj = JSON.parse(formItems[i].value);
    				if (valueObj.options != null) {
    					optionsBLN = valueObj.options;
    				} else if (valueObj.referPref != null) {
    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
    					if (pref != null && pref.value != null && pref.value != "") {
    						let value = JSON.parse(pref.value);
    						if (value.options != null) {
    							optionsBLN = value.options;
    						}
    					}
    				}
    			}
    			adminUserRolesFormActive = formItems[i];
    			break;
    		}
    	}
    }
    
    let created = "";
    if (item != null && item.created != null) {
    	created = new Intl.DateTimeFormat('en-US',{
    		year: 'numeric', month: 'numeric', day: 'numeric',
    		hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York'
    	}).format(moment(item.created).toDate());
    	created = <div>Created: {created}</div>;
    }
    
    let modified = "";
    if (item != null && item.modified != null) {
    	modified = new Intl.DateTimeFormat('en-US',{
    		year: 'numeric', month: 'numeric', day: 'numeric',
    		hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York'
    	}).format(moment(item.modified).toDate());
    	modified = <div>Last Modified: {modified}</div>
    }
    
    
    return (
    	<div className="col-lg-12">
			<h4 className="modal-title">User to Role</h4>
			{created}
			{modified}
			<div className="row">
				<div className="col-sm-4">
					<InputBuilder field={adminUserRolesFormOrder} itemState={itemState} onChange={inputChange}/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<DateBuilder field={adminUserRolesFormStartDate} itemState={itemState} onChange={inputChange}/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<DateBuilder field={adminUserRolesFormEndDate} itemState={itemState} onChange={inputChange}/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<Switch field={adminUserRolesFormActive} itemState={itemState} onChange={inputChange} options={optionsBLN}/>
				</div>
			</div>
			
			<button type="button" className="btn btn-primary" onClick={() => onSave()}>Save</button>
			<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => onCancel()}>Cancel</button>
    	</div>
    );
}


UserRolesModifyView.propTypes = {
  itemState: PropTypes.object.isRequired,
  appPrefs: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired
};
