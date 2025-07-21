const claimRequestList = [
  { claimId: "CL001", policyId: "POL123", customerId: "CR0001", amount: "₹50,000", date: "2025-07-15", status: "Pending" },
  { claimId: "CL002", policyId: "POL456", customerId: "CR0002", amount: "₹70,000", date: "2025-07-18", status: "Pending" },
  { claimId: "CL003", policyId: "POL789", customerId: "CR0003", amount: "₹35,000", date: "2025-07-20", status: "Pending" },
];

const AgentsList = [
  { name: "Aarav", agentId: "AG0001", role: "Agent", districts: ["Hyderabad", "Warangal", "Khammam"] },
  { name: "Meera", agentId: "AG0002", role: "Manager", districts: ["Nizamabad", "Karimnagar", "Khammam"] },
  { name: "Rohan", agentId: "AG0003", role: "Agent", districts: ["Hyderabad", "Nizamabad", "Karimnagar"] },
  { name: "Sanya", agentId: "AG0004", role: "Manager", districts: ["Warangal", "Khammam", "Karimnagar"] },
  { name: "Kunal", agentId: "AG0005", role: "Agent", districts: ["Hyderabad", "Warangal", "Nizamabad", "Khammam"] },
  { name: "Neha", agentId: "AG0006", role: "Manager", districts: ["Karimnagar", "Khammam", "Hyderabad"] },
  { name: "Vihaan", agentId: "AG0007", role: "Agent", districts: ["Warangal", "Nizamabad", "Karimnagar"] },
  { name: "Tanya", agentId: "AG0008", role: "Manager", districts: ["Khammam", "Hyderabad", "Warangal"] },
  { name: "Aditya", agentId: "AG0006", role: "Agent", districts: ["Karimnagar", "Hyderabad", "Nizamabad"] },
  { name: "Isha", agentId: "AG0003", role: "Manager", districts: ["Warangal", "Nizamabad", "Khammam", "Karimnagar"] },
];

const claimList = [
  { claimId: "CL001", customerId: "CR0001", policyId: "POL101", amount: "₹45,000", date: "2025-07-01", status: "Approved" },
  { claimId: "CL002", customerId: "CR0002", policyId: "POL102", amount: "₹38,000", date: "2025-07-02", status: "Pending" },
  { claimId: "CL003", customerId: "CR0003", policyId: "POL103", amount: "₹52,500", date: "2025-07-03", status: "Rejected" },
  { claimId: "CL004", customerId: "CR0004", policyId: "POL104", amount: "₹60,000", date: "2025-07-04", status: "Approved" },
  { claimId: "CL005", customerId: "CR0005", policyId: "POL105", amount: "₹25,000", date: "2025-07-05", status: "Under Review" },
  { claimId: "CL006", customerId: "CR0006", policyId: "POL106", amount: "₹41,000", date: "2025-07-06", status: "Pending" },
  { claimId: "CL007", customerId: "CR0007", policyId: "POL107", amount: "₹33,300", date: "2025-07-07", status: "Completed" },
  { claimId: "CL008", customerId: "CR0008", policyId: "POL108", amount: "₹47,800", date: "2025-07-08", status: "Approved" },
  { claimId: "CL009", customerId: "CR0006", policyId: "POL109", amount: "₹29,000", date: "2025-07-09", status: "Rejected" },
  { claimId: "CL010", customerId: "CR0003", policyId: "POL110", amount: "₹55,000", date: "2025-07-10", status: "Submitted" },
];

const RenewalList = [
  { renewalId: "RN001", policyId: "POL201", customerId: "CR0001", renewalDate: "2025-07-01", newPremium: "₹12,000", expiryYear: 2026 },
  { renewalId: "RN002", policyId: "POL202", customerId: "CR0002", renewalDate: "2025-07-02", newPremium: "₹15,500", expiryYear: 2026 },
  { renewalId: "RN003", policyId: "POL203", customerId: "CR0003", renewalDate: "2025-07-03", newPremium: "₹10,800", expiryYear: 2026 },
  { renewalId: "RN004", policyId: "POL204", customerId: "CR0004", renewalDate: "2025-07-04", newPremium: "₹13,200", expiryYear: 2026 },
  { renewalId: "RN005", policyId: "POL205", customerId: "CR0005", renewalDate: "2025-07-05", newPremium: "₹14,000", expiryYear: 2026 },
  { renewalId: "RN006", policyId: "POL206", customerId: "CR0006", renewalDate: "2025-07-06", newPremium: "₹11,250", expiryYear: 2026 },
  { renewalId: "RN007", policyId: "POL207", customerId: "CR0007", renewalDate: "2025-07-07", newPremium: "₹12,750", expiryYear: 2026 },
  { renewalId: "RN008", policyId: "POL208", customerId: "CR0008", renewalDate: "2025-07-08", newPremium: "₹16,000", expiryYear: 2026 },
  { renewalId: "RN009", policyId: "POL209", customerId: "CR0006", renewalDate: "2025-07-09", newPremium: "₹13,750", expiryYear: 2026 },
  { renewalId: "RN010", policyId: "POL210", customerId: "CR0003", renewalDate: "2025-07-10", newPremium: "₹15,000", expiryYear: 2026 },
];

const customers = [
  { name: "Aram Singh", id: "CR001", mail: "aram@example.com", mobile: "9876543210", address: "Hyderabad" },
  { name: "Aram Patel", id: "CR002", mail: "aram.patel@example.com", mobile: "8765432109", address: "Mumbai" },
  { name: "Aram Das", id: "CR003", mail: "aram.das@example.com", mobile: "7654321098", address: "Delhi" },
];

const districtOptions = ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"];