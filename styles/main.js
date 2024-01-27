let websock;
let WWWMenu = false;
let settings = {
    admin: false,
    awesome: false,
    fullscreen: false,
    lefthand: false,
    internetaccess: false
}

/* BullShit
    let uicontent = document.querySelector('.ui-content');
    let cssObj = window.getComputedStyle(uititle, null);
    let cssStyle = getComputedStyle(document.documentElement);
    let company = "Technical Grow Xperience";
    let company = "Advanced Grow Xperience";
    let company = "Technical Grow Solutions";

    url_Github = "https://raw.githubusercontent.com/Technical-Grow-Solutions";

    remake toggle slider: https://www.youtube.com/watch?v=CDldkBcrGkA

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {

      } else {

      }
    });

    <span style="transform: translate(-150px, -50px) rotate(-180deg) scale(3); animation: 0.5s ease 0.05s 1 reverse none running revolveScale;">T</span>
    <span style="transform: translate(-150px, -50px) rotate(-180deg) scale(3); animation: 0.5s ease 0.05s 1 normal forwards running revolveScale;">C</span>
    spanElement.style.animation = 'revolveScale 0.5s ease forwards';
    spanElement.style.animation = 'revolveScale 0.5s ease';
    spanElement.style.animationDirection = "reverse";

    window.addEventListener('DOMActivate', fprocessDisplayJson(jsonDoc))
    window.addEventListener('pageshow', fprocessDisplayJson(jsonDoc));
*/
function myWindow() {
    console.log("View innerheight: " + window.innerHeight);
    console.log("View outerheight: " + window.outerHeight);
    console.log("Docu Element: " + document.querySelector("body").clientHeight);
}

let jsonDoc1 = {
    "id": "display",
    "settings": [
        {
            "admin": true
        },
        {
            "awesome": false
        },
        {
            "fullscreen": false
        },
        {
            "lefthand": false
        },
        {
            "internetaccess": false
        }
    ],
    "inits": [
        {
            "company": "R e c i p e s"
        },
        {
            "author": "M.F. Saathof"
        }
    ],
    "items": [
        {
            "item": "bgimage",
            "props": [
                {
                    "active": true
                },
                {
                    "show": false
                }
            ]
        },
        {
            "item": "chapter",
            "props": [
                { "active": true },
                { "show": true }
            ]
        },
        {
            "item": "clock",
            "props": [
                { "active": true },
                { "show": false }
            ]
        },
        {
            "item": "footer",
            "props": [
                { "active": true },
                { "show": true }
            ]
        },
        {
            "item": "header",
            "props": [
                { "active": true },
                { "show": true }
            ]
        },
        {
            "item": "loader",
            "props": [
                { "active": true },
                { "show": false }
            ]
        },
        {
            "item": "menu",
            "props": [
                { "active": true },
                { "show": true }
            ],
            "items": [
                {
                    "item": "rbut",
                    "id": "Profile",
                    "onclick": "faddUIContent('/store/index.html', 'store', false)",
                    "img": "/images/profile.png",
                    "props": [
                        { "show": true }
                    ]
                },
                {
                    "item": "rbut",
                    "id": "Device",
                    "onclick": "faddUIContent('/devices/clone-booster/1.0/data/device-min.json', 'device')",
                    "img": "/images/device.png",
                    "props": [
                        { "show": true }
                    ]
                },
                {
                    "item": "rbut",
                    "id": "WWW",
                    "onclick": "ftoggleWWWMenu()",
                    "img": "/images/www.png",
                    "props": [
                        { "show": false }
                    ]
                },
                {
                    "item": "rbut",
                    "id": "scrlltotop",
                    "onclick": "",
                    "img": "",
                    "props": [
                        { "show": false }
                    ]
                },
                {
                    "item": "rbut",
                    "id": "Training",
                    "onclick": "faddUIContent('/training/data/training-min.json', 'training',false)",
                    "img": "/images/training.png",
                    "props": [
                        { "show": false }
                    ]
                },
                {
                    "item": "rbut",
                    "id": "Store",
                    "onclick": "faddUIContent('/store/index.html', 'store', false)",
                    "img": "/images/store.png",
                    "props": [
                        { "show": false }
                    ]
                },
                {
                    "item": "rbut",
                    "id": "Catalog",
                    "onclick": "faddUIContent('/catalog/data/catalog-min.json', 'catalog', false)",
                    "img": "/images/catalog.png",
                    "props": [
                        { "show": false }
                    ]
                },
                {
                    "item": "rbut",
                    "id": "Forum",
                    "onclick": "faddUIContent('/forum/html/index.html', 'forum', false)",
                    "img": "/images/forum.png",
                    "props": [
                        { "show": false }
                    ]
                }
            ]
        },
        {
            "item": "scrllind",
            "props": [
                { "active": true },
                { "show": true }
            ]
        },
        {
            "item": "snackbar",
            "props": [
                { "active": true },
                { "show": false }
            ]
        },
        {
            "item": "ui",
            "props": [
                { "active": true },
                { "show": true }
            ]
        }
    ]
}

