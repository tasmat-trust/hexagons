async function fetchData(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return response.json()
  } catch (error) {
    console.error("Unable to fetch data:", error)
  }
}

function fetchNames(nameType) {
  return fetchData(`https://www.randomlists.com/data/names-${nameType}.json`)
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

async function generateName(gender) {
  try {
    const response = await Promise.all([
      fetchNames(gender || pickRandom(["male", "female"])),
      fetchNames("surnames"),
    ])

    const [firstNames, lastNames] = response

    const firstName = pickRandom(firstNames.data)
    const lastName = pickRandom(lastNames.data)

    return `${firstName} ${lastName}`
  } catch (error) {
    console.error("Unable to generate name:", error)
  }
}

async function logRandomName(gender) {
  const name = await generateName(gender)
  return name
}

const classesGroup = ["Class 1", "Class 2", "Class 3", "Class 4"]
const yearGroup = ["Year 1", "Year 2", " Year 3", "Year 4"]
const capabilities = [
  "I can look at pictures in a book independently",
  "I can match objects to pictures",
  "I can choose a book to read",
  "I can select books from a choice of fiction and non-fiction",
]
const subjects = ["English Reading", "Computing", "PSHE", "Art", "Maths","Film","Geography","Music","PE","French","CDT","Introduction to Analytics"]
const stages = ["PS1", "PS2", "PS3", "PS4"]

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export async function randomPupil({ id }) {
  const pupilName = await logRandomName()
  return {
    id: `pupil-${id}`,
    name: pupilName,
    groups: [getRandom(classesGroup), getRandom(yearGroup)],
    subjects: subjects.map((subject) => ({
      name: subject,
      stage: getRandom(stages),
      percent: Math.floor(Math.random() * 100),
    })),
  }
}

export const pupils = [
  {
    id: "pupil-894rh8934hr9834h",
    name: "Lindsey Stroud",
    groups: ["Class 1", "Year 1"],
    subjects: [
      {
        name: "English",
        stages: [],
        stage: "PS3",
        percent: 45,
      },
      {
        name: "Maths",
        stage: "PS3",
        percent: 78,
      },
    ],
  },
  {
    id: "pupil-0f9j40394jff30j",
    name: "George Fields",
    groups: ["Class 2", "Year 2"],
    subjects: [
      {
        name: "English",
        stage: "PS3",
        percent: 65,
      },
      {
        name: "Maths",
        stage: "PS3",
        percent: 75,
      },
    ],
  },
  {
    id: "pupil-92hf98h34f89h3834",
    name: "Nicci Troiani",
    groups: ["Class 1", "Year 1"],
    subjects: [
      {
        name: "English",
        stage: "PS3",
        percent: 25,
      },
      {
        name: "Maths",
        stage: "PS3",
        percent: 30,
      },
    ],
  },
]
