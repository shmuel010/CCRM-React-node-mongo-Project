import React, {useContext, useState} from 'react';
import AlertContext from "../../context/alert/alertContext"


const Alerts=()=> {
    const alertContext = useContext(AlertContext)
    return (
        alertContext.alerts.length>0 && alertContext.alerts.map(alert=>(
            <div key={alert.id} className={`alert alert-${alert.type}`} >
                    <i style={{margin:"4dp"}} className={'fas fa-info-circle'}/>  {" "+alert.msg}
            </div>
        ))
    );
}
export default Alerts


