const tablesData = [
  {
    containerId: "wTIMIT44Container",
    exptId: "wTIMIT_44",
    hasSpeaker: true,
    hasSeverity: false,
    systems: {
      "ASR-TTS": "asr_tts",
      "Free VC": "free_vc",
      "Quick VC": "quick_vc",
      "DistillW2N": "distillw2n",
      "WESPER": "wesper",
      "CLARIS": "claris",
    },
    rows: [
      { inputAudio: "s000_004.wav", speaker: "s000", text: "jane may earn more money by working hard" },
      { inputAudio: "s006_009.wav", speaker: "s006", text: "where were you while we were away" }
    ]
  },
  {
    containerId: "wTIMIT4UnseenContainer",
    exptId: "wTIMIT_Unseen_4",
    hasSpeaker: true,
    hasSeverity: false,
    systems: {
      "ASR-TTS": "asr_tts",
      "Free VC": "free_vc",
      "Quick VC": "quick_vc",
      "DistillW2N": "distillw2n",
      "WESPER": "wesper",
      "CLARIS": "claris",
    },
    rows: [
      { inputAudio: "s127_004.wav", speaker: "s000", text: "jane may earn more money by working hard" },
      { inputAudio: "s130_009.wav", speaker: "s006", text: "where were you while we were away" }
    ]
  },
  {
    containerId: "IndianAccentEnglishContainer",
    exptId: "IndianAccentEnglish",
    hasSpeaker: false,
    hasSeverity: false,
    systems: {
      "ASR-TTS": "asr_tts",
      "Free VC": "free_vc",
      "Quick VC": "quick_vc",
      "DistillW2N": "distillw2n",
      "WESPER": "wesper",
      "CLARIS": "claris",
      "CLARIS (Finetuned)": "claris_finetuned"
    },
    rows: [
        { 
            inputAudio: "speaker01_english_nonnative_effort1_10_1.wav", 
            text: "for example, with more readiness and dexterity than any other." 
        },
        { 
            inputAudio: "speaker01_english_nonnative_effort1_10_21.wav", 
            text: "which is over and above his own consumption." 
        }
    ]
  },
  {
    containerId: "HindiContainer",
    exptId: "Hindi",
    hasSpeaker: false,
    hasSeverity: false,
    systems: {
        "ASR-TTS": "asr_tts",
        "DistillW2N": "distillw2n",
        "WESPER": "wesper",
        "CLARIS": "claris"
    },
    rows: [
        {
            inputAudio: "speaker01_hindi_nonnative_effort1_train_hindimale_00658.wav",
            text: "अनुवाद के लिए हमारे पास, पेंगुइन की अच्छी किताबों की लंबी लिस्ट का होना, और किताबों, या लेखकों के बारे में, खुला नज़रिया रखना, हमारी सबसे बड़ी ताकत है"
        },
        {
            inputAudio: "speaker01_hindi_nonnative_effort1_train_hindimale_01118.wav",
            text: "यवन म्लेच्छो के राजा, कालयवन, राक्षस को जरासंध ने, कृष्ण के विरोध में उकसाया"
        }
    ]
  },
  {
    containerId: "TORGOContainer",
    exptId: "TORGO",
    hasSpeaker: true,
    hasSeverity: true,
    systems: {
        "ASR-TTS": "asr_tts",
        "WESPER": "wesper",
        "CLARIS": "claris"
    },
    rows: [
        {
            inputAudio: "F01_1_arrayMic_0008.wav",
            speaker: "F01",
            severity: "Medium",
            text: "Except in the winter when the ooze or snow or ice prevents"
        },
        {
            inputAudio: "F04_1_arrayMic_0006.wav",
            speaker: "F04",
            severity: "Low",
            text: "yet he still thinks as swiftly as ever",
        },
        {
            inputAudio: "M01_1_headMic_0005.wav",
            speaker: "M01",
            severity: "High",
            text: "When he speaks his voice is just a bit cracked and quivers a trifle"
        }
    ]
  }
];

