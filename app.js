// ======================================================
// Reusable showToast() function (notifications)
// ======================================================
function showToast(message, isError) {
    let toast = document.getElementById("toast");

    // Create the toast if the HTML doesn't have one
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.style.cssText =
            "position:fixed; bottom:30px; left:50%; transform:translateX(-50%);" +
            "color:white; padding:14px 24px; border-radius:6px;" +
            "z-index:1000; transition:opacity 0.3s; opacity:0; pointer-events:none;";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.background = isError ? "#c0392b" : "#222";
    toast.classList.add("show");
    toast.style.opacity = "1";

    // Hide the toast after 3 seconds
    setTimeout(function () {
        toast.classList.remove("show");
        toast.style.opacity = "0";
    }, 3000);
}

// Run after the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // STEP 1: Select the form controls using DOM selectors
    // ==================================================
    const bookingForm = document.querySelector("form");
    const selects = bookingForm.querySelectorAll("select");

    const matchSelect = document.getElementById("match-select") || selects[0];   // Match dropdown
    const standSelect = document.getElementById("stand-select") || selects[1];   // Stand dropdown
    const quantityInput = bookingForm.querySelector('input[type="number"]');     // Ticket quantity
    const nameInput = bookingForm.querySelector('input[type="text"]');
    const emailInput = bookingForm.querySelector('input[type="email"]');
    const phoneInput = bookingForm.querySelector('input[type="tel"]');

    const summaryCard = document.querySelector(".summary");                      // Booking Summary Card
    const bookingSection = document.getElementById("booking") || bookingForm.closest("section");
    const bookButtons = document.querySelectorAll(".book-btn");

    // Quantity starts at 1
    if (quantityInput.value === "") {
        quantityInput.value = 1;
    }

    // Ticket prices (same as the match schedule table)
    const prices = {
        "RCB vs CSK": { General: 800,  Premium: 2000, VIP: 5000 },
        "MI vs KKR":  { General: 1000, Premium: 2500, VIP: 6000 },
        "CSK vs RR":  { General: 700,  Premium: 1800, VIP: 4500 }
    };

    // ==================================================
    // STEP 2: Read the selected match, stand and quantity
    // STEP 3: Calculate the total and show it in the summary card
    // ==================================================
    function updateSummary(showMessage) {
        // Read the selected values
        const match = matchSelect.value || matchSelect.options[matchSelect.selectedIndex].text;
        const stand = standSelect.value || standSelect.options[standSelect.selectedIndex].text;
        const quantity = Number(quantityInput.value);

        // Quantity must be at least 1
        if (quantity < 1) {
            summaryCard.innerHTML =
                "<h3>Booking Summary</h3>" +
                "<p>Match: " + match + "</p>" +
                "<p>Stand: " + stand + "</p>" +
                "<p>Ticket Price: ₹" + prices[match][stand] + "</p>" +
                "<p>Quantity: 0</p>" +
                "<hr>" +
                "<h3>Total Amount: ₹0</h3>";
            if (showMessage) {
                showToast("Please enter at least 1 ticket.", true);
            }
            return;
        }

        // Calculate the total price
        const price = prices[match][stand];
        const total = price * quantity;

        // Display the details in the Booking Summary Card
        summaryCard.innerHTML =
            "<h3>Booking Summary</h3>" +
            "<p>Match: " + match + "</p>" +
            "<p>Stand: " + stand + "</p>" +
            "<p>Ticket Price: ₹" + price + "</p>" +
            "<p>Quantity: " + quantity + "</p>" +
            "<hr>" +
            "<h3>Total Amount: ₹" + total + "</h3>";

        // ==============================================
        // STEP 4: Use showToast() to confirm the summary updated
        // ==============================================
        if (showMessage) {
            showToast("Summary updated: " + match + ", " + stand + " x " + quantity + " = ₹" + total);
        }
    }

    // ==================================================
    // STEP 2 (continued): change event listeners
    // (input also fires while typing the quantity)
    // ==================================================
    matchSelect.addEventListener("change", function () {
        updateSummary(true);
    });

    standSelect.addEventListener("change", function () {
        updateSummary(true);
    });

    quantityInput.addEventListener("change", function () {
        updateSummary(true);
    });

    quantityInput.addEventListener("input", function () {
        updateSummary(false);
    });

    // Show the starting summary when the page loads
    updateSummary(false);

    // ==================================================
    // Book button: select the match + smooth scroll + toast
    // ==================================================
    bookButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            // Get the match name from the same table row
            const match = button.closest("tr").cells[1].textContent.trim();

            // Select that match in the dropdown and update the summary
            for (let i = 0; i < matchSelect.options.length; i++) {
                if (matchSelect.options[i].text === match) {
                    matchSelect.selectedIndex = i;
                }
            }
            if (Number(quantityInput.value) < 1) {
                quantityInput.value = 1;
            }
            updateSummary(false);

            // Smooth scroll to the booking form
            const top = bookingSection.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: top, behavior: "smooth" });

            showToast("Booking started for " + match + "! Please fill the form.");
        });
    });

    // ==================================================
    // Form submit: show an error if details are missing
    // ==================================================
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (Number(quantityInput.value) < 1) {
            showToast("Please enter at least 1 ticket.", true);
        } else if (nameInput.value.trim() === "") {
            showToast("Please fill in: Booking details", true);
        } else if (emailInput.value.trim() === "" || !emailInput.checkValidity()) {
            showToast("Please enter a valid email address.", true);
        } else if (!/^\d{10}$/.test(phoneInput.value.trim())) {
            showToast("Phone number must be 10 digits.", true);
        } else {
            showToast("Tickets booked successfully!");
            bookingForm.reset();
            quantityInput.value = 1;
            updateSummary(false);
        }
    });
});