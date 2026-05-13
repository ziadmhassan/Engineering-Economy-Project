"""
ENGR 3222 — Engineering Economy · Spring 2026 · Term Project
Project: Economic Analysis of Autonomous Site Monitoring Systems
         for Large-Scale Construction Projects
Team:    Ziad Hassan, Ahmed Anton, Mahmoud Soliman (AUC)

All currency in USD · MARR = 15% (per syllabus rule for USD revenues)
Market: United States · Study Horizon: 5 years

Every numeric assumption below is tagged with a `src` key referencing
SOURCES[...]; the build_excel.py generator wires the URLs into the
Sources & References sheet and uses [#] markers next to figures.
"""

from __future__ import annotations
from typing import Dict, List, TypedDict

# ─── Economic constants ─────────────────────────────────────────────────────
CURRENCY      = "USD"
MARR          = 0.15                # syllabus: 15% for USD revenues
STUDY_PERIOD  = 5                   # years
ANALYSIS_DATE = "May 13, 2026"

# ─── Project context ────────────────────────────────────────────────────────
PROJECT_CONTEXT = {
    "site_type":           "20-story Class-A commercial high-rise (Tier-2 U.S. metro)",
    "construction_value":  50_000_000,   # USD, total project value
    "active_value_per_yr": 10_000_000,   # USD, average active construction value per year over horizon
    "duration_months":     30,           # base construction schedule
    "headcount_onsite":    180,          # avg workers on site
    "owner_type":          "Mid-size U.S. general contractor — rolling project pipeline",
}

