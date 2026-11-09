// Pure, client-side tool logic for AidForWork.
// Every function is deterministic for a given input and has no network or
// storage side effects, so it can be unit-checked in Node as well as in the browser.

export function formatUSD(n) {
  return '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: n % 1 === 0 ? 0 : 2 })
}

// Simple string hash -> seeded PRNG (mulberry32) for stable, varied output.
function hashString(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function rngFromSeed(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)]
}

function shuffle(rng, arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function splitList(text) {
  return String(text || '')
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

// ---------------------------------------------------------------------------
// Lesson plan generator
// ---------------------------------------------------------------------------
const ACTIVITY_BANK = {
  general: [
    'Guided discussion: students share what they already know, then the teacher connects their ideas to the new concept with two or three focused questions.',
    'Think-pair-share: students work alone for a few minutes, compare answers with a partner, then two pairs report back to the class.',
    'Hands-on task: students complete a short structured task in small groups while the teacher circulates, asks questions and corrects misunderstandings.',
    'Worked example and practice: the teacher models one example step by step, then students try a similar problem on their own before checking together.',
  ],
  math: [
    'Number talk: students solve a mental problem in more than one way and explain their reasoning to the class.',
    'Problem-solving stations: small groups rotate through three short problems, recording a strategy and an answer at each station.',
    'Error analysis: students find and fix a deliberate mistake in a worked solution, then explain the correct method in their own words.',
  ],
  science: [
    'Prediction and observation: students predict what will happen, observe the demonstration or experiment, then record and explain the result.',
    'Data table task: students collect or interpret a small set of results, spot a pattern and write one conclusion sentence.',
  ],
  english: [
    'Close reading: students read a short passage twice, underline key evidence and answer two text-dependent questions.',
    'Sentence building: students combine short sentences, add detail and read their improved sentence aloud to a partner.',
    'Writing sprint: students draft a short paragraph using a sentence starter, then swap papers and give one specific improvement.',
  ],
}

function subjectBank(subject) {
  const s = String(subject || '').toLowerCase()
  if (s.includes('math')) return [...ACTIVITY_BANK.math, ...ACTIVITY_BANK.general]
  if (s.includes('science') || s.includes('bio') || s.includes('chem') || s.includes('phys')) return [...ACTIVITY_BANK.science, ...ACTIVITY_BANK.general]
  if (s.includes('english') || s.includes('language') || s.includes('reading') || s.includes('writing')) return [...ACTIVITY_BANK.english, ...ACTIVITY_BANK.general]
  return ACTIVITY_BANK.general
}

export function generateLessonPlan({ grade, subject, topic, length, objectives }) {
  const len = Math.min(120, Math.max(20, parseInt(length, 10) || 45))
  const topicText = (topic || 'the topic').trim()
  const subjectText = (subject || 'General').trim()
  const gradeText = (grade || '').trim()
  const objs = splitList(objectives)
  const objList = objs.length ? objs : [`Understand the key ideas of ${topicText}`, `Apply ${topicText} to a new example`, `Explain ${topicText} in your own words`]
  const rng = rngFromSeed(hashString(`${gradeText}|${subjectText}|${topicText}|${len}`))
  const warmUp = Math.max(5, Math.round(len * 0.1))
  const assess = Math.max(5, Math.round(len * 0.15))
  const main = len - warmUp - assess
  const act1Len = Math.round(main * 0.55)
  const act2Len = main - act1Len
  const bank = subjectBank(subjectText)
  const acts = shuffle(rng, bank).slice(0, 2)
  const sections = [
    { heading: 'Lesson overview', text: `${subjectText} lesson on ${topicText} for ${gradeText || 'the class'}, lasting ${len} minutes. This plan is a starting draft — adapt the examples and pace to your students.` },
    { heading: 'Learning objectives', text: objList.map((o, i) => `${i + 1}. ${o}`).join('\n') },
    { heading: `Warm-up (${warmUp} min)`, text: `Ask the class one quick question about ${topicText} and take three or four short answers. Write the key words on the board and preview what the lesson will cover.` },
    { heading: `Main activity 1 (${act1Len} min)`, text: acts[0] },
    { heading: `Main activity 2 (${act2Len} min)`, text: acts[1] },
    { heading: `Assessment (${assess} min)`, text: `Exit ticket: each student writes one thing they learned about ${topicText}, one example of it, and one question they still have. Collect the tickets and use them to plan the next lesson.` },
    { heading: 'Homework', text: `Ask students to find one real-life example of ${topicText} and write three sentences explaining how it connects to today's lesson.` },
    { heading: 'Materials', text: 'Whiteboard or slides, printed worksheet or notebook, and any subject-specific materials for the activities above.' },
  ]
  const plainText = [`LESSON PLAN: ${topicText} (${subjectText}, ${gradeText})`, `Length: ${len} minutes`, '', ...sections.map((s) => `${s.heading.toUpperCase()}\n${s.text}`)].join('\n\n')
  return { title: `${topicText} — ${subjectText} Lesson Plan (${gradeText})`, length: len, sections, plainText }
}

// ---------------------------------------------------------------------------
// Quiz generator
// ---------------------------------------------------------------------------
const MCQ_STEMS = [
  'Which of the following best describes {topic}?',
  'What is the main idea behind {topic}?',
  'Which statement about {topic} is correct?',
  'A student is studying {topic}. What should they focus on first?',
  'Which example best illustrates {topic}?',
  'Why is {topic} important to understand?',
  'What would happen if a key part of {topic} were missing?',
  'Which of these is the most accurate definition of {topic}?',
]

const TF_STATEMENTS = [
  '{topic} is only useful in a classroom and has no real-life use.',
  'Understanding {topic} helps you explain related ideas more clearly.',
  'Every example of {topic} works in exactly the same way.',
  '{topic} can be learned best by practising with real examples.',
  'There is only one correct way to think about {topic}.',
  'Reviewing {topic} regularly helps you remember it for longer.',
]

const SHORT_STEMS = [
  'In your own words, explain what {topic} means.',
  'Give one real-life example of {topic} and explain why it fits.',
  'Describe the most important idea in {topic} in two or three sentences.',
  'What is one question you would ask to check someone understands {topic}?',
  'Explain how {topic} connects to something you learned earlier.',
  'List two key facts about {topic} and explain why each one matters.',
]

export function generateQuiz({ topic, grade, count, type }) {
  const n = Math.min(20, Math.max(1, parseInt(count, 10) || 5))
  const topicText = (topic || 'the topic').trim()
  const gradeText = (grade || '').trim()
  const rng = rngFromSeed(hashString(`${topicText}|${gradeText}|${type}|${n}`))
  const questions = []
  for (let i = 0; i < n; i++) {
    if (type === 'true-false') {
      const idx = Math.floor(rng() * TF_STATEMENTS.length)
      const stmt = TF_STATEMENTS[idx].replaceAll('{topic}', topicText)
      // Statements at even indexes (0, 2, 4) in the bank are false; odd indexes are true.
      const answer = [false, true, false, true, false, true][idx]
      questions.push({ number: i + 1, type: 'True / False', question: stmt, answer: answer ? 'True' : 'False', explanation: answer ? 'This statement is correct.' : 'This statement is incorrect — review the key ideas of the topic.' })
    } else if (type === 'short-answer') {
      const stem = pick(rng, SHORT_STEMS).replaceAll('{topic}', topicText)
      questions.push({ number: i + 1, type: 'Short answer', question: stem, answer: `Sample answer: a clear explanation of ${topicText} that mentions its main idea and gives one example. Accept any answer that covers the main idea accurately.`, explanation: 'Mark for understanding of the main idea, not for exact wording.' })
    } else {
      const stem = pick(rng, MCQ_STEMS).replaceAll('{topic}', topicText)
      const correct = `The option that correctly describes ${topicText} and its main idea`
      const distractors = [
        `A common misunderstanding about ${topicText}`,
        `A detail that is true of a different topic, not ${topicText}`,
        `A statement that sounds correct but misses the main idea of ${topicText}`,
      ]
      const options = shuffle(rng, [correct, ...distractors])
      const letters = ['A', 'B', 'C', 'D']
      questions.push({ number: i + 1, type: 'Multiple choice', question: stem, options: options.map((text, j) => ({ letter: letters[j], text })), answer: letters[options.indexOf(correct)], explanation: `The correct answer is the option that describes ${topicText} accurately. The other options are common misunderstandings or details from other topics.` })
    }
  }
  const plainText = [
    `QUIZ: ${topicText}${gradeText ? ` (${gradeText})` : ''}`,
    `Questions: ${n} — Type: ${type === 'mcq' ? 'Multiple choice' : type === 'true-false' ? 'True / False' : 'Short answer'}`,
    '',
    ...questions.map((q) => {
      let block = `${q.number}. ${q.question}`
      if (q.options) block += '\n' + q.options.map((o) => `   ${o.letter}. ${o.text}`).join('\n')
      block += `\n   Answer: ${q.answer}`
      return block
    }),
  ].join('\n\n')
  return { title: `${topicText} Quiz`, count: n, type, questions, plainText }
}

// ---------------------------------------------------------------------------
// Listing description generator
// ---------------------------------------------------------------------------
const TONE_OPENERS = {
  professional: ['Welcome to', 'Presenting', 'Discover'],
  friendly: ['You will love', 'Come home to', 'Say hello to'],
  luxury: ['Experience', 'Behold', 'Step into'],
}

export function generateListing({ propertyType, bedrooms, bathrooms, sqft, location, features, tone }) {
  const type = (propertyType || 'home').trim()
  const beds = bedrooms || '—'
  const baths = bathrooms || '—'
  const area = sqft ? `${Number(sqft).toLocaleString('en-US')} sq ft` : ''
  const loc = (location || '').trim()
  const feats = splitList(features)
  const toneKey = TONE_OPENERS[tone] ? tone : 'professional'
  const opener = TONE_OPENERS[toneKey][0]
  const headline = `${beds}-Bed ${type.charAt(0).toUpperCase() + type.slice(1)}${loc ? ` in ${loc}` : ''}${area ? ` — ${area}` : ''}`
  const featSentence = feats.length
    ? ` Standout features include ${feats.slice(0, 4).join(', ')}${feats.length > 4 ? `, and more` : ''}.`
    : ''
  const toneLine =
    toneKey === 'luxury'
      ? ' Every detail has been chosen for comfort and style, from the finishes to the flow of the living spaces.'
      : toneKey === 'friendly'
        ? ' It is a warm, welcoming space that is easy to picture as home from the very first visit.'
        : ' The layout is practical and well planned, with comfortable living space and good natural light throughout.'
  const description = `${opener} this ${beds}-bedroom, ${baths}-bathroom ${type}${loc ? ` in ${loc}` : ''}${area ? `, offering ${area} of living space` : ''}.${toneLine}${featSentence} Whether you are looking for space, comfort or a great location, this home is well worth a viewing. Contact the agent today to arrange a tour — homes like this do not stay on the market for long.`
  const highlights = [
    `${beds} bedrooms, ${baths} bathrooms`,
    ...(area ? [`${area} of living space`] : []),
    ...(loc ? [`Located in ${loc}`] : []),
    ...feats.slice(0, 5),
  ]
  const plainText = `${headline}\n\n${description}\n\nHighlights:\n${highlights.map((h) => `- ${h}`).join('\n')}`
  return { headline, description, highlights, plainText }
}

// ---------------------------------------------------------------------------
// CRM cost calculator
// ---------------------------------------------------------------------------
// EXACT FORMULA (also shown in the tool UI and BUILD_NOTES.md):
//   Annual billing:  effective price per user/month = price x 0.80 (20% annual discount)
//                    monthly cost = users x effective price
//                    annual cost  = monthly cost x 12
//   Monthly billing: monthly cost = users x price
//                    annual cost  = monthly cost x 12
//   First-year total = annual cost + one-time setup fee
//   Cost per user/month = monthly cost / users
// Example check: 5 users x $20/user/mo, annual billing, $0 setup
//   -> monthly = 5 x $16 = $80, annual = $80 x 12 = $960, first year = $960.
export const CRM_ANNUAL_DISCOUNT = 0.2
export const CRM_EXAMPLES = [
  { name: 'HubSpot Starter', price: 20 },
  { name: 'Zoho CRM', price: 14 },
  { name: 'Pipedrive', price: 24 },
]

export function calculateCrm({ users, pricePerUser, billing, setupFee }) {
  const round2 = (n) => Math.round(n * 100) / 100
  const u = Math.max(1, parseInt(users, 10) || 1)
  const price = Math.max(0, parseFloat(pricePerUser) || 0)
  const setup = Math.max(0, parseFloat(setupFee) || 0)
  const annual = billing === 'annual'
  const effectivePrice = round2(annual ? price * (1 - CRM_ANNUAL_DISCOUNT) : price)
  const monthly = round2(u * effectivePrice)
  const yearly = round2(monthly * 12)
  const firstYear = round2(yearly + setup)
  const comparison = CRM_EXAMPLES.map((c) => {
    const eff = round2(annual ? c.price * (1 - CRM_ANNUAL_DISCOUNT) : c.price)
    const m = round2(u * eff)
    return { name: c.name, pricePerUser: c.price, monthly: m, annual: round2(m * 12) }
  })
  return { users: u, pricePerUser: price, billing: annual ? 'annual' : 'monthly', setupFee: setup, effectivePricePerUser: effectivePrice, monthly, annual: yearly, firstYear, perUserPerMonth: round2(monthly / u), comparison }
}