/* Events*/
window.addEventListener('load', Init);

/*login */
function fcheckFormInput() {

}

/* Start */
function Init(event) {
    /*temp*/
    console.log("Init");
    /* delivery by server*/
    fprocessDisplayJson(jsonDoc1);
    clock_Init();
    setInterval(fisBrowserOnline, 3000);
    /* myWindow();*/
    ws_Init();
}
function fprocessSensorJson(jsonDoc) {

}
function fprocessDisplayJson(jsonDoc) {
    /* settings */
    console.log("jsonDoc");
    console.log(jsonDoc);
    if (jsonDoc.hasOwnProperty("settings")) {
        jsonDoc["settings"].forEach(jsonItem => {
            if (jsonItem.hasOwnProperty("admin")) { settings.admin = jsonItem["admin"]; }
            if (jsonItem.hasOwnProperty("awesome")) { settings.awesome = jsonItem["awesome"]; }
            if (jsonItem.hasOwnProperty("fullscreen")) { settings.fullscreen = jsonItem["fullscreen"]; }
            if (jsonItem.hasOwnProperty("lefthand")) { settings.lefthand = jsonItem["lefthand"]; }
            if (jsonItem.hasOwnProperty("internetaccess")) { settings.internetaccess = jsonItem["internetaccess"]; }
        });
    }
    /* items */
    if (jsonDoc.hasOwnProperty("items")) {
        jsonDoc["items"].forEach(jsonItem => {
            let element = document.querySelector("." + jsonItem["item"]);
            if (jsonItem.hasOwnProperty("props")) {
                jsonItem["props"].forEach(jsonProp => {
                    if (jsonProp.hasOwnProperty("active")) {
                        if (jsonProp["active"]) { element.classList.add("active"); } else { element.classList.remove("active"); }
                    }
                    if (jsonProp.hasOwnProperty("show")) {
                        if (jsonProp["show"]) { element.classList.add("show"); } else { element.classList.remove("show"); }
                    }
                    if (jsonProp.hasOwnProperty("awesome")) {
                        if (jsonProp["awesome"]) { element.classList.add("awesome"); } else { element.classList.remove("awesome"); }
                    }
                    if (jsonProp.hasOwnProperty("ani")) {
                        if (jsonProp["ani"]) { element.classList.add("ani"); } else { element.classList.remove("ani"); }
                    }
                });
            }
            if (jsonItem.hasOwnProperty("items")) {
                jsonItem["items"].forEach(jsonSubItem => {
                    /**rbut */
                    if (jsonSubItem.hasOwnProperty("id")) {
                        element = document.getElementById(jsonSubItem["id"]);
                    }
                    if (jsonSubItem.hasOwnProperty("props")) {
                        jsonSubItem["props"].forEach(jsonProp => {
                            /*if (jsonProp.hasOwnProperty("active")) {
                                if (jsonProp["active"]) { element.classList.add("active"); } else { element.classList.remove("active"); }
                            }*/
                            if (jsonProp.hasOwnProperty("show")) {
                                if (jsonProp["show"]) { element.classList.add("show"); } else { element.classList.remove("show"); }
                            }
                            /*if (jsonProp.hasOwnProperty("awesome")) {
                                if (jsonProp["awesome"]) { element.classList.add("awesome"); } else { element.classList.remove("awesome"); }
                            }
                            if (jsonProp.hasOwnProperty("ani")) {
                                if (jsonProp["ani"]) { element.classList.add("ani"); } else { element.classList.remove("ani"); }
                            }*/
                        });
                    }
                    /*
                                        if (jsonSubItem.hasOwnProperty("active")) {
                                            if (jsonProp["active"]) { element.classList.add("active"); } else { element.classList.remove("active"); }
                                        }
                                        if (jsonSubItem.hasOwnProperty("show")) {
                                            if (jsonProp["show"]) { element.classList.add("show"); } else { element.classList.remove("show"); }
                                        }
                                        if (jsonSubItem.hasOwnProperty("awesome")) {
                                            if (jsonProp["awesome"]) { element.classList.add("awesome"); } else { element.classList.remove("awesome"); }
                                        }
                                        if (jsonSubItem.hasOwnProperty("ani")) {
                                            if (jsonProp["ani"]) { element.classList.add("ani"); } else { element.classList.remove("ani"); }
                                        }
                                        */
                });
            }
            /* VV Wordt nog niet gebruikt VV */

            /*
            if (jsonSubItem.hasOwnProperty("items")) {
    
                jsonSubItem["items"].forEach(jsonSubSubItem => {
    
                    if (jsonSubSubItem.hasOwnProperty("items")) {
    
                        jsonSubSubItem["items"].forEach(jsonSubSubSubItem => {
                            
                        });
                    }
                });
            }
            else {
                
            };*/

        });
    }
    /* inits */
    if (jsonDoc.hasOwnProperty("inits")) {
        jsonDoc["inits"].forEach(jsonItem => {
            if (jsonItem.hasOwnProperty("company")) { finitHeader(jsonItem["company"]); }
            if (jsonItem.hasOwnProperty("author")) { document.querySelector("#footer-author-alias").innerHTML = jsonItem["author"]; }
        });
    }
}
/*Header logo*/
function finitHeader(company) {
    let a = document.getElementById("logo-list");
    /* first remove all. */
    while (a.firstChild) {
        a.firstChild.remove();
    }
    /* First letter, no class*/
    let li = document.createElement("li");
    li.innerHTML = company[0];
    a.appendChild(li);

    let abbrev;
    abbrev = company[0];

    let letter = "ghost";
    for (let i = 1; i < company.length; i++) {
        if (company[i] == " ") {
            letter = "spaced";
            abbrev += company[i + 1]
            i++;
        }
        else {
            letter = "ghost";
        }

        li = document.createElement("li");
        li.innerHTML = company[i];
        a.appendChild(li);
        li.setAttribute("class", letter)
    }
    document.getElementById("footer-company").innerText = abbrev;
}
function fexpandLogo() {
    document.getElementById("logo").classList.remove("hidden");
    /*document.getElementById("chaptervalue").innerHTML="BLALBA";*/
}
function fcollapseLogo() {
    document.getElementById("logo").classList.add("hidden");
}
/*Chapter*/
function fchangeChapter(title) {
    /*Get the element*/
    let Chapter = document.querySelector(".chapter");
    let Span;
    /*if (settings.awesome) {*/
    /*in reverse*/
    /*Chapter.classList.add("show");*/
    /*}*/

    /*Clear all the previous childeren and props in html and in the css*/
    /*Chapter.classList.remove("show");*/
    if (!Chapter.childElementCount == 0) {
        fAnimateText(Chapter, true);

        /*setTimeout(() => {*/
        fereaseAnimation(Chapter);
        fcreateAnimation(Chapter, title);
        /*}, 1000);*/


    }
    else {
        fcreateAnimation(Chapter, title);
    }
}
function fereaseAnimation(divElement) {
    while (divElement.firstChild) {
        divElement.removeChild(divElement.firstChild);
    }
}
function fcreateAnimation(divElement, title) {
    for (let i = 0; i < title.length; i++) {
        if (title.slice(i, i + 1) == " ") {
            Span.insertAdjacentText("afterend", "&nbsp;")
        }
        else {
            Span = document.createElement("span");
            Span.innerHTML = title.toUpperCase().slice(i, i + 1);
            divElement.appendChild(Span);
        }
    }
    fAnimateText(divElement);
}
function fAnimateText(Element, reverse = false) {
    let spanElements = Element.querySelectorAll("span");
    let tim = 0;
    spanElements.forEach(spanElement => {
        if (settings.awesome) {
            tim = tim + 0.05;
            spanElement.style.transform = "translate(-150px, -50px) rotate(-180deg) scale(3)";
            /*<span style="animation: 0.4s ease 0.35s 1 normal forwards running revolveScale;">G</span>*/
            if (reverse) {
                spanElement.style.animation = "revolveScale .3s reverse";
                /*spanElement.style.animationDirection = "reverse";*/
            }
            else {
                spanElement.style.animation = "revolveScale .3s forwards";

            }
            spanElement.style.animationDelay = tim + "s";
        }
        else {
            spanElement.style.opacity = 1;
        }
    })
}
/*Menu*/
function fshowMenuButton(butt = -1, show = false, showmenu = true) {
    /*console.log("fshowMenuButton: Start");*/
    let menu = document.querySelector(".menu");
    let buttons = menu.querySelectorAll(".rbut");

    if (showmenu) {
        /*menu self*/
        /*console.log("fshowMenuButton: Show menu self");*/
        if (!menu.classList.contains("show")) {
            menu.classList.add("show");
        }
    }
    else {
        console.log("fshowMenuButton: weet nog niet");
        buttons.forEach(button => {
            if (show) {
                if (!button.classList.contains("show")) {
                    button.classList.add("show");
                }
            }
            else {
                if (button.classList.contains("show")) {
                    button.classList.remove("show");
                }
            }
        });
        setTimeout(() => {
            if (menu.classList.contains("show")) {
                menu.classList.remove("show");
            }
        }, 2500);

    }

    if (butt == -1) {
        /*all the buttons*/
        buttons.forEach(button => {
            ftoggleMenuButton(button, show);
        });
    }
    else {
        /*one button*/
        ftoggleMenuButton(buttons[butt], show);
    }
}

