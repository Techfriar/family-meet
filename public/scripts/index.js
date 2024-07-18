document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('familyForm');
    const pictureInput = document.getElementById('picture');
    const imagePreview = document.getElementById('imagePreview');
    const uploadText = document.getElementById('uploadText');
    const uploadIcon = document.getElementById('uploadIcon');
    const pictureError = document.getElementById('pictureError');

    // Handle image selection and preview
    pictureInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            pictureError.classList.add('hidden');
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.classList.remove('hidden');
                uploadText.textContent = file.name;
                uploadIcon.classList.add('hidden')
            }
            reader.readAsDataURL(file);
        } else {
            imagePreview.classList.add('hidden');
            imagePreview.src = '';
            uploadText.textContent = 'Upload a picture:';
        }
    });

    var radios = form.querySelectorAll('input[type="radio"]');
    radios.forEach(function (radio) {
        radio.checked = false;
    });

    // Prevent browser auto-fill
    form.reset();

    // Show/hide custom input fields
    const otherFields = ['relatedTo', 'relatedTo2', 'family'];
    otherFields.forEach(field => {
        const radioInputs = document.querySelectorAll(`input[name="${field}"]`);
        const textInput = document.getElementById(`${field}Name`);

        radioInputs.forEach(input => {
            input.addEventListener('change', function () {
                if (this.value === '1' || (field === 'relatedTo2' && this.value === '1') || (field === 'family' && this.value === '1')) {
                    textInput.classList.remove('hidden');
                    textInput.required = true;
                } else {
                    textInput.classList.add('hidden');
                    textInput.required = false;
                    textInput.value = '';
                }
            });
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
                'nameLabel': 'Name',
                'genderLabel': 'Gender',
                'ageLabel': 'Age',
                'maleLabel': 'Male',
                'femaleLabel': 'Female',
                'educationLabel': 'Education',
                'lkgLabel': 'LKG/UKG',
                'sslcLabel': 'SSLC',
                'plus2Label': '+2',
                'degreeLabel': 'Degree',
                'pgLabel': 'PG',
                'phdLabel': 'PHD',
                'gfLabel': 'Related to',
                'gfMammuLabel': 'Mammu Haji',
                'gfMohideenLabel': 'Mohideenkutty (Peechi Master)',
                'gfWriteLabel': 'Others',
                'gmLabel': 'Related to:',
                'gmFathimaLabel': 'Fathimakutty',
                'gmWriteLabel': 'Others',
                'familyLabel': 'Family name',
                'familyAnapaddikalLabel': 'Anapaddikal Family',
                'familyWriteLabel': 'Write your Family name',
                'phoneLabel': 'Phone number',
                'employmentLabel': 'Employment (Company)',
                'addressLabel': 'Address',
                'submitButton': 'Submit',
                'footer': 'If you have any other personal urgent matters, please feel free to contact us at',
                'pictureError': 'Please upload a picture.',
                'modalText': 'Submitted Successfully',
            },
            'malayalam': {
                'title': 'ആനപ്പടിക്കൽ കുടുംബം <br> മീറ്റ് 2024',
                'uploadText': 'ചിത്രം അപ്ഡേറ്റ് ചെയ്യുക',
                'nameLabel': 'പേര്',
                'genderLabel': 'ലിംഗഭേദം',
                'ageLabel': 'പ്രായം',
                'maleLabel': 'പുരുഷൻ',
                'femaleLabel': 'സ്ത്രീ',
                'educationLabel': 'വിദ്യാഭ്യാസം',
                'lkgLabel': 'എൽകെജി/യുകെജി',
                'sslcLabel': 'എസ്‌എസ്എൽസി',
                'plus2Label': '+2',
                'degreeLabel': 'ഡിഗ്രി',
                'pgLabel': 'പിജി',
                'phdLabel': 'പി‌എച്ച്‌ഡി',
                'gfLabel': 'കുടുംബവുമായുള്ള ബന്ധം',
                'gfMammuLabel': 'മമ്മു ഹാജി',
                'gfMohideenLabel': 'മൊഹിദീൻകുട്ടി (പീച്ചി മാഷ്)',
                'gfWriteLabel': 'മറ്റുള്ളവർ',
                'gmLabel': 'കുടുംബവുമായുള്ള ബന്ധം:',
                'gmFathimaLabel': 'ഫാത്തിമകുട്ടി',
                'gmWriteLabel': 'മറ്റുള്ളവർ',
                'familyLabel': 'കുടുംബ പേര്',
                'familyAnapaddikalLabel': 'ആനപ്പടിക്കൽ കുടുംബം',
                'familyWriteLabel': 'നിങ്ങളുടെ കുടുംബത്തിന്റെ പേര് എഴുതുക',
                'phoneLabel': 'ഫോൺ നമ്പർ',
                'employmentLabel': 'തൊഴിൽ (കമ്പനി)',
                'addressLabel': 'വിലാസം',
                'submitButton': 'സമർപ്പിക്കുക',
                'footer': 'നിങ്ങൾക്ക് വ്യക്തിപരമായ മറ്റെന്തെങ്കിലും അടിയന്തര കാര്യങ്ങൾ ഉണ്ടെങ്കിൽ, ദയവായി ഞങ്ങളെ ബന്ധപ്പെടുക',
                'pictureError': 'ഒരു ചിത്രം അപ്ലോഡ് ചെയ്യുക.',
                'modalText': 'വിജയകരമായി സമർപ്പിച്ചു',
            }
        };

        var newLangData = langData[newLang];

        // Function to update text content of an element if it exists
        function updateTextContent(id, text) {
            var element = document.getElementById(id);
            if (element) {
                element.textContent = text;
            }
        }

        // Function to update innerHTML of an element if it exists
        function updateInnerHTML(id, html) {
            var element = document.getElementById(id);
            if (element) {
                element.innerHTML = html;
            }
        }

        // Update all text contents
        updateInnerHTML('title', newLangData.title);
        updateTextContent('uploadText', newLangData.uploadText);
        updateTextContent('nameLabel', newLangData.nameLabel);
        updateTextContent('ageLabel', newLangData.ageLabel);
        updateTextContent('genderLabel', newLangData.genderLabel);
        updateTextContent('maleLabel', newLangData.maleLabel);
        updateTextContent('femaleLabel', newLangData.femaleLabel);
        updateTextContent('educationLabel', newLangData.educationLabel);
        updateTextContent('lkgLabel', newLangData.lkgLabel);
        updateTextContent('sslcLabel', newLangData.sslcLabel);
        updateTextContent('plus2Label', newLangData.plus2Label);
        updateTextContent('degreeLabel', newLangData.degreeLabel);
        updateTextContent('pgLabel', newLangData.pgLabel);
        updateTextContent('phdLabel', newLangData.phdLabel);
        updateTextContent('gfLabel', newLangData.gfLabel);
        updateTextContent('gfMammuLabel', newLangData.gfMammuLabel);
        updateTextContent('gfMohideenLabel', newLangData.gfMohideenLabel);
        updateTextContent('gfWriteLabel', newLangData.gfWriteLabel);
        updateTextContent('gmLabel', newLangData.gmLabel);
        updateTextContent('gmFathimaLabel', newLangData.gmFathimaLabel);
        updateTextContent('gmWriteLabel', newLangData.gmWriteLabel);
        updateTextContent('familyLabel', newLangData.familyLabel);
        updateTextContent('familyAnapaddikalLabel', newLangData.familyAnapaddikalLabel);
        updateTextContent('familyWriteLabel', newLangData.familyWriteLabel);
        updateTextContent('phoneLabel', newLangData.phoneLabel);
        updateTextContent('employmentLabel', newLangData.employmentLabel);
        updateTextContent('addressLabel', newLangData.addressLabel);
        updateTextContent('submitButton', newLangData.submitButton);
        updateTextContent('footer', newLangData.footer);
        updateTextContent('pictureError', newLangData.pictureError);
        updateTextContent('modalText', newLangData.modalText);

        this.src = `/public/assets/${newLang}.png`;

        // Update the hidden language input
        document.getElementById('currentLanguage').value = newLang === 'english' ? 'en' : 'ml';
    });
});