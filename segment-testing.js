window.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".api-button");
  buttons.forEach((element) => {
    element.addEventListener("click", function () {
      if (typeof window[element.id] === "function") {
        window[element.id]();
        console.log("Added function for: " + element.id);
      } else {
        console.error("No function found for: " + element.id);
      }
    });
  });
});

function track_api() {
  analytics.track(getInputValue("event_name"), getPropertiesObject());
}

function getInputValue(element) {
  let elementData = document.getElementById(element).value;
  return elementData;
}

function getPropertiesObject() {
  // Retrieve values from input fields
  var groupName = document.getElementById("prop_group_name").value;
  var obj = {};

  // Determine the number of key-value pairs dynamically
  // Assuming the pattern of IDs is consistent (prop_key_X and prop_value_X)
  var index = 1;
  while (true) {
    var keyField = document.getElementById("prop_key_" + index);
    var valueField = document.getElementById("prop_value_" + index);

    // Break the loop if the key field doesn't exist
    if (!keyField) {
      break;
    }

    var key = keyField.value;
    var value = valueField.value;

    // Add key-value pair to the object if both key and value are provided
    if (key && value) {
      obj[key] = value;
    } else {
      break;
    }

    index++;
  }

  return obj;
}
