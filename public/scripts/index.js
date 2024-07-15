document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('familyForm');
    const pictureInput = document.getElementById('picture');
    const imagePreview = document.getElementById('imagePreview');
    const uploadText = document.getElementById('uploadText');
    const uploadIcon = document.getElementById('uploadIcon');

    // Handle image selection and preview
    pictureInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.classList.remove('hidden');
                // Show the image preview
                uploadText.textContent = file.name;
                uploadIcon.classList.add('hidden')
                // Update text to show selected file name
            }
            reader.readAsDataURL(file);
        } else {
            imagePreview.classList.add('hidden'); // Hide the image preview if no file is selected
            imagePreview.src = ''; // Clear the src attribute
            uploadText.textContent = 'Upload a picture:'; // Reset the upload text
        }
    });

    var radios = form.querySelectorAll('input[type="radio"]');
    radios.forEach(function (radio) {
        radio.checked = false;
    });

    // Prevent browser auto-fill
    form.reset();

    // Show/hide custom input fields
    document.querySelectorAll('input[name="grandFather"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            document.getElementById('grandFatherName').style.display = this.value === 'other' ? 'block' : 'none';
        });
    });

    document.querySelectorAll('input[name="grandMother"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            document.getElementById('grandMotherName').style.display = this.value === 'other' ? 'block' : 'none';
        });
    });

    document.querySelectorAll('input[name="family"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            document.getElementById('familyName').style.display = this.value === 'other' ? 'block' : 'none';
        });
    });

    // Language toggle functionality
    document.getElementById('languageToggle').addEventListener('click', function () {
        var currentLang = this.src.includes('english.png') ? 'english' : 'malayalam';
        var newLang = currentLang === 'english' ? 'malayalam' : 'english';
        var langData = {
            'english': {
                'title': 'Anappadikkal Family <br> Meet 2024',
                'uploadText': 'Upload a picture:',
                'nameLabel': 'Name:',
                'genderLabel': 'Gender:',
                'ageLabel': 'Age:',
                'maleLabel': 'Male',
                'femaleLabel': 'Female',
                'educationLabel': 'Education:',
                'lkgLabel': 'LKG/UKG',
                'sslcLabel': 'SSLC',
                'plus2Label': '+2',
                'degreeLabel': 'Degree',
                'pgLabel': 'PG',
                'phdLabel': 'PHD',
                'gfLabel': 'Grand Father\'s name:',
                'gfMammuLabel': 'Mammu Haji',
                'gfWriteLabel': 'Write your Grand Father\'s name',
                'gmLabel': 'Grand Mother\'s name:',
                'gmFathimaLabel': 'Fathimakutty',
                'gmWriteLabel': 'Write your Grand Mother\'s name',
                'familyLabel': 'Family name:',
                'familyAnapaddikalLabel': 'Anapaddikal Family',
                'familyWriteLabel': 'Write your Family name',
                'addressLabel': 'Address:',
                'submitButton': 'Submit',
                'footer': 'If you have any other personal urgent matters, please feel free to contact us at',
            },
            'malayalam': {
                'title': 'അനപ്പടിക്കൽ കുടുംബം <br> മീറ്റ് 2024',
                'uploadText': 'ഒരു ചിത്രം അപ്ലോഡ് ചെയ്യുക:',
                'nameLabel': 'പേര്:',
                'genderLabel': 'ലിംഗഭേദം:',
                'ageLabel': 'പ്രായം:',
                'maleLabel': 'പുരുഷൻ',
                'femaleLabel': 'സ്ത്രീ',
                'educationLabel': 'വിദ്യാഭ്യാസം:',
                'lkgLabel': 'എൽകെജി/യുകെജി',
                'sslcLabel': 'എസ്‌എസ്എൽസി',
                'plus2Label': '+2',
                'degreeLabel': 'ഡിഗ്രി',
                'pgLabel': 'പിജി',
                'phdLabel': 'പി‌എച്ച്‌ഡി',
                'gfLabel': 'മുത്തച്ഛൻ്റെ പേര്:',
                'gfMammuLabel': 'മമ്മു ഹാജി',
                'gfWriteLabel': 'താങ്കളുടെ മുത്തച്ഛൻ്റെ പേരെഴുത്തുക',
                'gmLabel': 'മുത്തശ്ശിയുടെ പേര്:',
                'gmFathimaLabel': 'ഫാത്തിമകുട്ടി',
                'gmWriteLabel': 'താങ്കളുടെ മുത്തശ്ശിയുടെ പേര് എഴുതുക',
                'familyLabel': 'കുടുംബത്തിന്റെ പേര്:',
                'familyAnapaddikalLabel': 'അനപ്പടിക്കൽ കുടുംബം',
                'familyWriteLabel': 'താങ്കളുടെ കുടുംബത്തിന്റെ പേര് എഴുതുക',
                'addressLabel': 'വിലാസം:',
                'submitButton': 'സമർപ്പിക്കുക',
                'footer': 'നിങ്ങൾക് വ്യക്തിപരമായ മറ്റെന്തെങ്കിലും ആവിശ്യം ഉണ്ടെങ്കിൽ ദയവായി ഞങ്ങളെ ബന്ധപെടുക',         
            }
        };

        var newLangData = langData[newLang];
        var titleElement = document.getElementById('title');
        titleElement.innerHTML = newLangData.title; // Use innerHTML to render <br> tag

        document.getElementById('uploadText').textContent = newLangData.uploadText;
        document.getElementById('nameLabel').textContent = newLangData.nameLabel;
        document.getElementById('ageLabel').textContent = newLangData.ageLabel;
        document.getElementById('maleLabel').textContent = newLangData.maleLabel;
        document.getElementById('femaleLabel').textContent = newLangData.femaleLabel;
        document.getElementById('educationLabel').textContent = newLangData.educationLabel;
        document.getElementById('genderLabel').textContent = newLangData.genderLabel;
        document.getElementById('lkgLabel').textContent = newLangData.lkgLabel;
        document.getElementById('sslcLabel').textContent = newLangData.sslcLabel;
        document.getElementById('plus2Label').textContent = newLangData.plus2Label;
        document.getElementById('degreeLabel').textContent = newLangData.degreeLabel;
        document.getElementById('pgLabel').textContent = newLangData.pgLabel;
        document.getElementById('phdLabel').textContent = newLangData.phdLabel;
        document.getElementById('gfLabel').textContent = newLangData.gfLabel;
        document.getElementById('gfMammuLabel').textContent = newLangData.gfMammuLabel;
        document.getElementById('gfWriteLabel').textContent = newLangData.gfWriteLabel;
        document.getElementById('gmLabel').textContent = newLangData.gmLabel;
        document.getElementById('gmFathimaLabel').textContent = newLangData.gmFathimaLabel;
        document.getElementById('gmWriteLabel').textContent = newLangData.gmWriteLabel;
        document.getElementById('familyLabel').textContent = newLangData.familyLabel;
        document.getElementById('familyAnapaddikalLabel').textContent = newLangData.familyAnapaddikalLabel;
        document.getElementById('familyWriteLabel').textContent = newLangData.familyWriteLabel;
        document.getElementById('addressLabel').textContent = newLangData.addressLabel;
        document.getElementById('submitButton').textContent = newLangData.submitButton;
        document.getElementById('footer').textContent = newLangData.footer;

        this.src = `/public/assets/${newLang}.png`;
    });


    const otherFields = ['grandFather', 'grandMother', 'family'];
    otherFields.forEach(field => {
        const radioInputs = document.querySelectorAll(`input[name="${field}"]`);
        const textInput = document.getElementById(`${field}Name`);

        radioInputs.forEach(input => {
            input.addEventListener('change', function () {
                if (this.value === 'other') {
                    textInput.classList.remove('hidden');
                    textInput.required = true;
                } else {
                    textInput.classList.add('hidden');
                    textInput.required = false;
                    textInput.value = ''; // Clear the input when not selected
                }
            });
        });
    });

});