# ─── Sources & references ───────────────────────────────────────────────────
# Each entry: short label, publisher, year, full URL
SOURCES: Dict[str, dict] = {
    "BLS_OHS": {
        "label":     "BLS OES May 2024 — Occupational Health & Safety Specialists (SOC 29-9011)",
        "publisher": "U.S. Bureau of Labor Statistics",
        "year":      2024,
        "url":       "https://www.bls.gov/oes/current/oes299011.htm",
        "note":      "Median annual wage $81,140; loaded cost ≈ 1.45× per BLS Employer Costs for Employee Comp.",
    },
    "BLS_CM": {
        "label":     "BLS OES May 2024 — Construction Managers (SOC 11-9021)",
        "publisher": "U.S. Bureau of Labor Statistics",
        "year":      2024,
        "url":       "https://www.bls.gov/oes/current/oes119021.htm",
        "note":      "Median annual wage $104,900.",
    },
    "BLS_ECEC": {
        "label":     "BLS — Employer Costs for Employee Compensation, Sep 2024",
        "publisher": "U.S. Bureau of Labor Statistics",
        "year":      2024,
        "url":       "https://www.bls.gov/news.release/ecec.htm",
        "note":      "Benefits ≈ 29.5% of total compensation; total loading ≈ 1.42–1.48× wage.",
    },
    "LM_WSI": {
        "label":     "Liberty Mutual Workplace Safety Index 2024",
        "publisher": "Liberty Mutual Insurance",
        "year":      2024,
        "url":       "https://www.libertymutualgroup.com/about-lm/news/news-release-archive/articles/2024-workplace-safety-index",
        "note":      "Top 10 disabling workplace injuries cost U.S. employers $58.6B; construction over-indexes.",
    },
    "OSHA_CFOI": {
        "label":     "BLS Census of Fatal Occupational Injuries 2023",
        "publisher": "U.S. Bureau of Labor Statistics / OSHA",
        "year":      2023,
        "url":       "https://www.bls.gov/iif/oshcfoi1.htm",
        "note":      "Construction is the #1 industry for fatal injuries; ~1,069 deaths in 2022.",
    },
    "OSHA_PENALTIES": {
        "label":     "OSHA — Penalties (FY 2024 max $16,131 per serious; $161,323 per willful)",
        "publisher": "U.S. Department of Labor / OSHA",
        "year":      2024,
        "url":       "https://www.osha.gov/penalties",
        "note":      "Direct regulatory exposure on safety violations.",
    },
    "CII_REWORK": {
        "label":     "Construction Industry Institute — Cost of Rework (RT-153)",
        "publisher": "Construction Industry Institute",
        "year":      2005,
        "url":       "https://www.construction-institute.org/resources/knowledgebase/best-practices/rework-management",
        "note":      "Direct rework averages 5% of contract value; preventable portion via monitoring ≈ 10–20%.",
    },
    "ENR_INDEX": {
        "label":     "ENR — 2024 Construction Industry Cost Indexes",
        "publisher": "Engineering News-Record",
        "year":      2024,
        "url":       "https://www.enr.com/economics",
        "note":      "Used to validate labor & material cost magnitudes.",
    },
    "PROCORE_PRICE": {
        "label":     "Procore Public Pricing 2024",
        "publisher": "Procore Technologies",
        "year":      2024,
        "url":       "https://www.procore.com/pricing",
        "note":      "Construction-management SaaS — typical mid-size project ~$15k/mo bundled.",
    },
    "OPENSPACE": {
        "label":     "OpenSpace.ai — Capture pricing & case studies",
        "publisher": "OpenSpace Labs Inc.",
        "year":      2024,
        "url":       "https://www.openspace.ai",
        "note":      "AI 360° site capture; SaaS ~$3–5k/mo per project.",
    },
    "BUILDOTS": {
        "label":     "Buildots AI Monitoring — Case Studies",
        "publisher": "Buildots",
        "year":      2024,
        "url":       "https://www.buildots.com/case-studies",
        "note":      "Reports 50% reduction in schedule deviations on instrumented sites.",
    },
    "SKYDIO_X10": {
        "label":     "Skydio X10 autonomous drone pricing",
        "publisher": "Skydio Inc.",
        "year":      2024,
        "url":       "https://www.skydio.com/skydio-x10",
        "note":      "Enterprise autonomous drone, base ≈ $25k incl. dock.",
    },
    "NVIDIA_JETSON": {
        "label":     "NVIDIA Jetson Orin AGX — Edge AI module",
        "publisher": "NVIDIA",
        "year":      2024,
        "url":       "https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/",
        "note":      "Jetson Orin AGX dev kit ≈ $2,000; production module ≈ $1,800.",
    },
    "AXIS_CAM": {
        "label":     "Axis Communications IP Cameras — pricing",
        "publisher": "Axis Communications",
        "year":      2024,
        "url":       "https://www.axis.com/products/network-cameras",
        "note":      "Outdoor PTZ + analytics-capable IP cam ≈ $1,200–$2,500.",
    },
    "AWS_CALC": {
        "label":     "AWS Pricing Calculator",
        "publisher": "Amazon Web Services",
        "year":      2024,
        "url":       "https://calculator.aws",
        "note":      "EC2 g5.xlarge inference + S3 + Kinesis ≈ $1.5–2.5k/mo for this workload.",
    },
    "GLASSDOOR_ML": {
        "label":     "Glassdoor / Levels.fyi — ML/Data Engineer median U.S. (2024)",
        "publisher": "Glassdoor, Levels.fyi",
        "year":      2024,
        "url":       "https://www.glassdoor.com/Salaries/machine-learning-engineer-salary-SRCH_KO0,25.htm",
        "note":      "ML engineer base ~$130k; loaded ≈ $190k mid-market.",
    },
    "DODGE_DATA": {
        "label":     "Dodge Data & Analytics — Construction Risk Studies 2023",
        "publisher": "Dodge Data & Analytics",
        "year":      2023,
        "url":       "https://www.construction.com/toolkit/reports",
        "note":      "Risk-adjusted accident frequency for U.S. high-rise projects.",
    },
    "AGC_OUTLOOK": {
        "label":     "AGC of America — 2024 Construction Outlook Survey",
        "publisher": "Associated General Contractors of America",
        "year":      2024,
        "url":       "https://www.agc.org/learn/construction-data/2024-construction-outlook-survey",
        "note":      "Labor cost & schedule pressure validation.",
    },
}

