// Import Plaud Tasks into CRM — deduplicated, recording-date-aware
const API = 'https://tradbot-crm.onrender.com/api';
const PLAUD_FILE = './plaud-todos.md';

// Hardcoded tasks with their recording dates and timeframes
// Format: { title, recordingDate (YYYY-MM-DD), timeframeMinutes }
const PLAUD_TASKS = [
  // From: 04-08 Consultation - Private-Label Building Materials
  { title: "Gather internal sales feedback on kickout flashing demand and current practices", source: "Plaud 04-08", recordingDate: "2026-04-08", timeframeMinutes: 1440 },
  { title: "Identify busy store(s) for kickout flashing pilot (box of twenty, ten each side) and confirm floor/counter display", source: "Plaud 04-08", recordingDate: "2026-04-08", timeframeMinutes: 1440 },
  { title: "Finalize discussions with builders next week regarding switching private-label house wrap/underlayment to Cameron Ashley", source: "Plaud 04-08", recordingDate: "2026-04-08", timeframeMinutes: 1440 },
  { title: "Review supplier's pricing proposal for ridge vents (low profile vs. 18 NFA) and set store-level pricing", source: "Plaud 04-08", recordingDate: "2026-04-08", timeframeMinutes: 1440 },
  { title: "Establish ordering cadence per location for private-label materials; consider staged inventory", source: "Plaud 04-08", recordingDate: "2026-04-08", timeframeMinutes: 2880 },
  { title: "Complete and submit credit application if proceeding with Cameron Ashley supplier lines", source: "Plaud 04-08", recordingDate: "2026-04-08", timeframeMinutes: 2880 },

  // From: 04-07 Meeting - Multifamily Customer - Timely Frames / Closet Maid / Circle Door
  { title: "Provide competitive price quote for Easy-Fit adjustable metal door frames (Timely alternative), standard 8-0 doors, include sample arrangement", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 1440 },
  { title: "Propose stocking program for Easy-Fit in DFW for upcoming multifamily projects", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 1440 },
  { title: "Research additional Timely alternatives (e.g., Dunbarton) and present second option", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 2880 },
  { title: "Research circle door sourcing; contact Tal at ETO to explore options", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 1440 },
  { title: "Inform Closet Maid that payment for held order expected this week to prevent collections", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 480 },
  { title: "Bring Closet Maid post-paint shelving sample + provide specs, pricing, install guidelines", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 2880 },
  { title: "Send job information for Ascension Development Group to Steve for quoting opportunities", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 1440 },

  // From: 04-07 Meeting - SRS Roofing Supply
  { title: "Send pricing for all roofing products to SRS manager, with focus on 30-pound underlayment", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 1440 },
  { title: "Provide house wrap details and white-labeling program proposal for new 15-18 acre lumber yard opening on Palbruck", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 1440 },
  { title: "Visit new lumber yard on Palbruck; introduce to Brian Herica and/or Dan", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 2880 },
  { title: "Follow up with John regarding windows interest at SRS location", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 1440 },
  { title: "Highlight 'within one week' lead time as key differentiator", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 480 },
  { title: "Offer quick-ship trial order for 30-pound underlayment to demonstrate reliability", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 1440 },

  // From: 04-07 Meeting - NFA12 Palletized Pricing
  { title: "Send detailed pricing sheet for NFA12 low-profile and standard-profile: unit price, units per box, boxes per pallet, total units per pallet, delivered pallet pricing", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 1440 },
  { title: "Clarify 'standard-profile' pallet price discrepancy ($715.20 vs low-profile $1,009.80) - confirm SKU, quantities, delivery terms", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 1440 },
  { title: "Confirm delivery terms, additional fees, and minimums for pallet shipments", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 480 },
  { title: "Schedule follow-up call to review pricing package with customer", source: "Plaud 04-07", recordingDate: "2026-04-07", timeframeMinutes: 2880 },

  // From: 04-06 - $30M Homes throughput clarification
  { title: "Provide: avg price per home, exact time period for $30M claim, intended unit volume target, and whether $30M is pipeline or closed revenue", source: "Plaud 04-06", recordingDate: "2026-04-06", timeframeMinutes: 1440 },
  { title: "Send structured request for required inputs (price/unit, period, unit target, revenue type, conversion assumptions) with response date requested", source: "Plaud 04-06", recordingDate: "2026-04-06", timeframeMinutes: 480 },
  { title: "Confirm calculation framework and derive definitive throughput (homes per period) once inputs received", source: "Plaud 04-06", recordingDate: "2026-04-06", timeframeMinutes: 2880 },

  // From: 03-31 Weekly Meeting - Representative Agreement + Houston Project
  { title: "Secure project purchase order before signing representative agreement", source: "Plaud 03-31", recordingDate: "2026-03-31", timeframeMinutes: 1440 },
  { title: "Begin Houston quote despite missing window schedule", source: "Plaud 03-31", recordingDate: "2026-03-31", timeframeMinutes: 1440 },
  { title: "Confirm with builder whether 'Greer House' (Anna Project) quote is still needed", source: "Plaud 03-31", recordingDate: "2026-03-31", timeframeMinutes: 1440 },
  { title: "Review Florida High-Rise (15-20 story) project details; assess aluminum vs vinyl suitability and design pressure requirements", source: "Plaud 03-31", recordingDate: "2026-03-31", timeframeMinutes: 2880 },

  // From: 03-25 Plaud (from plaud-todos.md pending section)
  { title: "Check with Jason if he plans to have a model home in the Glenhaven subdivision", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Begin quoting the 'Texas Patio Door' for relevant projects", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Send linear footage for closets to supplier to get a ballpark estimate (URGENT - TODAY)", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 480 },
  { title: "Finalize and submit complete multifamily project quote (BY FRIDAY)", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 2880 },
  { title: "Provide ballpark closet price based on linear footage provided", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Share closet pricing spreadsheet for future reference", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Check windstorm ratings for 3060 casement windows", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Provide pricing quote for 3.5\" satin nickel and black hinges, ball catch hardware, and other interior door components", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Bring a physical sample of the new impact window once it becomes available", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 4320 },
  { title: "Follow up on potential for higher-end, thermal-broken aluminum windows if a relevant project arises", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 2880 },
  { title: "Send price quote for 3'x5' double window to new building materials client", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Email credit application to new building materials client", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Develop and provide competitive pricing for house wrap and roofing underlayment to undercut current supplier costs", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 2880 },
  { title: "Bring a sample window to new client's location on next trip", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 4320 },
  { title: "Send contact information and all relevant price sheets via email", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Provide price quote for brown '650 reach' weather stripping, including pallet quantity pricing", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Identify and contact correct point of contact within customer's org to assess demand for sill pans", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Share customer feedback on competitor pricing ($85 target) with internal pricing/product team", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Investigate sourcing and specifications of competitor's door slabs (reportedly from Korea)", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 2880 },
  { title: "Provide the customer with an updated price quote for door slabs that accounts for the new competitive benchmark ($85)", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Add customer's phone (956-533-9110) to contact list for future specials", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 480 },
  { title: "Mail brochures for the patio door line to the sales team", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 2880 },
  { title: "Arrange for a floor display to be sent to the showroom", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 4320 },
  { title: "Provide a set of windows for a model home if the builder (Jason) decides to build one for the new subdivision", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 10080 },
  { title: "Send pricing and details for American Flashings house wrap and underlayment products", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Send full product and pricing packet to ABC/Selta Houston branch, including 3-0 x 5-0 verification", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Propose 60-90 minute training agenda with 3 date/time options to ABC/Selta Houston", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Coordinate with ABC/Selta ops to set up Lindsey Windows as quote/orderable brand in branch system", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 2880 },
  { title: "Call ABC/Selta Houston branch in advance to schedule next visit (no walk-ins)", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 480 },
  { title: "Send specific pricing for 'Ecolast' jamb (special/pallet rate and standard)", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Provide pricing for new fiberglass door line benchmarking against Thermatru's $106 price point", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 2880 },
  { title: "Share pricing and display options for new Emtek-alternative hardware line", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Leave business card with Mauricio at Broadus Construction", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 480 },
  { title: "Test the 'Ecolast' sample and decide whether to switch from wood/Frame Saver for upcoming jamb order", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 2880 },
  { title: "Share prior Ply Gem proposal (with pricing removed) to get same-day Lindsay quote", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Contact Ricky at Economy Doors (Mission-adjacent) for multifamily door package options", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Confirm receipt of Lindsey product/pricing packet and validate 3-0 x 5-0 pricing against Elevate/MI quotes", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Select and confirm a training slot; notify staff and ensure quoting system access is ready", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 2880 },
  { title: "Retrieve window sample and present to prospect (Elevate dealer)", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 480 },
  { title: "Visit Connie in Brownsville - Re: impact-rated windows", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 1440 },
  { title: "Provide prototype sample of new premium window series", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 4320 },
  { title: "Follow up when new window lines officially launch (1-2 months)", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 10080 },
  { title: "Email high-end aluminum project plans for takeoff/quote (as they arise)", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 2880 },
  { title: "Secure business card for David (branch manager)", source: "Plaud 03-25", recordingDate: "2026-03-25", timeframeMinutes: 480 },
];

// Login
async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data.token;
}

// Fetch all existing tasks (for deduplication)
async function fetchExistingTasks(token) {
  const res = await fetch(`${API}/tasks?status=pending`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  return data.tasks || [];
}

// Calculate due_date from recording date + 24 hours (fixed deadline)
function calcDueDate(recordingDate, timeframeMinutes) {
  const date = new Date(recordingDate + 'T00:00:00-06:00'); // CST
  date.setHours(date.getHours() + 24);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

// Add a single task
async function addTask(token, task) {
  const dueDate = calcDueDate(task.recordingDate, task.timeframeMinutes);
  const res = await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: task.title,
      source: task.source,
      timeframe_minutes: task.timeframeMinutes,
      due_date: dueDate,
      description: `Recorded: ${task.recordingDate} | Source: ${task.source}`
    })
  });
  return res.json();
}

async function importTasks() {
  const email = process.env.CRM_EMAIL || process.argv[2];
  const password = process.env.CRM_PASSWORD || process.argv[3];

  if (!email || !password) {
    console.error('Usage: node import-plaud-tasks.js <email> <password>\nOr set CRM_EMAIL and CRM_PASSWORD env vars.');
    process.exit(1);
  }

  console.log('Logging in...');
  const token = await login(email, password);

  console.log('Fetching existing tasks for deduplication...');
  const existing = await fetchExistingTasks(token);
  const existingTitles = new Set(existing.map(t => t.title.trim()));

  let imported = 0, skipped = 0;
  for (const task of PLAUD_TASKS) {
    if (existingTitles.has(task.title.trim())) {
      console.log(`  SKIP (duplicate): ${task.title.substring(0, 60)}...`);
      skipped++;
    } else {
      const due = calcDueDate(task.recordingDate, task.timeframeMinutes);
      await addTask(token, task);
      console.log(`  ADD: ${task.title.substring(0, 50)}... | due: ${due}`);
      imported++;
    }
  }

  console.log(`\nDone — ${imported} imported, ${skipped} skipped (duplicates).`);
}

importTasks().catch(err => { console.error(err); process.exit(1); });
