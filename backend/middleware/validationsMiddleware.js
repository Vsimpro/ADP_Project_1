// Parse and format data into a valid task.
const formatTask = (input, user_id) => {
    let _task = {
        "name"      : null,
        "createdBy" : null,
        "isDone"    : null,
    }

    try {
        // format task obj
        _task[ "isDone" ]    = false;
        _task[ "name" ]      = input[ "name" ];
        _task[ "createdBy" ] = user_id // This must be validated beforehand !!

    } catch ( e ) {
        console.log( "[!] Could not format task " + error );
        return undefined;
    }

    if ((_task["name"]      == null) || 
        (_task["createdBy"] == null) || 
        (_task["isDone"]    == null) ) {
            console.log( "[!] Insufficient details for task." );
            return undefined;
    } 
    
    return _task
}

export { formatTask };