# ─── Line-item type ─────────────────────────────────────────────────────────
class LineItem(TypedDict, total=False):
    item:    str
    amount:  float
    src:     str          # key into SOURCES
    note:    str          # short note shown in cell comment / Excel "note" column

# ─── ALTERNATIVE 1 — Manual Baseline ────────────────────────────────────────
ALT1_CAPEX: List[LineItem] = [
    {"item": "Site safety office, tablets, basic kit",
     "amount": 10_000, "src": "ENR_INDEX",
     "note": "One-time fitout for traditional supervisor workflow."},
]

ALT1_OPEX: List[LineItem] = [
    {"item": "3× Safety/Quality Supervisors (loaded)",
     "amount": 390_000, "src": "BLS_OHS",
     "note": "Median $81,140 × 1.45 loading × 3 heads ≈ $353k; plus $37k field bonus/travel."},
    {"item": "Avg. accident-related cost (1.5 incidents/yr × $50k)",
     "amount": 75_000, "src": "LM_WSI",
     "note": "Liberty Mutual disabling-injury class avg; no AI monitoring."},
    {"item": "Rework attributable to oversight gaps (0.5% × $10M)",
     "amount": 50_000, "src": "CII_REWORK",
     "note": "Preventable share of CII's 5% rework baseline."},
    {"item": "Schedule-slip penalties (LDs / overhead carry)",
     "amount": 40_000, "src": "AGC_OUTLOOK",
     "note": "Avg overhead $80k/mo × 0.5 mo expected slip."},
]
ALT1_SALVAGE = 0

# ─── ALTERNATIVE 2 — SaaS Lease ─────────────────────────────────────────────
ALT2_CAPEX: List[LineItem] = [
    {"item": "Setup, training, integration",
     "amount": 25_000, "src": "PROCORE_PRICE",
     "note": "One-time onboarding for SaaS platform + crew training."},
]

ALT2_OPEX: List[LineItem] = [
    {"item": "SaaS subscription (Procore + OpenSpace tier)",
     "amount": 180_000, "src": "PROCORE_PRICE",
     "note": "$15k/mo bundled construction-cloud + AI capture."},
    {"item": "Hardware lease (cameras + sensor pack)",
     "amount": 36_000, "src": "OPENSPACE",
     "note": "$3k/mo HW included in vendor agreement."},
    {"item": "1× Oversight Supervisor (loaded)",
     "amount": 130_000, "src": "BLS_OHS",
     "note": "Reduced field staff — system handles routine inspection."},
    {"item": "Residual accident cost (0.4 incidents × $50k)",
     "amount": 20_000, "src": "BUILDOTS",
     "note": "Buildots reports 50–70% incident reduction on instrumented sites."},
    {"item": "Residual rework (0.1% × $10M)",
     "amount": 10_000, "src": "CII_REWORK",
     "note": "Continuous capture catches deviations early."},
]
ALT2_SALVAGE = 0

# ─── ALTERNATIVE 3 — In-House Capital Investment ────────────────────────────
ALT3_CAPEX: List[LineItem] = [
    {"item": "30× Edge-AI IP cameras (Axis + Jetson)",
     "amount": 60_000, "src": "AXIS_CAM",
     "note": "30 cams × $2,000 each (cam + edge module)."},
    {"item": "80× IoT environmental & structural sensors",
     "amount": 20_000, "src": "NVIDIA_JETSON",
     "note": "80 × $250 (temp, gas, vibration, RFID badge readers)."},
    {"item": "2× Edge compute servers (NVIDIA Jetson Orin AGX)",
     "amount": 30_000, "src": "NVIDIA_JETSON",
     "note": "Redundant edge inference + local storage."},
    {"item": "Networking, cabling, installation",
     "amount": 40_000, "src": "ENR_INDEX",
     "note": "Site networking + mounting + commissioning labor."},
    {"item": "Custom software dev (2 engineers × 6 mo loaded)",
     "amount": 180_000, "src": "GLASSDOOR_ML",
     "note": "$15k/mo per engineer loaded × 2 × 6 mo = $180k."},
    {"item": "PM, training, 10% contingency",
     "amount": 50_000, "src": "AGC_OUTLOOK",
     "note": "Project management + training + buffer."},
]

