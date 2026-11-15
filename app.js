// Reusable function to show a toast notification
// isError = true shows a red toast
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

// Smooth scroll to any element
function scrollToElement(element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: top, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    // Find the booking section (id="booking" or the section that holds the form)
    const bookingSection = document.getElementById("booking") || form.closest("section");
    bookingSection.id = "booking";

    // Book button -> smooth scroll to booking form + toast
    document.querySelectorAll(".book-btn").forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const match = button.closest("tr").cells[1].textContent.trim();

            scrollToElement(bookingSection);
            showToast("Booking started for " + match + "! Please fill the form.");
        });
    });

    // Form submit: check details, show error if something is missing
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const inputs = form.querySelectorAll("input");

        // Remove old red borders
        inputs.forEach(function (input) {
            input.style.border = "";
        });

        // 1. Check that every field is filled
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            if (input.value.trim() === "") {
                // Use the label text in the message, e.g. "Full Name"
                const label = input.previousElementSibling.textContent.replace(":", "");
                input.style.border = "2px solid red";
                input.focus();
                showToast("Please fill in: " + label, true);
                return;
            }
        }

        const quantity = form.querySelector('input[type="number"]');
        const email = form.querySelector('input[type="email"]');
        const phone = form.querySelector('input[type="tel"]');

        // 2. Check quantity
        if (Number(quantity.value) < 1) {
            quantity.style.border = "2px solid red";
            showToast("Number of tickets must be at least 1.", true);
            return;
        }

        // 3. Check email format
        if (!email.checkValidity()) {
            email.style.border = "2px solid red";
            showToast("Please enter a valid email address.", true);
            return;
        }

        // 4. Check phone number (10 digits)
        if (!/^\d{10}$/.test(phone.value.trim())) {
            phone.style.border = "2px solid red";
            showToast("Phone number must be 10 digits.", true);
            return;
        }

        // All details are correct
        showToast("Tickets booked successfully!");
        form.reset();
    });
});