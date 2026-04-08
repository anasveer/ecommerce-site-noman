export const MAIN_CATEGORIES = [
  { label: "Fabric", value: "fabric" },
  { label: "Bedsheet", value: "bedsheet" },
] as const;

export const BEDSHEET_SUBCATEGORIES = [
  { label: "Comforter Set", value: "comforter-set" },
  { label: "3pcs Bedsheet", value: "3pcs-bedsheet" },
  { label: "Single Pair Bedsheet", value: "single-pair-bedsheet" },
  { label: "Water Proof Mattress Cover", value: "water-proof-mattress-cover" },
] as const;

// Fabrics for 3pcs Bedsheet
export const FABRICS_3PCS = [
  { label: "Crystal Cotton", value: "crystal-cotton" },
  { label: "Mix Cotton", value: "mix-cotton" },
  { label: "Embroidery Patch", value: "embroidery-patch" },
  { label: "Print Patch", value: "print-patch" },
  { label: "Frill Bedsheet", value: "frill-bedsheet" },
] as const;

// Fabrics for Single Pair Bedsheet
export const FABRICS_SINGLE_PAIR = [
  { label: "Patch Bedsheet", value: "patch-bedsheet" },
  { label: "Crystal", value: "crystal" },
  { label: "Mix Cotton", value: "mix-cotton-single" },
] as const;