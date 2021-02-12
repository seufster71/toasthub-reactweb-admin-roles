import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextBuilder from '../../coreView/common/text-input-builder';
import MultiLangTextInput from '../../coreView/common/multi-lang-text-input';
import SelectBuilder from '../../coreView/common/select-input-builder';
import Switch from '../../coreView/common/switch';
import moment from 'moment';

export default function RolesModifyView({itemState, appPrefs, 
	 onSave, onCancel, inputChange, applicationSelectList}) {
    
    let adminRoleFormTitle = {};

    let adminRoleFormCode = {};
    
    let adminRoleFormApplication = {};
    let applicationOptions = [];
    if (applicationSelectList != null) {
    	applicationOptions = applicationSelectList;
    }
    
    let adminRoleFormActive = {};
    let activeDefault = true;
    let activeOptions = [];
    let item = itemState.selected;
    
    if (itemState.prefForms != null && itemState.prefForms.ADMIN_ROLE_FORM != null) {
    	let fromItems = itemState.prefForms.ADMIN_ROLE_FORM;
    	for (let i = 0; i < fromItems.length; i++) {
    		switch (fromItems[i].name) {
    		case "ADMIN_ROLE_FORM_TITLE":
    			adminRoleFormTitle = fromItems[i];
    			break;
    		case "ADMIN_ROLE_FORM_CODE":
    			adminRoleFormCode = fromItems[i];
    			break;
    		case "ADMIN_ROLE_FORM_APPLICATION":
    			adminRoleFormApplication = fromItems[i];
    			break;
    		case "ADMIN_ROLE_FORM_ACTIVE":
    			adminRoleFormActive = fromItems[i];
    		    
    			if (adminRoleFormActive.value != "") {
    				let valueObj = JSON.parse(adminRoleFormActive.value);
    				if (valueObj.options != null) {
    					activeOptions = valueObj.options;
    				} else if (valueObj.referPref != null) {
    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
    					if (pref != null && pref.value != null && pref.value != "") {
    						let value = JSON.parse(pref.value);
    						if (value.options != null) {
    							activeOptions = value.options;
    						}
    					}
    				}
    			}
    			break;
    		}
    	}
    }
    
    let applicationDefault = 0;
    
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
			<h4 className="modal-title">Role</h4>
			{created}
			{modified}
			<div className="row">
				<div className="col-sm-4">
					<MultiLangTextInput field={adminRoleFormTitle} itemState={itemState} inputChange={inputChange} appPrefs={appPrefs}/>		
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<TextBuilder field={adminRoleFormCode} itemState={itemState} inputChange={inputChange}/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<SelectBuilder field={adminRoleFormApplication} itemState={itemState} inputChange={inputChange} options={applicationOptions}/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<Switch field={adminRoleFormActive} itemState={itemState} inputChange={inputChange} options={activeOptions}/>
				</div>
			</div>
			
			<button type="button" className="btn btn-primary" onClick={() => onSave()}>Save</button>
			<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => onCancel()}>Cancel</button>
    	</div>
    );
}


RolesModifyView.propTypes = {
	itemState: PropTypes.object.isRequired,
	appPrefs: PropTypes.object.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	inputChange: PropTypes.func.isRequired
};
