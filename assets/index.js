var selector = document.querySelector(".selector_box"); [cite: 39]
selector.addEventListener('click', () => { [cite: 39]
    if (selector.classList.contains("selector_open")){ [cite: 39]
        selector.classList.remove("selector_open") [cite: 39]
    }else{ [cite: 39]
        selector.classList.add("selector_open") [cite: 39]
    } [cite: 39]
}) [cite: 39]

document.querySelectorAll(".date_input").forEach((element) => { [cite: 39]
    element.addEventListener('click', () => { [cite: 39]
        document.querySelector(".date").classList.remove("error_shown") [cite: 39]
    }) [cite: 39]
}) [cite: 39]

var sex = "m" [cite: 39]

document.querySelectorAll(".selector_option").forEach((option) => { [cite: 39]
    option.addEventListener('click', () => { [cite: 39]
        sex = option.id; [cite: 39]
        document.querySelector(".selected_text").innerHTML = option.innerHTML; [cite: 39]
    }) [cite: 39]
}) [cite: 39]

var upload = document.querySelector(".upload"); [cite: 40]
var imageInput = document.createElement("input"); [cite: 40]
imageInput.type = "file"; [cite: 40]
imageInput.accept = ".jpeg,.png,.gif"; [cite: 40]

document.querySelectorAll(".input_holder").forEach((element) => { [cite: 41]
    var input = element.querySelector(".input"); [cite: 41]
    input.addEventListener('click', () => { [cite: 41]
        element.classList.remove("error_shown"); [cite: 41]
    }) [cite: 41]
}); [cite: 41]

upload.addEventListener('click', () => { [cite: 42]
    imageInput.click(); [cite: 42]
    upload.classList.remove("error_shown") [cite: 42]
}); [cite: 42]

// POPRAWIONE ZDARZENIE UPLOADU DO IMGBB
imageInput.addEventListener('change', (event) => { [cite: 43]

    upload.classList.remove("upload_loaded"); [cite: 43]
    upload.classList.add("upload_loading"); [cite: 43]

    upload.removeAttribute("selected") [cite: 43]

    var file = imageInput.files[0]; [cite: 43]
    
    // Tworzymy poprawny obiekt FormData bezpośrednio z plikiem i kluczem API
    const formData = new FormData();
    formData.append('image', file); 
    formData.append('key', '49694cd959050357c5e4ed4a8f3bb394');

    fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData
    })  
    .then(result => {
        if (!result.ok) {
            throw new Error('Błąd przesyłania');
        }
        return result.json();
    })
    .then(response => {
        var url = response.data.url;
        upload.classList.remove("error_shown") [cite: 44]
        upload.setAttribute("selected", url); [cite: 44]
        upload.classList.add("upload_loaded"); [cite: 44]
        upload.classList.remove("upload_loading"); [cite: 44]
        upload.querySelector(".upload_uploaded").src = url; [cite: 44]
    })
    .catch(err => {
        console.error(err);
        upload.classList.remove("upload_loading");
        upload.classList.add("error_shown");
        alert("Wystąpił błąd podczas wysyłania zdjęcia. Spróbuj ponownie.");
    });

})

document.querySelector(".go").addEventListener('click', () => { [cite: 44]

    var empty = []; [cite: 44]
    var params = new URLSearchParams(); [cite: 45]

    params.set("sex", sex) [cite: 45]
    if (!upload.hasAttribute("selected")){ [cite: 45]
        empty.push(upload); [cite: 45]
        upload.classList.add("error_shown") [cite: 46]
    }else{ [cite: 46]
        params.set("image", upload.getAttribute("selected")) [cite: 46]
    } [cite: 46]

    var birthday = ""; [cite: 46]
    var dateEmpty = false; [cite: 47]
    document.querySelectorAll(".date_input").forEach((element) => { [cite: 47]
        birthday = birthday + "." + element.value [cite: 47]
        if (isEmpty(element.value)){ [cite: 47]
            dateEmpty = true; [cite: 47]
        } [cite: 47]
    }) [cite: 47]

    birthday = birthday.substring(1); [cite: 47]
    if (dateEmpty){ [cite: 48]
        var dateElement = document.querySelector(".date"); [cite: 48]
        dateElement.classList.add("error_shown"); [cite: 48]
        empty.push(dateElement); [cite: 48]
    }else{ [cite: 49]
        params.set("birthday", birthday) [cite: 49]
    } [cite: 49]

    document.querySelectorAll(".input_holder").forEach((element) => { [cite: 49]

        var input = element.querySelector(".input"); [cite: 49]

        if (isEmpty(input.value)){ [cite: 49]
            empty.push(element); [cite: 49]
            element.classList.add("error_shown"); [cite: 49]
        }else{ [cite: 49]
            params.set(input.id, input.value) [cite: 49]
        } [cite: 49]

    }) [cite: 49]

    if (empty.length != 0){ [cite: 50]
        empty[0].scrollIntoView(); [cite: 50]
    }else{ [cite: 51]
        forwardToId(params); [cite: 51]
    } [cite: 51]

}); [cite: 51]

function isEmpty(value){ [cite: 52]
    let pattern = /^\s*$/ [cite: 52]
    return pattern.test(value); [cite: 52]
} [cite: 53]

function forwardToId(params){ [cite: 53]
    location.href = "id.html?" + params [cite: 53]
} [cite: 53]

var guide = document.querySelector(".guide_holder"); [cite: 53]
guide.addEventListener('click', () => { [cite: 54]

    if (guide.classList.contains("unfolded")){ [cite: 54]
        guide.classList.remove("unfolded"); [cite: 54]
    }else{ [cite: 54]
        guide.classList.add("unfolded"); [cite: 54]
    } [cite: 54]

}) [cite: 54]

document.querySelectorAll(".input").forEach((input) => { [cite: 54]
    input.value = localStorage.getItem(input.id) || ""; [cite: 54]
    input.addEventListener("input", () => { [cite: 54]
        localStorage.setItem(input.id, input.value); [cite: 54]
    }); [cite: 54]
}); [cite: 54]
