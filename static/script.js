let favoriteQuotes = JSON.parse(localStorage.getItem("favorites")) || [];

// ============================
// Generate Quotes
// ============================

async function generateQuote() {

    const topic = document.getElementById("topic").value.trim();
    const category = document.getElementById("category").value;
    const model = document.getElementById("model").value;

    if (topic === "") {
        alert("Please enter a topic.");
        return;
    }

    const loading = document.getElementById("loading");
    loading.style.display = "block";

    const start = performance.now();

    try {

        const response = await fetch("/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                topic: topic,
                category: category,
                model: model
            })

        });

        const data = await response.json();

        loading.style.display = "none";

        const end = performance.now();

        document.getElementById("responseTime").innerText =
            ((end - start) / 1000).toFixed(2) + " seconds";

        if (!data.success) {
            alert(data.message);
            return;
        }

        document.getElementById("quote1").innerHTML = data.quotes[0] || "";
        document.getElementById("quote2").innerHTML = data.quotes[1] || "";
        document.getElementById("quote3").innerHTML = data.quotes[2] || "";

    }

    catch (error) {

        loading.style.display = "none";

        alert("Server Error");

    }

}

// ============================
// Theme
// ============================

function toggleTheme() {

    document.body.classList.toggle("light");

    const btn = document.getElementById("themeBtn");

    if (document.body.classList.contains("light")) {

        btn.innerHTML = "🌞 Light Mode";

    } else {

        btn.innerHTML = "🌙 Dark Mode";

    }

}

// ============================
// Scroll
// ============================

function scrollToGenerator() {

    document.querySelector(".generator").scrollIntoView({

        behavior: "smooth"

    });

}

// ============================
// Favorites
// ============================

function favoriteQuote(id) {

    const quote = document.getElementById(id).innerText;

    if (quote === "") return;

    favoriteQuotes.push(quote);

    localStorage.setItem(

        "favorites",

        JSON.stringify(favoriteQuotes)

    );

    alert("❤️ Saved to Favorites");

}

// ============================
// Copy
// ============================

function copyCurrent() {

    let text = "";

    text += document.getElementById("quote1").innerText + "\n\n";
    text += document.getElementById("quote2").innerText + "\n\n";
    text += document.getElementById("quote3").innerText;

    navigator.clipboard.writeText(text);

    alert("Copied!");

}

// ============================
// Share
// ============================

function shareLinkedIn() {

    window.open(

        "https://www.linkedin.com/sharing/share-offsite/?url=" +

        encodeURIComponent(location.href)

    );

}

function shareTwitter() {

    const quote = document.getElementById("quote1").innerText;

    window.open(

        "https://twitter.com/intent/tweet?text=" +

        encodeURIComponent(quote)

    );

}

function shareWhatsApp() {

    const quote = document.getElementById("quote1").innerText;

    window.open(

        "https://wa.me/?text=" +

        encodeURIComponent(quote)

    );

}

// ============================
// PNG
// ============================

async function downloadPNG() {

    const canvas = await html2canvas(

        document.querySelector(".quotes-grid")

    );

    const link = document.createElement("a");

    link.download = "quotes.png";

    link.href = canvas.toDataURL();

    link.click();

}

// ============================
// PDF
// ============================

async function downloadPDF() {

    const canvas = await html2canvas(

        document.querySelector(".quotes-grid")

    );

    const img = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    pdf.addImage(

        img,

        "PNG",

        10,

        10,

        190,

        90

    );

    pdf.save("quotes.pdf");

}

// ============================
// Particles
// ============================

particlesJS("particles-js", {

    particles: {

        number: {
            value: 80
        },

        color: {
            value: "#4f46e5"
        },

        shape: {
            type: "circle"
        },

        opacity: {
            value: 0.4
        },

        size: {
            value: 3
        },

        move: {
            enable: true,
            speed: 2
        }

    }

});