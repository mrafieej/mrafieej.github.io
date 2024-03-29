// https://medium.com/@dmccoy/how-to-submit-an-html-form-to-google-sheets-without-google-forms-b833952cc175
//https://railsrescue.com/blog/2015-05-28-step-by-step-setup-to-send-form-data-to-google-sheets/


// Variable to hold request
var request;
// Bind to the submit event of our form
$("#submit-to-google-sheet").submit(function(event){
    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbyusaxv27k4LEHR0lGODdqG2eXdLwa8O_kf_0MCpvtH16O0Fqs/exec",
        type: "get",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        $form[0].reset(); // Clear the form

        $('#myResultDiv').text("Thanks for your interest. We will be in touch soon.");

        // Log a message to the console
        // console.log("Hooray, it worked!");
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        $form[0].reset();

        $('#myResultDiv').text("Submission Failed. Please, try again.");

        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        $form[0].reset();
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

    // Prevent default posting of form
    event.preventDefault();
});








// const scriptURL = 'https://script.google.com/macros/s/AKfycbwGLEQFoKH3q9FuElNhNWeV9SjomlOTF7KXDeNCT2IImuhgD1g/exec'
// const form = document.forms['submit-to-google-sheet']
// form.addEventListener('submit', e => {
//   e.preventDefault()
//   fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//     .then(response => console.log('Success!', response))
//     .catch(error => console.error('Error!', error.message))
// })