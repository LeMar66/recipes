// !!Items has a Unique ID through all the accordion
let acc;
let acc_menu_tree;
function acc_Init() {
    // Get the whole element.
    acc = document.querySelector(".accordion");
    const acc_items = acc.querySelectorAll(".acc_item");
    acc_items.forEach(acc_item => {
        let acc_item_header = acc_item.firstChild;
        acc_item_header.addEventListener("click", function () { facc_change_Item(this); });
    });
}
// Change Item
function facc_change_Item(acc_item_header) {
    // Back to the Item div
    const acc_item = acc_item_header.parentElement;
    let acc_item_headers;
    //console.log("acc_item: ", acc_item);
    if (acc_item_header.classList.contains("active")) {
        acc_item_headers = acc_item.querySelectorAll(".acc_item_header.active");
        acc_item_headers.forEach(acc_Active_Item_Header => {
            acc_Active_Item_Header.classList.remove("active");
            acc_Active_Item_Header.nextElementSibling.style.maxHeight = 0;
        });
    }
    else {
        // First: De-activate ALL siblings items.
        const acc_parent_item = acc_item.parentElement;
        acc_item_headers = acc_parent_item.querySelectorAll(".acc_item_header.active");
        acc_item_headers.forEach(acc_Active_Item_Header => {
            if (acc_Active_Item_Header !== acc_item_header) {
                acc_Active_Item_Header.classList.remove("active");
                acc_Active_Item_Header.nextElementSibling.style.maxHeight = 0;
            }
        });
        // Second: Acivate this item.
        const acc_item_body = acc_item_header.nextElementSibling;
        const acc_item_body_content = acc_item_body.firstElementChild;
        acc_item_header.classList.add("active");
        acc_menu_tree = fgetMenuTree();
        if (acc_item_body_content.childElementCount === 0) {
            // Has to Fetch
            let url;
            if (acc.id == "profile") {
                // SETTINGS:
                if (acc_menu_tree[acc_menu_tree.length - 1] == "settings") {
                    let table = document.createElement("table");
                    acc_item_body_content.appendChild(table);
                    let row = document.createElement("tr");
                    let cell = document.createElement("td");
                    let el_input = document.createElement("input");
                    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                        table.appendChild(row);
                        row.appendChild(cell);
                        cell.setAttribute("class", "duo control");
                        cell.setAttribute("translate", "no");
                        cell.innerText = "Awesome";
                        cell = document.createElement("td");
                        cell.setAttribute("class", "duo control");
                        row.appendChild(cell);
                        el_input.setAttribute("class", "toggle");
                        el_input.setAttribute("type", "checkbox");
                        el_input.setAttribute("name", "");
                        el_input.addEventListener("click", ftoggleAweSomeMode);
                        el_input.checked = settings.awesome;
                        cell.appendChild(el_input);
                    }
                    row = document.createElement("tr");
                    cell = document.createElement("td");
                    el_input = document.createElement("input");
                    table.appendChild(row);
                    row.appendChild(cell);
                    cell.innerText = "FullScreen";
                    cell = document.createElement("td");
                    row.appendChild(cell);
                    el_input.setAttribute("class", "toggle");
                    el_input.setAttribute("type", "checkbox");
                    el_input.setAttribute("name", "");
                    el_input.addEventListener("click", ftoggleFullScreen);
                    el_input.checked = settings.fullscreen;
                    cell.appendChild(el_input);
                    row = document.createElement("tr");
                    cell = document.createElement("td");
                    el_input = document.createElement("input");
                    table.appendChild(row);
                    row.appendChild(cell);
                    cell.innerText = "Left handed";
                    cell = document.createElement("td");
                    row.appendChild(cell);
                    el_input.setAttribute("class", "toggle");
                    el_input.setAttribute("type", "checkbox");
                    el_input.setAttribute("name", "");
                    el_input.addEventListener("click", ftoggleLeftHand);
                    el_input.checked = settings.lefthand;
                    cell.appendChild(el_input);
                    if (settings.admin) {
                        row = document.createElement("tr");
                        cell = document.createElement("td");
                        el_input = document.createElement("input");
                        table.appendChild(row);
                        row.appendChild(cell);
                        cell.innerText = "Internet access";
                        cell = document.createElement("td");
                        row.appendChild(cell);
                        el_input.setAttribute("class", "toggle");
                        el_input.setAttribute("type", "checkbox");
                        el_input.setAttribute("name", "");
                        el_input.addEventListener("click", ftoggleInternetAccess);
                        el_input.checked = settings.internetaccess;
                        cell.appendChild(el_input);
                    }
                }
                else {
                    // All other features under Profile, Only when InternetAccess is on.
                    url = "/devices/html/" + acc_menu_tree[acc_menu_tree.length - 1] + ".html";
                    fFetchAndRenderData(acc_item_body_content, url.toLowerCase());
                    fcalcBodyContent();
                }
            }
            else if (acc.id == "devices") {
                // These always goes back to device version.
                //url = "/devices/clone-booster" + "/1.0" + "/html/" + acc_menu_tree[acc_menu_tree.length - 1] + ".html";
                url = "/recipes/html/" + acc_menu_tree[acc_menu_tree.length - 1] + ".html";
                console.log("bla:", url);
                fFetchAndRenderData(acc_item_body_content, url.toLowerCase());
                fcalcBodyContent();
            }
            else {
                // a htmlpage from in training, catalog or ...
                //url = "https://technical-grow-solutions.github.io/" + acc.id + "/" + acc_menu_tree.join("/") + "/index.html";
                url = "/" + acc.id + "/" + acc_menu_tree.join("/") + "/index.html";
                //https://technical-grow-solutions.github.io/catalog/devices/clone-booster/index.html 
                console.log("URL traning/catalog: ", url);
                let div = document.createElement("div");
                div.setAttribute("class", "content");
                div.setAttribute("translate", "yes");
                acc_item_body_content.appendChild(div);
                fFetchAndRenderData(div, url.toLowerCase());
                fcalcBodyContent();
            }
            fcalcBodyContent();
        }
        else {
            fcalcBodyContent();
        }
        // Feature:
        // acc_item_header.scrollIntoView();
    }
}
async function fFetchAndRenderData(acc_item_body_content, url) {
    document.querySelector(".loader").classList.add("show");
    let data = await fgetBodyContent(url);
    acc_item_body_content.innerHTML = data;
    setTimeout(() => {
        fcalcBodyContent();
        document.querySelector(".loader").classList.remove("show");
    }, 100);
}
// Get the Body_content
async function fgetBodyContent(url) {
    try {
        let response = await fetch(url);
        if (response.status === 200) {
            return await response.text();
        }
        else {
            return "<p>&#128073;&#32;Page is coming <b>SOON</b>&#32;&#128072;</p>";
            //return response.url
        }
    }
    catch (error) {
        console.log("Error: ", error);
    }
}
function fcalcBodyContent() {
    var calcHeight = 0;
    let acc_menu_tree_reverse = acc_menu_tree.reverse();
    acc_menu_tree_reverse.forEach(sla => {
        const acc_body = document.getElementById(sla).lastElementChild;
        calcHeight += acc_body.scrollHeight;
        acc_body.style.maxHeight = calcHeight + "px";
    })
}
function fgetMenuTree() {
    var acc_menu_tree = [];
    const acc_active_headers = acc.querySelectorAll(".acc_item_header.active");
    acc_active_headers.forEach(acc_Active_Item_Header => {
        acc_menu_tree.push(acc_Active_Item_Header.parentElement.id);
    });
    return acc_menu_tree;
}
