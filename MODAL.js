// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Close modal when xBtn is clicked
document.getElementById("xBtn").addEventListener("click", function() {
    document.getElementById("myModal").style.display = "none";
});

// Close modal when doneBtn is clicked
document.getElementById("doneBtn").addEventListener("click", function() {
    document.getElementById("myModal").style.display = "none";
});

document.addEventListener('DOMContentLoaded', () => {
  const checkAll = document.getElementById('checkAll');
  const checkDep = document.getElementById('checkDep');
  const checkLoc = document.getElementById('checkLoc');

  // Selectăm toate checkbox-urile din pagină, cu excepția celor de tip "select all"
  const allCheckboxes = Array.from(document.querySelectorAll('.modal-body input[type="checkbox"]'))
    .filter(cb => !['checkAll', 'checkDep', 'checkLoc'].includes(cb.id));

  // Checkbox-urile din fiecare coloană
  const depCheckboxes = Array.from(document.querySelectorAll('.first-col .row1 input[type="checkbox"]'));
  const locCheckboxes = Array.from(document.querySelectorAll('.second-col .row2 input[type="checkbox"]'));

  function toggleCheckboxes(source, targets) {
    targets.forEach(cb => cb.checked = source.checked);
  }

  function updateMasterCheckbox(groupCheckboxes, masterCheckbox) {
    masterCheckbox.checked = groupCheckboxes.every(cb => cb.checked);
  }

  // --- "Department" controlează doar coloană 1
  checkDep.addEventListener('change', () => {
    toggleCheckboxes(checkDep, depCheckboxes);
    updateMasterCheckbox([...depCheckboxes, ...locCheckboxes], checkAll);
  });

  // --- "Location" controlează doar coloană 2
  checkLoc.addEventListener('change', () => {
    toggleCheckboxes(checkLoc, locCheckboxes);
    updateMasterCheckbox([...depCheckboxes, ...locCheckboxes], checkAll);
  });

  // --- "All users" controlează tot
  checkAll.addEventListener('change', () => {
    toggleCheckboxes(checkAll, allCheckboxes);
    checkDep.checked = depCheckboxes.every(cb => cb.checked);
    checkLoc.checked = locCheckboxes.every(cb => cb.checked);
  });

  // --- actualizăm butoanele master când se schimbă individual checkboxurile
  depCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      updateMasterCheckbox(depCheckboxes, checkDep);
      updateMasterCheckbox([...depCheckboxes, ...locCheckboxes], checkAll);
    });
  });

  locCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      updateMasterCheckbox(locCheckboxes, checkLoc);
      updateMasterCheckbox([...depCheckboxes, ...locCheckboxes], checkAll);
    });
  });
});
