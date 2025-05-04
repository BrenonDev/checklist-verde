export function init() {
    console.log('signup.js inicializado');

    function toggleOtherField() {
        const genderSelect = document.getElementById('gender');
        const otherGenderLabel = document.getElementById('other-gender-label');
        const otherGenderInput = document.getElementById('other-gender');
        
        if (genderSelect.value === 'other') {
            otherGenderLabel.classList.remove('disabled');
            otherGenderInput.disabled = false;
        } else {
            otherGenderLabel.classList.add('disabled');
            otherGenderInput.disabled = true;
        }
    }
    
    window.toggleOtherField = toggleOtherField;
  }
