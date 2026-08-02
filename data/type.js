module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    const id = req.query.id;

    // 1. Agar ID missing ya unauthorized ho -> Return Lock HTML Template
    if (!id) {
        return res.send(getLockHTML(null));
    }

    try {
        const verifyUrl = `https://ahmad-bhai-codes-shop.vercel.app/f?id=${encodeURIComponent(id)}`;
        const response = await fetch(verifyUrl);
        const resultText = await response.text();
        const result = resultText.trim();

        // 2. Exact 'F' means Unlocked -> Return Main Script HTML Template
        if (result === 'F') {
            return res.send(getMainHTML(id));
        } else {
            return res.send(getLockHTML(id));
        }
    } catch (error) {
        return res.send(getLockHTML(id));
    }
};

// --- LOCK HTML TEMPLATE ---
function getLockHTML(id) {
    const idDisplay = id ? `ID: ${id}` : '';
    return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Locked</title></head>
<body>
<script id="js">
      javascript:(function(){

// 1. URL se ID read karna
const uP = new URLSearchParams(window.location.search);
let id = uP.get('id') || "";

// 2. Direct Lock Screen Show karna
showLock(id);

function showLock(id){
    // Pehle se mavjood kisi bhi dialog ko remove karein
    var dialogs = document.querySelectorAll("dialog");
    if (dialogs.length) {
        dialogs.forEach(dia => dia.remove());
    }

    var color = "#1c242a";

    var html = `<div style="font-family: sans-serif;padding:1rem;background:${color};width:${screen.width>500?100+"%":(screen.width-40)+"px"};border-top: 5px solid #05c55e" class="dia">

<div style="text-align:center">      
<div style="line-height:50px;font-size:30px;color:#fff; font-weight:900">LOCKED</div>      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"      
width="50pt" height="50pt" viewBox="0 0 180.000000 180.000000"      
preserveAspectRatio="xMidYMid meet" style="display:inline-block;text-align:center">

<g transform="translate(0.000000,180.000000) scale(0.100000,-0.100000)"      
fill="#fff" stroke="none">
<path d="M753 1622 l-133 -77 0 -67 0 -67 87 50 c49 28 96 55 105 60 17 9 18      
-23 18 -626 l0 -636 -50 28 -50 28 0 443 0 442 -55 0 -55 0 0 -405 c0 -223 -3      
-405 -7 -405 -5 0 -27 10 -50 22 l-43 23 0 308 0 308 -57 -3 -58 -3 -5 -267      
-5 -267 -40 22 -40 23 0 339 0 339 103 59 102 59 0 64 c0 35 -3 64 -6 64 -4 0      
-78 -41 -165 -92 l-159 -92 0 -401 0 -401 342 -198 c189 -110 348 -199 353      
-199 6 0 164 89 353 199 l342 199 0 400 0 400 -159 93 c-87 50 -161 92 -165      
92 -3 0 -6 -29 -6 -64 l0 -63 103 -60 102 -59 0 -339 0 -340 -42 -23 -43 -23      
0 270 0 271 -60 0 -60 0 0 -307 0 -308 -40 -22 c-21 -13 -41 -23 -44 -23 -4 0      
-6 182 -6 405 l0 405 -60 0 -60 0 0 -443 0 -442 -46 -28 c-26 -15 -48 -26 -50      
-24 -2 2 -3 288 -2 635 l3 632 103 -60 c57 -33 105 -60 108 -60 2 0 4 29 4 65      
l0 64 -92 54 c-51 30 -113 66 -138 80 l-45 26 -132 -77z"/>
</g>
</svg>

</div>      <br>      <div style="text-align:center;color:#fff;font-family:monospace" id="cid">${id}</div>      <br>      <div style="text-align: center;">      
<button style="padding:10px 20px;background:#05c55e;color:#fff;border:none;box-shadow:none;cursor:pointer;">      
CLOSE      
</button>      
</div>      <br>      <div style="color:#ff6251;font-size:12px;text-align:center">📝 CONTACT TO UNLOCK !!! 🔓</div>      <hr style="border-color:#fff">      <div style="text-align:center;font-weight:100;color:#fff">      
Made with <span style="animation: heartbeat 1.4s infinite;">♥</span> by       
<a style="color:#fff" href="https://t.me/Magic_Scripts" target="_blank">@Magic_Scripts</a>      
</div>      </div>`;

    var myDialog = document.createElement("dialog");
    document.body.appendChild(myDialog);
    myDialog.innerHTML = html;

    var styleElem = document.head.appendChild(document.createElement("style"));
    styleElem.innerHTML = `
    @keyframes heartbeat {
        0%{color:#ffb3b3}
        35%{color:#ff1a1a}
        100%{color:#ffb3b3}
    }

    dialog::backdrop {
        background:#05c55e;
        opacity:.25
    }

    ::selection {
        background:white;
        color:${color}
    }
    `;

    myDialog.showModal();

    myDialog.querySelector("button").addEventListener("click", () => {
        myDialog.close();
    });
}

})();
</script>
</body>
</html>`;
}

// --- MAIN SCRIPT HTML TEMPLATE ---
function getMainHTML(id) {
    return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Main Script</title></head>
<body>
<script id="js">
(() => {
    let savedEmail = localStorage.getItem("quotex_magic_email") || "user@example.com";
    let savedId = localStorage.getItem("quotex_magic_id") || "${id}";

    const createDialogBox = () => {
        if (document.getElementById("quotex-magic-dialog")) return;

        const dialog = document.createElement("div");
        dialog.id = "quotex-magic-dialog";
        dialog.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#1e222d;color:#fff;padding:20px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.7);z-index:999999;width:300px;font-family:Arial,sans-serif;border:1px solid #0FAF59;text-align:center;";

        dialog.innerHTML = \`
            <h3 style="margin:0 0 15px 0;color:#0FAF59;font-size:18px;">Quotex Magic Setup</h3>
            <div style="margin-bottom:12px;text-align:left;">
                <label style="font-size:12px;color:#aaa;display:block;margin-bottom:4px;">User Email:</label>
                <input type="text" id="magic-email-input" value="\${savedEmail}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#131722;color:#fff;box-sizing:border-box;font-size:13px;" />
            </div>
            <div style="margin-bottom:20px;text-align:left;">
                <label style="font-size:12px;color:#aaa;display:block;margin-bottom:4px;">User ID:</label>
                <input type="text" id="magic-id-input" value="\${savedId}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#131722;color:#fff;box-sizing:border-box;font-size:13px;" />
            </div>
            <button id="run-magic-btn" style="width:100%;background:#0FAF59;color:#fff;border:none;padding:10px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:14px;">Run Magic</button>
        \`;

        document.body.appendChild(dialog);

        document.getElementById("run-magic-btn").addEventListener("click", () => {
            const emailInput = document.getElementById("magic-email-input").value.trim();
            const idInput = document.getElementById("magic-id-input").value.trim();

            if (emailInput) {
                savedEmail = emailInput;
                localStorage.setItem("quotex_magic_email", emailInput);
            }
            if (idInput) {
                savedId = idInput;
                localStorage.setItem("quotex_magic_id", idInput);
            }

            dialog.remove();
            startQuotexScript();
        });
    };

    const startQuotexScript = () => {
        let limit__lower = 5000;
        let limit__upper = 10000;

        document.title = "Live trading | Quotex";
        if (window.location.pathname !== "/en/trade") {
            window.history.replaceState(null, "", "/en/trade");
        }

        const getLevelHref = () => {
            let balance = 0;
            const balanceElement = document.querySelector(".Zt1hG");

            if (balanceElement) {
                const rawText = balanceElement.textContent || balanceElement.innerText || "";
                const cleanText = rawText.replace(/,/g, "").replace(/[^0-9.]/g, "");
                balance = parseFloat(cleanText) || 0;

                if (rawText.includes("₹")) {
                    limit__lower = 415000;
                    limit__upper = 830000;
                } else {
                    limit__lower = 5000;
                    limit__upper = 10000;
                }
            }

            if (balance >= limit__upper) {
                return "/profile/images/spritemap.svg#icon-profile-level-vip";
            } else if (balance >= limit__lower) {
                return "/profile/images/spritemap.svg#icon-profile-level-pro";
            } else {
                return "/profile/images/spritemap.svg#icon-profile-level-standart";
            }
        };

        const updateDropdownDetails = (targetHref) => {
            const drop_el = document.querySelector("#header-mobile-asset-btn + * > :first-child > :last-child > :first-child");
            if (!drop_el) return;

            try {
                const emailNode = drop_el.querySelector(":first-child > :nth-child(2) > :first-child > :first-child > :nth-child(2) > :first-child > :first-child");
                if (emailNode) emailNode.innerText = savedEmail;

                const idNode = drop_el.querySelector(":first-child > :nth-child(2) > :first-child > :first-child > :nth-child(2) > :first-child > :last-child");
                if (idNode) idNode.innerText = \`ID: \${savedId}\`;

                const dropIconNode = drop_el.querySelector(":nth-child(1) > :first-child > :first-child > :first-child svg use");
                if (dropIconNode) {
                    dropIconNode.setAttribute("xlink:href", targetHref);
                    dropIconNode.setAttribute("href", targetHref);
                }

                const levelNode = drop_el.querySelector(":nth-child(1) > :first-child > :first-child > :last-child > :first-child");
                const percentageProfitNode = drop_el.querySelector(":nth-child(1) > :first-child > :first-child > :last-child > :last-child");

                if (levelNode) {
                    const rawLevel = targetHref.split("-").pop();
                    if (rawLevel === "standart") {
                        levelNode.innerText = "standard:";
                        if (percentageProfitNode) percentageProfitNode.innerText = "+0% profit";
                    } else if (rawLevel === "pro") {
                        levelNode.innerText = "pro:";
                        if (percentageProfitNode) percentageProfitNode.innerText = "+2% profit";
                    } else if (rawLevel === "vip") {
                        levelNode.innerText = "vip:";
                        if (percentageProfitNode) percentageProfitNode.innerText = "+4% profit";
                    }
                }
            } catch (err) {}
        };

        const applyQuotexChanges = () => {
            document.querySelectorAll(".v2KPX.lTzTl, span").forEach(el => {
                if (el.textContent.trim() === "Demo") {
                    el.textContent = "Live";
                    el.style.color = "#0FAF59";
                }
            });

            const targetToRemove = document.querySelector(".q04vx.o2msZ");
            if (targetToRemove) {
                targetToRemove.remove();
            }

            const targetHref = getLevelHref();
            const academicSvg = document.querySelector("svg.icon-academic") || 
                                document.querySelector("svg:has(use[href*='icon-profile-level-']), svg:has(use[xlink\\\\:href*='icon-profile-level-'])");

            if (academicSvg) {
                const useTag = academicSvg.querySelector("use");
                if (useTag) {
                    if (useTag.getAttribute("xlink:href") !== targetHref) {
                        useTag.setAttribute("xlink:href", targetHref);
                        useTag.setAttribute("href", targetHref);
                    }
                }
            }

            updateDropdownDetails(targetHref);
        };

        setInterval(applyQuotexChanges, 50);
    };

    createDialogBox();
})();
</script>
</body>
</html>`;
}