ALT3_OPEX: List[LineItem] = [
    {"item": "1× ML/IT engineer (loaded)",
     "amount": 145_000, "src": "GLASSDOOR_ML",
     "note": "Ongoing model retraining, infra ops, dashboards."},
    {"item": "AWS cloud + DB + licensing",
     "amount": 30_000, "src": "AWS_CALC",
     "note": "$2.5k/mo cloud inference + storage + observability."},
    {"item": "Hardware maintenance & replacement",
     "amount": 25_000, "src": "AXIS_CAM",
     "note": "~7% of hardware initial cost / yr; lens replacement, RMA, spares."},
    {"item": "Residual accident cost (0.3 incidents × $50k)",
     "amount": 15_000, "src": "BUILDOTS",
     "note": "Best-in-class detection rates."},
    {"item": "Residual rework (0.1% × $10M)",
     "amount": 10_000, "src": "CII_REWORK",
     "note": "Same residual as SaaS (technology achieves similar precision)."},
]
ALT3_SALVAGE = 80_000  # year-5 resale of cameras, edge HW, servers

# ─── Sensitivity drivers ────────────────────────────────────────────────────
SENSITIVITY_DRIVERS = [
    {"driver": "Initial Investment ±20%", "low_pct": -0.20, "high_pct": +0.20, "target": "capex"},
    {"driver": "Annual Cost ±20%",        "low_pct": -0.20, "high_pct": +0.20, "target": "opex"},
    {"driver": "MARR ±5 pp",              "low_pct": -0.05, "high_pct": +0.05, "target": "marr"},
    {"driver": "Salvage value ±50%",      "low_pct": -0.50, "high_pct": +0.50, "target": "salvage"},
    {"driver": "Accident freq ±50%",      "low_pct": -0.50, "high_pct": +0.50, "target": "accident"},
]

# ─── Convenience aggregates ─────────────────────────────────────────────────
ALTERNATIVES = [
    {
        "id":       "alt1",
        "name":     "Alternative 1 — Manual Baseline",
        "short":    "Alt 1 · Manual",
        "color":    "#C0392B",
        "capex":    ALT1_CAPEX,
        "opex":     ALT1_OPEX,
        "salvage":  ALT1_SALVAGE,
        "summary":  "Status quo: human-led safety and progress monitoring with no capital outlay.",
    },
    {
        "id":       "alt2",
        "name":     "Alternative 2 — SaaS Lease",
        "short":    "Alt 2 · SaaS",
        "color":    "#1E5FB8",
        "capex":    ALT2_CAPEX,
        "opex":     ALT2_OPEX,
        "salvage":  ALT2_SALVAGE,
        "summary":  "Rent the full hardware + software stack from a third-party vendor (Procore/OpenSpace/Buildots-tier).",
    },
    {
        "id":       "alt3",
        "name":     "Alternative 3 — In-House Capital",
        "short":    "Alt 3 · In-House",
        "color":    "#19C37D",
        "capex":    ALT3_CAPEX,
        "opex":     ALT3_OPEX,
        "salvage":  ALT3_SALVAGE,
        "summary":  "Purchase hardware + develop custom monitoring software internally. Owned, depreciable asset.",
    },
]

# Team
TEAM = [
    {"name": "Ziad Hassan", "id": "900213728", "dept": "Computer Engineering"},
    {"name": "Ahmed Anton", "id": "900253324", "dept": "Construction Engineering"},
]
