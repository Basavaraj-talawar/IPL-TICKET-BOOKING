// Reusable function to show a toast notification
function showToast(message) {
    let toast = document.getElementById("toast");

    // Create the toast if the HTML doesn't have one
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.style.cssText =
            "position:fixed; bottom:30px; left:50%; transform:translateX(-50%);" +
            "background:#222; color:white; padding:14px 24px; border-radius:6px;" +
            "z-index:1000; transition:opacity 0.3s; opacity:0; pointer-events:none;";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
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

    // Toast when the booking form is submitted
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        showToast("Tickets booked successfully!");
        form.reset();
    });
});