/*function init(){
    try {
        const button = document.getElementById('submit');

    } catch (e){};
    try {
        const buttonQuery = document.getElementById('submit_q');

    } catch (e){};

    document.getElementById('results').style.display='none';
    document.getElementById('xForm').style.display='block';
}
/**
 * it sends an Ajax query using axios
 * @param url the url to send to
 * @param data the data to send (e.g. a Javascript structure)
 *//*
function sendAxiosQuery(url, data) {
    axios.post(url , data)
        .then (function (dataR) {
            document.getElementById('results').innerHTML= "The result is: "+JSON.stringify(dataR.data);
            document.getElementById('results').style.display='block';
            document.getElementById('xForm').style.display='none';
        })
        .catch( function (response) {
            alert (JSON.stringify(response));
        })
}

/**
 * called when the submit button is pressed
 * @param event the submission event
 */
