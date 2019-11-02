function potato(input, seeds, dude){
    if(condition){
        do_something()
    }
    return input+seeds+dude;
}


onStartup();

chrome.runtime.onMessage.addListener(function (request, sender, response) {
    switch (request.command) {
        case "courseStorage":
            if (request.action == "add") {
                add(request, sender, response);
            }
            if (request.action == "remove") {
                remove(request, sender, response);
            }
            break;
        case "isSingleConflict":
            isSingleConflict(request.dtarr, request.unique, response);
            break;
        case "checkConflicts":
            checkConflicts(response);
            break;
        case "updateBadge":
            updateBadge();
            break;
        case "updateStatus":
            updateStatus(response);
            break;
        case "alreadyContains":
            alreadyContains(request.unique, response);
            break;
        case "updateCourseList":
            updateTabs();
            break;
        case "gradesQuery":
            executeQuery(request.query, response);
            break;
        case "currentSemesters":
            response({ semesters: current_semesters});
            getCurrentSemesters();
            break;
        case "currentDepartments":
            response({departments: departments});
            break;
        case "setOpen":
            should_open = true;
            chrome.tabs.create({ url: request.url});
            break;
        case "shouldOpen":
            response({open : should_open});
            should_open = false;
            break;
        default:
            const xhr = new XMLHttpRequest();
            const method = request.method ? request.method.toUpperCase() : "GET";
            xhr.open(method, request.url, true);
            console.log(request);
            xhr.onload = () => {
                console.log(xhr.responseUrl);
                response(xhr.responseText);
            }
            xhr.onerror = () => response(xhr.statusText);
            if (method == "POST") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            xhr.send(request.data);
            break;
    }
    return true;
});
