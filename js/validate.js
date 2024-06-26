! function() {
    "use strict";

    function e(e, r, o) {
        fetch(r, {
            method: "POST",
            body: o,
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then((e => {
            if (e.ok) return e.text();
            throw new Error(`${e.status} ${e.statusText} ${e.url}`)
        })).then((t => {
            if (e.querySelector(".loading").classList.remove("d-block"), "OK" != t.trim()) throw new Error(t || "Form submission failed and no error message returned from: " + r);
            e.querySelector(".sent-message").classList.add("d-block"), e.reset()
        })).catch((r => {
            t(e, r)
        }))
    }

    function t(e, t) {
        e.querySelector(".loading").classList.remove("d-block"), e.querySelector(".error-message").innerHTML = t, e.querySelector(".error-message").classList.add("d-block")
    }
    document.querySelectorAll(".php-email-form").forEach((function(r) {
        r.addEventListener("submit", (function(r) {
            r.preventDefault();
            let o = this,
                s = o.getAttribute("action"),
                a = o.getAttribute("data-recaptcha-site-key");
            if (!s) return void t(o, "The form action property is not set!");
            o.querySelector(".loading").classList.add("d-block"), o.querySelector(".error-message").classList.remove("d-block"), o.querySelector(".sent-message").classList.remove("d-block");
            let c = new FormData(o);
            a ? "undefined" != typeof grecaptcha ? grecaptcha.ready((function() {
                try {
                    grecaptcha.execute(a, {
                        action: "php_email_form_submit"
                    }).then((t => {
                        c.set("recaptcha-response", t), e(o, s, c)
                    }))
                } catch (e) {
                    t(o, e)
                }
            })) : t(o, "The reCaptcha javascript API url is not loaded!") : e(o, s, c)
        }))
    }))
}();