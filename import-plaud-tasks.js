// Import Plaud Tasks into CRM
const API = 'https://tradbot-crm.onrender.com/api';

const plaudTasks = [
  { title: "Check with Jason if he plans to have a model home in the Glenhaven subdivision", source: "plaud", timeframe_minutes: 1440 },
  { title: "Begin quoting the 'Texas Patio Door' for relevant projects", source: "plaud", timeframe_minutes: 1440 },
  { title: "Send linear footage for closets to supplier to get a ballpark estimate (URGENT)", source: "plaud", timeframe_minutes: 480 },
  { title: "Finalize and submit complete multifamily project quote (BY FRIDAY)", source: "plaud", timeframe_minutes: 2880 },
  { title: "Provide ballpark closet price based on linear footage provided", source: "plaud", timeframe_minutes: 1440 },
  { title: "Share closet pricing spreadsheet for future reference", source: "plaud", timeframe_minutes: 1440 },
  { title: "Check windstorm ratings for 3060 casement windows", source: "plaud", timeframe_minutes: 1440 },
  { title: "Provide pricing quote for 3.5\" satin nickel and black hinges, ball catch hardware, and other interior door components", source: "plaud", timeframe_minutes: 1440 },
  { title: "Bring a physical sample of the new impact window once it becomes available", source: "plaud", timeframe_minutes: 4320 },
  { title: "Follow up on potential for higher-end, thermal-broken aluminum windows if a relevant project arises", source: "plaud", timeframe_minutes: 2880 },
  { title: "Send price quote for 3'x5' double window to new building materials client", source: "plaud", timeframe_minutes: 1440 },
  { title: "Email credit application to new building materials client", source: "plaud", timeframe_minutes: 1440 },
  { title: "Develop and provide competitive pricing for house wrap and roofing underlayment to undercut current supplier costs", source: "plaud", timeframe_minutes: 2880 },
  { title: "Bring a sample window to new client's location on next trip", source: "plaud", timeframe_minutes: 4320 },
  { title: "Send contact information and all relevant price sheets via email", source: "plaud", timeframe_minutes: 1440 },
  { title: "Provide price quote for brown '650 reach' weather stripping, including pallet quantity pricing", source: "plaud", timeframe_minutes: 1440 },
  { title: "Identify and contact correct point of contact within customer's org to assess demand for sill pans", source: "plaud", timeframe_minutes: 1440 },
  { title: "Share customer feedback on competitor pricing ($85 target) with internal pricing/product team", source: "plaud", timeframe_minutes: 1440 },
  { title: "Investigate sourcing and specifications of competitor's door slabs (reportedly from Korea)", source: "plaud", timeframe_minutes: 2880 },
  { title: "Provide the customer with an updated price quote for door slabs that accounts for the new competitive benchmark ($85)", source: "plaud", timeframe_minutes: 1440 },
  { title: "Add customer's phone (956-533-9110) to contact list for future specials", source: "plaud", timeframe_minutes: 480 },
  { title: "Mail brochures for the patio door line to the sales team", source: "plaud", timeframe_minutes: 2880 },
  { title: "Arrange for a floor display to be sent to the showroom", source: "plaud", timeframe_minutes: 4320 },
  { title: "Provide a set of windows for a model home if the builder (Jason) decides to build one for the new subdivision", source: "plaud", timeframe_minutes: 10080 },
  { title: "Send pricing and details for American Flashings house wrap and underlayment products", source: "plaud", timeframe_minutes: 1440 },
  { title: "Send full product and pricing packet to ABC/Selta Houston branch, including 3-0 x 5-0 verification", source: "plaud", timeframe_minutes: 1440 },
  { title: "Propose 60-90 minute training agenda with 3 date/time options to ABC/Selta Houston", source: "plaud", timeframe_minutes: 1440 },
  { title: "Coordinate with ABC/Selta ops to set up Lindsey Windows as quote/orderable brand in branch system", source: "plaud", timeframe_minutes: 2880 },
  { title: "Call ABC/Selta Houston branch in advance to schedule next visit (no walk-ins)", source: "plaud", timeframe_minutes: 480 },
  { title: "Send specific pricing for 'Ecolast' jamb (special/pallet rate and standard)", source: "plaud", timeframe_minutes: 1440 },
  { title: "Provide pricing for new fiberglass door line benchmarking against Thermatru's $106 price point", source: "plaud", timeframe_minutes: 2880 },
  { title: "Share pricing and display options for new Emtek-alternative hardware line", source: "plaud", timeframe_minutes: 1440 },
  { title: "Leave business card with Mauricio at Broadus Construction", source: "plaud", timeframe_minutes: 480 },
  { title: "Test the 'Ecolast' sample and decide whether to switch from wood/Frame Saver for upcoming jamb order", source: "plaud", timeframe_minutes: 2880 },
  { title: "Share prior Ply Gem proposal (with pricing removed) to get same-day Lindsay quote", source: "plaud", timeframe_minutes: 1440 },
  { title: "Contact Ricky at Economy Doors (Mission-adjacent) for multifamily door package options", source: "plaud", timeframe_minutes: 1440 },
  { title: "Confirm receipt of Lindsey product/pricing packet and validate 3-0 x 5-0 pricing against Elevate/MI quotes", source: "plaud", timeframe_minutes: 1440 },
  { title: "Select and confirm a training slot; notify staff and ensure quoting system access is ready", source: "plaud", timeframe_minutes: 2880 },
  { title: "Retrieve window sample and present to prospect (Elevate dealer)", source: "plaud", timeframe_minutes: 480 },
  { title: "Visit Connie in Brownsville - Re: impact-rated windows", source: "plaud", timeframe_minutes: 1440 },
  { title: "Provide prototype sample of new premium window series", source: "plaud", timeframe_minutes: 4320 },
  { title: "Follow up when new window lines officially launch (1-2 months)", source: "plaud", timeframe_minutes: 10080 },
  { title: "Email high-end aluminum project plans for takeoff/quote (as they arise)", source: "plaud", timeframe_minutes: 2880 },
  { title: "Secure business card for David (branch manager)", source: "plaud", timeframe_minutes: 480 },
];

// NOTE: Replace CRM_EMAIL and CRM_PASSWORD in your environment before running
// export CRM_EMAIL=your@email.com
// export CRM_PASSWORD=yourpassword
async function login() {
  const email = process.env.CRM_EMAIL || process.argv[2];
  const password = process.env.CRM_PASSWORD || process.argv[3];
  if (!email || !password) {
    throw new Error('Usage: node import-plaud-tasks.js <email> <password>\nOr set CRM_EMAIL and CRM_PASSWORD environment variables.');
  }
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data.token;
}

async function addTask(token, task) {
  const res = await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  return res.json();
}

async function importTasks() {
  console.log('Logging in...');
  const token = await login();
  
  console.log(`Importing ${plaudTasks.length} tasks...`);
  for (const task of plaudTasks) {
    await addTask(token, task);
  }
  console.log('Done!');
}

importTasks().catch(console.error);