async function renderAudioTable(containerId, systems, rows, exptId, hasSpeaker, hasSeverity) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container with ID "${containerId}" not found.`);
    return;
  }

  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.border = "none";

  // ===== HEADER =====
  const thead = document.createElement("thead");

  // First header row
  const headerRow1 = document.createElement("tr");
  headerRow1.style.borderBottom = "2px solid black";

  const thInput = document.createElement("th");
  thInput.rowSpan = 2;
  thInput.textContent = "Input Audio";
  thInput.style.textAlign = "center";
  thInput.style.padding = "8px";
  headerRow1.appendChild(thInput);

  const thText = document.createElement("th");
  thText.rowSpan = 2;
  thText.textContent = "Text";
  thText.style.textAlign = "center";
  thText.style.padding = "8px";
  headerRow1.appendChild(thText);

  if (hasSpeaker) {
    const thSpeaker = document.createElement("th");
    thSpeaker.rowSpan = 2;
    thSpeaker.textContent = "Speaker";
    thSpeaker.style.textAlign = "center";
    thSpeaker.style.padding = "8px";
    headerRow1.appendChild(thSpeaker);
  }

  if (hasSeverity) {
    const thStyle = document.createElement("th");
    thStyle.rowSpan = 2;
    thStyle.textContent = "Style";
    thStyle.style.textAlign = "center";
    thStyle.style.padding = "8px";
    headerRow1.appendChild(thStyle);
  }

  const thGenerated = document.createElement("th");
  thGenerated.colSpan = Object.keys(systems).length;
  thGenerated.textContent = "Generated audio";
  thGenerated.style.textAlign = "center";
  thGenerated.style.padding = "8px";
  headerRow1.appendChild(thGenerated);

  thead.appendChild(headerRow1);

  // Second header row
  const headerRow2 = document.createElement("tr");
  headerRow2.style.borderBottom = "2px solid black";

  Object.keys(systems).forEach(systemName => {
    const th = document.createElement("th");
    th.textContent = systemName;
    th.style.textAlign = "center";
    th.style.padding = "8px";
    headerRow2.appendChild(th);
  });

  thead.appendChild(headerRow2);
  table.appendChild(thead);

  // ===== BODY =====
  const tbody = document.createElement("tbody");

  for (const row of rows) {
    const tr = document.createElement("tr");

    // Input audio
    const tdInput = document.createElement("td");
    tdInput.style.textAlign = "center";
    tdInput.style.padding = "8px";
    tdInput.innerHTML = `<audio controls style="width:150px" src="./resources/audio/${exptId}/ground_truth/${row.inputAudio}"></audio>`;
    tr.appendChild(tdInput);

    // Text (fetched from txt file)
    const tdText = document.createElement("td");
    tdText.style.textAlign = "center";
    tdText.style.padding = "8px";
    const textContent = row.text;
    tdText.textContent = textContent.trim();
    tr.appendChild(tdText);

    if (hasSpeaker) {
      const tdSpeaker = document.createElement("td");
      tdSpeaker.style.textAlign = "center";
      tdSpeaker.style.padding = "8px";
      tdSpeaker.textContent = row.speaker || "";
      tr.appendChild(tdSpeaker);
    }

    // Style (if flagged)
    if (hasSeverity) {
      const tdSeverity = document.createElement("td");
      tdSeverity.style.textAlign = "center";
      tdSeverity.style.padding = "8px";
      tdSeverity.textContent = row.severity || "";
      tr.appendChild(tdSeverity);
    }

    // Generated audios for each system
    Object.values(systems).forEach(folderName => {
      const td = document.createElement("td");
      td.style.textAlign = "center";
      td.style.padding = "8px";
      td.innerHTML = `<audio controls style="width:150px" src="./resources/audio/${exptId}/${folderName}/${row.inputAudio}"></audio>`;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  container.appendChild(table);
}

// Render all tables
document.addEventListener("DOMContentLoaded", () => {
  tablesData.forEach(tableInfo => {
    renderAudioTable(
      tableInfo.containerId,
      tableInfo.systems,
      tableInfo.rows,
      tableInfo.exptId,
      tableInfo.hasSpeaker,
      tableInfo.hasSeverity
    );
  });
});