function ftoggleMenuButton(element, show) {
    if (show) {
        if (settings.awesome) {
            if (!element.classList.contains("ani")) {
                element.classList.add("ani");
            }
        }
        else {
            if (!element.classList.contains("show")) {
                element.classList.add("show");
            }
        }
    }
    else {
        if (settings.awesome) {
            if (element.classList.contains("ani")) {
                element.classList.remove("ani");
            }
        }
        else {
            if (element.classList.contains("show")) {
                element.classList.remove("show");
            }
        }
    }

}
/*UI*/
function faddUIContent(url, chapter, local = true) {
    const ui = document.querySelector('.ui');
    console.log("faddUIContent: ", url);
    document.querySelector(".loader").classList.add("show");
    if (settings.awesome) {
        if (ui.classList.contains("awesome")) {
            if (ui.classList.contains("ani")) { ui.classList.remove("ani"); }
            /*setTimeout(() => {*/
            fremoveUIContent();
            if (local) {
                if (WWWMenu) { ftoggleWWWMenu(); }
            }
            fchangeChapter(chapter);
            setTimeout(() => {
                fgetUIData(url);
                ui.classList.add("ani");
                /*}, 300);*/
            }, 200);
        }
    }
    else {
        if (ui.classList.contains("show")) {
            fremoveUIContent();
            if (local) {
                if (WWWMenu) { ftoggleWWWMenu() };
            }
        }

        fchangeChapter(chapter);
        fgetUIData(url);
        ui.classList.add("show");
    }
}
/*Remove UI-content*/
function fremoveUIContent() {
    const ui_content = document.querySelector('.ui-content');
    while (ui_content.firstChild) {
        ui_content.removeChild(ui_content.firstChild);
    }
}
/*UI-Fetch data*/
async function fgetUIData(bla) {

    const response = await fetch(bla);

    if (bla.includes(".json")) {
        const jsonDoc = await response.json();
        fprocessUIJson(jsonDoc);
        document.querySelector(".loader").classList.remove("show");
    }
    else if (bla.includes(".html")) {
        const htmlstr = await response.text();
        let ui_content = document.querySelector('.ui-content');

        /*Nieuw*/
        let div = document.createElement("div");
        div.setAttribute("class", "content");
        div.setAttribute("translate", "yes");
        ui_content.appendChild(div);
        div.innerHTML = htmlstr;
        /*End ui_content.innerHTML = htmlstr;*/
        document.querySelector(".loader").classList.remove("show");
    }
    /*document.querySelector('.scrllind').classList.remove('show');*/


}
/*UI-Acc*/
function fprocessUIJson(jsonDoc) {
    /*Filling the content*/
    let item_body_content;
    let subitem_body_content;
    let subsubitem_body_content;
    let subsubsubitem_body_content;
    let uicontent = document.querySelector('.ui-content');

    let jsonType = jsonDoc["type"];
    switch (jsonType) {
        case "accordion":
            let acc = document.createElement("div");
            acc.setAttribute("class", jsonType);
            acc.setAttribute("id", jsonDoc["id"]);
            uicontent.appendChild(acc);


            if (jsonDoc.hasOwnProperty('translate')) {
                if (!jsonDoc["translate"]) {
                    acc.setAttribute("translate", "no");
                }
            }
            /* Items */
            jsonDoc["items"].forEach(jsonItem => {
                /* if exampleObj.hasOwnProperty('name') */
                item_body_content = fcreateACCItem(acc, jsonItem);
                if (jsonItem.hasOwnProperty("items")) {
                    /* SubItems  */
                    jsonItem["items"].forEach(jsonSubItem => {
                        subitem_body_content = fcreateACCItem(item_body_content, jsonSubItem);
                        if (jsonSubItem.hasOwnProperty("items")) {
                            /* SubSubItem  */
                            jsonSubItem["items"].forEach(jsonSubSubItem => {
                                subsubitem_body_content = fcreateACCItem(subitem_body_content, jsonSubSubItem);
                                if (jsonSubSubItem.hasOwnProperty("items")) {
                                    /* SubSubSubItem  */
                                    jsonSubSubItem["items"].forEach(jsonSubSubSubItem => {
                                        subsubsubitem_body_content = fcreateACCItem(subsubitem_body_content, jsonSubSubSubItem);
                                    });
                                }
                            });
                        }
                        else {
                            /*console.log("jsonSubItem: ", jsonSubItem); */
                        };
                    });
                }
                else {
                    /* fetch data???
                    console.log("Item has only one SubItem");
                    console.log("jsonSubItem: ", jsonSubItem); */
                };
            });
            acc_Init();
            break;
    }
}
function fcreateACCItem(addToBodyContent, json_item) {
    let acc_item;
    let acc_item_header;
    let acc_item_body;
    let acc_item_body_content;
    let acc_name;
    acc_name = json_item["item"];


    acc_item = document.createElement("div");
    acc_item.setAttribute("class", "acc_item");
    acc_item.setAttribute("id", acc_name);
    addToBodyContent.appendChild(acc_item);

    acc_item_header = document.createElement("div");
    acc_item_header.setAttribute("class", "acc_item_header");

    if (json_item.hasOwnProperty("translate")) {
        if (json_item["translate"]) {
            /*console.log("translate: ", (json_item["translate"]));*/
            acc_item_header.setAttribute("translate", "yes");
        }
        else {
            acc_item_header.setAttribute("translate", "no");
        }
    }

    acc_item_header.innerText = acc_name.charAt(0).toUpperCase() + acc_name.slice(1);
    acc_item.appendChild(acc_item_header);

    acc_item_body = document.createElement("div");
    acc_item_body.setAttribute("class", "acc_item_body");
    acc_item_body_content = document.createElement("div");
    acc_item_body_content.setAttribute("class", "acc_item_body_content");
    acc_item_body.appendChild(acc_item_body_content);
    acc_item.appendChild(acc_item_body);
    return acc_item_body_content;
}
/*LogIn*/
function ftoggleShowPsw() {
    var x = document.getElementById("PSWInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
/*WebSocket functions*/
function ws_Init() {
    if ("WebSocket" in window) {
        /* let protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';     */
        /* Let us open a web socket
        console.log('Trying to open a WebSocket connection...'); */
        websock = new WebSocket(
            "ws://" + window.location.hostname + ":81/ws"
        );
        websock.onopen = ws_Open;
        websock.onclose = ws_Close;
        websock.onmessage = ws_Message;
        websock.onerror = ws_Error;
    } else {
        /*The browser doesn't support WebSocket */
        alert("WebSocket NOT supported by your Browser!");
    }
}
function ws_Open(event) {
    console.log("Connection opened");
}
function ws_Message(event) {
    /*console.log(`Received a notification from ${event.origin}`);*/
    console.log(event.data);

    let jsonDoc = JSON.parse(event.data);
    let jsonID = jsonDoc["id"];
    switch (jsonDoc["id"]) {
        case "display":
            fprocessDisplayJson(jsonDoc);
            break;
        case "sensor":
            fprocessSensorJson(jsonDoc);
            break;
        default:

    }

    /*if (jsonID == "snack") { ws_rx_Snackbar(); }*/
}
function ws_Close(event) {
    if (event.wasClean) {
        /*alert(`[close] Connection closed cleanly, code=${evt.code} reason=${evt.reason}`);*/
        console.log("Connection closed");
    } else {
        /* e.g. server process killed or network down
                  event.code is usually 1006 in this case
                  alert('[close] Connection died');*/
    }
    websock.close();
}
function ws_Error(error) {
    /*alert(`[error] ${error.message}`);*/
}

function ws_rx_Snackbar() {
    console.log("ws_rx_Snackbar:");
    element = document.getElementById("snackbar");
    element.innerText = jsonDoc["message"];
    let e_Color = jsonDoc["color"];

    switch (e_Color) {
        case 1:
            element.style.backgroundColor = getComputedStyle(element).getPropertyValue("--color-ui-background");
            break;
        case 2:
            element.style.backgroundColor = "rgba(255, 0, 0, 0.674)";
            break;
        case 3:
            element.style.backgroundColor = "rgba(251, 255, 0, 0.966)";
            break;
        default:
    }
    element.className = "show";
    setTimeout(function () {
        element.className = element.className.replace("show", "");
    }, jsonDoc["timems"]);
}
/*WebSocket sending Json data to server*/
function ws_tx_Text() {
    websock.send(document.getElementById("txBar").value);
    document.getElementById("txBar").value = "";
}
function ws_tx_Brightness() {
    websock.send("#" + document.getElementById("brightness").value);
}
/*Miscellaneous methods*/
function ftoggleWWWMenu() {
    if (WWWMenu) {
        WWWMenu = false;
        fshowMenuButton(4, false);    /*training*/
        fshowMenuButton(5, false);    /*device*/
        fshowMenuButton(6, false);    /*store*/
        fshowMenuButton(7, false);    /*store*/
    }
    else {
        WWWMenu = true;
        fshowMenuButton(4, true);    /*training*/
        fshowMenuButton(5, true);    /*device*/
        fshowMenuButton(6, true);    /*store*/
        fshowMenuButton(7, true);    /*store*/
    }
    fremoveUIContent();
    fchangeChapter("");
}
/*Fullscreen mode*/
function fisFullScreen() {
    return document.fullscreenElement;
}
function fFullScreen() {
    let elUI = document.getElementsByClassName(".ui");
    if (settings.fullscreen) {
        let elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem = window.top.document.body;     /*To break out of frame in IE*/
            elem.msRequestFullscreen();
        }
        elUI.height = elUI.height - 50;
        document.querySelector(".clock").classList.add("show");
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            window.top.document.msExitFullscreen();
        }
        elUI.height = elUI.height + 50;
        document.querySelector('.clock').classList.remove("show");
    }
}
function ftoggleFullScreen() {
    settings.fullscreen = settings.fullscreen ^ true;
    fFullScreen();
}
function fAweSomeMode() {
    let body = document.querySelector("body");
    let bgimage = document.querySelector(".bgimage");
    let clsslst;

    let buttons = document.querySelectorAll(".rbut");
    let allElements = document.querySelectorAll("div");
    if (settings.awesome) {
        console.log("Awesome:");
        body.classList.add("awesome");

        /*console.log("body: ", allElements);*/
        allElements.forEach(element => {
            if (element.parentElement.nodeName == "BODY") {
                if (element.classList[0] !== "menu") {
                    clsslst = element.classList;
                    if (element.classList[0] === "bgimage") {
                        bgimage.classList.add("awesome");
                        bgimage.classList.add("ani");
                        setTimeout(() => {
                            bgimage.classList.add("ani");
                        }, 2000);
                    }
                    if (element.classList[0] === "clock") {
                        element.querySelector(".time").classList.add("awesome");
                        element.querySelector(".date").classList.add("awesome");
                    }
                    else {
                        if (clsslst.contains("show")) {
                            clsslst.remove("show");
                            clsslst.add("ani");
                        }
                        clsslst.add("awesome");
                    }

                }
            }
        });
        buttons.forEach(button => {
            clsslst = button.classList;
            clsslst.add("awesome");

            if (clsslst.contains("show")) {
                clsslst.remove("show");
                clsslst.add("ani");
            }
        });
    }
    else {
        console.log("Normal:");
        allElements.forEach(element => {
            if (element.parentElement.nodeName == "BODY") {
                if (element.classList[0] !== "menu") {
                    if (element.classList[0] === "bgimage") {
                        element.classList.remove("ani");
                        setTimeout(() => {
                            body.classList.remove("awesome");
                        }, 2000);
                    }
                    if (element.classList[0] === "clock") {
                        element.querySelector(".time").classList.remove("awesome");
                        element.querySelector(".date").classList.remove("awesome");
                    }
                    if (element.classList[0] === "loader") {
                        element.classList.remove("awesome");
                    }
                    else {
                        clsslst = element.classList;
                        if (clsslst.contains("ani")) {
                            clsslst.add("show");
                            clsslst.remove("awesome");
                            clsslst.remove("ani");
                        }
                    }
                }

            }
        });
        setTimeout(() => {
            bgimage.classList.remove("awesome");
        }, 2000);
        buttons.forEach(button => {
            clsslst = button.classList;
            if (clsslst.contains("ani")) {
                clsslst.add("show");
                clsslst.remove("awesome");
                clsslst.remove("ani");
            }
            clsslst.remove("awesome");
        })
    }
}
function ftoggleAweSomeMode() {
    settings.awesome = settings.awesome ^ true;
    fAweSomeMode();
}
function fLeftHand() {
    let body = document.querySelector("body").classList;
    let profilebut = document.querySelector(".rbut").classList;
    console.log("profilebut:", profilebut);
    let clock = document.querySelector(".clock").classList;
    if (settings.lefthand) {
        body.add("left");
        profilebut.add("left");
        clock.add("left");
    }
    else {
        body.remove("left");
        profilebut.remove("left");
        clock.remove("left");
    }
}
function ftoggleLeftHand() {
    settings.lefthand = settings.lefthand ^ true;
    fLeftHand();
}
/*Browser*/
function fisBrowserOnline() {
    if (settings.internetaccess && navigator.onLine) {
        fshowMenuButton(2, true);
    }
    else {
        fshowMenuButton(2, false);
    }
}
function fInternetAccess() {
    if (settings.internetaccess) {
        fshowMenuButton(2, true);
    }
    else {
        fshowMenuButton(2, false);
        fshowMenuButton(4, false);
        fshowMenuButton(5, false);
        fshowMenuButton(6, false);
        fshowMenuButton(7, false);
    }
}
function ftoggleInternetAccess() {
    console.log("ftoggleInternetAccess");
    settings.internetaccess = settings.internetaccess ^ true;
    fInternetAccess();
}