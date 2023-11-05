document.addEventListener("DOMContentLoaded", () => {
    const questionContainer = document.getElementById("questionContainer");
    const symptomLinks = document.getElementById("symptomLinks");
    const results = document.getElementById("results");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");

    let currentQuestionIndex = 0;
    const questions = [
        "Do you have pain?",
        "Do you have vomiting?",
        "Do you have nausea?",
        "Do you feel constipation?",
        "Do you feel Breathlessness/Shortness of breath?",
        "Do you feel lack of balance & co-ordination?",
        "Do you experience changes in body appearance?",
        "Do you have diarrhea?",
        "Do you have Dry mouth/Mouth pain?",
        "Do you feel fatigue?",
        "Are you experiencing hair-loss/change in appearance?"
    ];

    const links = {
        "Do you have pain?": "https://www.cancer.org/cancer/managing-cancer/side-effects/pain/pain.html",
        "Do you have vomiting?": "https://www.healthlinkbc.ca/illnesses-conditions/cancer/cancer-controlling-cancer-pain",
        "Do you have nausea?": "https://www.healthlinkbc.ca/illnesses-conditions/cancer/cancer-controlling-cancer-pain",
        "Do you feel constipation?": "http://www.bccancer.bc.ca/health-info/coping-with-cancer/managing-symptoms-side-effects/constipation-caused-by-your-medications",
        "Do you feel Breathlessness/Shortness of breath?": "https://www.youtube.com/watch?v=nxw7rAmQeAI&t=102s",
        "Do you feel lack of balance & co-ordination?": "http://www.bccancer.bc.ca/health-info/coping-with-cancer/managing-symptoms-side-effects/balance-coordination",
        "Do you experience changes in body appearance?": "http://www.bccancer.bc.ca/health-info/coping-with-cancer/managing-symptoms-side-effects/balance-coordination",
        "Do you have diarrhea?": "https://www.cancer.gov/about-cancer/treatment/side-effects/diarrhea",
        "Do you have Dry mouth/Mouth pain?": "https://www.youtube.com/watch?v=PuLBtVTGo9I&t=82s",
        "Do you feel fatigue?": "https://www.breastcancer.org/treatment-side-effects/fatigue",
        "Are you experiencing hair-loss/change in appearance?": "https://www.breastcancer.org/treatment-side-effects/fatigue"
    };

    const userResponses = {};

    function showQuestion(index) {
        questionContainer.textContent = questions[index];
        const inputGroup = document.createElement("div");
        inputGroup.className = "input-group";
        const yesInput = document.createElement("input");
        yesInput.type = "radio";
        yesInput.name = `question${index}`;
        yesInput.value = "Yes";
        const yesLabel = document.createElement("label");
        yesLabel.textContent = "Yes";
        yesLabel.appendChild(yesInput);
        const noInput = document.createElement("input");
        noInput.type = "radio";
        noInput.name = `question${index}`;
        noInput.value = "No";
        const noLabel = document.createElement("label");
        noLabel.textContent = "No";
        noLabel.appendChild(noInput);
        inputGroup.appendChild(yesLabel);
        inputGroup.appendChild(noLabel);
        questionContainer.appendChild(inputGroup);

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === questions.length - 1;
        submitBtn.style.display = index === questions.length - 1 ? "block" : "none";
    }

    showQuestion(currentQuestionIndex);

    nextBtn.addEventListener("click", () => {
        const selectedValue = document.querySelector(`input[name=question${currentQuestionIndex}]:checked`);
        if (selectedValue) {
            userResponses[currentQuestionIndex] = selectedValue.value;
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(currentQuestionIndex);
            }
        } else {
            alert("Please select an option before proceeding.");
        }
    });

    prevBtn.addEventListener("click", () => {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    });

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        symptomLinks.innerHTML = "";
        Object.entries(userResponses).forEach(([index, answer]) => {
            if (answer === "Yes") {
                const selectedQuestion = questions[index];
                const link = document.createElement("a");
                link.href = links[selectedQuestion];
                link.textContent = selectedQuestion;
                const listItem = document.createElement("li");
                listItem.appendChild(link);
                symptomLinks.appendChild(listItem);
            }
        });
    
        results.style.display = symptomLinks.childElementCount > 0 ? "block" : "none";
    });
    
});
